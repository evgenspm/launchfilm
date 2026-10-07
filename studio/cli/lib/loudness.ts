// Two-pass EBU R128 normalization (loudnorm, linear mode). If the gain needed to reach the target would push the
// true peak past the ceiling, a look-ahead limiter runs first (in JS: Remotion's ffmpeg has no alimiter), set
// 1 dB lower to leave room for AAC overshoot, then the audio is re-measured and normalized linearly.
import {rmSync} from 'node:fs';
import path from 'node:path';
import {limit} from './dsp.js';
import {decodeAudio, ffmpeg, hasAudioStream, measureLoudness, tmpDir, type Loudness} from './ffmpeg.js';
import {writeWav} from './wav.js';

export interface Target {
	I: number;
	TP: number;
	LRA: number;
}

export interface NormResult {
	note: string;
	before: Loudness | null;
	after: Loudness | null;
}

export interface NormOpts {
	/** copy the video stream from the input (mp4 → mp4) */
	video?: boolean;
	codec: 'aac' | 'pcm_s16le' | 'pcm_s24le';
	bitrate?: string;
	sampleRate: number;
	channels?: number;
	log?: string;
	/** re-measure the output (one more decode pass) */
	verify?: boolean;
}

const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(2) : v > 0 ? '99' : '-99');

export const normalizeLoudness = async (input: string, output: string, t: Target, o: NormOpts): Promise<NormResult> => {
	const src = path.resolve(input);
	const dst = path.resolve(output);
	const audioEncode = [
		'-c:a',
		o.codec,
		...(o.bitrate && o.codec === 'aac' ? ['-b:a', o.bitrate] : []),
		'-ar',
		String(o.sampleRate),
		...(o.channels ? ['-ac', String(o.channels)] : []),
	];
	const videoCopy = o.video ? ['-map', '0:v:0', '-c:v', 'copy'] : ['-vn'];
	const container = o.video ? ['-movflags', '+faststart'] : [];
	if (!(await hasAudioStream(src))) {
		await ffmpeg(['-loglevel', 'error', '-y', '-i', src, ...videoCopy, ...container, dst], {log: o.log}, 'remux');
		return {note: 'no audio', before: null, after: null};
	}
	let m = await measureLoudness(src, t);
	const before = m;
	if (!Number.isFinite(m.I) || m.I < -70) {
		await ffmpeg(['-loglevel', 'error', '-y', '-i', src, ...videoCopy, '-map', '0:a:0', ...audioEncode, ...container, dst], {log: o.log}, 'remux silent');
		return {note: 'silent (left as is)', before, after: null};
	}
	const dir = tmpDir('launchfilm-ln-');
	try {
		let audioSrc = src;
		let note = 'linear';
		// limiting lowers loudness, which raises the gain needed, so iterate (real mixes settle in 1–2 rounds)
		let a = null as Awaited<ReturnType<typeof decodeAudio>> | null;
		const ceilings: string[] = [];
		for (let round = 0; round < 4; round++) {
			const gain = t.I - m.I;
			if (m.TP + gain <= t.TP) break;
			const ceiling = t.TP - gain - 1.0;
			a ??= await decodeAudio(src);
			a = limit(a, ceiling);
			audioSrc = path.join(dir, 'limited.wav');
			writeWav(audioSrc, a, 24);
			m = await measureLoudness(audioSrc, t);
			ceilings.push(ceiling.toFixed(1));
		}
		if (ceilings.length) note = `limiter first (${ceilings.join(' → ')} dBTP)`;
		const af = `loudnorm=I=${t.I}:TP=${t.TP}:LRA=${t.LRA}:measured_I=${fmt(m.I)}:measured_TP=${fmt(m.TP)}:measured_LRA=${fmt(m.LRA)}:measured_thresh=${fmt(m.thresh)}:offset=${fmt(m.offset)}:linear=true,aresample=${o.sampleRate}`;
		const inputs = audioSrc === src ? ['-i', src] : ['-i', src, '-i', audioSrc];
		const audioMap = ['-map', audioSrc === src ? '0:a:0' : '1:a:0'];
		await ffmpeg(['-loglevel', 'error', '-y', ...inputs, ...videoCopy, ...audioMap, '-af', af, ...audioEncode, ...container, dst], {log: o.log}, 'loudnorm pass 2');
		const after = o.verify === false ? null : await measureLoudness(dst, t);
		return {note, before, after};
	} finally {
		rmSync(dir, {recursive: true, force: true});
	}
};
