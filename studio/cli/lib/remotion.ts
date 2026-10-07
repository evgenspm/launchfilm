// Thin wrapper around the Remotion CLI of this studio (node_modules/@remotion/cli), run with the current node.
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {existsSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {loadConfig} from './config.js';
import {die} from './log.js';
import {ensureDir, FILMS_DIR, filmDir, HARNESS_DIR, readJsonIf, STUDIO, studioPath} from './paths.js';
import {run, runOk, type RunOpts} from './proc.js';

const req = createRequire(studioPath('package.json'));

export const remotionCliPath = (): string => {
	let pkgPath: string;
	try {
		pkgPath = req.resolve('@remotion/cli/package.json');
	} catch {
		return die('@remotion/cli is not installed', 'run: npm ci   (inside launch-video/)');
	}
	const pkg = req(pkgPath);
	const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.remotion;
	return path.join(path.dirname(pkgPath), bin);
};

export const remotion = (args: string[], opts: RunOpts = {}, what = `remotion ${args[0]}`) =>
	runOk(process.execPath, [remotionCliPath(), ...args], {cwd: STUDIO, ...opts}, what);

export const remotionRaw = (args: string[], opts: RunOpts = {}) => run(process.execPath, [remotionCliPath(), ...args], {cwd: STUDIO, ...opts});

export const remotionVersion = (): string | null => {
	try {
		return req('remotion/package.json').version;
	} catch {
		return null;
	}
};

export const browserDir = () => studioPath('node_modules', '.remotion', 'chrome-headless-shell');

export const browserInstalled = () => {
	const d = browserDir();
	if (!existsSync(d)) return false;
	try {
		return readdirSync(d).length > 0;
	} catch {
		return false;
	}
};

/** --gl flag: env REMOTION_GL wins (CI sets swangle on Linux), then harness.config.json render.gl. */
export const glArgs = (): string[] => {
	const gl = process.env.REMOTION_GL || loadConfig().render.gl;
	return gl ? [`--gl=${gl}`] : [];
};

/** A film may carry its own entry (films/<slug>/_entry.tsx) so a broken film elsewhere can't break its render. */
export const entryFor = (slug?: string): string[] => {
	if (slug) {
		for (const name of ['_entry.tsx', '_entry.ts']) {
			const p = path.join(filmDir(slug), name);
			if (existsSync(p)) return [path.relative(STUDIO, p)];
		}
	}
	return [];
};

const walkMtime = (dir: string, h: ReturnType<typeof createHash>) => {
	if (!existsSync(dir)) return;
	for (const e of readdirSync(dir, {withFileTypes: true})) {
		if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walkMtime(p, h);
		else if (/\.(tsx?|jsx?|json)$/.test(e.name)) h.update(`${p}:${statSync(p).mtimeMs}\n`);
	}
};

/** Composition ids, cached until a file under src/ or films/ changes. */
export const listCompositions = async (entry: string[] = []): Promise<string[]> => {
	const h = createHash('sha1');
	h.update(entry.join(','));
	walkMtime(studioPath('src'), h);
	walkMtime(FILMS_DIR, h);
	const key = h.digest('hex');
	const cacheFile = path.join(HARNESS_DIR, 'compositions.json');
	const cache = readJsonIf<{key: string; ids: string[]}>(cacheFile);
	if (cache?.key === key) return cache.ids;
	// note: --log=error also silences the --quiet id list, so it is not passed here
	const r = await remotion(['compositions', ...entry, '--quiet', ...glArgs()], {}, 'remotion compositions');
	const ids = [...new Set(r.stdout.toString('utf8').split(/\s+/).filter((t) => /^[A-Za-z0-9][A-Za-z0-9一-鿿-]*$/.test(t)))];
	if (ids.length) {
		ensureDir(HARNESS_DIR);
		writeFileSync(cacheFile, JSON.stringify({key, ids}, null, 1));
	}
	return ids;
};

export const slugToId = (slug: string) => slug.replace(/[^A-Za-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Find the composition for a film + platform preset. Convention: `<slug>-<preset>` (slug made id-safe,
 * so films/_sample → "sample-x-16x9"). Falls back to the only composition whose id starts with the slug.
 */
export const resolveComposition = async (slug: string, presetId: string | null, explicit?: string): Promise<string> => {
	const entry = entryFor(slug);
	const ids = await listCompositions(entry);
	if (explicit) {
		if (!ids.includes(explicit)) die(`no composition ${JSON.stringify(explicit)}`, `available: ${ids.join(', ') || '(none)'}`);
		return explicit;
	}
	const base = slugToId(slug);
	const candidates = presetId ? [`${base}-${presetId}`, `${slug}-${presetId}`, `${base}-${presetId.replace(/^[a-z]+-/, '')}`] : [base, slug];
	for (const c of candidates) if (ids.includes(c)) return c;
	const prefixed = ids.filter((id) => id === base || id.startsWith(`${base}-`));
	if (!presetId && prefixed.length >= 1) return prefixed[0];
	if (prefixed.length === 1) return prefixed[0];
	return die(
		`no composition for film ${JSON.stringify(slug)}${presetId ? ` preset ${presetId}` : ''}`,
		`expected id ${candidates[0]}; film compositions found: ${prefixed.join(', ') || '(none)'}; pass --comp <id> to pick one`,
	);
};
