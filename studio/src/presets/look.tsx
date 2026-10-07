// Look layers (craft: look). CSS/SVG only, so they work on any element without WebGL. Deterministic: noise is seeded
// by the frame. Put them last in a shot so they sit on top of everything.
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {easings} from './easings';

/** Film grain, re-seeded every frame. opacity 0.06–0.15. */
export const Grain: React.FC<{opacity?: number; size?: number; blend?: React.CSSProperties['mixBlendMode']}> = ({opacity = 0.1, size = 0.9, blend = 'overlay'}) => {
  const frame = useCurrentFrame();
  const id = `lf-grain-${String(size).replace('.', '_')}`;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: blend, opacity}}>
      <svg width="100%" height="100%">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency={size} numOctaves={2} seed={frame % 1000} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Vignette, amount 0.2–0.35. */
export const Vignette: React.FC<{amount?: number; color?: string}> = ({amount = 0.3, color = '0,0,0'}) => (
  <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at center, rgba(${color},0) 55%, rgba(${color},${amount}) 100%)`}} />
);

/** CRT scanlines, 3–4 px, 20–30 %. */
export const Scanlines: React.FC<{size?: number; opacity?: number}> = ({size = 4, opacity = 0.25}) => (
  <AbsoluteFill
    style={{pointerEvents: 'none', opacity, mixBlendMode: 'overlay', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,.9) 50%)', backgroundSize: `100% ${size}px`}}
  />
);

/** Gradient scrim for text legibility over footage. */
export const Scrim: React.FC<{direction?: 'bottom' | 'top' | 'center'; amount?: number}> = ({direction = 'center', amount = 0.35}) => {
  const bg =
    direction === 'center'
      ? `radial-gradient(ellipse at center, rgba(0,0,0,${amount}), rgba(0,0,0,0) 70%)`
      : `linear-gradient(to ${direction === 'bottom' ? 'top' : 'bottom'}, rgba(0,0,0,${amount}), rgba(0,0,0,0) 60%)`;
  return <AbsoluteFill style={{pointerEvents: 'none', background: bg}} />;
};

/** RGB split / chromatic aberration by layering three tinted copies; offsets jump every `every` frames when `glitch`. */
export const RGBSplit: React.FC<{amount?: number; glitch?: boolean; every?: number; seed?: string; children: React.ReactNode}> = ({amount = 2, glitch = false, every = 4, seed = 'rgb', children}) => {
  const frame = useCurrentFrame();
  const k = glitch ? Math.floor(frame / every) : 0;
  const jump = glitch ? (random(`${seed}-${k}`) > 0.7 ? 1 + random(`${seed}-a-${k}`) * 6 : 1) : 1;
  const dx = amount * jump;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'url(#lf-rgb-r)', transform: `translateX(${-dx}px)`, mixBlendMode: 'screen'}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{filter: 'url(#lf-rgb-g)', mixBlendMode: 'screen'}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{filter: 'url(#lf-rgb-b)', transform: `translateX(${dx}px)`, mixBlendMode: 'screen'}}>{children}</AbsoluteFill>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id="lf-rgb-r"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
        <filter id="lf-rgb-g"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
        <filter id="lf-rgb-b"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
      </svg>
    </AbsoluteFill>
  );
};

/** Boiling glitch via turbulence + displacement; the noise seed changes every `every` frames. */
export const Glitch: React.FC<{scale?: number; every?: number; children: React.ReactNode}> = ({scale = 20, every = 3, children}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / every);
  const id = `lf-glitch-${scale}`;
  return (
    <div style={{filter: `url(#${id})`, display: 'inline-block'}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves={2} seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {children}
    </div>
  );
};

/** Slice glitch: horizontal bands of the content shifted for the frames where `active` is true. */
export const SliceGlitch: React.FC<{active: boolean; bands?: number; shift?: number; seed?: string; children: React.ReactNode}> = ({active, bands = 8, shift = 40, seed = 'slice', children}) => {
  const frame = useCurrentFrame();
  if (!active) return <AbsoluteFill>{children}</AbsoluteFill>;
  return (
    <AbsoluteFill>
      {Array.from({length: bands}).map((_, i) => {
        const top = (i / bands) * 100;
        const h = 100 / bands;
        const dx = (random(`${seed}-${frame}-${i}`) - 0.5) * 2 * shift;
        return (
          <AbsoluteFill key={i} style={{clipPath: `inset(${top}% 0 ${100 - top - h}% 0)`, transform: `translateX(${dx}px)`}}>
            {children}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

/** Static → resolve: a grid of `cell` px blocks flickers between three tones and clears in a random order. Wrap the shot. */
export const BlockResolve: React.FC<{durationInFrames?: number; cell?: number; tones?: [string, string, string]; seed?: string; children: React.ReactNode}> = ({
  durationInFrames = 20,
  cell = 24,
  tones = ['#000000', '#4A4844', '#B9B6AE'],
  seed = 'resolve',
  children,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 5)});
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  return (
    <AbsoluteFill>
      {children}
      {t < 1 && (
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gridAutoRows: `${cell}px`}}>
          {Array.from({length: cols * rows}).map((_, i) => {
            if (random(`${seed}-${i}`) < t) return <div key={i} />;
            const v = random(`${seed}-static-${i}-${frame}`);
            return <div key={i} style={{background: v > 0.82 ? tones[2] : v > 0.6 ? tones[1] : tones[0]}} />;
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** Flash to a colour on a hit: 2–3 frames, decaying. Default colour: the brand accent. */
export const Flash: React.FC<{atFrame: number; frames?: number; color?: string; peak?: number}> = ({atFrame, frames = 3, color, peak = 1}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  if (frame < atFrame || frame > atFrame + frames) return null;
  const o = interpolate(frame, [atFrame, atFrame + frames], [peak, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outQuad});
  return <AbsoluteFill style={{background: color ?? b.colors.accent, opacity: o, pointerEvents: 'none'}} />;
};

/** Floating UI surface: hairline border, soft large shadow, brand radius and surface colour. */
export const Surface: React.FC<{dark?: boolean; radius?: number; background?: string; style?: React.CSSProperties; children: React.ReactNode}> = ({dark, radius, background, style, children}) => {
  const b = useBrand();
  const isDark = dark ?? b.theme === 'dark';
  return (
    <div
      style={{
        borderRadius: radius ?? b.radius,
        overflow: 'hidden',
        background: background ?? b.colors.surface,
        border: isDark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(0,0,0,.06)',
        boxShadow: isDark ? '0 20px 60px rgba(0,0,0,.45)' : '0 10px 30px rgba(0,0,0,.12)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** The usual launch-film stack: grain + vignette on top of the children. */
export const FilmLook: React.FC<{grain?: number; vignette?: number; children?: React.ReactNode}> = ({grain = 0.1, vignette = 0.3, children}) => (
  <AbsoluteFill>
    {children}
    {vignette > 0 ? <Vignette amount={vignette} /> : null}
    {grain > 0 ? <Grain opacity={grain} /> : null}
  </AbsoluteFill>
);

/** Brand background: flat bg with an optional soft accent glow (x/y in 0..1 of the frame). */
export const BrandBackdrop: React.FC<{glow?: number; x?: number; y?: number; color?: string; style?: React.CSSProperties}> = ({glow = 0.16, x = 0.5, y = 0.42, color, style}) => {
  const b = useBrand();
  const c = color ?? b.colors.accent;
  return (
    <AbsoluteFill
      style={{
        background: glow > 0 ? `radial-gradient(ellipse 70% 60% at ${x * 100}% ${y * 100}%, ${alpha(c, glow)} 0%, ${alpha(c, 0)} 70%), ${b.colors.bg}` : b.colors.bg,
        ...style,
      }}
    />
  );
};
