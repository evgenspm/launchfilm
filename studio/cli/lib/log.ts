// Output helpers. Human text goes to stdout, warnings to stderr. Commands that support --json
// print exactly one JSON document on stdout and nothing else there.

export class CliError extends Error {
	constructor(
		message: string,
		public hint?: string,
		public exitCode = 1,
	) {
		super(message);
	}
}

export const die = (message: string, hint?: string): never => {
	throw new CliError(message, hint);
};

let quiet = false;
export const setQuiet = (q: boolean) => {
	quiet = q;
};

export const say = (...parts: unknown[]) => {
	if (!quiet) console.log(...parts);
};

export const warn = (message: string) => {
	console.error(`launchfilm: warning: ${message}`);
};

export const note = (message: string) => {
	if (!quiet) console.error(message);
};

export const fmtS = (s: number | null | undefined, digits = 2) => (s == null || !Number.isFinite(s) ? '?' : `${s.toFixed(digits)} s`);
export const fmtDb = (v: number | null | undefined, unit = 'dB') => (v == null || !Number.isFinite(v) ? `-inf ${unit}` : `${v.toFixed(1)} ${unit}`);
export const fmtBytes = (n: number) => (n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : n >= 1024 ? `${(n / 1024).toFixed(0)} KB` : `${n} B`);

export const table = (rows: string[][]) => {
	const w = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] ?? '').length)));
	return rows.map((r) => r.map((c, i) => (c ?? '').padEnd(w[i])).join('  ').trimEnd()).join('\n');
};
