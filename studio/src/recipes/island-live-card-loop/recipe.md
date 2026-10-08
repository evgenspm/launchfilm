# Island pill opens into a live trip card

A small top pill on a translucent phone over a soft sky widens, adds a middle label, then springs open into a dark status card where a hero image slides in, clouds drift past and a progress bar creeps; it folds back to the pill and loops.

Source: https://jitter.video/template/the-route-ios-flight-tracker/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a live status widget (trip, delivery, order) on a phone
- A vertical loop for a feed or a landing page hero
- Demonstrating real-time progress without a cut
- One calm UI moment with no VO and no music
Not for: products without a single live status to show; films that need a story with claims or a CTA.

## Format
9:16 · 16.5 s · 30 fps · mixed (blue sky background, near-black card) · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.27 | 0–68 | hook | compact black pill on a translucent phone body over a blurred sky: status dot + short value left, accent chip right | drift, sky only, about 0.1 %/s | pill breathes in width about 10 %, springs.ui 30 fr (overshoot not measurable, ±0.25 s) | morph | none |
| 2 | 2.27–3.27 | 68–98 | feature | pill widens to near full phone width; a 2-word id label fades in at its centre | drift | width on springs.layout about 20 fr; label easings.outQuint 15 fr (±0.25 s) | morph | none |
| 3 | 3.27–4.27 | 98–128 | feature | pill opens down into a dark rounded card: 3-stat row, inner panel with the pill row, two endpoint codes, empty progress track, two buttons | drift, zoom 0.2 %/s | card grows on springs.layout, settled by 3.77 (about 15 fr, ±0.25 s); text dim at 3.27, full at 3.77; buttons last | hard-cut | pop |
| 4 | 4.27–5.77 | 128–173 | feature | hero vehicle image slides in from the panel's left edge; progress fill 0 to about half | drift, about -0.2 %/s | image easings.outExpo about 30 fr (±0.25 s); fill easings.outQuint 30 fr to about 55 % | hard-cut | swoosh-short |
| 5 | 5.77–12.50 | 173–375 | feature | live hold: cloud puffs pass right to left over the image; fill creeps to about 65 % | drift, about -0.2 %/s | clouds easings.linear, one pass about 2 s (±0.25 s); fill easings.linear about 1.5 %/s | morph | none |
| 6 | 12.50–13.00 | 375–390 | feature | card folds back up: buttons and stats go first, image exits right, card becomes a wide pill | drift | height on springs.ui about 12 fr; contents easings.inExpo 8 fr (±0.25 s) | morph | tick |
| 7 | 13.00–16.50 | 390–495 | feature | wide pill narrows to the compact pill and holds; matches frame 0 for the loop | drift, about -0.1 %/s | width on springs.ui in steps, compact by 15.00 (±0.25 s); hold 45 fr | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–8`; 2 `sheet-01 cells 9–12`; 3 `sheet-01 cells 13–15`, `sheet-02 cell 0`; 4 `sheet-02 cells 1–7`; 5 `sheet-02 cells 8–15`, `sheet-03 cells 0–15`, `sheet-04 cells 0–1`; 6 `sheet-04 cells 2–3`; 7 `sheet-04 cells 4–15`, `sheet-05 cells 0–1`. No cut frames (cuts.json is empty). Keyframes kf-000.50, kf-004.50, kf-008.50, kf-015.50 used for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| island-morph | 1–3, 6–7 | craft/vocabulary.md#ui, studio API IslandPill |
| device-phone | 1–7 | craft/vocabulary.md#ui, studio API PhoneFrame |
| ui-rebuild | 3–6 | craft/vocabulary.md#ui |

## Look
Palette: #1F7CAF sky blue (background), #5D9EC4 light sky, #A3BDCF cloud haze, #000000 card shell, #1A1A1A inner panel, #232323 buttons and track. Accent: a saturated yellow chip (too small for palettegen; sample in phase B). Type: small grotesk UI labels about 1 % H; endpoint codes bold condensed mono uppercase about 2.5 % H; mono micro-captions. Treatment: none. Background: blurred sky footage-like gradient, phone body as a translucent frosted panel without bezel.

## What to adapt
- Copy: pill left value (1 short token), middle id (1–2 words), chip (1 short token); 3 stats with captions; 2 endpoint codes with dates; 2 button labels.
- Brand: accent on the chip and status dot; the card stays near-black for contrast with the sky.
- Timing: row 5 (live hold) stretches or shrinks freely; rows 3 and 6 must keep their frame counts (open 15 fr, close 12 fr).

## Pitfalls
- The card opens from the pill, not from the screen centre: keep the top edge anchored at the pill.
- Text appears after the shape has grown (dim at 3.27, full at 3.77); fading text with the shape looks cheap.
- The hold is 6.7 s with only the clouds and the progress moving; without the sky drift the frame goes dead.

## Missing components
- LiveActivityCard: dark rounded card that grows down from an IslandPill, 3-stat header, inner panel, 2 endpoint codes, progress track, 2 buttons; open springs.layout 15 fr, close springs.ui 12 fr (techniques: island-morph, ui-rebuild)
- CloudPass: 2–3 cloud sprites crossing a panel right to left at constant speed, one pass about 2 s, masked to the panel (techniques: ui-rebuild)
- SkyBackdrop: blurred blue/white sky that drifts slowly, scale about 0.2 %/s (techniques: device-phone)

## Proposed terms
- live-activity-card: an island pill that opens into a full status card and folds back, rows 3–6 (not in craft/vocabulary.md; not used in recipe.json)
- cloud-pass: decorative clouds crossing a hero image inside a card to imply motion, row 5 (not in craft/vocabulary.md; not used in recipe.json)
- progress-fill: a linear progress bar that creeps in place to show live data, rows 4–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no strips extracted). Not measurable: spring overshoot of the pill and card, image entrance frames, exact cloud speed. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id island-live-card-loop, family mobile-app, 16.50 s, 7 rows, 0 cuts, loopable (last cell matches first).
- techniques 3 (island-morph, device-phone, ui-rebuild); hinted card-grid and glow not visible, dropped.
- cut_on_beat n/a: no audio, no cuts.
- Not measurable at 0.25 s: overshoot, entrance frames, cloud speed.
- Proposed terms: live-activity-card, cloud-pass, progress-fill.
- Missing components: LiveActivityCard, CloudPass, SkyBackdrop.
- Phase B: not run (study only).
