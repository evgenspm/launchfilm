// Reference study, mechanical half: turn any video into a folder an agent can study frame by
// frame (no LLM here). Used by `launchfilm ref add|search` and by the reference-study skill.
//
//   const r = await refAdd('clip.mp4', { out: '.harness/refs' });
//   // → .harness/refs/<id>/{meta.json, preview.mp4, sheets/, cuts.json, cuts/, keyframes/,
//   //    motion.json, audio.json, transcript.json?, summary.md}
//   const hits = refSearch('ai chat prompt family:ai-chat aspect:16:9');
//
// Needs only Node ≥ 20 and an ffmpeg (FFMPEG/FFPROBE env, PATH, or Remotion's bundled one).
// Optional transcript: set WHISPER_CPP (whisper.cpp CLI) and WHISPER_MODEL (ggml model path),
// optionally WHISPER_VAD_MODEL. Other people's videos stay local: nothing here uploads.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { prepVideo, type PrepOptions, type PrepResult } from './prep.js';
import { slugify } from './probe.js';
import type { WhisperConfig } from './audio.js';

export { prepVideo, PREP_VERSION } from './prep.js';
export type { PrepOptions, PrepResult } from './prep.js';
export { refSearch, type SearchHit, type SearchOptions } from './search.js';
export { resolveTools } from './ffmpeg.js';
export { classifyAspect, probe } from './probe.js';
export type { AudioFacts, Transcript, WhisperConfig } from './audio.js';
export type { CutsResult, CutParams, MotionSecond } from './cuts.js';

export interface RefAddOptions extends Partial<Omit<PrepOptions, 'out' | 'refId'>> {
  /** parent folder for prepared references (default ./.harness/refs) */
  out?: string;
  /** folder name; default: slug of the file name */
  id?: string;
  /** what to remember about the source (shown in summary.md, used by refSearch) */
  title?: string;
  url?: string;
  author?: string;
}

export interface RefAddResult extends PrepResult {
  /** one line for the terminal */
  line: string;
}

const shortPath = (p: string) => {
  const rel = path.relative(process.cwd(), p);
  return rel && !rel.startsWith('..') ? rel : p;
};

/** whisper.cpp from the environment, or null. Never guesses paths. */
export function whisperFromEnv(env: NodeJS.ProcessEnv = process.env): WhisperConfig | null {
  const bin = env.WHISPER_CPP;
  const model = env.WHISPER_MODEL;
  if (!bin || !model) return null;
  if (!fs.existsSync(model)) return null;
  return { bin, model, vadModel: env.WHISPER_VAD_MODEL && fs.existsSync(env.WHISPER_VAD_MODEL) ? env.WHISPER_VAD_MODEL : undefined };
}

const MEDIA_EXT = /\.(mp4|mov|m4v|webm|mkv|gif)(\?|#|$)/i;

async function download(url: string, destDir: string, log: (m: string) => void): Promise<string> {
  fs.mkdirSync(destDir, { recursive: true });
  const name = slugify(decodeURIComponent(new URL(url).pathname.split('/').pop() || 'video'));
  if (MEDIA_EXT.test(url)) {
    const ext = (MEDIA_EXT.exec(url)?.[1] ?? 'mp4').toLowerCase();
    const file = path.join(destDir, `${name}.${ext}`);
    if (fs.existsSync(file)) return file;
    log(`downloading ${url}`);
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`download failed: ${res.status} ${res.statusText}`);
    const ct = res.headers.get('content-type') ?? '';
    if (!/video|octet-stream|image\/gif/.test(ct)) throw new Error(`not a video (${ct}): ${url}`);
    fs.writeFileSync(`${file}.part`, Buffer.from(await res.arrayBuffer()));
    fs.renameSync(`${file}.part`, file);
    return file;
  }
  const ytdlp = spawnSync('yt-dlp', ['--version'], { stdio: 'ignore' });
  if (ytdlp.status !== 0) {
    throw new Error('this URL is a page, not a video file. Download the video yourself (or install yt-dlp) and pass the file path.');
  }
  const out = path.join(destDir, `${name}.%(ext)s`);
  log(`yt-dlp ${url}`);
  const r = spawnSync('yt-dlp', ['-f', 'bv*[height<=1080]+ba/b[height<=1080]/b', '--merge-output-format', 'mp4', '-o', out, url], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('yt-dlp failed');
  const got = fs.readdirSync(destDir).find((f) => f.startsWith(`${name}.`) && !f.endsWith('.part'));
  if (!got) throw new Error('yt-dlp produced no file');
  return path.join(destDir, got);
}

/**
 * Prepare one reference for study. `input` is a local video file or an http(s) URL (direct
 * video links are fetched; page URLs need yt-dlp on PATH). Safe to re-run: unchanged steps
 * are skipped.
 */
export async function refAdd(input: string, opts: RefAddOptions = {}): Promise<RefAddResult> {
  const out = path.resolve(opts.out ?? path.join('.harness', 'refs'));
  const log = opts.log ?? (() => {});
  let file = input;
  let url = opts.url;
  if (/^https?:\/\//i.test(input)) {
    url = url ?? input;
    file = await download(input, path.join(out, '_downloads'), log);
  }
  if (!fs.existsSync(file)) throw new Error(`no such file: ${file}`);
  const id = opts.id ?? slugify(opts.title ?? path.basename(file));
  const source = {
    ...(opts.source ?? {}),
    ...(opts.title ? { title: opts.title } : {}),
    ...(url ? { url } : {}),
    ...(opts.author ? { author: opts.author } : {}),
  };
  const r = await prepVideo(file, {
    ...opts,
    out,
    refId: id,
    whisper: opts.whisper === undefined ? whisperFromEnv() : opts.whisper,
    source: Object.keys(source).length ? source : undefined,
    log,
  });
  const m = r.meta;
  const c = r.counts;
  const a = r.audio;
  const line =
    `${r.refId}: ${m.duration_s.toFixed(1)} s ${m.width}×${m.height} ${m.aspect} ${m.fps} fps · ` +
    `${c.shots} shots (${c.hard} hard, ${c.soft} soft) · ${c.sheets} sheets · ` +
    (m.has_audio ? `${a?.has_music ? `music${a.bpm ? ` ${Math.round(a.bpm)} BPM` : ''}` : 'no music'}${a?.has_vo ? ' + VO' : ''}` : 'silent') +
    ` · ${r.ran.length ? `${(r.timings.total! / 1000).toFixed(1)} s` : 'up to date'} → ${shortPath(r.dir)}`;
  return { ...r, line };
}
