import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandMark, BrandProvider, DEMO_BRANDS, Wordmark, alpha, useBrand, useFontsReady, type Brand} from '../../brand';
import {Counter, PromptBar} from '../../components';
import {ASPECTS, type Aspect} from '../../film/types';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';
import {BranchMap} from './BranchMap';
import {GalleryWall} from './GalleryWall';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const FRAME_30 = {hook: 0, contrast: 60, gallery: 112, suffix: 150, labels: 165, qualifier: 240, focus: 248, branches: 300, close: 338, benefit: 375, url: 398, end: 424} as const;

export type PromptGalleryContent = {
  prompt: string;
  hookClaim: string;
  contrastLead: string;
  contrastAccent: string;
  proofCount: number;
  proofSuffix: string;
  proofLabel: string;
  qualifier: string;
  workflowWords: string[];
  workflowLabel: string;
  closeLine: string;
  benefitLine: string;
  url?: string;
};

export type PromptGalleryTiming = {duration?: number};

export type PromptGalleryProps = {
  brand: Brand;
  content: PromptGalleryContent;
  aspect: Aspect;
  fps?: number;
  timing?: PromptGalleryTiming;
};

const useScaledFrames = () => {
  const {fps} = useVideoConfig();
  const k = fps / 30;
  return Object.fromEntries(Object.entries(FRAME_30).map(([key, value]) => [key, Math.round(value * k)])) as Record<keyof typeof FRAME_30, number>;
};

const WordLine: React.FC<{words: string[]; at: number; every?: number; style?: React.CSSProperties}> = ({words, at, every = 3, style}) => {
  const frame = useCurrentFrame();
  return (
    <div style={style}>
      {words.map((word, i) => {
        const p = interpolate(frame - at - i * every, [0, 10], [0, 1], {...clamp, easing: easings.outExpo});
        return <span key={`${word}-${i}`} style={{display: 'inline-block', marginRight: '0.24em', opacity: p, transform: `translateY(${(1 - p) * 18}px)`, filter: p < 0.99 ? `blur(${(1 - p) * 9}px)` : undefined}}>{word}</span>;
      })}
    </div>
  );
};

const PromptScene: React.FC<{content: PromptGalleryContent; start: number; end: number}> = ({content, start, end}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  const exit = interpolate(frame, [end - 7, end], [1, 0], {...clamp, easing: easings.inExpo});
  const drift = interpolate(frame, [start, end], [0, 56], {...clamp, easing: easings.inOutSine});
  return (
    <AbsoluteFill style={{opacity: exit, transform: `translateY(${drift}px) scale(${1 + (frame - start) / Math.max(1, end - start) * 0.04})`}}>
      <div style={{position: 'absolute', top: height * 0.27, left: width * 0.08, width: width * 0.84}}>
        <PromptBar text={content.prompt} startFrame={start + 4} cps={17} sendAt={start + 34} width={width * 0.84} size={width / 1080} />
      </div>
      <div style={{position: 'absolute', top: height * 0.47, left: width * 0.08, width: width * 0.84, fontFamily: b.font.display, fontSize: width * 0.067, fontWeight: b.type.displayWeight, lineHeight: 1.15, letterSpacing: `${b.type.displayTracking}em`, color: b.colors.fg}}>{content.hookClaim}</div>
    </AbsoluteFill>
  );
};

const ContrastScene: React.FC<{content: PromptGalleryContent; at: number}> = ({content, at}) => {
  const {width, height} = useVideoConfig();
  const b = useBrand();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <WordLine words={content.contrastLead.split(' ')} at={at} style={{fontFamily: b.font.display, fontSize: width * 0.078, fontWeight: b.type.displayWeight, color: b.colors.fg, textAlign: 'center', lineHeight: 1.15}} />
      <WordLine words={[content.contrastAccent]} at={at + 8} style={{position: 'absolute', top: height * 0.52, left: 0, right: 0, fontFamily: b.font.text, fontSize: width * 0.092, fontWeight: 500, color: b.colors.accent2, textAlign: 'center'}} />
    </AbsoluteFill>
  );
};

const ProofScene: React.FC<{content: PromptGalleryContent; frames: ReturnType<typeof useScaledFrames>}> = ({content, frames}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const panel = spring({frame: frame - frames.gallery, fps, config: springs.heavy});
  const suffixIn = interpolate(frame - frames.suffix, [0, 8], [0, 1], {...clamp, easing: easings.outExpo});
  const labelIn = interpolate(frame - frames.labels, [0, 15], [0, 1], {...clamp, easing: easings.outExpo});
  const qualIn = interpolate(frame - frames.qualifier, [0, 8], [0, 1], {...clamp, easing: easings.outExpo});
  return (
    <AbsoluteFill>
      <GalleryWall at={frames.gallery} />
      <div style={{position: 'absolute', left: width * 0.08, right: width * 0.08, top: height * 0.31, height: height * 0.25, borderRadius: b.radius, background: b.colors.surface, boxShadow: `0 26px 76px ${alpha(b.colors.fg, 0.14)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.8 + panel * 0.2})`, opacity: panel}}>
        <Counter from={34} to={content.proofCount} start={frames.gallery} duration={30} easing="outExpo" rolling fontSize={width * 0.16} separator="" />
        <div style={{position: 'absolute', top: height * 0.145, right: width * 0.22, opacity: suffixIn, transform: `translateY(${(1 - suffixIn) * 12}px)`, fontFamily: b.font.display, fontSize: width * 0.082, fontWeight: 800, color: b.colors.fg}}>{content.proofSuffix}</div>
        <div style={{marginTop: 18, opacity: labelIn, transform: `translateY(${(1 - labelIn) * 14}px)`, fontFamily: b.font.text, fontSize: width * 0.035, fontWeight: 650, color: b.colors.fg}}>{content.proofLabel}</div>
        <div style={{marginTop: 8, opacity: qualIn, fontFamily: b.font.text, fontSize: width * 0.03, color: b.colors.muted}}>{content.qualifier}</div>
      </div>
    </AbsoluteFill>
  );
};

const FocusScene: React.FC<{content: PromptGalleryContent; at: number; end: number}> = ({content, at, end}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  const exit = interpolate(frame, [end - 9, end], [0, 1], {...clamp, easing: easings.inExpo});
  return (
    <AbsoluteFill style={{transform: `translateX(${-exit * width}px)`, opacity: 1 - exit * 0.4}}>
      <GalleryWall at={at} focus />
      <WordLine words={content.workflowWords} at={at + 6} every={8} style={{position: 'absolute', top: height * 0.57, left: width * 0.1, right: width * 0.1, minHeight: height * 0.2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: width * 0.071, lineHeight: 1.45, textAlign: 'center', color: b.colors.fg}} />
    </AbsoluteFill>
  );
};

const CloseScene: React.FC<{content: PromptGalleryContent; frames: ReturnType<typeof useScaledFrames>}> = ({content, frames}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const mark = spring({frame: frame - frames.close, fps, config: springs.snappy});
  const firstOut = interpolate(frame - frames.benefit, [0, 7], [1, 0], {...clamp, easing: easings.inExpo});
  const secondIn = interpolate(frame - frames.benefit, [0, 10], [0, 1], {...clamp, easing: easings.outExpo});
  const urlIn = interpolate(frame - frames.url, [0, 8], [0, 1], {...clamp, easing: easings.outExpo});
  const push = interpolate(frame, [frames.close, frames.end], [1, 1.04], {...clamp, easing: easings.outCubic});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${push})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: mark, transform: `scale(${0.82 + 0.18 * mark})`}}><BrandMark size={width * 0.12} /><Wordmark size={width * 0.09} /></div>
      <div style={{position: 'absolute', top: height * 0.55, left: 0, right: 0, textAlign: 'center', fontFamily: b.font.display, fontSize: width * 0.072, fontWeight: b.type.displayWeight, color: b.colors.fg}}>
        <div style={{opacity: firstOut, filter: firstOut < 0.99 ? `blur(${(1 - firstOut) * 8}px)` : undefined}}>{content.closeLine}</div>
        <div style={{position: 'absolute', inset: 0, opacity: secondIn, filter: secondIn < 0.99 ? `blur(${(1 - secondIn) * 8}px)` : undefined}}>{content.benefitLine}</div>
      </div>
      <div style={{position: 'absolute', top: height * 0.62, opacity: urlIn, fontFamily: b.font.mono, fontSize: width * 0.027, color: b.colors.muted}}>{content.url ?? b.url}</div>
    </AbsoluteFill>
  );
};

const Body: React.FC<{content: PromptGalleryContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  const frames = useScaledFrames();
  useFontsReady([`700 ${Math.round(width * 0.08)}px ${b.font.display}`, `500 ${Math.round(width * 0.04)}px ${b.font.text}`, `500 ${Math.round(width * 0.03)}px ${b.font.mono}`]);
  return (
    <AbsoluteFill style={{background: b.colors.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', width: width * 0.8, height: height * 0.44, left: width * 0.1, top: height * 0.17, borderRadius: '50%', background: b.colors.accent, opacity: 0.055, filter: `blur(${width * 0.14}px)`}} />
      {frame < frames.contrast ? <PromptScene content={content} start={frames.hook} end={frames.contrast} /> : null}
      {frame >= frames.contrast && frame < frames.gallery ? <ContrastScene content={content} at={frames.contrast} /> : null}
      {frame >= frames.gallery && frame < frames.focus ? <ProofScene content={content} frames={frames} /> : null}
      {frame >= frames.focus && frame < frames.branches ? <FocusScene content={content} at={frames.focus} end={frames.branches} /> : null}
      {frame >= frames.branches && frame < frames.close ? <BranchMap at={frames.branches} label={content.workflowLabel} /> : null}
      {frame >= frames.close ? <CloseScene content={content} frames={frames} /> : null}
    </AbsoluteFill>
  );
};

export const PromptGalleryWorkflow: React.FC<PromptGalleryProps> = ({brand, content}) => (
  <BrandProvider brand={brand}><Body content={content} /></BrandProvider>
);

export const calculatePromptGalleryMetadata: CalculateMetadataFunction<PromptGalleryProps> = ({props}) => {
  const fps = props.fps ?? 30;
  const durationInFrames = Math.round((props.timing?.duration ?? FRAME_30.end) * (fps / 30));
  return {...ASPECTS[props.aspect], fps, durationInFrames};
};

export const promptGalleryDefaults: PromptGalleryProps = {
  brand: DEMO_BRANDS.plumday,
  aspect: '9:16',
  fps: 30,
  content: {
    prompt: 'Plan a bright weekend together',
    hookClaim: 'Your plans can feel easy.',
    contrastLead: 'Now make them',
    contrastAccent: 'memorable.',
    proofCount: 248,
    proofSuffix: '+',
    proofLabel: 'ideas, places + shared plans',
    qualifier: 'and always growing',
    workflowWords: ['Ready', 'for', 'every', 'friend', 'group.'],
    workflowLabel: 'Your weekend, connected.',
    closeLine: 'Plan together.',
    benefitLine: 'Go sooner.',
    url: 'plumday.app',
  },
};
