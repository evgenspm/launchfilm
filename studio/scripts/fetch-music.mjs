#!/usr/bin/env node
// Downloads the music library listed in public/music/music.json (CC0 and CC BY 4.0 only) into public/music/.
// The audio files are not committed to the repo; the manifest (with sha256) is. Idempotent: present files that
// match their checksum are skipped. Usage: node scripts/fetch-music.mjs [--only id,id] [--record]
//   --record  write sha256/bytes of what was downloaded into music.json (maintainers, after verifying licences)
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {fetchBuffer, fetchText, kenneyZipUrl, readZip, sha256} from './fetch-lib.mjs';

const studio = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(studio, 'public', 'music');
const manifestPath = path.join(dir, 'music.json');
const args = process.argv.slice(2);
const record = args.includes('--record');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
mkdirSync(dir, {recursive: true});
const zips = new Map();
let fetched = 0;
let ok = 0;
const failed = [];

for (const t of manifest.tracks) {
	if (only && !only.includes(t.id)) continue;
	const dest = path.join(dir, t.file);
	if (existsSync(dest) && (!t.sha256 || sha256(readFileSync(dest)) === t.sha256)) {
		ok++;
		continue;
	}
	try {
		let buf;
		if (t.zip_slug) {
			if (!zips.has(t.zip_slug)) {
				const page = await fetchText(`https://kenney.nl/assets/${t.zip_slug}`);
				const url = kenneyZipUrl(page, t.zip_slug);
				if (!url) throw new Error(`no zip link on https://kenney.nl/assets/${t.zip_slug}`);
				zips.set(t.zip_slug, readZip(await fetchBuffer(url)));
			}
			const z = zips.get(t.zip_slug);
			const e = z.entries.find((x) => x.name === t.zip_entry);
			if (!e) throw new Error(`${t.zip_entry} not in the ${t.zip_slug} zip`);
			buf = z.extract(e);
		} else buf = await fetchBuffer(t.download_url);
		const sum = sha256(buf);
		if (t.sha256 && sum !== t.sha256 && !record) throw new Error(`checksum mismatch (got ${sum.slice(0, 12)}…, manifest ${t.sha256.slice(0, 12)}…): the source changed; re-verify its licence, then --record`);
		writeFileSync(dest, buf);
		if (record) {
			t.sha256 = sum;
			t.bytes = buf.length;
		}
		fetched++;
		ok++;
		console.log(`music ${t.id}: ${(buf.length / 1e6).toFixed(1)} MB (${t.license})`);
	} catch (e) {
		failed.push(`${t.id}: ${e.message}`);
	}
}
if (record) writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
console.log(`music library: ${ok}/${manifest.tracks.length} present (${fetched} downloaded) in ${path.relative(process.cwd(), dir) || dir}`);
const ccby = manifest.tracks.filter((t) => t.license === 'CC-BY-4.0').length;
if (ccby) console.log(`${ccby} tracks are CC BY 4.0: their credit line must go in the post / video description (npx launchfilm post prints it).`);
if (failed.length) {
	console.error(`failed:\n  ${failed.join('\n  ')}`);
	process.exit(1);
}
