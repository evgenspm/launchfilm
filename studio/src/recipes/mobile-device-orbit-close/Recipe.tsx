// Recipe: mobile-device-orbit-close. Three close phone passes resolve into a product statement, mark and quiet credit.
// The device is a recipe-local CSS 3D rig: no source footage, source UI, or source copy is used.
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
import {DEMO_BRANDS} from '../../brand/demo';
import type {Brand} from '../../brand/types';
import {alpha} from '../../brand/color';
import {ASPECTS, type Aspect} from '../../film/types';
import {easings} from '../../presets/easings';
import {springs} from '../../presets/springs';

export type DeviceScreenContent = {
  eyebrow: string;
  helper: string;
  primaryAction: string;
};

export type MobileDeviceOrbitContent = {
  productName: string;
};

export type MobileDeviceOrbitProps = {
  brand: Brand;
  content: MobileDeviceOrbitContent;
  productScreen: DeviceScreenContent;
  proofValue: string;
  statement: string;
  mark: string;
  creditLine: string;
  deviceColor: string;
  screenColor: string;
  aspect: Aspect;
  fps?: number;
};

type OrbitPhoneRigProps = {
  x: number;
  y: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  deviceColor: string;
  screenColor: string;
  content: DeviceScreenContent;
  proofValue: string;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const at30 = (frame: number, fps: number) => Math.round((frame * fps) / 30);

/** A replaceable-screen, full-depth phone used only by this recipe. Coordinates are percentages of the composition. */
export const OrbitPhoneRig: React.FC<OrbitPhoneRigProps> = ({
  x,
  y,
  scale,
  rotateX,
  rotateY,
  rotateZ,
  deviceColor,
  screenColor,
  content,
  proofValue,
}) => {
  const {height} = useVideoConfig();
  const b = useBrand();
  const u = height / 1080;
  const phoneW = 350 * u;
  const phoneH = 720 * u;
  const ink = b.colors.bg;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: phoneW,
        height: phoneH,
        transform: `translate(-50%, -50%) perspective(${1400 * u}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        borderRadius: 60 * u,
        background: deviceColor,
        padding: 12 * u,
        boxShadow: `0 ${34 * u}px ${90 * u}px rgba(0,0,0,.72), inset 0 0 0 ${2 * u}px ${alpha(b.colors.fg, 0.22)}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 60 * u,
          background: `linear-gradient(110deg, ${alpha(b.colors.fg, 0.28)}, ${alpha(deviceColor, 0)} 18%, ${alpha(b.colors.fg, 0.08)} 58%, ${alpha(b.colors.fg, 0.32)})`,
          transform: `translateZ(${-18 * u}px)`,
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 49 * u,
          background: screenColor,
          color: ink,
          fontFamily: b.font.text,
          transform: `translateZ(${12 * u}px)`,
          boxShadow: `inset 0 0 ${30 * u}px ${alpha(ink, 0.12)}`,
        }}
      >
        <div style={{position: 'absolute', top: 22 * u, left: 28 * u, fontSize: 15 * u, fontWeight: 700, letterSpacing: '0.08em'}}>{content.eyebrow}</div>
        <div style={{position: 'absolute', top: 18 * u, left: '50%', width: 112 * u, height: 31 * u, marginLeft: -56 * u, borderRadius: 20 * u, background: ink}} />
        <div style={{position: 'absolute', top: 112 * u, left: 30 * u, right: 30 * u, textAlign: 'center'}}>
          <div style={{fontSize: 108 * u, fontWeight: 800, letterSpacing: '-0.055em'}}>{proofValue}</div>
          <div style={{fontSize: 20 * u, opacity: 0.58, marginTop: 4 * u}}>{content.helper}</div>
        </div>
        <div style={{position: 'absolute', top: 330 * u, left: 38 * u, right: 38 * u, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 * u}}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
            <div key={n} style={{textAlign: 'center', fontSize: 22 * u, fontWeight: 650, opacity: 0.72}}>{n}</div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 28 * u, right: 28 * u, bottom: 86 * u, height: 55 * u, borderRadius: 30 * u, background: ink, color: screenColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 * u, fontWeight: 700}}>{content.primaryAction}</div>
        <div style={{position: 'absolute', left: '50%', bottom: 28 * u, width: 86 * u, height: 6 * u, marginLeft: -43 * u, borderRadius: 8 * u, background: alpha(ink, 0.65)}} />
      </div>
    </div>
  );
};

const wordOpacity = (frame: number, start: number, fps: number) =>
  interpolate(frame, [start, start + at30(9, fps)], [0, 1], {...clamp, easing: easings.outExpo});

const Body: React.FC<Omit<MobileDeviceOrbitProps, 'brand' | 'aspect' | 'fps'>> = (props) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const f = (n: number) => at30(n, fps);
  const scene = frame < f(90) ? 1 : frame < f(233) ? 2 : frame < f(329) ? 3 : frame < f(420) ? 4 : frame < f(488) ? 5 : 6;

  let phone: React.ReactNode = null;
  if (scene === 1) {
    const p = interpolate(frame, [0, f(89)], [0, 1], {...clamp, easing: easings.inOutSine});
    phone = <OrbitPhoneRig {...props} content={props.productScreen} x={interpolate(p, [0, 1], [61, 48])} y={interpolate(p, [0, 1], [10, 56])} scale={interpolate(p, [0, 1], [0.78, 1.72])} rotateX={interpolate(p, [0, 1], [61, 43])} rotateY={interpolate(p, [0, 1], [-18, 7])} rotateZ={interpolate(p, [0, 1], [12, -8])} />;
  } else if (scene === 2) {
    const local = frame - f(90);
    const p = interpolate(local, [f(5), f(142)], [0, 1], {...clamp, easing: easings.inOutSine});
    phone = <OrbitPhoneRig {...props} content={props.productScreen} x={interpolate(p, [0, 1], [72, 25])} y={interpolate(p, [0, 1], [77, 55])} scale={interpolate(p, [0, 1], [1.48, 1.74])} rotateX={interpolate(p, [0, 1], [43, 34])} rotateY={interpolate(p, [0, 1], [-16, 16])} rotateZ={interpolate(p, [0, 1], [-9, 10])} />;
  } else if (scene === 3) {
    const local = frame - f(233);
    const visible = local >= f(8);
    const p = interpolate(local, [f(8), f(96)], [0, 1], {...clamp, easing: easings.inOutSine});
    phone = visible ? <OrbitPhoneRig {...props} content={props.productScreen} x={interpolate(p, [0, 1], [72, 57])} y={interpolate(p, [0, 1], [88, 50])} scale={interpolate(p, [0, 1], [0.92, 1.82])} rotateX={interpolate(p, [0, 1], [38, 28])} rotateY={interpolate(p, [0, 1], [-40, -10])} rotateZ={interpolate(p, [0, 1], [14, -5])} /> : null;
  } else if (scene === 4) {
    const local = frame - f(329);
    const enter = interpolate(local, [0, f(10)], [0, 1], {...clamp, easing: easings.outExpo});
    phone = <OrbitPhoneRig {...props} content={props.productScreen} x={70} y={interpolate(enter, [0, 1], [76, 52])} scale={0.72} rotateX={20} rotateY={-18} rotateZ={-3} />;
  }

  const statementWords = props.statement.split(/\s+/).filter(Boolean);
  const markProgress = scene === 5 ? spring({frame: frame - f(420), fps, config: springs.heavy, durationInFrames: f(30)}) : 0;
  const creditProgress = scene === 6 ? spring({frame: frame - f(488), fps, config: springs.cameraOut, durationInFrames: f(9)}) : 0;

  return (
    <AbsoluteFill style={{background: b.colors.bg, color: b.colors.fg, overflow: 'hidden'}}>
      {phone}
      {scene === 4 ? (
        <div style={{position: 'absolute', left: width * 0.09, top: height * 0.37, width: width * 0.39, fontFamily: b.font.text, fontSize: Math.min(height * 0.072, width * 0.046), fontWeight: b.type.textWeight, lineHeight: 1.12, letterSpacing: '0em'}}>
          {statementWords.map((word, i) => {
            const start = f(329 + 8 + i * 8);
            const opacity = wordOpacity(frame, start, fps);
            return <span key={`${word}-${i}`} style={{display: 'inline-block', marginRight: '0.24em', opacity, transform: `translateY(${(1 - opacity) * 0.18}em)`, filter: `blur(${(1 - opacity) * 8}px)`}}>{word}</span>;
          })}
        </div>
      ) : null}
      {scene === 5 ? (
        <div style={{position: 'absolute', left: '50%', top: '50%', width: height * 0.105, height: height * 0.105, marginLeft: -height * 0.0525, marginTop: -height * 0.0525, borderRadius: '50%', background: b.colors.fg, color: b.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: b.font.display, fontSize: height * 0.052, fontWeight: 800, transform: `rotate(${interpolate(markProgress, [0, 1], [-95, 0])}deg) scale(${interpolate(markProgress, [0, 1], [0.52, 1])})`}}>{props.mark}</div>
      ) : null}
      {scene === 6 ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: b.font.text, fontSize: height * 0.055, fontWeight: b.type.textWeight, letterSpacing: '0.01em', opacity: creditProgress, transform: `scale(${interpolate(creditProgress, [0, 1], [1.1, 1])})`}}>{props.creditLine}</div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

export const MobileDeviceOrbitClose: React.FC<MobileDeviceOrbitProps> = ({brand, aspect: _aspect, fps: _fps, ...props}) => (
  <BrandProvider brand={brand}>
    <Body {...props} />
  </BrandProvider>
);

export const calculateMobileDeviceOrbitMetadata: CalculateMetadataFunction<MobileDeviceOrbitProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: Math.round(19.37 * fps)};
};

export const mobileDeviceOrbitDefaults: MobileDeviceOrbitProps = {
  brand: DEMO_BRANDS.northfern,
  aspect: '16:9',
  fps: 30,
  content: {productName: 'Northfern'},
  productScreen: {eyebrow: 'NORTHFERN', helper: 'projected annual yield', primaryAction: 'Review plan'},
  proofValue: '24.8%',
  statement: 'See clearly. Move confidently.',
  mark: 'N',
  creditLine: 'Built by Northfern',
  deviceColor: DEMO_BRANDS.northfern.colors.surface,
  screenColor: DEMO_BRANDS.northfern.colors.accent,
};
