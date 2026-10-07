// Kinetic type recipes (craft: typography). Frame-driven and deterministic; fonts and colours default from the brand.
// Statement-style type with measured layouts (BlurIn, StatementSequence, WordSwap, FieldType) lives in ./statement.
import React from 'react';
import {AbsoluteFill, interpolate, random, Sequence, spring, useCurrentFrame, useVideoConfig, Img, staticFile} from 'remotion';
import {fitText} from '@remotion/layout-utils';
import {useBrand} from '../brand/BrandProvider';
import {onColor} from '../brand/color';
import {useFontsReady} from '../brand/useFontsReady';
import {springs} from './springs';
import {easings} from './easings';
import {STAGGER, stagger, sentences, type Word} from './timing';

const center: React.CSSProperties = {justifyContent: 'center', alignItems: 'center', textAlign: 'center'};
/** CSS text-wrap: balance (no one-word widows); typed loosely because older @types/react lack it. */
const balance = {textWrap: 'balance'} as React.CSSProperties;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const srcOf = (s: string) => (/^(https?:|data:|blob:)/.test(s) ? s : staticFile(s));

// ─── Typewriter (human cadence) ─────────────────────────────────────────────────────────

const delayMs = (ch: string, prev: string, i: number, base: number, seed: string) => {
  let d = base * (0.65 + random(`${seed}-${i}`) * 0.7);
  if (/[.!?]/.test(prev)) d += base * 5;
  else if (/[,;:—–]/.test(prev)) d += base * 2.6;
  else if (prev === ' ' && random(`${seed}-w-${i}`) > 0.8) d += base * 1.8; // a thinking beat before some words
  if (ch === '\n') d += base * 3;
  return d;
};

/** Chars of `text` visible `elapsed` frames after typing starts. `cps` = average chars per second (seeded jitter ±35 %). */
export const typedCount = (text: string, elapsed: number, fps: number, cps = 16, seed = 'tw') => {
  if (elapsed < 0) return 0;
  const base = 1000 / cps;
  let acc = 0;
  for (let i = 0; i < text.length; i++) {
    acc += (delayMs(text[i], text[i - 1] ?? '', i, base, seed) / 1000) * fps;
    if (acc > elapsed) return i;
  }
  return text.length;
};

/** Frames needed to type `text` fully. */
export const typeDuration = (text: string, fps: number, cps = 16, seed = 'tw') => {
  const base = 1000 / cps;
  let acc = 0;
  for (let i = 0; i < text.length; i++) acc += delayMs(text[i], text[i - 1] ?? '', i, base, seed);
  return Math.ceil((acc / 1000) * fps);
};

/** Frames of every keystroke (glue a key-click SFX to each). */
export const keystrokeFrames = (text: string, start: number, fps: number, cps = 16, seed = 'tw') => {
  const base = 1000 / cps;
  const out: number[] = [];
  let acc = 0;
  for (let i = 0; i < text.length; i++) {
    acc += (delayMs(text[i], text[i - 1] ?? '', i, base, seed) / 1000) * fps;
    if (text[i] !== ' ') out.push(start + Math.round(acc));
  }
  return out;
};

export const useTypewriter = (text: string, start: number, cps = 16, seed = 'tw') => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = typedCount(text, f - start, fps, cps, seed);
  return {
    typed: text.slice(0, n),
    done: n >= text.length,
    typing: f >= start && n < text.length,
    /** solid while typing, 1 Hz blink when idle */
    caretOn: f < start || n < text.length ? true : Math.floor(f / (fps / 2)) % 2 === 0,
  };
};

/** Inline typed text + caret: human cadence, punctuation pauses, seeded. Inherits font from its parent. */
export const Typewriter: React.FC<{text: string; start: number; cps?: number; seed?: string; caret?: boolean; caretColor?: string; style?: React.CSSProperties}> = ({
  text,
  start,
  cps = 16,
  seed = 'tw',
  caret = true,
  caretColor = 'currentColor',
  style,
}) => {
  const {typed, caretOn} = useTypewriter(text, start, cps, seed);
  return (
    <span style={{whiteSpace: 'pre-wrap', ...style}}>
      {typed}
      {caret && caretOn ? <span style={{display: 'inline-block', width: '0.06em', minWidth: 2, height: '1.1em', background: caretColor, verticalAlign: 'text-bottom', marginLeft: '0.04em'}} /> : null}
    </span>
  );
};

// ─── VO-synced caption typing ───────────────────────────────────────────────────────────

/** Typing caption synced to VO word timings (seconds): chars spread across each word's duration, one sentence at a time. */
export const VOTypewriter: React.FC<{words: Word[]; at?: number; style?: React.CSSProperties; caret?: boolean; glow?: boolean}> = ({words, at = 0, style, caret = true, glow = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const t = frame / fps - at;
  const sents = sentences(words);
  const active = sents.find((s, i) => t >= s[0].s && (t < s[s.length - 1].e + 0.6 || i === sents.length - 1));
  if (!active) return null;
  let text = '';
  for (const w of active) {
    if (t < w.s) break;
    const p = Math.min(1, (t - w.s) / Math.max(0.05, w.e - w.s));
    text += (text ? ' ' : '') + w.w.slice(0, Math.max(1, Math.round(p * w.w.length)));
  }
  const done = t >= active[active.length - 1].e;
  const blink = Math.floor(t * 2) % 2 === 0;
  return (
    <AbsoluteFill style={center}>
      <div
        style={{
          fontFamily: b.font.display,
          fontWeight: b.type.displayWeight,
          fontSize: 64,
          color: b.colors.fg,
          letterSpacing: '-0.01em',
          textShadow: glow ? `0 0 24px rgba(255,255,255,.35), 0 4px 15px rgba(0,0,0,.5)` : '0 4px 15px rgba(0,0,0,.5)',
          maxWidth: '80%',
          lineHeight: 1.15,
          ...balance,
          ...style,
        }}
      >
        {text}
        {caret && !done && blink ? '_' : ''}
      </div>
    </AbsoluteFill>
  );
};

// ─── WordReveal ─────────────────────────────────────────────────────────────────────────

/** Word-by-word blur reveal: stagger 2 fr, blur 10 → 0 px, y 8 → 0, outExpo over `duration` frames. */
export const WordReveal: React.FC<{text: string; startFrame?: number; gap?: number; duration?: number; style?: React.CSSProperties}> = ({
  text,
  startFrame = 0,
  gap = STAGGER.words,
  duration = 14,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  return (
    <AbsoluteFill style={center}>
      <div style={{fontFamily: b.font.display, fontWeight: 500, fontSize: 56, color: b.colors.fg, maxWidth: '78%', lineHeight: 1.25, letterSpacing: `${b.type.displayTracking / 2}em`, ...balance, ...style}}>
        {text.split(' ').map((w, i) => {
          const f = frame - startFrame - stagger(i, gap, fps);
          const o = interpolate(f, [0, duration], [0, 1], {...clamp, easing: easings.outExpo});
          const bl = interpolate(f, [0, duration], [10, 0], {...clamp, easing: easings.outExpo});
          const y = interpolate(f, [0, duration], [8, 0], {...clamp, easing: easings.outExpo});
          return (
            <span key={i} style={{display: 'inline-block', opacity: o, filter: bl > 0.05 ? `blur(${bl}px)` : undefined, transform: y > 0.01 ? `translateY(${y}px)` : undefined, marginRight: '0.28em'}}>
              {w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Caption ────────────────────────────────────────────────────────────────────────────

/** Hero caption over footage: enters as one block on the cut (scale 1.04 → 1 in 6 fr) or slides up. `pulse` 0..1 from beatGrid.pulse. */
export const Caption: React.FC<{children: React.ReactNode; enter?: 'block' | 'slide' | 'none'; pulse?: number; scrim?: boolean; style?: React.CSSProperties}> = ({
  children,
  enter = 'block',
  pulse = 0,
  scrim = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const t = interpolate(frame, [0, 6], [0, 1], {extrapolateRight: 'clamp', easing: easings.outExpo});
  const s = enter === 'block' ? 1.04 - 0.04 * t : 1;
  const y = enter === 'slide' ? 24 * (1 - t) : 0;
  const o = enter === 'none' ? 1 : t;
  return (
    <AbsoluteFill style={center}>
      {scrim ? <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,.35), rgba(0,0,0,0) 70%)'}} /> : null}
      <div
        style={{
          fontFamily: b.font.display,
          fontWeight: 800,
          fontSize: 120,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: b.colors.fg,
          maxWidth: '86%',
          textShadow: b.theme === 'dark' ? '0 4px 15px rgba(0,0,0,.6)' : undefined,
          opacity: o,
          transform: `scale(${s * (1 + 0.03 * pulse)}) translateY(${y}px)`,
          ...balance,
          ...style,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ─── WordPerCut ─────────────────────────────────────────────────────────────────────────

/** One word per shot: each word hard-cuts in (the cut is the animation) and holds until the next. Words hold ≥ 12 frames. */
export const WordPerCut: React.FC<{words: {text: string; from: number; background?: string; color?: string}[]; until?: number; style?: React.CSSProperties}> = ({words, until, style}) => {
  const {durationInFrames} = useVideoConfig();
  const b = useBrand();
  return (
    <>
      {words.map((w, i) => {
        const end = words[i + 1]?.from ?? until ?? durationInFrames;
        return (
          <Sequence key={i} from={w.from} durationInFrames={Math.max(1, end - w.from)} layout="none">
            <AbsoluteFill style={{...center, background: w.background}}>
              <div style={{fontFamily: b.font.display, fontWeight: 800, fontSize: 180, letterSpacing: '-0.04em', color: w.color ?? b.colors.fg, ...style}}>{w.text}</div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </>
  );
};

// ─── FitWord ────────────────────────────────────────────────────────────────────────────

/** One word that fills `fill` of the frame width (fit-word), with a snappy scale-in. Waits for the font before measuring. */
export const FitWord: React.FC<{text: string; fill?: number; startFrame?: number; weight?: number; color?: string; maxSize?: number; style?: React.CSSProperties}> = ({
  text,
  fill = 0.8,
  startFrame = 0,
  weight,
  color,
  maxSize = 600,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const b = useBrand();
  const w = weight ?? 800;
  const ready = useFontsReady([`${w} 100px ${b.font.display}`]);
  if (!ready) return null;
  const tracking = `${b.type.displayTracking * 1.5}em`;
  const {fontSize} = fitText({text, withinWidth: width * fill, fontFamily: b.font.display, fontWeight: String(w), letterSpacing: tracking});
  const p = spring({frame: frame - startFrame, fps, config: springs.snappy});
  return (
    <AbsoluteFill style={center}>
      <div
        style={{
          fontFamily: b.font.display,
          fontWeight: w,
          fontSize: Math.min(maxSize, fontSize),
          letterSpacing: tracking,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: color ?? b.colors.fg,
          opacity: Math.min(1, p * 1.5),
          transform: `scale(${0.92 + 0.08 * p})`,
          ...style,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scatter ────────────────────────────────────────────────────────────────────────────

/** 3D scatter: 'explode' throws letters toward the camera (outExpo), 'assemble' brings them in on springs.snappy. */
export const Scatter: React.FC<{text: string; mode: 'explode' | 'assemble'; startFrame?: number; durationInFrames?: number; seed?: string; style?: React.CSSProperties}> = ({
  text,
  mode,
  startFrame = 0,
  durationInFrames = 15,
  seed = 'scatter',
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  return (
    <AbsoluteFill style={{...center, perspective: 1000}}>
      <div style={{display: 'flex', fontFamily: b.font.display, fontWeight: 800, fontSize: 110, letterSpacing: '-0.03em', color: b.colors.fg, transformStyle: 'preserve-3d', ...style}}>
        {text.split('').map((c, i) => {
          const rx = (random(`${seed}-x-${i}`) - 0.5) * 1000;
          const ry = (random(`${seed}-y-${i}`) - 0.5) * 1000;
          const rz = 600 + random(`${seed}-z-${i}`) * 800;
          const rr = (random(`${seed}-r-${i}`) - 0.5) * 90;
          const p =
            mode === 'explode'
              ? interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {...clamp, easing: easings.outExpo})
              : 1 - spring({frame: frame - startFrame - stagger(i, 1, fps), fps, config: springs.snappy});
          const o = mode === 'explode' ? 1 - interpolate(p, [0.6, 1], [0, 1], {extrapolateLeft: 'clamp'}) : 1;
          return (
            <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: o, transform: `translate3d(${rx * p}px, ${ry * p}px, ${rz * p}px) rotate(${rr * p}deg)`}}>
              {c}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── StackedRoll ────────────────────────────────────────────────────────────────────────

/** Rolling text cylinder: `rows` copies on a rotating drum; the front row is fg, the others cycle through `colors` (brand accents). */
export const StackedRoll: React.FC<{text: string; rows?: number; radius?: number; secondsPerTurn?: number; colors?: string[]; style?: React.CSSProperties}> = ({
  text,
  rows = 9,
  radius = 150,
  secondsPerTurn = 6,
  colors,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const cols = colors ?? [b.colors.accent, b.colors.accent2];
  const step = 360 / rows;
  const rot = (frame / (fps * secondsPerTurn)) * 360;
  const dist = (i: number) => {
    const d = (((i * step + rot) % 360) + 360) % 360;
    return Math.min(d, 360 - d);
  };
  let front = 0;
  for (let j = 1; j < rows; j++) if (dist(j) < dist(front)) front = j;
  return (
    <AbsoluteFill style={{...center, perspective: 1000}}>
      <div style={{position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rot}deg)`}}>
        {Array.from({length: rows}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              whiteSpace: 'nowrap',
              transform: `translate(-50%,-50%) rotateX(${i * step}deg) translateZ(${radius}px)`,
              backfaceVisibility: 'hidden',
              fontFamily: b.font.display,
              fontWeight: 700,
              fontSize: 72,
              color: i === front ? b.colors.fg : cols[i % cols.length],
              ...style,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Highlighter ────────────────────────────────────────────────────────────────────────

/** Marker sweep behind a word (scaleX 0 → 1 on springs.marker, tilted 0.5°). Default colour: brand accent2; the word
 *  switches to `ink` (black or white, whichever reads on the marker) as the sweep passes its middle. */
export const Highlighter: React.FC<{children: React.ReactNode; startFrame?: number; color?: string; ink?: string; style?: React.CSSProperties}> = ({children, startFrame = 0, color, ink, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const c = color ?? b.colors.accent2;
  const sx = spring({frame: frame - startFrame, fps, config: springs.marker});
  return (
    <span style={{position: 'relative', display: 'inline-block', padding: '0 .12em', isolation: 'isolate', color: sx > 0.5 ? (ink ?? onColor(c)) : undefined, ...style}}>
      <span style={{position: 'absolute', inset: '8% -2%', background: c, transformOrigin: 'left', transform: `scaleX(${sx}) rotate(-0.5deg)`, zIndex: -1, borderRadius: 4}} />
      {children}
    </span>
  );
};

// ─── Sticker / MemeWord ─────────────────────────────────────────────────────────────────

/** Cutout image with a white stroke (transparent PNG under public/), popping in on springs.pop. */
export const Sticker: React.FC<{src: string; width: number; stroke?: number; rotate?: number; startFrame?: number; style?: React.CSSProperties}> = ({src, width, stroke = 8, rotate = -2, startFrame = 0, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - startFrame, fps, config: springs.pop});
  const id = `lf-sticker-${stroke}`;
  return (
    <div style={{display: 'inline-block', transform: `scale(${0.9 + 0.1 * p}) rotate(${rotate}deg)`, opacity: p, ...style}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="dilate" radius={stroke} result="d" />
          <feFlood floodColor="#fff" result="w" />
          <feComposite in="w" in2="d" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="s" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <Img src={srcOf(src)} style={{width, filter: `url(#${id}) drop-shadow(0 12px 24px rgba(0,0,0,.35))`}} />
    </div>
  );
};

/** A deliberate style break: an image word popping in with a 6-frame shake. Use once or twice per film. */
export const MemeWord: React.FC<{src: string; width: number; startFrame?: number; seed?: string; style?: React.CSSProperties}> = ({src, width, startFrame = 0, seed = 'meme', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f = frame - startFrame;
  const p = spring({frame: f, fps, config: springs.pop});
  const shake = f >= 0 && f < 6 ? 3 : 0;
  const dx = (random(`${seed}-x-${frame}`) - 0.5) * 2 * shake;
  const dy = (random(`${seed}-y-${frame}`) - 0.5) * 2 * shake;
  return <Img src={srcOf(src)} style={{width, transform: `scale(${0.6 + 0.4 * p}) translate(${dx}px, ${dy}px)`, opacity: Math.min(1, p * 2), ...style}} />;
};

// ─── QuietClose ─────────────────────────────────────────────────────────────────────────

/** Small line typed on a plain background at the end (quiet-close). Serif by default; pass a font to match the brand. */
export const QuietClose: React.FC<{text: string; startFrame?: number; cps?: number; align?: 'left' | 'center'; serif?: boolean; style?: React.CSSProperties}> = ({
  text,
  startFrame = 0,
  cps = 40,
  align = 'center',
  serif = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const n = Math.max(0, Math.floor(((frame - startFrame) / fps) * cps));
  return (
    <AbsoluteFill style={{background: b.colors.bg, ...center, alignItems: align === 'left' ? 'flex-start' : 'center', padding: '0 8%'}}>
      <div style={{fontFamily: serif ? 'Georgia, "Times New Roman", serif' : b.font.text, fontWeight: 400, fontSize: 38, color: b.colors.fg, letterSpacing: '0.005em', ...style}}>
        {text.slice(0, n)}
      </div>
    </AbsoluteFill>
  );
};
