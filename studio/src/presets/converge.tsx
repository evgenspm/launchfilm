// Converge family: scattered fragments (messages, mail, events, tabs, docs, tool tiles) orbit, float in depth, or get
// pulled into one core. Numbers measured frame by frame from studied launch films (fractions of the frame, frames at 30 fps).
//
// Every component is a pure function of useCurrentFrame() + props. Positions are projected in JS (one focal length, no CSS
// preserve-3d), so depth sorting, blur-by-depth and per-item fades are exact and identical on every render. CSS 3D is used only
// for an item's own yaw / pitch. Sizes default to fractions of min(width, height) so 1920×1080 and 1080×1920 both work.
// Colours and fonts come from the brand (useBrand); components take `theme?: Partial<ConvergeTheme>` to override.
import React, {useId} from 'react';
import {AbsoluteFill, Easing, Img, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {springs} from './springs';
import {easings} from './easings';
import {progress} from './timing';
import {AgentOrb, notifThemeFromBrand, type NotifTheme} from './notifications';
import {DEFAULT_BRAND, useBrand} from '../brand/BrandProvider';
import {alpha, mix} from '../brand/color';
import type {ResolvedBrand} from '../brand/types';

// ─── measured numbers ─────────────────────────────────────────────────────────────────────────────
/** Fractions of frame height H (m = min(W, H) in code) unless noted; frames at 30 fps. */
export const CONVERGE = {
  /** 8 items on a face-on circle, r = 0.264 H, item Ø 0.089 H, core Ø 0.23 H; entrance radius 0.89 r → r */
  faceOn: {radius: 0.264, item: 0.089, core: 0.23, enterFrom: 0.89},
  /** the orbit is not constant: one 107° in-out spin over 53 f, peak 9.5°/f in the middle, 0.5°/f drift after */
  spin: {deg: 107, frames: 53},
  /** tool carousel: 8 tiles, r ≈ 0.46 H, ring plane tilted ≈ 83°, focal ≈ 2.3 H (near/far scale 1.5), 45°/s, front row moves left */
  carousel: {radius: 0.46, tilt: 83, focal: 2.3, speed: -45, tile: 0.195},
  /** ring dolly: radius 0.44 → 0.76 (3 f) → 0.90 (9 f) → 0.96 (24 f) → 0.98 (40 f) of final, an out-expo with a long tail */
  dolly: {from: 0.44, frames: 40},
  /** wheel: ≈22 items, vertical radius ≈ 0.74 H (runs off frame), turned ≈ 71° about the vertical axis, 34°/s linear
   *  (10.6 s per turn = a perfect loop), near/far size 4.1× of which only 1.4× is perspective (the rest is an explicit
   *  scale-by-depth). Near items cross the text; wheel axis +0.035 W right of centre. */
  wheel: {radius: 0.74, tilt: 71, speed: -34, near: 1, far: 0.24, perspectiveRatio: 1.4, offsetX: 0.035, item: 0.32},
  /** progress ring: 0 → 100 % in 27 f, 20 % → 78 % inside 3 f (steep in-out), r ≈ 0.21 H, stroke ≈ 0.19 r, flat caps */
  ring: {frames: 27, radius: 0.21, stroke: 0.19},
  /** glow around a tile of size S: ~1.5 px light rim, half intensity at 0.28 S, gone by ≈ 0.6 S */
  glow: {rim: 0.011, tight: 0.06, mid: 0.25, wide: 0.6},
  /** a 6 s depth shot is ONE in-out move (peak mid-shot, ~0 at both ends), not constant speed */
  shot: 'inOutSine',
} as const;

/** Named curves for this family (easings.ts has the shared ones). */
export const convergeEasings = {
  /** progress ring + spin: steep symmetric in-out */
  inOutExpo: Easing.inOut(Easing.exp),
  /** a whole depth shot is one in-out move */
  shot: easings.inOutSine,
  /** fragments pulled into the core: visibly moving from frame 1, accelerating */
  pull: easings.inQuad,
  /** dolly through the ring */
  dolly: easings.outExpo,
} as const;

// ─── theme ────────────────────────────────────────────────────────────────────────────────────────

export type ConvergeTheme = NotifTheme & {
  surface: string;
  surface2: string;
  surface3: string;
  rule: string;
  fill2: string;
  fill3: string;
};

export const convergeThemeFromBrand = (b: ResolvedBrand): ConvergeTheme => {
  const n = notifThemeFromBrand(b);
  const c = b.colors;
  const dark = b.theme === 'dark';
  return {
    ...n,
    surface: c.surface,
    surface2: mix(c.surface, c.fg, 0.04),
    surface3: mix(c.surface, c.fg, 0.08),
    rule: mix(c.surface, c.muted, 0.5),
    fill: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    fill2: dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
    fill3: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
    hair: dark ? alpha(c.fg, 0.08) : alpha(c.fg, 0.1),
  };
};

/** The brand's ConvergeTheme merged with overrides. */
export const useConvergeTheme = (theme?: Partial<ConvergeTheme>): ConvergeTheme => {
  const b = useBrand();
  return {...convergeThemeFromBrand(b), ...theme};
};

// ─── small math ───────────────────────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const RAD = Math.PI / 180;
const srcOf = (s: string) => (/^(https?:|data:|blob:)/.test(s) ? s : staticFile(s));

export type Vec3 = {x: number; y: number; z: number};

/** Pinhole projection, camera at z = −f looking +z. z > 0 is farther. Returns screen offset from centre and scale. */
export const project = (p: Vec3, f: number) => {
  const s = f / Math.max(f * 0.04, f + p.z);
  return {x: p.x * s, y: p.y * s, s};
};

/** A point on a ring. θ = 0 at the bottom (nearest to camera once tilted), positive θ moves the front toward +x.
 *  axis 'x': ring plane tipped back by `tilt` (0 = face-on circle, 90 = edge-on): orbit / carousel.
 *  axis 'y': ring plane turned about the vertical axis by `tilt`: the wheel, right half nearer. */
export const ringPoint = (deg: number, r: number, tilt: number, axis: 'x' | 'y' = 'x'): Vec3 => {
  const a = deg * RAD;
  const t = tilt * RAD;
  const lx = r * Math.sin(a);
  const ly = r * Math.cos(a);
  return axis === 'x' ? {x: lx, y: ly * Math.cos(t), z: -ly * Math.sin(t)} : {x: lx * Math.cos(t), y: ly, z: -lx * Math.sin(t)};
};

/** 0 → 1 → 0 envelope for a hit at `at`: 2-frame attack, exponential decay. Drive glow / scale bumps with it. */
export const hitPulse = (frame: number, at: number, decay = 10) => {
  const d = frame - at;
  if (d < 0) return 0;
  return Math.min(1, d / 2) * Math.exp(-Math.max(0, d - 2) / decay);
};

/** Multi-layer glow (box-shadow) for an element of size `size` px. amount 0..1; color = hex (default: neutral accent). */
export const glowShadow = (size: number, amount = 1, color: string = DEFAULT_BRAND.colors.accent) => {
  if (amount <= 0.001) return '0 18px 48px rgba(0,0,0,0.45)';
  const g = CONVERGE.glow;
  return [
    `0 0 0 ${Math.max(1, size * g.rim).toFixed(1)}px ${alpha(mix(color, '#FFFFFF', 0.8), 0.9 * amount)}`,
    `0 0 ${(size * g.tight).toFixed(1)}px ${alpha(color, 0.95 * amount)}`,
    `0 0 ${(size * g.mid).toFixed(1)}px ${alpha(color, 0.55 * amount)}`,
    `0 0 ${(size * g.wide).toFixed(1)}px ${alpha(color, 0.28 * amount)}`,
    '0 18px 48px rgba(0,0,0,0.45)',
  ].join(', ');
};

// ─── glyphs (generic, drawn here; no third-party logos) ───────────────────────────────────────────
export type LineGlyphName = 'chat' | 'mail' | 'calendar' | 'globe' | 'wave' | 'doc' | 'bolt' | 'layers' | 'check' | 'person' | 'code' | 'folder' | 'spark' | 'phone' | 'list';

const GLYPHS: Record<LineGlyphName, React.ReactNode> = {
  chat: <path d="M4 5.5h16v11H10l-5 4v-4H4z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  wave: <path d="M3 12h1M6.5 8v8M10 5v14M13.5 9v6M17 7v10M20.5 11v2" />,
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  bolt: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" />,
  layers: (
    <>
      <path d="M12 3.5l8.5 4.5-8.5 4.5-8.5-4.5z" />
      <path d="M3.5 12.5l8.5 4.5 8.5-4.5M3.5 16.5l8.5 4.5 8.5-4.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16.5 9.5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c.6-3.8 3.7-5.8 7.5-5.8s6.9 2 7.5 5.8" />
    </>
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" />,
  folder: <path d="M3 6.5h6.5l2 2.5H21v10H3z" />,
  spark: <path d="M12 3c.6 4.6 3.9 7.9 8.5 8.5-4.6.6-7.9 3.9-8.5 8.5-.6-4.6-3.9-7.9-8.5-8.5C8.1 10.9 11.4 7.6 12 3z" />,
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  list: <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.5M4.5 12h.5M4.5 17.5h.5" />,
};

/** Generic line glyph on a 24-unit grid (currentColor by default). */
export const LineGlyph: React.FC<{name: LineGlyphName; size?: number; color?: string; stroke?: number; style?: React.CSSProperties}> = ({name, size = 24, color = 'currentColor', stroke = 1.7, style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{display: 'block', flex: 'none', ...style}}>
    {GLYPHS[name]}
  </svg>
);

// ─── FragmentCard ─────────────────────────────────────────────────────────────────────────────────
export type FragmentVariant = 'message' | 'email' | 'event' | 'tab' | 'call' | 'doc' | 'tool';

export type FragmentCardProps = {
  variant: FragmentVariant;
  /** person / sender / tab owner */
  who?: string;
  title?: string;
  body?: string;
  /** time / url / duration, set in the mono face */
  meta?: string;
  glyph?: LineGlyphName;
  /** card width in px (tool: tile size). Defaults: 340 card, 120 tile */
  width?: number;
  /** 0..1 accent glow (tool tiles). 0 = plain surface with a soft shadow */
  glow?: number;
  /** top-edge rim light (cards catch a light from above) */
  lit?: boolean;
  accent?: string;
  /** an icon image under public/ (or a URL) in place of the generic glyph / avatar: your own product's icon. Drawn whole and
   *  unmodified. Never ship third-party marks without permission. */
  logo?: string;
  /** source label shown next to the logo in the head; defaults to `who` */
  app?: string;
  theme?: Partial<ConvergeTheme>;
  style?: React.CSSProperties;
};

const DEFAULTS: Record<FragmentVariant, {who?: string; title?: string; body?: string; meta?: string; glyph: LineGlyphName}> = {
  message: {who: 'Dana', body: 'Can we move the sync to 4? Need the numbers first.', meta: '09:14', glyph: 'chat'},
  email: {who: 'Lee Park', title: 'Q4 plan, final numbers', body: 'Attached the revised model. Two open questions on…', meta: '08:52', glyph: 'mail'},
  event: {title: 'Design review', body: 'Dana, Lee +2', meta: '14:00 – 14:30', glyph: 'calendar'},
  tab: {title: 'Pricing draft v3', meta: 'docs / pricing-v3', glyph: 'globe'},
  call: {who: 'Weekly sync', body: '“…I’ll send the deck by Friday.”', meta: 'call · 32:10', glyph: 'wave'},
  doc: {title: 'launch-plan.md', meta: 'edited 11:02', glyph: 'doc'},
  tool: {glyph: 'bolt'},
};

/** A fragment of a working day: message, email, event, browser tab, call snippet, doc, or a tool tile. Placeholder content only. */
export const FragmentCard: React.FC<FragmentCardProps> = ({variant, who, title, body, meta, glyph, width, glow = 0, lit = true, accent, logo, app, theme, style}) => {
  const C = useConvergeTheme(theme);
  const acc = accent ?? C.accent;
  const d = DEFAULTS[variant];
  const g = glyph ?? d.glyph;
  const W = width ?? (variant === 'tool' ? 120 : 340);
  const k = W / 340; // type scales with the card
  const dark = C.mode === 'dark';
  const metaStyle: React.CSSProperties = {fontFamily: C.mono, fontSize: 11 * k, color: C.muted, letterSpacing: '0.02em', whiteSpace: 'nowrap'};
  const rim = lit ? `inset 0 1px 0 rgba(255,255,255,${dark ? 0.1 + 0.08 * glow : 0.7})` : '';
  const edge = (a: number) => (dark ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a * 0.6})`);
  const plainShadow = dark ? '0 18px 48px rgba(0,0,0,0.45)' : '0 14px 36px rgba(0,0,0,0.10)';
  const shadow = (s: number) => (glow > 0.001 ? glowShadow(s, glow, acc) : plainShadow);

  const logoImg = (sz: number) => <Img src={srcOf(logo!)} style={{width: sz, height: sz, objectFit: 'contain', display: 'block', flex: 'none'}} />;
  if (variant === 'tool' && logo) {
    // an icon is already a tile: no frame of ours around it, only the light under it
    return (
      <div style={{width: W, height: W, position: 'relative', ...style}}>
        {glow > 0 ? <div style={{position: 'absolute', inset: W * 0.14, borderRadius: W * 0.22, boxShadow: glowShadow(W * 0.8, glow, acc)}} /> : null}
        <div style={{position: 'absolute', inset: 0}}>{logoImg(W)}</div>
      </div>
    );
  }
  if (variant === 'tool') {
    return (
      <div
        style={{
          width: W,
          height: W,
          borderRadius: W * 0.24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(180deg, ${C.surface3} 0%, ${C.surface} 100%)`,
          border: `1px solid ${dark ? `rgba(255,255,255,${0.12 + 0.5 * glow})` : alpha(acc, 0.1 + 0.5 * glow)}`,
          boxShadow: [shadow(W), rim].filter(Boolean).join(', '),
          color: C.fg,
          ...style,
        }}
      >
        <LineGlyph name={g} size={W * 0.42} stroke={1.6} />
      </div>
    );
  }

  const shell: React.CSSProperties = {
    width: W,
    boxSizing: 'border-box',
    padding: `${16 * k}px ${18 * k}px`,
    borderRadius: Math.max(10, Math.min(20, C.radius)) * k,
    background: `linear-gradient(180deg, ${alpha(C.surface2, 0.96)} 0%, ${alpha(C.surface, 0.96)} 100%)`,
    border: `1px solid ${dark ? `rgba(255,255,255,${0.09 + 0.4 * glow})` : glow > 0 ? alpha(acc, 0.2 + 0.4 * glow) : edge(0.1)}`,
    boxShadow: [shadow(W * 0.6), rim].filter(Boolean).join(', '),
    fontFamily: C.font,
    color: C.fg,
    display: 'flex',
    flexDirection: 'column',
    gap: 8 * k,
    overflow: 'hidden',
    ...style,
  };
  const head = (icon: React.ReactNode, label?: string) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 9 * k}}>
      {icon}
      <div style={{fontSize: 14.5 * k, fontWeight: 500, color: C.fg, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{label}</div>
      {meta ?? d.meta ? <div style={metaStyle}>{meta ?? d.meta}</div> : null}
    </div>
  );
  const iconBox = (name: LineGlyphName) =>
    logo ? (
      logoImg(24 * k)
    ) : (
      <div style={{width: 26 * k, height: 26 * k, borderRadius: 7 * k, background: C.fill, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.fg2}}>
        <LineGlyph name={name} size={15 * k} stroke={1.8} />
      </div>
    );
  const appLabel = (fallback?: string) => (logo ? app ?? fallback : fallback);

  if (variant === 'message') {
    const name = who ?? d.who ?? '';
    if (logo) {
      return (
        <div style={shell}>
          {head(logoImg(24 * k), app ?? name)}
          <div style={{fontSize: 16 * k, lineHeight: 1.35, color: C.fg2}}>
            {app ? <span style={{color: C.fg, fontWeight: 600}}>{name} </span> : null}
            {body ?? d.body}
          </div>
        </div>
      );
    }
    return (
      <div style={shell}>
        {head(
          <div style={{width: 26 * k, height: 26 * k, borderRadius: '50%', background: dark ? C.accentDeep : alpha(acc, 0.15), color: dark ? C.accentLight : acc, fontSize: 12 * k, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {name.slice(0, 1)}
          </div>,
          name,
        )}
        <div style={{fontSize: 16 * k, lineHeight: 1.35, color: C.fg2}}>{body ?? d.body}</div>
      </div>
    );
  }
  if (variant === 'email') {
    return (
      <div style={shell}>
        {head(iconBox('mail'), appLabel(who ?? d.who))}
        <div style={{fontSize: 16.5 * k, fontWeight: 600, letterSpacing: '-0.01em'}}>{title ?? d.title}</div>
        <div style={{fontSize: 14 * k, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {logo && app && who ? `${who} · ` : ''}
          {body ?? d.body}
        </div>
      </div>
    );
  }
  if (variant === 'event') {
    return (
      <div style={{...shell, flexDirection: 'row', gap: 14 * k}}>
        <div style={{width: 3 * k, borderRadius: 2, background: acc, boxShadow: `0 0 ${10 * k}px ${alpha(acc, 0.7)}`}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 6 * k, flex: 1}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8 * k}}>
            {logo ? logoImg(18 * k) : null}
            <div style={{...metaStyle, color: dark ? C.accentLight : acc}}>{meta ?? d.meta}</div>
          </div>
          <div style={{fontSize: 17.5 * k, fontWeight: 600, letterSpacing: '-0.01em'}}>{title ?? d.title}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6 * k}}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{width: 14 * k, height: 14 * k, borderRadius: '50%', marginLeft: i ? -8 * k : 0, background: [dark ? C.accentDeep : alpha(acc, 0.35), C.surface3, C.rule][i], border: `1.5px solid ${C.surface}`}} />
            ))}
            <div style={{fontSize: 13 * k, color: C.muted}}>{body ?? d.body}</div>
          </div>
        </div>
      </div>
    );
  }
  if (variant === 'tab') {
    return (
      <div style={{...shell, padding: 0, gap: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8 * k, padding: `${11 * k}px ${14 * k}px`, background: C.fill, borderBottom: `1px solid ${C.hair}`}}>
          {logo ? logoImg(16 * k) : <LineGlyph name="globe" size={14 * k} color={dark ? C.accentLight : acc} stroke={1.8} />}
          <div style={{fontSize: 14 * k, fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{title ?? d.title}</div>
          <div style={{fontSize: 13 * k, color: C.muted}}>×</div>
        </div>
        <div style={{padding: `${12 * k}px ${14 * k}px ${14 * k}px`, display: 'flex', flexDirection: 'column', gap: 8 * k}}>
          <div style={{...metaStyle, color: C.fg2, background: C.fill, borderRadius: 6 * k, padding: `${5 * k}px ${9 * k}px`}}>{meta ?? d.meta}</div>
          {[0.92, 0.7].map((w, i) => (
            <div key={i} style={{height: 7 * k, width: `${w * 100}%`, borderRadius: 4, background: C.fill2}} />
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'call') {
    return (
      <div style={shell}>
        {head(iconBox('phone'), appLabel(who ?? d.who))}
        <div style={{display: 'flex', alignItems: 'center', gap: 2.5 * k, height: 22 * k}}>
          {Array.from({length: 30}).map((_, i) => {
            const h = 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
            return <div key={i} style={{width: 3 * k, height: `${h * 100}%`, borderRadius: 2, background: i < 19 ? acc : C.rule}} />;
          })}
        </div>
        <div style={{fontSize: 15 * k, lineHeight: 1.35, color: C.fg2}}>{body ?? d.body}</div>
      </div>
    );
  }
  // doc
  return (
    <div style={shell}>
      {head(iconBox('doc'), appLabel(title ?? d.title))}
      {logo && app ? <div style={{fontSize: 16.5 * k, fontWeight: 600, letterSpacing: '-0.01em'}}>{title ?? d.title}</div> : null}
      {logo && app && body ? <div style={{fontSize: 14 * k, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body}</div> : null}
      {[0.95, 0.82, 0.88, 0.5].map((w, i) => (
        <div key={i} style={{height: 7 * k, width: `${w * 100}%`, borderRadius: 4, background: i === 0 ? C.fill3 : C.fill2}} />
      ))}
    </div>
  );
};

// ─── backdrop + core + shockwave ──────────────────────────────────────────────────────────────────

/** Plain stage in the brand bg with one soft accent light and optional dot-matrix edges. glow 0..1. */
export const ConvergeBackdrop: React.FC<{glow?: number; x?: number; y?: number; dots?: number; color?: string; theme?: Partial<ConvergeTheme>}> = ({glow = 0.5, x = 0, y = 0, dots = 0, color, theme}) => {
  const {width, height} = useVideoConfig();
  const C = useConvergeTheme(theme);
  const col = color ?? C.accent;
  const deep = C.mode === 'dark' ? C.accentDeep : mix(col, '#FFFFFF', 0.55);
  const m = Math.min(width, height);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill style={{background: `radial-gradient(${m * 0.95}px ${m * 0.8}px at ${width / 2 + x}px ${height / 2 + y}px, ${alpha(deep, 0.9 * glow)} 0%, ${alpha(col, 0.1 * glow)} 38%, ${alpha(col, 0)} 72%)`}} />
      {dots > 0 ? (
        <AbsoluteFill
          style={{
            opacity: dots,
            backgroundImage: `radial-gradient(circle, ${alpha(C.mode === 'dark' ? C.accentLight : col, 0.55)} 1.2px, rgba(0,0,0,0) 1.8px)`,
            backgroundSize: '11px 11px',
            WebkitMaskImage: 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, #000 100%)',
            maskImage: 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, #000 100%)',
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export type CoreOrbProps = {
  /** diameter in px */
  size?: number;
  /** 0..1.5 extra light (how much it holds): the centre dilates and the halo grows */
  energy?: number;
  /** 0..1 hit (hitPulse): scale + flash */
  pulse?: number;
  /** 0..1 presence (scale + opacity), e.g. corePresence() */
  presence?: number;
  color?: string;
  /** iris rings inside + a thin bezel ring outside */
  rings?: boolean;
  /** 'orb' = the same sphere of moving light as AgentOrb (one object across the film); 'lens' = a pupil / iris lens */
  body?: 'orb' | 'lens';
  seed?: string;
  theme?: Partial<ConvergeTheme>;
  style?: React.CSSProperties;
};

/** The core that fragments converge into: an orb (or a lens with a hot centre, dashed iris rings, glass rim, bezel) with a soft
 *  halo. Never still: breathes at 0.45 Hz. */
export const CoreOrb: React.FC<CoreOrbProps> = ({size = 180, energy = 0.4, pulse = 0, presence = 1, color, rings = true, body = 'orb', seed = 'core', theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const C = useConvergeTheme(theme);
  const col = color ?? C.accent;
  const light = C.accentLight;
  const t = frame / fps;
  const breathe = 1 + 0.02 * Math.sin(t * Math.PI * 2 * 0.45);
  const s = size * breathe * (1 + 0.2 * pulse) * (0.6 + 0.4 * presence);
  const e = Math.min(1.6, energy + 0.8 * pulse);
  const ring = (r: number, w: number, dash: string, a: number, rot: number, c: string = light) => (
    <circle r={r} fill="none" stroke={alpha(c, a)} strokeWidth={w} strokeDasharray={dash} transform={`rotate(${rot})`} />
  );
  return (
    <div style={{position: 'relative', width: s, height: s, opacity: clamp01(presence * 1.4), ...style}}>
      {/* wide halo */}
      <div
        style={{
          position: 'absolute',
          left: -s * 1.75,
          top: -s * 1.75,
          width: s * 4.5,
          height: s * 4.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(col, 0.2 + 0.28 * e)} 0%, ${alpha(col, 0.07 + 0.12 * e)} 24%, ${alpha(col, 0)} 60%)`,
        }}
      />
      {body === 'orb' ? (
        <>
          <div style={{position: 'absolute', inset: 0, filter: `brightness(${1 + 0.35 * e + 0.6 * pulse})`}}>
            <AgentOrb size={s} enterAt={-1000} amplitude={0} energy={Math.min(1, 0.25 + 0.5 * e)} seed={seed} theme={{...C, accent: col}} />
          </div>
          {/* hot centre: how much it holds */}
          <div
            style={{
              position: 'absolute',
              inset: s * (0.3 - 0.1 * Math.min(1, e)),
              borderRadius: '50%',
              mixBlendMode: 'screen',
              background: `radial-gradient(circle, rgba(255,255,255,${0.55 + 0.3 * Math.min(1, e)}) 0%, ${alpha(light, 0.4)} 30%, rgba(0,0,0,0) 70%)`,
            }}
          />
          {rings ? (
            <svg width={s * 1.6} height={s * 1.6} viewBox="-160 -160 320 320" style={{position: 'absolute', left: -s * 0.3, top: -s * 0.3, overflow: 'visible'}}>
              {ring(132, 0.8, '2 6', 0.22 + 0.15 * e, -t * 3)}
            </svg>
          ) : null}
        </>
      ) : (
        <>
          {/* body: pupil → iris → dark edge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `radial-gradient(circle, #FFFFFF 0%, ${light} ${5 + 7 * e}%, ${col} ${18 + 12 * e}%, ${C.accentDeep} ${52 + 6 * e}%, ${mix(C.accentDeep, '#000000', 0.7)} 84%, ${mix(C.accentDeep, '#000000', 0.88)} 100%)`,
              boxShadow: `0 0 ${s * 0.08}px ${alpha(col, 0.85)}, 0 0 ${s * (0.3 + 0.3 * e)}px ${alpha(col, 0.4 + 0.3 * e)}, inset 0 0 ${s * 0.1}px ${alpha(light, 0.45)}`,
              filter: `brightness(${1 + 0.5 * pulse})`,
            }}
          />
          {rings ? (
            <svg width={s * 1.6} height={s * 1.6} viewBox="-160 -160 320 320" style={{position: 'absolute', left: -s * 0.3, top: -s * 0.3, overflow: 'visible'}}>
              {ring(58, 0.8, '1.2 3.2', 0.45 + 0.2 * e, t * 14)}
              {ring(74, 1.4, '18 6 3 6', 0.5 + 0.2 * e, -t * 9)}
              {ring(90, 0.7, '52 9', 0.55, t * 5, col)}
              {/* outer bezel: thin, with four ticks */}
              {ring(132, 0.8, '2 6', 0.28 + 0.15 * e, -t * 3)}
              {[0, 90, 180, 270].map((a) => (
                <line key={a} x1={0} y1={-124} x2={0} y2={-140} stroke={alpha(light, 0.5)} strokeWidth={1.2} transform={`rotate(${a + t * 6})`} />
              ))}
            </svg>
          ) : null}
          {/* glass rim + specular */}
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid ${alpha(light, 0.75)}`, background: 'radial-gradient(circle at 33% 25%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 20%)'}} />
        </>
      )}
    </div>
  );
};

/** A light ring expanding from a point: absorb / impact. Centred on the frame, offset by x/y. Default colour: brand accent. */
export const Shockwave: React.FC<{at: number; size?: number; duration?: number; color?: string; x?: number; y?: number; width?: number}> = ({at, size = 600, duration = 26, color, x = 0, y = 0, width = 3}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  if (frame < at || frame > at + duration) return null;
  const acc = b.colors.accent;
  const c = color ?? mix(acc, '#FFFFFF', 0.55);
  const p = easings.outExpo(progress(frame, at, duration));
  const d = lerp(size * 0.12, size, p);
  const o = (1 - progress(frame, at, duration)) * 0.9;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          width: d,
          height: d,
          borderRadius: '50%',
          transform: `translate(${x}px, ${y}px)`,
          opacity: o,
          border: `${lerp(width, 0.6, p)}px solid ${c}`,
          boxShadow: `0 0 ${18 + 30 * (1 - p)}px ${alpha(acc, 0.8)}, inset 0 0 ${14 + 20 * (1 - p)}px ${alpha(acc, 0.6)}`,
        }}
      />
    </AbsoluteFill>
  );
};

/** A light burst from a point (screen blend, radial): use instead of a flat full-frame flash on a hit or a cut, so the light comes
 *  from the core and the frame does not turn grey. `frames` 3–6. */
export const LightBurst: React.FC<{at: number; frames?: number; size?: number; x?: number; y?: number; strength?: number; color?: string}> = ({at, frames = 5, size, x = 0, y = 0, strength = 1, color}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  if (frame < at || frame > at + frames) return null;
  const col = color ?? b.colors.accent;
  const p = progress(frame, at, frames);
  const o = strength * (1 - p) * (1 - p);
  const d = (size ?? Math.max(width, height) * 1.4) * lerp(0.7, 1.1, easings.outExpo(p));
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', opacity: o, zIndex: 3000}}>
      <div
        style={{
          position: 'absolute',
          left: width / 2 + x - d / 2,
          top: height / 2 + y - d / 2,
          width: d,
          height: d,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,0.95) 0%, ${alpha(mix(col, '#FFFFFF', 0.55), 0.75)} 10%, ${alpha(col, 0.45)} 30%, ${alpha(col, 0.12)} 55%, rgba(0,0,0,0) 72%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── OrbitRing ────────────────────────────────────────────────────────────────────────────────────
export type RingStroke = {
  color?: string;
  /** core line width px (~3 at 1080p) */
  width?: number;
  /** number of dashes; 0 = continuous (measured: 8 segments with short gaps) */
  segments?: number;
  /** gap per segment, degrees */
  gap?: number;
  opacity?: number;
  /** dash rotation relative to the items (0.25 = a quarter of their speed) */
  drift?: number;
};

export type OrbitRingProps = {
  items: React.ReactNode[];
  /** rendered at the ring centre, depth-sorted between the far and near halves */
  core?: React.ReactNode;
  /** px; default 0.42 × min(W, H) */
  radius?: number;
  /** degrees: 0 = face-on circle, 70–83 = carousel ellipse (measured 83) */
  tilt?: number;
  axis?: 'x' | 'y';
  /** linear angular speed, °/s (carousel −45, wheel −34) */
  speed?: number;
  startAngle?: number;
  /** full override of the ring angle this frame (deg): drive it with anything */
  angle?: number;
  /** extra in-out spin added on top (107° over 53 f) */
  spin?: {at: number; deg?: number; duration?: number};
  /** focal length px; default 2.3 × min(W, H) (near/far 1.5) */
  perspective?: number;
  /** override projection scale with an explicit [near, far] scale-by-depth */
  scaleByDepth?: [number, number];
  /** 0..1: carousel items yaw to face out of the cylinder (tiles turn as they go round). axis 'x' only */
  faceOut?: number;
  /** blur px at the far side */
  depthBlur?: number;
  farOpacity?: number;
  /** brightness at the far side */
  farDim?: number;
  ring?: RingStroke | false;
  /** staggered entrance + dolly: radius from `dolly` × r to r */
  enter?: {at?: number; stagger?: number; duration?: number; dolly?: number; dollyFrames?: number; itemsDelay?: number} | false;
  /** pull everything into the core: radius → 0 (in-quad), spin speeds up, items shrink to light */
  contract?: {at: number; duration?: number; spin?: number};
  /** ring centre offset from frame centre, px */
  x?: number;
  y?: number;
  /** items are logos / app icons: whole-logo motion only (move, scale, opacity, blur), no yaw, no brightness change (far side
   *  and contraction fade by opacity instead) */
  logoSafe?: boolean;
  theme?: Partial<ConvergeTheme>;
};

const useRing = (p: {n: number; radius: number; tilt: number; axis: 'x' | 'y'; angle: number; f: number; rMul: number; scaleByDepth?: [number, number]; depthBlur: number; farOpacity: number; farDim: number}) => {
  const sinT = Math.abs(Math.sin(p.tilt * RAD));
  return Array.from({length: p.n}).map((_, i) => {
    const a = p.angle + (360 / p.n) * i;
    const r = p.radius * p.rMul;
    const w = ringPoint(a, r, p.tilt, p.axis);
    const pr = project(w, p.f);
    // depth 0 = nearest point of the ring, 1 = farthest (relative to the un-contracted radius so effects fade as it contracts)
    const depth = sinT > 0.01 ? clamp01((w.z / (p.radius * sinT) + 1) / 2) : 0;
    const scale = p.scaleByDepth ? lerp(p.scaleByDepth[0], p.scaleByDepth[1], depth) : pr.s;
    const far = smooth(0.45, 1, depth);
    return {i, a, x: pr.x, y: pr.y, z: w.z, depth, scale, blur: p.depthBlur * far, opacity: lerp(1, p.farOpacity, far), bright: lerp(1, p.farDim, far)};
  });
};

const RingLine: React.FC<{radius: number; tilt: number; axis: 'x' | 'y'; f: number; phase: number; stroke: RingStroke; front: boolean; cx: number; cy: number; zIndex: number; fade: number; accent: string; light: string}> = ({
  radius,
  tilt,
  axis,
  f,
  phase,
  stroke,
  front,
  cx,
  cy,
  zIndex,
  fade,
  accent,
  light,
}) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const {width, height} = useVideoConfig();
  const segs = stroke.segments ?? 0;
  const segDeg = segs > 0 ? 360 / segs : 360;
  const gap = segs > 0 ? stroke.gap ?? 4 : 0;
  const K = 200;
  let d = '';
  let pen = false;
  for (let k = 0; k <= K; k++) {
    const a = (360 * k) / K;
    const local = (((a - phase) % segDeg) + segDeg) % segDeg;
    const w = ringPoint(a, radius, tilt, axis);
    const ok = local >= gap && (tilt === 0 || (w.z <= 0) === front);
    if (ok) {
      const q = project(w, f);
      d += `${pen ? 'L' : 'M'}${(q.x + cx).toFixed(1)} ${(q.y + cy).toFixed(1)}`;
      pen = true;
    } else pen = false;
  }
  if (!d) return null;
  const col = stroke.color ?? accent;
  const op = (stroke.opacity ?? 1) * fade * (front || tilt === 0 ? 1 : 0.5);
  const lw = stroke.width ?? 3;
  // lit from the left: a horizontal gradient bright → 35 %
  const grad = (
    <defs>
      <linearGradient id={`g${id}`} gradientUnits="userSpaceOnUse" x1={cx - radius} y1={0} x2={cx + radius} y2={0}>
        <stop offset="0" stopColor={light} stopOpacity={1} />
        <stop offset="0.5" stopColor={col} stopOpacity={0.9} />
        <stop offset="1" stopColor={col} stopOpacity={0.4} />
      </linearGradient>
    </defs>
  );
  const base: React.CSSProperties = {position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex, pointerEvents: 'none'};
  return (
    <>
      <svg width={width} height={height} style={{...base, filter: `blur(${lw * 3}px)`, opacity: op * 0.85}}>
        {grad}
        <path d={d} fill="none" stroke={`url(#g${id})`} strokeWidth={lw * 4} strokeLinecap="round" />
      </svg>
      <svg width={width} height={height} style={{...base, opacity: op}}>
        {grad}
        <path d={d} fill="none" stroke={`url(#g${id})`} strokeWidth={lw} strokeLinecap="round" />
        <path d={d} fill="none" stroke={alpha(mix(light, '#FFFFFF', 0.6), 0.85)} strokeWidth={Math.max(0.8, lw * 0.35)} strokeLinecap="round" />
      </svg>
    </>
  );
};

/** Items orbit a core on a (tilted) ring: depth-sorted, scale / blur / dim by depth, optional glowing ring line, dolly-in
 *  entrance, in-out spin, and `contract` that pulls everything into the core. */
export const OrbitRing: React.FC<OrbitRingProps> = ({
  items,
  core,
  radius,
  tilt = 74,
  axis = 'x',
  speed = -40,
  startAngle = 0,
  angle,
  spin,
  perspective,
  scaleByDepth,
  faceOut = 0,
  depthBlur = 3,
  farOpacity = 0.7,
  farDim = 0.7,
  ring = {},
  enter = {},
  contract,
  x = 0,
  y = 0,
  logoSafe = false,
  theme,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const C = useConvergeTheme(theme);
  const m = Math.min(width, height);
  const R = radius ?? 0.42 * m;
  const f = perspective ?? CONVERGE.carousel.focal * m;
  const dir = Math.sign(speed || -1);

  let ang = angle ?? startAngle + (speed * frame) / fps;
  if (spin) ang += (spin.deg ?? CONVERGE.spin.deg) * convergeEasings.inOutExpo(progress(frame, spin.at, spin.duration ?? CONVERGE.spin.frames));

  const en =
    enter === false
      ? null
      : {at: enter.at ?? 0, stagger: enter.stagger ?? 2, duration: enter.duration ?? 14, dolly: enter.dolly ?? 1, dollyFrames: enter.dollyFrames ?? CONVERGE.dolly.frames, itemsDelay: enter.itemsDelay ?? 0};
  const dollyMul = en ? lerp(en.dolly, 1, convergeEasings.dolly(progress(frame, en.at, en.dollyFrames))) : 1;
  const cp = contract ? convergeEasings.pull(progress(frame, contract.at, contract.duration ?? 24)) : 0;
  ang += (contract?.spin ?? 160) * cp * cp * dir;
  const rMul = dollyMul * (1 - cp);

  const cx = width / 2 + x;
  const cy = height / 2 + y;
  const states = useRing({n: items.length, radius: R, tilt, axis, angle: ang, f, rMul, scaleByDepth, depthBlur, farOpacity, farDim});
  const ringFade = (en ? clamp01(progress(frame, en.at, 8)) : 1) * (1 - smooth(0.5, 0.95, cp));
  const lineProps = {accent: C.accent, light: C.accentLight};

  return (
    <AbsoluteFill>
      {ring !== false ? <RingLine radius={R * rMul} tilt={tilt} axis={axis} f={f} phase={ang * (ring.drift ?? 0.25)} stroke={ring} front={false} cx={cx} cy={cy} zIndex={1} fade={ringFade} {...lineProps} /> : null}
      {states.map((s) => {
        const e = en ? convergeEasings.dolly(progress(frame, en.at + en.itemsDelay + s.i * en.stagger, en.duration)) : 1;
        const sc = s.scale * lerp(0.6, 1, e) * (1 - 0.85 * cp);
        const op = s.opacity * e * (1 - smooth(logoSafe ? 0.4 : 0.72, logoSafe ? 0.85 : 1, cp)) * (logoSafe ? s.bright : 1);
        if (op <= 0.003) return null;
        const blur = s.blur + (1 - e) * 10 + 4 * smooth(0.6, 1, cp);
        const bright = logoSafe ? 1 : s.bright * (1 + 1.4 * cp);
        const yaw = !logoSafe && axis === 'x' && faceOut ? (((((s.a + 180) % 360) + 360) % 360) - 180) * faceOut : 0;
        return (
          <div
            key={s.i}
            style={{
              position: 'absolute',
              left: cx + s.x,
              top: cy + s.y,
              zIndex: Math.round(1000 - s.z),
              transform: `translate(-50%, -50%) scale(${sc})${yaw ? ` perspective(${f}px) rotateY(${yaw}deg)` : ''}`,
              opacity: op,
              filter: blur > 0.15 || bright !== 1 ? `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)})` : undefined,
            }}
          >
            {items[s.i]}
          </div>
        );
      })}
      {core !== undefined ? <div style={{position: 'absolute', left: cx, top: cy, zIndex: 1000, transform: 'translate(-50%, -50%)'}}>{core}</div> : null}
      {ring !== false ? <RingLine radius={R * rMul} tilt={tilt} axis={axis} f={f} phase={ang * (ring.drift ?? 0.25)} stroke={ring} front cx={cx} cy={cy} zIndex={1001} fade={ringFade} {...lineProps} /> : null}
    </AbsoluteFill>
  );
};

// ─── ItemWheel ────────────────────────────────────────────────────────────────────────────────────
export type ItemWheelProps = {
  items: React.ReactNode[];
  /** centre content (text). Rendered full-frame at depth 0: near items cross in front of it, far ones pass behind */
  children?: React.ReactNode;
  /** vertical radius px; default 0.74 × H (runs off the frame) */
  radius?: number;
  /** wheel turned about the vertical axis, deg (≈ 71) */
  tilt?: number;
  /** °/s, linear (−34: near side moves down) */
  speed?: number;
  startAngle?: number;
  angle?: number;
  /** explicit [near, far] scale (1 → 0.24) */
  scale?: [number, number];
  /** positional perspective near/far ratio (≈ 1.4) */
  perspectiveRatio?: number;
  /** wheel axis offset from frame centre, px (+0.035 W) */
  offsetX?: number;
  offsetY?: number;
  /** blur px at the far side (0) */
  depthBlur?: number;
  farOpacity?: number;
  /** items blur / fade in over this many frames (~30) */
  enterFrames?: number;
};

/** Image wheel: items on a vertical wheel seen at an angle, scaled by depth, crossing in front of / behind centre text. */
export const ItemWheel: React.FC<ItemWheelProps> = ({
  items,
  children,
  radius,
  tilt = CONVERGE.wheel.tilt,
  speed = CONVERGE.wheel.speed,
  startAngle = 0,
  angle,
  scale = [CONVERGE.wheel.near, CONVERGE.wheel.far],
  perspectiveRatio = CONVERGE.wheel.perspectiveRatio,
  offsetX,
  offsetY = 0,
  depthBlur = 0,
  farOpacity = 1,
  enterFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const R = radius ?? CONVERGE.wheel.radius * height;
  const k = (perspectiveRatio - 1) / (perspectiveRatio + 1);
  const f = (R * Math.sin(tilt * RAD)) / Math.max(0.01, k);
  const ang = angle ?? startAngle + (speed * frame) / fps;
  const ox = offsetX ?? CONVERGE.wheel.offsetX * width;
  const states = useRing({n: items.length, radius: R, tilt, axis: 'y', angle: ang, f, rMul: 1, scaleByDepth: scale, depthBlur, farOpacity, farDim: 1});
  const cx = width / 2 + ox;
  const cy = height / 2 + offsetY;
  return (
    <AbsoluteFill>
      {states.map((s) => {
        // only draw what can be on screen (the wheel is bigger than the frame)
        if (Math.abs(s.y) > height / 2 + 400 * s.scale) return null;
        const e = convergeEasings.dolly(progress(frame, (s.i % 7) * 2, enterFrames));
        const bl = s.blur + (1 - e) * 12;
        return (
          <div
            key={s.i}
            style={{position: 'absolute', left: cx + s.x, top: cy + s.y, zIndex: Math.round(1000 - s.z), transform: `translate(-50%, -50%) scale(${s.scale})`, opacity: s.opacity * e, filter: bl > 0.15 ? `blur(${bl.toFixed(2)}px)` : undefined}}
          >
            {items[s.i]}
          </div>
        );
      })}
      {children !== undefined ? <AbsoluteFill style={{zIndex: 1000}}>{children}</AbsoluteFill> : null}
    </AbsoluteFill>
  );
};

// ─── Converge ─────────────────────────────────────────────────────────────────────────────────────
export type ConvergeOrigin = {x: number; y: number; rot?: number; scale?: number};

export type ConvergeProps = {
  items: React.ReactNode[];
  /** frame the first fragment departs */
  at?: number;
  /** frames between departures (default 3) */
  stagger?: number;
  /** flight frames (default 26) */
  duration?: number;
  /** origins as offsets from the target, px. Default: a deterministic scatter on an elliptical band around the target */
  from?: ConvergeOrigin[];
  /** auto scatter band, fractions of half-width / half-height */
  band?: [number, number];
  seed?: string;
  /** 'near-first': closest fragments leave first (gravity); 'index': in array order */
  order?: 'near-first' | 'index';
  /** degrees each fragment swirls around the target on the way in */
  swirl?: number;
  /** blurred ghost copies behind a moving fragment (motion blur) */
  ghosts?: number;
  /** light streak behind a moving fragment, 0..1 */
  streak?: number;
  /** pop-in at origin: start frame, or false if they are already there */
  enterAt?: number | false;
  /** target offset from frame centre, px */
  target?: {x: number; y: number};
  /** the core; receives energy (0..~1.5), absorbed (0..1), pulse (last hit) and final (the last arrival's hit) */
  core?: (s: {energy: number; absorbed: number; pulse: number; final: number}) => React.ReactNode;
  coreSize?: number;
  /** shockwave on the last arrival */
  shockwave?: boolean;
  /** items carry logos: no rotation, no brightening; the item fades out early and the comet light replaces it */
  logoSafe?: boolean;
  theme?: Partial<ConvergeTheme>;
};

/** The "it all comes together" beat: fragments float, then get pulled (staggered, spiralling, accelerating) into a core, each
 *  arrival a light hit, the last one a shockwave. Ghost copies + a light streak sell the speed. */
export const Converge: React.FC<ConvergeProps> = ({
  items,
  at = 20,
  stagger: gap = 3,
  duration = 26,
  from,
  band = [0.55, 0.88],
  seed = 'converge',
  order = 'near-first',
  swirl = 35,
  ghosts = 3,
  streak = 1,
  enterAt = 0,
  target = {x: 0, y: 0},
  core,
  coreSize,
  shockwave = true,
  logoSafe = false,
  theme,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const C = useConvergeTheme(theme);
  const m = Math.min(width, height);
  const n = items.length;
  const origins: ConvergeOrigin[] =
    from ??
    Array.from({length: n}).map((_, i) => {
      const a = i * 137.508 * RAD + (random(`${seed}-a-${i}`) - 0.5) * 0.5;
      const rr = lerp(band[0], band[1], random(`${seed}-r-${i}`));
      return {x: Math.cos(a) * (width / 2) * rr, y: Math.sin(a) * (height / 2) * rr, rot: (random(`${seed}-rot-${i}`) - 0.5) * 16, scale: lerp(0.82, 1.05, random(`${seed}-s-${i}`))};
    });
  const rank = new Array<number>(n);
  const idx = Array.from({length: n}, (_, i) => i);
  if (order === 'near-first') idx.sort((a, b) => Math.hypot(origins[a].x, origins[a].y) - Math.hypot(origins[b].x, origins[b].y));
  idx.forEach((i, r) => (rank[i] = r));
  const dep = (i: number) => at + rank[i] * gap;
  const arrive = (i: number) => dep(i) + duration;
  const lastArrival = at + (n - 1) * gap + duration;

  /** state of fragment i at (fractional) frame fr */
  const state = (i: number, fr: number) => {
    const o = origins[i];
    const r0 = Math.hypot(o.x, o.y);
    const th0 = Math.atan2(o.y, o.x);
    const t = clamp01((fr - dep(i)) / duration);
    const e = convergeEasings.pull(t);
    // before departure: idle float + a slow inward drift (nothing is static)
    const pre = progress(fr, 0, dep(i)) * 0.07;
    const bob = Math.sin((fr / fps) * Math.PI * 2 * 0.3 + i * 1.9);
    const antic = 0.035 * Math.sin(Math.PI * clamp01(t / 0.3)) * (1 - t); // a small lift away before the pull
    const r = r0 * (1 - pre) * (1 - e + antic);
    const th = th0 + swirl * RAD * e * (i % 2 ? 1 : -1);
    const x = target.x + Math.cos(th) * r + bob * 6 * (1 - e);
    const y = target.y + Math.sin(th) * r + Math.cos((fr / fps) * Math.PI * 2 * 0.24 + i) * 6 * (1 - e);
    const rot = logoSafe ? 0 : (o.rot ?? 0) * (1 - e) + swirl * 0.6 * e * (i % 2 ? 1 : -1);
    return {x, y, e, t, rot, scale: (o.scale ?? 1) * (1 - 0.93 * Math.pow(e, 0.9))};
  };

  let energy = 0;
  let absorbed = 0;
  for (let i = 0; i < n; i++) {
    energy += 0.35 * hitPulse(frame, arrive(i), 9);
    if (frame >= arrive(i)) absorbed++;
  }
  const lastHit = Math.max(0, ...Array.from({length: n}, (_, i) => hitPulse(frame, arrive(i), 9)));
  const final = hitPulse(frame, lastArrival, 16);
  const coreState = {energy: energy + (0.25 + 0.6 * (absorbed / Math.max(1, n))), absorbed: absorbed / Math.max(1, n), pulse: Math.max(lastHit * 0.6, final), final};
  const cx = width / 2;
  const cy = height / 2;
  const light = C.accentLight;

  return (
    <AbsoluteFill>
      {core ? <div style={{position: 'absolute', left: cx + target.x, top: cy + target.y, transform: 'translate(-50%, -50%)', zIndex: 500}}>{core(coreState)}</div> : null}
      {items.map((node, i) => {
        const s = state(i, frame);
        if (s.t >= 1) return null;
        const pop = enterAt === false ? 1 : convergeEasings.dolly(progress(frame, enterAt + rank[i] * 2, 14));
        const fade = logoSafe ? 1 - smooth(0.3, 0.62, s.e) : 1 - smooth(0.78, 1, s.e);
        const bright = logoSafe ? 1 : 1 + 1.8 * s.e * s.e;
        const lightFade = 1 - smooth(0.78, 1, s.e); // the streak is light, not the item: it lasts to the core
        const blur = (1 - pop) * 10 + 5 * smooth(0.65, 1, s.e);
        const moving = s.t > 0 && s.t < 1;
        const prev = state(i, frame - 3);
        const dx = s.x - prev.x;
        const dy = s.y - prev.y;
        const speed = Math.hypot(dx, dy);
        const z = 600 + rank[i];
        const body = (extra: React.CSSProperties, key: string, sx: number, sy: number, rot: number, sc: number) => (
          <div key={key} style={{position: 'absolute', left: cx + sx, top: cy + sy, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`, ...extra}}>
            {node}
          </div>
        );
        return (
          <React.Fragment key={i}>
            {moving && streak > 0 && speed > 4 ? (
              <div
                style={{
                  position: 'absolute',
                  left: cx + s.x,
                  top: cy + s.y,
                  width: speed * 3,
                  height: Math.max(3, 16 * s.scale),
                  zIndex: z - 1,
                  transformOrigin: '0 50%',
                  transform: `translate(0, -50%) rotate(${Math.atan2(-dy, -dx) / RAD}deg)`,
                  background: `linear-gradient(90deg, ${alpha(light, 0.95 * streak * lightFade)} 0%, ${alpha(C.accent, 0.5 * streak * lightFade)} 35%, rgba(0,0,0,0) 100%)`,
                  borderRadius: 99,
                  filter: 'blur(3px)',
                }}
              />
            ) : null}
            {moving && s.e > 0.2 ? (
              // comet head: the fragment turns into light as it nears the core
              <div
                style={{
                  position: 'absolute',
                  left: cx + s.x,
                  top: cy + s.y,
                  width: Math.max(36, 190 * s.scale),
                  height: Math.max(36, 190 * s.scale),
                  zIndex: z + 1,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  mixBlendMode: 'screen',
                  opacity: smooth(0.2, 0.9, s.e),
                  background: `radial-gradient(circle, rgba(255,255,255,0.95) 0%, ${alpha(light, 0.75)} 16%, ${alpha(C.accent, 0.35)} 38%, rgba(0,0,0,0) 68%)`,
                }}
              />
            ) : null}
            {moving
              ? Array.from({length: ghosts}).map((_, g) => {
                  const q = state(i, frame - (g + 1) * 1.5);
                  return body({opacity: (0.32 / (g + 1)) * fade * smooth(0, 0.15, s.t), filter: `blur(${4 + 3 * g}px) brightness(${bright})`, zIndex: z - 2 - g}, `g${g}`, q.x, q.y, q.rot, q.scale * pop);
                })
              : null}
            {body(
              {opacity: pop * fade, filter: blur > 0.15 || bright > 1.001 ? `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)})` : undefined, zIndex: z},
              'b',
              s.x,
              s.y,
              s.rot,
              s.scale * lerp(0.94, 1, pop),
            )}
          </React.Fragment>
        );
      })}
      {shockwave ? <Shockwave at={lastArrival} size={(coreSize ?? 0.2 * m) * 5} x={target.x} y={target.y} color={light} /> : null}
    </AbsoluteFill>
  );
};

// ─── DepthField ───────────────────────────────────────────────────────────────────────────────────
export type DepthFieldProps = {
  items: React.ReactNode[];
  /** explicit world positions (px, z > 0 away from camera). Default: stratified random volume */
  positions?: Vec3[];
  /** auto volume: width / height (px at z = 0) and depth range */
  volume?: {w?: number; h?: number; zNear?: number; zFar?: number};
  seed?: string;
  /** keep the screen centre free (radius px at the start of the move): for a core or a title behind the cards */
  clearCenter?: number;
  /** camera move: from → to over [at, at+duration], one in-out move. Default: dolly 1400 px + a small drift */
  camera?: {from?: Partial<Vec3>; to?: Partial<Vec3>; at?: number; duration?: number; easing?: (t: number) => number};
  /** full override: camera position for a frame */
  cameraAt?: (frame: number) => Vec3;
  /** focal distance from the camera (sharp plane), or [from, to] for a rack focus over the camera move */
  focus?: number | [number, number];
  /** blur px per 1000 px of defocus */
  dof?: number;
  maxBlur?: number;
  /** focal length px; default 1.0 × max(W, H) */
  perspective?: number;
  /** idle float amplitude px and sway degrees per card */
  drift?: number;
  sway?: number;
  /** far cards dim to this brightness */
  farDim?: number;
};

/** Cards floating in 3D with a slow camera move, depth-of-field blur by distance from a (rackable) focal plane, fog and
 *  near-plane fade. Parallax is real: everything is projected through one focal length. */
export const DepthField: React.FC<DepthFieldProps> = ({items, positions, volume = {}, seed = 'depth', clearCenter = 0, camera = {}, cameraAt, focus, dof = 3.2, maxBlur = 10, perspective, drift = 10, sway = 7, farDim = 0.62}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const f = perspective ?? Math.max(width, height);
  const zNear = volume.zNear ?? 300;
  const zFar = volume.zFar ?? (positions ? Math.max(...positions.map((p) => p.z)) + 200 : 3400);
  const vw = volume.w ?? width * 1.1;
  const vh = volume.h ?? height * 1.1;
  const n = items.length;

  const camAt =
    cameraAt ??
    ((fr: number) => {
      const from = {x: 0, y: 0, z: 0, ...camera.from};
      const to = {x: width * 0.04, y: -height * 0.03, z: 1400, ...camera.to};
      const t = (camera.easing ?? convergeEasings.shot)(progress(fr, camera.at ?? 0, camera.duration ?? durationInFrames));
      return {x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t), z: lerp(from.z, to.z, t)};
    });
  const cam = camAt(frame);
  const camMid = camAt(Math.round(durationInFrames / 2));

  const world: Vec3[] =
    positions ??
    Array.from({length: n}).map((_, i) => {
      const z = zNear + ((zFar - zNear) * (i + 0.5 + (random(`${seed}-z-${i}`) - 0.5) * 0.8)) / n;
      const spread = Math.max(0.6, (f + z - camMid.z) / f);
      let x = (random(`${seed}-x-${i}`) - 0.5) * vw * spread;
      let y = (random(`${seed}-y-${i}`) - 0.5) * vh * spread;
      if (clearCenter > 0) {
        const s0 = f / (f + z);
        const sx = x * s0;
        const sy = y * s0;
        const d = Math.hypot(sx, sy);
        if (d < clearCenter) {
          const a = d > 1 ? Math.atan2(sy, sx) : random(`${seed}-c-${i}`) * Math.PI * 2;
          x = (Math.cos(a) * clearCenter) / s0;
          y = (Math.sin(a) * clearCenter) / s0;
        }
      }
      return {x, y, z};
    });

  const fz = focus === undefined ? 1800 : Array.isArray(focus) ? lerp(focus[0], focus[1], convergeEasings.shot(progress(frame, camera.at ?? 0, camera.duration ?? durationInFrames))) : focus;
  const t = frame / fps;

  return (
    <AbsoluteFill>
      {world.map((p, i) => {
        const rel = {x: p.x - cam.x, y: p.y - cam.y, z: p.z - cam.z};
        if (rel.z < -f * 0.82) return null;
        const pr = project(rel, f);
        const fog = 1 - smooth(zFar - cam.z - 900, zFar - cam.z + 200, rel.z) * 0.85; // far cards sink into the background
        const near = 1 - smooth(1.6, 2.8, pr.s); // cards passing the lens fade
        const op = clamp01(fog * near);
        if (op <= 0.003) return null;
        const blur = Math.min(maxBlur, (Math.abs(rel.z - fz) * dof) / 1000);
        const bright = lerp(1, farDim, smooth(fz, fz + 3200, rel.z));
        const ph = random(`${seed}-p-${i}`) * Math.PI * 2;
        const bob = Math.sin(t * Math.PI * 2 * 0.22 + ph);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: width / 2 + pr.x,
              top: height / 2 + pr.y + bob * drift * pr.s,
              zIndex: Math.round(100000 - rel.z),
              transform: `translate(-50%, -50%) scale(${pr.s}) perspective(1400px) rotateY(${(Math.sin(t * 0.9 + ph) * sway).toFixed(2)}deg) rotateX(${(Math.cos(t * 0.7 + ph) * sway * 0.6).toFixed(2)}deg)`,
              opacity: op,
              filter: `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)})`,
            }}
          >
            {items[i]}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── ProgressRing ─────────────────────────────────────────────────────────────────────────────────
export type ProgressRingProps = {
  /** explicit 0..1 value; otherwise animated from 0 → `to` over [at, at+duration] with the steep in-out */
  value?: number;
  at?: number;
  duration?: number;
  to?: number;
  easing?: (t: number) => number;
  /** ring radius px (default 0.21 × min(W, H)) and stroke px (default 0.19 × radius) */
  radius?: number;
  stroke?: number;
  color?: string;
  track?: string;
  /** start angle in degrees, 0 = 12 o'clock, clockwise. Default 270 (9 o'clock), running counter-clockwise */
  startAngle?: number;
  direction?: 1 | -1;
  cap?: 'butt' | 'round';
  glow?: number;
  /** centre label; default a percentage in the display face */
  label?: ((v: number) => React.ReactNode) | false;
  theme?: Partial<ConvergeTheme>;
};

/** Progress ring: a thick ring fills with a steep in-out (20 % → 78 % inside 3 frames), the number counts in sync. */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  at = 0,
  duration = CONVERGE.ring.frames,
  to = 1,
  easing = convergeEasings.inOutExpo,
  radius,
  stroke,
  color,
  track,
  startAngle = 270,
  direction = -1,
  cap = 'butt',
  glow = 0.6,
  label,
  theme,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const C = useConvergeTheme(theme);
  const col = color ?? C.accent;
  const m = Math.min(width, height);
  const r = radius ?? CONVERGE.ring.radius * m;
  const sw = stroke ?? CONVERGE.ring.stroke * r;
  const v = value ?? to * easing(progress(frame, at, duration));
  const circ = 2 * Math.PI * r;
  const box = (r + sw) * 2 + 80;
  return (
    <div style={{position: 'relative', width: box, height: box}}>
      <svg width={box} height={box} viewBox={`${-box / 2} ${-box / 2} ${box} ${box}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <circle r={r} fill="none" stroke={track ?? C.fill} strokeWidth={sw} />
        <g transform={`rotate(${startAngle - 90}) scale(1, ${direction})`} style={{filter: glow > 0 ? `drop-shadow(0 0 ${sw * 0.6}px ${alpha(col, 0.7 * glow)})` : undefined}}>
          {/* a full ring is drawn without a dash so no seam shows at the start angle */}
          <circle r={r} fill="none" stroke={col} strokeWidth={sw} strokeLinecap={cap} strokeDasharray={v >= 0.999 ? undefined : `${circ * v} ${circ}`} opacity={v > 0.001 ? 1 : 0} />
        </g>
      </svg>
      {label !== false ? (
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {label ? (
            label(v)
          ) : (
            <div style={{fontFamily: C.display, fontWeight: 600, fontSize: r * 0.42, color: C.fg, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums'}}>
              {Math.round(v * 100)}
              <span style={{fontSize: r * 0.22, color: C.muted, marginLeft: r * 0.02}}>%</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

// ─── core presence helper ─────────────────────────────────────────────────────────────────────────
/** Heavy spring for the core arriving (springs.heavy: big hero objects). 0 → 1 from `at`. */
export const corePresence = (frame: number, at: number, fps: number) => spring({frame: frame - at, fps, config: springs.heavy});
