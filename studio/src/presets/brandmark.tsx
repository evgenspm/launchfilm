// Brandmark family: light, glow, glass, portal transitions and logo moments (craft: brand moments).
// Rebuilt from measured launch-film references; numbers are frames at 30 fps, scaled with fps/30 inside each component.
// Everything is driven by useCurrentFrame() and props, deterministic, and works at 1920×1080 and 1080×1920.
// Colours default from the brand: markPalette(useBrand()) turns bg/accent into an ink → deep → core → hot → spark light ramp.
// Marks default to the brand logo (brand.logo.mark drawn inline, or brand.logo.src); any image with alpha works too.
import React, {useEffect, useId, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {AbsoluteFill, Easing, continueRender, delayRender, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D, noise4D} from '@remotion/noise';
import {springs} from './springs';
import {easings} from './easings';
import {Grain} from './look';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix, rgbOf, tokenColor} from '../brand/color';
import {fontReady} from '../brand/fonts';
import type {Brand, BrandColors, MarkPath} from '../brand/types';

// ───────────────────────────── tokens and timing ─────────────────────────────

/** A light ramp for glows, glass and tunnels: ink (darkness) → deep → core (the brand colour) → hot → spark (white-hot). */
export type MarkPalette = {ink: string; deep: string; core: string; hot: string; spark: string};

/** The brand as a light ramp: ink = bg, core = accent, deep/hot/spark = accent mixed toward dark/white. */
export const markPalette = (b: Pick<Brand, 'colors' | 'theme'>): MarkPalette => {
  const {bg, accent} = b.colors;
  return {
    ink: bg,
    deep: b.theme === 'dark' ? mix(accent, '#000000', 0.68) : mix(accent, bg, 0.4),
    core: accent,
    hot: mix(accent, '#FFFFFF', 0.55),
    spark: mix(accent, '#FFFFFF', 0.9),
  };
};

/** Palette prop or the current brand's ramp. */
const usePalette = (palette?: MarkPalette) => {
  const b = useBrand();
  return useMemo(() => palette ?? markPalette(b), [palette, b]);
};

/** Measured beats, frames at 30 fps. */
export const MARK_T = {
  /** round letter → full bleed: 8 frames measured; 10 reads better at 1080p after a longer hold */
  portalZoom: 10,
  /** a phrase enters from depth in 5 frames, leaves past the camera in 4 */
  phraseIn: 5,
  phraseOut: 4,
  /** logo core dim → lit in 14 frames; the halo lags 5 and keeps building ~30 */
  lightOn: 14,
  haloLag: 5,
  haloBuild: 30,
  /** planet rim lights in 12 frames */
  rimLightOn: 12,
  /** lights-off exit: halo 15 frames, object 30 */
  haloOff: 15,
  lightsOff: 30,
  /** typed URL, frames per character */
  typePerChar: 2.5,
  /** a glint across a settled mark (highlight patches measured at 250–300 px/s; a glint is faster on purpose) */
  glint: 22,
  /** dark breath between the light and the type */
  breath: 5,
  /** tunnel dive to black */
  dive: 20,
} as const;

/** Portal zoom easing on ln(scale), fitted to measured frames (0, .02, .11, .18, .28, .46, .78, .87, 1). */
export const portalEase = Easing.bezier(0.85, 0.25, 0.5, 0.7);

// ───────────────────────────── small helpers ─────────────────────────────

const TAU = Math.PI * 2;
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const useSvgId = (prefix: string) => prefix + useId().replace(/[^a-zA-Z0-9_-]/g, '');
const firstFamily = (f: string) => f.split(',')[0].replace(/["']/g, '').trim();

// ───────────────────────────── marks as images ─────────────────────────────

/** A mark: an inline vector ({viewBox, paths}, as in brand.logo.mark) or an image with alpha (public/ path or URL). */
export type MarkSource = string | {viewBox: string; paths: MarkPath[]};

const isUrl = (s: string) => /^(https?:|data:|blob:)/.test(s);

/** Mark → image URL for CSS masks / canvas sampling. Inline vectors become an SVG data URL with brand colours resolved. */
export const markToSrc = (mark: MarkSource, colors: BrandColors): string => {
  if (typeof mark === 'string') return isUrl(mark) ? mark : staticFile(mark);
  const [, , w, h] = mark.viewBox.split(/[\s,]+/).map(Number);
  const paths = mark.paths
    .map((p) => `<path d="${p.d}" fill="${tokenColor(p.fill, colors, 'accent')}"${p.opacity !== undefined ? ` opacity="${p.opacity}"` : ''}${p.fillRule ? ` fill-rule="${p.fillRule}"` : ''}/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" width="${w}" height="${h}">${paths}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/** height / width of an inline mark (from its viewBox); undefined for images (pass `aspect` yourself). */
export const markAspectOf = (mark: MarkSource): number | undefined => {
  if (typeof mark === 'string') return undefined;
  const [, , w, h] = mark.viewBox.split(/[\s,]+/).map(Number);
  return w > 0 ? h / w : undefined;
};

/** A plain rounded tile in the accent: the mark of a brand that has none. */
const TILE_MARK: MarkSource = {viewBox: '0 0 48 48', paths: [{d: 'M12 0 H36 A12 12 0 0 1 48 12 V36 A12 12 0 0 1 36 48 H12 A12 12 0 0 1 0 36 V12 A12 12 0 0 1 12 0 Z', fill: 'accent'}]};

/** The mark to use: explicit `mark`, else the brand's logo (src, then inline mark), else an accent tile. Returns its URL and aspect (h/w). */
export const useMarkSource = (mark?: MarkSource, aspect?: number) => {
  const b = useBrand();
  return useMemo(() => {
    const m: MarkSource = mark ?? b.logo?.mark ?? b.logo?.src ?? TILE_MARK;
    return {mark: m, src: markToSrc(m, b.colors), aspect: aspect ?? markAspectOf(m) ?? 1};
  }, [mark, aspect, b]);
};

// ───────────────────────────── light curves ─────────────────────────────

/**
 * Light-on curve: 0 → 1 over `frames` on an S-curve (the measured core ramp is slow-fast-slow).
 * `flare` > 0 overshoots to 1+flare at the end of the ramp and decays back to 1 over `settle` frames (wordmark flare: 9 up, 9 down).
 */
export const lightCurve = (frame: number, at: number, opts: {frames?: number; flare?: number; settle?: number} = {}) => {
  const {frames = MARK_T.lightOn, flare = 0, settle = 9} = opts;
  const t = clamp01((frame - at) / Math.max(1, frames));
  const base = easings.inOutSine(t);
  if (!flare) return base;
  const after = frame - at - frames;
  if (after < 0) return base * (1 + flare);
  return 1 + flare * (1 - easings.outQuint(clamp01(after / Math.max(1, settle))));
};

/** Lights-off: 1 → 0, halo first (15 f) then the object (30 f). Returns {halo, body}. */
export const lightsOff = (frame: number, at: number, fps = 30) => {
  const k = fps / 30;
  return {
    halo: 1 - easings.inOutSine(clamp01((frame - at) / (MARK_T.haloOff * k))),
    body: 1 - easings.inQuad(clamp01((frame - at) / (MARK_T.lightsOff * k))),
  };
};

const maskOf = (src: string, w: number, h: number, x = 0, y = 0): React.CSSProperties => ({
  WebkitMaskImage: `url("${src}")`,
  maskImage: `url("${src}")`,
  WebkitMaskSize: `${w}px ${h}px`,
  maskSize: `${w}px ${h}px`,
  WebkitMaskPosition: `${x}px ${y}px`,
  maskPosition: `${x}px ${y}px`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
});

/**
 * Dither for soft light on dark. CSS gradients render in 8 bits, so a dark halo shows contour bands (and H.264 makes them blocks).
 * Lays re-seeded grain over the gradient only, in screen mode, shaped by the same gradient as a mask: the bands break up and
 * pure black outside the light stays pure black. `mask` is a CSS mask-image (usually the halo's own gradient in black).
 */
export const Dither: React.FC<{mask: string; amount?: number; style?: React.CSSProperties}> = ({mask, amount = 0.07, style}) =>
  amount <= 0.001 ? null : (
    <div style={{position: 'absolute', inset: 0, mixBlendMode: 'screen', WebkitMaskImage: mask, maskImage: mask, pointerEvents: 'none', ...style}}>
      <Grain opacity={amount} blend="normal" size={1.2} />
    </div>
  );

// ───────────────────────────── Bloom ─────────────────────────────

/**
 * Additive glow for any layer: three blurred copies (r·0.3, r, r·3) summed onto the source (feComposite arithmetic = plus-lighter).
 * `color` tints the glow from the layer's alpha (text, marks); without it the glow is the layer's own colours.
 * `threshold` (0..1, self-colour mode) only lets pixels brighter than it glow, like a camera bloom.
 * `field` weights the wide r·3 layer (a lit logo shows a tight glow plus a wide field ≈ 4–5× the object).
 */
export const Bloom: React.FC<{
  radius?: number;
  intensity?: number;
  color?: string;
  threshold?: number;
  field?: number;
  /** glow behind the layer instead of added on top: the layer keeps its exact colours (logos). Default: additive, like light */
  under?: boolean;
  /** full-frame child (AbsoluteFill); otherwise the wrapper pads itself so the glow is not clipped */
  fill?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({radius = 16, intensity = 1, color, threshold = 0, field = 0.5, under = false, fill = false, style, children}) => {
  const id = useSvgId('bloom');
  if (intensity <= 0.001) {
    return fill ? <AbsoluteFill style={style}>{children}</AbsoluteFill> : <div style={{display: 'inline-block', verticalAlign: 'top', ...style}}>{children}</div>;
  }
  const s = threshold > 0 ? 1 / (1 - threshold) : 1;
  const b = threshold > 0 ? -threshold / (1 - threshold) : 0;
  const k = intensity;
  const pad = fill ? 0 : Math.ceil(radius * 3 * 2.4);
  const svg = (
    <svg width={0} height={0} style={{position: 'absolute'}} aria-hidden>
      <defs>
        <filter id={id} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          {color ? (
            <>
              <feFlood floodColor={color} result="tint" />
              <feComposite in="tint" in2="SourceAlpha" operator="in" result="src" />
            </>
          ) : threshold > 0 ? (
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values={`${s} 0 0 0 ${b}  0 ${s} 0 0 ${b}  0 0 ${s} 0 ${b}  ${0.2126 * s} ${0.7152 * s} ${0.0722 * s} 0 ${b}`}
              result="src"
            />
          ) : (
            <feOffset in="SourceGraphic" dx={0} dy={0} result="src" />
          )}
          <feGaussianBlur in="src" stdDeviation={radius * 0.3} result="b1" />
          <feGaussianBlur in="src" stdDeviation={radius} result="b2" />
          <feGaussianBlur in="src" stdDeviation={radius * 3} result="b3" />
          <feComposite in="b1" in2="b2" operator="arithmetic" k1={0} k2={0.55 * k} k3={0.8 * k} k4={0} result="g12" />
          <feComposite in="g12" in2="b3" operator="arithmetic" k1={0} k2={1} k3={field * k} k4={0} result="glow" />
          {under ? (
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          ) : (
            <feComposite in="SourceGraphic" in2="glow" operator="arithmetic" k1={0} k2={1} k3={1} k4={0} />
          )}
        </filter>
      </defs>
    </svg>
  );
  if (fill) {
    return (
      <AbsoluteFill style={style}>
        {svg}
        <AbsoluteFill style={{filter: `url(#${id})`}}>{children}</AbsoluteFill>
      </AbsoluteFill>
    );
  }
  return (
    <div style={{display: 'inline-block', verticalAlign: 'top', position: 'relative', ...style}}>
      {svg}
      <div style={{padding: pad, margin: -pad, filter: `url(#${id})`}}>{children}</div>
    </div>
  );
};

// ───────────────────────────── BrandTunnel ─────────────────────────────

const NA = 96; // angular cells of the noise table
const NU = 64; // depth cells (period 8 depth units)
const U_CELLS = NU / 8;

const buildTunnelTable = (seed: string) => {
  const t = new Float32Array(NA * NU);
  for (let j = 0; j < NU; j++) {
    const phi = (j / NU) * TAU;
    for (let i = 0; i < NA; i++) {
      const th = (i / NA) * TAU;
      // 4D noise on two circles → seamless in angle and in depth
      const n = noise4D(seed, Math.cos(th) * 1.7, Math.sin(th) * 1.7, Math.cos(phi) * 1.3, Math.sin(phi) * 1.3);
      t[j * NA + i] = 0.5 + 0.5 * n;
    }
  }
  return t;
};

const sampleTable = (t: Float32Array, fx: number, fy: number) => {
  let x0 = Math.floor(fx);
  let y0 = Math.floor(fy);
  const tx = fx - x0;
  const ty = fy - y0;
  x0 = ((x0 % NA) + NA) % NA;
  y0 = ((y0 % NU) + NU) % NU;
  const x1 = (x0 + 1) % NA;
  const y1 = (y0 + 1) % NU;
  const a = t[y0 * NA + x0];
  const b = t[y0 * NA + x1];
  const c = t[y1 * NA + x0];
  const d = t[y1 * NA + x1];
  return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
};

/** 256-entry ramp ink → deep → core → hot → spark (sRGB lerp). */
const buildLut = (p: MarkPalette) => {
  const stops: [number, [number, number, number]][] = [
    [0, rgbOf(p.ink)],
    [0.3, rgbOf(p.deep)],
    [0.62, rgbOf(p.core)],
    [0.88, rgbOf(p.hot)],
    [1, rgbOf(p.spark)],
  ];
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const v = i / 255;
    let k = 0;
    while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
    const [v0, c0] = stops[k];
    const [v1, c1] = stops[k + 1];
    const t = clamp01((v - v0) / (v1 - v0));
    lut[i * 3] = lerp(c0[0], c1[0], t);
    lut[i * 3 + 1] = lerp(c0[1], c1[1], t);
    lut[i * 3 + 2] = lerp(c0[2], c1[2], t);
  }
  return lut;
};

const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9,
  41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];

export type BrandTunnelProps = {
  /** forward travel, depth units per second (rings stream outward) */
  speed?: number;
  /** spiral: radians of twist per depth unit */
  twist?: number;
  /** whole-tunnel rotation, turns per second */
  spin?: number;
  /** vanishing point, fraction of the frame */
  center?: {x: number; y: number};
  /** radius of the dark mouth, fraction of min(W, H) */
  hole?: number;
  /** noise drift of the vanishing point, fraction of min(W, H) */
  drift?: number;
  /** 0..1: the mouth swallows the frame and travel accelerates (exit to dark). Animate it over MARK_T.dive frames, inExpo. */
  dive?: number;
  /** brightness multiplier; 0 = dark (fade in/out by light, not by opacity) */
  exposure?: number;
  /** angle of the key light in degrees (0 = right, 90 = down); it drifts ~10°/s */
  lightAngle?: number;
  /** 'soft': smooth light, noise-dithered against banding. 'phosphor': 8×8 Bayer into ink/deep/core/hot at `cell` px, every third row dimmed */
  look?: 'soft' | 'phosphor';
  /** compute cell in px (render resolution = frame / cell). soft: 3 is plenty (bilinear upscale), phosphor: 3 = a visible dither cell */
  cell?: number;
  palette?: MarkPalette;
  seed?: string;
  /** time source override (frames); defaults to useCurrentFrame() */
  frame?: number;
};

/**
 * Procedural brand-colour tunnel / vortex: rings stream toward the camera around a dark mouth, walls carry angular noise
 * streaks, a rim light crescent sits on the lip of the mouth. Canvas, per pixel, deterministic. A dark-theme moment:
 * on a light brand pass a palette with a dark `ink`.
 */
export const BrandTunnel: React.FC<BrandTunnelProps> = ({
  speed = 0.45,
  twist = 0.35,
  spin = 0.012,
  center = {x: 0.5, y: 0.34},
  hole = 0.12,
  drift = 0.025,
  dive = 0,
  exposure = 1,
  lightAngle = 115,
  look = 'soft',
  cell = 3,
  palette,
  seed = 'tunnel',
  frame: frameOverride,
}) => {
  const current = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const pal = usePalette(palette);
  const frame = frameOverride ?? current;
  const cw = Math.ceil(width / cell);
  const ch = Math.ceil(height / cell);
  const ref = useRef<HTMLCanvasElement>(null);
  const table = useMemo(() => buildTunnelTable(seed), [seed]);
  const lut = useMemo(() => buildLut(pal), [pal]);
  const levels = useMemo(() => [pal.ink, pal.deep, pal.core, pal.hot].map(rgbOf), [pal]);

  useLayoutEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const img = ctx.createImageData(cw, ch);
    const data = img.data;
    const t = frame / fps;
    const dv = clamp01(dive);
    const diveE = dv * dv * dv;
    const travel = t * speed + diveE * 5;
    const spinA = t * spin * TAU + diveE * 1.2;
    const m = Math.min(cw, ch) * 0.5;
    const vx = center.x * cw + noise2D(`${seed}-vx`, t * 0.12, 0) * drift * 2 * m;
    const vy = center.y * ch + noise2D(`${seed}-vy`, 0, t * 0.12) * drift * 2 * m;
    const holeR = hole * 2 * (1 + diveE * 16);
    const lightA = ((lightAngle + t * 10) * Math.PI) / 180 + noise2D(`${seed}-l`, t * 0.2, 3) * 0.25;
    const ex = exposure;
    const phosphor = look === 'phosphor';
    const L = [0, 0.3, 0.62, 0.88];
    let o = 0;
    for (let y = 0; y < ch; y++) {
      const dy = ((y + 0.5 - vy) / m) * 1.12;
      for (let x = 0; x < cw; x++) {
        const dx = (x + 0.5 - vx) / m;
        const d = Math.sqrt(dx * dx + dy * dy) + 1e-4;
        const a = Math.atan2(dy, dx);
        const z = 1 / d;
        const u = z * 0.85 + travel;
        const ang = a + twist * z + spinA;
        // broad light patches + long streaks (fine in angle, long in depth) that stream outward with travel
        const n1 = sampleTable(table, (ang / TAU) * NA, u * U_CELLS * 0.6);
        const n2 = sampleTable(table, (ang / TAU) * NA * 4 + 17, u * U_CELLS * 0.18 + 9);
        const streak = smooth(0.42, 0.88, n2);
        const ring = 0.5 + 0.5 * Math.cos(u * 1.6 * TAU);
        const wall = (0.5 + 0.32 * n1 + 0.26 * streak) * (0.9 + 0.1 * ring * ring);
        const facing = 0.5 + 0.5 * Math.cos(a - lightA);
        const lit = 0.42 + 0.58 * facing * facing;
        const fog = smooth(holeR, holeR * 2.7, d);
        const near = 1 - 0.6 * smooth(0.85, 2.1, d);
        const rd = (d - holeR * 1.1) / (holeR * 0.17);
        const rim = Math.exp(-rd * rd) * facing * facing * facing * (1 - diveE);
        let v = (wall * lit * fog * near * 0.86 + rim * 0.95) * ex;
        if (v > 1) v = 1;
        if (phosphor) {
          let k = 0;
          while (k < 2 && v > L[k + 1]) k++;
          let c0 = levels[k];
          if (v >= L[3]) {
            c0 = levels[3];
          } else {
            const lt = (v - L[k]) / (L[k + 1] - L[k]);
            const th = (BAYER8[(y & 7) * 8 + (x & 7)] + 0.5) / 64;
            c0 = lt > th ? levels[k + 1] : levels[k];
          }
          const dim = y % 3 === 2 ? 0.7 : 1;
          data[o] = c0[0] * dim;
          data[o + 1] = c0[1] * dim;
          data[o + 2] = c0[2] * dim;
        } else {
          // noise dither ±1 LSB kills banding in the smooth ramp (integer hash, re-seeded per frame)
          let h = Math.imul(x + 1, 374761393) ^ Math.imul(y + 1, 668265263) ^ Math.imul((frame % 61) + 1, 1442695041);
          h = Math.imul(h ^ (h >>> 13), 1274126177);
          const h1 = ((h ^ (h >>> 16)) & 1023) / 1023;
          const idx = Math.max(0, Math.min(255, Math.round(v * 255 + (h1 - 0.5) * 1.6))) * 3;
          data[o] = lut[idx];
          data[o + 1] = lut[idx + 1];
          data[o + 2] = lut[idx + 2];
        }
        data[o + 3] = 255;
        o += 4;
      }
    }
    ctx.putImageData(img, 0, 0);
  });

  return (
    <AbsoluteFill style={{background: pal.ink}}>
      <canvas ref={ref} width={cw} height={ch} style={{width: '100%', height: '100%', imageRendering: look === 'phosphor' ? 'pixelated' : 'auto'}} />
    </AbsoluteFill>
  );
};

// ───────────────────────────── PortalZoom ─────────────────────────────

type Metrics = {ascent: number; descent: number; xHeight: number};

/** Font metrics (ascent, descent, x-height) from canvas measureText once the font is loaded (holds the render). */
export const useFontMetrics = (family: string, weight: React.CSSProperties['fontWeight'], size: number): Metrics => {
  const fallback = {ascent: size * 0.95, descent: size * 0.25, xHeight: size * 0.52};
  const [m, setM] = useState<Metrics | null>(null);
  const [handle] = useState(() => delayRender(`font metrics ${family}`));
  const done = useRef(false);
  useLayoutEffect(() => {
    let cancelled = false;
    const font = `${weight ?? 400} ${size}px "${family}"`;
    fontReady([family])
      .then(() => document.fonts.load(font, 'Yxou'))
      .catch(() => [])
      .then(() => {
        if (cancelled) return;
        const ctx = document.createElement('canvas').getContext('2d');
        if (ctx) {
          ctx.font = font;
          const t = ctx.measureText('x');
          setM({ascent: t.fontBoundingBoxAscent, descent: t.fontBoundingBoxDescent, xHeight: t.actualBoundingBoxAscent});
        } else {
          setM(fallback);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [family, weight, size]);
  useEffect(() => {
    if (m && !done.current) {
      done.current = true;
      continueRender(handle);
    }
  }, [m, handle]);
  return m ?? fallback;
};

/**
 * A word with a round hole where one letter was ("N●w"): text laid out around the portal, which sits at (0, 0) of the parent
 * anchor. The disc's centre lands on the middle of the x-height and the baseline is shared, measured from the font itself.
 * Use it as `outgoing` of <PortalZoom>.
 */
export const PortalWord: React.FC<{before?: string; after?: string; size: number; style: React.CSSProperties; gap?: number}> = ({before = '', after = '', size, style, gap}) => {
  const fs = Number(style.fontSize ?? 200);
  const m = useFontMetrics(firstFamily(String(style.fontFamily ?? 'sans-serif')), style.fontWeight, fs);
  const g = gap ?? size * 0.07;
  const top = m.xHeight / 2 - m.ascent;
  const common: React.CSSProperties = {...style, position: 'absolute', top, lineHeight: `${m.ascent + m.descent}px`, whiteSpace: 'pre', margin: 0};
  return (
    <>
      <div style={{...common, right: size / 2 + g, textAlign: 'right'}}>{before}</div>
      <div style={{...common, left: size / 2 + g, textAlign: 'left'}}>{after}</div>
    </>
  );
};

/** Suggested portal diameter for a font size: the x-height plus round-letter overshoot (x-height ≈ 0.52 em in most grotesks). */
export const portalSizeFor = (fontSize: number, xHeightEm = 0.52) => fontSize * xHeightEm * 1.1;

/**
 * Zoom through a window into the next scene. Before `at`: `outgoing` sits around a disc of `size` px at (x, y) that already
 * shows `children` (the next scene, alive, scaled down). From `at`, the outgoing layer scales on ln(scale) with portalEase until
 * the disc covers the frame; the scene inside grows less than the disc (parallax, measured ~5× vs ~14×). After the zoom only
 * `children` render.
 */
export const PortalZoom: React.FC<{
  /** frame the zoom starts */
  at: number;
  /** zoom frames (default MARK_T.portalZoom) */
  duration?: number;
  /** disc diameter at rest, px */
  size: number;
  /** disc centre at rest, px (default frame centre); it drifts to the centre during the zoom */
  x?: number;
  y?: number;
  /** what surrounds the portal, positioned relative to the disc centre (e.g. <PortalWord/>) */
  outgoing: React.ReactNode;
  /** scene scale inside the disc at rest (default fits the scene's short side to 1.35× the disc) */
  innerScale?: number;
  /** thin rim on the disc while small (glass edge); default the palette's hot tone */
  rim?: string | false;
  /** max blur of the outgoing layer in screen px at peak speed */
  maxBlur?: number;
  /** disc background behind the scene (default ink) */
  palette?: MarkPalette;
  children: React.ReactNode;
}> = ({at, duration, size, x, y, outgoing, innerScale, rim, maxBlur = 14, palette, children}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const pal = usePalette(palette);
  const dur = duration ?? Math.round(MARK_T.portalZoom * (fps / 30));
  if (frame >= at + dur) return <AbsoluteFill>{children}</AbsoluteFill>;
  const rimColor = rim === false ? undefined : rim ?? pal.hot;
  const px = x ?? W / 2;
  const py = y ?? H / 2;
  const reach = 2 * Math.hypot(W / 2, H / 2);
  const lnEnd = Math.log((reach * 1.04) / size);
  const ease = (f: number) => portalEase(clamp01((f - at) / dur));
  const e = ease(frame);
  const S = Math.exp(lnEnd * e);
  const s0 = innerScale ?? (1.35 * size) / Math.min(W, H);
  // inner scene grows less than the disc (parallax) but must always cover disc ∩ frame
  const sIn = Math.max(Math.exp(Math.log(s0) * (1 - e)), Math.min(1, (size * S * 1.02) / Math.min(W, H)));
  const speed = (e - ease(frame - 1)) * lnEnd; // d ln(scale) per frame
  const blur = Math.min(maxBlur, speed * 26);
  const ax = lerp(px, W / 2, e);
  const ay = lerp(py, H / 2, e);
  const small = 1 - clamp01((S - 1) / 2.2);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: ax, top: ay, width: 0, height: 0, transform: `scale(${S})`, transformOrigin: '0 0'}}>
        <div style={{position: 'absolute', left: 0, top: 0, filter: blur > 0.3 ? `blur(${blur / S}px)` : undefined, opacity: 1 - clamp01((e - 0.85) / 0.15)}}>{outgoing}</div>
        <div
          style={{
            position: 'absolute',
            left: -size / 2,
            top: -size / 2,
            width: size,
            height: size,
            borderRadius: '50%',
            overflow: 'hidden',
            background: pal.ink,
            boxShadow: rimColor && small > 0 ? `0 0 0 ${1.2 / S}px ${alpha(rimColor, 0.55 * small)}` : undefined,
          }}
        >
          <div style={{position: 'absolute', left: size / 2 - W / 2, top: size / 2 - H / 2, width: W, height: H, transform: `scale(${sIn / S})`, transformOrigin: '50% 50%'}}>
            {children}
          </div>
          {small > 0 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                opacity: small,
                background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.55) 100%)`,
              }}
            />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * A phrase in depth: enters from far away (scale 0.55 → 1, blur 10 → 0, 5 f), creeps toward the camera on an accelerating
 * push, and leaves past it (scale → ×1.35, blur → 10, 4 f). Shows between `at` and `until`. Pair with BrandTunnel.
 */
export const DepthPhrase: React.FC<{text: React.ReactNode; at: number; until: number; style?: React.CSSProperties}> = ({text, at, until, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  if (frame < at || frame > until) return null;
  const k = fps / 30;
  const inF = MARK_T.phraseIn * k;
  const outF = MARK_T.phraseOut * k;
  const tin = clamp01((frame - at) / inF);
  const tout = clamp01((frame - (until - outF)) / outF);
  const hold = clamp01((frame - at) / Math.max(1, until - at));
  const scale = lerp(0.55, 1, easings.outExpo(tin)) * (1 + 0.07 * easings.inQuad(hold)) * (1 + 0.35 * easings.inQuad(tout));
  const blur = 10 * (1 - easings.outQuint(tin)) + 10 * easings.inQuad(tout);
  const opacity = easings.outQuint(tin) * (1 - easings.inQuad(tout));
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          fontFamily: b.font.display,
          fontWeight: b.type.displayWeight,
          letterSpacing: `${b.type.displayTracking}em`,
          fontSize: 84,
          color: b.colors.fg,
          transform: `scale(${scale})`,
          filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
          opacity,
          textAlign: 'center',
          whiteSpace: 'pre',
          ...style,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────────── HorizonArc ─────────────────────────────

export type HorizonArcProps = {
  /** frame the planet starts rising */
  at?: number;
  /** rise frames (springs.heavy stretched to this) */
  rise?: number;
  /** frame the rim starts to light (default at + 6) */
  lightAt?: number;
  /** rim light-on frames (measured 12) */
  lightFrames?: number;
  /** planet radius px (default 0.42 W landscape, 0.82 W portrait; measured 0.39 W) */
  radius?: number;
  /** rim top at rest, fraction of H (default 0.62 landscape, 0.70 portrait) */
  top?: number;
  /** rise distance px (default 0.16 H) */
  travel?: number;
  /** extra sink after rest, px (animate for the exit) */
  sink?: number;
  /** overall light 0..1 (animate down to dim the arc under an end card) */
  intensity?: number;
  /** anamorphic flare on top of the rim */
  flare?: boolean;
  palette?: MarkPalette;
  /** content hidden by the planet body (it rises from behind the horizon) */
  behind?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * Planet-rim horizon: a dark disc far bigger than the frame, centred below it, with a white-hot rim (4–5 px), a brand-colour
 * glow that falls off over ~90 px and a wide atmosphere. Rises on a heavy spring while the rim lights in 12 frames.
 */
export const HorizonArc: React.FC<HorizonArcProps> = ({
  at = 0,
  rise,
  lightAt,
  lightFrames,
  radius,
  top,
  travel,
  sink = 0,
  intensity = 1,
  flare = true,
  palette,
  behind,
  children,
}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const pal = usePalette(palette);
  const k = fps / 30;
  const portrait = H > W;
  const R = radius ?? (portrait ? W * 0.82 : W * 0.42);
  const topY = (top ?? (portrait ? 0.7 : 0.62)) * H;
  const trav = travel ?? H * 0.16;
  const p = spring({frame: frame - at, fps, config: springs.heavy, durationInFrames: Math.round((rise ?? 30) * k)});
  const cx = W / 2;
  const cy = topY + R + trav * (1 - p) + sink;
  const breathe = 1 + 0.035 * noise2D('horizon', frame / (fps * 1.6), 0);
  const L = lightCurve(frame, lightAt ?? at + 6 * k, {frames: (lightFrames ?? MARK_T.rimLightOn) * k}) * intensity * breathe;
  const id = useSvgId('arc');
  const sc = Math.min(W, H) / 1080;
  const atmR = R + 300 * sc;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id={`${id}-atmo`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r={atmR}>
            <stop offset={(R - 2) / atmR} stopColor={pal.core} stopOpacity={0} />
            <stop offset={R / atmR} stopColor={pal.core} stopOpacity={0.4 * L} />
            <stop offset={(R + 45 * sc) / atmR} stopColor={pal.core} stopOpacity={0.15 * L} />
            <stop offset={(R + 130 * sc) / atmR} stopColor={pal.deep} stopOpacity={0.24 * L} />
            <stop offset={1} stopColor={pal.deep} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-fall`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy - R} r={R * 1.25}>
            <stop offset={0} stopColor="#fff" stopOpacity={1} />
            <stop offset={0.55} stopColor="#fff" stopOpacity={0.85} />
            <stop offset={1} stopColor="#fff" stopOpacity={0.22} />
          </radialGradient>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
            <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-fall)`} />
          </mask>
          <filter id={`${id}-b1`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={26 * sc} />
          </filter>
          <filter id={`${id}-b2`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={7 * sc} />
          </filter>
        </defs>
        <circle cx={cx} cy={cy} r={atmR} fill={`url(#${id}-atmo)`} />
        <g mask={`url(#${id}-mask)`}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={pal.core} strokeWidth={16 * sc} opacity={Math.min(1, 0.9 * L)} filter={`url(#${id}-b1)`} />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={pal.hot} strokeWidth={5 * sc} opacity={Math.min(1, L)} filter={`url(#${id}-b2)`} />
        </g>
      </svg>
      <Dither
        mask={`radial-gradient(circle ${atmR}px at ${cx}px ${cy}px, rgba(0,0,0,0) ${R - 4}px, #000 ${R + 6 * sc}px, rgba(0,0,0,0.6) ${R + 130 * sc}px, rgba(0,0,0,0) ${atmR}px)`}
        amount={0.07 * Math.min(1, L)}
      />
      {behind ? <AbsoluteFill>{behind}</AbsoluteFill> : null}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <filter id={`${id}-b3`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={0.9 * sc} />
          </filter>
          <filter id={`${id}-fl`} x="-60%" y="-800%" width="220%" height="1700%">
            <feGaussianBlur stdDeviation={`${70 * sc} ${3.5 * sc}`} />
          </filter>
        </defs>
        <circle cx={cx} cy={cy} r={R} fill={pal.ink} />
        <g mask={`url(#${id}-mask)`}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={pal.spark} strokeWidth={4.5 * sc} opacity={Math.min(1, L)} filter={`url(#${id}-b3)`} />
        </g>
        {flare ? <ellipse cx={cx} cy={cy - R} rx={R * 0.45} ry={5 * sc} fill={pal.spark} opacity={Math.min(1, 0.6 * L)} filter={`url(#${id}-fl)`} /> : null}
      </svg>
      {children ? <AbsoluteFill>{children}</AbsoluteFill> : null}
    </AbsoluteFill>
  );
};

// ───────────────────────────── MarkHalo ─────────────────────────────

/**
 * The light behind a lit mark (measured halo profile): a tight core glow ≈ 2.3× the mark and a deep field ≈ 6× the mark.
 * Centred on the parent box (width × height).
 */
export const MarkHalo: React.FC<{width: number; height: number; amount: number; palette?: MarkPalette}> = ({width, height, amount, palette}) => {
  const pal = usePalette(palette);
  if (amount <= 0.001) return null;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: width / 2 - width * 3,
          top: height / 2 - height * 3,
          width: width * 6,
          height: height * 6,
          background: `radial-gradient(closest-side, ${alpha(pal.deep, 0.6 * amount)} 0%, ${alpha(pal.deep, 0.24 * amount)} 40%, rgba(0,0,0,0) 100%)`,
        }}
      >
        <Dither mask="radial-gradient(closest-side, #000 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)" amount={0.06 * Math.min(1, amount)} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: width / 2 - width * 1.15,
          top: height / 2 - height * 1.15,
          width: width * 2.3,
          height: height * 2.3,
          background: `radial-gradient(closest-side, ${alpha(pal.core, 0.34 * amount)} 0%, ${alpha(pal.core, 0.1 * amount)} 55%, rgba(0,0,0,0) 100%)`,
        }}
      />
    </>
  );
};

/** Bloom radius on a lit mark. */
const markBloom = (w: number) => Math.max(4, w * 0.03);

// ───────────────────────────── GlassMark ─────────────────────────────

export type GlassMarkProps = {
  /** the mark: inline vector or image with alpha (its alpha is the glass shape). Default: the brand's logo */
  mark?: MarkSource;
  /** display width px */
  width: number;
  /** display height px (default width × the mark's aspect) */
  height?: number;
  /** frame the first strip starts */
  at?: number;
  /** number of glass strips */
  strips?: number;
  /** 'y' = horizontal strips that flip on X like blinds; 'x' = vertical strips that flip on Y */
  axis?: 'x' | 'y';
  /** snap cuts to a source pixel grid along the axis (pixel-art marks: their row / column count) so no strip splits a pixel */
  grid?: number;
  /** how far the strips start (1 = default explode) */
  spread?: number;
  /** frames between strips (default 2) */
  stagger?: number;
  order?: 'center' | 'start' | 'random';
  /** frames each strip takes to land (springs.heavy stretched; default 30) */
  settle?: number;
  /** brightness of the clean mark before its light-on (measured dim mark ≈ 45 % of lit); the glass is lit by its speculars */
  dim?: number;
  pixelated?: boolean;
  halo?: boolean;
  glint?: boolean;
  /** extra light multiplier (animate down for a lights-off exit) */
  light?: number;
  palette?: MarkPalette;
  seed?: string;
  style?: React.CSSProperties;
};

/** Frame (relative to `at`) at which a GlassMark is fully assembled and lit; use it to chain the next beat. */
export const glassMarkDone = (strips = 7, opts: {stagger?: number; settle?: number; fps?: number} = {}) => {
  const k = (opts.fps ?? 30) / 30;
  const gap = opts.stagger ?? 2 * k;
  return (strips - 1) * gap + (opts.settle ?? 30) * k;
};

/**
 * A mark assembled from glass strips: strips fly in exploded and flip into place on a heavy spring (no overshoot, as measured),
 * each one flashing a specular when its angle crosses the light; the glass body shows a refracted, blurred copy of the mark
 * inside; cut edges catch light while apart. Then the glass clears into the exact clean mark, the light turns on (14 f, halo
 * lags 5 f) and one glint sweeps across. Works with any mark.
 */
export const GlassMark: React.FC<GlassMarkProps> = ({
  mark,
  width,
  height: heightProp,
  at = 0,
  strips = 7,
  axis = 'y',
  grid,
  spread = 1,
  stagger,
  order = 'center',
  settle,
  dim = 0.55,
  pixelated = false,
  halo = true,
  glint = true,
  light: lightMul = 1,
  palette,
  seed = 'glass',
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pal = usePalette(palette);
  const ms = useMarkSource(mark);
  const src = ms.src;
  const height = heightProp ?? width * ms.aspect;
  const k = fps / 30;
  const gap = stagger ?? 2 * k;
  const land = (settle ?? 30) * k;
  const id = useSvgId('glass');
  const len = axis === 'y' ? height : width;
  const cuts = Array.from({length: strips + 1}, (_, i) => (grid ? Math.round((i / strips) * grid) * (len / grid) : (i / strips) * len));
  const ranks = useMemo(() => {
    const idx = Array.from({length: strips}, (_, i) => i);
    const mid = (strips - 1) / 2;
    const key = (i: number) => (order === 'start' ? i : order === 'random' ? random(`${seed}-o${i}`) : Math.abs(i - mid) + random(`${seed}-o${i}`) * 0.01);
    const sorted = [...idx].sort((a, b) => key(a) - key(b));
    const r = new Array<number>(strips);
    sorted.forEach((s, n) => (r[s] = n));
    return r;
  }, [strips, order, seed]);
  const lastStart = (strips - 1) * gap;
  const done = at + lastStart + land;
  const g = 1 - easings.inOutSine(clamp01((frame - (at + lastStart + 14 * k)) / (land - 14 * k)));
  const lightAt = at + lastStart + 12 * k;
  const lit = lightCurve(frame, lightAt, {frames: MARK_T.lightOn * k}) * lightMul;
  const bright = dim + (1 - dim) * lit;
  const haloL = lightCurve(frame, lightAt + MARK_T.haloLag * k, {frames: MARK_T.haloBuild * k}) * lightMul;
  const gt = clamp01((frame - (lightAt + 8 * k)) / (MARK_T.glint * k));
  const img: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width, height, backgroundImage: `url("${src}")`, backgroundSize: '100% 100%', imageRendering: pixelated ? 'pixelated' : 'auto'};
  const assembled = frame >= done;
  const u = width / 480;

  const stripEls = assembled
    ? null
    : Array.from({length: strips}, (_, i) => {
        const start = at + ranks[i] * gap;
        if (frame < start) return null;
        const p = spring({frame: frame - start, fps, config: springs.heavy, durationInFrames: land});
        const q = 1 - p;
        const a0 = cuts[i];
        const a1 = cuts[i + 1];
        const sz = a1 - a0;
        if (sz <= 0) return null;
        const sgn = i % 2 ? 1 : -1;
        const off = (a0 + a1) / 2 - len / 2;
        const along = off * 1.1 * spread * q;
        const across = (random(`${seed}-x${i}`) - 0.5) * (axis === 'y' ? width : height) * 0.7 * spread * q;
        const rot = sgn * 72 * spread * q;
        const rz = (random(`${seed}-r${i}`) - 0.5) * 12 * spread * q;
        const tz = -240 * spread * q;
        const tx = axis === 'y' ? across : along;
        const ty = axis === 'y' ? along : across;
        const rotCss = axis === 'y' ? `rotateX(${rot}deg)` : `rotateY(${rot}deg)`;
        const op = clamp01((frame - start) / (6 * k));
        const angle = Math.abs(rot);
        const spec = Math.exp(-(((angle - 24) / 13) ** 2)) + 0.14;
        const sweep = lerp(95, 5, p) + (i / strips) * 10;
        const fringe = 3 * q * g;
        const box: React.CSSProperties =
          axis === 'y' ? {position: 'absolute', left: 0, top: a0, width, height: sz} : {position: 'absolute', left: a0, top: 0, width: sz, height};
        const inner: React.CSSProperties = {position: 'absolute', left: axis === 'y' ? 0 : -a0, top: axis === 'y' ? -a0 : 0, width, height};
        const edgeO = g * (0.2 + 0.8 * q);
        const edge = (side: 'a' | 'b'): React.CSSProperties => {
          const t = Math.max(1.5, 2 * u);
          const pos: React.CSSProperties =
            axis === 'y' ? {left: 0, width, height: t, top: side === 'a' ? 0 : sz - t} : {top: 0, height, width: t, left: side === 'a' ? 0 : sz - t};
          const mx = axis === 'y' ? 0 : -a0 - (side === 'a' ? 0 : sz - t);
          const my = axis === 'y' ? -a0 - (side === 'a' ? 0 : sz - t) : 0;
          return {position: 'absolute', ...pos, background: side === 'a' ? pal.spark : pal.hot, ...maskOf(src, width, height, mx, my), opacity: edgeO * (side === 'a' ? 1 : 0.6)};
        };
        return (
          <div
            key={i}
            style={{
              ...box,
              transform: `translate3d(${tx}px, ${ty}px, ${tz}px) ${rotCss} rotateZ(${rz}deg)`,
              opacity: op,
              filter: fringe > 0.2 ? `drop-shadow(${-fringe}px 0 0 ${alpha(pal.hot, 0.6)}) drop-shadow(${fringe}px 0 0 ${alpha(pal.core, 0.6)})` : undefined,
            }}
          >
            <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
              <div style={inner}>
                {/* the clean mark, revealed as the glass clears; it carries the light-on */}
                <div style={{...img, opacity: 1 - g, filter: `brightness(${bright})`}} />
                {/* glass: crisp silhouette (mask after filter), thin rim light outside it */}
                <div style={{position: 'absolute', inset: 0, opacity: g, filter: `drop-shadow(0 0 ${1.2 * u}px ${alpha(pal.spark, 0.9)}) drop-shadow(0 0 ${7 * u}px ${alpha(pal.core, 0.55)})`}}>
                  <div style={{position: 'absolute', inset: 0, ...maskOf(src, width, height)}}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(172deg, ${alpha(pal.hot, 0.38)} 0%, ${alpha(pal.core, 0.5)} 26%, ${alpha(pal.core, 0.32)} 60%, ${alpha(pal.deep, 0.9)} 100%)`,
                      }}
                    />
                    {/* refraction: the mark seen through the glass, displaced; the silhouette above stays crisp */}
                    <div style={{...img, filter: `url(#${id}-d${i}) saturate(0.8) brightness(0.85)`, opacity: 0.3, mixBlendMode: 'screen'}} />
                    {/* internal caustic: blurred hot copy sliding against the strip's motion */}
                    <div style={{...img, filter: 'blur(6px) brightness(1.8)', transform: `translate(${-tx * 0.2}px, ${-ty * 0.2}px)`, mixBlendMode: 'screen', opacity: 0.24}} />
                    {/* specular that flashes as the strip's angle crosses the light */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(${axis === 'y' ? 104 : 14}deg, rgba(0,0,0,0) 41%, ${alpha(pal.spark, 0.95)} 50%, rgba(0,0,0,0) 59%)`,
                        backgroundSize: '300% 100%',
                        backgroundPosition: `${sweep}% 0`,
                        mixBlendMode: 'screen',
                        opacity: Math.min(1, spec),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={edge('a')} />
            <div style={edge('b')} />
          </div>
        );
      });

  return (
    <div style={{position: 'relative', width, height, ...style}}>
      <svg width={0} height={0} style={{position: 'absolute'}} aria-hidden>
        <defs>
          {!assembled &&
            Array.from({length: strips}, (_, i) => {
              const start = at + ranks[i] * gap;
              const p = frame < start ? 0 : spring({frame: frame - start, fps, config: springs.heavy, durationInFrames: land});
              return (
                <filter key={i} id={`${id}-d${i}`} x="-10%" y="-30%" width="120%" height="160%">
                  <feTurbulence type="fractalNoise" baseFrequency={axis === 'y' ? '0.012 0.05' : '0.05 0.012'} numOctaves={2} seed={3 + i} result="n" />
                  <feDisplacementMap in="SourceGraphic" in2="n" scale={(6 + 24 * (1 - p)) * u} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              );
            })}
        </defs>
      </svg>
      {halo && <MarkHalo width={width} height={height} amount={haloL} palette={pal} />}
      <div style={{position: 'absolute', inset: 0}}>
        <Bloom color={pal.core} radius={markBloom(width)} intensity={0.2 + 0.7 * lit} field={0.6} under style={{position: 'absolute', left: 0, top: 0}}>
          <div style={{position: 'relative', width, height, perspective: width * 2.4}}>
            {assembled ? <div style={{...img, filter: bright < 0.999 ? `brightness(${bright})` : undefined}} /> : stripEls}
            {glint && gt > 0 && gt < 1 && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(105deg, rgba(0,0,0,0) 45%, ${alpha(pal.spark, 0.8)} 50%, rgba(0,0,0,0) 55%)`,
                  backgroundSize: '300% 100%',
                  backgroundPosition: `${lerp(92, 8, easings.inOutSine(gt))}% 0`,
                  mixBlendMode: 'screen',
                  ...maskOf(src, width, height),
                  opacity: Math.sin(Math.PI * gt),
                }}
              />
            )}
          </div>
        </Bloom>
      </div>
    </div>
  );
};

// ───────────────────────────── ParticleForm ─────────────────────────────

type Dot = {tx: number; ty: number; col: number; row: number; r: number; g: number; b: number; lum: number; r1: number; r2: number; r3: number};

export type ParticleFormProps = {
  /** target shape: inline vector or image with alpha. Default: the brand's logo */
  mark?: MarkSource;
  /** shape display width px */
  width: number;
  /** shape display height px (default width × the mark's aspect) */
  height?: number;
  /** shape centre offset from the frame centre, px */
  x?: number;
  y?: number;
  /** frame the first dots launch */
  at?: number;
  /** frames each dot flies (default 36) */
  duration?: number;
  /** frames over which launches are spread: columns sweep left → right with jitter (default 24) */
  spread?: number;
  /** grid pitch px [column, row]; ~[15, 4.5] at 1080p reads as dot columns (default width/48 by a third of that) */
  pitch?: [number, number];
  /** dot size px */
  dot?: number;
  /** where the dots come from */
  from?: 'scatter' | 'left' | 'right' | 'sides' | 'below';
  /** gather: scattered → shape. scatter: shape → scattered (reverse) */
  mode?: 'gather' | 'scatter';
  /** 'source' keeps each sample's colour (the mark keeps its colours), 'palette' maps luminance to core → hot */
  colorMode?: 'source' | 'palette';
  /** additive glow blur px (0 = off) */
  glow?: number;
  /** per-column brightness variation 0..1 (measured columns vary 40–100 %) */
  flicker?: number;
  /** samples darker than this stay holes (dark details inside a mark) */
  minLum?: number;
  /** 'add' = light (dark backgrounds), 'normal' = paint (light backgrounds). Default from the brand theme */
  blend?: 'add' | 'normal';
  palette?: MarkPalette;
  seed?: string;
};

/** Frame (relative to `at`) when every dot of a ParticleForm has landed. */
export const particleFormDone = (opts: {duration?: number; spread?: number; fps?: number} = {}) => {
  const k = (opts.fps ?? 30) / 30;
  return ((opts.duration ?? 36) + (opts.spread ?? 24)) * k;
};

/**
 * Deterministic dots on a column grid that gather into any shape ("scattered → understood").
 * Canvas; the mark is sampled once (delayRender), every dot's flight is a pure function of the frame.
 */
export const ParticleForm: React.FC<ParticleFormProps> = ({
  mark,
  width,
  height: heightProp,
  x = 0,
  y = 0,
  at = 0,
  duration = 36,
  spread = 24,
  pitch,
  dot,
  from = 'scatter',
  mode = 'gather',
  colorMode = 'source',
  glow = 7,
  flicker = 0.35,
  minLum = 0.04,
  blend,
  palette,
  seed = 'particles',
}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const b = useBrand();
  const pal = usePalette(palette);
  const ms = useMarkSource(mark);
  const src = ms.src;
  const height = heightProp ?? width * ms.aspect;
  const k = fps / 30;
  const ref = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<Dot[] | null>(null);
  const [handle] = useState(() => delayRender('ParticleForm: sampling the mark'));
  const released = useRef(false);
  const [px, py] = pitch ?? [width / 48, width / 48 / 3];
  const dotSize = dot ?? Math.max(1.5, px * 0.24);
  const additive = (blend ?? (b.theme === 'dark' ? 'add' : 'normal')) === 'add';

  useLayoutEffect(() => {
    let cancelled = false;
    const im = new Image();
    im.onload = () => {
      if (cancelled) return;
      const c = document.createElement('canvas');
      c.width = Math.round(width);
      c.height = Math.round(height);
      const ctx = c.getContext('2d');
      if (!ctx) return setDots([]);
      ctx.drawImage(im, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      const out: Dot[] = [];
      const cols = Math.floor(width / px);
      const rows = Math.floor(height / py);
      for (let ci = 0; ci < cols; ci++) {
        for (let ri = 0; ri < rows; ri++) {
          const sx = Math.min(c.width - 1, Math.floor(ci * px + px / 2));
          const sy = Math.min(c.height - 1, Math.floor(ri * py + py / 2));
          const o = (sy * c.width + sx) * 4;
          if (data[o + 3] < 128) continue;
          const lum = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
          if (lum < minLum) continue;
          out.push({
            tx: ci * px + px / 2 - width / 2,
            ty: ri * py + py / 2 - height / 2,
            col: ci,
            row: ri,
            r: data[o],
            g: data[o + 1],
            b: data[o + 2],
            lum,
            r1: random(`${seed}-a${ci}-${ri}`),
            r2: random(`${seed}-b${ci}-${ri}`),
            r3: random(`${seed}-c${ci}-${ri}`),
          });
        }
      }
      setDots(out);
    };
    im.onerror = () => !cancelled && setDots([]);
    im.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, width, height, px, py, seed, minLum]);

  useEffect(() => {
    if (dots && !released.current) {
      released.current = true;
      continueRender(handle);
    }
  }, [dots, handle]);

  const layer = useMemo(() => (typeof document === 'undefined' ? null : document.createElement('canvas')), []);

  useLayoutEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx || !dots || !layer) return;
    layer.width = W;
    layer.height = H;
    const lc = layer.getContext('2d');
    if (!lc) return;
    lc.clearRect(0, 0, W, H);
    const cols = Math.max(1, Math.floor(width / px));
    const ox = W / 2 + x;
    const oy = H / 2 + y;
    const core = rgbOf(pal.core);
    const hot = rgbOf(pal.hot);
    const dur = duration * k;
    const spr = spread * k;
    const colFl = Array.from({length: cols + 1}, (_, ci) => 1 - flicker * (0.5 + 0.5 * noise2D(`${seed}-f`, ci * 0.35, frame * 0.07)));
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const {r1, r2, r3} = d;
      const tx = ox + d.tx;
      const ty = oy + d.ty;
      const side = from === 'sides' ? (d.tx < 0 ? 'left' : 'right') : from;
      let sx: number;
      let sy: number;
      if (side === 'left') {
        sx = -W * (0.05 + r1 * 0.35);
        sy = ty + (r2 - 0.5) * H * 0.5;
      } else if (side === 'right') {
        sx = W * (1.05 + r1 * 0.35);
        sy = ty + (r2 - 0.5) * H * 0.5;
      } else if (side === 'below') {
        sx = tx + (r1 - 0.5) * W * 0.6;
        sy = H * (1.05 + r2 * 0.4);
      } else {
        sx = W * (r1 * 1.3 - 0.15);
        sy = H * (r2 * 1.3 - 0.15);
      }
      const sweepPos = from === 'sides' ? Math.abs(d.tx) / (width / 2) : d.col / cols;
      const delay = (from === 'sides' ? 1 - sweepPos : sweepPos) * spr * 0.65 + r3 * spr * 0.35;
      const q = clamp01((frame - at - delay) / dur);
      const e = mode === 'gather' ? easings.outQuint(q) : 1 - easings.inExpo(q);
      if (mode === 'gather' && q <= 0) continue;
      const curl = 1 - e;
      const nx = noise2D(`${seed}-nx`, d.col * 0.07, frame * 0.025 + d.row * 0.03) * 90 * curl;
      const ny = noise2D(`${seed}-ny`, d.row * 0.05, frame * 0.025 + d.col * 0.03) * 90 * curl;
      const X = lerp(sx, tx, e) + nx;
      const Y = lerp(sy, ty, e) + ny;
      const fl = colFl[Math.min(cols, d.col)];
      const arrive = mode === 'gather' ? clamp01(q * 4) : clamp01((1 - q) * 4);
      const flash = mode === 'gather' ? 1 + 0.6 * Math.exp(-(((q - 0.92) / 0.06) ** 2)) : 1;
      const a = Math.min(1, arrive * fl * flash * (0.55 + 0.45 * d.lum));
      let r = d.r;
      let gg = d.g;
      let bb = d.b;
      if (colorMode === 'palette') {
        r = lerp(core[0], hot[0], d.lum);
        gg = lerp(core[1], hot[1], d.lum);
        bb = lerp(core[2], hot[2], d.lum);
      }
      const s = dotSize * (1 + 0.7 * curl);
      lc.fillStyle = `rgba(${r | 0},${gg | 0},${bb | 0},${a.toFixed(3)})`;
      lc.fillRect(X - s / 2, Y - s / 2, s, s);
    }
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = additive ? 'lighter' : 'source-over';
    if (glow > 0) {
      ctx.filter = `blur(${glow}px)`;
      ctx.globalAlpha = additive ? 1 : 0.35;
      ctx.drawImage(layer, 0, 0);
      ctx.filter = `blur(${glow * 3}px)`;
      ctx.globalAlpha = additive ? 0.6 : 0.2;
      ctx.drawImage(layer, 0, 0);
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
    }
    ctx.drawImage(layer, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <canvas ref={ref} width={W} height={H} style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};
