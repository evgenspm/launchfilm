// Named easings: Remotion Easing functions for interpolate(), plus CSS strings for style props.
import {Easing} from 'remotion';

export const css = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
  inOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',
  outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  linear: 'linear',
} as const;

export const easings = {
  /** default entrance */
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  /** softer entrance */
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  outCubic: Easing.out(Easing.cubic),
  outQuad: Easing.out(Easing.quad),
  /** exits, zoom-through, suck-in */
  inExpo: Easing.bezier(0.7, 0, 0.84, 0),
  /** an exit that is visibly moving from its first frame */
  inQuad: Easing.bezier(0.11, 0, 0.5, 0),
  /** camera pans, Ken Burns */
  inOutSine: Easing.bezier(0.37, 0, 0.63, 1),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
  /** CSS-style overshoot */
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),
  linear: Easing.linear,
  /** typewriter / stop-motion */
  stepped: (steps: number) => (t: number) => Math.floor(t * steps) / steps,
} as const;

export type EasingName = Exclude<keyof typeof easings, 'stepped'>;
