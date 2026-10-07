// Notifications family: notifications that arrive and stack, pills / islands that morph open, an agent orb with glass
// status cards. Numbers measured frame by frame from studied launch films (30 fps; scale frame counts with fps/30 at 60).
// Everything is frame-driven (useCurrentFrame + props) and deterministic. Colours and fonts come from the brand
// (useBrand); every component takes `theme?: Partial<NotifTheme>` to override. Sizes are px at 1080p.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import type {SpringConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {springs} from './springs';
import {easings} from './easings';
import {useBrand} from '../brand/BrandProvider';
import {alpha, luminance, mix, onColor} from '../brand/color';
import type {ResolvedBrand} from '../brand/types';

// ───────────────────────────────────────────── theme ─────────────────────────────────────────────

/** Colours + fonts the family draws with, derived from the brand (notifThemeFromBrand). */
export type NotifTheme = {
  mode: 'dark' | 'light';
  /** UI text face */
  font: string;
  mono: string;
  display: string;
  bg: string;
  fg: string;
  fg2: string;
  muted: string;
  accent: string;
  accentLight: string;
  accentDeep: string;
  /** translucent fill for cards / banners */
  glass: string;
  glassBorder: string;
  /** row / pill fill inside glass */
  fill: string;
  /** hairline borders inside cards */
  hair: string;
  /** drop-shadow alpha (heavier on dark) */
  shadow: number;
  /** the island / notch fill (always near-black: it is hardware) and the ink on it */
  island: string;
  islandFg: string;
  islandMuted: string;
  /** capsule fill and the ink on it */
  pill: string;
  onPill: string;
  /** card radius at 1080p */
  radius: number;
};

export const notifThemeFromBrand = (b: ResolvedBrand): NotifTheme => {
  const dark = b.theme === 'dark';
  const c = b.colors;
  return {
    mode: b.theme,
    font: b.font.text,
    mono: b.font.mono,
    display: b.font.display,
    bg: c.bg,
    fg: c.fg,
    fg2: mix(c.fg, c.muted, 0.45),
    muted: c.muted,
    accent: c.accent,
    accentLight: mix(c.accent, '#FFFFFF', 0.55),
    accentDeep: mix(c.accent, '#000000', 0.7),
    glass: dark ? alpha(mix(c.surface, '#000000', 0.15), 0.78) : alpha(c.surface, 0.88),
    glassBorder: dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)',
    fill: dark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.04)',
    hair: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
    shadow: dark ? 0.5 : 0.14,
    island: '#000000',
    islandFg: '#F5F5F7',
    islandMuted: '#8E8E93',
    pill: dark ? mix(c.surface, c.fg, 0.04) : c.surface,
    onPill: c.fg,
    radius: b.radius,
  };
};

/** The brand's NotifTheme merged with overrides. */
export const useNotifTheme = (theme?: Partial<NotifTheme>): NotifTheme => {
  const b = useBrand();
  return {...notifThemeFromBrand(b), ...theme};
};

/** Springs for this family that springs.ts does not have (never inline a config). */
export const notifSprings = {
  /** verified badge: peak at ~7 frames, ~5 % overshoot (ζ≈0.7). springs.pop overshoots ~13 %, too much. */
  badge: {stiffness: 360, damping: 26, mass: 1},
  /** island opening: ~5 % overshoot, peak ~10 frames, on width and height. */
  island: {stiffness: 210, damping: 20, mass: 1},
  /** desktop banner sliding in from the right edge: fast, < 1 % overshoot (a 700 px slide can't wobble). */
  banner: {stiffness: 240, damping: 26, mass: 1},
} satisfies Record<string, Partial<SpringConfig>>;

/** Fitted easings. */
export const notifEase = {
  /** dot → capsule grow over 12 frames: slow start from the dot, fast middle, clean landing. */
  pillGrow: Easing.bezier(0.5, 0.1, 0.45, 1),
  /** notification landing from the camera over 7 frames: scale 1.47 → 1 without overshoot. */
  landing: Easing.bezier(0.35, 0.05, 0.7, 1),
};

/** Measured timings in frames at 30 fps. */
export const NOTIF_T = {
  /** landing from the camera */
  land: 7,
  landScale: 1.47,
  landBlur: 8,
  /** queued card rising into its slot */
  rise: 6,
  /** call pill materialising in place (opacity + blur, no move) */
  materialize: 8,
  /** exits are shorter than entrances */
  exit: 7,
  /** rows inside a status card */
  rowStagger: 7,
  rowFade: 6,
  /** heading typing, chars per frame */
  typeCpf: 1,
  /** orb fade-in */
  orbIn: 8,
} as const;

/** Tag build, frames from the start: container 0–12 · label 14–21 · leading 19–25 · trailing pop 27. */
export const PILL_T = {grow: 12, label: 14, labelDur: 7, leading: 19, leadingDur: 6, trailing: 27, outContent: 5, shrink: 8};
export type PillTiming = typeof PILL_T;

// ───────────────────────────────────────────── helpers ─────────────────────────────────────────────

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
/** 0..1 over [start, start+dur], clamped, optional easing */
const ramp = (frame: number, start: number, dur: number, easing?: (t: number) => number) => interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], {...CL, easing});
/** spring that is exactly 0 before its start frame */
const sp = (f: number, fps: number, config: Partial<SpringConfig>) => (f <= 0 ? 0 : spring({frame: f, fps, config}));
/** sum of decaying pulses (1 at the pulse frame → 0 after `len` frames), squared for a soft tail */
const pulseAt = (frame: number, at: number[], len = 20) => at.reduce((s, p) => (frame >= p && frame < p + len ? s + Math.pow(1 - (frame - p) / len, 2) : s), 0);

/** Sound cue frames so a film can glue an SFX to every event (every visual event = a sound). */
export const notifCues = {
  stack: (items: NotifItem[]) => items.flatMap((i) => [{frame: i.at, kind: 'arrive' as const}, ...(i.out != null ? [{frame: i.out, kind: 'dismiss' as const}] : [])]),
  pill: (at: number, t: Partial<PillTiming> = {}) => {
    const T = {...PILL_T, ...t};
    return [{frame: at, kind: 'grow' as const}, {frame: at + T.leading, kind: 'leading' as const}, {frame: at + T.trailing, kind: 'badge' as const}];
  },
  island: (at: number, updates: {at: number}[] = [], closeAt?: number) => [
    {frame: at, kind: 'open' as const},
    ...updates.map((u) => ({frame: u.at, kind: 'update' as const})),
    ...(closeAt != null ? [{frame: closeAt, kind: 'close' as const}] : []),
  ],
};

// ───────────────────────────────────────────── glyphs ─────────────────────────────────────────────

export type NotifGlyphKind = 'mail' | 'chat' | 'calendar' | 'call' | 'doc' | 'spark' | 'check' | 'bell';

/** Neutral line glyphs (no third-party marks). 24-unit grid. */
export const NotifGlyph: React.FC<{kind: NotifGlyphKind; size: number; color?: string; stroke?: number}> = ({kind, size, color = 'currentColor', stroke = 2}) => {
  const p = {fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display: 'block'}}>
      {kind === 'mail' && (
        <>
          <rect x={3} y={5.5} width={18} height={13} rx={2.5} {...p} />
          <polyline points="3.5,7 12,13 20.5,7" {...p} />
        </>
      )}
      {kind === 'chat' && <path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16H10l-4.5 3.5V16H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 5z" {...p} />}
      {kind === 'calendar' && (
        <>
          <rect x={3.5} y={5} width={17} height={15} rx={2.5} {...p} />
          <line x1={3.5} y1={10} x2={20.5} y2={10} {...p} />
          <line x1={8} y1={3} x2={8} y2={7} {...p} />
          <line x1={16} y1={3} x2={16} y2={7} {...p} />
        </>
      )}
      {kind === 'call' && <path d="M6.5 3.5h3l1.6 4.2-2 1.3a10.5 10.5 0 0 0 5.9 5.9l1.3-2 4.2 1.6v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" {...p} />}
      {kind === 'doc' && (
        <>
          <path d="M7 3h7l4 4v14H7z" {...p} />
          <path d="M14 3v4h4" {...p} />
        </>
      )}
      {kind === 'spark' && <path d="M12 2.5l2.3 7.2 7.2 2.3-7.2 2.3L12 21.5l-2.3-7.2L2.5 12l7.2-2.3z" fill={color} />}
      {kind === 'check' && <polyline points="5,12.5 10,17 19,7" {...p} />}
      {kind === 'bell' && (
        <>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" {...p} />
          <path d="M10 20.5a2 2 0 0 0 4 0" {...p} />
        </>
      )}
    </svg>
  );
};

/** App tile: a squircle with a soft gradient and a glyph (a neutral stand-in for an app icon). Default tint: brand accent. */
export const AppTile: React.FC<{size: number; glyph?: NotifGlyphKind; tint?: string; children?: React.ReactNode}> = ({size, glyph = 'bell', tint, children}) => {
  const b = useBrand();
  const t = tint ?? b.colors.accent;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.235,
        flexShrink: 0,
        background: `linear-gradient(160deg, ${t} 0%, color-mix(in srgb, ${t} 62%, #000) 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.22), 0 ${size * 0.08}px ${size * 0.2}px rgba(0,0,0,.3)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // white glyph unless the tint is very light (a lime or a pale accent)
        color: t.startsWith('#') && luminance(t) > 0.55 ? '#0A0A0A' : '#FFFFFF',
      }}
    >
      {children ?? <NotifGlyph kind={glyph} size={size * 0.52} stroke={2.1} />}
    </div>
  );
};

/** Initials on an accent gradient disc (placeholder avatar). */
export const Initials: React.FC<{text: string; size: number; theme?: Partial<NotifTheme>}> = ({text, size, theme}) => {
  const th = useNotifTheme(theme);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        flexShrink: 0,
        background: `radial-gradient(circle at 32% 28%, ${th.accentLight} 0%, ${th.accent} 48%, ${th.accentDeep} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: th.font,
        fontWeight: 600,
        fontSize: size * 0.38,
        color: onColor(th.accent),
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </div>
  );
};

/** Scalloped "verified" seal with a check. */
export const VerifiedSeal: React.FC<{size: number; color?: string; ink?: string}> = ({size, color, ink}) => {
  const b = useBrand();
  const c = color ?? b.colors.accent;
  const pts = Array.from({length: 24}, (_, i) => {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 11.5 : 10.1;
    return `${12 + r * Math.cos(a)},${12 + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display: 'block'}}>
      <polygon points={pts} fill={c} stroke={c} strokeWidth={1.6} strokeLinejoin="round" />
      <polyline points="7.4,12.3 10.6,15.4 16.6,9" fill="none" stroke={ink ?? (c.startsWith('#') ? onColor(c) : '#000')} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ───────────────────────────────────────── notifications ─────────────────────────────────────────

export type NotifItem = {
  id?: string;
  /** arrival frame */
  at: number;
  /** dismiss frame (optional): the card leaves and the ones behind it move back up */
  out?: number;
  /** small source label above the title (your product or a neutral name; never a third-party app) */
  app?: string;
  title: string;
  body?: string;
  time?: string;
  glyph?: NotifGlyphKind;
  tint?: string;
  icon?: React.ReactNode;
  /** per-item entrance override (e.g. the one that matters lands from the camera while the rest slide) */
  entrance?: NotificationEntrance;
};

export type NotificationEntrance = 'land' | 'slide' | 'rise' | 'materialize';

export type NotificationStackProps = {
  items: NotifItem[];
  /** 'phone' = big rounded lock-screen cards; 'desktop' = desktop banners (top-right) */
  variant?: 'phone' | 'desktop';
  /** 'stack' = older cards tuck behind the newest (scale / opacity / blur by depth); 'list' = they push down, overflow beyond maxVisible compresses */
  layout?: 'stack' | 'list';
  /** card width in px (phone default 720, desktop default 640) */
  width?: number;
  /** full cards in 'list' layout before compressing (default 3) */
  maxVisible?: number;
  /** phone default 'land', desktop default 'slide' */
  entrance?: NotificationEntrance;
  /** offset the landing card starts from, as fractions of card width / height (up-left) */
  landFrom?: {x: number; y: number};
  theme?: Partial<NotifTheme>;
  style?: React.CSSProperties;
};

/** Depth look: depth 1 ≈ 0.94 scale / 0.72 opacity. On a plain background the cards behind need more presence than on a wallpaper. */
const DEPTH = {k: [0, 1, 2, 3], scale: [1, 0.94, 0.88, 0.82], opacity: [1, 0.72, 0.42, 0], blur: [0, 0.8, 1.6, 2.4]};

/** One notification card / banner. Used by NotificationStack; usable alone for a static banner. */
export const NotifCard: React.FC<{item: NotifItem; variant?: 'phone' | 'desktop'; width: number; contentOpacity?: number; theme?: Partial<NotifTheme>}> = ({
  item,
  variant = 'phone',
  width,
  contentOpacity = 1,
  theme,
}) => {
  const th = useNotifTheme(theme);
  const desk = variant === 'desktop';
  const u = width / (desk ? 640 : 720);
  const H = (desk ? 108 : 124) * u;
  const icon = (desk ? 54 : 62) * u;
  const dark = th.mode === 'dark';
  return (
    <div
      style={{
        width,
        height: H,
        boxSizing: 'border-box',
        borderRadius: Math.max(desk ? 20 : 28, th.radius * 1.2) * u,
        background: `linear-gradient(180deg, ${dark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.5)'}, rgba(255,255,255,0) 40%), ${th.glass}`,
        backdropFilter: 'blur(28px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
        border: `1px solid ${th.glassBorder}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,${dark ? 0.08 : 0.6}), 0 ${18 * u}px ${50 * u}px rgba(0,0,0,${th.shadow})`,
        display: 'flex',
        alignItems: 'center',
        gap: 18 * u,
        padding: `0 ${24 * u}px 0 ${22 * u}px`,
        position: 'relative',
      }}
    >
      {/* cards tucked behind get a light veil so the stack edge reads on a plain background */}
      {contentOpacity < 1 ? (
        <div style={{position: 'absolute', inset: 0, borderRadius: 'inherit', background: dark ? `rgba(255,255,255,${0.09 * (1 - contentOpacity)})` : `rgba(0,0,0,${0.04 * (1 - contentOpacity)})`, pointerEvents: 'none'}} />
      ) : null}
      <div style={{opacity: contentOpacity}}>{item.icon ?? <AppTile size={icon} glyph={item.glyph} tint={item.tint ?? th.accent} />}</div>
      <div style={{flex: 1, minWidth: 0, opacity: contentOpacity, fontFamily: th.font, display: 'flex', flexDirection: 'column', gap: 3 * u}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 * u}}>
          <span style={{fontSize: (desk ? 16 : 17) * u, fontWeight: 500, color: th.muted, letterSpacing: '0.01em', whiteSpace: 'nowrap'}}>{item.app ?? ''}</span>
          <span style={{fontFamily: th.mono, fontSize: (desk ? 13 : 14) * u, color: th.muted, whiteSpace: 'nowrap'}}>{item.time ?? 'now'}</span>
        </div>
        <div style={{fontSize: (desk ? 21 : 23) * u, fontWeight: 600, color: th.fg, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.title}</div>
        {item.body ? <div style={{fontSize: (desk ? 18.5 : 20) * u, fontWeight: 400, color: th.fg2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.body}</div> : null}
      </div>
    </div>
  );
};

/**
 * Notifications arrive one by one; the older ones push down (list) or tuck behind the newest (stack), shrinking / fading /
 * blurring by depth. Depth is additive: every newer arrival adds 1 through its own springs.layout (10 frames, no overshoot),
 * every newer dismissal takes 1 back. Render inside a positioned parent; the block is `width` wide and its top edge is the
 * newest card's top.
 */
export const NotificationStack: React.FC<NotificationStackProps> = ({items, variant = 'phone', layout, width, maxVisible, entrance, landFrom = {x: -0.22, y: -0.4}, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const th = useNotifTheme(theme);
  const desk = variant === 'desktop';
  const W = width ?? (desk ? 640 : 720);
  const u = W / (desk ? 640 : 720);
  const H = (desk ? 108 : 124) * u;
  const gap = (desk ? 12 : 10) * u;
  const peek = 18 * u;
  const lay = layout ?? (desk ? 'list' : 'stack');
  const maxV = lay === 'stack' ? 1 : Math.max(1, maxVisible ?? 3);
  const ent: NotificationEntrance = entrance ?? (desk ? 'slide' : 'land');
  const step = H + gap;
  const sorted = items.map((it, i) => ({...it, key: it.id ?? `n${i}`})).sort((a, b) => a.at - b.at);
  const totalH = (maxV - 1) * step + H + 3 * peek;

  return (
    <div style={{position: 'relative', width: W, height: totalH, ...style}}>
      {sorted.map((it, i) => {
        if (frame < it.at - 1) return null;
        if (it.out != null && frame > it.out + NOTIF_T.exit) return null;
        let depth = 0;
        for (let j = i + 1; j < sorted.length; j++) {
          const n = sorted[j];
          depth += sp(frame - n.at, fps, springs.layout);
          if (n.out != null) depth -= sp(frame - n.out - 3, fps, springs.layout);
        }
        depth = Math.max(0, depth);
        const k = lay === 'list' ? Math.max(0, depth - (maxV - 1)) : depth;
        const y = (lay === 'list' ? Math.min(depth, maxV - 1) * step : 0) + k * peek;
        const ds = interpolate(k, DEPTH.k, DEPTH.scale, CL);
        const dO = interpolate(k, DEPTH.k, DEPTH.opacity, CL);
        const dB = interpolate(k, DEPTH.k, DEPTH.blur, CL);
        const contentO = lay === 'stack' || k > 0 ? interpolate(k, [0, 0.6], [1, 0], CL) : 1;
        if (dO <= 0.001) return null;

        // entrance (own clock)
        const f = frame - it.at;
        const entI = it.entrance ?? ent;
        let ex = 0;
        let ey = 0;
        let es = 1;
        let eo = 1;
        let eb = 0;
        if (entI === 'land') {
          const p = notifEase.landing(clamp(f / NOTIF_T.land));
          es = lerp(NOTIF_T.landScale, 1, p);
          ex = landFrom.x * W * (1 - p);
          ey = landFrom.y * H * (1 - p);
          eo = interpolate(f, [-1, 0, 5], [0, 0.3, 1], CL);
          eb = lerp(NOTIF_T.landBlur, 0, p);
        } else if (entI === 'slide') {
          const p = sp(f + 1, fps, notifSprings.banner);
          ex = (1 - p) * (W + 80 * u);
          eo = interpolate(f, [-1, 3], [0, 1], CL);
          eb = interpolate(f, [0, 5], [6, 0], CL);
        } else if (entI === 'rise') {
          const p = ramp(frame, it.at, NOTIF_T.rise, easings.outQuint);
          ey = (1 - p) * H * 0.6;
          es = lerp(0.89, 1, p);
          eo = interpolate(f, [-1, 1, NOTIF_T.rise], [0, 0.5, 1], CL);
          eb = lerp(2, 0, p);
        } else {
          eo = ramp(frame, it.at - 1, NOTIF_T.materialize);
          eb = lerp(8, 0, eo);
        }
        // exit (own clock): desktop slides off to the right, phone lifts and fades
        if (it.out != null) {
          const e = ramp(frame, it.out, NOTIF_T.exit, easings.inExpo);
          if (desk) ex += e * (W + 80 * u);
          else ey -= e * H * 0.5;
          es *= 1 - 0.04 * e;
          eo *= 1 - e;
        }
        const blur = dB + eb;
        return (
          <div
            key={it.key}
            style={{position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `translateY(${y}px) scale(${ds})`, transformOrigin: '50% 100%', opacity: dO, zIndex: 1000 - Math.round(depth * 10)}}
          >
            <div style={{width: W, height: H, transformOrigin: '50% 50%', transform: `translate(${ex}px, ${ey}px) scale(${es})`, opacity: eo, filter: blur > 0.05 ? `blur(${blur}px)` : undefined}}>
              <NotifCard item={it} variant={variant} width={W} contentOpacity={contentO} theme={th} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Desktop banner stack: NotificationStack with desktop defaults (slide in from the right, list layout, 3 visible). Place it top-right of a screen. */
export const BannerStack: React.FC<Omit<NotificationStackProps, 'variant'>> = (props) => <NotificationStack variant="desktop" {...props} />;

// ───────────────────────────────────────── pill morph ─────────────────────────────────────────

export type PillMorphProps = {
  /** start frame of the build */
  at?: number;
  /** frame the contents start leaving; the capsule shrinks back to a dot after them */
  closeAt?: number;
  /** capsule height (measured 18 % of frame height; default 150). Width hugs the content unless `width` is given. */
  height?: number;
  width?: number;
  fill?: string;
  color?: string;
  /** leading slot (default: initials avatar). `false` hides the slot. */
  leading?: React.ReactNode | false;
  initials?: string;
  label: React.ReactNode;
  /** trailing slot (default: verified seal in accent). `false` hides the slot. */
  trailing?: React.ReactNode | false;
  timing?: Partial<PillTiming>;
  fontSize?: number;
  theme?: Partial<NotifTheme>;
  style?: React.CSSProperties;
};

/**
 * Tag build: dot → capsule (12 f, notifEase.pillGrow; a uniform scale of the finished capsule, aspect stays ~4:1) → label fades
 * in (7 f) → leading slides in from the left edge inside the mask (6 f) → trailing badge pops (notifSprings.badge). Slots are
 * laid out from the start, so nothing re-flows. Close = contents out (5 f), then the capsule shrinks to a dot (8 f, inExpo).
 */
export const PillMorph: React.FC<PillMorphProps> = ({at = 0, closeAt, height = 150, width, fill, color, leading, initials = 'AK', label, trailing, timing, fontSize, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const th = useNotifTheme(theme);
  const T = {...PILL_T, ...timing};
  const grow = ramp(frame, at, T.grow, notifEase.pillGrow);
  const out = closeAt != null ? ramp(frame, closeAt, T.outContent, easings.inExpo) : 0;
  const shrink = closeAt != null ? ramp(frame, closeAt + T.outContent - 1, T.shrink, easings.inExpo) : 0;
  const p = grow * (1 - shrink);
  const pad = height * 0.1;
  const lead = height - 2 * pad;
  const badge = height * 0.4;
  const showLead = leading !== false;
  const showTrail = trailing !== false;
  const labelO = ramp(frame, at + T.label, T.labelDur) * (1 - out);
  const labelB = lerp(6, 0, ramp(frame, at + T.label, T.labelDur));
  const leadP = ramp(frame, at + T.leading, T.leadingDur, easings.outQuint);
  const leadO = interpolate(frame, [at + T.leading, at + T.leading + 2], [0, 1], CL) * (1 - out);
  const badgeS = sp(frame - at - T.trailing, fps, notifSprings.badge) * (1 - out);
  const dark = th.mode === 'dark';
  return (
    <div style={{display: 'inline-flex', ...style}}>
      <div style={{transform: `scale(${p})`, transformOrigin: '50% 50%', visibility: p <= 0.001 ? 'hidden' : 'visible'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height,
            width,
            boxSizing: 'border-box',
            borderRadius: height / 2,
            overflow: 'hidden',
            background: fill ?? `linear-gradient(180deg, rgba(255,255,255,${dark ? 0.06 : 0.5}), rgba(255,255,255,0) 55%), ${th.pill}`,
            gap: pad * 0.9,
            // a capsule needs an edge on a plain background: hairline + a soft accent rim glow
            boxShadow: `inset 0 1px 0 rgba(255,255,255,${dark ? 0.1 : 0.7}), inset 0 0 0 1px ${th.glassBorder}, 0 0 0 1px ${alpha(th.accent, 0.28)}, 0 0 ${height * 0.3}px ${alpha(th.accent, 0.2)}${dark ? '' : `, 0 ${height * 0.08}px ${height * 0.25}px rgba(0,0,0,0.08)`}`,
            padding: `0 ${showTrail ? pad * 1.3 : pad * 2.2}px 0 ${showLead ? pad : pad * 2.2}px`,
          }}
        >
          {showLead ? (
            <div style={{width: lead, height: lead, flexShrink: 0, opacity: leadO, transform: `translateX(${-(1 - leadP) * (lead + pad + height * 0.6)}px)`}}>
              {leading ?? <Initials text={initials} size={lead} theme={th} />}
            </div>
          ) : null}
          <div
            style={{
              flex: width ? 1 : 'none',
              minWidth: 0,
              textAlign: width && !showLead ? 'center' : 'left',
              whiteSpace: 'nowrap',
              fontFamily: th.display,
              fontWeight: 600,
              fontSize: fontSize ?? height * 0.3,
              letterSpacing: '-0.02em',
              color: color ?? th.onPill,
              paddingLeft: showLead ? pad * 0.3 : 0,
              opacity: labelO,
              filter: labelB > 0.05 ? `blur(${labelB}px)` : undefined,
            }}
          >
            {label}
          </div>
          {showTrail ? (
            <div style={{width: badge, height: badge, flexShrink: 0, transform: `scale(${badgeS})`}}>{trailing ?? <VerifiedSeal size={badge} color={th.accent} />}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────── island pill ─────────────────────────────────────────

export type IslandContent = {
  eyebrow?: string;
  label: string;
  /** override the auto-estimated open width */
  w?: number;
  trailing?: string;
  /** leading mark: live accent dot (default) or a done check */
  tone?: 'live' | 'done';
};

export type IslandPillProps = {
  /** frame the island starts opening */
  at: number;
  closeAt?: number;
  content: IslandContent;
  /** content swaps while open: old line lifts out, new line rises in, width re-springs, a glow pulse fires */
  updates?: Array<IslandContent & {at: number}>;
  /** notch size at rest (default 236×40) */
  collapsed?: {w: number; h: number};
  /** open height (default 72) */
  height?: number;
  /** extra glow pulses (e.g. when cards fly into the island) */
  pulses?: number[];
  /** hairline around the island so it reads on pure black (default true) */
  ring?: boolean;
  theme?: Partial<NotifTheme>;
  style?: React.CSSProperties;
};

const estimateIslandW = (c: IslandContent, H: number) => {
  const pad = H * 0.42;
  const dot = H * 0.26;
  const eb = c.eyebrow ? c.eyebrow.length * H * 0.2 * 0.66 + H * 0.2 : 0;
  const lb = c.label.length * H * 0.33 * 0.53;
  const tr = c.trailing ? c.trailing.length * H * 0.2 * 0.66 + H * 0.3 : 0;
  return Math.round(pad * 2 + dot + H * 0.22 + eb + lb + tr);
};

/**
 * A status island at the top centre of a screen. Before `at` it is a notch (with concave shoulders); it springs open on width
 * AND height (notifSprings.island, ~5 % overshoot), content arrives dot → eyebrow → label (2-frame stagger, blur-in), updates
 * swap the line vertically and re-spring the width, close = content out, then a layout spring back to the notch.
 * Renders absolutely at the top centre of its parent.
 */
export const IslandPill: React.FC<IslandPillProps> = ({at, closeAt, content, updates = [], collapsed = {w: 236, h: 40}, height = 72, pulses = [], ring = true, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const th = useNotifTheme(theme);
  const H = height;
  const states = [{...content, at}, ...[...updates].sort((a, b) => a.at - b.at)];
  const widths = states.map((s) => s.w ?? estimateIslandW(s, H));
  let W = widths[0];
  // width leads when the new line is longer (room first), lags 5 frames when shorter (old line leaves first)
  for (let k = 1; k < states.length; k++) {
    const dw = widths[k] - widths[k - 1];
    W += sp(frame - states[k].at - (dw < 0 ? 5 : 0), fps, springs.ui) * dw;
  }
  const openP = sp(frame - at, fps, notifSprings.island);
  const closeP = closeAt != null ? sp(frame - closeAt - 4, fps, springs.layout) : 0;
  const p = Math.max(0, openP - closeP);
  const w = lerp(collapsed.w, W, p);
  const h = Math.max(collapsed.h, lerp(collapsed.h, H, p));
  const rb = lerp(collapsed.h * 0.32, H / 2, clamp(p));
  const shoulder = collapsed.h * 0.3;
  const glow = pulseAt(frame, [at + 4, ...updates.map((u) => u.at), ...pulses], 22);
  const closeOut = closeAt != null ? ramp(frame, closeAt, 5, easings.inExpo) : 0;
  const breathe = 0.5 + 0.5 * Math.sin(((frame / fps) * Math.PI * 2) / 1.6);

  return (
    <div style={{position: 'absolute', top: 0, left: '50%', width: 0, height: 0, zIndex: 50, ...style}}>
      <div style={{position: 'absolute', top: 0, left: -w / 2, width: w, height: h}}>
        {/* concave shoulders where the island meets the screen edge */}
        <div style={{position: 'absolute', top: 0, left: -shoulder, width: shoulder, height: shoulder, background: `radial-gradient(circle at 0% 100%, transparent ${shoulder - 0.5}px, ${th.island} ${shoulder}px)`}} />
        <div style={{position: 'absolute', top: 0, right: -shoulder, width: shoulder, height: shoulder, background: `radial-gradient(circle at 100% 100%, transparent ${shoulder - 0.5}px, ${th.island} ${shoulder}px)`}} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: th.island,
            overflow: 'hidden',
            borderRadius: `0 0 ${rb}px ${rb}px`,
            boxShadow: [
              ring ? `inset 0 -1px 0 rgba(255,255,255,${0.07 + 0.05 * p}), inset 1px 0 0 rgba(255,255,255,.04), inset -1px 0 0 rgba(255,255,255,.04)` : '',
              `0 ${10 + 8 * p}px ${30 + 20 * p}px rgba(0,0,0,${th.mode === 'dark' ? 0.55 : 0.25})`,
              glow > 0.001 ? `0 0 ${46 * glow}px ${5 * glow}px ${alpha(th.accent, Math.min(0.6, 0.55 * glow))}` : '',
            ]
              .filter(Boolean)
              .join(', '),
          }}
        >
          {states.map((s, k) => {
            const next = states[k + 1];
            const first = k === 0;
            const base = s.at + (first ? 5 : 2);
            if (frame < base) return null;
            const outP = next ? ramp(frame, next.at, 6, easings.inExpo) : closeOut;
            if (outP >= 1) return null;
            const part = (delay: number) => {
              const t = ramp(frame, base + (first ? delay : delay / 2), 9, easings.outExpo);
              return {
                opacity: t * (1 - outP),
                filter: `blur(${(1 - t) * 6 + outP * 6}px)`,
                transform: `translateY(${(first ? (1 - t) * H * 0.12 : (1 - t) * H * 0.55) - outP * H * 0.5}px)`,
              } as React.CSSProperties;
            };
            const dotS = first ? sp(frame - base, fps, notifSprings.badge) : 1;
            return (
              <div key={k} style={{position: 'absolute', left: 0, right: 0, top: (h - H) / 2, height: H, display: 'flex', alignItems: 'center', padding: `0 ${H * 0.42}px`, gap: H * 0.22, boxSizing: 'border-box', whiteSpace: 'nowrap'}}>
                <div style={{...part(0), width: H * 0.26, height: H * 0.26, flexShrink: 0, position: 'relative', transform: `${part(0).transform} scale(${dotS})`}}>
                  {s.tone === 'done' ? (
                    <div style={{width: '100%', height: '100%', borderRadius: '50%', background: th.accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <NotifGlyph kind="check" size={H * 0.2} color={onColor(th.accent)} stroke={3} />
                    </div>
                  ) : (
                    <>
                      <div style={{position: 'absolute', inset: -H * 0.08 * (1 + breathe), borderRadius: '50%', background: th.accent, opacity: 0.28 * (1 - breathe * 0.6), filter: `blur(${H * 0.04}px)`}} />
                      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: th.accent, boxShadow: `0 0 ${H * 0.18}px ${th.accent}`}} />
                    </>
                  )}
                </div>
                {s.eyebrow ? (
                  <div style={{...part(2), fontFamily: th.mono, fontSize: H * 0.2, letterSpacing: '0.08em', textTransform: 'uppercase', color: s.tone === 'done' ? th.islandMuted : th.accentLight}}>{s.eyebrow}</div>
                ) : null}
                <div style={{...part(4), flex: '1 0 auto', fontFamily: th.font, fontWeight: 500, fontSize: H * 0.33, letterSpacing: '-0.01em', color: th.islandFg}}>{s.label}</div>
                {s.trailing ? <div style={{...part(6), fontFamily: th.mono, fontSize: H * 0.2, color: th.islandMuted}}>{s.trailing}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────── orb + status ─────────────────────────────────────────

export type OrbPalette = {light: string; core: string; deep: string; glow: string; spec: string};

export const orbPalette = (theme: Pick<NotifTheme, 'accent' | 'accentLight' | 'accentDeep'>): OrbPalette => ({
  light: theme.accentLight,
  core: theme.accent,
  deep: theme.accentDeep,
  glow: theme.accent,
  spec: '#FFFFFF',
});

export type AgentOrbProps = {
  /** diameter in px (measured 36 % of frame height ≈ 390 at 1080p; default 320) */
  size?: number;
  enterAt?: number;
  exitAt?: number;
  /** breathing depth 0..1 (scale ±3.5 % at 1, period 3.2 s) */
  amplitude?: number;
  /** "speaking" / working level 0..1: speeds the inner swirl, adds noise to the breath, lifts the glow */
  energy?: number;
  /** frames that emit a ripple ring + a 4 % swell (card arrivals, a voice beat) */
  pulses?: number[];
  /** entrance drift (px) the orb travels from (~100 px sideways) */
  enterFrom?: {x: number; y: number};
  palette?: Partial<OrbPalette>;
  seed?: string;
  theme?: Partial<NotifTheme>;
  style?: React.CSSProperties;
};

/** Agent orb: a sphere of moving accent light (deterministic noise swirl), specular highlight, rim, outer glow; breathes and pulses. */
export const AgentOrb: React.FC<AgentOrbProps> = ({size = 320, enterAt = 0, exitAt, amplitude = 0.5, energy = 0, pulses = [], enterFrom = {x: 0, y: 0}, palette, seed = 'orb', theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const th = useNotifTheme(theme);
  const pal = {...orbPalette(th), ...palette};
  const t = frame / fps;
  const fIn = frame - enterAt;
  const o = ramp(frame, enterAt, NOTIF_T.orbIn) * (exitAt != null ? 1 - ramp(frame, exitAt, 10, easings.inExpo) : 1);
  if (o <= 0) return <div style={{width: size, height: size, ...style}} />;
  const drift = sp(fIn, fps, springs.heavy);
  const inScale = lerp(0.92, 1, ramp(frame, enterAt, 14, easings.outQuint));
  const inBlur = lerp(10, 0, ramp(frame, enterAt, NOTIF_T.orbIn));
  const outP = exitAt != null ? ramp(frame, exitAt, 10, easings.inExpo) : 0;
  const breath = Math.sin((t * Math.PI * 2) / 3.2);
  const swell = pulseAt(frame, pulses, 14);
  const jitter = energy * noise2D(`${seed}-e`, t * 3, 0);
  const s = inScale * (1 + amplitude * 0.035 * breath + 0.03 * jitter + 0.04 * swell) * (1 - 0.04 * outP);
  const swirl = t * (0.32 + energy * 0.9);
  const hi = pal.light.startsWith('#') ? mix(pal.light, '#FFFFFF', 0.45) : pal.light;
  // each blob swirls around a home position that keeps the lighting consistent (light top-left, shade bottom-right), ±18 % of Ø
  const blob = (i: number, color: string, r: number, blend: React.CSSProperties['mixBlendMode'], a: number, home: [number, number]) => {
    const x = home[0] + 18 * noise2D(`${seed}-x${i}`, swirl, i * 3.1);
    const y = home[1] + 18 * noise2D(`${seed}-y${i}`, swirl, i * 7.7);
    return <div key={i} style={{position: 'absolute', left: `${x - r / 2}%`, top: `${y - r / 2}%`, width: `${r}%`, height: `${r}%`, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, mixBlendMode: blend, opacity: a}} />;
  };
  const ripples = pulses.filter((p) => frame >= p && frame < p + 36);
  const glowO = 0.55 + 0.2 * breath * amplitude + 0.3 * energy + 0.35 * swell;
  return (
    <div style={{position: 'relative', width: size, height: size, opacity: o, transform: `translate(${(1 - drift) * enterFrom.x + outP * 120}px, ${(1 - drift) * enterFrom.y}px)`, ...style}}>
      {/* outer glow */}
      <div style={{position: 'absolute', left: -size * 0.7, top: -size * 0.7, width: size * 2.4, height: size * 2.4, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(pal.glow, 0.4)} 0%, ${alpha(pal.glow, 0.13)} 30%, transparent 62%)`, opacity: glowO, transform: `scale(${s})`}} />
      {/* ripples */}
      {ripples.map((p) => {
        const r = ramp(frame, p, 36, easings.outQuint);
        return <div key={p} style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `${Math.max(1.5, size * 0.006)}px solid ${pal.light}`, transform: `scale(${1 + r * 0.75})`, opacity: 0.55 * (1 - r)}} />;
      })}
      {/* sphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          transform: `scale(${s})`,
          filter: inBlur > 0.05 ? `blur(${inBlur}px)` : undefined,
          background: `radial-gradient(circle at 38% 34%, ${pal.core} 0%, color-mix(in srgb, ${pal.core} 70%, ${pal.deep}) 52%, ${pal.deep} 100%)`,
          boxShadow: `inset ${-size * 0.05}px ${-size * 0.07}px ${size * 0.16}px rgba(0,0,0,.45), inset 0 0 ${size * 0.05}px rgba(255,255,255,.18), 0 0 ${size * 0.12}px ${alpha(pal.glow, 0.33)}`,
        }}
      >
        {blob(0, pal.light, 72, 'screen', 0.7, [40, 38])}
        {blob(1, pal.core, 84, 'screen', 0.55, [56, 52])}
        {blob(2, pal.deep, 70, 'multiply', 0.45, [72, 74])}
        {blob(3, hi, 48, 'screen', 0.4, [34, 64])}
        {/* specular highlight (soft, large) + rim light */}
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 33% 28%, ${alpha(pal.spec, 0.6)} 0%, ${alpha(pal.spec, 0.2)} 14%, ${alpha(pal.spec, 0.05)} 26%, transparent 40%)`}} />
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 70% 82%, ${alpha(pal.light, 0.33)} 0%, transparent 30%)`}} />
      </div>
    </div>
  );
};

/** Live waveform / activity bars, deterministic noise per bar. Default colour: brand accent. */
export const LiveBars: React.FC<{height: number; bars?: number; color?: string; seed?: string; active?: number}> = ({height, bars = 5, color, seed = 'bars', active = 1}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const bw = Math.max(2, height * 0.16);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: bw * 0.8, height}}>
      {Array.from({length: bars}).map((_, i) => {
        const n = Math.abs(noise2D(`${seed}-${i}`, frame * 0.16, i * 1.7));
        const hh = height * (0.25 + 0.75 * n * active);
        return <div key={i} style={{width: bw, height: hh, borderRadius: bw, background: color ?? b.colors.accent}} />;
      })}
    </div>
  );
};

/** Typing with a soft tail: the head advances `cpf` chars per frame, the last `tail` chars ramp up in opacity. */
export const TrailType: React.FC<{text: string; at?: number; cpf?: number; tail?: number; style?: React.CSSProperties}> = ({text, at = 0, cpf = 1.1, tail = 8, style}) => {
  const frame = useCurrentFrame();
  const head = (frame - at) * cpf;
  return (
    <span style={style}>
      {text.split('').map((c, i) => (
        <span key={i} style={{opacity: clamp((head - i) / tail), whiteSpace: 'pre'}}>
          {c}
        </span>
      ))}
    </span>
  );
};

export type StatusRow = {
  label: string;
  meta?: string;
  /** live = pulsing dot, now = accent ring, todo = hollow, done = check */
  state?: 'live' | 'now' | 'todo' | 'done';
  /** frame the row ticks to done (check pops, label dims) */
  doneAt?: number;
};

export type StatusCardProps = {
  at: number;
  exitAt?: number;
  title: string;
  /** mono status line under the title (e.g. "reading 38 threads"); with `live` it gets moving bars */
  status?: string;
  live?: boolean;
  rows?: StatusRow[];
  /** default 560 */
  width?: number;
  /** 'land' = from the camera, 'rise' = from below with an accent tint resolving to glass, 'materialize' = in place */
  entrance?: 'land' | 'rise' | 'materialize';
  rowStagger?: number;
  /** type the title 1 char / frame (default true) */
  typeTitle?: boolean;
  theme?: Partial<NotifTheme>;
  style?: React.CSSProperties;
};

const MiniOrb: React.FC<{size: number; theme: NotifTheme}> = ({size, theme}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      background: `radial-gradient(circle at 34% 30%, #fff 0%, ${theme.accentLight} 18%, ${theme.accent} 55%, ${theme.accentDeep} 100%)`,
      boxShadow: `0 0 ${size * 0.5}px ${alpha(theme.accent, 0.4)}`,
    }}
  />
);

/** Glass status card with an accent rim glow: a title that types, a mono status line, rows that tick to done. */
export const StatusCard: React.FC<StatusCardProps> = ({at, exitAt, title, status, live = false, rows = [], width = 560, entrance = 'land', rowStagger = NOTIF_T.rowStagger, typeTitle = true, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const th = useNotifTheme(theme);
  const dark = th.mode === 'dark';
  const u = width / 560;
  const f = frame - at;
  if (f < -1) return <div style={{width, ...style}} />;
  let s = 1;
  let y = 0;
  let o = 1;
  let b = 0;
  let tint = 0;
  if (entrance === 'land') {
    const p = notifEase.landing(clamp(f / 12));
    s = lerp(1.6, 1, p);
    b = lerp(14, 0, p);
    o = interpolate(f, [-1, 1, 8], [0, 0.4, 1], CL);
  } else if (entrance === 'rise') {
    const p = sp(f + 1, fps, springs.ui);
    y = (1 - p) * 80 * u;
    s = lerp(0.86, 1, p);
    o = interpolate(f, [-1, 0, 8], [0, 0.1, 1], CL);
    tint = 1 - ramp(frame, at + 2, 12);
    b = lerp(6, 0, ramp(frame, at, 8));
  } else {
    o = ramp(frame, at - 1, NOTIF_T.materialize);
    b = lerp(8, 0, o);
  }
  if (exitAt != null) {
    const e = ramp(frame, exitAt, NOTIF_T.exit, easings.inExpo);
    o *= 1 - e;
    s *= 1 - 0.03 * e;
    y -= 14 * u * e;
  }
  const titleStart = at + 4;
  const nChars = typeTitle ? Math.max(0, Math.floor((frame - titleStart) * NOTIF_T.typeCpf)) : title.length;
  const statusO = ramp(frame, at + 6, 8);
  const cardBg = dark
    ? `linear-gradient(180deg, ${alpha(mix(th.accentDeep, '#222630', 0.7), 0.72)} 0%, ${alpha(mix(th.bg, '#101012', 0.5), 0.8)} 100%)`
    : `linear-gradient(180deg, rgba(255,255,255,0.94) 0%, ${alpha(mix(th.bg, '#FFFFFF', 0.5), 0.92)} 100%)`;
  return (
    <div style={{width, transform: `translateY(${y}px) scale(${s})`, transformOrigin: '50% 60%', opacity: o, filter: b > 0.05 ? `blur(${b}px)` : undefined, ...style}}>
      <div
        style={{
          position: 'relative',
          borderRadius: Math.max(20, th.radius * 1.6) * u,
          padding: `${26 * u}px ${26 * u}px ${22 * u}px`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          background: cardBg,
          backdropFilter: 'blur(30px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(30px) saturate(1.4)',
          boxShadow: `0 0 0 1px ${alpha(th.accent, 0.32)}, 0 0 ${38 * u}px ${alpha(th.accent, dark ? 0.24 : 0.14)}, inset 0 1px 0 rgba(255,255,255,${dark ? 0.08 : 0.8}), 0 ${30 * u}px ${80 * u}px rgba(0,0,0,${dark ? 0.6 : 0.12})`,
        }}
      >
        {tint > 0.001 ? <div style={{position: 'absolute', inset: 0, background: th.accent, opacity: 0.3 * tint}} /> : null}
        <div style={{display: 'flex', alignItems: 'center', gap: 14 * u}}>
          <MiniOrb size={34 * u} theme={th} />
          <div style={{fontFamily: th.display, fontWeight: 600, fontSize: 30 * u, letterSpacing: '-0.02em', color: th.fg, whiteSpace: 'nowrap', minHeight: 36 * u}}>
            {title.slice(0, nChars)}
            {typeTitle && nChars < title.length && nChars > 0 ? <span style={{opacity: 0.25}}>{title.charAt(nChars)}</span> : null}
          </div>
        </div>
        {status ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 10 * u, marginTop: 10 * u, marginLeft: 48 * u, opacity: statusO}}>
            {live ? <LiveBars height={14 * u} bars={5} color={th.accent} seed={`${title}-st`} /> : null}
            <span style={{fontFamily: th.mono, fontSize: 14 * u, color: th.muted, letterSpacing: '0.02em'}}>{status}</span>
          </div>
        ) : null}
        {rows.length > 0 ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 10 * u, marginTop: 20 * u}}>
            {rows.map((r, i) => {
              const rs = at + 8 + i * rowStagger;
              const rp = ramp(frame, rs, NOTIF_T.rowFade, easings.outQuint);
              const done = r.doneAt != null && frame >= r.doneAt;
              const doneP = r.doneAt != null ? sp(frame - r.doneAt, fps, notifSprings.badge) : 0;
              const state = done ? 'done' : r.state ?? 'todo';
              const icon = 22 * u;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14 * u,
                    height: 54 * u,
                    padding: `0 ${18 * u}px`,
                    borderRadius: 27 * u,
                    background: state === 'now' ? alpha(th.accent, 0.12) : th.fill,
                    border: `1px solid ${state === 'now' ? alpha(th.accent, 0.35) : th.hair}`,
                    opacity: rp,
                    filter: rp < 1 ? `blur(${(1 - rp) * 5}px)` : undefined,
                    transform: `translateY(${(1 - rp) * 8 * u}px)`,
                  }}
                >
                  <div style={{width: icon, height: icon, flexShrink: 0, position: 'relative'}}>
                    {state === 'done' ? (
                      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: th.accent, transform: `scale(${r.doneAt != null ? doneP : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <NotifGlyph kind="check" size={icon * 0.7} color={onColor(th.accent)} stroke={3} />
                      </div>
                    ) : state === 'live' ? (
                      <div style={{position: 'absolute', inset: icon * 0.25, borderRadius: '50%', background: th.accent, boxShadow: `0 0 ${icon * 0.5}px ${th.accent}`, opacity: 0.6 + 0.4 * Math.sin(((frame / fps) * Math.PI * 2) / 1.4)}} />
                    ) : (
                      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `${2 * u}px solid ${state === 'now' ? th.accent : th.muted}`}} />
                    )}
                  </div>
                  <div style={{flex: 1, minWidth: 0, fontFamily: th.font, fontWeight: 500, fontSize: 19 * u, color: done ? th.muted : th.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.label}</div>
                  {r.meta ? <div style={{fontFamily: th.mono, fontSize: 13.5 * u, color: state === 'now' ? (dark ? th.accentLight : th.accent) : th.muted, whiteSpace: 'nowrap'}}>{r.meta}</div> : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export type AgentBriefProps = {
  /** start frame of the whole beat */
  at?: number;
  /** cards, each with a `delay` in frames from `at` (~22 frames between cards) */
  cards: Array<Omit<StatusCardProps, 'at'> & {delay: number}>;
  orbSize?: number;
  cardWidth?: number;
  /** a soft-typed line next to the orb before the cards ("Morning!") */
  greeting?: string;
  /** frames the greeting stays before lifting out (default: until the first card) */
  greetingHold?: number;
  /** 'row' = orb left, cards right (16:9); 'column' = orb on top (9:16). Default: from the frame's aspect. */
  direction?: 'row' | 'column';
  orb?: Partial<AgentOrbProps>;
  /** slow push-in over the beat (nothing sits still), default [1, 1.045] */
  push?: [number, number];
  theme?: Partial<NotifTheme>;
};

/** Brief beat: the orb enters and breathes, an optional greeting types next to it, glass status cards arrive one by one and the orb pulses on each arrival. Fills its parent. */
export const AgentBrief: React.FC<AgentBriefProps> = ({at = 0, cards, orbSize, cardWidth, greeting, greetingHold, direction, orb, push = [1, 1.045], theme}) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const th = useNotifTheme(theme);
  const dir = direction ?? (height > width ? 'column' : 'row');
  const os = orbSize ?? (dir === 'row' ? Math.round(height * 0.32) : Math.round(width * 0.38));
  const cw = cardWidth ?? (dir === 'row' ? Math.round(width * 0.34) : Math.round(width * 0.82));
  const firstCard = cards.length ? Math.min(...cards.map((c) => c.delay)) : 60;
  const gOut = at + (greetingHold ?? firstCard - 4);
  const gOutP = ramp(frame, gOut, 8, easings.inExpo);
  const z = interpolate(frame, [at, durationInFrames], push, CL);
  const pulses = [...cards.map((c) => at + c.delay + 2), ...(orb?.pulses ?? [])];
  const energy = orb?.energy ?? 0.25;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: dir === 'row' ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: dir === 'row' ? os * 0.32 : os * 0.22, transform: `scale(${z})`}}>
      <div style={{position: 'relative', width: os, height: os, flexShrink: 0}}>
        <AgentOrb size={os} enterAt={at} enterFrom={dir === 'row' ? {x: os * 0.35, y: 0} : {x: 0, y: os * 0.25}} theme={th} {...orb} energy={energy} pulses={pulses} />
        {greeting && gOutP < 1 ? (
          <div
            style={{
              position: 'absolute',
              whiteSpace: 'nowrap',
              fontFamily: th.display,
              fontWeight: 500,
              fontSize: os * 0.17,
              letterSpacing: '-0.02em',
              color: th.fg,
              ...(dir === 'row' ? {left: os * 1.18, top: '50%'} : {left: '50%', top: os * 1.12}),
              transform: `${dir === 'row' ? 'translateY(-50%)' : 'translateX(-50%)'} translateY(${-gOutP * 30}px)`,
              opacity: 1 - gOutP,
              filter: gOutP > 0 ? `blur(${gOutP * 8}px)` : undefined,
            }}
          >
            <TrailType text={greeting} at={at + 6} cpf={1.2} tail={8} />
          </div>
        ) : null}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: Math.round(cw * 0.04), width: cw}}>
        {cards.map(({delay, ...c}, i) => (
          <StatusCard key={i} {...c} at={at + delay} width={cw} theme={th} />
        ))}
      </div>
    </div>
  );
};

// ───────────────────────────────────────── backdrop ─────────────────────────────────────────

/** A huge disc in the background colour whose rim catches accent light, the lit arc slowly sweeping. Put it first in a plain scene; keeps holds alive. */
export const RimArc: React.FC<{
  /** disc diameter as a fraction of the frame's long side (default 2.4) */
  size?: number;
  /** disc centre in frame fractions (default bottom-left, off-frame, so the rim grazes the lower-left third). Bottom-right variant: cx 1.8, cy 1.9, rotate ~258→276. */
  cx?: number;
  cy?: number;
  /** rim light rotation in degrees over the composition */
  rotateFrom?: number;
  rotateTo?: number;
  intensity?: number;
  color?: string;
}> = ({size = 2.4, cx = -0.8, cy = 1.9, rotateFrom = 14, rotateTo = 34, intensity = 0.7, color}) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const b = useBrand();
  const c = color ?? b.colors.accent;
  const light = mix(c, '#FFFFFF', 0.55);
  const disc = b.colors.bg;
  const D = size * Math.max(width, height);
  const a = interpolate(frame, [0, durationInFrames], [rotateFrom, rotateTo], CL);
  const ring = D * 0.006;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: cx * width - D / 2, top: cy * height - D / 2, width: D, height: D}}>
        <div
          style={{
            position: 'absolute',
            inset: -ring * 4,
            borderRadius: '50%',
            filter: `blur(${D * 0.012}px)`,
            opacity: intensity,
            background: `conic-gradient(from ${a}deg, transparent 0deg, ${alpha(c, 0)} 4deg, ${alpha(c, 0.47)} 22deg, ${alpha(c, 0.8)} 34deg, ${alpha(c, 0.33)} 48deg, transparent 75deg, transparent 360deg)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: -ring,
            borderRadius: '50%',
            opacity: intensity * 0.9,
            background: `conic-gradient(from ${a}deg, transparent 0deg, ${alpha(light, 0)} 8deg, ${alpha(light, 0.6)} 30deg, ${alpha(light, 0.2)} 44deg, transparent 64deg, transparent 360deg)`,
          }}
        />
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 50% 50%, ${disc} 0%, ${disc} 97%, ${mix(disc, c, 0.06)} 100%)`}} />
      </div>
    </div>
  );
};
