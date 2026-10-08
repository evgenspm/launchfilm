# Tilted phone to laptop tour with typed captions

Dark, silent 30 s promo: a mark lockup, three tilted phone close-ups each paired with a short green caption typed letter by letter, a four-line stacked statement, then a laptop pull-out and a closing mark.

Source: https://www.raylight.app/templates/qd1lP40w (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A consumer app that ships on phone and desktop and wants one film for both
- Silent autoplay feeds: green-on-black captions carry the message without VO
- You have 3 phone screenshots and 1 desktop screenshot; no UI rebuild needed
- A dark brand with one saturated accent colour
Not for: products with no visual UI, or films that need a fast cut-driven rhythm (this one breathes through black).

## Format
16:9 · 30.03 s · 30 fps · dark · music none (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | small mark + one-word lockup in accent green, centred on black | static | mark wipes in 0.27→0.50, word slides out from behind it 0.50→0.77, easings.outExpo ~8 fr (±0.25 s); fade out ~6 fr | hard-cut | none |
| 2 | 1.77–6.27 | 53–188 | reveal | phone top corner tilted ~20°: greeting header, settings icon, large cover tiles | tilt-plane drift down-right 1.5–2.5 px/fr @1920, roll ~3.5°/s | fade up 2.00→2.27, easings.outQuint 8 fr (±0.25 s); fades to black by 6.27 | hard-cut | none |
| 3 | 6.27–8.77 | 188–263 | feature | phone bottom edge (now-playing bar, tab bar); 2-word caption types on beneath; pull-back to a track list | phone slides in from top-left 6.50→7.00 springs.heavy (overshoot not measurable); pull-out ~0.85 at 8.50 | caption letter by letter 7.27→7.77 (±0.25 s), hold, erases right to left 8.00→8.50 | hard-cut | type-click |
| 4 | 8.77–10.77 | 263–323 | feature | tilted phone on an artist profile page (red header, round portrait); 3-word caption on 2 lines to its right | near static, then zoom-through to the left screen edge 10.27→10.77, ~22 %/s, easings.inExpo | caption letter by letter 9.00→9.50 (±0.25 s), hold to 10.27, carried into the zoom | zoom-through | whoosh |
| 5 | 10.77–14.27 | 323–428 | feature | four-line stacked statement, extended heavy caps, last line names the product and is largest | static, then at 13.77 the stack tips onto a receding plane and scrolls up (~380 px/s @1920) | lines type on in ~0.25 s each at 11.00, 11.77, 12.27, 12.77 (±0.25 s), enter blurred and sharpen ~8 fr; exit easings.inExpo ~15 fr | hard-cut | type-click |
| 6 | 14.27–16.23 | 428–487 | feature | 2-line availability caption, 4 words, flies to centre from top-right | static | black 14.27–14.50; fly-in 14.77→15.27 springs.ui (overshoot not measurable); hold; blurs and dims last ~6 fr (±0.25 s) | hard-cut | none |
| 7 | 16.23–20.00 | 487–600 | feature | angled close across the desktop app home screen: section titles, square tiles, colour bars | tilt-plane drift left/up 1.5–2 px/fr @1920, push-in 1.2–2 %/s | no element motion; dims to black 19.50→20.00 easings.inOutSine 15 fr (±0.25 s) | hard-cut | none |
| 8 | 20.00–21.77 | 600–653 | tension | black hold, 53 fr | static | none | hard-cut | none |
| 9 | 21.77–24.77 | 653–743 | feature | full desktop screen rises from the bottom, fills frame, pulls out to a front-on laptop | rise ~500 px/s 21.77→22.00, push-in ~1.3 at 22.27, pull-out 22.50→23.00 springs.cameraOut; hold; at 24.77 laptop tilts forward | bezel and keyboard fade up with the pull-out ~15 fr (±0.25 s) | hard-cut | swell |
| 10 | 24.77–28.27 | 743–848 | feature | low-angle close of the lower screen (category bars, player bar) and dark keyboard | black cell at 25.00, then push-in 2–6 %/s with slight left drift, easings.linear | fade up 25.00→25.27 (±0.25 s); fade to black 27.77→28.27 | hard-cut | none |
| 11 | 28.27–30.03 | 848–901 | logo | brand mark + wordmark centred on black | static | fade in 28.27→28.50 easings.outQuint 8 fr (±0.25 s); hold; fade out 29.50→30.00 | hard-cut | swell |

Evidence per row: 1 `sheet-01 cells 0–7`; 2 `sheet-01 cells 7–15`, `sheet-02 cells 0–9`; 3 `sheet-02 cells 9–15`, `sheet-03 cells 0–3`; 4 `sheet-03 cells 3–11`, `keyframes/kf-010.50.jpg`; 5 `sheet-03 cells 11–15`, `sheet-04 cells 0–8`; 6 `sheet-04 cells 9–15`, `sheet-05 cell 0`; 7 `sheet-05 cells 1–15`, `cuts/cut-016.23.jpg`; 8 `sheet-06 cells 0–6`; 9 `sheet-06 cells 7–15`, `sheet-07 cells 0–3`, `keyframes/kf-022.50.jpg`; 10 `sheet-07 cells 4–15`, `sheet-08 cell 0`; 11 `sheet-08 cells 1–8`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 2–4 | craft/03-camera-and-staging.md, PhoneFrame |
| device-laptop | 7, 9, 10 | LaptopFrame, LaptopReveal |
| tilt-plane | 2, 3, 4, 7 | craft/03-camera-and-staging.md, TiltPlane |
| push-in | 7, 9, 10 | craft/03-camera-and-staging.md#drift-and-push-in |
| pull-out | 3, 9 | craft/03-camera-and-staging.md |
| zoom-through | 4 | craft/09-transitions.md, ZoomThrough |
| kinetic-depth | 5 | craft/05-typography.md, DepthPhrase |
| hard-cut | all | craft/09-transitions.md |
| vignette | 2–10 | look, Vignette |

## Look
Palette: #000000 background, #15AA4A accent green (captions, marks), #118E3D green shade on receding type, #A11D0F profile-page red, #3B363C UI grey, #94938B light UI grey. Type: captions bold rounded grotesk, sentence case, 7–9 % H, set on the device plane; stack extended heavy caps, 7 % H rising to 10 % H. Treatment: vignette. Background: flat black between every shot.

## What to adapt
- Copy: opener 1 word; 2 captions of 2–3 words (the feature each phone shot shows); stack 4 lines of 1–2 words ending on the product name; availability caption ~4 words on 2 lines.
- Brand: the accent colour carries every caption and both lockups; the mark appears at 0.27 and 28.27.
- Timing: rows 2, 7 and 10 (pure device holds) can stretch; caption type-on (~0.5 s), the black hold (53 fr) and the logo row keep their frame counts.

## Pitfalls
- Transitions are fades through black, not cuts: only one real cut (16.23). Keep 6–15 fr fades or the film reads choppy.
- Captions sit on the same tilted plane as the device; flat captions over a tilted phone look pasted on.
- Footage is very dark (L < 0.2); lift the UI screenshots slightly or they vanish under the vignette.

## Missing components
- LetterTypeOn: letters appear one by one without caret, ~1 letter per 1.5 fr, optional on a TiltPlane, reverse erase (techniques: proposed letter-type-on)

## Proposed terms
- letter-type-on: caption text appearing letter by letter with no caret or cursor, often erased in reverse (rows 3, 4, 5)
- mark-slide-lockup: icon wipes in, then the word slides out from behind it to form the lockup (row 1)

## Measurement notes
Resolution: 0.25 s from sheets; pan/zoom rates from motion.json (per second). Not measurable: overshoot of any spring, exact letter rate, exact fade lengths. No audio in the reference: SFX planned by the glue rule, not measured. cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id tilted-phone-laptop-caption-tour · family launch-film · 30.03 s, 11 rows (1 hard cut, other boundaries are visible state changes and black-through fades)
techniques: 9 (incl. hard-cut, vignette) · cut_on_beat: n/a (silent, 0 beats)
not measurable: spring overshoot, letter rate, fade lengths below 0.25 s
proposed terms: letter-type-on, mark-slide-lockup · missing components: LetterTypeOn
phase B: not run
