import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, useBrand} from '../../brand';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const CARD_TYPES = ['calendar', 'poll', 'map', 'menu', 'photos', 'tickets', 'notes', 'board', 'weather', 'playlist', 'invite', 'places', 'tasks', 'travel', 'ideas', 'weekend'] as const;

const CardArt: React.FC<{index: number}> = ({index}) => {
  const b = useBrand();
  const kind = CARD_TYPES[index % CARD_TYPES.length];
  const primary = index % 3 === 0 ? b.colors.accent : index % 3 === 1 ? b.colors.accent2 : b.colors.fg;
  return (
    <div style={{position: 'absolute', inset: 0, padding: 18, color: b.colors.fg, fontFamily: b.font.text}}>
      <div style={{fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em'}}>{kind}</div>
      <div style={{marginTop: 9, width: `${42 + (index % 4) * 11}%`, height: 7, borderRadius: 20, background: alpha(primary, 0.72)}} />
      <div style={{display: 'grid', gridTemplateColumns: index % 2 ? '1fr 1fr' : '1fr 1fr 1fr', gap: 6, marginTop: 14}}>
        {Array.from({length: index % 2 ? 4 : 6}).map((_, i) => (
          <div
            key={i}
            style={{
              height: 30 + ((index + i) % 3) * 12,
              borderRadius: 8,
              background: i === (index % 4) ? primary : alpha(primary, 0.1 + ((i + index) % 3) * 0.08),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export type GalleryWallProps = {
  at: number;
  focus?: boolean;
  selected?: number;
};

export const GalleryWall: React.FC<GalleryWallProps> = ({at, focus = false, selected = 6}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const enter = spring({frame: frame - at, fps, config: springs.heavy});
  const focusIn = spring({frame: frame - at, fps, config: springs.cameraIn});
  const drift = interpolate(frame - at, [0, 128], [0, -height * 0.14], {...clamp, easing: easings.inOutSine});
  const gap = width * 0.035;
  const cardW = width * 0.285;
  const cardH = cardW * 0.68;

  if (focus) {
    return (
      <div
        style={{
          position: 'absolute',
          width: width * 0.86,
          height: height * 0.245,
          left: width * 0.07,
          top: height * 0.18,
          borderRadius: b.radius,
          overflow: 'hidden',
          background: b.colors.fg,
          boxShadow: `0 34px 80px ${alpha(b.colors.fg, 0.18)}`,
          transform: `scale(${0.78 + 0.22 * focusIn}) translateX(${(1 - focusIn) * 80}px)`,
          opacity: focusIn,
        }}
      >
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 78% 36%, ${alpha(b.colors.accent2, 0.55)}, ${alpha(b.colors.fg, 0)} 45%)`}} />
        <div style={{position: 'absolute', left: 38, top: 34, fontFamily: b.font.mono, color: b.colors.accent, fontSize: 19, fontWeight: 700}}>PLUMDAY / {CARD_TYPES[selected]}</div>
        <div style={{position: 'absolute', left: 38, right: 38, bottom: 42, color: b.colors.bg, fontFamily: b.font.display, fontSize: 45, lineHeight: 1.08, fontWeight: b.type.displayWeight}}>A plan everyone can shape.</div>
      </div>
    );
  }

  return (
    <div style={{position: 'absolute', inset: -height * 0.1, transform: `translateY(${drift}px) scale(${0.9 + enter * 0.1})`, opacity: enter}}>
      {Array.from({length: 16}).map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = width * 0.09 + col * (cardW + gap) + (row % 2 ? cardW * 0.16 : 0);
        const y = height * 0.05 + row * (cardH + gap * 1.35);
        const local = spring({frame: frame - at - i * 2, fps, config: springs.heavy});
        return (
          <div
            key={CARD_TYPES[i]}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: cardW,
              height: cardH,
              borderRadius: b.radius * 0.55,
              overflow: 'hidden',
              background: i % 5 === 0 ? alpha(b.colors.accent, 0.16) : i % 4 === 0 ? alpha(b.colors.accent2, 0.16) : b.colors.surface,
              border: `1px solid ${alpha(b.colors.fg, 0.08)}`,
              boxShadow: `0 18px 44px ${alpha(b.colors.fg, 0.09)}`,
              transform: `translateY(${(1 - local) * 90}px) scale(${0.82 + local * 0.18})`,
              opacity: local,
            }}
          >
            <CardArt index={i} />
          </div>
        );
      })}
    </div>
  );
};
