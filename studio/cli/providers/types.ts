// Small provider interfaces. Every adapter takes plain options and returns file paths + metadata;
// the shared post-processing (trim, tempo, loudness, alignment) lives in the commands.
import type {Config} from '../lib/config.js';

/** One word with times in seconds. `emph` marks *word* emphasis from the script. */
export interface WordTiming {
	w: string;
	s: number;
	e: number;
	emph?: boolean;
	conf?: number;
}

export interface TtsRequest {
	text: string;
	voice?: string;
	/** where to write the raw take (any format ffmpeg can read; the adapter picks the extension) */
	outBase: string;
	take: number;
	cfg: Config;
}

export interface TtsResult {
	file: string;
	/** native word timings relative to the start of `file` */
	words?: WordTiming[];
	provider: string;
	model?: string;
	voice?: string;
	/** true for output that must not be published (macOS say) */
	previewOnly?: boolean;
}

export interface TtsProvider {
	id: string;
	/** same input → same audio; one take is enough */
	deterministic: boolean;
	nativeTimings: boolean;
	synth(req: TtsRequest): Promise<TtsResult>;
}

export interface AlignRequest {
	audio: string;
	/** clean script text (markup removed) or null for plain transcription */
	script: string | null;
	language?: string;
	cfg: Config;
}

export interface WordsProvider {
	id: string;
	/** words as heard, with times relative to the audio start */
	transcribe(req: AlignRequest): Promise<WordTiming[]>;
}

export interface MusicRequest {
	prompt: string;
	lengthS: number;
	bpm?: number;
	mood?: string;
	outBase: string;
	cfg: Config;
	seed?: number;
}

export interface MusicResult {
	file: string;
	provider: string;
	model?: string;
	license: string;
	attribution?: string;
	provenance: Record<string, unknown>;
}

export interface SfxRequest {
	prompt: string;
	durationS?: number;
	outBase: string;
	cfg: Config;
}

export interface SfxResult {
	file: string;
	provider: string;
	license: string;
	attribution?: string;
	provenance: Record<string, unknown>;
}
