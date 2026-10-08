import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, useBrand} from '../../brand';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const GLYPHS = ['✦', '✓', '♥', '↗', '●', '+'];

export const BranchMap: React.FC<{at: number; label: string}> = ({at, label}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const draw = interpolate(frame - at, [0, 20], [0, 1], {...clamp, easing: easings.outQuint});
  const xs = width * 0.72;
  const ys = height * 0.18;
  const gap = height * 0.087;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {GLYPHS.map((_, i) => {
          const y = ys + i * gap;
          const d = `M ${-width * 0.08} ${height * 0.44} C ${width * 0.23} ${height * 0.44}, ${width * 0.34} ${y}, ${xs} ${y}`;
          return <path key={i} d={d} fill="none" stroke={alpha(b.colors.fg, 0.18)} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />;
        })}
      </svg>
      {GLYPHS.map((glyph, i) => {
        const pop = spring({frame: frame - at - 7 - i * 4, fps, config: springs.ui});
        return (
          <div
            key={glyph + i}
            style={{
              position: 'absolute',
              left: xs - 34,
              top: ys + i * gap - 34,
              width: 68,
              height: 68,
              borderRadius: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: b.colors.surface,
              color: i % 2 ? b.colors.accent2 : b.colors.accent,
              fontFamily: b.font.display,
              fontSize: 28,
              fontWeight: 800,
              boxShadow: `0 10px 28px ${alpha(b.colors.fg, 0.1)}`,
              transform: `scale(${0.45 + 0.55 * pop})`,
              opacity: pop,
            }}
          >
            {glyph}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: width * 0.16, right: width * 0.16, bottom: height * 0.13, textAlign: 'center', fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: width * 0.072, letterSpacing: `${b.type.displayTracking}em`, color: b.colors.fg}}>{label}</div>
    </div>
  );
};
