// Recipe: prompt-orbit-story. A single guide orb links a portrait, prompt, media orbit,
// process statements, output choices and a quiet logo close. All timing follows the
// measured structure rows in recipe.json and scales from the reference's 30 fps.
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from 'remotion';
import {BrandMark, BrandProvider, useBrand} from '../../brand';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {alpha} from '../../brand/color';
import {easings, springs} from '../../presets';
import {ASPECTS, type Aspect} from '../../film/types';

export type PromptOrbitContent = {
  portraitLabel: string;
  prompt: string;
  capability: string;
  statements: [string, string, string];
  outputLabels: [string, string, string];
  mediaTiles: [string, string, string, string, string, string, string, string];
};

export type PromptOrbitTiming = {
  /** Optional multiplier for all row boundaries. 1 preserves the measured 26.01 s cadence. */
  speed?: number;
};

export type PromptOrbitProps = {
  brand: Brand;
  content: PromptOrbitContent;
  aspect: Aspect;
  fps?: number;
  orbPalette?: [string, string, string?];
  timing?: PromptOrbitTiming;
};

const TIMES = [0, 1.77, 2.77, 4.77, 6.5, 10, 12, 14, 15.5, 17, 20, 22, 26.01] as const;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const sceneOpacity = (frame: number, start: number, end: number, edge = 6) => {
  if (start === 0 && frame <= edge) return 1;
  return Math.min(
    interpolate(frame, [start - edge, start], [0, 1], clamp),
    interpolate(frame, [end - edge, end], [1, 0], clamp),
  );
};

const usePaper = () => {
  const brand = useBrand();
  return {
    paper: brand.colors.fg,
    ink: brand.colors.bg,
    muted: brand.colors.muted,
    surface: brand.colors.surface,
    accent: brand.colors.accent,
    accent2: brand.colors.accent2,
    display: brand.font.display,
    text: brand.font.text,
    mono: brand.font.mono,
  };
};

const ConstructionGrid: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  const c = usePaper();
  const line = alpha(c.ink, 0.22);
  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: '16.6667% 33.3333%',
      }}
    />
  );
};

const GuideOrb: React.FC<{size: number; x?: number; y?: number; palette: [string, string, string]; opacity?: number}> = ({
  size,
  x = 0,
  y = 0,
  palette,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderRadius: '50%',
      opacity,
      transform: `translate(${x}px, ${y}px)`,
      background: `radial-gradient(circle at 32% 26%, ${alpha(palette[2], 0.95)}, transparent 31%), radial-gradient(circle at 72% 68%, ${palette[0]}, ${palette[1]} 48%, ${alpha(palette[2], 0.45)} 76%, transparent 100%)`,
      boxShadow: `0 0 ${size * 0.45}px ${alpha(palette[1], 0.38)}`,
    }}
  />
);

const PortraitCard: React.FC<{size: number; label: string; scale?: number; opacity?: number}> = ({size, label, scale = 1, opacity = 1}) => {
  const c = usePaper();
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: size * 0.08,
        overflow: 'hidden',
        opacity,
        transform: `scale(${scale})`,
        background: `linear-gradient(145deg, ${alpha(c.accent2, 0.85)}, ${alpha(c.accent, 0.52)})`,
        boxShadow: `0 ${size * 0.08}px ${size * 0.22}px ${alpha(c.ink, 0.14)}`,
      }}
    >
      <div style={{position: 'absolute', width: size * 0.34, height: size * 0.34, left: size * 0.33, top: size * 0.17, borderRadius: '50%', background: alpha(c.paper, 0.88)}} />
      <div style={{position: 'absolute', width: size * 0.72, height: size * 0.48, left: size * 0.14, bottom: -size * 0.12, borderRadius: `${size * 0.36}px ${size * 0.36}px 0 0`, background: alpha(c.surface, 0.72)}} />
      <div style={{position: 'absolute', bottom: size * 0.06, width: '100%', textAlign: 'center', fontFamily: c.mono, fontSize: size * 0.045, color: c.paper, letterSpacing: '0.08em', textTransform: 'uppercase'}}>
        {label}
      </div>
    </div>
  );
};

const TypedLockup: React.FC<{local: number; duration: number; color: string; final?: boolean}> = ({local, duration, color, final = false}) => {
  const brand = useBrand();
  const mark = spring({frame: local, fps: useVideoConfig().fps, config: springs.snappy});
  const name = brand.logo?.wordmark ?? brand.name;
  const count = Math.max(0, Math.min(name.length, Math.floor(interpolate(local, [8, duration], [0, name.length], clamp))));
  const typed = name.slice(0, count);
  const size = final ? 62 : 48;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: size * 0.34, transform: `scale(${Math.max(0.01, mark)})`}}>
      <BrandMark size={size * 1.05} color={color} />
      <div style={{fontFamily: brand.font.mono, fontWeight: brand.logo?.wordmarkWeight ?? 600, letterSpacing: `${brand.logo?.wordmarkTracking ?? -0.03}em`, fontSize: size, lineHeight: 1, color, minWidth: size * 5}}>
        {typed}
        {count < name.length ? <span style={{opacity: local % 12 < 8 ? 1 : 0}}>|</span> : null}
      </div>
    </div>
  );
};

const PromptPill: React.FC<{local: number; text: string}> = ({local, text}) => {
  const c = usePaper();
  const {width} = useVideoConfig();
  const open = spring({frame: local, fps: useVideoConfig().fps, config: springs.layout});
  const w = interpolate(open, [0, 1], [52, width * 0.5], clamp);
  const count = Math.max(0, Math.min(text.length, Math.floor(local / 2)));
  return (
    <div style={{width: w, height: 82, borderRadius: 42, border: `2px solid ${alpha(c.ink, 0.22)}`, display: 'flex', alignItems: 'center', padding: '0 34px', overflow: 'hidden', fontFamily: c.mono, fontSize: 28, color: c.ink, whiteSpace: 'nowrap'}}>
      {text.slice(0, count)}
      <span style={{width: 3, height: 34, marginLeft: 4, background: c.accent, opacity: local % 14 < 10 ? 1 : 0}} />
    </div>
  );
};

const MediaTile: React.FC<{label: string; index: number; size: number}> = ({label, index, size}) => {
  const c = usePaper();
  const even = index % 2 === 0;
  return (
    <div style={{width: size, height: size, borderRadius: size * 0.12, overflow: 'hidden', background: `linear-gradient(${125 + index * 19}deg, ${alpha(even ? c.accent : c.accent2, 0.88)}, ${alpha(even ? c.accent2 : c.accent, 0.28)})`, boxShadow: `0 ${size * 0.08}px ${size * 0.2}px ${alpha(c.ink, 0.12)}`}}>
      <div style={{width: size * 0.58, height: size * 0.58, borderRadius: index % 3 === 0 ? '50%' : size * 0.08, background: alpha(c.paper, 0.55), transform: `translate(${size * (0.12 + (index % 3) * 0.08)}px, ${size * 0.14}px) rotate(${index * 9}deg)`}} />
      <div style={{fontFamily: c.mono, fontSize: size * 0.1, color: c.ink, padding: size * 0.08, opacity: 0.78}}>{label}</div>
    </div>
  );
};

const MediaMosaic: React.FC<{local: number; labels: PromptOrbitContent['mediaTiles']; claim: string}> = ({local, labels, claim}) => {
  const c = usePaper();
  const {width, height, fps} = useVideoConfig();
  const radiusX = width * 0.27;
  const radiusY = height * 0.31;
  const tile = height * 0.115;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      {labels.map((label, i) => {
        const enter = spring({frame: local - i * 4, fps, config: springs.pop});
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2 + local * 0.002;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        return (
          <div key={label} style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -tile / 2, marginTop: -tile / 2, transform: `translate(${x}px, ${y}px) scale(${Math.max(0.01, enter)})`}}>
            <MediaTile label={label} index={i} size={tile} />
          </div>
        );
      })}
      <div style={{fontFamily: c.text, fontSize: height * 0.055, fontWeight: 500, letterSpacing: '-0.025em', color: c.ink, opacity: interpolate(local, [16, 24], [0, 1], clamp)}}>{claim}</div>
    </AbsoluteFill>
  );
};

const OrbTrail: React.FC<{local: number; duration: number; path: string; palette: [string, string, string]; reverse?: boolean}> = ({local, duration, path, palette, reverse = false}) => {
  const c = usePaper();
  const p = interpolate(local, [0, duration], reverse ? [1, 0] : [0, 1], {...clamp, easing: easings.inOutSine});
  const point = (() => {
    const a = p * Math.PI * 2;
    return {x: Math.cos(a) * 510, y: Math.sin(a * 0.52) * 245};
  })();
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <path d={path} fill="none" stroke={alpha(c.accent, 0.55)} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, local / duration)} />
      </svg>
      <GuideOrb size={92} x={point.x} y={point.y} palette={palette} />
    </AbsoluteFill>
  );
};

const CheckLabel: React.FC<{label: string; size?: number}> = ({label, size = 30}) => {
  const c = usePaper();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: size * 0.5, fontFamily: c.text, fontSize: size, color: c.ink}}>
      <span style={{width: size, height: size, borderRadius: size * 0.18, background: c.accent, color: c.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: size * 0.72}}>✓</span>
      {label}
    </div>
  );
};

const Body: React.FC<Omit<PromptOrbitProps, 'brand' | 'aspect' | 'fps'>> = ({content, orbPalette, timing}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const c = usePaper();
  const speed = timing?.speed ?? 1;
  const F = TIMES.map((t) => Math.round((t / speed) * fps));
  const palette: [string, string, string] = [orbPalette?.[0] ?? c.accent, orbPalette?.[1] ?? c.accent2, orbPalette?.[2] ?? c.paper];
  const scene = (i: number) => sceneOpacity(frame, F[i], F[i + 1]);

  const orb1 = spring({frame, fps, config: springs.cameraIn});
  const portraitIn = spring({frame: frame - F[1], fps, config: springs.layout});
  const portraitOut = interpolate(frame, [F[2] - 8, F[2]], [1, 0.08], {...clamp, easing: easings.inExpo});
  const logoLocal = frame - F[2];
  const promptLocal = frame - F[3];
  const collapseLocal = frame - F[5];
  const collapse = interpolate(collapseLocal, [0, 12], [1, 0.12], {...clamp, easing: easings.inExpo});
  const rebound = spring({frame: collapseLocal - 12, fps, config: springs.pop});
  const processLocal = frame - F[6];
  const process2Local = frame - F[7];
  const createLocal = frame - F[8];
  const cycleLocal = frame - F[9];
  const cycleIndex = cycleLocal < Math.round(1.5 * fps) ? 0 : cycleLocal < Math.round(1.77 * fps) ? 1 : 2;
  const returnLocal = frame - F[10];
  const returnScale = returnLocal < 30 ? spring({frame: returnLocal, fps, config: springs.layout}) : interpolate(returnLocal, [30, F[11] - F[10]], [1, 0.08], {...clamp, easing: easings.inExpo});
  const finalLocal = frame - F[11];

  const headline: React.CSSProperties = {fontFamily: c.text, color: c.ink, fontWeight: 500, letterSpacing: '-0.03em', fontSize: height * 0.052, lineHeight: 1.1};

  return (
    <AbsoluteFill style={{background: c.paper, overflow: 'hidden'}}>
      <AbsoluteFill style={{opacity: scene(0)}}>
        <ConstructionGrid />
        <GuideOrb size={Math.max(8, height * 0.14 * orb1)} palette={palette} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(1)}}>
        <ConstructionGrid />
        <PortraitCard size={height * 0.38} label={content.portraitLabel} scale={Math.max(0.04, portraitIn * portraitOut)} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(2), justifyContent: 'center', alignItems: 'center'}}>
        <TypedLockup local={logoLocal} duration={22} color={c.ink} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(3), justifyContent: 'center', alignItems: 'center'}}>
        <PromptPill local={promptLocal} text={content.prompt} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(4)}}>
        <MediaMosaic local={frame - F[4]} labels={content.mediaTiles} claim={content.capability} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(5), justifyContent: 'center', alignItems: 'center'}}>
        <GuideOrb size={height * 0.15 * Math.max(0.08, collapse + rebound * 0.32)} y={interpolate(collapseLocal, [20, 55], [0, height * 0.25], clamp)} palette={palette} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(6)}}>
        <OrbTrail local={processLocal} duration={F[7] - F[6]} path="M330 690 C650 330 1030 880 1570 390" palette={palette} />
        <div style={{...headline, position: 'absolute', left: width * 0.24, top: height * 0.39, opacity: interpolate(processLocal, [0, 8], [0, 1], {...clamp, easing: easings.outExpo})}}>{content.statements[0]}</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(7)}}>
        <OrbTrail local={process2Local} duration={F[8] - F[7]} path="M280 760 C620 440 1080 720 1640 420" palette={palette} reverse />
        <div style={{...headline, position: 'absolute', left: width * 0.31, top: height * 0.57, opacity: interpolate(process2Local, [0, 8], [0, 1], {...clamp, easing: easings.outExpo})}}>{content.statements[1]}</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(8), justifyContent: 'center', alignItems: 'center', gap: 32}}>
        <div style={{...headline, fontSize: height * 0.035, opacity: interpolate(createLocal, [0, 15], [0, 1], {...clamp, easing: easings.outExpo})}}>{content.statements[2]}</div>
        <div style={{transform: `scale(${spring({frame: createLocal - 15, fps, config: springs.ui})})`}}><CheckLabel label={content.outputLabels[0]} size={height * 0.03} /></div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(9)}}>
        <OrbTrail local={cycleLocal} duration={F[10] - F[9]} path="M280 760 C570 190 1190 920 1660 330" palette={palette} />
        <div style={{position: 'absolute', left: width * 0.39, top: height * 0.47}}><CheckLabel label={content.outputLabels[cycleIndex]} size={height * 0.032} /></div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(10)}}>
        <ConstructionGrid />
        <PortraitCard size={height * 0.38} label={content.portraitLabel} scale={Math.max(0.04, returnScale)} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: scene(11), justifyContent: 'center', alignItems: 'center'}}>
        <TypedLockup local={finalLocal} duration={22} color={c.ink} final />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const PromptOrbitStory: React.FC<PromptOrbitProps> = ({brand, content, orbPalette, timing}) => (
  <BrandProvider brand={brand}>
    <Body content={content} orbPalette={orbPalette} timing={timing} />
  </BrandProvider>
);

export const calculatePromptOrbitMetadata: CalculateMetadataFunction<PromptOrbitProps> = ({props}) => {
  const fps = props.fps ?? 30;
  const speed = props.timing?.speed ?? 1;
  return {...ASPECTS[props.aspect], fps, durationInFrames: Math.round((TIMES[TIMES.length - 1] / speed) * fps)};
};

export const promptOrbitDefaults: PromptOrbitProps = {
  brand: DEMO_BRANDS.shellpine,
  aspect: '16:9',
  fps: 30,
  content: {
    portraitLabel: 'branch 42',
    prompt: 'Preview this branch',
    capability: 'From commit to preview',
    statements: ['Think it. Ship it.', 'With you from branch to launch.', 'Create your next preview'],
    outputLabels: ['Preview', 'Review link', 'Release note'],
    mediaTiles: ['code', 'tests', 'diff', 'docs', 'build', 'review', 'logs', 'deploy'],
  },
};
