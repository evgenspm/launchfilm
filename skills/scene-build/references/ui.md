# UI: rebuild in points, scripted state, screen recordings with punch-ins

Law: craft/13 (decide rebuild or record, measure in points, rebuild from the repo or screenshots, scripted state,
screen recording with punch-ins, fake data), craft/03#readability-under-the-camera. Families: craft/families/list.md,
notifications.md, screen.md.

## Decide

| Rebuild in React (`ui-rebuild`) | Record the screen (`screen-recording`) |
|---|---|
| ≤ 3 screens, the beat needs tier 3–4 zoom, several aspects, scripted data | > 5 screens, realtime or heavy rendering (maps, editors, 3D), or the realness is the point |
| crisp at any zoom, every element animates natively | real pixels; punch-in limited by source resolution |

## Rebuild: measure in points

1. Build at the device's logical size: 14" laptop screen 1512×982 pt, browser viewport 1440×900, phone 393×852.
   Screenshots from Retina displays are 2×: divide every pixel measurement by the scale factor.
2. Font size from a screenshot: measure cap height in points, font size ≈ cap height / 0.73 (Inter-class grotesks).
3. Tokens come from brand.json (colours, radius, fonts); spacing and sizes from the screenshot or the repo's CSS.
4. The camera zooms; the type does not grow. Authored sizes stay real.

## Rebuild from the user's repo

Import their components when they render without data or network:
- Strip data fetching and context providers that hit the network; pass static props.
- Disable CSS motion in the composition root: `* { transition: none !important; animation: none !important }`; drive
  every state change from `useCurrentFrame()`.
- Replace `Date.now()`/`new Date()` with a fixed date from the script; replace framework image/font loaders with
  `staticFile()` + `@remotion/fonts` `loadFont`.
- Portals, `position: fixed` and global CSS leak across the frame: wrap and scope them.
- If a component can't be tamed in 30 minutes, rebuild it from its screenshot instead.

## Scripted state (events → state at frame)

Write the UI as a list of events at absolute frames; state = f(frame). Never mutate state over time with effects.

```tsx
type Ev = {at: number; type: 'type' | 'submit' | 'stream' | 'done'; text?: string};
const script: Ev[] = [
  {at: 30, type: 'type', text: 'Send the March invoice to Dana'},
  {at: 96, type: 'submit'},
  {at: 117, type: 'stream', text: 'Invoice #1042 sent to Dana Ortiz, $2,480.00'}, // ~0.7 s thinking first
  {at: 180, type: 'done'},
];
const last = (f: number) => script.filter((e) => e.at <= f).at(-1);
```
Each event also gets a sound (type-click per keystroke, ui-confirm on submit, tick on done) and, if it matters, a camera
keyframe 6 fr before it. Streamed answers start after ~0.7 s of a thinking state; the camera is already there and holds
still while text streams.

Studio pieces that already script this (verify names and props in `<studio>/API.md`; family presets live in
`src/presets/list`, `src/presets/notifications` and may need a direct import): `PromptBar` (typing → send press),
`ListAssemble` (add / done / move / order / focus events), `NotificationStack` (items with `at`), `AIChat`, `Keycaps`,
`Cursor`; frames: `MacWindow`, `BrowserFrame`, `PhoneFrame`, `Desktop`.
```tsx
<PromptBar text="Draft the release notes" startFrame={20} />            // type-click per char, ui-confirm on send
<ListAssemble events={[{at: 8, type: 'add', task: {id: 'a', title: 'Ship v2.3'}}, {at: 90, type: 'done', id: 'a'}]} />
<NotificationStack items={[{at: 40, title: 'Build passed', body: 'main · 2m 14s'}]} />
```

## Screen recording with punch-ins

Capture: 2× (Retina) at 60 fps, Do Not Disturb on, clean desktop, fixed window size, cursor moved at human speed,
3 takes. Use `@remotion/media` `Video` or `OffthreadVideo` (frame-accurate), never a `<video>` tag.

Max punch-in before the picture softens:
`maxScale = sourcePixelWidth / (outputWidth × visibleFractionOfSource)`.
Example: a 1512 pt window captured at 2× = 3024 px, shown full-width on a 1920 output: 3024 / 1920 = 1.57×. Beyond that
the text goes soft; switch that beat to a rebuild. Punch-ins: ≤ 3 per 15 s on `springs.cameraIn`, out on `cameraOut`,
camera arrives before the action. Wide shot ≤ 1.2 s, then punch so body text ≥ 26 px on a 1080-high frame.

Grade the recording like footage only in launch mode (grain stays off the UI in product mode). Trim dead time: cut on
the action, never on the cursor wandering.

## Fake data

Believable names, numbers with thousands separators and currency, consistent dates and times on pause, no lorem ipsum,
no real people without consent, no third-party logos you don't have rights to, no claims the product can't do today.
Every string that appears on screen is listed in STORYBOARD.md so it can be checked.

## Readability checks

Stills at every UI beat: body text ≥ 26 px rendered (16:9) / ≥ 30 px (portrait); no "…" truncation on hero frames
(widen the card); no half-cropped word at the frame edge in 4:5 / 9:16; captions never cover the changing element.
