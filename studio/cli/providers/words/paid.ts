// Paid word-timing adapters. Both return words as heard; the caller snaps them to the script.
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {requireEnv} from '../../lib/env.js';
import {fetchJson} from '../../lib/http.js';
import type {WordsProvider, WordTiming} from '../types.js';

/** ElevenLabs Forced Alignment: true alignment against the script (best paid option, ~$0.22/h). */
export const elevenlabsAlign: WordsProvider = {
	id: 'elevenlabs',
	async transcribe({audio, script}) {
		const key = requireEnv('ELEVENLABS_API_KEY', 'ElevenLabs forced alignment');
		if (!script) throw new Error('ElevenLabs forced alignment needs the script text (--script)');
		const form = new FormData();
		form.set('file', new Blob([readFileSync(audio)]), path.basename(audio));
		form.set('text', script);
		const r = await fetchJson<any>('ElevenLabs forced-alignment', 'https://api.elevenlabs.io/v1/forced-alignment', {method: 'POST', headers: {'xi-api-key': key}, body: form});
		return (r.words ?? []).filter((w: any) => w.text?.trim()).map((w: any): WordTiming => ({w: w.text.trim(), s: w.start, e: w.end, conf: w.loss != null ? Math.max(0, 1 - w.loss) : undefined}));
	},
};

/** Deepgram pre-recorded transcription with word timestamps. */
export const deepgram: WordsProvider = {
	id: 'deepgram',
	async transcribe({audio, language, cfg}) {
		const key = requireEnv('DEEPGRAM_API_KEY', 'Deepgram');
		const c = cfg.providers.words.deepgram;
		const q = new URLSearchParams({model: c.model, language: language ?? c.language, punctuate: 'true', smart_format: 'false'});
		const r = await fetchJson<any>('Deepgram listen', `https://api.deepgram.com/v1/listen?${q}`, {
			method: 'POST',
			headers: {Authorization: `Token ${key}`, 'Content-Type': 'audio/wav'},
			body: readFileSync(audio),
		});
		const words = r.results?.channels?.[0]?.alternatives?.[0]?.words ?? [];
		return words.map((w: any): WordTiming => ({w: w.punctuated_word ?? w.word, s: w.start, e: w.end, conf: w.confidence}));
	},
};
