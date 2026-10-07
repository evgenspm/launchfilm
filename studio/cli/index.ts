// launchfilm: the studio CLI. One verb per pipeline step; every step writes files an agent can read back.
import {CliError, setQuiet} from './lib/log.js';
import {redact} from './lib/env.js';
import {existsSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {FILMS_DIR, harnessVersion, studioPath} from './lib/paths.js';

/**
 * LAUNCHFILM_BATCH=1 (unattended pipelines): never prompt, never show credit, and when a step fails for a film or a
 * recipe, write BLOCKED.md into that folder (what failed, the fix hint) and exit non-zero.
 */
const writeBlocked = (cmd: string, argv: string[], message: string, hint?: string) => {
	if (!/^(1|true|yes)$/i.test(process.env.LAUNCHFILM_BATCH ?? '')) return null;
	const target = argv.find((x) => !x.startsWith('-'));
	if (!target) return null;
	const dirs = [path.join(FILMS_DIR, target), studioPath('src', 'recipes', target)];
	const dir = dirs.find((d) => existsSync(d));
	if (!dir) return null;
	const file = path.join(dir, 'BLOCKED.md');
	writeFileSync(
		file,
		[`# BLOCKED: launchfilm ${cmd}`, '', `- when: ${new Date().toISOString()}`, `- command: \`npx launchfilm ${[cmd, ...argv].join(' ')}\``, '', '## What failed', '', message, '', ...(hint ? ['## Fix', '', hint, ''] : []), 'Delete this file once fixed.', ''].join('\n'),
	);
	return file;
};

type Cmd = (argv: string[]) => Promise<number | void>;

const COMMANDS: Record<string, {load: () => Promise<{run: Cmd}>; usage: string}> = {
	doctor: {load: () => import('./commands/doctor.js'), usage: 'doctor [--json] [--fix]            check node, disk, Remotion, browser, ffmpeg, skills, providers'},
	init: {load: () => import('./commands/init.js'), usage: 'init [--force] [--credit on|off]   create harness.config.json, .env (0600), .harness/state.json'},
	license: {load: () => import('./commands/license.js'), usage: 'license [status|ack <answer>]      record the Remotion license answer (individual|small-team|company-licensed|evaluating)'},
	validate: {load: () => import('./commands/validate.js'), usage: 'validate [slug...] [--json]   film.json + brand.json against schemas/, plus harness.config.json'},
	new: {load: () => import('./commands/new.js'), usage: 'new <slug> [--recipe id] [--preset x-16x9,...] [--title "..."]   scaffold films/<slug>/'},
	vo: {load: () => import('./commands/vo.js'), usage: 'vo <slug> [--line id] [--provider kokoro] [--voice v] [--takes N] [--tempo 1.0]   VO lines from film.json'},
	words: {load: () => import('./commands/words.js'), usage: 'words <audio> [--script "text"|file] [--engine whisper|elevenlabs|deepgram] [--out f.json]'},
	music: {load: () => import('./commands/music.js'), usage: 'music <slug> [--len s] [--bpm n] [--mood m] [--track id] [--provider library|lyria|elevenlabs|stable-audio] [--prompt "..."]'},
	beats: {load: () => import('./commands/beats.js'), usage: 'beats <audio> [--out f.json] [--bpm hint]   BPM, beats, downbeats'},
	sfx: {load: () => import('./commands/sfx.js'), usage: 'sfx list | search <q> | gen <preset|all> [--out f.wav] [--provider p --prompt "..."]'},
	still: {load: () => import('./commands/still.js'), usage: 'still <slug> <t> [--preset x-16x9] [--scale 1]   PNG at time t (2.5, 2.5s, 75f)'},
	sheet: {load: () => import('./commands/sheet.js'), usage: 'sheet <slug|video> [--every s] [--cols n] [--width px]   timestamped contact sheets'},
	render: {load: () => import('./commands/render.js'), usage: 'render <slug> [--presets x-16x9,li-4x5] [--scale 0.5] [--out f.mp4] [--concurrency n]'},
	qa: {load: () => import('./commands/qa.js'), usage: 'qa <slug> [--json]   sheets + ffprobe + loudness + checks → qa/<slug>/report.md'},
	package: {load: () => import('./commands/package.js'), usage: 'package <slug> [--to dir]   finals + poster + SRT + credits into one folder'},
	post: {load: () => import('./commands/post.js'), usage: 'post <slug>   post copy scaffold (X, LinkedIn, Product Hunt) + credit lines'},
	ref: {load: () => import('./commands/ref.js'), usage: 'ref add <video|url> [...] | ref search <query>   reference study'},
	gen: {load: () => import('./commands/gen.js'), usage: 'gen image|video "<prompt>" --out file [--provider p]   optional paid generators'},
	update: {load: () => import('./commands/update.js'), usage: 'update [--check] [--apply] [--force]   check GitHub releases (≤ once a day)'},
	credit: {load: () => import('./commands/credit.js'), usage: 'credit [status|off|on|lines] [--product "Name"]'},
};

const help = () =>
	[
		`launchfilm ${harnessVersion()}: launch-film studio CLI (Remotion)`,
		'',
		...Object.values(COMMANDS).map((c) => `  launchfilm ${c.usage}`),
		'',
		'Keys live only in launch-video/.env or the environment; nothing here prints them.',
		'No telemetry. Opt out of the one-time credit note: LAUNCHFILM_NO_CREDIT=1, DO_NOT_TRACK=1, or "credit": false.',
	].join('\n');

export const main = async (argv: string[]): Promise<number> => {
	const [name, ...rest] = argv;
	if (!name || name === 'help' || name === '--help' || name === '-h') {
		console.log(help());
		return 0;
	}
	if (name === '--version' || name === '-v' || name === 'version') {
		console.log(harnessVersion());
		return 0;
	}
	const c = COMMANDS[name];
	if (!c) {
		console.error(`launchfilm: unknown command ${JSON.stringify(name)}\n\n${help()}`);
		return 2;
	}
	if (rest.includes('--help') || rest.includes('-h')) {
		console.log(`usage: launchfilm ${c.usage}`);
		return 0;
	}
	setQuiet(rest.includes('--json'));
	try {
		const mod = await c.load();
		const code = await mod.run(rest);
		return typeof code === 'number' ? code : 0;
	} catch (e) {
		if (e instanceof CliError) {
			const blocked = writeBlocked(name, rest, redact(e.message), e.hint);
			if (rest.includes('--json')) console.log(JSON.stringify({ok: false, error: redact(e.message), hint: e.hint ?? null, blocked}));
			else console.error(`launchfilm ${name}: ${redact(e.message)}${e.hint ? `\n  → ${e.hint}` : ''}${blocked ? `\n  (wrote ${blocked})` : ''}`);
			return e.exitCode;
		}
		const msg = e instanceof Error ? (e.stack ?? e.message) : String(e);
		writeBlocked(name, rest, `unexpected error: ${redact(msg).split('\n')[0]}`);
		console.error(`launchfilm ${name}: unexpected error\n${redact(msg)}`);
		return 1;
	}
};
