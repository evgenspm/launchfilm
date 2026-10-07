// Beat tracking in plain TS (MIT, ours): spectral-flux onset envelope → tempo by autocorrelation with a
// log-normal tempo prior → dynamic-programming beat tracker (Ellis 2007) → downbeat phase from low-band energy.
// No essentia.js (AGPL) or aubio (GPL). Good enough for a beat grid to cut on; for hard material use
// --bpm to steer the tempo prior.
import {decodeAudio} from './ffmpeg.js';
import {mono} from './wav.js';

const SR = 22050;
const N = 1024;
const HOP = 256;

const fft = (re: Float64Array, im: Float64Array) => {
	const n = re.length;
	for (let i = 1, j = 0; i < n; i++) {
		let bit = n >> 1;
		for (; j & bit; bit >>= 1) j ^= bit;
		j ^= bit;
		if (i < j) {
			[re[i], re[j]] = [re[j], re[i]];
			[im[i], im[j]] = [im[j], im[i]];
		}
	}
	for (let len = 2; len <= n; len <<= 1) {
		const ang = (-2 * Math.PI) / len;
		const wr = Math.cos(ang);
		const wi = Math.sin(ang);
		for (let i = 0; i < n; i += len) {
			let cr = 1;
			let ci = 0;
			for (let k = 0; k < len / 2; k++) {
				const ar = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci;
				const ai = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr;
				re[i + k + len / 2] = re[i + k] - ar;
				im[i + k + len / 2] = im[i + k] - ai;
				re[i + k] += ar;
				im[i + k] += ai;
				const t = cr * wr - ci * wi;
				ci = cr * wi + ci * wr;
				cr = t;
			}
		}
	}
};

/** Onset strength (full band) and low-band energy per hop. */
const onsetEnvelope = (x: Float32Array) => {
	const frames = Math.max(0, Math.floor((x.length - N) / HOP) + 1);
	const win = new Float64Array(N).map((_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N));
	const bins = N / 2;
	const lowBin = Math.round((150 * N) / SR);
	let prev = new Float64Array(bins);
	const flux = new Float64Array(frames);
	const low = new Float64Array(frames);
	const re = new Float64Array(N);
	const im = new Float64Array(N);
	for (let f = 0; f < frames; f++) {
		const o = f * HOP;
		for (let i = 0; i < N; i++) {
			re[i] = x[o + i] * win[i];
			im[i] = 0;
		}
		fft(re, im);
		const cur = new Float64Array(bins);
		let s = 0;
		let l = 0;
		for (let k = 1; k < bins; k++) {
			const mag = Math.log1p(1000 * Math.hypot(re[k], im[k]));
			cur[k] = mag;
			const d = mag - prev[k];
			if (d > 0) s += d;
			if (k <= lowBin) l += Math.hypot(re[k], im[k]);
		}
		flux[f] = s;
		low[f] = l;
		prev = cur;
	}
	// remove the slow trend (moving average over ~0.4 s), half-wave rectify, normalize
	const W = Math.round((0.4 * SR) / HOP);
	const env = new Float64Array(frames);
	let acc = 0;
	for (let i = 0; i < frames; i++) {
		acc += flux[i];
		if (i >= W) acc -= flux[i - W];
		env[i] = Math.max(0, flux[i] - acc / Math.min(i + 1, W));
	}
	const max = env.reduce((m, v) => Math.max(m, v), 0) || 1;
	for (let i = 0; i < frames; i++) env[i] /= max;
	return {env, low};
};

const fps = SR / HOP;

const estimateTempo = (env: Float64Array, hintBpm?: number) => {
	const minLag = Math.floor((60 / 220) * fps);
	const maxLag = Math.ceil((60 / 50) * fps);
	const ac = new Float64Array(maxLag + 2);
	for (let lag = minLag; lag <= maxLag + 1; lag++) {
		let s = 0;
		for (let i = lag; i < env.length; i++) s += env[i] * env[i - lag];
		ac[lag] = s / (env.length - lag);
	}
	const center = hintBpm ?? 120;
	const sigma = hintBpm ? 0.35 : 1.0; // octaves
	let best = minLag;
	let bestScore = -Infinity;
	for (let lag = minLag; lag <= maxLag; lag++) {
		const bpm = (60 * fps) / lag;
		const prior = Math.exp(-0.5 * Math.pow(Math.log2(bpm / center) / sigma, 2));
		// harmonic support: a real tempo also correlates at 2× its lag
		const score = (ac[lag] + 0.5 * (ac[2 * lag] ?? 0)) * prior;
		if (score > bestScore) {
			bestScore = score;
			best = lag;
		}
	}
	// launch music sits at ~70–160 BPM: a raw pick above 160 is almost always double time (busy hi-hats)
	if (!hintBpm && (60 * fps) / best > 160 && 2 * best <= maxLag + 1) best = 2 * best;
	// parabolic refinement
	const y0 = ac[best - 1] ?? ac[best];
	const y1 = ac[best];
	const y2 = ac[best + 1] ?? ac[best];
	const den = y0 - 2 * y1 + y2;
	const shift = den !== 0 ? (0.5 * (y0 - y2)) / den : 0;
	const period = best + Math.max(-0.5, Math.min(0.5, shift));
	const zero = ac.slice(minLag, maxLag + 1).reduce((m, v) => m + v, 0) / (maxLag - minLag + 1);
	return {period, bpm: (60 * fps) / period, confidence: Math.max(0, Math.min(1, (y1 - zero) / (y1 || 1)))};
};

const trackBeats = (env: Float64Array, period: number, tightness = 100) => {
	const n = env.length;
	const score = new Float64Array(n);
	const back = new Int32Array(n).fill(-1);
	const lo = Math.round(period / 2);
	const hi = Math.round(period * 2);
	for (let t = 0; t < n; t++) {
		let bestV = 0;
		let bestI = -1;
		for (let tau = t - hi; tau <= t - lo; tau++) {
			if (tau < 0) continue;
			const v = score[tau] - tightness * Math.pow(Math.log((t - tau) / period), 2);
			if (bestI < 0 || v > bestV) {
				bestV = v;
				bestI = tau;
			}
		}
		score[t] = env[t] + (bestI >= 0 ? bestV : 0);
		back[t] = bestI;
	}
	// start the backtrack at the best-scoring frame within the last period
	let t = n - 1;
	let bestEnd = -Infinity;
	for (let i = Math.max(0, n - Math.round(period)); i < n; i++) {
		if (score[i] > bestEnd) {
			bestEnd = score[i];
			t = i;
		}
	}
	const beats: number[] = [];
	while (t >= 0) {
		beats.push(t);
		t = back[t];
	}
	return beats.reverse();
};

export interface BeatsResult {
	bpm: number;
	duration: number;
	beats: number[];
	downbeats: number[];
	onsets: number[];
	meter: number;
	confidence: number;
	engine: string;
}

export const analyzeBeats = async (file: string, o: {bpm?: number; meter?: number} = {}): Promise<BeatsResult> => {
	const a = await decodeAudio(file, {sampleRate: SR, channels: 1});
	const x = mono(a);
	const duration = x.length / SR;
	const {env, low} = onsetEnvelope(x);
	const meter = o.meter ?? 4;
	if (env.length < fps * 2) return {bpm: 0, duration, beats: [], downbeats: [], onsets: [], meter, confidence: 0, engine: 'launchfilm-flux-dp'};
	const tempo = estimateTempo(env, o.bpm);
	const frames = trackBeats(env, tempo.period);
	// drop leading beats in silence
	const firstSound = env.findIndex((v) => v > 0.05);
	const beatFrames = frames.filter((f) => f >= firstSound - tempo.period * 0.25);
	// sub-frame refinement: nearest envelope peak within ±2 frames, parabolic interpolation, + half-window offset
	const center = N / 2 / SR;
	const refine = (f: number) => {
		let m = f;
		for (let i = Math.max(1, f - 2); i <= Math.min(env.length - 2, f + 2); i++) if (env[i] > env[m]) m = i;
		const y0 = env[m - 1] ?? 0;
		const y1 = env[m];
		const y2 = env[m + 1] ?? 0;
		const den = y0 - 2 * y1 + y2;
		const d = den < 0 ? Math.max(-0.5, Math.min(0.5, (0.5 * (y0 - y2)) / den)) : 0;
		return (m + d) / fps + center;
	};
	const beats = beatFrames.map((f) => round3(refine(f)));
	// downbeat phase: low-band energy (kick) + onset strength summed per phase
	let phase = 0;
	let bestPhase = -Infinity;
	for (let p = 0; p < meter; p++) {
		let s = 0;
		for (let i = p; i < beatFrames.length; i += meter) s += (low[beatFrames[i]] ?? 0) / (Math.max(...low) || 1) + env[beatFrames[i]];
		if (s > bestPhase) {
			bestPhase = s;
			phase = p;
		}
	}
	const downbeats = beats.filter((_, i) => i % meter === phase);
	// onsets: local maxima of the envelope above 0.3
	const onsets: number[] = [];
	const gap = Math.round(0.05 * fps);
	for (let i = 1; i < env.length - 1; i++) {
		if (env[i] > 0.3 && env[i] >= env[i - 1] && env[i] > env[i + 1] && (!onsets.length || i - Math.round(onsets[onsets.length - 1] * fps) > gap)) onsets.push(round3(i / fps));
	}
	// BPM: least-squares slope of beat time vs beat index (steadier than one autocorrelation lag)
	let bpm = tempo.bpm;
	if (beats.length >= 4) {
		const n = beats.length;
		const mx = (n - 1) / 2;
		const my = beats.reduce((p, v) => p + v, 0) / n;
		let num = 0;
		let den = 0;
		beats.forEach((b, i) => {
			num += (i - mx) * (b - my);
			den += (i - mx) ** 2;
		});
		if (num > 0) bpm = 60 / (num / den);
	}
	return {bpm: Math.round(bpm * 100) / 100, duration: round3(duration), beats, downbeats, onsets, meter, confidence: Math.round(tempo.confidence * 100) / 100, engine: 'launchfilm-flux-dp'};
};

const round3 = (v: number) => Math.round(v * 1000) / 1000;
