// Statement type: statement sequences, in-sentence word swaps, blur / mask entrances, a typing field (craft: typography).
// Numbers measured frame by frame from studied launch films (30 fps; em = the statement's font size). Fonts and colours
// default from the brand (useBrand); pass `theme` to override.
//
// Layout uses @remotion/layout-utils measureText, never inline-block per letter, so kerning survives per-character
// animation (each glyph sits at x = width(text[0..i]) − width(text[i])). Every component waits for its fonts
// (useFontsReady) before measuring: measureText caches, and a width taken with the fallback face would stick.
import React from 'react';
import {AbsoluteFill, interpolate, interpolateColors, random, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SpringConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {springs} from './springs';
import {easings} from './easings';
import {sentences, type Word} from './timing';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {useFontsReady} from '../brand/useFontsReady';
import type {ResolvedBrand} from '../brand/types';

// ───────────────────────────────── constants ─────────────────────────────────

/** Named springs for this family (never inline a spring config). */
export const typeSprings = {
  /** per-letter mask rise: ~10 % overshoot, peak 6–7 fr after start, settled by ~12 fr (ζ≈0.58) */
  maskRise: springs.maskRise,
  /** sentence re-flow when a word changes width (~20 fr to the new centred position): no overshoot */
  reflow: springs.ui,
} satisfies Record<string, Partial<SpringConfig>>;

const outCubic = easings.outCubic;
const outQuad = easings.outQuad;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export type TypeUnit = 'line' | 'word' | 'char';

/** How units (lines, words or letters) enter. Distances are in em so one spec works at any size. */
export type EnterSpec = {
  by: TypeUnit;
  /** frames between units */
  stagger: number;
  /** frames for opacity / blur (and position when there is no spring) */
  duration: number;
  /** start blur, em (0.12 em ≈ 13 px on a 108 px line) */
  blur: number;
  /** start offset, em; + = comes up from below, − = drops in from above */
  y: number;
  /** start scale */
  scale: number;
  /** start opacity (ignored before the unit's start: unstarted units are hidden) */
  opacity: number;
  /** clip each line box with a soft edge so units rise from behind it (mask rise) */
  clip: boolean;
  /** drive position with a spring (overshoot) instead of `easing` */
  spring?: Partial<SpringConfig>;
  easing: (t: number) => number;
};

/** Entrances measured from the references (frames at 30 fps). */
export const TYPE_ENTER = {
  /** calm premium statement: per word, stagger 2 fr, blur 0.12 em → 0, drops 0.2 em from above, outExpo ~12 fr */
  blurDrop: {by: 'word', stagger: 2, duration: 12, blur: 0.12, y: -0.2, scale: 1, opacity: 0, clip: false, easing: easings.outExpo},
  /** solution line: per word from 0.8 em below, no blur, ease-out cubic 13 fr, stagger 2 fr */
  rise: {by: 'word', stagger: 2, duration: 13, blur: 0, y: 0.8, scale: 1, opacity: 0, clip: false, easing: outCubic},
  /** energetic: per word from 1 em below on a spring with a visible overshoot, stagger 3 fr */
  springRise: {by: 'word', stagger: 3, duration: 8, blur: 0.04, y: 1, scale: 1, opacity: 0, clip: false, spring: typeSprings.maskRise, easing: outQuad},
  /** hero word: per letter rising a full line height inside a soft clip, 10 % overshoot, stagger 2 fr */
  mask: {by: 'char', stagger: 2, duration: 6, blur: 0, y: 1.15, scale: 1, opacity: 1, clip: true, spring: typeSprings.maskRise, easing: outQuad},
  /** whole line lens pull: blur 0.15 em, scale 1.10 → 1, 10 fr */
  lens: {by: 'line', stagger: 0, duration: 10, blur: 0.15, scale: 1.1, y: 0, opacity: 0, clip: false, easing: easings.outExpo},
  /** problem line: hard cut in, no animation (the stillness is the point) */
  cut: {by: 'word', stagger: 0, duration: 0, blur: 0, y: 0, scale: 1, opacity: 1, clip: false, easing: easings.linear},
} satisfies Record<string, EnterSpec>;
export type EnterName = keyof typeof TYPE_ENTER;

/** How a whole statement leaves. */
export type ExitSpec = {
  duration: number;
  /** end offset, em; − = up */
  y: number;
  /** end blur, em */
  blur: number;
  /** end opacity */
  opacity: number;
  /** progress (0..1) at which the fade starts */
  fadeFrom: number;
  /** move inside the line clip (leaves through its top edge) */
  clip: boolean;
  easing: (t: number) => number;
};

export const TYPE_EXIT = {
  /** 5 fr fade that keeps drifting ~0.1 em down with a slight blur: shorter than the entrance */
  fade: {duration: 5, y: 0.1, blur: 0.06, opacity: 0, fadeFrom: 0, clip: false, easing: easings.inQuad},
  /** slides up out through the clip top, 8 fr ease-in */
  up: {duration: 8, y: -1.25, blur: 0, opacity: 1, fadeFrom: 1, clip: true, easing: easings.inQuad},
  /** lifts 1.3 em accelerating, blurs and fades over the last 40 % (15 fr) */
  lift: {duration: 15, y: -1.3, blur: 0.08, opacity: 0, fadeFrom: 0.6, clip: false, easing: easings.inQuad},
  /** hard cut, no exit */
  cut: {duration: 0, y: 0, blur: 0, opacity: 0, fadeFrom: 0, clip: false, easing: easings.linear},
} satisfies Record<string, ExitSpec>;
export type ExitName = keyof typeof TYPE_EXIT;

export const resolveEnter = (e?: EnterName | Partial<EnterSpec>, base: EnterName = 'blurDrop'): EnterSpec =>
  typeof e === 'string' ? TYPE_ENTER[e] : {...TYPE_ENTER[base], ...(e ?? {})};
export const resolveExit = (e?: ExitName | Partial<ExitSpec>, base: ExitName = 'fade'): ExitSpec =>
  typeof e === 'string' ? TYPE_EXIT[e] : {...TYPE_EXIT[base], ...(e ?? {})};

/** Fonts and colours. Defaults come from the brand (typeThemeFromBrand); pass a Partial to override. */
export type TypeTheme = {
  font: string;
  /** mono / label face for eyebrows, field labels */
  label: string;
  weight: number;
  tracking: string;
  lineHeight: number;
  fg: string;
  muted: string;
  accent: string;
  surface: string;
  rule: string;
  selection: string;
  ring: string;
};

/** The brand as a TypeTheme: display face for statements, mono for labels. */
export const typeThemeFromBrand = (b: ResolvedBrand): TypeTheme => ({
  font: b.font.display,
  label: b.font.mono,
  weight: b.type.displayWeight,
  tracking: `${b.type.displayTracking}em`,
  lineHeight: b.type.displayLineHeight,
  fg: b.colors.fg,
  muted: b.colors.muted,
  accent: b.colors.accent,
  surface: b.colors.surface,
  rule: alpha(b.colors.muted, 0.45),
  selection: alpha(b.colors.accent, 0.3),
  ring: alpha(b.colors.accent, 0.2),
});

/** Brand theme merged with overrides. */
export const useTypeTheme = (theme?: Partial<TypeTheme>): TypeTheme => {
  const b = useBrand();
  return {...typeThemeFromBrand(b), ...theme};
};

/** Statement size: ≈10 % of frame height, capped at 10 % of width so 9:16 still fits (108 px either way at 1080). */
export const statementSize = (width: number, height: number) => Math.round(Math.min(height * 0.1, width * 0.1));

/** Readability (craft/02): a line holds ≥ 1.2 s; ~0.25 s per word on top of 0.5 s. */
export const autoHold = (text: string, fps: number) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split('\n').length;
  return Math.max(Math.round(fps * (lines > 1 ? 2 : 1.2)), Math.round(fps * (0.5 + 0.25 * words)));
};

// ───────────────────────────── measuring ─────────────────────────────

type FontSpec = {family: string; size: number; weight: number; tracking: string; lineHeight: number};

const measure = (text: string, f: FontSpec, weight?: number) =>
  measureText({text, fontFamily: f.family, fontSize: f.size, fontWeight: String(weight ?? f.weight), letterSpacing: f.tracking}).width;

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}:]/gu, '');

type LaidUnit = {text: string; x: number; w: number; i: number; word: number; emph: boolean; weight: number; /** letter index inside its word (char units) */ ci: number};
type LaidLine = {text: string; w: number; units: LaidUnit[]};
type Laid = {lines: LaidLine[]; lineH: number; W: number; H: number; size: number; units: number; words: number};

/** Greedy wrap within maxWidth (plus manual "\n"), shrink if a single word is wider, then place units with kerning intact. */
const layoutText = (text: string, font: FontSpec, by: TypeUnit, maxWidth: number, emphasis: string[] = [], emphWeight?: number): Laid => {
  const emph = new Set(emphasis.map(norm));
  const weightOf = (w: string) => (emphWeight && emph.has(norm(w)) ? emphWeight : font.weight);
  // greedy wrap, then balance (like CSS text-wrap: balance): the narrowest width that keeps the same line count,
  // so a 9:16 frame gets "Your list was / right at 9:00." instead of a one-word widow
  const wrap = (f: FontSpec) => {
    const space = measure(' ', f);
    const greedy = (words: string[], limit: number) => {
      const out: string[][] = [];
      let cur: string[] = [];
      let curW = 0;
      for (const w of words) {
        const ww = measure(w, f, weightOf(w));
        const next = cur.length ? curW + space + ww : ww;
        if (cur.length && next > limit) {
          out.push(cur);
          cur = [w];
          curW = ww;
        } else {
          cur.push(w);
          curW = next;
        }
      }
      out.push(cur);
      return out;
    };
    const lines: string[][] = [];
    for (const para of text.split('\n')) {
      const words = para.split(/\s+/).filter(Boolean);
      const first = greedy(words, maxWidth);
      if (first.length < 2) {
        lines.push(...first);
        continue;
      }
      let lo = Math.max(...words.map((w) => measure(w, f, weightOf(w))));
      let hi = maxWidth;
      for (let it = 0; it < 14; it++) {
        const mid = (lo + hi) / 2;
        if (greedy(words, mid).length <= first.length) hi = mid;
        else lo = mid;
      }
      lines.push(...greedy(words, hi));
    }
    return {lines, space};
  };
  let f = font;
  const widest = Math.max(1, ...text.split(/\s+/).filter(Boolean).map((w) => measure(w, f, weightOf(w))));
  if (widest > maxWidth) f = {...font, size: (font.size * maxWidth) / widest};
  const {lines, space} = wrap(f);
  let ui = 0;
  let wi = 0;
  const out: LaidLine[] = lines.map((words) => {
    const lineText = words.join(' ');
    const units: LaidUnit[] = [];
    if (by === 'line') {
      units.push({text: lineText, x: 0, w: measure(lineText, f), i: ui++, word: wi, emph: false, weight: f.weight, ci: 0});
      wi += words.length;
    } else if (by === 'word') {
      let x = 0;
      for (const w of words) {
        const weight = weightOf(w);
        const ww = measure(w, f, weight);
        units.push({text: w, x, w: ww, i: ui++, word: wi++, emph: emph.has(norm(w)), weight, ci: 0});
        x += ww + space;
      }
    } else {
      let k = 0;
      let ci = 0;
      for (let c = 0; c < lineText.length; c++) {
        const ch = lineText[c];
        if (ch === ' ') {
          k++;
          ci = 0;
          continue;
        }
        const cw = measure(ch, f);
        units.push({text: ch, x: measure(lineText.slice(0, c + 1), f) - cw, w: cw, i: ui++, word: wi + k, emph: emph.has(norm(words[k] ?? '')), weight: f.weight, ci: ci++});
      }
      wi += words.length;
    }
    const last = units[units.length - 1];
    const w = by === 'char' ? measure(lineText, f) : last ? last.x + last.w : 0;
    return {text: lineText, w, units};
  });
  const lineH = f.size * f.lineHeight;
  return {lines: out, lineH, W: Math.max(0, ...out.map((l) => l.w)), H: out.length * lineH, size: f.size, units: ui, words: wi};
};

// ───────────────────────────── per-unit animation ────────────────────────────

type UnitState = {o: number; y: number; b: number; s: number; p: number};

/** State of one unit `f` frames after its own start. y/b in em. p = 0..1 entrance progress (for colour sweeps). */
export const enterState = (f: number, e: EnterSpec, fps: number): UnitState => {
  if (f < 0) return {o: e.clip ? 1 : 0, y: e.y, b: e.blur, s: e.scale, p: 0};
  if (e.duration <= 0 && !e.spring) return {o: 1, y: 0, b: 0, s: 1, p: 1};
  const d = Math.max(1, e.duration);
  const t = e.easing(clamp01(f / d));
  const sp = e.spring ? spring({frame: f, fps, config: e.spring}) : t;
  const pos = Math.abs(1 - sp) < 0.0005 ? 1 : sp; // snap the spring tail so resting glyphs carry no sub-pixel transform
  return {o: e.opacity + (1 - e.opacity) * t, y: e.y * (1 - pos), b: e.blur * (1 - t), s: e.scale + (1 - e.scale) * t, p: t};
};

/** State of a statement `f` frames after its exit started. */
export const exitState = (f: number, x: ExitSpec) => {
  if (f < 0) return {o: 1, y: 0, b: 0};
  if (x.duration <= 0) return {o: 0, y: 0, b: 0};
  const t = x.easing(clamp01(f / x.duration));
  const fade = x.fadeFrom >= 1 ? 0 : clamp01((t - x.fadeFrom) / (1 - x.fadeFrom));
  return {o: 1 + (x.opacity - 1) * fade, y: x.y * t, b: x.blur * t};
};

const unitCss = (st: UnitState, size: number): React.CSSProperties => {
  const blur = st.b * size;
  const y = st.y * size;
  return {
    opacity: st.o,
    filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
    transform: Math.abs(y) > 0.01 || Math.abs(st.s - 1) > 0.0005 ? `translateY(${y.toFixed(2)}px) scale(${st.s.toFixed(4)})` : undefined,
  };
};

/**
 * Clip box for mask rises / the WordSwap slot, relative to a line box of `lineH`. Keep the clip tight: the top edge sits
 * just above the cap height, so a word leaving upward is gone in a few frames; the bottom leaves room for descenders.
 * Returns the box offsets (em) and the soft-edged mask.
 */
const CLIP = {top: 0.02, bottom: 0.14, soft: 0.07} as const;
const softClip = (size: number): React.CSSProperties => {
  const s = size * CLIP.soft;
  const g = `linear-gradient(to bottom, transparent 0, #000 ${s}px, #000 calc(100% - ${s}px), transparent 100%)`;
  return {overflow: 'hidden', maskImage: g, WebkitMaskImage: g};
};

const fillCss = (fill: string, lineW: number, x: number): React.CSSProperties => ({
  backgroundImage: fill,
  backgroundSize: `${lineW}px 100%`,
  backgroundPosition: `${-x}px 0`,
  backgroundRepeat: 'no-repeat',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
});

// ─────────────────────────────── TypeBlock (core) ─────────────────────────────

type Emphasis = {
  /** words to emphasise (punctuation ignored) */
  words: string[];
  /** 'accent' = turn the accent colour, 'dim' = everything else drops to `dimTo`, 'both' */
  mode?: 'accent' | 'dim' | 'both';
  /** frames after the statement starts; 0 = from the first frame (static) */
  at?: number;
  /** frames for the colour / dim change (default 8) */
  frames?: number;
  dimTo?: number;
  /** a heavier weight for the emphasised words, static (laid out with it, so nothing re-flows) */
  weight?: number;
};

type BlockProps = {
  text: string;
  /** frame relative to the entrance start */
  local: number;
  /** local frame when the exit starts (undefined = never) */
  exitAt?: number;
  enter: EnterSpec;
  exit: ExitSpec;
  font: FontSpec;
  maxWidth: number;
  align: 'center' | 'left';
  color: string;
  accent: string;
  fill?: string;
  sweep?: {color: string; hold?: number};
  emphasis?: Emphasis;
  /** per-word start frames (relative), e.g. from VO onsets — overrides stagger for word units */
  wordStarts?: number[];
};

const TypeBlock: React.FC<BlockProps> = ({text, local, exitAt, enter, exit, font, maxWidth, align, color, accent, fill, sweep, emphasis, wordStarts}) => {
  const {fps} = useVideoConfig();
  // emphasis needs word units: a whole-line entrance with emphasis is laid out per word, all starting together
  const by: TypeUnit = enter.by === 'line' && emphasis ? 'word' : enter.by;
  const stg = enter.by === 'line' ? 0 : enter.stagger;
  const L = layoutText(text, font, by, maxWidth, emphasis?.words, emphasis?.weight);
  const size = L.size;
  const xs = exitAt === undefined ? {o: 1, y: 0, b: 0} : exitState(local - exitAt, exit);
  const clip = enter.clip || (exitAt !== undefined && exit.clip && local >= exitAt);
  const padT = clip ? size * CLIP.top : size * 0.2;
  const padB = clip ? size * CLIP.bottom : size * 0.2;
  const padX = size * 0.3;
  const em = emphasis;
  const emStart = em ? (em.at ?? 0) : 0;
  const emP = em ? (emStart <= 0 ? 1 : interpolate(local, [emStart, emStart + (em.frames ?? 8)], [0, 1], {...clamp, easing: easings.outQuint})) : 0;
  const mode = em?.mode ?? 'accent';
  // VO-synced: a word starts on its onset (letters stagger inside it); otherwise a fixed stagger per unit
  const startOf = (u: LaidUnit) => (wordStarts && by !== 'line' ? (wordStarts[u.word] ?? u.word * stg) + u.ci * stg : u.i * stg);
  return (
    <div style={{position: 'relative', width: L.W, height: L.H}}>
      {L.lines.map((line, li) => (
        <div
          key={li}
          style={{
            position: 'absolute',
            left: (align === 'center' ? (L.W - line.w) / 2 : 0) - padX,
            top: li * L.lineH - padT,
            width: line.w + padX * 2,
            height: L.lineH + padT + padB,
            ...(clip ? softClip(size) : {}),
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: padX,
              top: padT,
              width: line.w,
              height: L.lineH,
              opacity: xs.o,
              filter: xs.b * size > 0.05 ? `blur(${(xs.b * size).toFixed(2)}px)` : undefined,
              transform: Math.abs(xs.y) > 0.0001 ? `translateY(${(xs.y * size).toFixed(2)}px)` : undefined,
            }}
          >
            {line.units.map((u) => {
              const f = local - startOf(u);
              const st = enterState(f, enter, fps);
              const isEm = em ? u.emph : false;
              let c = color;
              let dim = 1;
              if (sweep) c = interpolateColors(clamp01((f - (sweep.hold ?? 4)) / Math.max(4, enter.duration)), [0, 1], [sweep.color, color]);
              if (em && isEm && (mode === 'accent' || mode === 'both')) c = interpolateColors(emP, [0, 1], [color, accent]);
              if (em && !isEm && (mode === 'dim' || mode === 'both')) dim = 1 + ((em.dimTo ?? 0.35) - 1) * emP;
              const css = unitCss(st, size);
              return (
                <span
                  key={u.i}
                  style={{
                    position: 'absolute',
                    left: u.x,
                    top: 0,
                    whiteSpace: 'pre',
                    fontFamily: font.family,
                    fontSize: size,
                    fontWeight: u.weight,
                    letterSpacing: font.tracking,
                    lineHeight: `${L.lineH}px`,
                    color: c,
                    transformOrigin: '50% 60%',
                    ...css,
                    opacity: (css.opacity as number) * dim,
                    ...(fill && !isEm ? fillCss(fill, line.w, u.x) : {}),
                  }}
                >
                  {u.text}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

/** Frames until the last unit of `text` has finished entering (useful to schedule holds). */
export const enterLength = (text: string, enter: EnterSpec) => {
  const n = enter.by === 'line' ? 1 : enter.by === 'word' ? text.split(/\s+/).filter(Boolean).length : text.replace(/\s/g, '').length;
  return (n - 1) * enter.stagger + Math.max(enter.duration, enter.spring ? 12 : 0);
};

// ─────────────────────────────────── BlurIn ──────────────────────────────────

export type BlurInProps = {
  text: string;
  startFrame?: number;
  /** preset name or overrides of `blurDrop` */
  enter?: EnterName | Partial<EnterSpec>;
  exitFrame?: number;
  exit?: ExitName | Partial<ExitSpec>;
  theme?: Partial<TypeTheme>;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  /** CSS gradient painted inside the letters (background-clip: text), positioned across the whole line */
  fill?: string;
  /** colour wave across the units: each enters in `color` and settles to its own colour (letters → reads as a sweep) */
  sweep?: {color: string; hold?: number};
  emphasis?: Emphasis;
  maxWidth?: number;
  align?: 'center' | 'left';
  /** slow scale creep across [startFrame, startFrame+push.frames]: measured 0.985 → 1.03 */
  push?: {from: number; to: number; frames: number} | false;
  /** 'center' fills the frame and centres; 'inline' renders just the block */
  layout?: 'center' | 'inline';
  style?: React.CSSProperties;
};

/** Per-word or per-letter entrance: blur→sharp, drop/rise, lens pull, or mask rise with overshoot; optional gradient fill and colour sweep. */
export const BlurIn: React.FC<BlurInProps> = ({text, startFrame = 0, enter, exitFrame, exit, theme, fontSize, fontWeight, color, fill, sweep, emphasis, maxWidth, align = 'center', push = false, layout = 'center', style}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const th = useTypeTheme(theme);
  const weight = fontWeight ?? th.weight;
  const weights = Array.from(new Set([weight, emphasis?.weight ?? weight]));
  const ready = useFontsReady(weights.map((w) => `${w} 100px ${th.font}`));
  if (!ready) return null;
  const e = resolveEnter(enter);
  const local = frame - startFrame;
  const scale = push ? interpolate(local, [0, push.frames], [push.from, push.to], {...clamp, easing: outQuad}) : 1;
  const block = (
    <div style={{transform: scale !== 1 ? `scale(${scale.toFixed(4)})` : undefined, ...style}}>
      <TypeBlock
        text={text}
        local={local}
        exitAt={exitFrame === undefined ? undefined : exitFrame - startFrame}
        enter={e}
        exit={resolveExit(exit)}
        font={{family: th.font, size: fontSize ?? statementSize(width, height), weight, tracking: th.tracking, lineHeight: th.lineHeight}}
        maxWidth={maxWidth ?? width * 0.84}
        align={align}
        color={color ?? th.fg}
        accent={th.accent}
        fill={fill}
        sweep={sweep}
        emphasis={emphasis}
      />
    </div>
  );
  return layout === 'inline' ? block : <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{block}</AbsoluteFill>;
};

// ────────────────────────────── StatementSequence ─────────────────────────────

export type Statement = {
  /** "\n" forces a line break; long lines wrap at maxWidth */
  text: string;
  /** absolute frame the entrance starts (default: after the previous statement + gap) */
  from?: number;
  /** absolute frame the exit starts (default: from + entrance + autoHold) */
  to?: number;
  /** frames to hold after the entrance when `to` is not given */
  hold?: number;
  enter?: EnterName | Partial<EnterSpec>;
  exit?: ExitName | Partial<ExitSpec>;
  emphasis?: Emphasis;
  /** word start frames relative to `from` (VO onsets) — overrides stagger */
  wordStarts?: number[];
  /** small label above (label face), enters 4 fr before the statement */
  eyebrow?: string;
  /** small line below, enters 10 fr after the last word */
  sub?: string;
  color?: string;
  fill?: string;
  sweep?: {color: string; hold?: number};
  fontSize?: number;
  fontWeight?: number;
};

export type ScheduledStatement = Statement & {from: number; to: number; exitLen: number};

/** Resolve from/to for every statement: explicit frames win, otherwise back-to-back with `gap` frames of nothing (4 fr after a fade; 0 after a cut). */
export const scheduleStatements = (statements: Statement[], fps: number, startFrame = 0, gap = 4): ScheduledStatement[] => {
  let cursor = startFrame;
  return statements.map((s) => {
    const e = resolveEnter(s.enter);
    const x = resolveExit(s.exit);
    const from = s.from ?? cursor;
    const to = s.to ?? from + enterLength(s.text, e) + (s.hold ?? autoHold(s.text, fps));
    cursor = to + x.duration + (x.duration > 0 ? gap : 0);
    return {...s, from, to, exitLen: x.duration};
  });
};

/** VO words (seconds, tools/transcribe.py) → one statement per sentence, each word entering on its own onset. */
export const statementsFromWords = (words: Word[], fps: number, opts: {lead?: number; gap?: number; enter?: EnterName | Partial<EnterSpec>; exit?: ExitName | Partial<ExitSpec>} = {}): Statement[] => {
  const lead = opts.lead ?? 2;
  const gap = opts.gap ?? 4;
  const exitLen = resolveExit(opts.exit).duration;
  const ss = sentences(words);
  return ss.map((s, i) => {
    const from = Math.max(0, Math.round(s[0].s * fps) - lead);
    const nextFrom = i + 1 < ss.length ? Math.round(ss[i + 1][0].s * fps) - lead : Math.round(s[s.length - 1].e * fps) + Math.round(fps * 1.2);
    return {
      text: s.map((w) => w.w).join(' '),
      from,
      to: Math.max(from + 1, nextFrom - gap - exitLen),
      wordStarts: s.map((w) => Math.round(w.s * fps) - from),
      enter: opts.enter,
      exit: opts.exit,
    };
  });
};

/** Eyebrow (uppercase, tracked) or sub-line (as written: URLs keep their case) in the label face. */
const Label: React.FC<{text: string; local: number; th: TypeTheme; size: number; fps: number; upper?: boolean}> = ({text, local, th, size, fps, upper = true}) => {
  const st = enterState(local, {...TYPE_ENTER.blurDrop, by: 'line', duration: 8, y: 0}, fps);
  return (
    <div style={{fontFamily: th.label, fontSize: size, letterSpacing: upper ? '0.14em' : '0.02em', textTransform: upper ? 'uppercase' : 'none', color: th.muted, whiteSpace: 'pre', ...unitCss(st, size)}}>
      {text}
    </div>
  );
};

export type StatementSequenceProps = {
  statements: Statement[];
  startFrame?: number;
  gap?: number;
  theme?: Partial<TypeTheme>;
  fontSize?: number;
  fontWeight?: number;
  maxWidth?: number;
  align?: 'center' | 'left';
  /** scale creep per statement (0.985 → 1.03 across the statement), false to disable */
  push?: [number, number] | false;
};

const StatementView: React.FC<{s: ScheduledStatement; p: StatementSequenceProps; th: TypeTheme}> = ({s, p, th}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const size = s.fontSize ?? p.fontSize ?? statementSize(width, height);
  const lead = s.eyebrow ? 4 : 0;
  const local = frame - lead;
  const span = s.to - s.from + s.exitLen;
  const push = p.push === undefined ? ([0.985, 1.03] as [number, number]) : p.push;
  const scale = push ? interpolate(frame, [0, span], push, {...clamp, easing: outQuad}) : 1;
  const e = resolveEnter(s.enter);
  const x = resolveExit(s.exit);
  const exitAt = s.to - s.from - lead;
  const xs = exitState(local - exitAt, x);
  const labelSize = Math.max(14, size * 0.24);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: p.align === 'left' ? 'flex-start' : 'center', gap: size * 0.32, transform: scale !== 1 ? `scale(${scale.toFixed(4)})` : undefined}}>
        {s.eyebrow ? (
          <div style={{opacity: xs.o}}>
            <Label text={s.eyebrow} local={frame} th={th} size={labelSize} fps={fps} />
          </div>
        ) : null}
        <TypeBlock
          text={s.text}
          local={local}
          exitAt={exitAt}
          enter={e}
          exit={x}
          font={{family: th.font, size, weight: s.fontWeight ?? p.fontWeight ?? th.weight, tracking: th.tracking, lineHeight: th.lineHeight}}
          maxWidth={p.maxWidth ?? width * 0.84}
          align={p.align ?? 'center'}
          color={s.color ?? th.fg}
          accent={th.accent}
          fill={s.fill}
          sweep={s.sweep}
          emphasis={s.emphasis}
          wordStarts={s.wordStarts}
        />
        {s.sub ? (
          <div style={{opacity: xs.o}}>
            <Label text={s.sub} local={local - enterLength(s.text, e) + 2} th={th} size={labelSize * 1.1} fps={fps} upper={false} />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

/** Calm statements in sequence, or problem → solution cuts: crisp per-word entrances, a scale creep, short exits, 4 fr of nothing between. */
export const StatementSequence: React.FC<StatementSequenceProps> = (p) => {
  const {fps} = useVideoConfig();
  const th = useTypeTheme(p.theme);
  const weights = Array.from(new Set([p.fontWeight ?? th.weight, ...p.statements.map((s) => s.fontWeight ?? p.fontWeight ?? th.weight), ...p.statements.map((s) => s.emphasis?.weight).filter((w): w is number => !!w)]));
  const ready = useFontsReady([...weights.map((w) => `${w} 100px ${th.font}`), `400 100px ${th.label}`]);
  if (!ready) return null;
  const sched = scheduleStatements(p.statements, fps, p.startFrame ?? 0, p.gap ?? 4);
  return (
    <>
      {sched.map((s, i) => (
        <Sequence key={i} from={s.from - (s.eyebrow ? 4 : 0)} durationInFrames={Math.max(1, s.to - s.from + s.exitLen + (s.eyebrow ? 4 : 0))} layout="none">
          <StatementView s={s} p={p} th={th} />
        </Sequence>
      ))}
    </>
  );
};

// ─────────────────────────────────── WordSwap ─────────────────────────────────

export type WordSwapProps = {
  /** text before the slot, e.g. "Built from your" */
  before: string;
  /** slot words in order; the first one enters with the sentence */
  words: string[];
  /** text after the slot, e.g. "." (a leading space is added before letters) */
  after?: string;
  startFrame?: number;
  /** absolute frames at which words[1..] arrive (default startFrame + 24 + k·every) */
  at?: number[];
  every?: number;
  /** 'slot' = old word leaves up / new letters rise inside a clip (mask rise); 'blur' = old blurs out, new blurs in */
  mode?: 'slot' | 'blur';
  /** entrance of the whole sentence */
  enter?: EnterName | Partial<EnterSpec>;
  exitFrame?: number;
  exit?: ExitName | Partial<ExitSpec>;
  theme?: Partial<TypeTheme>;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  slotColor?: string;
  maxWidth?: number;
  /** put `before` on its own line (auto when the longest single line would not fit maxWidth) */
  stack?: boolean;
  style?: React.CSSProperties;
};

/** A sentence with one slot that cycles words; the sentence re-flows on `typeSprings.reflow` as the slot width changes. */
export const WordSwap: React.FC<WordSwapProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const th = useTypeTheme(p.theme);
  const weight = p.fontWeight ?? th.weight;
  const ready = useFontsReady([`${weight} 100px ${th.font}`]);
  if (!ready) return null;
  const start = p.startFrame ?? 0;
  const every = p.every ?? 18;
  const at = [start, ...(p.at ?? p.words.slice(1).map((_, k) => start + 24 + k * every))];
  const maxW = p.maxWidth ?? width * 0.86;
  const before = p.before.trim();
  const after = p.after ? (/^[\p{L}\p{N}]/u.test(p.after) ? ` ${p.after}` : p.after) : '';
  const base: FontSpec = {family: th.font, size: p.fontSize ?? statementSize(width, height), weight, tracking: th.tracking, lineHeight: th.lineHeight};
  const m = (s: string, f: FontSpec) => (s ? measure(s, f) : 0);
  const single = (f: FontSpec) => Math.max(...p.words.map((w) => m(`${before} `, f) + m(w, f) + m(after, f)));
  const stackNeed = (f: FontSpec) => Math.max(m(before, f), ...p.words.map((w) => m(w, f) + m(after, f)));
  const stack = p.stack ?? single(base) > maxW;
  const need = stack ? stackNeed(base) : single(base);
  const font = need > maxW ? {...base, size: (base.size * maxW) / need} : base;
  const size = font.size;
  const lineH = size * font.lineHeight;
  const e = resolveEnter(p.enter);
  const x = resolveExit(p.exit);
  const xs = p.exitFrame === undefined ? {o: 1, y: 0, b: 0} : exitState(frame - p.exitFrame, x);

  // slot width = first width + Σ Δw · spring(frame − at_k − delay): the re-flow and the incoming letters start together,
  // 2 fr after the old word starts leaving (the line starts travelling, the new word lands at peak velocity)
  // blur mode: the slot starts opening on the swap frame and the new word blurs in 6 fr later, when the re-flow is ~70 % done
  const REFLOW_DELAY = p.mode === 'blur' ? 0 : 2;
  const BLUR_IN_DELAY = 6;
  const ww = p.words.map((w) => m(w, font));
  let slotW = ww[0];
  for (let k = 1; k < ww.length; k++) slotW += (ww[k] - ww[k - 1]) * spring({frame: frame - at[k] - REFLOW_DELAY, fps, config: typeSprings.reflow});
  const space = m(' ', font);
  const bw = m(before, font);
  const aw = m(after, font);
  const line2W = slotW + aw;
  const totalW = stack ? Math.max(bw, line2W) : bw + space + slotW + aw;
  const slotLeft = stack ? -line2W / 2 : -totalW / 2 + bw + space;
  const slotTop = stack ? lineH : 0;
  const color = p.color ?? th.fg;
  const slotColor = p.slotColor ?? th.accent;
  let active = 0;
  for (let k = 0; k < at.length; k++) if (frame >= at[k]) active = k;

  const beforeWords = before.split(/\s+/).filter(Boolean);
  const text = (c: string): React.CSSProperties => ({position: 'absolute', top: 0, whiteSpace: 'pre', fontFamily: font.family, fontSize: size, fontWeight: font.weight, letterSpacing: font.tracking, lineHeight: `${lineH}px`, color: c, transformOrigin: '50% 60%'});

  // the sentence entrance: before-words, then the first slot word + after
  const bLeft = stack ? -bw / 2 : -totalW / 2;
  let bx = 0;
  const beforeEls = beforeWords.map((w, i) => {
    const el = (
      <span key={`b${i}`} style={{...text(color), left: bLeft + bx, ...unitCss(enterState(frame - start - i * e.stagger, e, fps), size)}}>
        {w}
      </span>
    );
    bx += m(w, font) + space;
    return el;
  });
  const slotStart = beforeWords.length * e.stagger;

  const pad = p.mode === 'blur' ? size * 0.28 : size * CLIP.top;
  const padB = p.mode === 'blur' ? size * 0.28 : size * CLIP.bottom;
  const padX = size * 0.4;
  const leave = (fo: number) => -1.25 * size * easings.inQuad(clamp01(fo / 6));
  const slotEls: React.ReactNode[] = [];
  let slotMask: string | undefined;
  for (let k = Math.max(0, active - 1); k <= active; k++) {
    const w = p.words[k];
    const leaving = k < active;
    const fIn = frame - at[k];
    if (k === 0) {
      // first word enters with the sentence; leaves like the others
      const st = enterState(frame - start - slotStart, e, fps);
      const css = unitCss(st, size);
      let extra: React.CSSProperties = {};
      if (leaving) {
        const fo = frame - at[k + 1];
        if (p.mode === 'blur') {
          const ex = exitState(fo, TYPE_EXIT.fade);
          extra = {opacity: ex.o, filter: `blur(${(ex.b * size).toFixed(2)}px)`, transform: `translateY(${(ex.y * size).toFixed(2)}px)`};
        } else {
          extra = {transform: `translateY(${leave(fo).toFixed(2)}px)`};
        }
      }
      slotEls.push(
        <span key={`s${k}`} style={{...text(slotColor), left: padX, top: pad, ...css, ...extra}}>
          {w}
        </span>,
      );
      continue;
    }
    if (p.mode === 'blur') {
      const st = leaving ? null : enterState(fIn - BLUR_IN_DELAY, TYPE_ENTER.blurDrop, fps);
      const ex = leaving ? exitState(frame - at[k + 1], TYPE_EXIT.fade) : null;
      // a longer incoming word is revealed by the opening slot (soft right edge tied to slotW), so the text after
      // the slot never sits on top of it while the sentence re-flows (the new word fills the space)
      // opaque up to the current slot width, transparent 0.22 em later (set on the slot box, which is padded, so blur
      // halos are not clipped); once the slot has opened the word is fully visible
      if (!leaving && ww[k] > slotW + 0.5) slotMask = `linear-gradient(to right, #000 ${(padX + slotW).toFixed(1)}px, transparent ${(padX + slotW + size * 0.22).toFixed(1)}px)`;
      slotEls.push(
        <span
          key={`s${k}`}
          style={{
            ...text(slotColor),
            left: padX,
            top: pad,
            ...(st ? unitCss(st, size) : {opacity: ex!.o, filter: `blur(${(ex!.b * size).toFixed(2)}px)`, transform: `translateY(${(ex!.y * size).toFixed(2)}px)`}),
          }}
        >
          {w}
        </span>,
      );
    } else {
      // letters rise one by one (kerning kept by measured offsets), 1 fr stagger, maskRise overshoot; leaving word exits up whole
      const lift = leaving ? leave(frame - at[k + 1]) : 0;
      for (let c = 0; c < w.length; c++) {
        const ch = w[c];
        if (ch === ' ') continue;
        const cx = m(w.slice(0, c + 1), font) - m(ch, font);
        const y = leaving ? lift : 1.15 * size * (1 - spring({frame: fIn - REFLOW_DELAY - c, fps, config: typeSprings.maskRise}));
        slotEls.push(
          <span key={`s${k}-${c}`} style={{...text(slotColor), left: padX + cx, top: pad, transform: Math.abs(y) > 0.01 ? `translateY(${y.toFixed(2)}px)` : undefined}}>
            {ch}
          </span>,
        );
      }
    }
  }
  const afterSt = unitCss(enterState(frame - start - slotStart, e, fps), size);

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          position: 'relative',
          width: 0,
          height: stack ? lineH * 2 : lineH,
          opacity: xs.o,
          filter: xs.b * size > 0.05 ? `blur(${(xs.b * size).toFixed(2)}px)` : undefined,
          transform: Math.abs(xs.y) > 0.0001 ? `translateY(${(xs.y * size).toFixed(2)}px)` : undefined,
          ...p.style,
        }}
      >
        <div style={{position: 'absolute', left: 0, top: 0}}>{beforeEls}</div>
        <div
          style={{
            position: 'absolute',
            left: slotLeft - padX,
            top: slotTop - pad,
            width: Math.max(...ww) + padX * 2,
            height: lineH + pad + padB,
            ...(p.mode === 'blur' ? (slotMask ? {maskImage: slotMask, WebkitMaskImage: slotMask} : {}) : softClip(size)),
          }}
        >
          {slotEls}
        </div>
        {after ? (
          <span style={{...text(color), left: slotLeft + slotW, top: slotTop, ...afterSt}}>{after}</span>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────── FieldType ────────────────────────────────

/** One step of a typing script. Frames at the composition fps. */
export type FieldOp =
  | {type: string; perChar?: number; jitter?: number}
  | {wait: number}
  | {erase: number | 'all'; perChar?: number}
  | {wipe: number}
  | {submit: number};

export type FieldEvent = {frame: number; kind: 'key' | 'erase' | 'select' | 'clear' | 'submit'};

/**
 * Compile a script into states + events (use `events` to glue key-click SFX to every keystroke).
 * Defaults: 2 fr per char (66 ms), select-all wipes, escalating attempts.
 */
export const fieldTimeline = (script: FieldOp[], startFrame = 0, seed = 'field') => {
  const states: {frame: number; text: string; sel: boolean}[] = [{frame: -1e9, text: '', sel: false}];
  const events: FieldEvent[] = [];
  const submits: {start: number; dur: number; text: string}[] = [];
  let t = startFrame;
  let text = '';
  let n = 0;
  for (const op of script) {
    if ('type' in op) {
      const pc = op.perChar ?? 2;
      const j = op.jitter ?? 0.3;
      for (const ch of op.type) {
        text += ch;
        const f = Math.round(t);
        states.push({frame: f, text, sel: false});
        events.push({frame: f, kind: 'key'});
        t += pc * (1 + j * (random(`${seed}-${n++}`) * 2 - 1));
      }
    } else if ('wait' in op) {
      t += op.wait;
    } else if ('erase' in op) {
      const count = op.erase === 'all' ? text.length : Math.min(op.erase, text.length);
      for (let i = 0; i < count; i++) {
        text = text.slice(0, -1);
        const f = Math.round(t);
        states.push({frame: f, text, sel: false});
        events.push({frame: f, kind: 'erase'});
        t += op.perChar ?? 1.5;
      }
    } else if ('wipe' in op) {
      states.push({frame: Math.round(t), text, sel: true});
      events.push({frame: Math.round(t), kind: 'select'});
      t += op.wipe;
      text = '';
      states.push({frame: Math.round(t), text, sel: false});
      events.push({frame: Math.round(t), kind: 'clear'});
    } else if ('submit' in op) {
      submits.push({start: Math.round(t), dur: op.submit, text});
      events.push({frame: Math.round(t), kind: 'submit'});
      text = '';
      states.push({frame: Math.round(t), text, sel: false});
      t += op.submit;
    }
  }
  return {
    states,
    events,
    submits,
    end: Math.round(t),
    at: (frame: number) => {
      let s = states[0];
      for (const x of states) if (x.frame <= frame) s = x;
      return s;
    },
    lastEvent: (frame: number) => {
      let e: FieldEvent | undefined;
      for (const x of events) if (x.frame <= frame) e = x;
      return e;
    },
  };
};

export type FieldTypeProps = {
  script: FieldOp[];
  /** frame of the first keystroke */
  startFrame?: number;
  /** frame the field itself appears (10 fr outExpo entrance) */
  enterFrame?: number;
  /** frame the focus ring turns on (default: 6 fr before the first event) */
  focusFrame?: number;
  seed?: string;
  label?: string;
  placeholder?: string;
  /** show ● instead of characters (password field) */
  mask?: boolean;
  /** segmented meter under the field, lit by typed length / target (strength meter) */
  meter?: {target: number; segments?: number; colors?: string[]};
  width?: number;
  fontSize?: number;
  theme?: Partial<TypeTheme>;
  layout?: 'center' | 'inline';
  style?: React.CSSProperties;
};

/** An input field with a caret and scripted typing (type / wait / erase / wipe / submit): the "you write it down… again" device. */
export const FieldType: React.FC<FieldTypeProps> = ({script, startFrame = 12, enterFrame = 0, focusFrame, seed = 'field', label, placeholder, mask = false, meter, width, fontSize, theme, layout = 'center', style}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const th = useTypeTheme(theme);
  const ready = useFontsReady([`400 100px ${th.font}`, `400 100px ${th.label}`]);
  if (!ready) return null;
  const size = fontSize ?? Math.round(Math.min(H, W) * 0.062);
  const fw = width ?? Math.min(W * 0.86, size * 15);
  const fh = size * 2.2;
  const padX = size * 0.6;
  const tl = fieldTimeline(script, startFrame, seed);
  const st = tl.at(frame);
  const last = tl.lastEvent(frame);
  const firstEvent = tl.events[0]?.frame ?? startFrame;
  const focusAt = focusFrame ?? firstEvent - 6;
  const focus = interpolate(frame, [focusAt, focusAt + 6], [0, 1], clamp);
  const ent = enterState(frame - enterFrame, {...TYPE_ENTER.blurDrop, by: 'line', duration: 10, blur: 0, y: 0.3, scale: 0.97}, fps);
  const font: FontSpec = {family: th.font, size, weight: 400, tracking: '-0.01em', lineHeight: 1.2};
  const shown = mask ? '•'.repeat(st.text.length) : st.text;
  const tw = shown ? measure(shown, font) : 0;
  const inner = fw - padX * 2 - size * 0.2;
  const shift = Math.max(0, tw - inner);
  // caret: solid while keys are landing, then blinks at 1 Hz (15 fr on / 15 fr off)
  const sinceKey = last ? frame - last.frame : 1e9;
  const idle = last ? sinceKey : frame - focusAt;
  const caretOn = focus > 0.5 && (sinceKey < 10 || Math.floor(idle / 15) % 2 === 0);
  const sub = tl.submits.filter((s) => frame >= s.start && frame < s.start + s.dur).pop();
  const flash = last?.kind === 'submit' ? interpolate(sinceKey, [0, 8], [1, 0], clamp) : 0;
  const lit = meter ? Math.min(meter.segments ?? 3, Math.floor((st.text.length / meter.target) * (meter.segments ?? 3) + 1e-6)) : 0;
  const block = (
    <div style={{display: 'flex', flexDirection: 'column', gap: size * 0.45, opacity: ent.o, transform: `translateY(${(ent.y * size).toFixed(2)}px) scale(${ent.s.toFixed(4)})`, ...style}}>
      {label ? <div style={{fontFamily: th.label, fontSize: Math.max(14, size * 0.38), letterSpacing: '0.14em', textTransform: 'uppercase', color: th.muted}}>{label}</div> : null}
      <div
        style={{
          position: 'relative',
          width: fw,
          height: fh,
          borderRadius: size * 0.36,
          background: th.surface,
          border: `${Math.max(1, size * 0.03)}px solid ${interpolateColors(focus, [0, 1], [th.rule, th.accent])}`,
          boxShadow: `0 0 0 ${(size * (0.12 + 0.1 * flash) * focus).toFixed(2)}px ${th.ring}`,
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'absolute', left: padX, right: padX, top: 0, bottom: 0, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: -shift, top: 0, height: fh, display: 'flex', alignItems: 'center', whiteSpace: 'pre', fontFamily: font.family, fontSize: size, fontWeight: 400, letterSpacing: font.tracking, color: th.fg}}>
            {shown ? <span style={{background: st.sel ? th.selection : undefined, borderRadius: size * 0.08, letterSpacing: mask ? '0.08em' : undefined}}>{shown}</span> : null}
            {/* caret sits after the text, or before the placeholder when the field is empty (as in a real input) */}
            <span style={{display: 'inline-block', width: Math.max(2, size * 0.06), height: size * 1.12, marginLeft: shown ? size * 0.04 : 0, marginRight: shown ? 0 : -Math.max(2, size * 0.06), background: th.accent, opacity: caretOn ? 1 : 0, borderRadius: 1, position: 'relative', zIndex: 1}} />
            {!shown && !sub && placeholder ? <span style={{color: th.muted, opacity: 1 - focus * 0.3}}>{placeholder}</span> : null}
          </div>
          {sub ? (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: fh,
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'pre',
                fontFamily: font.family,
                fontSize: size,
                letterSpacing: font.tracking,
                color: th.fg,
                opacity: 1 - easings.inQuad(clamp01((frame - sub.start) / sub.dur)),
                transform: `translateY(${(-0.8 * size * easings.inQuad(clamp01((frame - sub.start) / sub.dur))).toFixed(2)}px)`,
              }}
            >
              {mask ? '•'.repeat(sub.text.length) : sub.text}
            </div>
          ) : null}
        </div>
      </div>
      {meter ? (
        <div style={{display: 'flex', gap: size * 0.16}}>
          {Array.from({length: meter.segments ?? 3}).map((_, i) => (
            <div key={i} style={{flex: 1, height: Math.max(3, size * 0.08), borderRadius: size, background: i < lit ? (meter.colors?.[lit - 1] ?? th.accent) : th.rule}} />
          ))}
        </div>
      ) : null}
    </div>
  );
  return layout === 'inline' ? block : <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{block}</AbsoluteFill>;
};
