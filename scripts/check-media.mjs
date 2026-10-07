#!/usr/bin/env node
// Licence gate for committed media (CI). Fails when:
//  - a WAV under studio/public/sfx/ has no manifest entry, or its entry is not CC0-1.0 from our procedural presets
//  - studio/public/music/ contains audio files (they are fetched on install, never committed) or the manifest lists
//    anything but CC0-1.0 / CC-BY-4.0 (no NC/SA/ND, no ElevenLabs/Pixabay/Mixkit/YouTube Audio Library)
//  - a CC BY track has no attribution line
//  - tracked files exceed the repo size budget (20 MB)
// Uses `git ls-files` when available, else walks the tree (skipping node_modules and gitignored output folders).
import {execFileSync} from 'node:child_process';
import {existsSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {readJson, ROOT} from './lib.mjs';

const errors = [];
const sfxDir = path.join(ROOT, 'studio', 'public', 'sfx');
const musicDir = path.join(ROOT, 'studio', 'public', 'music');

let tracked;
try {
	tracked = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], {cwd: ROOT, encoding: 'utf8'}).split('\n').filter(Boolean);
} catch {
	tracked = null;
}
const walk = (dir, out = []) => {
	for (const e of readdirSync(dir, {withFileTypes: true})) {
		if (['node_modules', '.git', 'out', 'qa', '.harness', '.agents'].includes(e.name)) continue;
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, out);
		else out.push(path.relative(ROOT, p));
	}
	return out;
};
const files = tracked ?? walk(ROOT);

// SFX
const manifest = existsSync(path.join(sfxDir, 'sfx.json')) ? readJson(path.join(sfxDir, 'sfx.json')) : {sounds: []};
const byFile = new Map(manifest.sounds.map((s) => [s.file, s]));
for (const f of files.filter((x) => x.startsWith('studio/public/sfx/') && /\.(wav|mp3|ogg|flac)$/i.test(x))) {
	const rel = f.slice('studio/public/sfx/'.length);
	const e = byFile.get(rel);
	if (!e) errors.push(`${f}: no entry in studio/public/sfx/sfx.json`);
	else if (e.license !== 'CC0-1.0' || e.source !== 'launchfilm-procedural') errors.push(`${f}: committed SFX must be our CC0 procedural presets (has ${e.license}, ${e.source}); third-party packs are fetched on install`);
}
for (const s of manifest.sounds) if (!files.includes(`studio/public/sfx/${s.file}`)) errors.push(`sfx.json lists ${s.file}, which is not in the repo (fetched entries must not be committed to the manifest)`);

// music
for (const f of files.filter((x) => x.startsWith('studio/public/music/') && /\.(wav|mp3|ogg|flac|m4a|aac)$/i.test(x))) errors.push(`${f}: music audio is fetched on install, never committed`);
if (existsSync(path.join(musicDir, 'music.json'))) {
	for (const t of readJson(path.join(musicDir, 'music.json')).tracks ?? []) {
		if (!['CC0-1.0', 'CC-BY-4.0'].includes(t.license)) errors.push(`music ${t.id}: licence ${t.license} not allowed (CC0-1.0 or CC-BY-4.0 only)`);
		if (t.license === 'CC-BY-4.0' && !t.attribution) errors.push(`music ${t.id}: CC BY without an attribution line`);
		if (/elevenlabs|pixabay|mixkit|youtube|uppbeat|bensound|suno|udio/i.test(`${t.download_url} ${t.source_page_url}`)) errors.push(`music ${t.id}: source not allowed in the library`);
	}
}

// size budget
let total = 0;
for (const f of files) {
	try {
		total += statSync(path.join(ROOT, f)).size;
	} catch {
		// deleted in the working tree
	}
}
if (total > 20 * 1024 * 1024) errors.push(`tracked files are ${(total / 1048576).toFixed(1)} MB (budget 20 MB): move demo media to GitHub Releases`);

for (const e of errors) console.error(`error: ${e}`);
console.log(`media check: ${files.length} files, ${(total / 1048576).toFixed(1)} MB, ${manifest.sounds.length} SFX entries${errors.length ? `, ${errors.length} errors` : ', ok'}`);
process.exit(errors.length ? 1 : 0);
