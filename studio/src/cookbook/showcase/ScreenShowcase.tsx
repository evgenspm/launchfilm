// Showcase of the screen family (presets/screen): laptop reveal with a push-in, a tilted UI plane with a truck + DOF,
// and a rack focus between depth layers. The UI on the screens is a tiny invented dashboard drawn from the brand.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BrandProvider, useBrand} from '../../brand/BrandProvider';
import {alpha} from '../../brand/color';
import {DEMO_BRANDS} from '../../brand/demo';
import {BrandBackdrop} from '../../presets/look';
import {LAPTOP_DISPLAY, LaptopReveal, RackFocus, ScreenSlot, TiltPlane, screenEasings} from '../../presets/screen';

/** A small dashboard authored at LAPTOP_DISPLAY size (1512×982), coloured from the brand. */
const MiniDashboard: React.FC<{title: string; stats: {label: string; value: string}[]; bars: number[]}> = ({title, stats, bars}) => {
  const b = useBrand();
  const c = b.colors;
  const line = alpha(c.muted, 0.25);
  return (
    <div style={{position: 'absolute', inset: 0, background: c.bg, display: 'flex', fontFamily: b.font.text, color: c.fg}}>
      <div style={{width: 220, borderRight: `1px solid ${line}`, padding: '34px 22px', display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{fontFamily: b.font.display, fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', marginBottom: 18}}>{b.name}</div>
        {['Overview', 'Reports', 'Accounts', 'Settings'].map((x, i) => (
          <div key={x} style={{fontSize: 17, padding: '10px 12px', borderRadius: 10, background: i === 0 ? alpha(c.accent, 0.14) : 'transparent', color: i === 0 ? c.fg : c.muted}}>
            {x}
          </div>
        ))}
      </div>
      <div style={{flex: 1, padding: '38px 44px', display: 'flex', flexDirection: 'column', gap: 28}}>
        <div style={{fontFamily: b.font.display, fontWeight: b.type.displayWeight, fontSize: 38, letterSpacing: `${b.type.displayTracking}em`}}>{title}</div>
        <div style={{display: 'flex', gap: 22}}>
          {stats.map((s) => (
            <div key={s.label} style={{flex: 1, background: c.surface, border: `1px solid ${line}`, borderRadius: b.radius, padding: '22px 24px'}}>
              <div style={{fontSize: 16, color: c.muted}}>{s.label}</div>
              <div style={{fontFamily: b.font.display, fontWeight: 700, fontSize: 40, marginTop: 8, letterSpacing: '-0.02em'}}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{flex: 1, background: c.surface, border: `1px solid ${line}`, borderRadius: b.radius, padding: '26px 30px', display: 'flex', alignItems: 'flex-end', gap: 16}}>
          {bars.map((h, i) => (
            <div key={i} style={{flex: 1, height: `${h * 100}%`, borderRadius: 6, background: i === bars.length - 1 ? c.accent : alpha(c.accent, 0.28)}} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LaptopShow: React.FC = () => (
  <BrandProvider brand={DEMO_BRANDS.northfern}>
    <LaptopReveal
      from={{yaw: -26, elevation: 15}}
      to={{yaw: -14, elevation: 11}}
      pushAt={96}
      pushFrames={54}
      supersample={2}
      screenContent={
        <ScreenSlot chrome="menubar">
          <MiniDashboard
            title="Good evening, Sam"
            stats={[
              {label: 'Saved this month', value: '$1,240'},
              {label: 'Round-ups', value: '$86.40'},
              {label: 'Goal progress', value: '72%'},
            ]}
            bars={[0.32, 0.4, 0.38, 0.52, 0.5, 0.61, 0.66, 0.74, 0.86]}
          />
        </ScreenSlot>
      }
    />
  </BrandProvider>
);

const TiltShow: React.FC = () => (
  <BrandProvider brand={DEMO_BRANDS.tallyfield}>
    <TiltPlane
      rotateX={[0, 38]}
      rotateZ={[0, -16]}
      scale={[0.84, 0.96]}
      tiltEase={screenEasings.tiltIn}
      tiltDuration={40}
      pan={[
        [-160, -40],
        [200, 60],
      ]}
      dof={{band: 0.2}}
      sweep={{at: 60, duration: 40}}
      haze={0.12}
    >
      <div style={{position: 'relative', width: LAPTOP_DISPLAY.w, height: LAPTOP_DISPLAY.h, borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 120px rgba(17,20,27,0.25)'}}>
        <MiniDashboard
          title="Activation, last 30 days"
          stats={[
            {label: 'New workspaces', value: '4,812'},
            {label: 'Activated', value: '61.4%'},
            {label: 'Median time to value', value: '11 min'},
          ]}
          bars={[0.42, 0.48, 0.45, 0.55, 0.58, 0.63, 0.6, 0.71, 0.78, 0.84]}
        />
      </div>
    </TiltPlane>
  </BrandProvider>
);

const InfoCard: React.FC<{children: React.ReactNode; w: number; x: number; y: number}> = ({children, w, x, y}) => {
  const b = useBrand();
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        padding: '26px 30px',
        borderRadius: b.radius,
        background: b.colors.surface,
        border: `1px solid ${alpha(b.colors.fg, 0.1)}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        fontFamily: b.font.text,
        color: b.colors.fg,
      }}
    >
      {children}
    </div>
  );
};

const RackShow: React.FC = () => {
  return (
    <BrandProvider brand={DEMO_BRANDS.lumenfold}>
      <BrandBackdrop glow={0.12} />
      <RackFocus
        from={0}
        to={1}
        start={30}
        duration={20}
        layers={[
          {
            depth: 0,
            node: (
              <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
                <div style={{transform: 'scale(0.82)', borderRadius: 20, overflow: 'hidden'}}>
                  <ScreenSlot chrome="window" label="YOUR APP" note="background layer" />
                </div>
              </AbsoluteFill>
            ),
          },
          {
            depth: 1,
            node: (
              <InfoCard w={560} x={1180} y={600}>
                <div style={{fontSize: 18, color: DEMO_BRANDS.lumenfold.colors.muted}}>Agent update</div>
                <div style={{fontSize: 30, fontWeight: 600, marginTop: 8, letterSpacing: '-0.02em'}}>Filed 12 expense reports</div>
              </InfoCard>
            ),
          },
        ]}
      />
    </BrandProvider>
  );
};

export const showcase = [
  {id: 'screen-laptop-reveal', component: LaptopShow, durationInFrames: 180, width: 1920, height: 1080},
  {id: 'screen-tilt-plane', component: TiltShow, durationInFrames: 150, width: 1920, height: 1080},
  {id: 'screen-rack-focus', component: RackShow, durationInFrames: 90, width: 1920, height: 1080},
];
