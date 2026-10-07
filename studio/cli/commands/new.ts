// new <slug>: scaffold films/<slug>/ (BRIEF.md, brand.json, STORYBOARD.md, film.json, Film.tsx, index.tsx).
// --recipe <id> seeds format, beat sheet, SFX and a "recipe" scene from studio/src/recipes/<id>.
// --preset sets the platform presets (and so the aspects). Never overwrites an existing film.
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

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm new <slug> [--recipe id] [--preset x-16x9,li-4x5] [--title "Product"]');
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`slug must be kebab-case (a-z, 0-9, -), got ${JSON.stringify(slug)}`);
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
	let recipeImports = '';
	let recipeScene = '';
	if (recipeId) {
		const rdir = studioPath('src', 'recipes', recipeId);
		if (!existsSync(path.join(rdir, 'recipe.json'))) die(`no recipe ${JSON.stringify(recipeId)} in src/recipes/`, 'list them: ls src/recipes  (or npx launchfilm ref search <words>)');
		recipe = JSON.parse(readFileSync(path.join(rdir, 'recipe.json'), 'utf8'));
		const src = existsSync(path.join(rdir, 'Recipe.tsx')) ? readFileSync(path.join(rdir, 'Recipe.tsx'), 'utf8') : '';
		const defaults = /export const (\w+Defaults)\b/.exec(src)?.[1];
		const comp = /export const ([A-Z]\w*)\s*:\s*React\.FC/.exec(src)?.[1];
		if (defaults && comp) {
			recipeImports = `import {useBrand} from '../../src/brand';\nimport {${comp}, ${defaults}} from '../../src/recipes/${recipeId}/Recipe';\n`;
			recipeScene = `\t// from recipe ${recipeId}: edit content in the props below (see films/${slug}/RECIPE.md "params")\n\trecipe: () => <${comp} {...${defaults}} brand={useBrand() as never} />,\n`;
		}
	}

	const aspects = [...new Set(presets.map((p) => cfg.presets[p].aspect))];
	const fps = recipe?.format?.fps ?? 30;
	const duration = recipe?.format?.duration_s ?? Math.min(...presets.map((p) => cfg.presets[p].duration[0]));
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
		shots: recipeScene
			? [{id: 'recipe', scene: 'recipe', dur: duration}]
			: [
					{id: 'hook', scene: 'title', dur: 3, props: {text: title}},
					{id: 'end', scene: 'logo', dur: 2},
				],
		vo: [{id: 'l1', text: `Meet *${title}*.`, at: 0.5}],
		sfx: (recipe?.structure ?? []).filter((s: any) => s.sfx).map((s: any) => ({at: s.t0, sound: String(s.sfx).split(/[ ,]/)[0]})),
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
		? recipe.structure.map((s: any, i: number) => `| ${i + 1} | ${s.t0}–${s.t1} | ${s.beat} | ${s.shot ?? ''} | ${s.camera ?? ''} | ${s.motion ?? ''} | ${s.transition_out ?? 'hard-cut'} | ${s.sfx ?? ''} |`).join('\n')
		: '| 1 | 0–3 | hook | | | | hard-cut | |\n| 2 | 3–5 | cta | logo + URL | | | | |';

	mkdirSync(dir, {recursive: true});
	const vars = {SLUG: slug, ID: slug, TITLE: title, PRESETS: presets.join(', '), PRESET: presets[0], BPM: String(recipe?.audio?.music?.bpm ?? '?'), ROWS: rows, IMPORTS: recipeImports, SCENES: recipeScene};
	for (const f of ['BRIEF.md', 'STORYBOARD.md', 'Film.tsx', 'index.tsx']) writeFileSync(path.join(dir, f), fill(readFileSync(path.join(tpl, f), 'utf8'), vars));
	writeFileSync(path.join(dir, 'film.json'), JSON.stringify(film, null, 2) + '\n');
	writeFileSync(path.join(dir, 'brand.json'), JSON.stringify(brand, null, 2) + '\n');
	if (recipe && existsSync(studioPath('src', 'recipes', recipeId!, 'recipe.md'))) copyFileSync(studioPath('src', 'recipes', recipeId!, 'recipe.md'), path.join(dir, 'RECIPE.md'));
	const files = ['BRIEF.md', 'brand.json', 'STORYBOARD.md', 'film.json', 'Film.tsx', 'index.tsx', ...(recipe ? ['RECIPE.md'] : [])];
	if (a.flags.json) console.log(JSON.stringify({ok: true, dir, files, compositions: aspects.map((x) => `${slug}-${x.replace(':', 'x')}`)}));
	else {
		say(`new ${rel(dir)}/: ${files.join(', ')}`);
		say(`  presets ${presets.join(', ')} → compositions ${aspects.map((x) => `${slug}-${x.replace(':', 'x')}`).join(', ')}${recipe ? `; seeded from recipe ${recipeId}${recipeScene ? '' : ' (no Defaults export found: wire the scene by hand)'}` : ''}`);
		say(`  next: fill BRIEF.md with the user → brand.json (brand-intake) → STORYBOARD.md (user approves) → scenes → npx launchfilm vo ${slug}`);
	}
	return 0;
};
