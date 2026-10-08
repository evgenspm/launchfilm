import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../../brand/BrandProvider';
import {alpha, mix} from '../../brand/color';
import {easings} from '../../presets/easings';

/** A deterministic, brand-coloured mesh with the measured 2-6 px/s drift. */
export const MeshGradientBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = useBrand();
  const drift = interpolate(frame, [0, fps * 7], [0, width * 0.018], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easings.linear,
  });
  const breathe = interpolate(frame, [0, fps * 3.5, fps * 7], [0, height * 0.018, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easings.inOutSine,
  });
  const wash = mix(brand.colors.bg, brand.colors.accent, 0.08);
  return (
    <AbsoluteFill style={{background: brand.colors.bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate3d(${drift.toFixed(2)}px, ${breathe.toFixed(2)}px, 0) scale(1.08)`,
          background: [
            `radial-gradient(ellipse 58% 66% at 10% 100%, ${alpha(brand.colors.accent, 0.9)} 0%, ${alpha(brand.colors.accent, 0)} 66%)`,
            `radial-gradient(ellipse 50% 54% at 84% 12%, ${alpha(brand.colors.accent2, 0.22)} 0%, ${alpha(brand.colors.accent2, 0)} 70%)`,
            `radial-gradient(ellipse 42% 48% at 51% 42%, ${alpha(brand.colors.bg, 0.98)} 0%, ${alpha(brand.colors.bg, 0)} 72%)`,
            wash,
          ].join(', '),
          filter: `blur(${Math.round(height * 0.018)}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
