// ffmpeg/ffprobe access. "auto": a full system ffmpeg when one is on PATH, else the binaries Remotion already ships
// in @remotion/compositor-* (no system install, no ffmpeg-static). Remotion's build is minimal: it has loudnorm,
// silencedetect, atrim, atempo, aresample, scale, concat, pan, volume, amix, sine, anullsrc, but NOT ebur128,
// alimiter, afade, acrossfade, aevalsrc, anoisesrc, highpass/lowpass, tile, fps, select, signalstats, freezedetect
// or blackdetect. The core pipeline does those parts in JS (lib/dsp.ts, lib/wav.ts, lib/png.ts), so it works with
// Remotion's binary alone; QA checks that need the missing filters report NOT CHECKED with an install hint.
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {loadConfig} from './config.js';
import {CliError, die} from './log.js';
import {studioPath} from './paths.js';
import {run, runOk, which, type RunOpts} from './proc.js';
import {readWav, writeWav, type Audio} from './wav.js';

const req = createRequire(studioPath('package.json'));

interface Bins {
	ffmpeg: string;
	ffprobe: string;
	env: Record<string, string>;
	source: 'remotion' | 'system' | 'custom';
}

let bins: Bins | null = null;

const remotionBins = (): Bins => {
	let RenderInternals: any;
	try {
		({RenderInternals} = req('@remotion/renderer'));
	} catch {
		die('@remotion/renderer is not installed', 'run: npm ci   (inside launch-video/)');
	}
	const opts = {indent: false, logLevel: 'error', binariesDirectory: null};
	const ffmpeg: string = RenderInternals.getExecutablePath({...opts, type: 'ffmpeg'});
	const ffprobe: string = RenderInternals.getExecutablePath({...opts, type: 'ffprobe'});
	const dir = path.dirname(ffmpeg);
	return {ffmpeg, ffprobe, env: process.platform === 'darwin' ? {DYLD_LIBRARY_PATH: dir} : {}, source: 'remotion'};
};

/** Filters only a full ffmpeg has; QA uses them when present and marks their checks NOT CHECKED otherwise. */
export const FULL_FILTERS = ['ebur128', 'signalstats', 'freezedetect', 'blackdetect', 'tile', 'drawbox', 'alimiter', 'scdet'];

export const FFMPEG_INSTALL_HINT =
	process.platform === 'darwin'
		? 'brew install ffmpeg'
		: process.platform === 'win32'
			? 'winget install Gyan.FFmpeg   (or choco install ffmpeg)'
			: 'sudo apt install ffmpeg   (Fedora: sudo dnf install ffmpeg; Arch: sudo pacman -S ffmpeg)';

const filterSet = (bin: string, env: Record<string, string> = {}) => {
	const r = spawnSync(bin, ['-hide_banner', '-filters'], {encoding: 'utf8', env: {...process.env, ...env}});
	return new Set(String(r.stdout ?? '').split('\n').map((l) => l.trim().split(/\s+/)[1]).filter(Boolean));
};

let sys: {ffmpeg: string; ffprobe: string; version: string; filters: Set<string>; full: boolean} | null | undefined;

/** A system ffmpeg ≥ 5 on PATH (with ffprobe next to it), or null. */
export const systemFfmpeg = () => {
	if (sys !== undefined) return sys;
	const ff = which('ffmpeg');
	const fp = which('ffprobe');
	if (!ff || !fp) return (sys = null);
	const v = spawnSync(ff, ['-version'], {encoding: 'utf8'});
	const version = /ffmpeg version n?(\S+)/.exec(String(v.stdout ?? ''))?.[1] ?? '?';
	const major = Number(/^(\d+)/.exec(version)?.[1] ?? 0);
	const filters = filterSet(ff);
	// git builds report e.g. "N-12345-g…": accept them when the filter set is complete
	const recent = major >= 5 || (major === 0 && filters.has('loudnorm'));
	return (sys = recent ? {ffmpeg: ff, ffprobe: fp, version, filters, full: FULL_FILTERS.every((f) => filters.has(f))} : null);
};

let activeFilters: Set<string> | null = null;
/** Filters of the ffmpeg in use (for QA: which checks can run). */
export const capabilities = () => {
	if (!activeFilters) {
		const b = ffBins();
		activeFilters = b.source === 'system' && sys ? sys.filters : filterSet(b.ffmpeg, b.env);
	}
	return activeFilters;
};

export const ffBins = (): Bins => {
	if (bins) return bins;
	const envFf = process.env.LAUNCHFILM_FFMPEG;
	let choice = envFf ? envFf : loadConfig().ffmpeg.binary;
	if (choice === 'auto') choice = systemFfmpeg()?.full ? 'system' : 'remotion';
	if (choice === 'system') {
		const ff = which('ffmpeg');
		const fp = which('ffprobe');
		if (!ff || !fp) die('ffmpeg.binary is "system" but ffmpeg/ffprobe are not on PATH', 'install ffmpeg, or set "ffmpeg": {"binary": "remotion"} in harness.config.json');
		bins = {ffmpeg: ff!, ffprobe: fp!, env: {}, source: 'system'};
	} else if (choice && choice !== 'remotion') {
		const fp = process.env.LAUNCHFILM_FFPROBE ?? path.join(path.dirname(choice), path.basename(choice).replace('ffmpeg', 'ffprobe'));
		bins = {ffmpeg: choice, ffprobe: fp, env: {}, source: 'custom'};
	} else {
		bins = remotionBins();
	}
	return bins;
};

export const ffmpeg = (args: string[], opts: RunOpts = {}, what = 'ffmpeg') => {
	const b = ffBins();
	return runOk(b.ffmpeg, ['-hide_banner', '-nostdin', ...args], {...opts, env: {...b.env, ...opts.env}}, what);
};

export const ffmpegRaw = (args: string[], opts: RunOpts = {}) => {
	const b = ffBins();
	return run(b.ffmpeg, ['-hide_banner', '-nostdin', ...args], {...opts, env: {...b.env, ...opts.env}});
};

export const ffprobeJson = async (file: string): Promise<any> => {
	const b = ffBins();
	const r = await runOk(b.ffprobe, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path.resolve(file)], {env: b.env}, 'ffprobe');
	return JSON.parse(r.stdout.toString('utf8'));
};

export interface MediaInfo {
	duration: number;
	size: number;
	formatName: string;
	video?: {codec: string; profile?: string; width: number; height: number; fps: number; pixFmt: string; frames?: number; bitRate?: number};
	audio?: {codec: string; sampleRate: number; channels: number; bitRate?: number};
}

const ratio = (s?: string) => {
	if (!s) return 0;
	const [a, b] = s.split('/').map(Number);
	return b ? a / b : a;
};

export const probe = async (file: string): Promise<MediaInfo> => {
	const j = await ffprobeJson(file);
	const v = j.streams?.find((s: any) => s.codec_type === 'video' && s.disposition?.attached_pic !== 1);
	const a = j.streams?.find((s: any) => s.codec_type === 'audio');
	return {
		duration: Number(j.format?.duration ?? v?.duration ?? a?.duration ?? 0),
		size: Number(j.format?.size ?? 0),
		formatName: j.format?.format_name ?? '',
		video: v
			? {
					codec: v.codec_name,
					profile: v.profile,
					width: v.width,
					height: v.height,
					fps: ratio(v.avg_frame_rate) || ratio(v.r_frame_rate),
					pixFmt: v.pix_fmt,
					frames: v.nb_frames ? Number(v.nb_frames) : undefined,
					bitRate: v.bit_rate ? Number(v.bit_rate) : undefined,
				}
			: undefined,
		audio: a ? {codec: a.codec_name, sampleRate: Number(a.sample_rate), channels: a.channels, bitRate: a.bit_rate ? Number(a.bit_rate) : undefined} : undefined,
	};
};

export const duration = async (file: string) => (await probe(file)).duration;

export const tmpDir = (prefix = 'launchfilm-') => mkdtempSync(path.join(os.tmpdir(), prefix));

/** Decode any audio (or the audio of a video) to float PCM via a temp 24-bit WAV. */
export const decodeAudio = async (file: string, o: {sampleRate?: number; channels?: number; start?: number; end?: number} = {}): Promise<Audio> => {
	const dir = tmpDir();
	try {
		const out = path.join(dir, 'a.wav');
		const args = ['-loglevel', 'error', '-y'];
		if (o.start) args.push('-ss', String(o.start));
		args.push('-i', path.resolve(file));
		if (o.end !== undefined) args.push('-t', String(o.end - (o.start ?? 0)));
		args.push('-vn', '-map', '0:a:0', '-c:a', 'pcm_s24le');
		if (o.sampleRate) args.push('-ar', String(o.sampleRate));
		if (o.channels) args.push('-ac', String(o.channels));
		args.push(out);
		await ffmpeg(args, {}, `decode ${path.basename(file)}`);
		return readWav(readFileSync(out));
	} finally {
		rmSync(dir, {recursive: true, force: true});
	}
};

export const hasAudioStream = async (file: string) => Boolean((await probe(file)).audio);

export interface Loudness {
	I: number;
	TP: number;
	LRA: number;
	thresh: number;
	offset: number;
}

const num = (v: unknown) => (v === '-inf' || v === 'inf' ? -Infinity : Number(v));

/** EBU R128 measurement via loudnorm's first pass (Remotion's ffmpeg has loudnorm but not ebur128). */
export const measureLoudness = async (file: string, target = {I: -14, TP: -1.5, LRA: 11}, pre = ''): Promise<Loudness> => {
	const af = `${pre ? pre + ',' : ''}loudnorm=I=${target.I}:TP=${target.TP}:LRA=${target.LRA}:print_format=json`;
	const r = await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-vn', '-af', af, '-f', 'null', '-']);
	const m = /\{[^{}]*"input_i"[^{}]*\}/s.exec(r.stderr);
	if (!m) throw new CliError(`loudness measurement failed on ${path.basename(file)}`, r.stderr.split('\n').slice(-6).join('\n'));
	const j = JSON.parse(m[0]);
	return {I: num(j.input_i), TP: num(j.input_tp), LRA: num(j.input_lra), thresh: num(j.input_thresh), offset: num(j.target_offset)};
};

/** silencedetect → [{start,end}] silent spans. */
export const silences = async (file: string, noiseDb = -50, minS = 0.05) => {
	const r = await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-vn', '-af', `silencedetect=noise=${noiseDb}dB:d=${minS}`, '-f', 'null', '-']);
	const spans: {start: number; end: number}[] = [];
	let cur: number | null = null;
	for (const line of r.stderr.split('\n')) {
		const s = /silence_start: (-?[\d.]+)/.exec(line);
		const e = /silence_end: (-?[\d.]+)/.exec(line);
		if (s) cur = Math.max(0, Number(s[1]));
		if (e) {
			spans.push({start: cur ?? 0, end: Number(e[1])});
			cur = null;
		}
	}
	if (cur !== null) spans.push({start: cur, end: Infinity});
	return spans;
};

/** Write float PCM to a WAV file (JS), then optionally convert with ffmpeg (e.g. to a different rate). */
export const writeAudio = (file: string, audio: Audio, bits: 16 | 24 = 24) => writeWav(file, audio, bits);

/**
 * Frames as raw RGB24 buffers. Uses `-r` (output rate) instead of the fps filter, which Remotion's
 * ffmpeg does not have, and image2pipe + rawvideo instead of a rawvideo muxer.
 */
export const extractFrames = async (
	file: string,
	o: {width: number; height?: number; rate?: number; at?: number[]; maxFrames?: number},
): Promise<{width: number; height: number; frames: Buffer[]; times: number[]}> => {
	const info = await probe(file);
	if (!info.video) die(`${path.basename(file)} has no video stream`);
	const w = o.width - (o.width % 2);
	const h = o.height ?? Math.max(2, Math.round((info.video!.height * w) / info.video!.width / 2) * 2);
	const scale = `scale=${w}:${h}`;
	const frameBytes = w * h * 3;
	const grab = async (args: string[]) => {
		const r = await ffmpeg([...args, '-vf', scale, '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgb24', '-'], {}, 'frame extract');
		const frames: Buffer[] = [];
		for (let i = 0; i + frameBytes <= r.stdout.length; i += frameBytes) frames.push(r.stdout.subarray(i, i + frameBytes));
		return frames;
	};
	if (o.at) {
		const frames: Buffer[] = [];
		for (const t of o.at) {
			const f = await grab(['-loglevel', 'error', '-ss', String(Math.max(0, t)), '-i', path.resolve(file), '-frames:v', '1']);
			frames.push(f[0] ?? Buffer.alloc(frameBytes));
		}
		return {width: w, height: h, frames, times: o.at};
	}
	const rate = o.rate ?? 1;
	const args = ['-loglevel', 'error', '-i', path.resolve(file), '-r', String(rate), '-fps_mode', 'cfr'];
	if (o.maxFrames) args.push('-frames:v', String(o.maxFrames));
	const frames = await grab(args);
	return {width: w, height: h, frames, times: frames.map((_, i) => i / rate)};
};
