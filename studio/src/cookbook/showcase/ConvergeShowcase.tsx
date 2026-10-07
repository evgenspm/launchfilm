// Showcase of the converge family (presets/converge.tsx): fragments pulled into a core, an orbit of tool tiles, a depth field
// of cards and a progress ring. Invented copy only; tiles use the generic line glyphs.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import {DEMO_BRANDS} from '../../brand/demo';
import {Converge, ConvergeBackdrop, CoreOrb, DepthField, FragmentCard, OrbitRing, ProgressRing, corePresence, type LineGlyphName} from '../../presets/converge';
import {Grain} from '../../presets/look';

const Label: React.FC<{text: string}> = ({text}) => {
  const b = useBrand();
  return <div style={{position: 'absolute', left: 64, bottom: 52, fontFamily: b.font.mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: b.colors.muted, zIndex: 5000}}>{text}</div>;
};

/** Fragments of a day float, then get pulled into the core one by one; the last arrival fires a shockwave. */
const PullScene: React.FC = () => {
  const items = [
    <FragmentCard key="m" variant="message" />,
    <FragmentCard key="e" variant="email" />,
    <FragmentCard key="v" variant="event" />,
    <FragmentCard key="t" variant="tab" />,
    <FragmentCard key="c" variant="call" />,
    <FragmentCard key="d" variant="doc" />,
  ];
  return (
    <AbsoluteFill>
      <ConvergeBackdrop glow={0.55} dots={0.35} />
      <Converge items={items} at={30} stagger={4} duration={28} core={(s) => <CoreOrb size={190} energy={s.energy} pulse={s.pulse} />} />
      <Label text="Converge + FragmentCard + CoreOrb" />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

/** Tool tiles on a tilted carousel around the core, dolly-in entrance, then everything contracts into the core. */
const OrbitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const glyphs: LineGlyphName[] = ['code', 'layers', 'bolt', 'folder', 'globe', 'list', 'person', 'doc'];
  return (
    <AbsoluteFill>
      <ConvergeBackdrop glow={0.45} />
      <OrbitRing
        items={glyphs.map((g, i) => (
          <FragmentCard key={g} variant="tool" glyph={g} width={150} glow={i === 0 ? 0.9 : 0.25} />
        ))}
        core={<CoreOrb size={170} energy={0.5} presence={corePresence(frame, 4, fps)} body="lens" />}
        tilt={76}
        speed={-40}
        ring={{segments: 8, gap: 5}}
        enter={{at: 0, dolly: 0.44}}
        contract={{at: 120, duration: 26}}
      />
      <Label text="OrbitRing · carousel · contract" />
    </AbsoluteFill>
  );
};

/** Cards floating in depth with a slow dolly and a rack focus, a title in the cleared centre. Light brand. */
const DepthScene: React.FC = () => {
  const b = useBrand();
  const variants = ['message', 'email', 'event', 'tab', 'call', 'doc', 'message', 'event', 'email', 'tab', 'doc', 'call'] as const;
  return (
    <AbsoluteFill>
      <ConvergeBackdrop glow={0.4} />
      <DepthField items={variants.map((v, i) => <FragmentCard key={i} variant={v} />)} clearCenter={300} focus={[1500, 2600]} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', zIndex: 200000}}>
        <div style={{fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: 92, letterSpacing: `${b.type.displayTracking}em`, color: b.colors.fg, textAlign: 'center', lineHeight: 1.05}}>
          Every signal,
          <br />
          one view.
        </div>
      </AbsoluteFill>
      <Label text="DepthField · rack focus" />
    </AbsoluteFill>
  );
};

/** A thick ring fills with the steep in-out, the number counting in sync. */
const ProgressScene: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill>
      <ConvergeBackdrop glow={0.35} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <ProgressRing at={12} to={0.72} />
        <div style={{marginTop: -16, fontFamily: b.font.text, fontWeight: 500, fontSize: 34, color: b.colors.muted}}>of your savings goal</div>
      </AbsoluteFill>
      <Label text="ProgressRing" />
    </AbsoluteFill>
  );
};

const withBrand = (brand: (typeof DEMO_BRANDS)[keyof typeof DEMO_BRANDS], C: React.FC): React.FC => {
  const Wrapped: React.FC = () => (
    <BrandProvider brand={brand}>
      <C />
    </BrandProvider>
  );
  return Wrapped;
};

export const showcase = [
  {id: 'converge-pull', component: withBrand(DEMO_BRANDS.lumenfold, PullScene), durationInFrames: 120, width: 1920, height: 1080},
  {id: 'converge-orbit', component: withBrand(DEMO_BRANDS.shellpine, OrbitScene), durationInFrames: 156, width: 1920, height: 1080},
  {id: 'converge-depth', component: withBrand(DEMO_BRANDS.tallyfield, DepthScene), durationInFrames: 150, width: 1920, height: 1080},
  {id: 'converge-progress', component: withBrand(DEMO_BRANDS.northfern, ProgressScene), durationInFrames: 60, width: 1920, height: 1080},
];
