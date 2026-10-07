// Tiny RGB raster helpers: blit, rectangles, a 5×7 bitmap font for burned-in labels and a
// PNG encoder (node:zlib). Lets us build contact sheets with any ffmpeg build, including ones
// without drawtext/tile filters (Homebrew's and Remotion's bundled ffmpeg both lack drawtext).

import zlib from 'node:zlib';

export type Color = [number, number, number];

export class Rgb {
  readonly data: Buffer;
  constructor(
    readonly w: number,
    readonly h: number,
    data?: Buffer,
  ) {
    this.data = data ?? Buffer.alloc(w * h * 3);
    if (this.data.length !== w * h * 3) throw new Error(`raster size mismatch ${w}x${h} vs ${this.data.length}`);
  }
  fill(c: Color) {
    fillRect(this, 0, 0, this.w, this.h, c);
    return this;
  }
}

export function fillRect(img: Rgb, x: number, y: number, w: number, h: number, c: Color, alpha = 1) {
  const x0 = Math.max(0, Math.floor(x));
  const y0 = Math.max(0, Math.floor(y));
  const x1 = Math.min(img.w, Math.floor(x + w));
  const y1 = Math.min(img.h, Math.floor(y + h));
  const d = img.data;
  for (let yy = y0; yy < y1; yy++) {
    let o = (yy * img.w + x0) * 3;
    for (let xx = x0; xx < x1; xx++, o += 3) {
      if (alpha >= 1) {
        d[o] = c[0];
        d[o + 1] = c[1];
        d[o + 2] = c[2];
      } else {
        d[o] = d[o] * (1 - alpha) + c[0] * alpha;
        d[o + 1] = d[o + 1] * (1 - alpha) + c[1] * alpha;
        d[o + 2] = d[o + 2] * (1 - alpha) + c[2] * alpha;
      }
    }
  }
}

export function blit(dst: Rgb, src: Rgb, x: number, y: number) {
  const w = Math.min(src.w, dst.w - x);
  for (let row = 0; row < src.h; row++) {
    const dy = y + row;
    if (dy < 0 || dy >= dst.h || w <= 0) continue;
    src.data.copy(dst.data, (dy * dst.w + x) * 3, row * src.w * 3, (row * src.w + w) * 3);
  }
}

/** Outline rectangle of thickness t. */
export function strokeRect(img: Rgb, x: number, y: number, w: number, h: number, t: number, c: Color) {
  fillRect(img, x, y, w, t, c);
  fillRect(img, x, y + h - t, w, t, c);
  fillRect(img, x, y, t, h, c);
  fillRect(img, x + w - t, y, t, h, c);
}

// 5×7 glyphs, one 5-bit row per entry (MSB = leftmost pixel).
const FONT: Record<string, number[]> = {
  '0': [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e],
  '1': [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
  '2': [0x0e, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1f],
  '3': [0x1f, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0e],
  '4': [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02],
  '5': [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x11, 0x0e],
  '6': [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e],
  '7': [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
  '8': [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e],
  '9': [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
  A: [0x0e, 0x11, 0x11, 0x11, 0x1f, 0x11, 0x11],
  B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
  D: [0x1c, 0x12, 0x11, 0x11, 0x11, 0x12, 0x1c],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
  J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
  N: [0x11, 0x11, 0x19, 0x15, 0x13, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  P: [0x1e, 0x11, 0x11, 0x1e, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
  R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x15, 0x0a],
  X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x11, 0x0a, 0x04, 0x04, 0x04],
  Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  '.': [0, 0, 0, 0, 0, 0x0c, 0x0c],
  ',': [0, 0, 0, 0, 0x0c, 0x04, 0x08],
  ':': [0, 0x0c, 0x0c, 0, 0x0c, 0x0c, 0],
  '-': [0, 0, 0, 0x1f, 0, 0, 0],
  '+': [0, 0x04, 0x04, 0x1f, 0x04, 0x04, 0],
  '/': [0, 0x01, 0x02, 0x04, 0x08, 0x10, 0],
  '>': [0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08],
  '<': [0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02],
  '%': [0x18, 0x19, 0x02, 0x04, 0x08, 0x13, 0x03],
  '#': [0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a],
  '(': [0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02],
  ')': [0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08],
  '=': [0, 0, 0x1f, 0, 0x1f, 0, 0],
  '|': [0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  ' ': [0, 0, 0, 0, 0, 0, 0],
};

export function textWidth(text: string, scale: number) {
  return text.length ? text.length * 6 * scale - scale : 0;
}

export function drawText(img: Rgb, text: string, x: number, y: number, scale: number, c: Color) {
  let cx = x;
  for (const ch of text.toUpperCase()) {
    const g = FONT[ch] ?? FONT['#'];
    for (let row = 0; row < 7; row++) {
      const bits = g[row];
      for (let col = 0; col < 5; col++) {
        if (bits & (0x10 >> col)) fillRect(img, cx + col * scale, y + row * scale, scale, scale, c);
      }
    }
    cx += 6 * scale;
  }
}

/** Text on a translucent box. Returns the box size. */
export function label(
  img: Rgb,
  text: string,
  x: number,
  y: number,
  scale: number,
  opts: { fg?: Color; bg?: Color; bgAlpha?: number; pad?: number } = {},
) {
  const pad = opts.pad ?? Math.max(2, scale * 2);
  const w = textWidth(text, scale) + pad * 2;
  const h = 7 * scale + pad * 2;
  fillRect(img, x, y, w, h, opts.bg ?? [0, 0, 0], opts.bgAlpha ?? 0.78);
  drawText(img, text, x + pad, y + pad, scale, opts.fg ?? [255, 255, 255]);
  return { w, h };
}

// ---- PNG -------------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

export function encodePng(img: Rgb, level = 1): Buffer {
  const stride = img.w * 3;
  const raw = Buffer.alloc((stride + 1) * img.h);
  for (let y = 0; y < img.h; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    img.data.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(img.w, 0);
  ihdr.writeUInt32BE(img.h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Area-average resize (downscale; upscales fall back to nearest-ish sampling). */
export function resize(src: Rgb, w: number, h: number): Rgb {
  if (src.w === w && src.h === h) return src;
  const out = new Rgb(w, h);
  const sx = src.w / w;
  const sy = src.h / h;
  const d = out.data;
  const s = src.data;
  for (let y = 0; y < h; y++) {
    const y0 = Math.floor(y * sy);
    const y1 = Math.max(y0 + 1, Math.min(src.h, Math.floor((y + 1) * sy)));
    for (let x = 0; x < w; x++) {
      const x0 = Math.floor(x * sx);
      const x1 = Math.max(x0 + 1, Math.min(src.w, Math.floor((x + 1) * sx)));
      let r = 0;
      let g = 0;
      let b = 0;
      for (let yy = y0; yy < y1; yy++) {
        let o = (yy * src.w + x0) * 3;
        for (let xx = x0; xx < x1; xx++, o += 3) {
          r += s[o];
          g += s[o + 1];
          b += s[o + 2];
        }
      }
      const c = (y1 - y0) * (x1 - x0);
      const o = (y * w + x) * 3;
      d[o] = r / c;
      d[o + 1] = g / c;
      d[o + 2] = b / c;
    }
  }
  return out;
}
