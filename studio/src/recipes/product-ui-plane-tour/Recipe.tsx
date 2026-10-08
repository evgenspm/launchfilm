import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {BrandMark} from '../../brand/Logo';
import {DEMO_BRANDS} from '../../brand/demo';
import {alpha} from '../../brand/color';
import {easings} from '../../presets/easings';
import {Typewriter} from '../../presets/text';
import {ASPECTS, type Aspect} from '../../film/types';
import recipe from './recipe.json';
import {DarkStage, LearningResourceGrid, TiltPlane, type ResourceCardCopy, type UiScreenCopy} from './UiPlane';

export type PlaneTourContent = {
  heroCopy: string;
  heroAccent: string;
  uiScreens: UiScreenCopy;
  resourceCards: ResourceCardCopy;
  closingLine: string;
  url: string;
};

export type CameraStop = {direction: -1 | 1};

export type ProductUiPlaneTourProps = {
  brand: Brand;
  content: PlaneTourContent;
  aspect: Aspect;
  fps?: number;
  cameraStops?: CameraStop[];
};

const at30 = recipe.structure.map((row) => ({from: Math.round(row.t0 * 30), duration: Math.round((row.t1 - row.t0) * 30)}));
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const TourBody: React.FC<Omit<ProductUiPlaneTourProps, 'brand' | 'aspect' | 'fps'>> = ({content, cameraStops}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const k = fps / 30;
  const rows = at30.map((x) => ({from: Math.round(x.from * k), duration: Math.round(x.duration * k)}));
  const kinds = ['hero', 'signin', 'upload', 'summary', 'quiz', 'flashcard'] as const;
  const b = useBrand();
  const bg = b.theme === 'light' ? b.colors.fg : b.colors.bg;
  const fg = b.theme === 'light' ? b.colors.bg : b.colors.fg;
  const screenCopy = {...content.uiScreens, hero: content.heroCopy, heroAccent: content.heroAccent};

  return <AbsoluteFill style={{background: bg}}>
    {kinds.map((kind, i) => <Sequence key={kind} from={rows[i].from} durationInFrames={rows[i].duration} premountFor={Math.round(12 * k)}><TiltPlane kind={kind} copy={screenCopy} localFrame={frame - rows[i].from} duration={rows[i].duration} direction={cameraStops?.[i]?.direction ?? (i % 2 ? 1 : -1)} /></Sequence>)}
    <Sequence from={rows[6].from} durationInFrames={rows[6].duration + rows[7].duration} premountFor={Math.round(12 * k)}>
      <LearningResourceGrid cards={content.resourceCards} localFrame={frame - rows[6].from} duration={rows[6].duration} />
      {frame >= rows[7].from ? <AbsoluteFill style={{background: bg, opacity: interpolate(frame, [rows[7].from, rows[7].from + rows[7].duration], [0, 1], {...clamp, easing: easings.inOutSine}), backdropFilter: `blur(${interpolate(frame, [rows[7].from, rows[7].from + rows[7].duration], [0, 18], clamp)}px)`}} /> : null}
    </Sequence>
    <Sequence from={rows[8].from} durationInFrames={rows[8].duration + rows[9].duration} premountFor={Math.round(12 * k)}>
      <DarkStage>
        {(() => {
          const local = frame - rows[8].from;
          const p = interpolate(local, [0, Math.round(14 * k)], [0.28, 1], {...clamp, easing: easings.outExpo});
          const travel = interpolate(local, [0, rows[8].duration], [0, 1], {...clamp, easing: easings.inOutSine});
          const promiseAt = rows[8].duration;
          const reveal = interpolate(local, [promiseAt, promiseAt + Math.round(8 * k)], [0, 1], {...clamp, easing: easings.outExpo});
          return <>
            <div style={{position: 'absolute', left: `${50 + travel * 25}%`, top: '50%', transform: `translate(-50%, -50%) scale(${0.58 + p * 0.54})`, filter: `drop-shadow(0 0 ${18 + p * 42}px ${alpha(b.colors.accent, 0.72)})`, opacity: local >= promiseAt ? 1 - reveal * 0.68 : p}}><BrandMark brand={b} size={Math.round(height * 0.12)} /></div>
            {local >= promiseAt ? <div style={{position: 'absolute', left: width * 0.17, top: '50%', transform: 'translateY(-50%)', color: fg, fontSize: height * 0.064, fontWeight: b.type.displayWeight, letterSpacing: `${b.type.displayTracking}em`, clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`, textShadow: `0 0 38px ${alpha(fg, 0.32)}`}}>{content.closingLine}</div> : null}
          </>;
        })()}
      </DarkStage>
    </Sequence>
    <Sequence from={rows[10].from} durationInFrames={rows[10].duration} premountFor={Math.round(12 * k)}>
      <DarkStage><AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${interpolate(frame - rows[10].from, [0, rows[10].duration], [1, 1.01], clamp)})`}}><Typewriter text={content.url} start={0} cps={30} caret={false} style={{fontFamily: b.font.display, fontSize: height * 0.064, fontWeight: 720, color: fg, textShadow: `0 0 44px ${alpha(fg, 0.48)}`, letterSpacing: '-0.025em'}} /></AbsoluteFill></DarkStage>
    </Sequence>
  </AbsoluteFill>;
};

export const ProductUiPlaneTour: React.FC<ProductUiPlaneTourProps> = ({brand, content, cameraStops}) => <BrandProvider brand={brand}><TourBody content={content} cameraStops={cameraStops} /></BrandProvider>;

export const calculateProductUiPlaneTourMetadata: CalculateMetadataFunction<ProductUiPlaneTourProps> = ({props}) => {
  const fps = props.fps ?? recipe.format.fps;
  return {...ASPECTS[props.aspect], fps, durationInFrames: Math.round(recipe.format.duration_s * fps)};
};

export const productUiPlaneTourDefaults: ProductUiPlaneTourProps = {
  brand: DEMO_BRANDS.tallyfield,
  aspect: '16:9',
  fps: 30,
  content: {
    heroCopy: 'See what moves.',
    heroAccent: 'Know what matters.',
    uiScreens: {
      hero: 'See what moves.',
      heroAccent: 'Know what matters.',
      signInTitle: 'Welcome back.',
      uploadTitle: 'Bring every signal together.',
      summaryTitle: 'The clearest path starts here.',
      quizQuestion: 'Which first action predicts a lasting workspace?',
      flashcard: 'When a team shares one view of the journey, the next decision gets easier.',
    },
    resourceCards: [
      {title: 'Activation field guide', meta: 'A practical map for the first useful session'},
      {title: 'Retention patterns', meta: 'Four habits behind durable product use'},
      {title: 'Interview signals', meta: 'Turn research notes into visible themes'},
      {title: 'Experiment library', meta: 'Small tests with measurable outcomes'},
    ],
    closingLine: 'Answers, without the hunt.',
    url: 'tallyfield.io',
  },
  cameraStops: [{direction: -1}, {direction: 1}, {direction: -1}, {direction: 1}, {direction: -1}, {direction: 1}],
};
