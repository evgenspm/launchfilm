// Logo pieces from brand data: the mark (svg/png under public/, inline vector, or a monogram tile fallback), the text wordmark,
// and the lockup (mark + wordmark). Static; animate them with LogoReveal / EndCard / your own wrapper.
import React from 'react';
import {Img, staticFile} from 'remotion';
import {useBrand} from './BrandProvider';
import {onColor, tokenColor} from './color';
import type {ResolvedBrand} from './types';

const srcOf = (s: string) => (/^(https?:|data:|blob:)/.test(s) ? s : staticFile(s));

/** The brand mark at `size` px (height). Falls back to a rounded monogram tile when the brand has no mark. */
export const BrandMark: React.FC<{size: number; brand?: ResolvedBrand; color?: string; style?: React.CSSProperties}> = ({size, brand, color, style}) => {
  const ctx = useBrand();
  const b = brand ?? ctx;
  const mark = b.logo?.mark ?? b.logo?.src;
  if (typeof mark === 'string') return <Img src={srcOf(mark)} style={{height: size, width: 'auto', display: 'block', ...style}} />;
  if (mark) {
    return (
      <svg viewBox={mark.viewBox} height={size} width={size} style={{display: 'block', overflow: 'visible', ...style}}>
        {mark.paths.map((p, i) => (
          <path key={i} d={p.d} fill={color ?? tokenColor(p.fill, b.colors, 'accent')} opacity={p.opacity} fillRule={p.fillRule} />
        ))}
      </svg>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: color ?? b.colors.accent,
        color: onColor(color ?? b.colors.accent),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: b.font.display,
        fontWeight: 700,
        fontSize: size * 0.56,
        ...style,
      }}
    >
      {b.name.slice(0, 1).toUpperCase()}
    </div>
  );
};

/** The text wordmark at `size` px font size, styled from brand.logo (font role, weight, tracking, case). */
export const Wordmark: React.FC<{size: number; brand?: ResolvedBrand; color?: string; style?: React.CSSProperties}> = ({size, brand, color, style}) => {
  const ctx = useBrand();
  const b = brand ?? ctx;
  const l = b.logo ?? {};
  const raw = l.wordmark ?? b.name;
  const text = l.wordmarkCase === 'lower' ? raw.toLowerCase() : l.wordmarkCase === 'upper' ? raw.toUpperCase() : raw;
  return (
    <div
      style={{
        fontFamily: b.font[l.wordmarkFont ?? 'display'],
        fontWeight: l.wordmarkWeight ?? b.type.displayWeight,
        letterSpacing: `${l.wordmarkTracking ?? b.type.displayTracking}em`,
        fontSize: size,
        lineHeight: 1,
        color: color ?? b.colors.fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** Mark + wordmark side by side. `size` = wordmark font size; the mark is 1.15× that. */
export const Lockup: React.FC<{size: number; brand?: ResolvedBrand; color?: string; gap?: number; style?: React.CSSProperties}> = ({size, brand, color, gap, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: gap ?? size * 0.38, ...style}}>
    <BrandMark size={size * 1.15} brand={brand} />
    <Wordmark size={size} brand={brand} color={color} />
  </div>
);
