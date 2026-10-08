import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../../brand/BrandProvider';
import {alpha, mix} from '../../brand/color';
import {BrandMark} from '../../brand/Logo';
import {easings} from '../../presets/easings';

export type UiScreenCopy = {
  hero: string;
  heroAccent: string;
  signInTitle: string;
  uploadTitle: string;
  summaryTitle: string;
  quizQuestion: string;
  flashcard: string;
};

type ScreenKind = 'hero' | 'signin' | 'upload' | 'summary' | 'quiz' | 'flashcard';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const useDarkTokens = () => {
  const b = useBrand();
  const bg = b.theme === 'light' ? b.colors.fg : b.colors.bg;
  const fg = b.theme === 'light' ? b.colors.bg : b.colors.fg;
  return {
    b,
    bg,
    fg,
    surface: mix(bg, fg, 0.075),
    surface2: mix(bg, fg, 0.12),
    muted: mix(bg, fg, 0.48),
    rule: alpha(fg, 0.12),
  };
};

const Pill: React.FC<{children: React.ReactNode; active?: boolean}> = ({children, active}) => {
  const {b, fg, surface2, rule} = useDarkTokens();
  return <div style={{padding: '10px 18px', borderRadius: 999, background: active ? alpha(b.colors.accent, 0.24) : surface2, border: `1px solid ${active ? alpha(b.colors.accent, 0.7) : rule}`, color: active ? b.colors.accent : fg, fontSize: 18, fontWeight: 650}}>{children}</div>;
};

const TopBar: React.FC<{section: string}> = ({section}) => {
  const {b, fg, muted, rule} = useDarkTokens();
  return (
    <div style={{height: 74, display: 'flex', alignItems: 'center', gap: 24, borderBottom: `1px solid ${rule}`, padding: '0 34px'}}>
      <BrandMark brand={b} size={30} />
      <div style={{fontFamily: b.font.display, color: fg, fontWeight: 750, fontSize: 20}}>{b.name}</div>
      <div style={{marginLeft: 24, color: muted, fontSize: 15}}>OVERVIEW</div>
      <div style={{color: muted, fontSize: 15}}>REPORTS</div>
      <div style={{color: b.colors.accent, fontSize: 15, fontWeight: 700}}>{section.toUpperCase()}</div>
      <div style={{marginLeft: 'auto'}}><Pill active>OPEN APP</Pill></div>
    </div>
  );
};

const Lines: React.FC<{count?: number; wide?: boolean}> = ({count = 5, wide}) => {
  const {b, fg, muted, rule} = useDarkTokens();
  const signals = ['Activation cohort', 'Reports opened', 'Teams invited', 'Export completion', 'Time to value', 'Workspace return rate'];
  const values = ['+12.4%', '8,420', '+18.7%', '71%', '6m 14s', '64%'];
  return <div style={{display: 'grid', gap: wide ? 10 : 12}}>{signals.slice(0, count).map((label, i) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${rule}`, paddingBottom: 8, color: muted, fontSize: wide ? 15 : 16}}><span style={{width: 7, height: 7, borderRadius: 99, background: i % 2 ? b.colors.accent2 : b.colors.accent}} /><span>{label}</span><span style={{marginLeft: 'auto', color: fg, fontWeight: 720}}>{values[i]}</span></div>)}</div>;
};

const Button: React.FC<{children: React.ReactNode; pale?: boolean}> = ({children, pale}) => {
  const {b, bg, fg, surface2} = useDarkTokens();
  return <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 170, height: 52, padding: '0 28px', borderRadius: 999, background: pale ? fg : b.colors.accent, color: pale ? bg : b.theme === 'light' ? b.colors.bg : bg, fontSize: 15, fontWeight: 800, boxShadow: `0 14px 40px ${alpha(pale ? surface2 : b.colors.accent, 0.2)}`}}>{children}</div>;
};

const Panel: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => {
  const {surface, rule} = useDarkTokens();
  return <div style={{background: surface, border: `1px solid ${rule}`, borderRadius: 22, boxShadow: `0 30px 90px ${alpha(surface, 0.72)}`, ...style}}>{children}</div>;
};

const Hero: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted} = useDarkTokens();
  return <div style={{display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 80, padding: '86px 140px 70px'}}>
    <div>
      <div style={{fontFamily: b.font.display, color: fg, fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.055em', fontWeight: 820, maxWidth: 790}}>{copy.hero}<br /><span style={{color: b.colors.accent}}>{copy.heroAccent}</span></div>
      <div style={{fontFamily: b.font.text, color: muted, fontSize: 24, lineHeight: 1.55, maxWidth: 700, marginTop: 38}}>Turn scattered product signals into a clear story your whole team can use.</div>
      <div style={{display: 'flex', gap: 18, marginTop: 42}}><Button>START EXPLORING</Button><Pill>VIEW A SAMPLE</Pill></div>
    </div>
    <Panel style={{alignSelf: 'center', padding: 34, transform: 'translateY(36px) rotate(1deg)'}}>
      <div style={{color: b.colors.accent2, fontSize: 15, fontWeight: 800}}>WEEKLY SIGNAL</div>
      <div style={{color: fg, fontSize: 30, fontWeight: 760, marginTop: 18}}>Activation moved up.</div>
      <div style={{marginTop: 28}}><Lines count={4} wide /></div>
      <div style={{height: 8, borderRadius: 8, background: b.colors.accent2, width: '68%', marginTop: 32}} />
    </Panel>
  </div>;
};

const SignIn: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted, surface2, rule} = useDarkTokens();
  return <div style={{display: 'flex', justifyContent: 'center', paddingTop: 88}}><Panel style={{width: 540, padding: '48px 54px'}}>
    <div style={{textAlign: 'center', color: fg, fontSize: 36, fontWeight: 820}}>{copy.signInTitle}</div>
    <div style={{textAlign: 'center', color: muted, fontSize: 17, marginTop: 10}}>Continue to your workspace</div>
    <div style={{height: 54, borderRadius: 999, background: surface2, border: `1px solid ${rule}`, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32, fontWeight: 700}}>Continue with your provider</div>
    {['WORK EMAIL', 'PASSWORD'].map((x) => <div key={x} style={{marginTop: 24}}><div style={{fontSize: 13, color: muted, marginBottom: 9}}>{x}</div><div style={{height: 52, borderRadius: 12, border: `1px solid ${rule}`, background: surface2}} /></div>)}
    <div style={{marginTop: 30}}><Button>CONTINUE</Button></div>
    <div style={{textAlign: 'center', color: b.colors.accent2, marginTop: 22, fontSize: 14}}>Create a free workspace</div>
  </Panel></div>;
};

const Upload: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted, surface, rule} = useDarkTokens();
  return <div style={{padding: '48px 70px'}}>
    <div style={{fontSize: 14, letterSpacing: '.18em', color: b.colors.accent, fontWeight: 800}}>DATA INGESTION</div>
    <Panel style={{height: 540, marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{width: 68, height: 68, borderRadius: 22, background: alpha(b.colors.accent, 0.16), color: b.colors.accent, margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34}}>↑</div>
        <div style={{fontSize: 30, fontWeight: 780, color: fg}}>{copy.uploadTitle}</div>
        <div style={{fontSize: 17, color: muted, margin: '12px 0 28px'}}>CSV, JSON, event exports, and research notes</div>
        <Button pale>CHOOSE FILES</Button>
      </div>
    </Panel>
    <div style={{height: 1, background: rule, marginTop: 28}} /><div style={{color: muted, marginTop: 16}}>Encrypted in transit · Ready in under a minute</div>
  </div>;
};

const Summary: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted, surface2} = useDarkTokens();
  return <div style={{padding: '38px 64px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}><Pill active>SUMMARY</Pill><Pill>SEGMENTS</Pill><Pill>PATHS</Pill></div>
    <Panel style={{padding: 42, marginTop: 30}}>
      <div style={{color: b.colors.accent, fontWeight: 800, fontSize: 14}}>AI SUMMARY</div>
      <div style={{fontSize: 34, color: fg, fontWeight: 800, marginTop: 14}}>{copy.summaryTitle}</div>
      <div style={{color: muted, fontSize: 18, lineHeight: 1.5, marginTop: 16, maxWidth: 1000}}>Teams that reach the reporting view in their first session return more often and invite collaborators sooner.</div>
      <div style={{marginTop: 30}}><Lines count={6} wide /></div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 34}}>
        <div style={{height: 48, borderRadius: 14, background: alpha(b.colors.accent2, 0.2), color: b.colors.accent2, display: 'flex', alignItems: 'center', paddingLeft: 20, fontWeight: 720}}>Strong signal · collaborative workspaces</div>
        <div style={{height: 48, borderRadius: 14, background: surface2, color: muted, display: 'flex', alignItems: 'center', paddingLeft: 20}}>Watch next · export completion</div>
      </div>
    </Panel>
  </div>;
};

const Quiz: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted, surface2, rule} = useDarkTokens();
  return <div style={{padding: '52px 70px', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 38}}>
    <Panel style={{padding: 38}}><div style={{color: b.colors.accent2, fontSize: 14, fontWeight: 800}}>QUESTION 04 / 08</div><div style={{color: fg, fontSize: 38, lineHeight: 1.18, fontWeight: 800, marginTop: 30}}>{copy.quizQuestion}</div><div style={{marginTop: 52}}><Lines count={3} /></div></Panel>
    <div style={{display: 'grid', gap: 18}}>{['Compare first-session paths', 'Measure the reporting habit', 'Find the collaboration trigger'].map((x, i) => <Panel key={x} style={{padding: 28, display: 'flex', alignItems: 'center', gap: 18, background: i === 1 ? alpha(b.colors.accent2, 0.13) : surface2, borderColor: i === 1 ? b.colors.accent2 : rule}}><div style={{width: 28, height: 28, borderRadius: 999, border: `2px solid ${i === 1 ? b.colors.accent2 : rule}`}} /><div style={{color: i === 1 ? fg : muted, fontSize: 20, fontWeight: 700}}>{x}</div></Panel>)}</div>
  </div>;
};

const Flashcard: React.FC<{copy: UiScreenCopy}> = ({copy}) => {
  const {b, fg, muted} = useDarkTokens();
  return <div style={{padding: '34px 64px'}}>
    <div style={{display: 'flex', gap: 10, justifyContent: 'center'}}>{Array.from({length: 9}).map((_, i) => <div key={i} style={{width: 38, height: 8, borderRadius: 8, background: i < 5 ? b.colors.accent2 : alpha(fg, 0.12)}} />)}</div>
    <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24}}><Pill active>INSIGHT</Pill><Pill>EXAMPLE</Pill><Pill>ACTION</Pill></div>
    <Panel style={{width: 1220, minHeight: 470, margin: '42px auto 0', padding: 62, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{color: muted, fontSize: 14, letterSpacing: '.15em'}}>CARD 05</div>
      <div style={{color: fg, fontSize: 44, lineHeight: 1.3, fontWeight: 720, marginTop: 24}}>{copy.flashcard}</div>
      <div style={{marginTop: 44}}><Button>REVEAL DETAIL</Button></div>
    </Panel>
  </div>;
};

const Screen: React.FC<{kind: ScreenKind; copy: UiScreenCopy}> = ({kind, copy}) => <>{kind === 'hero' ? <Hero copy={copy} /> : kind === 'signin' ? <SignIn copy={copy} /> : kind === 'upload' ? <Upload copy={copy} /> : kind === 'summary' ? <Summary copy={copy} /> : kind === 'quiz' ? <Quiz copy={copy} /> : <Flashcard copy={copy} />}</>;

export const TiltPlane: React.FC<{kind: ScreenKind; copy: UiScreenCopy; localFrame: number; duration: number; direction: number}> = ({kind, copy, localFrame, duration, direction}) => {
  const {b, bg, rule} = useDarkTokens();
  const {width, height} = useVideoConfig();
  const enter = interpolate(localFrame, [0, Math.min(14, duration * 0.2)], [0, 1], {...clamp, easing: easings.outExpo});
  const travel = interpolate(localFrame, [0, duration], [0, 1], {...clamp, easing: kind === 'flashcard' ? easings.linear : easings.inOutSine});
  const x = direction * (1 - enter) * width * 0.42 + direction * travel * width * 0.045;
  const y = (1 - enter) * height * 0.1 - travel * height * 0.02;
  const scale = 0.94 + enter * 0.06 + travel * (kind === 'hero' ? 0.1 : 0.025) + (kind === 'flashcard' ? 0.08 : 0);
  return <AbsoluteFill style={{background: bg, perspective: width * 1.35, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: '50%', top: '50%', width: width * 1.12, height: height * 1.04, transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotateX(5.5deg) rotateY(-7deg) rotateZ(2.2deg) scale(${scale})`, transformOrigin: '50% 50%', background: bg, border: `1px solid ${rule}`, borderRadius: b.radius * 1.5, overflow: 'hidden', boxShadow: `0 60px 180px ${alpha(bg, 0.9)}`, fontFamily: b.font.text}}>
      <TopBar section={kind} /><Screen kind={kind} copy={copy} />
    </div>
  </AbsoluteFill>;
};

export type ResourceCardCopy = {title: string; meta: string}[];

const ResourceVisual: React.FC<{index: number}> = ({index}) => {
  const {b, bg, fg, muted, rule} = useDarkTokens();
  const bars = index % 2 === 0 ? [42, 68, 54, 83, 72, 94] : [76, 48, 88, 61, 96, 79];
  return <div style={{width: '78%', display: 'grid', gap: 16, color: fg}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}><BrandMark brand={b} size={30} /><span style={{fontSize: 14, fontWeight: 800, letterSpacing: '.12em'}}>{index % 2 ? 'COHORT REPORT' : 'JOURNEY SIGNALS'}</span><span style={{marginLeft: 'auto', color: muted, fontSize: 13}}>LAST 30 DAYS</span></div>
    <div style={{display: 'flex', alignItems: 'end', gap: 10, height: 92, padding: '0 12px', borderLeft: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`}}>{bars.map((value, i) => <div key={`${index}-${i}`} style={{height: `${value}%`, flex: 1, borderRadius: '7px 7px 0 0', background: i === bars.length - 1 ? b.colors.accent2 : alpha(b.colors.accent, 0.76 - i * 0.06)}} />)}</div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10}}>{[['Active', '8.4k'], ['Return', '64%'], ['Lift', '+12%']].map(([label, value]) => <div key={label} style={{background: alpha(bg, 0.72), border: `1px solid ${rule}`, borderRadius: 10, padding: '9px 11px'}}><div style={{fontSize: 11, color: muted}}>{label}</div><div style={{fontSize: 18, fontWeight: 800, marginTop: 3}}>{value}</div></div>)}</div>
  </div>;
};

export const LearningResourceGrid: React.FC<{cards: ResourceCardCopy; localFrame: number; duration: number}> = ({cards, localFrame, duration}) => {
  const {b, bg, fg, muted, surface, rule} = useDarkTokens();
  const {width, height} = useVideoConfig();
  const drift = interpolate(localFrame, [0, duration], [0, -height * 0.045], {...clamp, easing: easings.inOutSine});
  return <AbsoluteFill style={{background: bg, perspective: width * 1.2, overflow: 'hidden'}}><div style={{position: 'absolute', inset: '-7% -4%', display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 24, transform: `translateY(${drift}px) rotateX(4deg) rotateY(-5deg) rotateZ(2deg) scale(1.02)`, fontFamily: b.font.text}}>
    {cards.map((card, i) => <Panel key={card.title} style={{minHeight: i < 2 ? 380 : 300, overflow: 'hidden', borderColor: rule, background: surface}}>
      <div style={{height: i < 2 ? 210 : 165, background: `linear-gradient(135deg, ${alpha(i % 2 ? b.colors.accent2 : b.colors.accent, 0.42)}, ${bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ResourceVisual index={i} /></div>
      <div style={{padding: 26}}><div style={{fontSize: 25, color: fg, fontWeight: 780}}>{card.title}</div><div style={{fontSize: 16, color: muted, marginTop: 10}}>{card.meta}</div><div style={{height: 44, borderRadius: 999, background: b.colors.accent, marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.theme === 'light' ? b.colors.bg : bg, fontWeight: 800}}>OPEN GUIDE</div></div>
    </Panel>)}
  </div></AbsoluteFill>;
};

export const DarkStage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {b, bg} = useDarkTokens();
  return <AbsoluteFill style={{background: bg, fontFamily: b.font.display, overflow: 'hidden'}}>{children}</AbsoluteFill>;
};
