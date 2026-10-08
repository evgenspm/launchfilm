# Rim-lit tilted page section tour

Four sections of a dark storefront page glide past on a tilted plane lit by bright edge bars, one hard cut each, then a gold mark card, a plain wordmark and the whole page shrunk into a phone. Only the camera moves.

Source: https://www.raylight.app/templates/vyv5MQHv (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A premium or luxury storefront or landing page with a dark theme and a metal-coloured (gold) accent
- Silent autoplay showcase of an existing website, section by section, with no copy written for the film
- The page already looks good and only needs a camera, not new animation
- Closing on the logo plus a mobile view of the same page
Not for: light-themed pages (the rim bars need a near-black plane), products whose story needs interaction (clicks, typing), music-driven edits.

## Format
16:9 · 24.63 s · 30 fps · dark · music none, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.10 | 0–93 | hook | hero section on a tilted plane: 2-line headline, 2-line sub, pale pill button; white rim bars at both edges | tilt-plane, push-in 1.00→1.04 over 93 fr, drift up 2–5 px/s, easings.linear | none, all on from f0; camera only | hard-cut | none |
| 2 | 3.10–6.37 | 93–191 | feature | image slide: clothing-rack photo, statement of 3 words on two lines, two slider dots (active gold); plane tilted ~10° | tilt-plane + dolly: rises 63 px/s (2.1 px/fr), push-in 1.00→1.09 over 98 fr, easings.linear | none, on at the cut | hard-cut | whoosh |
| 3 | 6.37–10.03 | 191–301 | cta | follow-us block at right: 2-line headline, 2-line sub, gold pill button cropped by the frame; one diagonal rim bar left; far edge defocused | tilt-plane with depth of field + dolly: travels left 63–73 px/s (2.3 px/fr), scale +0.2–0.9 %/s, easings.linear | none, on at the cut | hard-cut | whoosh |
| 4 | 10.03–14.17 | 301–425 | cta | contact column top-left: gold tracked caps label, 2 channel names, 3 contact lines; rim bar across the corner | tilt-plane + dolly: travels right 78–81 px/s (2.7 px/fr), push 1.00→1.04 over 124 fr, roll −0.5 to −0.8°/s, easings.linear | none, on at the cut | hard-cut | whoosh |
| 5 | 14.17–16.67 | 425–500 | logo | black card ~57 % W × 89 % H centred: gold monogram in an open ring over a tracked serif wordmark and ruled sub-line | push-in 1.00→1.02 over 75 fr, easings.linear | none, card on in one frame; holds 75 fr | hard-cut | shimmer |
| 6 | 16.67–19.67 | 500–590 | logo | brand name, 2 words, small white semibold text centred on flat near-black | push-in 1.00→1.03 over 90 fr, easings.linear | card remnant fades over ~3 fr after the cut; text holds 90 fr | hard-cut | none |
| 7 | 19.67–24.63 | 590–739 | outro | whole mobile page (hero, 2 buttons, 3 stats, chat bubble) in a thin phone frame ~90 % H, centred | static (0.1 %/s, no cell-to-cell change) | phone on in one frame; holds 149 fr to the end | hard-cut | tick |

Evidence per row:
1. sheet-01 cells 0–12, cuts/cut-003.10.jpg (before)
2. sheet-01 cells 13–15, sheet-02 cells 0–9, cuts/cut-003.10.jpg (after), cuts/cut-006.37.jpg (before)
3. sheet-02 cells 10–15, sheet-03 cells 0–8, cuts/cut-006.37.jpg (after), strip at 9.60 (cut at frame 13 of the strip = 10.03)
4. sheet-03 cells 9–15, sheet-04 cells 0–8, keyframes/kf-012.50.jpg, strip at 13.80
5. sheet-04 cells 9–15, sheet-05 cells 0–2, keyframes/kf-014.50.jpg, strip at 13.80 (cut at strip frame 11 = 14.17), strip at 16.30
6. sheet-05 cells 3–14, strip at 16.30 (cut at strip frame 11 = 16.67), strip at 19.30
7. sheet-05 cell 15, sheet-06 cells 0–15, sheet-07 cells 0–2, keyframes/kf-021.50.jpg, strip at 19.30 (cut at strip frame 11 = 19.67)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–4 | craft/vocabulary.md#camera, TiltPlane in studio/API.md |
| dolly | 2–4 | craft/vocabulary.md#camera, Dolly |
| push-in | 1, 2, 4, 5, 6 | craft/vocabulary.md#camera, KenBurns |
| ui-rebuild | 1–4, 7 | craft/vocabulary.md#ui |
| device-phone | 7 | craft/vocabulary.md#ui, PhoneFrame |
| hard-cut | 1–7 | craft/vocabulary.md#transitions |
| vignette | 1–4 | craft/vocabulary.md#look, Vignette |

## Look
Palette: #0A0B0A background near-black, #DCDDD7 off-white headline, #D7B371 gold accent (label, active dot, button, mark), #918C7A pale khaki button, #A78650 deep gold, #4D4537 warm photo shadow. Type: geometric grotesk headlines, semibold, sentence case with periods, ~6 % H on the plane; light grey body ~2.5 % H; wide-tracked caps button labels; final wordmark small semibold grotesk ~2.5 % H. Treatment: vignette (dark falloff to the frame corners on rows 1–4). Background: the page itself on a tilted plane, near-black around it; flat near-black for rows 5–7.

## What to adapt
- Copy: none written for the film; it shows the page's own copy: hero headline (2 lines, ≤ 4 words), slide statement (3 words), follow-us headline (2 lines), contact column (label + up to 5 lines), brand name (2 words).
- Brand: the metal accent carries the caps label, the active slider dot, the follow button and the mark; everything else is greyscale.
- Timing: sections 1–4 can stretch to 3–4.2 s each; keep the camera linear and changing direction at every cut. Logo card ≥ 2.5 s, phone hold ≥ 4 s.

## Pitfalls
- Same direction twice in a row kills the tour: the measured order is up, left, right.
- Rim bars must sit on the plane edge and move with it; a screen-space bar reads as a lens flare.
- The cuts between dark sections are low-contrast; without a direction change they look like jumps.
- The final phone is static for 149 fr: if the page is busy, add a 1 %/s push, the reference does not.

## Missing components
- RimLightBar: thin white emissive bar (~1 % W, soft 6–12 px glow) glued to an edge of a TiltPlane, angle 10–45°, moves with the plane (techniques: tilt-plane)

## Proposed terms
- rim-light-bar: a bright light strip along the edge of a tilted UI plane, the only light in a dark scene (rows 1–4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 9.60, 13.80, 16.30, 19.30 (cuts at 10.03, 14.17, 16.67, 19.67 that cuts.json missed as near-misses or not at all). Camera speeds from motion.json per second, cross-checked on sheets. Not measurable: depth-of-field strength, exact tilt angles (±5°). Silent reference: SFX planned by the glue rule, not measured. cut_on_beat = 0/6 cuts (no beats; no music).

## Study log
id rim-lit-page-section-tour · family product-ui · 24.63 s, 7 rows
techniques 7 (incl. hard-cut, vignette) · cut_on_beat n/a (silent, 0 beats)
4 cuts beyond cuts.json found on 30 fps strips (10.03, 14.17, 16.67, 19.67)
not measurable: tilt angles (±5°), DOF strength
proposed terms: rim-light-bar · missing components: RimLightBar
difficulty hard (ui rebuild of 5 page views), render_cost medium (tilt-plane with DOF)
phase B: not run
