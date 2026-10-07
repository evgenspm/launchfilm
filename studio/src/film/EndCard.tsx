// End card from the brand: the mark lights on (scale + blur), the wordmark tracks in from blur 4 fr later, the line
// reveals word by word, the URL types at 2.5 fr/char with a block cursor, and the whole card pushes 1.00 → 1.025 on a
// decelerating curve. Row layout in landscape, stacked in portrait. Hold it 2–3 s (craft: end card).
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {BrandMark, Wordmark} from '../brand/Logo';
import {onColor} from '../brand/color';
import {springs} from '../presets/springs';
import {easings} from '../presets/easings';
import {BrandBackdrop} from '../presets/look';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type EndCardProps = {
  /** line under the lockup; default: brand tagline */
  line?: string | null;
  /** default: brand url */
  url?: string | null;
  /** optional CTA pill, e.g. "Try it free" */
  cta?: string;
  /** local frame the card starts animating */
  at?: number;
  layout?: 'auto' | 'row' | 'stack';
  /** < 1 = faster */
  pace?: number;
  /** soft accent glow behind the lockup (0 = flat bg) */
  glow?: number;
  /** block cursor after the URL */
  cursor?: boolean;
};

export const EndCard: React.FC<EndCardProps> = ({line, url, cta, at = 0, layout = 'auto', pace = 1, glow = 0.14, cursor = true}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const b = useBrand();
  const k = (fps / 30) * pace;
  const f = frame - at;
  const u = Math.min(W, H) / 1080;
  const stack = layout === 'stack' || (layout === 'auto' && H > W * 1.05);
  const lineText = line === null ? '' : (line ?? b.tagline ?? '');
  const urlText = url === null ? '' : (url ?? b.url ?? '');

  const markIn = spring({frame: f, fps, config: springs.snappy});
  const markBlur = interpolate(f, [0, 10 * k], [14, 0], {...clamp, easing: easings.outExpo}) * u;
  const wmT = interpolate(f - 4 * k, [0, 14 * k], [0, 1], {...clamp, easing: easings.outExpo});
  const lineStart = 14 * k;
  const urlStart = lineStart + 8 * k + lineText.split(' ').length * 2 * k;
  const typed = Math.max(0, Math.min(urlText.length, Math.floor((f - urlStart) / (2.5 * k))));
  const urlDone = typed >= urlText.length;
  const blink = Math.floor(frame / (fps / 2)) % 2 === 0;
  const push = interpolate(f, [0, 75 * k], [1, 1.025], {...clamp, easing: easings.outCubic});

  const wmSize = (stack ? 132 : 128) * u;
  const markSize = (stack ? 150 : 128) * u;
  const lineSize = (stack ? 46 : 42) * u;
  const urlSize = (stack ? 34 : 30) * u;

  return (
    <AbsoluteFill>
      <BrandBackdrop glow={glow} y={0.45} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', transform: `scale(${push})`}}>
        <div style={{display: 'flex', flexDirection: stack ? 'column' : 'row', alignItems: 'center', gap: (stack ? 44 : 40) * u}}>
          <div style={{opacity: Math.min(1, markIn * 1.4), transform: `scale(${0.82 + 0.18 * markIn})`, filter: markBlur > 0.1 ? `blur(${markBlur.toFixed(2)}px)` : undefined}}>
            <BrandMark size={markSize} />
          </div>
          <div style={{opacity: wmT, filter: wmT < 0.999 ? `blur(${((1 - wmT) * 12 * u).toFixed(2)}px)` : undefined, transform: `translateX(${((1 - wmT) * (stack ? 0 : -18)) * u}px)`}}>
            <Wordmark size={wmSize} style={{letterSpacing: `${(b.logo?.wordmarkTracking ?? b.type.displayTracking) + (1 - wmT) * 0.08}em`}} />
          </div>
        </div>
        {lineText ? (
          <div style={{marginTop: 46 * u, maxWidth: W * 0.8, textAlign: 'center', fontFamily: b.font.text, fontWeight: 500, fontSize: lineSize, lineHeight: 1.3, color: b.colors.muted, letterSpacing: '-0.01em'}}>
            {lineText.split(' ').map((w, i) => {
              const p = interpolate(f - lineStart - i * 2 * k, [0, 10 * k], [0, 1], {...clamp, easing: easings.outExpo});
              return (
                <span key={i} style={{display: 'inline-block', marginRight: '0.26em', opacity: p, transform: `translateY(${((1 - p) * 10 * u).toFixed(2)}px)`, filter: p < 0.99 ? `blur(${((1 - p) * 6 * u).toFixed(2)}px)` : undefined}}>
                  {w}
                </span>
              );
            })}
          </div>
        ) : null}
        {urlText ? (
          <div style={{marginTop: (lineText ? 22 : 46) * u, height: urlSize * 1.3, display: 'flex', alignItems: 'center', fontFamily: b.font.mono, fontSize: urlSize, color: b.colors.fg, letterSpacing: '0.01em'}}>
            {urlText.slice(0, typed)}
            {cursor && f >= urlStart - 6 * k && (!urlDone || blink) ? (
              <span style={{display: 'inline-block', width: urlSize * 0.55, height: urlSize * 1.05, marginLeft: urlSize * 0.12, background: b.colors.accent}} />
            ) : null}
          </div>
        ) : null}
        {cta ? (
          <div
            style={{
              marginTop: 40 * u,
              opacity: interpolate(f - urlStart - urlText.length * 2.5 * k, [0, 10 * k], [0, 1], clamp),
              padding: `${16 * u}px ${34 * u}px`,
              borderRadius: 999,
              background: b.colors.accent,
              color: onColor(b.colors.accent),
              fontFamily: b.font.text,
              fontWeight: 600,
              fontSize: 30 * u,
            }}
          >
            {cta}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Frames until the end card is complete (mark, wordmark, line, typed URL) at `pace`. */
export const endCardFrames = (fps: number, line = '', url = '', pace = 1) => {
  const k = (fps / 30) * pace;
  return Math.ceil(14 * k + 8 * k + line.split(' ').filter(Boolean).length * 2 * k + url.length * 2.5 * k);
};
