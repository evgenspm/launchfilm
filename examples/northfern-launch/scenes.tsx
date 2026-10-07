// The film's own scenes (film.json `scene` names). Built-ins (title, statement, caption, logo, blank) need no code.
// Every scene moves: a slow push, a counter, a chart drawing on. Frames are local to the shot.
import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import type {Scene} from '../../src/film/types';
import {useBrand} from '../../src/brand/BrandProvider';
import {KenBurns} from '../../src/presets/camera';
import {BrandBackdrop} from '../../src/presets/look';
import {Counter, FeatureCards, LineChart, PhoneFrame, Stat, phoneSafeTop} from '../../src/components';

/** A phone with the balance counting up and the growth line drawing on, plus a stat: side by side in wide frames,
 *  stacked (stat on top) in tall ones. The bottom band stays clear for subtitles. */
const Growth: Scene = ({f, wide}) => {
  const b = useBrand();
  const {height} = useVideoConfig();
  const phoneH = wide ? height * 0.66 : height * 0.5;
  const phoneW = phoneH * 0.4615;
  const stat = (
    <Stat value={4.1} decimals={1} suffix="%" label="average yearly growth" delta={{text: 'since you joined', direction: 'up'}} start={20} size={wide ? 140 : 110} accent align={wide ? 'left' : 'center'} />
  );
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.18} x={wide ? 0.38 : 0.5} y={0.42} />
      <KenBurns from={1} to={1.04}>
        <AbsoluteFill
          style={{
            flexDirection: wide ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: wide ? 140 : 56,
            // keep the subtitle band free: content is centred in the top part of the frame
            paddingBottom: wide ? height * 0.16 : height * 0.24,
          }}
        >
          {wide ? null : stat}
          <PhoneFrame height={phoneH} time="7:02" float={6} enterAt={0}>
            <div style={{padding: `${phoneSafeTop(phoneH) + 24}px 28px 0`, display: 'flex', flexDirection: 'column', gap: 18}}>
              <div style={{fontFamily: b.font.text, fontSize: 22, color: b.colors.muted}}>Total saved</div>
              <Counter from={11240} to={12480} start={6} duration={70} prefix="$" fontSize={64} font="display" />
              <LineChart data={[3, 4, 3.6, 5.2, 5, 6.4, 7.1, 8.4]} width={phoneW - 56} height={phoneH * 0.32} start={12} duration={50} area valueLabel={false} gridLines={0} />
              <div style={{fontFamily: b.font.mono, fontSize: 18, color: b.colors.accent, opacity: interpolate(f, [60, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                +$38 overnight
              </div>
            </div>
          </PhoneFrame>
          {wide ? stat : null}
        </AbsoluteFill>
      </KenBurns>
    </AbsoluteFill>
  );
};

/** Three feature cards cascading in. */
const Features: Scene = () => (
  <AbsoluteFill>
    <BrandBackdrop glow={0.1} />
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <FeatureCards
        start={4}
        highlight={2}
        items={[
          {icon: 'layers', title: 'Round-ups', body: 'Spare change from every card payment.'},
          {icon: 'clock', title: 'Payday rules', body: 'A set share moves the day you get paid.'},
          {icon: 'chart', title: 'Goals', body: 'See the date you hit it, updated nightly.'},
        ]}
      />
    </AbsoluteFill>
  </AbsoluteFill>
);

export const SCENES = {growth: Growth, features: Features};
