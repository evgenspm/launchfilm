#!/usr/bin/env node
// Fetches Kenney's CC0 audio packs (UI Audio, Interface Sounds, Impact Sounds) and imports them into
// public/sfx/kenney/<pack>/ as 48 kHz WAV peak -3 dBFS, with manifest entries (licence CC0-1.0, source kenney).
// Kenney: "Creative Commons CC0"; credit "would be nice but is not mandatory". Don't use the Kenney logo.
// The zip URL carries a content hash, so it is read from the asset page each time. Needs `npm ci` first (the import
// step uses the CLI and Remotion's ffmpeg). Usage: node scripts/fetch-kenney.mjs [--packs ui-audio,impact-sounds]
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {fetchBuffer, fetchText, kenneyZipUrl, readZip} from './fetch-lib.mjs';

const studio = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKS = {'ui-audio': ['ui', 'click'], 'interface-sounds': ['ui', 'interface'], 'impact-sounds': ['impact', 'hit']};
const args = process.argv.slice(2);
const want = args.includes('--packs') ? args[args.indexOf('--packs') + 1].split(',') : Object.keys(PACKS);
const kenneyDir = path.join(studio, 'public', 'sfx', 'kenney');
mkdirSync(kenneyDir, {recursive: true});
let failed = 0;

for (const slug of want) {
	if (!PACKS[slug]) {
		console.error(`unknown pack ${slug} (${Object.keys(PACKS).join(', ')})`);
		failed++;
		continue;
	}
	const tmp = mkdtempSync(path.join(os.tmpdir(), 'launchfilm-kenney-'));
	try {
		const page = `https://kenney.nl/assets/${slug}`;
		const url = kenneyZipUrl(await fetchText(page), slug);
		if (!url) throw new Error(`no zip link found on ${page}`);
		const zip = readZip(await fetchBuffer(url));
		let n = 0;
		for (const e of zip.entries) {
			const base = path.basename(e.name);
			if (/^license/i.test(base)) {
				writeFileSync(path.join(kenneyDir, 'License.txt'), zip.extract(e));
				continue;
			}
			if (!/\.(ogg|wav)$/i.test(base) || /^preview\./i.test(base)) continue;
			writeFileSync(path.join(tmp, base), zip.extract(e));
			n++;
		}
		const r = spawnSync(process.execPath, [path.join(studio, 'cli', 'launchfilm.mjs'), 'sfx', 'import', tmp, '--source', 'kenney', '--pack', slug, '--license', 'CC0-1.0', '--author', 'Kenney (www.kenney.nl)', '--url', page, '--tags', PACKS[slug].join(',')], {stdio: 'inherit', cwd: studio});
		if (r.status !== 0) throw new Error('sfx import failed');
		console.log(`kenney ${slug}: ${n} sounds from ${url}`);
	} catch (e) {
		console.error(`kenney ${slug}: ${e.message}`);
		failed++;
	} finally {
		rmSync(tmp, {recursive: true, force: true});
	}
}
if (!existsSync(path.join(kenneyDir, 'License.txt'))) writeFileSync(path.join(kenneyDir, 'License.txt'), 'Kenney audio packs (www.kenney.nl): Creative Commons CC0 1.0 Universal. Credit is appreciated, not required.\n');
process.exit(failed ? 1 : 0);
