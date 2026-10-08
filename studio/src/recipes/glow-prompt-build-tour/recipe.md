# Blue-lit prompt-to-site build tour

A glowing pixel types a promise and becomes a button; a prompt is sent, a browser page assembles and is light-scanned, action pills pop, a ring dollies open on a claim, tool tiles orbit, the mark glitches in. One blue light ties it.

Source: https://www.raylight.app/templates/7tvkBhM0 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An AI builder or generator product that turns a prompt into a page, app or document
- A dark, single-accent brand where everything can be lit by one colour
- A 30 s site hero or launch teaser: prompt, result, workflow, integrations, logo
- Showing integrations as a tool-tile carousel after the main feature
Not for: light brands, products with no prompt-to-result story, films that must explain one feature in depth (every beat is under 3 s).

## Format
16:9 · 30.33 s · 30 fps (motion updates every 2nd frame, effectively 15 fps) · dark · music 126.7 BPM, cut_on_beat 0/5 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.75 | 0–53 | hook | glowing colour-hopping square types a one-line promise, 8 words; dot-matrix edges | drift 1.00→1.01 | per-char typing, line done 0.77 s (~23 fr), colour step every 2 fr, easings.linear (±0.25 s) | morph | type-click |
| 2 | 1.75–3.25 | 53–98 | reveal | two squares fuse into a blank glowing pill, it fills, plus icon and 2-word label type in; arrow cursor drifts in | static 2.00–3.00 | collapse ~8 fr springs.ui (overshoot not measurable); fill 2.27; label 2.50–3.00 | hard-cut | pop |
| 3 | 3.25–4.80 | 98–144 | feature | button grows to fill the frame; cursor clicks, fill flashes blue 2 fr | push-in 1.0→~3.0 over 1.4 s, accelerating | easings.inExpo ~42 fr (±0.25 s); springs.click | hard-cut | ui-confirm |
| 4 | 4.80–7.25 | 144–218 | feature | empty glowing prompt box with model selector, add and send; 6-word request types in | drift 1.00→1.05, slight up/right | box springs.layout (overshoot not measurable); typing 5.27–6.77, easings.linear | zoom-through | type-click |
| 5 | 7.25–9.00 | 218–270 | feature | dive to the box corner; send button turns blue on click | zoom-tier full→detail ~×4 in 8 fr, then drift 1.00→1.02 | easings.outExpo ~8 fr (±0.25 s); send fill 8.27 | morph | whoosh |
| 6 | 9.00–11.75 | 270–353 | feature | narrow browser window grows; nav, 2-line headline with accent word, CTA, dashboard fill in; placeholder blocks fly in and resolve | push-in 1.00→1.45, tilt-plane yaw ~8°→3° | window springs.layout ~15 fr; headline types 9.50–10.27; blocks easings.outExpo 6–8 fr (±0.25 s) | morph | pop |
| 7 | 11.75–13.75 | 353–413 | feature | glowing prompt card pops over the dimmed page; 5-word follow-up types in | drift 1.00→1.02 | springs.pop (overshoot not measurable), page dims to ~0.3; typing 12.27–13.27 | blur-dissolve | type-click |
| 8 | 13.75–16.00 | 413–480 | feature | card dissolves; horizontal light bar scans down the page, camera follows | dolly down ~600 px/s @1920 at 14.5–15.5, tilt-plane ~5° | blur-dissolve 6 fr; bar easings.inOutSine ~2 s; rows brighten under the bar | hard-cut | shimmer |
| 9 | 16.00–18.25 | 480–548 | feature | bar sweeps a feature section: 5 cards, bar chart, wave chart, progress bars, brain glyph | dolly ~150 px/s, stops 17.25; drift 1.00→1.02 | rows brighten 0.3→1, easings.outQuint ~8 fr (±0.25 s) | blur-dissolve | none |
| 10 | 18.25–19.37 | 548–581 | feature | single glossy blue pill, 1-word action label | push-in 1.0→1.25 | fade-in 18.27, springs.pop to 18.50 (overshoot not measurable) | hard-cut | pop |
| 11 | 19.37–20.50 | 581–615 | feature | same pill, second 1-word action | push-in 1.0→1.10 | label swapped on the cut, creep only | hard-cut | pop |
| 12 | 20.50–22.50 | 615–675 | feature | pill grows with third action; hand cursor clicks; dark glowing panel opens around it | push-in 1.0→1.15, then drift | springs.pop 8 fr (±0.25 s); click 21.50; panel springs.layout ~8 fr at 21.75 | hard-cut | ui-confirm |
| 13 | 22.50–25.00 | 675–750 | feature | segmented glowing ring explodes open around a 3-word claim; 3-word accent second line; white centre flash 23.07 | dolly through ring: radius 0.44→0.98 of end in 40 fr | easings.outExpo ~15 fr, long tail; line 2 fades 1.2 s later; flash 2 fr | blur-dissolve | swell |
| 14 | 25.00–28.33 | 750–850 | feature | 8 dark glowing tool tiles on a near edge-on carousel; back row translucent blue | push-in 1.0→~1.35 over 3 s, speed-ramp + motion blur last 3 fr | tiles fade up from 0.2 at 25.0–25.6; 45°/s, front moves left; easings.inExpo at the end | hard-cut | riser |
| 15 | 28.33–30.33 | 850–910 | logo | glowing square returns, glitches magenta/cyan, resolves into the blue mark on a light blob; mark shrinks out | static 29.00–29.77, then pull-out 1.0→0.5 | colour step every 2 fr ~12 fr, light-on settle; exit easings.inExpo ~8 fr (±0.25 s) | hard-cut | glitch-sfx |

Evidence per row:
1. sheet-01 cells 0–7
2. sheet-01 cells 7–12
3. sheet-01 cells 13–15, sheet-02 cells 0–3, cuts/cut-004.80.jpg
4. sheet-02 cells 4–13, cuts/cut-004.80.jpg (after)
5. sheet-02 cells 14–15, sheet-03 cells 0–3
6. sheet-03 cells 4–14
7. sheet-03 cell 15, sheet-04 cells 0–6
8. sheet-04 cells 7–15
9. sheet-05 cells 0–4
10. sheet-05 cells 5–9, cuts/cut-019.37.jpg (before)
11. sheet-05 cells 10–11, sheet-06 cells 0–1, cuts/cut-019.37.jpg, cuts/cut-020.50.jpg
12. sheet-06 cells 2–9, cuts/cut-020.50.jpg, cuts/cut-022.50.jpg (before)
13. sheet-06 cells 10–15, sheet-07 cells 0–4, cuts/cut-022.50.jpg, cuts/flash-023.07.jpg
14. sheet-07 cells 5–15, sheet-08 cells 0–1, cuts/cut-028.33.jpg (before)
15. sheet-08 cells 2–8, cuts/cut-028.33.jpg (after)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1, 2, 4, 6, 7 | craft/vocabulary.md#type (Typewriter) |
| morph | 2, 4→5, 5→6, 6→7 | craft/vocabulary.md#transitions (PillMorph) |
| cursor-path | 2, 3, 12 | craft/vocabulary.md#ui (Cursor) |
| push-in | 3, 6, 10–12, 14 | craft/vocabulary.md#camera (Camera) |
| zoom-tier | 5 | craft/vocabulary.md#camera (Camera) |
| prompt-typing | 4, 5, 7 | craft/vocabulary.md#ui (PromptBar) |
| device-browser | 6–9 | craft/vocabulary.md#ui (BrowserFrame) |
| ui-rebuild | 4–9 | craft/vocabulary.md#ui |
| tilt-plane | 6, 8 | craft/vocabulary.md#camera |
| card-grid | 9 | craft/vocabulary.md#ui (FeatureCards) |
| dolly | 8, 9, 13 | craft/vocabulary.md#camera (Dolly) |
| flash | 3, 13 | craft/vocabulary.md#transitions (Flash) |
| orbit-ring | 14 | craft/vocabulary.md#ui (OrbitRing) |
| speed-ramp | 14 | craft/vocabulary.md#camera |
| logo-from-dot | 15 | craft/vocabulary.md#brand (LogoReveal from-dot) |
| glow | 1–15 | craft/vocabulary.md#look |
| motion-blur | 14 | craft/vocabulary.md#look |

## Look
Palette: #00020F background navy-black, #F2F4FA foreground text, #2B69F0 accent blue (fills, rims, ring), #0C3479 light blob, #9ABEF6 hot rim, #161924 tile and panel fill. Type: geometric grotesk, medium, sentence case, normal tracking; UI text ~2.5 % H, ring claim ~4.5 % H white with soft glow, second line accent. Treatment: glow, motion-blur. Background: near-black navy with one huge soft blue light blob drifting; dot-matrix LED texture on the left and right edges in rows 1 and 15; no grain.

## What to adapt
- Copy: hook line ≤ 8 words; button label ≤ 2 words; first prompt ≤ 7 words; page headline 2 lines with one accent word; follow-up prompt ≤ 6 words; three 1-word workflow actions; ring claim 2 lines ≤ 3 words each.
- Brand: the accent carries every rim, glow, button fill and the ring; the mark appears only in row 15, born from the hook's glowing square (bookend).
- Timing: rows 4, 6, 8 stretch with prompt and page length; rows 10–12 keep ~1.1–2.0 s each; the ring dolly keeps its 40 fr curve; the carousel push into the cut keeps its last 3 fr ramp.

## Pitfalls
- Glow must be layered (hard rim 0.011 S, tight saturated glow, wide soft one, half at 0.28 S, gone by 0.6 S); one box-shadow reads cheap.
- The camera never stops: ring keeps creeping after the dolly, carousel accelerates into the cut. A static hold breaks the film.
- Only one light colour: the glitch magenta/cyan lives only in the first and last 0.5 s.
- None of the 5 cuts land within ±2 fr of a detected beat (beat confidence 0.093): do not rely on beat-snapping for this pacing.

## Missing components
- GlitchPixel: 12 px square that steps colour every 2 fr (magenta → cyan → accent), leads a typing caret and can split into two and fuse into a pill (techniques: typewriter, morph, logo-from-dot)
- ScanBar: horizontal glowing light bar travelling down a page over ~2 s, brightening content under it from 0.3 to 1 opacity, camera follows (techniques: dolly, tilt-plane)
- SegmentedRing: 8 arc segments with 3–4° gaps, 2 px white-blue core + 10–15 px glow, one side brighter, slow spin, dolly radius curve 0.44→0.98 in 40 fr (techniques: dolly, glow)
- DotMatrixEdge: LED dot texture fading in on the left/right frame edges (techniques: glow)

## Proposed terms
- glitch-pixel: a tiny colour-stepping square that types text and becomes the logo, rows 1, 2, 15
- scan-reveal: a light bar sweeps a page and lights its content as it passes, rows 8, 9
- segmented-ring-dolly: camera dollies through a segmented glowing ring framing a claim, row 13
- dot-matrix-edge: LED dot texture on the frame edges, rows 1, 15

## Measurement notes
Resolution: 0.25 s from sheets; ring and carousel numbers from a human frame-by-frame measurement of this reference. Not measurable: overshoot of every spring, staggers under 0.25 s, exact typing cps, push curve shape in rows 3 and 14. Source motion updates every 2nd frame (15 fps). Palette from palettegen on keyframes 6.50, 16.50, 26.50. Boundaries 1.75, 3.25, 7.25, 9.00, 11.75, 13.75, 16.00, 18.25 are visible state changes inside long shots, not cuts. SFX planned by the glue rule, not measured. cut_on_beat = 0/5 cuts within ±2 fr (nearest 2.10 fr at 22.50). Energy build: 1 cut in the first third, 3 in the last.

## Study log
id glow-prompt-build-tour · family product-ui · 30.33 s, 15 rows (5 hard cuts + 9 state splits) · 17 techniques
cut_on_beat 0/5 (false), energy build, no VO, music 126.7 BPM
Not measurable at 0.25 s: spring overshoot, staggers, typing cps; ring/carousel/glow numbers taken from human notes
Proposed terms: glitch-pixel, scan-reveal, segmented-ring-dolly, dot-matrix-edge
Missing components: GlitchPixel, ScanBar, SegmentedRing, DotMatrixEdge
difficulty hard (ui_rebuild > 3 screens), render_cost heavy (motion-blur)
Phase B: not run (study only)
