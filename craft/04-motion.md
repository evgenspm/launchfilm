# 04 · Motion: springs, easings, durations, stagger

Code lives in the springs, easings and timing presets (see studio/API.md). **Never type a spring config or a curve
inline in a film or recipe: name it** (`T2`). Frames are at 30 fps; scale by `fps / 30`.

## Springs

Remotion: `spring({frame, fps, config: {stiffness, damping, mass}})`. Damping ratio ζ = d / (2√(k·m)); overshoot is
computed from ζ, so the "feel" column is checkable.

| Name | k | d | m | ζ | Overshoot | Use |
|---|---|---|---|---|---|---|
| `snappy` | 170 | 14 | 0.8 | 0.60 | ~9 % | text and logos snapping into place, chips |
| `ui` | 170 | 26 | 1 | 1.0 | none | layout morphs, input → bubble, panel moves, reflow (~600 ms) |
| `layout` | 200 | 30 | 1 | 1.06 | none | container height growth, list reflow, pushing older cards |
| `pop` | 150 | 12 | 0.8 | 0.55 | ~13 % | cards, comments, badges popping in |
| `bouncy` | 200 | 10 | 1 | 0.35 | ~30 % | decorative only (sparkles); never UI, never text |
| `click` | 300 | 15 | 0.8 | 0.48 | ~18 % | press squash 1 → 0.9 → 1, cursor click |
| `cameraIn` | 170 | 20 | 1 | 0.77 | ~2 % | zoom in one tier |
| `cameraOut` | 120 | 26 | 1 | 1.19 | none | zoom out |
| `cameraSnappy` | 700 | 30 | 1 | 0.57 | ~11 % | cursor follow within 160 ms of a click |
| `drag` | 136 | 26 | 1 | 1.11 | none | dragged or carried objects |
| `heavy` | 80 | 20 | 1.5 | 0.91 | < 0.1 % | hero objects, logo settle, 3D |
| `chartBar` | 150 | 20 | 1 | 0.82 | ~1 % | bars growing from the baseline |

Family springs (`craft/families/*`): `maskRise` 300/20/1 (~11 %), `banner` 240/26/1 (< 1 %), `badge` 360/26/1 (~5 %),
`island` 210/20/1 (~5 %), `drop` 200/22/0.8 (< 0.5 %, lands in 9 fr).

- Settle frames: `measureSpring({fps, config})`; do not guess.
- Land on a beat: `spring({..., durationInFrames: beatFrame(n) - start})` stretches the config to an exact length.
- **Overshoot on entrances only; never on exits. No bounce on UI layout** (only `click`, `badge` and check fills may bounce).
- One curve per element: scale, blur, opacity and offset ride the same spring progress.

## Easings

| Name | Curve | Use |
|---|---|---|
| `outExpo` | cubic-bezier(0.16, 1, 0.3, 1) | default entrance, slides, scale-in |
| `outQuint` | cubic-bezier(0.22, 1, 0.36, 1) | softer entrance |
| `inExpo` | cubic-bezier(0.7, 0, 0.84, 0) | exits, zoom-through, suck-in |
| `inOutSine` | cubic-bezier(0.37, 0, 0.63, 1) | camera pans, drift, dolly |
| `outBack` | cubic-bezier(0.34, 1.56, 0.64, 1) | CSS-only overshoot when a spring is unavailable |
| `linear` | n/a | continuous motion only: scroll, ticker, rotation, drift |
| `stepped(n)` | n steps | typewriter, stop-motion, pixel art |
| `landing` (measured) | cubic-bezier(0.35, 0.05, 0.7, 1), 7 fr | a card landing from the camera, no overshoot |
| `pillGrow` (measured) | cubic-bezier(0.5, 0.1, 0.45, 1), 12 fr | dot → capsule growth |
| `portal` (measured) | cubic-bezier(0.85, 0.25, 0.5, 0.7), 8–10 fr, on ln(scale) | portal zoom |

In Remotion: `interpolate(frame, [a, b], [from, to], {easing: Easing.bezier(...), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})`.
Never `ease` or `ease-in-out` on entrances (they start slow and land soft: mush). Never ease-out on exits (they look stuck).
Ease-in-out is correct only for things moving A → B on screen.

## Durations

| Thing | Frames @30 | ms | Note |
|---|---|---|---|
| UI micro (hover, toggle, press) | 5–8 | 150–250 | |
| Element entrance | 9–15 | 300–500 | bigger element = longer |
| Exit | 6–9 | 200–300 | always shorter than its entrance, ≤ 0.6× |
| Move / morph | 15–21 | 500–700 | `ui` spring |
| Word reveal (opacity + blur) | 8–10 | 270–330 | |
| Character typing | 1–2 per char | 30–60 | jitter ±15 ms |
| Camera tier change | 15–36 | 500–1200 | `craft/03#zoom-tiers` |
| Zoom-through | 18–24 | 600–800 | `inExpo` |
| Flash | 1–3 | 33–100 | |
| Hold: one word / line / two lines | 12 / 36 / 60 | 400 / 1200 / 2000 | `craft/02#readability-holds` |
| Hold: result | 90–150 | 3000–5000 | product film; ≥ 45 fr in social cuts |
| End card | 60–90 | 2000–3000 | 90–120 fr on ph and long launch films |

## Stagger and overlap

| Siblings | Gap | Note |
|---|---|---|
| Characters in a word | 1 fr | typewriter uses word timings instead |
| Words in a line | 2–3 fr | keynote-style statements: 2 fr |
| Chart bars, small list items | 1–2 fr | |
| List rows dropping in | 3–4 fr | measured 3–6, mean 4.5 |
| Cards, comments, large tiles | 5–6 fr | |
| Fanned devices | 5 fr | |

- **Overlapping action:** start the next element at ~60 % of the previous one's motion, not when it ends; keep 2–3
  elements in flight.
- **Group entrance ≤ 24 fr** (800 ms) from the first sibling's start to the last sibling's settle.
- **One object moves first** in any reorder; the rest follow 3 fr later.
- Check: three stills at entrance +0, +4, +8 fr show siblings in different states.

## Entrances and exits

- **Scale in from 0.92–0.96, never from 0** (0 reads as a cartoon). Combine with opacity 0 → 1 and y 12 → 0 px (UI).
- **Blur-in** for text and soft objects: blur 10 → 0 px with opacity over 10–15 fr; drop blur entirely once settled.
- **Slide distance:** 16–40 px for UI; 10–20 % of the frame for hero objects.
- **Exits:** opacity 1 → 0 in 6–9 fr with scale 1 → 0.98, or a move in the direction of travel (the story continues
  off-screen), or a hard cut. Never a slow fade-out mid-scene; nothing lingers half-faded.
- **transform-origin is design:** a chip grows from its anchor, a tooltip from its arrow, a bar from its baseline.
- **Fast moves** (≥ 200 px in ≤ 8 fr) get motion blur (`Trail` or `CameraMotionBlur` from `@remotion/motion-blur`).
  No object jumps > 40 % of frame width in one frame.
- Animate `transform` and `opacity`; avoid layout properties (correctness under scale and render speed).

## Continuous motion

Constant speed (linear), derived from `useCurrentFrame()`, never from wall clock.

| Motion | Speed |
|---|---|
| Slow rotation (hero object, ring) | 4–8 s per turn (metal object ~6 s) |
| Ticker / marquee | ~600 px/s at 1080p |
| Carousel ring | 34–45 °/s |
| Rim light, background arc | ~20° across a shot |
| Particle drift | 2–6 px/s plus `noise2D` wander |
| Shader time | `frame × 0.6` (shader speed prop 0) |
| Breathing (orb, core) | ±2–3.5 % scale, period 2–3.2 s |

## Determinism

Every frame must render identically on any machine, in any order, at any concurrency.
- No `Math.random()`, `Date.now()`, `new Date()`, `setTimeout`, `setInterval`, `requestAnimationFrame` loops.
  Use `random('seed-' + i)` from `remotion` and `noise2D(seed, x, y)` from `@remotion/noise`.
- No CSS `transition` or `@keyframes` animation: they do not follow the frame. Drive every value from the frame.
- Load fonts before measuring text (`@remotion/fonts` `loadFont` blocks the render until ready); a measurement taken
  before the font loads is cached wrong.
- Wait for assets (`delayRender` / `continueRender`) for images, GLB, HDRI and canvases.
- Check: `grep -rnE "Math\.random|Date\.now|new Date\(|setTimeout|setInterval|transition:|@keyframes" films/<slug> src/recipes/<id>` → 0 hits.
- Render one frame twice (`npx remotion still … --frame=N`) and compare: identical bytes, or a pixel diff of 0.
