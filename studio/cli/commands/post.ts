// post <slug>: a post-copy scaffold for X, LinkedIn and Product Hunt (to be rewritten in the user's own voice),
// the attribution lines the assets require, and (unless opted out) an optional launchfilm credit line.
// Writes out/<slug>/post.md. The launch-post skill turns the scaffold into finished copy.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs, str} from '../lib/args.js';
import {writeCreditsFile} from '../lib/credits.js';
import {loadFilm} from '../lib/film.js';
import {say} from '../lib/log.js';
import {ensureDir, filmOutDir, rel} from '../lib/paths.js';
import {creditLines, creditStatus} from './credit.js';

export const postMarkdown = (slug: string, productFlag?: string) => {
	const film = loadFilm(slug);
	const brandFile = path.join(film.dir, 'brand.json');
	const brand = existsSync(brandFile) ? JSON.parse(readFileSync(brandFile, 'utf8')) : {};
	const name = productFlag ?? brand.name ?? film.spec.title ?? slug;
	const url = brand.url ?? 'example.com';
	const tagline = brand.tagline ?? '[one line: what changes for the user]';
	const credits = writeCreditsFile(film);
	const cs = creditStatus();
	const cl = creditLines(name);
	const out = [
		`# Post copy: ${name}`,
		'',
		'Scaffold only. Rewrite it in the founder\'s own words (launch-post skill): short, concrete, no hype words, one number or',
		'one real moment from the film. Attach the matching preset file from out/' + slug + '/.',
		'',
		'## X (attach x-16x9)',
		'',
		'```',
		`${name}: ${tagline}`,
		'',
		'[one concrete thing it does, with a number or a before/after]',
		'',
		url,
		'```',
		'',
		'## LinkedIn (attach li-4x5; plays muted, captions are burned in)',
		'',
		'```',
		`[hook: the problem in the reader's words]`,
		'',
		`${name} [what it does, one sentence].`,
		'',
		'[how it works or who it is for, one or two lines]',
		'',
		`${url}`,
		'```',
		'',
		'## Product Hunt',
		'',
		`- Tagline (≤ 60 chars): ${tagline.slice(0, 60)}`,
		'- Description (≤ 260 chars): [what it is, who it is for, the one thing that is different]',
		'- Gallery video: ph-16x9 (or x-16x9); first comment: why you built it, what is next, ask for feedback',
		'',
	];
	if (credits.required.length) out.push('## Attribution (required: paste into the description)', '', '```', ...credits.required, '```', '');
	if (credits.optional.length) out.push('## Attribution (optional)', '', ...credits.optional.map((x) => `- ${x}`), '');
	if (credits.disclosures.length) out.push('## Disclosures', '', ...credits.disclosures.map((x) => `- ${x}`), '');
	if (cs.enabled) out.push('## Optional credit for launchfilm', '', 'Only if the user wants it.', '', '```', cl.x, '```', '', '```', cl.linkedin, '```', '');
	return {md: out.join('\n'), credits, creditEnabled: cs.enabled};
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const slug = a._[0];
	if (!slug) throw new Error('usage: launchfilm post <slug> [--product "Name"]');
	const {md, credits} = postMarkdown(slug, str(a.flags, 'product'));
	const file = path.join(ensureDir(filmOutDir(slug)), 'post.md');
	writeFileSync(file, md + '\n');
	if (a.flags.json) console.log(JSON.stringify({file, credits_file: credits.file, required: credits.required, markdown: md}, null, 1));
	else {
		say(md);
		say(`\n(saved to ${rel(file)}; credits in ${rel(credits.file)})`);
	}
	return 0;
};
