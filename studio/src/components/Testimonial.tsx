// A testimonial card (social proof): the card settles in (springs.settle), the quote reveals word by word (blur → sharp,
// 1.5 fr stagger), then the initials avatar, name and role. No photos: initials on a brand-tinted disc.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix, onColor} from '../brand/color';
import {springs} from '../presets/springs';
import {easings} from '../presets/easings';

export type TestimonialProps = {
  quote: string;
  name: string;
  role?: string;
  /** frame the card starts entering */
  start?: number;
  /** frames between quote words */
  wordStagger?: number;
  /** card width in px at 1080p; default 62 % of a landscape frame, 86 % of a portrait one */
  width?: number;
  /** quote size in px */
  fontSize?: number;
  /** five small stars above the quote */
  stars?: boolean;
  style?: React.CSSProperties;
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

export const Testimonial: React.FC<TestimonialProps> = ({quote, name, role, start = 0, wordStagger = 1.5, width, fontSize, stars = false, style}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const b = useBrand();
  const portrait = H > W * 1.15;
  const cw = width ?? W * (portrait ? 0.86 : 0.62);
  const size = fontSize ?? (portrait ? 46 : 44);
  const p = spring({frame: frame - start, fps, config: springs.settle});
  const words = quote.split(/\s+/).filter(Boolean);
  const qStart = start + 8;
  const qEnd = qStart + words.length * wordStagger + 10;
  const footP = spring({frame: frame - qEnd + 6, fps, config: springs.settle});
  const avatar = mix(b.colors.accent, b.colors.accent2, 0.35);
  return (
    <div
      style={{
        width: cw,
        boxSizing: 'border-box',
        padding: `${size * 1.1}px ${size * 1.2}px`,
        borderRadius: b.radius * 1.6,
        background: b.colors.surface,
        border: `1px solid ${alpha(b.colors.fg, b.theme === 'dark' ? 0.08 : 0.07)}`,
        boxShadow: b.theme === 'dark' ? '0 40px 100px rgba(0,0,0,0.5)' : '0 30px 80px rgba(20,24,40,0.12)',
        opacity: Math.min(1, p * 1.5),
        transform: p < 0.999 ? `translateY(${((1 - p) * 50).toFixed(2)}px) scale(${(0.97 + 0.03 * p).toFixed(4)})` : undefined,
        ...style,
      }}
    >
      {stars ? (
        <div style={{display: 'flex', gap: size * 0.15, marginBottom: size * 0.5}}>
          {[0, 1, 2, 3, 4].map((i) => {
            const sp = spring({frame: frame - start - 6 - i * 2, fps, config: springs.pop});
            return (
              <svg key={i} width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" style={{transform: `scale(${Math.max(0, sp).toFixed(4)})`}}>
                <path d="M12 2.5 L14.9 8.6 L21.5 9.4 L16.6 13.9 L17.9 20.5 L12 17.2 L6.1 20.5 L7.4 13.9 L2.5 9.4 L9.1 8.6 Z" fill={b.colors.accent2} />
              </svg>
            );
          })}
        </div>
      ) : null}
      <div style={{fontFamily: b.font.display, fontWeight: Math.min(600, b.type.displayWeight), fontSize: size, lineHeight: 1.3, letterSpacing: `${b.type.displayTracking * 0.5}em`, color: b.colors.fg}}>
        <span style={{color: b.colors.accent}}>“</span>
        {words.map((w, i) => {
          const f = frame - qStart - i * wordStagger;
          const o = interpolate(f, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outExpo});
          const bl = (1 - o) * 8;
          return (
            <span key={i} style={{opacity: o, filter: bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : undefined}}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
        <span style={{color: b.colors.accent, opacity: interpolate(frame, [qEnd - 10, qEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>”</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: size * 0.4,
          marginTop: size * 0.9,
          opacity: Math.min(1, Math.max(0, footP) * 1.4),
          transform: footP < 0.999 ? `translateY(${((1 - footP) * 16).toFixed(2)}px)` : undefined,
        }}
      >
        <div
          style={{
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: '50%',
            background: avatar,
            color: onColor(avatar),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: b.font.text,
            fontWeight: 700,
            fontSize: size * 0.58,
          }}
        >
          {initialsOf(name)}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: size * 0.08}}>
          <div style={{fontFamily: b.font.text, fontWeight: 700, fontSize: size * 0.58, color: b.colors.fg}}>{name}</div>
          {role ? <div style={{fontFamily: b.font.text, fontWeight: 500, fontSize: size * 0.48, color: alpha(b.colors.fg, 0.55)}}>{role}</div> : null}
        </div>
      </div>
    </div>
  );
};
