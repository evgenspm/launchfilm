# Sketch-to-photo divider glide

A line-drawing layer and the finished photo of the same scene share one frame; a thin divider with a pill handle glides left, rests, comes back to centre, then returns home, so the viewer compares plan and result in one shot.

Source: https://jitter.video/template/before-after-slider/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a transformation: plan vs result, draft vs final, raw vs edited
- Interior, renovation, retouch or design-tool reels where both states share one framing
- A square or vertical feed loop with no cuts and a short two-line promise
- Proof beat inside a longer film: the before/after carries the claim
Not for: products whose before and after cannot be shot or drawn in the same framing; stories that need more than one claim.

## Format
1:1 · 10 s · 30 fps · light · music none (silent source), cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
Divider position x is given as a share of frame width (0 = left edge).

| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | orange line drawing of a room over 87 % of the width, photo sliver right of a white divider with pill handle; 2-line headline, 7 words, names the transformation | static | headline per-word fade left to right, complete by f15, easings.outExpo (±0.25 s); divider creeps 0.87→0.83, easings.inOutSine 30 fr | mask-wipe | none |
| 2 | 1.00–3.00 | 30–90 | proof | divider glides left revealing the photo of the same room; headline and mark clipped by the divider | static | x 0.83→0.18 (0.69 @1.27, 0.46 @1.50, 0.33 @1.77, 0.28 @2.00, 0.18 @2.77), springs.heavy ~50 fr, overshoot not measurable | mask-wipe | swoosh-short |
| 3 | 3.00–4.50 | 90–135 | proof | rest on the photo, narrow orange strip with clipped headline and mark at left | static | x settles 0.18→0.16–0.17, no visible rebound (±0.25 s) | mask-wipe | tick |
| 4 | 4.50–6.00 | 135–180 | proof | divider glides back right, drawing returns over the left half | static | x 0.17→0.48 (0.25 @5.00, 0.37 @5.27, 0.42 @5.50, 0.45 @5.77), springs.heavy ~45 fr | mask-wipe | swoosh-short |
| 5 | 6.00–7.50 | 180–225 | proof | split near centre, drawing left, photo right, headline cut mid-word | static | x creeps 0.48→0.52, easings.linear 45 fr (±0.25 s) | mask-wipe | none |
| 6 | 7.50–9.00 | 225–270 | proof | divider glides right, drawing covers the room again, full headline back | static | x 0.52→0.85 (0.59 @7.77, 0.72 @8.00, 0.78 @8.27, 0.81 @8.50), springs.heavy ~45 fr | mask-wipe | swoosh-short |
| 7 | 9.00–10.00 | 270–300 | proof | hold on the opening composition | static | x settles 0.85→0.86; nothing else moves | hard-cut | tick |

Evidence per row: 1 `sheet-01 cells 0–3`; 2 `sheet-01 cells 4–11`; 3 `sheet-01 cells 12–15`, `sheet-02 cells 0–1`; 4 `sheet-02 cells 2–7`; 5 `sheet-02 cells 8–13`; 6 `sheet-02 cells 13–15`, `sheet-03 cells 0–3`; 7 `sheet-03 cells 4–7`. No cut frames (cuts.json empty); keyframes kf-000.50, kf-004.50, kf-009.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1–6 (vertical edge mask between the two layers, driven back and forth) | craft/09-transitions.md |
| word-reveal | 1 (headline words fade in left to right) | craft/05-typography.md |

## Look
Palette: `#E0972D` before-layer orange (bg), `#D7DCCA` photo wall, `#65421D` line-drawing strokes, `#3E2B16` photo wood, `#C6A676` photo floor, `#B8B8A5` photo grey. Headline, divider and mark are white. Type: regular text serif, sentence case, white, ~5.5 % H per line, top-left, 2 lines. Treatment: none. Background: still photo vs flat tint with traced line art.

## What to adapt
- Copy: one 2-line headline, 6–8 words, the promise of the transformation; sits on the before layer only.
- Brand: the before-layer tint carries the brand accent; the mark sits bottom-left on the before layer; divider and handle in fg white.
- Timing: holds (rows 3, 5, 7) can stretch; glides keep 45–50 fr each, starting f30, f135, f225.

## Pitfalls
- Both images must align 1:1 (trace the drawing from the photo), or the comparison breaks at the divider.
- Text and mark belong to the before layer and must be clipped with it; floating them above both layers kills the reveal.
- The divider never reaches either edge (min 0.16, max 0.87 W): both states stay visible at all times.

## Missing components
- CompareSlider: two stacked layers, the top one clipped by a vertical edge at x(t); x keyframes as share of width, each glide on a named spring (heavy, ~45–50 fr); 2 px white divider line, pill handle ~0.8 % W × 4 % H at 45 % H; children per layer (techniques: mask-wipe)

## Proposed terms
- divider-glide: a two-state compare slider; a vertical divider moves across one framing to show before vs after, rows 1–7 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at s.00/.27/.50/.77); divider x read from cell positions, ±1 % W. Not measurable: overshoot of the glides, exact headline word stagger, the 0.2 %/s zoom motion.json reports in second 0 (not visible). SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts (no cuts, no beats). Palette from keyframes (no cut frames).

## Study log
id sketch-photo-divider-glide · family transitions · 10.00 s, 1:1, 30 fps, 7 rows (one shot, 0 cuts; rows split at divider speed changes).
Techniques 2 (mask-wipe, word-reveal); difficulty easy, render_cost light.
Audio: silent, no VO, no music; cut_on_beat n/a (0/0); sfx planned by the glue rule.
Not measurable at 0.25 s: glide overshoot, word stagger; divider x ±1 % W.
Proposed terms: divider-glide. Missing components: CompareSlider.
Phase B: not run (study only).
