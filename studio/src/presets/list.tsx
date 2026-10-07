// List family: the self-maintaining list (a to-do, an inbox, a queue) as the hero beat, plus the prompt → thinking →
// pipeline pieces around it. Script the list with events; the component does the choreography (drop-in, write-in,
// FLIP reorder, check-off, stale → drop / move, a travelling "right now" ring). Numbers measured frame by frame from
// studied launch films (30 fps, scaled by fps/30). Colours and fonts default from the brand; pass `theme` to override.
// Everything is driven by useCurrentFrame() and props; deterministic.
import React, {useMemo} from 'react';
import {Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SpringConfig} from 'remotion';
import {springs} from './springs';
import {easings} from './easings';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix as mixHex, onColor} from '../brand/color';
import type {ResolvedBrand} from '../brand/types';

type Cfg = Partial<SpringConfig>;

/* ═══════════════════════════ named motion ═══════════════════════════ */

/** List-family springs. `drop` is measured; the rest alias the kit's named springs so the roles have names. */
export const listSprings = {
  /** drop-in: a row falls from the camera and lands in 9 frames (within 2 %), 0.4 % settle */
  drop: {stiffness: 200, damping: 22, mass: 0.8},
  /** rows making room / closing a gap (springs.layout, ~13 frames, no bounce) */
  reflow: springs.layout,
  /** the promoted row in a reorder: heavier than the reflow, so it reads as carried while the others step aside */
  carry: springs.drag,
  /** right-now ring travelling, focused row growing */
  focus: springs.ui,
  /** check fill pop */
  tick: springs.pop,
  /** chips, choice pills, dropdown items */
  chip: springs.snappy,
  /** send button / choice press */
  press: springs.click,
} satisfies Record<string, Cfg>;

/** Durations and gaps in frames at 30 fps (scaled by fps/30 at runtime). */
export const LIST_T = {
  stagger: 4, // rows drop 3–6 frames apart (mean ≈ 4.5)
  insertDelay: 3, // a mid-list row lands 3 frames after the rows below start making room
  follow: 3, // reorder: the others follow the carried row 3 frames later
  closeDelay: 2, // a gap starts closing 2 frames after its row starts leaving
  tickDelay: 2,
  tick: 8,
  strikeDelay: 6,
  strike: 10,
  doneHold: 26, // ticked + struck row stays readable before it collapses (≥ 0.8 s)
  collapse: 8, // exit ≤ entrance
  staleDim: 10,
  staleChoice: 8, // choice pills appear 8 frames after the row goes stale
  staleHold: 30, // pills on screen for 1 s before the pick
  staleExitDelay: 5,
  staleExit: 10,
  writeTag: 3, // tag pill grows in 2–3 frames
  writeText: 10, // text reveal 6–8 frames at UI size; 10 at hero size
  glow: 40, // "new" glow on an inserted row
  swapOut: 4, // meta text swap
  swapIn: 6,
  shimmerSweep: 14, // one shimmer sweep
  shimmerPeriod: 30,
  spinnerTurn: 24, // ~1 turn per 24 frames
} as const;

/** Drop-in start state: huge, soft, translucent, from the lower left. */
const DROP = {scale: 2.2, blur: 12, dx: -0.08, dy: 48} as const;

/* ═══════════════════════════ theme + metrics ═══════════════════════════ */

export type ListTheme = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  fg: string;
  fg2: string;
  muted: string;
  rule: string;
  accent: string;
  accent2: string;
  /** tint of the focused row */
  accentDeep: string;
  /** text / tick on the accent fill */
  onAccent: string;
  /** body face (rows, prompt) */
  font: string;
  /** header title face */
  display: string;
  /** labels, tags, counters */
  mono: string;
  /** drop-shadow strength: 1 on dark brands, ~0.3 on light ones */
  shade: number;
};

/** Hex-safe mix (falls back to a hard switch for non-hex values passed through `theme`). */
const mx = (a: string, b: string, t: number) => (a.startsWith('#') && b.startsWith('#') ? mixHex(a, b, t) : t < 0.5 ? a : b);

/** The brand as a ListTheme. */
export const listThemeFromBrand = (b: ResolvedBrand): ListTheme => {
  const c = b.colors;
  const dark = b.theme === 'dark';
  return {
    bg: c.bg,
    surface: c.surface,
    surface2: mx(c.surface, c.fg, dark ? 0.04 : 0.025),
    border: mx(c.surface, c.fg, dark ? 0.1 : 0.1),
    fg: c.fg,
    fg2: mx(c.fg, c.muted, 0.45),
    muted: c.muted,
    rule: mx(c.surface, c.muted, dark ? 0.55 : 0.45),
    accent: c.accent,
    accent2: dark ? c.accent2 : mx(c.accent, c.fg, 0.25),
    accentDeep: dark ? mx(c.bg, c.accent, 0.35) : mx(c.surface, c.accent, 0.16),
    onAccent: onColor(c.accent),
    font: b.font.text,
    display: b.font.display,
    mono: b.font.mono,
    shade: dark ? 1 : 0.3,
  };
};

/** Brand list theme merged with overrides. */
export const useListTheme = (theme?: Partial<ListTheme>): ListTheme => {
  const b = useBrand();
  return {...listThemeFromBrand(b), ...theme};
};

/** All list geometry from one `size` factor. size 1 = hero list at 1080p (title 30 px, row 92 px). */
export const listMetrics = (size = 1, width = 940) => ({
  size,
  width,
  rowH: 92 * size,
  focusExtra: 30 * size,
  gap: 12 * size,
  radius: 20 * size,
  padX: 26 * size,
  check: 30 * size,
  title: 30 * size,
  meta: 19 * size,
  chip: 13 * size,
  eyebrow: 13 * size,
  headerH: 86 * size,
});
export type ListMetrics = ReturnType<typeof listMetrics>;

/* ═══════════════════════════ helpers ═══════════════════════════ */

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (frame: number, start: number, dur: number, easing: (t: number) => number = easings.outExpo) =>
  interpolate(frame, [start, start + Math.max(0.0001, dur)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});
const sp = (frame: number, start: number, fps: number, config: Cfg) => (frame < start ? 0 : spring({frame: frame - start, fps, config}));
/** 0 → 1 → 0 over a spring's travel: drives lift, press squash. */
const bump = (p: number) => Math.sin(Math.PI * clamp01(p));
const srcOf = (s: string) => (/^(https?:|data:|blob:)/.test(s) ? s : staticFile(s));
const shadow = (th: ListTheme, a: number) => `rgba(0,0,0,${(a * th.shade).toFixed(3)})`;

/** Frame at which each character of `text` appears. Deterministic ±jitterMs per char, +½ interval after a space (word-boundary holds). */
export const typeSchedule = (text: string, start: number, cps: number, fps: number, seed = 'type', jitterMs = 15) => {
  const step = fps / cps;
  const jit = (jitterMs / 1000) * fps;
  const out: number[] = [];
  let t = start;
  for (let i = 0; i < text.length; i++) {
    out.push(t);
    t += Math.max(0.35, step + (random(`${seed}-${i}`) - 0.5) * 2 * jit) + (text[i] === ' ' ? step * 0.5 : 0);
  }
  return out;
};

/** Gradient text whose bright band sweeps left → right every `period` frames (thinking shimmer). Spread on a text element. */
export const shimmerStyle = (
  frame: number,
  start: number,
  fps: number,
  base: string,
  hi: string,
  sweep: number = LIST_T.shimmerSweep,
  period: number = LIST_T.shimmerPeriod,
): React.CSSProperties => {
  const k = fps / 30;
  const local = (((frame - start) % (period * k)) + period * k) % (period * k);
  const c = (-0.3 + 1.6 * clamp01(local / (sweep * k))) * 100;
  return {
    backgroundImage: `linear-gradient(100deg, ${base} 0%, ${base} ${c - 22}%, ${hi} ${c}%, ${base} ${c + 22}%, ${base} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  };
};

/* ═══════════════════════════ source glyphs ═══════════════════════════ */

export type ListSource = 'chat' | 'mail' | 'call' | 'screen' | 'code' | 'calendar' | 'doc';

const GLYPH: Record<ListSource, React.ReactNode> = {
  chat: <path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6.5L20.5 7" />
    </>
  ),
  call: <path d="M6.5 3.5h3l1.8 4.6-2.3 1.5a11 11 0 0 0 5.4 5.4l1.5-2.3 4.6 1.8v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  screen: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </>
  ),
  code: (
    <>
      <circle cx="6.5" cy="5.5" r="2.2" />
      <circle cx="6.5" cy="18.5" r="2.2" />
      <circle cx="17.5" cy="8" r="2.2" />
      <path d="M6.5 7.7v8.6M17.5 10.2c0 4.3-5 4.3-9.4 6.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4.5 4.5V21H6z" />
      <path d="M14 3v4.5h4.5M9 12.5h6M9 16h6" />
    </>
  ),
};

/** Our own stroke glyph for a task source (no third-party logos). */
export const SourceGlyph: React.FC<{source: ListSource; size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties}> = ({
  source,
  size = 16,
  color = 'currentColor',
  strokeWidth = 1.8,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0, ...style}}>
    {GLYPH[source]}
  </svg>
);

/** The small source tag every task carries ("CHAT", "MAIL", …). `grow` 0..1 = tag growing from its left edge.
 *  `logo` (path under public/ or a URL) replaces the glyph with your own image, drawn whole (no tint). */
export const SourceTag: React.FC<{
  source: ListSource;
  label?: string;
  logo?: string;
  size?: number;
  theme?: Partial<ListTheme>;
  grow?: number;
  active?: boolean;
  style?: React.CSSProperties;
}> = ({source, label, logo, size = 1, theme, grow = 1, active = false, style}) => {
  const th = useListTheme(theme);
  const col = active ? th.accent2 : th.fg2;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8 * size,
        height: 34 * size,
        padding: `0 ${13 * size}px 0 ${11 * size}px`,
        borderRadius: 999,
        background: active ? alpha(th.accent, 0.14) : alpha(th.fg, 0.06),
        border: `1px solid ${active ? alpha(th.accent, 0.35) : th.border}`,
        color: col,
        fontFamily: th.mono,
        fontSize: 13 * size,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        transform: `scaleX(${0.3 + 0.7 * grow})`,
        transformOrigin: 'left center',
        opacity: clamp01(grow * 1.6),
        ...style,
      }}
    >
      {logo ? <Img src={srcOf(logo)} style={{width: 18 * size, height: 18 * size, objectFit: 'contain', flexShrink: 0}} /> : <SourceGlyph source={source} size={16 * size} color={col} />}
      <span style={{opacity: clamp01(grow * 2 - 0.6)}}>{label ?? source}</span>
    </div>
  );
};

/* ═══════════════════════════ event timeline ═══════════════════════════ */

/** `logo` (your own image) + `label` replace the generic glyph and source name on the tag. */
export type ListTask = {id: string; title: string; source?: ListSource; meta?: string; logo?: string; label?: string};
/** drop = falls from the camera · rise = classic blur-up · write = tag grows, text writes itself with an accent edge */
export type ListEnter = 'drop' | 'rise' | 'write';

export type ListEvent =
  | {at: number; type: 'add'; task: ListTask; index?: number; enter?: ListEnter; glow?: boolean}
  | {at: number; type: 'done'; id: string}
  | {at: number; type: 'move'; id: string; to: number}
  | {at: number; type: 'order'; ids: string[]}
  | {at: number; type: 'stale'; id: string; label?: string; choice?: 'drop' | 'move'; to?: number; moveLabel?: string; resolvedLabel?: string}
  | {at: number; type: 'focus'; id: string | null}
  | {at: number; type: 'update'; id: string; patch: Partial<Omit<ListTask, 'id'>>}
  | {at: number; type: 'remove'; id: string};

/** `n` add events, `gap` frames apart (the drop-in cascade). */
export const assemble = (tasks: ListTask[], startFrame: number, opts: {gap?: number; enter?: ListEnter} = {}): ListEvent[] =>
  tasks.map((task, i) => ({at: startFrame + i * (opts.gap ?? LIST_T.stagger), type: 'add' as const, task, enter: opts.enter ?? 'drop'}));

type Key = {at: number; v: number; cfg: Cfg};
export type ListRec = {
  task: ListTask;
  seq: number;
  enterAt: number;
  enter: ListEnter;
  glow: boolean;
  y: Key[];
  h: Key[];
  carries: number[];
  patches: {at: number; patch: Partial<Omit<ListTask, 'id'>>}[];
  doneAt?: number;
  exitAt?: number;
  exitKind?: 'collapse' | 'slide';
  staleAt?: number;
  staleLabel?: string;
  staleChoice?: 'drop' | 'move';
  stalePressAt?: number;
  movedAt?: number;
  moveLabel?: string;
  resolvedLabel?: string;
};
export type ListSim = {recs: ListRec[]; focus: {at: number; id: string | null}[]; total: Key[]};

type QEvent = ListEvent | {at: number; type: '_remove'; id: string; kind: 'collapse' | 'slide'} | {at: number; type: '_move'; id: string; to?: number};

/** Additive spring track: every key adds its delta through its own spring, so interrupted moves blend (FLIP by frame). */
export const evalTrack = (tr: Key[], frame: number, fps: number) => {
  if (!tr.length) return 0;
  let v = tr[0].v;
  for (let i = 1; i < tr.length; i++) {
    const d = tr[i].v - tr[i - 1].v;
    if (d) v += d * sp(frame, tr[i].at, fps, tr[i].cfg);
  }
  return v;
};

/** Pure: events → per-row position/height tracks + state times. Call once (useMemo), evaluate per frame. */
export const simulateList = (events: ListEvent[], fps: number, m: ListMetrics): ListSim => {
  const k = fps / 30;
  const q: QEvent[] = [...events].sort((a, b) => a.at - b.at);
  const recs = new Map<string, ListRec>();
  let order: string[] = [];
  let focusId: string | null = null;
  const focus: {at: number; id: string | null}[] = [];
  const total: Key[] = [];
  const push = (tr: Key[], key: Key) => {
    if (!tr.length) tr.push(key);
    else if (Math.abs(tr[tr.length - 1].v - key.v) > 0.01) tr.push(key);
  };
  const relayout = (at: number, delay: (id: string) => number = () => 0, cfg: (id: string) => Cfg = () => listSprings.reflow) => {
    let y = 0;
    for (const id of order) {
      const r = recs.get(id)!;
      const h = m.rowH + (id === focusId ? m.focusExtra : 0);
      push(r.y, {at: at + delay(id), v: y, cfg: cfg(id)});
      push(r.h, {at: at + delay(id), v: h, cfg: listSprings.focus});
      y += h + m.gap;
    }
    push(total, {at, v: Math.max(0, y - m.gap), cfg: listSprings.reflow});
  };
  const schedule = (e: QEvent) => {
    q.push(e);
    q.sort((a, b) => a.at - b.at);
  };
  const live = (id: string) => (order.includes(id) ? recs.get(id) : undefined);
  const moveTo = (id: string, to: number, at: number) => {
    const from = order.indexOf(id);
    if (from < 0) return;
    order.splice(from, 1);
    order.splice(Math.max(0, Math.min(order.length, to)), 0, id);
    recs.get(id)!.carries.push(at);
    relayout(at, (x) => (x === id ? 0 : LIST_T.follow * k), (x) => (x === id ? listSprings.carry : listSprings.reflow));
  };

  while (q.length) {
    const e = q.shift()!;
    switch (e.type) {
      case 'add': {
        if (order.includes(e.task.id)) break;
        const idx = Math.max(0, Math.min(order.length, e.index ?? order.length));
        const mid = idx < order.length;
        const enter = e.enter ?? 'drop';
        recs.set(e.task.id, {
          task: e.task,
          seq: recs.size,
          enterAt: e.at + (mid ? LIST_T.insertDelay * k : 0),
          enter,
          glow: e.glow ?? (mid || enter === 'write'),
          y: [],
          h: [],
          carries: [],
          patches: [],
        });
        order.splice(idx, 0, e.task.id);
        relayout(e.at);
        break;
      }
      case 'done': {
        const r = live(e.id);
        if (!r || r.doneAt !== undefined) break;
        r.doneAt = e.at;
        schedule({at: e.at + LIST_T.doneHold * k, type: '_remove', id: e.id, kind: 'collapse'});
        break;
      }
      case 'stale': {
        const r = live(e.id);
        if (!r || r.staleAt !== undefined || r.doneAt !== undefined) break;
        r.staleAt = e.at;
        r.staleLabel = e.label;
        r.staleChoice = e.choice ?? 'drop';
        r.stalePressAt = e.at + LIST_T.staleHold * k;
        r.moveLabel = e.moveLabel;
        r.resolvedLabel = e.resolvedLabel;
        if (r.staleChoice === 'drop') schedule({at: r.stalePressAt + LIST_T.staleExitDelay * k, type: '_remove', id: e.id, kind: 'slide'});
        else schedule({at: r.stalePressAt + LIST_T.staleExitDelay * k, type: '_move', id: e.id, to: e.to});
        break;
      }
      case '_move': {
        const r = live(e.id);
        if (!r) break;
        r.movedAt = e.at;
        moveTo(e.id, e.to ?? order.length - 1, e.at);
        break;
      }
      case 'move':
        moveTo(e.id, e.to, e.at);
        break;
      case 'order': {
        const next = [...e.ids.filter((id) => order.includes(id)), ...order.filter((id) => !e.ids.includes(id))];
        let carried: string | null = null;
        let best = 0;
        next.forEach((id, i) => {
          const d = order.indexOf(id) - i;
          if (d > best) {
            best = d;
            carried = id;
          }
        });
        order = next;
        if (carried) recs.get(carried)!.carries.push(e.at);
        relayout(e.at, (id) => (id === carried ? 0 : LIST_T.follow * k), (id) => (id === carried ? listSprings.carry : listSprings.reflow));
        break;
      }
      case 'focus': {
        const id = e.id && order.includes(e.id) ? e.id : null;
        if (id === focusId) break;
        focusId = id;
        focus.push({at: e.at, id});
        relayout(e.at, () => 0, () => listSprings.focus);
        break;
      }
      case 'update': {
        const r = recs.get(e.id);
        if (r) r.patches.push({at: e.at, patch: e.patch});
        break;
      }
      case 'remove':
        schedule({at: e.at, type: '_remove', id: e.id, kind: 'collapse'});
        break;
      case '_remove': {
        const r = live(e.id);
        if (!r) break;
        r.exitAt = e.at;
        r.exitKind = e.kind;
        order = order.filter((x) => x !== e.id);
        if (focusId === e.id) {
          focusId = null;
          focus.push({at: e.at, id: null});
        }
        relayout(e.at, () => LIST_T.closeDelay * k);
        break;
      }
    }
  }
  return {recs: [...recs.values()], focus, total};
};

/** Right-now blend: weight per row id (sums to ≤ 1). A change hands weight from the old row to the new one through listSprings.focus. */
const focusWeights = (focus: ListSim['focus'], frame: number, fps: number) => {
  const w = new Map<string, number>();
  for (const f of focus) {
    const p = clamp01(sp(frame, f.at, fps, listSprings.focus));
    if (p <= 0) continue;
    for (const [id, v] of w) w.set(id, v * (1 - p));
    if (f.id) w.set(f.id, (w.get(f.id) ?? 0) + p);
  }
  return w;
};

const taskAt = (r: ListRec, frame: number) => {
  let t = r.task;
  for (const p of r.patches) if (p.at <= frame) t = {...t, ...p.patch};
  return t;
};

/* ═══════════════════════════ TaskRow (pure visual) ═══════════════════════════ */

export type TaskRowState = {
  /** check fill 0..1 (may overshoot: pop) */ check?: number;
  /** tick path draw 0..1 */ tick?: number;
  /** strike-through 0..1 */ strike?: number;
  /** text → muted 0..1 */ dim?: number;
  /** right-now weight 0..1 */ focus?: number;
  /** carried in a reorder 0..1 */ lift?: number;
  /** "new" glow 0..1 */ glow?: number;
  /** done flash on the border 0..1 */ flash?: number;
  /** write-in: card / checkbox / tag / title reveal, each 0..1 (omit = fully shown) */ write?: {card: number; check: number; tag: number; text: number};
  /** stale choice pills: appear 0..1, pressed 0..1 */ choice?: {show: number; press: number; pick: 'drop' | 'move'};
  /** replaces the source tag ("→ Tomorrow") */ rightLabel?: {text: string; t: number};
  /** meta line, already swapped (default: task.meta) */ meta?: React.ReactNode;
};

const Check: React.FC<{m: ListMetrics; th: ListTheme; s: TaskRowState}> = ({m, th, s}) => {
  const c = m.check;
  const fill = Math.max(0, s.check ?? 0);
  const tick = clamp01(s.tick ?? 0);
  const ringCol = mx(th.rule, th.accent, Math.max(clamp01(s.focus ?? 0), clamp01(fill)));
  const inS = s.write ? s.write.check : 1;
  return (
    <svg width={c} height={c} viewBox="0 0 30 30" style={{flexShrink: 0, overflow: 'visible', transform: `scale(${inS})`, opacity: clamp01(inS * 1.5)}}>
      <circle cx={15} cy={15} r={13} fill="none" stroke={ringCol} strokeWidth={2} />
      <circle cx={15} cy={15} r={13.6} fill={th.accent} style={{transform: `scale(${fill})`, transformOrigin: '15px 15px'}} />
      <path
        d="M9.2 15.6l3.9 3.9 7.8-8.3"
        fill="none"
        stroke={th.onAccent}
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - tick}
      />
    </svg>
  );
};

const ChoicePills: React.FC<{m: ListMetrics; th: ListTheme; c: NonNullable<TaskRowState['choice']>; labels: {drop: string; move: string}}> = ({m, th, c, labels}) => (
  <div style={{display: 'flex', gap: 10 * m.size, flexShrink: 0}}>
    {(['drop', 'move'] as const).map((opt, i) => {
      const show = clamp01(c.show * 1.15 - i * 0.15);
      const picked = c.pick === opt;
      const pr = picked ? c.press : 0;
      const sq = picked ? 1 - 0.1 * bump(pr * 2) : 1;
      const bg =
        picked && pr > 0
          ? opt === 'drop'
            ? alpha(th.fg, lerp(0.06, 1, clamp01(pr * 3)))
            : alpha(th.accent, lerp(0.14, 1, clamp01(pr * 3)))
          : opt === 'move'
            ? alpha(th.accent, 0.14)
            : alpha(th.fg, 0.06);
      const col = picked && pr > 0.3 ? (opt === 'drop' ? th.surface : th.onAccent) : opt === 'move' ? th.accent2 : th.fg;
      return (
        <div
          key={opt}
          style={{
            height: 40 * m.size,
            padding: `0 ${18 * m.size}px`,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            background: bg,
            border: `1px solid ${opt === 'move' ? alpha(th.accent, 0.4) : th.rule}`,
            color: col,
            fontFamily: th.font,
            fontWeight: 500,
            fontSize: 18 * m.size,
            opacity: clamp01(show * 1.4),
            transform: `scale(${(0.86 + 0.14 * show) * sq})`,
          }}
        >
          {labels[opt]}
        </div>
      );
    })}
  </div>
);

/** One task row. Pure visual: give it a state, it draws. ListAssemble drives it from the event timeline. */
export const TaskRow: React.FC<{
  task: ListTask;
  height: number;
  state?: TaskRowState;
  size?: number;
  width?: number;
  theme?: Partial<ListTheme>;
  focusLabel?: string;
  choiceLabels?: {drop: string; move: string};
}> = ({task, height, state = {}, size = 1, width = 940, theme, focusLabel = 'Right now', choiceLabels = {drop: 'Drop', move: 'Move'}}) => {
  const th = useListTheme(theme);
  const m = listMetrics(size, width);
  const s = state;
  const focus = clamp01(s.focus ?? 0);
  const lift = clamp01(s.lift ?? 0);
  const glow = clamp01(s.glow ?? 0);
  const flash = clamp01(s.flash ?? 0);
  const dim = clamp01(s.dim ?? 0);
  const w = s.write;
  const textP = w ? w.text : 1;
  const edge = textP * 125; // % of title width
  const border = mx(mx(th.border, th.rule, lift), th.accent, Math.max(focus * 0.85, glow * 0.9, flash));
  const shadows =
    [
      lift > 0 ? `0 ${22 * lift * size}px ${56 * lift * size}px ${shadow(th, 0.75 * lift)}` : '',
      glow > 0 ? `0 0 ${36 * glow * size}px ${alpha(th.accent, 0.28 * glow)}` : '',
      focus > 0 ? `0 ${14 * size}px ${48 * size}px ${alpha(th.accent, 0.16 * focus)}` : '',
    ]
      .filter(Boolean)
      .join(', ') || 'none';
  const titleCol = mx(th.fg, th.muted, dim);
  const meta = s.meta !== undefined ? s.meta : task.meta;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        height,
        borderRadius: m.radius,
        overflow: 'hidden',
        background: mx(th.surface, mx(th.surface, th.accentDeep, 0.55), focus),
        border: `1px solid ${border}`,
        boxShadow: shadows,
        display: 'flex',
        alignItems: 'center',
        gap: 20 * size,
        padding: `0 ${m.padX}px`,
        opacity: w ? clamp01(w.card * 1.6) : 1,
      }}
    >
      <Check m={m} th={th} s={s} />
      <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{height: m.focusExtra * focus, overflow: 'hidden', display: 'flex', alignItems: 'flex-start', opacity: clamp01(focus * 1.6 - 0.5)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 9 * size, fontFamily: th.mono, fontSize: m.eyebrow, color: th.accent2, letterSpacing: '0.1em', textTransform: 'uppercase'}}>
            <span style={{width: 7 * size, height: 7 * size, borderRadius: 9, background: th.accent, boxShadow: `0 0 ${10 * size}px ${th.accent}`}} />
            {focusLabel}
          </div>
        </div>
        <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2}}>
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              fontFamily: th.font,
              fontWeight: 500,
              fontSize: m.title,
              letterSpacing: '-0.012em',
              color: titleCol,
              WebkitMaskImage: w ? `linear-gradient(90deg, #000 ${edge - 22}%, transparent ${edge}%)` : undefined,
            }}
          >
            {task.title}
            {w && textP < 1 ? (
              <span style={{position: 'absolute', inset: 0, color: th.accent2, WebkitMaskImage: `linear-gradient(90deg, transparent ${edge - 34}%, #000 ${edge - 12}%, transparent ${edge}%)`}}>
                {task.title}
              </span>
            ) : null}
            <span
              style={{
                position: 'absolute',
                left: -3 * size,
                right: -3 * size,
                top: '55%',
                height: 2.5 * size,
                borderRadius: 2,
                background: th.fg2,
                transform: `scaleX(${clamp01(s.strike ?? 0)})`,
                transformOrigin: 'left center',
              }}
            />
          </span>
        </div>
        {meta !== undefined && meta !== null && meta !== '' ? (
          <div
            style={{
              marginTop: 4 * size,
              fontFamily: th.font,
              fontWeight: 400,
              fontSize: m.meta,
              color: th.muted,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: w ? clamp01(w.text * 1.4 - 0.3) : 1,
            }}
          >
            {meta}
          </div>
        ) : null}
      </div>
      {s.choice ? (
        <ChoicePills m={m} th={th} c={s.choice} labels={choiceLabels} />
      ) : s.rightLabel && s.rightLabel.t > 0 ? (
        <div style={{fontFamily: th.mono, fontSize: m.chip, color: th.accent2, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: s.rightLabel.t}}>{s.rightLabel.text}</div>
      ) : task.source ? (
        <SourceTag
          source={task.source}
          label={task.label}
          logo={task.logo}
          size={size}
          theme={th}
          grow={w ? w.tag : 1}
          active={focus > 0.5}
          style={{opacity: w ? clamp01(w.tag * 1.6) : 1 - dim * 0.5}}
        />
      ) : null}
    </div>
  );
};

/* ═══════════════════════════ ListAssemble (the hero) ═══════════════════════════ */

const RollNumber: React.FC<{value: (f: number) => number; frame: number; fps: number; style?: React.CSSProperties}> = ({value, frame, fps, style}) => {
  const k = fps / 30;
  const span = Math.round(8 * k);
  const cur = value(frame);
  let prev = cur;
  let d = 0;
  for (let i = 1; i <= span; i++) {
    const v = value(frame - i);
    if (v !== cur) {
      prev = v;
      d = i;
      break;
    }
  }
  const p = d ? easings.outExpo(clamp01((d - 1) / span)) : 1;
  const dir = cur > prev ? 1 : -1;
  return (
    <span style={{position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', ...style}}>
      <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 70 * dir}%)`, opacity: p}}>{cur}</span>
      {p < 1 ? <span style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${-p * 70 * dir}%)`, opacity: 1 - p}}>{prev}</span> : null}
    </span>
  );
};

export type ListAssembleProps = {
  events: ListEvent[];
  width?: number;
  size?: number;
  theme?: Partial<ListTheme>;
  /** header above the list: title, a small mono date, and a live "N open" counter */
  header?: {title: string; date?: string; at?: number; countLabel?: string};
  focusLabel?: string;
  choiceLabels?: {drop: string; move: string};
  style?: React.CSSProperties;
};

/**
 * The self-maintaining list. Script it with events:
 * add (drop | rise | write, optional index → others make room) · done (tick, strike, collapse, gap closes) ·
 * move / order (FLIP reorder: the promoted row is carried, the rest follow 3 frames later) ·
 * stale (dims, Drop / Move pills, pick, slides out or moves) · focus (right-now ring travels, the row grows) · update (meta swap) · remove.
 * Positioned top-left; the parent places it. Height grows with the list (read `listHeight` if you need it).
 */
export const ListAssemble: React.FC<ListAssembleProps> = ({events, width = 940, size = 1, theme, header, focusLabel = 'Right now', choiceLabels, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = fps / 30;
  const th = useListTheme(theme);
  const m = useMemo(() => listMetrics(size, width), [size, width]);
  const sim = useMemo(() => simulateList(events, fps, m), [events, fps, m]);
  const fw = focusWeights(sim.focus, frame, fps);
  const totalH = evalTrack(sim.total, frame, fps);
  const headH = header ? m.headerH : 0;

  const openAt = (f: number) =>
    sim.recs.filter(
      (r) => r.enterAt <= f && !(r.doneAt !== undefined && r.doneAt + (LIST_T.tickDelay + LIST_T.tick) * k <= f) && !(r.exitAt !== undefined && r.exitAt <= f),
    ).length;

  // live rects (for the ring)
  const rect = new Map<string, {y: number; h: number}>();
  for (const r of sim.recs) rect.set(r.task.id, {y: evalTrack(r.y, frame, fps), h: evalTrack(r.h, frame, fps)});

  let ringW = 0;
  let ringY = 0;
  let ringH = 0;
  for (const [id, wgt] of fw) {
    const rc = rect.get(id);
    if (!rc || wgt <= 0) continue;
    ringW += wgt;
    ringY += rc.y * wgt;
    ringH += rc.h * wgt;
  }
  if (ringW > 0) {
    ringY /= ringW;
    ringH /= ringW;
  }
  // a carried row passing over the focused one hides the ring (otherwise its edge peeks out and the wrong row looks focused)
  let occ = 0;
  for (const r of sim.recs) {
    if (frame < r.enterAt || (fw.get(r.task.id) ?? 0) > 0.5) continue;
    let lift = 0;
    for (const c of r.carries) lift = Math.max(lift, bump(sp(frame, c, fps, listSprings.carry)));
    if (lift < 0.02) continue;
    const rc = rect.get(r.task.id)!;
    const ov = Math.max(0, Math.min(rc.y + rc.h, ringY + ringH) - Math.max(rc.y, ringY)) / Math.max(1, ringH);
    occ = Math.max(occ, clamp01(ov * 1.4) * clamp01(lift * 3));
  }
  const ringOp = clamp01(ringW) * (1 - 0.9 * occ);
  const ringPad = 6 * size;

  const headerAt = header?.at ?? Math.min(...events.map((e) => e.at)) - 6 * k;
  const hp = ease(frame, headerAt, 14 * k);

  return (
    <div style={{position: 'relative', width, height: headH + totalH, ...style}}>
      {header ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: headH - 18 * size,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: `${headH - 18 * size - 52 * size}px ${6 * size}px 0`,
            opacity: hp,
            transform: `translateY(${(1 - hp) * 14 * size}px)`,
            filter: hp < 1 ? `blur(${(1 - hp) * 6}px)` : undefined,
          }}
        >
          <div style={{display: 'flex', alignItems: 'baseline', gap: 18 * size}}>
            <span style={{fontFamily: th.display, fontWeight: 600, fontSize: 40 * size, letterSpacing: '-0.03em', color: th.fg}}>{header.title}</span>
            {header.date ? <span style={{fontFamily: th.mono, fontSize: 14 * size, color: th.muted, letterSpacing: '0.08em', textTransform: 'uppercase'}}>{header.date}</span> : null}
          </div>
          <span style={{fontFamily: th.mono, fontSize: 15 * size, color: th.fg2, letterSpacing: '0.06em', textTransform: 'uppercase'}}>
            <RollNumber value={openAt} frame={frame} fps={fps} style={{color: th.fg}} /> {header.countLabel ?? 'open'}
          </span>
        </div>
      ) : null}
      <div style={{position: 'absolute', left: 0, top: headH, width}}>
        {sim.recs.map((r) => {
          if (frame < r.enterAt) return null;
          const exitDur = (r.exitKind === 'slide' ? LIST_T.staleExit : LIST_T.collapse) * k;
          if (r.exitAt !== undefined && frame > r.exitAt + exitDur) return null;
          const id = r.task.id;
          const {y, h} = rect.get(id)!;
          const task = taskAt(r, frame);
          const st: TaskRowState = {};
          let tx = 0;
          let ty = 0;
          let sc = 1;
          let blur = 0;
          let op = 1;
          let z = 10 + r.seq;

          // entrance
          if (r.enter === 'drop') {
            const p = sp(frame, r.enterAt, fps, listSprings.drop);
            sc = 1 + (DROP.scale - 1) * (1 - p);
            blur = Math.max(0, DROP.blur * size * (1 - p * 1.15));
            op = clamp01(p * 1.8);
            tx = DROP.dx * width * (1 - p);
            ty = DROP.dy * size * (1 - p);
            if (p < 0.98) z = 200 + r.seq;
          } else if (r.enter === 'rise') {
            const p = sp(frame, r.enterAt, fps, springs.ui);
            ty = 28 * size * (1 - p);
            blur = 8 * (1 - p);
            op = clamp01(p * 1.5);
            sc = 0.97 + 0.03 * p;
          } else {
            const card = ease(frame, r.enterAt, 4 * k, easings.outQuint);
            st.write = {
              card,
              check: Math.max(0, sp(frame, r.enterAt, fps, listSprings.chip)),
              tag: ease(frame, r.enterAt + 1 * k, LIST_T.writeTag * k),
              text: ease(frame, r.enterAt + 2 * k, LIST_T.writeText * k, easings.outQuint),
            };
            ty = 10 * size * (1 - card);
            if (st.write.text >= 1 && st.write.tag >= 1 && st.write.check > 0.99) st.write = undefined;
          }
          if (r.glow) {
            const g0 = r.enterAt + 4 * k;
            st.glow = frame < g0 ? ease(frame, r.enterAt, 4 * k) : 1 - ease(frame, g0 + 8 * k, LIST_T.glow * k, easings.inOutSine);
          }

          // carried in a reorder
          let lift = 0;
          for (const c of r.carries) lift = Math.max(lift, bump(sp(frame, c, fps, listSprings.carry)));
          if (lift > 0.01) {
            st.lift = lift;
            sc *= 1 + 0.03 * lift;
            z = 300 + r.seq;
          }

          // focus
          st.focus = fw.get(id) ?? 0;

          // done
          if (r.doneAt !== undefined && frame >= r.doneAt) {
            st.check = sp(frame, r.doneAt, fps, listSprings.tick);
            st.tick = ease(frame, r.doneAt + LIST_T.tickDelay * k, LIST_T.tick * k, easings.outQuint);
            st.strike = ease(frame, r.doneAt + LIST_T.strikeDelay * k, LIST_T.strike * k, easings.outQuint);
            st.dim = ease(frame, r.doneAt + LIST_T.strikeDelay * k, 10 * k, easings.inOutSine);
            st.flash = 1 - ease(frame, r.doneAt, 20 * k, easings.inOutSine);
          }

          // meta (with swaps: patches and stale label)
          let meta: React.ReactNode = task.meta;
          const swaps: {at: number}[] = r.patches.filter((p) => p.patch.meta !== undefined).map((p) => ({at: p.at}));
          if (r.staleAt !== undefined && r.staleLabel) swaps.push({at: r.staleAt});
          const resolvedAt = r.movedAt !== undefined ? r.movedAt + 6 * k : undefined;
          if (resolvedAt !== undefined) swaps.push({at: resolvedAt});
          const metaAt = (f: number) =>
            resolvedAt !== undefined && f >= resolvedAt
              ? (r.resolvedLabel ?? 'Moved to tomorrow')
              : r.staleAt !== undefined && r.staleLabel && f >= r.staleAt
                ? r.staleLabel
                : taskAt(r, f).meta;
          swaps.sort((a, b) => a.at - b.at);
          for (const sw of swaps) {
            if (frame >= sw.at - LIST_T.swapOut * k && frame < sw.at) {
              meta = <span style={{opacity: 1 - ease(frame, sw.at - LIST_T.swapOut * k, LIST_T.swapOut * k, easings.inQuad)}}>{metaAt(sw.at - 1)}</span>;
            } else if (frame >= sw.at && frame < sw.at + LIST_T.swapIn * k) {
              const t = ease(frame, sw.at, LIST_T.swapIn * k);
              meta = (
                <span style={{display: 'inline-block', opacity: t, transform: `translateY(${(1 - t) * 6 * size}px)`, color: r.staleAt === sw.at ? th.fg2 : undefined}}>{metaAt(sw.at)}</span>
              );
            } else if (frame >= sw.at + LIST_T.swapIn * k) {
              meta = <span style={{color: r.staleAt !== undefined && frame >= r.staleAt ? th.fg2 : undefined}}>{metaAt(frame)}</span>;
            }
          }
          st.meta = meta;

          // stale
          if (r.staleAt !== undefined && frame >= r.staleAt) {
            const d = ease(frame, r.staleAt, LIST_T.staleDim * k, easings.inOutSine);
            st.dim = Math.max(st.dim ?? 0, d * 0.75);
            const showAt = r.staleAt + LIST_T.staleChoice * k;
            const resolved = r.staleChoice === 'move' && r.movedAt !== undefined && frame >= r.movedAt + 6 * k;
            if (frame >= showAt && !resolved) {
              st.choice = {
                show: clamp01(sp(frame, showAt, fps, listSprings.chip)),
                press: r.stalePressAt !== undefined ? clamp01(sp(frame, r.stalePressAt, fps, listSprings.press)) : 0,
                pick: r.staleChoice ?? 'drop',
              };
            }
            if (resolved && r.movedAt !== undefined) st.rightLabel = {text: r.moveLabel ?? '→ Tomorrow', t: ease(frame, r.movedAt + 6 * k, 8 * k)};
          }

          // exits
          if (r.exitAt !== undefined && frame >= r.exitAt) {
            if (r.exitKind === 'slide') {
              const t = ease(frame, r.exitAt, LIST_T.staleExit * k, easings.inQuad);
              tx += t * width * 0.6;
              op *= 1 - ease(frame, r.exitAt + LIST_T.staleExit * 0.35 * k, LIST_T.staleExit * 0.65 * k, easings.inQuad);
              blur = Math.max(blur, t * 6);
            } else {
              const t = ease(frame, r.exitAt, LIST_T.collapse * k, easings.inQuad);
              op *= 1 - t;
              sc *= 1 - 0.04 * t;
              ty -= 6 * size * t;
            }
            z = 1;
          }

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                left: 0,
                top: y,
                width,
                height: h,
                zIndex: z,
                opacity: op,
                transform: `translate(${tx}px, ${ty}px) scale(${sc})`,
                transformOrigin: 'center center',
                filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
              }}
            >
              <TaskRow task={task} height={h} state={st} size={size} width={width} theme={th} focusLabel={focusLabel} choiceLabels={choiceLabels} />
            </div>
          );
        })}
        {ringOp > 0.002 ? (
          <div
            style={{
              position: 'absolute',
              left: -ringPad,
              top: ringY - ringPad,
              width: width + ringPad * 2,
              height: ringH + ringPad * 2,
              zIndex: 150,
              borderRadius: m.radius + ringPad,
              border: `${2 * size}px solid ${alpha(th.accent, 0.95 * ringOp)}`,
              boxShadow: `0 0 0 ${4 * size}px ${alpha(th.accent, 0.12 * ringOp)}, 0 0 ${44 * size}px ${alpha(th.accent, 0.3 * ringOp)}`,
              transform: `scale(${1 + 0.035 * (1 - ringOp)})`,
              pointerEvents: 'none',
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

/** Height of the list (header + rows) at `frame`, for layouts that need to centre it. */
export const listHeight = (events: ListEvent[], frame: number, fps: number, size = 1, width = 940, header = false) => {
  const m = listMetrics(size, width);
  return (header ? m.headerH : 0) + evalTrack(simulateList(events, fps, m).total, frame, fps);
};

/* ═══════════════════════════ typed text ═══════════════════════════ */

/**
 * Text that types itself. trail = 'color': newest chars are `trailColor` and cool to `color`;
 * trail = 'fade': newest chars fade in (machine typing, use cps 60). Chars appear per typeSchedule (deterministic jitter).
 */
export const TypeLine: React.FC<{
  text: string;
  start: number;
  cps?: number;
  color: string;
  trail?: 'color' | 'fade' | 'none';
  trailColor?: string;
  trailFrames?: number;
  jitterMs?: number;
  seed?: string;
  style?: React.CSSProperties;
}> = ({text, start, cps = 30, color, trail = 'color', trailColor, trailFrames = 5, jitterMs = 15, seed = 'line', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const tc = trailColor ?? b.colors.accent2;
  const sched = useMemo(() => typeSchedule(text, start, cps, fps, seed, jitterMs), [text, start, cps, fps, seed, jitterMs]);
  const tf = trailFrames * (fps / 30);
  return (
    <span style={{whiteSpace: 'pre', ...style}}>
      {text.split('').map((ch, i) => {
        const age = frame - sched[i];
        if (age < 0) return null;
        const t = clamp01(age / tf);
        return (
          <span key={i} style={{color: trail === 'color' ? mx(tc, color, t) : color, opacity: trail === 'fade' ? 0.25 + 0.75 * t : 1}}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};

/* ═══════════════════════════ PromptBar ═══════════════════════════ */

export type PromptBarProps = {
  text: string;
  /** frame typing starts */ startFrame?: number;
  /** chars per second (23–38 measured) */ cps?: number;
  /** frame the send button is pressed (default: 14 frames after the last char) */ sendAt?: number;
  /** frame the bar dissolves into a glow (bar → card); omit to keep it */ exitAt?: number;
  placeholder?: string;
  width?: number;
  size?: number;
  theme?: Partial<ListTheme>;
  seed?: string;
  style?: React.CSSProperties;
};

/** Input field: typing with a colour trail and caret, send-button press with a ripple, then a thinking shimmer inside the bar. */
export const PromptBar: React.FC<PromptBarProps> = ({text, startFrame = 0, cps = 30, sendAt, exitAt, placeholder = 'Ask anything…', width = 900, size = 1, theme, seed = 'prompt', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = fps / 30;
  const th = useListTheme(theme);
  const sched = useMemo(() => typeSchedule(text, startFrame, cps, fps, seed), [text, startFrame, cps, fps, seed]);
  const lastChar = sched[sched.length - 1] ?? startFrame;
  const send = sendAt ?? Math.round(lastChar + 14 * k);
  const n = sched.filter((t) => t <= frame).length;
  const typing = n > 0 && frame <= lastChar + 2 * k;
  const sent = frame >= send;
  const H = 84 * size;
  const btn = 56 * size;

  const caretOn = !sent && n > 0 && (typing || Math.floor((frame - lastChar) / (15 * k)) % 2 === 1);
  const active = ease(frame, sched[0] ?? startFrame, 4 * k);
  const press = clamp01(sp(frame, send, fps, listSprings.press));
  const squash = sent ? 1 - 0.14 * bump(press * 1.6) : 1;
  const ripple = sent ? ease(frame, send, 14 * k, easings.outQuint) : 0;
  const think = sent ? ease(frame, send + 3 * k, 8 * k) : 0;
  const ex = exitAt !== undefined ? ease(frame, exitAt, 8 * k, easings.inQuad) : 0;
  const glowOut = exitAt !== undefined ? 1 - ease(frame, exitAt + 6 * k, 14 * k, easings.inOutSine) : 1;
  const breathe = 0.85 + 0.15 * Math.sin(((frame - send) / (30 * k)) * Math.PI * 2);
  const enter = ease(frame, startFrame - 10 * k, 12 * k);
  const local = (((frame - send) % (LIST_T.shimmerPeriod * k)) + LIST_T.shimmerPeriod * k) % (LIST_T.shimmerPeriod * k);
  const band = (-0.3 + 1.6 * clamp01(local / (LIST_T.shimmerSweep * 1.4 * k))) * 100;

  return (
    <div style={{position: 'relative', width, height: H, ...style}}>
      {/* glow bloom behind the bar */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: width * 1.15,
          height: H * 2.6,
          transform: `translate(-50%, -50%) scale(${0.8 + 0.25 * think + 0.15 * ex})`,
          background: `radial-gradient(ellipse at center, ${alpha(th.accent, 0.42)} 0%, ${alpha(th.accent, 0.12)} 45%, transparent 70%)`,
          opacity: think * breathe * glowOut,
          filter: `blur(${18 * size}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 999,
          background: th.surface2,
          border: `1px solid ${mx(th.rule, th.accent, think * 0.8)}`,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${14 * size}px 0 ${30 * size}px`,
          gap: 18 * size,
          overflow: 'hidden',
          boxShadow: `0 ${20 * size}px ${60 * size}px ${shadow(th, 0.55)}`,
          opacity: enter * (1 - ex),
          transform: `translateY(${(1 - enter) * 16 * size}px) scale(${1 + 0.05 * ex}, ${1 - 0.15 * ex})`,
          filter: ex > 0 ? `blur(${18 * ex * size}px)` : undefined,
        }}
      >
        {/* thinking sweep inside the bar */}
        {think > 0 ? (
          <div style={{position: 'absolute', inset: 0, opacity: think * 0.9, background: `linear-gradient(100deg, transparent ${band - 25}%, ${alpha(th.accent, 0.16)} ${band}%, transparent ${band + 25}%)`}} />
        ) : null}
        <svg width={22 * size} height={22 * size} viewBox="0 0 24 24" fill="none" stroke={th.muted} strokeWidth={2} strokeLinecap="round" style={{flexShrink: 0}}>
          <path d="M12 5v14M5 12h14" />
        </svg>
        <div
          style={{
            position: 'relative',
            flex: 1,
            minWidth: 0,
            whiteSpace: 'pre',
            overflow: 'hidden',
            fontFamily: th.font,
            fontWeight: 400,
            fontSize: 28 * size,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {n === 0 ? <span style={{color: th.muted}}>{placeholder}</span> : null}
          {n > 0 && !sent
            ? text
                .slice(0, n)
                .split('')
                .map((ch, i) => (
                  <span key={i} style={{color: mx(th.accent2, th.fg, clamp01((frame - sched[i]) / (5 * k)))}}>
                    {ch}
                  </span>
                ))
            : null}
          {sent ? <span style={shimmerStyle(frame, send + 3 * k, fps, mx(th.fg, th.fg2, think), th.fg)}>{text}</span> : null}
          {caretOn ? <span style={{display: 'inline-block', width: 2.5 * size, height: 32 * size, marginLeft: 2 * size, borderRadius: 2, background: th.accent}} /> : null}
        </div>
        <div style={{position: 'relative', width: btn, height: btn, flexShrink: 0}}>
          {ripple > 0 && ripple < 1 ? (
            <div style={{position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${th.accent}`, transform: `scale(${1 + 0.9 * ripple})`, opacity: 0.7 * (1 - ripple)}} />
          ) : null}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: mx(mx(th.surface2, th.fg, 0.08), th.accent, active),
              transform: `scale(${squash})`,
            }}
          >
            <svg width={26 * size} height={26 * size} viewBox="0 0 24 24" fill="none" stroke={mx(th.muted, th.onAccent, active)} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════ ThinkingState ═══════════════════════════ */

/** Ring spinner, one turn per 24 frames. Colour defaults to the brand accent. */
export const Spinner: React.FC<{size?: number; color?: string; start?: number}> = ({size = 20, color, start = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const c = color ?? b.colors.accent;
  const rot = ((frame - start) / (LIST_T.spinnerTurn * (fps / 30))) * 360;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `rotate(${rot}deg)`, flexShrink: 0}}>
      <circle cx={12} cy={12} r={9} fill="none" stroke={alpha(c, 0.2)} strokeWidth={2.4} />
      <circle cx={12} cy={12} r={9} fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round" pathLength={1} strokeDasharray="0.72 1" />
    </svg>
  );
};

export type ThinkingStateProps = {
  label?: string;
  /** step lines that appear one by one under the label (2–6 frames apart) */
  lines?: string[];
  startFrame?: number;
  lineGap?: number;
  /** frame the thinking block hands over to `children` */
  resolveAt?: number;
  children?: React.ReactNode;
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: number;
  width?: number;
  theme?: Partial<ListTheme>;
  style?: React.CSSProperties;
};

/** "Thinking…" with a shimmer sweep, step lines, a spinner/dots, then a blur hand-off into the result. */
export const ThinkingState: React.FC<ThinkingStateProps> = ({label = 'Thinking', lines = [], startFrame = 0, lineGap = 5, resolveAt, children, variant = 'spinner', size = 1, width = 760, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = fps / 30;
  const th = useListTheme(theme);
  const enter = ease(frame, startFrame, 6 * k);
  const out = resolveAt !== undefined ? ease(frame, resolveAt, 8 * k, easings.inQuad) : 0;
  const inn = resolveAt !== undefined ? ease(frame, resolveAt + 4 * k, 14 * k) : 0;
  const shim = (base: string) => shimmerStyle(frame, startFrame + 4 * k, fps, base, th.fg);
  const deco =
    variant === 'spinner' ? (
      <Spinner size={24 * size} color={th.accent} start={startFrame} />
    ) : variant === 'pulse' ? (
      <span
        style={{
          width: 12 * size,
          height: 12 * size,
          borderRadius: 99,
          background: th.accent,
          boxShadow: `0 0 0 ${(4 + 4 * Math.sin((frame / (20 * k)) * Math.PI * 2)) * size}px ${alpha(th.accent, 0.2)}`,
        }}
      />
    ) : null;
  return (
    <div style={{position: 'relative', display: 'grid', width, ...style}}>
      <div style={{gridArea: '1 / 1', opacity: enter * (1 - out), transform: `translateY(${((1 - enter) * 8 - out * 10) * size}px)`, filter: out > 0 ? `blur(${out * 8}px)` : undefined}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14 * size}}>
          {deco}
          <span style={{fontFamily: th.font, fontWeight: 500, fontSize: 30 * size, letterSpacing: '-0.015em', ...shim(th.fg2)}}>
            {label}
            {variant === 'dots' ? (
              <span>
                {[0, 1, 2].map((i) => {
                  const ph = ((((frame - startFrame - i * 4 * k) / (24 * k)) % 1) + 1) % 1;
                  return (
                    <span key={i} style={{opacity: 0.25 + 0.75 * bump(ph * 2), WebkitTextFillColor: th.fg2}}>
                      .
                    </span>
                  );
                })}
              </span>
            ) : (
              '…'
            )}
          </span>
        </div>
        {lines.map((ln, i) => {
          const at = startFrame + (6 + i * lineGap) * k;
          const t = ease(frame, at, 4 * k, easings.outQuint);
          return (
            <div
              key={i}
              style={{marginTop: (i === 0 ? 14 : 8) * size, paddingLeft: 38 * size, display: 'flex', alignItems: 'center', gap: 12 * size, opacity: t, transform: `translateY(${(1 - t) * 4 * size}px)`}}
            >
              <span style={{width: 6 * size, height: 6 * size, borderRadius: 9, background: th.rule, flexShrink: 0}} />
              <span style={{fontFamily: th.font, fontWeight: 400, fontSize: 22 * size, ...shim(th.muted)}}>{ln}</span>
            </div>
          );
        })}
      </div>
      {children && resolveAt !== undefined && frame >= resolveAt + 4 * k ? (
        <div style={{gridArea: '1 / 1', opacity: inn, transform: `translateY(${(1 - inn) * 10 * size}px)`, filter: inn < 1 ? `blur(${(1 - inn) * 10}px)` : undefined}}>{children}</div>
      ) : null}
    </div>
  );
};

/* ═══════════════════════════ SourcePipeline ═══════════════════════════ */

export type PipelineStage = {label: string; sub?: string; source?: ListSource; at: number; doneAt?: number};

export type SourcePipelineProps = {
  title?: string;
  stages: PipelineStage[];
  startFrame?: number;
  /** show every stage as grey "queued" from the start (otherwise each appears, typed, at its `at`) */
  pendingVisible?: boolean;
  /** machine typing speed for labels (≈ 60) */
  cps?: number;
  width?: number;
  size?: number;
  theme?: Partial<ListTheme>;
  style?: React.CSSProperties;
};

/** Pipeline card: a rail of status dots (queued → running pulse → done ✓), labels typed at machine speed, dashed connector filling as work flows down. */
export const SourcePipeline: React.FC<SourcePipelineProps> = ({title = 'Context', stages, startFrame = 0, pendingVisible = false, cps = 60, width = 640, size = 1, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = fps / 30;
  const th = useListTheme(theme);
  const cardIn = ease(frame, startFrame, 8 * k);
  const stageH = 96 * size;
  const dot = 16 * size;
  const dashes = 5;
  return (
    <div
      style={{
        width,
        padding: `${30 * size}px ${32 * size}px ${16 * size}px`,
        borderRadius: 22 * size,
        background: th.surface,
        border: `1px solid ${th.border}`,
        boxShadow: `0 ${30 * size}px ${80 * size}px ${shadow(th, 0.6)}`,
        opacity: clamp01(cardIn * 1.4),
        transform: `translateY(${(1 - cardIn) * 14 * size}px)`,
        ...style,
      }}
    >
      <div style={{fontFamily: th.display, fontWeight: 600, fontSize: 34 * size, letterSpacing: '-0.025em', color: th.fg, marginBottom: 24 * size, height: 42 * size}}>
        <TypeLine text={title} start={startFrame + 1 * k} cps={cps} color={th.fg} trail="fade" trailFrames={3} jitterMs={0} seed="pipe-title" />
      </div>
      {stages.map((s, i) => {
        const visible = pendingVisible ? frame >= startFrame + (4 + i * 2) * k : frame >= s.at;
        if (!visible) return <div key={i} style={{height: stageH}} />;
        const active = frame >= s.at;
        const done = s.doneAt !== undefined && frame >= s.doneAt;
        const lightT = ease(frame, s.at, 2 * k, easings.linear);
        const dotCol = active ? th.accent : th.rule;
        const pulsePh = ((((frame - s.at) / (24 * k)) % 1) + 1) % 1;
        const showT = pendingVisible ? ease(frame, startFrame + (4 + i * 2) * k, 6 * k) : 1;
        const next = stages[i + 1];
        const fillAt = s.doneAt ?? next?.at;
        const checkT = done ? ease(frame, s.doneAt!, 3 * k) : 0;
        return (
          <div key={i} style={{position: 'relative', height: stageH, display: 'flex', gap: 20 * size, opacity: showT}}>
            <div style={{position: 'relative', width: 24 * size, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 * size}}>
              <div style={{position: 'relative', width: dot, height: dot}}>
                {active && !done ? (
                  <div style={{position: 'absolute', inset: 0, borderRadius: 99, background: th.accent, transform: `scale(${1 + 1.3 * pulsePh})`, opacity: 0.45 * (1 - pulsePh)}} />
                ) : null}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 99,
                    background: active ? alpha(dotCol, 0.35 + 0.65 * lightT) : 'transparent',
                    border: active ? 'none' : `2px solid ${th.rule}`,
                    boxShadow: active ? `0 0 ${14 * size}px ${alpha(th.accent, 0.55 * lightT)}` : 'none',
                  }}
                />
              </div>
              {next ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: 5 * size, marginTop: 8 * size}}>
                  {Array.from({length: dashes}).map((_, j) => {
                    const lit = fillAt !== undefined && frame >= fillAt + j * 0.6 * k;
                    return <div key={j} style={{width: 3 * size, height: 8 * size, borderRadius: 2, background: lit ? th.accent : alpha(th.rule, 0.7)}} />;
                  })}
                </div>
              ) : null}
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10 * size, fontFamily: th.font, fontWeight: 500, fontSize: 24 * size, color: active ? th.fg : th.muted, height: 30 * size}}>
                {s.source ? <SourceGlyph source={s.source} size={20 * size} color={active ? th.accent2 : th.muted} /> : null}
                {pendingVisible || !active ? <span>{s.label}</span> : <TypeLine text={s.label} start={s.at} cps={cps} color={th.fg} trail="fade" trailFrames={3} jitterMs={0} seed={`pl-${i}`} />}
              </div>
              {s.sub ? (
                <div style={{marginTop: 6 * size, fontFamily: th.font, fontWeight: 400, fontSize: 19 * size, color: th.muted, height: 24 * size, whiteSpace: 'nowrap', overflow: 'hidden'}}>
                  {active ? (
                    <TypeLine text={s.sub} start={s.at + 2 * k} cps={cps} color={th.muted} trail="fade" trailFrames={3} jitterMs={0} seed={`ps-${i}`} />
                  ) : pendingVisible ? (
                    <span style={{opacity: 0.5}}>{s.sub}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
            <svg width={24 * size} height={24 * size} viewBox="0 0 24 24" style={{flexShrink: 0, marginTop: 3 * size, opacity: checkT, transform: `translateY(${(1 - checkT) * 3 * size}px)`}}>
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={th.accent2} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════ ContextChip ═══════════════════════════ */

export type ContextItem = {label: string; source?: ListSource; sub?: string};

export type ContextChipProps = {
  label?: string;
  startFrame?: number;
  /** count badge that ticks from `countFrom` to `count` starting at `countAt` (one step per 3 frames) */
  count?: number;
  countFrom?: number;
  countAt?: number;
  /** dropdown under the chip (opens in 3 frames with a 6 px drop) */
  items?: ContextItem[];
  openAt?: number;
  checkIndex?: number;
  checkAt?: number;
  size?: number;
  theme?: Partial<ListTheme>;
  style?: React.CSSProperties;
};

/** "Context" pill with its own glyph, a live count, and an optional dropdown of what it knows. */
export const ContextChip: React.FC<ContextChipProps> = ({label = 'Context', startFrame = 0, count, countFrom = 0, countAt, items = [], openAt, checkIndex, checkAt, size = 1, theme, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = fps / 30;
  const th = useListTheme(theme);
  const p = Math.max(0, sp(frame, startFrame, fps, listSprings.chip));
  const op = ease(frame, startFrame, 3 * k, easings.linear);
  const cAt = countAt ?? startFrame + 6 * k;
  const countVal = (f: number) => (count === undefined ? 0 : Math.min(count, Math.max(countFrom, countFrom + Math.floor((f - cAt) / (3 * k)) + 1)));
  const open = openAt !== undefined ? ease(frame, openAt, 3 * k, easings.linear) : 0;
  return (
    <div style={{position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', ...style}}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12 * size,
          height: 54 * size,
          padding: `0 ${18 * size}px 0 ${14 * size}px`,
          borderRadius: 999,
          background: th.surface2,
          border: `1px solid ${mx(th.border, th.accent, open * 0.6)}`,
          opacity: op,
          transform: `scale(${0.92 + 0.08 * p})`,
          transformOrigin: 'left center',
          boxShadow: `0 ${12 * size}px ${36 * size}px ${shadow(th, 0.5)}`,
        }}
      >
        <svg width={26 * size} height={26 * size} viewBox="0 0 26 26" style={{flexShrink: 0}}>
          <circle cx={13} cy={13} r={10} fill="none" stroke={alpha(th.accent, 0.55)} strokeWidth={1.8} />
          <circle cx={13} cy={13} r={6} fill="none" stroke={th.accent} strokeWidth={1.8} />
          <circle cx={13} cy={13} r={2.4} fill={th.accent2} />
        </svg>
        <span style={{fontFamily: th.font, fontWeight: 500, fontSize: 22 * size, color: th.fg}}>{label}</span>
        {count !== undefined ? (
          <span
            style={{
              fontFamily: th.mono,
              fontSize: 14 * size,
              color: th.accent2,
              background: alpha(th.accent, 0.16),
              borderRadius: 999,
              padding: `${4 * size}px ${10 * size}px`,
              minWidth: 28 * size,
              textAlign: 'center',
            }}
          >
            <RollNumber value={countVal} frame={frame} fps={fps} />
          </span>
        ) : null}
      </div>
      {items.length > 0 && open > 0 ? (
        <div
          style={{
            marginTop: 10 * size,
            minWidth: 420 * size,
            padding: 8 * size,
            borderRadius: 18 * size,
            background: th.surface,
            border: `1px solid ${th.border}`,
            boxShadow: `0 ${24 * size}px ${60 * size}px ${shadow(th, 0.6)}`,
            opacity: open,
            transform: `translateY(${(1 - open) * -6 * size}px)`,
          }}
        >
          {items.map((it, i) => {
            const t = ease(frame, (openAt ?? 0) + (1 + i * 2) * k, 4 * k, easings.outQuint);
            const ck = checkIndex === i && checkAt !== undefined ? ease(frame, checkAt, 2 * k, easings.linear) : 0;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14 * size,
                  height: 56 * size,
                  padding: `0 ${14 * size}px`,
                  borderRadius: 12 * size,
                  background: ck > 0 ? alpha(th.accent, 0.1 * ck) : 'transparent',
                  opacity: t,
                  transform: `translateY(${(1 - t) * 4 * size}px)`,
                }}
              >
                {it.source ? <SourceGlyph source={it.source} size={20 * size} color={th.fg2} /> : <span style={{width: 6 * size, height: 6 * size, borderRadius: 9, background: th.fg2}} />}
                <span style={{fontFamily: th.font, fontWeight: 500, fontSize: 20 * size, color: th.fg, whiteSpace: 'nowrap'}}>{it.label}</span>
                {it.sub ? <span style={{fontFamily: th.mono, fontSize: 13 * size, color: th.muted, letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>{it.sub}</span> : null}
                <span style={{flex: 1}} />
                <svg width={20 * size} height={20 * size} viewBox="0 0 24 24" style={{opacity: ck}}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={th.accent2} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
