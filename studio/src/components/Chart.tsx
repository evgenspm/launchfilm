// Charts that draw on (chart-draw). LineChart: monotone curve stroked on with evolvePath, area fill revealed with it,
// an end dot riding the head with its value. BarChart: bars rise from the baseline on springs.chartBar, 2 fr stagger.
// Minimal grid; series colours from the brand (accent, accent2, muted). Sizes in px at 1080p.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {evolvePath, getLength, getPointAtLength} from '@remotion/paths';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {springs} from '../presets/springs';
import {easings} from '../presets/easings';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const fmtDefault = (v: number) => (Math.abs(v) >= 1000 ? Math.round(v).toLocaleString('en-US') : `${Math.round(v * 10) / 10}`);

/** Monotone cubic path through points (no overshoot below the data, unlike Catmull-Rom). */
const monotonePath = (pts: [number, number][]) => {
  const n = pts.length;
  if (n < 2) return n ? `M${pts[0][0]},${pts[0][1]}` : '';
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (3 * (dx[i - 1] + dx[i])) / ((2 * dx[i] + dx[i - 1]) / m[i - 1] + (dx[i] + 2 * dx[i - 1]) / m[i]));
  t.push(m[n - 2]);
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${(pts[i][0] + h).toFixed(2)},${(pts[i][1] + h * t[i]).toFixed(2)} ${(pts[i + 1][0] - h).toFixed(2)},${(pts[i + 1][1] - h * t[i + 1]).toFixed(2)} ${pts[i + 1][0].toFixed(2)},${pts[i + 1][1].toFixed(2)}`;
  }
  return d;
};

export type LineSeries = {values: number[]; color?: string; label?: string};

export type LineChartProps = {
  data: number[] | LineSeries[];
  width?: number;
  height?: number;
  /** frame the first series starts drawing */
  start?: number;
  /** frames to draw one series */
  duration?: number;
  /** frames between series */
  seriesStagger?: number;
  /** fill under the first series */
  area?: boolean;
  curve?: 'smooth' | 'linear';
  /** x labels under the axis */
  labels?: string[];
  gridLines?: number;
  /** include 0 in the y range (default true) */
  zero?: boolean;
  /** end dot + value label riding the head of the first series */
  valueLabel?: boolean;
  format?: (v: number) => string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 900,
  height = 480,
  start = 0,
  duration = 36,
  seriesStagger = 8,
  area = true,
  curve = 'smooth',
  labels,
  gridLines = 4,
  zero = true,
  valueLabel = true,
  format = fmtDefault,
  strokeWidth = 5,
  style,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const series: LineSeries[] = typeof data[0] === 'number' ? [{values: data as number[]}] : (data as LineSeries[]);
  const colors = [b.colors.accent, b.colors.accent2, b.colors.muted];
  const all = series.flatMap((s) => s.values);
  let lo = Math.min(...all);
  let hi = Math.max(...all);
  if (zero) lo = Math.min(0, lo);
  if (hi === lo) hi = lo + 1;
  const padT = 56;
  const padB = labels ? 52 : 18;
  const padL = 12;
  const padR = valueLabel ? 120 : 16;
  const cw = width - padL - padR;
  const ch = height - padT - padB;
  const X = (i: number, n: number) => padL + (n <= 1 ? cw / 2 : (i / (n - 1)) * cw);
  const Y = (v: number) => padT + ch - ((v - lo) / (hi - lo)) * ch;
  const line = alpha(b.colors.fg, b.theme === 'dark' ? 0.1 : 0.09);
  const labelColor = alpha(b.colors.fg, 0.5);
  const paths = series.map((s) => {
    const pts = s.values.map((v, i) => [X(i, s.values.length), Y(v)] as [number, number]);
    const d = curve === 'smooth' ? monotonePath(pts) : pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
    return {d, pts};
  });
  const prog = (i: number) => interpolate(frame, [start + i * seriesStagger, start + i * seriesStagger + duration], [0, 1], {...clamp, easing: easings.inOutCubic});
  const head = (() => {
    const p0 = prog(0);
    const d = paths[0].d;
    const len = getLength(d);
    const pt = getPointAtLength(d, Math.max(0.01, len * p0));
    const vals = series[0].values;
    const fi = p0 * (vals.length - 1);
    const i0 = Math.floor(fi);
    const v = vals[Math.min(vals.length - 1, i0)] + ((vals[Math.min(vals.length - 1, i0 + 1)] ?? vals[i0]) - vals[Math.min(vals.length - 1, i0)]) * (fi - i0);
    return {p: p0, x: pt?.x ?? padL, y: pt?.y ?? padT + ch, v};
  })();
  const gradId = `lf-area-${start}-${Math.round(width)}x${Math.round(height)}-${series.length}-${Math.round(all[0] ?? 0)}`;
  return (
    <div style={{position: 'relative', width, height, ...style}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series[0].color ?? colors[0]} stopOpacity={0.32} />
            <stop offset="100%" stopColor={series[0].color ?? colors[0]} stopOpacity={0} />
          </linearGradient>
          <clipPath id={`${gradId}-clip`}>
            <rect x={0} y={0} width={Math.max(0, head.x)} height={height} />
          </clipPath>
        </defs>
        {Array.from({length: gridLines + 1}).map((_, i) => {
          const y = padT + (ch * i) / gridLines;
          return <line key={i} x1={padL} x2={padL + cw} y1={y} y2={y} stroke={line} strokeWidth={i === gridLines ? 2 : 1.5} strokeDasharray={i === gridLines ? undefined : '4 8'} />;
        })}
        {area && head.p > 0 ? (
          <path d={`${paths[0].d} L${(padL + cw).toFixed(2)},${(padT + ch).toFixed(2)} L${padL},${(padT + ch).toFixed(2)} Z`} fill={`url(#${gradId})`} clipPath={`url(#${gradId}-clip)`} />
        ) : null}
        {paths.map((p, i) => {
          const pr = prog(i);
          if (pr <= 0) return null;
          const ev = evolvePath(pr, p.d);
          return (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke={series[i].color ?? colors[i % colors.length]}
              strokeWidth={i === 0 ? strokeWidth : strokeWidth * 0.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={ev.strokeDasharray}
              strokeDashoffset={ev.strokeDashoffset}
              opacity={i === 0 ? 1 : 0.85}
            />
          );
        })}
        {valueLabel && head.p > 0 ? (
          <>
            <circle cx={head.x} cy={head.y} r={strokeWidth * 3.2} fill={alpha(series[0].color ?? colors[0], 0.22)} />
            <circle cx={head.x} cy={head.y} r={strokeWidth * 1.5} fill={series[0].color ?? colors[0]} stroke={b.colors.bg} strokeWidth={2.5} />
          </>
        ) : null}
      </svg>
      {valueLabel && head.p > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: head.x + 22,
            top: head.y - 22,
            padding: '4px 12px',
            borderRadius: 999,
            background: series[0].color ?? colors[0],
            color: b.theme === 'dark' ? b.colors.bg : '#FFFFFF',
            fontFamily: b.font.text,
            fontWeight: 700,
            fontSize: 22,
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          {format(head.v)}
        </div>
      ) : null}
      {labels ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: padB}}>
          {labels.map((l, i) => (
            <div
              key={i}
              style={{position: 'absolute', left: X(i, labels.length), bottom: 8, transform: 'translateX(-50%)', fontFamily: b.font.text, fontSize: 18, color: labelColor, whiteSpace: 'nowrap'}}
            >
              {l}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export type BarDatum = number | {value: number; label?: string; highlight?: boolean};

export type BarChartProps = {
  data: BarDatum[];
  width?: number;
  height?: number;
  start?: number;
  /** frames between bars */
  stagger?: number;
  /** value labels above bars (fade in as each bar settles) */
  valueLabels?: boolean;
  format?: (v: number) => string;
  gridLines?: number;
  /** gap between bars as a fraction of the slot */
  gap?: number;
  /** bar colour; highlighted bars use accent and the rest go muted when any bar is highlighted */
  color?: string;
  style?: React.CSSProperties;
};

export const BarChart: React.FC<BarChartProps> = ({data, width = 900, height = 480, start = 0, stagger = 2, valueLabels = true, format = fmtDefault, gridLines = 4, gap = 0.32, color, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const items = data.map((d) => (typeof d === 'number' ? {value: d} : d));
  const anyHi = items.some((d) => d.highlight);
  const hasLabels = items.some((d) => d.label);
  const hi = Math.max(1e-9, ...items.map((d) => d.value));
  const padT = valueLabels ? 46 : 12;
  const padB = hasLabels ? 48 : 8;
  const ch = height - padT - padB;
  const slot = width / items.length;
  const bw = slot * (1 - gap);
  const line = alpha(b.colors.fg, b.theme === 'dark' ? 0.1 : 0.09);
  const radius = Math.min(bw / 2, Math.max(4, b.radius * 0.5));
  return (
    <div style={{position: 'relative', width, height, ...style}}>
      {Array.from({length: gridLines + 1}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: padT + (ch * i) / gridLines,
            height: 0,
            borderTop: i === gridLines ? `2px solid ${line}` : `1.5px dashed ${line}`,
          }}
        />
      ))}
      {items.map((d, i) => {
        const p = spring({frame: frame - start - i * stagger, fps, config: springs.chartBar});
        const h = (d.value / hi) * ch * Math.max(0, p);
        const c = color ?? (anyHi ? (d.highlight ? b.colors.accent : alpha(b.colors.muted, 0.45)) : b.colors.accent);
        const labelP = interpolate(p, [0.75, 1], [0, 1], clamp);
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: i * slot + (slot - bw) / 2,
                top: padT + ch - h,
                width: bw,
                height: Math.max(0, h),
                borderRadius: `${radius}px ${radius}px 2px 2px`,
                background: c,
              }}
            />
            {valueLabels ? (
              <div
                style={{
                  position: 'absolute',
                  left: i * slot,
                  width: slot,
                  top: padT + ch - h - 38,
                  textAlign: 'center',
                  fontFamily: b.font.text,
                  fontWeight: 700,
                  fontSize: 22,
                  fontVariantNumeric: 'tabular-nums',
                  color: anyHi && !d.highlight ? alpha(b.colors.fg, 0.55) : b.colors.fg,
                  opacity: labelP,
                }}
              >
                {format(d.value)}
              </div>
            ) : null}
            {d.label ? (
              <div style={{position: 'absolute', left: i * slot, width: slot, bottom: 8, textAlign: 'center', fontFamily: b.font.text, fontSize: 18, color: alpha(b.colors.fg, 0.5), whiteSpace: 'nowrap'}}>
                {d.label}
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export type ChartProps = (({kind: 'line'} & LineChartProps) | ({kind: 'bar'} & BarChartProps)) & {
  /** small heading above the plot */
  title?: string;
  /** big figure next to the title */
  figure?: string;
  /** wrap in a brand surface card */
  card?: boolean;
};

/** Line or bar chart with an optional title / figure header and a card surface. */
export const Chart: React.FC<ChartProps> = (props) => {
  const b = useBrand();
  const {title, figure, card = false} = props;
  const plot = props.kind === 'line' ? <LineChart {...props} /> : <BarChart {...props} />;
  const head =
    title || figure ? (
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, gap: 24}}>
        {title ? <div style={{fontFamily: b.font.text, fontSize: 22, fontWeight: 600, color: alpha(b.colors.fg, 0.62)}}>{title}</div> : <div />}
        {figure ? <div style={{fontFamily: b.font.display, fontSize: 44, fontWeight: b.type.displayWeight, letterSpacing: `${b.type.displayTracking}em`, color: b.colors.fg}}>{figure}</div> : null}
      </div>
    ) : null;
  if (!card) {
    return (
      <div>
        {head}
        {plot}
      </div>
    );
  }
  return (
    <div
      style={{
        padding: 36,
        borderRadius: b.radius * 1.4,
        background: b.colors.surface,
        border: `1px solid ${alpha(b.colors.fg, b.theme === 'dark' ? 0.07 : 0.06)}`,
        boxShadow: b.theme === 'dark' ? '0 30px 80px rgba(0,0,0,0.45)' : '0 20px 60px rgba(20,24,40,0.12)',
      }}
    >
      {head}
      {plot}
    </div>
  );
};
