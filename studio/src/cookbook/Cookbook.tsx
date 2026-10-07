// The reference film: core presets rendered once, in order, with a label naming the code on screen, so an agent can
// study the frames next to the source. 1920×1080 · 30 fps. `npx remotion still Cookbook --frame=<n>` for any section.
import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider, useBrand} from '../brand/BrandProvider';
import {DEMO_BRANDS} from '../brand/demo';
import {alpha} from '../brand/color';
import {Camera, FocusCamera, FrameInFrame, KenBurns, ZoomThrough, type FocusKey} from '../presets/camera';
import {Caption, Highlighter, QuietClose, Scatter, StackedRoll, VOTypewriter, WordReveal, useTypewriter} from '../presets/text';
import {StatementSequence, WordSwap, FieldType} from '../presets/statement';
import {BlockResolve, BrandBackdrop, FilmLook, Flash, RGBSplit, Scanlines, Scrim, SliceGlitch, Surface} from '../presets/look';
import {Cursor} from '../presets/cursor';
import {beatGrid} from '../presets/timing';
import {Film} from '../film/Film';
import type {FilmSpec} from '../film/types';
import {sampleBeats, sampleWords} from './sample';

const Label: React.FC<{n: number; text: string}> = ({n, text}) => {
  const b = useBrand();
  return (
    <div style={{position: 'absolute', left: 40, top: 32, fontFamily: b.font.mono, fontSize: 20, letterSpacing: '0.06em', color: alpha(b.colors.fg, 0.55), zIndex: 10}}>
      {String(n).padStart(2, '0')} · {text}
    </div>
  );
};

// 1 · hook: typing in a clean field that explodes on a flash
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const {typed, caretOn} = useTypewriter('Launch film in one prompt', 6, 22, 'hook');
  const explodeAt = 54;
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.12} />
      {frame < explodeAt ? (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <Surface style={{padding: '26px 38px', minWidth: 760}}>
            <div style={{fontFamily: b.font.text, fontSize: 42, color: b.colors.fg, fontWeight: 500}}>
              {typed}
              <span style={{opacity: caretOn ? 1 : 0, color: b.colors.accent}}>|</span>
            </div>
          </Surface>
        </AbsoluteFill>
      ) : (
        <Scatter text="Launch film in one prompt" mode="explode" startFrame={explodeAt} durationInFrames={15} />
      )}
      <Flash atFrame={explodeAt} frames={3} />
    </AbsoluteFill>
  );
};

// 2 · hero caption pulsing on the beat, RGB split, scanlines, film look
const HeroCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const grid = beatGrid(sampleBeats, fps);
  return (
    <AbsoluteFill>
      <KenBurns from={1} to={1.06}>
        <BrandBackdrop glow={0.35} y={0.5} />
      </KenBurns>
      <RGBSplit amount={2} glitch every={4}>
        <Caption pulse={grid.pulse(frame)} scrim>
          SHIP IT
        </Caption>
      </RGBSplit>
      <Scanlines />
      <FilmLook grain={0.12} vignette={0.35} />
    </AbsoluteFill>
  );
};

// 3 · frame-in-frame with a sliding caption
const FrameCard: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill>
      <FrameInFrame width={460} height={720}>
        <KenBurns from={1.1} to={1.2}>
          <AbsoluteFill style={{background: `linear-gradient(160deg, ${b.colors.accent}, ${b.colors.accent2})`}} />
        </KenBurns>
      </FrameInFrame>
      <Caption enter="slide" style={{fontSize: 76, fontWeight: 700}}>
        Before it had a name
      </Caption>
    </AbsoluteFill>
  );
};

// 4 · rolling type cylinder
const Roll: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0} />
    <StackedRoll text="Every frame moves" />
  </AbsoluteFill>
);

// 5 · word blur reveal
const Words: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.08} />
    <WordReveal text="A launch film is a promise you can watch in thirty seconds." />
  </AbsoluteFill>
);

// 6 · highlighter behind the key word
const Marker: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <BrandBackdrop glow={0} />
      <div style={{fontFamily: b.font.display, fontSize: 64, fontWeight: 600, color: b.colors.fg, maxWidth: '72%', lineHeight: 1.3, textAlign: 'center', position: 'relative'}}>
        Most launch videos explain. Good ones{' '}
        <span style={{whiteSpace: 'nowrap'}}>
          <Highlighter startFrame={12}>show</Highlighter>.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// 7 · VO-synced typewriter caption
const VOType: React.FC = () => (
  <AbsoluteFill>
    <KenBurns from={1} to={1.05} dx={-10}>
      <BrandBackdrop glow={0.22} x={0.3} />
    </KenBurns>
    <Scrim direction="center" amount={0.25} />
    <VOTypewriter words={sampleWords} />
    <FilmLook grain={0.1} vignette={0.3} />
  </AbsoluteFill>
);

// 8 · product: camera tiers + cursor + typing + chart bars
const Product: React.FC = () => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const {typed, caretOn} = useTypewriter('Which plan converts best this month?', 40, 20, 'q');
  const bars = [0.42, 0.55, 0.5, 0.62, 0.58, 0.7, 0.66, 0.84];
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.1} />
      <Camera keyframes={[{frame: 0, tier: 'establishing'}, {frame: 30, tier: 'region'}, {frame: 120, scale: 1.3, y: -40}, {frame: 200, tier: 'establishing', y: 0}]}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <Surface style={{width: 1180, padding: 40}}>
            <div style={{fontFamily: b.font.display, fontSize: 32, fontWeight: 600, color: b.colors.fg, marginBottom: 22}}>Good morning, Dana</div>
            <Surface background={b.colors.bg} style={{padding: '18px 22px', boxShadow: 'none'}}>
              <div style={{fontFamily: b.font.text, fontSize: 24, color: b.colors.fg, minHeight: 32}}>
                {typed || <span style={{color: b.colors.muted}}>Ask anything…</span>}
                <span style={{opacity: typed && caretOn ? 1 : 0, color: b.colors.accent}}>|</span>
              </div>
            </Surface>
            <div style={{display: 'flex', gap: 14, alignItems: 'flex-end', height: 200, marginTop: 34, padding: '0 10px'}}>
              {bars.map((h, i) => {
                const p = interpolate(frame, [130 + i * 2, 130 + i * 2 + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                return <div key={i} style={{flex: 1, height: `${h * 100}%`, transformOrigin: 'bottom', transform: `scaleY(${p})`, background: i === bars.length - 1 ? b.colors.accent : alpha(b.colors.muted, 0.35), borderRadius: 6}} />;
              })}
            </div>
          </Surface>
        </AbsoluteFill>
        <Cursor keyframes={[{frame: 0, x: 1500, y: 900}, {frame: 30, x: 700, y: 520, click: true}, {frame: 140, x: 1260, y: 760}, {frame: 170, x: 1260, y: 760, click: true}]} />
      </Camera>
    </AbsoluteFill>
  );
};

// 9 · statement sequence (blur-drop entrances, scale creep, 5 fr exits)
const Statements: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.08} />
    <StatementSequence
      statements={[
        {eyebrow: 'Introducing', text: 'Lumenfold.', hold: 26},
        {text: 'Quietly capable.', hold: 22},
        {text: 'Ready today.', emphasis: {words: ['today.'], mode: 'accent', at: 10}, hold: 28},
      ]}
    />
  </AbsoluteFill>
);

// 10 · word swap with re-flow
const Swap: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.08} />
    <WordSwap before="Built for" words={['founders', 'designers', 'teams']} after="." at={[34, 60]} mode="slot" />
  </AbsoluteFill>
);

// 11 · typing field with a wipe and a submit
const Field: React.FC = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.08} />
    <FieldType script={[{type: 'Summarize this week'}, {wait: 10}, {wipe: 8}, {type: 'Draft the launch post'}, {wait: 6}, {submit: 10}]} startFrame={8} label="Prompt" placeholder="Ask anything" />
  </AbsoluteFill>
);

// 12 · zoom-through into a quiet close, a slice glitch on the hit
const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const b = useBrand();
  return (
    <AbsoluteFill>
      <QuietClose text="made for the people who ship" startFrame={24} cps={30} />
      <ZoomThrough startFrame={0} durationInFrames={22}>
        <AbsoluteFill style={{background: b.colors.bg, justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: 300, height: 300, borderRadius: 150, border: `40px solid ${b.colors.accent}`, boxShadow: `0 0 60px ${alpha(b.colors.accent, 0.5)}`}} />
        </AbsoluteFill>
      </ZoomThrough>
      <SliceGlitch active={frame >= 20 && frame < 24}>
        <AbsoluteFill />
      </SliceGlitch>
    </AbsoluteFill>
  );
};

// 13 · static → resolve
const Resolve: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill>
      <BlockResolve durationInFrames={20} tones={[b.colors.bg, b.colors.surface, b.colors.muted]}>
        <KenBurns from={1} to={1.06}>
          <BrandBackdrop glow={0.3} />
        </KenBurns>
      </BlockResolve>
      <Sequence from={12}>
        <Caption enter="block" style={{fontWeight: 600, fontSize: 140}}>
          Signal, not noise
        </Caption>
      </Sequence>
    </AbsoluteFill>
  );
};

// 14 · FocusCamera over a fixed-size stage: full → region → element → full, recomposed per aspect
const STAGE = {w: 1600, h: 1000};
const FocusStage: React.FC = () => {
  const b = useBrand();
  const keys: FocusKey[] = [
    {frame: 0, focus: 'full'},
    {frame: 30, focus: [80, 140, 700, 420]},
    {frame: 75, focus: [860, 600, 360, 220], pad: 0.12},
    {frame: 120, focus: 'full'},
  ];
  const card = (x: number, y: number, w: number, h: number, title: string, accent = false) => (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: b.radius, background: accent ? b.colors.accent : b.colors.bg, border: `1px solid ${alpha(b.colors.muted, 0.25)}`, padding: 28, boxSizing: 'border-box'}}>
      <div style={{fontFamily: b.font.text, fontSize: 26, fontWeight: 600, color: accent ? b.colors.bg : b.colors.fg}}>{title}</div>
    </div>
  );
  return (
    <FocusCamera keys={keys} stage={STAGE}>
      <AbsoluteFill style={{background: b.colors.surface}}>
        {card(80, 140, 700, 420, 'Weekly active')}
        {card(820, 140, 700, 420, 'Retention')}
        {card(80, 600, 740, 300, 'Top sources')}
        {card(860, 600, 360, 220, 'Conversion 4.8%', true)}
        {card(1240, 600, 280, 300, 'Goals')}
      </AbsoluteFill>
    </FocusCamera>
  );
};

// 15 · the film engine: one shot per transition id, built-in scenes only
const TRANSITION_FILM: FilmSpec = {
  id: 'cookbook-transitions',
  fps: 30,
  aspects: ['16:9'],
  shots: [
    {scene: 'caption', dur: 1.1, props: {text: 'hard-cut'}},
    {scene: 'caption', dur: 1.1, transition: 'blur-dissolve', props: {text: 'blur-dissolve'}},
    {scene: 'caption', dur: 1.1, transition: 'slide-push', props: {text: 'slide-push'}},
    {scene: 'caption', dur: 1.1, transition: 'mask-wipe', transitionOpts: {shape: 'circle'}, props: {text: 'mask-wipe'}},
    {scene: 'caption', dur: 1.1, transition: 'zoom-through', props: {text: 'zoom-through'}},
    {scene: 'caption', dur: 1.1, transition: 'portal', props: {text: 'portal'}},
    {scene: 'caption', dur: 1.1, transition: 'flash', props: {text: 'flash'}},
    {scene: 'caption', dur: 1.1, transition: 'glitch-cut', props: {text: 'glitch-cut'}},
    {scene: 'caption', dur: 1.1, transition: 'smash-cut-black', props: {text: 'smash-cut-black'}},
  ],
};
const Transitions: React.FC = () => <Film film={TRANSITION_FILM} aspect="16:9" />;

const SECTIONS: {name: string; frames: number; C: React.FC}[] = [
  {name: 'Typewriter → Scatter explode + Flash', frames: 75, C: Hook},
  {name: 'Caption + beatGrid.pulse + RGBSplit + Scanlines + FilmLook', frames: 60, C: HeroCaption},
  {name: 'FrameInFrame + Caption slide', frames: 60, C: FrameCard},
  {name: 'StackedRoll', frames: 60, C: Roll},
  {name: 'WordReveal', frames: 75, C: Words},
  {name: 'Highlighter', frames: 60, C: Marker},
  {name: 'VOTypewriter (word timings)', frames: 135, C: VOType},
  {name: 'Camera tiers + Cursor + useTypewriter', frames: 240, C: Product},
  {name: 'StatementSequence', frames: 150, C: Statements},
  {name: 'WordSwap (slot)', frames: 100, C: Swap},
  {name: 'FieldType', frames: 130, C: Field},
  {name: 'ZoomThrough → QuietClose + SliceGlitch', frames: 90, C: Close},
  {name: 'BlockResolve + Caption', frames: 60, C: Resolve},
  {name: 'FocusCamera (stage rects)', frames: 160, C: FocusStage},
  {name: 'Film engine: every transition id', frames: 300, C: Transitions},
];

export const COOKBOOK_FRAMES = SECTIONS.reduce((a, s) => a + s.frames, 0);

/** Frame where section n (1-based) starts: handy for `remotion still Cookbook --frame`. */
export const cookbookSectionStart = (n: number) => SECTIONS.slice(0, n - 1).reduce((a, s) => a + s.frames, 0);

export const Cookbook: React.FC = () => {
  let from = 0;
  return (
    <BrandProvider brand={DEMO_BRANDS.lumenfold}>
      <AbsoluteFill style={{background: '#000'}}>
        {SECTIONS.map((s, i) => {
          const el = (
            <Sequence key={i} from={from} durationInFrames={s.frames} name={`${i + 1} ${s.name}`}>
              <s.C />
              <Label n={i + 1} text={s.name} />
            </Sequence>
          );
          from += s.frames;
          return el;
        })}
      </AbsoluteFill>
    </BrandProvider>
  );
};
