// Procedural SFX presets: our own sounds, dedicated CC0. Pure JS synthesis (seeded noise, oscillators, a
// modulated state-variable filter, envelopes, a small Schroeder reverb). Deterministic for a given seed,
// identical on every OS, and independent of which ffmpeg build is installed (Remotion's bundled ffmpeg has no
// aevalsrc/anoisesrc/afftfilt). Output: 48 kHz, peak-normalized to -3 dBFS by the caller.
import {dbToLin, rng} from '../../lib/dsp.js';
import type {Audio} from '../../lib/wav.js';

const SR = 48000;

// ---------- building blocks

const len = (s: number) => Math.round(s * SR);

const white = (n: number, r: () => number) => {
	const out = new Float32Array(n);
	for (let i = 0; i < n; i++) out[i] = r() * 2 - 1;
	return out;
};

/** Pink-ish noise (Paul Kellet's economy filter). */
const pink = (n: number, r: () => number) => {
	const out = new Float32Array(n);
	let b0 = 0, b1 = 0, b2 = 0;
	for (let i = 0; i < n; i++) {
		const w = r() * 2 - 1;
		b0 = 0.99765 * b0 + w * 0.099046;
		b1 = 0.963 * b1 + w * 0.2965164;
		b2 = 0.57 * b2 + w * 1.0526913;
		out[i] = (b0 + b1 + b2 + w * 0.1848) * 0.25;
	}
	return out;
};

/** Oscillator with a time-varying frequency (phase-accumulated, so sweeps stay click-free). */
const osc = (n: number, freq: (t: number) => number, shape: 'sine' | 'saw' | 'square' | 'tri' = 'sine', phase0 = 0) => {
	const out = new Float32Array(n);
	let ph = phase0;
	for (let i = 0; i < n; i++) {
		const f = freq(i / SR);
		const dt = f / SR;
		ph += dt;
		ph -= Math.floor(ph);
		let v: number;
		if (shape === 'sine') v = Math.sin(2 * Math.PI * ph);
		else if (shape === 'saw') {
			v = 2 * ph - 1;
			// polyBLEP to tame aliasing
			if (ph < dt) {
				const x = ph / dt;
				v -= x + x - x * x - 1;
			} else if (ph > 1 - dt) {
				const x = (ph - 1) / dt;
				v -= x * x + x + x + 1;
			}
		} else if (shape === 'square') v = ph < 0.5 ? 1 : -1;
		else v = 1 - 4 * Math.abs(ph - 0.5);
		out[i] = v;
	}
	return out;
};

type FilterMode = 'low' | 'band' | 'high';
/** TPT state-variable filter with per-sample cutoff (Hz) and Q. */
const svf = (x: Float32Array, mode: FilterMode, fc: number | ((t: number) => number), q: number | ((t: number) => number) = 0.707) => {
	const y = new Float32Array(x.length);
	let ic1 = 0, ic2 = 0;
	for (let i = 0; i < x.length; i++) {
		const t = i / SR;
		const f = Math.min(SR * 0.45, Math.max(10, typeof fc === 'number' ? fc : fc(t)));
		const Q = typeof q === 'number' ? q : q(t);
		const g = Math.tan((Math.PI * f) / SR);
		const k = 1 / Q;
		const a1 = 1 / (1 + g * (g + k));
		const a2 = g * a1;
		const a3 = g * a2;
		const v3 = x[i] - ic2;
		const v1 = a1 * ic1 + a2 * v3;
		const v2 = ic2 + a2 * ic1 + a3 * v3;
		ic1 = 2 * v1 - ic1;
		ic2 = 2 * v2 - ic2;
		y[i] = mode === 'low' ? v2 : mode === 'band' ? v1 : x[i] - k * v1 - v2;
	}
	return y;
};

const env = (x: Float32Array, f: (t: number, T: number) => number) => {
	const T = x.length / SR;
	for (let i = 0; i < x.length; i++) x[i] *= f(i / SR, T);
	return x;
};

const expDecay = (tau: number, attack = 0.002) => (t: number) => (t < attack ? t / attack : Math.exp(-(t - attack) / tau));

const mix = (n: number, ...parts: [Float32Array, number, number?][]) => {
	const out = new Float32Array(n);
	for (const [p, gain, offsetS] of parts) {
		const o = len(offsetS ?? 0);
		for (let i = 0; i < p.length && i + o < n; i++) out[i + o] += p[i] * gain;
	}
	return out;
};

const softClip = (x: Float32Array, drive = 1.5) => x.map((v) => Math.tanh(v * drive) / Math.tanh(drive));

/** Small Schroeder reverb (4 combs + 2 allpasses) for tails; returns a stereo pair. */
const reverb = (x: Float32Array, o: {decay: number; mix: number; tailS?: number}): [Float32Array, Float32Array] => {
	const n = x.length + len(o.tailS ?? 0.8);
	const run = (delaysMs: number[]) => {
		const out = new Float32Array(n);
		for (const d of delaysMs) {
			const D = Math.round((d / 1000) * SR);
			const g = Math.pow(0.001, D / SR / o.decay);
			const buf = new Float32Array(n);
			for (let i = 0; i < n; i++) {
				const inp = i < x.length ? x[i] : 0;
				buf[i] = inp + (i >= D ? buf[i - D] * g : 0);
				out[i] += buf[i] / delaysMs.length;
			}
		}
		for (const [d, g] of [[5.0, 0.7], [1.7, 0.7]] as const) {
			const D = Math.round((d / 1000) * SR);
			const y = new Float32Array(n);
			for (let i = 0; i < n; i++) {
				const xd = i >= D ? out[i - D] : 0;
				const yd = i >= D ? y[i - D] : 0;
				y[i] = -g * out[i] + xd + g * yd;
			}
			out.set(y);
		}
		return out;
	};
	const wetL = run([29.7, 37.1, 41.1, 43.7]);
	const wetR = run([30.9, 36.3, 40.3, 44.9]);
	const L = new Float32Array(n);
	const R = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		const dry = i < x.length ? x[i] : 0;
		L[i] = dry * (1 - o.mix) + wetL[i] * o.mix;
		R[i] = dry * (1 - o.mix) + wetR[i] * o.mix;
	}
	return [L, R];
};

/** Equal-power pan of a mono signal with a time-varying position (-1 left … 1 right). */
const pan = (x: Float32Array, pos: (t: number, T: number) => number): [Float32Array, Float32Array] => {
	const L = new Float32Array(x.length);
	const R = new Float32Array(x.length);
	const T = x.length / SR;
	for (let i = 0; i < x.length; i++) {
		const p = (Math.max(-1, Math.min(1, pos(i / SR, T))) + 1) / 2;
		L[i] = x[i] * Math.cos((p * Math.PI) / 2);
		R[i] = x[i] * Math.sin((p * Math.PI) / 2);
	}
	return [L, R];
};

const reverse = (x: Float32Array) => x.slice().reverse();

/** Short fades so nothing starts or ends with a click. */
const edges = (chs: Float32Array[], inMs = 1, outMs = 8) => {
	for (const x of chs) {
		const a = Math.min(x.length, Math.round((inMs / 1000) * SR));
		const b = Math.min(x.length, Math.round((outMs / 1000) * SR));
		for (let i = 0; i < a; i++) x[i] *= i / a;
		for (let i = 0; i < b; i++) x[x.length - 1 - i] *= i / b;
	}
	return chs;
};

const exp2 = (f0: number, f1: number, T: number) => (t: number) => f0 * Math.pow(f1 / f0, Math.min(1, t / T));

// ---------- presets

const whoosh = (T: number, lo: number, hi: number, seed: number) => {
	const r = rng(seed);
	const n = len(T);
	const src = mix(n, [pink(n, r), 1], [white(n, r), 0.05]);
	const peak = 0.55;
	const shape = (t: number) => {
		const x = Math.min(1, t / T);
		return x < peak ? Math.sin(((x / peak) * Math.PI) / 2) : Math.cos((((x - peak) / (1 - peak)) * Math.PI) / 2);
	};
	const fc = (t: number) => lo + (hi - lo) * Math.pow(shape(t), 1.4);
	// two band-passes a fifth apart give the "air moving past" body; a little band-limited hiss on top
	const band = mix(n, [svf(src, 'band', fc, (t) => 2 + 2 * shape(t)), 1], [svf(src, 'band', (t) => fc(t) * 1.5, 3), 0.5]);
	const air = svf(svf(src, 'high', (t) => fc(t) * 1.8, 0.7), 'low', 9000, 0.7);
	const body = svf(mix(n, [band, 1], [air, 0.12]), 'low', (t) => Math.min(12000, fc(t) * 3), 0.7);
	env(body, (t) => Math.pow(shape(t), 2.2));
	return edges(pan(body, (t, TT) => -0.65 + 1.3 * (t / TT)), 2, 10);
};

const riser = (T: number, seed: number) => {
	const r = rng(seed);
	const n = len(T);
	const f = exp2(110, 880, T);
	const saws = mix(n, [osc(n, f, 'saw'), 0.5], [osc(n, (t) => f(t) * 1.004, 'saw', 0.3), 0.5], [osc(n, (t) => f(t) * 0.5, 'tri'), 0.35]);
	const tone = svf(saws, 'low', (t) => 600 * Math.pow(12, t / T), 0.9);
	const noise = svf(pink(n, r), 'band', (t) => 350 * Math.pow(16, t / T), 1.4);
	const body = mix(n, [tone, 0.8], [noise, 0.6]);
	env(body, (t) => Math.pow(t / T, 2.2) * (t > T - 0.02 ? (T - t) / 0.02 : 1));
	const [L, R] = reverb(body, {decay: 0.9, mix: 0.18, tailS: 0});
	return edges([L.subarray(0, n), R.subarray(0, n)], 5, 4);
};

const cymbal = (T: number, seed: number) => {
	const r = rng(seed);
	const n = len(T);
	// 808-style metallic partials (inharmonic squares) + noise, high-passed
	const parts = [205.3, 304.4, 369.6, 522.7, 540, 800].map((f, i) => [osc(n, () => f * 2.2, 'square', i * 0.17), 0.12] as [Float32Array, number]);
	const metal = svf(svf(mix(n, ...parts, [pink(n, r), 0.8]), 'high', 3200, 0.6), 'low', 11000, 0.7);
	const shimmer = svf(pink(n, r), 'band', 6500, 1.2);
	const hit = mix(n, [metal, 1], [shimmer, 0.6]);
	env(hit, (t) => Math.exp(-t / (T * 0.33)));
	const rev = reverse(hit);
	env(rev, (t) => (t > T - 0.015 ? (T - t) / 0.015 : 1));
	return edges([rev], 10, 2);
};

const click = (seed: number) => {
	const r = rng(seed);
	const n = len(0.06);
	const tone = env(osc(n, exp2(2200, 650, 0.03)), expDecay(0.012, 0.0008));
	const snap = env(svf(white(n, r), 'high', 2500, 0.7), expDecay(0.003, 0.0003));
	return edges([mix(n, [tone, 0.8], [snap, 0.6])], 0.3, 4);
};

const tick = (seed: number) => {
	const r = rng(seed);
	const n = len(0.03);
	const tone = env(osc(n, () => 4200), expDecay(0.005, 0.0005));
	const snap = env(svf(white(n, r), 'band', 6000, 2), expDecay(0.002, 0.0002));
	return edges([mix(n, [tone, 0.7], [snap, 0.5])], 0.2, 3);
};

const pop = () => {
	const n = len(0.1);
	const body = env(osc(n, exp2(380, 950, 0.035)), (t) => (t < 0.002 ? t / 0.002 : Math.exp(-(t - 0.002) / 0.025)));
	const sub = env(osc(n, exp2(190, 300, 0.03)), expDecay(0.018, 0.002));
	return edges([mix(n, [body, 0.85], [sub, 0.35])], 0.5, 6);
};

const chime = (freq: number, T: number, tauScale = 1) => {
	const n = len(T);
	const partials: [number, number, number][] = [
		[1, 1, 0.9],
		[2, 0.35, 0.5],
		[2.76, 0.22, 0.32],
		[5.4, 0.1, 0.18],
		[8.93, 0.05, 0.1],
	];
	return mix(n, ...partials.map(([ratio, amp, tau]) => [env(osc(n, () => freq * ratio), expDecay(tau * tauScale, 0.003)), amp] as [Float32Array, number]));
};

const uiConfirm = () => {
	const n = len(0.45);
	const a = chime(1318.5, 0.45, 0.25);
	const b = chime(1975.5, 0.36, 0.3);
	const dry = mix(n, [a, 0.55], [b, 0.6, 0.085]);
	const [L, R] = reverb(dry, {decay: 0.5, mix: 0.12, tailS: 0});
	return edges([L.subarray(0, n), R.subarray(0, n)], 1, 30);
};

const ding = () => {
	const n = len(1.5);
	const bell = mix(n, [chime(1318.5, 1.5, 1.2), 0.8], [chime(1318.5 * 1.5, 1.5, 0.7), 0.25, 0.0]);
	const [L, R] = reverb(bell, {decay: 1.2, mix: 0.2, tailS: 0});
	return edges([L.subarray(0, n), R.subarray(0, n)], 1, 120);
};

const hit = (seed: number) => {
	const r = rng(seed);
	const n = len(0.6);
	const kick = env(osc(n, exp2(140, 48, 0.12)), expDecay(0.16, 0.001));
	const crack = env(svf(white(n, r), 'band', 1800, 0.9), expDecay(0.02, 0.0005));
	const body = softClip(mix(n, [kick, 1], [crack, 0.55]), 1.8);
	return edges([body], 0.3, 40);
};

const impactLow = (seed: number) => {
	const r = rng(seed);
	const n = len(1.2);
	const boom = env(osc(n, exp2(150, 38, 0.5)), expDecay(0.42, 0.002));
	const burst = env(svf(white(n, r), 'low', 3500, 0.7), expDecay(0.08, 0.0008));
	const dry = softClip(mix(n, [boom, 1], [burst, 0.5]), 1.6);
	const [L, R] = reverb(dry, {decay: 1.4, mix: 0.22, tailS: 0});
	return edges([L.subarray(0, n), R.subarray(0, n)], 0.5, 150);
};

const glitch = (seed: number) => {
	const r = rng(seed);
	const n = len(0.4);
	const mod = osc(n, () => 37);
	const carrier = osc(n, (t) => 300 + 1800 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 23 * t)) + 400 * mod[Math.min(n - 1, Math.round(t * SR))], 'saw');
	// bit-crush (4 bits) + sample-and-hold (rate reduction) + 28 Hz gate + stutters
	const out = new Float32Array(n);
	let held = 0;
	const hold = 6;
	for (let i = 0; i < n; i++) {
		if (i % hold === 0) held = Math.round(carrier[i] * 7) / 7;
		const gate = Math.sin(2 * Math.PI * 28 * (i / SR)) > -0.2 ? 1 : 0.15;
		out[i] = held * gate;
	}
	const seg = len(0.04);
	for (let s = 0; s + 2 * seg < n; s += seg) {
		if (r() < 0.35) out.copyWithin(s + seg, s, s + seg);
	}
	const noise = env(svf(white(n, r), 'high', 4000, 0.7), (t) => (Math.floor(t * 50) % 3 === 0 ? 0.5 : 0.05));
	const body = mix(n, [svf(out, 'low', 7000, 0.7), 0.8], [noise, 0.3]);
	return edges(pan(body, (t) => (Math.floor(t * 25) % 2 ? 0.45 : -0.45)), 1, 10);
};

const bassDrop = () => {
	const n = len(1.6);
	const sub = osc(n, exp2(95, 30, 1.25));
	const harm = osc(n, (t) => exp2(95, 30, 1.25)(t) * 2, 'tri');
	const body = softClip(mix(n, [sub, 1], [harm, 0.18]), 2.2);
	env(body, (t, T) => (t < 0.01 ? t / 0.01 : t > T - 0.35 ? Math.max(0, (T - t) / 0.35) : 1) * (0.75 + 0.25 * Math.exp(-t / 0.15)));
	return edges([body], 0.5, 20);
};

const typingBurst = (seed: number) => {
	const r = rng(seed);
	const n = len(1.25);
	const L = new Float32Array(n);
	const R = new Float32Array(n);
	let t = 0.02;
	while (t < 1.1) {
		const kn = len(0.04);
		const vel = 0.6 + 0.4 * r();
		const snap = env(svf(white(kn, r), 'band', 2200 + 1800 * r(), 1.2), expDecay(0.006, 0.0005));
		const thock = env(osc(kn, () => 160 + 60 * r()), expDecay(0.012, 0.001));
		const key = mix(kn, [snap, 0.9 * vel], [thock, 0.45 * vel]);
		const p = (r() - 0.5) * 0.5;
		const o = len(t);
		for (let i = 0; i < kn && o + i < n; i++) {
			L[o + i] += key[i] * Math.cos(((p + 1) / 2) * (Math.PI / 2));
			R[o + i] += key[i] * Math.sin(((p + 1) / 2) * (Math.PI / 2));
		}
		t += 0.065 + 0.07 * r() + (r() < 0.12 ? 0.12 : 0);
	}
	return edges([L, R], 0.5, 20);
};

const shutter = (seed: number) => {
	const r = rng(seed);
	const n = len(0.35);
	const clack = (g: number) => {
		const m = len(0.08);
		const snap = env(svf(white(m, r), 'high', 1500, 0.7), expDecay(0.006, 0.0004));
		const body = env(svf(white(m, r), 'band', 950, 7), expDecay(0.025, 0.0005));
		const thump = env(osc(m, exp2(180, 90, 0.03)), expDecay(0.015, 0.001));
		return mix(m, [snap, 0.7 * g], [body, 2.2 * g], [thump, 0.35 * g]);
	};
	const dry = mix(n, [clack(0.75), 1, 0.0], [clack(1), 1, 0.105]);
	const [L, R] = reverb(dry, {decay: 0.25, mix: 0.1, tailS: 0});
	return edges([L.subarray(0, n), R.subarray(0, n)], 0.3, 20);
};


const typeClick = (seed: number) => {
	const r = rng(seed);
	const n = len(0.07);
	const snap = env(svf(white(n, r), 'band', 3200, 1.4), expDecay(0.007, 0.0004));
	const thock = env(osc(n, () => 175), expDecay(0.014, 0.001));
	const rattle = env(svf(white(n, r), 'band', 1200, 4), expDecay(0.01, 0.002));
	return edges([mix(n, [snap, 0.9], [thock, 0.5], [rattle, 0.25, 0.012])], 0.2, 6);
};

/** Sparkle / glint: short high sine pings rising in pitch, with a soft air sweep. */
const shimmer = (seed: number) => {
	const r = rng(seed);
	const T = 0.9;
	const n = len(T);
	const L = new Float32Array(n);
	const R = new Float32Array(n);
	for (let k = 0; k < 14; k++) {
		const at = 0.02 + (k / 14) * 0.6 + r() * 0.03;
		const f = 2600 * Math.pow(2, (k / 14) * 1.5) * (1 + (r() - 0.5) * 0.06);
		const m = len(0.25);
		const ping = env(osc(m, () => f), expDecay(0.06 + r() * 0.05, 0.002));
		const p = r() * 2 - 1;
		const o = len(at);
		for (let i = 0; i < m && o + i < n; i++) {
			L[o + i] += ping[i] * 0.4 * Math.cos(((p + 1) / 4) * Math.PI);
			R[o + i] += ping[i] * 0.4 * Math.sin(((p + 1) / 4) * Math.PI);
		}
	}
	const air = env(svf(pink(n, r), 'band', (t) => 4000 + 5000 * (t / T), 2), (t) => Math.sin(Math.PI * Math.min(1, t / T)) * 0.5);
	for (let i = 0; i < n; i++) {
		L[i] += air[i] * 0.5;
		R[i] += air[i] * 0.5;
	}
	return edges([L, R], 1, 80);
};

/** Low swell: a dark pad that rises under a reveal. */
const swell = (seed: number) => {
	const r = rng(seed);
	const T = 2;
	const n = len(T);
	const pad = mix(n, [osc(n, () => 55, 'saw'), 0.4], [osc(n, () => 55.4, 'saw', 0.5), 0.4], [osc(n, () => 82.4, 'saw', 0.2), 0.25], [pink(n, r), 0.15]);
	const body = svf(pad, 'low', (t) => 120 + 900 * Math.pow(t / T, 2), 0.9);
	env(body, (t) => Math.pow(Math.min(1, t / (T * 0.85)), 2) * (t > T - 0.15 ? (T - t) / 0.15 : 1));
	const [Lr, Rr] = reverb(body, {decay: 1.5, mix: 0.25, tailS: 0});
	return edges([Lr.subarray(0, n), Rr.subarray(0, n)], 10, 10);
};

export interface SfxPreset {
	id: string;
	tags: string[];
	description: string;
	/** suggested use, so agents can map film events to sounds */
	use: string;
	seed: number;
	make: (seed: number) => Float32Array[];
}

// Ids follow craft/vocabulary.md#audio, so film.json `sfx: [{sound: "<id>"}]` resolves to public/sfx/<id>.wav.
export const PRESETS: SfxPreset[] = [
	{id: 'whoosh-short', tags: ['whoosh', 'transition', 'swipe', 'fast'], description: '0.4 s air whoosh, left to right', use: 'quick cut, card slide, text swap', seed: 11, make: (s) => whoosh(0.4, 500, 5200, s)},
	{id: 'whoosh', tags: ['whoosh', 'transition', 'camera', 'medium'], description: '0.8 s whoosh, band sweep 300 Hz to 4 kHz', use: 'camera move, scene transition', seed: 12, make: (s) => whoosh(0.8, 300, 4200, s)},
	{id: 'whoosh-long', tags: ['whoosh', 'transition', 'zoom', 'slow'], description: '1.4 s slow whoosh', use: 'zoom-through, big reveal, slow push', seed: 13, make: (s) => whoosh(1.4, 220, 3600, s)},
	{id: 'swoosh-short', tags: ['swoosh', 'swipe', 'ui', 'fast'], description: '0.25 s bright swoosh', use: 'UI element flies in, swipe, word pops in from the side', seed: 14, make: (s) => whoosh(0.25, 1500, 7000, s)},
	{id: 'riser', tags: ['riser', 'build', 'tension', 'short'], description: '2 s saw + noise riser with a hard stop', use: 'build into a reveal or logo (end it on the cut)', seed: 21, make: (s) => riser(2, s)},
	{id: 'riser-long', tags: ['riser', 'build', 'tension', 'trailer'], description: '4 s riser with a hard stop', use: 'long build before the hero moment', seed: 22, make: (s) => riser(4, s)},
	{id: 'reverse-cymbal', tags: ['reverse', 'cymbal', 'swell', 'build'], description: '1.5 s reversed metallic swell', use: 'swell into a cut, title slam', seed: 23, make: (s) => cymbal(1.5, s)},
	{id: 'swell', tags: ['swell', 'pad', 'low', 'reveal'], description: '2 s low pad swell', use: 'under a light-on or reveal', seed: 24, make: (s) => swell(s)},
	{id: 'click', tags: ['click', 'ui', 'mouse', 'button'], description: '60 ms mouse/button click', use: 'cursor click, button press', seed: 31, make: (s) => click(s)},
	{id: 'type-click', tags: ['typing', 'key', 'keyboard', 'click'], description: 'one key press', use: 'a single keystroke, typewriter letters', seed: 30, make: (s) => typeClick(s)},
	{id: 'tick', tags: ['tick', 'ui', 'counter', 'small'], description: '30 ms tiny tick', use: 'counter steps, list items, toggles', seed: 32, make: (s) => tick(s)},
	{id: 'pop', tags: ['pop', 'ui', 'appear', 'bubble'], description: '100 ms upward pop', use: 'element appears, badge, notification dot', seed: 33, make: () => pop()},
	{id: 'ui-confirm', tags: ['ui', 'confirm', 'success', 'chime'], description: '2-note rising chime', use: 'task done, checkmark, success state', seed: 34, make: () => uiConfirm()},
	{id: 'notification', tags: ['notification', 'ding', 'bell', 'chime'], description: '1.5 s soft bell (notification ding)', use: 'notification arrives, message lands', seed: 35, make: () => ding()},
	{id: 'shimmer', tags: ['shimmer', 'sparkle', 'glint', 'magic'], description: '0.9 s rising sparkle', use: 'glint sweep, AI magic moment, highlight', seed: 36, make: (s) => shimmer(s)},
	{id: 'hit', tags: ['hit', 'punch', 'accent', 'beat'], description: '0.6 s punchy hit', use: 'text slam, beat accent, stat lands', seed: 41, make: (s) => hit(s)},
	{id: 'impact-low', tags: ['impact', 'boom', 'low', 'logo'], description: '1.2 s low boom with tail', use: 'logo reveal, end card, big statement', seed: 42, make: (s) => impactLow(s)},
	{id: 'glitch-sfx', tags: ['glitch', 'digital', 'error', 'transition'], description: '0.4 s bit-crushed glitch', use: 'glitch cut, error state, AI/tech accent', seed: 43, make: (s) => glitch(s)},
	{id: 'bass-drop', tags: ['bass', 'drop', 'sub', 'trailer'], description: '1.6 s sub sweep 95 to 30 Hz', use: 'drop after a riser, hero moment (needs headphones/speakers)', seed: 44, make: () => bassDrop()},
	{id: 'typing-burst', tags: ['typing', 'keyboard', 'keys', 'ui'], description: '1.25 s burst of key presses', use: 'prompt typing, search field, code typing', seed: 51, make: (s) => typingBurst(s)},
	{id: 'camera-shutter', tags: ['camera', 'shutter', 'screenshot', 'capture'], description: 'two-clack mechanical shutter', use: 'screenshot, capture, photo moment', seed: 52, make: (s) => shutter(s)},
	{id: 'silence-beat', tags: ['silence', 'pause', 'beat'], description: '0.5 s of digital silence (a deliberate gap)', use: 'cut to black for a beat of silence', seed: 0, make: () => [new Float32Array(len(0.5))]},
];

export const presetById = (id: string) => PRESETS.find((p) => p.id === id);

/** Render a preset, peak-normalized to `peakDb` (sample peak). */
export const renderPreset = (p: SfxPreset, o: {seed?: number; peakDb?: number} = {}): Audio => {
	const chs = p.make(o.seed ?? p.seed).map((c) => Float32Array.from(c));
	let peak = 0;
	for (const c of chs) for (let i = 0; i < c.length; i++) peak = Math.max(peak, Math.abs(c[i]));
	const g = peak > 0 ? dbToLin(o.peakDb ?? -3) / peak : 1; // silence-beat stays silent
	for (const c of chs) for (let i = 0; i < c.length; i++) c[i] *= g;
	return {sampleRate: SR, channels: chs};
};
