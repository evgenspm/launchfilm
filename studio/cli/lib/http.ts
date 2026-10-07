// fetch wrappers with timeouts and readable errors. Request headers (keys) are never logged; response
// bodies of errors are shortened and passed through redact().
import {createWriteStream, renameSync, rmSync} from 'node:fs';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {CliError} from './log.js';
import {redact} from './env.js';

export const httpError = async (what: string, res: Response) => {
	let body = '';
	try {
		body = (await res.text()).slice(0, 600);
	} catch {
		body = '';
	}
	const hint =
		res.status === 401 || res.status === 403
			? 'the key was rejected: check the value in launch-video/.env (do not paste it into chat)'
			: res.status === 404
				? 'the model id or endpoint may have been retired: update the model in harness.config.json → providers'
				: res.status === 429
					? 'rate limit or spending cap reached: wait, or raise the limit with the provider'
					: undefined;
	return new CliError(`${what}: HTTP ${res.status} ${res.statusText}${body ? `\n${redact(body)}` : ''}`, hint);
};

export const fetchOk = async (what: string, url: string, init: RequestInit & {timeoutMs?: number} = {}) => {
	const ctl = new AbortController();
	const timer = setTimeout(() => ctl.abort(), init.timeoutMs ?? 300_000);
	let res: Response;
	try {
		res = await fetch(url, {...init, signal: ctl.signal});
	} catch (e) {
		clearTimeout(timer);
		throw new CliError(`${what}: network error (${(e as Error).message})`);
	}
	clearTimeout(timer);
	if (!res.ok) throw await httpError(what, res);
	return res;
};

export const fetchJson = async <T = any>(what: string, url: string, init: RequestInit & {timeoutMs?: number} = {}): Promise<T> => (await fetchOk(what, url, init)).json() as Promise<T>;

/** Stream a download to disk (atomic rename), with a progress line on stderr for big files. */
export const download = async (url: string, dest: string, o: {what?: string; quiet?: boolean; headers?: Record<string, string>} = {}) => {
	const res = await fetchOk(o.what ?? `download ${url}`, url, {headers: o.headers, timeoutMs: 3_600_000});
	if (!res.body) throw new CliError(`download ${url}: empty body`);
	const total = Number(res.headers.get('content-length') ?? 0);
	let got = 0;
	let lastPct = -1;
	const tmp = `${dest}.part`;
	const src = Readable.fromWeb(res.body as any);
	src.on('data', (chunk: Buffer) => {
		got += chunk.length;
		if (!o.quiet && total > 5_000_000) {
			const pct = Math.floor((got / total) * 100);
			if (pct !== lastPct && pct % 10 === 0) {
				lastPct = pct;
				process.stderr.write(`  ${o.what ?? 'download'}: ${pct}% of ${(total / 1e6).toFixed(0)} MB\n`);
			}
		}
	});
	try {
		await pipeline(src, createWriteStream(tmp));
		renameSync(tmp, dest);
	} catch (e) {
		rmSync(tmp, {force: true});
		throw e;
	}
	return {bytes: got};
};
