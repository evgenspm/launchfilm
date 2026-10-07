// Shot boundaries from the per-frame stats of analyze.ts.
//
// hard  — scdet score (min(MAFD, |ΔMAFD|), same formula as ffmpeg's scdet filter) over the
//         threshold, computed on de-duplicated frames so animation on twos/threes does not
//         look like a cut every other frame.
// flash — 1–4 frames of something else (white/black flash, glitch insert) after which the
//         picture returns to what it was: an accent inside a shot, not a cut.
// soft  — a burst of motion energy lasting 3 frames … 1.5 s after which the picture is a
//         different picture (dissolve, wipe, whip, zoom-through, dip to black).
//
// Thresholds were tuned on Raylight/Jitter motion-graphics references where continuous
// animation is the norm; lower `hardThreshold` for live-action footage.

import { histDist, thumbDist, type MotionSample, type StreamStats } from './analyze.js';

export interface CutParams {
  hardThreshold: number;
  hardAssistThreshold: number;
  hardAssistHist: number;
  dupMafd: number;
  softOnMafd: number;
  softMinFrames: number;
  softMaxS: number;
  softMinDiff: number;
  softMinHist: number;
}

export const DEFAULT_CUT_PARAMS: CutParams = {
  hardThreshold: 10,
  hardAssistThreshold: 5,
  hardAssistHist: 0.3,
  dupMafd: 0.12,
  softOnMafd: 2.5,
  softMinFrames: 3,
  softMaxS: 1.5,
  softMinDiff: 10,
  softMinHist: 0.3,
};

export interface HardCut {
  t: number;
  frame: number;
  score: number;
  mafd: number;
  hist: number;
  /** thumbnail difference before/after, 0–100 */
  diff: number;
  /** 'flash' when the cut goes through a 1–4 frame flash */
  via?: 'flash';
  /** first settled frame of the new shot (differs from `frame` only for cuts via a flash) */
  frame_after?: number;
  /** clean = still before and after; in-motion = cut hidden in movement, or a very fast wipe/whip (check the image) */
  context: 'clean' | 'in-motion';
  image?: string;
}

export interface SoftTransition {
  t0: number;
  t1: number;
  frame0: number;
  frame1: number;
  diff: number;
  hist: number;
  hint: 'dissolve-or-wipe' | 'whip-or-slide' | 'zoom' | 'dip-to-black' | 'dip-to-white' | 'rotate';
  image?: string;
}

export interface Flash {
  t: number;
  frame: number;
  frames: number;
  /** luma of the flash vs before: 'white' | 'black' | 'other' */
  tone: 'white' | 'black' | 'other';
  image?: string;
}

export interface Shot {
  n: number;
  t0: number;
  t1: number;
  dur: number;
  in: 'start' | 'hard' | 'soft';
}

export interface CutsResult {
  hard: HardCut[];
  soft: SoftTransition[];
  flashes: Flash[];
  shots: Shot[];
  /** strongest sub-threshold candidates, to judge how close the call was */
  near_misses: { t: number; score: number; hist: number }[];
}

const r2 = (x: number) => Math.round(x * 100) / 100;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

export function detectCuts(s: StreamStats, p: CutParams = DEFAULT_CUT_PARAMS): CutsResult {
  const { n, fps, mafd, hd, thumbs, hists, luma } = s;
  const dup = new Uint8Array(n);
  for (let i = 1; i < n; i++) dup[i] = mafd[i] < p.dupMafd ? 1 : 0;

  // dup-aware scdet score
  const score = new Float32Array(n);
  let lastReal = -1;
  for (let i = 1; i < n; i++) {
    if (dup[i]) continue;
    const prev = lastReal >= 0 && i - lastReal <= 3 ? mafd[lastReal] : 0;
    score[i] = Math.min(mafd[i], Math.abs(mafd[i] - prev));
    lastReal = i;
  }

  // candidates
  let cands: number[] = [];
  for (let i = 1; i < n; i++) {
    if (score[i] >= p.hardThreshold || (score[i] >= p.hardAssistThreshold && hd[i] >= p.hardAssistHist)) cands.push(i);
  }
  // merge candidates closer than 2 frames, keep the strongest
  const merged: number[] = [];
  for (const i of cands) {
    const last = merged[merged.length - 1];
    if (last !== undefined && i - last <= 1) {
      if (score[i] > score[last]) merged[merged.length - 1] = i;
    } else merged.push(i);
  }
  cands = merged;

  const hard: HardCut[] = [];
  const flashes: Flash[] = [];
  const consumed = new Set<number>();
  for (let c = 0; c < cands.length; c++) {
    const i = cands[c];
    if (consumed.has(i)) continue;
    const before = i - 1;
    const jump = thumbDist(thumbs, i, before);
    // flash: picture returns to `before` within 4 frames
    let flashLen = 0;
    for (let k = 1; k <= 4 && i + k < n; k++) {
      const back = thumbDist(thumbs, i + k, before);
      if (back < Math.max(4, 0.35 * jump) && histDist(hists, i + k, before) < 0.2) {
        flashLen = k;
        break;
      }
    }
    if (flashLen) {
      const dl = luma[i] - luma[before];
      flashes.push({ t: r3(i / fps), frame: i, frames: flashLen, tone: dl > 40 ? 'white' : dl < -40 ? 'black' : 'other' });
      for (let k = 1; k <= flashLen; k++) consumed.add(i + k);
      cands.filter((j) => j > i && j <= i + flashLen).forEach((j) => consumed.add(j));
      continue;
    }
    // flash into new content: a second candidate within 4 frames → one cut through a flash
    const next = cands.find((j) => j > i && j - i <= 4);
    let via: 'flash' | undefined;
    let after = i;
    if (next !== undefined && Math.abs(luma[i] - luma[before]) > 40) {
      via = 'flash';
      after = next;
      consumed.add(next);
    }
    // settle: compare a couple of frames later so motion blur on the first frame does not count
    const settle = Math.min(n - 1, after + 2);
    let around = 0;
    for (const k of [-3, -2, -1, 1, 2, 3]) {
      const j = (k < 0 ? i : after) + k;
      if (j > 0 && j < n) around = Math.max(around, mafd[j]);
    }
    hard.push({
      t: r3(i / fps),
      frame: i,
      score: r2(score[i]),
      mafd: r2(mafd[i]),
      hist: r3(histDist(hists, settle, before)),
      diff: r2(thumbDist(thumbs, settle, before)),
      ...(via ? { via, frame_after: after } : {}),
      context: around > 0.4 * mafd[i] && around > 3 ? 'in-motion' : 'clean',
    });
  }

  // soft transitions: bursts of energy with a different picture after
  const energy = new Float32Array(n);
  for (let i = 1; i < n; i++) {
    if (!dup[i]) energy[i] = mafd[i];
    else {
      // repeat frames inherit the neighbouring real change so 15 fps animation stays continuous
      let v = 0;
      for (let k = 1; k <= 2; k++) {
        if (i - k > 0 && !dup[i - k]) v = Math.max(v, mafd[i - k]);
        if (i + k < n && !dup[i + k]) v = Math.max(v, mafd[i + k]);
      }
      energy[i] = v;
    }
  }
  const hardFrames = new Set<number>();
  for (const h of hard) for (let k = -2; k <= 4; k++) hardFrames.add(h.frame + k);
  for (const f of flashes) for (let k = -1; k <= f.frames + 1; k++) hardFrames.add(f.frame + k);
  const soft: SoftTransition[] = [];
  const maxLen = Math.round(p.softMaxS * fps);
  let i = 1;
  while (i < n) {
    if (energy[i] < p.softOnMafd) {
      i++;
      continue;
    }
    let j = i;
    let gap = 0;
    while (j + 1 < n && (energy[j + 1] >= p.softOnMafd || gap < 2)) {
      if (energy[j + 1] >= p.softOnMafd) gap = 0;
      else gap++;
      j++;
    }
    j -= gap;
    const len = j - i + 1;
    let containsHard = false;
    for (let k = i; k <= j && !containsHard; k++) if (hardFrames.has(k)) containsHard = true;
    if (len >= p.softMinFrames && len <= maxLen && !containsHard) {
      const b = Math.max(0, i - 1);
      const a = Math.min(n - 1, j + 1);
      const diff = thumbDist(thumbs, a, b);
      const hist = histDist(hists, a, b);
      if (diff >= p.softMinDiff && hist >= p.softMinHist) {
        let minL = 255;
        let maxL = 0;
        for (let k = i; k <= j; k++) {
          minL = Math.min(minL, luma[k]);
          maxL = Math.max(maxL, luma[k]);
        }
        soft.push({
          t0: r3(i / fps),
          t1: r3((j + 1) / fps),
          frame0: i,
          frame1: j + 1,
          diff: r2(diff),
          hist: r3(hist),
          hint: softHint(s.motion, i / fps, (j + 1) / fps, s.aw, minL, maxL, luma[b], luma[a]),
        });
      }
    }
    i = j + 1;
  }

  // shots
  const bounds: { t: number; kind: 'hard' | 'soft' }[] = [
    ...hard.map((h) => ({ t: h.t, kind: 'hard' as const })),
    ...soft.map((x) => ({ t: r3((x.t0 + x.t1) / 2), kind: 'soft' as const })),
  ].sort((a, b) => a.t - b.t);
  const end = r3(n / fps);
  const shots: Shot[] = [];
  let t0 = 0;
  let kind: Shot['in'] = 'start';
  for (const bd of bounds) {
    if (bd.t - t0 < 0.05) continue;
    shots.push({ n: shots.length + 1, t0, t1: bd.t, dur: r2(bd.t - t0), in: kind });
    t0 = bd.t;
    kind = bd.kind;
  }
  shots.push({ n: shots.length + 1, t0, t1: end, dur: r2(end - t0), in: kind });

  const isEvent = new Set<number>([...hard.map((h) => h.frame), ...flashes.map((f) => f.frame)]);
  const near_misses = Array.from(score.entries())
    .filter(([k, v]) => v >= 3 && !isEvent.has(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, v]) => ({ t: r3(k / fps), score: r2(v), hist: r3(hd[k]) }))
    .sort((a, b) => a.t - b.t);

  return { hard, soft, flashes, shots, near_misses };
}

function softHint(
  motion: MotionSample[],
  t0: number,
  t1: number,
  aw: number,
  minL: number,
  maxL: number,
  lb: number,
  la: number,
): SoftTransition['hint'] {
  if (minL < 12 && lb > 25 && la > 25) return 'dip-to-black';
  if (maxL > 240 && lb < 215 && la < 215) return 'dip-to-white';
  const ms = motion.filter((m) => m.t > t0 - 0.05 && m.t <= t1 + 0.05 && m.textured >= 4 && m.inliers >= Math.max(3, m.textured * 0.4));
  if (ms.length) {
    const k = 1920 / aw;
    const pan = Math.max(...ms.map((m) => (Math.hypot(m.tx, m.ty) * k) / m.dt));
    const zoom = Math.max(...ms.map((m) => Math.abs(Math.log(1 + m.a)) / m.dt));
    const rot = Math.max(...ms.map((m) => Math.abs(Math.atan2(m.b, 1 + m.a)) / m.dt));
    if (pan > 1500) return 'whip-or-slide';
    if (zoom > 0.6) return 'zoom';
    if (rot > 0.5) return 'rotate';
  }
  return 'dissolve-or-wipe';
}

export interface MotionSecond {
  t0: number;
  t1: number;
  /** mean MAFD over the second, 0–100: 0 = frozen, >5 = a lot moving */
  diff: number;
  /** share of frames identical to the previous one */
  repeat: number;
  /** global content motion, px/s in 1920-wide units (x right, y down) */
  pan: [number, number];
  /** scale change per second, % (positive = content grows = push-in) */
  zoom_pct: number;
  rot_deg: number;
  /** share of textured blocks that follow the global model (how "camera-like" the motion is) */
  coherence: number;
  label: 'hold' | 'camera-pan' | 'camera-zoom' | 'camera-rotate' | 'camera-mixed' | 'animation' | 'cut';
}

export function summarizeMotion(s: StreamStats, cuts: CutsResult, dupMafd = DEFAULT_CUT_PARAMS.dupMafd): MotionSecond[] {
  const out: MotionSecond[] = [];
  const secs = Math.ceil(s.n / s.fps - 1e-6);
  const k = 1920 / s.aw;
  for (let sec = 0; sec < secs; sec++) {
    const f0 = Math.round(sec * s.fps);
    const f1 = Math.min(s.n, Math.round((sec + 1) * s.fps));
    let sum = 0;
    let rep = 0;
    let cnt = 0;
    for (let i = Math.max(1, f0); i < f1; i++) {
      sum += s.mafd[i];
      if (s.mafd[i] < dupMafd) rep++;
      cnt++;
    }
    const diff = cnt ? sum / cnt : 0;
    const ms = s.motion.filter((m) => m.t > sec && m.t <= sec + 1);
    const good = ms.filter((m) => m.textured >= 4);
    let tx = 0;
    let ty = 0;
    let lz = 0;
    let rot = 0;
    let coh = 0;
    if (good.length) {
      const med = (xs: number[]) => {
        const v = [...xs].sort((a, b) => a - b);
        return v[Math.floor(v.length / 2)];
      };
      tx = (med(good.map((m) => m.tx / m.dt)) ?? 0) * k;
      ty = (med(good.map((m) => m.ty / m.dt)) ?? 0) * k;
      lz = med(good.map((m) => Math.log(1 + m.a) / m.dt)) ?? 0;
      rot = med(good.map((m) => Math.atan2(m.b, 1 + m.a) / m.dt)) ?? 0;
      coh = good.reduce((a, m) => a + m.inliers / Math.max(1, m.textured), 0) / good.length;
    }
    const zoomPct = (Math.exp(lz) - 1) * 100;
    const rotDeg = (rot * 180) / Math.PI;
    const hasCut = cuts.hard.some((h) => h.t >= sec && h.t < sec + 1);
    let label: MotionSecond['label'];
    const panMag = Math.hypot(tx, ty);
    const camPan = panMag > 15;
    const camZoom = Math.abs(zoomPct) > 0.6;
    const camRot = Math.abs(rotDeg) > 1;
    const coherent = coh >= 0.5 && good.length >= Math.max(2, ms.length / 2);
    if (coherent && (camPan || camZoom || camRot)) {
      const n = Number(camPan) + Number(camZoom) + Number(camRot);
      label = n > 1 ? 'camera-mixed' : camPan ? 'camera-pan' : camZoom ? 'camera-zoom' : 'camera-rotate';
    } else if (diff < 0.25) label = 'hold';
    else label = 'animation';
    if (hasCut && label !== 'hold') label = label === 'animation' ? 'cut' : label;
    out.push({
      t0: sec,
      t1: Math.min(sec + 1, r3(s.n / s.fps)),
      diff: r2(diff),
      repeat: r2(cnt ? rep / cnt : 0),
      pan: [Math.round(tx), Math.round(ty)],
      zoom_pct: r2(zoomPct),
      rot_deg: r2(rotDeg),
      coherence: r2(coh),
      label,
    });
  }
  return out;
}
