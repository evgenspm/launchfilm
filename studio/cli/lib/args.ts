// Tiny argv parser: `--key value`, `--key=value`, `--flag` (declared boolean), `--no-flag`, `-j 2`.
import {die} from './log.js';

export type Flags = Record<string, string | boolean | undefined>;
export interface Parsed {
	_: string[];
	flags: Flags;
}

export const parseArgs = (argv: string[], spec: {boolean?: string[]; string?: string[]; alias?: Record<string, string>} = {}): Parsed => {
	const bools = new Set(spec.boolean ?? []);
	const strings = new Set(spec.string ?? []);
	const alias = spec.alias ?? {};
	const out: Parsed = {_: [], flags: {}};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--') {
			out._.push(...argv.slice(i + 1));
			break;
		}
		if (a.startsWith('-') && a.length > 1 && !/^-\d/.test(a)) {
			let key = a.replace(/^--?/, '');
			let value: string | boolean | undefined;
			const eq = key.indexOf('=');
			if (eq >= 0) {
				value = key.slice(eq + 1);
				key = key.slice(0, eq);
			}
			key = alias[key] ?? key;
			if (key.startsWith('no-') && bools.has(key.slice(3))) {
				out.flags[key.slice(3)] = false;
				continue;
			}
			if (value === undefined) {
				if (bools.has(key)) value = true;
				else if (i + 1 < argv.length && (!argv[i + 1].startsWith('-') || /^-\d/.test(argv[i + 1]) || strings.has(key))) value = argv[++i];
				else value = true;
			}
			out.flags[key] = value;
			continue;
		}
		out._.push(a);
	}
	return out;
};

export const str = (flags: Flags, key: string, fallback?: string): string | undefined => {
	const v = flags[key];
	if (v === undefined || v === false) return fallback;
	if (v === true) die(`--${key} needs a value`);
	return String(v);
};

export const num = (flags: Flags, key: string, fallback?: number): number | undefined => {
	const v = str(flags, key);
	if (v === undefined) return fallback;
	const n = Number(v);
	if (!Number.isFinite(n)) die(`--${key} must be a number, got ${JSON.stringify(v)}`);
	return n;
};

export const list = (flags: Flags, key: string): string[] | undefined => {
	const v = str(flags, key);
	return v === undefined ? undefined : v.split(',').map((s) => s.trim()).filter(Boolean);
};

/** Parses "2.5", "2.5s", "75f" (frames) or "1:02.5" into seconds. */
export const parseTime = (t: string, fps = 30): number => {
	const s = t.trim();
	if (/^\d+f$/.test(s)) return Number(s.slice(0, -1)) / fps;
	const m = /^(\d+):(\d+(?:\.\d+)?)$/.exec(s);
	if (m) return Number(m[1]) * 60 + Number(m[2]);
	const n = Number(s.replace(/s$/, ''));
	if (!Number.isFinite(n) || n < 0) die(`bad time ${JSON.stringify(t)} (use 2.5, 2.5s, 75f or 1:02.5)`);
	return n;
};
