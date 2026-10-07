// Small offline DSP toolkit: what Remotion's minimal ffmpeg lacks (limiter, fades, crossfades, filters),
// plus BS.1770 loudness and true-peak estimates for quick checks. Float32 in [-1, 1], one array per channel.
import type {Audio} from './wav.js';

export const dbToLin = (db: number) => Math.pow(10, db / 20);
export const linToDb = (v: number) => (v > 0 ? 20 * Math.log10(v) : -Infinity);

/** Deterministic PRNG (mulberry32). */
export const rng = (seed: number) => {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

export const samplePeak = (a: Audio) => {
	let p = 0;
	for (const ch of a.channels) for (let i = 0; i < ch.length; i++) p = Math.max(p, Math.abs(ch[i]));
	return p;
};

// 4x oversampling interpolator (windowed sinc, 8 taps each side) for true-peak estimates.
const TAPS = 8;
const PHASES = [0.25, 0.5, 0.75].map((ph) => {
	const k: number[] = [];
	for (let j = -TAPS + 1; j <= TAPS; j++) {
		const x = j - ph;
		const sinc = x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);
		const w = 0.5 + 0.5 * Math.cos((Math.PI * x) / (TAPS + 0.5));
		k.push(sinc * w);
	}
	return k;
});

/** Max of |sample| and its 3 interpolated neighbours: per-sample true-peak magnitude. */
const tpAt = (ch: Float32Array, i: number) => {
	let m = Math.abs(ch[i]);
	for (const k of PHASES) {
		let s = 0;
		for (let j = 0; j < k.length; j++) {
			const idx = i + j - TAPS + 1;
			if (idx >= 0 && idx < ch.length) s += ch[idx] * k[j];
		}
		m = Math.max(m, Math.abs(s));
	}
	return m;
};

export const truePeak = (a: Audio) => {
	let p = 0;
	for (const ch of a.channels) for (let i = 0; i < ch.length; i++) p = Math.max(p, tpAt(ch, i));
	return p;
};

export const applyGain = (a: Audio, db: number): Audio => {
	const g = dbToLin(db);
	return {sampleRate: a.sampleRate, channels: a.channels.map((ch) => ch.map((v) => v * g))};
};

export const normalizePeak = (a: Audio, peakDb: number): Audio => {
	const p = samplePeak(a);
	return p > 0 ? applyGain(a, peakDb - linToDb(p)) : a;
};

/**
 * Look-ahead brickwall limiter on true-peak estimates, channels linked.
 * The gain ramps down over `lookaheadMs` before a peak and recovers with `releaseMs`.
 */
export const limit = (a: Audio, ceilingDb: number, lookaheadMs = 5, releaseMs = 60): Audio => {
	const n = a.channels[0]?.length ?? 0;
	const ceil = dbToLin(ceilingDb);
	const req = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		let m = 0;
		for (const ch of a.channels) m = Math.max(m, tpAt(ch, i));
		req[i] = m > ceil ? ceil / m : 1;
	}
	const L = Math.max(1, Math.round((lookaheadMs / 1000) * a.sampleRate));
	// sliding minimum over [i, i+L]
	const fwdMin = new Float32Array(n);
	const dq: number[] = [];
	let head = 0;
	for (let i = n - 1; i >= 0; i--) {
		while (dq.length > head && req[dq[dq.length - 1]] >= req[i]) dq.pop();
		dq.push(i);
		while (dq[head] > i + L) head++;
		fwdMin[i] = req[dq[head]];
	}
	// moving average over the past L values → smooth attack that reaches the required gain at the peak
	const gain = new Float32Array(n);
	let acc = 0;
	for (let i = 0; i < n; i++) {
		acc += fwdMin[i];
		if (i >= L) acc -= fwdMin[i - L];
		gain[i] = Math.min(fwdMin[i], acc / Math.min(i + 1, L));
	}
	const rc = Math.exp(-1 / ((releaseMs / 1000) * a.sampleRate));
	let env = 1;
	for (let i = 0; i < n; i++) {
		env = gain[i] < env ? gain[i] : env * rc + gain[i] * (1 - rc);
		gain[i] = env;
	}
	return {
		sampleRate: a.sampleRate,
		channels: a.channels.map((ch) => ch.map((v, i) => Math.max(-ceil, Math.min(ceil, v * gain[i])))),
	};
};

export type Curve = 'lin' | 'qsin' | 'exp';
const curveAt = (x: number, c: Curve) => (c === 'qsin' ? Math.sin((x * Math.PI) / 2) : c === 'exp' ? x * x : x);

export const fade = (a: Audio, o: {inS?: number; outS?: number; curve?: Curve}): Audio => {
	const sr = a.sampleRate;
	const n = a.channels[0]?.length ?? 0;
	const fi = Math.min(n, Math.round((o.inS ?? 0) * sr));
	const fo = Math.min(n, Math.round((o.outS ?? 0) * sr));
	const c = o.curve ?? 'qsin';
	return {
		sampleRate: sr,
		channels: a.channels.map((ch) => {
			const out = ch.slice();
			for (let i = 0; i < fi; i++) out[i] *= curveAt(i / fi, c);
			for (let i = 0; i < fo; i++) out[n - 1 - i] *= curveAt(i / fo, c);
			return out;
		}),
	};
};

export const slice = (a: Audio, startS: number, endS?: number): Audio => {
	const s = Math.max(0, Math.round(startS * a.sampleRate));
	const e = endS === undefined ? undefined : Math.round(endS * a.sampleRate);
	return {sampleRate: a.sampleRate, channels: a.channels.map((ch) => ch.slice(s, e))};
};

/** Concatenate b after a with an equal-power crossfade of `xS` seconds. */
export const crossfadeConcat = (a: Audio, b: Audio, xS: number): Audio => {
	const sr = a.sampleRate;
	const x = Math.min(Math.round(xS * sr), a.channels[0].length, b.channels[0].length);
	return {
		sampleRate: sr,
		channels: a.channels.map((ca, c) => {
			const cb = b.channels[c] ?? b.channels[0];
			const out = new Float32Array(ca.length + cb.length - x);
			out.set(ca.subarray(0, ca.length - x), 0);
			for (let i = 0; i < x; i++) {
				const t = (i + 0.5) / x;
				out[ca.length - x + i] = ca[ca.length - x + i] * Math.cos((t * Math.PI) / 2) + cb[i] * Math.sin((t * Math.PI) / 2);
			}
			out.set(cb.subarray(x), ca.length);
			return out;
		}),
	};
};

export const toChannels = (a: Audio, n: number): Audio => {
	if (a.channels.length === n) return a;
	if (n === 1) {
		const m = new Float32Array(a.channels[0].length);
		for (const ch of a.channels) for (let i = 0; i < m.length; i++) m[i] += ch[i] / a.channels.length;
		return {sampleRate: a.sampleRate, channels: [m]};
	}
	return {sampleRate: a.sampleRate, channels: Array.from({length: n}, (_, i) => a.channels[Math.min(i, a.channels.length - 1)].slice())};
};

// RBJ cookbook biquad, processed in place on a copy.
export type BiquadType = 'lowpass' | 'highpass' | 'bandpass' | 'peak' | 'highshelf' | 'lowshelf';
export const biquadCoefs = (type: BiquadType, fs: number, f0: number, q = Math.SQRT1_2, gainDb = 0) => {
	const w = (2 * Math.PI * Math.min(f0, fs * 0.49)) / fs;
	const cos = Math.cos(w);
	const alpha = Math.sin(w) / (2 * q);
	const A = Math.pow(10, gainDb / 40);
	let b0 = 0, b1 = 0, b2 = 0, a0 = 1, a1 = 0, a2 = 0;
	switch (type) {
		case 'lowpass':
			b0 = (1 - cos) / 2; b1 = 1 - cos; b2 = (1 - cos) / 2; a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha;
			break;
		case 'highpass':
			b0 = (1 + cos) / 2; b1 = -(1 + cos); b2 = (1 + cos) / 2; a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha;
			break;
		case 'bandpass':
			b0 = alpha; b1 = 0; b2 = -alpha; a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha;
			break;
		case 'peak':
			b0 = 1 + alpha * A; b1 = -2 * cos; b2 = 1 - alpha * A; a0 = 1 + alpha / A; a1 = -2 * cos; a2 = 1 - alpha / A;
			break;
		case 'lowshelf':
		case 'highshelf': {
			const s = type === 'lowshelf' ? 1 : -1;
			const sq = 2 * Math.sqrt(A) * alpha;
			b0 = A * (A + 1 - s * (A - 1) * cos + sq);
			b1 = s * 2 * A * (A - 1 - s * (A + 1) * cos);
			b2 = A * (A + 1 - s * (A - 1) * cos - sq);
			a0 = A + 1 + s * (A - 1) * cos + sq;
			a1 = -s * 2 * (A - 1 + s * (A + 1) * cos);
			a2 = A + 1 + s * (A - 1) * cos - sq;
			break;
		}
	}
	return {b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: a1 / a0, a2: a2 / a0};
};

export const biquad = (x: Float32Array, c: ReturnType<typeof biquadCoefs>): Float32Array => {
	const y = new Float32Array(x.length);
	let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
	for (let i = 0; i < x.length; i++) {
		const v = c.b0 * x[i] + c.b1 * x1 + c.b2 * x2 - c.a1 * y1 - c.a2 * y2;
		x2 = x1; x1 = x[i]; y2 = y1; y1 = v;
		y[i] = v;
	}
	return y;
};

/** Integrated loudness (ITU-R BS.1770-4 / EBU R128 gating), LUFS. Null for clips shorter than one 400 ms block. */
export const integratedLoudness = (a: Audio): number | null => {
	const fs = a.sampleRate;
	// K-weighting, coefficients for any sample rate (same derivation as libebur128)
	let K = Math.tan((Math.PI * 1681.974450955533) / fs);
	const Vh = Math.pow(10, 3.999843853973347 / 20);
	const Vb = Math.pow(Vh, 0.4996667741545416);
	let Q = 0.7071752369554196;
	let a0 = 1 + K / Q + K * K;
	const shelf = {b0: (Vh + (Vb * K) / Q + K * K) / a0, b1: (2 * (K * K - Vh)) / a0, b2: (Vh - (Vb * K) / Q + K * K) / a0, a1: (2 * (K * K - 1)) / a0, a2: (1 - K / Q + K * K) / a0};
	K = Math.tan((Math.PI * 38.13547087602444) / fs);
	Q = 0.5003270373238773;
	a0 = 1 + K / Q + K * K;
	const hp = {b0: 1, b1: -2, b2: 1, a1: (2 * (K * K - 1)) / a0, a2: (1 - K / Q + K * K) / a0};
	const weighted = a.channels.map((ch) => biquad(biquad(ch, shelf), hp));
	const block = Math.round(0.4 * fs);
	const step = Math.round(0.1 * fs);
	const n = weighted[0]?.length ?? 0;
	if (n < block) return null;
	const z: number[] = [];
	for (let s = 0; s + block <= n; s += step) {
		let sum = 0;
		for (const ch of weighted) {
			let acc = 0;
			for (let i = s; i < s + block; i++) acc += ch[i] * ch[i];
			sum += acc / block;
		}
		z.push(sum);
	}
	const L = (v: number) => -0.691 + 10 * Math.log10(v);
	const abs = z.filter((v) => L(v) > -70);
	if (!abs.length) return -Infinity;
	const rel = L(abs.reduce((p, v) => p + v, 0) / abs.length) - 10;
	const gated = abs.filter((v) => L(v) > rel);
	return L(gated.reduce((p, v) => p + v, 0) / gated.length);
};

/** RMS in dBFS over the whole clip. */
export const rmsDb = (a: Audio) => {
	let s = 0;
	let n = 0;
	for (const ch of a.channels) for (let i = 0; i < ch.length; i++) (s += ch[i] * ch[i]), n++;
	return n ? linToDb(Math.sqrt(s / n)) : -Infinity;
};

/** First/last sample above `thresholdDb` (sample peak), in seconds. */
export const activeSpan = (a: Audio, thresholdDb = -50) => {
	const th = dbToLin(thresholdDb);
	const n = a.channels[0]?.length ?? 0;
	let first = -1;
	let last = -1;
	for (let i = 0; i < n; i++) {
		let m = 0;
		for (const ch of a.channels) m = Math.max(m, Math.abs(ch[i]));
		if (m >= th) {
			if (first < 0) first = i;
			last = i;
		}
	}
	return first < 0 ? null : {start: first / a.sampleRate, end: (last + 1) / a.sampleRate};
};
