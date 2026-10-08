# Low-angle laptop editor tour with agent-made edits

A laptop shot from keyboard level shows a motion editor flipping through sample scenes on every cut, then the camera dives into the UI to watch prompts, retyped labels, icon picks and an export dialog play out under VO.

Source: https://www.raylight.app/templates/aMS0jqXc (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- a vertical 45-60 s explainer for a creative tool or editor
- showing an AI agent or integration driving a real app UI
- a social cut where VO carries the story and the UI proves it
- products with many sample outputs to flip through in the hook
Not for: products with no UI to show, or films under 20 s (the tour needs time for each edit to read).

## Format
9:16 · 53.12 s · 30 fps · dark · music 124.8 BPM, cut_on_beat 3/11 = 0.27 (false) · VO yes, 143 words, ~2.8 words/s

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.63 | 0-49 | hook | laptop seen from keyboard level at a low 3/4 angle under a blue gradient sky; editor on screen: style chip column left, preview canvas, neon timeline tracks | drift scale 1.00->1.013 over 49 fr, pan 47 px/s right (@1920) | chip column rolls up one step at 0.27-0.50 (springs.ui, overshoot not measurable); preview swaps at ~0.67 (±0.25 s) | hard-cut | hit |
| 2 | 1.63-5.50 | 49-165 | feature | montage: 4 cuts, avg 0.97 s; same laptop framing, the preview canvas swaps to a new sample scene and the chip column rolls one step per cut | drift scale +0.6-1.0 %/s, pan 21-41 px/s right, continuous across the cuts | the cut is the change: chrome stays fixed, only canvas content and the active chip change; chip roll springs.ui ~8 fr (±0.25 s) | hard-cut | hit |
| 3 | 5.50-7.27 | 165-218 | feature | dark sample scene on the canvas, then the canvas clears to a short 2-word line centred on black | drift scale 1.00->1.016, pan 43-53 px/s right | canvas content cuts to the line at 6.50 (one cell); line holds 23 fr | hard-cut | VO |
| 4 | 7.27-10.27 | 218-308 | feature | camera snaps into a prompt pill on the canvas, a 4-word line is typed with a caret, camera pulls back, the pill melts away leaving the line | zoom-tier full->detail at 7.27 (one cell), back to region at 8.27; drift 0.9 %/s after | typewriter ~2 chars per 0.25 s cell; pill border and plus icon fade 9.00-9.50 (easings.outQuint ~15 fr, ±0.25 s) | blur-dissolve | type-click |
| 5 | 10.27-11.50 | 308-345 | logo | the line dissolves into the brand mark, drawn on as a stroke in the centre of the canvas | drift 0.8 %/s, pan 53 px/s right | mark stroke draws 10.27-10.77 (~15 fr, easings.outExpo, ±0.25 s), holds 22 fr | zoom-through | swell |
| 6 | 11.50-15.70 | 345-471 | feature | a page of 4 integration cards on black with a diagonal blue light streak, laid on a tilted plane; camera glides over the cards then pulls back | zoom-through arrival at 11.50 with motion blur; dolly -695 px/s then +645 px/s; pull-out 1.00->0.55 at 14.77-15.00 | tilt-plane yaw changes with the dolly (easings.inOutSine ~30 fr, ±0.25 s); motion blur on the fast legs | hard-cut | whoosh |
| 7 | 15.70-19.37 | 471-581 | feature | light-theme sound-effects panel, heavily defocused, pink glow around the card, list of 3 generated sounds | drift up 306 px/s at 17.00-17.75, zoom -10.6 %/s; else near static | slow float, easings.inOutSine ~22 fr (±0.25 s); no element entrances | hard-cut | VO |
| 8 | 19.37-20.37 | 581-611 | feature | black frame with the editor as a small window in the centre, scene with 3D cubes on the canvas | push-in 1.00->~1.9 over 30 fr (zoom-tier full->region), springs.cameraIn (overshoot not measurable) | window grows from 30 % to ~100 % of frame width by 20.27 | hard-cut | whoosh |
| 9 | 20.37-21.30 | 611-639 | feature | editor close-up: style chips and a dim sample scene, a working spinner chip on the canvas | drift pan 46 px/s, zoom 5 %/s | chip column rolls one step at 21.27 (springs.ui, ±0.25 s) | hard-cut | hit |
| 10 | 21.30-22.30 | 639-669 | feature | canvas shows a magazine-cover grid, then a yellow title card | drift scale 1.00->1.01 | canvas content swaps at 21.77 (one cell) | hard-cut | hit |
| 11 | 22.30-24.00 | 669-720 | feature | dark scene with glass cubes and an orange glow; camera pulls back to the whole editor window | pull-out 1.00->0.60 at 22.30-22.77 (springs.cameraOut, ±0.25 s), then hold | layer list and inspector appear at the frame edges as the camera backs off | hard-cut | VO |
| 12 | 24.00-28.00 | 720-840 | feature | close-up of the chip column: one chip label is selected, deleted and retyped as a new word, then its icon swaps | zoom-tier full->element at 24.00-24.27; static hold 24.27-27.50; small re-frame at 27.77 | selection box 24.27; text highlight 25.27; retype 26.00-26.50 (~2 chars per cell); icon handles 27.50 | hard-cut | type-click |
| 13 | 28.00-29.27 | 840-878 | feature | camera slides right onto the inspector panel next to the canvas | dolly right ~600 px over 8 fr at 28.00-28.27 (easings.outExpo, ±0.25 s), then hold | panel fields settle with the move; no element entrances | hard-cut | swoosh-short |
| 14 | 29.27-32.77 | 878-983 | feature | an icon picker grid opens over the canvas; a pointer hovers across icons and picks one | drift right 255 px/s at 29.00-29.77, then near static | picker pops in at 29.27 (springs.ui, overshoot not measurable); cursor moves every ~8 fr, click at ~31.77 | hard-cut | ui-confirm |
| 15 | 32.77-35.00 | 983-1050 | feature | the editor window pulls back with a layer list on the left; the edited chip shows its new icon | pull-out to full window at 32.50-32.77 (springs.cameraOut), then zoom 6.6-11.9 %/s push | layer row selections step down the list every ~0.5 s | hard-cut | tick |
| 16 | 35.00-39.27 | 1050-1178 | feature | canvas becomes a warm orange cloud scene with the brand mark; a 2-word product label types in beside the mark and the mark exits | push-in 1.00->1.30 at 35.00-35.27 (springs.cameraIn), then hold | label typewriter 38.00-38.27, mark slides out 38.27-38.50, label fades 38.77-39.00 (easings.outQuint, ±0.25 s) | whip-pan | type-click |
| 17 | 39.27-40.77 | 1178-1223 | feature | share/render panel opens on the right: project fields, a list of cloud renders, an agents promo box | whip-pan in at 39.27 with motion blur, holds 39.50-40.00; whip out at 40.27 | list rows appear at 39.77 (one cell); pointer clicks the export button at ~40.00 | whip-pan | whoosh |
| 18 | 40.77-46.97 | 1223-1409 | feature | export dialog over a defocused cloud backdrop; pointer steps through resolution, compression and format options | push-in 1.00->1.35 at 41.50-41.77, pull-out at 42.77-43.27 (springs.cameraIn / cameraOut), else static | option pills toggle on clicks every ~0.5-0.75 s; panel body swaps to GIF settings at 45.77 | hard-cut | ui-confirm |
| 19 | 46.97-49.27 | 1409-1478 | logo | black frame, a 3-word credit line naming the tool fades in at the centre | static | line fades in 46.97-47.50 (~15 fr, easings.outQuint, ±0.25 s), holds 52 fr | hard-cut | VO |
| 20 | 49.27-53.12 | 1478-1594 | cta | the credit line is replaced by the domain, typed letter by letter, then holds to the end | static | typewriter ~3 chars per 0.25 s cell, 49.27-50.27, holds 85 fr | hard-cut | type-click |

Evidence per row:
- row 1: sheet-01 cells 0-6
- row 2: sheet-01 cells 7-15, sheet-02 cells 0-5; cuts/cut-001.63, 002.60, 003.57, 004.53
- row 3: sheet-02 cells 6-12; cuts/cut-005.50
- row 4: sheet-02 cells 13-15, sheet-03 cells 0-9
- row 5: sheet-03 cells 9-13
- row 6: sheet-03 cells 14-15, sheet-04 cells 0-14
- row 7: sheet-04 cell 15, sheet-05 cells 0-9; cuts/cut-015.70
- row 8: sheet-05 cells 10-15, sheet-06 cells 0-1; cuts/cut-019.37
- row 9: sheet-06 cells 2-5; cuts/cut-020.37
- row 10: sheet-06 cells 6-9; cuts/cut-021.30
- row 11: sheet-06 cells 10-15; cuts/cut-022.30
- row 12: sheet-07 cells 0-15
- row 13: sheet-08 cells 0-4
- row 14: sheet-08 cells 5-15, sheet-09 cells 0-2
- row 15: sheet-09 cells 3-11
- row 16: sheet-09 cells 12-15, sheet-10 cells 0-12
- row 17: sheet-10 cells 13-15, sheet-11 cells 0-2
- row 18: sheet-11 cells 3-15, sheet-12 cells 0-11
- row 19: sheet-12 cells 12-15, sheet-13 cells 0-4; cuts/cut-046.97
- row 20: sheet-13 cells 5-15, sheet-14 cells 0-4

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1-5 | craft/03-camera-and-staging.md |
| stacked-roll | 1, 2, 9 | craft/05-typography.md |
| prompt-typing | 4 | craft/13-ui-recreation.md |
| typewriter | 4, 12, 16, 20 | craft/05-typography.md |
| logo-from-dot | 5 | craft/04-motion.md |
| zoom-through | 5-6 | craft/09-transitions.md |
| tilt-plane | 6 | craft/03-camera-and-staging.md |
| dolly | 6, 13 | craft/03-camera-and-staging.md |
| pull-out | 6, 11, 15, 18 | craft/03-camera-and-staging.md |
| push-in | 8, 16, 18 | craft/03-camera-and-staging.md |
| zoom-tier | 4, 8, 12 | craft/03-camera-and-staging.md |
| whip-pan | 16-17 | craft/09-transitions.md |
| cursor-path | 14, 17, 18 | craft/13-ui-recreation.md |
| ui-rebuild | 1-18 | craft/13-ui-recreation.md |
| blur-dissolve | 4 | craft/09-transitions.md |
| end-card | 19-20 | craft/01-story.md |
| hard-cut | all | craft/02-rhythm-and-sound.md |
| glow | 1-5 (timeline neon, sky), 7 | craft/06-look.md |
| motion-blur | 6, 17 | craft/06-look.md |

## Look
Palette: #0C0C0E background (editor, black frames), #DDC3BC warm light text/highlight, #1B30C4 accent (sky gradient behind the laptop), #EEAF3A warm sample-card yellow, #855A50 orange glow of the dark sample scenes, #403EAF secondary violet. Type: UI sans (system grotesk), sentence case, normal tracking; canvas lines medium weight ~3 % H; end lines regular ~2.5 % H, centred white on black. Treatment: glow (neon timeline tracks, sky gradient bleed on the lid), motion-blur on the zoom-through and whip-pans. Background: blue-to-violet gradient sky over a defocused keyboard in rows 1-5, then flat black around the UI, then black for the close.

## What to adapt
- Copy: 1 two-word canvas line, 1 prompt of 4-6 words, 1 two-word product label, 1 three-word credit line, the URL. VO about 19 lines of 4-9 words; every UI moment illustrates the line playing over it.
- Brand: accent carries the sky gradient and the active chip; logo appears in row 5 (stroke draw) and row 16 (on the warm scene); URL closes the film.
- Timing: the hook montage keeps ~29 fr per sample (5 cuts) and must keep its cadence; UI rows 6-18 stretch to the VO line lengths; the close keeps ~70 fr credit + ~115 fr URL.

## Pitfalls
- The laptop framing must not move between the hook cuts: only the canvas content changes, otherwise the montage reads as random shots.
- The camera never fully stops in rows 1-11 (drift 0.6-1.0 %/s plus a slow right pan); static holds start only in the close-up edit rows.
- Very defocused panels (row 7) still need legible structure; blur the edges, keep the list rows readable.
- Cuts are on VO phrases, not on the beat (3/11 within ±2 fr): do not snap them to the music grid.

## Missing components
- KeyboardLevelLaptop: LaptopFrame posed at a low elevation (camera ~5° above the keys, screen top cropped by a gradient sky), keyboard in deep defocus, slow 0.8 %/s push plus 40-50 px/s pan (techniques: device-laptop)
- MarkStrokeDraw: brand mark drawn as a single stroke from one end in ~15 fr, outExpo (techniques: logo-from-dot)

## Proposed terms
- preview-swap: framing and chrome fixed while only the preview content changes on each cut, rows 1-2 and 10 (not in craft/vocabulary.md; not used in recipe.json)
- mark-stroke-draw: logo drawn on as a stroke, row 5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Cuts 2.60, 3.57, 4.53 sit inside row 2: 23 rows were merged to 20 by measure.md §4.4 (same beat, same technique). Not measurable: entrance frame counts under 8 fr, spring overshoot, cursor path curvature, exact typing cadence. Camera rates from motion.json per second. SFX planned by the glue rule, not measured. cut_on_beat = 3/11 cuts within ±2 fr (4.53, 5.50, 15.70). Energy medium: 0.21 cuts/s, bpm under 130, last third not denser than the first.

## Study log
id low-angle-laptop-editor-tour · family social-promo · 53.12 s, 20 rows (11 hard cuts; long shots 5.50-15.70 and 22.30-46.97 split at state changes)
techniques 19 (incl. hard-cut, glow, motion-blur) · cut_on_beat false (3/11)
not measurable: sub-0.25 s entrances, overshoot, typing cadence (±0.25 s)
proposed terms: preview-swap, mark-stroke-draw
missing components: KeyboardLevelLaptop, MarkStrokeDraw
phase B: not run
