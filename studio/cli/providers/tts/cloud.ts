// Paid / keyed TTS adapters (REST via fetch, no SDKs). Model ids and voices come from harness.config.json.
// None of these log keys; errors pass through redact().
import {writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {getEnv, requireEnv} from '../../lib/env.js';
import {fetchJson, fetchOk} from '../../lib/http.js';
import {die} from '../../lib/log.js';
import {encodeWav} from '../../lib/wav.js';
import type {TtsProvider, WordTiming} from '../types.js';

const pcm16ToWav = (pcm: Buffer, sampleRate: number) => {
	const n = Math.floor(pcm.length / 2);
	const ch = new Float32Array(n);
	for (let i = 0; i < n; i++) ch[i] = pcm.readInt16LE(i * 2) / 32768;
	return encodeWav({sampleRate, channels: [ch]}, 16);
};

/** Characters with start/end times → words (split on whitespace). */
export const charsToWords = (chars: string[], starts: number[], ends: number[]): WordTiming[] => {
	const words: WordTiming[] = [];
	let cur: WordTiming | null = null;
	chars.forEach((c, i) => {
		if (/\s/.test(c)) {
			if (cur) words.push(cur);
			cur = null;
			return;
		}
		if (!cur) cur = {w: c, s: starts[i], e: ends[i]};
		else {
			cur.w += c;
			cur.e = ends[i];
		}
	});
	if (cur) words.push(cur);
	return words;
};

export const elevenlabs: TtsProvider = {
	id: 'elevenlabs',
	deterministic: false,
	nativeTimings: true,
	async synth({text, voice, outBase, cfg}) {
		const key = requireEnv('ELEVENLABS_API_KEY', 'ElevenLabs TTS');
		const c = cfg.providers.tts.elevenlabs;
		const v = voice ?? c.voice;
		const body: Record<string, unknown> = {text, model_id: c.model};
		if (c.stability != null) body.voice_settings = {stability: c.stability};
		const r = await fetchJson<any>('ElevenLabs text-to-speech/with-timestamps', `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(v)}/with-timestamps?output_format=${c.outputFormat}`, {
			method: 'POST',
			headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		});
		const ext = c.outputFormat.startsWith('mp3') ? 'mp3' : c.outputFormat.startsWith('wav') ? 'wav' : 'pcm';
		let audio: Buffer = Buffer.from(r.audio_base64, 'base64');
		let file = `${outBase}.${ext}`;
		if (ext === 'pcm') {
			audio = pcm16ToWav(audio, Number(c.outputFormat.split('_')[1]) || 44100);
			file = `${outBase}.wav`;
		}
		writeFileSync(file, audio);
		const al = r.alignment; // not normalized_alignment: keeps the script's own characters
		const words = al ? charsToWords(al.characters, al.character_start_times_seconds, al.character_end_times_seconds) : undefined;
		return {file, words, provider: 'elevenlabs', model: c.model, voice: v};
	},
};

export const cartesia: TtsProvider = {
	id: 'cartesia',
	deterministic: false,
	nativeTimings: true,
	async synth({text, voice, outBase, cfg}) {
		const key = requireEnv('CARTESIA_API_KEY', 'Cartesia TTS');
		const c = cfg.providers.tts.cartesia;
		const v = voice ?? c.voice ?? undefined;
		if (!v) die('Cartesia needs a voice id', 'set providers.tts.cartesia.voice in harness.config.json (copy an id from play.cartesia.ai)');
		const res = await fetchOk('Cartesia tts/sse', 'https://api.cartesia.ai/tts/sse', {
			method: 'POST',
			headers: {'X-API-Key': key, Authorization: `Bearer ${key}`, 'Cartesia-Version': c.apiVersion, 'Content-Type': 'application/json'},
			body: JSON.stringify({
				model_id: c.model,
				transcript: text,
				voice: {mode: 'id', id: v!},
				language: c.language,
				output_format: {container: 'raw', encoding: 'pcm_s16le', sample_rate: c.sampleRate},
				add_timestamps: true,
			}),
		});
		const chunks: Buffer[] = [];
		const words: WordTiming[] = [];
		for (const block of (await res.text()).split(/\n\n+/)) {
			const data = block
				.split('\n')
				.filter((l) => l.startsWith('data:'))
				.map((l) => l.slice(5).trim())
				.join('');
			if (!data) continue;
			let ev: any;
			try {
				ev = JSON.parse(data);
			} catch {
				continue;
			}
			if (ev.type === 'error' || ev.error) die(`Cartesia error: ${ev.error ?? ev.message ?? 'unknown'}`);
			if (ev.data && (ev.type === 'chunk' || !ev.type)) chunks.push(Buffer.from(ev.data, 'base64'));
			const wt = ev.word_timestamps;
			if (wt?.words) wt.words.forEach((w: string, i: number) => words.push({w, s: wt.start[i], e: wt.end[i]}));
		}
		const file = `${outBase}.wav`;
		writeFileSync(file, pcm16ToWav(Buffer.concat(chunks), c.sampleRate));
		return {file, words: words.length ? words : undefined, provider: 'cartesia', model: c.model, voice: v!};
	},
};

const xmlEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const azure: TtsProvider = {
	id: 'azure',
	deterministic: false,
	nativeTimings: false, // word boundaries need the Speech SDK; the REST endpoint returns audio only → aligned after
	async synth({text, voice, outBase, cfg}) {
		const key = requireEnv('AZURE_SPEECH_KEY', 'Azure Speech');
		const region = requireEnv('AZURE_SPEECH_REGION', 'Azure Speech');
		const c = cfg.providers.tts.azure;
		const v = voice ?? c.voice;
		const lang = /^[a-z]{2}-[A-Z]{2}/.exec(v)?.[0] ?? 'en-US';
		const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${xmlEscape(v)}">${xmlEscape(text)}</voice></speak>`;
		const res = await fetchOk('Azure TTS', `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
			method: 'POST',
			headers: {'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': c.outputFormat, 'User-Agent': 'launchfilm'},
			body: ssml,
		});
		const file = `${outBase}.wav`;
		writeFileSync(file, Buffer.from(await res.arrayBuffer()));
		return {file, provider: 'azure', voice: v};
	},
};

export const gemini: TtsProvider = {
	id: 'gemini',
	deterministic: false,
	nativeTimings: false,
	async synth({text, voice, outBase, cfg}) {
		const key = requireEnv('GEMINI_API_KEY', 'Gemini TTS');
		const c = cfg.providers.tts.gemini;
		const v = voice ?? c.voice;
		const body = {
			contents: [{role: 'user', parts: [{text: c.style ? `${c.style}\n\n${text}` : text}]}],
			generationConfig: {responseModalities: ['AUDIO'], speechConfig: {voiceConfig: {prebuiltVoiceConfig: {voiceName: v}}}},
		};
		const r = await fetchJson<any>(`Gemini TTS (${c.model})`, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(c.model)}:generateContent`, {
			method: 'POST',
			headers: {'x-goog-api-key': key, 'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		});
		const part = r.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData;
		if (!part) die(`Gemini TTS returned no audio (model ${c.model})`, 'check providers.tts.gemini.model; newer models may require the Interactions API');
		const rate = Number(/rate=(\d+)/.exec(part.mimeType ?? '')?.[1] ?? 24000);
		const file = `${outBase}.wav`;
		writeFileSync(file, pcm16ToWav(Buffer.from(part.data, 'base64'), rate));
		return {file, provider: 'gemini', model: c.model, voice: v};
	},
};

export const openai: TtsProvider = {
	id: 'openai',
	deterministic: false,
	nativeTimings: false,
	async synth({text, voice, outBase, cfg}) {
		const key = requireEnv('OPENAI_API_KEY', 'OpenAI TTS');
		const c = cfg.providers.tts.openai;
		const v = voice ?? c.voice;
		const body: Record<string, unknown> = {model: c.model, voice: v, input: text, response_format: 'wav'};
		if (c.instructions && !/^tts-1/.test(c.model)) body.instructions = c.instructions;
		const res = await fetchOk('OpenAI audio/speech', 'https://api.openai.com/v1/audio/speech', {
			method: 'POST',
			headers: {Authorization: `Bearer ${key}`, 'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		});
		const file = `${outBase}.wav`;
		writeFileSync(file, Buffer.from(await res.arrayBuffer()));
		return {file, provider: 'openai', model: c.model, voice: v};
	},
};

/** macOS `say`: fast drafts only. Apple's licence forbids publishing system-voice audio, so output is flagged. */
export const say: TtsProvider = {
	id: 'say',
	deterministic: true,
	nativeTimings: false,
	async synth({text, voice, outBase, cfg}) {
		if (process.platform !== 'darwin') die('the "say" voice exists only on macOS', 'use the free default: providers.tts.default = "kokoro"');
		const v = voice ?? cfg.providers.tts.say.voice;
		const file = `${outBase}.wav`;
		const args = [...(v ? ['-v', v] : []), '-o', file, '--file-format=WAVE', '--data-format=LEI16@24000', text];
		const r = spawnSync('say', args, {encoding: 'utf8'});
		if (r.status !== 0) die(`say failed: ${r.stderr}`);
		return {file, provider: 'say', voice: v ?? 'system default', previewOnly: true};
	},
};

export const hasKeyFor = (id: string) =>
	({elevenlabs: ['ELEVENLABS_API_KEY'], cartesia: ['CARTESIA_API_KEY'], azure: ['AZURE_SPEECH_KEY', 'AZURE_SPEECH_REGION'], gemini: ['GEMINI_API_KEY'], openai: ['OPENAI_API_KEY']})[id]?.every((n) => getEnv(n)) ?? true;
