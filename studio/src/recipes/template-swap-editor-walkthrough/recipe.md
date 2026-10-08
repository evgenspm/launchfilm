# Vertical editor walkthrough: pick, swap, tilt, retype

A vertical product tour of a motion editor: a template is picked from a gallery, its phone screen is swapped, tilted and recoloured, a headline is retyped, then URL and mark close. Each step is one visible edit, paced to the VO.

Source: https://www.raylight.app/templates/fEBKQAIB (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A creative tool, editor or template product shown end to end in one vertical clip
- The edit itself is the payoff: pick a template, swap an image, retype a word
- VO-led tutorial where each sentence maps to one UI action
Not for: products with no visible editing step, or silent feeds (the story leans on VO)

## Format
9:16 · 45.44 s · 30 fps · dark (blue-to-black gradient backdrop behind dark UI) · music 161.4 BPM, cut_on_beat 2/7 · VO yes, about 108 words over 40 s (2.7 words/s), 13 sentences, ends at 40.29

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-2.97 | 0-89 | hook | dark laptop on a desk, editor open; a green-screen phone rises into the canvas and settles tilted, keys pick up green spill | push-in 1.00->1.12 over 89 fr, slight roll ~-0.5 deg/s (motion.json) | phone rises from below the canvas edge, springs.heavy ~30 fr (overshoot not measurable); spill fades up with it | hard-cut | swell |
| 2 | 2.97-3.77 | 89-113 | reveal | blue-to-black gradient backdrop; a dark template-gallery window floats in the centre, about 85 % of width | static hold (no scale change across 4 cells) | gallery tiles already placed; one tile plays a tiny phone preview | zoom-through | whoosh |
| 3 | 3.77-7.00 | 113-210 | feature | gallery fills the frame: featured row of two tiles, community row with filter chips below | push-in through the window 1.00->1.35 over 15 fr, then dolly up ~200 px/s@1920 with slow push 1.00->1.15 (motion.json) | zoom-through window edge easings.inOutSine 15 fr (+-0.25 s); tiles hold, labels stay crisp | continuous | none |
| 4 | 7.00-9.97 | 210-299 | feature | camera pulls back to the window, grid reflows with new tiles, then glides down to a phone-app template tile | pull-out 1.15->1.00 over 8 fr, dolly down ~290 px/s@1920 at 8.00-9.00, push-in 1.00->1.12 on the phone tile | new tiles slide in from the right edge, easings.outExpo ~12 fr (+-0.25 s) | hard-cut | none |
| 5 | 9.97-12.27 | 299-368 | feature | template preview card on a dark panel; a tilted orange-UI phone inside it, then the phone turns to show its side edge | push-in 1.00->1.40 over 30 fr (motion.json 40 %/s), roll -3 deg | phone yaws from three-quarter to side profile over ~45 fr, easings.inOutSine (+-0.25 s); card contents swap to a blank side view at 11.50 | slide-push | whoosh |
| 6 | 12.27-14.00 | 368-420 | cta | close-up of the preview panel corner: a free-use button; cursor clicks it, label switches to a loading state | tilt-plane: panel tilted ~15 deg, slides up and right over 17 fr, then slow drift | cursor-path to the button, press squash springs.click (+-0.25 s); label swap to spinner state on click | blur-dissolve | tick |
| 7 | 14.00-15.77 | 420-473 | feature | editor canvas: the template phone on a white artboard, toolbar under it, layered timeline at the bottom | push-in 1.00->1.07 over 53 fr | artboard wipes up from below with blur, ~18 fr (cuts.json soft 14.00-14.60); phone settles; selection box draws at 15.50 | blur-dissolve | none |
| 8 | 15.77-20.27 | 473-608 | feature | image swap flow: inspector panel with source menu, cursor picks the library, popover with two green tiles, phone screen becomes green | dolly right to the inspector (~700 px/s@1920 at 17-18 s), back to the canvas at 18.50; push-in 1.00->1.05 | menu opens springs.ui ~8 fr (+-0.25 s); cursor-path with clicks at 16.50, 17.27, 18.27; screen content swaps in one frame | continuous | tick |
| 9 | 20.27-22.73 | 608-682 | feature | user drags the phone corner handle: the phone tilts through several angles inside its selection box | static artboard; slight push 1.00->1.04 | phone tilt follows the drag, about 4 poses in 2.5 s, easings.inOutSine per pose (+-0.25 s) | slide-push | whoosh |
| 10 | 22.73-25.77 | 682-773 | feature | project settings panel slides in; background colour picker opens and the canvas background flips white to black | slide-push left 19 fr (cuts.json soft 22.73-23.37), then static; pull-out 1.00->0.94 at 24.27 | picker popover springs.ui ~8 fr (+-0.25 s); background swap in one frame at ~24.27 | continuous | tick |
| 11 | 25.77-27.77 | 773-833 | feature | green phone on black canvas rotates in 3D: three-quarter left, front, three-quarter right with a deep side edge | push-in 1.00->1.20 over 60 fr (motion.json ~20 %/s) | phone yaw about 50 deg over ~45 fr, easings.inOutSine (+-0.25 s), handles follow | continuous | whoosh |
| 12 | 27.77-29.27 | 833-878 | feature | text artboard: one huge gradient word over a glowing violet horizon, timeline with text layers below | pull-out to the whole editor at 27.77, then static | word wipes in left to right with blur ~8 fr (+-0.25 s), springs.snappy scale settle (overshoot not measurable) | continuous | none |
| 13 | 29.27-30.77 | 878-923 | feature | short tagline line, 3 words, small and centred on the same horizon | static | blur-in by word, stagger ~2 fr (+-0.25 s), easings.outExpo 12 fr; exits with a left-to-right mask wipe ~8 fr | continuous | none |
| 14 | 30.77-32.27 | 923-968 | logo | wordmark in grey on pure black; a white light sweeps through it and leaves a halo | static | light-on: highlight sweeps left to right over ~30 fr, halo peaks at 31.27 then fades (+-0.25 s) | continuous | shimmer |
| 15 | 32.27-35.27 | 968-1058 | feature | text edit: the big word gets a selection box, text highlighted in accent blue, then a new 4-letter word is typed | static | selection highlight on in 1 frame at 33.00; deletion, then typewriter at ~4 chars/s (4 letters in 0.75 s); caret shown | continuous | type-click |
| 16 | 35.27-36.77 | 1058-1103 | feature | preview playback: the edited word, the tagline and the wordmark pass in quick order | static | each card ~0.25 s, same entrances as rows 12-14 at speed (playhead scrub) | continuous | none |
| 17 | 36.77-39.77 | 1103-1193 | feature | wordmark text replaced: selection box, typed placeholder name of 2 words, then played back with the light sweep | static | typewriter ~5 chars/s (8 chars 36.77-38.27); blank 38.50; replay light-on sweep 38.77-39.77 (+-0.25 s) | continuous | type-click |
| 18 | 39.77-42.50 | 1193-1275 | cta | editor gone: product URL on near-black, centred, white with a soft halo | static | blur-in 8 fr (+-0.25 s) at 40.00-40.27; light-on halo peaks at 41.00-41.27; blur-out exit ~8 fr at 42.27 | continuous | shimmer |
| 19 | 42.50-45.44 | 1275-1363 | logo | brand mark alone in white, centred on near-black, about 8 % of width | static | fades up from grey to white over ~8 fr (+-0.25 s), then holds 80 fr; audio silent from 44.48 | end | swell |

Evidence per row:
- Row 1: sheet-01 cells 0-11; cuts/cut-002.97.jpg
- Row 2: sheet-01 cells 12-15; cuts/cut-003.77.jpg
- Row 3: sheet-02 cells 0-11
- Row 4: sheet-02 cells 12-15; sheet-03 cells 0-7
- Row 5: sheet-03 cells 8-15; cuts/cut-009.97.jpg
- Row 6: sheet-04 cells 0-7; cuts/cut-012.27.jpg
- Row 7: sheet-04 cells 8-15; cuts/cut-014.00.jpg
- Row 8: sheet-05 cells 0-15; cuts/cut-015.77.jpg
- Row 9: sheet-06 cells 1-10
- Row 10: sheet-06 cells 11-15; sheet-07 cells 0-6; cuts/cut-022.73.jpg
- Row 11: sheet-07 cells 7-14
- Row 12: sheet-07 cell 15; sheet-08 cells 0-4
- Row 13: sheet-08 cells 5-10
- Row 14: sheet-08 cells 11-15; sheet-09 cell 0
- Row 15: sheet-09 cells 1-12
- Row 16: sheet-09 cells 13-15; sheet-10 cells 0-2
- Row 17: sheet-10 cells 3-15
- Row 18: sheet-10 cell 15; sheet-11 cells 0-9
- Row 19: sheet-11 cells 10-15; sheet-12 cells 0-5

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-3d | 1, 5, 11 | craft/03-camera-and-staging.md, craft/families (3d device) |
| device-laptop | 1 | craft/03-camera-and-staging.md |
| device-phone | 1, 5-11 | craft/03-camera-and-staging.md |
| push-in | 1, 3, 5, 7, 8, 11 | craft/03-camera-and-staging.md#drift-and-push-in |
| pull-out | 4, 10, 12 | craft/03-camera-and-staging.md |
| dolly | 3, 4, 8 | craft/03-camera-and-staging.md |
| tilt-plane | 6 | craft/03-camera-and-staging.md |
| zoom-through | 2 | craft/09-transitions.md |
| cursor-path | 6, 8, 9 | craft/04-motion.md#springs |
| ui-rebuild | 2-17 | craft/03-camera-and-staging.md (zoom tiers) |
| typewriter | 15, 17 | craft/05-typography.md |
| blur-in | 12, 13, 18 | craft/05-typography.md |
| light-on | 14, 17, 18 | craft/families (brand) |
| end-card | 18, 19 | craft/families (brand) |
| blur-dissolve | 6, 7 | craft/09-transitions.md#blur-dissolve |
| slide-push | 5, 9 | craft/09-transitions.md |
| hard-cut | 1, 4 | craft/09-transitions.md |
| glow | 1, 12-14, 18 | look |

## Look
Palette: #050706 near-black background, #FAF7F3 off-white artboard and type, #0191F8 blue gradient top, #80D548 green phone screen (swapped content), #1A1A1A UI panels, #BB816F warm template tile. Type: UI sans at app scale (labels 1-2 % H); display grotesk for the edited words, bold, tight, white-to-grey vertical gradient, about 45 % of artboard width; URL in medium sans, 4 % W. Treatment: glow (green spill on the keyboard, violet horizon behind the text artboard, halo on wordmark and URL). Background: vertical gradient, saturated blue at the top fading to black, under a floating dark editor window.

## What to adapt
- Copy: one 5-6 letter display word and the word it is retyped to; one tagline of 3 words; the product name and a 2-word placeholder name; the URL
- Brand: the gradient top colour and the swapped phone screen carry the accent; the mark appears only in the last row, the URL in the row before
- Timing: rows 3-4, 8 and 17 stretch with VO length; rows 2, 6, 7, 12-14 keep their frame counts so the edits stay readable

## Pitfalls
- Edits must be one action per VO sentence: in the reference every row is a single click, drag or type
- Phone yaw and the drag tilt read as 3D only with a real side edge; a flat card rotation looks fake
- UI labels sit at 1-2 % of frame height; push-in to the region tier before any click, or the action is unreadable on a phone
- The end card drops all editor chrome: do not keep the gradient under the URL and mark

## Missing components
- TemplateGallery: dark window with a featured row of 2 tiles and a community grid of 2-3 columns, tiles slide in with 2 fr stagger (techniques: ui-rebuild, dolly)
- EditorShell: canvas artboard + bottom toolbar + 3-track layered timeline + right inspector with source menu and colour picker (techniques: ui-rebuild, cursor-path)
- TiltHandleDrag: device in a selection box that tilts toward a dragged corner handle, 4 poses in 2.5 s (techniques: device-3d, cursor-path)

## Proposed terms
- template-pick: a template tile is chosen from a gallery and opens in the editor, rows 2-7 (not in craft/vocabulary.md; not used in recipe.json)
- layer-swap: a layer's image is replaced through a source menu, the canvas updates in one frame, row 8 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Camera scale and pan partly from motion.json per-second estimates. Not measurable: spring overshoot, staggers below 7 fr, exact soft-transition style (cuts.json gives only zoom / slide / dissolve hints). SFX planned by the glue rule, not measured (the reference has music and VO). cut_on_beat = 2/7 cuts within ±2 fr (9.97, 12.27); hard and soft cuts counted together.

## Study log
- id template-swap-editor-walkthrough, family product-ui (catalogue hint social-promo; the content is a UI tour, not sticker grammar)
- 45.44 s, 19 rows; 2 hard cuts, 5 soft transitions, the rest continuous inside one editor shot
- techniques 18, cut_on_beat false (2/7), energy high (bpm 161.4)
- not measurable at 0.25 s: overshoot, staggers, soft transition curves
- proposed terms: template-pick, layer-swap
- missing components: TemplateGallery, EditorShell, TiltHandleDrag
- phase B: not run
