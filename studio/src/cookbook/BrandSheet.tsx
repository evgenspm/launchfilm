// The five demo brands side by side: lockup, tagline, colour tokens, type specimen, radius. Cards cascade in, then hold.
// Use it to check a brand.json at a glance: swap DEMO_BRAND_LIST for your own brands.
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider, useBrand} from '../brand/BrandProvider';
import {DEMO_BRAND_LIST} from '../brand/demo';
import {Lockup} from '../brand/Logo';
import {alpha, onColor} from '../brand/color';
import {fontFamily} from '../brand/fonts';
import type {Brand, ColorToken} from '../brand/types';
import {springs} from '../presets/springs';
import {stagger, STAGGER} from '../presets/timing';

export const BRAND_SHEET_FRAMES = 90;
const TOKENS: ColorToken[] = ['bg', 'surface', 'fg', 'muted', 'accent', 'accent2'];

const Card: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const p = spring({frame: frame - stagger(index, STAGGER.cards, fps), fps, config: springs.settle});
  const line = alpha(b.colors.muted, 0.28);
  const label: React.CSSProperties = {fontFamily: b.font.mono, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: b.colors.muted};
  return (
    <div
      style={{
        width: 340,
        height: 952,
        borderRadius: 22,
        background: b.colors.bg,
        border: `1px solid ${b.theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        padding: 28,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        overflow: 'hidden',
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px)`,
      }}
    >
      <div style={label}>
        {b.theme} · {b.id}
      </div>
      <Lockup size={40} />
      <div style={{fontFamily: b.font.text, fontWeight: b.type.textWeight, fontSize: 20, lineHeight: 1.35, color: b.colors.fg, minHeight: 54}}>{b.tagline}</div>

      <div style={{borderTop: `1px solid ${line}`, paddingTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10}}>
        {TOKENS.map((t) => (
          <div key={t} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <div style={{height: 46, borderRadius: Math.min(12, b.radius), background: b.colors[t], border: `1px solid ${line}`}} />
            <div style={{fontFamily: b.font.mono, fontSize: 11, color: b.colors.muted}}>{t}</div>
            <div style={{fontFamily: b.font.mono, fontSize: 11, color: b.colors.fg}}>{b.colors[t].toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div style={{borderTop: `1px solid ${line}`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={label}>display · {fontFamily(b.fonts.display)}</div>
        <div
          style={{
            fontFamily: b.font.display,
            fontWeight: b.type.displayWeight,
            letterSpacing: `${b.type.displayTracking}em`,
            lineHeight: b.type.displayLineHeight,
            fontSize: 50,
            color: b.colors.fg,
          }}
        >
          Ship it.
          <br />
          <span style={{color: b.colors.accent}}>Today.</span>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={label}>text · {fontFamily(b.fonts.text)}</div>
        <div style={{fontFamily: b.font.text, fontWeight: b.type.textWeight, fontSize: 18, lineHeight: 1.45, color: alpha(b.colors.fg, 0.85)}}>
          The quick launch film jumps over the lazy explainer video.
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={label}>mono · {fontFamily(b.fonts.mono)}</div>
        <div style={{fontFamily: b.font.mono, fontSize: 17, color: b.colors.fg}}>
          $ deploy --prod <span style={{color: b.colors.accent2}}>✓ 2.4s</span>
        </div>
      </div>

      <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{padding: '12px 22px', borderRadius: b.radius, background: b.colors.accent, color: onColor(b.colors.accent), fontFamily: b.font.text, fontWeight: 600, fontSize: 18}}>Get started</div>
        <div style={{fontFamily: b.font.mono, fontSize: 12, color: b.colors.muted}}>radius {b.radius}</div>
      </div>
    </div>
  );
};

export const BrandSheet: React.FC<{brands?: Brand[]}> = ({brands = DEMO_BRAND_LIST}) => (
  <AbsoluteFill style={{background: '#101012', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{display: 'flex', gap: 26}}>
      {brands.slice(0, 5).map((br, i) => (
        <BrandProvider key={br.id} brand={br}>
          <Card index={i} />
        </BrandProvider>
      ))}
    </div>
  </AbsoluteFill>
);
