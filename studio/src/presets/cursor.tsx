// Cursor choreography (craft: camera and staging). Spring path through keyframes (Screen Studio feel: slight overshoot,
// snappier near clicks), click squash 1 → 0.9 → 1 and an expanding ring. Real macOS cursor shapes via @remotion/mac-cursors.
// Coordinates are in the space of the parent: put the cursor inside a FocusCamera stage to have it scale with the camera.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {MacOSCursor} from '@remotion/mac-cursors';
import {springs} from './springs';

export type CursorKeyframe = {frame: number; x: number; y: number; click?: boolean; drag?: boolean};
export type CursorKind = 'default' | 'pointer' | 'text';

export const resolveCursor = (kfs: CursorKeyframe[], frame: number, fps: number) => {
  let x = kfs[0].x;
  let y = kfs[0].y;
  const near = Math.round(0.16 * fps);
  for (let i = 1; i < kfs.length; i++) {
    const prev = kfs[i - 1];
    const cur = kfs[i];
    const nearClick = kfs.some((k) => k.click && Math.abs(k.frame - frame) <= near);
    const cfg = cur.drag ? springs.drag : nearClick ? springs.cameraSnappy : springs.cameraIn;
    const p = spring({frame: frame - prev.frame, fps, config: cfg, durationInFrames: Math.max(6, cur.frame - prev.frame)});
    x += (cur.x - prev.x) * p;
    y += (cur.y - prev.y) * p;
  }
  // click squash 1 → 0.9 → 1 over ~8 frames
  let scale = 1;
  for (const k of kfs) {
    if (!k.click) continue;
    const f = frame - k.frame;
    if (f >= 0 && f < 12) {
      const s = spring({frame: f, fps, config: springs.click});
      scale = 1 - 0.1 * Math.sin(Math.min(1, s) * Math.PI);
    }
  }
  const clicking = kfs.some((k) => k.click && frame - k.frame >= 0 && frame - k.frame < 4);
  return {x, y, scale, clicking};
};

export const useCursor = (kfs: CursorKeyframe[]) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return resolveCursor(kfs, frame, fps);
};

/** Frames where clicks happen (glue a click SFX to each). */
export const clickFrames = (kfs: CursorKeyframe[]) => kfs.filter((k) => k.click).map((k) => k.frame);

export const Cursor: React.FC<{
  keyframes: CursorKeyframe[];
  kind?: CursorKind;
  /** switch the cursor shape at frames */
  kindAt?: {frame: number; kind: CursorKind}[];
  /** 1 = native size at 1x; 1.6 reads well on a 1080p frame without a camera */
  size?: number;
  ripple?: boolean;
  rippleColor?: string;
  hideBefore?: number;
}> = ({keyframes, kind = 'default', kindAt = [], size = 1.6, ripple = true, rippleColor = 'rgba(255,255,255,0.85)', hideBefore}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (hideBefore !== undefined && f < hideBefore) return null;
  const {x, y, scale} = resolveCursor(keyframes, f, fps);
  const k = [...kindAt].reverse().find((c) => f >= c.frame)?.kind ?? kind;
  const RING = 14;
  const last = ripple ? [...keyframes].reverse().find((kk) => kk.click && f >= kk.frame && f - kk.frame < RING) : undefined;
  const rp = last ? (f - last.frame) / RING : 0;
  const r = 18 * size * (0.5 + rp);
  return (
    <>
      {last ? (
        <div
          style={{
            position: 'absolute',
            left: last.x - r,
            top: last.y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `${1.5 * size}px solid ${rippleColor}`,
            opacity: 0.75 * (1 - rp),
            boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
          }}
        />
      ) : null}
      <MacOSCursor
        cursor={k}
        style={{position: 'absolute', left: x, top: y, transform: `scale(${size * scale})`, transformOrigin: 'top left', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,.35))'}}
      />
    </>
  );
};
