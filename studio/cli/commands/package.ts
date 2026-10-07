// package <slug>: one folder with everything to upload: finals per preset, posters, SRT, credits.txt, post.md,
// manifest.json and a plain index.html to preview them. Default: out/<slug>/package/ (or --to <dir>).
import {copyFileSync, existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs, str} from '../lib/args.js';
import {probe} from '../lib/ffmpeg.js';
import {loadFilm} from '../lib/film.js';
import {die, fmtBytes, say} from '../lib/log.js';
import {ensureDir, filmOutDir, readJsonIf, rel} from '../lib/paths.js';
import {postMarkdown} from './post.js';
import {renderedFiles} from './sheet.js';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]!);

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const slug = a._[0];
	if (!slug) die('usage: launchfilm package <slug> [--to dir]');
	const film = loadFilm(slug);
	const finals = renderedFiles(slug).filter((f) => !/@[\d.]+x\.mp4$/.test(f));
	if (!finals.length) die(`no full-size renders in out/${slug}/`, `npx launchfilm render ${slug}   (drafts rendered with --scale are not packaged)`);
	const dest = ensureDir(path.resolve(str(a.flags, 'to') ?? path.join(filmOutDir(slug), 'package')));
	const record = readJsonIf<{results?: {file: string; preset: string; lufs: number | null}[]}>(path.join(filmOutDir(slug), 'render.json'));
	const items = [];
	for (const f of finals) {
		const name = path.basename(f);
		copyFileSync(f, path.join(dest, name));
		const poster = f.replace(/\.mp4$/, '-poster.png');
		if (existsSync(poster)) copyFileSync(poster, path.join(dest, path.basename(poster)));
		const info = await probe(f);
		const r = record?.results?.find((x) => path.resolve(x.file) === path.resolve(f));
		items.push({file: name, poster: existsSync(poster) ? path.basename(poster) : null, preset: r?.preset ?? null, duration: info.duration, width: info.video?.width, height: info.video?.height, size: info.size, lufs: r?.lufs ?? null});
	}
	const srt = path.join(filmOutDir(slug), `${slug.replace(/^_/, '')}.srt`);
	if (existsSync(srt)) {
		copyFileSync(srt, path.join(dest, path.basename(srt)));
		copyFileSync(srt, path.join(dest, path.basename(srt).replace(/\.srt$/, '.en.srt')));
	}
	const {md, credits} = postMarkdown(slug);
	writeFileSync(path.join(dest, 'post.md'), md + '\n');
	copyFileSync(credits.file, path.join(dest, 'credits.txt'));
	writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify({film: slug, title: film.spec.title ?? slug, at: new Date().toISOString(), items, srt: existsSync(srt) ? path.basename(srt) : null, credits_required: credits.required}, null, 1) + '\n');
	const html = [
		'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
		`<title>${esc(film.spec.title ?? slug)}</title>`,
		'<style>body{font:15px/1.5 system-ui,sans-serif;margin:24px auto;max-width:1100px;padding:0 16px;background:#111;color:#eee}video{max-width:100%;max-height:70vh;background:#000;border-radius:8px}figure{margin:0 0 28px}figcaption{color:#aaa;font-size:13px}pre{white-space:pre-wrap;background:#1b1b1b;padding:12px;border-radius:8px}</style>',
		`<h1>${esc(film.spec.title ?? slug)}</h1>`,
		...items.map((i) => `<figure><video src="${esc(i.file)}" ${i.poster ? `poster="${esc(i.poster)}" ` : ''}controls preload="metadata"></video><figcaption>${esc(i.preset ?? i.file)}: ${i.width}×${i.height}, ${i.duration.toFixed(1)} s, ${fmtBytes(i.size)}${i.lufs != null ? `, ${i.lufs} LUFS` : ''}</figcaption></figure>`),
		`<h2>Credits</h2><pre>${esc(readFileSync(credits.file, 'utf8'))}</pre>`,
	].join('\n');
	writeFileSync(path.join(dest, 'index.html'), html + '\n');
	if (a.flags.json) console.log(JSON.stringify({dir: dest, items, credits_required: credits.required}, null, 1));
	else {
		say(`package ${rel(dest)}/: ${items.map((i) => i.file).join(', ')}${existsSync(srt) ? ', SRT' : ''}, credits.txt, post.md, manifest.json, index.html`);
		if (credits.required.length) say(`  required credit lines: ${credits.required.length} (in credits.txt and post.md)`);
	}
	return 0;
};
