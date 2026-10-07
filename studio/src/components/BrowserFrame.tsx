// A neutral browser shell: tab strip (1–3 tabs), URL bar (optionally typed in), a page slot that can scroll.
// No vendor chrome: generic shapes, brand fonts and colours.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix} from '../brand/color';
import {BrandMark} from '../brand/Logo';
import {springs} from '../presets/springs';
import {useTypewriter} from '../presets/text';

export type BrowserTab = {title: string; active?: boolean; /** small icon; default: brand mark on the active tab, a dot otherwise */ icon?: React.ReactNode};

export type BrowserFrameProps = {
  /** shown in the URL bar (no protocol) */
  url?: string;
  /** type the URL in from this frame (human cadence); omit = shown whole */
  typeUrlAt?: number;
  /** chars per second for the typed URL */
  urlCps?: number;
  tabs?: BrowserTab[];
  width?: number;
  height?: number;
  theme?: 'dark' | 'light';
  /** page scroll in px (animate it yourself, e.g. with interpolate) */
  scrollY?: number;
  /** page background; default brand bg */
  pageBackground?: string;
  enterAt?: number | false;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Chrome height (tabs + URL bar) at 1080p. */
export const BROWSER_CHROME = 104;

const LockGlyph: React.FC<{color: string}> = ({color}) => (
  <svg width={14} height={16} viewBox="0 0 14 16" style={{display: 'block'}}>
    <rect x={1.5} y={7} width={11} height={8} rx={2} fill={color} />
    <path d="M4 7 V5 a3 3 0 0 1 6 0 V7" fill="none" stroke={color} strokeWidth={1.8} />
  </svg>
);

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url,
  typeUrlAt,
  urlCps = 22,
  tabs,
  width = 1440,
  height = 900,
  theme,
  scrollY = 0,
  pageBackground,
  enterAt = false,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const dark = (theme ?? b.theme) === 'dark';
  const chrome = dark ? mix(b.colors.surface, '#000000', 0.25) : mix(b.colors.bg, '#000000', 0.04);
  const tabBg = dark ? b.colors.surface : '#FFFFFF';
  const line = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const typed = useTypewriter(url ?? '', typeUrlAt ?? 0, urlCps, 'url');
  const shownUrl = typeUrlAt === undefined ? (url ?? '') : typed.typed;
  const typing = typeUrlAt !== undefined && frame >= typeUrlAt && !typed.done;
  const p = enterAt === false ? 1 : spring({frame: frame - enterAt, fps, config: springs.ui});
  const list = tabs ?? [{title: b.name, active: true}];
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: b.radius,
        overflow: 'hidden',
        background: chrome,
        border: `1px solid ${line}`,
        boxShadow: dark ? '0 40px 120px rgba(0,0,0,0.55)' : '0 30px 90px rgba(20,24,40,0.18)',
        display: 'flex',
        flexDirection: 'column',
        opacity: Math.min(1, p * 1.4),
        transform: p < 0.999 ? `translateY(${((1 - p) * 40).toFixed(2)}px) scale(${(0.96 + 0.04 * p).toFixed(4)})` : undefined,
        ...style,
      }}
    >
      {/* tab strip */}
      <div style={{height: 48, display: 'flex', alignItems: 'flex-end', padding: '0 14px', gap: 6}}>
        <div style={{display: 'flex', gap: 8, alignSelf: 'center', marginRight: 14}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 13, height: 13, borderRadius: 7, background: alpha(b.colors.muted, 0.45)}} />
          ))}
        </div>
        {list.slice(0, 3).map((t, i) => (
          <div
            key={i}
            style={{
              height: 38,
              width: 250,
              borderRadius: '10px 10px 0 0',
              background: t.active ? tabBg : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 14px',
              fontFamily: b.font.text,
              fontSize: 15,
              fontWeight: 500,
              color: alpha(b.colors.fg, t.active ? 0.85 : 0.5),
            }}
          >
            {t.icon ?? (t.active ? <BrandMark size={16} /> : <div style={{width: 12, height: 12, borderRadius: 6, background: alpha(b.colors.muted, 0.55)}} />)}
            <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t.title}</span>
          </div>
        ))}
      </div>
      {/* URL bar */}
      <div style={{height: 56, background: tabBg, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', borderBottom: `1px solid ${line}`}}>
        <div style={{display: 'flex', gap: 14, color: alpha(b.colors.fg, 0.4), fontFamily: b.font.text, fontSize: 20}}>
          <span>‹</span>
          <span>›</span>
        </div>
        <div
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            background: dark ? mix(tabBg, '#FFFFFF', 0.06) : mix(tabBg, '#000000', 0.045),
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 16px',
            fontFamily: b.font.text,
            fontSize: 17,
            color: alpha(b.colors.fg, 0.8),
            boxShadow: typing ? `0 0 0 2px ${alpha(b.colors.accent, 0.55)}` : undefined,
          }}
        >
          <LockGlyph color={alpha(b.colors.fg, 0.45)} />
          <span style={{whiteSpace: 'pre'}}>{shownUrl}</span>
          {typing ? <span style={{display: 'inline-block', width: 2, height: 20, background: b.colors.accent, marginLeft: -8}} /> : null}
        </div>
      </div>
      {/* page */}
      <div style={{flex: 1, position: 'relative', overflow: 'hidden', background: pageBackground ?? b.colors.bg}}>
        <div style={{position: 'absolute', inset: 0, transform: scrollY ? `translateY(${-scrollY}px)` : undefined}}>{children}</div>
      </div>
    </div>
  );
};
