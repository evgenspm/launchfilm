# Status board row-flip loop

A black status board of five label/value rows under a split wordmark. Rows roll to a second copy set one by one, top to bottom, while an amber arrow dashes right and creeps back. Reads like a transit board and loops seamlessly.

Source: https://jitter.video/template/the-route-departures-board/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing a collection, release or schedule as a list of short label/value facts
- Bilingual or two-message loops where the same rows swap copy in place
- Travel, transport, logistics or event products that want a timetable voice
- Silent autoplay loops for a site hero or social feed
Not for: a story with a payoff or CTA beat; anything that needs UI, product shots or more than ~6 facts.

## Format
16:9 · 8.8 s · 30 fps · dark · loopable · music none (silent reference), cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | split wordmark header (two words) with amber arrow by the first; board of 5 label/value rows, copy set A; tiny column heads | static | hold | hard-cut | none |
| 2 | 0.50–1.00 | 15–30 | feature | rows swap to copy set B one by one, top to bottom; label and value swap together | static | per row old line rises ~0.1 row + fades 3 fr, new line rises in 3 fr, easings.outQuint; stagger 4 fr; cascade f16–f32 | hard-cut | tick per row (planned) |
| 3 | 1.00–2.00 | 30–60 | feature | board holds set B; arrow dashes right toward the second word | static | arrow ~40 % W, easings.inOutSine ~24 fr (f30–f54, ±3 fr), no overshoot | hard-cut | swoosh-short (planned) |
| 4 | 2.00–4.50 | 60–135 | feature | board holds set B; arrow creeps back left | static | arrow easings.linear drift ~3.8 px/fr @1920 | hard-cut | none |
| 5 | 4.50–5.40 | 135–162 | feature | rows swap back to set A one by one, top to bottom | static | same roll as row 2, stagger 4–5 fr; cascade f136–f160 | hard-cut | tick per row (planned) |
| 6 | 5.40–8.80 | 162–264 | feature | board holds set A; arrow drifts back to its frame-0 spot | static | linear drift continues, lands within ~1 % of frame 0 | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–2`, strip f0–f15; 2 `sheet-01 cells 3–5`, strip f15–f44; 3 `sheet-01 cells 4–8`; 4 `sheet-01 cells 8–15`, `sheet-02 cells 0–2`; 5 `sheet-02 cells 2–5`, strip f135–f164; 6 `sheet-02 cells 5–15`, `sheet-03 cells 0–3`. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-swap | 2, 5 | craft/05-typography.md (word swap), WordSwap in studio/API.md; here applied to whole rows, see Proposed terms |

## Look
Palette: #000000 background, #FCF4E2 labels and header, #E4BC61 values and arrow, #787061 / #28241F mid-fade tones and rule lines. Type: header bold geometric grotesk uppercase ~10 % H split left/right; board monospaced uppercase ~4.5 % H, labels left in warm white, values right-aligned in amber; tiny mono column heads, thin grey rules between rows. Treatment: none. Background: flat black.

## What to adapt
- Copy: header = two words; 5 rows per set, label ≤ 4 words, value ≤ 3 words (name, edition/date, audience, counts, availability); set B is a translation or a second message with the same row roles.
- Brand: accent carries every value, the arrow and the right column head; labels in fg; header in display font, board in mono.
- Timing: holds (rows 4 and 6) stretch freely; the per-row 3+3 fr roll and 4 fr stagger keep their frame counts; the arrow drift must end on its frame-0 position.

## Pitfalls
- Label and value of one row must swap on the same frame; swapping columns separately breaks the board read.
- The roll is tiny (~0.1 row, 6 fr); a full-height slot spin or a slow crossfade looks like a different effect.
- Values that change length jump right-aligned edges; keep both sets right-aligned and in mono.
- The loop depends on the arrow returning exactly; a missed position shows a pop at the wrap.

## Missing components
- StatusBoard: header wordmark split by an accent arrow, N label/value rows with rules, `sets[]` swapped per row with a 3 fr out / 3 fr in vertical roll, stagger 4 fr, loop-safe arrow dash (24 fr) + linear return (techniques: word-swap)

## Proposed terms
- row-flip-cascade: each row of a table swaps its copy in place with a short vertical roll, rows staggered top to bottom (rows 2, 5) (not in craft/vocabulary.md; not used in recipe.json)
- arrow-shuttle: an accent arrow dashes out on an ease and drifts back linearly so a loop closes (rows 3–6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.0, 0.5, 4.5 s; 0.25 s from sheets elsewhere (arrow dash ends ±3 fr). Not measurable: exact roll easing (6 fr total, outQuint is the closest name). The catalogue hint `device-phone` was not seen. motion.json "camera-mixed" seconds are the arrow moving, not a camera. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id board-row-flip-loop · family kinetic-type · 8.8 s, 6 rows, 0 cuts, loopable.
Techniques: 1 (word-swap). cut_on_beat n/a (silent, 0 cuts).
Measured from 30 fps strips: swap cascades f16–f32 and f136–f160, per-row 3+3 fr, stagger 4 fr.
Not measurable: roll easing below 6 fr; arrow dash end ±3 fr (sheets).
Proposed terms: row-flip-cascade, arrow-shuttle.
Missing components: StatusBoard.
Phase B: not run (study only).
