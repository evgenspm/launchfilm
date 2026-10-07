// validate [slug...]: film.json + brand.json of each film against schemas/ (all films when no slug), plus
// harness.config.json. render runs the same check for its film before bundling.
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs} from '../lib/args.js';
import {CONFIG_PATH} from '../lib/config.js';
import {listFilms} from '../lib/film.js';
import {die, say} from '../lib/log.js';
import {filmDir} from '../lib/paths.js';
import {validateWith, type ValidationResult} from '../lib/schemas.js';

export const validateFilm = (slug: string) => {
	const out: {file: string; result: ValidationResult}[] = [];
	for (const [file, schema] of [
		['film.json', 'film'],
		['brand.json', 'brand'],
	] as const) {
		const p = path.join(filmDir(slug), file);
		if (!existsSync(p)) {
			if (file === 'film.json') out.push({file: p, result: {ok: false, schema: null, errors: ['missing']}});
			continue;
		}
		let data: unknown;
		try {
			data = JSON.parse(readFileSync(p, 'utf8'));
		} catch (e) {
			out.push({file: p, result: {ok: false, schema: null, errors: [`not JSON: ${(e as Error).message}`]}});
			continue;
		}
		out.push({file: p, result: validateWith(schema, data)});
	}
	return out;
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const slugs = a._.length ? a._ : listFilms();
	if (!slugs.length) die('no films to validate');
	const all: {file: string; result: ValidationResult}[] = [];
	for (const s of slugs) all.push(...validateFilm(s));
	if (existsSync(CONFIG_PATH)) all.push({file: CONFIG_PATH, result: validateWith('harness-config', JSON.parse(readFileSync(CONFIG_PATH, 'utf8')))});
	const bad = all.filter((x) => !x.result.ok);
	if (a.flags.json) console.log(JSON.stringify({ok: !bad.length, files: all}, null, 1));
	else
		for (const x of all) {
			say(`${x.result.ok ? 'ok  ' : 'FAIL'} ${path.relative(process.cwd(), x.file)}${x.result.schema ? '' : ' (no schema)'}`);
			for (const e of x.result.errors) say(`       ${e}`);
		}
	return bad.length ? 1 : 0;
};
