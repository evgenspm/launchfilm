// qa <slug>: the automated pass of craft/08-qa-checklist.md. For every file in out/<slug>/ (and qa/<slug>/qa.mp4):
// ffprobe facts, loudness, delivery checks D1–D9/D12/D14/D16, frame checks T1/T4/T11, contact sheets, safe-zone and
// 480 px stills for the human/agent read. Writes qa/<slug>/report.md + report.json. Results: PASS, FAIL, WARN,
// NOT CHECKED (with the reason), MANUAL (a file to look at), INFO. Exit 1 on any FAIL.
// Its PASS lines are evidence, not a substitute for reading the sheets.
import {closeSync, existsSync, openSync, readFileSync, readSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs} from '../lib/args.js';
import {loadConfig, type PlatformPreset} from '../lib/config.js';
import {capabilities, extractFrames, FFMPEG_INSTALL_HINT, ffmpegRaw, ffprobeJson, measureLoudness, silences} from '../lib/ffmpeg.js';
import {loadFilm, voCues, type Film} from '../lib/film.js';
import {die, say} from '../lib/log.js';
import {ensureDir, filmOutDir, filmQaDir, PUBLIC_DIR, readJsonIf, rel} from '../lib/paths.js';
import {Canvas, lumaPercentile, meanLuma} from '../lib/png.js';
import {contactSheets} from '../lib/sheets.js';
import {previewVoiceLines, run as renderRun} from './render.js';
import {renderedFiles} from './sheet.js';

type Result = 'PASS' | 'FAIL' | 'WARN' | 'NOT CHECKED' | 'MANUAL' | 'INFO';
interface Row {
	id: string;
	check: string;
	result: Result;
	evidence: string;
}

const ratio = (s?: string) => {
	if (!s) return 0;
	const [a, b] = s.split('/').map(Number);
	return b ? a / b : a;
};

/** Top-level MP4 atoms in order: faststart = moov before mdat. */
const atomOrder = (file: string): string[] => {
	const fd = openSync(file, 'r');
	const out: string[] = [];
	try {
		const head = Buffer.alloc(16);
		let pos = 0;
		for (let i = 0; i < 64; i++) {
			if (readSync(fd, head, 0, 16, pos) < 8) break;
			let size = head.readUInt32BE(0);
			const type = head.toString('latin1', 4, 8);
			if (size === 1) size = Number(head.readBigUInt64BE(8));
			out.push(type);
			if (size < 8) break;
			pos += size;
		}
	} finally {
		closeSync(fd);
	}
	return out;
};

const frameDiff = (a: Buffer, b: Buffer) => {
	let s = 0;
	let n = 0;
	for (let i = 0; i < a.length; i += 3 * 5) {
		s += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
		n += 3;
	}
	return n ? s / n : 0;
};

const presetFromName = (file: string, cfg: ReturnType<typeof loadConfig>): string | null => {
	const base = path.basename(file, '.mp4');
	return Object.keys(cfg.presets).find((id) => base.includes(id)) ?? null;
};

const parseSpans = (text: string, startKey: string, endKey: string) => {
	const spans: {s: number; e: number | null}[] = [];
	for (const line of text.split('\n')) {
		const s = new RegExp(`${startKey}: ?([\\d.]+)`).exec(line);
		const e = new RegExp(`${endKey}: ?([\\d.]+)`).exec(line);
		if (s) spans.push({s: Number(s[1]), e: null});
		if (e && spans.length) spans[spans.length - 1].e = Number(e[1]);
	}
	return spans;
};

const checkFile = async (file: string, film: Film, presetId: string | null, p: PlatformPreset | null, scale: number, qaDir: string, cfg: ReturnType<typeof loadConfig>) => {
	const rows: Row[] = [];
	const add = (id: string, check: string, result: Result, evidence: string) => rows.push({id, check, result, evidence});
	const caps = capabilities();
	const j = await ffprobeJson(file);
	const v = j.streams.find((s: any) => s.codec_type === 'video');
	const au = j.streams.find((s: any) => s.codec_type === 'audio');
	const dur = Number(j.format.duration);
	const size = Number(j.format.size);
	const fps = film.spec.fps ?? p?.fps ?? 30;
	const tag = path.basename(file, '.mp4');

	// D1 codec
	// Remotion's minimal ffprobe prints the profile number (100 = High)
	const d1 = v?.codec_name === 'h264' && /^(high|100)$/i.test(String(v?.profile ?? '')) && v?.pix_fmt === 'yuv420p';
	add('D1', 'codec H.264 High yuv420p', d1 ? 'PASS' : 'FAIL', `${v?.codec_name} ${v?.profile} ${v?.pix_fmt}`);
	// D2 size
	if (p) {
		const ew = Math.round(p.width * scale);
		const eh = Math.round(p.height * scale);
		add('D2', `size ${ew}×${eh}${scale !== 1 ? ` (scale ${scale})` : ''}`, v?.width === ew && v?.height === eh ? 'PASS' : 'FAIL', `${v?.width}×${v?.height}`);
	} else add('D2', 'size matches preset', 'NOT CHECKED', 'file name has no preset id');
	// D3 fps
	const rf = ratio(v?.r_frame_rate);
	const af = ratio(v?.avg_frame_rate);
	add('D3', `constant ${fps} fps`, Math.abs(rf - fps) < 0.01 && Math.abs(af - fps) < 0.05 ? 'PASS' : 'FAIL', `r_frame_rate ${v?.r_frame_rate}, avg ${v?.avg_frame_rate}`);
	// D4 duration
	if (film.spec.duration) add('D4', `duration ${film.spec.duration} s ±1 fr`, Math.abs(dur - film.spec.duration) <= 1 / fps + 0.07 ? 'PASS' : 'FAIL', `${dur.toFixed(3)} s`);
	else add('D4', 'duration = film.json duration', 'NOT CHECKED', 'film.json has no duration (engine-computed)');
	if (p) {
		const [lo, hi] = p.duration;
		const over = p.maxDuration && dur > p.maxDuration;
		add('D4b', `${presetId} length target ${lo}–${hi} s${p.maxDuration ? ` (max ${p.maxDuration})` : ''}`, over ? 'FAIL' : dur < lo || dur > hi ? 'WARN' : 'PASS', `${dur.toFixed(1)} s`);
	}
	// D5 audio stream
	if (p && !p.audio) add('D5', 'no audio stream (hero-loop)', au ? 'FAIL' : 'PASS', au ? `${au.codec_name} present` : 'none');
	else if (!au) add('D5', 'AAC 48 kHz stereo', 'WARN', 'no audio stream (silent film?)');
	else add('D5', 'AAC 48 kHz stereo', au.codec_name === 'aac' && Number(au.sample_rate) === 48000 && au.channels === 2 ? 'PASS' : 'FAIL', `${au.codec_name} ${au.sample_rate} Hz ${au.channels} ch ${Math.round(Number(au.bit_rate ?? 0) / 1000)} kbps`);
	// D6 loudness
	let loud: Record<string, number | null> | null = null;
	if (au) {
		const t = cfg.audio.master;
		if (caps.has('ebur128')) {
			const r = await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-']);
			const sum = r.stderr.slice(r.stderr.lastIndexOf('Summary:'));
			const num = (re: RegExp) => {
				const m = re.exec(sum);
				return m ? (m[1] === '-inf' ? -Infinity : Number(m[1])) : null;
			};
			loud = {I: num(/I:\s+(-?[\d.]+|-inf) LUFS/), LRA: num(/LRA:\s+(-?[\d.]+) LU/), TP: num(/Peak:\s+(-?[\d.]+|-inf) dBFS/)};
		} else {
			const m = await measureLoudness(file, t);
			loud = {I: m.I, LRA: m.LRA, TP: m.TP};
		}
		const okI = loud.I !== null && Math.abs(loud.I - t.I) <= 1;
		const okTP = loud.TP !== null && loud.TP <= t.TP + 0.05;
		add('D6', `loudness ${t.I} LUFS ±1, TP ≤ ${t.TP} dBTP`, okI && okTP ? 'PASS' : !okI && loud.I !== null && Math.abs(loud.I - t.I) > 2 ? 'FAIL' : 'WARN', `I ${loud.I?.toFixed(1)} LUFS, TP ${loud.TP?.toFixed(1)} dBTP, LRA ${loud.LRA?.toFixed(1)} LU (${caps.has('ebur128') ? 'ebur128' : 'loudnorm measure'}; measured, not listened)`);
		// long silences inside a film with sound
		const sil = (await silences(file, -50, 2.5)).filter((s) => s.start > 0.5 && (s.end === Infinity ? dur : s.end) < dur - 0.5);
		add('A1', 'no unplanned silence ≥ 2.5 s', sil.length ? 'WARN' : 'PASS', sil.length ? sil.map((s) => `${s.start.toFixed(2)}–${Number.isFinite(s.end) ? s.end.toFixed(2) : 'end'} s`).join(', ') : 'none (silencedetect -50 dB)');
	}
	// D7 faststart
	const atoms = atomOrder(file);
	add('D7', 'faststart (moov before mdat)', atoms.indexOf('moov') >= 0 && atoms.indexOf('moov') < atoms.indexOf('mdat') ? 'PASS' : 'FAIL', `atoms: ${atoms.slice(0, 5).join(', ')}`);
	// D8 poster
	const poster = file.replace(/\.mp4$/, '-poster.png');
	const frames = await extractFrames(file, {width: 320, at: [0, Math.min(dur - 0.05, 15 / fps), Math.max(0, dur - 1.5 / fps)]});
	const l0 = meanLuma(frames.frames[0]);
	const p99 = lumaPercentile(frames.frames[0]);
	const black0 = p99 < 24;
	if (cfg.render.poster === 'frame0') add('D8', 'poster = frame 0, not black', existsSync(poster) && !black0 ? 'PASS' : 'FAIL', existsSync(poster) ? `${rel(poster)}; frame-0 luma mean ${l0.toFixed(0)}, p99 ${p99}/255` : 'missing poster PNG');
	// T11 frame 0 + visible change by frame 15
	const d15 = frameDiff(frames.frames[0], frames.frames[1]);
	add('T11', 'frame 0 not black; visible change by frame 15', !black0 && d15 > 1 ? 'PASS' : 'FAIL', `frame-0 luma p99 ${p99}/255, mean abs diff f0→f15 ${d15.toFixed(1)}/255`);
	// D16 loop seam
	if (p?.loop) {
		const dl = frameDiff(frames.frames[0], frames.frames[2]);
		add('D16', 'loop: last frame ≈ frame 0', dl < 4 ? 'PASS' : 'FAIL', `mean abs diff ${dl.toFixed(1)}/255`);
	}
	// D12 / T1 freeze + black (need a full ffmpeg)
	if (caps.has('freezedetect')) {
		const r = await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-map', '0:v:0', '-vf', 'freezedetect=n=0.001:d=0.6', '-f', 'null', '-']);
		const spans = parseSpans(r.stderr, 'lavfi.freezedetect.freeze_start', 'lavfi.freezedetect.freeze_end').map((s) => ({s: s.s, e: s.e ?? dur}));
		const body = spans.filter((s) => s.s < dur - 3);
		writeFileSync(path.join(qaDir, `freeze-${tag}.txt`), spans.map((s) => `${s.s.toFixed(2)}–${s.e.toFixed(2)} s`).join('\n') + '\n');
		add('T1', 'nothing static > 0.6 s (except the end-card settle ≤ 3 s)', body.length ? 'FAIL' : 'PASS', body.length ? `${body.map((s) => `${s.s.toFixed(2)}–${s.e.toFixed(2)} s`).join(', ')} (${rel(path.join(qaDir, `freeze-${tag}.txt`))}); confirm each is a designed hold` : 'freezedetect: none before the last 3 s');
	} else add('T1', 'nothing static > 0.6 s', 'NOT CHECKED', `this ffmpeg has no freezedetect; install a full ffmpeg: ${FFMPEG_INSTALL_HINT}`);
	if (caps.has('signalstats')) {
		const yfile = path.join(qaDir, `yavg-${tag}.txt`);
		await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-map', '0:v:0', '-vf', `signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=${yfile.replace(/\\/g, '/').replace(/:/g, '\\:')}`, '-f', 'null', '-']);
		const txt = existsSync(yfile) ? readFileSync(yfile, 'utf8') : '';
		const dark: number[] = [];
		let t = 0;
		for (const line of txt.split('\n')) {
			const m = /pts_time:([\d.]+)/.exec(line);
			if (m) t = Number(m[1]);
			const y = /YAVG=([\d.]+)/.exec(line);
			if (y && Number(y[1]) < 20) dark.push(t);
		}
		add('D12', 'no accidental black frames (YAVG < 20)', dark.length ? 'WARN' : 'PASS', dark.length ? `${dark.length} dark frames, first at ${dark[0].toFixed(2)} s (${rel(yfile)}); confirm they are designed` : `none (${rel(yfile)})`);
	} else add('D12', 'no accidental black frames', 'NOT CHECKED', `this ffmpeg has no signalstats; install: ${FFMPEG_INSTALL_HINT}`);
	// T4 cuts vs beat grid (needs scdet + a beat grid)
	const beatsSrc = film.spec.beats?.src ? path.join(PUBLIC_DIR, film.spec.beats.src) : null;
	if (!caps.has('scdet')) add('T4', 'cuts on the beat grid (±2 fr)', 'NOT CHECKED', `this ffmpeg has no scdet; install: ${FFMPEG_INSTALL_HINT}`);
	else {
		const r = await ffmpegRaw(['-nostats', '-i', path.resolve(file), '-map', '0:v:0', '-vf', 'scdet=t=10:s=1', '-f', 'null', '-']);
		const cuts = [...r.stderr.matchAll(/lavfi\.scd\.time: ?([\d.]+)/g)].map((m) => Number(m[1]));
		const beats: number[] | null = beatsSrc && existsSync(beatsSrc) ? JSON.parse(readFileSync(beatsSrc, 'utf8')).beats : film.spec.beats?.bpm ? Array.from({length: Math.ceil((dur * film.spec.beats.bpm) / 60) + 1}, (_, i) => (film.spec.beats!.offset ?? 0) + (i * 60) / film.spec.beats!.bpm!) : null;
		if (!beats) add('T4', 'cuts on the beat grid (±2 fr)', 'INFO', `${cuts.length} cuts at ${cuts.map((c) => c.toFixed(2)).join(', ') || '-'} s; film.json has no beats to compare`);
		else {
			const off = cuts.filter((c) => Math.min(...beats.map((b) => Math.abs(b - c))) > 2 / fps);
			add('T4', 'cuts on the beat grid (±2 fr)', off.length ? 'WARN' : 'PASS', `${cuts.length} cuts, ${off.length} off-grid${off.length ? `: ${off.map((c) => c.toFixed(2)).join(', ')} s (storyboard may mark them off-grid)` : ''}`);
		}
	}
	// D14 size
	if (p?.maxMB) add('D14', `file ≤ ${p.maxMB} MB (${p.platform})`, size <= p.maxMB * 1e6 ? 'PASS' : 'FAIL', `${(size / 1e6).toFixed(2)} MB`);
	// D10 / D11: stills for a human/agent read
	if (p) {
		const mid = await extractFrames(file, {width: v.width, at: [Math.min(dur * 0.5, dur - 0.1)]});
		const c = new Canvas(mid.width, mid.height);
		c.blit(mid.frames[0], mid.width, mid.height, 0, 0);
		if (p.safe) {
			const x0 = Math.round(p.safe.left * mid.width);
			const y0 = Math.round(p.safe.top * mid.height);
			const x1 = Math.round(mid.width * (1 - p.safe.right));
			const y1 = Math.round(mid.height * (1 - p.safe.bottom));
			const th = Math.max(2, Math.round(mid.width / 480));
			const red: [number, number, number] = [255, 40, 40];
			c.rect(x0, y0, x1 - x0, th, red);
			c.rect(x0, y1 - th, x1 - x0, th, red);
			c.rect(x0, y0, th, y1 - y0, red);
			c.rect(x1 - th, y0, th, y1 - y0, red);
		}
		const safeFile = path.join(qaDir, `safe-${tag}.png`);
		writeFileSync(safeFile, c.png());
		add('D10', 'captions/key text inside the safe box', 'MANUAL', `${rel(safeFile)} (red box = ${presetId} safe zone, frame at ${(dur * 0.5).toFixed(2)} s): check every text shot`);
		const w480 = p.aspect === '16:9' ? 480 : 360;
		const small = await extractFrames(file, {width: w480, at: [Math.min(dur * 0.5, dur - 0.1)]});
		const sc = new Canvas(small.width, small.height);
		sc.blit(small.frames[0], small.width, small.height, 0, 0);
		const smallFile = path.join(qaDir, `preview-${w480}-${tag}.png`);
		writeFileSync(smallFile, sc.png());
		add('D11', `captions readable at ${w480} px wide`, 'MANUAL', rel(smallFile));
	}
	// sheets
	const sheets = await contactSheets(file, qaDir, {prefix: `sheet-${tag}`});
	add('S', 'contact sheets', 'MANUAL', `${sheets.files.map(rel).join(', ')} (${sheets.tiles} tiles, 1 per ${sheets.every} s): read every sheet against craft/08`);
	return {file, preset: presetId, duration: dur, size, width: v?.width, height: v?.height, loudness: loud, rows};
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'no-render']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm qa <slug> [--json] [--no-render]');
	const cfg = loadConfig();
	const film = loadFilm(slug);
	const qaDir = ensureDir(filmQaDir(slug));
	let files = renderedFiles(slug);
	const draft = path.join(qaDir, 'qa.mp4');
	if (existsSync(draft)) files.push(draft);
	if (!files.length) {
		if (a.flags['no-render']) die(`nothing rendered for ${slug}`, `npx launchfilm render ${slug} --presets x-16x9 --scale 0.5 --out qa/${slug}/qa.mp4`);
		const first = Object.entries(cfg.presets).find(([, p]) => (film.spec.aspects ?? ['16:9']).includes(p.aspect))?.[0] ?? 'x-16x9';
		say(`qa: nothing rendered yet, making a half-scale draft (${first}) → ${rel(draft)}`);
		await renderRun([slug, '--presets', first, '--scale', '0.5', '--out', draft, '--allow-preview-voice']);
		files = [draft];
	}
	const record = readJsonIf<{scale?: number; results?: {file: string; preset: string}[]}>(path.join(filmOutDir(slug), 'render.json'));
	const reports = [];
	for (const f of files) {
		const presetId = record?.results?.find((r) => path.resolve(r.file) === path.resolve(f))?.preset ?? presetFromName(f, cfg) ?? (f === draft ? Object.entries(cfg.presets).find(([, p]) => (film.spec.aspects ?? ['16:9']).includes(p.aspect))?.[0] ?? null : null);
		const p = presetId ? cfg.presets[presetId] : null;
		const scale = /@([\d.]+)x\.mp4$/.exec(f)?.[1] ? Number(/@([\d.]+)x\.mp4$/.exec(f)![1]) : f === draft ? 0.5 : 1;
		reports.push(await checkFile(f, film, presetId, p, scale, qaDir, cfg));
	}
	// film-level checks
	const filmRows: Row[] = [];
	// placeholders left by `new --recipe` on a text recipe: the built-in "todo" scene, or Film.tsx entries still = TodoScene
	const filmTsx = path.join(film.dir, 'Film.tsx');
	const todoKeys = existsSync(filmTsx) ? [...readFileSync(filmTsx, 'utf8').matchAll(/^\s*['"]?([\w-]+)['"]?\s*:\s*TodoScene\b/gm)].map((m) => m[1]) : [];
	const todoShots = ((film.spec.shots ?? []) as {id?: string; scene?: string}[]).filter((s) => s.scene === 'todo' || (s.scene && todoKeys.includes(s.scene))).map((s, i) => s.id ?? s.scene ?? `#${i + 1}`);
	filmRows.push({id: 'B1', check: 'every shot built (no TodoScene placeholders)', result: todoShots.length ? 'FAIL' : 'PASS', evidence: todoShots.length ? `still TODO: ${todoShots.join(', ')} (films/${slug}/Film.tsx)` : `${(film.spec.shots ?? []).length} shots`});
	const preview = previewVoiceLines(slug);
	filmRows.push({id: 'V1', check: 'VO publishable (no preview-only voice)', result: preview.length ? 'FAIL' : 'PASS', evidence: preview.length ? `preview-only lines: ${preview.join(', ')}` : `${(film.spec.vo ?? []).length} VO lines`});
	const cues = voCues(film, PUBLIC_DIR);
	const srt = path.join(filmOutDir(slug), `${slug.replace(/^_/, '')}.srt`);
	if (cues.length) filmRows.push({id: 'D9', check: 'SRT next to the renders', result: existsSync(srt) ? 'PASS' : 'FAIL', evidence: existsSync(srt) ? `${rel(srt)}: ${(readFileSync(srt, 'utf8').match(/-->/g) ?? []).length} cues / ${cues.length} phrases` : 'missing (npx launchfilm render writes it)'});
	const needsCaptions = reports.some((r) => r.preset && cfg.presets[r.preset]?.captions === 'burned');
	if (cues.length && needsCaptions) filmRows.push({id: 'C1', check: 'burned captions on (film.json subtitles.enabled)', result: film.spec.subtitles?.enabled ? 'PASS' : 'FAIL', evidence: `subtitles.enabled = ${film.spec.subtitles?.enabled ?? false}`});
	const music = film.spec.music?.src ? path.join(PUBLIC_DIR, path.dirname(film.spec.music.src), 'music.credits.json') : null;
	if (music && existsSync(music)) {
		const m = JSON.parse(readFileSync(music, 'utf8'));
		filmRows.push({id: 'D15', check: 'music credit line ready', result: m.attribution || m.license === 'CC0-1.0' ? 'PASS' : 'WARN', evidence: m.attribution ?? m.license});
	}
	const all = [...filmRows, ...reports.flatMap((r) => r.rows)];
	const fails = all.filter((r) => r.result === 'FAIL').length;
	const md = [
		`# QA report: ${slug}`,
		'',
		`Generated ${new Date().toISOString()} by \`npx launchfilm qa ${slug}\`. Evidence for qa/${slug}/QA.md (craft/08), not a substitute for reading the sheets.`,
		`Audio rows are measured, not listened. Results: ${fails ? `${fails} FAIL` : 'no FAIL'}, ${all.filter((r) => r.result === 'NOT CHECKED').length} NOT CHECKED, ${all.filter((r) => r.result === 'MANUAL').length} MANUAL.`,
		'',
		'## Film',
		'',
		'| check | result | evidence |',
		'|---|---|---|',
		...filmRows.map((r) => `| ${r.id} ${r.check} | ${r.result} | ${r.evidence} |`),
		'',
		...reports.flatMap((r) => [
			`## ${rel(r.file)}${r.preset ? ` (${r.preset})` : ''}`,
			'',
			`${r.width}×${r.height}, ${r.duration.toFixed(2)} s, ${(r.size / 1e6).toFixed(2)} MB${r.loudness ? `, ${r.loudness.I?.toFixed(1)} LUFS / ${r.loudness.TP?.toFixed(1)} dBTP` : ''}`,
			'',
			'| check | result | evidence |',
			'|---|---|---|',
			...r.rows.map((x) => `| ${x.id} ${x.check} | ${x.result} | ${x.evidence} |`),
			'',
		]),
		'## Still to do by eye (craft/08)',
		'',
		'T2 named motion (source grep), T3 stagger, T5 sound glued, T6 text legibility/contrast, T7 look, T8 frame as canvas, T9 footage sources, T10 transitions, T12 QA.md. Ask the user to listen to the final once before posting.',
		'',
	].join('\n');
	writeFileSync(path.join(qaDir, 'report.md'), md);
	writeFileSync(path.join(qaDir, 'report.json'), JSON.stringify({film: slug, ok: fails === 0, film_checks: filmRows, files: reports}, null, 1));
	if (a.flags.json) console.log(JSON.stringify({ok: fails === 0, report: path.join(qaDir, 'report.md'), fails, checks: all}, null, 1));
	else {
		for (const r of all) say(`${r.result.padEnd(11)} ${r.id.padEnd(4)} ${r.check}: ${r.evidence}`);
		say(`\nqa ${rel(path.join(qaDir, 'report.md'))}: ${fails ? `${fails} FAIL` : 'no FAIL'}`);
	}
	return fails ? 1 : 0;
};
