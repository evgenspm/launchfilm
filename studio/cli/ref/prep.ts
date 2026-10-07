// prepVideo: one reference video → <out>/<refId>/ with everything an agent needs to study it
// without watching it: meta.json, preview.mp4, sheets/, cuts.json + cuts/, keyframes/,
// motion.json, audio.json, transcript.json (optional), summary.md.
//
// Idempotent: each step records the source size/mtime, its own version and options in
// .prep.json and is skipped when nothing changed and its outputs exist.

import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { resolveTools, run, type ToolOptions, type Tools } from './ffmpeg.js';
import { probe, slugify, type Meta, type ProbeInfo } from './probe.js';
import { runVisual, writeJson } from './visual.js';
import { audioFacts, type AudioFacts, type Transcript, type WhisperConfig } from './audio.js';
import type { CutParams } from './cuts.js';

export const PREP_VERSION = 1;
const STEP_VERSION = { meta: 2, preview: 1, visual: 2, audio: 3, summary: 3 } as const;
type Step = keyof typeof STEP_VERSION;

export interface PrepOptions extends ToolOptions {
  /** parent folder; results go to <out>/<refId>/ */
  out: string;
  refId?: string;
  force?: boolean;
  /** contact-sheet sampling rate (default 4) */
  sheetFps?: number;
  /** keyframe cap (default 60, 1 per second below that) */
  keyframeCap?: number;
  /** skip the preview transcode */
  noPreview?: boolean;
  whisper?: WhisperConfig | null;
  cutParams?: Partial<CutParams>;
  /** extra facts stored in meta.json (title, url, author…) */
  source?: Record<string, unknown>;
  log?: (msg: string) => void;
}

export interface PrepResult {
  refId: string;
  dir: string;
  meta: Meta;
  ran: Step[];
  skipped: Step[];
  timings: Partial<Record<Step | 'total', number>>;
  counts: { sheets: number; keyframes: number; hard: number; soft: number; flashes: number; shots: number };
  audio: Pick<AudioFacts, 'has_music' | 'bpm' | 'has_vo' | 'integrated_lufs'> | null;
}

interface Stamp {
  version: number;
  source: { path: string; size: number; mtimeMs: number };
  steps: Partial<Record<Step, { v: number; opts: string; ms: number; at: string; data?: any }>>;
}

const OUTPUTS: Record<Step, string[]> = {
  meta: ['meta.json'],
  preview: ['preview.mp4'],
  visual: ['sheets', 'cuts.json', 'cuts', 'keyframes', 'motion.json'],
  audio: ['audio.json'],
  summary: ['summary.md'],
};

const hash = (x: unknown) => createHash('sha1').update(JSON.stringify(x ?? null)).digest('hex').slice(0, 12);

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

async function makePreview(tools: Tools, input: string, info: ProbeInfo, file: string) {
  const tmp = `${file}.tmp.mp4`;
  const short = Math.min(info.width, info.height);
  const copyable =
    info.video_codec === 'h264' && (info.pix_fmt === 'yuv420p' || info.pix_fmt === 'yuvj420p') && short <= 720 && info.rotation === 0;
  const audio = info.has_audio ? (info.audio_codec === 'aac' ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '128k']) : ['-an'];
  const base = ['-v', 'error', '-nostdin', '-y', '-i', input, '-map', '0:v:0', '-map', '0:a:0?', '-sn', '-dn'];
  if (copyable) {
    await run(tools.ffmpeg, [...base, '-c:v', 'copy', ...audio, '-movflags', '+faststart', tmp]);
  } else {
    const s = short > 720 ? 720 / short : 1;
    const w = Math.max(2, Math.round((info.width * s) / 2) * 2);
    const h = Math.max(2, Math.round((info.height * s) / 2) * 2);
    const enc = ['-vf', `scale=${w}:${h}`, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ...audio];
    try {
      await run(tools.ffmpeg, [...base, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', ...enc, tmp]);
    } catch {
      await run(tools.ffmpeg, [...base, '-c:v', 'h264_videotoolbox', '-b:v', '3M', ...enc, tmp]);
    }
  }
  fs.renameSync(tmp, file);
}

function summaryMd(dir: string, meta: Meta, src: Record<string, unknown> | undefined): string {
  const cuts = readJson<any>(path.join(dir, 'cuts.json'));
  const audio = readJson<AudioFacts>(path.join(dir, 'audio.json'));
  const motion = readJson<any>(path.join(dir, 'motion.json'));
  const tr = readJson<Transcript>(path.join(dir, 'transcript.json'));
  const ls = (d: string) => (fs.existsSync(path.join(dir, d)) ? fs.readdirSync(path.join(dir, d)).filter((f) => f.endsWith('.jpg')).sort() : []);
  const sheets = ls('sheets');
  const L: string[] = [];
  L.push(`# ${meta.ref_id}${src?.title ? ` · ${src.title}` : ''}`);
  L.push('');
  L.push(
    `${meta.duration_s} s · ${meta.width}×${meta.height} (${meta.aspect}) · ${meta.fps} fps · audio: ${
      meta.has_audio ? (audio ? `${audio.has_music ? `music${audio.bpm ? ` ~${audio.bpm} BPM` : ''}` : 'no music'}${audio.has_vo ? ', voice-over' : ''}, ${audio.integrated_lufs ?? '–'} LUFS` : 'yes') : 'none'
    }`,
  );
  if (src?.url) L.push(`Source: ${src.url}${src.author ? ` (by ${src.author})` : ''}`);
  L.push('');
  L.push('Read in this order: this file → sheets/ (4×4 tiles, 4 per second, timestamp on every tile, red = hard cut since previous tile, amber = soft transition) → cuts/ (before | after) → keyframes/ (full-res, 1/s) → motion.json, audio.json.');
  L.push('');
  if (cuts) {
    L.push(`## Shots (${cuts.counts.shots}) · ${cuts.counts.hard} hard cuts · ${cuts.counts.soft} soft transitions · ${cuts.counts.flashes} flashes`);
    L.push('');
    L.push('A scaffold, not the truth: camera moves that change the subject, morphs and dissolves between very dark or low-contrast scenes are not counted. Split shots wherever the sheets show a new state.');
    L.push('');
    L.push('| # | t0–t1 s | dur | enters by |');
    L.push('|---|---|---|---|');
    for (const s of cuts.shots) L.push(`| ${s.n} | ${s.t0.toFixed(2)}–${s.t1.toFixed(2)} | ${s.dur.toFixed(2)} | ${s.in} |`);
    if (cuts.soft.length) {
      L.push('');
      L.push('Soft: ' + cuts.soft.map((x: any) => `${x.t0.toFixed(2)}–${x.t1.toFixed(2)} ${x.hint}`).join(' · '));
    }
    if (cuts.flashes.length) L.push('Flashes: ' + cuts.flashes.map((x: any) => `${x.t.toFixed(2)} (${x.frames} fr, ${x.tone})`).join(' · '));
    L.push('');
  }
  if (motion?.seconds?.length) {
    L.push('## Motion per second');
    L.push('');
    L.push('`t  label  diff  pan(px/s @1920)  zoom%/s  coherence`');
    L.push('```');
    for (const m of motion.seconds)
      L.push(`${String(m.t0).padStart(3)}  ${m.label.padEnd(13)} ${m.diff.toFixed(1).padStart(5)}  ${`${m.pan[0]},${m.pan[1]}`.padStart(10)}  ${m.zoom_pct.toFixed(1).padStart(6)}  ${m.coherence.toFixed(2)}`);
    L.push('```');
    L.push('');
  }
  if (audio?.has_audio) {
    L.push('## Audio');
    L.push('');
    L.push(`- loudness ${audio.integrated_lufs ?? '–'} LUFS I, true peak ${audio.true_peak ?? '–'} dBTP, active ${Math.round(audio.active_ratio * 100)} %`);
    if (audio.bpm) L.push(`- tempo ~${audio.bpm} BPM (confidence ${audio.bpm_confidence}); ${audio.beats.length} beats, first ${audio.beats.slice(0, 4).join(', ')} …`);
    if (audio.silence.length) L.push(`- silence: ${audio.silence.map(([a, b]) => `${a}–${b}`).join(', ')}`);
    if (audio.onsets.length) L.push(`- strongest onsets: ${audio.onsets.slice(0, 24).join(', ')}`);
    L.push(`- voice-over: ${audio.has_vo ? 'yes' : 'no'} (${audio.has_vo_source}${audio.has_vo_source === 'whisper' && audio.has_vo_heuristic !== null ? `; heuristic says ${audio.has_vo_heuristic ? 'yes' : 'no'}` : ''})`);
    L.push('');
  }
  if (tr?.text) {
    L.push('## Transcript (whisper)');
    L.push('');
    for (const s of tr.segments) L.push(`- ${s.t0.toFixed(2)}–${s.t1.toFixed(2)} ${s.text}`);
    L.push('');
  }
  L.push(`## Files`);
  L.push('');
  L.push(`sheets: ${sheets.join(', ') || '–'}`);
  L.push(`cuts: ${ls('cuts').join(', ') || '–'}`);
  L.push(`keyframes: ${ls('keyframes').length} files (kf-<seconds>.jpg)`);
  return L.join('\n') + '\n';
}

export async function prepVideo(input: string, opts: PrepOptions): Promise<PrepResult> {
  const t0 = Date.now();
  const log = opts.log ?? (() => {});
  const file = path.resolve(input);
  const st = fs.statSync(file);
  const refId = opts.refId ?? slugify(path.basename(file));
  const dir = path.join(path.resolve(opts.out), refId);
  fs.mkdirSync(dir, { recursive: true });
  const tools = resolveTools(opts);
  const stampFile = path.join(dir, '.prep.json');
  const source = { path: file, size: st.size, mtimeMs: Math.round(st.mtimeMs) };
  let stamp = readJson<Stamp>(stampFile);
  if (!stamp || stamp.version !== PREP_VERSION || stamp.source.size !== source.size || stamp.source.mtimeMs !== source.mtimeMs || opts.force) {
    stamp = { version: PREP_VERSION, source, steps: {} };
  }
  stamp.source = source;
  const save = () => writeJson(stampFile, stamp);
  const sheetFps = opts.sheetFps ?? 4;
  const keyframeCap = opts.keyframeCap ?? 60;
  const stepOpts: Record<Step, unknown> = {
    meta: { refId, src: opts.source ?? null },
    preview: { noPreview: !!opts.noPreview },
    visual: { refId, sheetFps, keyframeCap, cut: opts.cutParams ?? null },
    audio: { whisper: opts.whisper ? { model: path.basename(opts.whisper.model), vad: !!opts.whisper.vadModel, lang: opts.whisper.language ?? 'auto' } : null },
    summary: {},
  };
  const fresh = (s: Step) => {
    const e = stamp!.steps[s];
    if (!e || e.v !== STEP_VERSION[s] || e.opts !== hash(stepOpts[s])) return false;
    if (s === 'preview' && opts.noPreview) return true;
    return OUTPUTS[s].every((o) => fs.existsSync(path.join(dir, o)));
  };
  const ran: Step[] = [];
  const skipped: Step[] = [];
  const timings: PrepResult['timings'] = {};
  const mark = (s: Step, ms: number, data?: any) => {
    stamp!.steps[s] = { v: STEP_VERSION[s], opts: hash(stepOpts[s]), ms, at: new Date().toISOString(), ...(data ? { data } : {}) };
    timings[s] = ms;
    ran.push(s);
    save();
  };

  // meta (always cheap; needed by everything)
  const info = await probe(tools, file);
  const meta: Meta = {
    ref_id: refId,
    source_file: file,
    duration_s: info.duration_s,
    fps: info.fps,
    width: info.width,
    height: info.height,
    aspect: info.aspect,
    has_audio: info.has_audio,
    ratio: info.ratio,
    frames: info.frames,
    video_codec: info.video_codec,
    pix_fmt: info.pix_fmt,
    audio_codec: info.audio_codec,
    rotation: info.rotation,
    size_bytes: info.size_bytes,
  };
  if (!fresh('meta')) {
    const t = Date.now();
    writeJson(path.join(dir, 'meta.json'), { ...meta, source_url: (opts.source?.url as string | undefined) ?? null, ...(opts.source ? { source: opts.source } : {}), prep_version: PREP_VERSION, ffmpeg: tools.source });
    mark('meta', Date.now() - t);
  } else skipped.push('meta');

  const tasks: Promise<void>[] = [];
  let visualCounts = stamp.steps.visual?.data ?? null;
  let audioBrief: PrepResult['audio'] = stamp.steps.audio?.data ?? null;

  if (!opts.noPreview && !fresh('preview')) {
    tasks.push(
      (async () => {
        const t = Date.now();
        await makePreview(tools, file, info, path.join(dir, 'preview.mp4'));
        mark('preview', Date.now() - t);
        log(`${refId}: preview ${Date.now() - t} ms`);
      })(),
    );
  } else skipped.push('preview');

  if (!fresh('visual')) {
    tasks.push(
      (async () => {
        const t = Date.now();
        const v = await runVisual(tools, file, info, dir, { refId, sheetFps, keyframeCap, cutParams: opts.cutParams });
        visualCounts = {
          sheets: v.sheets,
          keyframes: v.keyframes,
          hard: v.cuts.hard.length,
          soft: v.cuts.soft.length,
          flashes: v.cuts.flashes.length,
          shots: v.cuts.shots.length,
        };
        mark('visual', Date.now() - t, visualCounts);
        log(`${refId}: visual ${Date.now() - t} ms (${v.frames} frames)`);
      })(),
    );
  } else skipped.push('visual');

  if (!fresh('audio')) {
    tasks.push(
      (async () => {
        const t = Date.now();
        const { facts, transcript } = await audioFacts(tools, file, info.has_audio, info.duration_s, opts.whisper);
        writeJson(path.join(dir, 'audio.json'), facts);
        const tf = path.join(dir, 'transcript.json');
        if (transcript) writeJson(tf, transcript);
        else fs.rmSync(tf, { force: true });
        audioBrief = { has_music: facts.has_music, bpm: facts.bpm, has_vo: facts.has_vo, integrated_lufs: facts.integrated_lufs };
        mark('audio', Date.now() - t, audioBrief);
        log(`${refId}: audio ${Date.now() - t} ms`);
      })(),
    );
  } else skipped.push('audio');

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
  if (failed.length) throw failed[0].reason instanceof Error ? failed[0].reason : new Error(String(failed[0].reason));

  if (ran.length || !fresh('summary')) {
    const t = Date.now();
    fs.writeFileSync(path.join(dir, 'summary.md'), summaryMd(dir, meta, opts.source));
    mark('summary', Date.now() - t);
  } else skipped.push('summary');

  timings.total = Date.now() - t0;
  const vc = visualCounts ?? { sheets: 0, keyframes: 0, hard: 0, soft: 0, flashes: 0, shots: 0 };
  return { refId, dir, meta, ran, skipped, timings, counts: vc, audio: audioBrief };
}
