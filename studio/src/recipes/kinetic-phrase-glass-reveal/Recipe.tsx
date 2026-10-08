import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {alpha} from '../../brand/color';
import {springs} from '../../presets/springs';
import {easings} from '../../presets/easings';
import {ASPECTS, type Aspect} from '../../film/types';
import {EvolvingPhrase} from './EvolvingPhrase';
import {LiquidOrbMark} from './LiquidOrbMark';
import {MeshGradientBackdrop} from './MeshGradientBackdrop';

export type KineticPhraseContent = {
  setupWords: [string, string, string];
  revealWords: [string, string];
  badgeLabel: string;
  panelTitle: string;
  capabilityLabel: string;
};

export type KineticPhraseGlassRevealProps = {
  brand: Brand;
  content: KineticPhraseContent;
  aspect: Aspect;
  fps?: number;
};

/** Phase-A structure boundaries, in frames at 30 fps. */
const BOUNDARIES_30 = [0, 16, 28, 39, 45, 54, 65, 71, 94, 133, 144, 155, 168, 200, 209] as const;
const scaleBoundaries = (fps: number) => BOUNDARIES_30.map((f) => Math.round(f * fps / 30));

const CompactPanel: React.FC<{content: KineticPhraseContent; at: number; exitAt: number}> = ({content, at, exitAt}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = useBrand();
  const panel = spring({frame: frame - at - Math.round(3 * fps / 30), fps, config: springs.ui});
  const detail = interpolate(frame, [at + Math.round(6 * fps / 30), at + Math.round(12 * fps / 30)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outExpo});
  const out = interpolate(frame, [exitAt, exitAt + Math.round(9 * fps / 30)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inExpo});
  const w = width * 0.52;
  const h = height * 0.62;
  const icon = height * 0.035;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: w,
        height: h,
        opacity: frame < at ? 0 : out,
        transform: `translate3d(${interpolate(panel, [0, 1], [width * 0.47, -width * 0.26]).toFixed(2)}px, calc(-50% + ${interpolate(panel, [0, 1], [height * 0.12, 0]).toFixed(2)}px), 0)`,
        borderRadius: brand.radius * 1.4,
        background: alpha(brand.colors.surface, 0.7),
        border: `1px solid ${alpha(brand.colors.bg, 0.9)}`,
        boxShadow: `0 ${height * 0.03}px ${height * 0.1}px ${alpha(brand.colors.accent, 0.14)}, inset 0 1px 0 ${alpha(brand.colors.bg, 0.9)}`,
        overflow: 'hidden',
        fontFamily: brand.font.text,
        color: brand.colors.fg,
      }}
    >
      <div style={{position: 'absolute', left: w * 0.23, top: 0, bottom: 0, width: 1, background: alpha(brand.colors.accent, 0.18)}} />
      <div style={{position: 'absolute', left: w * 0.075, top: h * 0.53, display: 'grid', gap: h * 0.12, opacity: detail}}>
        {[0, 1].map((n) => <div key={n} style={{width: icon, height: icon, borderRadius: n ? icon * 0.18 : '50%', border: `2px solid ${alpha(brand.colors.accent, n ? 0.8 : 0.38)}`}} />)}
      </div>
      <div style={{position: 'absolute', left: w * 0.31, top: h * 0.2, right: w * 0.09, opacity: detail}}>
        <div style={{fontFamily: brand.font.display, fontWeight: brand.type.displayWeight, fontSize: height * 0.047}}>{content.panelTitle}</div>
        <div style={{marginTop: h * 0.15, display: 'flex', alignItems: 'center', gap: w * 0.035, padding: `${h * 0.045}px ${w * 0.04}px`, borderRadius: brand.radius, background: alpha(brand.colors.accent, 0.08)}}>
          <div style={{width: icon, height: icon, borderRadius: icon * 0.25, border: `2px solid ${brand.colors.accent}`}} />
          <div>
            <div style={{fontWeight: 700, fontSize: height * 0.026}}>{content.capabilityLabel}</div>
            <div style={{marginTop: height * 0.006, color: brand.colors.muted, fontSize: height * 0.015}}>Ready when you are</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Body: React.FC<{content: KineticPhraseContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = scaleBoundaries(fps);
  const phraseFade = interpolate(frame, [b[9], b[10]], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inExpo});
  return (
    <AbsoluteFill>
      <MeshGradientBackdrop />
      <div style={{opacity: phraseFade}}>
        <EvolvingPhrase setupWords={content.setupWords} revealWords={content.revealWords} badgeLabel={content.badgeLabel} boundaries={b} />
      </div>
      <CompactPanel content={content} at={b[11]} exitAt={b[13]} />
      <LiquidOrbMark at={b[8]} travelAt={b[10]} settleAt={b[11]} />
    </AbsoluteFill>
  );
};

export const KineticPhraseGlassReveal: React.FC<KineticPhraseGlassRevealProps> = ({brand, content}) => (
  <BrandProvider brand={brand}>
    <Body content={content} />
  </BrandProvider>
);

export const calculateKineticPhraseGlassRevealMetadata: CalculateMetadataFunction<KineticPhraseGlassRevealProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: Math.round(209 * fps / 30)};
};

export const kineticPhraseGlassRevealDefaults: KineticPhraseGlassRevealProps = {
  brand: DEMO_BRANDS.plumday,
  aspect: '16:9',
  fps: 30,
  content: {
    setupWords: ['Make', 'small', 'moments'],
    revealWords: ['Feel', 'bright'],
    badgeLabel: 'Daily',
    panelTitle: 'Plumday',
    capabilityLabel: 'Mood check-in',
  },
};
