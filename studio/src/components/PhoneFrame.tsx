// A drawn, generic phone: rounded slab, side buttons, a punch-hole camera, a status bar and a screen slot.
// Not any vendor's hardware. Height defaults to fit the frame; `tilt` leans it in 3D, `float` bobs it gently.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha} from '../brand/color';
import {springs} from '../presets/springs';

export type PhoneFrameProps = {
  /** phone height in px; default fits the frame (≈ 82 % of the short dimension in 16:9, 72 % of height in 9:16) */
  height?: number;
  /** status bar clock text */
  time?: string;
  /** body colour; default near-black in dark brands, graphite in light ones */
  body?: string;
  /** screen background; default brand bg */
  screen?: string;
  /** status bar glyph colour; default brand fg */
  statusColor?: string;
  statusBar?: boolean;
  /** lean in 3D, degrees */
  tilt?: {x?: number; y?: number; z?: number};
  /** gentle bob amplitude in px (0 = still); deterministic sine on the frame */
  float?: number;
  enterAt?: number | false;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Width / height of the slab (19.5:9 class). */
export const PHONE_ASPECT = 0.4615;

const Signal: React.FC<{color: string; s: number}> = ({color, s}) => (
  <svg width={18 * s} height={12 * s} viewBox="0 0 18 12" style={{display: 'block'}}>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 4.6} y={9 - i * 3} width={3.2} height={3 + i * 3} rx={1} fill={color} />
    ))}
  </svg>
);

const Battery: React.FC<{color: string; s: number}> = ({color, s}) => (
  <svg width={27 * s} height={13 * s} viewBox="0 0 27 13" style={{display: 'block'}}>
    <rect x={0.75} y={0.75} width={22.5} height={11.5} rx={3.2} fill="none" stroke={color} strokeOpacity={0.45} strokeWidth={1.5} />
    <rect x={2.6} y={2.6} width={16} height={7.8} rx={1.8} fill={color} />
    <rect x={24.4} y={4.2} width={1.8} height={4.6} rx={0.9} fill={color} fillOpacity={0.45} />
  </svg>
);

export const PhoneFrame: React.FC<PhoneFrameProps> = ({height, time = '9:41', body, screen, statusColor, statusBar = true, tilt, float = 0, enterAt = false, style, children}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const b = useBrand();
  const h = height ?? Math.round(H > W ? H * 0.72 : Math.min(H * 0.82, W * 0.82 / PHONE_ASPECT));
  const w = Math.round(h * PHONE_ASPECT);
  const s = w / 400; // design unit: a 400 px wide phone
  const bezel = 13 * s;
  const R = 64 * s;
  const slab = body ?? (b.theme === 'dark' ? '#1B1B1F' : '#2A2B30');
  const sc = statusColor ?? b.colors.fg;
  const p = enterAt === false ? 1 : spring({frame: frame - enterAt, fps, config: springs.ui});
  const bob = float ? Math.sin((frame / fps) * Math.PI * 0.5) * float : 0;
  const rx = tilt?.x ?? 0;
  const ry = tilt?.y ?? 0;
  const rz = tilt?.z ?? 0;
  const transform = [
    tilt ? `perspective(${Math.round(h * 3)}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` : '',
    `translateY(${((1 - p) * 80 * s + bob).toFixed(2)}px)`,
    p < 0.999 ? `scale(${(0.94 + 0.06 * p).toFixed(4)})` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const button = (side: 'left' | 'right', top: number, len: number) => (
    <div
      style={{
        position: 'absolute',
        [side]: -3.5 * s,
        top: top * s,
        width: 4.5 * s,
        height: len * s,
        borderRadius: 3 * s,
        background: `linear-gradient(${side === 'left' ? 90 : 270}deg, ${slab}, #4A4B52)`,
      }}
    />
  );
  return (
    <div style={{position: 'relative', width: w, height: h, transform, opacity: Math.min(1, p * 1.5), ...style}}>
      {button('left', 150, 34)}
      {button('left', 205, 60)}
      {button('left', 278, 60)}
      {button('right', 230, 96)}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: R,
          background: slab,
          boxShadow: `0 ${40 * s}px ${110 * s}px rgba(0,0,0,${b.theme === 'dark' ? 0.6 : 0.28}), inset 0 0 0 ${1.5 * s}px rgba(255,255,255,0.14), inset 0 0 0 ${4 * s}px rgba(0,0,0,0.5)`,
        }}
      />
      <div style={{position: 'absolute', inset: bezel, borderRadius: R - bezel, overflow: 'hidden', background: screen ?? b.colors.bg}}>
        <div style={{position: 'absolute', inset: 0}}>{children}</div>
        {statusBar ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 54 * s,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${6 * s}px ${36 * s}px 0`,
              fontFamily: b.font.text,
              fontWeight: 600,
              fontSize: 17 * s,
              color: sc,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>{time}</span>
            <div style={{display: 'flex', alignItems: 'center', gap: 6 * s}}>
              <Signal color={sc} s={s} />
              <Battery color={sc} s={s} />
            </div>
          </div>
        ) : null}
        {/* punch-hole camera */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 17 * s,
            width: 22 * s,
            height: 22 * s,
            marginLeft: -11 * s,
            borderRadius: '50%',
            background: '#050506',
            boxShadow: `inset 0 0 0 ${3 * s}px #15161a, inset ${2 * s}px ${-2 * s}px ${4 * s}px ${alpha('#5A6BFF', 0.35)}`,
          }}
        />
      </div>
    </div>
  );
};

/** Safe top padding (px) for content inside a PhoneFrame of height h: clears the status bar. */
export const phoneSafeTop = (h: number) => Math.round(70 * ((h * PHONE_ASPECT) / 400));
