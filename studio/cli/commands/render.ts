// render <slug>: one MP4 per platform preset. Each preset renders the film's composition for its aspect
// (<film.id>-16x9 …) as H.264 High, yuv420p, CRF 18; then a two-pass loudnorm (I -14, TP -1.5, LRA 11; limiter
// first when needed), AAC 48 kHz, faststart. Plus a frame-0 poster PNG and an SRT built from the VO words.
import {copyFileSync, existsSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {list, num, parseArgs, str} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {ffmpeg, measureLoudness, probe} from '../lib/ffmpeg.js';
import {aspectSlug, compositionId, loadFilm, presetsFor, voCues} from '../lib/film.js';
import {normalizeLoudness} from '../lib/loudness.js';
import {die, fmtBytes, fmtS, say, warn} from '../lib/log.js';
import {ensureDir, filmOutDir, HARNESS_DIR, PUBLIC_DIR, rel} from '../lib/paths.js';
import {entryFor, glArgs, listCompositions, remotion} from '../lib/remotion.js';
import {toSrt} from '../lib/words.js';
import {creditStatus} from './credit.js';
import {validateFilm} from './validate.js';
import {writeCreditsFile} from '../lib/credits.js';

export const previewVoiceLines = (slug: string): string[] => {
	const f = loadFilm(slug);
	return (f.spec.vo ?? [])
		.filter((l) => {
			const wf = l.words ? path.join(PUBLIC_DIR, l.words) : null;
			if (!wf || !existsSync(wf)) return false;
			try {
				return Boolean(JSON.parse(readFileSync(wf, 'utf8')).voice?.previewOnly);
			} catch {
				return false;
			}
		})
		.map((l) => l.id);
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'allow-preview-voice', 'no-loudnorm', 'keep-raw']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm render <slug> [--presets x-16x9,li-4x5] [--scale 0.5] [--out file.mp4] [--concurrency n] [--frames 0-89] [--comp id]');
	const cfg = loadConfig();
	const film = loadFilm(slug);
	const invalid = validateFilm(slug).filter((x) => !x.result.ok);
	if (invalid.length) die(`films/${slug} does not match the schema:\n${invalid.map((x) => `  ${path.basename(x.file)}: ${x.result.errors.join('; ')}`).join('\n')}`, `fix the file(s), then: npx launchfilm validate ${slug}`);
	const presets = presetsFor(film, cfg, list(a.flags, 'presets'));
	const scale = num(a.flags, 'scale', 1)!;
	const outFlag = str(a.flags, 'out');
	if (outFlag && presets.length > 1) die('--out needs exactly one preset (--presets x-16x9)');
	const preview = previewVoiceLines(slug);
	if (preview.length) {
		if (scale >= 1 && !a.flags['allow-preview-voice']) die(`VO lines ${preview.join(', ')} use a preview-only voice (macOS say) that may not be published`, `re-voice them (npx launchfilm vo ${slug} --provider kokoro --force), or pass --allow-preview-voice for a private draft`);
		warn(`VO lines ${preview.join(', ')} use a preview-only voice: draft only`);
	}
	const outDir = ensureDir(filmOutDir(slug));
	const logDir = ensureDir(path.join(HARNESS_DIR, 'logs'));
	const log = path.join(logDir, `render-${slug}.log`);
	writeFileSync(log, '');
	const entry = entryFor(slug);
	const comps = await listCompositions(entry);
	const results: Record<string, unknown>[] = [];
	const rendered = new Map<string, string>(); // aspect → final file (presets that share an aspect reuse it)
	const r = cfg.render;
	const t00 = Date.now();
	for (const {id: presetId, p} of presets) {
		// a per-preset composition (<id>-<preset>) wins when the film registers one; else the aspect composition
		const comp = str(a.flags, 'comp') ?? (comps.includes(`${film.id}-${presetId}`) ? `${film.id}-${presetId}` : compositionId(film, p.aspect));
		if (!comps.includes(comp)) die(`composition ${comp} not found`, `film compositions: ${comps.filter((c) => c.startsWith(film.id)).join(', ') || '(none; check films/' + slug + '/index.tsx)'}`);
		const final = outFlag ? path.resolve(outFlag) : path.join(outDir, `${slug.replace(/^_/, '')}-${presetId}${scale !== 1 ? `@${scale}x` : ''}.mp4`);
		ensureDir(path.dirname(final));
		const t0 = Date.now();
		const reuseKey = `${comp}:${p.audio}:${p.crf ?? r.crf}`;
		const reuse = rendered.get(reuseKey);
		let note = 'reused';
		if (reuse) copyFileSync(reuse, final);
		else {
			const raw = final.replace(/\.mp4$/, '.raw.mp4');
			const args = [
				'render',
				...entry,
				comp,
				raw,
				'--codec=h264',
				`--crf=${p.crf ?? r.crf}`,
				`--pixel-format=${r.pixelFormat}`,
				`--color-space=${r.colorSpace}`,
				`--x264-preset=${r.x264Preset}`,
				'--audio-codec=aac',
				`--audio-bitrate=${r.audioBitrate}`,
				`--scale=${scale}`,
				'--log=error',
				...(num(a.flags, 'concurrency') ?? r.concurrency ? [`--concurrency=${num(a.flags, 'concurrency') ?? r.concurrency}`] : []),
				...(str(a.flags, 'frames') ? [`--frames=${str(a.flags, 'frames')}`] : []),
				...glArgs(),
			];
			await remotion(args, {log}, `remotion render ${comp}`);
			if (!p.audio) {
				await ffmpeg(['-loglevel', 'error', '-y', '-i', raw, '-map', '0:v:0', '-c:v', 'copy', '-an', '-movflags', '+faststart', final], {log}, 'strip audio');
				note = 'no audio (preset)';
			} else if (a.flags['no-loudnorm']) {
				await ffmpeg(['-loglevel', 'error', '-y', '-i', raw, '-c', 'copy', '-movflags', '+faststart', final], {log}, 'faststart');
				note = 'loudnorm skipped';
			} else {
				const ln = await normalizeLoudness(raw, final, cfg.audio.master, {video: true, codec: 'aac', bitrate: r.audioBitrate, sampleRate: r.sampleRate, log, verify: false});
				note = ln.note;
			}
			if (!a.flags['keep-raw']) rmSync(raw, {force: true});
			rendered.set(reuseKey, final);
		}
		// poster = frame 0
		let poster: string | null = null;
		if (r.poster === 'frame0') {
			poster = final.replace(/\.mp4$/, '-poster.png');
			await ffmpeg(['-loglevel', 'error', '-y', '-i', final, '-frames:v', '1', poster], {log}, 'poster');
		}
		const info = await probe(final);
		let lufs: number | null = null;
		let tp: number | null = null;
		if (info.audio) {
			const m = await measureLoudness(final, cfg.audio.master);
			lufs = Number.isFinite(m.I) ? Math.round(m.I * 10) / 10 : null;
			tp = Number.isFinite(m.TP) ? Math.round(m.TP * 10) / 10 : null;
		}
		const res = {preset: presetId, composition: comp, file: final, poster, duration: info.duration, width: info.video?.width, height: info.video?.height, fps: info.video?.fps, size: info.size, lufs, truePeak: tp, note, seconds: Math.round((Date.now() - t0) / 100) / 10};
		results.push(res);
		say(`render ${rel(final)}: ${fmtS(info.duration)} ${info.video?.width}×${info.video?.height} ${info.video?.fps?.toFixed(0)} fps, ${fmtBytes(info.size)}, ${lufs ?? '-'} LUFS, TP ${tp ?? '-'} dBTP (${note}; ${res.seconds} s)`);
	}
	// SRT from the VO words (film time)
	const cues = voCues(film, PUBLIC_DIR);
	let srt: string | null = null;
	if (cues.length) {
		srt = path.join(outDir, `${slug.replace(/^_/, '')}.srt`);
		writeFileSync(srt, toSrt(cues));
		say(`captions ${rel(srt)}: ${cues.length} cues`);
	}
	const credits = writeCreditsFile(film);
	if (credits.required.length) say(`credits ${rel(credits.file)}: ${credits.required.length} required line(s) for the description`);
	// keep a small render record next to the outputs (used by qa/package/post)
	const record = path.join(outDir, 'render.json');
	const tmp = `${record}.tmp`;
	writeFileSync(tmp, JSON.stringify({film: slug, id: film.id, at: new Date().toISOString(), scale, results, srt, aspects: presets.map((x) => aspectSlug(x.p.aspect))}, null, 1));
	renameSync(tmp, record);
	const credit = creditStatus();
	if (a.flags.json) console.log(JSON.stringify({ok: true, film: slug, results, srt, creditPending: credit.pending, seconds: Math.round((Date.now() - t00) / 1000)}, null, 1));
	else say(`done in ${Math.round((Date.now() - t00) / 1000)} s. Next: npx launchfilm qa ${slug}`);
	return 0;
};
