// Recipe: logo-mask-palette-cycle. A centred brand mark deeply presses, then releases a rounded palette field.
// Timings below come from recipe.json structure at 30 fps and scale with the composition fps.
import React from 'react';
import {type CalculateMetadataFunction} from 'remotion';
import {BrandProvider} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {ASPECTS, type Aspect} from '../../film/types';
import {PaletteTapCycle, type PaletteState} from './PaletteTapCycle';

export type LogoMaskPaletteContent = {
  colors: PaletteState[];
};

export type LogoMaskPaletteProps = {
  brand: Brand;
  content: LogoMaskPaletteContent;
  aspect: Aspect;
  fps?: number;
  tapFrames?: number[];
  cardScale?: number;
  wipeFrames?: number[];
};

/** Reference structure boundaries in seconds; the final boundary owns composition length. */
export const STRUCTURE_SECONDS = [0, 0.68, 2.47, 4.48, 6.5, 8.47, 9.8] as const;
const TAP_FRAMES_30 = [9, 62, 123, 183, 242];
const WIPE_FRAMES_30 = [9, 10, 9, 10, 10];

const scaleFrames = (frames: number[], fps: number) => frames.map((f) => Math.round((f * fps) / 30));

const Body: React.FC<Omit<LogoMaskPaletteProps, 'brand' | 'aspect' | 'fps'> & {fps: number}> = ({content, fps, tapFrames, cardScale = 0.52, wipeFrames}) => (
  <PaletteTapCycle
    states={content.colors}
    tapFrames={scaleFrames(tapFrames ?? TAP_FRAMES_30, fps)}
    cardScale={cardScale}
    wipeFrames={scaleFrames(wipeFrames ?? WIPE_FRAMES_30, fps)}
  />
);

export const LogoMaskPaletteCycle: React.FC<LogoMaskPaletteProps> = ({brand, content, aspect: _aspect, fps = 30, tapFrames, cardScale, wipeFrames}) => (
  <BrandProvider brand={brand}>
    <Body content={content} fps={fps} tapFrames={tapFrames} cardScale={cardScale} wipeFrames={wipeFrames} />
  </BrandProvider>
);

export const calculateLogoMaskPaletteMetadata: CalculateMetadataFunction<LogoMaskPaletteProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: Math.round(STRUCTURE_SECONDS[STRUCTURE_SECONDS.length - 1] * fps)};
};

const demo = DEMO_BRANDS.northfern;

export const logoMaskPaletteDefaults: LogoMaskPaletteProps = {
  brand: demo,
  aspect: '1:1',
  fps: 30,
  content: {
    colors: [
      {color: demo.colors.accent, label: 'Growth', detailLabel: 'Mode', detailValue: 'Automatic'},
      {color: demo.colors.accent2, label: 'Reserve', detailLabel: 'Rate', detailValue: 'Steady'},
      {color: demo.colors.surface, label: 'Balance', detailLabel: 'Flow', detailValue: 'Protected'},
      {color: demo.colors.muted, label: 'Forecast', detailLabel: 'View', detailValue: 'Monthly'},
      {color: demo.colors.fg, label: 'Milestone', detailLabel: 'Status', detailValue: 'On track'},
      {color: demo.colors.accent, label: 'Growth', detailLabel: 'Mode', detailValue: 'Automatic'},
    ],
  },
  tapFrames: TAP_FRAMES_30,
  cardScale: 0.52,
  wipeFrames: WIPE_FRAMES_30,
};
