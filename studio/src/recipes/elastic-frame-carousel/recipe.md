# Elastic frame carousel

Six stills cycle in a silent vertical loop. Each outgoing frame compresses toward the top edge while the next expands upward, turning every change into the subject.

Source: https://jitter.video/template/image-stretch-transition/ (link only; the original is not redistributed) · studied 2026-10-07 · status: built

## When to use

- A short silent reel needs motion from a set of still images.
- The scene changes should carry more energy than the individual frames.
- A looping editorial or product-image carousel needs one repeatable transition.

Not for: footage whose subjects cannot tolerate strong vertical distortion, or sequences that need readable text during the change.

## Format

4:5 · 7.50 s · 30 fps · mixed · music absent, cut_on_beat 0/0 · VO no

## Beat sheet

| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.30 | 0–9 | hook | first monochrome editorial still; two small corner labels | static | still hold for 9 fr | slide-push | none |
| 2 | 0.30–0.77 | 9–23 | hook | first still compresses toward the top; exterior still expands from below | fixed frame; layers deform vertically | opposing height scales, `easings.inOutSine` over 14 fr | slide-push | planned whoosh |
| 3 | 0.77–1.80 | 23–54 | hook | exterior architecture still; recurring corner labels | static | still hold for 31 fr | slide-push | none |
| 4 | 1.80–2.23 | 54–67 | hook | exterior compresses upward; dark product arrangement expands from below | fixed frame; layers deform vertically | opposing height scales, `easings.inOutSine` over 13 fr | slide-push | planned whoosh |
| 5 | 2.23–3.27 | 67–98 | hook | dark still life of neutral containers; recurring corner labels | static | still hold for 31 fr | slide-push | none |
| 6 | 3.27–3.83 | 98–115 | hook | still life compresses upward; green portrait expands from below | fixed frame; layers deform vertically | opposing height scales, `easings.inOutSine` over 17 fr | slide-push | planned whoosh |
| 7 | 3.83–4.70 | 115–141 | hook | green-background portrait; recurring corner labels | static | still hold for 26 fr | slide-push | none |
| 8 | 4.70–5.30 | 141–159 | hook | portrait compresses upward; light furniture still expands from below | fixed frame; layers deform vertically | opposing height scales, `easings.inOutSine` over 18 fr | slide-push | planned whoosh |
| 9 | 5.30–6.27 | 159–188 | hook | light furniture still; recurring corner labels | static | still hold for 29 fr | slide-push | none |
| 10 | 6.27–6.77 | 188–203 | hook | furniture compresses upward; first monochrome still returns from below | fixed frame; layers deform vertically | opposing height scales, `easings.inOutSine` over 15 fr | slide-push | planned whoosh |
| 11 | 6.77–7.50 | 203–225 | hook | first monochrome still holds to close the loop | static | still hold for 22 fr | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–1`; row 2 `sheet-01 cells 1–3`, `cuts/cut-000.30.jpg`; row 3 `sheet-01 cells 3–7`; row 4 `sheet-01 cells 7–9`, `cuts/cut-001.80.jpg`; row 5 `sheet-01 cells 9–13`; row 6 `sheet-01 cells 13–15`, `sheet-02 cell 0`, `cuts/cut-003.27.jpg`; row 7 `sheet-02 cells 0–3`; row 8 `sheet-02 cells 3–5`, `cuts/cut-004.70.jpg`; row 9 `sheet-02 cells 5–9`; row 10 `sheet-02 cells 9–11`, `cuts/cut-006.27.jpg`; row 11 `sheet-02 cells 11–13`.

## Techniques → craft

| id | rows | where the law is |
|---|---|---|
| slide-push | 1–10 | `craft/09-transitions.md#slide-push` |

## Look

Palette: near-black `#0E0D0B` background, warm off-white `#D8D3C7`, green `#1D7734`, muted teal `#6F7E74`, brown `#816F5B`, grey `#BEBEBD`. Type: small uppercase serif corner labels, regular weight, wide tracking, roughly 2% of frame height. Treatment: none. Background: full-frame still media.

## What to adapt

- Copy: two optional short corner labels, each at most two words; keep them in the safe area and unchanged through all six stills.
- Brand: choose six owned stills with strong adjacent contrast; the labels use the brand foreground colour and no logo is required.
- Timing: keep the five changes between 13 and 18 fr at 30 fps; holds may stretch, but the first and last still must match for the loop.

## Pitfalls

- A crop or ordinary vertical translation loses the effect. Both frames change height around the moving boundary.
- The subject is visibly distorted during each 13–18 fr change; keep faces, UI and text out of the boundary when possible.
- Direction stays bottom-to-top for all five changes. Reversing one breaks the mechanical cadence.
- The final still must match the opening still before the last 22 fr hold, or the loop will jump.

## Missing components

- None. Phase B added local `ElasticFramePush`: two full-frame layers share an upward-moving boundary while the outgoing layer compresses toward the top and the incoming layer expands from the bottom; it accepts 13–18 fr duration and `easings.inOutSine` (technique: `slide-push`).

## Proposed terms

- `elastic-frame-push`: a whole-frame transition where the outgoing picture compresses toward one edge as the incoming picture expands from the opposite edge, without preserving either picture's aspect ratio; rows 2, 4, 6, 8 and 10.

## Measurement notes

Resolution: 0.25 s from sheets, with transition bounds measured to source frames in `cuts.json`. Not measurable: the exact easing curve, sub-frame boundary blur and any overshoot. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr because the reference has no audio or beat grid. Palette colours come from the first, middle and last cut composites using six-colour palette generation; near-duplicates were merged and ordered by role.

## Build comparison

Iteration 1 passed. The schedule uses the measured structure directly, so every coded boundary is identical to phase A. The sheet detector marks the first four visual onsets 3 fr later because the first stretched pixels are low-area changes; the actual layer deformation begins on the measured frame.

| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|
| 1 | 0.00–0.30 | 0.00–0.30 | 0 / 0 | full-frame dark editorial panel, fixed edge labels | static hold | none |
| 2 | 0.30–0.77 | 0.30–0.77 | 0 / 0 | two full-frame layers share one horizontal edge | bottom-to-top elastic `slide-push`, 14 fr | none |
| 3 | 0.77–1.80 | 0.77–1.80 | 0 / 0 | full-frame contrasting panel, fixed edge labels | static hold | none |
| 4 | 1.80–2.23 | 1.80–2.23 | 0 / 0 | outgoing above, incoming below | bottom-to-top elastic `slide-push`, 13 fr | none |
| 5 | 2.23–3.27 | 2.23–3.27 | 0 / 0 | dark full-frame still-life composition | static hold | none |
| 6 | 3.27–3.83 | 3.27–3.83 | 0 / 0 | outgoing above, incoming below | bottom-to-top elastic `slide-push`, 17 fr | none |
| 7 | 3.83–4.70 | 3.83–4.70 | 0 / 0 | saturated full-frame portrait-like composition | static hold | none |
| 8 | 4.70–5.30 | 4.70–5.30 | 0 / 0 | outgoing above, incoming below | bottom-to-top elastic `slide-push`, 18 fr | none |
| 9 | 5.30–6.27 | 5.30–6.27 | 0 / 0 | light full-frame object composition | static hold | none |
| 10 | 6.27–6.77 | 6.27–6.77 | 0 / 0 | light panel compresses; opening panel returns | bottom-to-top elastic `slide-push`, 15 fr | none |
| 11 | 6.77–7.50 | 6.77–7.50 | 0 / 0 | opening panel returns for the loop | static hold | none |

The shot count is 11/11, the mixed light/dark theme and palette roles match, labels keep the reference's small regular uppercase treatment, and transition speed is within one 4 fps cell. The demo deliberately uses original procedural Lumenfold artwork rather than the reference photographs.

## Study log

id: elastic-frame-carousel
family: transitions
duration: 7.50 s at 30 fps, 11 contiguous rows
techniques: 1 vocabulary id (`slide-push`)
cut_on_beat: false, 0/0 because the reference is silent
measurement limit: exact easing and edge blur unavailable at 0.25 s sheet resolution
proposed term: `elastic-frame-push`
missing components: none; local `ElasticFramePush` added in the recipe folder
phase B: built in 1 iteration; typecheck clean; composition 1080×1350, 30 fps, 225 fr
gate: schema valid; render 7.50 s (ratio 1.00); 2 comparison sheets; frame-0 poster visible
remaining difference: original procedural demo artwork replaces the reference photographs; transition geometry and cadence match
