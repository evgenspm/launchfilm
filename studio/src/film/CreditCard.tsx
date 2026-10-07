// Optional, OFF by default: a tiny "Made with launchfilm" chip in a corner for the last seconds of a film.
// Enable per film with "credit": true in film.json. No watermark, no logo, no link tracking.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';

export const CreditCard: React.FC<{text?: string; corner?: 'bottom-right' | 'bottom-left'}> = ({text = 'Made with launchfilm', corner = 'bottom-right'}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const b = useBrand();
  const u = Math.min(width, height) / 1080;
  const o = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 0.7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pad = 36 * u;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: corner === 'bottom-right' ? 'flex-end' : 'flex-start', padding: pad, pointerEvents: 'none'}}>
      <div style={{opacity: o, fontFamily: b.font.mono, fontSize: 18 * u, letterSpacing: '0.04em', color: b.colors.muted}}>{text}</div>
    </AbsoluteFill>
  );
};
