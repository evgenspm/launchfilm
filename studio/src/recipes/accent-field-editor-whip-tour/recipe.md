# Vertical editor tour on an accent field with whip moves

A desktop editor is shown in a 9:16 frame as a dark window band on a saturated accent field; the camera never rests, pushing into panels, whipping between features with motion blur, then a typed brand line and URL close on black.

Source: https://www.raylight.app/templates/PEXaPq8a (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A desktop or web tool needs a vertical promo for short-form vertical feeds without re-laying out its UI for portrait.
- The product story is a click path: browse, pick, edit, prompt, see the result, export.
- Silent autoplay feeds: the UI and the typed prompts carry the message, no VO needed.
- You have a screen recording or a rebuilt UI for 8-10 surfaces.
Not for: products with one hero screen (the tour needs many surfaces), or mobile-first apps (use a phone-first recipe).

## Format
9:16 · 53.6 s · 30 fps · mixed (accent field + dark UI, black end card) · music none (silent reference), cut_on_beat n/a (0/2, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.30 | 0–99 | hook | low-angle laptop close-up in the dark: editor canvas with a blurred phone render, lit timeline tracks, keyboard soft in front | drift: lateral orbit ~100 px/s @1920, scale +1.4 to +5 %/s, slight roll | camera only, easings.inOutSine 99 fr; playhead creeps | hard-cut | none |
| 2 | 3.30–6.00 | 99–180 | reveal | dark gallery window as a horizontal band on the accent field; featured card's word column rolls through 6 one-word categories | push-in 1.00→~1.45 on the featured card 4.00–4.77, then hold | springs.cameraIn ~23 fr (overshoot not measurable); words roll 5.00–5.75, ~4 fr per word (±0.25 s) | dolly | none |
| 3 | 6.00–9.03 | 180–271 | feature | lateral travel across gallery rows, three template cards pass, window shrinks back to the grid | dolly left 170–280 px/s @1920, up to ~920 px/s at s7, then pull-out ~-10 %/s | dolly easings.inOutSine 54 fr with motion blur; pull-out springs.cameraOut ~30 fr (±0.25 s) | whip-pan | whoosh |
| 4 | 9.03–10.50 | 271–315 | feature | whole gallery window small in the field, then it whips off right | pull-out to establishing (~90 % W), whip right ~1145 px/s @1920 at 10.27 | springs.cameraOut ~15 fr; whip easings.inExpo ~8 fr, motion blur (±0.25 s) | whip-pan | whoosh |
| 5 | 10.50–12.75 | 315–382 | feature | template detail page: big tilted phone-screen preview, details column, action button top right | lands from the whip, drift ~1 %/s | landing springs.ui ~10 fr (overshoot not measurable); hold 1.75 s | push-in | none |
| 6 | 12.75–14.40 | 382–432 | feature | close on preview and action button; cursor clicks, button shows a loading state, preview swaps to a tilted phone edge | push-in ~1.00→1.8 toward the button, cursor-follow | springs.cameraIn ~12 fr; click 13.00 springs.click; loading label 13.77 (±0.25 s) | blur-dissolve | ui-confirm |
| 7 | 14.40–16.75 | 432–502 | feature | editor canvas: phone on a dark navy stage, toolbar and timeline below; selection handles at 16.50 | push-in 1.00→~1.12 | easings.inOutSine 70 fr; handles cut in (±0.25 s) | whip-pan | whoosh |
| 8 | 16.75–18.75 | 502–562 | feature | properties panel next to the stage; cursor presses the image-source button | zoom-tier element, static 17.00–18.00, then pull back with blur | cursor-path springs.ui ~15 fr; press 18.00 springs.click; panel blurs 18.27–18.75 easings.inExpo ~12 fr | pull-out | ui-confirm |
| 9 | 18.75–21.50 | 562–645 | feature | file picker over the canvas, closes; phone screen swaps to a long message screen; camera closes on the phone | pull-out to region, then push-in 1.00→~1.6 on the phone 20.00–21.27 | picker fades 19.00–19.27 (~8 fr); content swap 19.77; springs.cameraIn ~30 fr | tilt-plane | none |
| 10 | 21.50–22.50 | 645–675 | feature | macro on a tilted phone screen: row of four labelled shortcuts at a steep angle, shallow focus | tilt-plane rotateX ~25°, rotateZ ~-12°, drift ~2 %/s | easings.inOutSine 30 fr; blur falloff top and bottom | rack-focus | none |
| 11 | 22.50–25.33 | 675–760 | feature | phone comes out of the dark edge-on, turns to camera, holds full-frame on the message screen | pull-out from macro; phone yaw ~70°→0° 22.50–23.77; static to 25.03 | springs.heavy ~38 fr (no overshoot visible); hold 1.25 s | whip-pan | whoosh |
| 12 | 25.33–29.25 | 760–878 | feature | editor zooms out to the whole app, then in on an empty prompt field; a 7-word request types, cursor clicks send | pull-out to establishing 25.27–25.77, push-in 26.00–26.50 (+66 %/s), hold | typing 26.50–27.25 ~30 chars/s; cursor-path to send 28.00–28.77, springs.click | whip-pan | type-click |
| 13 | 29.25–32.62 | 878–979 | feature | tight on the field: request selected and replaced by a 5-word request typed char by char | push-in to element tier, lateral drift ~280 px/s @1920 | selection 29.50–30.00; retype 30.27–31.77 ~12 chars/s with caret; hold 0.5 s | whip-pan | type-click |
| 14 | 32.62–35.58 | 979–1067 | feature | pulled back on the canvas: field empties, request types again, then close on the send arrow and a click | pull-out to region (field ~55 % W), static, push-in to send at 34.77 | type ~20 chars/s 32.77–33.27; springs.cameraIn ~8 fr (±0.25 s); click 35.00–35.27 springs.click | whip-pan | ui-confirm |
| 15 | 35.58–39.85 | 1067–1196 | feature | generated result plays on the canvas: warm cloud footage with a centred mark; mark slides as a 2-word title appears, both fade | drift ~1 %/s, near static | mark slide + title 38.77 springs.ui ~12 fr; title fades 39.27–39.50 ~8 fr (±0.25 s) | whip-pan | whoosh |
| 16 | 39.85–41.25 | 1196–1238 | feature | side panel close-up: cursor opens the share menu, list of five renders drops; blurs away | zoom-tier element, drift ~160 px/s @1920 | menu springs.ui ~8 fr at 40.27 (±0.25 s); exit blur 40.77–41.00 easings.inExpo | blur-dissolve | ui-confirm |
| 17 | 41.25–43.50 | 1238–1305 | feature | export dialog over the blurred canvas; cursor steps through three resolution chips | push-in 1.00→~1.3 on the left column 42.00–42.50, then pull back (-23 %/s) | chip every ~0.5 s, highlight on springs.ui; springs.cameraIn ~15 fr | pull-out | tick |
| 18 | 43.50–47.53 | 1305–1426 | feature | whole export dialog: compression chips step through four options, format switches, GIF settings appear | static 44.00–46.75, slight pull-out 47.25–47.50 | chip step every ~0.5 s; GIF section swaps at 46.50 (±0.25 s) | hard-cut | tick |
| 19 | 47.53–49.75 | 1426–1492 | logo | black field, soft diagonal white light streaks; 3-word line naming the tool, centred, white | static | line present on the cut, no entrance; holds 2.0 s | hard-cut | impact-low |
| 20 | 49.75–53.60 | 1492–1608 | cta | same streak field; line replaced by the domain, typed left to right, holds to the end | static | typewriter ~12 chars 49.77–50.77 (~2.5 fr/char); hold 2.8 s | hard-cut | type-click |

Evidence per row:
1. sheet-01 cells 0–13; cuts/cut-003.30.jpg (before)
2. sheet-01 cells 14–15, sheet-02 cells 0–7; cuts/cut-003.30.jpg (after)
3. sheet-02 cells 8–15, sheet-03 cells 0–3; cuts/cut-008.80.jpg
4. sheet-03 cells 4–9; cuts/cut-008.80.jpg (after)
5. sheet-03 cells 10–15, sheet-04 cells 0–2
6. sheet-04 cells 3–9; cuts/cut-014.27.jpg (before)
7. sheet-04 cells 10–15, sheet-05 cells 0–2; cuts/cut-014.27.jpg (after), cuts/cut-016.60.jpg (before)
8. sheet-05 cells 3–10; cuts/cut-016.60.jpg (after)
9. sheet-05 cells 11–15, sheet-06 cells 0–5
10. sheet-06 cells 6–9
11. sheet-06 cells 10–15, sheet-07 cells 0–4; cuts/cut-025.07.jpg (before)
12. sheet-07 cells 5–15, sheet-08 cells 0–4; cuts/cut-025.07.jpg (after), cuts/cut-029.17.jpg (before)
13. sheet-08 cells 5–15, sheet-09 cells 0–2; cuts/cut-029.17.jpg (after), cuts/cut-032.53.jpg (before)
14. sheet-09 cells 3–13; cuts/cut-032.53.jpg (after), cuts/cut-035.27.jpg (before)
15. sheet-09 cells 14–15, sheet-10 cells 0–14; cuts/cut-035.27.jpg (after), cuts/cut-039.60.jpg (before)
16. sheet-10 cell 15, sheet-11 cells 0–4; cuts/cut-039.60.jpg (after)
17. sheet-11 cells 5–13
18. sheet-11 cells 14–15, sheet-12 cells 0–14; cuts/cut-047.53.jpg (before)
19. sheet-12 cell 15, sheet-13 cells 0–6; cuts/cut-047.53.jpg (after)
20. sheet-13 cells 7–15, sheet-14 cells 0–6

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1 | craft/03-camera-and-staging.md, presets/screen.tsx LaptopFrame |
| rack-focus | 1, 10 | craft/03-camera-and-staging.md#rack-focus |
| frame-in-frame | 2–18 (window band inside the accent field) | craft/03-camera-and-staging.md, camera.tsx FrameInFrame |
| push-in | 2, 5, 6, 7, 9, 12, 14, 17 | craft/03-camera-and-staging.md#drift-and-push-in |
| pull-out | 3, 4, 8, 9, 11, 12, 14, 17, 18 | craft/03-camera-and-staging.md |
| dolly | 2, 3 | craft/03-camera-and-staging.md, screen.tsx Dolly |
| whip-pan | 3, 4, 7, 11, 12, 13, 14, 15 | craft/09-transitions.md |
| blur-dissolve | 6, 16 | craft/09-transitions.md#blur-dissolve |
| zoom-tier | 8, 13, 16 | craft/03-camera-and-staging.md (FocusCamera) |
| cursor-follow | 6, 12, 14 | craft/03-camera-and-staging.md |
| cursor-path | 6, 8, 12, 14, 16, 17 | craft/04-motion.md, cursor.tsx |
| device-phone | 7, 9, 11 | components PhoneFrame |
| tilt-plane | 5, 10 | screen.tsx TiltPlane |
| prompt-typing | 12, 13, 14 | presets/list.tsx PromptBar |
| typewriter | 13, 20 | presets/text.tsx Typewriter |
| stacked-roll | 2 | presets/text.tsx StackedRoll |
| ui-rebuild | 2–18 | craft/03-camera-and-staging.md (UI crisp at every zoom tier) |
| screen-recording | 15 | film FootageClip |
| end-card | 19–20 | film EndCard |
| hard-cut | 1, 18, 19 | craft/09-transitions.md |
| motion-blur | 3, 4, 7, 11–16 | look |
| glow | 1 (lit timeline tracks and phone rim) | look |

## Look
Palette: `#009AFE` accent field (bg outside the window band), `#0A0B0C` UI and end-card black, `#E7EDF5` UI text / light cards, `#1B1D32` navy canvas stage, `#E7AB93` warm result footage, `#24293D` panel grey-blue. Type: product UI type only (small grotesk, sentence case); prompt text medium grotesk ~2.5 % H; end line medium grotesk, sentence case, ~3.5 % H, white on black. Treatment: motion-blur, glow. Background: flat accent field 3.30–47.53 s around a horizontal dark UI band (top and bottom ~25 % of the height each); footage-like laptop close-up in row 1; black with soft diagonal light streaks on the end card.

## What to adapt
- Copy: 2–3 prompt requests of 5–8 words (rows 12–14), 6 one-word categories for the rolling column (row 2), a 2-word result title (row 15), a 3-word end line naming the product (row 19), the domain (row 20).
- Brand: the accent colour fills the field above and below the window for 44 s, so it carries the brand; dark UI stays dark. No logo on screen except inside the result shot; the end card is text only.
- Timing: UI tour rows 5–18 can stretch or shrink by surface count (each 1.0–4.0 s); whips keep 8–16 fr; end card rows keep 66 fr + 116 fr.

## Pitfalls
- The camera never rests more than ~1 s except on the export dialog (row 18) and end card; a static UI tour in this frame reads as a slideshow.
- Whips need real motion blur; a plain slide at 1000+ px/s @1920 strobes.
- The window band is landscape UI in a portrait frame: push to element tier for anything with text, or it is unreadable on a phone.
- Typed prompts at ~30 chars/s are read as a block; keep the retype (row 13) slower (~12 chars/s) so viewers follow it.

## Missing components
- AccentBand: a landscape stage letterboxed as a horizontal band inside a 9:16 accent-coloured field, the camera moving the stage inside it (band 50 % H, field = brand accent) (techniques: frame-in-frame, ui-rebuild)
- WhipBlur: directional motion blur on a fast camera move, blur length proportional to px/fr, ≥ 600 px/s @1920 (techniques: whip-pan, motion-blur)
- StreakBackdrop: black field with 4–6 soft diagonal white light streaks at ~40°, slow or no drift (techniques: end-card)

## Proposed terms
- accent-field band: landscape UI shown as a horizontal band on a flat brand-colour field filling the rest of a vertical frame (rows 2–18) (not in craft/vocabulary.md; not used in recipe.json)
- word-column roll: a column of single words cycling beside a fixed word inside a card, ~4 fr per word (row 2) (not in craft/vocabulary.md; not used in recipe.json; tagged stacked-roll as nearest)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Camera speeds and zoom rates from motion.json per-second estimates. Not measurable: overshoot of any spring, entrance frames under 8 fr, exact whip blur length, stagger in the word roll. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/2 cuts within ±2 fr (no beats; audio.json has no music). Long shots split at state changes; soft transitions from cuts.json (8.80, 14.27, 16.60, 25.07, 29.17, 32.53, 35.27, 39.60) fall inside rows as camera moves, the row boundaries sit at the first settled cell after each. Palette from palettegen on cuts/cut-003.30, cut-025.07, cut-047.53 (+ cut-016.60, cut-039.60 for navy and warm), near-duplicates merged.

## Study log
id accent-field-editor-whip-tour · family social-promo · 53.6 s, 20 rows (2 hard cuts, 8 soft whips/zooms as row boundaries, long shots split)
techniques 22 (incl. motion-blur, glow, hard-cut) · cut_on_beat false (silent, 0/2)
not measurable: spring overshoot, sub-8 fr entrances, word-roll stagger (0.25 s resolution, no strips)
proposed terms: accent-field band, word-column roll
missing components: AccentBand, WhipBlur, StreakBackdrop
phase B: not run
