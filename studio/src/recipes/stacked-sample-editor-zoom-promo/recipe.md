# Stacked sample cards into an editor zoom tour

Two stacked cards show finished sample clips, a feed post proves reach with a climbing view count, then the camera dives through an editor: typed prompts, a step list, a tilted gallery, layer swaps. Mark tile, URL and offer close it.

Source: https://www.raylight.app/templates/BYp6gJ6G (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A vertical social ad for a creative, video or design tool that has finished outputs to show before the UI
- VO-led promo of about 40 s that walks three ways to use the product (template, from scratch, AI prompt)
- Products with a canvas plus timeline editor that reads well in punch-ins and tilted planes
- Closing on an integration: your mark tile joined by a partner tile
Not for: products with no visual output, silent autoplay without captions (the story rides on the VO), horizontal-only placements.

## Format
9:16 · 42.24 s · 30 fps · light · music 115.0 BPM, cut_on_beat 1/5 (false) · VO yes, 102 words over ~38 s = 2.7 words/s

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.77 | 0-53 | hook | two stacked rounded cards on a warm grainy gradient: top = dark clip of a phone tilting in, bottom = white card where one cover grows into a strip, then a 3-row cover wall with a short count label | push-in on both cards ~1.00->1.05 over 53 fr (motion.json 13 %/s zoom at 1 s) | cover tiles cascade in: 1 tile at 0.00, 4 at 0.27, 3 rows at 1.27, easings.outExpo per step (stagger not measurable at 0.25 s); top clip plays its own camera move | continuous | VO + music |
| 2 | 1.77-3.83 | 53-115 | hook | top card swaps to a blue wave lock-screen sample with a glass answer-call pill; at 3.00 bottom card swaps to a yellow card with a wordmark and an emoji | drift: wall zooms 1.00->1.6 at 2.77 then card content swaps; cards static in frame | card content swaps are cuts inside the cards (no frame cut); glass pill slides 0.25 s steps; emoji tumbles in springs.pop (overshoot not measurable) | hard-cut | VO + music |
| 3 | 3.83-5.00 | 115-150 | reveal | a social feed post card (vertical clip of the editor on a laptop, side engagement counts, caption line) floating on the gradient | push-in 1.00->1.08 over 35 fr, easings.inOutSine | post plays its clip; the card itself holds | continuous | VO + music |
| 4 | 5.00-6.70 | 150-201 | proof | close crop on the post's footer: the view count climbs from a few thousand to six figures, then the number swells | push-in to element tier ~1.08->2.8 between 4.77 and 5.27 (±0.25 s), then hold | counter rolls 9k -> 59k -> 120k -> 139k -> 140k over 1.0 s, easings.outExpo; at 6.27 the figure scales ~1.4x and settles springs.snappy (overshoot not measurable) | hard-cut | tick |
| 5 | 6.70-8.00 | 201-240 | feature | small editor window (layers list, canvas with a soft green clip, properties panel, timeline) centred on the gradient | push-in ~1.00->1.15 over 39 fr, easings.inOutSine | window holds; title on the canvas fades out at 7.77 | continuous | VO + music |
| 6 | 8.00-10.27 | 240-308 | feature | canvas fills the width: a one-line prompt typed large with a caret, then the view pulls back and the line shrinks into a prompt pill with a send dot | push-in to the canvas at 8.00 (~1.6x), pull-out 9.00->9.27 to region tier, easings.outExpo | typewriter ~12 chars/s from 8.27 to 9.00; caret blinks; at 9.27 the text re-sets into the pill on springs.ui; pill finishes typing to 10.00 | continuous | type-click |
| 7 | 10.27-11.77 | 308-353 | feature | the prompt pill opens into a card with a numbered step list of 4 steps with coloured tags, then the editor tilts away | static until 11.27, then the editor plane rotates ~25 deg in Y and slides left between 11.27 and 11.50 | list rows assemble top to bottom, about one row per 0.25 s cell, easings.outExpo; card grows on springs.layout; tilt exit easings.inExpo | continuous | VO + music |
| 8 | 11.77-13.23 | 353-397 | logo | the brand mark in a white squircle tile, centred on a swirling orange, cream and blue gradient | drift: tile scale 1.00->0.94 over 44 fr | tile lands between 11.50 and 11.77 (entrance not measurable at 0.25 s, near-miss at 11.60 in cuts.json); gradient swirls slowly behind | hard-cut | hit |
| 9 | 13.23-16.27 | 397-488 | feature | a template gallery page laid on a tilted plane: header, featured card with a phone clip, community row; then the whole grid of template cards | tilt-plane ~8 deg Z and slight X lean; drift right to left; at 15.00 pull-out ~1.0->0.55 to show the grid, then dolly up | pull-out easings.inOutSine over ~8 fr between 14.77 and 15.00 (±0.25 s); cards inside play their own clips | continuous | VO + music |
| 10 | 16.27-18.03 | 488-541 | feature | one template's page: short title top left, a phone mockup on a warm card; three feature pills with icons pop around the phone | pan left ~25 px/s @1920 (motion.json), then push-in 1.00->1.10 to the phone | phone rotates from upright to ~25 deg tilt between 17.00 and 17.50 on springs.heavy; pills pop at 17.50, 17.77 and 18.00 on springs.pop (overshoot not measurable) | slide-push | pop |
| 11 | 18.03-19.67 | 541-590 | feature | corner of the tilted page: a like count and a blue primary button; a cursor comes in and clicks; the button turns pale with a spinner and a loading label | slide-push left over 12 fr (18.03-18.43 in cuts.json), then the page keeps tilting ~5 deg clockwise | cursor-path to the button 18.50-19.00, click squash springs.click at ~19.00; loading state from 19.27 with a spinner | hard-cut | ui-confirm |
| 12 | 19.67-22.50 | 590-675 | feature | editor canvas holding a tilted phone mockup image layer, toolbar and timeline below; selection box appears on the layer | push-in 1.00->~1.8 from 20.00 to 22.27 (motion.json up to 35 %/s at 21 s), easings.inOutSine | phone image slides into the canvas from below 20.00-20.77; selection box with handles at 21.77 | continuous | VO + music |
| 13 | 22.50-23.57 | 675-707 | feature | the properties panel (position, depth, tilt fields); a source dropdown opens with 3 options, cursor highlights the first | whip-pan right to the panel at 22.27-22.50, then hold with slight push-in | dropdown opens at 23.00 on springs.ui; item highlight at 23.50 | whip-pan | whoosh |
| 14 | 23.57-26.27 | 707-788 | feature | back on the canvas: the phone layer now shows a new screenshot (yellow app screen); then the editor slides down and off, leaving the full-frame gradient | whip-pan back left 23.57-24.10 (cuts.json soft), slow drift down 24.50-25.77, then the editor slides out downward 26.00-26.27 | screenshot swap shows as an upload state at 24.10, new image visible at 24.50; exit easings.inExpo (±0.25 s) | continuous | whoosh |
| 15 | 26.27-29.27 | 788-878 | feature | a fresh canvas with a blue gradient frame and an empty prompt pill; a prompt of about 7 words is typed, then the send button is shown close | editor rises in 26.27-26.50; static while typing; push-in to the send button ~1.0->2.5 at 28.27-28.50, easings.outExpo | typewriter 26.77-27.77, about 30 chars in 1 s; cursor hovers then clicks send at ~29.00, springs.click | continuous | type-click |
| 16 | 29.27-30.27 | 878-908 | feature | close on the toolbar and timeline: clip segments and a playhead that scrubs | pan down and push-in to detail tier at 29.27, then a slight pan right | playhead scrubs ~1 s of timeline per 0.25 s cell, easings.linear | continuous | VO + music |
| 17 | 30.27-31.77 | 908-953 | feature | pull back to the canvas: the prompt pill text gets a selection box with handles, then is highlighted | pull-out to region tier at 30.27, springs.cameraOut; small push-in 30.50-31.50 | text box selection at 30.77, text highlight at 31.00 | continuous | VO + music |
| 18 | 31.77-34.60 | 953-1038 | feature | the highlighted text is replaced: a short line of about 5 words is typed in the pill, letter by letter | static (pill and timeline hold; no change across 32.00-34.50 cells, motion.json hold 32-33 s) | typewriter ~8 chars/s from 31.77 to 34.00, caret visible; holds 0.5 s | hard-cut | type-click |
| 19 | 34.60-36.27 | 1038-1088 | logo | the mark tile on the gradient; a second partner tile (sunburst mark) slides out from behind it to the left, forming a pair | drift 1.00->0.95, tiles shrink and recentre | partner tile emerges 34.77-35.27 springs.snappy (overshoot not measurable); pair holds; at 36.27 both fade out with blur | continuous | hit |
| 20 | 36.27-38.50 | 1088-1155 | cta | the product URL alone, centred on the moving gradient | static frame; gradient swirls behind | URL blur-in from 36.27 to 36.50 (about 8 fr, ±0.25 s), easings.outExpo; hold 2.0 s | continuous | VO + music |
| 21 | 38.50-42.24 | 1155-1267 | cta | a 3-word offer line replaces the URL in the same place and holds to the end; gradient keeps flowing | static frame; gradient swirls behind | line swaps in as a cut between 38.27 and 38.50 cells; holds 3.7 s; audio is silent from 41.87 | end | VO + music |

Evidence per row:
- Row 1: sheet-01 cells 0-6
- Row 2: sheet-01 cells 7-15, cuts/cut-003.83.jpg (before)
- Row 3: sheet-02 cells 0-3, cuts/cut-003.83.jpg (after)
- Row 4: sheet-02 cells 4-10, cuts/cut-006.70.jpg (before)
- Row 5: sheet-02 cells 11-15, cuts/cut-006.70.jpg (after)
- Row 6: sheet-03 cells 0-8
- Row 7: sheet-03 cells 9-14
- Row 8: sheet-03 cell 15, sheet-04 cells 0-4, cuts/cut-013.23.jpg (before)
- Row 9: sheet-04 cells 5-15, sheet-05 cell 0, cuts/cut-013.23.jpg (after)
- Row 10: sheet-05 cells 1-8, cuts/cut-018.03.jpg (before)
- Row 11: sheet-05 cells 9-14, cuts/cut-018.03.jpg (after), cuts/cut-019.67.jpg (before)
- Row 12: sheet-05 cell 15, sheet-06 cells 0-9, cuts/cut-019.67.jpg (after)
- Row 13: sheet-06 cells 9-14, cuts/cut-023.57.jpg (before)
- Row 14: sheet-06 cell 15, sheet-07 cells 0-9, cuts/cut-023.57.jpg (after)
- Row 15: sheet-07 cells 9-15, sheet-08 cells 0-4
- Row 16: sheet-08 cells 5-8
- Row 17: sheet-08 cells 9-14
- Row 18: sheet-08 cell 15, sheet-09 cells 0-14, cuts/cut-034.60.jpg (before)
- Row 19: sheet-09 cells 15, sheet-10 cell 0, cuts/cut-034.60.jpg (after)
- Row 20: sheet-10 cells 1-9
- Row 21: sheet-10 cells 10-15, sheet-11 cells 0-8

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| card-grid | 1, 2, 9 | craft/vocabulary.md#ui, FeatureCards / Surface |
| screen-recording | 3-6, 9, 12-17 | craft/vocabulary.md#ui, FootageClip |
| push-in | 1, 3, 4, 5, 6, 10, 12, 15 | craft/04-motion.md, Camera / KenBurns |
| pull-out | 6, 9, 17 | craft/04-motion.md, Camera |
| counter | 4 | Counter |
| typewriter | 6, 15, 18 | Typewriter |
| prompt-typing | 6, 15, 18 | PromptBar |
| list-assemble | 7 | ListAssemble |
| tilt-plane | 7, 9, 10, 11 | TiltPlane |
| device-phone | 10, 12, 14 | PhoneFrame |
| cursor-path | 11, 13, 15 | Cursor |
| thinking-state | 11 | Spinner / ThinkingState |
| slide-push | 10 -> 11 | transitions.tsx |
| whip-pan | 13 -> 14 | craft/vocabulary.md#camera |
| blur-in | 20 | BlurIn |
| end-card | 19-21 | EndCard pattern (BlurIn over backdrop) |
| mesh-gradient | all rows (backdrop) | DesktopBackdrop |
| grain | all rows | Grain |

## Look
Palette: #D2A695 warm peach backdrop, #101010 type and mark ink, #E56A3E orange gradient accent, #82ADC7 sky-blue gradient accent, #F8F7F6 card and tile white, #C5C4CE editor grey (palettegen on cut-003.83, cut-019.67, cut-034.60). Type: UI type is the product's own small grotesk; close lines medium-weight rounded grotesk, sentence case, normal tracking, about 3 % of frame height, centred, black on the gradient. Treatment: mesh-gradient, grain. Background: animated grainy orange / cream / blue mesh gradient under every shot; UI floats on it as cards or tilted planes.

## What to adapt
- Copy: VO carries the story (about 18 sentences, 2.7 words/s); on screen only two typed prompts (about 7 and 5 words), 3 one-word feature pills, the URL and a 3-word offer line.
- Brand: gradient colours = brand warm + cool pair; accent on primary buttons; mark in a white squircle at 11.77 and 34.60; optional partner tile beside it.
- Timing: rows stretch to VO sentence ends; keep the counter climb (~30 fr), the 12 fr slide-push, and the URL-to-offer swap at a cut.

## Pitfalls
- Only 5 hard cuts in 42 s: do not add cuts between editor rows, the camera moves are the edit.
- The hook relies on real finished samples; placeholder clips kill it.
- UI text inside recordings is tiny at 9:16; push to element tier before anything must be read.
- Long typing rows (row 18, 2.8 s) need the VO to fill them, else they feel slow.

## Missing components
- StackedSampleCards: two rounded cards stacked vertically at ~31 % H each, each plays a clip and can swap content with an internal cut; bottom card can host a growing thumbnail wall (1 -> 4 -> 3 rows). (techniques: card-grid)
- MarkPair: brand tile with a partner tile sliding out from behind to the left, ~1.2 tile widths apart, springs.snappy. (techniques: end-card)

## Proposed terms
- stacked-sample-cards: two stacked cards showing outputs as the hook, rows 1-2 (not in craft/vocabulary.md; not used in recipe.json)
- partner-tile-pair: second mark tile emerging from behind the brand tile, row 19 (not in craft/vocabulary.md; not used in recipe.json)
- gradient-interlude: the editor slides away to leave the bare animated gradient for a beat between chapters, rows 14-15 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Camera speeds partly from motion.json per-second estimates. Not measurable: entrance frame counts under 8 fr, spring overshoot, list stagger, tile landing frames. SFX planned by the glue rule, not measured (VO + music only). cut_on_beat = 1/5 cuts within ±2 fr (34.60 at 1.8 fr; others 2.5-7.2 fr); soft transitions 18.03 and 23.57 not counted as cuts.

## Study log
id stacked-sample-editor-zoom-promo · family social-promo · 42.24 s, 21 rows (5 hard cuts, 2 soft)
techniques 18 (incl. 2 look ids) · cut_on_beat false (1/5)
not measurable: sub-0.25 s entrances, overshoot, staggers (sheets only, no strips)
proposed terms: stacked-sample-cards, partner-tile-pair, gradient-interlude
missing components: StackedSampleCards, MarkPair
phase B: not run
