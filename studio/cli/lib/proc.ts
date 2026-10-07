// Child-process helpers. Arguments are passed as arrays (no shell), so paths with spaces are safe.
import {spawn, spawnSync} from 'node:child_process';
import {appendFileSync} from 'node:fs';
import {CliError} from './log.js';
import {redact} from './env.js';

export interface RunOpts {
	cwd?: string;
	env?: NodeJS.ProcessEnv;
	input?: Buffer | string;
	/** append command + output to this log file */
	log?: string;
	/** stream child output to our stdio instead of capturing it */
	inherit?: boolean;
	timeoutMs?: number;
}

export interface RunResult {
	code: number;
	stdout: Buffer;
	stderr: string;
}

export const run = (cmd: string, args: string[], opts: RunOpts = {}): Promise<RunResult> =>
	new Promise((resolve, reject) => {
		if (opts.log) appendFileSync(opts.log, `\n$ ${[cmd, ...args].map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(' ')}\n`);
		const child = spawn(cmd, args, {
			cwd: opts.cwd,
			env: opts.env ? {...process.env, ...opts.env} : process.env,
			stdio: opts.inherit ? ['ignore', 'inherit', 'inherit'] : ['pipe', 'pipe', 'pipe'],
			windowsHide: true,
		});
		const out: Buffer[] = [];
		const err: Buffer[] = [];
		child.stdout?.on('data', (d) => out.push(d));
		child.stderr?.on('data', (d) => {
			err.push(d);
			if (opts.log) appendFileSync(opts.log, d);
		});
		let timer: NodeJS.Timeout | undefined;
		if (opts.timeoutMs) timer = setTimeout(() => child.kill('SIGKILL'), opts.timeoutMs);
		child.on('error', (e) => {
			if (timer) clearTimeout(timer);
			reject(new CliError(`could not start ${cmd}: ${e.message}`));
		});
		child.on('close', (code) => {
			if (timer) clearTimeout(timer);
			resolve({code: code ?? 1, stdout: Buffer.concat(out), stderr: Buffer.concat(err).toString('utf8')});
		});
		if (opts.input !== undefined && child.stdin) child.stdin.end(opts.input);
		else child.stdin?.end();
	});

export const runOk = async (cmd: string, args: string[], opts: RunOpts = {}, what?: string): Promise<RunResult> => {
	const r = await run(cmd, args, opts);
	if (r.code !== 0) {
		const tail = redact(r.stderr).trim().split('\n').slice(-15).join('\n');
		throw new CliError(`${what ?? cmd} failed (exit ${r.code})${tail ? `:\n${tail}` : ''}`, opts.log ? `full log: ${opts.log}` : undefined);
	}
	return r;
};

export const which = (bin: string): string | null => {
	const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [bin], {encoding: 'utf8'});
	return r.status === 0 ? r.stdout.split(/\r?\n/)[0].trim() || null : null;
};
