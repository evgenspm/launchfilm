// public/sfx/sfx.json: the sound library manifest. Every committed file needs an entry with a licence
// (CI gate: CC0-1.0 only for files in the harness repo).
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {activeSpan, integratedLoudness, linToDb, normalizePeak, rmsDb, samplePeak, slice, toChannels, truePeak} from './dsp.js';
import {decodeAudio} from './ffmpeg.js';
import {ensureDir, PUBLIC_DIR, posix} from './paths.js';
import {writeWav, type Audio} from './wav.js';

export interface SfxEntry {
	id: string;
	/** what to put in film.json sfx[].sound: the file path under public/sfx/ without .wav */
	sound?: string;
	file: string;
	tags: string[];
	duration: number;
	peak: number;
	truePeak?: number;
	lufs?: number | null;
	rms?: number;
	channels: number;
	license: string;
	source: string;
	description?: string;
	use?: string;
	author?: string;
	url?: string;
	attribution?: string;
	provenance?: Record<string, unknown>;
}

export interface SfxManifest {
	$comment?: string;
	version: 1;
	format: {sampleRate: number; peakDbfs: number; container: 'wav'};
	sounds: SfxEntry[];
}

export const SFX_DIR = path.join(PUBLIC_DIR, 'sfx');
export const SFX_MANIFEST = path.join(SFX_DIR, 'sfx.json');

export const readSfxManifest = (): SfxManifest => {
	if (existsSync(SFX_MANIFEST)) return JSON.parse(readFileSync(SFX_MANIFEST, 'utf8'));
	return {
		$comment: 'launchfilm SFX library: 48 kHz WAV, peak -3 dBFS. In film.json use sfx: [{at, sound: <sound>}] (resolves to public/sfx/<sound>.wav). Licence per entry; CC0-1.0 only in the harness repo.',
		version: 1,
		format: {sampleRate: 48000, peakDbfs: -3, container: 'wav'},
		sounds: [],
	};
};

export const writeSfxManifest = (m: SfxManifest) => {
	ensureDir(SFX_DIR);
	m.sounds.sort((a, b) => (a.source === b.source ? a.id.localeCompare(b.id) : a.source.localeCompare(b.source)));
	writeFileSync(SFX_MANIFEST, JSON.stringify(m, null, 1) + '\n');
};

export const upsertSfx = (m: SfxManifest, e: SfxEntry) => {
	e = {...e, sound: e.sound ?? e.file.replace(/\.wav$/, '')};
	const i = m.sounds.findIndex((s) => s.id === e.id);
	if (i >= 0) m.sounds[i] = e;
	else m.sounds.push(e);
};

const r2 = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? null : Math.round(v * 100) / 100);

export const measure = (a: Audio) => ({
	duration: Math.round(((a.channels[0]?.length ?? 0) / a.sampleRate) * 1000) / 1000,
	peak: r2(linToDb(samplePeak(a))) as number,
	truePeak: r2(linToDb(truePeak(a))) as number,
	lufs: r2(integratedLoudness(a)),
	rms: r2(rmsDb(a)) as number,
	channels: a.channels.length,
});

/** Decode any file → 48 kHz, ≤2 channels, trimmed of silence, peak -3 dBFS, written as 16-bit WAV. */
export const normalizeToLibrary = async (src: string, dest: string, o: {peakDb?: number; trimDb?: number} = {}) => {
	let a = await decodeAudio(src, {sampleRate: 48000});
	if (a.channels.length > 2) a = toChannels(a, 2);
	const span = activeSpan(a, o.trimDb ?? -60);
	if (span) a = slice(a, Math.max(0, span.start - 0.005), Math.min(a.channels[0].length / a.sampleRate, span.end + 0.02));
	a = normalizePeak(a, o.peakDb ?? -3);
	ensureDir(path.dirname(dest));
	writeWav(dest, a, 16);
	return {audio: a, rel: posix(path.relative(SFX_DIR, dest))};
};
