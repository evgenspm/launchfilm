// Backdrops for product shots. DesktopBackdrop: brand bg + soft colour blobs (seeded, slowly drifting).
// Desktop: the backdrop plus an optional generic top bar (brand mark, clock) and a dock of neutral squircle tiles with
// initials — no real app icons, no OS wallpaper. Children are centred on top.
// DesktopBackdrop is absolutely positioned: put content after it inside a positioned box (AbsoluteFill), or in-flow
// content will paint underneath it.
import React from 'react';
import {AbsoluteFill, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix, onColor} from '../brand/color';
import {BrandMark} from '../brand/Logo';
import {springs} from '../presets/springs';

export type DesktopBackdropProps = {
  /** number of colour blobs (0 = flat) */
  blobs?: number;
  /** blob strength 0..1 */
  intensity?: number;
  /** colours to draw blobs from; default brand accent / accent2 */
  colors?: string[];
  /** drift speed multiplier (0 = still) */
  drift?: number;
  seed?: string;
  style?: React.CSSProperties;
};

export const DesktopBackdrop: React.FC<DesktopBackdropProps> = ({blobs = 4, intensity = 0.55, colors, drift = 1, seed = 'desk', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const cols = colors ?? [b.colors.accent, b.colors.accent2, mix(b.colors.accent, b.colors.bg, 0.4)];
  const t = (frame / fps) * drift;
  const layers = Array.from({length: blobs}).map((_, i) => {
    const x = 15 + random(`${seed}-x-${i}`) * 70 + Math.sin(t * 0.35 + i * 1.7) * 4;
    const y = 10 + random(`${seed}-y-${i}`) * 80 + Math.cos(t * 0.3 + i * 2.3) * 4;
    const r = 35 + random(`${seed}-r-${i}`) * 30;
    const a = (b.theme === 'dark' ? 0.32 : 0.22) * intensity * (0.6 + random(`${seed}-a-${i}`) * 0.4);
    const c = cols[i % cols.length];
    return `radial-gradient(circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, ${alpha(c, a)} 0%, ${alpha(c, 0)} ${r.toFixed(1)}%)`;
  });
  const base = b.theme === 'dark' ? `linear-gradient(160deg, ${mix(b.colors.bg, '#FFFFFF', 0.03)}, ${b.colors.bg})` : `linear-gradient(160deg, ${b.colors.bg}, ${mix(b.colors.bg, '#000000', 0.04)})`;
  return <AbsoluteFill style={{background: [...layers, base].join(', '), ...style}} />;
};

export type DockApp = {label: string; color?: string};

export type DesktopProps = DesktopBackdropProps & {
  /** generic top bar with the brand mark and a clock */
  topBar?: boolean;
  clock?: string;
  /** bar labels after the mark, e.g. ['File', 'Edit', 'View'] */
  menu?: string[];
  /** dock tiles (initials); the first can be the brand by passing `brand: true` */
  dock?: DockApp[] | false;
  /** put the brand mark first in the dock */
  dockBrand?: boolean;
  /** dock rises in from this frame; false = static */
  dockAt?: number | false;
  children?: React.ReactNode;
};

const Tile: React.FC<{size: number; color: string; label: string; font: string}> = ({size, color, label, font}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.27,
      background: `linear-gradient(160deg, ${mix(color, '#FFFFFF', 0.18)}, ${color})`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.12), 0 ${size * 0.08}px ${size * 0.2}px rgba(0,0,0,0.25)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      fontWeight: 700,
      fontSize: size * 0.4,
      color: onColor(color),
    }}
  >
    {label.slice(0, 2)}
  </div>
);

export const Desktop: React.FC<DesktopProps> = ({topBar = true, clock = 'Tue 9:41', menu = ['File', 'Edit', 'View', 'Window'], dock, dockBrand = true, dockAt = false, children, ...bg}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const u = Math.min(width, height) / 1080;
  const barH = 34 * u;
  const tile = 64 * u;
  const apps: DockApp[] = dock === false ? [] : (dock ?? [{label: 'Ma'}, {label: 'Ca'}, {label: 'No'}, {label: 'Fi'}, {label: 'Te'}]);
  const palette = [mix(b.colors.muted, b.colors.bg, 0.2), mix(b.colors.accent2, b.colors.bg, 0.25), mix(b.colors.accent, '#7F7F7F', 0.5), mix(b.colors.muted, b.colors.fg, 0.3)];
  const dp = dockAt === false ? 1 : spring({frame: frame - dockAt, fps, config: springs.ui});
  const barFg = b.theme === 'dark' ? alpha(b.colors.fg, 0.85) : alpha(b.colors.fg, 0.8);
  return (
    <AbsoluteFill>
      <DesktopBackdrop {...bg} />
      {topBar ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: barH,
            display: 'flex',
            alignItems: 'center',
            gap: 22 * u,
            padding: `0 ${22 * u}px`,
            background: b.theme === 'dark' ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(20px)',
            fontFamily: b.font.text,
            fontSize: 15 * u,
            fontWeight: 500,
            color: barFg,
          }}
        >
          <BrandMark size={18 * u} />
          <span style={{fontWeight: 700}}>{b.name}</span>
          {menu.map((m) => (
            <span key={m} style={{opacity: 0.8}}>
              {m}
            </span>
          ))}
          <span style={{marginLeft: 'auto', fontVariantNumeric: 'tabular-nums'}}>{clock}</span>
        </div>
      ) : null}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{children}</AbsoluteFill>
      {apps.length || dockBrand ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 14 * u, display: 'flex', justifyContent: 'center', transform: `translateY(${((1 - dp) * 120 * u).toFixed(2)}px)`}}>
          <div
            style={{
              display: 'flex',
              gap: 12 * u,
              padding: 10 * u,
              borderRadius: 26 * u,
              background: b.theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${b.theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
              backdropFilter: 'blur(24px)',
            }}
          >
            {dockBrand ? (
              <div style={{width: tile, height: tile, borderRadius: tile * 0.27, background: b.colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'}}>
                <BrandMark size={tile * 0.6} />
              </div>
            ) : null}
            {apps.map((a, i) => (
              <Tile key={i} size={tile} color={a.color ?? palette[i % palette.length]} label={a.label} font={b.font.text} />
            ))}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
