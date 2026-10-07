// A neutral, drawn desktop window: three window dots, a title, an optional toolbar and sidebar, a content slot.
// Theme, surface colour and radius come from the brand. Optional entrance: rises 40 px and scales 0.96 → 1 on springs.ui.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix} from '../brand/color';
import {springs} from '../presets/springs';

export type WindowDots = 'color' | 'mono' | 'none';

export type MacWindowProps = {
  title?: string;
  /** px at 1080p */
  width?: number;
  height?: number;
  /** 'dark' | 'light'; default: the brand theme */
  theme?: 'dark' | 'light';
  dots?: WindowDots;
  /** right side of the title bar (buttons, avatars) */
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  /** content background; default: brand surface */
  background?: string;
  /** frame the window starts rising in; false = static */
  enterAt?: number | false;
  shadow?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const DOT_COLORS = ['#FF5F57', '#FEBC2E', '#28C840'];

/** Title bar height at 1080p. */
export const WINDOW_BAR = 52;

export const MacWindow: React.FC<MacWindowProps> = ({
  title,
  width = 1280,
  height = 800,
  theme,
  dots = 'color',
  toolbar,
  sidebar,
  sidebarWidth = 260,
  background,
  enterAt = false,
  shadow = true,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const dark = (theme ?? b.theme) === 'dark';
  const surface = background ?? b.colors.surface;
  const bar = dark ? mix(surface, '#FFFFFF', 0.04) : mix(surface, '#000000', 0.03);
  const line = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const p = enterAt === false ? 1 : spring({frame: frame - enterAt, fps, config: springs.ui});
  const dot = (i: number) => (dots === 'mono' ? alpha(b.colors.muted, 0.45) : DOT_COLORS[i]);
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: b.radius,
        overflow: 'hidden',
        background: surface,
        border: `1px solid ${line}`,
        boxShadow: shadow ? (dark ? '0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)' : '0 30px 90px rgba(20,24,40,0.18)') : undefined,
        opacity: Math.min(1, p * 1.4),
        transform: p < 0.999 ? `translateY(${((1 - p) * 40).toFixed(2)}px) scale(${(0.96 + 0.04 * p).toFixed(4)})` : undefined,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div style={{height: WINDOW_BAR, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px', background: bar, borderBottom: `1px solid ${line}`, position: 'relative'}}>
        {dots !== 'none' ? (
          <div style={{display: 'flex', gap: 9}}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{width: 14, height: 14, borderRadius: 7, background: dot(i), boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)'}} />
            ))}
          </div>
        ) : null}
        {title ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: b.font.text,
              fontSize: 17,
              fontWeight: 600,
              color: alpha(b.colors.fg, 0.72),
              pointerEvents: 'none',
            }}
          >
            {title}
          </div>
        ) : null}
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, position: 'relative'}}>{toolbar}</div>
      </div>
      <div style={{flex: 1, display: 'flex', minHeight: 0}}>
        {sidebar ? (
          <div style={{width: sidebarWidth, flexShrink: 0, borderRight: `1px solid ${line}`, background: dark ? mix(surface, '#000000', 0.18) : mix(surface, '#000000', 0.025), position: 'relative'}}>
            {sidebar}
          </div>
        ) : null}
        <div style={{flex: 1, position: 'relative', minWidth: 0, overflow: 'hidden'}}>{children}</div>
      </div>
    </div>
  );
};

/** A sidebar row: optional dot glyph + label; `active` gets the accent tint. */
export const SidebarItem: React.FC<{label: string; active?: boolean; count?: number; style?: React.CSSProperties}> = ({label, active, count, style}) => {
  const b = useBrand();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '2px 12px',
        padding: '10px 14px',
        borderRadius: Math.max(6, b.radius * 0.6),
        background: active ? alpha(b.colors.accent, 0.16) : 'transparent',
        color: active ? b.colors.fg : alpha(b.colors.fg, 0.62),
        fontFamily: b.font.text,
        fontSize: 18,
        fontWeight: active ? 600 : 500,
        ...style,
      }}
    >
      <div style={{width: 8, height: 8, borderRadius: 4, background: active ? b.colors.accent : alpha(b.colors.muted, 0.6)}} />
      <span style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{label}</span>
      {count !== undefined ? <span style={{fontFamily: b.font.mono, fontSize: 15, color: alpha(b.colors.fg, 0.45)}}>{count}</span> : null}
    </div>
  );
};
