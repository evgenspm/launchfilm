import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../../brand/BrandProvider';
import {alpha} from '../../brand/color';
import {springs} from '../../presets/springs';
import {easings} from '../../presets/easings';

export type EvolvingPhraseProps = {
  setupWords: [string, string, string];
  revealWords: [string, string];
  badgeLabel: string;
  boundaries: number[];
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Measured phrase chain: append, remove from the lead, replace, then add a glass badge. */
export const EvolvingPhrase: React.FC<EvolvingPhraseProps> = ({setupWords, revealWords, badgeLabel, boundaries}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = useBrand();
  const fontSize = Math.min(height * 0.102, width * 0.07);
  const zoom = spring({frame: frame - boundaries[8] + Math.round(5 * fps / 30), fps, config: springs.cameraSnappy});
  const cameraScale = interpolate(zoom, [0, 1], [1, 2.75]);
  const cameraX = interpolate(zoom, [0, 1], [0, -width * 0.21]);

  const enter = (at: number, dur = 3) => interpolate(frame, [at, at + Math.round(dur * fps / 30)], [0, 1], {...clamp, easing: easings.outExpo});
  const exit = (at: number, dur: number) => interpolate(frame, [at, at + Math.round(dur * fps / 30)], [1, 0], {...clamp, easing: easings.inExpo});
  const setupOpacity = frame < boundaries[6] ? 1 : exit(boundaries[6], 2);
  const setupVisible = frame < boundaries[6] + Math.round(2 * fps / 30);
  const revealOpacity = enter(boundaries[6], 6) * (frame < boundaries[10] ? 1 : exit(boundaries[10], 11));
  const badgeP = spring({frame: frame - boundaries[7], fps, config: springs.layout});

  const setupState = frame < boundaries[2] ? 1 : frame < boundaries[3] ? 2 : frame < boundaries[4] ? 3 : frame < boundaries[5] ? 2 : 1;
  const setupSlice = frame < boundaries[4] ? setupWords.slice(0, setupState) : frame < boundaries[5] ? setupWords.slice(1) : setupWords.slice(2);

  const wordStyle = (i: number): React.CSSProperties => {
    const at = i === 0 ? 0 : boundaries[i + 1];
    const p = i === 0 ? 1 : enter(at);
    const isAccent = i === Math.min(1, setupSlice.length - 1);
    return {
      opacity: p,
      filter: p < 0.999 ? `blur(${((1 - p) * fontSize * 0.12).toFixed(2)}px)` : undefined,
      transform: `translateY(${((1 - p) * -fontSize * 0.2).toFixed(2)}px)`,
      color: isAccent ? brand.colors.accent : alpha(brand.colors.accent, 0.55),
    };
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${cameraX.toFixed(2)}px) scale(${cameraScale.toFixed(4)})`,
        transformOrigin: '66% 52%',
        fontFamily: brand.font.display,
        fontWeight: brand.type.displayWeight,
        letterSpacing: `${brand.type.displayTracking}em`,
        fontSize,
      }}
    >
      {setupVisible ? (
        <div style={{position: 'absolute', display: 'flex', gap: fontSize * 0.2, opacity: setupOpacity}}>
          {setupSlice.map((word, i) => <span key={`${word}-${i}`} style={wordStyle(i)}>{word}</span>)}
        </div>
      ) : null}
      <div style={{position: 'absolute', display: 'flex', alignItems: 'center', gap: fontSize * 0.2, opacity: revealOpacity}}>
        {revealWords.map((word, i) => {
          const p = enter(boundaries[6] + i * Math.round(6 * fps / 30), 6);
          return <span key={word} style={{opacity: p, filter: p < 0.999 ? `blur(${((1 - p) * fontSize * 0.12).toFixed(2)}px)` : undefined, color: i === 1 ? brand.colors.accent : alpha(brand.colors.accent, 0.55)}}>{word}</span>;
        })}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: fontSize * 1.08,
            padding: `0 ${fontSize * 0.2}px`,
            borderRadius: fontSize * 0.18,
            color: brand.colors.bg,
            background: `linear-gradient(120deg, ${alpha(brand.colors.accent, 0.64)}, ${brand.colors.accent})`,
            boxShadow: `inset 0 1px 0 ${alpha(brand.colors.bg, 0.6)}, 0 ${fontSize * 0.12}px ${fontSize * 0.35}px ${alpha(brand.colors.accent, 0.18)}`,
            transform: `scaleX(${Math.max(0, badgeP).toFixed(4)})`,
            transformOrigin: 'left center',
            overflow: 'hidden',
          }}
        >
          <span style={{opacity: interpolate(frame, [boundaries[7], boundaries[7] + Math.round(6 * fps / 30)], [0, 1], clamp), fontSize: fontSize * 0.78}}>{badgeLabel}</span>
        </span>
      </div>
    </div>
  );
};
