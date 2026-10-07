# Camera: zoom tiers, drift, focus rects, cursor

Law: craft/03 (zoom tiers, drift and push-in, readability under the camera, multi-aspect recomposition, cursor and
keycaps). Verify export names in `<studio>/API.md`; the names below are the studio presets at the time of writing.

## The camera is a wrapper

The whole scene is laid out at 1.0 inside one camera; the camera applies `scale` + `translate` with a spring. Content
never grows to be read: the camera zooms. Zoom in on `springs.cameraIn` (~2 % overshoot), out on `springs.cameraOut` (none).

| Tier | Scale | Move | Use |
|---|---|---|---|
| 1 establishing | 0.80–0.90 | 900–1200 ms (27–36 fr) | whole UI floating on the background, open and close |
| 2 region | 1.00–1.20 | 700–900 ms (21–27 fr) | a panel, a form, the chat column |
| 3 element | 1.50–2.00 | 600–800 ms (18–24 fr) | a button, an input, a chart |
| 4 detail | 2.50–3.00 | 500–600 ms (15–18 fr) | a click, a toggle, a number changing |

Rules: one tier per move (1→2→3 with a hold, never 1→3); target arrives 6 fr before the action; never zoom while the
content morphs (morph, then camera, or camera, then morph); ≤ 3 punch-ins per 15 s; wide establishing ≤ 1.2 s;
hold on the result at tier 1–2 for 3–5 s (product film) before the final pull-out.

## Keyframed camera (single aspect)

```tsx
import {Camera, type CameraKeyframe} from '../../../src/presets';
// x/y move the scene: negative = scene goes left/up (the target comes to centre)
const cam: CameraKeyframe[] = [
  {frame: 0, tier: 'establishing'},
  {frame: 36, tier: 'region', x: -120, y: 40},     // arrives ~frame 60, 6 fr before the typing starts
  {frame: 96, tier: 'element', x: -380, y: 160},   // the send button; click at frame 120
  {frame: 210, tier: 'region', x: -120, y: 40},    // zoom out uses cameraOut automatically
];
export const Scene = () => <Camera keyframes={cam}><ProductUI /></Camera>;
```
Each keyframe adds its delta through its own spring, so interrupted moves blend instead of jumping.

## Focus rects (one stage, every aspect)

Build the stage at fixed size in points (e.g. 1512×982 for a 14" laptop screen, 1440×900 browser viewport). Describe
what must be in frame as a rect; the camera fits it per aspect. This is how 16:9, 4:5, 1:1 and 9:16 come from one scene.

```tsx
import {FocusCamera, type FocusKey} from '../../../src/presets';
const keys: FocusKey[] = [
  {frame: 0, focus: 'full'},
  {frame: 30, focus: [880, 120, 560, 640], pad: 0.08},  // answer panel: whole subject incl. its control
  {frame: 150, focus: [960, 610, 260, 90], zoom: 1.1},  // the button she clicks
];
<FocusCamera keys={keys} stage={{w: 1512, h: 982}}><Desktop /></FocusCamera>
```
Check per preset: the rect never cuts a word or the control being used; nothing important within the preset's safe
zone (craft/10#safe-zones). Overlays drawn outside the camera (keycaps, captions) use `stageToFrame` to follow targets.

## Drift and push-in (every shot that would sit still)

| Kind | Numbers | When |
|---|---|---|
| Drift | scale 1.00→1.03–1.05 over the whole shot, linear or `easings.inOutSine`; or a pan 1.1–3.1 px/fr at 1920 | every otherwise-static shot (T1) |
| `push-in` | 1.00→1.06–1.15, measured +1.8 to +5.5 %/s | a deliberate move toward the focus |
| `speed-ramp` | push speed thirds e.g. 6 / 29 / 11 px/fr over 1.6 s | short energetic shots |
| `pull-out` | reverse of push, on `cameraOut` | reveal context, closing |

`<KenBurns from={1} to={1.04}>` gives the drift; reset on every cut. Change drift direction shot to shot; cut while still moving.

## Cursor

```tsx
import {Cursor, clickFrames, type CursorKeyframe} from '../../../src/presets';
const path: CursorKeyframe[] = [
  {frame: 40, x: 300, y: 700},
  {frame: 62, x: 1040, y: 650},              // 22 fr ≈ 730 ms across the screen
  {frame: 68, x: 1040, y: 650, click: true}, // arrives 6 fr before the click
];
<Cursor keyframes={path} />
// sfx: one ui-confirm (or type-click) at every clickFrames(path) frame
```
Numbers: cross-screen 500–800 ms; arrive 6 fr early; click squash 1→0.9→1 over 8 fr (`springs.click`); never teleport;
idle drift 2–4 px between actions; `springs.cameraSnappy` for camera follow within 160 ms of a click.
Keycaps: appear 5 fr before the press, visible ≥ 0.8 s, bottom-centre above captions.
Typing: 30–60 ms/char with ±15 ms jitter, caret blink 1 Hz, a type-click per char.

## Readability under the camera

Rendered size = authored px × camera scale × (output px per stage px). UI body text must reach ≥ 26 px on a 1080-high
16:9 frame and ≥ 30 px on a 1080-wide portrait frame. If it can't at tier 2, go to tier 3 for that beat.
The camera arrives before text streams and holds still while it streams or rewrites.

## Montage anchoring

In a run of 250–500 ms shots keep the subject at the same frame position (centre anchor). Let a caption persist across
2–3 background cuts. Portrait or archival clips: `FrameInFrame` centred on black, scaling 1.0→1.15 over the shot.
