// films/<slug>/film.json: the film as data (schemas/film.schema.json, read by studio/src/film). The CLI reads
// it leniently (only the fields it needs) and writes back only the fields it owns (vo[].src/words, music, beats).
import {existsSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {loadConfig, preset as getPreset, type Aspect, type Config, type PlatformPreset} from './config.js';
import {die} from './log.js';
import {FILMS_DIR, filmDir} from './paths.js';

export interface VoLine {
	id: string;
	text: string;
	at?: number;
	src?: string;
	words?: string;
	volume?: number;
	/** optional per-line voice override */
	voice?: string;
	[k: string]: unknown;
}

export interface FilmJson {
	$schema?: string;
	id: string;
	title?: string;
	fps?: number;
	aspects?: Aspect[];
	duration?: number;
	beats?: {bpm?: number; offset?: number; src?: string};
	shots?: unknown[];
	vo?: VoLine[];
	music?: {src: string; [k: string]: unknown} | null;
	sfx?: {at: number; sound?: string; src?: string}[];
	subtitles?: {enabled?: boolean; [k: string]: unknown};
	/** platform presets to render by default; read when present (not in film.schema.json yet), else derived from aspects */
	presets?: string[];
	[k: string]: unknown;
}

export interface Film {
	slug: string;
	dir: string;
	file: string;
	spec: FilmJson;
	/** composition id prefix */
	id: string;
}

export const aspectSlug = (a: string) => a.replace(':', 'x');

export const listFilms = (): string[] => {
	if (!existsSync(FILMS_DIR)) return [];
	return readdirSync(FILMS_DIR, {withFileTypes: true})
		.filter((d) => d.isDirectory() && existsSync(path.join(FILMS_DIR, d.name, 'film.json')))
		.map((d) => d.name)
		.sort();
};

export const loadFilm = (slug: string): Film => {
	const dir = filmDir(slug);
	const file = path.join(dir, 'film.json');
	if (!existsSync(file)) {
		if (!existsSync(dir)) die(`no film ${JSON.stringify(slug)} in films/`, `create it: npx launchfilm new ${slug}`);
		die(`films/${slug}/film.json is missing`);
	}
	let spec: FilmJson;
	try {
		spec = JSON.parse(readFileSync(file, 'utf8'));
	} catch (e) {
		return die(`films/${slug}/film.json is not valid JSON: ${(e as Error).message}`);
	}
	const id = spec.id ?? slug.replace(/[^a-z0-9-]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
	return {slug, dir, file, spec, id};
};

export const saveFilm = (f: Film) => writeFileSync(f.file, JSON.stringify(f.spec, null, 2) + '\n');

/**
 * Which platform presets to render: --presets, else film.json presets, else harness defaultPresets that match the
 * film's aspects, else the first preset for each film aspect.
 */
export const presetsFor = (f: Film, cfg: Config = loadConfig(), requested?: string[]): {id: string; p: PlatformPreset}[] => {
	const aspects = f.spec.aspects ?? ['16:9'];
	const pick = (ids: string[]) => ids.map((id) => ({id, p: getPreset(cfg, id)}));
	if (requested?.length) {
		const out = pick(requested);
		const bad = out.filter((x) => !aspects.includes(x.p.aspect));
		if (bad.length) die(`film ${f.slug} has no ${bad.map((b) => b.p.aspect).join(', ')} composition (needed by ${bad.map((b) => b.id).join(', ')})`, `add the aspect to films/${f.slug}/film.json "aspects" (it has ${aspects.join(', ')})`);
		return out;
	}
	if (f.spec.presets?.length) return pick(f.spec.presets);
	// defaults that match the film's aspects, plus the first preset for any aspect the defaults don't cover
	const ids = cfg.defaultPresets.filter((id) => cfg.presets[id] && aspects.includes(cfg.presets[id].aspect));
	for (const a of aspects) {
		if (ids.some((id) => cfg.presets[id].aspect === a)) continue;
		const hit = Object.keys(cfg.presets).find((id) => cfg.presets[id].aspect === a);
		if (hit) ids.push(hit);
	}
	return pick(ids);
};

export const compositionId = (f: Film, aspect: string) => `${f.id}-${aspectSlug(aspect)}`;

/** Film-time cues for subtitles/SRT: each VO line's phrases shifted by the line's start. */
export const voCues = (f: Film, publicDir: string) => {
	const cues: {s: number; e: number; text: string}[] = [];
	for (const line of f.spec.vo ?? []) {
		const at = Number(line.at ?? 0);
		const wf = line.words ? path.join(publicDir, line.words) : null;
		if (wf && existsSync(wf)) {
			const j = JSON.parse(readFileSync(wf, 'utf8'));
			for (const p of j.phrases ?? []) cues.push({s: at + p.s, e: at + p.e, text: p.text});
		} else if (line.text) {
			const clean = line.text.replace(/[|*]/g, ' ').replace(/\s+/g, ' ').trim();
			cues.push({s: at, e: at + clean.split(' ').length / 2.7, text: clean});
		}
	}
	return cues.sort((a, b) => a.s - b.s);
};
