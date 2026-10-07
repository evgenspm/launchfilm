// ffprobe → the facts every other step needs (display size, fps, duration, audio).

import fs from 'node:fs';
import path from 'node:path';
import { run, type Tools } from './ffmpeg.js';

export type Aspect = '16:9' | '9:16' | '1:1' | '4:5' | 'other';

export interface Meta {
  ref_id: string;
  source_file: string;
  duration_s: number;
  fps: number;
  width: number;
  height: number;
  aspect: Aspect;
  has_audio: boolean;
  /** extra facts, not required by consumers */
  ratio: number;
  frames: number;
  video_codec: string | null;
  pix_fmt: string | null;
  audio_codec: string | null;
  rotation: number;
  size_bytes: number;
}

export interface ProbeInfo extends Omit<Meta, 'ref_id' | 'source_file'> {
  /** exact rate for ffmpeg -r (e.g. 30000/1001) */
  rate: string;
  coded_width: number;
  coded_height: number;
}

const ASPECTS: [Aspect, number][] = [
  ['16:9', 16 / 9],
  ['9:16', 9 / 16],
  ['1:1', 1],
  ['4:5', 4 / 5],
];

/** Nearest of the platform aspects within 6 %, else 'other'. */
export function classifyAspect(w: number, h: number): Aspect {
  const r = w / h;
  let best: Aspect = 'other';
  let bestD = Infinity;
  for (const [a, v] of ASPECTS) {
    const d = Math.abs(Math.log(r / v));
    if (d < bestD) {
      bestD = d;
      best = a;
    }
  }
  return bestD <= Math.log(1.06) ? best : 'other';
}

function parseRate(s: string | undefined): [number, number] | null {
  if (!s) return null;
  const [n, d] = s.split('/').map(Number);
  if (!n || !d || !Number.isFinite(n / d)) return null;
  return [n, d];
}

export async function probe(tools: Tools, file: string): Promise<ProbeInfo> {
  const { stdout } = await run(tools.ffprobe, ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', file]);
  const j = JSON.parse(stdout.toString());
  const streams: any[] = j.streams ?? [];
  const v = streams.find((s) => s.codec_type === 'video' && !(s.disposition?.attached_pic));
  if (!v) throw new Error(`no video stream in ${file}`);
  const a = streams.find((s) => s.codec_type === 'audio');
  let rotation = 0;
  for (const sd of v.side_data_list ?? []) if (typeof sd.rotation === 'number') rotation = sd.rotation;
  if (!rotation && v.tags?.rotate) rotation = Number(v.tags.rotate) || 0;
  rotation = ((Math.round(rotation / 90) * 90) % 360 + 360) % 360;
  let w = Number(v.width);
  let h = Number(v.height);
  const sar = parseRate((v.sample_aspect_ratio ?? '1:1').replace(':', '/'));
  if (sar && sar[0] !== sar[1]) w = Math.round((w * sar[0]) / sar[1]);
  if (rotation === 90 || rotation === 270) [w, h] = [h, w];
  const rate = parseRate(v.avg_frame_rate) ?? parseRate(v.r_frame_rate) ?? [30, 1];
  let fps = rate[0] / rate[1];
  let rateStr = `${rate[0]}/${rate[1]}`;
  if (fps > 60 || fps < 1) {
    // analysis never needs more than 60 fps; absurd rates come from broken VFR headers
    fps = Math.min(60, Math.max(1, Math.round(fps)));
    rateStr = String(fps);
  }
  const duration = Number(j.format?.duration) || Number(v.duration) || 0;
  const frames = Number(v.nb_frames) || Math.round(duration * fps);
  let size = Number(j.format?.size) || 0;
  if (!size) {
    try {
      size = fs.statSync(file).size;
    } catch {
      /* ignore */
    }
  }
  return {
    duration_s: Math.round(duration * 1000) / 1000,
    fps: Math.round(fps * 1000) / 1000,
    rate: rateStr,
    width: w,
    height: h,
    coded_width: Number(v.width),
    coded_height: Number(v.height),
    aspect: classifyAspect(w, h),
    ratio: Math.round((w / h) * 10000) / 10000,
    has_audio: Boolean(a),
    frames,
    video_codec: v.codec_name ?? null,
    pix_fmt: v.pix_fmt ?? null,
    audio_codec: a?.codec_name ?? null,
    rotation,
    size_bytes: size,
  };
}

/** Even dimensions that fit inside maxW × maxH keeping the aspect ratio. */
export function fitEven(w: number, h: number, maxW: number, maxH: number) {
  const s = Math.min(maxW / w, maxH / h, 1);
  const ew = Math.max(2, Math.floor((w * s) / 2) * 2);
  const eh = Math.max(2, Math.floor((h * s) / 2) * 2);
  return { w: ew, h: eh };
}

export function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\.[a-z0-9]{2,4}$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'ref'
  );
}

export function relOrAbs(p: string) {
  return path.resolve(p);
}
