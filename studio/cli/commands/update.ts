// update: is a newer launchfilm release out? At most one GitHub API call per day (cached in .harness/state.json);
// shows the CHANGELOG delta; changes nothing unless --apply (then: shallow clone of the release tag + the installer,
// which replaces the studio code, skills and the managed AGENTS.md block, and never touches films/ or .env).
// This is not telemetry: one unauthenticated GET to api.github.com (GITHUB_TOKEN used if set, never printed).
import {existsSync, mkdtempSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {parseArgs} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {getEnv} from '../lib/env.js';
import {die, say, warn} from '../lib/log.js';
import {harnessVersion, isHarnessRepo, repoRoot, STUDIO} from '../lib/paths.js';
import {runOk, which} from '../lib/proc.js';
import {readState, writeState} from '../lib/state.js';

const semver = (v: string) => v.replace(/^v/, '').split(/[.-]/).slice(0, 3).map((x) => Number(x) || 0);
export const newer = (a: string, b: string) => {
	const x = semver(a);
	const y = semver(b);
	for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
	return false;
};

const changelogDelta = (text: string, from: string) => {
	const out: string[] = [];
	let keep = false;
	for (const line of text.split('\n')) {
		const m = /^##\s+\[?v?(\d+\.\d+\.\d+[\w.-]*)\]?/.exec(line);
		if (m) keep = newer(m[1], from);
		if (keep) out.push(line);
	}
	return out.join('\n').trim();
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'check', 'force', 'apply']});
	const cfg = loadConfig();
	const st = readState();
	const current = harnessVersion();
	const repo = cfg.update.repo;
	const fresh = st.update?.lastCheck && Date.now() - Date.parse(st.update.lastCheck) < cfg.update.checkEveryHours * 3600_000;
	let info = st.update ?? {};
	if (!fresh || a.flags.force) {
		const headers: Record<string, string> = {Accept: 'application/vnd.github+json', 'User-Agent': 'launchfilm-update'};
		const tok = getEnv('GITHUB_TOKEN');
		if (tok) headers.Authorization = `Bearer ${tok}`;
		try {
			const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {headers, signal: AbortSignal.timeout(15_000)});
			if (res.status === 404) info = {lastCheck: new Date().toISOString(), current, latest: undefined, error: 'no releases published yet'};
			else if (!res.ok) info = {...info, lastCheck: new Date().toISOString(), error: `GitHub API HTTP ${res.status}`};
			else {
				const r: any = await res.json();
				let notes = r.body ?? '';
				try {
					const cl = await fetch(`https://raw.githubusercontent.com/${repo}/${r.tag_name}/CHANGELOG.md`, {signal: AbortSignal.timeout(15_000)});
					if (cl.ok) notes = changelogDelta(await cl.text(), current) || notes;
				} catch {
					// keep release notes
				}
				info = {lastCheck: new Date().toISOString(), current, latest: r.tag_name, url: r.html_url, notes: notes.slice(0, 6000)};
			}
		} catch (e) {
			info = {...info, lastCheck: new Date().toISOString(), error: `network: ${(e as Error).message}`};
		}
		writeState({update: info});
	}
	const latest = info.latest;
	const available = Boolean(latest && newer(latest, current));
	if (a.flags.json) {
		console.log(JSON.stringify({current, latest: latest ?? null, available, cached: Boolean(fresh && !a.flags.force), url: info.url ?? null, error: info.error ?? null, notes: available ? info.notes : null}, null, 1));
		if (!a.flags.apply) return 0;
	}
	if (!a.flags.json) {
		if (info.error && !latest) say(`launchfilm ${current}: update check: ${info.error}`);
		else if (!available) say(`launchfilm ${current} is up to date${latest ? ` (latest ${latest})` : ''}${fresh && !a.flags.force ? ' [checked within the last day]' : ''}.`);
		else {
			say(`launchfilm ${latest} is available (you have ${current}): ${info.url}`);
			if (info.notes) say(`\n${info.notes}\n`);
			if (!a.flags.apply) say('Nothing was changed. To update: npx launchfilm update --apply   (keeps films/, .env and your config; or follow UPDATE.md)');
		}
	}
	if (!a.flags.apply) return 0;
	if (!available) return 0;
	if (isHarnessRepo()) die('this is the harness repo itself: update it with git, not --apply');
	if (!which('git')) die('git is needed to fetch the release', 'install git, or follow UPDATE.md');
	const tmp = mkdtempSync(path.join(os.tmpdir(), 'launchfilm-update-'));
	try {
		await runOk('git', ['clone', '--depth', '1', '--branch', latest!, `https://github.com/${repo}.git`, tmp], {inherit: true}, 'git clone');
		const installer = path.join(tmp, 'studio', 'scripts', 'install.mjs');
		if (!existsSync(installer)) die(`${latest} has no studio/scripts/install.mjs`);
		await runOk(process.execPath, [installer, '--target', repoRoot(), '--studio-dir', path.basename(STUDIO), '--update'], {inherit: true}, 'installer');
		writeState({update: {...info, current: latest}});
		say(`updated to ${latest}. Run: npx launchfilm doctor`);
	} catch (e) {
		warn(`update failed; nothing of yours was removed. ${(e as Error).message}`);
		return 1;
	} finally {
		rmSync(tmp, {recursive: true, force: true});
	}
	return 0;
};
