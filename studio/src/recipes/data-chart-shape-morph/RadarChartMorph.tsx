import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../../brand/BrandProvider';
import {alpha} from '../../brand/color';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';

export type ChartPalette = {
  field: string;
  fieldGlow: string;
  card: string;
  chart: string;
  grid: string;
  text: string;
};

export type RadarChartMorphProps = {
  title: string;
  labels: string[];
  datasets: number[][];
  morphAt: number;
  updateFrames: number;
  palette?: Partial<ChartPalette>;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const pointString = (points: [number, number][]) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

const datasetAt = (datasets: number[][], frame: number, updateFrames: number) => {
  const safe = datasets.length ? datasets : [[0.5, 0.5, 0.5, 0.5, 0.5, 0.5]];
  const step = Math.max(1, updateFrames);
  const cycle = Math.max(0, frame) / step;
  const index = Math.floor(cycle) % safe.length;
  const next = (index + 1) % safe.length;
  const t = easings.inOutSine(cycle - Math.floor(cycle));
  return Array.from({length: 6}, (_, i) => mix(safe[index][i] ?? 0.5, safe[next][i] ?? 0.5, t));
};

export const RadarChartMorph: React.FC<RadarChartMorphProps> = ({title, labels, datasets, morphAt, updateFrames, palette}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = useBrand();
  const colors: ChartPalette = {
    field: brand.colors.bg,
    fieldGlow: brand.colors.accent2,
    card: brand.colors.fg,
    chart: brand.colors.accent,
    grid: brand.colors.muted,
    text: brand.colors.bg,
    ...palette,
  };

  const cardW = width * 0.35;
  const cardH = height * 0.66;
  const pull = easings.inOutSine(Math.max(0, Math.min(1, frame / 30)));
  const settle = spring({frame: frame - 24, fps, config: springs.cameraOut});
  const scaleX = mix(width / cardW, 0.98, pull) * mix(1, 1 / 0.98, settle);
  const scaleY = mix(height / cardH, 0.98, pull) * mix(1, 1 / 0.98, settle);
  const radius = mix(0, Math.min(width, height) * 0.035, pull);
  const morph = spring({frame: frame - morphAt, fps, config: springs.ui, durationInFrames: 23});
  const firstDraw = interpolate(frame, [0, 8], [0, 1], {...clamp, easing: easings.outExpo});
  const values = datasetAt(datasets, frame < morphAt ? frame : frame - morphAt, updateFrames);

  const chartX = cardW * 0.13;
  const chartY = cardH * 0.28;
  const chartW = cardW * 0.74;
  const chartH = cardH * 0.48;
  const baseline = chartY + chartH;
  const cartesian: [number, number][] = values.map((value, i) => [chartX + (chartW * i) / 5, baseline - chartH * 0.78 * value * firstDraw]);
  const cx = cardW / 2;
  const cy = chartY + chartH * 0.48;
  const radarR = Math.min(chartW, chartH) * 0.43;
  const radar: [number, number][] = values.map((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
    const r = radarR * (0.22 + value * 0.78);
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  });
  const points: [number, number][] = cartesian.map(([x, y], i) => [mix(x, radar[i][0], morph), mix(y, radar[i][1], morph)]);
  const areaPoints = [[cartesian[0][0], baseline] as [number, number], ...points, [cartesian[5][0], baseline] as [number, number]];
  const radarArea = [radar[0], ...radar, radar[5]];
  const polygonPoints = areaPoints.map(([x, y], i) => [mix(x, radarArea[i][0], morph), mix(y, radarArea[i][1], morph)] as [number, number]);
  const fillOpacity = 0.16 + morph * 0.08;
  const lineLabels = labels.slice(0, 6);
  const fieldBackground = `radial-gradient(circle at 50% 58%, ${alpha(colors.fieldGlow, 0.2)}, ${alpha(colors.fieldGlow, 0)} 58%), ${colors.field}`;

  return (
    <div style={{position: 'absolute', inset: 0, background: fieldBackground, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: cardW,
          height: cardH,
          transform: `translate(-50%, -50%) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`,
          transformOrigin: '50% 50%',
          borderRadius: radius,
          overflow: 'hidden',
          background: colors.card,
          boxShadow: `0 ${Math.round(height * 0.03)}px ${Math.round(height * 0.09)}px ${alpha(colors.field, 0.46)}`,
        }}
      >
        <div style={{position: 'absolute', left: cardW * 0.1, top: cardH * 0.075, fontFamily: brand.font.text, fontSize: cardH * 0.038, fontWeight: 500, color: colors.text}}>
          {title}
        </div>
        <div style={{position: 'absolute', right: cardW * 0.09, top: cardH * 0.065, padding: `${cardH * 0.014}px ${cardW * 0.025}px`, borderRadius: cardH, background: alpha(colors.chart, 0.16), fontFamily: brand.font.mono, fontSize: cardH * 0.026, color: colors.text}}>
          6 branches
        </div>
        <svg width={cardW} height={cardH} style={{position: 'absolute', inset: 0}}>
          <g opacity={1 - morph}>
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <line key={v} x1={chartX} x2={chartX + chartW} y1={chartY + chartH * v} y2={chartY + chartH * v} stroke={alpha(colors.grid, 0.24)} strokeWidth={1} />
            ))}
          </g>
          <g opacity={morph} transform={`translate(${cx} ${cy}) scale(${(0.82 + morph * 0.18).toFixed(4)}) translate(${-cx} ${-cy})`}>
            {[0.33, 0.66, 1].map((ring) => (
              <polygon
                key={ring}
                points={pointString(Array.from({length: 6}, (_, i) => {
                  const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
                  return [cx + Math.cos(angle) * radarR * ring, cy + Math.sin(angle) * radarR * ring] as [number, number];
                }))}
                fill="none"
                stroke={alpha(colors.grid, 0.28)}
                strokeWidth={1}
              />
            ))}
            {Array.from({length: 6}, (_, i) => {
              const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
              return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * radarR} y2={cy + Math.sin(angle) * radarR} stroke={alpha(colors.grid, 0.22)} strokeWidth={1} />;
            })}
          </g>
          <polygon points={pointString(polygonPoints)} fill={alpha(colors.chart, fillOpacity)} stroke={colors.chart} strokeWidth={2.5} strokeLinejoin="round" />
          {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={cardW * 0.008} fill={colors.card} stroke={colors.chart} strokeWidth={2} />)}
        </svg>
        <div style={{position: 'absolute', left: chartX, top: baseline + cardH * 0.035, width: chartW, display: 'flex', justifyContent: 'space-between', opacity: 1 - morph, color: alpha(colors.text, 0.62), fontFamily: brand.font.text, fontSize: cardH * 0.025}}>
          {lineLabels.map((label) => <span key={label}>{label}</span>)}
        </div>
      </div>
    </div>
  );
};
