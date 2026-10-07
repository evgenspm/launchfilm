// Showcase of the product-scene components (src/components), one short composition per family, on the demo brands.
// Register with: showcase.map((s) => <Composition key={s.id} {...s} />)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BrandProvider} from '../../brand/BrandProvider';
import {alpha} from '../../brand/color';
import {useBrand} from '../../brand/BrandProvider';
import {Lockup} from '../../brand/Logo';
import {lumenfold, northfern, plumday, shellpine, tallyfield} from '../../brand/demo';
import {easings} from '../../presets/easings';
import {MacWindow, SidebarItem} from '../../components/MacWindow';
import {BrowserFrame} from '../../components/BrowserFrame';
import {PhoneFrame, phoneSafeTop} from '../../components/PhoneFrame';
import {Desktop, DesktopBackdrop} from '../../components/Desktop';
import {Keycaps} from '../../components/Keycaps';
import {ChatThread} from '../../components/AIChat';
import {Chart} from '../../components/Chart';
import {FeatureCards} from '../../components/FeatureCards';
import {Stat, StatRow} from '../../components/Stat';
import {Testimonial} from '../../components/Testimonial';

const Heading: React.FC<{text: string; sub?: string; size?: number; style?: React.CSSProperties}> = ({text, sub, size = 64, style}) => {
  const b = useBrand();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: size * 0.25, ...style}}>
      <div
        style={{
          fontFamily: b.font.display,
          fontWeight: b.type.displayWeight,
          fontSize: size,
          letterSpacing: `${b.type.displayTracking}em`,
          lineHeight: 1.08,
          color: b.colors.fg,
        }}
      >
        {text}
      </div>
      {sub ? <div style={{fontFamily: b.font.text, fontSize: size * 0.4, color: alpha(b.colors.fg, 0.6)}}>{sub}</div> : null}
    </div>
  );
};

// 1 · desktop + window + AI chat + keycaps (dark AI tool)
const DesktopChat: React.FC = () => (
  <BrandProvider brand={lumenfold}>
    <Desktop dockAt={0} clock="Tue 9:41">
      <MacWindow
        title="Lumenfold"
        width={1360}
        height={800}
        enterAt={4}
        sidebar={
          <div style={{paddingTop: 22}}>
            <SidebarItem label="Inbox" count={12} />
            <SidebarItem label="Agent" active />
            <SidebarItem label="Reports" count={3} />
            <SidebarItem label="Settings" />
          </div>
        }
      >
        <ChatThread
          fontSize={25}
          messages={[
            {role: 'user', text: 'Summarize what changed in the Q3 roadmap since Monday.', at: 22},
            {
              role: 'assistant',
              text: 'Three things moved:\n**Billing v2** slipped one week, the `export` API shipped early, and onboarding now has an owner.',
              typingFrom: 36,
              at: 50,
            },
            {role: 'user', text: 'Draft the update for the team.', at: 118},
          ]}
        />
      </MacWindow>
      <Keycaps presses={[{at: 14, keys: ['⌘', 'K'], kind: 'chord', label: 'Ask the agent'}]} />
    </Desktop>
  </BrandProvider>
);

// 2 · browser typing a URL, dashboard page with stats + a line chart, slow scroll (light SaaS)
const BrowserPage: React.FC = () => {
  const frame = useCurrentFrame();
  const b = tallyfield;
  const scroll = interpolate(frame, [100, 140], [0, 120], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inOutSine});
  return (
    <BrandProvider brand={b}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <DesktopBackdrop blobs={3} intensity={0.7} />
        <BrowserFrame
          url="tallyfield.io/dashboard"
          typeUrlAt={4}
          width={1600}
          height={940}
          enterAt={0}
          scrollY={scroll}
          tabs={[{title: 'Dashboard · Tallyfield', active: true}, {title: 'Docs'}]}
        >
          <div style={{padding: '48px 64px', display: 'flex', flexDirection: 'column', gap: 44}}>
            <Heading text="Weekly active teams" sub="Last 12 weeks · all workspaces" size={52} />
            <StatRow
              start={30}
              size={100}
              stats={[
                {value: 18420, label: 'Active teams', delta: {text: '12%'}},
                {value: 64.2, decimals: 1, suffix: '%', label: 'Week-4 retention'},
                {value: 3.8, decimals: 1, suffix: ' min', label: 'Time to first chart'},
              ]}
            />
            <Chart
              kind="line"
              card
              title="Teams per week"
              start={46}
              duration={40}
              width={1400}
              height={360}
              data={[8.2, 9.1, 9.0, 10.4, 11.2, 11.0, 12.6, 13.9, 14.4, 15.8, 17.1, 18.4]}
              labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']}
              format={(v) => `${v.toFixed(1)}k`}
            />
          </div>
        </BrowserFrame>
      </AbsoluteFill>
    </BrandProvider>
  );
};

// 3 · phone in 9:16 with a group-plan chat (consumer app)
const PlanCard: React.FC = () => {
  const b = useBrand();
  return (
    <div
      style={{
        margin: '18px 26px 0',
        padding: '26px 28px',
        borderRadius: b.radius,
        background: b.colors.accent2,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{fontFamily: b.font.text, fontSize: 20, fontWeight: 600, opacity: 0.8}}>Sat · 12:00 · Riverside lawn</div>
      <div style={{fontFamily: b.font.display, fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em'}}>Picnic, take two</div>
      <div style={{display: 'flex', marginTop: 8}}>
        {['AK', 'JM', 'RS', 'TL', 'NB'].map((x, i) => (
          <div
            key={x}
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              marginLeft: i ? -12 : 0,
              background: ['#FFD3C2', '#FFB39B', '#FFE8DD', '#F9C4FF', '#FFFFFF'][i],
              border: `3px solid ${b.colors.accent2}`,
              color: b.colors.fg,
              fontFamily: b.font.text,
              fontWeight: 700,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
};

const PhonePlan: React.FC = () => {
  const h = 1380;
  return (
    <BrandProvider brand={plumday}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <DesktopBackdrop blobs={4} intensity={0.9} />
        <PhoneFrame height={h} float={6} enterAt={0} tilt={{y: -6, x: 3}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', paddingTop: phoneSafeTop(h)}}>
            <div style={{padding: '18px 34px 10px'}}>
              <Lockup size={34} />
            </div>
            <PlanCard />
            <div style={{flex: 1, minHeight: 0}}>
              <ChatThread
                fontSize={27}
                avatar={false}
                padding={26}
                messages={[
                  {role: 'assistant', text: 'Saturday works for 5 of 6. Picnic at noon?', at: 16, stream: false},
                  {role: 'user', text: 'In! I will bring the speaker.', at: 44},
                  {role: 'assistant', text: 'Done. Added to everyone’s **Saturday** and split the snacks list.', typingFrom: 70, at: 84},
                ]}
              />
            </div>
          </div>
        </PhoneFrame>
      </AbsoluteFill>
    </BrandProvider>
  );
};

// 4 · charts + rolling counter (fintech)
const Charts: React.FC = () => (
  <BrandProvider brand={northfern}>
    <AbsoluteFill>
      <DesktopBackdrop blobs={2} intensity={0.5} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: 48, alignItems: 'stretch'}}>
          <Chart
            kind="line"
            card
            title="Savings balance"
            figure="$12,480"
            start={8}
            duration={44}
            width={780}
            height={420}
            data={[
              {values: [2.1, 2.9, 3.4, 4.6, 5.2, 6.8, 7.4, 8.9, 10.2, 12.5]},
              {values: [2.1, 2.4, 2.8, 3.1, 3.5, 3.8, 4.2, 4.5, 4.9, 5.2], label: 'Without auto-save'},
            ]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']}
            format={(v) => `$${v.toFixed(1)}k`}
          />
          <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
            <Chart
              kind="bar"
              card
              title="Round-ups by week"
              start={20}
              width={600}
              height={250}
              data={[
                {value: 18, label: 'W1'},
                {value: 24, label: 'W2'},
                {value: 21, label: 'W3'},
                {value: 31, label: 'W4'},
                {value: 42, label: 'W5', highlight: true},
              ]}
              format={(v) => `$${v}`}
            />
            <div
              style={{
                padding: '34px 40px',
                borderRadius: northfern.radius * 1.4,
                background: northfern.colors.surface,
                border: `1px solid ${alpha(northfern.colors.fg, 0.07)}`,
              }}
            >
              <Stat value={4.6} decimals={2} suffix="% APY" label="Earned on every balance" rolling start={30} duration={50} size={92} accent />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  </BrandProvider>
);

// 5 · feature cards (dev tool)
const Features: React.FC = () => (
  <BrandProvider brand={shellpine}>
    <AbsoluteFill style={{background: shellpine.colors.bg, justifyContent: 'center', alignItems: 'center', gap: 64, flexDirection: 'column'}}>
      <Heading text="Every branch gets a preview." size={72} style={{alignItems: 'center'}} />
      <FeatureCards
        start={10}
        highlight={0}
        items={[
          {icon: 'bolt', title: 'Live in 40 seconds', body: 'Push a branch, get a URL before the review request lands.'},
          {icon: 'lock', title: 'Private by default', body: 'Previews sit behind your team login. Share links expire.'},
          {icon: 'code', title: 'Logs next to the diff', body: 'Build output and runtime errors in the pull request.'},
        ]}
      />
    </AbsoluteFill>
  </BrandProvider>
);

// 6 · proof in 9:16: stats + testimonial (dark AI tool)
const Proof: React.FC = () => (
  <BrandProvider brand={lumenfold}>
    <AbsoluteFill>
      <DesktopBackdrop blobs={3} intensity={0.6} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 90}}>
        <StatRow
          start={4}
          stats={[
            {value: 11, suffix: ' h', label: 'saved per person, per week', align: 'center'},
            {value: 2400, label: 'teams in the beta', align: 'center'},
          ]}
          style={{width: 860}}
        />
        <Testimonial
          start={30}
          stars
          quote="It reads the thread, drafts the reply and files the ticket. I just say yes."
          name="Dana Okafor"
          role="Head of Support, Brightwell"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  </BrandProvider>
);

export const showcase = [
  {id: 'components-desktop-chat', component: DesktopChat, durationInFrames: 160, fps: 30, width: 1920, height: 1080},
  {id: 'components-browser', component: BrowserPage, durationInFrames: 150, fps: 30, width: 1920, height: 1080},
  {id: 'components-phone', component: PhonePlan, durationInFrames: 150, fps: 30, width: 1080, height: 1920},
  {id: 'components-charts', component: Charts, durationInFrames: 120, fps: 30, width: 1920, height: 1080},
  {id: 'components-features', component: Features, durationInFrames: 100, fps: 30, width: 1920, height: 1080},
  {id: 'components-proof', component: Proof, durationInFrames: 140, fps: 30, width: 1080, height: 1920},
];
