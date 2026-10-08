import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {PhoneFrame} from '../../components/PhoneFrame';
import {useBrand} from '../../brand/BrandProvider';
import {alpha, mix} from '../../brand/color';
import {easings} from '../../presets/easings';

export type OrbitScreenContent = {
  eyebrow: string;
  headline: string;
  metricLabel: string;
  metricValue: string;
  cards: {label: string; value: string}[];
  nav: string[];
};

export type CameraShot = {
  from: number;
  to: number;
  scale: [number, number];
  x: [number, number];
  y: [number, number];
  rotateX: [number, number];
  rotateY: [number, number];
  rotateZ: [number, number];
  easing: 'inOutSine' | 'inExpo' | 'outQuint';
};

const lerp = (frame: number, shot: CameraShot, values: [number, number]) =>
  interpolate(frame, [shot.from, shot.to], values, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easings[shot.easing],
  });

const ProductScreen: React.FC<{content: OrbitScreenContent}> = ({content}) => {
  const b = useBrand();
  const cards = content.cards.slice(0, 4);
  return (
    <AbsoluteFill style={{background: b.colors.surface, color: b.colors.fg, fontFamily: b.font.text, padding: '11% 7% 5%'}}>
      <div style={{fontFamily: b.font.mono, color: b.colors.muted, fontSize: 17, letterSpacing: '0.08em', textTransform: 'uppercase'}}>{content.eyebrow}</div>
      <div style={{fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: 39, letterSpacing: `${b.type.displayTracking}em`, lineHeight: 1.05, marginTop: 14}}>{content.headline}</div>
      <div style={{display: 'flex', gap: 12, marginTop: 24}}>
        {[content.metricLabel, 'Segments', 'Signals'].map((label, i) => (
          <div key={label} style={{flex: 1, padding: '14px 10px', borderRadius: b.radius, background: i === 0 ? alpha(b.colors.accent, 0.12) : b.colors.bg, border: `1px solid ${alpha(i === 0 ? b.colors.accent : b.colors.muted, 0.2)}`}}>
            <div style={{fontSize: 13, color: b.colors.muted}}>{label}</div>
            <div style={{fontSize: 24, fontWeight: 700, marginTop: 5, color: i === 0 ? b.colors.accent : b.colors.fg}}>{i === 0 ? content.metricValue : i === 1 ? '12' : '48'}</div>
          </div>
        ))}
      </div>
      <div style={{height: 220, marginTop: 24, padding: '20px 16px 12px', borderRadius: b.radius, background: b.colors.bg, border: `1px solid ${alpha(b.colors.muted, 0.18)}`}}>
        <div style={{fontSize: 15, fontWeight: 650}}>Weekly activation</div>
        <svg width="100%" height="165" viewBox="0 0 330 165" style={{display: 'block', marginTop: 8}}>
          {[35, 75, 115, 155].map((y) => <line key={y} x1="0" y1={y} x2="330" y2={y} stroke={alpha(b.colors.muted, 0.18)} strokeWidth="1" />)}
          <path d="M0 140 C35 132 55 90 88 103 C125 117 136 52 173 65 C218 80 240 32 274 47 C299 57 315 20 330 24" fill="none" stroke={b.colors.accent} strokeWidth="8" strokeLinecap="round" />
          <path d="M0 147 C48 150 64 125 105 130 C150 136 172 99 205 109 C244 121 278 82 330 91" fill="none" stroke={b.colors.accent2} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>
      <div style={{fontSize: 19, fontWeight: 700, marginTop: 26}}>Fastest-growing cohorts</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14}}>
        {cards.map((card, i) => (
          <div key={`${card.label}-${i}`} style={{height: 152, padding: 18, borderRadius: b.radius * 1.15, background: `linear-gradient(145deg, ${mix(i % 2 ? b.colors.accent2 : b.colors.accent, b.colors.surface, 0.72)}, ${b.colors.surface})`, border: `1px solid ${alpha(i % 2 ? b.colors.accent2 : b.colors.accent, 0.24)}`}}>
            <div style={{height: 55, display: 'flex', alignItems: 'flex-end', gap: 6}}>
              {[0.45, 0.7, 0.55, 0.9, 0.76].map((v, j) => <div key={j} style={{flex: 1, height: `${v * 100}%`, background: i % 2 ? b.colors.accent2 : b.colors.accent, borderRadius: 5, opacity: 0.45 + j * 0.1}} />)}
            </div>
            <div style={{fontSize: 15, color: b.colors.muted, marginTop: 14}}>{card.label}</div>
            <div style={{fontSize: 23, fontWeight: 720, marginTop: 3}}>{card.value}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 30, height: 190, borderRadius: b.radius * 1.2, background: b.colors.bg, padding: 20, border: `1px solid ${alpha(b.colors.muted, 0.18)}`}}>
        <div style={{fontWeight: 700, fontSize: 18}}>Live questions</div>
        {['Where did upgrades start?', 'Which step lost momentum?', 'What changed this week?'].map((line, i) => (
          <div key={line} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 17, color: i === 0 ? b.colors.fg : b.colors.muted, fontSize: 15}}>
            <div style={{width: 9, height: 9, borderRadius: '50%', background: i === 0 ? b.colors.accent : alpha(b.colors.muted, 0.4)}} />
            {line}
          </div>
        ))}
      </div>
      <div style={{marginTop: 24, display: 'grid', gridTemplateColumns: `repeat(${content.nav.length}, 1fr)`, alignItems: 'center', height: 76, borderTop: `1px solid ${alpha(b.colors.muted, 0.2)}`}}>
        {content.nav.map((item, i) => <div key={item} style={{textAlign: 'center', fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? b.colors.accent : b.colors.muted}}>{item}</div>)}
      </div>
    </AbsoluteFill>
  );
};

export const DeviceOrbitStage: React.FC<{
  content: OrbitScreenContent;
  cameraShots: CameraShot[];
  deviceBody?: string;
  focus?: number;
}> = ({content, cameraShots, deviceBody, focus = 0.3}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  const shot = cameraShots.find((s) => frame >= s.from && frame < s.to) ?? cameraShots[cameraShots.length - 1];
  const scale = lerp(frame, shot, shot.scale);
  const x = lerp(frame, shot, shot.x) * (width / 1920);
  const y = lerp(frame, shot, shot.y) * (height / 1080);
  const rx = lerp(frame, shot, shot.rotateX);
  const ry = lerp(frame, shot, shot.rotateY);
  const rz = lerp(frame, shot, shot.rotateZ);
  const phoneH = Math.min(height * 0.92, width * 0.92 / 0.4615);
  return (
    <AbsoluteFill style={{background: b.colors.bg, overflow: 'hidden', perspective: width * 1.25}}>
      <div style={{position: 'absolute', left: '50%', top: '50%', width: phoneH * 0.4615, height: phoneH, transformStyle: 'preserve-3d', transform: `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${scale.toFixed(4)})`, filter: `drop-shadow(0 ${Math.round(34 * scale)}px ${Math.round(62 * scale)}px ${alpha(b.colors.fg, 0.16 + focus * 0.12)})`}}>
        <PhoneFrame height={phoneH} body={deviceBody ?? b.colors.muted} screen={b.colors.surface} statusColor={b.colors.fg} style={{position: 'absolute', inset: 0}}>
          <ProductScreen content={content} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
