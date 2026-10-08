# Vertical editor walkthrough on tilted planes with VO

A creator-style vertical promo: VO talks through a browser tool while the camera whips and pushes across tilted UI planes, from site to template, edit, export, then a glinting URL on a blue blob field.

Source: https://www.raylight.app/templates/KztPYhar (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A web tool or editor explained in a 30-45 s vertical reel with voice-over
- A 4-step flow (browse, pick, edit, export) shown on real screens without talking heads
- Creator or affiliate-style posts that close on a URL rather than a logo
Not for: products with one screen, or silent autoplay without captions (the VO carries the story; the picture alone does not explain the steps).

## Format
9:16 · 42.67 s · 30 fps · dark · music 120.0 BPM, cut_on_beat 2/10 · VO yes, ~122 words in 16 phrases, ~3.0 words/s

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-2.50 | 0-75 | hook | laptop on a dark desk, low angle, screen tilted ~20 deg: editor with a phone mockup (red ring UI) on the canvas, timeline below | static (motion.json zoom 0.0 %/s, pan 0 px/s) | none; held frame under the opening VO line | continuous | VO + music |
| 2 | 2.50-5.00 | 75-150 | hook | same laptop shot; cyan-blue light rises along the left edge and a second screen edge glows behind | static (motion.json 0.0 %/s) | edge light fades in over ~0.5 s (+-0.25 s), easings.inOutSine (suggested) | hard-cut | VO + music |
| 3 | 5.00-6.07 | 150-182 | feature | same laptop, editor now shows a glass app-icon card on an iridescent wave canvas, selection handles on the card | drift: push-in ~3 %/s with slight roll (motion.json 3.3 %/s, -1.3 deg) | card bounding box shifts between cells (selection moved); no entrance | hard-cut | VO + music |
| 4 | 6.07-9.13 | 182-274 | reveal | black browser card rises on a blue blob gradient: wordmark header, then landing page with 2-line headline over a gallery of mockups | dolly up: page scrolls ~40 % of card height 7.77-9.00 | card slides up from bottom ~0.4 s (springs.heavy suggested); headline blur-in 0.25 s (7.00 blurred, 7.27 sharp); page scroll easings.inOutSine (+-0.25 s) | hard-cut | swoosh-short |
| 5 | 9.13-14.87 | 274-446 | feature | template gallery on a tilted dark plane: card grid, zoom to a card row, lateral whip, vertical pan, then a dense masonry wall scrolling up (merged: 4 moves, avg 1.4 s) | tilt-plane with dolly: push-in 8.8 %/s at 9-10 s, whip-pan 1115 px/s at 11-12 s, pan up 372 px/s at 12-13 s, scroll up 13.27-14.50, push-in blur at 14.77 | each move easings.inOutSine (suggested), whip ~0.5 s with motion-blur (11.50 cell smeared); cards flip states inside the grid (static thumbnails animating) | hard-cut | whoosh |
| 6 | 14.87-15.67 | 446-470 | feature | close tilted masonry wall of template cards; cursor moves onto the green phone card | static plane, slight drift (+-0.25 s) | cursor-path into the card at 15.50 (springs.ui suggested) | hard-cut | VO + music |
| 7 | 15.67-17.27 | 470-518 | feature | template detail page card on blue blob gradient: green 3D phone mockup preview, title row, small action button top right | push-in from blurred zoom (15.77) to settle at 16.00, then hold; slight up drift | entry zoom from blur ~8 fr (+-0.25 s), springs.cameraIn (overshoot not measurable) | continuous | VO + music |
| 8 | 17.27-18.77 | 518-563 | feature | camera swings onto the page's action button, page leaning back ~25 deg; cursor clicks it, button turns to a loading state | push-in + tilt toward top right, ~1.6x over 0.5 s (17.27-17.77), motion-blur on the move | springs.cameraIn on the push; cursor click squash at 18.27, button label swap at 18.50 (+-0.25 s) | continuous | ui-confirm |
| 9 | 18.77-20.77 | 563-623 | feature | editor canvas (tilted): the green phone rises from the bottom of the frame and turns to face camera; toolbar and timeline below | static plane, small drift | phone rises ~60 % of canvas height and rotates ~30 deg over 1.5 s, springs.heavy (suggested); near-miss scene change at 18.60 in cuts.json, not a cut | continuous | swoosh-short |
| 10 | 20.77-23.00 | 623-690 | feature | whip to the editor's right-hand properties panel on a tilted plane; cursor opens an image-replace dropdown with 3 options and picks the second | whip-pan right ~0.5 s (20.77-21.27) with motion-blur, hold, whip back left at 22.77 | dropdown opens in <1 cell (+-0.25 s) springs.ui; option highlight at 22.27, pick at 22.50 | continuous | whoosh |
| 11 | 23.00-25.50 | 690-765 | feature | back on the canvas: the phone mockup now shows the swapped screenshot (dark UI with red ring); it turns from three-quarter to front | whip return lands at 23.27, then static plane | phone rotates ~40 deg yaw over 2 s (23.27-25.27), easings.inOutSine (suggested); blue selection box follows the phone | continuous | whoosh |
| 12 | 25.50-27.03 | 765-811 | feature | closer framing of the same canvas: phone upright, edge-on light, turns back to three-quarter | push-in ~1.25x over 0.5 s (25.27-25.77), then hold (motion.json 37.4 %/s at 25 s) | phone yaw back ~35 deg over 1.25 s (26.00-27.00), easings.inOutSine (suggested) | hard-cut | VO + music |
| 13 | 27.03-27.83 | 811-835 | feature | editor canvas with a mint gradient frame: a 2-word line, centred, fading out; text layer track in the timeline | static | line opacity 1 -> 0.3 over 0.5 s (27.50-27.77) (+-0.25 s) | hard-cut | VO + music |
| 14 | 27.83-28.87 | 835-866 | feature | same editor, dark green gradient canvas: one large word with a period, fading | static | word fades and slightly shrinks across 1 s (+-0.25 s), easings.linear (suggested) | hard-cut | VO + music |
| 15 | 28.87-33.20 | 866-996 | feature | mint canvas: a 2-line statement builds word by word, camera pushes in, second line is selected and retyped letter by letter with a caret (merged: 3 states) | push-in 1.00 -> ~1.6x over 0.5 s (30.27-30.77, motion.json 50 %/s), then static | words blur-in one per ~0.25 s (29.00-29.77); selection highlight at 31.00; typewriter 9 chars over 1.75 s (31.27-33.00), caret on | hard-cut | type-click |
| 16 | 33.20-36.27 | 996-1088 | proof | full-bleed close-up of a phone, leaning, lock screen with a glowing app wordmark over a dark rock and a planet | drift: slow pan left ~105-137 px/s @1920 with push-in 2-7 %/s (motion.json 33-36 s) | none; held result shot, easings.linear drift | continuous | VO + music |
| 17 | 36.27-38.27 | 1088-1148 | feature | export dialog on a tilted dark panel over the blurred editor: format chips, resolution chips, file target; cursor steps through resolution options | push-in from wide (36.27) to close (37.27) ~1.5x, springs.cameraIn; motion-blur at 36.77 | cursor clicks 3 resolution chips at 37.27, 37.50, 38.00; size readout updates each click (+-0.25 s) | continuous | ui-confirm |
| 18 | 38.27-39.63 | 1148-1189 | feature | whip to the compression row of the same dialog; cursor steps through 3 presets, export button in the corner | whip-pan left ~0.25 s with motion-blur (38.27), then static | cursor clicks at 38.77, 39.27, 39.50; readout text swaps per click | hard-cut | ui-confirm |
| 19 | 39.63-42.67 | 1189-1280 | cta | URL in white grotesk centred on a black field with a slow-moving blue blob gradient; a light glint sweeps the letters | static; background blob drifts and curls | URL fades in on the cut; glint sweeps left to right 40.27-41.00 (~22 fr, +-0.25 s); blob morph easings.inOutSine | end | shimmer |

Evidence per row:
- row 1: sheet-01 cells 0-9
- row 2: sheet-01 cells 10-15, sheet-02 cells 0-3, cuts/cut-005.00.jpg
- row 3: sheet-02 cells 4-8, cuts/cut-006.07.jpg
- row 4: sheet-02 cells 9-15, sheet-03 cells 0-4, cuts/cut-006.07.jpg, cuts/cut-009.13.jpg
- row 5: sheet-03 cells 5-15, sheet-04 cells 0-12, cuts/cut-014.87.jpg
- row 6: sheet-04 cells 12-14, cuts/cut-014.87.jpg, cuts/cut-015.67.jpg
- row 7: sheet-04 cell 15, sheet-05 cells 0-4, cuts/cut-015.67.jpg
- row 8: sheet-05 cells 5-10
- row 9: sheet-05 cells 11-15, sheet-06 cells 0-2
- row 10: sheet-06 cells 3-12
- row 11: sheet-06 cells 12-15, sheet-07 cells 0-5
- row 12: sheet-07 cells 6-12, cuts/cut-027.03.jpg
- row 13: sheet-07 cells 13-15, cuts/cut-027.03.jpg, cuts/cut-027.83.jpg
- row 14: sheet-08 cells 0-3, cuts/cut-027.83.jpg, cuts/cut-028.87.jpg
- row 15: sheet-08 cells 4-15, sheet-09 cells 0-4, cuts/cut-028.87.jpg, cuts/cut-033.20.jpg
- row 16: sheet-09 cells 5-15, sheet-10 cell 0, cuts/cut-033.20.jpg
- row 17: sheet-10 cells 1-8
- row 18: sheet-10 cells 9-14, cuts/cut-039.63.jpg
- row 19: sheet-10 cell 15, sheet-11 cells 0-10, cuts/cut-039.63.jpg

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1-3 | craft/03-camera-and-staging.md, studio API LaptopFrame |
| tilt-plane | 5, 6, 8-12, 17, 18 | craft/03-camera-and-staging.md#tilt-plane |
| dolly | 4, 5, 16 | craft/03-camera-and-staging.md |
| whip-pan | 5, 10, 11, 18 | craft/09-transitions.md, craft/03-camera-and-staging.md |
| push-in | 3, 7, 8, 12, 15, 17 | craft/03-camera-and-staging.md#drift-and-push-in |
| motion-blur | 5, 8, 10, 17, 18 | craft/03-camera-and-staging.md |
| cursor-path | 6, 8, 10, 17, 18 | craft/04-motion.md, studio API Cursor |
| device-3d | 9, 11, 12, 16 | craft/03-camera-and-staging.md (phone turning in 3D on the canvas) |
| blur-in | 4, 15 | craft/05-typography.md |
| typewriter | 15 | craft/05-typography.md |
| mesh-gradient | 4, 7, 8, 19 | craft/06-look (blue blob field behind every page card) |
| glow | 2, 19 | craft/06-look |
| ui-rebuild | 4-12, 17, 18 | site, gallery, detail, editor panel and export dialog are 5+ screens |

## Look
Palette: #01020A background black, #E6E9E7 UI/URL text, #0045FC blob blue accent, #5372CB soft blue, #D6F0E8 mint canvas, #21535E deep teal. Type: small product sans in the UI; on-canvas statements medium grotesk, sentence case, ~4 % H; URL regular lowercase grotesk ~4 % H. Treatment: glow, motion-blur, mesh-gradient. Background: black with a large slow blue blob gradient behind floating page cards; full-bleed laptop and phone footage-style shots at the start and in the proof row.

## What to adapt
- Copy: VO of ~120 words, 16 short phrases, one per row; on-canvas lines: a 2-word line, a 1-word line, a 2-line statement of <= 4 words per line whose second line is retyped to name the user's product.
- Brand: accent = blob blue behind cards and the closing field; the URL is the only brand moment (no logo end card).
- Timing: rows follow the VO phrases; whips keep ~0.25-0.5 s, tilted-tour shots hold >= 1.5 s for reading; the closing URL holds ~3 s.

## Pitfalls
- Cuts are rare (10 in 42.6 s) and mostly off the beat: the edit is driven by camera moves on one plane, so cutting every move breaks the one-continuous-tool feel.
- Whips must carry motion-blur; without it the 0.25-0.5 s lateral moves read as jumps.
- The masonry wall (row 5) is dense: give each move its own direction (push, lateral, vertical) or the 5.7 s shot reads as one long scroll.
- Keep the UI legible at 9:16: panels are tilted ~20-25 deg and cropped to one region at a time.

## Missing components
- PageCard: a floating rounded browser card on a blob field that slides up 40 % H and scrolls its content (use ScreenSlot inside Dolly until it exists) (techniques: dolly, mesh-gradient)
- TextGlint: a white light band sweeping across a text line left to right in ~22 fr, letters brighten as it passes (techniques: glow)

## Proposed terms
- text-glint-sweep: a light band passes across a line of type, brightening letters in sequence; row 19 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, no 30 fps strip. Not measurable: spring overshoot, entrance frame counts under 8 fr, whip durations to the frame, exact phone rotation angles (estimated from silhouettes), cursor path curvature. SFX planned by the glue rule, not measured (reference has music + VO; individual SFX not identified). cut_on_beat = 2/10 cuts within ±2 fr (9.13, 27.03). Near-miss scene changes at 6.87, 14.67, 18.60 and 36.10 are camera moves, not cuts.

## Study log
- id vertical-tilted-editor-voice-walkthrough, family social-promo, 42.67 s, 19 rows from 10 hard cuts + state splits
- techniques 13; cut_on_beat false (2/10); music 120.0 BPM, energy medium; VO yes ~3 words/s
- not measurable at 0.25 s: overshoot, short entrances, whip frame counts, rotation angles
- proposed terms: text-glint-sweep; missing components: PageCard, TextGlint
- difficulty hard (ui_rebuild > 3 screens, device-3d), render_cost heavy (device-3d, motion-blur)
- phase B: not run
