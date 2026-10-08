// Shared helpers for the repo-level scripts. Dependencies (ajv) are resolved from studio/node_modules,
// so run `npm ci --prefix studio` first.
import {createRequire} from 'node:module';
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const req = createRequire(path.join(ROOT, 'studio', 'package.json'));

export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

export const ajv2020 = () => {
	const Ajv2020 = req('ajv/dist/2020').default ?? req('ajv/dist/2020');
	const addFormats = req('ajv-formats').default ?? req('ajv-formats');
	const ajv = new Ajv2020({allErrors: true, strict: false});
	addFormats(ajv);
	return ajv;
};

/** craft/vocabulary.md → {techniques, audio, beats} id sets. Bullets are "- `id` — text · `id2` — text". */
export const vocabulary = () => {
	const text = readFileSync(path.join(ROOT, 'craft', 'vocabulary.md'), 'utf8');
	const out = {techniques: new Set(), audio: new Set(), beats: new Set(), sections: {}};
	let section = '';
	for (const line of text.split('\n')) {
		const h = /^##\s+(\S+)/.exec(line);
		if (h) {
			section = h[1].toLowerCase();
			continue;
		}
		if (!section) continue;
		const ids = [];
		if (section === 'beats') for (const m of line.matchAll(/`([a-z0-9-]+)`/g)) ids.push(m[1]);
		else if (/^\s*-\s/.test(line)) for (const part of line.replace(/^\s*-\s*/, '').split(' · ')) {
			// a part starts with one id, or several joined by " / " (`device-phone` / `device-laptop`: …)
			const m = /^\s*((?:`[a-z0-9-]+`\s*\/\s*)*`[a-z0-9-]+`)/.exec(part);
			if (m) for (const x of m[1].matchAll(/`([a-z0-9-]+)`/g)) ids.push(x[1]);
		}
		const bucket = section === 'audio' ? out.audio : section === 'beats' ? out.beats : out.techniques;
		for (const id of ids) {
			bucket.add(id);
			(out.sections[section] ??= new Set()).add(id);
		}
	}
	return out;
};

export const recipeDirs = () => {
	const dir = path.join(ROOT, 'studio', 'src', 'recipes');
	if (!existsSync(dir)) return [];
	return readdirSync(dir, {withFileTypes: true})
		.filter((d) => d.isDirectory() && existsSync(path.join(dir, d.name, 'recipe.json')))
		.map((d) => path.join(dir, d.name))
		.sort();
};

export const stable = (v) => JSON.stringify(v, null, 1) + '\n';
