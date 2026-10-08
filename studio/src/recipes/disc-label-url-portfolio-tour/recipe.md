# Disc label to typed address, then a portfolio tour

On flat grey a soft disc shrinks into a small icon over a one-line label, a tilted capsule flips flat into an address field that types itself, then three hard cuts tour the live pages: grid, hero with a sliding photo strip, item page.

Source: https://www.raylight.app/templates/zQRfa6NH (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Announcing a portfolio, shop or landing page where the address is the call to action
- A short teaser that ends on real footage of the live pages
- Creators or studios sharing a new personal page in under 8 s
Not for: products whose value is a workflow (the tour shows pages, not actions); vertical feeds (the recorded pages are landscape).

## Format
16:9 · 7.77 s · 30 fps · light · music 94.2 BPM, cut_on_beat 0/3 (false) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.87 | 0–116 | hook | flat grey; soft disc shrinks into a small icon above a label (1 word, then 3); label dims; tilted capsule flips flat into an address field, address types, field blurs out | locked, no camera move | 0.27 disc ~0.18 W + first word blur-in; disc to ~0.02 W icon by 0.77, springs.ui ~15 fr (overshoot not measurable); 1.27 two words blur-in; 1.50 icon flips edge-on, back by 1.77; 1.77 label to ~40 %; 2.00 capsule tilted ~4 deg, edge-on 2.27, flat 2.50, springs.ui ~22 fr (±0.25 s); 2.77–3.27 address typed (typewriter); 3.77 blur + fade out 3–6 fr (±0.25 s) | hard-cut | pop (planned) |
| 2 | 3.87–4.40 | 116–132 | reveal | recording: light shop page, grid of three tall dark artworks with title and price, section heading at top | pull-out 1.30 → 1.00 over ~15 fr, easings.outExpo (±0.25 s); card width 0.27 W → 0.21 W | grid zooms out and settles; nothing else moves | hard-cut | swoosh-short (planned) |
| 3 | 4.40–5.93 | 132–178 | feature | page hero: all-caps studio name, 2-line sub-line, two buttons, full-width strip of tall photos; cursor on the strip | locked; strip slides inside the page | strip slides left ~420 px @1920 over 1.27 s, decelerating (380 → 195 px/s), easings.outQuint; preview thumbnail bottom right fades by 5.00 (±0.25 s) | hard-cut | none |
| 4 | 5.93–7.77 | 178–233 | feature | item page: one dark artwork ~70 % of frame left; right panel with title, two license chips, 4 spec lines, black buy button | locked; slow drift inside the artwork | artwork drifts up ~250 px/s @1920 (motion.json), easings.linear; cursor rests; holds to end | end | none |

Evidence per row: 1 `sheet-01 cells 0–15`, `keyframes/kf-000.50, kf-001.50, kf-002.50, kf-003.50`, `cuts/cut-003.87.jpg` (before side). 2 `sheet-02 cells 0–1`, `cuts/cut-003.87.jpg`, `cuts/cut-004.40.jpg` (before). 3 `sheet-02 cells 2–7`, `cuts/cut-004.40.jpg`, `cuts/cut-005.93.jpg` (before). 4 `sheet-02 cells 8–14`, `cuts/cut-005.93.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| blur-in | 1 | craft/vocabulary.md#type (BlurIn) |
| typewriter | 1 | craft/vocabulary.md#type (Typewriter) |
| pull-out | 2 | craft/vocabulary.md#camera |
| screen-recording | 2–4 | craft/vocabulary.md#ui (FootageClip) |

## Look
Palette: #DCDCDC intro background, #12110E label text, #936C60 warm accent from the artworks, #F4F4F4 page background, #52514A mid grey, #CECBC0 capsule/light stone. Type: medium grotesk label, sentence case, cap height ~7 % H; small grotesk inside the address capsule; heavy all-caps grotesk hero on the recorded page. Treatment: none. Background: flat grey in row 1, then footage.

## What to adapt
- Copy: 1 label line (1 word that extends to 3, invites a look), 1 address (~15–25 chars).
- Brand: the intro icon holds the mark; the page footage shows the brand; no accent colour in the intro.
- Timing: row 1 keeps its internal sequence (disc 15 fr, label extend at f38, capsule at f60, typing f83–98); rows 2–4 stretch with the footage, keep row 2 short (≤ 20 fr) so the zoom-out reads as a punch.

## Pitfalls
- Row 2 is only 16 fr: a longer pull-out turns the punch into a slow reveal.
- The intro has no camera move; adding a push-in fights the disc scale change.
- Label dims to ~40 % before the capsule arrives: keeping it full opacity makes two focal points.

## Missing components
- DiscToIcon: blurred disc ~0.18 W shrinks to a ~0.02 W icon in ~15 fr, then a single x-axis flip (~8 fr) (techniques: none in vocabulary)
- CapsuleFlipField: rounded capsule enters tilted ~4 deg, flips on x through edge-on to a flat white address field over ~15 fr, then hosts a Typewriter (techniques: typewriter)

## Proposed terms
- disc-shrink-icon: large soft disc scales down into a small icon above a label, row 1
- capsule-flip: pill rotates on its x axis through edge-on into a flat input field, row 1
- label-extend: a one-word label gains words to its right, the first word slides left to keep centre, row 1
- strip-slide: horizontal photo strip slides inside a static page recording, row 3

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips. Not measurable: spring overshoot, word stagger, exact typing cadence, exit length of the address field. SFX planned by the glue rule, not measured (music only). cut_on_beat = 0/3 cuts within ±2 fr (detected beats end at 3.69 s; the 4.40 cut is 1 fr from an onset at 4.435). Pan numbers from motion.json.

## Study log
id disc-label-url-portfolio-tour · family product-ui · 7.77 s, 4 rows (3 hard cuts from cuts.json)
techniques 4 (blur-in, typewriter, pull-out, screen-recording) · cut_on_beat false (0/3) · energy build
Not measured: springs, staggers, typing cadence (±0.25 s from 4 fps sheets)
Proposed terms: disc-shrink-icon, capsule-flip, label-extend, strip-slide
Missing components: DiscToIcon, CapsuleFlipField
phase B: not run
