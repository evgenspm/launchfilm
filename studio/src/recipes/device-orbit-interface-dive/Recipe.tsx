import React from 'react';
import {AbsoluteFill, type CalculateMetadataFunction, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {BlurIn} from '../../presets/statement';
import {ASPECTS, type Aspect} from '../../film/types';
import {DeviceOrbitStage, type CameraShot, type OrbitScreenContent} from './DeviceOrbitStage';

export type DeviceOrbitInterfaceDiveContent = OrbitScreenContent & {productName: string};

export type DeviceOrbitInterfaceDiveProps = {
  brand: Brand;
  content: DeviceOrbitInterfaceDiveContent;
  aspect: Aspect;
  fps?: number;
  cameraShots?: CameraShot[];
  deviceBody?: string;
  background?: string;
  focus?: number;
};

const scaled = (frame: number, fps: number) => Math.round(frame * fps / 30);

export const deviceOrbitSchedule = (fps: number): CameraShot[] => [
  {from: scaled(0, fps), to: scaled(60, fps), scale: [1.86, 2.48], x: [250, 70], y: [185, 165], rotateX: [2, 0], rotateY: [-24, -2], rotateZ: [-2, 1], easing: 'inOutSine'},
  {from: scaled(60, fps), to: scaled(131, fps), scale: [2.48, 1.92], x: [70, -35], y: [165, 120], rotateX: [0, 3], rotateY: [-2, 14], rotateZ: [1, 5], easing: 'inOutSine'},
  {from: scaled(131, fps), to: scaled(252, fps), scale: [2.08, 2.28], x: [285, -170], y: [520, -510], rotateX: [3, 5], rotateY: [-15, 8], rotateZ: [12, 12], easing: 'inOutSine'},
  {from: scaled(252, fps), to: scaled(372, fps), scale: [1.24, 1.38], x: [50, -55], y: [-15, 35], rotateX: [52, 50], rotateY: [-11, -3], rotateZ: [-17, -9], easing: 'inOutSine'},
  {from: scaled(372, fps), to: scaled(492, fps), scale: [1.34, 2.46], x: [0, -8], y: [-650, 275], rotateX: [7, 0], rotateY: [0, 0], rotateZ: [0, 0], easing: 'outQuint'},
];

const Body: React.FC<Omit<DeviceOrbitInterfaceDiveProps, 'brand' | 'aspect'>> = ({content, cameraShots, deviceBody, background, focus}) => {
  const frame = useCurrentFrame();
  const {fps, height} = useVideoConfig();
  const b = useBrand();
  const logoAt = scaled(492, fps);
  return (
    <AbsoluteFill style={{background: background ?? b.colors.bg}}>
      {frame < logoAt ? <DeviceOrbitStage content={content} cameraShots={cameraShots ?? deviceOrbitSchedule(fps)} deviceBody={deviceBody} focus={focus} /> : (
        <AbsoluteFill style={{background: background ?? b.colors.bg, justifyContent: 'center', alignItems: 'center'}}>
          <BlurIn text={content.productName} startFrame={logoAt} enter="blurDrop" fontSize={Math.round(height * 0.034)} fontWeight={b.type.displayWeight} maxWidth={0.7 * height * (16 / 9)} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const DeviceOrbitInterfaceDive: React.FC<DeviceOrbitInterfaceDiveProps> = ({brand, content, cameraShots, deviceBody, background, focus = 0.3}) => (
  <BrandProvider brand={brand}>
    <Body content={content} cameraShots={cameraShots} deviceBody={deviceBody} background={background} focus={focus} />
  </BrandProvider>
);

export const calculateDeviceOrbitInterfaceDiveMetadata: CalculateMetadataFunction<DeviceOrbitInterfaceDiveProps> = ({props}) => {
  const fps = props.fps ?? 30;
  return {...ASPECTS[props.aspect], fps, durationInFrames: scaled(582, fps)};
};

export const deviceOrbitInterfaceDiveDefaults: DeviceOrbitInterfaceDiveProps = {
  brand: DEMO_BRANDS.tallyfield,
  aspect: '16:9',
  fps: 30,
  content: {
    productName: 'Tallyfield',
    eyebrow: 'Workspace pulse',
    headline: 'Answers behind every signal.',
    metricLabel: 'Activation',
    metricValue: '68.4%',
    cards: [
      {label: 'Self-serve teams', value: '+24%'},
      {label: 'Invited workspaces', value: '+18%'},
      {label: 'Weekly explorers', value: '+31%'},
      {label: 'Saved questions', value: '+15%'},
    ],
    nav: ['Overview', 'Questions', 'Signals', 'Account'],
  },
  focus: 0.3,
};
