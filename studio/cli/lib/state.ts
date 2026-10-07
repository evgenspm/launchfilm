// launch-video/.harness/state.json: local, gitignored machine state (never committed, never sent anywhere).
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {ensureDir, HARNESS_DIR} from './paths.js';

export interface State {
	version?: string;
	installedAt?: string;
	/** "individual" | "small-team" (≤3 people incl. contractors) | "company-licensed" | "evaluating" */
	remotionLicenseAck?: {answer: string; at: string} | null;
	credit?: {shown?: boolean; shownAt?: string};
	update?: {lastCheck?: string; latest?: string; current?: string; url?: string; notes?: string; error?: string};
	doctor?: {ok: boolean; at: string; failed: string[]};
	[k: string]: unknown;
}

export const STATE_PATH = path.join(HARNESS_DIR, 'state.json');

export const readState = (): State => {
	if (!existsSync(STATE_PATH)) return {};
	try {
		return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
	} catch {
		return {};
	}
};

export const writeState = (patch: Partial<State>): State => {
	const next = {...readState(), ...patch};
	ensureDir(HARNESS_DIR);
	writeFileSync(STATE_PATH, JSON.stringify(next, null, 2) + '\n');
	return next;
};
