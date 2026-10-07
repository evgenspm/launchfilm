// Number ticker (counter): from → to over `duration` frames with an ease, prefix / suffix, decimals, thousands separators,
// tabular figures so the width never jitters. `rolling` = odometer: each digit is a vertical strip that rolls, and a
// higher digit only turns while the one below it passes 9 → 0.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {easings, type EasingName} from '../presets/easings';

export type CounterProps = {
  from?: number;
  to: number;
  /** frame the count starts */
  start?: number;
  /** frames to reach `to` */
  duration?: number;
  easing?: EasingName;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** thousands separator ('' = none) */
  separator?: string;
  rolling?: boolean;
  fontSize?: number;
  color?: string;
  /** 'display' (default) or 'text' / 'mono' brand face */
  font?: 'display' | 'text' | 'mono';
  weight?: number;
  style?: React.CSSProperties;
};

/** Format a number with fixed decimals and a thousands separator. */
export const formatNumber = (v: number, decimals = 0, separator = ',') => {
  const fixed = Math.abs(v).toFixed(decimals);
  const [int, frac] = fixed.split('.');
  const grouped = separator ? int.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : int;
  return `${v < 0 ? '−' : ''}${grouped}${frac ? `.${frac}` : ''}`;
};

/** Current value of a counter at `frame`. */
export const counterValue = (frame: number, from: number, to: number, start: number, duration: number, easing: EasingName = 'outExpo') =>
  interpolate(frame, [start, start + Math.max(1, duration)], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings[easing]});

const DigitStrip: React.FC<{pos: number; size: number; visible: boolean}> = ({pos, size, visible}) => {
  // pos in [0, 10): 0..9 stacked, plus a trailing 0 so 9 → 0 rolls forward
  const lineH = size * 1.1;
  return (
    <span style={{display: 'inline-block', position: 'relative', height: lineH, overflow: 'hidden', verticalAlign: 'top', opacity: visible ? 1 : 0, width: '0.62em'}}>
      <span style={{position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${(-pos * lineH).toFixed(2)}px)`, textAlign: 'center'}}>
        {Array.from({length: 11}).map((_, d) => (
          <span key={d} style={{display: 'block', height: lineH, lineHeight: `${lineH}px`}}>
            {d % 10}
          </span>
        ))}
      </span>
    </span>
  );
};

export const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  start = 0,
  duration = 45,
  easing = 'outExpo',
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  rolling = false,
  fontSize = 120,
  color,
  font = 'display',
  weight,
  style,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const v = counterValue(frame, from, to, start, duration, easing);
  const base: React.CSSProperties = {
    fontFamily: b.font[font],
    fontWeight: weight ?? (font === 'display' ? b.type.displayWeight : 600),
    fontSize,
    letterSpacing: font === 'display' ? `${b.type.displayTracking * 0.5}em` : undefined,
    lineHeight: 1.1,
    color: color ?? b.colors.fg,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    ...style,
  };
  if (!rolling) {
    return (
      <span style={base}>
        {prefix}
        {formatNumber(v, decimals, separator)}
        {suffix}
      </span>
    );
  }
  // odometer: work in integer units of the last decimal place
  const scale = Math.pow(10, decimals);
  const scaled = Math.abs(v) * scale;
  const maxDigits = Math.max(String(Math.round(Math.abs(to) * scale)).length, String(Math.round(Math.abs(from) * scale)).length, decimals + 1);
  const cells: React.ReactNode[] = [];
  for (let k = maxDigits - 1; k >= 0; k--) {
    const unit = Math.pow(10, k);
    const base10 = Math.floor(scaled / unit) % 10;
    let pos: number;
    if (k === 0) pos = scaled % 10;
    else {
      const below = scaled % unit; // value of the lower digits
      const carry = Math.max(0, Math.min(1, below - (unit - 1))); // turns only while the lower digits pass 9…9 → 0…0
      pos = base10 + carry;
    }
    const lead = k > decimals && Math.floor(scaled / unit) === 0; // leading zero of the integer part
    cells.push(<DigitStrip key={`d${k}`} pos={pos} size={fontSize} visible={!lead} />);
    if (separator && k > decimals && (k - decimals) % 3 === 0) {
      cells.push(
        <span key={`s${k}`} style={{opacity: lead ? 0 : 1}}>
          {separator}
        </span>,
      );
    }
    if (decimals > 0 && k === decimals) cells.push(<span key="dot">.</span>);
  }
  return (
    <span style={{...base, display: 'inline-flex', alignItems: 'flex-start', height: fontSize * 1.1}}>
      {v < 0 ? '−' : ''}
      {prefix}
      {cells}
      {suffix}
    </span>
  );
};
