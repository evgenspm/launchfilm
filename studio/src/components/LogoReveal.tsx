// LogoReveal: the brand mark arrives (from a dot, as glass, from particles, or drawn as a stroke), then the wordmark's
// letters assemble beside or below it while the lockup slides to centre. Everything comes from the current brand
// (logo.mark / logo.src, wordmark font, weight, tracking, case); pass `mark` to override. Deterministic, any aspect.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {evolvePath} from '@remotion/paths';
import {measureText} from '@remotion/layout-utils';
import {useBrand} from '../brand/BrandProvider';
import {contrast, tokenColor} from '../brand/color';
import {useFontsReady} from '../brand/useFontsReady';
import {springs} from '../presets/springs';
import {easings} from '../presets/easings';
import {GlassMark, ParticleForm, glassMarkDone, particleFormDone, useMarkSource, type MarkSource} from '../presets/brandmark';

export type LogoRevealVariant = 'from-dot' | 'glass' | 'particles' | 'draw';

export type LogoRevealProps = {
  variant?: LogoRevealVariant;
  /** frame the reveal starts */
  startFrame?: number;
  /** mark height px (default 17 % of the short side in a row, 22 % stacked) */
  size?: number;
  /** show the brand wordmark after the mark (default true) */
  wordmark?: boolean;
  /** row = wordmark beside the mark, stack = below, auto = row unless the frame is portrait */
  layout?: 'row' | 'stack' | 'auto';
  /** override the brand's mark: inline vector or image (public/ path) */
  mark?: MarkSource;
  /** mark height / width, for image marks (inline vectors read it from their viewBox) */
  markAspect?: number;
  /** wordmark font size as a fraction of the mark height (default 0.62 row, 0.4 stack) */
  wordmarkScale?: number;
  /** fill the frame with the brand background (default true) */
  background?: boolean;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Frames (relative to startFrame, 30 fps scaled) until the mark is complete, per variant. */
export const logoMarkDone = (variant: LogoRevealVariant, fps = 30) => {
  const k = fps / 30;
  if (variant === 'glass') return Math.round(glassMarkDone(7, {fps}));
  if (variant === 'particles') return Math.round(particleFormDone({fps}) - 6 * k);
  if (variant === 'draw') return Math.round(30 * k);
  return Math.round(22 * k);
};

/** Frames (relative to startFrame) until the whole lockup has settled; chain the next beat (a URL, a CTA) from here. */
export const logoRevealDone = (variant: LogoRevealVariant, fps = 30, wordmarkLetters = 8) =>
  logoMarkDone(variant, fps) + Math.round((4 + wordmarkLetters + 16) * (fps / 30));

/** The mark itself, static: inline vector (crisp at any size) or image. */
const StaticMark: React.FC<{mark: MarkSource; src: string; w: number; h: number; style?: React.CSSProperties}> = ({mark, src, w, h, style}) => {
  const b = useBrand();
  if (typeof mark === 'string') return <Img src={src} style={{width: w, height: h, display: 'block', ...style}} />;
  return (
    <svg viewBox={mark.viewBox} width={w} height={h} style={{display: 'block', overflow: 'visible', ...style}}>
      {mark.paths.map((p, i) => (
        <path key={i} d={p.d} fill={tokenColor(p.fill, b.colors, 'accent')} opacity={p.opacity} fillRule={p.fillRule} />
      ))}
    </svg>
  );
};

/** The mark drawn as a stroke (evolvePath), then filled. Image marks fall back to a scale-in. */
const DrawnMark: React.FC<{mark: MarkSource; src: string; w: number; h: number; f: number; k: number}> = ({mark, src, w, h, f, k}) => {
  const b = useBrand();
  if (typeof mark === 'string') {
    const p = clamp01(f / (16 * k));
    return <StaticMark mark={mark} src={src} w={w} h={h} style={{opacity: p, transform: `scale(${0.9 + 0.1 * easings.outExpo(p)})`}} />;
  }
  const vbW = Number(mark.viewBox.split(/[\s,]+/)[2]) || 48;
  const fillP = interpolate(f, [18 * k, 30 * k], [0, 1], {...clamp, easing: easings.outQuad});
  const strokeO = 1 - interpolate(f, [24 * k, 34 * k], [0, 1], clamp);
  return (
    <svg viewBox={mark.viewBox} width={w} height={h} style={{display: 'block', overflow: 'visible'}}>
      {mark.paths.map((p, i) => {
        const c = tokenColor(p.fill, b.colors, 'accent');
        // a stroke that would vanish on the background (white details on a light page) is drawn in the accent instead
        const sc = c.startsWith('#') && contrast(c, b.colors.bg) < 1.6 ? b.colors.accent : c;
        const dp = interpolate(f, [i * 3 * k, i * 3 * k + 22 * k], [0, 1], {...clamp, easing: easings.inOutCubic});
        const evo = evolvePath(dp, p.d);
        return (
          <g key={i} opacity={p.opacity}>
            <path d={p.d} fill={c} fillOpacity={fillP} fillRule={p.fillRule} />
            {strokeO > 0.001 && dp > 0 ? (
              <path
                d={p.d}
                fill="none"
                stroke={sc}
                strokeWidth={vbW * 0.028}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={evo.strokeDasharray}
                strokeDashoffset={evo.strokeDashoffset}
                opacity={strokeO}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

export const LogoReveal: React.FC<LogoRevealProps> = ({
  variant = 'from-dot',
  startFrame = 0,
  size,
  wordmark = true,
  layout = 'auto',
  mark,
  markAspect,
  wordmarkScale,
  background = true,
}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const b = useBrand();
  const ms = useMarkSource(mark, markAspect);
  const k = fps / 30;
  const f = frame - startFrame;
  const stack = layout === 'stack' || (layout === 'auto' && H > W * 1.1);

  // wordmark type, straight from brand.logo
  const l = b.logo ?? {};
  const raw = l.wordmark ?? b.name;
  const text = l.wordmarkCase === 'lower' ? raw.toLowerCase() : l.wordmarkCase === 'upper' ? raw.toUpperCase() : raw;
  const family = b.font[l.wordmarkFont ?? 'display'];
  const weight = l.wordmarkWeight ?? b.type.displayWeight;
  const trackEm = l.wordmarkTracking ?? b.type.displayTracking;
  const ready = useFontsReady([`${weight} 100px ${family}`]);
  if (!ready) return null;

  // sizes: measure at 100 px and scale (tracking is in em, so widths scale linearly)
  const m100 = (s: string) => (s ? measureText({text: s, fontFamily: family, fontSize: 100, fontWeight: String(weight), letterSpacing: `${trackEm}em`}).width : 0);
  const wm100 = wordmark ? m100(text) : 0;
  let mh = size ?? Math.min(W, H) * (stack ? 0.22 : 0.17);
  const scaleW = wordmarkScale ?? (stack ? 0.4 : 0.62);
  let mw = mh / ms.aspect;
  let fs = mh * scaleW;
  let gap = stack ? mh * 0.3 : mh * 0.34;
  const total = () => (stack ? Math.max(mw, (wm100 * fs) / 100) : mw + (wordmark ? gap + (wm100 * fs) / 100 : 0));
  const fit = Math.min(1, (W * 0.84) / Math.max(1, total()));
  mh *= fit;
  mw *= fit;
  fs *= fit;
  gap *= fit;
  const wmW = (wm100 * fs) / 100;

  // timeline
  const markDone = logoMarkDone(variant, fps);
  const shift = wordmark ? spring({frame: f - (markDone - 4 * k), fps, config: springs.ui}) : 0;
  const cx0 = W / 2;
  const cy0 = H / 2;
  const cx = stack ? cx0 : cx0 + (-(mw + gap + wmW) / 2 + mw / 2) * shift;
  const cy = stack ? cy0 - ((fs * 1.1 + gap) / 2) * shift : cy0;
  const markLeft = cx - mw / 2;
  const markTop = cy - mh / 2;

  // the mark, per variant
  let markEl: React.ReactNode = null;
  if (variant === 'from-dot') {
    const pop = spring({frame: f, fps, config: springs.pop});
    const grow = spring({frame: f - 8 * k, fps, config: springs.snappy});
    const dotD = Math.min(mw, mh) * 0.16;
    markEl = (
      <>
        {f >= 0 && grow < 0.98 ? (
          <div
            style={{
              position: 'absolute',
              left: cx - dotD / 2,
              top: cy - dotD / 2,
              width: dotD,
              height: dotD,
              borderRadius: '50%',
              background: b.colors.accent,
              transform: `scale(${pop * (1 + 0.6 * grow)})`,
              opacity: 1 - clamp01(grow * 1.6),
            }}
          />
        ) : null}
        {grow > 0.001 ? (
          <div style={{position: 'absolute', left: markLeft, top: markTop, clipPath: `circle(${(8 + 67 * Math.min(1, grow)).toFixed(2)}% at 50% 50%)`, transform: `scale(${(0.55 + 0.45 * grow).toFixed(4)})`}}>
            <StaticMark mark={ms.mark} src={ms.src} w={mw} h={mh} />
          </div>
        ) : null}
      </>
    );
  } else if (variant === 'draw') {
    markEl = f >= 0 ? (
      <div style={{position: 'absolute', left: markLeft, top: markTop}}>
        <DrawnMark mark={ms.mark} src={ms.src} w={mw} h={mh} f={f} k={k} />
      </div>
    ) : null;
  } else if (variant === 'glass') {
    markEl = (
      <div style={{position: 'absolute', left: markLeft, top: markTop}}>
        <GlassMark mark={ms.mark} width={mw} height={mh} at={startFrame} />
      </div>
    );
  } else {
    // particles gather at the resting (centred) mark, then hand over to the crisp vector before the lockup moves
    const handoff = interpolate(f, [markDone - 10 * k, markDone], [0, 1], clamp);
    markEl = (
      <>
        {f < markDone + 2 ? <ParticleForm mark={ms.mark} width={mw} height={mh} x={cx0 - W / 2} y={cy0 - H / 2} at={startFrame} from="sides" /> : null}
        {handoff > 0 ? (
          <div style={{position: 'absolute', left: markLeft, top: markTop, opacity: handoff}}>
            <StaticMark mark={ms.mark} src={ms.src} w={mw} h={mh} />
          </div>
        ) : null}
      </>
    );
  }

  // wordmark letters assemble: 1-frame stagger, springs.snappy, rising 0.35 em out of a slight blur; kerning kept by measured x
  const wmStart = markDone + 2 * k;
  const wmLeft = stack ? cx - wmW / 2 : markLeft + mw + gap;
  const wmTop = stack ? cy + mh / 2 + gap : cy - fs / 2;
  const letters = wordmark
    ? text.split('').map((ch, i) => {
        if (ch === ' ') return null;
        const x = ((m100(text.slice(0, i + 1)) - m100(ch)) * fs) / 100;
        const p = spring({frame: f - wmStart - i * k, fps, config: springs.snappy});
        if (p <= 0.001) return null;
        const settled = Math.abs(1 - p) < 0.002;
        const blur = (1 - Math.min(1, p)) * fs * 0.12;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: 0,
              whiteSpace: 'pre',
              opacity: Math.min(1, p * 1.4),
              transform: settled ? undefined : `translateY(${((1 - p) * fs * 0.35).toFixed(2)}px)`,
              filter: blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : undefined,
            }}
          >
            {ch}
          </span>
        );
      })
    : null;

  return (
    <AbsoluteFill style={{background: background ? b.colors.bg : undefined}}>
      {markEl}
      {wordmark ? (
        <div
          style={{
            position: 'absolute',
            left: wmLeft,
            top: wmTop,
            width: wmW,
            height: fs,
            fontFamily: family,
            fontWeight: weight,
            fontSize: fs,
            letterSpacing: `${trackEm}em`,
            lineHeight: `${fs}px`,
            color: b.colors.fg,
          }}
        >
          {letters}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
