// Kokoro-82M v1.0 (Apache-2.0 weights) through sherpa-onnx-node (Apache-2.0; note: its native library
// includes eSpeak-NG, GPL-3.0, installed from npm and never vendored here). Free default voice.
// The model (~130 MB int8) is downloaded on first use into the shared cache (~/.cache/launchfilm/models).
import {createRequire} from 'node:module';
import {existsSync, mkdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadConfig, type Config} from '../../lib/config.js';
import {download} from '../../lib/http.js';
import {die, note} from '../../lib/log.js';
import {cacheDir, STUDIO, studioPath} from '../../lib/paths.js';
import {runOk} from '../../lib/proc.js';
import type {TtsProvider} from '../types.js';

/** Speaker ids of kokoro-multi-lang-v1_0 (voices.bin order). */
export const KOKORO_VOICES = [
	'af_alloy', 'af_aoede', 'af_bella', 'af_heart', 'af_jessica', 'af_kore', 'af_nicole', 'af_nova', 'af_river', 'af_sarah', 'af_sky',
	'am_adam', 'am_echo', 'am_eric', 'am_fenrir', 'am_liam', 'am_michael', 'am_onyx', 'am_puck', 'am_santa',
	'bf_alice', 'bf_emma', 'bf_isabella', 'bf_lily', 'bm_daniel', 'bm_fable', 'bm_george', 'bm_lewis',
	'ef_dora', 'em_alex', 'ff_siwis', 'hf_alpha', 'hf_beta', 'hm_omega', 'hm_psi', 'if_sara', 'im_nicola',
	'jf_alpha', 'jf_gongitsune', 'jf_nezumi', 'jf_tebukuro', 'jm_kumo', 'pf_dora', 'pm_alex', 'pm_santa',
	'zf_xiaobei', 'zf_xiaoni', 'zf_xiaoxiao', 'zf_xiaoyi', 'zm_yunjian', 'zm_yunxi', 'zm_yunxia', 'zm_yunyang',
	'em_santa', // added at id 53 in the regenerated v1.0 table (ids 0-52 unchanged)
];

/** model.onnx (fp32 bundle) or model.int8.onnx (int8 bundle) */
export const kokoroModelFile = (dir: string) => ['model.onnx', 'model.int8.onnx'].map((f) => path.join(dir, f)).find((f) => existsSync(f)) ?? null;

const req = createRequire(studioPath('package.json'));

const runtimeDir = (): string | null => {
	const plat = process.platform === 'win32' ? 'win' : process.platform;
	try {
		return path.dirname(req.resolve(`sherpa-onnx-${plat}-${process.arch}/package.json`));
	} catch {
		return null;
	}
};

export const kokoroModelDir = (cfg: Config = loadConfig()) => cacheDir('models', cfg.providers.tts.kokoro.model);

export const kokoroStatus = () => {
	let runtime = false;
	try {
		req.resolve('sherpa-onnx-node');
		runtime = runtimeDir() !== null;
	} catch {
		runtime = false;
	}
	const model = kokoroModelFile(kokoroModelDir()) !== null;
	return {
		runtime,
		model,
		message: `Kokoro: runtime ${runtime ? 'installed' : 'missing (sherpa-onnx-node)'}, model ${model ? 'downloaded' : 'not downloaded yet'}`,
	};
};

export const ensureKokoroModel = async (cfg: Config) => {
	const dir = kokoroModelDir(cfg);
	if (kokoroModelFile(dir)) return dir;
	const root = cacheDir('models');
	mkdirSync(root, {recursive: true});
	const archive = path.join(root, `${cfg.providers.tts.kokoro.model}.tar.bz2`);
	note(`Kokoro model not found: downloading ${cfg.providers.tts.kokoro.url} (~130 MB, once) → ${root}`);
	await download(cfg.providers.tts.kokoro.url, archive, {what: 'kokoro model'});
	await runOk('tar', ['-xjf', archive, '-C', root], {}, 'extract kokoro model (tar -xjf)');
	rmSync(archive, {force: true});
	if (!kokoroModelFile(dir)) die(`the Kokoro archive did not contain ${cfg.providers.tts.kokoro.model}/model(.int8).onnx`, 'check providers.tts.kokoro.model/url in harness.config.json');
	return dir;
};

const WORKER = path.join(path.dirname(fileURLToPath(import.meta.url)), 'kokoro-worker.mjs');

export const kokoro: TtsProvider = {
	id: 'kokoro',
	deterministic: true,
	nativeTimings: false,
	async synth({text, voice, outBase, cfg}) {
		const k = cfg.providers.tts.kokoro;
		const status = kokoroStatus();
		if (!status.runtime) die('Kokoro needs sherpa-onnx-node, which is not installed for this platform', 'npm install (it is an optional dependency); or pick another providers.tts.default');
		const modelDir = await ensureKokoroModel(cfg);
		const v = voice ?? k.voice;
		const sid = /^\d+$/.test(String(v)) ? Number(v) : KOKORO_VOICES.indexOf(String(v));
		if (sid < 0) die(`unknown Kokoro voice ${JSON.stringify(v)}`, `voices: ${KOKORO_VOICES.join(', ')}`);
		const out = `${outBase}.wav`;
		const libDir = runtimeDir()!;
		const env: Record<string, string> = {};
		if (process.platform === 'darwin') env.DYLD_LIBRARY_PATH = [libDir, process.env.DYLD_LIBRARY_PATH].filter(Boolean).join(':');
		else if (process.platform === 'linux') env.LD_LIBRARY_PATH = [libDir, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':');
		else env.PATH = [libDir, process.env.PATH].filter(Boolean).join(';');
		await runOk(process.execPath, [WORKER, JSON.stringify({studio: STUDIO, modelDir, modelFile: kokoroModelFile(modelDir), text, sid, speed: k.speed, threads: k.threads, out})], {env}, 'kokoro synthesis');
		return {file: out, provider: 'kokoro', model: k.model, voice: String(v)};
	},
};
