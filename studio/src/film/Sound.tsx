// VO, a music bed that ducks under it, and one-shot SFX. Mix targets (craft: rhythm and sound): VO files at −16 LUFS,
// music files at −14 LUFS played at `level` (default −20) and `duck` dB lower while the voice speaks: 150 ms attack
// (starts before the word), 400 ms release, gaps under 0.45 s bridged so the bed never pumps between words.
import React from 'react';
import {Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import type {WordsJson} from '../presets/timing';

export const mediaSrc = (s: string) => (/^(https?:|\/|data:|blob:)/.test(s) ? s : staticFile(s));
export const dbToGain = (d: number) => Math.pow(10, d / 20);

/** One VO file starting at `at` film seconds. */
export const VO: React.FC<{src: string; at?: number; volume?: number}> = ({src, at = 0, volume = 1}) => {
  const {fps} = useVideoConfig();
  return (
    <Sequence from={Math.round(at * fps)} name="VO" layout="none">
      <Audio src={mediaSrc(src)} volume={volume} />
    </Sequence>
  );
};

/** Speech intervals in film seconds from word timings; gaps under `bridge` s count as speech. */
export const speechSpans = (words: WordsJson | undefined, at = 0, bridge = 0.45): [number, number][] => {
  if (!words?.words?.length) return [];
  const out: [number, number][] = [];
  for (const w of words.words) {
    const s = w.s + at;
    const e = w.e + at;
    const last = out[out.length - 1];
    if (last && s - last[1] < bridge) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
};

/** Gain (linear) of a ducked bed at film time t. Exported for QA tools and tests. */
export const duckGain = (
  t: number,
  spans: [number, number][],
  o: {level?: number; duck?: number; attack?: number; release?: number; at?: number; fadeIn?: number; fadeOut?: number; stop: number; lift?: {from: number; db: number; ramp?: number}},
) => {
  const {level = -20, duck = 9, attack = 0.15, release = 0.4, at = 0, fadeIn = 0.3, fadeOut = 1.2, stop, lift} = o;
  let env = 0;
  for (const [a, b] of spans) {
    if (t >= a - attack && t <= b + release) {
      const up = interpolate(t, [a - attack, a], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const down = interpolate(t, [b, b + release], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      env = Math.max(env, Math.min(up, down));
    }
  }
  const l = lift ? interpolate(t, [lift.from, lift.from + (lift.ramp ?? 0.5)], [0, lift.db], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  const fade = Math.min(
    interpolate(t, [at, at + Math.max(0.001, fadeIn)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(t, [stop - fadeOut, stop], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  // the file is −14 LUFS; play it at `level`
  return dbToGain(level + 14 - duck * env + l) * fade;
};

export const Music: React.FC<{
  src: string;
  /** speech spans in film seconds (see speechSpans) */
  spans?: [number, number][];
  level?: number;
  duck?: number;
  attack?: number;
  release?: number;
  /** film seconds where the bed starts, and seconds into the file */
  at?: number;
  trim?: number;
  fadeIn?: number;
  fadeOut?: number;
  /** film seconds where the bed must be silent; default: end of the composition */
  end?: number;
  /** extra dB from `from` on (e.g. +6 over the end card) */
  lift?: {from: number; db: number; ramp?: number};
}> = ({src, spans = [], level, duck, attack, release, at = 0, trim = 0, fadeIn, fadeOut, end, lift}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const stop = end ?? durationInFrames / fps;
  return (
    <Sequence from={Math.round(at * fps)} name="Music" layout="none">
      <Audio
        src={mediaSrc(src)}
        trimBefore={Math.round(trim * fps)}
        volume={(f) => duckGain(f / fps + at, spans, {level, duck, attack, release, at, fadeIn, fadeOut, stop, lift})}
      />
    </Sequence>
  );
};

/** Audio id (craft/vocabulary.md#audio) → file under public/. */
export const sfxPath = (sound: string) => `sfx/${sound}.wav`;

/** One sound at one frame (the glue rule: every visual event gets a sound). `at` is in FRAMES. */
export const Sfx: React.FC<{sound?: string; src?: string; at?: number; volume?: number; durationInFrames?: number}> = ({sound, src, at = 0, volume = 0.8, durationInFrames}) => {
  const {fps} = useVideoConfig();
  const file = src ?? (sound ? sfxPath(sound) : null);
  if (!file) return null;
  return (
    <Sequence from={at} durationInFrames={durationInFrames ?? Math.round(fps * 4)} name={`sfx ${sound ?? src}`} layout="none">
      <Audio src={mediaSrc(file)} volume={volume} />
    </Sequence>
  );
};
