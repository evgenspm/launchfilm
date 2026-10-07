// sfx: the sound library. list/search the manifest, generate our procedural CC0 presets, import packs,
// or (with a key) generate from a paid provider into the user's own project.
import {existsSync, readdirSync, rmSync, statSync} from 'node:fs';
import path from 'node:path';
import {list, num, parseArgs, str} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {tmpDir} from '../lib/ffmpeg.js';
import {die, fmtS, say, table, warn} from '../lib/log.js';
import {ensureDir, posix, rel} from '../lib/paths.js';
import {measure, normalizeToLibrary, readSfxManifest, SFX_DIR, upsertSfx, writeSfxManifest, type SfxEntry} from '../lib/sfxlib.js';
import {writeWav} from '../lib/wav.js';
import {elevenlabsSfx, freesoundSfx, stableAudioSfx} from '../providers/sfx/paid.js';
import {PRESETS, presetById, renderPreset} from '../providers/sfx/procedural.js';

const score = (e: Pick<SfxEntry, 'id' | 'tags' | 'description' | 'use'>, q: string[]) => {
	let s = 0;
	const hay = `${e.id} ${e.tags.join(' ')} ${e.description ?? ''} ${e.use ?? ''}`.toLowerCase();
	for (const t of q) {
		if (e.id === t) s += 5;
		else if (e.id.includes(t)) s += 3;
		if (e.tags.includes(t)) s += 2;
		else if (hay.includes(t)) s += 1;
	}
	return s;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'sound';

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'library', 'overwrite']});
	const [sub, ...pos] = a._;
	const json = Boolean(a.flags.json);
	const cfg = loadConfig();

	if (!sub || sub === 'list' || sub === 'search') {
		const m = readSfxManifest();
		let items = m.sounds;
		const tag = str(a.flags, 'tag');
		const source = str(a.flags, 'source');
		if (tag) items = items.filter((s) => s.tags.includes(tag));
		if (source) items = items.filter((s) => s.source === source);
		if (sub === 'search') {
			const q = pos.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
			if (!q.length) die('usage: launchfilm sfx search <words>');
			items = items
				.map((s) => [score(s, q), s] as const)
				.filter(([sc]) => sc > 0)
				.sort((x, y) => y[0] - x[0])
				.slice(0, num(a.flags, 'limit', 12))
				.map(([, s]) => s);
		}
		if (json) {
			console.log(JSON.stringify(items.map((s) => ({...s, staticFile: `sfx/${s.file}`})), null, 1));
			return 0;
		}
		if (!items.length) {
			say(m.sounds.length ? 'no matching sounds' : 'library is empty: run `launchfilm sfx gen all --library` and `node scripts/fetch-kenney.mjs`');
			return 0;
		}
		say(table([['id', 'dur', 'peak', 'source', 'tags'], ...items.map((s) => [s.id, fmtS(s.duration), `${s.peak}`, s.source, s.tags.slice(0, 4).join(',')])]));
		say(`\n${items.length} sounds. In film.json: "sfx": [{"at": 1.2, "sound": "<sound>"}] (public/sfx/<sound>.wav)`);
		return 0;
	}

	if (sub === 'presets') {
		if (json) console.log(JSON.stringify(PRESETS.map(({make, ...p}) => p), null, 1));
		else say(table([['preset', 'description', 'use'], ...PRESETS.map((p) => [p.id, p.description, p.use])]));
		return 0;
	}

	if (sub === 'gen') {
		const provider = str(a.flags, 'provider', 'procedural')!;
		if (provider !== 'procedural') {
			const prompt = str(a.flags, 'prompt') ?? pos.join(' ');
			if (!prompt) die('usage: launchfilm sfx gen --provider elevenlabs|stable-audio|freesound --prompt "..." [--duration s] [--id name]');
			const id = str(a.flags, 'id') ?? slugify(prompt);
			const dir = tmpDir('launchfilm-sfx-');
			try {
				const req = {prompt, durationS: num(a.flags, 'duration'), outBase: path.join(dir, 'raw'), cfg};
				const r = provider === 'elevenlabs' ? await elevenlabsSfx(req) : provider === 'stable-audio' ? await stableAudioSfx(req) : provider === 'freesound' ? await freesoundSfx(req) : die(`unknown sfx provider ${provider}`, 'procedural | elevenlabs | stable-audio | freesound');
				const dest = path.join(SFX_DIR, 'user', `${id}.wav`);
				const {audio, rel: file} = await normalizeToLibrary(r.file, dest, {peakDb: cfg.audio.sfx.peakDb});
				const m = readSfxManifest();
				upsertSfx(m, {id, file, tags: ['user', provider], ...measure(audio), license: r.license, source: provider, attribution: r.attribution, provenance: r.provenance});
				writeSfxManifest(m);
				say(`sfx ${id}: ${rel(dest)} (${provider}; ${r.license}). Kept in this project only; do not contribute provider output to the public library.`);
			} finally {
				rmSync(dir, {recursive: true, force: true});
			}
			return 0;
		}
		const which = pos[0];
		if (!which) die('usage: launchfilm sfx gen <preset|all> [--library] [--out f.wav] [--seed n]', `presets: ${PRESETS.map((p) => p.id).join(', ')}`);
		const presets = which === 'all' ? PRESETS : [presetById(which) ?? die(`unknown preset ${JSON.stringify(which)}`, `presets: ${PRESETS.map((p) => p.id).join(', ')}`)];
		const library = Boolean(a.flags.library);
		const seed = num(a.flags, 'seed');
		const out = str(a.flags, 'out');
		if (out && presets.length > 1) die('--out works with one preset; use --library for all');
		const m = readSfxManifest();
		const rows: string[][] = [];
		const results: SfxEntry[] = [];
		for (const p of presets) {
			const audio = renderPreset(p, {seed, peakDb: cfg.audio.sfx.peakDb});
			const dest = out ? path.resolve(out) : library ? path.join(SFX_DIR, `${p.id}.wav`) : path.join(SFX_DIR, 'custom', `${p.id}${seed !== undefined ? `-s${seed}` : ''}.wav`);
			ensureDir(path.dirname(dest));
			writeWav(dest, audio, 16);
			const meas = measure(audio);
			const entry: SfxEntry = {
				id: library || seed === undefined ? p.id : `${p.id}-s${seed}`,
				file: posix(path.relative(SFX_DIR, dest)),
				tags: p.tags,
				...meas,
				license: 'CC0-1.0',
				source: 'launchfilm-procedural',
				description: p.description,
				use: p.use,
				provenance: {generator: 'launchfilm sfx gen', preset: p.id, seed: seed ?? p.seed},
			};
			results.push(entry);
			if (!dest.startsWith(SFX_DIR)) {
				// written outside the library: no manifest entry
			} else upsertSfx(m, entry);
			if (meas.peak < -60 && p.id !== 'silence-beat') warn(`${p.id} is silent (peak ${meas.peak} dBFS)`);
			if (typeof meas.truePeak === "number" && meas.truePeak > -0.1) warn(`${p.id} true peak ${meas.truePeak} dBTP may clip after encoding`);
			rows.push([p.id, fmtS(meas.duration), `${meas.peak}`, `${meas.truePeak}`, meas.lufs == null ? 'n/a' : `${meas.lufs}`, `${meas.rms}`, `${meas.channels}`, rel(dest)]);
		}
		if (presets.some(() => true) && (library || !out)) writeSfxManifest(m);
		if (json) console.log(JSON.stringify(results, null, 1));
		else say(table([['preset', 'dur', 'peak dBFS', 'TP dBTP', 'LUFS-I', 'RMS dB', 'ch', 'file'], ...rows]));
		return 0;
	}

	if (sub === 'import') {
		// sfx import <dir|files...> --source kenney --pack ui-audio --license CC0-1.0 [--author] [--url] [--tags a,b]
		const source = str(a.flags, 'source') ?? die('--source is required (e.g. kenney)');
		const pack = str(a.flags, 'pack') ?? die('--pack is required (e.g. ui-audio)');
		const license = str(a.flags, 'license') ?? die('--license is required (e.g. CC0-1.0)');
		const extraTags = list(a.flags, 'tags') ?? [];
		const files: string[] = [];
		for (const p of pos) {
			const abs = path.resolve(p);
			if (!existsSync(abs)) die(`not found: ${p}`);
			if (statSync(abs).isDirectory()) {
				for (const f of readdirSync(abs).sort()) if (/\.(ogg|wav|mp3|flac)$/i.test(f) && !/^preview\./i.test(f)) files.push(path.join(abs, f));
			} else files.push(abs);
		}
		if (!files.length) die('no audio files to import');
		const m = readSfxManifest();
		let n = 0;
		for (const f of files) {
			const base = slugify(path.basename(f).replace(/\.[^.]+$/, ''));
			const dest = path.join(SFX_DIR, source, pack, `${base}.wav`);
			if (existsSync(dest) && !a.flags.overwrite && m.sounds.some((s) => s.file === posix(path.relative(SFX_DIR, dest)))) continue;
			const {audio, rel: file} = await normalizeToLibrary(f, dest, {peakDb: cfg.audio.sfx.peakDb});
			const words = base.split('-').filter((w) => /[a-z]/.test(w));
			upsertSfx(m, {
				id: `${source}-${pack}-${base}`,
				file,
				tags: [...new Set([...extraTags, ...words.map((w) => w.replace(/\d+$/, '')).filter(Boolean)])],
				...measure(audio),
				license,
				source,
				author: str(a.flags, 'author'),
				url: str(a.flags, 'url'),
			});
			n++;
		}
		writeSfxManifest(m);
		say(`imported ${n} sounds into ${rel(path.join(SFX_DIR, source, pack))} (${files.length - n} already present)`);
		return 0;
	}

	return die(`unknown sfx subcommand ${JSON.stringify(sub)}`, 'list | search <q> | presets | gen <preset|all> | import <dir>');
};
