// Visual outputs: sheets/, cuts.json + cuts/, motion.json, keyframes/.

import fs from 'node:fs';
import path from 'node:path';
import { frameSplitter, JpegSink, run, type Tools } from './ffmpeg.js';
import { streamAnalyze, type StreamStats } from './analyze.js';
import { detectCuts, summarizeMotion, DEFAULT_CUT_PARAMS, type CutParams, type CutsResult } from './cuts.js';
import { fitEven, type ProbeInfo } from './probe.js';
import { Rgb, blit, encodePng, fillRect, label, resize, strokeRect, textWidth, type Color } from './raster.js';

export interface VisualOptions {
  refId: string;
  sheetFps: number;
  keyframeCap: number;
  cutParams?: Partial<CutParams>;
}

export interface VisualResult {
  sheets: number;
  keyframes: number;
  cuts: CutsResult;
  frames: number;
}

const SHEET_MAX = 2000;
const GAP = 4;
const HEADER = 30;
const COLS = 4;
const ROWS = 4;
const BG: Color = [17, 17, 17];
const RED: Color = [214, 40, 40];
const AMBER: Color = [214, 140, 20];

const fmtT = (t: number) => t.toFixed(2);
const padT = (t: number) => t.toFixed(2).padStart(6, '0');

const filterCache = new Map<string, Set<string>>();
export async function ffmpegFilters(tools: Tools): Promise<Set<string>> {
  const key = tools.ffmpeg.cmd + tools.ffmpeg.args.join(' ');
  const hit = filterCache.get(key);
  if (hit) return hit;
  const set = new Set<string>();
  try {
    const { stdout } = await run(tools.ffmpeg, ['-hide_banner', '-filters'], { check: false });
    for (const line of stdout.toString().split('\n')) {
      const m = /^\s*[.A-Z|]{2,3}\s+(\S+)\s+/.exec(line);
      if (m) set.add(m[1]);
    }
  } catch {
    /* treat as minimal build */
  }
  filterCache.set(key, set);
  return set;
}

function replaceDir(tmp: string, final: string) {
  fs.rmSync(final, { recursive: true, force: true });
  fs.renameSync(tmp, final);
}

function freshDir(p: string) {
  fs.rmSync(p, { recursive: true, force: true });
  fs.mkdirSync(p, { recursive: true });
  return p;
}

// ---- sheets -----------------------------------------------------------------------------

async function writeSheets(
  tools: Tools,
  st: StreamStats,
  cuts: CutsResult,
  tilesFile: string,
  outDir: string,
  o: VisualOptions,
  duration: number,
): Promise<number> {
  const { tileW, tileH } = st;
  const sheetW = COLS * tileW + (COLS + 1) * GAP;
  const sheetH = HEADER + ROWS * tileH + (ROWS + 1) * GAP;
  const per = COLS * ROWS;
  const count = Math.ceil(st.tiles.length / per);
  if (!count) return 0;
  const tmp = freshDir(`${outDir}.tmp`);
  const sink = new JpegSink(tools, path.join(tmp, 'sheet-%02d.jpg'), 3);
  const fd = fs.openSync(tilesFile, 'r');
  const tileBytes = tileW * tileH * 3;
  const scale = tileW >= 360 ? 3 : 2;
  try {
    for (let sIdx = 0; sIdx < count; sIdx++) {
      const sheet = new Rgb(sheetW, sheetH).fill(BG);
      const chunk = st.tiles.slice(sIdx * per, (sIdx + 1) * per);
      const head = `${o.refId}  SHEET ${sIdx + 1}/${count}  ${fmtT(chunk[0].t)}-${fmtT(chunk[chunk.length - 1].t)} S  ${o.sheetFps} FPS  ${fmtT(duration)} S TOTAL`;
      label(sheet, head, GAP, 6, 2, { bgAlpha: 0, fg: [200, 200, 200], pad: 2 });
      for (let k = 0; k < chunk.length; k++) {
        const tile = chunk[k];
        const buf = Buffer.alloc(tileBytes);
        fs.readSync(fd, buf, 0, tileBytes, (sIdx * per + k) * tileBytes);
        const img = new Rgb(tileW, tileH, buf);
        const prevT = sIdx * per + k > 0 ? st.tiles[sIdx * per + k - 1].t : -1;
        const hardHere = cuts.hard.find((h) => h.t > prevT + 1e-6 && h.t <= tile.t + 1e-6);
        const softHere = cuts.soft.find((x) => x.t1 > prevT + 1e-6 && x.t0 <= tile.t + 1e-6);
        let text = fmtT(tile.t);
        let bg: Color = [0, 0, 0];
        if (hardHere) {
          text += ` CUT ${fmtT(hardHere.t)}`;
          bg = RED;
          strokeRect(img, 0, 0, tileW, tileH, 3, RED);
        } else if (softHere) {
          text += ' SOFT';
          bg = AMBER;
        }
        if (textWidth(text, scale) + 12 > tileW) text = text.replace(/ CUT .*/, ' CUT');
        label(img, text, 4, 4, scale, { bg, bgAlpha: hardHere || softHere ? 0.9 : 0.75 });
        const col = k % COLS;
        const row = Math.floor(k / COLS);
        blit(sheet, img, GAP + col * (tileW + GAP), HEADER + GAP + row * (tileH + GAP));
      }
      await sink.write(encodePng(sheet, 0));
    }
  } finally {
    fs.closeSync(fd);
    await sink.end();
  }
  replaceDir(tmp, outDir);
  return count;
}

// ---- exact frame grabs ------------------------------------------------------------------

/**
 * Decode the frames with the given indices (in the CFR timeline used by the analysis) at
 * w×h. Uses the `select` filter when the ffmpeg build has it, otherwise decodes every frame
 * and picks in JS (Remotion's bundled ffmpeg has no select).
 */
export async function grabFrames(
  tools: Tools,
  input: string,
  info: ProbeInfo,
  indices: number[],
  w: number,
  h: number,
  onFrame: (index: number, img: Rgb) => void,
) {
  const want = [...new Set(indices)].sort((a, b) => a - b);
  if (!want.length) return;
  const filters = await ffmpegFilters(tools);
  const bytes = w * h * 3;
  const useSelect = filters.has('select') && want.length <= 400;
  let args: string[];
  let map: (k: number) => number | undefined;
  if (useSelect) {
    const expr = want.map((i) => `eq(n\\,${i})`).join('+');
    args = ['-vf', `select='${expr}',scale=${w}:${h}:flags=lanczos`, '-fps_mode', 'passthrough'];
    map = (k) => want[k];
  } else {
    const set = new Set(want);
    args = ['-vf', `scale=${w}:${h}:flags=lanczos`, '-r', info.rate, '-fps_mode', 'cfr'];
    map = (k) => (set.has(k) ? k : undefined);
  }
  await run(
    tools.ffmpeg,
    ['-v', 'error', '-nostdin', '-i', input, '-map', '0:v:0', '-an', ...args, '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'],
    {
      onStdout: frameSplitter(bytes, (buf, k) => {
        const idx = map(k);
        if (idx !== undefined) onFrame(idx, new Rgb(w, h, buf));
      }),
    },
  );
}

interface PairJob {
  name: string;
  before: number;
  after: number;
  title: string;
  color: Color;
}

async function writeKeyframesAndCuts(
  tools: Tools,
  input: string,
  info: ProbeInfo,
  st: StreamStats,
  cuts: CutsResult,
  dir: string,
  o: VisualOptions,
): Promise<number> {
  const fps = st.fps;
  const n = st.n;
  // keyframes: mid-second, 1 fps, at most keyframeCap spread evenly
  const dur = n / fps;
  const kfTimes: number[] = [];
  const count = Math.min(o.keyframeCap, Math.max(1, Math.floor(dur)));
  for (let k = 0; k < count; k++) kfTimes.push(dur <= o.keyframeCap ? k + 0.5 : ((k + 0.5) * dur) / count);
  const kf = kfTimes.map((t) => ({ t, i: Math.min(n - 1, Math.round(t * fps)) }));

  const jobs: PairJob[] = [];
  for (const h of cuts.hard) {
    const after = Math.min(n - 1, h.frame_after ?? h.frame);
    jobs.push({ name: `cut-${padT(h.t)}`, before: h.frame - 1, after, title: `HARD CUT ${fmtT(h.t)}  SCORE ${h.score}${h.via ? '  VIA FLASH' : ''}${h.context === 'in-motion' ? '  IN MOTION (CUT OR FAST WIPE)' : ''}`, color: RED });
    h.image = `cuts/cut-${padT(h.t)}.jpg`;
  }
  for (const s of cuts.soft) {
    jobs.push({ name: `cut-${padT(s.t0)}`, before: Math.max(0, s.frame0 - 1), after: Math.min(n - 1, s.frame1), title: `SOFT ${fmtT(s.t0)}-${fmtT(s.t1)}  ${s.hint.toUpperCase()}`, color: AMBER });
    s.image = `cuts/cut-${padT(s.t0)}.jpg`;
  }
  for (const f of cuts.flashes) {
    jobs.push({ name: `flash-${padT(f.t)}`, before: f.frame - 1, after: f.frame, title: `FLASH ${fmtT(f.t)}  ${f.frames} FR  ${f.tone.toUpperCase()}`, color: [120, 120, 220] });
    f.image = `cuts/flash-${padT(f.t)}.jpg`;
  }

  // full-res keyframes (capped at 1920 on the long side), halves for the cut pairs
  const full = fitEven(info.width, info.height, 1920, 1920);
  const half = fitEven(info.width, info.height, (SHEET_MAX - 3 * GAP) / 2, 960);
  const pairW = half.w * 2 + 3 * GAP;
  const pairH = half.h + HEADER + 2 * GAP;

  const kfDir = freshDir(path.join(dir, 'keyframes.tmp'));
  const cutDir = freshDir(path.join(dir, 'cuts.tmp'));
  const kfSink = new JpegSink(tools, path.join(kfDir, 'k-%03d.jpg'), 2);
  const cutSink = jobs.length ? new JpegSink(tools, path.join(cutDir, 'c-%03d.jpg'), 3) : null;
  const needed = new Map<number, { kf: number[]; pair: { job: number; side: 'before' | 'after' }[] }>();
  const need = (i: number) => {
    let e = needed.get(i);
    if (!e) needed.set(i, (e = { kf: [], pair: [] }));
    return e;
  };
  kf.forEach((k, idx) => need(k.i).kf.push(idx));
  jobs.forEach((j, idx) => {
    need(j.before).pair.push({ job: idx, side: 'before' });
    need(j.after).pair.push({ job: idx, side: 'after' });
  });
  const halves = new Map<number, { before?: Rgb; after?: Rgb }>();
  const kfOrder: number[] = [];
  const cutOrder: number[] = [];
  const writes: Promise<void>[] = [];

  await grabFrames(tools, input, info, [...needed.keys()], full.w, full.h, (i, img) => {
    const e = needed.get(i)!;
    for (const k of e.kf) {
      kfOrder.push(k);
      writes.push(kfSink.write(encodePng(img, 0)));
    }
    if (e.pair.length) {
      const small = resize(img, half.w, half.h);
      for (const p of e.pair) {
        const slot = halves.get(p.job) ?? {};
        slot[p.side] = small;
        halves.set(p.job, slot);
        if (slot.before && slot.after) {
          const job = jobs[p.job];
          const canvas = new Rgb(pairW, pairH).fill(BG);
          label(canvas, `${o.refId}  ${job.title}`, GAP, 6, 2, { bgAlpha: 0, fg: job.color, pad: 2 });
          blit(canvas, slot.before, GAP, HEADER + GAP);
          blit(canvas, slot.after, 2 * GAP + half.w, HEADER + GAP);
          label(canvas, `BEFORE ${fmtT(jobs[p.job].before / fps)}`, GAP + 4, HEADER + GAP + 4, 3);
          label(canvas, `AFTER ${fmtT(jobs[p.job].after / fps)}`, 2 * GAP + half.w + 4, HEADER + GAP + 4, 3, { bg: job.color, bgAlpha: 0.9 });
          fillRect(canvas, GAP + half.w, HEADER, GAP, half.h + 2 * GAP, job.color);
          cutOrder.push(p.job);
          writes.push(cutSink!.write(encodePng(canvas, 0)));
          halves.delete(p.job);
        }
      }
    }
  });
  await Promise.all(writes);
  await kfSink.end();
  if (cutSink) await cutSink.end();
  // numbered → named
  kfOrder.forEach((k, seq) => {
    const src = path.join(kfDir, `k-${String(seq + 1).padStart(3, '0')}.jpg`);
    if (fs.existsSync(src)) fs.renameSync(src, path.join(kfDir, `kf-${padT(kf[k].i / fps)}.jpg`));
  });
  cutOrder.forEach((j, seq) => {
    const src = path.join(cutDir, `c-${String(seq + 1).padStart(3, '0')}.jpg`);
    if (fs.existsSync(src)) fs.renameSync(src, path.join(cutDir, `${jobs[j].name}.jpg`));
  });
  replaceDir(kfDir, path.join(dir, 'keyframes'));
  replaceDir(cutDir, path.join(dir, 'cuts'));
  return kfOrder.length;
}

// ---- step -------------------------------------------------------------------------------

export async function runVisual(tools: Tools, input: string, info: ProbeInfo, dir: string, o: VisualOptions): Promise<VisualResult> {
  const tile = fitEven(info.width, info.height, Math.floor((SHEET_MAX - (COLS + 1) * GAP) / COLS), Math.floor((SHEET_MAX - HEADER - (ROWS + 1) * GAP) / ROWS));
  // keep tiles ≤ 480 wide: enough to read UI text, small enough for the image budget
  const t = tile.w > 480 ? fitEven(info.width, info.height, 480, tile.h) : tile;
  const work = path.join(dir, '.work');
  fs.mkdirSync(work, { recursive: true });
  const tilesFile = path.join(work, 'tiles.rgb');
  try {
    const st = await streamAnalyze(tools, input, {
      fps: info.fps,
      rate: info.rate,
      duration: info.duration_s,
      tileW: t.w,
      tileH: t.h,
      sheetFps: o.sheetFps,
      tilesFile,
    });
    if (st.n < 1) throw new Error('decoded 0 frames');
    const params = { ...DEFAULT_CUT_PARAMS, ...(o.cutParams ?? {}) };
    const cuts = detectCuts(st, params);
    const motion = summarizeMotion(st, cuts, params.dupMafd);
    const [sheets, keyframes] = await Promise.all([
      writeSheets(tools, st, cuts, tilesFile, path.join(dir, 'sheets'), o, st.n / st.fps),
      writeKeyframesAndCuts(tools, input, info, st, cuts, dir, o),
    ]);
    const cutsJson = {
      method:
        'scdet score = min(MAFD, |ΔMAFD|) on de-duplicated frames (ffmpeg scdet formula) at ' +
        `${st.aw}x${st.ah} gray; soft = motion burst ${params.softMinFrames} fr…${params.softMaxS} s with a different picture after`,
      params,
      fps: st.fps,
      frames: st.n,
      duration_s: Math.round((st.n / st.fps) * 1000) / 1000,
      counts: { hard: cuts.hard.length, soft: cuts.soft.length, flashes: cuts.flashes.length, shots: cuts.shots.length },
      ...cuts,
    };
    writeJson(path.join(dir, 'cuts.json'), cutsJson);
    writeJson(path.join(dir, 'motion.json'), {
      method:
        'per second: mean MAFD (0–100) and a global similarity model from block matching at 10 Hz; pan in px/s of a 1920-wide frame, ' +
        'zoom in %/s (positive = content grows), coherence = share of textured blocks that follow the global model',
      seconds: motion,
    });
    return { sheets, keyframes, cuts, frames: st.n };
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}

export function writeJson(file: string, data: unknown) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 1) + '\n');
  fs.renameSync(tmp, file);
}
