# Tap-driven mark with palette wipes

A centered mark contracts like a press, then rebounds as a rounded field expands to the next palette color. Five evenly spaced changes and a matched loop make a compact, tactile brand intro.

Source: https://jitter.video/template/logo-tap-color-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A brand mark and a five-color palette are the whole story.
- A square silent loop needs an interaction-like rhythm.
- A short brand intro should feel tactile without showing a cursor.
Not for: a wide wordmark, detailed illustration, or message that needs more than three small information lines.

## Format
1:1 · 9.80 s · 30 fps · mixed · music none, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.68 | 0–20 | hook | opening palette state, centered mark card, three small color-information lines | locked center; mark card 1.00→~0.52→1.00 | contract, easings.inExpo ~7 fr (±0.25 s); rounded field mask-wipe 9 fr; rebound, easings.outExpo 9 fr | mask-wipe | ui-confirm planned |
| 2 | 0.68–2.47 | 20–74 | logo | second palette state holds, then the mark compresses to trigger the next color | locked center; mark card 1.00→~0.52→1.00 | settle ~5 fr; hold; contract ~8 fr (±0.25 s); mask-wipe 10 fr | mask-wipe | ui-confirm planned |
| 3 | 2.47–4.48 | 74–134 | logo | third palette state updates the labels, holds, then repeats the press | locked center; mark card 1.00→~0.52→1.00 | rebound, easings.outExpo ~9 fr; hold; contract ~8 fr (±0.25 s); mask-wipe 9 fr | mask-wipe | ui-confirm planned |
| 4 | 4.48–6.50 | 134–195 | logo | neutral palette state holds before a centered color field grows over it | locked center; mark card 1.00→~0.52→1.00 | rebound ~9 fr; hold; contract ~8 fr; mask-wipe ~10 fr (±0.25 s) | mask-wipe | ui-confirm planned |
| 5 | 6.50–8.47 | 195–254 | logo | fifth palette state settles, holds, then compresses into the return color | locked center; mark card 1.00→~0.52→1.00 | rebound ~9 fr; hold; contract ~8 fr (±0.25 s); mask-wipe 10 fr | mask-wipe | ui-confirm planned |
| 6 | 8.47–9.80 | 254–294 | logo | opening palette state returns at the original scale and layout | locked center; mark card settles at 1.00 | field completes ~5 fr; mark settles with easings.outExpo ~9 fr (±0.25 s); final ~31 fr hold | match-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–2`, `cuts/cut-000.53.jpg`; row 2 `sheet-01 cells 3–9`, `cuts/cut-002.30.jpg`; row 3 `sheet-01 cells 10–15`, `sheet-02 cells 0–1`, `cuts/cut-004.33.jpg`; row 4 `sheet-02 cells 2–10`, `keyframes/kf-006.50.jpg`; row 5 `sheet-02 cells 10–15`, `sheet-03 cells 0–1`, `cuts/cut-008.30.jpg`; row 6 `sheet-03 cells 2–7`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1–5 | `craft/vocabulary.md#transitions`, `craft/09-transitions.md` |
| match-cut | 6 | `craft/vocabulary.md#transitions`, `craft/09-transitions.md` |

## Look
Palette: opening blue `#174BEB`, green-yellow `#BAD029`, violet `#9608FF`, neutral grey `#ABAEC7`, warm yellow `#E4C011`, mark card `#FFFFFF`. Type: medium grotesk, uppercase, open tracking, about 3% of frame height; paired technical values align in two columns. Treatment: none. Background: flat palette color, briefly overlaid by an expanding rounded field of the next color.

## What to adapt
- Copy: one short palette label plus two label/value rows per state; keep all three positions fixed as their values change.
- Brand: use one compact mark with strong one-color contrast inside the white rounded card; provide five background colors with readable label colors.
- Timing: keep the 9–10 fr wipes and the deep press scale; stretch only the holds between press moments.

## Pitfalls
- The card reaches roughly half size before release. A conventional 0.9 press does not create enough anticipation for the full-frame wipe.
- Keep the mark, card, and rounded wipe on the same center. Even a small offset breaks the match between palette states.
- The information lines do not move. Re-laying them out on each color change makes the loop feel unstable.
- The last 31 fr must match the opening composition closely enough for the loop seam to disappear.

## Local components
- `PaletteTapCycle.tsx`: centered mark card contracts to 0.52 scale, then a same-origin rounded color field expands to full frame in 9–10 fr while labels switch. It accepts six palette states and a five-event frame schedule. No shared component was changed.

## Build comparison
| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|
| 1 | 0.00–0.68 | 0.00–0.68 | 0 | centered rounded mark card; fixed lower-left two-row metadata | deep contraction, center-origin rounded mask | moved contraction 7 fr before the wipe; reduced card to 24% of frame |
| 2 | 0.68–2.47 | 0.68–2.47 | 0 | same locked layout; palette role changes | 10 fr mask takeover and `outExpo` rebound | slowed field growth to `outCubic` so the rounded front remains visible |
| 3 | 2.47–4.48 | 2.47–4.48 | 0 | mark and metadata remain fixed | 9 fr mask takeover after a 7 fr press | no further fix |
| 4 | 4.48–6.50 | 4.48–6.50 | 0 | neutral/muted palette role, same geometry | 10 fr mask takeover and rebound | no further fix |
| 5 | 6.50–8.47 | 6.50–8.47 | 0 | light/accent palette role, same geometry | 10 fr mask takeover and rebound | no further fix |
| 6 | 8.47–9.80 | 8.47–9.80 | 0 | returns to the opening state and holds | `match-cut` loop seam; no exit | duplicated state 1 as the final content state |

Shot count is 6 vs 6. Theme is mixed in both; palette roles, uppercase mono metadata, centered scale, and transition direction match. The remaining difference is that our high-contrast Northfern palette makes four detector windows read as hard changes; the rounded wipe front and 9–10 fr duration remain visible frame by frame.

## Proposed terms
- `tap-squash`: a deep press contraction of the hero card that anticipates a release-triggered scene change; rows 1–5 (not in `craft/vocabulary.md`; not used in recipe.json).
- `palette-cycle`: repeated full-frame color states that return to the opening color and layout; rows 1–6 (not in `craft/vocabulary.md`; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; soft-transition windows are frame-timed by `cuts.json`. Not measurable: exact contraction start, entrance overshoot, or the detector-missed wipe around 6.50 s. The four measured soft windows are 0.53–0.83, 2.30–2.63, 4.33–4.63, and 8.30–8.63 s. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 hard cuts within ±2 fr; no beats exist.

## Study log
id: logo-mask-palette-cycle
family: logo-brand
duration: 9.80 s at 30 fps; 6 contiguous rows
techniques: 2 (`mask-wipe`, `match-cut`)
cut_on_beat: false; 0/0 hard cuts and no audio beats
measurement limit: 0.25 s for contraction start and overshoot
proposed terms: `tap-squash`, `palette-cycle`
missing component: `PaletteTapCycle`
phase A result: studied; offline validation passed
phase B result: built in 2 comparison iterations
composition: 1080×1080, 30 fps, 294 frames; listed by Remotion
comparison gate: 6/6 rows, 0 fr structure-boundary delta, 6 detected shots
motion detector: 4 hard + 1 soft change; reference 0 hard + 4 soft, with one detector-missed wipe
render gate: final MP4 exists; ffprobe 9.800 s / target 9.800 s = 1.000
sheet gate: 3 timestamped 4×4 sheets at 4 fps
poster gate: frame 0 is visible and non-black
missing components: none; `PaletteTapCycle` built locally
final validation: `valid: src/recipes/logo-mask-palette-cycle/recipe.json`; TypeScript and determinism greps passed
