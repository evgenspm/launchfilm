// still <slug> <t>: one PNG of a film composition at time t (2.5, 2.5s, 75f, 1:02.5) → qa/<slug>/.
import path from 'node:path';
import {num, parseArgs, parseTime, str} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {compositionId, loadFilm, presetsFor} from '../lib/film.js';
import {die, say} from '../lib/log.js';
import {ensureDir, filmQaDir, rel} from '../lib/paths.js';
import {entryFor, glArgs, listCompositions, remotion} from '../lib/remotion.js';

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const [slug, t] = a._;
	if (!slug || t === undefined) die('usage: launchfilm still <slug> <t> [--preset x-16x9] [--scale 1] [--out file.png] [--comp id]');
	const cfg = loadConfig();
	const film = loadFilm(slug);
	const fps = film.spec.fps ?? 30;
	const presetId = str(a.flags, 'preset');
	const pr = presetsFor(film, cfg, presetId ? [presetId] : undefined)[0];
	const entry = entryFor(slug);
	const comps = await listCompositions(entry);
	const comp = str(a.flags, 'comp') ?? (comps.includes(`${film.id}-${pr.id}`) ? `${film.id}-${pr.id}` : compositionId(film, pr.p.aspect));
	if (!comps.includes(comp)) die(`composition ${comp} not found`, `film compositions: ${comps.filter((c) => c.startsWith(film.id)).join(', ') || '(none)'}`);
	const frame = Math.round(parseTime(t, fps) * fps);
	const scale = num(a.flags, 'scale', 1)!;
	const out = str(a.flags, 'out') ?? path.join(ensureDir(filmQaDir(slug)), `still-${pr.id}-f${String(frame).padStart(4, '0')}${scale !== 1 ? `@${scale}x` : ''}.png`);
	const t0 = Date.now();
	await remotion(['still', ...entry, comp, path.resolve(out), `--frame=${frame}`, `--scale=${scale}`, '--log=error', ...glArgs()], {}, `remotion still ${comp}`);
	if (a.flags.json) console.log(JSON.stringify({file: path.resolve(out), composition: comp, frame, seconds: frame / fps}));
	else say(`still ${rel(path.resolve(out))}: ${comp} frame ${frame} (${(frame / fps).toFixed(2)} s), ${((Date.now() - t0) / 1000).toFixed(1)} s`);
	return 0;
};
