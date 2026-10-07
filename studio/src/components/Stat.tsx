// Stats: a big counted number, a label under it, an optional delta pill. StatRow lays out 2–4 with hairline dividers
// and a 5 fr stagger (columns in landscape, rows in portrait).
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {springs} from '../presets/springs';
import {stagger as staggerFrames} from '../presets/timing';
import {Counter} from './Counter';

export type StatProps = {
  value: number;
  from?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** e.g. {text: '+18%', direction: 'up'} */
  delta?: {text: string; direction?: 'up' | 'down'};
  start?: number;
  /** frames the count takes */
  duration?: number;
  rolling?: boolean;
  /** number size in px at 1080p */
  size?: number;
  align?: 'left' | 'center';
  /** paint the number in the accent */
  accent?: boolean;
  style?: React.CSSProperties;
};

export const Stat: React.FC<StatProps> = ({value, from = 0, label, prefix, suffix, decimals = 0, delta, start = 0, duration = 40, rolling = false, size = 132, align = 'left', accent = false, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const p = spring({frame: frame - start, fps, config: springs.settle});
  const lp = interpolate(frame, [start + 6, start + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dp = spring({frame: frame - start - duration + 6, fps, config: springs.pop});
  const up = (delta?.direction ?? 'up') === 'up';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: size * 0.1,
        opacity: Math.min(1, p * 1.5),
        transform: p < 0.999 ? `translateY(${((1 - p) * size * 0.3).toFixed(2)}px)` : undefined,
        ...style,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: size * 0.18}}>
        <Counter from={from} to={value} start={start} duration={duration} decimals={decimals} prefix={prefix} suffix={suffix} rolling={rolling} fontSize={size} color={accent ? b.colors.accent : undefined} />
        {delta ? (
          <div
            style={{
              padding: `${size * 0.05}px ${size * 0.12}px`,
              borderRadius: 999,
              background: alpha(up ? b.colors.accent : '#E5484D', 0.16),
              color: up ? b.colors.accent : '#E5484D',
              fontFamily: b.font.text,
              fontWeight: 700,
              fontSize: size * 0.2,
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
              opacity: Math.max(0, Math.min(1, dp)),
              transform: `scale(${(0.7 + 0.3 * Math.max(0, dp)).toFixed(4)})`,
            }}
          >
            {up ? '▲' : '▼'} {delta.text}
          </div>
        ) : null}
      </div>
      <div style={{fontFamily: b.font.text, fontSize: Math.max(18, size * 0.22), fontWeight: 500, color: alpha(b.colors.fg, 0.6), opacity: lp, textAlign: align}}>{label}</div>
    </div>
  );
};

export type StatRowProps = {
  stats: Omit<StatProps, 'start' | 'size'>[];
  start?: number;
  /** frames between stats */
  stagger?: number;
  size?: number;
  /** force 'row' or 'column'; default: row in landscape, column in portrait */
  direction?: 'row' | 'column';
  dividers?: boolean;
  style?: React.CSSProperties;
};

export const StatRow: React.FC<StatRowProps> = ({stats, start = 0, stagger = 5, size, direction, dividers = true, style}) => {
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const dir = direction ?? (height > width * 1.15 ? 'column' : 'row');
  const s = size ?? (dir === 'row' ? (stats.length >= 4 ? 96 : 120) : 128);
  const line = alpha(b.colors.fg, 0.12);
  return (
    <div style={{display: 'flex', flexDirection: dir, alignItems: dir === 'row' ? 'flex-start' : 'stretch', ...style}}>
      {stats.map((st, i) => (
        <div
          key={i}
          style={{
            padding: dir === 'row' ? `0 ${i === stats.length - 1 ? 0 : s * 0.45}px 0 ${i === 0 ? 0 : s * 0.45}px` : `${i === 0 ? 0 : s * 0.28}px 0 ${i === stats.length - 1 ? 0 : s * 0.28}px`,
            borderLeft: dividers && dir === 'row' && i > 0 ? `1.5px solid ${line}` : undefined,
            borderTop: dividers && dir === 'column' && i > 0 ? `1.5px solid ${line}` : undefined,
          }}
        >
          <Stat {...st} start={start + staggerFrames(i, stagger, fps)} size={s} />
        </div>
      ))}
    </div>
  );
};
