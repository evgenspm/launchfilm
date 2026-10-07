// Optional paid / keyed SFX sources. Output stays in the user's project; nothing is pooled or committed upstream.
import {writeFileSync} from 'node:fs';
import {requireEnv} from '../../lib/env.js';
import {fetchJson, fetchOk, download} from '../../lib/http.js';
import {die} from '../../lib/log.js';
import type {SfxRequest, SfxResult} from '../types.js';

export const elevenlabsSfx = async ({prompt, durationS, outBase, cfg}: SfxRequest): Promise<SfxResult> => {
	const key = requireEnv('ELEVENLABS_API_KEY', 'ElevenLabs sound generation');
	const c = cfg.providers.sfx.elevenlabs;
	const body: Record<string, unknown> = {text: prompt, model_id: c.model, prompt_influence: c.promptInfluence};
	if (durationS) body.duration_seconds = Math.min(30, Math.max(0.5, durationS));
	const res = await fetchOk('ElevenLabs sound-generation', 'https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
		method: 'POST',
		headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
		body: JSON.stringify(body),
	});
	const file = `${outBase}.mp3`;
	writeFileSync(file, Buffer.from(await res.arrayBuffer()));
	return {file, provider: 'elevenlabs', license: 'ElevenLabs terms (paid plan = commercial use)', provenance: {model: c.model, prompt, durationS}};
};

export const stableAudioSfx = async ({prompt, durationS, outBase, cfg}: SfxRequest): Promise<SfxResult> => {
	const key = requireEnv('STABILITY_API_KEY', 'Stable Audio');
	const model = cfg.providers.sfx.stableAudio.model;
	if (!/2\.5|stable-audio-2/.test(model)) die(`Stable Audio model ${model} is not supported by this adapter (sync endpoint is 2.5)`, 'set providers.sfx.stableAudio.model to "stable-audio-2.5"');
	const form = new FormData();
	form.set('prompt', prompt);
	form.set('duration', String(Math.max(1, Math.round(durationS ?? 2)))); // the API default is 190 s, always pass it
	form.set('output_format', 'wav');
	const res = await fetchOk('Stable Audio text-to-audio', 'https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio', {
		method: 'POST',
		headers: {Authorization: `Bearer ${key}`, Accept: 'audio/*'},
		body: form,
	});
	const file = `${outBase}.wav`;
	writeFileSync(file, Buffer.from(await res.arrayBuffer()));
	return {file, provider: 'stable-audio', license: 'Stability AI terms ("you own the Output")', provenance: {model, prompt, durationS}};
};

/** Freesound with the user's own token: CC0 results only, HQ preview download (originals need OAuth2). */
export const freesoundSfx = async ({prompt, outBase}: SfxRequest): Promise<SfxResult> => {
	const key = requireEnv('FREESOUND_API_KEY', 'Freesound');
	const q = new URLSearchParams({query: prompt, filter: 'license:"Creative Commons 0"', fields: 'id,name,username,license,url,previews,duration', page_size: '5', sort: 'score'});
	const r = await fetchJson<any>('Freesound search', `https://freesound.org/apiv2/search/text/?${q}`, {headers: {Authorization: `Token ${key}`}});
	const hit = r.results?.[0];
	if (!hit) die(`Freesound: no CC0 results for ${JSON.stringify(prompt)}`);
	const file = `${outBase}.mp3`;
	await download(hit.previews['preview-hq-mp3'], file, {what: 'freesound preview', quiet: true, headers: {Authorization: `Token ${key}`}});
	return {
		file,
		provider: 'freesound',
		license: 'CC0-1.0',
		attribution: `"${hit.name}" by ${hit.username} (freesound.org/s/${hit.id}), CC0`,
		provenance: {id: hit.id, url: hit.url, username: hit.username, duration: hit.duration, note: 'HQ preview (~128 kbps). Freesound API commercial terms are negotiated case by case.'},
	};
};
