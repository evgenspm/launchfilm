// Where things live. The CLI always sits inside the studio (studio/cli in the harness repo,
// launch-video/cli in a user's repo), so the studio root is two levels up from this file.
import {existsSync, mkdirSync, readFileSync, statSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const CLI_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const STUDIO = process.env.LAUNCHFILM_STUDIO ? path.resolve(process.env.LAUNCHFILM_STUDIO) : path.resolve(CLI_DIR, '..');

export const studioPath = (...p: string[]) => path.join(STUDIO, ...p);
export const HARNESS_DIR = studioPath('.harness');
export const FILMS_DIR = studioPath('films');
export const PUBLIC_DIR = studioPath('public');
export const OUT_DIR = studioPath('out');
export const QA_DIR = studioPath('qa');

/** The harness source repo (dev mode) has skills/ + .claude-plugin/ next to studio/. */
export const isHarnessRepo = () => {
	const parent = path.dirname(STUDIO);
	return path.basename(STUDIO) === 'studio' && existsSync(path.join(parent, '.claude-plugin')) && existsSync(path.join(parent, 'skills'));
};

/** The repo the studio was installed into: nearest ancestor with .git, else the studio's parent. */
export const repoRoot = (): string => {
	let dir = path.dirname(STUDIO);
	for (;;) {
		if (existsSync(path.join(dir, '.git'))) return dir;
		const up = path.dirname(dir);
		if (up === dir) return path.dirname(STUDIO);
		dir = up;
	}
};

export const cacheDir = (...p: string[]) => {
	const base =
		process.env.LAUNCHFILM_CACHE ??
		(process.platform === 'win32'
			? path.join(process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local'), 'launchfilm')
			: path.join(process.env.XDG_CACHE_HOME ?? path.join(os.homedir(), '.cache'), 'launchfilm'));
	return path.join(base, ...p);
};

export const ensureDir = (dir: string) => {
	mkdirSync(dir, {recursive: true});
	return dir;
};

export const filmDir = (slug: string) => path.join(FILMS_DIR, slug);
export const filmPublicDir = (slug: string) => path.join(PUBLIC_DIR, 'films', slug);
export const filmOutDir = (slug: string) => path.join(OUT_DIR, slug);
export const filmQaDir = (slug: string) => path.join(QA_DIR, slug);

export const rel = (p: string) => {
	const r = path.relative(process.cwd(), p);
	return r && !r.startsWith('..') ? r : p;
};

export const isFile = (p: string) => {
	try {
		return statSync(p).isFile();
	} catch {
		return false;
	}
};

export const readJson = <T = any>(p: string): T => JSON.parse(readFileSync(p, 'utf8'));
export const readJsonIf = <T = any>(p: string): T | null => (existsSync(p) ? readJson<T>(p) : null);

/** POSIX-style relative path (for staticFile() and manifests). */
export const posix = (p: string) => p.split(path.sep).join('/');

export const harnessVersion = (): string => {
	for (const p of [path.join(path.dirname(STUDIO), 'VERSION'), studioPath('VERSION')]) {
		if (isFile(p) && isHarnessRepo()) return readFileSync(p, 'utf8').trim();
	}
	return readJson(studioPath('package.json')).version ?? '0.0.0';
};
