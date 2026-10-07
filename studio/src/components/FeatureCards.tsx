// Feature cards (card-grid): 2–6 cards with a line icon, a title and a short body, cascading in with a 5 fr stagger
// (rise on springs.settle, icon pop on springs.pop). Columns adapt to the aspect. LineIcon: generic 24-grid stroke icons.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {springs} from '../presets/springs';
import {stagger as staggerFrames} from '../presets/timing';

const ICONS = {
  bolt: 'M13 2 L4 14 H11 L10 22 L20 9 H13 Z',
  shield: 'M12 2.5 L20 5.5 V11.5 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 11.5 V5.5 Z M8.5 12 L11 14.5 L15.5 9.5',
  chart: 'M3.5 20.5 H20.5 M6.5 17 V12 M11 17 V7.5 M15.5 17 V10 M20 17 V4.5',
  sparkle: 'M12 3 L13.8 9.2 L20 11 L13.8 12.8 L12 19 L10.2 12.8 L4 11 L10.2 9.2 Z M19 3.5 V6.5 M17.5 5 H20.5',
  clock: 'M12 3 A9 9 0 1 1 11.99 3 Z M12 7.5 V12 L15 14',
  lock: 'M5.5 11 H18.5 V20.5 H5.5 Z M8.5 11 V8 A3.5 3.5 0 0 1 15.5 8 V11 M12 14.5 V17',
  link: 'M10 14 L14 10 M8.5 11.5 L6.5 13.5 A3.5 3.5 0 0 0 11.5 18.5 L13.5 16.5 M15.5 12.5 L17.5 10.5 A3.5 3.5 0 0 0 12.5 5.5 L10.5 7.5',
  layers: 'M12 3.5 L21 8 L12 12.5 L3 8 Z M3 12 L12 16.5 L21 12 M3 16 L12 20.5 L21 16',
  search: 'M10.5 4 A6.5 6.5 0 1 1 10.49 4 Z M15.3 15.3 L20.5 20.5',
  chat: 'M4 5 H20 V16 H11 L7 19.5 V16 H4 Z M8 9.5 H16 M8 12.5 H13',
  globe: 'M12 3 A9 9 0 1 1 11.99 3 Z M3 12 H21 M12 3 C9 6 9 18 12 21 C15 18 15 6 12 3',
  check: 'M12 3 A9 9 0 1 1 11.99 3 Z M8 12.5 L11 15.5 L16.5 9.5',
  code: 'M8.5 7 L3.5 12 L8.5 17 M15.5 7 L20.5 12 L15.5 17 M13.5 4.5 L10.5 19.5',
  users: 'M9 11.5 A3.5 3.5 0 1 1 8.99 11.5 Z M2.5 20.5 C3 16.5 5.5 14.5 9 14.5 C12.5 14.5 15 16.5 15.5 20.5 M15.5 4.8 A3.4 3.4 0 0 1 15.5 11.4 M18 14.8 C20 15.6 21.2 17.6 21.5 20.5',
  bell: 'M6 16.5 V11 A6 6 0 0 1 18 11 V16.5 L19.5 18 H4.5 Z M10 20.5 H14',
  wand: 'M4 20 L15 9 M13 7 L17 11 M17.5 2.5 V5.5 M16 4 H19 M20.5 8.5 V10.5 M19.5 9.5 H21.5',
} as const;
export type LineIconName = keyof typeof ICONS;

/** A generic stroke icon on a 24 grid. */
export const LineIcon: React.FC<{name: LineIconName; size?: number; color?: string; stroke?: number; style?: React.CSSProperties}> = ({name, size = 24, color = 'currentColor', stroke = 1.8, style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{display: 'block', ...style}}>
    <path d={ICONS[name]} />
  </svg>
);

export type Feature = {icon: LineIconName; title: string; body?: string};

export type FeatureCardsProps = {
  items: Feature[];
  /** frame the first card starts */
  start?: number;
  /** frames between cards (default 5) */
  stagger?: number;
  /** override the automatic column count */
  columns?: number;
  /** grid width as a fraction of the frame width */
  widthFraction?: number;
  /** 'surface' cards, or 'outline' (hairline border, transparent) */
  variant?: 'surface' | 'outline';
  /** one card drawn in the accent (index) */
  highlight?: number;
  style?: React.CSSProperties;
};

export const FeatureCards: React.FC<FeatureCardsProps> = ({items, start = 0, stagger = 5, columns, widthFraction, variant = 'surface', highlight, style}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const portrait = height > width * 1.15;
  const n = items.length;
  const cols = columns ?? (portrait ? (n <= 3 ? 1 : 2) : n <= 3 ? n : n === 4 ? 2 : 3);
  const u = Math.min(width, height) / 1080;
  const gap = 28 * u;
  const W = width * (widthFraction ?? (portrait ? 0.86 : 0.82));
  const cardW = (W - gap * (cols - 1)) / cols;
  const pad = 36 * u;
  const titleSize = (portrait && cols === 1 ? 44 : cols >= 3 ? 34 : 38) * u;
  const bodySize = (portrait && cols === 1 ? 30 : cols >= 3 ? 24 : 26) * u;
  return (
    <div style={{width: W, display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cardW}px)`, gap, ...style}}>
      {items.map((it, i) => {
        const f = frame - start - staggerFrames(i, stagger, fps);
        const p = spring({frame: f, fps, config: springs.settle});
        const ip = spring({frame: f - 4, fps, config: springs.pop});
        const hi = highlight === i;
        const bg = hi ? b.colors.accent : variant === 'surface' ? b.colors.surface : 'transparent';
        const fg = hi ? (b.theme === 'dark' ? b.colors.bg : '#FFFFFF') : b.colors.fg;
        return (
          <div
            key={i}
            style={{
              padding: pad,
              borderRadius: b.radius * 1.3,
              background: bg,
              border: `1px solid ${hi ? 'transparent' : alpha(b.colors.fg, b.theme === 'dark' ? 0.08 : 0.08)}`,
              boxShadow: variant === 'surface' ? (b.theme === 'dark' ? '0 24px 60px rgba(0,0,0,0.35)' : '0 16px 40px rgba(20,24,40,0.08)') : undefined,
              opacity: Math.min(1, p * 1.5),
              transform: p < 0.999 ? `translateY(${((1 - p) * 60 * u).toFixed(2)}px)` : undefined,
              display: 'flex',
              flexDirection: 'column',
              gap: 16 * u,
            }}
          >
            <div
              style={{
                width: 64 * u,
                height: 64 * u,
                borderRadius: Math.max(10, b.radius * 0.8) * u,
                background: hi ? alpha(fg, 0.16) : alpha(b.colors.accent, b.theme === 'dark' ? 0.16 : 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${(0.6 + 0.4 * Math.max(0, ip)).toFixed(4)})`,
                transformOrigin: 'left center',
                marginBottom: 6 * u,
              }}
            >
              <LineIcon name={it.icon} size={34 * u} color={hi ? fg : b.colors.accent} stroke={2} />
            </div>
            <div style={{fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: titleSize, letterSpacing: `${b.type.displayTracking * 0.6}em`, lineHeight: 1.15, color: fg}}>{it.title}</div>
            {it.body ? (
              <div style={{fontFamily: b.font.text, fontWeight: b.type.textWeight, fontSize: bodySize, lineHeight: 1.45, color: hi ? alpha(fg, 0.85) : alpha(b.colors.fg, 0.62)}}>{it.body}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
