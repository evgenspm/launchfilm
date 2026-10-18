// whisper.cpp (MIT, large-v3-turbo weights MIT) for word timings. Binary: a whisper-cli on PATH, or one built by
// @remotion/install-whisper-cpp into the shared cache. whisper.cpp ≥ 1.8 turns flash attention on by default,
// which silently disables DTW token timestamps, and Remotion's transcribe() never passes -nfa. So we call
// whisper-cli ourselves and add -nfa whenever the binary knows the flag.
import {createRequire} from 'node:module';
import {existsSync, mkdirSync, readFileSync, rmSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import type {Config} from '../../lib/config.js';
import {ffmpeg, tmpDir} from '../../lib/ffmpeg.js';
import {die, note, warn} from '../../lib/log.js';
import {cacheDir, studioPath} from '../../lib/paths.js';
import {runOk, which} from '../../lib/proc.js';
import type {WordsProvider, WordTiming} from '../types.js';

const req = createRequire(studioPath('package.json'));
type W = Config['providers']['words']['whisper'];

const managedDir = (w: W) => cacheDir('whisper.cpp', w.version);

const managedBinary = (w: W): string | null => {
	try {
		const {getWhisperExecutablePath} = req('@remotion/install-whisper-cpp');
		return getWhisperExecutablePath(managedDir(w), w.version);
	} catch {
		return null;
	}
};

export const findWhisperBinary = (w: W): {path: string | null; source: string} => {
	if (w.binary && w.binary !== 'auto' && w.binary !== 'system' && w.binary !== 'managed') return {path: existsSync(w.binary) ? w.binary : null, source: 'config'};
	if (w.binary !== 'managed') {
		const sys = which('whisper-cli');
		if (sys) return {path: sys, source: 'system'};
		if (w.binary === 'system') return {path: null, source: 'system'};
	}
	const m = managedBinary(w);
	return {path: m && existsSync(m) ? m : null, source: 'managed'};
};

export const whisperModelPath = (w: W): string => {
	const env = process.env.WHISPER_MODEL;
	if (env && existsSync(env)) return env;
	return path.join(cacheDir('whisper-models'), `ggml-${w.model}.bin`);
};

export const whisperStatus = (cfg: Config) => {
	const w = cfg.providers.words.whisper;
	const bin = findWhisperBinary(w);
	const model = whisperModelPath(w);
	const hasModel = existsSync(model);
	return {
		ok: Boolean(bin.path) && hasModel,
		message: `whisper.cpp: binary ${bin.path ? `${bin.source}` : 'not installed'}, model ${w.model} ${hasModel ? 'present' : 'not downloaded'}`,
		fix: bin.path && hasModel ? undefined : `downloads/builds on first \`launchfilm words\` (${w.model} is ~1.6 GB; set providers.words.whisper.model to "small.en" for a lighter one)`,
	};
};

const ensureBinary = async (w: W): Promise<string> => {
	const found = findWhisperBinary(w);
	if (found.path) return found.path;
	if (found.source === 'system') die('providers.words.whisper.binary is "system" but whisper-cli is not on PATH', 'install whisper.cpp (e.g. brew install whisper-cpp) or set binary to "auto"');
	const {installWhisperCpp} = req('@remotion/install-whisper-cpp');
	note(`whisper.cpp ${w.version} not found: building it into ${managedDir(w)} (needs git + make/cmake + a C++ compiler; Windows downloads a zip)`);
	await installWhisperCpp({version: w.version, to: managedDir(w), printOutput: true});
	const m = managedBinary(w);
	if (!m || !existsSync(m)) die(`whisper.cpp build finished but ${m} is missing`);
	return m!;
};

const ensureModel = async (w: W): Promise<string> => {
	const p = whisperModelPath(w);
	if (existsSync(p)) return p;
	const {downloadWhisperModel} = req('@remotion/install-whisper-cpp');
	mkdirSync(path.dirname(p), {recursive: true});
	note(`whisper model ${w.model} not found: downloading into ${path.dirname(p)}`);
	await downloadWhisperModel({model: w.model, folder: path.dirname(p), printOutput: true});
	return p;
};

const flagCache = new Map<string, string>();
const helpText = (bin: string) => {
	if (!flagCache.has(bin)) {
		const r = spawnSync(bin, ['--help'], {encoding: 'utf8'});
		flagCache.set(bin, `${r.stdout ?? ''}${r.stderr ?? ''}`);
	}
	return flagCache.get(bin)!;
};

const dtwName = (model: string) => model.replace(/^large-v(\d)/, 'large.v$1').replace(/-turbo$/, '.turbo');

/** Proper nouns from the script as the prompt: the full script made whisper drop words it "expected". */
const promptFrom = (script: string | null) => {
	if (!script) return '';
	const names = new Set(script.match(/\b[A-Z][a-zA-Z0-9]+\b/g) ?? []);
	return [...names].sort().join(', ');
};

interface WhisperToken {
	text: string;
	offsets: {from: number; to: number};
	t_dtw?: number;
	p?: number;
}

export const whisper: WordsProvider = {
	id: 'whisper',
	async transcribe({audio, script, language, cfg}) {
		const w = cfg.providers.words.whisper;
		const bin = await ensureBinary(w);
		const model = await ensureModel(w);
		const dir = tmpDir('launchfilm-whisper-');
		try {
			const wav = path.join(dir, 'in.wav');
			await ffmpeg(['-loglevel', 'error', '-y', '-i', path.resolve(audio), '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wav], {}, 'convert to 16 kHz wav');
			const help = helpText(bin);
			const args = ['-m', model, '-f', wav, '-l', language ?? w.language, '-ojf', '-of', path.join(dir, 'out'), '-ml', '1', '-sow'];
			const canDtw = /--dtw/.test(help);
			if (canDtw) args.push('--dtw', dtwName(w.model));
			if (w.noFlashAttention && /--no-flash-attn|-nfa\b/.test(help)) args.push('-nfa');
			const prompt = promptFrom(script);
			if (prompt) args.push('--prompt', prompt);
			await runOk(bin, args, {}, 'whisper-cli');
			const j = JSON.parse(readFileSync(path.join(dir, 'out.json'), 'utf8'));
			const tokens: WhisperToken[] = (j.transcription ?? []).flatMap((seg: any) => seg.tokens ?? []);
			const words: (WordTiming & {t?: number})[] = [];
			let dtwSeen = false;
			for (const t of tokens) {
				const text: string = t.text ?? '';
				if (!text.trim() || /^\[_/.test(text.trim()) || /^\[.*\]$/.test(text.trim())) continue;
				const s = t.offsets.from / 1000;
				const e = t.offsets.to / 1000;
				const dtw = typeof t.t_dtw === 'number' && t.t_dtw >= 0 ? t.t_dtw / 100 : undefined;
				if (dtw !== undefined) dtwSeen = true;
				if (text.startsWith(' ') || words.length === 0) words.push({w: text.trim(), s, e, conf: t.p, ...(dtw !== undefined ? {t: dtw} : {})});
				else {
					const last = words[words.length - 1];
					last.w += text.trim();
					last.e = Math.max(last.e, e);
				}
			}
			if (canDtw && !dtwSeen && words.length) warn('whisper returned no DTW timestamps (flash attention on?). Timings fall back to coarser segment offsets.');
			return words;
		} finally {
			rmSync(dir, {recursive: true, force: true});
		}
	},
};
