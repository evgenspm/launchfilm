// doctor: is this studio able to make a film right now? Human output by default, --json for agents.
// Each check: {id, ok, severity, message, fix}. Exit 1 when any error-severity check fails.
// Offline: never calls the network (the update check reads the cached result only).
import {createRequire} from 'node:module';
import {existsSync, readFileSync, statfsSync, statSync} from 'node:fs';
import path from 'node:path';
import {parseArgs} from '../lib/args.js';
import {CONFIG_PATH, loadConfig} from '../lib/config.js';
import {ENV_PATH, hasEnv} from '../lib/env.js';
import {FFMPEG_INSTALL_HINT, FULL_FILTERS, ffBins, ffmpegRaw, systemFfmpeg} from '../lib/ffmpeg.js';
import {say, table} from '../lib/log.js';
import {FILMS_DIR, harnessVersion, isHarnessRepo, PUBLIC_DIR, repoRoot, STUDIO, studioPath} from '../lib/paths.js';
import {browserInstalled, remotion, remotionVersion} from '../lib/remotion.js';
import {blockVersion, linkClaudeSkill, listSkillDirs, skillFileOk} from '../lib/skills.js';
import {readState, writeState} from '../lib/state.js';
import {ALL_ENV, providerInfo} from '../providers/registry.js';
import {kokoroStatus} from '../providers/tts/kokoro.js';
import {whisperStatus} from '../providers/words/whisper.js';

type Severity = 'error' | 'warn' | 'info';
interface Check {
	id: string;
	ok: boolean;
	severity: Severity;
	message: string;
	fix?: string;
	fixed?: boolean;
}

const REQUIRED_FILTERS = ['loudnorm', 'silencedetect', 'atrim', 'atempo', 'aresample', 'scale', 'volume'];

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'fix']});
	const json = Boolean(a.flags.json);
	const fix = Boolean(a.flags.fix);
	const checks: Check[] = [];
	const add = (c: Check) => checks.push(c);
	const req = createRequire(studioPath('package.json'));

	// node
	const major = Number(process.versions.node.split('.')[0]);
	add({id: 'node', ok: major >= 20, severity: 'error', message: `Node ${process.versions.node}`, fix: major >= 20 ? undefined : 'install Node 20 or newer (https://nodejs.org)'});

	// disk
	try {
		const s = statfsSync(STUDIO);
		const freeGb = (s.bavail * s.bsize) / 1024 ** 3;
		add({
			id: 'disk',
			ok: freeGb >= 1.5,
			severity: freeGb < 0.5 ? 'error' : 'warn',
			message: `${freeGb.toFixed(1)} GB free (renders + Chrome need ~1.5 GB)`,
			fix: freeGb >= 1.5 ? undefined : 'free some disk space',
		});
	} catch {
		add({id: 'disk', ok: true, severity: 'info', message: 'free space unknown'});
	}

	// dependencies + Remotion versions aligned
	const pkg = JSON.parse(readFileSync(studioPath('package.json'), 'utf8'));
	const rv = remotionVersion();
	if (!rv || !existsSync(studioPath('node_modules'))) {
		add({id: 'deps', ok: false, severity: 'error', message: 'node_modules missing', fix: 'npm ci   (inside launch-video/)'});
	} else {
		const wanted = Object.entries({...pkg.dependencies, ...pkg.devDependencies}).filter(([n]) => n === 'remotion' || n.startsWith('@remotion/'));
		const mismatched: string[] = [];
		for (const [n, w] of wanted) {
			try {
				const v = req(`${n}/package.json`).version;
				if (v !== rv || v !== w) mismatched.push(`${n}@${v}${v !== w ? ` (package.json ${w})` : ''}`);
			} catch {
				mismatched.push(`${n} (not installed)`);
			}
		}
		add({
			id: 'remotion',
			ok: mismatched.length === 0,
			severity: 'error',
			message: mismatched.length ? `Remotion packages out of line with remotion@${rv}: ${mismatched.join(', ')}` : `remotion ${rv}, ${wanted.length} packages aligned`,
			fix: mismatched.length ? 'npm ci   (all remotion/@remotion packages must share one exact version)' : undefined,
		});
	}

	// Chrome Headless Shell
	let browserOk = browserInstalled();
	let browserFixed = false;
	if (!browserOk && fix && rv) {
		await remotion(['browser', 'ensure'], {inherit: !json});
		browserOk = browserInstalled();
		browserFixed = browserOk;
	}
	add({id: 'browser', ok: browserOk, severity: 'warn', message: browserOk ? 'Chrome Headless Shell installed' : 'Chrome Headless Shell not downloaded yet (first render would fetch ~95 MB)', fix: browserOk ? undefined : 'npx remotion browser ensure', fixed: browserFixed});

	// ffmpeg / ffprobe (Remotion's bundled build by default)
	try {
		const b = ffBins();
		const v = await ffmpegRaw(['-version']);
		const f = await ffmpegRaw(['-filters']);
		const have = new Set(f.stdout.toString('utf8').split('\n').map((l) => l.trim().split(/\s+/)[1]));
		const missing = REQUIRED_FILTERS.filter((x) => !have.has(x));
		const ver = /ffmpeg version (\S+)/.exec(v.stdout.toString('utf8'))?.[1] ?? '?';
		const probeOk = existsSync(b.ffprobe);
		add({
			id: 'ffmpeg',
			ok: v.code === 0 && probeOk && missing.length === 0,
			severity: 'error',
			message: `ffmpeg ${ver} (${b.source})${probeOk ? '' : ', ffprobe missing'}${missing.length ? `, missing filters: ${missing.join(', ')}` : ''}`,
			fix: v.code === 0 && probeOk && !missing.length ? undefined : 'npm ci (restores Remotion\'s ffmpeg), or set "ffmpeg": {"binary": "system"} with a full ffmpeg on PATH',
		});
	} catch (e) {
		add({id: 'ffmpeg', ok: false, severity: 'error', message: `ffmpeg unavailable: ${(e as Error).message}`, fix: 'npm ci'});
	}

	// a full system ffmpeg (QA filters) is optional; used automatically when present
	const sysFf = systemFfmpeg();
	if (sysFf?.full) add({id: 'ffmpeg-full', ok: true, severity: 'info', message: `system ffmpeg ${sysFf.version} (${sysFf.ffmpeg}) has the full QA filter set${ffBins().source === 'system' ? ': in use' : ' (not in use: ffmpeg.binary / LAUNCHFILM_FFMPEG picks another)'}`});
	else
		add({
			id: 'ffmpeg-full',
			ok: false,
			severity: 'warn',
			message: sysFf
				? `system ffmpeg ${sysFf.version} lacks ${FULL_FILTERS.filter((f) => !sysFf.filters.has(f)).join(', ')}; QA checks that need them are NOT CHECKED`
				: `no system ffmpeg: Remotion's minimal ffmpeg is used; QA black/freeze/loudness-range/safe-zone checks are NOT CHECKED (renders, audio and sheets still work)`,
			fix: FFMPEG_INSTALL_HINT,
		});

	// config + .env
	add({id: 'config', ok: existsSync(CONFIG_PATH), severity: 'warn', message: existsSync(CONFIG_PATH) ? 'harness.config.json present' : 'harness.config.json missing (defaults in use)', fix: existsSync(CONFIG_PATH) ? undefined : 'npx launchfilm init'});
	const cfg = loadConfig();
	if (existsSync(ENV_PATH)) {
		const mode = statSync(ENV_PATH).mode & 0o777;
		const tooOpen = process.platform !== 'win32' && (mode & 0o077) !== 0;
		add({id: 'env-file', ok: !tooOpen, severity: 'warn', message: `.env present${tooOpen ? ` (mode ${mode.toString(8)}, readable by others)` : ''}`, fix: tooOpen ? 'chmod 600 .env' : undefined});
	} else {
		add({id: 'env-file', ok: true, severity: 'info', message: 'no .env (fine: the free defaults need no keys)', fix: 'npx launchfilm init   (creates an empty .env, 0600)'});
	}

	// providers: set/unset only
	const envState = Object.fromEntries(ALL_ENV.map((n) => [n, hasEnv(n) ? 'set' : 'unset']));
	const ttsDefault = cfg.providers.tts.default;
	const ttsInfo = providerInfo('tts', ttsDefault);
	const ttsMissing = (ttsInfo?.env ?? []).filter((n) => !hasEnv(n));
	add({
		id: 'providers',
		ok: ttsMissing.length === 0,
		severity: 'warn',
		message: `voice: ${ttsDefault}${ttsMissing.length ? ` (needs ${ttsMissing.join(', ')})` : ''}; keys: ${Object.entries(envState)
			.filter(([, s]) => s === 'set')
			.map(([n]) => n)
			.join(', ') || 'none set (free defaults only)'}`,
		fix: ttsMissing.length ? `add ${ttsMissing.join(', ')} to launch-video/.env yourself, or set providers.tts.default to "kokoro"` : undefined,
	});

	// free voice + timings
	const k = kokoroStatus();
	add({id: 'kokoro', ok: k.runtime, severity: ttsDefault === 'kokoro' ? 'warn' : 'info', message: k.message, fix: k.runtime ? (k.model ? undefined : 'downloads on first `launchfilm vo` (~130 MB)') : 'npm install (sherpa-onnx-node is an optional dependency; it may not support this platform)'});
	const w = whisperStatus(cfg);
	add({id: 'whisper', ok: w.ok, severity: 'info', message: w.message, fix: w.fix});

	// skills in the repo
	const repo = repoRoot();
	if (isHarnessRepo()) {
		const src = listSkillDirs(path.join(repo, 'skills'));
		add({id: 'skills', ok: src.includes('launch-film'), severity: 'warn', message: `harness repo (dev mode): skills/ has ${src.length} skill(s)${src.length ? `: ${src.join(', ')}` : ''}`, fix: src.includes('launch-film') ? undefined : 'skills/launch-film/SKILL.md is missing'});
	} else {
		const agents = listSkillDirs(path.join(repo, '.agents', 'skills'));
		const broken: string[] = [];
		const repaired: string[] = [];
		for (const n of agents) {
			if (!skillFileOk(path.join(repo, '.claude', 'skills', n, 'SKILL.md'))) {
				if (fix) {
					linkClaudeSkill(repo, n);
					repaired.push(n);
				} else broken.push(n);
			}
		}
		const ok = agents.includes('launch-film') && broken.length === 0;
		add({
			id: 'skills',
			ok,
			severity: 'error',
			message: agents.length
				? `.agents/skills: ${agents.join(', ')}${broken.length ? `; .claude/skills broken for: ${broken.join(', ')}` : ''}${repaired.length ? `; repaired .claude/skills: ${repaired.join(', ')}` : ''}`
				: `no skills in ${path.join(repo, '.agents', 'skills')}`,
			fix: ok ? undefined : agents.length ? 'npx launchfilm doctor --fix' : 'node <harness>/studio/scripts/install.mjs --target <repo>  (see INSTALL.md)',
			fixed: repaired.length > 0,
		});
		// managed block
		const files = ['AGENTS.md', 'CLAUDE.md'].map((f) => path.join(repo, f)).filter((f) => existsSync(f));
		const versions = files.map((f) => [path.basename(f), blockVersion(readFileSync(f, 'utf8'))] as const);
		const stale = versions.filter(([, v]) => v !== harnessVersion());
		add({
			id: 'agents-md',
			ok: versions.length > 0 && stale.length === 0,
			severity: 'warn',
			message: versions.length ? versions.map(([f, v]) => `${f}: ${v ? `block v${v}` : 'no launchfilm block'}`).join('; ') : 'no AGENTS.md',
			fix: versions.length && !stale.length ? undefined : 're-run the installer (it rewrites only the marked block)',
		});
	}

	// Remotion license answer
	const st = readState();
	add({
		id: 'remotion-license',
		ok: Boolean(st.remotionLicenseAck),
		severity: 'warn',
		message: st.remotionLicenseAck ? `Remotion license acknowledged: ${st.remotionLicenseAck.answer}` : 'Remotion license not acknowledged yet (free for individuals and teams of up to 3; companies need a Company License: https://www.remotion.pro/license)',
		fix: st.remotionLicenseAck ? undefined : 'ask the user once, then: npx launchfilm license ack individual|small-team|company-licensed|evaluating',
	});

	// media libraries
	const sfxManifest = path.join(PUBLIC_DIR, 'sfx', 'sfx.json');
	let sfxMsg = 'public/sfx/sfx.json missing';
	let sfxOk = false;
	if (existsSync(sfxManifest)) {
		const m = JSON.parse(readFileSync(sfxManifest, 'utf8'));
		const items = (m.sounds ?? m) as {file: string; source?: string}[];
		const present = items.filter((s) => existsSync(path.join(PUBLIC_DIR, 'sfx', s.file)));
		const kenney = items.filter((s) => s.source === 'kenney');
		sfxOk = present.length > 0;
		sfxMsg = `${present.length}/${items.length} sounds present${kenney.length ? `` : ' (Kenney packs not fetched)'}`;
	}
	add({id: 'sfx', ok: sfxOk, severity: 'warn', message: sfxMsg, fix: sfxOk ? undefined : 'npx launchfilm sfx gen all --library && node scripts/fetch-kenney.mjs'});
	const musicManifest = path.join(PUBLIC_DIR, 'music', 'music.json');
	if (existsSync(musicManifest)) {
		const m = JSON.parse(readFileSync(musicManifest, 'utf8'));
		const tracks = (m.tracks ?? []) as {file: string}[];
		const present = tracks.filter((t) => existsSync(path.join(PUBLIC_DIR, 'music', t.file)));
		add({id: 'music', ok: present.length > 0, severity: 'info', message: `${present.length}/${tracks.length} library beds present`, fix: present.length === tracks.length ? undefined : 'node scripts/fetch-music.mjs'});
	} else add({id: 'music', ok: false, severity: 'info', message: 'public/music/music.json missing', fix: 'reinstall the studio'});

	// sample film
	const sample = path.join(FILMS_DIR, '_sample');
	add({id: 'sample', ok: existsSync(sample), severity: 'warn', message: existsSync(sample) ? 'films/_sample present' : 'films/_sample missing', fix: existsSync(sample) ? undefined : 'reinstall the studio'});

	// update (cached only)
	if (st.update?.latest) {
		const newer = st.update.latest.replace(/^v/, '') !== harnessVersion();
		add({id: 'update', ok: !newer, severity: 'info', message: newer ? `update available: ${st.update.latest} (you have ${harnessVersion()})` : `up to date as of ${st.update.lastCheck}`, fix: newer ? 'npx launchfilm update' : undefined});
	}

	const ok = checks.every((c) => c.ok || c.severity !== 'error');
	writeState({version: harnessVersion(), doctor: {ok, at: new Date().toISOString(), failed: checks.filter((c) => !c.ok && c.severity === 'error').map((c) => c.id)}});

	if (json) {
		console.log(JSON.stringify({ok, version: harnessVersion(), studio: STUDIO, platform: `${process.platform}-${process.arch}`, checks, env: envState}, null, 2));
	} else {
		say(`launchfilm doctor ${harnessVersion()}  (${STUDIO})`);
		say(
			table(
				checks.map((c) => [c.ok ? 'ok' : c.severity === 'error' ? 'FAIL' : c.severity === 'warn' ? 'warn' : 'info', c.id, c.message + (c.fixed ? '  [fixed]' : '')]),
			),
		);
		const fixes = checks.filter((c) => !c.ok && c.fix);
		if (fixes.length) {
			say('\nfixes:');
			for (const c of fixes) say(`  ${c.id}: ${c.fix}`);
		}
		say(`\n${ok ? 'ok' : 'not ok'}: ${checks.filter((c) => c.ok).length}/${checks.length} checks pass`);
	}
	return ok ? 0 : 1;
};
