// Brandmark family on the demo brands: one composition per LogoReveal variant, a portal zoom into a brand tunnel, and a
// horizon arc with the mark rising from behind it. Registered by Root under the cookbook folder.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import {DEMO_BRANDS} from '../../brand/demo';
import type {Brand} from '../../brand/types';
import {LogoReveal} from '../../components/LogoReveal';
import {BrandTunnel, DepthPhrase, HorizonArc, MARK_T, PortalWord, PortalZoom, lightCurve, portalSizeFor, useMarkSource} from '../../presets/brandmark';
import {Grain, Vignette} from '../../presets/look';
import {easings} from '../../presets/easings';
import {useFontsReady} from '../../brand/useFontsReady';
import {measureText} from '@remotion/layout-utils';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const Finish: React.FC<{dark?: boolean}> = ({dark = true}) => (dark ? (
  <>
    <Vignette amount={0.28} />
    <Grain opacity={0.08} />
  </>
) : (
  <Grain opacity={0.05} />
));

const withBrand = (brand: Brand, C: React.FC) => {
  const Wrapped: React.FC = () => (
    <BrandProvider brand={brand}>
      <C />
    </BrandProvider>
  );
  return Wrapped;
};

const FromDot: React.FC = () => (
  <AbsoluteFill>
    <LogoReveal variant="from-dot" startFrame={6} />
    <Finish dark={false} />
  </AbsoluteFill>
);

const Glass: React.FC = () => (
  <AbsoluteFill>
    <LogoReveal variant="glass" startFrame={6} />
    <Finish />
  </AbsoluteFill>
);

const Particles: React.FC = () => (
  <AbsoluteFill>
    <LogoReveal variant="particles" startFrame={4} />
    <Finish />
  </AbsoluteFill>
);

const Draw: React.FC = () => (
  <AbsoluteFill>
    <LogoReveal variant="draw" startFrame={6} />
    <Finish dark={false} />
  </AbsoluteFill>
);

/** The brand name with a portal in its "o" zooms into the brand tunnel; two phrases pass in depth; dive to dark. */
const Portal: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const b = useBrand();
  const u = Math.min(W, H) / 1080;
  const style: React.CSSProperties = {fontFamily: b.font.display, fontWeight: 700, fontSize: 230 * u, letterSpacing: '-0.04em', color: b.colors.fg};
  const size = portalSizeFor(230 * u);
  const dive = clamp01((frame - 100) / MARK_T.dive);
  const ready = useFontsReady([`700 100px ${b.font.display}`]);
  if (!ready) return null;
  // centre the whole word, not the disc: shift by half the difference of the two sides
  const m = (t: string) => measureText({text: t, fontFamily: b.font.display, fontSize: 230 * u, fontWeight: '700', letterSpacing: '-0.04em'}).width;
  const x = W / 2 + (m('Lumenf') - m('ld')) / 2;
  return (
    <AbsoluteFill style={{background: b.colors.bg}}>
      <PortalZoom at={30} size={size} x={x} outgoing={<PortalWord before="Lumenf" after="ld" size={size} style={style} />}>
        <AbsoluteFill>
          <BrandTunnel dive={easings.inExpo(dive)} exposure={easings.outQuint(clamp01((frame - 26) / 14))} />
          <DepthPhrase text="the boring half of work" at={40} until={72} />
          <DepthPhrase text="handled" at={74} until={104} />
        </AbsoluteFill>
      </PortalZoom>
      <Finish />
    </AbsoluteFill>
  );
};

/** The horizon rises and lights; the mark rises from behind its rim and lights on. */
const Horizon: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const b = useBrand();
  const {src, aspect} = useMarkSource();
  const portrait = H > W;
  const u = Math.min(W, H) / 1080;
  const w = (portrait ? 380 : 280) * u;
  const h = w * aspect;
  const top = (portrait ? 0.7 : 0.62) * H;
  const rise = easings.outQuint(clamp01((frame - 30) / 40));
  const lit = lightCurve(frame, 34, {frames: MARK_T.lightOn * (fps / 30)});
  return (
    <AbsoluteFill style={{background: b.colors.bg}}>
      <HorizonArc
        at={4}
        behind={
          <div
            style={{
              position: 'absolute',
              left: W / 2 - w / 2,
              top: top + 4 * u - (h + 110 * u) * rise,
              width: w,
              height: h,
              backgroundImage: `url("${src}")`,
              backgroundSize: '100% 100%',
              filter: `brightness(${0.45 + 0.55 * lit})`,
            }}
          />
        }
      />
      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: H * (portrait ? 0.2 : 0.14)}}>
        <div
          style={{
            fontFamily: b.font.display,
            fontWeight: b.type.displayWeight,
            letterSpacing: `${b.type.displayTracking}em`,
            fontSize: 64 * u,
            color: b.colors.fg,
            opacity: interpolate(frame, [52, 64], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            textAlign: 'center',
            maxWidth: W * 0.78,
            textWrap: 'balance',
          } as React.CSSProperties}
        >
          {b.tagline}
        </div>
      </AbsoluteFill>
      <Finish />
    </AbsoluteFill>
  );
};

export type ShowcaseEntry = {id: string; component: React.FC; durationInFrames: number; width: number; height: number};

export const showcase: ShowcaseEntry[] = [
  {id: 'logo-reveal-from-dot', component: withBrand(DEMO_BRANDS.plumday, FromDot), durationInFrames: 75, width: 1920, height: 1080},
  {id: 'logo-reveal-glass', component: withBrand(DEMO_BRANDS.lumenfold, Glass), durationInFrames: 110, width: 1920, height: 1080},
  {id: 'logo-reveal-particles', component: withBrand(DEMO_BRANDS.shellpine, Particles), durationInFrames: 120, width: 1080, height: 1920},
  {id: 'logo-reveal-draw', component: withBrand(DEMO_BRANDS.tallyfield, Draw), durationInFrames: 80, width: 1920, height: 1080},
  {id: 'portal-zoom-tunnel', component: withBrand(DEMO_BRANDS.lumenfold, Portal), durationInFrames: 125, width: 1920, height: 1080},
  {id: 'horizon-arc', component: withBrand(DEMO_BRANDS.northfern, Horizon), durationInFrames: 100, width: 1080, height: 1920},
];
