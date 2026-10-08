# Footage window that morphs through shapes

A small rectangle opens on a flat pastel field and grows into a portrait window onto footage, then bends through a notched bow, a twisting pinwheel and a square before locking into an hourglass. The clip never cuts; the mask is the motion.

Source: https://jitter.video/template/morph-video-mask/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Opening a film on one strong clip without a hard cut
- Silent loop or social teaser where a single shot needs more life
- A mask transition into hero footage or a product video
- Brands with a geometric mark the final shape can echo
Not for: UI or text-heavy content (the window stays under 40 % W and keeps changing shape, detail is unreadable).

## Format
other (1280×800, 16:10) · 5.03 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | flat pale cyan field; a small landscape window onto sky footage with a figure opens at centre, grows into a portrait rectangle | locked frame, footage scale constant | window 0 → ~12 % W at 0.27, portrait 15 % W × 47 % H by 0.77, settled 1.00; springs.layout ~22 fr (overshoot not measurable, ±0.25 s) | morph | swoosh-short |
| 2 | 1.27–2.50 | 38–75 | hook | portrait window bends: short sides bow, concave notches cut into both long sides, a notched bow ~25 % W | locked frame; footage push-in 1.00 → 1.15 | path morph rect → notched bow, springs.ui ~15 fr (±0.25 s); tilt ~5° by 2.27; easings.inOutSine on footage scale | morph | whoosh |
| 3 | 2.50–3.77 | 75–113 | hook | bow twists into a four-lobed pinwheel ~40 % W, folds into a near square ~30 % W, pinches into an hourglass | locked frame; footage push-in to ~1.5 at 2.50, pull-out to 1.0 by 3.77 | pinwheel −20° at 2.50; square −3° at 3.00, +6° at 3.27; twist −25° at 3.50; one state per ~8 fr, springs.ui (±0.25 s); rotation 6 → 15 °/s | morph | whoosh |
| 4 | 3.77–5.03 | 113–151 | hook | upright hourglass window with rounded corners, 24 % W × 47 % H, figure small in the waist | static | settled by 4.00 (springs.ui, ±0.25 s); no motion for the last ~31 fr | hard-cut | tick |

Evidence: row 1 `sheet-01 cells 0–4`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 5–9`, `kf-001.50.jpg`; row 3 `sheet-01 cells 10–15`, `kf-002.50.jpg`, `kf-003.50.jpg`; row 4 `sheet-01 cell 15`, `sheet-02 cells 0–4`, `kf-004.50.jpg`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1 | craft/09-transitions.md (shape mask reveals the footage) |
| morph | 1–3 | craft/09-transitions.md, craft/04-motion.md#springs (springs.ui for morphs) |
| push-in | 2–3 | craft/03-camera-and-staging.md (footage scale inside the mask) |
| pull-out | 3 | craft/03-camera-and-staging.md |

## Look
Palette: #D2FBFD background (pale cyan field), #557BB5 / #5B85C1 / #638CC5 footage sky (the only colour mass), #DCDCD5 subject highlight, #E1FBF6 field tint. Type: none. Treatment: none. Background: flat colour; footage only inside the mask.

## What to adapt
- Copy: none in the reference; an optional line or wordmark can land after the hold (not part of this recipe).
- Brand: brand bg fills the field; the final shape can be the brand mark silhouette; choose footage whose colour contrasts the bg (the reference is cool blue on paler cyan).
- Timing: the open (rows 1) and the hold (row 4) stretch; the morph chain in rows 2–3 keeps ~8 fr per state or it reads as wobble.

## Pitfalls
- The window stays centred and never exceeds ~40 % W; a full-frame open turns it into a plain wipe.
- Morph between shapes with the same vertex count (resample paths) or the edges flip and tear.
- Footage scale must ride inside the mask independently of the mask size; scaling both together reads as a zoom, not a morph.
- A busy clip fights the moving silhouette; one subject on a clean background is what makes the shape readable.

## Missing components
- MorphMask: clip path whose SVG path morphs through an ordered list of shapes (resampled to equal point count, ~64 pts), per-key rotation and size, springs.ui between keys, child footage with its own scale track (techniques: mask-wipe, morph)
- ShapeLibrary: parametric paths for rect, notched bow (concave side notches ~30 % of height), four-lobed pinwheel, rounded hourglass (waist ~25 % of width, corner radius ~4 % H) (techniques: morph)

## Proposed terms
- shape-mask-morph: a clip mask whose outline morphs through several distinct shapes while the footage inside keeps playing, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (sheet cells at 0.27/0.77 offsets per burned-in stamps). Not measurable: spring overshoot on the open and on each morph, exact morph frame counts, exact rotation per state (±5°). Footage scale from keyframes 2.50 vs 4.50 (figure height ~2×). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
id shape-window-morph-reveal · family transitions · 5.03 s, 4 rows, 0 cuts (rows split at visible shape-state changes).
techniques 4 (mask-wipe, morph, push-in, pull-out) · cut_on_beat n/a (silent, 0 cuts) · difficulty easy · render_cost light.
Not measurable at 0.25 s: overshoot, per-morph frame counts, rotation ±5°.
Proposed terms: shape-mask-morph.
Missing components: MorphMask, ShapeLibrary.
Phase B: not run (study only).
