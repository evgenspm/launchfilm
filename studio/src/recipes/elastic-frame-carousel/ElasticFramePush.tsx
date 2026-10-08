import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, mix} from '../../brand/color';
import {useBrand} from '../../brand/BrandProvider';
import {easings} from '../../presets/easings';

export type CarouselSlide = {
  /** Optional owned image under public/. When omitted, the deterministic demo artwork is used. */
  src?: string;
  /** Selects one of the built-in, brand-coloured demo compositions. */
  art?: 'fold' | 'portal' | 'stack' | 'signal' | 'seat';
  alt?: string;
};

const DemoArtwork: React.FC<{slide: CarouselSlide; index: number}> = ({slide, index}) => {
  const b = useBrand();
  const art = slide.art ?? (['fold', 'portal', 'stack', 'signal', 'seat'] as const)[index % 5];
  const common: React.CSSProperties = {position: 'absolute'};

  if (art === 'fold') {
    return (
      <AbsoluteFill style={{background: `linear-gradient(145deg, ${b.colors.surface}, ${b.colors.bg})`}}>
        <div style={{...common, width: '68%', height: '78%', left: '16%', top: '11%', borderRadius: '50% 50% 18% 18%', background: `linear-gradient(120deg, ${b.colors.fg}, ${b.colors.muted})`, transform: 'rotate(-7deg)', boxShadow: `0 60px 120px ${alpha(b.colors.bg, 0.8)}`}} />
        <div style={{...common, width: '34%', height: '72%', left: '38%', top: '18%', background: b.colors.bg, opacity: 0.82, transform: 'skewX(-11deg)'}} />
        <div style={{...common, width: '18%', height: '54%', left: '21%', top: '26%', background: `linear-gradient(${alpha(b.colors.accent, 0)}, ${alpha(b.colors.accent, 0.62)})`, filter: 'blur(24px)'}} />
      </AbsoluteFill>
    );
  }

  if (art === 'portal') {
    return (
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${mix(b.colors.accent2, b.colors.bg, 0.62)}, ${b.colors.bg})`}}>
        <div style={{...common, width: '74%', height: '55%', left: '13%', top: '25%', borderRadius: '6% 6% 2% 2%', background: b.colors.surface, boxShadow: `0 45px 100px ${alpha(b.colors.bg, 0.65)}`}} />
        <div style={{...common, width: '21%', height: '39%', left: '40%', top: '36%', borderRadius: '50% 50% 3% 3%', background: `linear-gradient(180deg, ${b.colors.accent}, ${mix(b.colors.accent, b.colors.bg, 0.72)})`}} />
        {Array.from({length: 7}).map((_, i) => <div key={i} style={{...common, width: '3%', height: `${8 + i * 5}%`, left: `${12 + i * 13}%`, bottom: '14%', borderRadius: 99, background: i % 2 ? b.colors.muted : b.colors.accent2, opacity: 0.72}} />)}
      </AbsoluteFill>
    );
  }

  if (art === 'stack') {
    return (
      <AbsoluteFill style={{background: b.colors.bg}}>
        {Array.from({length: 6}).map((_, i) => {
          const h = 23 + i * 7;
          return <div key={i} style={{...common, width: `${11 + (i % 3) * 3}%`, height: `${h}%`, left: `${12 + i * 13}%`, bottom: '10%', borderRadius: '4% 4% 0 0', background: i === 3 ? b.colors.fg : i === 5 ? b.colors.accent : mix(b.colors.surface, b.colors.fg, i * 0.09), boxShadow: `0 28px 65px ${alpha(b.colors.bg, 0.9)}`}} />;
        })}
        <div style={{...common, left: '9%', right: '9%', bottom: '9%', height: '1.2%', background: b.colors.accent2, filter: 'blur(7px)'}} />
      </AbsoluteFill>
    );
  }

  if (art === 'signal') {
    return (
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 32%, ${mix(b.colors.accent2, b.colors.accent, 0.35)}, ${mix(b.colors.accent, b.colors.bg, 0.45)} 72%)`}}>
        <div style={{...common, width: '58%', aspectRatio: '1', left: '21%', top: '17%', borderRadius: '50%', background: b.colors.surface, boxShadow: `0 35px 100px ${alpha(b.colors.bg, 0.55)}`}} />
        <div style={{...common, width: '31%', aspectRatio: '1', left: '34.5%', top: '26%', borderRadius: '50%', background: b.colors.bg}} />
        <div style={{...common, width: '11%', height: '39%', left: '44.5%', top: '46%', borderRadius: '50% 50% 10% 10%', background: b.colors.fg}} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${mix(b.colors.fg, b.colors.accent2, 0.12)}, ${mix(b.colors.fg, b.colors.accent, 0.2)})`}}>
      <div style={{...common, width: '63%', height: '37%', left: '18.5%', top: '25%', borderRadius: '48% 48% 15% 15%', background: b.colors.surface, boxShadow: `0 36px 90px ${alpha(b.colors.bg, 0.3)}`}} />
      <div style={{...common, width: '58%', height: '17%', left: '21%', top: '49%', borderRadius: '48%', background: b.colors.fg}} />
      <div style={{...common, width: '37%', height: '24%', left: '31.5%', top: '62%', clipPath: 'polygon(0 0, 100% 0, 82% 100%, 18% 100%)', background: mix(b.colors.surface, b.colors.bg, 0.35)}} />
    </AbsoluteFill>
  );
};

const Slide: React.FC<{slide: CarouselSlide; index: number}> = ({slide, index}) => (
  <AbsoluteFill>
    {slide.src ? <Img src={staticFile(slide.src)} alt={slide.alt ?? ''} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <DemoArtwork slide={slide} index={index} />}
  </AbsoluteFill>
);

export type ElasticFramePushProps = {
  outgoing: CarouselSlide;
  incoming: CarouselSlide;
  outgoingIndex: number;
  incomingIndex: number;
  from: number;
  durationInFrames: number;
  direction?: 'bottom-to-top' | 'top-to-bottom';
};

/** Two full-frame layers share a travelling edge while both pictures stretch to their visible height. */
export const ElasticFramePush: React.FC<ElasticFramePushProps> = ({outgoing, incoming, outgoingIndex, incomingIndex, from, durationInFrames, direction = 'bottom-to-top'}) => {
  const frame = useCurrentFrame();
  const {height} = useVideoConfig();
  const p = interpolate(frame, [from, from + durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inOutSine});
  const outgoingHeight = Math.max(0.01, (1 - p) * height);
  const incomingHeight = Math.max(0.01, p * height);
  const upward = direction === 'bottom-to-top';

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, height: outgoingHeight, top: upward ? 0 : incomingHeight, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, height: outgoingHeight}}><Slide slide={outgoing} index={outgoingIndex} /></div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, height: incomingHeight, top: upward ? outgoingHeight : 0, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, height: incomingHeight}}><Slide slide={incoming} index={incomingIndex} /></div>
      </div>
    </AbsoluteFill>
  );
};
