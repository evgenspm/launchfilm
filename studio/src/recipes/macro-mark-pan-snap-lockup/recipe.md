# Close-up mark pan, snap out to lockup

The camera starts so close that the brand mark fills the frame, travels across it while the wordmark wipes in, then snaps out in one frame to the small centred lockup, holds and fades. The hidden scale makes a tiny logo feel big.

Source: https://www.raylight.app/templates/8Rw9e4DM (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A 4 s logo sting, or the close of a longer film
- A brand with a simple geometric mark next to a one-word name
- Silent social loops where a flat colour field carries the brand
- An intro bumper before a product demo
Not for: marks with fine detail that falls apart at 3x, long names (the close-up wipe needs one short word), films that need a claim or a URL.

## Format
16:9 · 4.03 s · 30 fps · dark (flat mid blue, relative luminance about 0.17) · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.13 | 0–34 | hook | extreme close-up of the accent corner mark on flat blue, no text | dolly at about 3x: mark enters from lower right, travels up-left about 330 px@1920 in 10 fr, then drifts about 170 px/s up-left | travel easings.outExpo 10 fr (f0–f10), then easings.linear drift to f33 | hard-cut (none, continuous) | whoosh |
| 2 | 1.13–1.80 | 34–54 | logo | same close-up: the one-word name wipes in at upper left while the mark slides to the lower right edge | dolly reverses: content moves down-right about 490 / 300 px/s @1920, slight scale growth | soft-edge left-to-right wipe, about 1 letter per 3 fr, feather about half a letter, f34–f50; dolly easings.inOutSine f33–f53 | match-cut | hit |
| 3 | 1.80–3.23 | 54–97 | logo | wide view: small lockup, name above-left of the mark, centred on the same field | pull-out as a one-frame snap at f54 (scale down about 3x), then drift about 80 px@1920 right/down over 43 fr, scale creep about 0.5 %/s | no element motion, easings.linear drift only | hard-cut (none) | none |
| 4 | 3.23–4.03 | 97–121 | outro | lockup fades away, empty blue field holds to the end | drift continues during the fade, static from f109 | name and mark fade together 1 to 0 over 12 fr (f97–f109), easings.inOutSine; empty hold 12 fr | hard-cut | none |

Evidence per row: row 1 = sheet-01 cells 0–4 (0.00–1.00) and 30 fps strip of 0–1 s; row 2 = sheet-01 cells 5–7 (1.27–1.77), strip of 1–2 s frames 34–53; row 3 = sheet-01 cells 8–12 (2.00–3.00), strips 1–2 s (frame 54 onward) and 2–3 s; row 4 = sheet-01 cells 13–15 (3.27–3.77), sheet-02 cell 0 (4.00), strip 3–4 s. No cut frames exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| dolly | 1, 2, 3 | craft/vocabulary.md#camera, craft/04-motion.md#easings (inOutSine) |
| pull-out | 3 | craft/vocabulary.md#camera |
| match-cut | 2 → 3 | craft/vocabulary.md#transitions: the mark keeps its place in the composition across the snap |

## Look
Palette: #5268E5 background (flat blue), #FEFFFE name, #FA653A mark (warm orange). Type: bold geometric grotesk, sentence case, one word, tight tracking, about 20 % H in the close-up and about 5 % H in the lockup. Treatment: none (no grain, no glow). Background: flat colour, no gradient.

## What to adapt
- Copy: one word only (the product name), 4 to 8 letters so the close-up wipe reads in about 16 fr.
- Brand: bg carries the field, accent carries the mark, fg the name. Lockup = name above-left, mark below-right, overlapping corner.
- Timing: rows 1 and 3 may stretch; keep the snap a single frame and the wipe about 16 fr; fade stays 12 fr.

## Pitfalls
- The snap is one frame (f53 to f54) with no motion blur; easing it into a zoom turns it into an ordinary pull-out and loses the surprise.
- Name and mark scale by different ratios at the snap only because the name is still moving; in the wide view they sit fixed as one lockup.
- The cut detector sees no cut (same colours), so do not read 1 shot as "no structure".
- Exit fade includes the mark; fading only the name leaves an orphan shape.

## Missing components
- SoftWipeText: a word revealed by a horizontal alpha mask with a feathered leading edge, about 1 letter per 3 fr, feather 0.5 letter (techniques: none in vocabulary; see Proposed terms)

## Proposed terms
- soft-edge-wipe: text revealed by a moving feathered alpha mask, letters appear across the edge, no blur, no offset (row 2) (not in craft/vocabulary.md; not used in recipe.json)
- snap-zoom: a one-frame scale jump between two framings of the same layout (row 2 → 3) (not in craft/vocabulary.md; written as pull-out + match-cut in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips extracted for 0–4 s (local source file, temp folder, deleted); sheets at 0.25 s for layout. Not measurable: exact spring/easing curve of the opening travel (outExpo is a fit to 10 fr of deceleration), exact scale ratio (about 3x ±0.3). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id macro-mark-pan-snap-lockup · family logo-brand · 4.03 s, 4 rows (0 detected cuts; rows split at the wipe start f34, the snap f54, the fade f97).
Techniques 3 (dolly, pull-out, match-cut). cut_on_beat: n/a, 0 cuts, no music, no VO.
Measured from 30 fps strips: travel-in 10 fr, wipe f34 to f50, one-frame snap at f54, fade f97 to f109, empty hold 12 fr.
Not measurable: exact travel easing, scale ratio (about 3x ±0.3).
Proposed terms: soft-edge-wipe, snap-zoom. Missing components: SoftWipeText.
phase B: not run.
