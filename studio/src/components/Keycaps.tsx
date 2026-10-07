// On-screen key presses: a dark glass pill bottom-centre (composition space, outside any camera). It appears ~150 ms
// BEFORE the press, the cap dips on the press frame, and leaves ~700 ms after. Fonts from the brand (text label, mono glyphs).
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {springs} from '../presets/springs';

export type KeyPress = {
  /** frame of the (first) key-down */
  at: number;
  /** keys shown as caps, e.g. ['⌘', 'K'] | ['⇧'] | ['Enter'] */
  keys: string[];
  /** 'double' taps the same cap twice; 'chord' presses all together; 'hold' keeps them down for `hold` */
  kind?: 'tap' | 'double' | 'chord' | 'hold';
  label?: string;
  /** frames to stay after the press (default 0.7 s) */
  hold?: number;
};

const Cap: React.FC<{k: string; down: number; scale: number; text: string; mono: string}> = ({k, down, scale, text, mono}) => (
  <div
    style={{
      minWidth: 58 * scale,
      height: 58 * scale,
      padding: `0 ${14 * scale}px`,
      borderRadius: 13 * scale,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, rgba(255,255,255,${0.16 - 0.05 * down}), rgba(255,255,255,0.05))`,
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: `0 ${4 * (1 - down) * scale}px 0 rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)`,
      transform: `translateY(${3 * down * scale}px)`,
      fontFamily: k.length > 1 && !/[⌘⌥⌃⇧]/.test(k) ? text : mono,
      fontSize: (k.length > 2 ? 20 : 26) * scale,
      fontWeight: 500,
      color: '#ECEAE4',
    }}
  >
    {k}
  </div>
);

/** Bottom offset (px) that keeps keycaps above subtitles and platform UI for the current aspect. */
export const keycapBottom = (width: number, height: number) => {
  const r = width / height;
  if (r > 1.5) return 0.16 * height;
  if (r > 0.95) return 0.27 * height;
  if (r > 0.7) return 0.25 * height;
  return 0.3 * height;
};

export const Keycap: React.FC<KeyPress & {scale?: number; bottom?: number}> = ({at, keys, kind = 'tap', label, hold, scale = 1, bottom}) => {
  const f = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const bottomPx = bottom ?? keycapBottom(width, height);
  const lead = Math.round(0.15 * fps);
  const stay = hold ?? Math.round(0.7 * fps);
  const gap = Math.round(0.12 * fps); // second tap of a double
  const end = at + (kind === 'double' ? gap : 0) + (kind === 'hold' ? stay : 0) + stay;
  if (f < at - lead - 2 || f > end + 10) return null;
  const inP = spring({frame: f - (at - lead), fps, config: springs.snappy});
  const outP = interpolate(f, [end, end + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pressAt = (t0: number, len = 4) => (f >= t0 && f < t0 + len ? 1 : f >= t0 + len && f < t0 + len + 3 ? 1 - (f - t0 - len) / 3 : 0);
  const down = kind === 'hold' ? (f >= at && f < at + stay ? 1 : 0) : Math.max(pressAt(at), kind === 'double' ? pressAt(at + gap) : 0);
  const caps = kind === 'double' ? [keys[0]] : keys;
  const s = scale * (Math.min(width, height) / 1080) * (width < 1200 ? 1.15 : 1.2);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: bottomPx, display: 'flex', justifyContent: 'center', pointerEvents: 'none'}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10 * s,
          padding: `${11 * s}px ${14 * s}px`,
          borderRadius: 22 * s,
          background: 'rgba(12,12,12,0.74)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
          opacity: inP * (1 - outP),
          transform: `translateY(${(1 - inP) * 16 + outP * 8}px) scale(${0.94 + 0.06 * inP})`,
        }}
      >
        {caps.map((k, i) => (
          <Cap key={i} k={k} down={down} scale={s} text={b.font.text} mono={b.font.mono} />
        ))}
        {kind === 'double' ? <span style={{fontFamily: b.font.mono, fontSize: 17 * s, color: '#9A978F', marginLeft: 2 * s}}>×2</span> : null}
        {label ? <span style={{fontFamily: b.font.text, fontSize: 21 * s, fontWeight: 500, color: '#ECEAE4', margin: `0 ${8 * s}px 0 ${6 * s}px`, whiteSpace: 'nowrap'}}>{label}</span> : null}
      </div>
    </div>
  );
};

/** Several presses in one shot. */
export const Keycaps: React.FC<{presses: KeyPress[]; scale?: number; bottom?: number}> = ({presses, scale, bottom}) => (
  <>
    {presses.map((p, i) => (
      <Keycap key={i} {...p} scale={scale} bottom={bottom} />
    ))}
  </>
);

/** Frames of every key-down (glue a key-click SFX to each). */
export const keyPressFrames = (presses: KeyPress[], fps: number) =>
  presses.flatMap((p) => (p.kind === 'double' ? [p.at, p.at + Math.round(0.12 * fps)] : [p.at]));
