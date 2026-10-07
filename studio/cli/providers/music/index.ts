// Music sources. library = public/music/music.json (CC0 / CC BY 4.0 beds, fetched on install). Paid adapters write
// into the user's own film folder only. ElevenLabs Music forbids "music libraries & repositories", so its output must
// never land in public/music/ (the shared library); the command enforces that.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {requireEnv} from '../../lib/env.js';
import {fetchJson, fetchOk} from '../../lib/http.js';
import {die} from '../../lib/log.js';
import {PUBLIC_DIR} from '../../lib/paths.js';
import type {MusicRequest, MusicResult} from '../types.js';

export interface LibraryTrack {
	id: string;
	title: string;
	artist: string;
	file: string;
	source_page_url: string;
	download_url: string;
	license: string;
	license_url: string;
	attribution: string;
	bpm: number | null;
	duration_s: number;
	mood: string[];
	kind?: 'bed' | 'sting';
	content_id_note?: string;
	sha256?: string;
	zip_entry?: string;
}

export const MUSIC_DIR = path.join(PUBLIC_DIR, 'music');
export const MUSIC_MANIFEST = path.join(MUSIC_DIR, 'music.json');

export const readLibrary = (): LibraryTrack[] => (existsSync(MUSIC_MANIFEST) ? JSON.parse(readFileSync(MUSIC_MANIFEST, 'utf8')).tracks ?? [] : []);

export const pickTracks = (tracks: LibraryTrack[], o: {mood?: string; bpm?: number; lengthS?: number}) =>
	tracks
		.filter((t) => existsSync(path.join(MUSIC_DIR, t.file)))
		.map((t) => {
			let score = 0;
			for (const m of (o.mood ?? '').toLowerCase().split(/[\s,]+/).filter(Boolean)) if (t.mood.some((x) => x.includes(m))) score += 2;
			if (o.bpm && t.bpm) score -= Math.abs(t.bpm - o.bpm) / 10;
			if ((t.kind ?? 'bed') === 'sting') score -= 5;
			return {t, score};
		})
		.sort((a, b) => b.score - a.score);

const prompted = (r: MusicRequest) => `${r.prompt}${r.bpm ? `, ${r.bpm} BPM` : ''}, instrumental, no vocals`;

export const lyria = async (r: MusicRequest): Promise<MusicResult> => {
	const key = requireEnv('GEMINI_API_KEY', 'Lyria (Gemini API)');
	const model = r.cfg.providers.music.lyria.model;
	const res = await fetchJson<any>(`Lyria (${model})`, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
		method: 'POST',
		headers: {'x-goog-api-key': key, 'Content-Type': 'application/json'},
		body: JSON.stringify({contents: [{parts: [{text: `${prompted(r)}, about ${Math.round(r.lengthS)} seconds`}]}]}),
		timeoutMs: 900_000,
	});
	const part = res.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData;
	if (!part) die(`Lyria returned no audio (model ${model})`, 'check providers.music.lyria.model; some Lyria models need the Interactions API');
	const ext = /wav/.test(part.mimeType ?? '') ? 'wav' : 'mp3';
	const file = `${r.outBase}.${ext}`;
	writeFileSync(file, Buffer.from(part.data, 'base64'));
	return {file, provider: 'lyria', model, license: 'Google Gemini API terms (Google claims no ownership; SynthID watermark)', provenance: {model, prompt: prompted(r)}};
};

export const elevenlabsMusic = async (r: MusicRequest): Promise<MusicResult> => {
	const key = requireEnv('ELEVENLABS_API_KEY', 'ElevenLabs Music');
	const model = r.cfg.providers.music.elevenlabs.model;
	const ms = Math.round(Math.min(600, Math.max(3, r.lengthS + 1)) * 1000);
	const res = await fetchOk('ElevenLabs music', 'https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', {
		method: 'POST',
		headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
		body: JSON.stringify({prompt: prompted(r), music_length_ms: ms, force_instrumental: true, model_id: model, ...(r.seed !== undefined ? {seed: r.seed} : {})}),
		timeoutMs: 900_000,
	});
	const file = `${r.outBase}.mp3`;
	writeFileSync(file, Buffer.from(await res.arrayBuffer()));
	return {
		file,
		provider: 'elevenlabs',
		model,
		license: 'ElevenLabs Music terms (paid plan; no film/TV; never add to a music library or repository)',
		provenance: {model, prompt: prompted(r), music_length_ms: ms, seed: r.seed ?? null},
	};
};

export const stableAudioMusic = async (r: MusicRequest): Promise<MusicResult> => {
	const key = requireEnv('STABILITY_API_KEY', 'Stable Audio');
	const model = r.cfg.providers.music.stableAudio.model;
	const form = new FormData();
	form.set('prompt', prompted(r));
	form.set('duration', String(Math.min(190, Math.max(1, Math.ceil(r.lengthS + 1)))));
	form.set('output_format', 'wav');
	if (r.seed !== undefined) form.set('seed', String(r.seed));
	const res = await fetchOk('Stable Audio', 'https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio', {
		method: 'POST',
		headers: {Authorization: `Bearer ${key}`, Accept: 'audio/*'},
		body: form,
		timeoutMs: 900_000,
	});
	const file = `${r.outBase}.wav`;
	writeFileSync(file, Buffer.from(await res.arrayBuffer()));
	return {file, provider: 'stable-audio', model, license: 'Stability AI terms ("you own the Output")', provenance: {model, prompt: prompted(r), seed: r.seed ?? null}};
};
