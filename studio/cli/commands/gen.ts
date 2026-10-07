// gen image|video|review: optional paid generators and a Gemini video review. Off by default: the free path is
// motion graphics + the user's own screenshots/recordings. Outputs stay in the user's project with a provenance file.
import {writeFileSync} from 'node:fs';
import path from 'node:path';
import {num, parseArgs, str} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {die, say} from '../lib/log.js';
import {ensureDir, filmQaDir, rel} from '../lib/paths.js';
import {generateImage, generateVideo, REVIEW_PROMPT, reviewVideo} from '../providers/media.js';

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const [kind, ...rest] = a._;
	const cfg = loadConfig();
	if (kind === 'review') {
		const file = rest[0];
		if (!file) die('usage: launchfilm gen review <video.mp4> [--product "Name"] [--prompt "..."] [--slug film]');
		const r = await reviewVideo(file, str(a.flags, 'prompt') ?? REVIEW_PROMPT(str(a.flags, 'product') ?? 'the product'), cfg);
		const slug = str(a.flags, 'slug');
		const out = slug ? path.join(ensureDir(filmQaDir(slug)), 'gemini-review.md') : `${file.replace(/\.[^.]+$/, '')}.review.md`;
		writeFileSync(out, `# Gemini review (${r.model})\n\nSampled at low resolution: trust only issues pinned to a timestamp, and check each on a still.\n\n${r.text}\n`);
		say(`${r.text}\n\n(saved to ${rel(path.resolve(out))})`);
		return 0;
	}
	if (kind !== 'image' && kind !== 'video') die('usage: launchfilm gen image|video "<prompt>" --out file [--provider p] | gen review <video>');
	const prompt = str(a.flags, 'prompt') ?? rest.join(' ');
	if (!prompt) die('a prompt is required');
	const provider = str(a.flags, 'provider') ?? (kind === 'image' ? cfg.providers.image.default : cfg.providers.video.default);
	if (!provider) die(`no ${kind} provider configured (none is on by default; there is no free tier)`, `pass --provider ${kind === 'image' ? 'gemini|openai|fal' : 'gemini|fal'} or set providers.${kind}.default; the user adds the key to .env`);
	const out = path.resolve(str(a.flags, 'out') ?? die('--out is required (e.g. public/films/<slug>/broll-1.mp4)'));
	ensureDir(path.dirname(out));
	const r = kind === 'image' ? await generateImage(provider!, prompt, out, cfg, {aspect: str(a.flags, 'aspect')}) : await generateVideo(provider!, prompt, out, cfg, {seconds: num(a.flags, 'seconds'), aspect: str(a.flags, 'aspect')});
	writeFileSync(`${out}.provenance.json`, JSON.stringify({...r, at: new Date().toISOString(), note: 'AI-generated: disclose where the platform asks'}, null, 1) + '\n');
	say(`gen ${kind} ${rel(out)} (${r.provider} ${r.model}); provenance next to it`);
	return 0;
};
