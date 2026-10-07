// harness.config.json: committed, user-editable. Every key has a default here, so an old or partial
// config keeps working after an update. Model ids live here (not in code) because they churn.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {studioPath} from './paths.js';
import {die} from './log.js';

export type Aspect = '16:9' | '1:1' | '4:5' | '9:16';

export interface PlatformPreset {
	/** which film composition to render: <film.id>-<aspect with x> */
	aspect: Aspect;
	width: number;
	height: number;
	fps: number;
	/** recommended length window, seconds */
	duration: [number, number];
	/** hard platform limit, seconds */
	maxDuration?: number;
	captions: 'burned' | 'srt' | 'none';
	audio: boolean;
	hookMaxS?: number;
	loop?: boolean;
	/** UI-safe margins as fractions of width/height */
	safe?: {top: number; bottom: number; left: number; right: number};
	platform: string;
	maxMB?: number;
	/** per-preset CRF override (hero-loop: 23–28) */
	crf?: number;
}

export const DEFAULTS = {
	$schema: '../schemas/harness-config.schema.json',
	credit: true,
	defaultPresets: ['x-16x9', 'li-4x5'],
	// Numbers from craft/10-platforms.md. safe = UI-covered margins as fractions of width/height (px = fraction × size).
	presets: {
		'x-16x9': {aspect: '16:9', width: 1920, height: 1080, fps: 30, duration: [30, 45], maxDuration: 140, captions: 'burned', audio: true, hookMaxS: 1.5, safe: {top: 0.0556, right: 0.05, bottom: 0.1111, left: 0.05}, platform: 'X', maxMB: 512},
		'li-4x5': {aspect: '4:5', width: 1080, height: 1350, fps: 30, duration: [30, 60], captions: 'burned', audio: true, hookMaxS: 1.5, safe: {top: 0.0593, right: 0.0593, bottom: 0.1185, left: 0.0593}, platform: 'LinkedIn', maxMB: 5000},
		'li-1x1': {aspect: '1:1', width: 1080, height: 1080, fps: 30, duration: [30, 60], captions: 'burned', audio: true, hookMaxS: 1.5, safe: {top: 0.0593, right: 0.0593, bottom: 0.1296, left: 0.0593}, platform: 'LinkedIn', maxMB: 5000},
		'ph-16x9': {aspect: '16:9', width: 1920, height: 1080, fps: 30, duration: [60, 90], captions: 'burned', audio: true, hookMaxS: 3, safe: {top: 0.05, right: 0.05, bottom: 0.1019, left: 0.05}, platform: 'Product Hunt / YouTube'},
		'hero-loop': {aspect: '16:9', width: 1920, height: 1080, fps: 30, duration: [10, 20], captions: 'none', audio: false, loop: true, crf: 24, safe: {top: 0.125, right: 0.125, bottom: 0.125, left: 0.125}, platform: 'Website hero'},
		'reel-9x16': {aspect: '9:16', width: 1080, height: 1920, fps: 30, duration: [15, 30], maxDuration: 90, captions: 'burned', audio: true, hookMaxS: 1, safe: {top: 0.1146, right: 0.1296, bottom: 0.25, left: 0.0556}, platform: 'Reels / Shorts / TikTok'},
	} as Record<string, PlatformPreset>,
	render: {
		crf: 18,
		x264Preset: 'medium',
		pixelFormat: 'yuv420p',
		/** bt709 = BT.709 tags + TV range (yuv420p). Remotion 4's "default" gives full-range yuvj420p. */
		colorSpace: 'bt709',
		audioCodec: 'aac',
		audioBitrate: '192k',
		sampleRate: 48000,
		concurrency: null as number | null,
		/** Remotion --gl value (angle, swangle, egl, vulkan). null = Remotion default; env REMOTION_GL wins. */
		gl: null as string | null,
		poster: 'frame0' as 'frame0' | 'none',
	},
	audio: {
		master: {I: -14, TP: -1.5, LRA: 11},
		vo: {I: -16, TP: -1.5, LRA: 11, tempo: 1.0, silenceDb: -50, padS: 0.04, targetWordsPerS: 2.7},
		music: {I: -14, TP: -1.5, LRA: 11, fadeOutS: 1.5, fadeInS: 0},
		sfx: {peakDb: -3, sampleRate: 48000},
	},
	ffmpeg: {
		/**
		 * auto (default) = a system ffmpeg ≥ 5 on PATH when it has the full filter set (ebur128, signalstats, freezedetect,
		 * blackdetect, tile, drawbox), else Remotion's bundled minimal build. "remotion" | "system" | an absolute path force one.
		 */
		binary: 'auto',
	},
	providers: {
		tts: {
			default: 'kokoro',
			takes: 3,
			kokoro: {
				model: 'kokoro-int8-multi-lang-v1_0',
				url: 'https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/kokoro-int8-multi-lang-v1_0.tar.bz2',
				voice: 'af_heart',
				speed: 1.0,
				threads: 2,
			},
			elevenlabs: {model: 'eleven_v4', voice: 'JBFqnCBsd6RMkjVDRZzb', outputFormat: 'mp3_44100_128', stability: null as number | null},
			cartesia: {model: 'sonic-3.6', voice: null as string | null, apiVersion: '2026-08-14', language: 'en', sampleRate: 44100},
			azure: {voice: 'en-US-AvaMultilingualNeural', outputFormat: 'riff-48khz-16bit-mono-pcm'},
			gemini: {
				model: 'gemini-3.8-flash-tts',
				voice: 'Kore',
				style: 'Say this casually and understated, like a founder showing a friend something on a laptop. Conversational, a bit quick, no selling, not an ad read:',
			},
			openai: {model: 'gpt-4o-mini-tts', voice: 'marin', instructions: 'Casual, understated founder voice. Conversational, slightly quick, not an announcer.'},
			say: {voice: null as string | null},
		},
		words: {
			/** auto = native timings from the TTS provider when it has them, else whisper */
			default: 'auto',
			whisper: {model: 'large-v3-turbo', version: '1.8.2', binary: 'auto', language: 'en', noFlashAttention: true},
			elevenlabs: {},
			deepgram: {model: 'nova-3', language: 'en'},
		},
		music: {
			default: 'library',
			lyria: {model: 'lyria-3.5'},
			elevenlabs: {model: 'music_v2_5'},
			stableAudio: {model: 'stable-audio-2.5'},
		},
		sfx: {
			default: 'procedural',
			elevenlabs: {model: 'eleven_text_to_sound_v2', promptInfluence: 0.5},
			stableAudio: {model: 'stable-audio-2.5'},
			freesound: {},
		},
		image: {
			default: null as string | null,
			gemini: {model: 'gemini-nano-banana-2.1'},
			openai: {model: 'gpt-image-2.5-flare', size: '1536x1024'},
			fal: {model: null as string | null},
			runway: {model: 'gen4_image_turbo'},
		},
		video: {
			default: null as string | null,
			gemini: {model: 'gemini-omni-1.1-flash'},
			runway: {model: 'gen4.5'},
			fal: {model: 'fal-ai/kling-video/v3/pro/text-to-video'},
		},
		vision: {
			default: null as string | null,
			gemini: {model: 'gemini-3.8-flash', fps: 4, mediaResolution: 'high'},
		},
	},
	update: {repo: 'evgenspm/launchfilm', checkEveryHours: 24},
};

export type Config = typeof DEFAULTS;

const isObj = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v);

export const deepMerge = <T>(base: T, over: any): T => {
	if (!isObj(base) || !isObj(over)) return (over === undefined ? base : over) as T;
	const out: any = {...base};
	for (const [k, v] of Object.entries(over)) out[k] = isObj(v) && isObj((base as any)[k]) ? deepMerge((base as any)[k], v) : v;
	return out;
};

export const CONFIG_PATH = studioPath('harness.config.json');

let cached: Config | null = null;

export const loadConfig = (): Config => {
	if (cached) return cached;
	let user: any = {};
	if (existsSync(CONFIG_PATH)) {
		try {
			user = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
		} catch (e) {
			die(`harness.config.json is not valid JSON: ${(e as Error).message}`, `fix the file or delete it and run: npx launchfilm init`);
		}
	}
	cached = deepMerge(DEFAULTS, user);
	return cached;
};

/** Set one dotted key in the user's harness.config.json without rewriting the rest of their file. */
export const setConfigKey = (dotted: string, value: unknown) => {
	const raw = existsSync(CONFIG_PATH) ? JSON.parse(readFileSync(CONFIG_PATH, 'utf8')) : {};
	const keys = dotted.split('.');
	let o = raw;
	for (const k of keys.slice(0, -1)) o = o[k] = isObj(o[k]) ? o[k] : {};
	o[keys.at(-1)!] = value;
	writeFileSync(CONFIG_PATH, JSON.stringify(raw, null, 2) + '\n');
	cached = null;
};

export const preset = (cfg: Config, id: string): PlatformPreset => {
	const p = cfg.presets[id];
	if (!p) die(`unknown preset ${JSON.stringify(id)}`, `presets: ${Object.keys(cfg.presets).join(', ')} (harness.config.json → presets)`);
	return p;
};
