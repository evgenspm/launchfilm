// Timestamped contact sheets: frames every `every` seconds, tiled row-major, each tile labelled "m:ss.ss #frame".
import {readdirSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {extractFrames, ffmpeg, probe} from './ffmpeg.js';
import {Canvas} from './png.js';
import {ensureDir} from './paths.js';

export interface SheetOpts {
	every?: number;
	cols?: number;
	rows?: number;
	width?: number;
	format?: 'jpg' | 'png';
	prefix?: string;
	maxTiles?: number;
}

export interface SheetResult {
	files: string[];
	tiles: number;
	every: number;
	cols: number;
	duration: number;
	fps: number;
}

const stamp = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;

export const contactSheets = async (video: string, outDir: string, o: SheetOpts = {}): Promise<SheetResult> => {
	const info = await probe(video);
	if (!info.video) throw new Error(`${video} has no video stream`);
	const dur = info.duration || 1;
	const fps = info.video.fps || 30;
	const portrait = info.video.height > info.video.width;
	const maxTiles = o.maxTiles ?? 48;
	const every = o.every ?? (dur <= maxTiles ? 1 : Math.ceil((dur / maxTiles) * 10) / 10);
	const cols = o.cols ?? (portrait ? 8 : 6);
	const width = o.width ?? (portrait ? 200 : 320);
	const rows = o.rows ?? 8;
	const {frames, width: w, height: h} = await extractFrames(video, {width, rate: 1 / every});
	const n = frames.length;
	ensureDir(outDir);
	const prefix = o.prefix ?? 'sheet';
	for (const f of readdirSync(outDir)) if (f.startsWith(`${prefix}-`) && /\.(jpg|png)$/.test(f)) rmSync(path.join(outDir, f));
	const per = cols * rows;
	const pad = 4;
	const files: string[] = [];
	const scale = width >= 300 ? 2 : 1;
	for (let s = 0; s * per < n; s++) {
		const chunk = frames.slice(s * per, (s + 1) * per);
		const r = Math.ceil(chunk.length / cols);
		const c = new Canvas(cols * (w + pad) + pad, r * (h + pad) + pad);
		chunk.forEach((fr, k) => {
			const idx = s * per + k;
			const t = idx * every;
			const x = pad + (k % cols) * (w + pad);
			const y = pad + Math.floor(k / cols) * (h + pad);
			c.blit(fr, w, h, x, y);
			c.label(`${stamp(t)} #${Math.round(t * fps)}`, x + 3, y + 3, scale);
		});
		const pages = Math.ceil(n / per);
		const base = path.join(outDir, pages > 1 ? `${prefix}-${String(s + 1).padStart(2, '0')}` : prefix);
		const png = c.png();
		if ((o.format ?? 'jpg') === 'png') {
			writeFileSync(`${base}.png`, png);
			files.push(`${base}.png`);
		} else {
			try {
				await ffmpeg(['-loglevel', 'error', '-y', '-f', 'image2pipe', '-c:v', 'png', '-i', 'pipe:0', '-q:v', '3', `${base}.jpg`], {input: png}, 'encode sheet');
				files.push(`${base}.jpg`);
			} catch {
				writeFileSync(`${base}.png`, png);
				files.push(`${base}.png`);
			}
		}
	}
	return {files, tiles: n, every, cols, duration: dur, fps};
};
