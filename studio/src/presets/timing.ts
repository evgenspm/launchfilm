// Frame math, beat grid, word timings, staggers. Pure helpers; call them with fps from useVideoConfig().
// beats.json and words.json are the CLI's contract (`launchfilm beats`, `launchfilm words`); shapes below.
import {interpolate} from 'remotion';

export const sec = (s: number, fps: number) => Math.round(s * fps);
export const ms = (m: number, fps: number) => Math.round((m / 1000) * fps);

/** Durations in ms (craft: motion). Convert with ms(D.enter, fps). */
export const D = {
  micro: 200,
  enter: 400,
  exit: 250,
  move: 600,
  wordReveal: 300,
  charType: 45,
  cameraTier: 800,
  zoomThrough: 700,
  holdWord: 400,
  holdLine: 1200,
  holdResult: 4500,
} as const;

/** Stagger gaps in frames at 30 fps (scale with fps/30). */
export const STAGGER = {chars: 1, words: 2, items: 2, cards: 5, phones: 5} as const;
export const stagger = (index: number, gapFrames: number, fps = 30) => Math.round(index * gapFrames * (fps / 30));

/** Linear 0..1 progress over [start, start + dur] frames, clamped. */
export const progress = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// ─── beats ───────────────────────────────────────────────────────────────────────────────

/** beats.json: seconds. `downbeats` optional (every 4th beat is assumed). */
export type BeatsJson = {bpm: number; beats: number[]; downbeats?: number[]; duration: number};

/** A synthetic beat grid from a tempo (no audio analysis): first beat at `offset` seconds. */
export const beatsFromBpm = (bpm: number, duration: number, offset = 0): BeatsJson => {
  const step = 60 / bpm;
  const n = Math.max(1, Math.floor((duration - offset) / step) + 1);
  return {bpm, duration, beats: Array.from({length: n}, (_, i) => +(offset + i * step).toFixed(4))};
};

export const beatGrid = (beats: BeatsJson, fps: number) => {
  const frames = beats.beats.map((b) => Math.round(b * fps));
  const downs = (beats.downbeats ?? beats.beats.filter((_, i) => i % 4 === 0)).map((b) => Math.round(b * fps));
  return {
    bpm: beats.bpm,
    framesPerBeat: (fps * 60) / beats.bpm,
    frames,
    /** frame of beat n (0-based) */
    beatFrame: (n: number) => frames[Math.max(0, Math.min(frames.length - 1, n))],
    downbeatFrame: (n: number) => downs[Math.max(0, Math.min(downs.length - 1, n))],
    /** snap any frame to the nearest beat */
    snap: (frame: number) => frames.reduce((best, f) => (Math.abs(f - frame) < Math.abs(best - frame) ? f : best), frames[0] ?? frame),
    /** 0..1 pulse that peaks on each beat and decays over `decayFrames`: drive a scale 1 → 1.03 with it */
    pulse: (frame: number, decayFrames = 6) => {
      let last: number | undefined;
      for (const f of frames) if (f <= frame) last = f;
      if (last === undefined) return 0;
      return interpolate(frame - last, [0, decayFrames], [1, 0], {extrapolateRight: 'clamp'});
    },
  };
};
export type BeatGrid = ReturnType<typeof beatGrid>;

// ─── words ───────────────────────────────────────────────────────────────────────────────

/** One spoken word, seconds from the VO file start. `emph` = marked *word* in the script. */
export type Word = {w: string; s: number; e: number; emph?: boolean};
/** One subtitle card, shown whole from s to e (seconds from the track start). */
export type Phrase = {text: string; s: number; e: number; emph?: string[]};
/** words.json: the VO's words, optionally grouped into phrases (script `|` marks or pauses). */
export type WordsJson = {text: string; duration: number; words: Word[]; phrases?: Phrase[]};
/** Captions without VO: {"phrases": [{"text": "…", "s": 0.5, "e": 2.4}]} */
export type CaptionsJson = {phrases: Phrase[]};

export type FrameWord = {w: string; s: number; e: number};

/** Word timings (seconds) → frames, optionally offset by the VO start `at` (seconds). */
export const wordsToFrames = (words: WordsJson | Word[], fps: number, at = 0): FrameWord[] =>
  (Array.isArray(words) ? words : words.words).map((x) => ({w: x.w, s: Math.round((x.s + at) * fps), e: Math.round((x.e + at) * fps)}));

/** Split words into sentences on terminal punctuation; each sentence keeps its words. */
export const sentences = <T extends {w: string}>(words: T[]) => {
  const out: T[][] = [[]];
  for (const w of words) {
    out[out.length - 1].push(w);
    if (/[.!?…]$/.test(w.w)) out.push([]);
  }
  return out.filter((s) => s.length);
};

/** Estimated words for a line that has no VO yet (2.8 words/s): lets the cut read before the voice exists. */
export const estimateWords = (text: string, start = 0, wps = 2.8): Word[] => {
  const ws = text.split(/\s+/).filter(Boolean);
  const per = 1 / wps;
  return ws.map((w, i) => ({w, s: +(start + i * per).toFixed(3), e: +(start + (i + 0.85) * per).toFixed(3)}));
};
