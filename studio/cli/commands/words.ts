// words <audio>: word timings + subtitle phrases → words.json. With --script, the script's spelling wins and
// the heard timings are snapped onto it (LCS). Engines: whisper (local, default), elevenlabs, deepgram.
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {parseArgs, str} from '../lib/args.js';
import {loadConfig, type Config} from '../lib/config.js';
import {duration} from '../lib/ffmpeg.js';
import {die, say, warn} from '../lib/log.js';
import {rel} from '../lib/paths.js';
import {buildWordsJson, cleanScript, type WordsJson} from '../lib/words.js';
import type {WordTiming} from '../providers/types.js';
import {deepgram, elevenlabsAlign} from '../providers/words/paid.js';
import {whisper} from '../providers/words/whisper.js';

export const wordsEngine = (id: string) => {
	if (id === 'whisper' || id === 'auto' || id === 'native') return whisper;
	if (id === 'elevenlabs') return elevenlabsAlign;
	if (id === 'deepgram') return deepgram;
	return die(`unknown words engine ${JSON.stringify(id)}`, 'whisper | elevenlabs | deepgram');
};

/** Timings for one audio file. Native timings (from the TTS) skip transcription entirely. */
export const makeWords = async (o: {audio: string; script: string | null; native?: WordTiming[]; engine?: string; cfg: Config}): Promise<WordsJson> => {
	const dur = await duration(o.audio);
	if (o.native?.length) return buildWordsJson({heard: null, native: o.native, script: o.script, duration: dur, engine: 'native'});
	const engineId = o.engine ?? o.cfg.providers.words.default;
	const eng = wordsEngine(engineId);
	const heard = await eng.transcribe({audio: o.audio, script: o.script ? cleanScript(o.script) : null, cfg: o.cfg});
	const j = buildWordsJson({heard, script: o.script, duration: dur, engine: eng.id});
	if (j.match !== null && j.match < 0.9) warn(`script↔heard match ${(j.match * 100).toFixed(0)}%: the voice may have skipped or changed words; re-run that line`);
	return j;
};

export const printPhrases = (j: WordsJson) => {
	for (const p of j.phrases) say(`  ${p.s.toFixed(2).padStart(6)}–${p.e.toFixed(2).padStart(6)}  ${p.text}${p.emph.length ? `   [emph: ${p.emph.join(', ')}]` : ''}`);
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const file = a._[0];
	if (!file) die('usage: launchfilm words <audio> [--script "text"|file.txt] [--engine whisper|elevenlabs|deepgram] [--out words.json]');
	if (!existsSync(file)) die(`not found: ${file}`);
	const cfg = loadConfig();
	let script = str(a.flags, 'script') ?? null;
	if (script && existsSync(script)) script = readFileSync(script, 'utf8').trim();
	const j = await makeWords({audio: file, script, engine: str(a.flags, 'engine'), cfg});
	const out = str(a.flags, 'out') ?? file.replace(/\.[^.]+$/, '') + '.words.json';
	writeFileSync(out, JSON.stringify(j, null, 1) + '\n');
	if (a.flags.json) {
		console.log(JSON.stringify(j));
		return 0;
	}
	say(`words ${rel(path.resolve(out))}: ${j.words.length} words, ${j.phrases.length} phrases, ${(j.words.length / Math.max(0.1, j.duration)).toFixed(2)} words/s, engine ${j.engine}${j.match !== null ? `, match ${(j.match * 100).toFixed(0)}%` : ''}`);
	printPhrases(j);
	return 0;
};
