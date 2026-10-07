// Built-in scenes, so a simple film can be pure film.json with no TSX: "title", "statement", "caption", "logo", "blank".
// A film's own scenes (films/<slug>/scenes.tsx) override these names. Every scene moves (craft: nothing static).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {LogoReveal, type LogoRevealVariant} from '../components/LogoReveal';
import {BrandBackdrop} from '../presets/look';
import {Caption} from '../presets/text';
import {BlurIn, StatementSequence, resolveExit, statementSize, type EnterName, type Statement} from '../presets/statement';
import {easings} from '../presets/easings';
import type {Scene, SceneProps} from './types';

const str = (v: unknown, d: string) => (typeof v === 'string' ? v : d);

/** Brand name (or props.text) blurs in large with a slow push; the tagline (props.sub) follows 10 fr later. */
export const TitleScene: React.FC<SceneProps> = ({shot}) => {
  const b = useBrand();
  const {width, height} = useVideoConfig();
  const text = str(shot.props?.text, b.name);
  const sub = shot.props?.sub === null ? '' : str(shot.props?.sub, b.tagline ?? '');
  const size = Math.round(statementSize(width, height) * 1.35);
  return (
    <AbsoluteFill>
      <BrandBackdrop />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: size * 0.32}}>
        <BlurIn text={text} enter={(shot.props?.enter as EnterName) ?? 'blurDrop'} fontSize={size} layout="inline" push={{from: 0.985, to: 1.035, frames: 90}} />
        {sub ? (
          <BlurIn
            text={sub}
            startFrame={10}
            layout="inline"
            fontSize={Math.round(size * 0.3)}
            fontWeight={b.type.textWeight + 100}
            color={b.colors.muted}
            theme={{font: b.font.text, tracking: '-0.01em'}}
            maxWidth={width * 0.8}
          />
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** props.lines: string[] (or Statement[]) → StatementSequence. Lines without from/to share the shot evenly, each one
 *  leaving (exit + 4 fr gap) before the next, the last one held to the cut. */
export const StatementScene: React.FC<SceneProps> = ({shot, dur}) => {
  const raw = (shot.props?.lines as (string | Statement)[] | undefined) ?? [str(shot.props?.text, 'Say one thing.')];
  const lines = raw.map((l) => (typeof l === 'string' ? {text: l} : l));
  const seg = dur / lines.length;
  const statements = lines.map((l, i) => {
    if (l.from !== undefined || l.to !== undefined) return l;
    const from = Math.round(i * seg);
    const last = i === lines.length - 1;
    const exitLen = resolveExit(l.exit).duration;
    // the last statement stays until the cut (its exit would only show over the next shot's transition)
    const to = last ? dur + 1 : Math.round((i + 1) * seg) - exitLen - (exitLen > 0 ? 4 : 0);
    return {...l, from, to: Math.max(from + 1, to)};
  });
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.1} />
      <StatementSequence statements={statements} />
    </AbsoluteFill>
  );
};

/** props.text as a hero caption that enters as one block. */
export const CaptionScene: React.FC<SceneProps> = ({shot}) => (
  <AbsoluteFill>
    <BrandBackdrop />
    <Caption>{str(shot.props?.text, '')}</Caption>
  </AbsoluteFill>
);

/** LogoReveal (props.variant: 'from-dot' | 'glass' | 'particles' | 'draw', default 'from-dot') with a slow push. */
export const LogoScene: React.FC<SceneProps> = ({shot, dur}) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, Math.max(1, dur)], [1, 1.04], {extrapolateRight: 'clamp', easing: easings.outCubic});
  const variant = (shot.props?.variant as LogoRevealVariant | undefined) ?? 'from-dot';
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.18} />
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <LogoReveal variant={variant} background={false} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const BlankScene: React.FC<SceneProps> = () => <BrandBackdrop glow={0} />;

export const BUILTIN_SCENES: Record<string, Scene> = {
  title: TitleScene,
  statement: StatementScene,
  caption: CaptionScene,
  logo: LogoScene,
  blank: BlankScene,
};
