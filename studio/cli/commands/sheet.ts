// sheet <slug|video>: timestamped contact sheets. For a film, one set per rendered preset in out/<slug>/;
// for any video file, sheets go to out/sheets/<name>/ (or --out-dir).
import {existsSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {num, parseArgs, str} from '../lib/args.js';
import {die, say} from '../lib/log.js';
import {filmDir, filmOutDir, filmQaDir, OUT_DIR, rel} from '../lib/paths.js';
import {contactSheets} from '../lib/sheets.js';

export const renderedFiles = (slug: string) => {
	const dir = filmOutDir(slug);
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((f) => f.endsWith('.mp4') && !f.includes('.raw.'))
		.sort()
		.map((f) => path.join(dir, f));
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'png']});
	const target = a._[0];
	if (!target) die('usage: launchfilm sheet <slug|video> [--every s] [--cols n] [--rows n] [--width px] [--out-dir dir]');
	const opts = {every: num(a.flags, 'every'), cols: num(a.flags, 'cols'), rows: num(a.flags, 'rows'), width: num(a.flags, 'width'), format: a.flags.png ? ('png' as const) : ('jpg' as const)};
	const jobs: {video: string; outDir: string; prefix: string}[] = [];
	if (existsSync(target) && !existsSync(filmDir(target))) {
		const name = path.basename(target).replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '-').slice(0, 60);
		jobs.push({video: target, outDir: str(a.flags, 'out-dir') ?? path.join(OUT_DIR, 'sheets', name), prefix: 'sheet'});
	} else {
		const files = renderedFiles(target);
		if (!files.length) die(`nothing rendered for ${target} in out/${target}/`, `render first: npx launchfilm render ${target}`);
		for (const f of files) jobs.push({video: f, outDir: str(a.flags, 'out-dir') ?? filmQaDir(target), prefix: `sheet-${path.basename(f, '.mp4')}`});
	}
	const results = [];
	for (const j of jobs) {
		const r = await contactSheets(j.video, j.outDir, {...opts, prefix: j.prefix});
		results.push({video: j.video, ...r});
		if (!a.flags.json) say(`sheet ${rel(j.video)}: ${r.tiles} tiles, ${r.cols} per row, tile k = ${r.every}·k s (labels m:ss.ss #frame) → ${r.files.map(rel).join(', ')}`);
	}
	if (a.flags.json) console.log(JSON.stringify(results, null, 1));
	return 0;
};
