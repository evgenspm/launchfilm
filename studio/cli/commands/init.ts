// init: create harness.config.json (defaults), .env (0600, from .env.example; keys stay empty) and .harness/state.json.
// Never interactive: everything is a flag. Idempotent: existing files are kept unless --force.
import {chmodSync, existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs, str} from '../lib/args.js';
import {CONFIG_PATH, DEFAULTS, setConfigKey} from '../lib/config.js';
import {ENV_PATH} from '../lib/env.js';
import {die, say} from '../lib/log.js';
import {ensureDir, harnessVersion, HARNESS_DIR, rel, STUDIO} from '../lib/paths.js';
import {readState, writeState} from '../lib/state.js';
import {PROVIDERS} from '../providers/registry.js';

export const envExampleText = () => {
	const lines = [
		'# launchfilm keys. Copy to .env (chmod 600) and fill only what you use. The free defaults need none.',
		'# Never paste keys into chat; doctor reports set/unset only. Model ids live in harness.config.json → providers.',
		'',
	];
	const seen = new Set<string>();
	for (const p of PROVIDERS) {
		for (const e of p.env) {
			if (seen.has(e)) continue;
			seen.add(e);
			const users = PROVIDERS.filter((q) => q.env.includes(e)).map((q) => `${q.capability}:${q.id}`);
			lines.push(`# ${users.join(', ')}${p.docs ? `  ${p.docs}` : ''}`, `${e}=`, '');
		}
	}
	lines.push('# Opt-outs (no telemetry exists; these only silence the one-time credit note)', '# LAUNCHFILM_NO_CREDIT=1', '# Unattended pipelines: no prompts, no credit, BLOCKED.md on failure', '# LAUNCHFILM_BATCH=1', '');
	return lines.join('\n');
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'force']});
	const done: string[] = [];
	const kept: string[] = [];
	if (!existsSync(CONFIG_PATH) || a.flags.force) {
		writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULTS, null, 2) + '\n');
		done.push(rel(CONFIG_PATH));
	} else kept.push(rel(CONFIG_PATH));
	const credit = str(a.flags, 'credit');
	if (credit) {
		if (!['on', 'off'].includes(credit)) die('--credit takes on|off');
		setConfigKey('credit', credit === 'on');
	}
	const tts = str(a.flags, 'tts');
	if (tts) {
		if (!PROVIDERS.some((p) => p.capability === 'tts' && p.id === tts)) die(`unknown TTS provider ${tts}`);
		setConfigKey('providers.tts.default', tts);
	}
	if (!existsSync(ENV_PATH)) {
		const example = [path.join(STUDIO, '.env.example'), path.join(STUDIO, '..', '.env.example')].find((p) => existsSync(p));
		writeFileSync(ENV_PATH, example ? readFileSync(example, 'utf8') : envExampleText(), {mode: 0o600});
		done.push(`${rel(ENV_PATH)} (0600, empty keys)`);
	} else kept.push(rel(ENV_PATH));
	if (process.platform !== 'win32') chmodSync(ENV_PATH, 0o600);
	ensureDir(HARNESS_DIR);
	const st = readState();
	writeState({version: harnessVersion(), installedAt: st.installedAt ?? new Date().toISOString()});
	if (a.flags.json) console.log(JSON.stringify({ok: true, created: done, kept}));
	else {
		if (done.length) say(`created: ${done.join(', ')}`);
		if (kept.length) say(`kept: ${kept.join(', ')}`);
		say('Keys are optional. To use a paid provider, the user adds its key to .env themselves; nothing is printed or sent.');
	}
	return 0;
};
