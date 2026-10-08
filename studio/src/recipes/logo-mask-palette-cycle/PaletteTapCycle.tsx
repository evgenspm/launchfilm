import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandMark} from '../../brand/Logo';
import {onColor} from '../../brand/color';
import {useBrand} from '../../brand/BrandProvider';
import {easings} from '../../presets/easings';

export type PaletteState = {
  color: string;
  label: string;
  detailLabel: string;
  detailValue: string;
};

export type PaletteTapCycleProps = {
  states: PaletteState[];
  tapFrames: number[];
  cardScale: number;
  wipeFrames: number[];
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const activeTransition = (frame: number, tapFrames: number[], wipeFrames: number[]) => {
  for (let i = tapFrames.length - 1; i >= 0; i--) {
    if (frame >= tapFrames[i]) return {index: i, local: frame - tapFrames[i], duration: wipeFrames[i] ?? wipeFrames[0] ?? 10};
  }
  return null;
};

/** Local recipe component: a deep mark press releases a rounded next-color field from the same centre. */
export const PaletteTapCycle: React.FC<PaletteTapCycleProps> = ({states, tapFrames, cardScale, wipeFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const brand = useBrand();
  const transition = activeTransition(frame, tapFrames, wipeFrames);
  const pressFrames = 7;
  const completed = tapFrames.filter((at, i) => frame >= at + pressFrames + (wipeFrames[i] ?? wipeFrames[0] ?? 10)).length;
  const baseIndex = completed % states.length;
  const nextIndex = transition && transition.local < pressFrames + transition.duration ? (transition.index + 1) % states.length : baseIndex;
  const base = states[baseIndex] ?? states[0];
  const next = states[nextIndex] ?? base;
  const wipeLocal = transition ? transition.local - pressFrames : -1;
  const wipe = transition && wipeLocal >= 0 && wipeLocal < transition.duration
    ? interpolate(wipeLocal, [0, transition.duration], [0, 1], {...clamp, easing: easings.outCubic})
    : 0;

  const pressAt = transition ? transition.local : -1;
  const reboundFrames = Math.max(6, Math.round((transition?.duration ?? 10) * 0.9));
  const down = pressAt < 0 ? 0 : interpolate(pressAt, [0, pressFrames], [0, 1], {...clamp, easing: easings.inExpo});
  const up = pressAt < pressFrames ? 0 : interpolate(pressAt, [pressFrames, pressFrames + reboundFrames], [0, 1], {...clamp, easing: easings.outExpo});
  const scale = pressAt < pressFrames ? 1 + (cardScale - 1) * down : cardScale + (1 - cardScale) * up;

  const side = Math.min(width, height);
  const cardSize = side * 0.24;
  const cardRadius = cardSize * 0.19;
  const diagonal = Math.sqrt(width * width + height * height);
  const fieldSize = Math.max(cardSize, diagonal * 1.12);
  const textColor = onColor(wipe > 0.68 ? next.color : base.color);
  const shown = wipe > 0.68 ? next : base;

  return (
    <AbsoluteFill style={{backgroundColor: base.color, overflow: 'hidden'}}>
      {wipe > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: fieldSize,
            height: fieldSize,
            borderRadius: cardRadius,
            backgroundColor: next.color,
            transform: `translate(-50%, -50%) scale(${wipe.toFixed(5)})`,
            transformOrigin: 'center',
          }}
        />
      ) : null}

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
        <div
          style={{
            width: cardSize,
            height: cardSize,
            borderRadius: cardRadius,
            backgroundColor: brand.colors.fg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale.toFixed(5)})`,
            boxShadow: `0 ${side * 0.012}px ${side * 0.035}px rgba(0,0,0,0.08)`,
          }}
        >
          <BrandMark size={cardSize * 0.58} color={brand.colors.bg} />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          zIndex: 3,
          left: side * 0.045,
          bottom: side * 0.045,
          display: 'grid',
          gridTemplateColumns: `${side * 0.13}px auto`,
          rowGap: side * 0.008,
          fontFamily: brand.font.mono,
          fontSize: side * 0.022,
          fontWeight: 500,
          letterSpacing: '0.04em',
          lineHeight: 1.12,
          textTransform: 'uppercase',
          color: textColor,
        }}
      >
        <span style={{opacity: 0.72}}>Series</span><span>{shown.label}</span>
        <span style={{opacity: 0.72}}>{shown.detailLabel}</span><span>{shown.detailValue}</span>
      </div>
    </AbsoluteFill>
  );
};
