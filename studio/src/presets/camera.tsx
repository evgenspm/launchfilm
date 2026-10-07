// Virtual camera (craft: camera and staging). Nothing static: every shot gets a push, a tier move or a focus move.
//   <Camera keyframes>      additive spring keyframes (scale / x / y)
//   <KenBurns>              slow push-in across the shot
//   <ZoomThrough>           fly into an element; put the next scene behind it
//   <FrameInFrame>          the shot shrinks into a glowing card on black
//   <FocusCamera>           frames a focus RECT of a fixed-size stage and recomposes per aspect without letterbox
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, type SpringConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {springs} from './springs';
import {easings} from './easings';

/** The four zoom tiers (craft: camera). Move one tier at a time; zoom in on cameraIn, out on cameraOut. */
export const ZOOM_TIERS = {
  /** the whole UI floating on the background: openings and closings, 900–1200 ms moves */
  establishing: 0.86,
  /** a panel, a form, the chat column: 700–900 ms */
  region: 1.1,
  /** a button, an input, a chart: 600–800 ms */
  element: 1.75,
  /** a click, a toggle, a number changing: 500–600 ms */
  detail: 2.75,
} as const;
export type ZoomTier = keyof typeof ZOOM_TIERS;

export type CameraKeyframe = {frame: number; scale?: number; tier?: ZoomTier; x?: number; y?: number; config?: Partial<SpringConfig>};

const resolveCamera = (kfs: CameraKeyframe[], frame: number, fps: number) => {
  const full = kfs.map((k, i) => ({
    frame: k.frame,
    scale: k.scale ?? (k.tier ? ZOOM_TIERS[k.tier] : undefined) ?? kfs[i - 1]?.scale ?? 1,
    x: k.x ?? kfs[i - 1]?.x ?? 0,
    y: k.y ?? kfs[i - 1]?.y ?? 0,
    config: k.config,
  }));
  // carry resolved values forward so a keyframe without scale keeps the previous resolved one
  for (let i = 1; i < full.length; i++) {
    if (kfs[i].scale === undefined && !kfs[i].tier) full[i].scale = full[i - 1].scale;
  }
  let scale = full[0].scale;
  let x = full[0].x;
  let y = full[0].y;
  for (let i = 1; i < full.length; i++) {
    const prev = full[i - 1];
    const cur = full[i];
    const zoomIn = cur.scale >= prev.scale;
    const p = spring({frame: frame - cur.frame, fps, config: cur.config ?? (zoomIn ? springs.cameraIn : springs.cameraOut)});
    scale += (cur.scale - prev.scale) * p;
    x += (cur.x - prev.x) * p;
    y += (cur.y - prev.y) * p;
  }
  return {scale, x, y};
};

export const useCamera = (keyframes: CameraKeyframe[]) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return resolveCamera(keyframes, frame, fps);
};

/** Springs between keyframes; each keyframe adds its delta through its own spring (cameraIn for zoom-in, cameraOut for out). x/y in px. */
export const Camera: React.FC<{keyframes: CameraKeyframe[]; children: React.ReactNode; style?: React.CSSProperties}> = ({keyframes, children, style}) => {
  const {scale, x, y} = useCamera(keyframes);
  return <AbsoluteFill style={{transform: `scale(${scale}) translate(${x}px, ${y}px)`, transformOrigin: 'center', ...style}}>{children}</AbsoluteFill>;
};

/** Slow push-in for any shot that would otherwise be static (1.00 → 1.06 typical). Spans the parent Sequence. */
export const KenBurns: React.FC<{from?: number; to?: number; dx?: number; dy?: number; durationInFrames?: number; children: React.ReactNode}> = ({
  from = 1,
  to = 1.05,
  dx = 0,
  dy = 0,
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const dur = durationInFrames ?? d;
  const t = interpolate(frame, [0, dur], [0, 1], {extrapolateRight: 'clamp', easing: easings.inOutSine});
  return (
    <AbsoluteFill style={{transform: `scale(${from + (to - from) * t}) translate(${dx * t}px, ${dy * t}px)`, transformOrigin: 'center'}}>
      {children}
    </AbsoluteFill>
  );
};

/** Zoom-through: scales children 1 → `to` with ease-in-expo, gone at the end. `origin` = the element you fly into (CSS). */
export const ZoomThrough: React.FC<{startFrame: number; durationInFrames?: number; to?: number; origin?: string; children: React.ReactNode}> = ({
  startFrame,
  durationInFrames = 21,
  to = 40,
  origin = 'center',
  children,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inExpo});
  if (t >= 1) return null;
  return <AbsoluteFill style={{transform: `scale(${1 + (to - 1) * t})`, transformOrigin: origin}}>{children}</AbsoluteFill>;
};

/** The shot inside a card on black with a soft glow, scaling up across the shot. Glow defaults to the brand accent. */
export const FrameInFrame: React.FC<{width: number | string; height: number | string; glow?: string; from?: number; to?: number; background?: string; children: React.ReactNode}> = ({
  width,
  height,
  glow,
  from = 1,
  to = 1.15,
  background = '#000',
  children,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const {durationInFrames} = useVideoConfig();
  const s = interpolate(frame, [0, durationInFrames], [from, to], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width, height, overflow: 'hidden', position: 'relative', borderRadius: 6, boxShadow: `0 0 80px ${glow ?? alpha(b.colors.accent, 0.35)}`, transform: `scale(${s})`}}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ─── FocusCamera ─────────────────────────────────────────────────────────────────────────
// Frames a focus rect of a fixed-size stage (a desktop, a window, a page) inside any composition size. Keys name a rect in
// stage px; the camera fits it with padding, springs between keys in log-scale (so zooms feel even), and clamps so it
// never shows past the stage edge. Wide frames ('full') show the whole stage with a margin; 1:1 / 4:5 / 9:16 never go
// below cover scale: they crop around the focus instead of letterboxing.

export type Rect = [x: number, y: number, w: number, h: number];
export type Size = {w: number; h: number};

export type FocusKey = {
  frame: number;
  /** rect in stage px, or 'full' (whole stage) */
  focus?: Rect | 'full';
  /** padding around the rect, 0..1 of the frame (default 0.08) */
  pad?: number;
  /** extra multiplier on the fitted scale */
  zoom?: number;
  /** where to hold a rect larger than the view: 'start' keeps its left/top edge (text reads from the left) */
  anchor?: 'start' | 'center';
  config?: Partial<SpringConfig>;
};

const focusTarget = (k: FocusKey, W: number, H: number, stage: Size, fullMargin: number) => {
  const fit = Math.min(W / stage.w, H / stage.h);
  const cover = Math.max(W / stage.w, H / stage.h);
  const wide = W / H > 1.5;
  let s: number;
  let cx: number;
  let cy: number;
  if (!k.focus || k.focus === 'full') {
    s = wide ? fit * fullMargin : cover;
    cx = stage.w / 2;
    cy = stage.h / 2;
  } else {
    const [x, y, w, h] = k.focus;
    s = Math.min(W / w, H / h) * (1 - (k.pad ?? 0.08));
    if (!wide) s = Math.max(s, cover);
    cx = x + w / 2;
    cy = y + h / 2;
  }
  s *= k.zoom ?? 1;
  if (k.focus && k.focus !== 'full' && (k.anchor ?? 'start') === 'start') {
    const [x, y, w, h] = k.focus;
    if (w > W / s) cx = x + W / (2 * s) - 12 / s;
    if (h > H / s) cy = y + H / (2 * s) - 12 / s;
  }
  const hw = W / (2 * s);
  const hh = H / (2 * s);
  cx = hw * 2 >= stage.w ? stage.w / 2 : Math.min(Math.max(cx, hw), stage.w - hw);
  cy = hh * 2 >= stage.h ? stage.h / 2 : Math.min(Math.max(cy, hh), stage.h - hh);
  return {s, cx, cy};
};

/** Camera state for a stage: scale `s`, the stage point at frame centre, and the translate to apply. */
export const useFocusCamera = (keys: FocusKey[], stage: Size, fullMargin = 0.93) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const ts = (keys.length ? keys : [{frame: 0}]).map((k) => focusTarget(k, W, H, stage, fullMargin));
  let ls = Math.log(ts[0].s);
  let cx = ts[0].cx;
  let cy = ts[0].cy;
  for (let i = 1; i < keys.length; i++) {
    const a = ts[i - 1];
    const b = ts[i];
    const p = spring({frame: frame - keys[i].frame, fps, config: keys[i].config ?? (b.s >= a.s ? springs.cameraIn : springs.cameraOut)});
    ls += (Math.log(b.s) - Math.log(a.s)) * p;
    cx += (b.cx - a.cx) * p;
    cy += (b.cy - a.cy) * p;
  }
  const s = Math.exp(ls);
  return {s, cx, cy, W, H, tx: W / 2 - cx * s, ty: H / 2 - cy * s};
};
export type FocusCameraState = ReturnType<typeof useFocusCamera>;

/** Stage point → composition px under the current camera (for overlays drawn outside the camera). */
export const stageToFrame = (cam: FocusCameraState, x: number, y: number) => ({x: cam.tx + x * cam.s, y: cam.ty + y * cam.s});

export const FocusCamera: React.FC<{
  keys: FocusKey[];
  /** stage size in px; children are laid out in this box (default 1920×1080) */
  stage?: Size;
  children: React.ReactNode;
  /** CSS background behind the stage (default: brand bg with a soft vignette) */
  backdrop?: string;
  radius?: number;
  shadow?: boolean;
  fullMargin?: number;
}> = ({keys, stage = {w: 1920, h: 1080}, children, backdrop, radius = 14, shadow = true, fullMargin}) => {
  const b = useBrand();
  const cam = useFocusCamera(keys, stage, fullMargin);
  const bg = backdrop ?? `radial-gradient(ellipse at 50% 40%, ${b.colors.surface} 0%, ${b.colors.bg} 75%)`;
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: stage.w,
          height: stage.h,
          transformOrigin: '0 0',
          transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})`,
          borderRadius: radius,
          overflow: 'hidden',
          boxShadow: shadow ? '0 30px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)' : undefined,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
