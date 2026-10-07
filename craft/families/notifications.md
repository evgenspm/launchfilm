# Family: notifications, pills and the agent orb

Inputs arriving, one of them mattering, the product taking it. Numbers measured frame by frame on studied references at
30 fps; scale frames by fps/30. Sizes are px at 1080p unless marked.

## When

| Beat | Use | Avoid |
|---|---|---|
| Inputs pile up (`problem`) | banner list, 10–12 fr cadence, 4–6 banners, compress beyond 3 visible | slowing to 48 fr gaps (that cadence is for one important event) |
| This one matters (`tension`) | one card with the land-from-camera entrance | landing every card: it stops meaning anything |
| The product absorbs it (`reveal`) | banners fly into the pill (`inQuad`, 14 fr) + pill pulse + open | a cross-dissolve to the pill |
| Status line ("Right now · …") (`feature`) | pill with updates, camera on the pill at ~2.3× | more than 3 updates per shot |
| Who it is about (`feature`) | dot → capsule tag, 34 fr build | holding the tag longer than its task |
| Done closes itself (`proof`) | pill update with tone `done`, or a status row `doneAt` | a celebratory bounce: the badge spring is enough |
| Morning brief / agent summary | orb + greeting + 2 cards, one orb pulse per card | a third card on screen at once |

## Numbers

| Technique | Values |
|---|---|
| Land from camera | scale 1.47 → 1, start offset ~¼ card width up-left → 0, opacity 0.3 → 1 (first visible frame already 0.3), blur 8 → 0 px, **7 fr** on `landing` bezier(0.35, 0.05, 0.7, 1) (fit RMS 0.009), no overshoot. Text unreadable for the first 3 fr. Max 2 per film |
| Measured landing curve | card width f3 1.47 · f5 1.38 · f6 1.28 · f8 1.10 · f10 0.99 (final 1.00) |
| Push older cards | `layout` spring (200/30/1), ~10–11 fr, no overshoot; push distance = card height + gap − overlap |
| Depth (additive) | each newer arrival adds 1 through its own spring, each dismissal removes 1 |
| Depth look on black | scale 1 / 0.94 / 0.88 / 0.82 · opacity 1 / 0.72 / 0.42 / 0 · blur 0 / 0.8 / 1.6 / 2.4 px · peek 18 px per level · content fades out by depth 0.6 · light veil on tucked cards. (On a light wallpaper the reference used 0.89/0.5 and 0.79/0.2; on black those cards vanish) |
| Fill after push | reference waited 17 fr after the push (mechanical); ours lands the new card while the push is ~60 % done |
| Rise from the queue | y +0.6 H → 0, scale 0.89 → 1, opacity 0 → 0.5 → 1, blur 2 → 0 px, **6 fr** `outQuint`, stagger 3 fr |
| Materialise | full size from frame 0, opacity 0 → 1 linear + blur 8 → 0 px over **8 fr** (state change that must not move) |
| Slide in from the edge | `banner` spring 240/26/1 (<1 % overshoot) from width + 80 px off the right edge; opacity in 3 fr; blur 6 → 0 in 5 fr. A 600 px slide must not wobble |
| Dot → capsule | uniform scale from a 3 px dot over **12 fr** on `pillGrow` bezier(0.5, 0.1, 0.45, 1) (RMS 0.007); aspect ~4:1 throughout; radius = h/2 |
| Capsule contents | each starts when the previous is ~70 % done: label fades fr 14–21 · leading avatar slides in from the capsule's own left edge inside the mask fr 19–25 (`outQuint`) · badge pops at fr 27 on `badge` 360/26/1 (peak ~7 fr, ~5 % overshoot, the only bounce). Total **34 fr** |
| Capsule close | contents out 5 fr, capsule back to a dot 8 fr `inExpo` |
| Pill opening | collapsed shape first (a laptop notch or phone dynamic-island pill: black, bottom radius 0.32 h, concave shoulders); opens width and height on `island` 210/20/1 (~5 %, peak ~10 fr); live dot (`badge` spring) at +5 fr, eyebrow +7, label +9, each a 9 fr blur-in |
| Pill update | old line lifts out 6 fr `inExpo`; new line rises 9 fr `outExpo`; width re-springs on `ui`: leads when the new line is longer, lags 5 fr when shorter (text never squeezed); accent glow pulse 22 fr, squared decay, on open and every update |
| Pill close | content out 5 fr, then `layout` spring back to the collapsed shape |
| Dark pill | fill `#181817`, ink `#ECEAE4`, hairline + accent rim glow (a light capsule becomes the brightest thing on a black film) |
| Orb | base radial core → deep; 4 blurred blobs (screen/multiply) orbiting home positions, light top-left, shade bottom-right, ±18 % of Ø via `noise2D` (swirl 10–15 %/s); soft large specular, rim light, outer glow instead of a drop shadow |
| Orb motion | breathing ±3.5 % × amplitude, period 3.2 s; `energy` speeds the swirl (drive per frame as a speaking level); pulse = ripple ring scale 1 → 1.75 over 36 fr + 4 % swell; entrance opacity 8 fr, scale 0.92 → 1, blur 10 → 0, drift on `heavy` |
| Glass card | dark glass `rgba(34,38,48,.72)` → `rgba(16,16,18,.78)`, `blur(30px) saturate(1.4)`, rim `0 0 0 1px` accent @ .32 + `0 0 38px` accent @ .24, big soft shadow. Notification glass on black: `rgba(22,22,24,.72)` + `blur(28px) saturate(1.5)` + hairline `rgba(255,255,255,.09)` |
| Card contents | title types 1 char/fr with the next char ghosted at 25 %; rows 7 fr apart, each 6 fr fade + 5 px blur + 8 px rise; card entrances: land (scale 1.6 → 1, blur 14 → 0, 12 fr), rise (+80 px, scale 0.86, accent tint resolving to glass over 12 fr on `ui`), materialise |
| Card geometry (measured) | aspect ≈ 5.8:1, radius ≈ ⅓ of height, gap ≈ 12 px, avatar ≈ 60 px with a 24 px app badge |
| Soft-tail typing | head ~1.1 chars/fr, last 8 chars ramp in opacity, no caret: reads as spoken |
| Rim arc backdrop | huge black disc whose rim catches accent light; lit arc sweeps ~20° over the shot; bottom-left by default; keeps holds alive without a new subject |
| Hero-moment cadence | one event at a time, 48 fr (1.6 s) apart, each readable before the next |

## Choreography

"Inputs pile up → one matters → the product absorbs it", 9 s at 30 fps, camera opens at 1.6× on the banner area and
follows the cards into the pill (a focal point at every frame):

| fr | Event |
|---|---|
| 0 | rim arc drifting, camera 1.6×, list area empty for ≤ 8 fr |
| 8, 19, 30, 41, 52 | five banners slide in (list layout, `maxVisible` 3, older ones compress) |
| 70 | the important card ("Acme Ledger · Invoice #1042 is 30 days late") lands from the camera, 7 fr |
| 77–113 | hold ≥ 36 fr: one line must be read |
| 113–130 | cards fly into the pill, `inQuad` 14 fr each, 3 fr stagger; camera eases to the pill (`cameraIn`) |
| 127 | pill pulse + open; dot +5, eyebrow +7, label +9 |
| 190 | update: "Reminder sent · 2 min", tone `done` at 240 |
| 255 | pill closes (5 fr content, then `layout`) |

## Components

`NotificationStack` (in the studio list). `PillMorph`, the pill/island component, `AgentOrb`, `StatusCard` and `RimArc`
may not exist: verify the API in studio/API.md; if missing, build them inside the film/recipe folder from the Numbers.

```tsx
<NotificationStack layout="list" maxVisible={3} entrance="slide" items={[
  {at: 8, app: 'Acme Inbox', title: '3 new threads', body: 'Pricing, onboarding, renewal'},
  {at: 70, app: 'Acme Ledger', title: 'Invoice #1042 is 30 days late', entrance: 'land'},
]} />
// item: {id?, at, out?, app, title, body?, time?, icon?, entrance?: 'land'|'rise'|'slide'|'materialize'}
```
Expose a cue list (frames of every arrival, open, update, close) so the Sfx layer glues sound to it.

## Sound

Gains on −3 dBFS assets; subtract 6 dB under VO. Frames relative to the event.

| Event | Audio id | When | Gain |
|---|---|---|---|
| first banner of a list | `notification` | its slide start +3 fr | −12 dB |
| following banners (10–12 fr cadence) | `tick` (3 variants) | slide start +3 fr | −16 dB |
| important card lands | `notification` | landing frame +5 (opaque) | −12 dB |
| cards fly into the pill | `swoosh-short` (one for the group) | ends on the first arrival | −12 dB |
| pill opens | `pop` | `at` | −14 dB |
| pill update | `tick` | update frame | −16 dB |
| done | `ui-confirm` | `doneAt` | −12 dB |
| capsule grows from dot | `pop` | frame 0 of the build | −14 dB |
| badge pops | `tick` | build fr 27 | −16 dB |
| orb enters / pulses | `shimmer` / `swell` | entrance / each pulse | −16 / −14 dB |
| status rows | `tick` | each row | −20 dB |
| soft-tail typing, rim arc | none (VO or music carries) | | |

## Pitfalls

- Backdrop blur over flat black renders grey nothing: put a gradient, the rim arc or real content behind glass.
- Landing more than 2 cards per film; a 17 fr gap between push and fill; a light pill on a dark film.
- Pill label ellipsized during a width change: width must lead on longer text and lag 5 fr on shorter text.
- Greeting or title leaving before it finished typing: exit ≥ hold formula after the last char.
- Rim arc crossing the middle of the frame: keep it in a corner.
- Third-party app marks only whole and unmodified (move, scale, opacity, mask; no yaw, recolor or brightness change).
- Determinism: `noise2D` with a seed, `random(seed)`; no `Math.random`. Cost: `backdrop-filter`; ≤ 8 cards on screen kept a
  10 s 1080p render at ~20 s with concurrency 2.
- Colour props that get an alpha suffix appended must be 6-digit hex.

## Techniques

`notification-stack` · `island-morph` · `morph` · `stream-text` · `blur-in` · `glow` · `push-in` · `cursor-follow` ·
audio: `notification` · `tick` · `pop` · `swoosh-short` · `ui-confirm` · `shimmer` · `swell`
