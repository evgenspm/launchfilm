import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../../brand/BrandProvider';
import {alpha, mix} from '../../brand/color';
import {springs} from '../../presets/springs';
import {easings} from '../../presets/easings';

export type LiquidOrbMarkProps = {
  at: number;
  travelAt?: number;
  settleAt?: number;
  size?: number;
  compactSize?: number;
};

/** Layered CSS glass used as both the floating subject and the final interface mark. */
export const LiquidOrbMark: React.FC<LiquidOrbMarkProps> = ({at, travelAt = at + 50, settleAt = at + 74, size, compactSize}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = useBrand();
  const base = size ?? height * 0.105;
  const compact = compactSize ?? height * 0.06;
  const enter = spring({frame: frame - at, fps, config: springs.pop});
  const grow = spring({frame: frame - (travelAt - Math.round(11 * fps / 30)), fps, config: springs.heavy});
  const travel = spring({frame: frame - travelAt, fps, config: springs.heavy});
  const settle = spring({frame: frame - settleAt, fps, config: springs.heavy});
  const floatY = Math.sin(((frame - at) / fps) * Math.PI * 1.15) * height * 0.008;
  const x = interpolate(travel, [0, 1], [0, -width * 0.17]);
  const y = interpolate(travel, [0, 1], [-height * 0.11, -height * 0.11]) + floatY * (1 - settle);
  const focused = base * (1 + 0.65 * grow);
  const d = interpolate(settle, [0, 1], [focused, compact]);
  const opacity = interpolate(frame, [at, at + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outExpo});
  const deep = mix(brand.colors.accent, brand.colors.fg, 0.12);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: d,
        height: d,
        borderRadius: '50%',
        opacity,
        transform: `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) scale(${Math.max(0, enter).toFixed(4)})`,
        background: [
          `radial-gradient(circle at 30% 20%, ${alpha(brand.colors.bg, 0.98)} 0%, ${alpha(brand.colors.bg, 0)} 35%)`,
          `radial-gradient(circle at 70% 78%, ${alpha(deep, 0.92)} 0%, ${alpha(deep, 0)} 50%)`,
          `linear-gradient(145deg, ${alpha(brand.colors.bg, 0.8)}, ${alpha(brand.colors.accent, 0.56)})`,
        ].join(', '),
        border: `1px solid ${alpha(brand.colors.bg, 0.8)}`,
        boxShadow: `inset 0 0 ${d * 0.28}px ${alpha(brand.colors.bg, 0.72)}, 0 ${d * 0.2}px ${d * 0.5}px ${alpha(brand.colors.accent, 0.24)}`,
      }}
    />
  );
};
