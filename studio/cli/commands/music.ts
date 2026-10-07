// music <slug>: a bed of exactly --len seconds (default: film duration) → public/films/<slug>/music.wav at -14 LUFS
// (solo level; the film engine ducks it under VO), plus music.beats.json (beat grid of the final bed) and
// music.credits.json (licence, attribution, provenance). Longer sources are cut and faded; shorter ones loop on their
// own downbeat grid with short equal-power seams, so the beat stays regular across the loop.
import {existsSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {num, parseArgs, str} from '../lib/args.js';
import {analyzeBeats} from '../lib/beats.js';
import {loadConfig} from '../lib/config.js';
import {crossfadeConcat, fade, slice} from '../lib/dsp.js';
import {decodeAudio, tmpDir} from '../lib/ffmpeg.js';
import {loadFilm, saveFilm} from '../lib/film.js';
import {normalizeLoudness} from '../lib/loudness.js';
import {die, fmtS, say} from '../lib/log.js';
import {ensureDir, filmPublicDir, PUBLIC_DIR, posix, rel} from '../lib/paths.js';
import {audioDuration, writeWav, type Audio} from '../lib/wav.js';
import {elevenlabsMusic, lyria, MUSIC_DIR, pickTracks, readLibrary, stableAudioMusic} from '../providers/music/index.js';
import type {MusicResult} from '../providers/types.js';

/** Exact length: cut (with fade) or loop on the downbeat grid. */
export const fitLength = async (src: string, lengthS: number, o: {startS?: number; fadeOutS: number; fadeInS: number}): Promise<{audio: Audio; how: string}> => {
	let a = await decodeAudio(src, {sampleRate: 48000, channels: 2});
	const dur = audioDuration(a);
	let how: string;
	if (dur - (o.startS ?? 0) >= lengthS) {
		a = slice(a, o.startS ?? 0, (o.startS ?? 0) + lengthS);
		how = `cut ${(o.startS ?? 0).toFixed(2)}–${((o.startS ?? 0) + lengthS).toFixed(2)} s of ${dur.toFixed(1)} s`;
	} else {
		const dir = tmpDir('launchfilm-music-');
		try {
			const clip = path.join(dir, 'clip.wav');
			writeWav(clip, a, 24);
			const b = await analyzeBeats(clip);
			const downs = b.downbeats.length >= 2 ? b.downbeats : b.beats;
			if (downs.length < 2) throw new Error('no beat grid found to loop on');
			const first = downs[0];
			const last = downs[downs.length - 1];
			let out = slice(a, 0, last);
			const seg = slice(a, first, last);
			let n = 0;
			while (audioDuration(out) < lengthS + 0.5 && n < 200) {
				out = crossfadeConcat(out, seg, 0.04);
				n++;
			}
			a = slice(out, 0, lengthS);
			how = `looped ${n}× on the downbeat grid (${first.toFixed(2)}–${last.toFixed(2)} s, ${b.bpm} BPM)`;
		} finally {
			rmSync(dir, {recursive: true, force: true});
		}
	}
	a = fade(a, {inS: o.fadeInS || ((o.startS ?? 0) > 0 ? 0.01 : 0), outS: o.fadeOutS, curve: 'qsin'});
	return {audio: a, how};
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'list']});
	const slug = a._[0];
	const cfg = loadConfig();
	const library = readLibrary();
	if (a.flags.list || slug === 'list') {
		const rows = library.map((t) => `${existsSync(path.join(MUSIC_DIR, t.file)) ? ' ' : '!'} ${t.id.padEnd(28)} ${String(t.bpm ?? '?').padStart(4)} BPM  ${fmtS(t.duration_s, 0).padStart(6)}  ${t.license.padEnd(10)} ${t.mood.join(', ')}`);
		say(rows.join('\n') || 'library empty: node scripts/fetch-music.mjs');
		say('\n(! = not fetched yet: node scripts/fetch-music.mjs)');
		return 0;
	}
	if (!slug) die('usage: launchfilm music <slug> [--len s] [--mood "upbeat tech"] [--bpm 120] [--track id] [--start s] [--provider library|lyria|elevenlabs|stable-audio] [--prompt "..."] [--seed n]');
	const film = loadFilm(slug);
	const lengthS = num(a.flags, 'len') ?? film.spec.duration ?? die('--len is required (film.json has no duration)');
	const provider = str(a.flags, 'provider', cfg.providers.music.default)!;
	const outDir = ensureDir(filmPublicDir(slug));
	if (path.resolve(outDir).startsWith(path.resolve(MUSIC_DIR))) die('refusing to write film music into public/music/ (the shared library)');
	const dir = tmpDir('launchfilm-music-');
	let res: MusicResult;
	try {
		if (provider === 'library') {
			const id = str(a.flags, 'track');
			let track = id ? library.find((t) => t.id === id) : undefined;
			if (id && !track) die(`no track ${JSON.stringify(id)} in public/music/music.json`, `npx launchfilm music list`);
			if (!track) {
				const ranked = pickTracks(library, {mood: str(a.flags, 'mood'), bpm: num(a.flags, 'bpm'), lengthS});
				if (!ranked.length) die('no library music on disk', 'fetch it: node scripts/fetch-music.mjs (CC0 / CC BY 4.0 beds, ~45 MB), or use --provider');
				track = ranked[0].t;
				say(`music: picked ${track.id} (${track.bpm ?? '?'} BPM, ${track.mood.join(', ')}); next best: ${ranked.slice(1, 3).map((r) => r.t.id).join(', ') || '-'}`);
			}
			const f = path.join(MUSIC_DIR, track.file);
			if (!existsSync(f)) die(`${track.id} is not downloaded`, 'node scripts/fetch-music.mjs');
			res = {file: f, provider: 'library', license: track.license, attribution: track.attribution, provenance: {track: track.id, title: track.title, artist: track.artist, source: track.source_page_url, license_url: track.license_url, content_id: track.content_id_note ?? null}};
		} else {
			const prompt = str(a.flags, 'prompt') ?? [str(a.flags, 'mood') ?? 'modern minimal electronic product launch bed, confident, clean'].join('');
			const req = {prompt, lengthS, bpm: num(a.flags, 'bpm'), outBase: path.join(dir, 'gen'), cfg, seed: num(a.flags, 'seed')};
			res = provider === 'lyria' ? await lyria(req) : provider === 'elevenlabs' ? await elevenlabsMusic(req) : provider === 'stable-audio' || provider === 'stableAudio' ? await stableAudioMusic(req) : die(`unknown music provider ${provider}`, 'library | lyria | elevenlabs | stable-audio');
		}
		const {audio, how} = await fitLength(res.file, lengthS, {startS: num(a.flags, 'start'), fadeOutS: cfg.audio.music.fadeOutS, fadeInS: cfg.audio.music.fadeInS});
		const fitted = path.join(dir, 'fitted.wav');
		writeWav(fitted, audio, 24);
		const out = path.join(outDir, 'music.wav');
		const ln = await normalizeLoudness(fitted, out, cfg.audio.music, {codec: 'pcm_s16le', sampleRate: 48000, channels: 2});
		const beats = await analyzeBeats(out);
		const beatsFile = path.join(outDir, 'music.beats.json');
		writeFileSync(beatsFile, JSON.stringify(beats, null, 1) + '\n');
		const credits = {provider: res.provider, model: res.model ?? null, license: res.license, attribution: res.attribution ?? null, provenance: res.provenance, fitted: how, lengthS, at: new Date().toISOString()};
		writeFileSync(path.join(outDir, 'music.credits.json'), JSON.stringify(credits, null, 1) + '\n');
		// film.json: keep the user's level/duck settings, point src at the new bed; adopt its beat grid if none is set
		film.spec.music = {...(film.spec.music ?? {}), src: posix(path.relative(PUBLIC_DIR, out))};
		if (!film.spec.beats?.src && !film.spec.beats?.bpm) film.spec.beats = {src: posix(path.relative(PUBLIC_DIR, beatsFile))};
		saveFilm(film);
		const result = {file: out, beats: beatsFile, bpm: beats.bpm, lengthS, lufs: ln.after?.I ?? null, how, credits};
		if (a.flags.json) console.log(JSON.stringify(result, null, 1));
		else {
			say(`music ${rel(out)}: ${fmtS(lengthS)}, ${ln.after?.I.toFixed(1)} LUFS, ${beats.bpm} BPM (${how}; ${ln.note})`);
			if (res.attribution) say(`  credit (put it in the post/description): ${res.attribution}`);
			if (res.provider === 'elevenlabs') say('  ElevenLabs Music: keep this file in your project only; never add it to a shared music library.');
		}
	} finally {
		rmSync(dir, {recursive: true, force: true});
	}
	return 0;
};
