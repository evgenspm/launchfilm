# Motion: springs, easings, durations, stagger, entrances, exits

Law: craft/04. Never type a spring config or a cubic-bezier inline. Pick a name from `src/presets/springs.ts` /
`easings.ts`; if none fits, add one there in a separate harness change with a comment saying what it is for.

## Springs (`spring({frame, fps, config: springs.<name>})`)

ζ = damping / (2√(stiffness × mass)); overshoot computed from ζ. Settle frames: `measureSpring({fps, config})`.

| Name | k / d / m | ζ | Overshoot | Use |
|---|---|---|---|---|
| snappy | 170 / 14 / 0.8 | 0.60 | ~9 % | text, logos, chips snapping in |
| ui | 170 / 26 / 1 | 1.0 | none | layout morphs, panels, re-flow (~600 ms) |
| layout | 200 / 30 / 1 | 1.06 | none | container growth, list re-flow, older cards pushed |
| pop | 150 / 12 / 0.8 | 0.55 | ~13 % | cards and badges popping in |
| bouncy | 200 / 10 / 1 | 0.35 | ~30 % | decorative only (sparkles); never UI or text |
| click | 300 / 15 / 0.8 | 0.48 | ~18 % | press squash 1 → 0.9 → 1 |
| cameraIn | 170 / 20 / 1 | 0.77 | ~2 % | zoom in one tier |
| cameraOut | 120 / 26 / 1 | 1.19 | none | zoom out |
| cameraSnappy | 700 / 30 / 1 | 0.57 | ~11 % | camera follows the cursor within 160 ms of a click |
| drag | 136 / 26 / 1 | 1.11 | none | carried or dragged objects |
| heavy | 80 / 20 / 1.5 | 0.91 | < 0.1 % | hero objects, logo settle, 3D |
| chartBar | 150 / 20 / 1 | 0.82 | ~1 % | bars rising from the baseline |
| maskRise | 300 / 20 / 1 | 0.58 | ~11 % | per-letter mask rise |
Family springs (craft/families): banner 240/26/1 (< 1 %), badge 360/26/1 (~5 %), island 210/20/1 (~5 %), drop 200/22/0.8
(< 0.5 %, lands in 9 fr). If the studio lacks one, define it next to the family component, named, never inline.

To land a move exactly on a beat: `spring({frame: f - start, fps, config: springs.ui, durationInFrames: beatF - start})`.

## Easings (`interpolate(frame, [a, b], [x, y], {easing: easings.<name>, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})`)

| Name | Curve | Use |
|---|---|---|
| outExpo | (0.16, 1, 0.3, 1) | default entrance |
| outQuint | (0.22, 1, 0.36, 1) | softer entrance |
| inExpo | (0.7, 0, 0.84, 0) | exits, zoom-through, suck-in |
| inQuad | (0.11, 0, 0.5, 0) | exits visibly moving from frame 1 |
| inOutSine | (0.37, 0, 0.63, 1) | camera pans, drift |
| outBack | (0.34, 1.56, 0.64, 1) | CSS-only overshoot when no spring |
| linear | | continuous motion only: scroll, ticker, rotation, drift |
| stepped(n) | | typewriter, stop-motion |
Measured curves: landing bezier(0.35, 0.05, 0.7, 1) over 7 fr; pill grow bezier(0.5, 0.1, 0.45, 1); portal
bezier(0.85, 0.25, 0.5, 0.7). Never `ease` or `ease-in-out` on an entrance; never ease-out on an exit.

## Durations (frames at 30 fps; scale `Math.round(f × fps / 30)`)

| Thing | fr | ms |
|---|---|---|
| UI micro (hover, toggle, press) | 5–8 | 150–250 |
| Element entrance | 9–15 | 300–500 (bigger = longer) |
| Exit | 6–9 | 200–300 (≤ 0.6 × its entrance) |
| Move / morph | 15–21 | 500–700 |
| Word reveal (opacity + blur) | 8–10 | 270–330 |
| Typing | 1–2 per char | 30–60, jitter ±15 |
| Camera tier change | 15–36 | 500–1200 |
| Zoom-through | 18–24 | 600–800 |
| Flash | 1–3 | |

## Stagger and overlap

```tsx
import {stagger} from '../../../src/presets';
const s = spring({frame: frame - start - stagger(i, 5, fps), fps, config: springs.pop}); // cards: 5 fr apart
```
| Siblings | Gap |
|---|---|
| characters | 1 fr |
| words in a line | 2–3 fr |
| bars, list items | 1–2 fr |
| list rows dropping in | 3–4 fr |
| cards, tiles | 5–6 fr |
| fanned devices | 5 fr |
Group entrance ≤ 24 fr total. Start the next element when the previous is ~60 % through its motion, not when it ends.

## Entrances and exits

```tsx
const p = spring({frame: frame - at, fps, config: springs.snappy});          // entrance
const q = interpolate(frame, [out, out + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.inQuad}); // exit 6 fr
const style = {
  opacity: p * (1 - q),
  transform: `translateY(${(1 - p) * 12 - q * 8}px) scale(${0.94 + 0.06 * p})`,
  filter: p < 0.999 ? `blur(${(1 - p) * 10}px)` : undefined, // drop the filter once settled: no mushy text
};
```
- Scale from 0.92–0.96, never from 0. UI slides 16–40 px; hero objects 10–20 % of the frame.
- Text: blur 10 → 0 px with opacity over 10–15 fr.
- Exit in the direction of travel, or a hard cut. Never a slow fade-out mid-scene.
- `transform-origin` is design: a chip grows from its anchor, a bar from its baseline, a tooltip from its arrow.
- Fast moves (≥ 200 px in ≤ 8 fr): `@remotion/motion-blur` `Trail` or `CameraMotionBlur`. No object jumps > 40 % of
  frame width in one frame.
- One curve per element: scale, blur, opacity and offset ride the same spring value, so nothing drifts apart.

## Continuous motion

Linear from `useCurrentFrame()`: slow rotation 4–8 s per turn; ticker ~600 px/s; shader time `frame * 0.6`; noise drift
via `noise2D('seed', x, frame / 90)`. Never wall clock.

## Determinism

Forbidden in films and recipes: `Math.random`, `Date.now`, `new Date()`, timers, rAF loops, CSS `transition`, `animation`,
`@keyframes`, components that animate on mount. Use `random('seed-' + i)`. Freeze third-party components that animate
internally (wrap their state in frame-driven props, or `<Freeze frame={n}>`). Check:
`grep -rnE --include="*.ts*" "Math.random|Date.now|new Date\(|setTimeout|setInterval|requestAnimationFrame|transition:|animation:|@keyframes" films/<slug>`
(one allowed hit: the two-rAF handshake before `continueRender` in a 3D scene, see 3d.md).
