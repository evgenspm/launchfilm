// Optional paid image / video / vision adapters. None is on by default (no free tier exists for generated footage);
// model ids come only from harness.config.json (no hard-coded preview ids: they get retired). Render all text in
// Remotion, never inside generated frames. Record provider + model per asset so the user can disclose AI use.
import {readFileSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import type {Config} from '../lib/config.js';
import {requireEnv} from '../lib/env.js';
import {download, fetchJson} from '../lib/http.js';
import {die, note} from '../lib/log.js';

export interface MediaResult {
	file: string;
	provider: string;
	model: string;
	provenance: Record<string, unknown>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const notConfigured = (what: string, key: string): never => die(`${what} is not configured`, `set ${key} in harness.config.json (a current model id from the provider's docs)`);

// ---------- images

export const generateImage = async (provider: string, prompt: string, out: string, cfg: Config, o: {aspect?: string} = {}): Promise<MediaResult> => {
	if (provider === 'gemini') {
		const key = requireEnv('GEMINI_API_KEY', 'Gemini images');
		const model = cfg.providers.image.gemini.model ?? notConfigured('Gemini image model', 'providers.image.gemini.model');
		const r = await fetchJson<any>(`Gemini image (${model})`, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
			method: 'POST',
			headers: {'x-goog-api-key': key, 'Content-Type': 'application/json'},
			body: JSON.stringify({contents: [{parts: [{text: prompt}]}], generationConfig: {responseModalities: ['IMAGE'], ...(o.aspect ? {imageConfig: {aspectRatio: o.aspect}} : {})}}),
		});
		const part = r.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData;
		if (!part) die(`Gemini returned no image (model ${model}; it may have been filtered)`);
		writeFileSync(out, Buffer.from(part.data, 'base64'));
		return {file: out, provider, model, provenance: {prompt, synthid: true}};
	}
	if (provider === 'openai') {
		const key = requireEnv('OPENAI_API_KEY', 'OpenAI images');
		const c = cfg.providers.image.openai;
		const r = await fetchJson<any>(`OpenAI images (${c.model})`, 'https://api.openai.com/v1/images/generations', {
			method: 'POST',
			headers: {Authorization: `Bearer ${key}`, 'Content-Type': 'application/json'},
			body: JSON.stringify({model: c.model, prompt, size: c.size, n: 1}),
		});
		const d = r.data?.[0];
		if (d?.b64_json) writeFileSync(out, Buffer.from(d.b64_json, 'base64'));
		else if (d?.url) await download(d.url, out, {quiet: true});
		else die('OpenAI returned no image');
		return {file: out, provider, model: c.model, provenance: {prompt, size: c.size}};
	}
	if (provider === 'fal') {
		const key = requireEnv('FAL_KEY', 'fal.ai');
		const model = cfg.providers.image.fal.model ?? notConfigured('fal image model', 'providers.image.fal.model');
		const r = await fetchJson<any>(`fal ${model}`, `https://fal.run/${model}`, {method: 'POST', headers: {Authorization: `Key ${key}`, 'Content-Type': 'application/json'}, body: JSON.stringify({prompt})});
		const url = r.images?.[0]?.url ?? r.image?.url;
		if (!url) die(`fal ${model} returned no image`);
		await download(url, out, {quiet: true});
		return {file: out, provider, model, provenance: {prompt}};
	}
	if (provider === 'runway') return die('Runway images are not implemented in this version', 'use gemini, openai or fal (providers.image.default)');
	return die(`unknown image provider ${JSON.stringify(provider)}`, 'gemini | openai | fal | runway');
};

// ---------- video

export const generateVideo = async (provider: string, prompt: string, out: string, cfg: Config, o: {seconds?: number; aspect?: string} = {}): Promise<MediaResult> => {
	if (provider === 'gemini') {
		const key = requireEnv('GEMINI_API_KEY', 'Gemini video');
		const model = cfg.providers.video.gemini.model ?? notConfigured('Gemini video model', 'providers.video.gemini.model');
		if (!/^veo-/.test(model))
			return die(
				`${model} uses the Gemini Interactions API, which this version does not implement yet`,
				'set providers.video.gemini.model to a current GA veo-* id (long-running predict), or use fal; never a *-preview id that has a shutdown date',
			);
		const base = 'https://generativelanguage.googleapis.com/v1beta';
		const op = await fetchJson<any>(`Veo (${model})`, `${base}/models/${encodeURIComponent(model)}:predictLongRunning`, {
			method: 'POST',
			headers: {'x-goog-api-key': key, 'Content-Type': 'application/json'},
			body: JSON.stringify({instances: [{prompt}], parameters: {aspectRatio: o.aspect ?? '16:9', ...(o.seconds ? {durationSeconds: o.seconds} : {})}}),
		});
		const t0 = Date.now();
		let st: any;
		for (;;) {
			await sleep(10_000);
			st = await fetchJson<any>('Veo status', `${base}/${op.name}`, {headers: {'x-goog-api-key': key}});
			if (st.done) break;
			if (Date.now() - t0 > 20 * 60_000) die('Veo did not finish within 20 minutes');
			note(`  veo: ${Math.round((Date.now() - t0) / 1000)} s…`);
		}
		if (st.error) die(`Veo error: ${JSON.stringify(st.error).slice(0, 400)}`);
		const resp = st.response ?? {};
		const samples = resp.generateVideoResponse?.generatedSamples ?? resp.generatedSamples ?? resp.videos;
		const uri = samples?.[0]?.video?.uri;
		if (!uri) die('Veo returned no video (filtered?)');
		await download(uri, out, {quiet: true, headers: {'x-goog-api-key': key}});
		return {file: out, provider, model, provenance: {prompt, synthid: true}};
	}
	if (provider === 'fal') {
		const key = requireEnv('FAL_KEY', 'fal.ai');
		const model = cfg.providers.video.fal.model ?? notConfigured('fal video model', 'providers.video.fal.model');
		const h = {Authorization: `Key ${key}`, 'Content-Type': 'application/json'};
		const q = await fetchJson<any>(`fal queue ${model}`, `https://queue.fal.run/${model}`, {method: 'POST', headers: h, body: JSON.stringify({prompt, ...(o.seconds ? {duration: String(o.seconds)} : {}), ...(o.aspect ? {aspect_ratio: o.aspect} : {})})});
		const t0 = Date.now();
		for (;;) {
			await sleep(5_000);
			const s = await fetchJson<any>('fal status', q.status_url, {headers: h});
			if (s.status === 'COMPLETED') break;
			if (Date.now() - t0 > 20 * 60_000) die('fal did not finish within 20 minutes');
			note(`  fal: ${s.status} ${Math.round((Date.now() - t0) / 1000)} s…`);
		}
		const r = await fetchJson<any>('fal result', q.response_url, {headers: h});
		const url = r.video?.url ?? r.videos?.[0]?.url;
		if (!url) die(`fal ${model} returned no video`);
		await download(url, out, {quiet: true});
		return {file: out, provider, model, provenance: {prompt, request_id: q.request_id}};
	}
	if (provider === 'runway') return die('Runway video is not implemented in this version', 'use fal (providers.video.fal.model) or a GA veo-* id via gemini');
	if (provider === 'openai') return die('OpenAI has no video API (Sora 2 was shut down on 2026-09-24)');
	return die(`unknown video provider ${JSON.stringify(provider)}`, 'gemini | fal | runway');
};

// ---------- vision (review a render; free-tier Gemini trains on uploads)

export const reviewVideo = async (file: string, prompt: string, cfg: Config): Promise<{text: string; model: string}> => {
	const key = requireEnv('GEMINI_API_KEY', 'Gemini video review');
	const c = cfg.providers.vision.gemini;
	if (statSync(file).size > 18 * 1024 * 1024) die('inline review supports files under ~18 MB', 'review a half-scale render (render --scale 0.5) or a shorter cut');
	const r = await fetchJson<any>(`Gemini review (${c.model})`, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(c.model)}:generateContent`, {
		method: 'POST',
		headers: {'x-goog-api-key': key, 'Content-Type': 'application/json'},
		body: JSON.stringify({
			contents: [{parts: [{inlineData: {mimeType: 'video/mp4', data: readFileSync(file).toString('base64')}, videoMetadata: {fps: c.fps}}, {text: prompt}]}],
			generationConfig: {mediaResolution: c.mediaResolution === 'high' ? 'MEDIA_RESOLUTION_HIGH' : 'MEDIA_RESOLUTION_MEDIUM', temperature: 0.2},
		}),
	});
	const text = (r.candidates?.[0]?.content?.parts ?? []).map((p: any) => p.text ?? '').join('').trim();
	return {text, model: c.model};
};

export const REVIEW_PROMPT = (product: string) =>
	`You are a strict motion designer reviewing a product launch film for ${product}. Only report problems you can pin to a timestamp (m:ss): ` +
	'unreadable or clipped text, text outside safe margins, static stretches over 0.6 s, jarring cuts, off-beat cuts, empty frames, ' +
	'audio/visual mismatch, spelling. One line per issue: "m:ss: issue -> fix". Then 3 lines on the overall pacing. No praise.';

export const ext = (file: string) => path.extname(file).toLowerCase();
