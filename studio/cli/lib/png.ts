// RGB canvas + PNG encoder (node:zlib) + a 5x7 bitmap font, so contact sheets get burned-in timestamps
// without drawtext (absent from Remotion's ffmpeg) or native image libraries.
import {deflateSync} from 'node:zlib';

export class Canvas {
	data: Buffer;
	constructor(
		public width: number,
		public height: number,
		bg: [number, number, number] = [17, 17, 17],
	) {
		this.data = Buffer.alloc(width * height * 3);
		for (let i = 0; i < width * height; i++) {
			this.data[i * 3] = bg[0];
			this.data[i * 3 + 1] = bg[1];
			this.data[i * 3 + 2] = bg[2];
		}
	}

	/** Copy an RGB24 frame of w×h into the canvas at (x, y). */
	blit(src: Buffer, w: number, h: number, x: number, y: number) {
		for (let row = 0; row < h; row++) {
			const ty = y + row;
			if (ty < 0 || ty >= this.height) continue;
			const sx0 = Math.max(0, -x);
			const sx1 = Math.min(w, this.width - x);
			if (sx1 <= sx0) continue;
			src.copy(this.data, (ty * this.width + x + sx0) * 3, (row * w + sx0) * 3, (row * w + sx1) * 3);
		}
	}

	rect(x: number, y: number, w: number, h: number, c: [number, number, number], alpha = 1) {
		for (let yy = Math.max(0, y); yy < Math.min(this.height, y + h); yy++) {
			for (let xx = Math.max(0, x); xx < Math.min(this.width, x + w); xx++) {
				const o = (yy * this.width + xx) * 3;
				for (let k = 0; k < 3; k++) this.data[o + k] = Math.round(this.data[o + k] * (1 - alpha) + c[k] * alpha);
			}
		}
	}

	text(s: string, x: number, y: number, scale = 2, c: [number, number, number] = [255, 255, 255]) {
		let cx = x;
		for (const ch of s.toUpperCase()) {
			const g = FONT[ch] ?? FONT['?'];
			for (let row = 0; row < 7; row++) {
				for (let col = 0; col < 5; col++) {
					if ((g[row] >> (4 - col)) & 1) this.rect(cx + col * scale, y + row * scale, scale, scale, c);
				}
			}
			cx += 6 * scale;
		}
		return cx - x;
	}

	/** Text on a dark plate, for labels over video frames. */
	label(s: string, x: number, y: number, scale = 2) {
		const w = s.length * 6 * scale + 2 * scale;
		this.rect(x, y, w, 9 * scale, [0, 0, 0], 0.72);
		this.text(s, x + 2 * scale, y + scale, scale);
	}

	png(): Buffer {
		return encodePng(this.data, this.width, this.height);
	}
}

const CRC = (() => {
	const t = new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		t[n] = c >>> 0;
	}
	return t;
})();

const crc32 = (b: Buffer) => {
	let c = 0xffffffff;
	for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
};

const chunk = (type: string, body: Buffer) => {
	const len = Buffer.alloc(4);
	len.writeUInt32BE(body.length);
	const tb = Buffer.concat([Buffer.from(type, 'ascii'), body]);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(crc32(tb));
	return Buffer.concat([len, tb, crc]);
};

export const encodePng = (rgb: Buffer, w: number, h: number): Buffer => {
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(w, 0);
	ihdr.writeUInt32BE(h, 4);
	ihdr[8] = 8; // bit depth
	ihdr[9] = 2; // RGB
	const raw = Buffer.alloc((w * 3 + 1) * h);
	for (let y = 0; y < h; y++) {
		raw[y * (w * 3 + 1)] = 0;
		rgb.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3);
	}
	return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, {level: 6})), chunk('IEND', Buffer.alloc(0))]);
};

/** Luma percentile (0..255) of an RGB24 frame, sampled: p99 < ~24 means nothing visible (a black frame). */
export const lumaPercentile = (rgb: Buffer, q = 0.99) => {
	const hist = new Uint32Array(256);
	let n = 0;
	for (let i = 0; i + 2 < rgb.length; i += 3 * 3) {
		hist[Math.round(0.2126 * rgb[i] + 0.7152 * rgb[i + 1] + 0.0722 * rgb[i + 2])]++;
		n++;
	}
	let acc = 0;
	for (let v = 0; v < 256; v++) {
		acc += hist[v];
		if (acc >= q * n) return v;
	}
	return 255;
};

/** Mean luma (0..255) of an RGB24 frame, sampled. */
export const meanLuma = (rgb: Buffer) => {
	let s = 0;
	let n = 0;
	for (let i = 0; i < rgb.length; i += 3 * 7) {
		s += 0.2126 * rgb[i] + 0.7152 * rgb[i + 1] + 0.0722 * rgb[i + 2];
		n++;
	}
	return n ? s / n : 0;
};

// 5x7 glyphs, one byte per row, 5 low bits used (MSB = leftmost column).
const FONT: Record<string, number[]> = {
	' ': [0, 0, 0, 0, 0, 0, 0],
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
	':': [0, 0x0c, 0x0c, 0, 0x0c, 0x0c, 0],
	'.': [0, 0, 0, 0, 0, 0x0c, 0x0c],
	',': [0, 0, 0, 0, 0x0c, 0x04, 0x08],
	'-': [0, 0, 0, 0x1f, 0, 0, 0],
	'_': [0, 0, 0, 0, 0, 0, 0x1f],
	'/': [0x01, 0x01, 0x02, 0x04, 0x08, 0x10, 0x10],
	'#': [0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a],
	'+': [0, 0x04, 0x04, 0x1f, 0x04, 0x04, 0],
	'(': [0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02],
	')': [0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08],
	'=': [0, 0, 0x1f, 0, 0x1f, 0, 0],
	'%': [0x18, 0x19, 0x02, 0x04, 0x08, 0x13, 0x03],
	'?': [0x0e, 0x11, 0x01, 0x02, 0x04, 0, 0x04],
	A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
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
};
