// beats <audio>: BPM, beats, downbeats, onsets → JSON ({bpm, duration, beats, downbeats, ...}), the shape
// film.json "beats": {"src": "..."} and studio/src/presets/timing.ts read.
import {existsSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {num, parseArgs, str} from '../lib/args.js';
import {analyzeBeats} from '../lib/beats.js';
import {die, say} from '../lib/log.js';
import {rel} from '../lib/paths.js';

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const file = a._[0];
	if (!file) die('usage: launchfilm beats <audio> [--out beats.json] [--bpm hint] [--meter 4]');
	if (!existsSync(file)) die(`not found: ${file}`);
	const t0 = Date.now();
	const r = await analyzeBeats(file, {bpm: num(a.flags, 'bpm'), meter: num(a.flags, 'meter')});
	const out = str(a.flags, 'out') ?? file.replace(/\.[^.]+$/, '') + '.beats.json';
	writeFileSync(out, JSON.stringify(r, null, 1) + '\n');
	if (a.flags.json) console.log(JSON.stringify(r));
	else {
		say(`beats ${rel(path.resolve(out))}: ${r.bpm} BPM, ${r.beats.length} beats, ${r.downbeats.length} downbeats, ${r.onsets.length} onsets, ${r.duration.toFixed(1)} s, confidence ${r.confidence} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
		say(`  first beats: ${r.beats.slice(0, 8).join(', ')}`);
		say(`  first downbeats: ${r.downbeats.slice(0, 4).join(', ')}`);
	}
	return 0;
};
