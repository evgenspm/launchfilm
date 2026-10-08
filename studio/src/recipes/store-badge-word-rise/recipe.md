# Store download badge assembles on black

A black download badge builds piece by piece on black: the rounded outline scales up, the store mark fades in, then the two label lines rise word by word inside the frame. It holds, then fades and shrinks out.

Source: https://jitter.video/template/black-app-store-badge/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- a 2-4 s download CTA insert at the end of a mobile app film
- an end-card overlay that tells viewers where to get the app
- a silent, monochrome sign-off that must not compete with the logo
Not for: films that need a URL, a price or a second store; the badge carries one destination only.

## Format
other (1164×498, 2.34:1) · 3 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts) · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | one rounded-rectangle download badge centred on black: thin grey outline, store mark left, 3-word eyebrow over a 2-word label | static; the badge scales 0.85→1.00 on entry, ~1.00→0.90 on exit | f0 black; outline fade + scale 0.85→1.00 f1–f6, springs.ui; mark fades in f4–f8; words mask-rise from below with fade, stagger ~2 fr, first f7, last f11, springs.ui (no overshoot seen), settled f24; hold f24–f80; exit f80–f84 fade + scale to ~0.90, easings.inExpo 4 fr; black f84–f90 | hard-cut | pop on outline, tick per word |

Evidence: sheet-01 cells 0–11 (0.00 black; 0.27 outline + mark + first words rising; 0.50 last words still grey; 0.77 settled; 1.00–2.50 hold; 2.77 fading and smaller); 30 fps strips of the local source at t = 0 and t = 2; keyframes kf-000.50, kf-001.50, kf-002.50. No cut frames (cuts.json empty).

Working list:
- 0.00 · black
- 0.03–0.20 · outline appears dim and grows to full size
- 0.13–0.27 · store mark fades in at the left
- 0.23–0.37 · eyebrow words then label words rise from below, each starting grey and brightening
- 0.50 · last eyebrow word and second label word still mid-rise / grey
- 0.80 · everything settled, white type, grey outline
- 0.80–2.67 · nothing moves
- 2.67–2.80 · whole badge dims and shrinks toward the centre
- 2.80–3.00 · black

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 1 | craft/vocabulary.md#type, craft/04#springs (maskRise) |
| hard-cut | 1 (end) | craft/vocabulary.md#transitions |

## Look
Palette: #000000 background, #FFFFFF type and mark, #A6A6A6 outline, #797979 type mid-rise (transitional grey). Type: medium grotesk, sentence case, normal tracking; eyebrow ~11 % H, label ~18 % H, left aligned beside the mark. Treatment: none. Background: flat black.

## What to adapt
- Copy: eyebrow ≤ 4 words (where to get it), label ≤ 2 words (the store name); keep the eyebrow small over the large label.
- Brand: the badge stays monochrome (white on black, grey stroke); swap the mark for the platform glyph. Brand accent does not belong here.
- Timing: entrance f0–f24 keeps its frame counts; the hold (f24–f80) stretches to fit the end card; exit stays 4 fr.

## Pitfalls
- Order matters: outline first, then mark, then words. Bringing the words in with the outline flattens the build.
- Words brighten while rising (grey → white); a pure position rise without the brightness ramp reads as cheap.
- Store badges have usage guidelines from the store owner; use the official artwork when the badge links to a real listing.

## Missing components
- StoreBadge: rounded-rect outline (radius ~13 % of height, 2 px grey stroke) with a left glyph and two stacked lines; outline scales 0.85→1.00 over 6 fr, glyph fades 4 fr later, words rise in a clip mask with 2 fr stagger and a grey→white ramp; exit fade + scale to 0.90 over 4 fr (techniques: mask-rise)

## Proposed terms
- badge-assemble: a CTA badge built in order outline → glyph → words within ~0.8 s (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- shrink-fade-out: whole element scales down ~10 % while fading to black in ≤ 5 fr (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0 and t = 2 of the local source; hold checked at 0.25 s from sheet-01. Not measurable: exact spring overshoot (none visible at 1 fr). The catalogue hint of a phone device is not visible: no device on screen. motion.json labels camera-rotate with -2.2°: not seen in the sheets (static badge), treated as estimator noise. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no music, no cuts).

## Study log
- id store-badge-word-rise · family logo-brand · 3.00 s · 1 row (0 cuts, silent)
- techniques 2 (mask-rise, hard-cut) · difficulty easy · render_cost light
- cut_on_beat: n/a (0 cuts, no music)
- measured at 1 fr from 30 fps strips; overshoot none visible
- proposed terms: badge-assemble, shrink-fade-out
- missing components: StoreBadge
- phase B: not run (study only)
