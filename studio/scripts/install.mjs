#!/usr/bin/env node
// launchfilm installer (used by INSTALL.md / UPDATE.md). Plain Node ≥ 20, no dependencies, runs before npm ci.
//
//   node <harness>/studio/scripts/install.mjs --target <repo> [--studio-dir launch-video]
//        [--skip-npm] [--skip-media] [--skip-render] [--no-skills] [--update] [--json]
//
// What it does (every step checks first, so a re-run changes nothing that is already right):
//  1. copies the studio template into <repo>/<studio-dir>/ (no node_modules, out/, qa/, .harness/, .env, fetched media;
//     never touches the user's films/ except films/_sample, never overwrites harness.config.json or .env)
//  2. copies craft/, schemas/, recipes/index.json + CATALOG.md and API.md next to it, so skills find them at the same paths
//  3. installs skills: <repo>/.agents/skills/<n> as real files, <repo>/.claude/skills/<n> as a relative symlink
//     (a junction on Windows, a copy as the last resort)
//  4. writes the ≤15-line managed block into AGENTS.md (created if missing) and CLAUDE.md / GEMINI.md if they exist
//  5. creates .env (0600) from .env.example, empty: keys are optional and the user adds them themselves
//  6. npm ci (skipped when the lockfile is unchanged), fetches the CC0/CC BY media, runs doctor --fix,
//     renders films/_sample at half scale and checks it with ffprobe
// No sudo, no network beyond npm, GitHub (models/releases), kenney.nl, incompetech.com and opengameart.org.
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {chmodSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {blockVersion, linkClaudeSkill, listSkillDirs, managedBlock, upsertBlock} from './install-lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const json = flag('json');
const log = (...m) => {
	if (!json) console.log(...m);
};

const major = Number(process.versions.node.split('.')[0]);
if (major < 20) {
	console.error(`launchfilm install: Node ${process.versions.node} is too old; install Node 20+ (https://nodejs.org) and re-run.`);
	process.exit(1);
}

const SOURCE = path.resolve(opt('source', path.join(here, '..', '..')));
const STUDIO_SRC = path.join(SOURCE, 'studio');
const TARGET = path.resolve(opt('target', process.cwd()));
const STUDIO_DIR = opt('studio-dir', 'launch-video');
const DEST = path.join(TARGET, STUDIO_DIR);
const isWin = process.platform === 'win32';
const report = {ok: false, version: null, target: TARGET, studio: DEST, steps: []};
const step = (id, status, detail = '') => {
	report.steps.push({id, status, detail});
	log(`${status.padEnd(8)} ${id}${detail ? `: ${detail}` : ''}`);
};
const fail = (msg) => {
	report.error = msg;
	if (json) console.log(JSON.stringify(report, null, 1));
	else console.error(`launchfilm install: ${msg}`);
	process.exit(1);
};

if (!existsSync(path.join(STUDIO_SRC, 'package.json'))) fail(`${STUDIO_SRC} is not a launchfilm studio (run this script from a launchfilm checkout)`);
if (!existsSync(TARGET) || !statSync(TARGET).isDirectory()) fail(`target ${TARGET} does not exist`);
if (path.resolve(TARGET) === path.resolve(SOURCE)) fail('target is the harness repo itself; install into your product repo (or an empty folder)');
const version = existsSync(path.join(SOURCE, 'VERSION')) ? readFileSync(path.join(SOURCE, 'VERSION'), 'utf8').trim() : JSON.parse(readFileSync(path.join(STUDIO_SRC, 'package.json'), 'utf8')).version;
report.version = version;
log(`launchfilm ${version} → ${DEST}`);

// ---------------------------------------------------------------- 1. studio template
const EXCLUDE_TOP = new Set(['node_modules', 'out', 'qa', '.harness', '.env', 'NOTES-deps.md']);
const isFetchedMedia = (rel) =>
	/^public[\\/]films([\\/]|$)/.test(rel) ||
	/^public[\\/]sfx[\\/](kenney|custom|user)([\\/]|$)/.test(rel) ||
	(/^public[\\/]music[\\/]/.test(rel) && !/music\.json$|\.gitignore$/.test(rel));
const userOwned = (rel) => rel === 'harness.config.json' || /^films[\\/](?!_sample([\\/]|$))/.test(rel);
const before = existsSync(DEST);
mkdirSync(DEST, {recursive: true});
let copied = 0;
cpSync(STUDIO_SRC, DEST, {
	recursive: true,
	force: true,
	filter: (src) => {
		const rel = path.relative(STUDIO_SRC, src);
		if (!rel) return true;
		const top = rel.split(/[\\/]/)[0];
		if (EXCLUDE_TOP.has(top) || /(^|[\\/])\.DS_Store$/.test(rel) || /\.log$/.test(rel)) return false;
		if (isFetchedMedia(rel)) return false;
		if (/^films[\\/]/.test(rel) && !/^films[\\/]_sample([\\/]|$)/.test(rel)) return false; // the harness repo's own test/example films
		const dest = path.join(DEST, rel);
		if (userOwned(rel) && existsSync(dest)) return false;
		if (statSync(src).isFile()) copied++;
		return true;
	},
});
// the SFX manifest: ours, plus whatever the user added (Kenney imports, paid generations) that still exists on disk
const sfxManifest = path.join(DEST, 'public', 'sfx', 'sfx.json');
const prevSfx = path.join(DEST, '.harness', 'sfx.prev.json');
if (existsSync(prevSfx)) {
	try {
		const ours = JSON.parse(readFileSync(sfxManifest, 'utf8'));
		const old = JSON.parse(readFileSync(prevSfx, 'utf8'));
		const ids = new Set(ours.sounds.map((s) => s.id));
		for (const s of old.sounds ?? []) if (!ids.has(s.id) && s.source !== 'launchfilm-procedural' && existsSync(path.join(DEST, 'public', 'sfx', s.file))) ours.sounds.push(s);
		writeFileSync(sfxManifest, JSON.stringify(ours, null, 1) + '\n');
	} catch {
		// keep ours
	}
}
// keep a copy of the merged manifest for the next update
mkdirSync(path.join(DEST, '.harness'), {recursive: true});
if (existsSync(sfxManifest)) writeFileSync(prevSfx, readFileSync(sfxManifest));
step('studio', before ? 'updated' : 'created', `${copied} files → ${path.relative(TARGET, DEST) || DEST} (films/, harness.config.json and .env untouched)`);

// ---------------------------------------------------------------- 2. craft, schemas, catalog, API.md
const extras = [
	['craft', 'craft'],
	['schemas', 'schemas'],
	[path.join('recipes', 'index.json'), path.join('recipes', 'index.json')],
	[path.join('recipes', 'CATALOG.md'), path.join('recipes', 'CATALOG.md')],
	[path.join('studio', 'API.md'), 'API.md'],
	['VERSION', 'VERSION'],
	['LICENSE', 'LICENSE'],
	['.env.example', '.env.example'],
];
const got = [];
for (const [from, to] of extras) {
	const src = path.join(SOURCE, from);
	if (!existsSync(src)) continue;
	mkdirSync(path.dirname(path.join(DEST, to)), {recursive: true});
	cpSync(src, path.join(DEST, to), {recursive: true, force: true});
	got.push(to);
}
// $schema paths: the harness repo keeps schemas/ one level above studio/; here they sit inside the studio
const fixSchema = (file, from, to) => {
	if (!existsSync(file)) return;
	const t = readFileSync(file, 'utf8');
	const n = t.split(from).join(to);
	if (n !== t) writeFileSync(file, n);
};
fixSchema(path.join(DEST, 'harness.config.json'), '"../schemas/', '"./schemas/');
// catalog links: the harness repo has recipes/ next to studio/; here recipes/ and src/recipes/ both sit in the studio
fixSchema(path.join(DEST, 'recipes', 'CATALOG.md'), '](../studio/src/recipes/', '](../src/recipes/');
const filmsDir = path.join(DEST, 'films');
if (existsSync(filmsDir)) for (const f of readdirSync(filmsDir)) for (const j of ['film.json', 'brand.json']) fixSchema(path.join(filmsDir, f, j), '"../../../schemas/', '"../../schemas/');
step('docs', 'ok', got.join(', ') || 'none found');

// ---------------------------------------------------------------- 3. skills
const skillsSrc = path.join(SOURCE, 'skills');
const skills = listSkillDirs(skillsSrc);
const modes = {};
if (flag('no-skills')) step('skills', 'skipped', '--no-skills');
else if (!skills.length) step('skills', 'warn', `no skills found in ${skillsSrc}`);
else {
	for (const n of skills) {
		const dest = path.join(TARGET, '.agents', 'skills', n);
		rmSync(dest, {recursive: true, force: true});
		mkdirSync(path.dirname(dest), {recursive: true});
		cpSync(path.join(skillsSrc, n), dest, {recursive: true});
		modes[n] = linkClaudeSkill(TARGET, n);
	}
	const kinds = [...new Set(Object.values(modes))];
	step('skills', 'ok', `${skills.length} skills in .agents/skills (.claude/skills: ${kinds.join(', ')})`);
}

// ---------------------------------------------------------------- 4. managed block
const block = managedBlock(version, STUDIO_DIR);
const blockFiles = [];
for (const f of ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md']) {
	const p = path.join(TARGET, f);
	if (f !== 'AGENTS.md' && !existsSync(p)) continue;
	const text = existsSync(p) ? readFileSync(p, 'utf8') : '';
	const {text: next, changed} = upsertBlock(text, block);
	if (changed) writeFileSync(p, next);
	blockFiles.push(`${f}${changed ? (blockVersion(text) ? ' (updated)' : ' (added)') : ' (already current)'}`);
}
step('agents-md', 'ok', blockFiles.join(', '));

// ---------------------------------------------------------------- 5. .env + state + .gitignore
const envFile = path.join(DEST, '.env');
if (!existsSync(envFile)) {
	const ex = path.join(DEST, '.env.example');
	writeFileSync(envFile, existsSync(ex) ? readFileSync(ex) : '# launchfilm keys (optional)\n', {mode: 0o600});
	step('env', 'created', '.env (0600, all keys empty; the free defaults need none)');
} else step('env', 'kept', '.env (not read, not changed)');
if (!isWin) chmodSync(envFile, 0o600);
const gi = path.join(DEST, '.gitignore');
if (!existsSync(gi)) writeFileSync(gi, ['node_modules/', 'out/', 'qa/', '.harness/', '.env', '.env.*', '!.env.example', '*.log', ''].join('\n'));
const statePath = path.join(DEST, '.harness', 'state.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};
Object.assign(state, {version, installedAt: state.installedAt ?? new Date().toISOString(), updatedAt: new Date().toISOString(), installer: {skills, linkModes: modes, source: 'install.mjs'}});
writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');

// ---------------------------------------------------------------- 6. npm ci, media, doctor, sample render
const run = (cmd, argv, opts = {}) => spawnSync(cmd, argv, {cwd: DEST, encoding: 'utf8', shell: isWin && /npm|npx/.test(cmd), stdio: json || opts.capture ? 'pipe' : 'inherit', env: {...process.env, ...(opts.env ?? {})}, maxBuffer: 64 * 1024 * 1024});
const lockHash = existsSync(path.join(DEST, 'package-lock.json')) ? createHash('sha1').update(readFileSync(path.join(DEST, 'package-lock.json'))).digest('hex') : null;
if (flag('skip-npm')) step('npm', 'skipped', '--skip-npm');
else if (existsSync(path.join(DEST, 'node_modules', 'remotion')) && state.lockHash === lockHash) step('npm', 'ok', 'node_modules already matches package-lock.json');
else {
	const r = run(isWin ? 'npm.cmd' : 'npm', ['ci', '--no-audit', '--no-fund', '--prefer-offline']);
	if (r.status !== 0) fail(`npm ci failed in ${DEST}${r.stderr ? `:\n${String(r.stderr).split('\n').slice(-12).join('\n')}` : ''}`);
	state.lockHash = lockHash;
	writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
	step('npm', 'ok', 'npm ci');
}
const cli = path.join(DEST, 'cli', 'launchfilm.mjs');
const haveDeps = existsSync(path.join(DEST, 'node_modules', 'remotion'));
if (flag('skip-media') || !haveDeps) step('media', 'skipped', flag('skip-media') ? '--skip-media' : 'no node_modules');
else {
	const k = run(process.execPath, [path.join('scripts', 'fetch-kenney.mjs')], {capture: true});
	const m = run(process.execPath, [path.join('scripts', 'fetch-music.mjs')], {capture: true});
	step('media', k.status === 0 && m.status === 0 ? 'ok' : 'warn', `Kenney CC0 SFX ${k.status === 0 ? 'fetched' : 'failed (offline? re-run: node scripts/fetch-kenney.mjs)'}; music library ${m.status === 0 ? 'fetched' : 'failed (re-run: node scripts/fetch-music.mjs)'}`);
}
let doctor = null;
if (!haveDeps) step('doctor', 'skipped', 'no node_modules');
else {
	const r = run(process.execPath, [cli, 'doctor', '--json', '--fix'], {capture: true});
	try {
		doctor = JSON.parse(r.stdout);
	} catch {
		doctor = null;
	}
	const failed = doctor?.checks?.filter((c) => !c.ok && c.severity === 'error').map((c) => `${c.id}: ${c.message}`) ?? ['doctor did not run'];
	step('doctor', doctor?.ok ? 'ok' : 'FAIL', doctor?.ok ? `${doctor.checks.filter((c) => c.ok).length}/${doctor.checks.length} checks pass` : failed.join('; '));
}
let sample = null;
if (flag('skip-render') || !haveDeps) step('sample', 'skipped', flag('skip-render') ? '--skip-render' : 'no node_modules');
else {
	const r = run(process.execPath, [cli, 'render', '_sample', '--presets', 'x-16x9', '--scale', '0.5', '--out', path.join('out', '_sample.mp4'), '--json'], {capture: true, env: {LAUNCHFILM_NO_CREDIT: '1'}});
	const out = path.join(DEST, 'out', '_sample.mp4');
	if (r.status === 0 && existsSync(out)) {
		// render --json carries the ffprobe facts of the written file
		try {
			const res = JSON.parse(r.stdout).results?.[0];
			sample = res ? {duration: res.duration, video: {width: res.width, height: res.height, fps: res.fps}} : null;
		} catch {
			sample = null;
		}
		const good = sample && Math.abs(sample.duration - 3) < 0.2 && sample.video.width === 960 && Math.round(sample.video.fps) === 30;
		step('sample', good ? 'ok' : 'FAIL', sample ? `out/_sample.mp4: ${sample.duration.toFixed(2)} s, ${sample.video.width}×${sample.video.height}, ${Math.round(sample.video.fps)} fps (ffprobe)` : 'rendered but ffprobe facts missing');
	} else step('sample', 'FAIL', `render failed: ${String(r.stderr || r.stdout).split('\n').slice(-8).join(' | ')}`);
}

report.ok = Boolean(doctor?.ok) && report.steps.every((s) => s.status !== 'FAIL');
report.doctor = doctor ? {ok: doctor.ok, failed: doctor.checks.filter((c) => !c.ok).map((c) => ({id: c.id, severity: c.severity, fix: c.fix ?? null}))} : null;
report.sample = sample ? {file: path.join(DEST, 'out', '_sample.mp4'), duration: sample.duration, width: sample.video?.width, height: sample.video?.height} : null;
if (json) console.log(JSON.stringify(report, null, 1));
else {
	log(`\n${report.ok ? 'DONE' : 'NOT DONE'}: launchfilm ${version} in ${DEST}`);
	log('Remotion is free for individuals and teams of up to 3 people; companies of 4+ need a Company License: https://www.remotion.pro/license');
	if (!report.ok) log('Fix the FAIL lines above (npx launchfilm doctor prints exact commands), then re-run this script.');
}
process.exit(report.ok || (flag('skip-npm') && !haveDeps) ? 0 : 1);
