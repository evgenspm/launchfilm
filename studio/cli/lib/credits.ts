// Credits for a film: every third-party asset that needs (or deserves) a line, plus AI-voice disclosure.
// Written to out/<slug>/credits.txt by render and package; post copies the lines into the description.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import type {Film} from './film.js';
import {ensureDir, filmOutDir, PUBLIC_DIR} from './paths.js';
import {readSfxManifest} from './sfxlib.js';

export interface CreditLines {
	required: string[];
	optional: string[];
	disclosures: string[];
}

export const filmCredits = (film: Film): CreditLines => {
	const required: string[] = [];
	const optional: string[] = [];
	const disclosures: string[] = [];
	const music = film.spec.music?.src ? path.join(PUBLIC_DIR, path.dirname(film.spec.music.src), 'music.credits.json') : null;
	if (music && existsSync(music)) {
		const m = JSON.parse(readFileSync(music, 'utf8'));
		if (m.license === 'CC-BY-4.0' && m.attribution) required.push(`Music: ${m.attribution}`);
		else if (m.attribution) optional.push(`Music: ${m.attribution}`);
		else if (m.provider && m.provider !== 'library') disclosures.push(`Music generated with ${m.provider}${m.model ? ` (${m.model})` : ''}.`);
	}
	const sounds = new Set<string>();
	for (const s of film.spec.sfx ?? []) if (s.sound) sounds.add(s.sound);
	for (const shot of (film.spec.shots ?? []) as {sfx?: {sound?: string}[]}[]) for (const s of shot.sfx ?? []) if (s.sound) sounds.add(s.sound);
	const lib = readSfxManifest().sounds;
	const kenney = [...sounds].filter((s) => lib.find((x) => x.sound === s)?.source === 'kenney');
	if (kenney.length) optional.push('Sound effects: Kenney (www.kenney.nl), CC0.');
	for (const s of sounds) {
		const e = lib.find((x) => x.sound === s);
		if (e?.attribution && e.license !== 'CC0-1.0') required.push(`Sound "${e.id}": ${e.attribution}`);
		else if (e && !['launchfilm-procedural', 'kenney'].includes(e.source)) disclosures.push(`Sound "${e.id}" generated with ${e.source}.`);
	}
	const voiceProviders = new Set<string>();
	for (const l of film.spec.vo ?? []) {
		const wf = l.words ? path.join(PUBLIC_DIR, l.words) : null;
		if (wf && existsSync(wf)) {
			const v = JSON.parse(readFileSync(wf, 'utf8')).voice;
			if (v?.provider) voiceProviders.add(`${v.provider}${v.model ? ` ${v.model}` : ''}${v.voice ? ` (${v.voice})` : ''}`);
		}
	}
	if (voiceProviders.size) disclosures.push(`Voice-over is AI-generated: ${[...voiceProviders].join(', ')}.`);
	return {required, optional, disclosures};
};

export const writeCreditsFile = (film: Film) => {
	const c = filmCredits(film);
	const file = path.join(ensureDir(filmOutDir(film.slug)), 'credits.txt');
	const lines = [
		`Credits for ${film.spec.title ?? film.slug}`,
		'',
		...(c.required.length ? ['Required (put these in the video description / post):', ...c.required.map((x) => `- ${x}`), ''] : ['No attribution is required for the assets in this film.', '']),
		...(c.optional.length ? ['Optional:', ...c.optional.map((x) => `- ${x}`), ''] : []),
		...(c.disclosures.length ? ['Disclosures:', ...c.disclosures.map((x) => `- ${x}`), ''] : []),
	];
	writeFileSync(file, lines.join('\n'));
	return {file, ...c};
};
