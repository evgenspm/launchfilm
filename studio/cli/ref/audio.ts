// Audio facts for a reference: loudness (ffmpeg loudnorm analysis pass, present in every
// ffmpeg build incl. Remotion's), silence, onset envelope, tempo + beat grid (own
// implementation of the Ellis 2007 dynamic-programming tracker, no dependencies), music and
// speech heuristics, optional whisper.cpp transcript.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { run, type Tools } from './ffmpeg.js';

export interface WhisperConfig {
  /** path to whisper.cpp CLI (whisper-cli / main) */
  bin: string;
  /** ggml model file */
  model: string;
  /** optional Silero VAD ggml model; cuts hallucinations on music */
  vadModel?: string;
  language?: string;
  threads?: number;
}

export interface AudioFacts {
  has_audio: boolean;
  integrated_lufs: number | null;
  true_peak: number | null;
  lra: number | null;
  has_music: boolean;
  bpm: number | null;
  bpm_confidence: number;
  beats: number[];
  downbeats: number[];
  /** strongest onsets (s) — candidates for SFX hits / cut points */
  onsets: number[];
  has_vo: boolean;
  has_vo_source: 'whisper' | 'heuristic' | 'none';
  speech_score: number;
  /** heuristic verdict even when whisper decided has_vo (for comparison) */
  has_vo_heuristic: boolean | null;
  vo_evidence: Record<string, number | boolean> | null;
  silence: [number, number][];
  active_ratio: number;
  method: Record<string, string>;
}

export interface Transcript {
  engine: 'whisper.cpp';
  model: string;
  language: string | null;
  text: string;
  words: number;
  segments: { t0: number; t1: number; text: string }[];
}

const SR = 22050;
const NFFT = 1024;
const HOP = 256;
const FR = SR / HOP; // onset frames per second

const r2 = (x: number) => Math.round(x * 100) / 100;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

export async function loudness(tools: Tools, input: string) {
  const { stderr } = await run(tools.ffmpeg, ['-hide_banner', '-nostats', '-nostdin', '-i', input, '-vn', '-af', 'loudnorm=print_format=json', '-f', 'null', '-'], {
    check: false,
  });
  const m = stderr.match(/\{[^{}]*"input_i"[^{}]*\}/);
  if (!m) return { integrated_lufs: null, true_peak: null, lra: null };
  const j = JSON.parse(m[0]);
  const num = (v: string) => {
    const x = Number(v);
    return Number.isFinite(x) ? r2(x) : null;
  };
  const i = num(j.input_i);
  return { integrated_lufs: i !== null && i > -70 ? i : null, true_peak: num(j.input_tp), lra: num(j.input_lra) };
}

/** Mid (L+R)/2 and side (L−R)/2 at 22.05 kHz. Mono sources come back with side = 0. */
export async function decodeMidSide(tools: Tools, input: string, sr = SR): Promise<{ mid: Float32Array; side: Float32Array }> {
  const { stdout } = await run(tools.ffmpeg, ['-v', 'error', '-nostdin', '-i', input, '-vn', '-ac', '2', '-ar', String(sr), '-c:a', 'pcm_s16le', '-f', 'wav', 'pipe:1']);
  // walk RIFF chunks to "data"; in pipe mode the sizes may be placeholders
  let off = 12;
  while (off + 8 <= stdout.length) {
    const id = stdout.toString('ascii', off, off + 4);
    const size = stdout.readUInt32LE(off + 4);
    if (id === 'data') {
      off += 8;
      break;
    }
    off += 8 + size + (size & 1);
  }
  const n = Math.max(0, Math.floor((stdout.length - off) / 4));
  const mid = new Float32Array(n);
  const side = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const l = stdout.readInt16LE(off + i * 4) / 32768;
    const r = stdout.readInt16LE(off + i * 4 + 2) / 32768;
    mid[i] = (l + r) / 2;
    side[i] = (l - r) / 2;
  }
  return { mid, side };
}

// ---- DSP -------------------------------------------------------------------------------

function fft(re: Float64Array, im: Float64Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wr = Math.cos(ang);
    const wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1;
      let ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * cr - im[b] * ci;
        const ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
        const t = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = t;
      }
    }
  }
}

interface Spectral {
  frames: number;
  onset: Float32Array;
  /** 300–3400 Hz band energy per frame */
  speechBand: Float32Array;
  rmsDb: Float32Array;
  /** side/mid energy in 300–3400 Hz over the clip (0 = mono) */
  sideRatio: number;
  /** spectral flatness of the centre estimate max(0,|M|−|S|) in 100–1000 Hz, per frame */
  centerFlat: Float32Array;
}

function spectral(x: Float32Array, side?: Float32Array): Spectral {
  const frames = Math.max(0, Math.floor((x.length - NFFT) / HOP) + 1);
  const win = new Float64Array(NFFT);
  for (let i = 0; i < NFFT; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / NFFT);
  const nb = 40;
  const fmin = 30;
  const fmax = 8000;
  const edges: number[] = [];
  for (let b = 0; b <= nb; b++) edges.push(Math.round(((fmin * Math.pow(fmax / fmin, b / nb)) * NFFT) / SR));
  const sp0 = Math.round((300 * NFFT) / SR);
  const sp1 = Math.round((3400 * NFFT) / SR);
  const onset = new Float32Array(frames);
  const speechBand = new Float32Array(frames);
  const rmsDb = new Float32Array(frames);
  let prev = new Float64Array(nb);
  const cur = new Float64Array(nb);
  const re = new Float64Array(NFFT);
  const im = new Float64Array(NFFT);
  const sre = new Float64Array(NFFT);
  const sim = new Float64Array(NFFT);
  const c0 = Math.round((100 * NFFT) / SR);
  const c1 = Math.round((1000 * NFFT) / SR);
  const centerFlat = new Float32Array(frames);
  let midE = 0;
  let sideE = 0;
  for (let f = 0; f < frames; f++) {
    const o = f * HOP;
    let e = 0;
    for (let i = 0; i < NFFT; i++) {
      const v = x[o + i];
      e += v * v;
      re[i] = v * win[i];
      im[i] = 0;
    }
    rmsDb[f] = 10 * Math.log10(e / NFFT + 1e-12);
    fft(re, im);
    let sb = 0;
    for (let k = sp0; k <= sp1; k++) sb += re[k] * re[k] + im[k] * im[k];
    speechBand[f] = sb;
    midE += sb;
    if (side) {
      for (let i = 0; i < NFFT; i++) {
        sre[i] = side[o + i] * win[i];
        sim[i] = 0;
      }
      fft(sre, sim);
      for (let k = sp0; k <= sp1; k++) sideE += sre[k] * sre[k] + sim[k] * sim[k];
      // centre-panned content (voice-over is almost always dead centre, music beds are wide)
      let lg = 0;
      let lin = 0;
      for (let k = c0; k <= c1; k++) {
        const c = Math.max(0, Math.hypot(re[k], im[k]) - Math.hypot(sre[k], sim[k]));
        lg += Math.log(c + 1e-9);
        lin += c;
      }
      const nk = c1 - c0 + 1;
      centerFlat[f] = Math.exp(lg / nk) / (lin / nk + 1e-9);
    }
    let flux = 0;
    for (let b = 0; b < nb; b++) {
      const k0 = Math.max(1, edges[b]);
      const k1 = Math.max(k0 + 1, edges[b + 1]);
      let s = 0;
      for (let k = k0; k < k1; k++) s += re[k] * re[k] + im[k] * im[k];
      cur[b] = 10 * Math.log10(s / (k1 - k0) + 1e-10);
      if (f > 0) flux += Math.max(0, cur[b] - prev[b]);
    }
    onset[f] = flux / nb;
    prev = Float64Array.from(cur);
  }
  // remove slow trend so sustained loudness changes do not read as onsets
  const half = Math.round(FR * 0.25);
  const detr = new Float32Array(frames);
  let acc = 0;
  const pre: number[] = [0];
  for (let f = 0; f < frames; f++) pre.push((acc += onset[f]));
  for (let f = 0; f < frames; f++) {
    const a = Math.max(0, f - half);
    const b = Math.min(frames, f + half + 1);
    detr[f] = Math.max(0, onset[f] - (pre[b] - pre[a]) / (b - a));
  }
  return { frames, onset: detr, speechBand, rmsDb, sideRatio: midE > 0 ? sideE / midE : 0, centerFlat };
}

function tempo(onset: Float32Array): { bpm: number | null; conf: number; lag: number } {
  const n = onset.length;
  if (n < FR * 3) return { bpm: null, conf: 0, lag: 0 };
  let mean = 0;
  for (const v of onset) mean += v;
  mean /= n;
  const x = Float64Array.from(onset, (v) => v - mean);
  let ac0 = 0;
  for (let i = 0; i < n; i++) ac0 += x[i] * x[i];
  if (ac0 <= 0) return { bpm: null, conf: 0, lag: 0 };
  const minLag = Math.floor((60 * FR) / 180);
  const maxLag = Math.ceil((60 * FR) / 70);
  const ac = new Float64Array(maxLag + 2);
  for (let L = minLag - 1; L <= maxLag + 1 && L < n; L++) {
    let s = 0;
    for (let i = 0; i + L < n; i++) s += x[i] * x[i + L];
    ac[L] = s / ac0;
  }
  let best = -Infinity;
  let bl = 0;
  for (let L = minLag; L <= maxLag && L < n; L++) {
    const bpm = (60 * FR) / L;
    const w = Math.exp(-0.5 * Math.pow(Math.log2(bpm / 120) / 0.8, 2));
    const v = ac[L] * w;
    if (v > best) {
      best = v;
      bl = L;
    }
  }
  if (!bl || ac[bl] <= 0) return { bpm: null, conf: 0, lag: 0 };
  const a = ac[bl - 1];
  const b = ac[bl];
  const c = ac[bl + 1];
  const den = a - 2 * b + c;
  const lag = den < 0 ? bl + (0.5 * (a - c)) / den : bl;
  return { bpm: r2((60 * FR) / lag), conf: r3(Math.max(0, ac[bl])), lag };
}

function beatTrack(onset: Float32Array, lag: number): number[] {
  const n = onset.length;
  if (!lag || n < lag * 2) return [];
  let sd = 0;
  let mean = 0;
  for (const v of onset) mean += v;
  mean /= n;
  for (const v of onset) sd += (v - mean) ** 2;
  sd = Math.sqrt(sd / n) || 1;
  // local score: onset smoothed with a gaussian ~ period/32 wide
  const sig = lag / 32;
  const R = Math.ceil(lag);
  const k: number[] = [];
  for (let i = -R; i <= R; i++) k.push(Math.exp(-0.5 * ((i * 32) / lag) ** 2));
  void sig;
  const local = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = -R; j <= R; j++) {
      const t = i + j;
      if (t >= 0 && t < n) s += (onset[t] / sd) * k[j + R];
    }
    local[i] = s;
  }
  const tight = 100;
  const cum = new Float64Array(n);
  const back = new Int32Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    let best = -Infinity;
    let bj = -1;
    const lo = Math.max(0, Math.round(i - 2 * lag));
    const hi = Math.min(i - 1, Math.round(i - lag / 2));
    for (let j = lo; j <= hi; j++) {
      const pen = -tight * Math.log((i - j) / lag) ** 2;
      const v = cum[j] + pen;
      if (v > best) {
        best = v;
        bj = j;
      }
    }
    cum[i] = local[i] + (bj >= 0 ? best : 0);
    back[i] = bj;
  }
  // last beat: best cumulative score in the final period
  let last = n - 1;
  let bv = -Infinity;
  for (let i = Math.max(0, Math.floor(n - lag)); i < n; i++)
    if (cum[i] > bv) {
      bv = cum[i];
      last = i;
    }
  const beats: number[] = [];
  for (let i = last; i >= 0; i = back[i]) beats.unshift(i);
  // trim weak beats at both ends (silence before/after the music)
  let rms = 0;
  for (const b of beats) rms += local[b] ** 2;
  rms = Math.sqrt(rms / Math.max(1, beats.length));
  const thr = 0.5 * rms;
  while (beats.length && local[beats[0]] < thr) beats.shift();
  while (beats.length && local[beats[beats.length - 1]] < thr) beats.pop();
  return beats;
}

function strongOnsets(onset: Float32Array, max = 60): number[] {
  const n = onset.length;
  const sorted = Float32Array.from(onset).sort();
  const p90 = sorted[Math.floor(n * 0.9)] ?? 0;
  const p50 = sorted[Math.floor(n * 0.5)] ?? 0;
  const thr = Math.max(p90, p50 * 4, 0.5);
  const peaks: { f: number; v: number }[] = [];
  const w = Math.round(FR * 0.06);
  for (let i = 1; i < n - 1; i++) {
    if (onset[i] < thr) continue;
    let isMax = true;
    for (let j = Math.max(0, i - w); j <= Math.min(n - 1, i + w); j++)
      if (onset[j] > onset[i]) {
        isMax = false;
        break;
      }
    if (isMax) peaks.push({ f: i, v: onset[i] });
  }
  return peaks
    .sort((a, b) => b.v - a.v)
    .slice(0, max)
    .map((p) => r3(p.f / FR + NFFT / 2 / SR))
    .sort((a, b) => a - b);
}

/** Energy modulation at syllable rate (3–6 Hz) relative to 0.5–16 Hz in the speech band. */
function speechScore(sp: Spectral, activeMask: Uint8Array): number {
  const win = Math.round(FR * 2);
  const hop = Math.round(FR);
  const scores: number[] = [];
  for (let s = 0; s + win <= sp.frames; s += hop) {
    let act = 0;
    for (let i = s; i < s + win; i++) act += activeMask[i];
    if (act < win * 0.6) continue;
    let mean = 0;
    for (let i = s; i < s + win; i++) mean += Math.sqrt(sp.speechBand[i]);
    mean /= win;
    if (mean <= 0) continue;
    const env = new Float64Array(win);
    for (let i = 0; i < win; i++) env[i] = Math.sqrt(sp.speechBand[s + i]) / mean - 1;
    let num = 0;
    let den = 0;
    for (let k = 1; k < win / 2; k++) {
      const f = (k * FR) / win;
      if (f < 0.5 || f > 16) continue;
      let re = 0;
      let im = 0;
      for (let i = 0; i < win; i++) {
        re += env[i] * Math.cos((2 * Math.PI * k * i) / win);
        im -= env[i] * Math.sin((2 * Math.PI * k * i) / win);
      }
      const p = re * re + im * im;
      den += p;
      if (f >= 3 && f <= 6) num += p;
    }
    if (den > 0) scores.push(num / den);
  }
  if (!scores.length) return 0;
  scores.sort((a, b) => a - b);
  return r3(scores[Math.floor(scores.length / 2)]);
}

export function analyzePcm(x: Float32Array, side?: Float32Array) {
  const sp = spectral(x, side);
  const dur = x.length / SR;
  // silence on 10 ms hops
  const silence: [number, number][] = [];
  const active = new Uint8Array(sp.frames);
  for (let f = 0; f < sp.frames; f++) active[f] = sp.rmsDb[f] > -50 ? 1 : 0;
  let runStart = -1;
  for (let f = 0; f <= sp.frames; f++) {
    const silent = f < sp.frames && !active[f];
    if (silent && runStart < 0) runStart = f;
    if (!silent && runStart >= 0) {
      const t0 = runStart / FR;
      const t1 = f === sp.frames ? dur : (f * HOP + NFFT / 2) / SR;
      if (t1 - t0 >= 0.3) silence.push([r2(t0), r2(t1)]);
      runStart = -1;
    }
  }
  if (!sp.frames) silence.push([0, r2(dur)]);
  const activeRatio = sp.frames ? active.reduce((a, b) => a + b, 0) / sp.frames : 0;
  const t = tempo(sp.onset);
  const beatFrames = t.bpm ? beatTrack(sp.onset, t.lag) : [];
  const beats = beatFrames.map((f) => r3(f / FR + NFFT / 2 / SR));
  // downbeat guess: the phase of 4 with the strongest onsets (same idea as librosa-free tools)
  let downbeats: number[] = [];
  if (beatFrames.length >= 8) {
    let bestPh = 0;
    let bestV = -Infinity;
    for (let ph = 0; ph < 4; ph++) {
      let v = 0;
      for (let i = ph; i < beatFrames.length; i += 4) v += sp.onset[beatFrames[i]];
      if (v > bestV) {
        bestV = v;
        bestPh = ph;
      }
    }
    downbeats = beats.filter((_, i) => i % 4 === bestPh);
  }
  // music: mostly active audio that is either pulsed or continuous
  let loudFrames = 0;
  const med = (() => {
    const a = Array.from(sp.rmsDb).filter((_, i) => active[i]).sort((p, q) => p - q);
    return a.length ? a[Math.floor(a.length / 2)] : -100;
  })();
  for (let f = 0; f < sp.frames; f++) if (active[f] && sp.rmsDb[f] > med - 15) loudFrames++;
  const steady = activeRatio > 0 ? loudFrames / Math.max(1, active.reduce((a, b) => a + b, 0)) : 0;
  const speech = speechScore(sp, active);
  // voice-over heuristic, calibrated on 28 references against whisper (9/10 VO found, 0/18 false):
  // stereo mixes → centred broadband content in 100–1000 Hz + syllable-rate modulation;
  // mono → modulation and pauses only (weak).
  const env = Array.from(sp.speechBand, (v) => Math.sqrt(v));
  const p20 = [...env].sort((a, b) => a - b)[Math.floor(env.length * 0.2)] ?? 0;
  const flats = Array.from(sp.centerFlat).filter((_, i) => env[i] > p20).sort((a, b) => a - b);
  const centerFlat = flats.length ? flats[Math.floor(flats.length / 2)] : 0;
  let lef = 0;
  if (env.length) {
    const sm = env.map((_, i) => {
      let s = 0;
      let c = 0;
      for (let k = Math.max(0, i - 4); k <= Math.min(env.length - 1, i + 4); k++, c++) s += env[k];
      return s / c;
    });
    const mean = sm.reduce((a, b) => a + b, 0) / sm.length;
    lef = sm.filter((v) => v < 0.5 * mean).length / sm.length;
  }
  const stereo = sp.sideRatio >= 0.008;
  const voLikely = stereo
    ? sp.sideRatio < 0.2 && centerFlat >= 0.005 && speech >= 0.24
    : speech >= 0.3 && lef <= 0.6 && activeRatio >= 0.3;
  // pulsed, or continuous, or a wide stereo bed that plays most of the time (SFX and VO sit near the centre)
  const hasMusic = activeRatio >= 0.4 && (t.conf >= 0.12 || steady >= 0.9 || (sp.sideRatio >= 0.15 && activeRatio >= 0.6));
  return {
    dur,
    silence,
    active_ratio: r2(activeRatio),
    bpm: hasMusic && t.conf >= 0.05 ? t.bpm : null,
    bpm_confidence: t.conf,
    beats: hasMusic && t.conf >= 0.05 ? beats : [],
    downbeats: hasMusic && t.conf >= 0.05 ? downbeats : [],
    onsets: activeRatio > 0 ? strongOnsets(sp.onset) : [],
    has_music: hasMusic,
    speech_score: speech,
    steady: r2(steady),
    vo_likely: voLikely,
    vo_evidence: { stereo, side_ratio: r3(sp.sideRatio), center_flatness: r3(centerFlat), syllable_modulation: speech, low_energy_frac: r3(lef), steady: r2(steady) },
  };
}

// ---- whisper ----------------------------------------------------------------------------

function spawnOk(cmd: string, args: string[], timeoutMs: number): Promise<{ code: number; err: string }> {
  return new Promise((resolve, reject) => {
    const c = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    const timer = setTimeout(() => c.kill('SIGKILL'), timeoutMs);
    c.stderr!.on('data', (d: Buffer) => (err = (err + d.toString()).slice(-8000)));
    c.on('error', (e) => {
      clearTimeout(timer);
      reject(e);
    });
    c.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? -1, err });
    });
  });
}

const HALLUCINATION = /^\s*([[(♪*].*|\s*|thank you\.?|thanks for watching!?|you)\s*$/i;

export async function transcribe(tools: Tools, input: string, cfg: WhisperConfig): Promise<Transcript> {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lf-ref-'));
  try {
    const wav = path.join(tmp, 'a.wav');
    await run(tools.ffmpeg, ['-v', 'error', '-nostdin', '-y', '-i', input, '-vn', '-ac', '1', '-ar', '16000', '-c:a', 'pcm_s16le', wav]);
    const base = path.join(tmp, 'out');
    const args = ['-m', cfg.model, '-f', wav, '-oj', '-of', base, '-np', '-l', cfg.language ?? 'auto', '-t', String(cfg.threads ?? 4)];
    if (cfg.vadModel) args.push('--vad', '-vm', cfg.vadModel);
    const r = await spawnOk(cfg.bin, args, 300000);
    if (r.code !== 0) throw new Error(`whisper failed (${r.code}): ${r.err.trim().split('\n').slice(-3).join(' ')}`);
    const j = JSON.parse(fs.readFileSync(`${base}.json`, 'utf8'));
    const segs: Transcript['segments'] = (j.transcription ?? [])
      .map((s: any) => ({ t0: r2((s.offsets?.from ?? 0) / 1000), t1: r2((s.offsets?.to ?? 0) / 1000), text: String(s.text ?? '').trim() }))
      .filter((s: { text: string }) => s.text && !HALLUCINATION.test(s.text));
    const text = segs.map((s) => s.text).join(' ').replace(/\s+/g, ' ').trim();
    return {
      engine: 'whisper.cpp',
      model: path.basename(cfg.model),
      language: j.result?.language ?? null,
      text,
      words: text ? text.split(/\s+/).length : 0,
      segments: segs,
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

export async function audioFacts(
  tools: Tools,
  input: string,
  hasAudio: boolean,
  duration: number,
  whisper?: WhisperConfig | null,
): Promise<{ facts: AudioFacts; transcript: Transcript | null }> {
  const method = {
    loudness: 'ffmpeg loudnorm analysis (EBU R128 integrated, true peak)',
    tempo: 'spectral-flux onset envelope, autocorrelation with a log-normal prior at 120 BPM, Ellis DP beat tracker (own code)',
    speech: whisper
      ? 'whisper.cpp transcript with VAD decides has_vo; has_vo_heuristic kept for comparison'
      : 'heuristic: centred broadband content (mid/side) + 3–6 Hz syllable modulation; mono mixes are a weak guess',
  };
  if (!hasAudio) {
    return {
      facts: {
        has_audio: false,
        integrated_lufs: null,
        true_peak: null,
        lra: null,
        has_music: false,
        bpm: null,
        bpm_confidence: 0,
        beats: [],
        downbeats: [],
        onsets: [],
        has_vo: false,
        has_vo_source: 'none',
        speech_score: 0,
        has_vo_heuristic: null,
        vo_evidence: null,
        silence: [[0, r2(duration)]],
        active_ratio: 0,
        method,
      },
      transcript: null,
    };
  }
  const [ld, pcm] = await Promise.all([loudness(tools, input), decodeMidSide(tools, input)]);
  const a = analyzePcm(pcm.mid, pcm.side);
  let transcript: Transcript | null = null;
  let hasVo = a.vo_likely;
  let src: AudioFacts['has_vo_source'] = 'heuristic';
  if (whisper && a.active_ratio > 0.02) {
    transcript = await transcribe(tools, input, whisper);
    const spoken = transcript.segments.reduce((s, x) => s + Math.max(0, x.t1 - x.t0), 0);
    hasVo = transcript.words >= 4 && spoken >= 1;
    src = 'whisper';
  }
  return {
    facts: {
      has_audio: true,
      ...ld,
      has_music: a.has_music,
      bpm: a.bpm,
      bpm_confidence: a.bpm_confidence,
      beats: a.beats,
      downbeats: a.downbeats,
      onsets: a.onsets,
      has_vo: hasVo,
      has_vo_source: src,
      speech_score: a.speech_score,
      has_vo_heuristic: a.vo_likely,
      vo_evidence: a.vo_evidence,
      silence: a.silence,
      active_ratio: a.active_ratio,
      method,
    },
    transcript,
  };
}
