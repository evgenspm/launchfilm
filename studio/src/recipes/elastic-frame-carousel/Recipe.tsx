import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider, tracking, useBrand} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {ASPECTS, type Aspect} from '../../film/types';
import {ElasticFramePush, type CarouselSlide} from './ElasticFramePush';

export type ElasticFrameCarouselContent = {
  slides: CarouselSlide[];
  labels?: [string, string];
};

export type ElasticFrameCarouselProps = {
  brand: Brand;
  content: ElasticFrameCarouselContent;
  aspect: Aspect;
  fps?: number;
  /** Five change durations, expressed at 30 fps and scaled to composition fps. */
  transitionFrames?: number[];
  /** Opening hold, four middle holds, and closing loop hold, at 30 fps. */
  holdFrames?: number[];
  direction?: 'bottom-to-top' | 'top-to-bottom';
};

const DEFAULT_TRANSITIONS = [14, 13, 17, 18, 15];
const DEFAULT_HOLDS = [9, 31, 31, 26, 29, 22];

export const elasticFrameCarouselSchedule = (fps: number, transitionFrames = DEFAULT_TRANSITIONS, holdFrames = DEFAULT_HOLDS) => {
  const k = fps / 30;
  const transitions = DEFAULT_TRANSITIONS.map((fallback, i) => Math.round((transitionFrames[i] ?? fallback) * k));
  const holds = DEFAULT_HOLDS.map((fallback, i) => Math.round((holdFrames[i] ?? fallback) * k));
  const rows: {kind: 'hold' | 'transition'; from: number; duration: number; slide: number; next: number}[] = [];
  let cursor = 0;
  for (let i = 0; i < 5; i++) {
    rows.push({kind: 'hold', from: cursor, duration: holds[i], slide: i, next: i});
    cursor += holds[i];
    const next = (i + 1) % 5;
    rows.push({kind: 'transition', from: cursor, duration: transitions[i], slide: i, next});
    cursor += transitions[i];
  }
  rows.push({kind: 'hold', from: cursor, duration: holds[5], slide: 0, next: 0});
  cursor += holds[5];
  return {rows, durationInFrames: cursor};
};

const Labels: React.FC<{labels?: [string, string]}> = ({labels}) => {
  const b = useBrand();
  const {width, height} = useVideoConfig();
  if (!labels) return null;
  const fontSize = Math.round(height * 0.018);
  const style: React.CSSProperties = {position: 'absolute', top: '53%', color: b.colors.fg, fontFamily: b.font.mono, fontSize, fontWeight: 500, letterSpacing: tracking(0.11), textTransform: 'uppercase', textShadow: `0 1px 8px ${b.colors.bg}`, mixBlendMode: 'difference'};
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{...style, left: width * 0.045}}>{labels[0]}</div>
      <div style={{...style, right: width * 0.045}}>{labels[1]}</div>
      {[0.04, 0.5, 0.96].map((x) => <div key={x} style={{position: 'absolute', left: width * x, top: height * 0.022, width: 2, height: height * 0.012, background: b.colors.fg, opacity: 0.76}} />)}
      {[0.04, 0.5, 0.96].map((x) => <div key={x} style={{position: 'absolute', left: width * x, bottom: height * 0.022, width: 2, height: height * 0.012, background: b.colors.fg, opacity: 0.76}} />)}
    </AbsoluteFill>
  );
};

const Body: React.FC<Omit<ElasticFrameCarouselProps, 'brand' | 'aspect' | 'fps'>> = ({content, transitionFrames, holdFrames, direction}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {rows} = elasticFrameCarouselSchedule(fps, transitionFrames, holdFrames);
  const slides = content.slides.length >= 5 ? content.slides : elasticFrameCarouselDefaults.content.slides;
  const row = rows.find((r) => frame >= r.from && frame < r.from + r.duration) ?? rows[rows.length - 1];
  return (
    <AbsoluteFill>
      {row.kind === 'transition' ? (
        <ElasticFramePush outgoing={slides[row.slide]} incoming={slides[row.next]} outgoingIndex={row.slide} incomingIndex={row.next} from={row.from} durationInFrames={row.duration} direction={direction} />
      ) : (
        <ElasticFramePush outgoing={slides[row.slide]} incoming={slides[row.slide]} outgoingIndex={row.slide} incomingIndex={row.slide} from={row.from} durationInFrames={1} direction={direction} />
      )}
      <Labels labels={content.labels} />
    </AbsoluteFill>
  );
};

export const ElasticFrameCarousel: React.FC<ElasticFrameCarouselProps> = ({brand, content, transitionFrames, holdFrames, direction = 'bottom-to-top'}) => (
  <BrandProvider brand={brand}>
    <Body content={content} transitionFrames={transitionFrames} holdFrames={holdFrames} direction={direction} />
  </BrandProvider>
);

export const calculateElasticFrameCarouselMetadata: CalculateMetadataFunction<ElasticFrameCarouselProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: elasticFrameCarouselSchedule(fps, props.transitionFrames, props.holdFrames).durationInFrames};
};

export const elasticFrameCarouselDefaults: ElasticFrameCarouselProps = {
  brand: DEMO_BRANDS.lumenfold,
  aspect: '4:5',
  fps: 30,
  content: {
    labels: ['Lumenfold', 'Series 01'],
    slides: [
      {art: 'fold', alt: 'Folded light study'},
      {art: 'portal', alt: 'Portal architecture study'},
      {art: 'stack', alt: 'Stacked tools study'},
      {art: 'signal', alt: 'Signal portrait study'},
      {art: 'seat', alt: 'Quiet seat study'},
    ],
  },
  transitionFrames: DEFAULT_TRANSITIONS,
  holdFrames: DEFAULT_HOLDS,
  direction: 'bottom-to-top',
};
