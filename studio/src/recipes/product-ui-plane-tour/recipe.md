# Tilted UI plane feature tour

A dark product interface travels past the camera in six capability stops, cuts to a resource grid, then resolves into a glowing mark, short promise, and typed URL.

Source: https://www.raylight.app/templates/4tL1d6mA (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A multi-screen product needs a compact capability tour.
- The interface can be rebuilt as one continuous spatial canvas.
- A silent launch cut needs readable UI and a clear closing URL.
Not for: products with only one useful screen or interfaces that cannot remain legible under perspective.

## Format
16:9 · 28.20 s · 30 fps · dark · music none, cut_on_beat 0/2 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-4.27 | 0-128 | hook | dark landing UI; two-clause promise, two actions, floating result card | tilt-plane; dolly right ~94 px/s @1920; push-in 1.00->1.10 | plane appears by easings.outExpo ~8 fr (±0.25 s); camera easings.inOutSine 128 fr | slide-push | whoosh planned |
| 2 | 4.27-7.00 | 128-210 | feature | single-column sign-in panel with provider, credential, recovery, and action controls | tilt-plane; vertical dolly ~39 px/s @1920; scale nearly constant | shared plane moves on easings.inOutSine 82 fr; no separate entrance visible | slide-push | whoosh planned |
| 3 | 7.00-9.00 | 210-270 | feature | upload workspace with status line, drop zone, file formats, and browse action | tilt-plane; lateral dolly ~118 px/s @1920 | shared plane moves on easings.inOutSine 60 fr; focus remains on drop zone | slide-push | whoosh planned |
| 4 | 9.00-11.77 | 270-353 | feature | generated summary view with navigation, content panel, and two-choice check | tilt-plane; diagonal travel; push-in to ~1.10 | easings.inOutSine 83 fr; fast middle move carries motion-blur | slide-push | whoosh planned |
| 5 | 11.77-15.00 | 353-450 | feature | quiz state with question, progress controls, and stacked answers | tilt-plane; diagonal dolly ~420 px/s @1920; pull-out ~1.10->1.00 | easings.inOutSine 97 fr; motion-blur on fastest travel | slide-push | whoosh planned |
| 6 | 15.00-18.80 | 450-564 | feature | flashcard state with numbered progress, controls, large card, and reveal action | tilt-plane; lateral dolly ~78 px/s @1920; push-in 1.00->1.02 | continuous easings.linear travel 114 fr; UI stays assembled | hard-cut | hit planned |
| 7 | 18.80-22.13 | 564-664 | feature | tilted grid of four external learning-resource cards | tilt-plane; pull-out ~1.00->0.98 | grid holds; easings.inOutSine 100 fr; no separate entrance visible | blur-dissolve | reverse-cymbal planned |
| 8 | 22.13-22.43 | 664-673 | feature | resource grid darkens and blurs into an empty black stage | tilt-plane; pull-out continues through overlap | 9 fr blur-dissolve on easings.inOutSine; blur radius not measurable | blur-dissolve | reverse-cymbal planned |
| 9 | 22.43-25.27 | 673-758 | logo | small mark appears on black, brightens, grows, and travels right | push-in ~1.00->1.02 | light-on ~14 fr, halo +5 fr (both ±0.25 s); easings.inOutSine travel 85 fr | mask-wipe | swell planned |
| 10 | 25.27-26.00 | 758-780 | logo | four-word brand promise left of the dimmed mark | push-in 1.00->1.01 | line completes left-to-right ~8 fr with easings.outExpo (±0.25 s); mark dims ~8 fr | blur-dissolve | shimmer planned |
| 11 | 26.00-28.20 | 780-846 | cta | centred URL types on black, then holds under a soft halo | push-in 1.00->1.01 | typewriter ~1 fr per character through 26.77 s (±0.25 s); easings.linear push; 43 fr hold | hard-cut | type-click planned |

Evidence per row: row 1 `sheet-01 cells 0-15`, `sheet-02 cells 0-1`; row 2 `sheet-02 cells 1-12`; row 3 `sheet-02 cells 12-15`, `sheet-03 cells 0-4`; row 4 `sheet-03 cells 4-15`; row 5 `sheet-03 cell 15`, `sheet-04 cells 0-12`; row 6 `sheet-04 cells 12-15`, `sheet-05 cells 0-11`, `cuts/cut-018.80.jpg` before; row 7 `sheet-05 cells 12-15`, `sheet-06 cells 0-8`, both cut images; row 8 `sheet-06 cells 8-10`, `cuts/cut-022.13.jpg`; row 9 `sheet-06 cells 10-15`, `sheet-07 cells 0-5`; row 10 `sheet-07 cells 5-8`; row 11 `sheet-07 cells 8-15`, `sheet-08 cell 0`.

## Techniques -> craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1-8 | `craft/03-camera-and-staging.md#framing-the-product`, `craft/families/screen.md#numbers` |
| dolly | 1-6 | `craft/03-camera-and-staging.md#readability-under-the-camera`, `craft/04-motion.md#easings` |
| push-in | 1, 4, 6, 8-10 | `craft/03-camera-and-staging.md#drift-and-push-in` |
| ui-rebuild | 1-8 | `craft/13-ui-recreation.md#rebuild-from-screenshots` |
| slide-push | 1-5 | `craft/09-transitions.md#slide-push` |
| hard-cut | 6, 11 | `craft/09-transitions.md#hard-cut` |
| blur-dissolve | 7-8, 10 | `craft/09-transitions.md#blur-dissolve` |
| mask-wipe | 9 | `craft/09-transitions.md#mask-wipe` |
| light-on | 9 | `craft/06-look.md#depth-and-material`, `craft/families/brandmark.md#choreography` |
| end-card | 9-11 | `craft/families/brandmark.md#choreography`, `craft/04-motion.md#durations` |
| typewriter | 11 | `craft/05-typography.md#table-of-the-rest` |
| glow | 9-11 | `craft/06-look.md#treatments` |
| motion-blur | 4-5 | `craft/04-motion.md#entrances-and-exits` |

## Look
Palette: background `#0C0D0E`, foreground `#CFD3DC`, blue accent `#506CA9`, red accent `#A45247`, muted text `#878581`, blue-black surface `#2E374B`. Type: bold rounded grotesk for the opening at 8-10 % of frame height; compact sans UI at 2-4 %; medium grotesk close at 5 %. Treatment: `glow`, `motion-blur`. Background: black stage around a dark tilted UI plane, then flat black for the close.

## What to adapt
- Copy: one opening promise of 6-8 words, functional labels inside six UI states, four resource cards, one four-word closing promise, and a short URL.
- Brand: reserve the brightest accent for primary actions and the mark; keep surfaces within roughly 12 luminance points of black.
- Timing: keep the 18.80 s hard cut, the 22.13-22.43 s soft transition, and the 43 fr URL hold; stretch camera rows only if UI text needs more reading time.

## Pitfalls
- A separate screen per row breaks the spatial continuity; all six interface states need to share one large plane.
- Perspective cannot reduce functional UI text below about 2 % of frame height at a camera stop.
- The 97 fr diagonal move is the speed peak; removing its motion blur exposes the planar jump.
- Do not add copy over the UI tour: the screens already carry the feature narrative.

## Missing components
None. Phase B adds local `TiltPlane` and `LearningResourceGrid` components in this recipe folder; a curator may promote them later.

## Proposed terms
- `continuous-plane-tour`: multiple product screens arranged on one oversized UI surface, revealed by uninterrupted camera travel rather than scene cuts; rows 1-6 (not in `craft/vocabulary.md`; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; cut timing from `cuts.json`; camera rates from `motion.json`; type and UI detail checked in full-resolution keyframes. Palette came from the prescribed palettegen command on keyframes at 0.50, 15.50, and 19.50 s because the cut images are before/after composites. Not measurable: sub-0.25 s entrance duration, spring overshoot, exact motion-blur shutter, and exact easing curves. SFX planned by the glue rule, not measured. cut_on_beat = 0/2 transitions within ±2 fr because the reference is silent and has no beats.

## Phase A study log
id: product-ui-plane-tour
family: product-ui
duration: 28.20 s at 30 fps; 11 contiguous rows
techniques: 13 vocabulary ids
cut_on_beat: false, 0/2; reference audio is silent
resolution limits: sub-0.25 s motion, overshoot, blur shutter, and exact easing not measurable
proposed terms: continuous-plane-tour
missing components: MultiStopPlaneTour, LearningResourceGrid
phase A: studied; offline schema and vocabulary validation passed

## Build comparison

Two iterations were compared at 4 fps. Timings come directly from `structure[]`, so every authored boundary lands on the studied frame. Iteration 1 had a smaller, flatter flashcard, abstract resource thumbnails, and an undersized URL. Iteration 2 increased plane depth and flashcard scale, replaced placeholder bars and thumbnails with labelled metrics and charts, and enlarged the URL.

| Row | Reference t0-t1 | Ours t0-t1 | Delta boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---:|---|---|---|
| 1 | 0.00-4.27 | 0.00-4.27 | 0 | dark tilted landing UI; hero and result card fill the same frame regions | lateral dolly + push-in, `outExpo` reveal | moved hero inset inward to avoid excessive crop |
| 2 | 4.27-7.00 | 4.27-7.00 | 0 | centred sign-in panel with stacked controls | vertical-feeling slide-push on the tilted stage | none after iteration 2 |
| 3 | 7.00-9.00 | 7.00-9.00 | 0 | plane fills the frame; upload action remains central and readable | opposing lateral slide-push, steady stop | replaced grey bars with labelled signal rows |
| 4 | 9.00-11.77 | 9.00-11.77 | 0 | wide summary panel, tabs and measured signals | diagonal slide-push + push-in | increased plane tilt from 3.5/5 deg to 5.5/7 deg |
| 5 | 11.77-15.00 | 11.77-15.00 | 0 | question panel and stacked choices fill the upper half | fastest opposing dolly, eased arrival | increased plane tilt |
| 6 | 15.00-18.80 | 15.00-18.80 | 0 | progress strip, controls and enlarged study card | linear lateral drift | card 960x390 -> 1220x470; camera scale +0.08 |
| 7 | 18.80-22.13 | 18.80-22.13 | 0 | four-card grid fills the frame with readable titles, metrics and charts | slow pull / vertical drift | replaced abstract square art with plausible analytics thumbnails |
| 8 | 22.13-22.43 | 22.13-22.43 | 0 | resource grid darkens to the intentional black stage | 9 fr blur-dissolve | none after iteration 2 |
| 9 | 22.43-25.27 | 22.43-25.27 | 0 | small glowing mark on a dark stage | light-on, grow and rightward travel | none after iteration 2 |
| 10 | 25.27-26.00 | 25.27-26.00 | 0 | short promise left of dimmed mark | 8 fr left-to-right mask reveal | none after iteration 2 |
| 11 | 26.00-28.20 | 26.00-28.20 | 0 | centred typed domain with halo | linear typewriter then hold | URL 5.2% -> 6.4% of frame height |

Final side-by-side review (`compare.jpg`, top = reference, bottom = ours):

| Column / t | Subject scale ours vs ref | Empty stage? | Placeholder content? | Camera / depth match? | Look match? | Fix / result |
|---|---|---|---|---|---|---|
| 1 / 1.76 | equal plane coverage; ours headline slightly larger | no | no | same rightward dolly and tilted plane | dark UI, blue accent, soft shadows match | hero inset fixed |
| 2 / 5.29 | equal sign-in panel height | no | no | same isolated panel stop; ours has slightly stronger tilt | dark panel and blue action match | pass |
| 3 / 8.81 | equal plane coverage; ours central action is more compact | no | no, labels and file formats are readable | same lateral plane and angle class | dark low-contrast UI match | signal rows now contain real values |
| 4 / 12.34 | equal two-column footprint | no | no | diagonal tilted plane matches | orange/blue role maps to brand tokens | pass after tilt increase |
| 5 / 15.86 | equal card width after iteration 2 | no | no | same linear drift and deep tilt | dark card with restrained accent matches | enlarged card and camera scale |
| 6 / 19.39 | equal full-frame four-card grid | no | no, each thumbnail has labels, bars and metrics | same tilted grid and slow pull | branded charts replace non-reusable imagery | fixed in iteration 2 |
| 7 / 22.91 | ours mark is slightly larger | intentional black logo beat | no | rightward mark travel and push-in match | blue glow on near-black matches | pass |
| 8 / 26.44 | equal after URL enlargement | intentional dark CTA stage | no | subtle push-in match | white halo on near-black matches | fixed in iteration 2 |

Final `detail_ratio`: `0.819`; `empty_frames`: `[]`; comparison verdict: `ok`.

Remaining differences: Tallyfield supplies blue/orange tokens in place of the source palette details; the resource cards use original analytics charts because source imagery is not reusable; the six UI stops are recipe-owned states on one consistent perspective stage. Theme, palette roles, type weight/case, camera directions, transitions, and all boundaries match.

## Study log
phase B: built in 2 comparison iterations
gate: 11 rows vs 11 reference rows; every boundary delta 0 fr at 30 fps
gate: dark theme and palette roles match; Tallyfield supplies the demo-specific accent colours
gate: half-scale render 28.20 s; 8 timestamped sheets generated at 4 fps
gate: side-by-side detail_ratio 0.819; empty_frames []
gate: composition 1920x1080, 30 fps, 846 frames
gate: validator printed `valid`; TypeScript and composition discovery passed
gate: final default and private renders are 28.20 s (duration ratio 1.000)
gate: frame 0 posters checked visually; both show the tilted UI and are not black
local components: TiltPlane, recipe-owned UI states, LearningResourceGrid, ResourceVisual, DarkStage
remaining differences: original analytics charts replace source imagery; no source copy, logos, images, or footage used
