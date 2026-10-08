# Glass slider, petal icon and tinted pane fan

A refractive glass track slides under a fixed call knob over deep blue waves, a hard cut to a pastel petal icon pulling out and turning, then one lilac glass pane splits into a three-pane fan that rotates and merges back.

Source: https://www.raylight.app/templates/OAGcvCiR (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing off a translucent glass material or a new visual style for a UI kit
- A short silent loop for a feed where the material is the message
- Teasing a call, unlock or confirm control before the full product film
- An app icon refresh where the icon itself can carry a shot
Not for: products that need copy or a URL to explain themselves (one 3-word label in the whole film, no end card).

## Format
16:9 · 13.13 s · 30 fps · mixed (dark blue for 4.3 s, light mint for 8.83 s) · no music, BPM none, cut_on_beat 0/1 (no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | white round knob with a green call glyph at centre, glass track to its right with a 3-word instruction clipped by the edge, blue wave backdrop | static (zoom 0.18 %/s) | hold 30 fr | hard-cut | none |
| 2 | 1.00–3.50 | 30–105 | feature | glass track slides left under the fixed knob; leading cap stretches with a rainbow refraction fringe; label scrolls with it | locked on knob; backdrop drifts 19 to 49 px/s @1920 | track travel ~95 % W over 75 fr, easings.inOutCubic (±0.25 s); cap stretch peaks 1.77–2.00, springs.ui (overshoot not measurable) | hard-cut | swoosh-short |
| 3 | 3.50–4.30 | 105–129 | feature | track rests with the knob at its right cap; last word of the label left of the knob | static (zoom 0.13 %/s) | settle hold 24 fr | hard-cut | none |
| 4 | 4.30–8.50 | 129–255 | reveal | close-up of a white rounded icon tile with overlapping translucent pastel petals; pulls out and turns until the tile fits, then leaves | pull-out: tile ~3.0x to ~1.0x over 119 fr (zoom -36 to -20 %/s), rotation ~17–22 deg/s, easings.outQuint (±0.25 s) | tile gone between 8.27 and 8.50, exit ≤ 7 fr (±0.25 s) | hard-cut | hit |
| 5 | 8.50–9.25 | 255–278 | feature | empty mint backdrop, then one lilac glass rounded-rectangle pane at centre, face-on, ~35 % W | static | pane appears 8.50–8.77 (≤ 8 fr), springs.ui (overshoot not measurable) | morph | none |
| 6 | 9.25–10.75 | 278–323 | feature | pane turns ~30 deg about its vertical axis and splits into three stepped panes: lilac front, rose middle, mint back | static | split and turn done by 9.50 (≤ 8 fr), springs.ui (±0.25 s); fan holds 30 fr, drift ~2 % W | hard-cut | pop |
| 7 | 10.75–12.25 | 323–368 | feature | the fan flips through the horizontal to the mirrored side; mint now left, lilac right | static | flip 10.50–11.27 (~23 fr), easings.inOutCubic (±0.25 s); hold 22 fr | morph | none |
| 8 | 12.25–13.13 | 368–394 | feature | panes swing back and collapse into the single lilac pane, which fades out on mint | static | merge by 12.50 (≤ 8 fr), springs.ui (±0.25 s); hold 8 fr; fade to ~10 % by 13.00, easings.inQuad (±0.25 s) | hard-cut | shimmer |

Evidence per row:
1. sheet-01 cells 0–3 (0.00–0.77); motion.json second 0.
2. sheet-01 cells 4–13 (1.00–3.27); motion.json seconds 1–2.
3. sheet-01 cells 14–15, sheet-02 cells 0–1 (3.50–4.27); cuts/cut-004.30.jpg (before side).
4. cuts/cut-004.30.jpg (after side); sheet-02 cells 2–15 (4.50–7.77), sheet-03 cells 0–1 (8.00–8.27); motion.json seconds 4–7.
5. sheet-03 cells 2–5 (8.50–9.27).
6. sheet-03 cells 6–10 (9.50–10.50); keyframes/kf-009.50.jpg.
7. sheet-03 cells 11–15 (10.77–11.77), sheet-04 cell 0 (12.00).
8. sheet-04 cells 1–4 (12.27–13.00).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| liquid-glass | 1–3, 5–8 | craft/06-look.md (real glass: transmission material, chromatic aberration) |
| pull-out | 4 | craft/vocabulary.md#camera, craft/04-motion.md#easings |
| morph | 5→6, 7→8 (pane splits into three, fan collapses into one) | craft/09-transitions.md |
| hard-cut | 3→4, 4→5 | craft/09-transitions.md |

## Look
Palette: #D5EBED mint background (rows 5–8), #FFFFFF knob and icon tile, #CCB8EE lilac pane, #002450 deep navy wave base (rows 1–3), #1A82CF wave blue, #E881C3 pink petal accent. Type: regular grotesk, lowercase, normal tracking, ~6 % of frame height, white at ~70 % opacity inside the track. Treatment: liquid-glass. Background: rows 1–3 rendered blue wave shapes (soft 3D folds), row 4 white with petals, rows 5–8 flat mint.

## What to adapt
- Copy: 1 line, 3 words, an instruction for the control (slide, unlock, confirm).
- Brand: knob glyph and track label carry the action; the icon in row 4 is the brand's own app icon or mark; pane tints can be three brand colours at low saturation.
- Timing: row 2 (the slide) and row 4 (the pull-out) can stretch by up to 30 %; the pane split and merge (≤ 8 fr each) must stay short or the glass reads as plastic.

## Pitfalls
- The knob never moves: only the glass track slides under it. Moving the knob turns it into a generic slider demo.
- The refraction fringe only appears on the moving cap (1.50–2.77); a static glass track with blur alone looks like a frosted card.
- Panes are near-equal low-contrast tints on a light mint: keep pane opacity high enough (the front pane is ~#CCB8EE on #D5EBED) or they disappear in compression.
- Row 5 opens on an empty frame for ≥ 1 cell (8.50): keep that beat of nothing, it separates the icon from the panes.

## Missing components
- GlassTrackSlider: capsule track 1.1 W x 0.27 H with transmission glass, fixed round knob 0.17 H at centre, track x animated over a backdrop, cap stretch up to ~15 % on velocity, chromatic fringe 2–4 px on the leading edge (techniques: liquid-glass).
- GlassPaneFan: 1 to 3 rounded-rectangle glass panes (radius ~18 % of height) that split along z with a 30 deg Y turn, flip through the X axis and merge back; per-pane tint and transmission (techniques: liquid-glass, morph).
- WaveBackdrop: soft 3D blue fold shapes, slow drift (no studio equivalent; DesktopBackdrop blobs are flat).

## Proposed terms
- glass-slider: a glass track sliding under a fixed control knob, refraction on the moving cap (rows 1–3). Not in craft/vocabulary.md; not used in recipe.json.
- pane-fan: one glass pane splitting into a stepped stack of tinted panes in depth, then merging back (rows 5–8). Not in craft/vocabulary.md; not used in recipe.json.
- object-flip: a 3D object stack flips through an axis to its mirrored side while the camera holds (row 7). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip extracted). Not measurable: overshoot on the cap stretch and pane split, exact entrance frames under 8 fr, exact easing curves (named by shape only). One hard cut at 4.30 (frame 129); a near miss at 8.47 (score 6.6) matches the icon exit and the empty frame, treated as a row boundary at 8.50. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats in audio.json). Palette from keyframes kf-001.50, kf-006.50, kf-010.50 with palettegen, near-duplicates merged.

## Study log
id glass-slider-pane-fan · family product-ui · 13.13 s, 8 rows, 1 hard cut at 4.30.
Techniques: 4 (liquid-glass, pull-out, morph, hard-cut). cut_on_beat: false, 0/1 (silent, no beats).
Not measurable at 0.25 s: overshoot, sub-8-frame entrances, cap stretch peak frame.
Proposed terms: glass-slider, pane-fan, object-flip.
Missing components: GlassTrackSlider, GlassPaneFan, WaveBackdrop.
Difficulty hard (WebGL glass, 3D panes), render_cost heavy (liquid-glass).
Phase B: not run.
