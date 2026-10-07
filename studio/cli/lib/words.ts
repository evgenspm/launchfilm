// Script ↔ audio word timings. The script is the source of truth for spelling (whisper hears "Sharpie",
// the script says "Sharpy"); only timings come from audio. Script markup: `|` = subtitle phrase break,
// `*word*` = emphasis. Output words.json carries seconds (words/phrases) and Remotion-style captions (ms).
import type {WordTiming} from '../providers/types.js';

export interface ScriptToken {
	w: string;
	emph: boolean;
	br: boolean;
}

export const parseScript = (text: string): ScriptToken[] => {
	const out: ScriptToken[] = [];
	for (const tok of text.replace(/\n+/g, ' | ').match(/\||[^\s|]+/g) ?? []) {
		if (tok === '|') {
			if (out.length) out[out.length - 1].br = true;
			continue;
		}
		out.push({w: tok.replace(/\*/g, ''), emph: tok.includes('*'), br: false});
	}
	return out;
};

/** Script text for the TTS engine: markup removed, whitespace collapsed. */
export const cleanScript = (text: string) => text.replace(/\|/g, ' ').replace(/\*([^*]*)\*/g, '$1').replace(/\s+/g, ' ').trim();

export const norm = (w: string) => w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9'À-ɏЀ-ӿ]/g, '');

/** Longest common subsequence over normalized tokens → matched index pairs. */
const lcsPairs = (a: string[], b: string[]): [number, number][] => {
	const n = a.length;
	const m = b.length;
	const dp = Array.from({length: n + 1}, () => new Uint16Array(m + 1));
	for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] && a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
	const pairs: [number, number][] = [];
	let i = 0;
	let j = 0;
	while (i < n && j < m) {
		if (a[i] && a[i] === b[j]) {
			pairs.push([i, j]);
			i++;
			j++;
		} else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
		else j++;
	}
	return pairs;
};

export interface AlignedWord extends WordTiming {
	_br?: boolean;
}

/** Carry heard timings onto script words: matches copy, mismatched spans are spread, missing words interpolated. */
export const alignToScript = (heard: WordTiming[], script: ScriptToken[]): AlignedWord[] => {
	const a = heard.map((h) => norm(h.w));
	const b = script.map((s) => norm(s.w));
	const pairs = lcsPairs(a, b);
	const times: ([number, number] | null)[] = new Array(script.length).fill(null);
	const anchors: [number, number][] = [[-1, -1], ...pairs, [heard.length, script.length]];
	for (let k = 0; k + 1 < anchors.length; k++) {
		const [i0, j0] = anchors[k];
		const [i1, j1] = anchors[k + 1];
		if (k > 0) times[j0] = [heard[i0].s, heard[i0].e];
		const hs = i1 - i0 - 1;
		const ss = j1 - j0 - 1;
		if (hs > 0 && ss > 0) {
			// replaced span: spread the heard time range over the script words, weighted by length
			const s0 = heard[i0 + 1].s;
			const e0 = heard[i1 - 1].e;
			const weights = script.slice(j0 + 1, j1).map((t) => Math.max(1, t.w.length));
			const total = weights.reduce((p, v) => p + v, 0);
			let acc = 0;
			for (let q = 0; q < ss; q++) {
				const st = s0 + ((e0 - s0) * acc) / total;
				acc += weights[q];
				times[j0 + 1 + q] = [st, s0 + ((e0 - s0) * acc) / total];
			}
		}
	}
	// script words never heard: squeeze between neighbours
	for (let i = 0; i < times.length; i++) {
		if (times[i]) continue;
		const prev = [...times.slice(0, i)].reverse().find(Boolean)?.[1] ?? 0;
		const next = times.slice(i + 1).find(Boolean)?.[0] ?? prev + 0.25;
		times[i] = [prev, Math.max(prev + 0.05, Math.min(next, prev + 0.3))];
	}
	return script.map((t, i) => ({w: t.w, s: round(times[i]![0]), e: round(times[i]![1]), ...(t.emph ? {emph: true} : {}), _br: t.br}));
};

const round = (v: number) => Math.round(v * 1000) / 1000;

/** Similarity of heard vs script (0..1), like difflib's ratio on normalized words. */
export const matchRatio = (heard: WordTiming[], words: WordTiming[]) => {
	const a = heard.map((h) => norm(h.w)).filter(Boolean);
	const b = words.map((w) => norm(w.w)).filter(Boolean);
	if (!a.length && !b.length) return 1;
	return (2 * lcsPairs(a, b).length) / (a.length + b.length);
};

/** Clamp to [0, duration], keep monotonic, minimum 30 ms per word. */
export const sanitize = <T extends WordTiming>(words: T[], duration: number): T[] => {
	let last = 0;
	return words.map((w) => {
		const s = Math.max(last, Math.min(w.s, duration));
		const e = Math.max(s + 0.03, Math.min(Math.max(w.e, s), duration));
		last = e;
		return {...w, s: round(s), e: round(e)};
	});
};

export interface Phrase {
	text: string;
	s: number;
	e: number;
	from: number;
	to: number;
	emph: string[];
}

/** Subtitle phrases: script `|` breaks if present; else pauses ≥ gap, sentence ends, commas after 3+ words, max words. */
export const phrases = (words: AlignedWord[], o: {gap?: number; maxWords?: number} = {}): Phrase[] => {
	const gap = o.gap ?? 0.25;
	const maxw = o.maxWords ?? 8;
	const marked = words.slice(0, -1).some((w) => w._br);
	const out: Phrase[] = [];
	let cur: number[] = [];
	words.forEach((w, i) => {
		cur.push(i);
		const nxt = words[i + 1];
		let brk = !nxt;
		if (!brk) {
			if (marked) brk = Boolean(w._br);
			else brk = nxt.s - w.e >= gap || /[.!?…]$/.test(w.w) || (cur.length >= 3 && /[,;:—]$/.test(w.w)) || cur.length >= maxw;
		}
		if (brk) {
			const ws = cur.map((k) => words[k]);
			out.push({
				text: ws.map((x) => x.w).join(' '),
				s: ws[0].s,
				e: ws[ws.length - 1].e,
				from: cur[0],
				to: cur[cur.length - 1],
				emph: ws.filter((x) => x.emph).map((x) => x.w.replace(/[^\w'-]/g, '')),
			});
			cur = [];
		}
	});
	return out;
};

/** Remotion @remotion/captions Caption shape (ms; leading space on every word but the first). */
export const toCaptions = (words: WordTiming[]) =>
	words.map((w, i) => ({text: `${i ? ' ' : ''}${w.w}`, startMs: Math.round(w.s * 1000), endMs: Math.round(w.e * 1000), timestampMs: Math.round(w.s * 1000), confidence: w.conf ?? null}));

export interface WordsJson {
	text: string;
	heard: string | null;
	duration: number;
	engine: string;
	match: number | null;
	words: WordTiming[];
	phrases: Phrase[];
	captions: ReturnType<typeof toCaptions>;
}

export const buildWordsJson = (o: {heard: WordTiming[] | null; native?: WordTiming[]; script: string | null; duration: number; engine: string}): WordsJson => {
	let words: AlignedWord[];
	const src = o.native ?? o.heard ?? [];
	if (o.script) words = alignToScript(src, parseScript(o.script));
	else words = src.map((w) => ({...w, _br: false}));
	words = sanitize(words, o.duration);
	const ph = phrases(words);
	const clean = words.map(({_br, ...w}) => w);
	return {
		text: clean.map((w) => w.w).join(' '),
		heard: o.heard ? o.heard.map((w) => w.w).join(' ') : null,
		duration: round(o.duration),
		engine: o.engine,
		match: o.script && o.heard ? Math.round(matchRatio(o.heard, clean) * 1000) / 1000 : null,
		words: clean,
		phrases: ph,
		captions: toCaptions(clean),
	};
};

const srtTime = (s: number) => {
	const ms = Math.max(0, Math.round(s * 1000));
	const h = Math.floor(ms / 3600000);
	const m = Math.floor((ms % 3600000) / 60000);
	const sec = Math.floor((ms % 60000) / 1000);
	return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`;
};

export const toSrt = (cues: {s: number; e: number; text: string}[]) =>
	cues
		.filter((c) => c.text.trim())
		.map((c, i) => `${i + 1}\n${srtTime(c.s)} --> ${srtTime(Math.max(c.e, c.s + 0.3))}\n${c.text.trim()}\n`)
		.join('\n');
