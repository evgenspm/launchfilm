// ref add|search: reference study, wired to cli/ref (refAdd / refSearch). The mechanical half only: frames, sheets,
// cuts, audio facts and an optional transcript for the agent to read; nothing is uploaded anywhere.
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {num, parseArgs, str} from '../lib/args.js';
import {loadConfig} from '../lib/config.js';
import {die, note, say, table} from '../lib/log.js';
import {HARNESS_DIR} from '../lib/paths.js';
import {findWhisperBinary, whisperModelPath} from '../providers/words/whisper.js';

const REF_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'ref');

const loadRef = async (): Promise<any> => {
	if (!existsSync(path.join(REF_DIR, 'index.ts')) && !existsSync(path.join(REF_DIR, 'index.js'))) die('the reference module (cli/ref) is not installed in this studio', 'reinstall the studio from the harness repo');
	const spec = './' + ['..', 'ref', 'index.js'].join('/'); // computed so the CLI typechecks without cli/ref
	return import(spec);
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'force', 'no-preview', 'no-transcript']});
	const [sub, ...rest] = a._;
	if (sub === 'add') {
		const input = rest[0];
		if (!input) die('usage: launchfilm ref add <video|url> [--id x] [--title "..."] [--url u] [--author a] [--out dir] [--force]');
		const ref = await loadRef();
		const cfg = loadConfig();
		const w = cfg.providers.words.whisper;
		const bin = findWhisperBinary(w).path;
		const model = whisperModelPath(w);
		const whisper = a.flags['no-transcript'] ? null : bin && existsSync(model) ? {bin, model} : undefined;
		const r = await ref.refAdd(input, {
			out: str(a.flags, 'out') ?? path.join(HARNESS_DIR, 'refs'),
			id: str(a.flags, 'id'),
			title: str(a.flags, 'title'),
			url: str(a.flags, 'url'),
			author: str(a.flags, 'author'),
			force: Boolean(a.flags.force),
			noPreview: Boolean(a.flags['no-preview']),
			sheetFps: num(a.flags, 'sheet-fps'),
			whisper,
			log: a.flags.json ? () => {} : (m: string) => note(`  ${m}`),
		});
		if (a.flags.json) console.log(JSON.stringify({refId: r.refId, dir: r.dir, meta: r.meta, counts: r.counts, line: r.line}, null, 1));
		else say(`ref ${r.line}`);
		return 0;
	}
	if (sub === 'search') {
		const q = rest.join(' ');
		if (!q) die('usage: launchfilm ref search <words> [family:x aspect:16:9 tech:blur-in ...] [--limit n]');
		const ref = await loadRef();
		const hits = await ref.refSearch(q, {limit: num(a.flags, 'limit', 10), refsDir: path.join(HARNESS_DIR, 'refs')});
		if (a.flags.json) console.log(JSON.stringify(hits, null, 1));
		else if (!hits.length) say('no matches');
		else say(table([['kind', 'id', 'score', 'family', 'aspect', 'title'], ...hits.map((h: any) => [h.kind, h.id, String(Math.round(h.score * 10) / 10), h.family ?? '', h.aspect ?? '', h.title ?? ''])]));
		return 0;
	}
	return die('usage: launchfilm ref add <video|url> | ref search <query>');
};
