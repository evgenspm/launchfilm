# Bento pull-out: hero tile to full claim grid

One hero tile fades up close on a white frame, then the camera pulls out while eight claim tiles slide inward and lock into a bento grid around it. The calm settle and long hold let a dense wall of proof points read as one statement.

Source: https://jitter.video/template/sliding-blocks-apple-event/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A launch slide that must show many short proof points at once (materials, specs, certifications, numbers).
- The closing summary frame of a longer product film.
- Silent autoplay: one held frame carries the message, no VO needed.
Not for: products with fewer than about 6 distinct claims (the grid looks empty), or stories that need sequence and cause.

## Format
16:9 · 4.00 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | white frame, then one wide hero tile: product photo left, wordmark and 2-line claim right | pull-out, hero 62 % W at 0.50 s to 49 % W at rest (~1.27 to 1.00), -24.9 %/s | white until 0.27 s; hero fades in ~15 fr (±0.25 s), easings.outQuint; neighbours peek at the edges at 0.77 s | hard-cut | reverse-cymbal |
| 2 | 1.00–2.00 | 30–60 | proof | eight claim tiles (stats, struck-out materials list, box photo, circuit photo) close in around the hero | pull-out decelerates, -6.3 %/s, settles ~1.77 s (±0.25 s), springs.cameraOut (overshoot not measurable) | tiles slide inward from past the frame edge and fade in, stagger ~3-4 fr by distance (±0.25 s), springs.ui (overshoot not measurable) | hard-cut | tick |
| 3 | 2.00–4.00 | 60–120 | proof | full bento of nine rounded tiles on white, dark photo tile at the right | static (0.2 %/s) | hold 60 fr, nothing moves | hard-cut | none |

Evidence: row 1 `sheet-01 cells 0–3`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 4–7`, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 8–15`, `keyframes/kf-002.50.jpg`, `kf-003.50.jpg`. No `cuts/*.jpg` exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| card-grid | 2 | craft/vocabulary.md (card-grid), craft/04-motion.md#springs |
| pull-out | 1–2 | craft/03-camera-and-staging.md, craft/vocabulary.md (pull-out) |

## Look
Palette: #FCFDFC background, #0E0E0E foreground text, #AED0B4 accent (sampled; the true marker green is more saturated, desaturated by palettegen), #2D2F2F dark photo tile, #636262 / #949494 greys (captions, remote body). Type: bold grotesk, lowercase and sentence case, tight tracking; hero claim 2 lines ~6 % H, tile headlines 7-9 % H, captions ~1.5 % H; marker-style hand lettering on two tiles. Treatment: none. Background: flat white, tiles flat light grey with ~2 % W corner radius, ~1 % W gutters.

## What to adapt
- Copy: 1 hero claim (2 lines, ≤ 4 words each) + 8 tiles, each a headline ≤ 3 words or a number plus a caption ≤ 10 words.
- Brand: accent carries the hand-drawn tiles and strike-throughs; logo sits in the hero tile above the claim.
- Timing: rows 1–2 keep their frame counts (the build is the motion); the hold (row 3) can stretch to 3-4 s for reading.

## Pitfalls
- Half the runtime is a static hold; in a longer film keep it as the last frame or add a slow push-in, else it reads as a freeze.
- Tiles must arrive from outside inward and never cross the hero; the hero stays the anchor of the pull-out.
- With nine tiles, captions at 1.5 % H are unreadable on phones; 9:16 needs fewer tiles or larger captions.

## Missing components
- BentoGrid: mixed-span tile layout (9 slots: hero 2x2 centre, 1x2 columns, 1x1 rows) with per-tile slide-in from the nearest frame edge, distance-ordered stagger 3 fr, springs.ui, per-aspect recompose (techniques: card-grid, pull-out)

## Proposed terms
- bento-assemble: tiles of mixed size converge into a grid while the camera pulls out from one hero tile (rows 1–2) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, 1 fps full-res keyframes; no 30 fps strip extracted. Not measurable: exact hero fade length, tile stagger, overshoot of tiles and camera. Scale from hero tile width in keyframes (62 % W at 0.50 s, 49 % W at 2.50 s) and motion.json zoom. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id bento-pullout-grid, family launch-film, 4.00 s, 3 rows (1 shot, split at state changes 1.00 and 2.00).
- techniques 2 (card-grid, pull-out); difficulty easy, render_cost light.
- cut_on_beat n/a: silent, 0 cuts, no beats.
- Not measurable at 0.25 s: hero fade frames, tile stagger, spring overshoot.
- Proposed terms: bento-assemble.
- Missing components: BentoGrid.
- Phase B: not run (study only).
