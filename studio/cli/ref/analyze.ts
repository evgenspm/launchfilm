// One streamed decode of the reference at contact-sheet tile size gives everything that
// needs every frame: scdet-style frame differences, colour histograms, tiny thumbnails for
// pairwise comparisons later (cuts, flashes, soft transitions), block-matching global motion
// and the 4 fps tiles for the sheets (spooled to a temp file to keep memory flat).

import fs from 'node:fs';
import { frameSplitter, run, type Tools } from './ffmpeg.js';

export const BINS = 64;
export const THUMB_W = 32;
export const THUMB_H = 18;

export interface MotionSample {
  /** time of the later frame, s */
  t: number;
  /** seconds between the two compared frames */
  dt: number;
  /** blocks with enough texture to track */
  textured: number;
  /** blocks that agree with the global similarity model */
  inliers: number;
  /** content translation between the frames, analysis px */
  tx: number;
  ty: number;
  /** similarity model: scale − 1 and the rotation term */
  a: number;
  b: number;
}

export interface StreamStats {
  n: number;
  fps: number;
  tileW: number;
  tileH: number;
  /** analysis (gray, half tile) size used for motion */
  aw: number;
  ah: number;
  /** mean absolute difference vs previous frame (scdet's MAFD), 0–100 */
  mafd: Float32Array;
  /** 64-bin RGB histogram distance vs previous frame, 0–1 */
  hd: Float32Array;
  /** mean luma 0–255 */
  luma: Float32Array;
  /** n × THUMB_W×THUMB_H gray thumbnails */
  thumbs: Uint8Array;
  /** n × BINS normalised histograms */
  hists: Float32Array;
  motion: MotionSample[];
  /** sheet tiles written to the tiles file, in order */
  tiles: { k: number; i: number; t: number }[];
}

export interface StreamOptions {
  fps: number;
  /** ffmpeg rate expression for -r (keeps rationals like 30000/1001 exact) */
  rate: string;
  duration: number;
  tileW: number;
  tileH: number;
  sheetFps: number;
  tilesFile: string;
  motionHz?: number;
}

function histogram(rgb: Buffer, out: Float32Array, off: number) {
  let n = 0;
  for (let o = 0; o < rgb.length; o += 6) {
    out[off + (((rgb[o] >> 6) << 4) | ((rgb[o + 1] >> 6) << 2) | (rgb[o + 2] >> 6))]++;
    n++;
  }
  for (let b = 0; b < BINS; b++) out[off + b] /= n;
}

export function histDist(h: Float32Array, i: number, j: number) {
  let s = 0;
  const a = i * BINS;
  const b = j * BINS;
  for (let k = 0; k < BINS; k++) s += Math.abs(h[a + k] - h[b + k]);
  return s / 2;
}

/** Mean abs difference of two thumbnails, 0–100. */
export function thumbDist(t: Uint8Array, i: number, j: number) {
  const n = THUMB_W * THUMB_H;
  const a = i * n;
  const b = j * n;
  let s = 0;
  for (let k = 0; k < n; k++) {
    const d = t[a + k] - t[b + k];
    s += d < 0 ? -d : d;
  }
  return (s / n / 255) * 100;
}

/** 2×2 box down-sample to gray. */
function toGrayHalf(rgb: Buffer, w: number, aw: number, ah: number, out: Uint8Array) {
  for (let y = 0; y < ah; y++) {
    const r0 = 2 * y * w * 3;
    const r1 = r0 + w * 3;
    for (let x = 0; x < aw; x++) {
      const o0 = r0 + x * 6;
      const o1 = r1 + x * 6;
      const s =
        rgb[o0] * 77 + rgb[o0 + 1] * 150 + rgb[o0 + 2] * 29 +
        rgb[o0 + 3] * 77 + rgb[o0 + 4] * 150 + rgb[o0 + 5] * 29 +
        rgb[o1] * 77 + rgb[o1 + 1] * 150 + rgb[o1 + 2] * 29 +
        rgb[o1 + 3] * 77 + rgb[o1 + 4] * 150 + rgb[o1 + 5] * 29;
      out[y * aw + x] = s >> 10;
    }
  }
}

function thumbnail(g: Uint8Array, w: number, h: number, out: Uint8Array, off: number) {
  for (let ty = 0; ty < THUMB_H; ty++) {
    const y0 = Math.floor((ty * h) / THUMB_H);
    const y1 = Math.max(y0 + 1, Math.floor(((ty + 1) * h) / THUMB_H));
    for (let tx = 0; tx < THUMB_W; tx++) {
      const x0 = Math.floor((tx * w) / THUMB_W);
      const x1 = Math.max(x0 + 1, Math.floor(((tx + 1) * w) / THUMB_W));
      let s = 0;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) s += g[y * w + x];
      out[off + ty * THUMB_W + tx] = Math.round(s / ((y1 - y0) * (x1 - x0)));
    }
  }
}

function meanAbsDiff(a: Uint8Array, b: Uint8Array) {
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    s += d < 0 ? -d : d;
  }
  return (s / a.length / 255) * 100;
}

function halve(src: Uint8Array, w: number, h: number) {
  const hw = w >> 1;
  const hh = h >> 1;
  const out = new Uint8Array(hw * hh);
  for (let y = 0; y < hh; y++)
    for (let x = 0; x < hw; x++) {
      const o = 2 * y * w + 2 * x;
      out[y * hw + x] = (src[o] + src[o + 1] + src[o + w] + src[o + w + 1]) >> 2;
    }
  return out;
}

function sad(a: Uint8Array, b: Uint8Array, w: number, ax: number, ay: number, bx: number, by: number, bs: number) {
  let s = 0;
  for (let y = 0; y < bs; y++) {
    let oa = (ay + y) * w + ax;
    let ob = (by + y) * w + bx;
    for (let x = 0; x < bs; x++, oa++, ob++) {
      const d = a[oa] - b[ob];
      s += d < 0 ? -d : d;
    }
  }
  return s;
}

function blockStd(a: Uint8Array, w: number, x0: number, y0: number, bs: number) {
  let s = 0;
  let s2 = 0;
  for (let y = 0; y < bs; y++)
    for (let x = 0; x < bs; x++) {
      const v = a[(y0 + y) * w + x0 + x];
      s += v;
      s2 += v * v;
    }
  const n = bs * bs;
  const m = s / n;
  return Math.sqrt(Math.max(0, s2 / n - m * m));
}

interface Flow {
  x: number;
  y: number;
  dx: number;
  dy: number;
}
interface Sim {
  tx: number;
  ty: number;
  a: number;
  b: number;
}

function solve4(A: number[][], y: number[]): number[] | null {
  const M = A.map((r, i) => [...r, y[i]]);
  for (let c = 0; c < 4; c++) {
    let p = c;
    for (let r = c + 1; r < 4; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-9) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < 4; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k < 5; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[4] / M[i][i]);
}

// dx = tx + a·x − b·y ; dy = ty + b·x + a·y   (x, y relative to the frame centre)
function lsSimilarity(flows: Flow[]): Sim | null {
  const AtA = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const Atb = [0, 0, 0, 0];
  const add = (r0: number, r1: number, r2: number, r3: number, v: number) => {
    const row = [r0, r1, r2, r3];
    for (let i = 0; i < 4; i++) {
      Atb[i] += row[i] * v;
      for (let j = 0; j < 4; j++) AtA[i][j] += row[i] * row[j];
    }
  };
  for (const f of flows) {
    add(1, 0, f.x, -f.y, f.dx);
    add(0, 1, f.y, f.x, f.dy);
  }
  const p = solve4(AtA, Atb);
  return p ? { tx: p[0], ty: p[1], a: p[2], b: p[3] } : null;
}

/** Exact similarity through two correspondences. */
function twoPoint(p: Flow, q: Flow): Sim | null {
  const ux = q.x - p.x;
  const uy = q.y - p.y;
  const vx = q.x + q.dx - (p.x + p.dx);
  const vy = q.y + q.dy - (p.y + p.dy);
  const d = ux * ux + uy * uy;
  if (d < 1e-6) return null;
  // (1+a, b) maps u → v
  const s = (ux * vx + uy * vy) / d;
  const r = (ux * vy - uy * vx) / d;
  const a = s - 1;
  const b = r;
  return { a, b, tx: p.dx - a * p.x + b * p.y, ty: p.dy - b * p.x - a * p.y };
}

function residual(m: Sim, f: Flow) {
  return Math.hypot(m.tx + m.a * f.x - m.b * f.y - f.dx, m.ty + m.b * f.x + m.a * f.y - f.dy);
}

const INLIER_PX = 1.25;

/**
 * Global motion between two gray frames: coarse-to-fine block matching, then a similarity
 * model chosen by exhaustive two-point consensus and refined by least squares.
 */
export function estimateMotion(A: Uint8Array, B: Uint8Array, w: number, h: number) {
  const A1 = halve(A, w, h);
  const B1 = halve(B, w, h);
  const w1 = w >> 1;
  const h1 = h >> 1;
  const bs0 = 16;
  const bs1 = 8;
  const R1 = 6;
  const R0 = 2;
  const margin1 = R1 + 2;
  const cols = w >= h ? 8 : 5;
  const rows = w >= h ? 5 : 8;
  const flows: Flow[] = [];
  let textured = 0;
  const FW = 2 * (R0 + 1) + 1;
  const S = new Float64Array(FW * FW);
  for (let gy = 0; gy < rows; gy++)
    for (let gx = 0; gx < cols; gx++) {
      const x1 = Math.round(margin1 + ((w1 - 2 * margin1 - bs1) * gx) / (cols - 1));
      const y1 = Math.round(margin1 + ((h1 - 2 * margin1 - bs1) * gy) / (rows - 1));
      const x0 = x1 * 2;
      const y0 = y1 * 2;
      if (x0 + bs0 > w || y0 + bs0 > h) continue;
      if (blockStd(A, w, x0, y0, bs0) < 5) continue;
      textured++;
      let best = Infinity;
      let bdx = 0;
      let bdy = 0;
      let sum = 0;
      let cnt = 0;
      for (let dy = -R1; dy <= R1; dy++) {
        const by = y1 + dy;
        if (by < 0 || by + bs1 > h1) continue;
        for (let dx = -R1; dx <= R1; dx++) {
          const bx = x1 + dx;
          if (bx < 0 || bx + bs1 > w1) continue;
          const s = sad(A1, B1, w1, x1, y1, bx, by, bs1);
          sum += s;
          cnt++;
          if (s < best || (s === best && Math.abs(dx) + Math.abs(dy) < Math.abs(bdx) + Math.abs(bdy))) {
            best = s;
            bdx = dx;
            bdy = dy;
          }
        }
      }
      if (!cnt || best > 0.6 * (sum / cnt)) continue; // ambiguous block (flat, repetitive or occluded)
      const cx = bdx * 2;
      const cy = bdy * 2;
      S.fill(Infinity);
      let best0 = Infinity;
      let fdx = cx;
      let fdy = cy;
      for (let dy = cy - R0 - 1; dy <= cy + R0 + 1; dy++) {
        const by = y0 + dy;
        if (by < 0 || by + bs0 > h) continue;
        for (let dx = cx - R0 - 1; dx <= cx + R0 + 1; dx++) {
          const bx = x0 + dx;
          if (bx < 0 || bx + bs0 > w) continue;
          const s = sad(A, B, w, x0, y0, bx, by, bs0);
          S[(dy - cy + R0 + 1) * FW + (dx - cx + R0 + 1)] = s;
          if (Math.abs(dx - cx) <= R0 && Math.abs(dy - cy) <= R0 && s < best0) {
            best0 = s;
            fdx = dx;
            fdy = dy;
          }
        }
      }
      const at = (dx: number, dy: number) => S[(dy - cy + R0 + 1) * FW + (dx - cx + R0 + 1)];
      const sub = (m: number, c: number, p: number) => {
        if (!Number.isFinite(m) || !Number.isFinite(p)) return 0;
        const den = m - 2 * c + p;
        return den > 0 ? Math.max(-0.5, Math.min(0.5, (0.5 * (m - p)) / den)) : 0;
      };
      const sx = sub(at(fdx - 1, fdy), best0, at(fdx + 1, fdy));
      const sy = sub(at(fdx, fdy - 1), best0, at(fdx, fdy + 1));
      flows.push({ x: x0 + bs0 / 2 - w / 2, y: y0 + bs0 / 2 - h / 2, dx: fdx + sx, dy: fdy + sy });
    }
  if (flows.length < 3) return { textured, inliers: 0, model: null as Sim | null };
  // consensus over every pair (≤ 40 blocks → ≤ 780 models), plus "nothing moved"
  let bestModel: Sim = { tx: 0, ty: 0, a: 0, b: 0 };
  let bestCount = flows.filter((f) => residual(bestModel, f) < INLIER_PX).length;
  for (let i = 0; i < flows.length; i++)
    for (let j = i + 1; j < flows.length; j++) {
      const m = twoPoint(flows[i], flows[j]);
      if (!m || Math.abs(m.a) > 0.5 || Math.abs(m.b) > 0.5) continue;
      let c = 0;
      for (const f of flows) if (residual(m, f) < INLIER_PX) c++;
      if (c > bestCount) {
        bestCount = c;
        bestModel = m;
      }
    }
  let inl = flows.filter((f) => residual(bestModel, f) < INLIER_PX);
  if (inl.length >= 3) {
    const ref = lsSimilarity(inl);
    if (ref) {
      const inl2 = flows.filter((f) => residual(ref, f) < INLIER_PX);
      if (inl2.length >= inl.length) {
        bestModel = ref;
        inl = inl2;
      }
    }
  }
  return { textured, inliers: inl.length, model: bestModel };
}

export async function streamAnalyze(tools: Tools, input: string, o: StreamOptions): Promise<StreamStats> {
  const { tileW, tileH } = o;
  const aw = tileW >> 1;
  const ah = tileH >> 1;
  const frameBytes = tileW * tileH * 3;
  const TN = THUMB_W * THUMB_H;
  let cap = Math.ceil(o.duration * o.fps) + 8;
  let mafd = new Float32Array(cap);
  let hd = new Float32Array(cap);
  let luma = new Float32Array(cap);
  let thumbs = new Uint8Array(cap * TN);
  let hists = new Float32Array(cap * BINS);
  const grow = () => {
    cap *= 2;
    const f = (a: Float32Array, k = 1) => {
      const b = new Float32Array(cap * k);
      b.set(a);
      return b;
    };
    mafd = f(mafd);
    hd = f(hd);
    luma = f(luma);
    hists = f(hists, BINS);
    const t = new Uint8Array(cap * TN);
    t.set(thumbs);
    thumbs = t;
  };
  const motionStep = Math.max(1, Math.round(o.fps / (o.motionHz ?? 10)));
  const ringN = motionStep + 1;
  const grays: Uint8Array[] = Array.from({ length: ringN }, () => new Uint8Array(aw * ah));
  const motion: MotionSample[] = [];
  const tiles: StreamStats['tiles'] = [];
  const fd = fs.openSync(o.tilesFile, 'w');
  let nextK = 0;
  let n = 0;
  const lastK = Math.max(0, Math.floor(o.duration * o.sheetFps - 1e-6));
  const sampleFrame = (k: number) => Math.round((k / o.sheetFps) * o.fps);

  const onFrame = (rgb: Buffer, i: number) => {
    if (i >= cap) grow();
    const g = grays[i % ringN];
    toGrayHalf(rgb, tileW, aw, ah, g);
    histogram(rgb, hists, i * BINS);
    thumbnail(g, aw, ah, thumbs, i * TN);
    let lsum = 0;
    for (let p = 0; p < g.length; p++) lsum += g[p];
    luma[i] = lsum / g.length;
    if (i > 0) {
      mafd[i] = meanAbsDiff(g, grays[(i - 1) % ringN]);
      hd[i] = histDist(hists, i, i - 1);
    }
    if (i >= motionStep && i % motionStep === 0) {
      const m = estimateMotion(grays[(i - motionStep) % ringN], g, aw, ah);
      motion.push({
        t: i / o.fps,
        dt: motionStep / o.fps,
        textured: m.textured,
        inliers: m.inliers,
        tx: m.model?.tx ?? 0,
        ty: m.model?.ty ?? 0,
        a: m.model?.a ?? 0,
        b: m.model?.b ?? 0,
      });
    }
    while (nextK <= lastK && sampleFrame(nextK) <= i) {
      fs.writeSync(fd, rgb);
      tiles.push({ k: nextK, i, t: i / o.fps });
      nextK++;
    }
    n = i + 1;
  };

  try {
    await run(
      tools.ffmpeg,
      [
        '-v', 'error', '-nostdin', '-i', input,
        '-map', '0:v:0', '-an', '-sn', '-dn',
        '-vf', `scale=${tileW}:${tileH}:flags=area`,
        '-r', o.rate, '-fps_mode', 'cfr',
        '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1',
      ],
      { onStdout: frameSplitter(frameBytes, onFrame) },
    );
  } finally {
    fs.closeSync(fd);
  }
  return {
    n,
    fps: o.fps,
    tileW,
    tileH,
    aw,
    ah,
    mafd: mafd.slice(0, n),
    hd: hd.slice(0, n),
    luma: luma.slice(0, n),
    thumbs: thumbs.slice(0, n * TN),
    hists: hists.slice(0, n * BINS),
    motion,
    tiles,
  };
}
