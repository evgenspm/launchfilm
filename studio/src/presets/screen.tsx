// Screen family: the swappable product placeholder and the staging around it (craft: product screen).
//
//   <ScreenSlot />                          accent placeholder; <ScreenSlot>{realUI}</ScreenSlot> swaps it (one line)
//   <TiltPlane rotateX={[0, 40]} …>         a flat screen leaned back in 3D: linear truck, DOF along the tilt, spot, sweep
//   <Dolly from={…} to={…} mode="flat|3d">  camera between two framings, arc-free (log zoom, straight target path)
//   <RackFocus layers={[…]} from to>        focus pull between depth layers
//   <LaptopFrame open yaw elevation screen push>  2.5D CSS laptop (drawn, no 3D model, no logos) with a ScreenSlot on the display
//   <LaptopReveal>                          the choreography: rise from dark → lid → screen on → push-in
//
// Numbers measured frame by frame from studied product films. Everything is a pure function of useCurrentFrame() and
// props; 1920×1080 and 1080×1920 both work (sizes default from useVideoConfig()). Colours and fonts default from the
// brand. Never inline spring configs: pass a name from springs.ts.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {easings} from './easings';
import {springs, type SpringName} from './springs';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix} from '../brand/color';

// ─────────────────────────────────────────────────────────────────────────────────────────────── numbers

/** Measured staging numbers (px/frame at 1920 wide, %/s). */
export const SCREEN_MEASURED = {
  /** constant-velocity truck across a tilted UI: 0.5–3.1 px/frame */
  truckPxPerFrame: {slow: 1.1, mid: 2.4, fast: 3.1},
  /** scale drift during a drift shot, per second: ±0.3–1.1 %/s typical, 1.8–5.5 %/s for a deliberate push */
  driftScalePerSec: {gentle: 0.004, typical: 0.009, push: 0.027, hard: 0.055},
  /** lean angles fitted on frames (perspective ≈ frame width): mild / side / extreme */
  tilt: {mild: {rotateX: 20}, side: {rotateX: 18, rotateY: -25, rotateZ: -6}, extreme: {rotateX: 45, rotateZ: -20}},
  /** focus band: middle third 3–12× sharper than the edges; ≈ 6–12 px blur at the edges at 1920 */
  dofEdgeBlurPx: {soft: 6, mid: 9, strong: 14, macroForeground: 18},
  /** UI shot lengths: 2.8–5.2 s average */
  shotSeconds: {action: 1.4, read: 3.5, hold: 5.2},
  /** opening fade-up from black: 0.5 s, 70 % in the first 0.33 s (ease-out) */
  fadeUpFrames: 15,
  /** lid open front-on: ≈ 20 frames ease-in-out; screen content visible once the lid passes ~75° */
  lidOpenFrames: 20,
  lidScreenOnDeg: 75,
} as const;

/** Easings this family adds (easings.ts stays the shared list). */
export const screenEasings = {
  /** leave a stopped camera quickly but smoothly, long settle: a tilt-in right after a landed push (no dead frames) */
  tiltIn: Easing.bezier(0.25, 0, 0.15, 1),
} as const;

/** A 14-inch laptop display in points; real UI for the slot is authored at this size. */
export const LAPTOP_DISPLAY = {w: 1512, h: 982, menuBar: 37} as const;

/** Typical overlay positions on that display, in display points. Scale with the slot. */
export const LAPTOP_SLOTS = {
  /** a pill / island at the top centre */
  island: {x: (1512 - 360) / 2, y: 0, w: 360, h: 40},
  /** a side panel docked to the right edge, below the top bar */
  sidePanel: {x: 1512 - 12 - 372, y: 37 + 12, w: 372, h: 982 - 37 - 24},
  /** a notification banner, top right */
  banner: {x: 1512 - 14 - 356, y: 37 + 10, w: 356, h: 74},
} as const;
export type LaptopSlotName = keyof typeof LAPTOP_SLOTS;

// ─────────────────────────────────────────────────────────────────────────────────────────────── helpers

/** A value or a [from, to] pair animated by the component's own progress. */
export type Anim = number | readonly [number, number];
const at = (a: Anim | undefined, t: number, fallback = 0) => (a === undefined ? fallback : typeof a === 'number' ? a : a[0] + (a[1] - a[0]) * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);
const rad = (d: number) => (d * Math.PI) / 180;
/** hex-safe mix (non-hex values pass through) */
const mx = (a: string, b: string, t: number) => (a.startsWith('#') && b.startsWith('#') ? mix(a, b, t) : t < 0.5 ? a : b);

type Ease = (t: number) => number;

/**
 * Start from rest, then constant velocity: accelerates over the first `a` of the shot, linear after (C1-continuous).
 * For a drift that begins on a match cut from a stopped camera; shots that cut in mid-motion use plain linear.
 */
export const easeInThenLinear =
  (a = 0.25): Ease =>
  (t) => {
    const x = clamp01(t);
    return x < a ? (x * x) / (2 * a * (1 - a / 2)) : (x - a / 2) / (1 - a / 2);
  };

/** Progress 0..1 over [start, start+duration] with an easing or a named spring. */
export const useShotProgress = (start = 0, duration?: number, ease: Ease = easings.linear, springName?: SpringName) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const dur = Math.max(1, duration ?? durationInFrames - start);
  if (springName) return spring({frame: frame - start, fps, config: springs[springName], durationInFrames: dur});
  return ease(clamp01((frame - start) / dur));
};

// 3D rotations with CSS conventions (x right, y down, z toward the viewer). CSS "A B C" applies C first.
type V3 = [number, number, number];
const rx = ([x, y, z]: V3, d: number): V3 => {
  const c = Math.cos(rad(d));
  const s = Math.sin(rad(d));
  return [x, y * c - z * s, y * s + z * c];
};
const ry = ([x, y, z]: V3, d: number): V3 => {
  const c = Math.cos(rad(d));
  const s = Math.sin(rad(d));
  return [x * c + z * s, y, -x * s + z * c];
};
const rz = ([x, y, z]: V3, d: number): V3 => {
  const c = Math.cos(rad(d));
  const s = Math.sin(rad(d));
  return [x * c - y * s, x * s + y * c, z];
};

/** Depth gradient of a plane under `rotateX(a) rotateY(b) rotateZ(c)`: z = gu·u + gv·v for a plane point (u, v). */
export const planeDepthGradient = (rotX: number, rotY: number, rotZ: number) => {
  const sx = Math.sin(rad(rotX));
  const cx = Math.cos(rad(rotX));
  const sy = Math.sin(rad(rotY));
  const sz = Math.sin(rad(rotZ));
  const cz = Math.cos(rad(rotZ));
  return {gu: sz * sx - cz * sy * cx, gv: cz * sx + sz * sy * cx};
};

const NOISE_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#n)'/></svg>`,
)}")`;

// ─────────────────────────────────────────────────────────────────────────────────────────────── ScreenSlot

export type ScreenSlotProps = {
  /** design size in px; real UI is laid out at this size. Default 1512×982 (LAPTOP_DISPLAY). */
  width?: number;
  height?: number;
  radius?: number;
  /** big centred label; false hides it */
  label?: string | false;
  /** small mono line under the label; false hides it */
  note?: string | false;
  /** 'menubar' = a desktop with a generic top bar; 'window' = an app window with three dots; 'none' = bare */
  chrome?: 'none' | 'menubar' | 'window';
  /** dashed markers where overlay UI goes (true = all) */
  showSlots?: boolean | LaptopSlotName[];
  /** real components for those positions (replace the markers) */
  island?: React.ReactNode;
  sidePanel?: React.ReactNode;
  banner?: React.ReactNode;
  /** grid cell in px (0 = no grid) */
  grid?: number;
  /** placeholder colour (default: brand accent) */
  color?: string;
  /** THE SWAP: pass the real UI here and it replaces the placeholder fill (chrome and slots stay). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const SlotMarker: React.FC<{name: LaptopSlotName; sx: number; sy: number; node?: React.ReactNode; mono: string}> = ({name, sx, sy, node, mono}) => {
  const r = LAPTOP_SLOTS[name];
  const box: React.CSSProperties = {position: 'absolute', left: r.x * sx, top: r.y * sy, width: r.w * sx, height: r.h * sy};
  if (node) return <div style={box}>{node}</div>;
  const label = {island: 'ISLAND', sidePanel: 'SIDE PANEL', banner: 'BANNER'}[name];
  const radius = name === 'island' ? `0 0 ${20 * sx}px ${20 * sx}px` : 14 * sx;
  return (
    <div
      style={{
        ...box,
        borderRadius: radius,
        border: `${Math.max(1, 1.5 * sx)}px dashed rgba(255,255,255,0.72)`,
        background: 'rgba(0,0,0,0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: name === 'island' ? 'none' : undefined,
      }}
    >
      <span style={{fontFamily: mono, fontSize: 11 * sx, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.85)'}}>{label}</span>
    </div>
  );
};

/** The placeholder screen: accent fill, a grid, registration corners, noise, a mono label. Pass `children` to swap in real UI. */
export const ScreenSlot: React.FC<ScreenSlotProps> = ({
  width = LAPTOP_DISPLAY.w,
  height = LAPTOP_DISPLAY.h,
  radius = 0,
  label = 'PRODUCT UI',
  note = 'screen slot · swap with real ui',
  chrome = 'none',
  showSlots = false,
  island,
  sidePanel,
  banner,
  grid = 56,
  color,
  children,
  style,
}) => {
  const b = useBrand();
  const fill = color ?? b.colors.accent;
  const sx = width / LAPTOP_DISPLAY.w;
  const sy = height / LAPTOP_DISPLAY.h;
  const u = Math.min(sx, sy);
  const top = chrome === 'menubar' ? LAPTOP_DISPLAY.menuBar * sy : chrome === 'window' ? 34 * u : 0;
  const slots: LaptopSlotName[] = showSlots === true ? ['island', 'sidePanel', 'banner'] : showSlots || [];
  const given: Partial<Record<LaptopSlotName, React.ReactNode>> = {island, sidePanel, banner};
  const all = Array.from(new Set<LaptopSlotName>([...slots, ...(Object.keys(given) as LaptopSlotName[]).filter((k) => given[k])]));
  const mark = 26 * u;
  const foot = alpha(mx(fill, '#000000', 0.6), 0.42);
  return (
    <div style={{position: 'relative', width, height, overflow: 'hidden', borderRadius: radius, background: children ? b.colors.bg : fill, ...style}}>
      {children ? (
        <div style={{position: 'absolute', left: 0, top, width, height: height - top}}>{children}</div>
      ) : (
        <>
          {/* light: a soft top-left bloom and a darker foot, so the flat fill reads as an emitting panel */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(120% 95% at 28% 0%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%), linear-gradient(180deg, rgba(0,0,0,0) 40%, ${foot} 100%)`,
            }}
          />
          {grid > 0 ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.9,
                backgroundImage: [
                  'linear-gradient(rgba(255,255,255,0.24) 1.5px, transparent 1.5px)',
                  'linear-gradient(90deg, rgba(255,255,255,0.24) 1.5px, transparent 1.5px)',
                  'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
                  'linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
                ].join(','),
                backgroundSize: `${grid * 4 * u}px ${grid * 4 * u}px, ${grid * 4 * u}px ${grid * 4 * u}px, ${grid * u}px ${grid * u}px, ${grid * u}px ${grid * u}px`,
                backgroundPosition: `${width / 2}px ${top + (height - top) / 2}px`,
              }}
            />
          ) : null}
          {/* registration corners: reads as a deliberate swap target, not a missing asset */}
          {[
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ].map(([cx, cy]) => (
            <div
              key={`${cx}${cy}`}
              style={
                {
                  position: 'absolute',
                  width: mark,
                  height: mark,
                  left: cx ? width - mark - 28 * u : 28 * u,
                  top: cy ? height - mark - 28 * u : top + 28 * u,
                  borderColor: 'rgba(255,255,255,0.8)',
                  borderStyle: 'solid',
                  borderWidth: 0,
                  [cy ? 'borderBottomWidth' : 'borderTopWidth']: Math.max(1, 2 * u),
                  [cx ? 'borderRightWidth' : 'borderLeftWidth']: Math.max(1, 2 * u),
                } as React.CSSProperties
              }
            />
          ))}
          {label || note ? (
            <div style={{position: 'absolute', left: 0, right: 0, top, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 * u}}>
              {label ? <div style={{fontFamily: b.font.mono, fontWeight: 500, fontSize: 34 * u, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.95)'}}>{label}</div> : null}
              {note ? <div style={{fontFamily: b.font.mono, fontWeight: 400, fontSize: 14 * u, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.62)'}}>{note}</div> : null}
            </div>
          ) : null}
          <div style={{position: 'absolute', inset: 0, backgroundImage: NOISE_URI, backgroundSize: `${256 * u}px`, opacity: 0.1, mixBlendMode: 'overlay'}} />
        </>
      )}
      {chrome === 'menubar' ? <TopBar w={width} sx={sx} sy={sy} font={b.font.text} /> : null}
      {chrome === 'window' ? <WindowBar w={width} u={u} /> : null}
      {all.map((n) => (
        <SlotMarker key={n} name={n} sx={sx} sy={sy} node={given[n]} mono={b.font.mono} />
      ))}
    </div>
  );
};

/** Generic desktop top bar: abstract pills and a clock, not a copy of any OS. */
const TopBar: React.FC<{w: number; sx: number; sy: number; font: string}> = ({w, sx, sy, font}) => {
  const h = LAPTOP_DISPLAY.menuBar * sy;
  const pill = (width: number, o = 0.72): React.CSSProperties => ({width: width * sx, height: 9 * sy, borderRadius: 5 * sy, background: `rgba(255,255,255,${o})`});
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: w,
        height: h,
        background: 'rgba(4,8,20,0.30)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${18 * sx}px`,
        boxSizing: 'border-box',
      }}
    >
      <div style={{display: 'flex', gap: 18 * sx, alignItems: 'center'}}>
        <div style={{width: 13 * sx, height: 13 * sx, borderRadius: 3 * sx, background: 'rgba(255,255,255,0.9)'}} />
        <div style={pill(54, 0.9)} />
        {[44, 38, 46, 52].map((x, i) => (
          <div key={i} style={pill(x)} />
        ))}
      </div>
      <div style={{display: 'flex', gap: 16 * sx, alignItems: 'center'}}>
        {[18, 18, 22].map((x, i) => (
          <div key={i} style={{...pill(x), height: 12 * sy, borderRadius: 3 * sy}} />
        ))}
        <div style={{fontFamily: font, fontWeight: 500, fontSize: 14 * sy, color: 'rgba(255,255,255,0.9)'}}>9:41</div>
      </div>
    </div>
  );
};

const WindowBar: React.FC<{w: number; u: number}> = ({w, u}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: w,
      height: 34 * u,
      background: 'rgba(4,8,20,0.34)',
      borderBottom: '1px solid rgba(255,255,255,0.14)',
      display: 'flex',
      alignItems: 'center',
      gap: 8 * u,
      paddingLeft: 14 * u,
      boxSizing: 'border-box',
    }}
  >
    {[0, 1, 2].map((i) => (
      <div key={i} style={{width: 12 * u, height: 12 * u, borderRadius: 6 * u, background: 'rgba(255,255,255,0.55)'}} />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────────────────────── TiltPlane

export type DofOptions = {
  /** focus position along the depth axis of the visible content: −1 far edge, 0 centre, +1 near edge */
  focus?: Anim;
  /** half-width of the sharp band in the same units (default 0.24 ≈ a sharp middle third; 0.12 = shallow) */
  band?: number;
  /** distance over which blur ramps from 0 to max */
  ramp?: number;
  /** max blur in px on the far / near side (plane space) */
  far?: number;
  near?: number;
  /** blur levels rendered (cost ∝ levels); 4 is enough */
  levels?: number;
};

export type TiltPlaneProps = {
  /** plane (content) size in px; children are laid out at this size */
  width?: number;
  height?: number;
  rotateX?: Anim;
  rotateY?: Anim;
  rotateZ?: Anim;
  /** lens zoom applied after projection (a focal-length change) */
  scale?: Anim;
  /** physical push toward the plane in px (translateZ) */
  dolly?: Anim;
  /** CSS perspective in px; default = frame width (references fit at ≈ 1× frame width) */
  perspective?: number;
  /** camera target on the plane, px from the plane centre: [x, y] or [[x0, y0], [x1, y1]] (a truck across it) */
  pan?: readonly [number, number] | readonly [readonly [number, number], readonly [number, number]];
  /** frame window and easing of the drift. Default: the whole sequence, LINEAR (measured: constant velocity). */
  start?: number;
  duration?: number;
  ease?: Ease;
  /** separate easing for rotate/scale/dolly (e.g. screenEasings.tiltIn), default = ease */
  tiltEase?: Ease;
  tiltDuration?: number;
  dof?: DofOptions | false;
  /** plane-space spot that fades the plane to `background` before its edge */
  spot?: {x?: number; y?: number; radius?: Anim; softness?: number; floor?: Anim} | false;
  /** a specular band sliding over the glass, start/duration in frames relative to `start` */
  sweep?: {at: number; duration?: number; angle?: number; width?: number; intensity?: number} | false;
  /** coloured haze behind the plane (the screen lighting the room), opacity 0..1 */
  haze?: number;
  /** default: brand accent */
  hazeColor?: string;
  /** default: brand bg */
  background?: string;
  children: React.ReactNode;
};

const dofLevels = (max: number, n: number) => Array.from({length: n}, (_, i) => max * Math.pow(i / (n - 1), 1.6));

/** Builds one CSS mask per blur level; masks are tent weights that sum to 1 (composited with plus-lighter). */
const dofMasks = (o: {gu: number; gv: number; boxW: number; boxH: number; cW: number; cH: number; focus: number; band: number; ramp: number; far: number; near: number; levels: number[]}) => {
  const len = Math.hypot(o.gu, o.gv) || 1;
  const nu = o.gu / len;
  const nv = o.gv / len;
  const angle = (Math.atan2(nu, -nv) * 180) / Math.PI;
  const L = Math.abs(o.boxW * nu) + Math.abs(o.boxH * nv);
  const extent = (Math.abs(o.cW * nu) + Math.abs(o.cH * nv)) / 2;
  const N = 36;
  const stops: number[][] = o.levels.map(() => []);
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const q = ((t - 0.5) * L) / extent; // −1..1 across the content along the depth axis, far → near
    const d = q - o.focus;
    const a = smooth(clamp01((Math.abs(d) - o.band) / o.ramp));
    const bl = (d > 0 ? o.near : o.far) * a;
    const lv = o.levels;
    let k = 0;
    while (k < lv.length - 2 && bl > lv[k + 1]) k++;
    const w = lv[k + 1] === lv[k] ? 0 : clamp01((bl - lv[k]) / (lv[k + 1] - lv[k]));
    lv.forEach((_, j) => stops[j].push(j === k ? 1 - w : j === k + 1 ? w : 0));
  }
  return stops.map((s) => ({
    used: s.some((x) => x > 0.002),
    mask: `linear-gradient(${angle.toFixed(2)}deg, ${s.map((x, i) => `rgba(0,0,0,${x.toFixed(3)}) ${((i / N) * 100).toFixed(2)}%`).join(', ')})`,
  }));
};

/**
 * A flat screen leaned back in 3D. The camera trucks across it at constant speed, focus is a band along the real depth
 * axis of the tilt, a spot fades the plane into the background, a sweep catches the glass.
 */
export const TiltPlane: React.FC<TiltPlaneProps> = ({
  width = LAPTOP_DISPLAY.w,
  height = LAPTOP_DISPLAY.h,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  dolly = 0,
  perspective,
  pan = [0, 0],
  start = 0,
  duration,
  ease = easings.linear,
  tiltEase,
  tiltDuration,
  dof = {},
  spot = {},
  sweep = false,
  haze = 0,
  hazeColor,
  background,
  children,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const bg = background ?? b.colors.bg;
  const hz = hazeColor ?? b.colors.accent;
  const {width: W, height: H, durationInFrames} = useVideoConfig();
  const dur = Math.max(1, duration ?? durationInFrames - start);
  const raw = clamp01((frame - start) / dur);
  const t = ease(raw);
  const tt = (tiltEase ?? ease)(clamp01((frame - start) / Math.max(1, tiltDuration ?? dur)));
  const P = perspective ?? W;
  const rX = at(rotateX, tt);
  const rY = at(rotateY, tt);
  const rZ = at(rotateZ, tt);
  const s = at(scale, tt);
  const z = at(dolly, tt);
  const isPath = Array.isArray(pan[0]);
  const p0 = (isPath ? pan[0] : pan) as readonly [number, number];
  const p1 = (isPath ? pan[1] : pan) as readonly [number, number];
  const px = lerp(p0[0], p1[0], t);
  const py = lerp(p0[1], p1[1], t);
  const margin = 48;
  const boxW = width + 2 * Math.max(Math.abs(p0[0]), Math.abs(p1[0])) + 2 * margin;
  const boxH = height + 2 * Math.max(Math.abs(p0[1]), Math.abs(p1[1])) + 2 * margin;
  const {gu, gv} = planeDepthGradient(rX, rY, rZ);
  const tilt = clamp01(Math.hypot(gu, gv) / Math.sin(rad(28))); // blur grows with the lean, full from ~28°
  const d =
    dof === false
      ? null
      : {focus: at(dof.focus, t, 0), band: dof.band ?? 0.24, ramp: dof.ramp ?? 0.6, far: (dof.far ?? 10) * tilt, near: (dof.near ?? 8) * tilt, levels: dof.levels ?? 4};
  const levels = d && Math.max(d.far, d.near) > 0.3 ? dofLevels(Math.max(d.far, d.near), d.levels) : [0];
  const masks = levels.length > 1 && d ? dofMasks({gu, gv, boxW, boxH, cW: width, cH: height, ...d, levels}) : null;
  const content = <div style={{position: 'absolute', left: boxW / 2 - width / 2 - px, top: boxH / 2 - height / 2 - py, width, height}}>{children}</div>;
  const sw = sweep ? clamp01((frame - start - sweep.at) / (sweep.duration ?? 30)) : 0;
  const swPos = easings.inOutSine(sw);
  // radius/floor animate with the tilt progress (floor 1 = no falloff, so a flat start can match a cut exactly)
  const spotCfg =
    spot === false ? null : {x: spot.x ?? 0, y: spot.y ?? 0, radius: at(spot.radius, tt, 0.78), softness: spot.softness ?? 0.75, floor: at(spot.floor, tt, 0)};
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: '50% 50%'}}>
        <AbsoluteFill style={{perspective: P, perspectiveOrigin: '50% 50%'}}>
          {haze > 0 ? (
            <div
              style={{
                position: 'absolute',
                left: (W - boxW) / 2,
                top: (H - boxH) / 2,
                width: boxW,
                height: boxH,
                transform: `translateZ(${z - 40}px) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: boxW / 2 - width / 2 - px,
                  top: boxH / 2 - height / 2 - py,
                  width,
                  height,
                  background: hz,
                  opacity: haze,
                  filter: `blur(${Math.round(width * 0.08)}px)`,
                }}
              />
            </div>
          ) : null}
          <div
            style={{
              position: 'absolute',
              left: (W - boxW) / 2,
              top: (H - boxH) / 2,
              width: boxW,
              height: boxH,
              isolation: 'isolate',
              transform: `translateZ(${z}px) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)`,
            }}
          >
            {masks
              ? levels.map(
                  (bl, i) =>
                    masks[i].used && (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          filter: bl > 0.3 ? `blur(${bl.toFixed(2)}px)` : undefined,
                          mixBlendMode: 'plus-lighter',
                          maskImage: masks[i].mask,
                          WebkitMaskImage: masks[i].mask,
                        }}
                      >
                        {content}
                      </div>
                    ),
                )
              : content}
            {spotCfg ? (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `radial-gradient(${spotCfg.radius * width}px ${spotCfg.radius * width * 0.78}px at ${boxW / 2 + spotCfg.x * width}px ${boxH / 2 + spotCfg.y * height}px, rgba(0,0,0,0) ${Math.round((1 - spotCfg.softness) * 100)}%, ${alpha(bg, (1 - spotCfg.floor) * 0.35)} ${Math.round((1 - spotCfg.softness * 0.45) * 100)}%, ${alpha(bg, 1 - spotCfg.floor)} 100%)`,
                }}
              />
            ) : null}
            {sweep && sw > 0 && sw < 1 ? (
              // clipped to the content (only the glass catches it), positioned in camera space (a reflection does not ride the content)
              <div
                style={{
                  position: 'absolute',
                  left: boxW / 2 - width / 2 - px,
                  top: boxH / 2 - height / 2 - py,
                  width,
                  height,
                  overflow: 'hidden',
                  mixBlendMode: 'plus-lighter',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: width / 2 + px,
                    top: height / 2 + py,
                    width: (sweep.width ?? 0.22) * width,
                    height: boxH * 3,
                    transform: `translate(-50%, -50%) rotate(${sweep.angle ?? 18}deg) translateX(${lerp(-0.75, 0.75, swPos) * boxW}px)`,
                    background: `linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,${sweep.intensity ?? 0.16}) 50%, rgba(255,255,255,0))`,
                  }}
                />
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────────────────── Dolly

/** A framing: the world point at the frame centre (x, y px from the scene centre), zoom, roll; 3D adds z/rotations. */
export type Framing = {x?: number; y?: number; scale?: number; rotate?: number; z?: number; rotateX?: number; rotateY?: number; perspective?: number};

export type DollyProps = {
  from: Framing;
  to: Framing;
  start?: number;
  duration?: number;
  /** default inOutSine (camera pans); pass easings.linear for a measured constant drift */
  ease?: Ease;
  /** use a named spring instead of the easing (cameraIn / cameraOut / heavy) */
  spring?: SpringName;
  /** 'flat' = 2D lens zoom/pan; '3d' = the camera moves in space (translateZ, perspective): children with translateZ get parallax */
  mode?: 'flat' | '3d';
  children: React.ReactNode;
};

/**
 * Camera between two framings. Arc-free: the camera centre moves on a straight line in world space and the zoom is
 * interpolated in log space (constant perceived zoom speed), so the target slides straight toward the centre instead
 * of swinging. Complements `Camera` (spring keyframe chain, 2D): use Dolly for one A → B move.
 */
export const Dolly: React.FC<DollyProps> = ({from, to, start = 0, duration, ease = easings.inOutSine, spring: springName, mode = 'flat', children}) => {
  const {width: W} = useVideoConfig();
  const t = useShotProgress(start, duration, ease, springName);
  const x = lerp(from.x ?? 0, to.x ?? 0, t);
  const y = lerp(from.y ?? 0, to.y ?? 0, t);
  const s0 = from.scale ?? 1;
  const s1 = to.scale ?? 1;
  const s = Math.exp(lerp(Math.log(s0), Math.log(s1), t));
  const r = lerp(from.rotate ?? 0, to.rotate ?? 0, t);
  if (mode === 'flat') {
    return <AbsoluteFill style={{transform: `scale(${s}) rotate(${-r}deg) translate(${-x}px, ${-y}px)`, transformOrigin: '50% 50%'}}>{children}</AbsoluteFill>;
  }
  const z = lerp(from.z ?? 0, to.z ?? 0, t);
  const P = lerp(from.perspective ?? W, to.perspective ?? W, t);
  const rX = lerp(from.rotateX ?? 0, to.rotateX ?? 0, t);
  const rY = lerp(from.rotateY ?? 0, to.rotateY ?? 0, t);
  return (
    <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: '50% 50%'}}>
      <AbsoluteFill style={{perspective: P, perspectiveOrigin: '50% 50%'}}>
        <AbsoluteFill style={{transformStyle: 'preserve-3d', transform: `translateZ(${z}px) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${-r}deg) translate(${-x}px, ${-y}px)`}}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Put a child at a depth inside a 3D Dolly (positive = closer to the camera). */
export const Depth: React.FC<{z: number; style?: React.CSSProperties; children: React.ReactNode}> = ({z, style, children}) => (
  <AbsoluteFill style={{transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d', ...style}}>{children}</AbsoluteFill>
);

// ─────────────────────────────────────────────────────────────────────────────────────────────── RackFocus

export type RackLayer = {node: React.ReactNode; /** 0 far … 1 near (any scale, matches from/to) */ depth: number; style?: React.CSSProperties};

export type RackFocusProps = {
  layers: RackLayer[];
  /** focus depth before and after the pull */
  from: number;
  to: number;
  start?: number;
  /** a focus pull is 12–24 frames; default 18 */
  duration?: number;
  ease?: Ease;
  /** blur at |depth − focus| ≥ range */
  maxBlur?: number;
  range?: number;
  /** lens breathing: scale change of the whole image across the pull (0.01–0.02 reads as a real lens) */
  breathing?: number;
};

export const rackBlur = (depth: number, focus: number, maxBlur: number, range: number) => maxBlur * smooth(clamp01(Math.abs(depth - focus) / range));

/** Focus pull between depth layers (rendered back to front in the given order). */
export const RackFocus: React.FC<RackFocusProps> = ({layers, from, to, start = 0, duration = 18, ease = easings.inOutSine, maxBlur = 14, range = 1, breathing = 0.012}) => {
  const t = useShotProgress(start, duration, ease);
  const focus = lerp(from, to, t);
  return (
    <AbsoluteFill style={{transform: `scale(${1 + breathing * t})`, transformOrigin: '50% 50%'}}>
      {layers.map((l, i) => {
        const bl = rackBlur(l.depth, focus, maxBlur, range);
        return (
          <AbsoluteFill key={i} style={{filter: bl > 0.25 ? `blur(${bl.toFixed(2)}px)` : undefined, ...l.style}}>
            {l.node}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────────────────── LaptopFrame

/** 14-inch laptop proportions (mm) scaled to a base width in px. */
export const laptopGeometry = (baseW: number) => {
  const k = baseW / 312.6;
  const D = 221.2 * k;
  const Tb = 10.6 * k;
  const Hl = 219.0 * k;
  const lidT = 4.4 * k;
  const dispW = 302.1 * k;
  const dispH = 196.2 * k;
  const topBezel = 4.2 * k;
  const side = (baseW - dispW) / 2;
  return {k, W: baseW, D, Tb, Hl, lidT, dispW, dispH, topBezel, side, chin: Hl - topBezel - dispH, gap: 2.6 * k};
};
export type LaptopGeometry = ReturnType<typeof laptopGeometry>;

export type LaptopPose = {
  /** lid opening angle in degrees: 0 closed, 90 upright, 105–110 normal use */
  open?: number;
  /** turn around the vertical axis (negative = we see the left side) */
  yaw?: number;
  /** camera height in degrees (positive = looking down on the deck) */
  elevation?: number;
  roll?: number;
  /** offset of the laptop from the frame centre in px (auto-centred on lid top ↔ base front) */
  x?: number;
  y?: number;
  /** lens zoom after projection */
  scale?: number;
  /** display brightness 0..1 (also drives keyboard spill, floor and background glow) */
  screen?: number;
  /** body light 0..1: 0 is the "dark" the laptop rises from */
  exposure?: number;
  /** 0..1 push-in until the display fills the frame width (×fill); arc-free, log-zoom */
  push?: number;
};

export type LaptopFrameProps = LaptopPose & {
  /** base width in px; default 42 % of a landscape frame, 66 % of a portrait one */
  width?: number;
  perspective?: number;
  /** display content, authored at LAPTOP_DISPLAY size; default a ScreenSlot with a top bar. Pass real UI here. */
  screenContent?: React.ReactNode;
  /** foreground blur on the whole base (deck, keys, edges), px */
  keyboardBlur?: number;
  /** at push = 1 the display covers the frame × fill (≥ 1 hides the bezel) */
  fill?: number;
  /** raster supersampling of the 3D rig: Chrome rasterizes 3D faces at their local size, so a push-in magnifies them.
   * ss = 2–3 builds the rig ss× larger (geometry and perspective) and scales the result down: crisp at push 1. */
  supersample?: number;
  /** body colour (dark aluminium) */
  body?: string;
  /** screen light colour (default: brand accent) */
  glowColor?: string;
  /** default: brand bg */
  background?: string;
};

const LIGHT: V3 = (() => {
  const v: V3 = [-0.35, -0.82, 0.46];
  const l = Math.hypot(...v);
  return [v[0] / l, v[1] / l, v[2] / l];
})();
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

type Rig = {yaw: number; elevation: number; roll: number};
const rigRotate = (v: V3, r: Rig): V3 => rz(rx(ry(v, r.yaw), -r.elevation), r.roll);

/** Display centre in rig space (after rotations, before the rig translation). */
const displayCentre = (g: LaptopGeometry, open: number, r: Rig): V3 => {
  const a = open - 90;
  const hc = g.chin + g.dispH / 2;
  const lid = rx([0, -hc, g.lidT / 2], a);
  return rigRotate([lid[0], lid[1] - g.gap, lid[2] - g.D / 2], r);
};

/** Resolve a pose (with push) into rig rotations + translation. Exported so overlays can follow the display. */
export const resolveLaptopPose = (pose: LaptopPose, g: LaptopGeometry, P: number, frameW: number, frameH: number, fill = 1.04) => {
  const open = pose.open ?? 105;
  const r0: Rig = {yaw: pose.yaw ?? 0, elevation: pose.elevation ?? 12, roll: pose.roll ?? 0};
  const lens = pose.scale ?? 1;
  // auto-centre: the midpoint between the lid's top edge and the base's front edge sits on the lens axis
  const lidTop = rx([0, -g.Hl, 0], open - 90);
  const mid = rigRotate([lidTop[0] / 2, (lidTop[1] - g.gap + g.Tb) / 2, (lidTop[2] + g.D) / 2 - g.D / 2], r0);
  const T0: V3 = [(pose.x ?? 0) - mid[0], (pose.y ?? 0) - mid[1], 0];
  const t = clamp01(pose.push ?? 0);
  if (t <= 0) return {rig: r0, T: T0, open, lens};
  const r1: Rig = {yaw: 0, elevation: open - 90, roll: 0};
  const rt: Rig = {yaw: lerp(r0.yaw, r1.yaw, t), elevation: lerp(r0.elevation, r1.elevation, t), roll: lerp(r0.roll, r1.roll, t)};
  const c0 = displayCentre(g, open, r0);
  const ct = displayCentre(g, open, rt);
  const k0 = P / (P - (c0[2] + T0[2]));
  const k1 = (fill * Math.max(frameW / g.dispW, frameH / g.dispH)) / lens; // cover the frame
  const s0x = (c0[0] + T0[0]) * k0;
  const s0y = (c0[1] + T0[1]) * k0;
  const k = Math.exp(lerp(Math.log(k0), Math.log(k1), t));
  const sx = lerp(s0x, 0, t);
  const sy = lerp(s0y, 0, t);
  const T: V3 = [sx / k - ct[0], sy / k - ct[1], P - P / k - ct[2]];
  return {rig: rt, T, open, lens};
};

const Face: React.FC<{w: number; h: number; transform: string; origin?: string; style?: React.CSSProperties; children?: React.ReactNode}> = ({w, h, transform, origin = '50% 50%', style, children}) => (
  <div
    style={{
      position: 'absolute',
      left: -w / 2,
      top: 0,
      width: w,
      height: h,
      transform,
      transformOrigin: origin,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Shade: black overlay for a face whose (rig-space) normal is n. */
const shade = (n: V3, exposure: number, ambient = 0.32) => {
  const l = Math.max(0, dot(n, LIGHT));
  return clamp01(1 - (ambient + (1 - ambient) * l) * exposure);
};

const KEY_ROWS: {h: number; keys: number[]}[] = [
  {h: 0.55, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
  {h: 1, keys: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5]},
  {h: 1, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
  {h: 1, keys: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.7]},
  {h: 1, keys: [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3]},
  {h: 1, keys: [1, 1, 1, 1.25, 5.3, 1.25, 1, 1, 1]},
];

const Deck: React.FC<{g: LaptopGeometry; body: string; spill: number; glow: string}> = ({g, body, spill, glow}) => {
  const k = g.k;
  const kbW = 270 * k;
  const kbH = 104 * k;
  const kbTop = 13 * k;
  const gapK = 1.35 * k;
  const unitH = (kbH - gapK * 5) / 5.55;
  return (
    <div style={{position: 'absolute', inset: 0, background: body}}>
      {/* speaker grilles */}
      {[-1, 1].map((sd) => (
        <div
          key={sd}
          style={{
            position: 'absolute',
            top: kbTop,
            height: kbH,
            width: 16 * k,
            left: sd < 0 ? (g.W - kbW) / 2 - 22 * k : (g.W + kbW) / 2 + 6 * k,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.75) 32%, transparent 36%)',
            backgroundSize: `${3 * k}px ${3 * k}px`,
          }}
        />
      ))}
      <div style={{position: 'absolute', left: (g.W - kbW) / 2, top: kbTop, width: kbW, height: kbH, display: 'flex', flexDirection: 'column', gap: gapK}}>
        {KEY_ROWS.map((row, i) => (
          <div key={i} style={{display: 'flex', gap: gapK, height: unitH * row.h}}>
            {row.keys.map((w, j) => (
              <div key={j} style={{flex: `${w} 1 0`, borderRadius: 1.6 * k, background: '#09090A', boxShadow: `inset 0 ${0.3 * k}px 0 rgba(255,255,255,0.07)`, minWidth: 0}} />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: (g.W - 136 * k) / 2,
          top: kbTop + kbH + 11 * k,
          width: 136 * k,
          height: 86 * k,
          borderRadius: 4 * k,
          background: 'rgba(255,255,255,0.025)',
          boxShadow: `inset 0 0 0 ${0.3 * k}px rgba(255,255,255,0.08)`,
        }}
      />
      {/* the screen's light falling on the deck, strongest at the hinge */}
      <div style={{position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: spill, background: `radial-gradient(ellipse 62% 70% at 50% 0%, ${glow}, rgba(0,0,0,0) 70%)`}} />
    </div>
  );
};

/** The 2.5D laptop, drawn in CSS 3D (no model, no logos). A pose in, pixels out: drive it with LaptopReveal or your own interpolations. */
export const LaptopFrame: React.FC<LaptopFrameProps> = (props) => {
  const b = useBrand();
  const {width: FW, height: FH} = useVideoConfig();
  const ss = Math.max(1, props.supersample ?? 1);
  const baseW = props.width ?? (FW >= FH ? 0.42 * FW : 0.66 * FW);
  const g = laptopGeometry(baseW * ss);
  const P = (props.perspective ?? Math.max(FW, FH) * 1.1) * ss;
  const body = props.body ?? '#1C1D21';
  const glow = props.glowColor ?? b.colors.accent;
  const rim = mx(glow, '#FFFFFF', 0.45);
  const exposure = clamp01(props.exposure ?? 1);
  const screen = clamp01(props.screen ?? 1);
  const {rig, T, open, lens} = resolveLaptopPose({...props, x: (props.x ?? 0) * ss, y: (props.y ?? 0) * ss}, g, P, FW * ss, FH * ss, props.fill ?? 1.04);
  const a = open - 90; // lid rotateX
  const lidOpen = clamp01((open - 35) / 60);
  const spill = screen * lidOpen * 0.55;
  // normals in rig space for shading
  const nDeck = rigRotate([0, -1, 0], rig);
  const nFront = rigRotate([0, 0, 1], rig);
  const nLeft = rigRotate([-1, 0, 0], rig);
  const nRight = rigRotate([1, 0, 0], rig);
  const nLidBack = rigRotate(rx([0, 0, -1], a), rig);
  const nLidFront = rigRotate(rx([0, 0, 1], a), rig);
  const sheenPos = interpolate(open, [0, 115], [-30, 130]);
  const display = props.screenContent ?? <ScreenSlot chrome="menubar" />;
  const baseBlur = props.keyboardBlur ? `blur(${props.keyboardBlur * ss}px)` : undefined; // the whole base is the foreground
  const ds = g.dispW / LAPTOP_DISPLAY.w;
  const rigT = `translate3d(${T[0]}px, ${T[1]}px, ${T[2]}px) rotateZ(${rig.roll}deg) rotateX(${-rig.elevation}deg) rotateY(${rig.yaw}deg) translate3d(0px, 0px, ${-g.D / 2}px)`;
  return (
    <AbsoluteFill style={{background: props.background ?? b.colors.bg, overflow: 'hidden'}}>
      {/* the room: the screen lights it */}
      <AbsoluteFill style={{background: `radial-gradient(ellipse 52% 46% at 50% 46%, ${alpha(glow, 0.2 * screen * lidOpen)}, rgba(0,0,0,0) 70%)`}} />
      <AbsoluteFill style={{transform: `scale(${lens / ss})`, transformOrigin: '50% 50%'}}>
        <AbsoluteFill style={{perspective: P, perspectiveOrigin: '50% 50%'}}>
          <div style={{position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: rigT}}>
            {/* floor glow in front of the laptop */}
            <Face
              w={g.W * 2.4}
              h={g.D * 2.2}
              origin="50% 0"
              transform={`translate3d(0px, ${g.Tb + 1}px, ${-g.D * 0.4}px) rotateX(90deg)`}
              style={{background: `radial-gradient(ellipse 34% 30% at 50% 30%, ${alpha(glow, 0.22 * spill)}, rgba(0,0,0,0) 70%)`, backfaceVisibility: 'visible'}}
            />
            {/* base: deck, front, sides */}
            <Face w={g.W} h={g.D} origin="50% 0" transform="rotateX(90deg)" style={{borderRadius: 3.2 * g.k, filter: baseBlur}}>
              <Deck g={g} body={body} spill={spill} glow={glow} />
              <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(nDeck, exposure)})`}} />
            </Face>
            <Face
              w={g.W}
              h={g.Tb}
              transform={`translateZ(${g.D}px)`}
              style={{background: body, filter: baseBlur, borderRadius: `0 0 ${3 * g.k}px ${3 * g.k}px`, boxShadow: `inset 0 ${0.6 * g.k}px 0 rgba(255,255,255,${0.22 * exposure})`}}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: 44 * g.k,
                  height: g.Tb * 0.55,
                  transform: 'translateX(-50%)',
                  borderRadius: `0 0 ${22 * g.k}px ${22 * g.k}px`,
                  background: 'rgba(255,255,255,0.10)',
                }}
              />
              <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(nFront, exposure)})`}} />
            </Face>
            {[-1, 1].map((sd) => (
              <Face key={sd} w={g.D} h={g.Tb} transform={`translateX(${(sd * g.W) / 2}px) translateZ(${g.D / 2}px) rotateY(${sd * 90}deg)`} style={{background: body, filter: baseBlur}}>
                <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(sd < 0 ? nLeft : nRight, exposure)})`}} />
              </Face>
            ))}
            {/* lid: pivots on the hinge; front (bezel + display) and back (plain metal, no logo) */}
            <div style={{position: 'absolute', left: 0, top: -g.gap, width: 0, height: 0, transformStyle: 'preserve-3d', transform: `rotateX(${a}deg)`}}>
              <Face
                w={g.W}
                h={g.Hl}
                origin="50% 100%"
                transform={`translateY(${-g.Hl}px) translateZ(${g.lidT / 2}px)`}
                style={{background: '#050506', borderRadius: `${3.4 * g.k}px ${3.4 * g.k}px ${1.2 * g.k}px ${1.2 * g.k}px`, boxShadow: `inset 0 ${0.5 * g.k}px 0 rgba(255,255,255,${0.16 * exposure})`}}
              >
                {/* bezel shading (under the display, which emits its own light) */}
                <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(nLidFront, exposure, 0.6).toFixed(3)})`}} />
                <div
                  style={{
                    position: 'absolute',
                    left: g.side,
                    top: g.topBezel,
                    width: g.dispW,
                    height: g.dispH,
                    overflow: 'hidden',
                    borderRadius: `${2.4 * g.k}px ${2.4 * g.k}px 0 0`,
                    background: '#000',
                  }}
                >
                  <div style={{position: 'absolute', left: 0, top: 0, width: LAPTOP_DISPLAY.w, height: LAPTOP_DISPLAY.h, transform: `scale(${ds})`, transformOrigin: '0 0'}}>{display}</div>
                  <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${(1 - screen).toFixed(3)})`}} />
                  {/* glass: faint top reflection */}
                  <div style={{position: 'absolute', inset: 0, opacity: 1 - clamp01(props.push ?? 0), background: 'linear-gradient(165deg, rgba(255,255,255,0.07), rgba(255,255,255,0) 38%)'}} />
                </div>
              </Face>
              {/* lid edges: top + sides, so the lid has a body when seen edge-on */}
              <Face
                w={g.W}
                h={g.lidT}
                transform={`translateY(${-g.Hl - g.lidT / 2}px) rotateX(90deg)`}
                style={{background: body, boxShadow: `inset 0 0 0 ${0.4 * g.k}px rgba(255,255,255,${0.14 * exposure})`}}
              >
                <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(rigRotate(rx([0, -1, 0], a), rig), exposure)})`}} />
              </Face>
              {[-1, 1].map((sd) => (
                <Face key={sd} w={g.lidT} h={g.Hl} transform={`translate3d(${(sd * g.W) / 2}px, ${-g.Hl}px, 0px) rotateY(${sd * 90}deg)`} style={{background: body}}>
                  <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(rigRotate(rx([sd, 0, 0], a), rig), exposure)})`}} />
                </Face>
              ))}
              <Face
                w={g.W}
                h={g.Hl}
                origin="50% 100%"
                transform={`translateY(${-g.Hl}px) translateZ(${-g.lidT / 2}px) rotateY(180deg)`}
                style={{background: body, borderRadius: `${3.4 * g.k}px ${3.4 * g.k}px ${1.2 * g.k}px ${1.2 * g.k}px`}}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(255,255,255,0) ${sheenPos - 28}%, rgba(255,255,255,${0.13 * exposure}) ${sheenPos}%, rgba(255,255,255,0) ${sheenPos + 28}%)`,
                  }}
                />
                <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade(nLidBack, exposure)})`}} />
                {/* rim: a cool edge so the silhouette reads against the background while the body is still dark */}
                <div style={{position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: `inset 0 0 0 ${0.9 * g.k}px ${alpha(rim, 0.3 * exposure)}`}} />
              </Face>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────────────────── LaptopReveal

export type LaptopRevealProps = Omit<LaptopFrameProps, keyof LaptopPose> & {
  /** pose at the start and at the end of the drift (yaw/elevation/x/y/scale drift linearly over the whole sequence) */
  from?: LaptopPose;
  to?: LaptopPose;
  /** rise from dark: frames, and how far below it starts (fraction of frame height) */
  riseAt?: number;
  riseFrames?: number;
  riseDistance?: number;
  /** lid: closed angle → open angle */
  openAt?: number;
  openFrames?: number;
  openFrom?: number;
  openTo?: number;
  /** frames for the display to fade up (inOutSine) once the lid passes SCREEN_MEASURED.lidScreenOnDeg */
  screenFrames?: number;
  /** push-in to the display: start frame (false = none) and length; speed-ramped (inOutSine) */
  pushAt?: number | false;
  pushFrames?: number;
};

/** t for which inOutSine(t) ≈ y */
const inverseInOutSine = (y: number) => Math.acos(1 - 2 * clamp01(y)) / Math.PI;

/** The reveal choreography: rises from dark → lid opens (ease-in-out) → display lights the room → optional push-in. */
export const LaptopReveal: React.FC<LaptopRevealProps> = ({
  from = {},
  to = {},
  riseAt = 0,
  riseFrames = 42,
  riseDistance = 0.16,
  openAt = 14,
  openFrames = 34,
  openFrom = 4,
  openTo = 106,
  screenFrames = 20,
  pushAt = false,
  pushFrames = 60,
  ...frameProps
}) => {
  const frame = useCurrentFrame();
  const {height: FH, durationInFrames} = useVideoConfig();
  const drift = clamp01(frame / Math.max(1, durationInFrames - 1));
  const rise = easings.outQuint(clamp01((frame - riseAt) / riseFrames));
  const exposure = easings.outQuint(clamp01((frame - riseAt) / (riseFrames * 0.8)));
  const open = lerp(openFrom, openTo, easings.inOutSine(clamp01((frame - openAt) / openFrames)));
  // the frame where the lid passes the "screen on" angle
  const onT = clamp01((SCREEN_MEASURED.lidScreenOnDeg - openFrom) / (openTo - openFrom));
  const onFrame = openAt + openFrames * inverseInOutSine(onT);
  const screen = easings.inOutSine(clamp01((frame - onFrame) / screenFrames)); // a display fades up, it does not pop
  const push = pushAt === false ? 0 : easings.inOutSine(clamp01((frame - pushAt) / pushFrames));
  const p = (k: keyof LaptopPose, d: number) => lerp(from[k] ?? d, to[k] ?? from[k] ?? d, drift);
  return (
    <LaptopFrame
      {...frameProps}
      open={open}
      yaw={p('yaw', -24)}
      elevation={p('elevation', 14)}
      roll={p('roll', 0)}
      scale={p('scale', 1)}
      x={p('x', 0)}
      y={p('y', 0) + (1 - rise) * riseDistance * FH}
      exposure={exposure}
      screen={screen}
      push={push}
    />
  );
};
