// Showcase of the notifications family (presets/notifications.tsx): one short composition per device, invented copy only.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import {DEMO_BRANDS} from '../../brand/demo';
import {AgentBrief, BannerStack, IslandPill, NotificationStack, PillMorph, RimArc} from '../../presets/notifications';
import {BrandBackdrop, Grain} from '../../presets/look';

const Label: React.FC<{text: string}> = ({text}) => {
  const b = useBrand();
  return <div style={{position: 'absolute', left: 64, bottom: 52, fontFamily: b.font.mono, fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: b.colors.muted}}>{text}</div>;
};

/** Phone-style cards land from the camera and tuck behind each other; one is dismissed. */
const StackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const push = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.12} y={0.3} />
      <RimArc />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `scale(${push})`}}>
        <NotificationStack
          items={[
            {at: 8, app: 'Lumenfold', title: 'Build passed', body: 'All 214 checks are green on main.', time: '09:41', glyph: 'check'},
            {at: 32, app: 'Lumenfold', title: 'Invoice paid', body: 'Ferro & Pine paid invoice #1042.', time: '09:42', glyph: 'doc'},
            {at: 56, app: 'Lumenfold', title: 'New sign-up', body: 'A team of 12 just joined from the docs.', time: '09:43', glyph: 'spark', out: 96},
            {at: 80, app: 'Lumenfold', title: 'Draft ready', body: 'Your weekly update is ready to review.', time: '09:44', glyph: 'mail'},
          ]}
          style={{marginTop: 80}}
        />
      </AbsoluteFill>
      <Label text="NotificationStack · phone · land" />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

/** Desktop banners slide in from the right edge and push down; overflow compresses. Light brand. */
const BannerScene: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill style={{background: b.colors.bg}}>
      <AbsoluteFill style={{background: `linear-gradient(160deg, ${b.colors.bg} 0%, ${b.colors.surface} 100%)`}} />
      <div style={{position: 'absolute', left: 120, top: 360, fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: 96, letterSpacing: `${b.type.displayTracking}em`, color: b.colors.fg, lineHeight: 1.05}}>
        Know before
        <br />
        they ask.
      </div>
      <div style={{position: 'absolute', right: 56, top: 56}}>
        <BannerStack
          maxVisible={3}
          items={[
            {at: 6, app: 'Tallyfield', title: 'Weekly active users up 18%', body: 'Best week since launch.', glyph: 'spark'},
            {at: 26, app: 'Tallyfield', title: 'Checkout drop-off spotted', body: 'Step 3 lost 9% of sessions.', glyph: 'bell', tint: b.colors.accent2},
            {at: 46, app: 'Tallyfield', title: 'Report shared', body: 'Q3 funnel review was sent to 4 people.', glyph: 'doc'},
            {at: 66, app: 'Tallyfield', title: 'Goal reached', body: '10,000 trials this month.', glyph: 'check'},
          ]}
        />
      </div>
      <Label text="BannerStack · desktop · slide" />
    </AbsoluteFill>
  );
};

/** A capsule builds from a dot, and a status island opens, updates and resolves. */
const PillScene: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill style={{background: b.colors.bg}}>
      <IslandPill
        at={46}
        content={{eyebrow: 'Plans', label: 'Finding a time for 5 friends', trailing: '3 left'}}
        updates={[{at: 92, label: 'Saturday, 7 pm works', tone: 'done', eyebrow: 'Booked'}]}
        closeAt={128}
      />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <PillMorph at={8} closeAt={110} label="Maya is in" initials="MA" height={140} />
      </AbsoluteFill>
      <Label text="PillMorph + IslandPill" />
    </AbsoluteFill>
  );
};

/** The orb enters and breathes, a greeting types, glass status cards arrive and the orb pulses on each. */
const BriefScene: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.1} x={0.3} />
    <AgentBrief
      at={0}
      greeting="Morning."
      cards={[
        {delay: 34, title: 'Answering mail', status: 'reading 38 threads', live: true, rows: [{label: 'Reply to the hiring thread', state: 'now', meta: 'drafting'}, {label: 'Confirm the venue for Friday', doneAt: 70}]},
        {delay: 58, title: 'Scheduling', entrance: 'rise', rows: [{label: 'Move the design review to 3 pm', meta: '2 people'}, {label: 'Hold an hour for deep work', state: 'todo'}]},
      ]}
    />
    <Grain opacity={0.05} />
  </AbsoluteFill>
);

const withBrand = (brand: (typeof DEMO_BRANDS)[keyof typeof DEMO_BRANDS], C: React.FC): React.FC => {
  const Wrapped: React.FC = () => (
    <BrandProvider brand={brand}>
      <C />
    </BrandProvider>
  );
  return Wrapped;
};

export const showcase = [
  {id: 'notifications-stack', component: withBrand(DEMO_BRANDS.lumenfold, StackScene), durationInFrames: 120, width: 1920, height: 1080},
  {id: 'notifications-banners', component: withBrand(DEMO_BRANDS.tallyfield, BannerScene), durationInFrames: 110, width: 1920, height: 1080},
  {id: 'notifications-pill-island', component: withBrand(DEMO_BRANDS.plumday, PillScene), durationInFrames: 140, width: 1920, height: 1080},
  {id: 'notifications-agent-brief', component: withBrand(DEMO_BRANDS.lumenfold, BriefScene), durationInFrames: 120, width: 1920, height: 1080},
];
