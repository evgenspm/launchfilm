# 13 · UI recreation: rebuild the product, or record it well

The product is the payoff, so its pixels must survive a pause at any zoom. Two ways to show it: rebuild the UI in React
(`ui-rebuild`) or treat a screen recording as footage (`screen-recording`). This file decides between them and gives the
numbers for both. Camera rules: craft/03. Readability bar: UI body text ≥ 26 px on a 1080-high frame after camera scale.

## Decide: rebuild or record

| Factor | Rebuild in React | Record the screen |
|---|---|---|
| Distinct screens in the film | ≤ 4 | > 5, or one long continuous flow |
| Zoom needed on small text | tier 3–4 (≥ 1.5×) | ≤ the punch limit (source px / output px, ≈ 1.5× for a 2× capture of a full window) |
| Presets / aspects | 3 or more (recompose per aspect) | one aspect |
| Behaviour shown | scripted data, exact timing, streaming text, list changes | real-time behaviour that is the point: maps, canvas editors, video, 3D, physics |
| UI state | not finished, or changes weekly (the film must not go stale) | stable and finished |
| Frontend | React with importable components and tokens | anything else, or no repo access |
| Effort per screen | 2–6 h | 30–60 min for 3 clean takes |

Hybrid is common: record the hard part, rebuild the overlays (cursor, keycaps, highlights, captions) in Remotion.
If the UI does not exist yet, stage a placeholder screen and make the staging expensive (craft/families/screen.md).

## Measure in points

Build at the device's logical size in points (1 pt = 1 CSS px at 1×). The camera scales; type never grows to "read better".

| Stage | Logical size (pt) | Typical screenshot |
|---|---|---|
| Laptop display (14" class) | 1512 × 982 | 3024 × 1964 px (2×) |
| Browser viewport | 1440 × 900 (compact: 1280 × 800) | 2880 × 1800 px (2×) |
| Phone (6.1" class) | 393 × 852 | 1179 × 2556 px (3×) |
| Tablet (11" class) | 820 × 1180 | 1640 × 2360 px (2×) |

- **Divide screenshot pixels by the scale factor** (2× laptops, 3× most phones) before writing any size.
- **Font size from cap height:** font-size = cap height / (capHeight / unitsPerEm). Inter ≈ 0.73, so a 9.5 pt cap height is
  13 pt type. For other fonts read the ratio from the font file, don't guess.
- **Line height** = baseline-to-baseline distance. **Letter spacing:** compare a measured word width with `measureText`.
- **Rendered size check:** rendered px = size_pt × (output px / stage pt) × camera scale.
  Example: 13 pt body text in a 1512 pt window shown full-width on 1920 px = 13 × 1920/1512 = 16.5 px: too small. At a tier 3
  punch-in of 1.6× it is 26.4 px: passes. So body text on 16:9 needs ≥ 1.6× (craft/03#readability-under-the-camera).

## Rebuild from the repo

Best source of truth: the user's own components and tokens. Work on copies in the film folder (`films/<slug>/ui/`);
never edit the user's app source.

1. **Tokens first.** Colours, fonts, radius from `brand.json` (brand-intake already read the repo).
2. **Import only pure components** (props in, JSX out). Replace data hooks (fetch, query clients, context providers, auth)
   with fixture props.
3. **Kill time-based behaviour.** CSS transitions and animations do not advance with Remotion frames: inject
   `* { transition: none !important; animation: none !important; }` inside the stage and drive every visual state from
   `useCurrentFrame()`. No `setTimeout`, `setInterval`, `requestAnimationFrame`, `Date.now()` or `Math.random()` in render
   paths; use the frame and `random(seed)` (craft/04#determinism). Chart libraries: turn their own animation off.
4. **Framework shims.** Router links → plain elements. Optimised image components → Remotion `<Img>`. Framework font
   loaders → `@remotion/fonts` `loadFont` with the same woff2. **Portals** (modals, tooltips, menus rendered into
   `document.body`) escape the camera transform: render them inline inside the stage.
5. **Interaction states as props:** `hovered`, `pressed`, `focused`, `open`, set from the cursor timeline, not from events.
6. **Bundler:** path aliases and CSS frameworks need the studio's config; verify in studio/API.md whether Tailwind is enabled.
   If not, copy the computed values into style objects.
7. **Heavy dependencies:** copy the markup of the one component you need instead of importing a whole design system.

## Rebuild from screenshots

1. Capture every state at 2× (or use brand-intake's captures). One screenshot per state the film shows.
2. **Trace in this order:** layout grid and outer frame → spacing (padding, gaps) → type (size, weight, line height,
   tracking) → colours (sample flat areas, not anti-aliased edges) → radius, 1 px borders (hairlines at 8–12 % contrast),
   shadows → icons → content.
3. **Icons:** the user's SVGs, or a permissively licensed set that matches the stroke weight. Never trace a proprietary icon set.
4. **Diff:** put the screenshot at 50 % opacity over a still of the rebuild at the same size (debug layer, off in renders), or
   `mix-blend-mode: difference`. Pass: edges within 2 pt, text baselines within 1 pt, flat colours within ±4 per channel;
   the difference image shows anti-aliasing only.
5. The bar: on a still at 100 %, a stranger cannot tell the rebuild from the screenshot.

## Scripted state

The UI is a pure function of the frame: `state = f(frame)`. Write it as an event list, not as imperative steps.

```ts
const events = [
  {at: 12, type: 'type', target: 'search', text: 'March invoices', cps: 25},
  {at: 58, type: 'click', target: 'send'},
  {at: 64, type: 'think', frames: 21},           // ~0.7 s thinking state before an answer
  {at: 85, type: 'stream', target: 'answer', text: '...', wps: 10},
  {at: 150, type: 'add', target: 'list', row: {id: 'inv-214', title: 'Invoice #214 · $1,240'}},
];
```

| Event | Numbers |
|---|---|
| type | 30–60 ms per char (cps 17–33) with seeded ±15 ms jitter; caret blinks at 1 Hz when idle |
| click | cursor arrives 6 fr early; press 1 → 0.9 → 1 over 8 fr on `click`; ripple optional |
| think → stream | thinking state ~0.7 s, then stream at 8–15 words/s; the camera arrives first and holds still while it streams |
| add / remove / reorder | rows on `layout` / `drop`; one row moves first and visibly (craft/families/list.md) |
| scroll | 600–1200 px/s on inOutSine; render the off-screen content (no virtualised lists) |

- Each element's progress = a named spring started at its event frame (craft/04#springs).
- The same event list feeds the sound track: every event gets its vocabulary audio id (craft/02#glue-rule).
- No `useState` that changes over time; derive everything from the frame.

## Screen recording with punch-ins

**Capture:**
- 2× (Retina) resolution, 60 fps, constant frame rate.
- Do Not Disturb on; notifications, menu-bar extras and desktop icons hidden; a clean browser profile (no extensions,
  bookmarks bar hidden).
- Fixed window size matching a stage (1512 × 982 pt display or a 1440 × 900 viewport). Same size for every take.
- Human speed: cursor moves 500–800 ms, no hunting, no idle wiggles. 3 takes per action; 2 s of stillness at head and tail.

**Punch-in limit:** the visible source region must have at least as many pixels as the output.
`max punch = source px width / output px width`. A 2× capture of a 1440 pt window is 2880 px wide: on a 1920 px output the
limit is 2880 / 1920 = 1.5×. Beyond it, re-record a smaller window or rebuild the zoomed part.

**In Remotion:**
- `<OffthreadVideo>` (frame-accurate) or `@remotion/media` `<Video>` inside the camera wrapper; the film engine's
  `FootageClip` handles trim, crop, punch and drift (verify props in studio/API.md).
- ≤ 3 punch-ins per 15 s on `cameraIn` / `cameraOut`; the camera arrives before the action and holds still while text streams.
- **Cursor:** keep the recorded cursor (then never punch past the limit and never add a second cursor), or record with the
  cursor hidden and add the spring cursor along an authored path (craft/03#cursor-and-keycaps) when you know every click point.
- **Dead time:** cut it. Speed up dull stretches at most 1.5–2×; never speed up text the viewer must read.
- **Look:** product mode, no grain on the UI; the section's grade applies lightly (craft/06).

## Fake data

| Rule | Check |
|---|---|
| Believable: fictional but realistic names, numbers with separators, plausible magnitudes, real-looking dates | no "Test User", "John Doe", "Foo", "lorem ipsum", "123-456" on any frame |
| Consistent on pause: totals add up, one entity keeps one name and avatar, counts match the lists, the clock matches the story's time | pause on 3 random frames and add the numbers |
| No real people (customers, staff, public figures) without written consent | names and faces are invented or consented |
| No real companies as customers or integrations unless they are real and agreed | logos only with permission, unmodified |
| Safe contact data | emails at `example.com`, phone numbers from reserved fiction ranges |
| No personal data from repo fixtures or seed files | scrub before use |
| No truncation on hero frames | widen the card so canonical titles never show "…" |
| Only shipping features on screen | checked against BRIEF.md's must-not-claim list |
