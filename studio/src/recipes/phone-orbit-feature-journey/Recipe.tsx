import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import {BrandMark} from '../../brand';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {PhoneFrame} from '../../components/PhoneFrame';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';
import {ASPECTS, type Aspect} from '../../film/types';

export type FeedItem = {title: string; body: string; tone?: 'accent' | 'secondary'};
export type OrbitJourneyContent = {
  openingLine: string;
  benefits: [string, string, string];
  feedItems: FeedItem[];
  chart: {label: string; value: string; delta: string; points: number[]};
  topics: [string, string, string];
  closingLine: string;
};

export type OrbitJourneyProps = {
  brand: Brand;
  content: OrbitJourneyContent;
  aspect: Aspect;
  fps?: number;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const rows = [0, 68, 150, 233, 270, 293, 368, 450, 473, 570, 623, 683, 776] as const;
const scaleFrame = (frame30: number, fps: number) => Math.round((frame30 * fps) / 30);

const sceneOpacity = (frame: number, from: number, to: number, edge = 5) => {
  const enter = interpolate(frame, [from, from + edge], [0, 1], {...clamp, easing: easings.outQuint});
  const exit = interpolate(frame, [to - edge, to], [1, 0], {...clamp, easing: easings.inQuad});
  return Math.min(enter, exit);
};

export const SelectorCarousel: React.FC<{local: number}> = ({local}) => {
  const b = useBrand();
  const {width, height} = useVideoConfig();
  const p = interpolate(local, [0, 18], [0, 1], {...clamp, easing: easings.outExpo});
  const progress = interpolate(local, [8, 68], [0.08, 0.92], clamp);
  const size = Math.min(width, height);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: size * 0.035, padding: `${size * 0.038}px ${size * 0.055}px`, borderRadius: size, background: b.colors.surface, boxShadow: `0 0 ${size * 0.14}px rgba(139,124,255,.16)`, opacity: p, transform: `translateY(${(1 - p) * -height * 0.22}px) scale(${0.94 + 0.06 * p})`}}>
        {['✦', '◉', '⌁'].map((glyph, i) => (
          <div key={glyph} style={{position: 'relative', width: size * 0.14, height: size * 0.14, borderRadius: '50%', display: 'grid', placeItems: 'center', color: i === 0 ? b.colors.fg : b.colors.muted, background: b.colors.bg, border: `1px solid ${i === 0 ? b.colors.accent : b.colors.muted}`, fontFamily: b.font.display, fontSize: size * 0.05}}>
            {glyph}
            {i === 0 ? <svg style={{position: 'absolute', inset: -4, transform: 'rotate(-90deg)'}} width="calc(100% + 8px)" height="calc(100% + 8px)" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke={b.colors.accent} strokeWidth="2" strokeDasharray={`${progress * 302} 302`} /></svg> : null}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', top: '69%', color: b.colors.muted, fontFamily: b.font.mono, fontSize: size * 0.022, letterSpacing: '0.08em'}}>FOLDING CONTEXT</div>
    </AbsoluteFill>
  );
};

export const RingWordField: React.FC<{local: number; duration: number; word: string; density: number}> = ({local, duration, word, density}) => {
  const b = useBrand();
  const {width, height} = useVideoConfig();
  const p = interpolate(local, [0, duration], [0, 1], clamp);
  const reveal = interpolate(local, [0, 15], [0.12, 1], {...clamp, easing: easings.outQuint});
  const base = Math.min(width, height);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transform: `scale(${1.08 - p * 0.08})`}}>
      <div style={{position: 'absolute', left: '-10%', right: '-10%', top: '50%', borderTop: `1px dashed ${b.colors.muted}`, opacity: 0.35}} />
      {Array.from({length: density}).map((_, i) => {
        const d = base * (0.34 + i * 0.16);
        const x = (i - (density - 1) / 2) * base * 0.28 - p * width * (density > 3 ? 0.18 : 0.05);
        return <div key={i} style={{position: 'absolute', width: d, height: d, borderRadius: '50%', border: `1px ${i === 0 ? 'dashed' : 'solid'} ${b.colors.muted}`, opacity: 0.22 + i * 0.05, transform: `translateX(${x}px)`}} />;
      })}
      <div style={{fontFamily: b.font.display, fontWeight: b.type.textWeight, letterSpacing: `${b.type.displayTracking}em`, fontSize: base * 0.125, color: b.colors.fg, opacity: reveal}}>{word}</div>
    </AbsoluteFill>
  );
};

const MiniChart: React.FC<{points: number[]; progress: number}> = ({points, progress}) => {
  const b = useBrand();
  const w = 280;
  const h = 105;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const path = points.map((v, i) => `${i ? 'L' : 'M'} ${(i / (points.length - 1)) * w} ${h - ((v - min) / Math.max(1, max - min)) * (h - 10)}`).join(' ');
  return <svg width="100%" viewBox={`0 0 ${w} ${h}`}><path d={path} fill="none" stroke={b.colors.accent2} strokeWidth="4" pathLength="1" strokeDasharray={`${progress} 1`} /></svg>;
};

const MediaPanel: React.FC<{index: number; tone?: FeedItem['tone']}> = ({index, tone}) => {
  const b = useBrand();
  const accent = tone === 'secondary' ? b.colors.accent2 : b.colors.accent;
  if (index % 3 === 0) {
    return (
      <div style={{height: 120, marginTop: 14, borderRadius: b.radius, background: b.colors.surface, border: `1px solid ${b.colors.muted}`, padding: 15, display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 14}}>
        <div style={{borderRadius: 10, background: b.colors.bg, display: 'grid', placeItems: 'center'}}>
          <div style={{width: 48, height: 48, borderRadius: '50%', border: `7px solid ${accent}`, borderRightColor: b.colors.muted, transform: 'rotate(-32deg)'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8}}>
          <b style={{fontSize: 18}}>12 signals</b>
          {['Decisions', 'Questions', 'Owners'].map((label, i) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 7, color: b.colors.muted, fontSize: 13}}><span style={{width: 5 + i * 8, height: 5, borderRadius: 4, background: accent}} />{label}</div>)}
        </div>
      </div>
    );
  }
  if (index % 3 === 1) {
    const bars = [42, 66, 51, 82, 70, 94];
    return (
      <div style={{height: 120, marginTop: 14, borderRadius: b.radius, background: b.colors.surface, border: `1px solid ${b.colors.muted}`, padding: '18px 16px 14px', display: 'flex', alignItems: 'flex-end', gap: 9}}>
        {bars.map((v, i) => <div key={i} style={{height: `${v}%`, flex: 1, borderRadius: '5px 5px 2px 2px', background: i === bars.length - 1 ? accent : b.colors.muted, opacity: i === bars.length - 1 ? 1 : 0.45}} />)}
      </div>
    );
  }
  return (
    <div style={{height: 120, marginTop: 14, borderRadius: b.radius, background: b.colors.surface, border: `1px solid ${b.colors.muted}`, padding: 16}}>
      <div style={{display: 'flex', justifyContent: 'space-between', color: b.colors.muted, fontSize: 13}}><span>Today</span><span>3 owners</span></div>
      {['Review launch cut', 'Confirm release note', 'Publish changelog'].map((label, i) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 9, marginTop: 11, fontSize: 14}}><span style={{width: 14, height: 14, borderRadius: 4, border: `1px solid ${i === 0 ? accent : b.colors.muted}`, background: i === 0 ? accent : b.colors.bg}} />{label}</div>)}
    </div>
  );
};

export const FeedRebuild: React.FC<{local: number; items: FeedItem[]; mode: 'feed' | 'chart'; chart: OrbitJourneyContent['chart']}> = ({local, items, mode, chart}) => {
  const b = useBrand();
  const y = mode === 'feed' ? interpolate(local, [0, 160], [0, -520], clamp) : 0;
  const chartP = interpolate(local, [0, 23], [0, 1], {...clamp, easing: easings.outQuint});
  if (mode === 'chart') return (
    <div style={{padding: '100px 28px 30px', fontFamily: b.font.text, color: b.colors.fg}}>
      <div style={{fontSize: 18, color: b.colors.muted}}>{chart.label}</div><div style={{fontSize: 44, fontWeight: 650, marginTop: 8}}>{chart.value}</div><div style={{fontSize: 18, color: b.colors.accent2, marginTop: 5}}>{chart.delta}</div><div style={{marginTop: 30}}><MiniChart points={chart.points} progress={chartP} /></div>
    </div>
  );
  return (
    <div style={{padding: '82px 20px 30px', transform: `translateY(${y}px)`, fontFamily: b.font.text, color: b.colors.fg}}>
      <div style={{display: 'flex', gap: 15, fontSize: 14, color: b.colors.muted, paddingBottom: 16}}><b style={{color: b.colors.fg}}>For you</b><span>Focus</span><span>Notes</span></div>
      {items.concat(items).map((item, i) => <div key={i} style={{padding: '18px 4px', borderTop: `1px solid ${b.colors.surface}`}}><div style={{display: 'flex', gap: 10, alignItems: 'center'}}><div style={{width: 28, height: 28, borderRadius: '50%', background: item.tone === 'secondary' ? b.colors.accent2 : b.colors.accent, display: 'grid', placeItems: 'center', color: b.colors.bg, fontWeight: 700, fontSize: 13}}>{item.title.slice(0, 1)}</div><div><b style={{fontSize: 15}}>{item.title}</b><div style={{fontSize: 12, color: b.colors.muted, marginTop: 2}}>{i % 2 ? 'Shared by Mira' : 'Updated 8 min ago'}</div></div></div><div style={{fontSize: 16, lineHeight: 1.35, marginTop: 12, color: b.colors.fg}}>{item.body}</div><MediaPanel index={i} tone={item.tone} /></div>)}
    </div>
  );
};

export const TopicPinPanel: React.FC<{local: number; topics: [string, string, string]}> = ({local, topics}) => {
  const b = useBrand();
  const {fps, width, height} = useVideoConfig();
  return <div style={{padding: '88px 24px 30px', fontFamily: b.font.text, color: b.colors.fg}}><div style={{fontSize: 20, fontWeight: 650}}>Threads</div><div style={{marginTop: 18, padding: '12px 16px', borderRadius: 12, background: b.colors.surface, color: b.colors.muted}}>Search</div><div style={{fontSize: 15, marginTop: 25}}>Pinned</div>{topics.map((topic, i) => {const p = spring({frame: local - i * 8, fps, config: springs.layout}); return <div key={topic} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, padding: '15px 14px', borderRadius: 12, background: b.colors.surface, transform: `translateY(${(1 - p) * 26}px) scale(${0.96 + p * 0.04})`, boxShadow: `0 ${10 * p}px ${28 * p}px rgba(0,0,0,.35)`}}><span style={{width: 28, height: 28, borderRadius: 8, border: `1px solid ${b.colors.muted}`, display: 'grid', placeItems: 'center'}}>⌁</span><span style={{flex: 1}}>{topic}</span><span style={{color: b.colors.accent2}}>+</span></div>;})}</div>;
};

const Opening: React.FC<{local: number; line: string; duration: number}> = ({local, line, duration}) => {
  const b = useBrand();
  const {width, height} = useVideoConfig();
  const count = Math.max(1, Math.min(line.length, Math.floor(local / 2) + 1));
  const out = interpolate(local, [duration - 23, duration], [0, width * 0.5], {...clamp, easing: easings.inExpo});
  return <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `scale(${1 + local / duration * 0.03})`}}><div style={{fontFamily: b.font.display, fontSize: Math.min(width, height) * 0.038, fontWeight: b.type.textWeight, color: b.colors.fg, clipPath: `inset(0 ${out}px 0 ${out}px)`, whiteSpace: 'nowrap'}}>{line.slice(0, count)}</div></AbsoluteFill>;
};

const PhoneStage: React.FC<{frame30: number; content: OrbitJourneyContent}> = ({frame30, content}) => {
  const {width, height, fps} = useVideoConfig();
  const inP = spring({frame: scaleFrame(frame30 - 285, fps), fps, config: springs.heavy});
  const exitP = interpolate(frame30, [606, 623], [0, 1], {...clamp, easing: easings.inExpo});
  const zoom = frame30 < 368 ? 1 : frame30 < 450 ? 1 + spring({frame: scaleFrame(frame30 - 368, fps), fps, config: springs.cameraIn}) * 0.72 : frame30 < 473 ? 1.78 : frame30 < 570 ? 1.32 + spring({frame: scaleFrame(frame30 - 473, fps), fps, config: springs.cameraIn}) * 0.78 : 1.08;
  const phoneH = Math.min(height * 1.08, width * 0.55);
  const mode = frame30 >= 450 && frame30 < 473 ? 'chart' : frame30 >= 473 && frame30 < 570 ? 'topics' : 'feed';
  const local = mode === 'chart' ? frame30 - 450 : mode === 'topics' ? frame30 - 473 : Math.max(0, frame30 - 293);
  return <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `translateY(${(1 - inP) * height * 0.45 + exitP * height * 0.5}px) scale(${zoom * (1 - exitP * 0.35)})`}}><PhoneFrame height={phoneH} float={2} statusBar>{mode === 'topics' ? <TopicPinPanel local={local} topics={content.topics} /> : <FeedRebuild local={local} items={content.feedItems} mode={mode} chart={content.chart} />}</PhoneFrame></AbsoluteFill>;
};

const Body: React.FC<{content: OrbitJourneyContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const f = (frame * 30) / fps;
  const show = (i: number, node: React.ReactNode, edge?: number) => <AbsoluteFill style={{opacity: sceneOpacity(f, rows[i], rows[i + 1], edge)}}>{node}</AbsoluteFill>;
  const closeLocal = f - rows[10];
  const closeReveal = interpolate(closeLocal, [10, 25], [0.08, 1], {...clamp, easing: easings.outQuint});
  const closeClip = interpolate(closeLocal, [37, 60], [0, 50], {...clamp, easing: easings.inExpo});
  const markP = interpolate(f, [rows[11], rows[11] + 8], [0.2, 1], {...clamp, easing: easings.outQuint});
  return <AbsoluteFill style={{background: b.colors.bg, overflow: 'hidden'}}>
    {f < rows[1] ? <Opening local={f} duration={rows[1]} line={content.openingLine} /> : null}
    {f >= rows[1] && f < rows[2] - 6 ? show(1, <SelectorCarousel local={f - rows[1]} />) : null}
    {f >= rows[2] - 6 && f < rows[3] ? <AbsoluteFill style={{opacity: sceneOpacity(f, rows[2] - 6, rows[3], 5)}}><RingWordField local={f - (rows[2] - 6)} duration={rows[3] - (rows[2] - 6)} word={content.benefits[0]} density={5} /></AbsoluteFill> : null}
    {f >= rows[3] && f < rows[4] ? show(3, <RingWordField local={f - rows[3]} duration={rows[4] - rows[3]} word={content.benefits[1]} density={3} />) : null}
    {f >= rows[4] && f < rows[5] ? show(4, <RingWordField local={f - rows[4]} duration={rows[5] - rows[4]} word={content.benefits[2]} density={1} />, 2) : null}
    {f >= rows[4] && f < rows[10] ? <PhoneStage frame30={f} content={content} /> : null}
    {f >= rows[10] && f < rows[11] ? <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}><div style={{fontFamily: b.font.display, fontSize: Math.min(width, height) * 0.032, fontWeight: b.type.textWeight, color: b.colors.fg, opacity: closeReveal, clipPath: `inset(0 ${closeClip}% 0 ${closeClip}%)`}}>{content.closingLine}</div></AbsoluteFill> : null}
    {f >= rows[11] ? <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: markP}}><BrandMark size={Math.min(width, height) * 0.145} color={b.colors.fg} /></AbsoluteFill> : null}
  </AbsoluteFill>;
};

export const PhoneOrbitFeatureJourney: React.FC<OrbitJourneyProps> = ({brand, content}) => <BrandProvider brand={brand}><Body content={content} /></BrandProvider>;

export const calculatePhoneOrbitFeatureJourneyMetadata: CalculateMetadataFunction<OrbitJourneyProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: scaleFrame(776, fps)};
};

export const phoneOrbitFeatureJourneyDefaults: OrbitJourneyProps = {
  brand: DEMO_BRANDS.lumenfold,
  aspect: '16:9',
  fps: 30,
  content: {
    openingLine: 'Work, folded into one place',
    benefits: ['Clearer', 'Closer', 'Calmer'],
    feedItems: [
      {title: 'Research brief', body: 'The useful notes are grouped before the day begins.'},
      {title: 'Project signal', body: 'Three decisions surfaced from the latest thread.', tone: 'secondary'},
      {title: 'Daily fold', body: 'Loose updates become a short, ordered plan.'},
    ],
    chart: {label: 'Focus returned', value: '18.4 h', delta: '+24% this month', points: [2, 5, 3, 8, 5, 9, 7, 12]},
    topics: ['Launch notes', 'Customer signals', 'Next decisions'],
    closingLine: 'Made in Lumenfold',
  },
};
