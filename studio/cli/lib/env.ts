// Keys come only from the process environment or launch-video/.env. Values are never printed,
// logged, or written anywhere else; status reports say "set" / "unset" only.
import {existsSync, readFileSync} from 'node:fs';
import {studioPath} from './paths.js';
import {die} from './log.js';

export const ENV_PATH = studioPath('.env');

let dot: Record<string, string> | null = null;

const loadDotEnv = (): Record<string, string> => {
	if (dot) return dot;
	dot = {};
	if (!existsSync(ENV_PATH)) return dot;
	for (const line of readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
		const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
		if (!m) continue;
		let v = m[2];
		if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
		else v = v.replace(/\s+#.*$/, '');
		if (v !== '') dot[m[1]] = v;
	}
	return dot;
};

export const getEnv = (name: string): string | undefined => {
	const v = process.env[name];
	if (v !== undefined && v !== '') return v;
	return loadDotEnv()[name];
};

export const hasEnv = (name: string) => getEnv(name) !== undefined;

export const requireEnv = (name: string, what: string): string => {
	const v = getEnv(name);
	if (!v) {
		die(
			`${what} is not configured: ${name} is unset`,
			`add ${name}=... to launch-video/.env yourself (the file is gitignored, mode 0600). Never paste keys into chat.`,
		);
	}
	return v!;
};

/** Any truthy-ish env flag: 1, true, yes. */
export const envFlag = (name: string) => /^(1|true|yes|on)$/i.test(process.env[name] ?? loadDotEnv()[name] ?? '');

/** Redact anything that looks like one of our configured secrets from a string before it is shown. */
export const redact = (s: string): string => {
	let out = s;
	const secrets = [...Object.values(loadDotEnv()), ...SECRET_ENV_NAMES.map((n) => process.env[n]).filter(Boolean)] as string[];
	for (const v of secrets) if (v.length >= 8) out = out.split(v).join('***');
	return out;
};

export const SECRET_ENV_NAMES = [
	'ELEVENLABS_API_KEY',
	'CARTESIA_API_KEY',
	'AZURE_SPEECH_KEY',
	'GEMINI_API_KEY',
	'OPENAI_API_KEY',
	'DEEPGRAM_API_KEY',
	'STABILITY_API_KEY',
	'FREESOUND_API_KEY',
	'FAL_KEY',
	'RUNWAYML_API_SECRET',
	'GITHUB_TOKEN',
];
