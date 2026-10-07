// Child process for Kokoro synthesis via sherpa-onnx-node. Runs separately so the native addon gets its
// library path (DYLD_LIBRARY_PATH / LD_LIBRARY_PATH) and a native crash can't take the CLI down.
// argv[2] = JSON {studio, modelDir, text, sid, speed, threads, out}
import {createRequire} from 'node:module';
import path from 'node:path';

const job = JSON.parse(process.argv[2]);
const require = createRequire(path.join(job.studio, 'package.json'));
const sherpa = require('sherpa-onnx-node');
const d = job.modelDir;
const fs = require('node:fs');
const lexicons = ['lexicon-us-en.txt', 'lexicon-zh.txt'].map((f) => path.join(d, f)).filter((f) => fs.existsSync(f));

const tts = new sherpa.OfflineTts({
	model: {
		kokoro: {
			model: job.modelFile ?? path.join(d, 'model.onnx'),
			voices: path.join(d, 'voices.bin'),
			tokens: path.join(d, 'tokens.txt'),
			dataDir: path.join(d, 'espeak-ng-data'),
			...(fs.existsSync(path.join(d, 'dict')) ? {dictDir: path.join(d, 'dict')} : {}),
			...(lexicons.length ? {lexicon: lexicons.join(',')} : {}),
		},
		numThreads: job.threads ?? 2,
		debug: false,
		provider: 'cpu',
	},
	maxNumSentences: 1,
});

const audio = tts.generate({text: job.text, sid: job.sid, speed: job.speed ?? 1.0});
sherpa.writeWave(job.out, {samples: audio.samples, sampleRate: audio.sampleRate});
process.stdout.write(JSON.stringify({ok: true, sampleRate: audio.sampleRate, samples: audio.samples.length, numSpeakers: tts.numSpeakers}));
