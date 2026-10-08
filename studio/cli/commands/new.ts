// new <slug>: scaffold films/<slug>/ (BRIEF.md, brand.json, STORYBOARD.md, film.json, Film.tsx, index.tsx).
// --recipe <id> seeds format, beat sheet, SFX and RECIPE.md from studio/src/recipes/<id>:
//   - recipe with code (Recipe.tsx + index.tsx): one "recipe" shot that renders the recipe's component with its defaults
//   - text recipe (recipe.md + recipe.json only): one shot per structure[] row, each a TODO scene in Film.tsx carrying
//     the row's picture, camera, motion and sound as comments; the agent builds them from the studio presets
// --preset sets the platform presets (and so the aspects). --dry-run prints the plan and writes nothing.
// Never overwrites an existing film.
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {list, parseArgs, str} from '../lib/args.js';
import {loadConfig, preset as getPreset} from '../lib/config.js';
import {die, say} from '../lib/log.js';
import {CLI_DIR, filmDir, posix, rel, studioPath} from '../lib/paths.js';
import {schemasDir} from '../lib/schemas.js';

const fill = (t: string, vars: Record<string, string>) => t.replace(/__([A-Z]+)__/g, (m, k) => vars[k] ?? m);

const titleCase = (slug: string) =>
	slug
		.split('-')
		.filter(Boolean)
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join(' ');

/** film.schema.json transition ids (a shot's `transition` is the cut INTO it). */
const FILM_TRANSITIONS = new Set(['hard-cut', 'match-cut', 'mask-wipe', 'blur-dissolve', 'slide-push', 'flash', 'glitch-cut', 'zoom-through', 'portal', 'smash-cut-black']);

type Row = {t0: number; t1: number; beat: string; shot?: string; camera?: string; motion?: string; transition_out?: string; sfx?: string};

const round2 = (n: number) => Math.round(n * 100) / 100;
/** One line of text; `comment` also defuses a block-comment close for TSX comments. */
const oneLine = (s: unknown) => String(s ?? '').replace(/\s+/g, ' ').trim();
const comment = (s: unknown) => oneLine(s).replace(/\*\//g, '* /');
const cell = (s: unknown) => oneLine(s).replace(/\|/g, '\\|');
const firstSound = (s: unknown) => String(s ?? '').split(/[ ,;]+/).find((x) => /^[a-z0-9-]+$/.test(x));

/** The component and defaults a built recipe registers: read from index.tsx (its Composition), checked in Recipe.tsx. */
const recipeExports = (rdir: string) => {
	const ix = existsSync(path.join(rdir, 'index.tsx')) ? readFileSync(path.join(rdir, 'index.tsx'), 'utf8') : '';
	const src = existsSync(path.join(rdir, 'Recipe.tsx')) ? readFileSync(path.join(rdir, 'Recipe.tsx'), 'utf8') : '';
	if (!ix || !src) return null;
	const exported = (name?: string) => Boolean(name && new RegExp(`export (const|function) ${name}\\b`).test(src));
	let comp = /component=\{(\w+)\}/.exec(ix)?.[1];
	let defaults = /defaultProps=\{(\w+)\}/.exec(ix)?.[1];
	if (!exported(comp)) comp = /export const ([A-Z]\w*)\s*:\s*React\.FC/.exec(src)?.[1];
	if (!exported(defaults)) defaults = /export const (\w+Defaults)\b/.exec(src)?.[1];
	return comp && defaults ? {comp, defaults} : null;
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'dry-run']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm new <slug> [--recipe id] [--preset x-16x9,li-4x5] [--title "Product"] [--dry-run]');
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`slug must be kebab-case (a-z, 0-9, -), got ${JSON.stringify(slug)}`);
	const dryRun = Boolean(a.flags['dry-run']);
	const dir = filmDir(slug);
	if (existsSync(dir)) die(`films/${slug}/ already exists`, 'pick another slug; new never overwrites a film');
	const cfg = loadConfig();
	const presets = list(a.flags, 'preset') ?? list(a.flags, 'presets') ?? cfg.defaultPresets;
	for (const p of presets) getPreset(cfg, p);
	const title = str(a.flags, 'title') ?? titleCase(slug);
	const tpl = path.join(CLI_DIR, 'templates', 'film');

	// recipe seed
	const recipeId = str(a.flags, 'recipe');
	let recipe: any = null;
	let mode: 'none' | 'code' | 'text' = 'none';
	let imports = '';
	let scenes = '';
	let shots: Record<string, unknown>[] = [];
	const todo: {key: string; row: Row}[] = [];
	if (recipeId) {
		if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(recipeId)) die(`recipe id must be kebab-case, got ${JSON.stringify(recipeId)}`);
		const rdir = studioPath('src', 'recipes', recipeId);
		if (!existsSync(path.join(rdir, 'recipe.json'))) die(`no recipe ${JSON.stringify(recipeId)} in src/recipes/`, 'find one: recipes/CATALOG.md, recipes/index.json, or npx launchfilm ref search <words>');
		try {
			recipe = JSON.parse(readFileSync(path.join(rdir, 'recipe.json'), 'utf8'));
		} catch (e) {
			die(`src/recipes/${recipeId}/recipe.json is not valid JSON: ${(e as Error).message}`);
		}
		const code = recipeExports(rdir);
		if (code) {
			mode = 'code';
			imports = `import {useBrand} from '../../src/brand';\nimport {${code.comp}, ${code.defaults}} from '../../src/recipes/${recipeId}/Recipe';\n`;
			scenes = `\t// from recipe ${recipeId}: edit content in the props below (see films/${slug}/RECIPE.md "What to adapt" and recipe.json "params")\n\trecipe: () => <${code.comp} {...${code.defaults}} brand={useBrand() as never} />,\n`;
		} else {
			mode = 'text';
			const rows: Row[] = (Array.isArray(recipe?.structure) ? recipe.structure : []).filter((s: any) => s && Number.isFinite(s.t0) && Number.isFinite(s.t1));
			rows.forEach((row, i) => todo.push({key: `${String(i + 1).padStart(2, '0')}-${/^[a-z-]+$/.test(row.beat) ? row.beat : 'shot'}`, row}));
		}
	}

	const aspects = [...new Set(presets.map((p) => cfg.presets[p].aspect))];
	const fps = recipe?.format?.fps ?? 30;
	const duration = recipe?.format?.duration_s ?? Math.min(...presets.map((p) => cfg.presets[p].duration[0]));

	if (mode === 'code') shots = [{id: 'recipe', scene: 'recipe', dur: duration}];
	else if (mode === 'text' && todo.length) {
		// the recipe's beat sheet, at the reference's times; rows are contiguous in a valid recipe, gaps become explicit `at`
		let cursor = 0;
		shots = todo.map(({key, row}, i) => {
			const prev = todo[i - 1]?.row;
			const into = prev?.transition_out && FILM_TRANSITIONS.has(prev.transition_out) && prev.transition_out !== 'hard-cut' ? prev.transition_out : undefined;
			const at = Math.abs(row.t0 - cursor) > 0.02 ? round2(row.t0) : undefined;
			cursor = row.t1;
			const sound = firstSound(row.sfx);
			return {
				id: key,
				...(at !== undefined ? {at} : {}),
				dur: round2(Math.max(0.1, row.t1 - row.t0)),
				scene: key,
				...(into ? {transition: into} : {}),
				...(sound ? {sfx: [{at: 0, sound}]} : {}),
				props: {row: i + 1, beat: row.beat, shot: oneLine(row.shot), recipe: recipeId},
			};
		});
		imports = `import {TodoScene} from '../../src/film';\n`;
		scenes = todo
			.map(({key, row}, i) =>
				[
					`\t// TODO #${i + 1} ${row.beat}, recipe ${round2(row.t0)}-${round2(row.t1)} s (re-timed in film.json). Build it from src/presets + src/components (API.md).`,
					row.shot ? `\t//   picture: ${comment(row.shot)}` : '',
					row.camera ? `\t//   camera: ${comment(row.camera)}` : '',
					row.motion ? `\t//   motion: ${comment(row.motion)}` : '',
					row.transition_out ? `\t//   out: ${comment(row.transition_out)}` : '',
					row.sfx ? `\t//   sound: ${comment(row.sfx)}` : '',
					`\t'${key}': TodoScene,`,
				]
					.filter(Boolean)
					.join('\n'),
			)
			.join('\n') + '\n';
	} else
		shots = [
			{id: 'hook', scene: 'title', dur: 3, props: {text: title}},
			{id: 'end', scene: 'logo', dur: 2},
		];

	const schemaRel = (() => {
		const d = schemasDir();
		return d ? posix(path.relative(dir, path.join(d, 'film.schema.json'))) : '../../schemas/film.schema.json';
	})();
	const film: Record<string, unknown> = {
		$schema: schemaRel,
		id: slug,
		title,
		fps,
		aspects,
		duration,
		...(recipe?.audio?.music?.bpm ? {beats: {bpm: recipe.audio.music.bpm}} : {}),
		shots,
		vo: [{id: 'l1', text: `Meet *${title}*.`, at: 0.5}],
		// text recipes carry their sounds on the shots; code recipes keep the film-level list from the beat sheet
		sfx: mode === 'text' ? [] : (recipe?.structure ?? []).filter((s: any) => firstSound(s.sfx)).map((s: any) => ({at: s.t0, sound: firstSound(s.sfx)})),
		subtitles: {enabled: true},
	};
	const brand = {
		$schema: schemaRel.replace('film.schema.json', 'brand.schema.json'),
		id: slug,
		name: title,
		tagline: 'Replace with the product promise.',
		url: 'example.com',
		theme: 'dark',
		colors: {bg: '#0B0B0F', fg: '#F4F4F6', accent: '#6E7BFF', accent2: '#39D3B4', muted: '#8B8B98', surface: '#16161D'},
		fonts: {display: 'Inter', text: 'Inter', mono: 'JetBrains Mono'},
		radius: 14,
	};
	const rows = recipe?.structure?.length
		? recipe.structure.map((s: Row, i: number) => `| ${i + 1} | ${s.t0}–${s.t1} | ${cell(s.beat)} | ${cell(s.shot)} | ${cell(s.camera)} | ${cell(s.motion)} | ${cell(s.transition_out ?? 'hard-cut')} | ${cell(s.sfx)} |`).join('\n')
		: '| 1 | 0–3 | hook | | | | hard-cut | |\n| 2 | 3–5 | cta | logo + URL | | | | |';

	const hasRecipeMd = Boolean(recipe && existsSync(studioPath('src', 'recipes', recipeId!, 'recipe.md')));
	const files = ['BRIEF.md', 'brand.json', 'STORYBOARD.md', 'film.json', 'Film.tsx', 'index.tsx', ...(hasRecipeMd ? ['RECIPE.md'] : [])];
	const compositions = aspects.map((x) => `${slug}-${x.replace(':', 'x')}`);
	const recipeNote = recipe
		? mode === 'code'
			? `seeded from recipe ${recipeId} (ready code: one "recipe" shot renders its component)`
			: `seeded from text recipe ${recipeId}: ${todo.length} TODO scene${todo.length === 1 ? '' : 's'} from its beat sheet${todo.length ? '' : ' (structure[] is empty: write the shots by hand)'}`
		: '';
	const next =
		mode === 'text'
			? [
					`next: BRIEF.md with the user → brand.json (brand-intake) → STORYBOARD.md (story; the recipe's rows are pre-filled, re-time them to your length and beat grid; user approves)`,
					`then build each TODO scene in films/${slug}/Film.tsx (scene-build skill, API.md): keep the recipe's springs, frame counts, transitions and sounds; replace its picture with your product and copy`,
					`check: npx launchfilm still ${slug} <t> on every shot; npx launchfilm qa ${slug} fails while a TodoScene is left`,
				]
			: [`next: fill BRIEF.md with the user → brand.json (brand-intake) → STORYBOARD.md (user approves) → scenes → npx launchfilm vo ${slug}`];

	if (!dryRun) {
		mkdirSync(dir, {recursive: true});
		const vars = {SLUG: slug, ID: slug, TITLE: title, PRESETS: presets.join(', '), PRESET: presets[0], BPM: String(recipe?.audio?.music?.bpm ?? '?'), ROWS: rows, IMPORTS: imports, SCENES: scenes};
		for (const f of ['BRIEF.md', 'STORYBOARD.md', 'Film.tsx', 'index.tsx']) writeFileSync(path.join(dir, f), fill(readFileSync(path.join(tpl, f), 'utf8'), vars));
		writeFileSync(path.join(dir, 'film.json'), JSON.stringify(film, null, 2) + '\n');
		writeFileSync(path.join(dir, 'brand.json'), JSON.stringify(brand, null, 2) + '\n');
		if (hasRecipeMd) copyFileSync(studioPath('src', 'recipes', recipeId!, 'recipe.md'), path.join(dir, 'RECIPE.md'));
	}
	if (a.flags.json)
		console.log(
			JSON.stringify({
				ok: true,
				dryRun,
				dir,
				files,
				compositions,
				recipe: recipe ? {id: recipeId, mode, todo: todo.map((t) => t.key)} : null,
				...(dryRun ? {film} : {}),
			}),
		);
	else {
		say(`${dryRun ? 'dry run, nothing written: would create' : 'new'} ${rel(dir)}/: ${files.join(', ')}`);
		say(`  presets ${presets.join(', ')} → compositions ${compositions.join(', ')}${recipeNote ? `; ${recipeNote}` : ''}`);
		if (mode === 'text') for (const {key, row} of todo) say(`  TODO ${key.padEnd(14)} ${String(round2(row.t0)).padStart(6)}–${String(round2(row.t1)).padEnd(6)} ${oneLine(row.shot).slice(0, 90)}`);
		for (const l of next) say(`  ${l}`);
	}
	return 0;
};
