# Collectible card swaying in perspective

One portrait card on black leans into perspective to one side, holds, returns flat, then leans the other way and returns. Inner art layers slide against the frame, so a flat image reads as a thick object.

Source: https://jitter.video/template/nft-cards-3d/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showcasing a single collectible, pass, ticket or membership card
- A loopable hero or social post for a digital item with one artwork
- Giving a flat product shot depth without a 3D model
- A calm, silent autoplay loop on a dark page
Not for: films that need a message or a story arc (there is no copy beat), or several products at once.

## Format
other (1322×992, 4:3-ish) · 7.00 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | single portrait card centred on black: grey metal frame, dark art window with a bust and a big word behind it, title below | static | flat and frontal, no change (±0.25 s) | hard-cut | none |
| 2 | 0.50–2.27 | 15–68 | feature | card leans, left edge recedes, slight clockwise roll; back word slides against the frame | locked, card moves | lean easings.inOutSine ~15 fr (±0.25 s), width -4 %; lean held 30 fr with ~1° drift | hard-cut | swoosh-short |
| 3 | 2.27–4.00 | 68–120 | feature | card back to flat frontal and holds; frame highlight brightens | locked, card moves | return easings.inOutSine ~15 fr (±0.25 s); flat hold 45 fr | hard-cut | tick |
| 4 | 4.00–5.77 | 120–173 | feature | card leans the other way, right edge recedes, slight counter-clockwise roll | locked, card moves | mirror of row 2: ~15 fr lean (±0.25 s), width -4 %, held 30 fr | hard-cut | swoosh-short |
| 5 | 5.77–7.00 | 173–210 | feature | card flat again, same as the first frame, holds into the loop | locked, card moves | return easings.inOutSine ~8–15 fr (±0.25 s); flat hold 30 fr | hard-cut | tick |

Evidence per row: row 1 `sheet-01 cells 0–1`, `kf-000.50`; row 2 `sheet-01 cells 2–8` (0.50 lean begins, 0.77–2.00 leaned), `kf-001.50`; row 3 `sheet-01 cells 9–15` (2.27 near flat, 2.50–3.77 flat), `kf-002.50`, `kf-003.50`; row 4 `sheet-02 cells 0–6` (4.27 lean begins, 4.50–5.50 leaned), `kf-004.50`; row 5 `sheet-02 cells 7–11` (5.77 near flat, 6.00–6.77 flat), `kf-005.50`, `kf-006.50`. No `cuts/*.jpg` (0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 2–5 | craft/vocabulary.md#camera (TiltPlane), applied to a card instead of UI |

## Look
Palette: #000000 background, #AFAFAF frame highlight, #626262 frame mid, #3C3C3C frame shade, #222222 art-window dark, #8E8E8E bust mid-tone (palettegen on kf-000.50, kf-003.50, kf-006.50; near-duplicates merged). Type: heavy condensed display word behind the subject (~22 % of card height), bold grotesk title caps, small mono labels; four tiny mono footer labels across the frame bottom. Treatment: none. Background: flat black.

## What to adapt
- Copy: back word 1 word; title 2 words; sub-line ~10 words; serial code ~12 chars; value label 1 number + unit; 4 footer labels of 1–2 words.
- Brand: the frame metal takes brand muted/fg grey; logo top-left of the card and bottom-left of the frame.
- Timing: flat holds can stretch; keep leans and returns at ~15 fr and both leans equal so the loop stays symmetric.

## Pitfalls
- The depth comes from the inner layers sliding against the frame; tilting one flat image looks like a postcard.
- Lean is small (width -4 %, roll ~3°); larger angles expose that the card has no thickness.
- First and last frames must match exactly or the loop jumps.

## Missing components
- ParallaxCard: portrait card with 3–4 stacked layers (frame, art window, back word, subject, labels) whose x offset scales with yaw (0, 0.3, 0.6, 1.0 × ~2 % card width at 18°), plus a sheen gradient tied to yaw (techniques: tilt-plane)

## Proposed terms
- layer-parallax-card: layers inside one card shift at different rates as it tilts, rows 2 and 4 (not in craft/vocabulary.md; not used in recipe.json)
- angle-sheen: frame brightness follows the card angle, brightest when frontal, rows 2–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no strips extracted). Not measurable: exact lean/return frame counts, ease shape, overshoot, exact yaw angle (estimated from -4 % width). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no music, no cuts). motion.json agrees: motion at 0–1, 2–3, 4–5, 5–6 s, holds at 1, 3, 6 s.

## Study log
- id parallax-card-tilt-sway · family 3d-device · 7.00 s, 5 rows (single shot split at 4 tilt state changes)
- techniques: 1 (tilt-plane); catalogue hints device-3d and card-grid not seen (one flat card, no 3D model, no grid)
- cut_on_beat: n/a, 0 cuts, no audio
- not measurable at 0.25 s: lean frame counts, easing, overshoot, yaw angle
- proposed terms: layer-parallax-card, angle-sheen
- missing components: ParallaxCard
- phase B: not run (study job)
