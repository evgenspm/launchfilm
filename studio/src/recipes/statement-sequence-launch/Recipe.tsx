// Recipe: statement-sequence-launch (see recipe.md). A calm keynote-style announcement in four statements:
// eyebrow + product name → claim → claim → availability + URL. Pure type on a flat brand background.
// Everything comes from props: `brand` (any brand.json), `content` (the copy), `aspect`, `fps`. Timing is the measured
// cadence in frames at 30 fps, scaled to the composition fps; sizes come from the frame (useVideoConfig), never constants.
import React from 'react';
import {AbsoluteFill, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {BrandBackdrop} from '../../presets/look';
import {StatementSequence, type Statement} from '../../presets/statement';
import {ASPECTS, type Aspect} from '../../film/types';

export type StatementLaunchContent = {
  /** small uppercase label 4 fr before the name, e.g. "Introducing" ("" = none) */
  eyebrow: string;
  /** the product name as a statement, with its period: "Tallyfield." */
  name: string;
  /** 1–3 short claims, one idea each, period at the end */
  claims: string[];
  /** the availability line: "Live today." */
  close: string;
  /** small line under the close, usually the URL (default: brand.url) */
  sub?: string;
  /** words of the close painted in the brand accent (punctuation ignored) */
  accentWords?: string[];
};

/** Frames at 30 fps; scaled by fps/30. */
export type StatementLaunchTiming = {
  /** from one statement's start to the next (measured 78 fr = 2.6 s) */
  period?: number;
  /** cut on bars instead: period = one 4/4 bar at this tempo (92 BPM ≈ the measured 2.6 s) */
  bpm?: number;
  /** extra frames the first statement holds, room for the eyebrow (measured 11) */
  firstExtra?: number;
  /** frames the close holds before its exit (measured 82) */
  closeHold?: number;
};

export type StatementLaunchProps = {
  brand: Brand;
  content: StatementLaunchContent;
  aspect: Aspect;
  /** default 30 */
  fps?: number;
  timing?: StatementLaunchTiming;
  /** soft accent glow behind the type, 0 = flat (the reference is flat) */
  glow?: number;
};

// Measured cadence (30 fps): first word at f8, a new statement every 78 fr, exit starts 10 fr before the next
// statement (5 fr fade + ~5 fr of nothing), the close holds 82 fr. Scaled by fps/30.
const LEAD = 8;
const EXIT_BEFORE_NEXT = 10;
const EXIT_AND_TAIL = 7;

/** Statement schedule in frames for the given copy and timing. */
export const statementLaunchSchedule = (content: StatementLaunchContent, fps: number, timing: StatementLaunchTiming = {}, brandUrl?: string) => {
  const k = fps / 30;
  const period = timing.bpm ? Math.round(((4 * 60) / timing.bpm) * fps) : Math.round((timing.period ?? 78) * k);
  const firstExtra = timing.bpm ? 0 : Math.round((timing.firstExtra ?? 11) * k);
  const closeHold = Math.round((timing.closeHold ?? 82) * k);
  const texts = [content.name, ...content.claims, content.close];
  const starts = texts.map((_, i) => Math.round(LEAD * k) + (i === 0 ? 0 : firstExtra + i * period));
  const statements: Statement[] = texts.map((text, i) => {
    const last = i === texts.length - 1;
    return {
      text,
      from: starts[i],
      to: last ? starts[i] + closeHold : starts[i + 1] - Math.round(EXIT_BEFORE_NEXT * k),
      eyebrow: i === 0 && content.eyebrow ? content.eyebrow : undefined,
      sub: last ? (content.sub ?? brandUrl) : undefined,
      emphasis: last && content.accentWords?.length ? {words: content.accentWords, mode: 'accent', at: Math.round(12 * k)} : undefined,
    };
  });
  const last = statements[statements.length - 1];
  return {statements, durationInFrames: (last.to as number) + Math.round(EXIT_AND_TAIL * k)};
};

const Body: React.FC<{content: StatementLaunchContent; timing?: StatementLaunchTiming; glow: number; url?: string}> = ({content, timing, glow, url}) => {
  const {fps} = useVideoConfig();
  const {statements} = statementLaunchSchedule(content, fps, timing, url);
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={glow} />
      {/* blurDrop entrance, fade exit and the 0.985 → 1.03 scale creep are StatementSequence defaults */}
      <StatementSequence statements={statements} />
    </AbsoluteFill>
  );
};

/** The recipe: wrap the body in the brand so every preset below picks up its fonts and colours. */
export const StatementLaunch: React.FC<StatementLaunchProps> = ({brand, content, timing, glow = 0}) => (
  <BrandProvider brand={brand}>
    <Body content={content} timing={timing} glow={glow} url={brand.url} />
  </BrandProvider>
);

/** Size from `aspect`, length from the copy, timing and fps. */
export const calculateStatementLaunchMetadata: CalculateMetadataFunction<StatementLaunchProps> = ({props}) => {
  const fps = props.fps ?? 30;
  const {durationInFrames} = statementLaunchSchedule(props.content, fps, props.timing, props.brand.url);
  return {...ASPECTS[props.aspect], fps, durationInFrames};
};

/** Demo props: a fictional light analytics brand, our own copy. */
export const statementLaunchDefaults: StatementLaunchProps = {
  brand: DEMO_BRANDS.tallyfield,
  aspect: '16:9',
  fps: 30,
  content: {
    eyebrow: 'Introducing',
    name: 'Tallyfield.',
    claims: ['Ask in plain words.', 'Get answers, not dashboards.'],
    close: 'Live today.',
    sub: 'tallyfield.io',
    accentWords: ['today.'],
  },
};
