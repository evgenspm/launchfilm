// vo <slug>: voice every VO line in films/<slug>/film.json.
// Per line: N takes from the TTS provider → pick the best → trim silence, tempo → two-pass loudnorm to -16 LUFS,
// 48 kHz mono → public/films/<slug>/<line>.wav + <line>.words.json (native timings, else whisper snapped to the
// script). film.json vo[].src/words are updated; unchanged lines are skipped (text hash) unless --force.
import {createHash} from 'node:crypto';
import {existsSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {list, num, parseArgs, str} from '../lib/args.js';
import {loadConfig, type Config} from '../lib/config.js';
import {duration, ffmpeg, silences} from '../lib/ffmpeg.js';
import {loadFilm, saveFilm, type VoLine} from '../lib/film.js';
import {normalizeLoudness} from '../lib/loudness.js';
import {die, fmtS, say, warn} from '../lib/log.js';
import {ensureDir, filmPublicDir, HARNESS_DIR, PUBLIC_DIR, posix, rel} from '../lib/paths.js';
import {cleanScript} from '../lib/words.js';
import {ttsProvider} from '../providers/tts/index.js';
import type {TtsResult, WordTiming} from '../providers/types.js';
import {makeWords, printPhrases} from './words.js';

const hash = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 12);

interface Take {
	n: number;
	res: TtsResult;
	dur: number;
	speech: {start: number; end: number};
	wps: number;
	score: number;
}

/** Speech span from silencedetect: first silence touching 0 → start, last touching the end → end. */
const speechSpan = async (file: string, dur: number, cfg: Config) => {
	const sil = await silences(file, cfg.audio.vo.silenceDb, 0.05);
	let start = 0;
	let end = dur;
	const first = sil.find((s) => s.start <= 0.01);
	if (first) start = Math.min(first.end, dur);
	const last = [...sil].reverse().find((s) => s.end === Infinity || s.end >= dur - 0.02);
	if (last && last.start > start) end = last.start;
	return {start, end};
};

/** Heuristic best take (no judge): drop duration outliers (truncated or rambling), then pick the pace closest to target. */
const pickTake = (takes: Take[], targetWps: number): Take => {
	if (takes.length === 1) return takes[0];
	const durs = takes.map((t) => t.speech.end - t.speech.start).sort((a, b) => a - b);
	const median = durs[Math.floor(durs.length / 2)];
	for (const t of takes) {
		const d = t.speech.end - t.speech.start;
		const outlier = Math.abs(d - median) / median > 0.25 ? 10 : 0;
		t.score = -(Math.abs(t.wps - targetWps) + outlier);
	}
	return [...takes].sort((a, b) => b.score - a.score)[0];
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['force', 'json']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm vo <slug> [--line l1,l2] [--provider kokoro] [--voice v] [--takes N] [--tempo 1.0] [--force]');
	const cfg = loadConfig();
	const film = loadFilm(slug);
	const lines = film.spec.vo ?? [];
	if (!lines.length) die(`films/${slug}/film.json has no vo lines`, 'add "vo": [{"id": "l1", "text": "...", "at": 0.5}]');
	const only = list(a.flags, 'line');
	const providerId = str(a.flags, 'provider') ?? cfg.providers.tts.default;
	const provider = ttsProvider(providerId);
	const tempo = num(a.flags, 'tempo', cfg.audio.vo.tempo)!;
	const nTakes = provider.deterministic ? 1 : Math.max(1, num(a.flags, 'takes', cfg.providers.tts.takes)!);
	const outDir = ensureDir(filmPublicDir(slug));
	const results: Record<string, unknown>[] = [];
	let prevEnd = 0;
	for (const line of lines) {
		if (!line.id || !line.text) die(`vo line without id/text in films/${slug}/film.json`);
		const wavAbs = path.join(outDir, `${line.id}.wav`);
		const wordsAbs = path.join(outDir, `${line.id}.words.json`);
		const voice = (str(a.flags, 'voice') ?? line.voice) as string | undefined;
		const key = hash(JSON.stringify({text: line.text, provider: providerId, voice: voice ?? null, tempo}));
		const selected = !only || only.includes(line.id);
		if (selected && !a.flags.force && existsSync(wavAbs) && existsSync(wordsAbs)) {
			try {
				if (JSON.parse(readFileSync(wordsAbs, 'utf8')).voice?.key === key) {
					say(`vo ${slug}/${line.id}: unchanged, skipped (--force to redo)`);
					prevEnd = Number(line.at ?? prevEnd) + (await duration(wavAbs));
					continue;
				}
			} catch {
				// regenerate
			}
		}
		if (!selected) {
			if (existsSync(wavAbs)) prevEnd = Number(line.at ?? prevEnd) + (await duration(wavAbs));
			continue;
		}
		const t0 = Date.now();
		const clean = cleanScript(line.text);
		const takesDir = ensureDir(path.join(HARNESS_DIR, 'takes', slug, line.id));
		const raw = await Promise.all(
			Array.from({length: nTakes}, (_, i) => provider.synth({text: clean, voice, outBase: path.join(takesDir, `take${i + 1}`), take: i + 1, cfg})),
		);
		const takes: Take[] = [];
		for (const [i, res] of raw.entries()) {
			const dur = await duration(res.file);
			const speech = await speechSpan(res.file, dur, cfg);
			const words = clean.split(/\s+/).length;
			takes.push({n: i + 1, res, dur, speech, wps: words / Math.max(0.2, speech.end - speech.start), score: 0});
		}
		const best = pickTake(takes, cfg.audio.vo.targetWordsPerS);
		if (best.res.previewOnly) warn(`${providerId} output is PREVIEW ONLY (licence forbids publishing it). Re-voice with a publishable provider before the final render.`);

		// trim + tempo → temp wav, then two-pass loudnorm → final 48 kHz mono
		const pad = cfg.audio.vo.padS;
		const start = Math.max(0, best.speech.start - pad);
		const end = Math.min(best.dur, best.speech.end + pad);
		const trimmed = path.join(takesDir, 'trimmed.wav');
		const af = [`atrim=start=${start.toFixed(4)}:end=${end.toFixed(4)}`, 'asetpts=N/SR/TB', ...(Math.abs(tempo - 1) > 1e-3 ? [`atempo=${tempo}`] : [])].join(',');
		await ffmpeg(['-loglevel', 'error', '-y', '-i', path.resolve(best.res.file), '-af', af, '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s24le', trimmed], {}, 'trim VO');
		const ln = await normalizeLoudness(trimmed, wavAbs, cfg.audio.vo, {codec: 'pcm_s16le', sampleRate: 48000, channels: 1});
		rmSync(trimmed, {force: true});

		// words: native timings shifted by trim + tempo, else alignment
		const native: WordTiming[] | undefined = best.res.words?.map((w) => ({...w, s: Math.max(0, (w.s - start) / tempo), e: Math.max(0, (w.e - start) / tempo)}));
		const j = await makeWords({audio: wavAbs, script: line.text, native, cfg});
		const voiceMeta = {key, provider: best.res.provider, model: best.res.model ?? null, voice: best.res.voice ?? null, take: `${best.n}/${takes.length}`, tempo, previewOnly: Boolean(best.res.previewOnly)};
		writeFileSync(wordsAbs, JSON.stringify({...j, voice: voiceMeta}, null, 1) + '\n');
		writeFileSync(path.join(takesDir, 'takes.json'), JSON.stringify(takes.map((t) => ({n: t.n, file: t.res.file, dur: t.dur, speech: t.speech, wps: t.wps, score: t.score})), null, 1));

		// film.json: src/words (paths under public/), and an `at` for lines that have none
		const l = film.spec.vo!.find((x: VoLine) => x.id === line.id)!;
		l.src = posix(path.relative(PUBLIC_DIR, wavAbs));
		l.words = posix(path.relative(PUBLIC_DIR, wordsAbs));
		if (l.at === undefined) l.at = Math.round((prevEnd + (prevEnd ? 0.6 : 0.5)) * 100) / 100;
		prevEnd = Number(l.at) + j.duration;

		const msg = `vo ${slug}/${line.id}: ${fmtS(j.duration)} (${best.res.provider}${best.res.voice ? ` ${best.res.voice}` : ''}, take ${best.n}/${takes.length}${j.match !== null ? `, match ${(j.match * 100).toFixed(0)}%` : ''}, ${ln.after ? `${ln.after.I.toFixed(1)} LUFS` : ln.note}, ${((Date.now() - t0) / 1000).toFixed(0)} s) → ${rel(wavAbs)}`;
		say(msg);
		if (!a.flags.json) printPhrases(j);
		results.push({id: line.id, src: l.src, words: l.words, duration: j.duration, match: j.match, lufs: ln.after?.I ?? null, voice: voiceMeta});
	}
	saveFilm(film);
	if (a.flags.json) console.log(JSON.stringify({ok: true, film: slug, lines: results}, null, 1));
	return 0;
};
