# Phone screen row that steps one card per beat

A row of tall phone-screen cards on a light-to-grey floor glides left one card pitch about every 2.15 s: a fast eased slide, then a slow creep. One continuous move tours many screens with no cuts.

Source: https://jitter.video/template/mobile-screens-slider/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Touring 6 to 10 mobile app screens in one silent loop (product page hero, social loop)
- A feature-tour beat inside a longer mobile launch film, between a reveal and a CTA
- Calm, minimal brands with no VO and no SFX; the screenshots carry the message
Not for: films that need a claim or story beat (there is no type moment), or a single hero screen.

## Format
4:5 · 12.87 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.27 | 0–68 | hook | three tall dark screen cards in a row, centre card whole, neighbours cut by the edges; light top, grey floor, footer row | dolly left one pitch (39 % W), step 1 at 0.27–1.00 | slide 85 % of pitch, easings.inOutSine 22 fr (±0.25 s), then easings.linear creep ~15 % pitch over 30 fr | hard-cut | swoosh-short (planned) |
| 2 | 2.27–4.50 | 68–135 | feature | next card slides into the centre slot | dolly left one pitch, step 2 at 2.27–3.00 | same step, peak speed 2.50–2.77; creep after | hard-cut | swoosh-short (planned) |
| 3 | 4.50–6.77 | 135–203 | feature | next card takes the centre slot | dolly left one pitch, step 3 at 4.50–5.27 | same step, 23 fr (±0.25 s); creep 5.27–6.77 | hard-cut | swoosh-short (planned) |
| 4 | 6.77–8.77 | 203–263 | feature | next card takes the centre slot; row scale dips ~1 % during the slide | dolly left one pitch, step 4 at 6.77–7.50; scale 1.00→0.99→1.00 (±0.25 s) | same step, 22 fr (±0.25 s); creep 7.50–8.77 | hard-cut | swoosh-short (planned) |
| 5 | 8.77–11.00 | 263–330 | feature | next card takes the centre slot | dolly left one pitch, step 5 at 8.77–9.50 | same step, 22 fr (±0.25 s); creep 9.50–11.00 | hard-cut | swoosh-short (planned) |
| 6 | 11.00–12.87 | 330–386 | feature | last step; final frame matches the frame-0 layout, so the clip loops | dolly left one pitch, step 6 at 11.00–11.77 | same step, 23 fr (±0.25 s); creep to the end | hard-cut | swoosh-short (planned) |

Evidence per row: row 1 sheet-01 cells 0–8 (0.00 rest, 0.27 slight shift, 0.50 large shift, 0.77–1.00 settle); row 2 sheet-01 cells 9–15 + sheet-02 cell 0 (2.27 slight, 2.50 large, 2.77–3.00 settle); row 3 sheet-02 cells 1–11 (4.50 and 4.77 large, 5.00 settle); row 4 sheet-02 cells 11–15 + sheet-03 cells 0–3 (7.00 large, 7.27 settle; motion.json zoom −0.9 %/s in second 7); row 5 sheet-03 cells 3–11 (9.00 large, 9.27 settle); row 6 sheet-03 cells 12–15 + sheet-04 cells 0–3 (11.27 large, 11.50 settle, 12.77 matches 0.00). No cut frames (cuts.json empty). Keyframe kf-006.50 for sizes and type.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| dolly | 1–6 | craft/03 camera, Dolly preset (flat mode, x travel) |
| speed-ramp | 1–6 | craft/vocabulary.md#camera: each step is a fast slide then a slow creep inside one shot |
| device-phone | 1–6 | craft/vocabulary.md#ui: frameless phone-aspect screen cards (radius only, no bezel) |

## Look
Palette: #E1E2E4 background top, #0D0E0D card fill, #797A7B floor gradient bottom, #060606 card bottom, #A6A8A9 floor mid, #D5D6D9 light grey. Type: small regular grotesk label top-left of each card, sentence case, ~2.8 % H, white; tiny mono footer labels ~1.2 % H, grey. Treatment: none. Background: vertical gradient, flat light grey to 55 % H, then darkening to mid grey at the bottom (floor).

## What to adapt
- Copy: one label per card, 1 to 3 words; footer row with a small logo left and up to 3 tiny mono labels.
- Brand: card fill can carry the brand dark; logo small bottom-left of each card and in the footer; floor gradient from brand bg to muted.
- Timing: keep the 22 fr slide and the ~65 fr period; add or drop steps to fit the number of screens (6 steps here). For a loop, the last step must land on the frame-0 layout.

## Pitfalls
- The motion never fully stops: the creep between steps (~185 px/s at 1920 W) keeps the frame alive; a dead hold reads as a stall.
- Each step covers about 85 % of the pitch, not 100 %; the creep closes the rest. Moving a full pitch in the slide and then creeping overshoots the slot.
- Neighbour cards must be cut by the frame edges on both sides; three whole cards read as a static grid.

## Missing components
- StepCarousel: horizontal row of N cards (w 29 % W, pitch 39 % W, h ~50 % H, radius ~24 px at 1120 W), x offset = step index × pitch, each step easings.inOutSine 22 fr covering 85 % of pitch + easings.linear creep 15 % until the next step, period 65 fr, wraps cards for a seamless loop (techniques: dolly, speed-ramp, device-phone)

## Proposed terms
- step-carousel: a row of cards that advances one item per beat with an eased slide and a slow creep between, no cuts; rows 1–6 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip extracted). Not measurable: exact slide length (22–23 fr ±0.25 s), the easing profile shape beyond "fast middle, slow ends", any overshoot at the end of a slide, the exact creep speed (taken from motion.json per-second pans). Card sizes measured on kf-006.50 at 1120×1400. Reference cards are empty placeholders, so screen content is not studied. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts). Catalogue hints horizon-arc, mask-wipe and slide-push were not seen in any cell and are not used.

## Study log
id phone-row-step-glide · family mobile-app · 12.87 s, 6 rows (one 0-cut shot split at each step start) · 3 techniques (dolly, speed-ramp, device-phone) · cut_on_beat n/a (silent, 0 cuts) · not measurable: slide frames and overshoot at 4 fps (±0.25 s) · proposed terms: step-carousel · missing components: StepCarousel · phase B not run (study batch).
