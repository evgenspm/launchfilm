// Transitions between shots, one helper per transition id in craft/vocabulary.md.
// Model: the outgoing shot keeps playing for `overlap` frames past the cut while the incoming one (drawn on top) enters.
// The film engine does this for you from film.json (`shots[].transition`); by hand, wrap each shot in <ShotTransition>
// and extend the outgoing Sequence by transitionFrames(id, fps).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {easings} from './easings';
import {Flash, SliceGlitch, RGBSplit} from './look';

export type TransitionId =
  | 'hard-cut'
  | 'match-cut'
  | 'mask-wipe'
  | 'blur-dissolve'
  | 'slide-push'
  | 'flash'
  | 'glitch-cut'
  | 'zoom-through'
  | 'portal'
  | 'smash-cut-black';

export type TransitionSpec = {
  /** frames at 30 fps (scaled with fps) */
  frames: number;
  /** true = both shots are on screen during `frames` (the outgoing Sequence must run that long past the cut) */
  overlap: boolean;
  /** suggested sound at the cut (audio id from craft/vocabulary.md#audio) */
  sfx?: string;
  note: string;
};

export const TRANSITIONS: Record<TransitionId, TransitionSpec> = {
  'hard-cut': {frames: 0, overlap: false, note: 'on the beat, no effect (default)'},
  'match-cut': {frames: 0, overlap: false, note: 'hard cut; keep the key shape at the same frame position on both sides'},
  'mask-wipe': {frames: 14, overlap: true, sfx: 'swoosh-short', note: 'shape mask reveals the next shot (circle / linear / diagonal)'},
  'blur-dissolve': {frames: 10, overlap: true, note: 'gaussian blur crossfade, ≤ 12 fr'},
  'slide-push': {frames: 14, overlap: true, sfx: 'whoosh', note: 'next shot pushes the previous out'},
  flash: {frames: 3, overlap: false, sfx: 'hit', note: '1–3 frame brand/white flash on a hit'},
  'glitch-cut': {frames: 4, overlap: false, sfx: 'glitch-sfx', note: 'slice glitch + RGB split on both sides of the cut'},
  'zoom-through': {frames: 14, overlap: true, sfx: 'whoosh', note: 'fly into the outgoing shot, next one settles in'},
  portal: {frames: 18, overlap: true, sfx: 'whoosh', note: 'next shot opens from a point (a word, a dot) while the camera pushes in'},
  'smash-cut-black': {frames: 9, overlap: false, sfx: 'silence-beat', note: 'cut to black for a beat before the next shot'},
};

/** Transition length in frames at `fps`. */
export const transitionFrames = (id: TransitionId | undefined, fps: number) => (id ? Math.round((TRANSITIONS[id].frames * fps) / 30) : 0);
/** Frames the outgoing shot must keep playing past the cut. */
export const transitionOverlap = (id: TransitionId | undefined, fps: number) => (id && TRANSITIONS[id].overlap ? transitionFrames(id, fps) : 0);

export type TransitionOpts = {
  /** slide-push / mask-wipe direction */
  direction?: 'left' | 'right' | 'up' | 'down';
  /** mask-wipe shape */
  shape?: 'circle' | 'linear' | 'diagonal';
  /** portal / circle wipe / zoom-through origin, 0..1 of the frame */
  origin?: [number, number];
  /** brand colour for flash */
  color?: string;
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const dirVec = (d: TransitionOpts['direction']) => (d === 'right' ? [-1, 0] : d === 'up' ? [0, 1] : d === 'down' ? [0, -1] : [1, 0]);

/**
 * CSS for one side of a transition at progress p (0..1 through the transition frames).
 * role 'in' = the incoming shot (drawn on top), 'out' = the outgoing one.
 */
export const transitionStyle = (id: TransitionId, p: number, role: 'in' | 'out', size: {width: number; height: number}, o: TransitionOpts = {}): React.CSSProperties => {
  const t = clamp01(p);
  const [ox, oy] = o.origin ?? [0.5, 0.5];
  switch (id) {
    case 'blur-dissolve': {
      const e = easings.inOutSine(t);
      return role === 'in' ? {opacity: e, filter: e < 0.999 ? `blur(${((1 - e) * 16).toFixed(2)}px)` : undefined} : {filter: `blur(${(e * 16).toFixed(2)}px)`};
    }
    case 'slide-push': {
      const e = easings.inOutCubic(t);
      const [dx, dy] = dirVec(o.direction);
      const W = size.width;
      const H = size.height;
      return role === 'in'
        ? {transform: `translate(${(dx * (1 - e) * W).toFixed(1)}px, ${(dy * (1 - e) * H).toFixed(1)}px)`}
        : {transform: `translate(${(-dx * e * W).toFixed(1)}px, ${(-dy * e * H).toFixed(1)}px)`};
    }
    case 'mask-wipe': {
      if (role === 'out') return {};
      const e = easings.inOutCubic(t);
      if (o.shape === 'circle') return {clipPath: `circle(${(e * 75).toFixed(2)}% at ${ox * 100}% ${oy * 100}%)`};
      if (o.shape === 'diagonal') {
        const k = e * 200;
        return {clipPath: `polygon(0 0, ${k}% 0, ${k - 100}% 100%, 0 100%)`};
      }
      const [dx, dy] = dirVec(o.direction);
      const r = (1 - e) * 100;
      return {clipPath: dx > 0 ? `inset(0 0 0 ${r}%)` : dx < 0 ? `inset(0 ${r}% 0 0)` : dy > 0 ? `inset(${r}% 0 0 0)` : `inset(0 0 ${r}% 0)`};
    }
    case 'zoom-through': {
      if (role === 'out') {
        const e = easings.inExpo(t);
        return {transform: `scale(${(1 + 7 * e).toFixed(4)})`, transformOrigin: `${ox * 100}% ${oy * 100}%`, opacity: 1 - clamp01((t - 0.55) / 0.45)};
      }
      const e = easings.outExpo(clamp01((t - 0.35) / 0.65));
      return {opacity: e, transform: `scale(${(0.9 + 0.1 * e).toFixed(4)})`};
    }
    case 'portal': {
      if (role === 'out') return {transform: `scale(${(1 + 0.6 * easings.inQuad(t)).toFixed(4)})`, transformOrigin: `${ox * 100}% ${oy * 100}%`};
      const e = easings.inExpo(t);
      return {clipPath: `circle(${(Math.max(0.2, e * 80)).toFixed(2)}% at ${ox * 100}% ${oy * 100}%)`, transform: `scale(${(1.15 - 0.15 * t).toFixed(4)})`, transformOrigin: `${ox * 100}% ${oy * 100}%`};
    }
    case 'smash-cut-black':
      return role === 'in' ? {opacity: t >= 1 ? 1 : 0} : {};
    default:
      return {};
  }
};

/**
 * Wrap one shot (inside its Sequence). `enter` plays over the first frames; `exit` plays from `exit.at` (local frame of
 * the cut) for the overlap. Flash and glitch-cut need no overlap: they act on the frames around the cut.
 */
export const ShotTransition: React.FC<{
  enter?: {id: TransitionId; frames?: number; opts?: TransitionOpts};
  exit?: {id: TransitionId; at: number; frames?: number; opts?: TransitionOpts};
  children: React.ReactNode;
}> = ({enter, exit, children}) => {
  const f = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const size = {width, height};
  let style: React.CSSProperties = {};
  let glitch = false;
  if (enter && enter.id !== 'hard-cut' && enter.id !== 'match-cut') {
    const n = enter.frames ?? transitionFrames(enter.id, fps);
    if (enter.id === 'glitch-cut') glitch = glitch || f < Math.ceil(n / 2);
    else if (f < n) style = {...style, ...transitionStyle(enter.id, n > 0 ? f / n : 1, 'in', size, enter.opts)};
  }
  if (exit && exit.id !== 'hard-cut' && exit.id !== 'match-cut') {
    const n = exit.frames ?? transitionFrames(exit.id, fps);
    if (exit.id === 'glitch-cut') glitch = glitch || (f >= exit.at - Math.floor(n / 2) && f < exit.at);
    else if (TRANSITIONS[exit.id].overlap && f >= exit.at) {
      const s = transitionStyle(exit.id, n > 0 ? (f - exit.at) / n : 1, 'out', size, exit.opts);
      style = {...style, ...s, transform: [style.transform, s.transform].filter(Boolean).join(' ') || undefined};
    }
  }
  const body = <AbsoluteFill style={style}>{children}</AbsoluteFill>;
  if (!glitch) return body;
  return (
    <SliceGlitch active seed={`cut-${Math.floor(f / 2)}`} bands={7} shift={Math.round(width * 0.03)}>
      <RGBSplit amount={Math.round(width * 0.004)}>{body}</RGBSplit>
    </SliceGlitch>
  );
};

/** Overlay for cut-point effects (flash). Put it above all shots; `at` = frame of the cut. */
export const CutFlash: React.FC<{at: number; frames?: number; color?: string}> = ({at, frames, color}) => {
  const {fps} = useVideoConfig();
  return <Flash atFrame={at} frames={frames ?? transitionFrames('flash', fps)} color={color} />;
};

/** Progress 0..1 of a transition that starts at `start` (helper for hand-built transitions). */
export const useTransitionProgress = (start: number, id: TransitionId) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.max(1, transitionFrames(id, fps));
  return interpolate(f, [start, start + n], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};
