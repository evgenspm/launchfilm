# Round button opens into a search field

A round magnifier button on a violet gradient is tapped, stretches right into a wide field while its glyph flips into a caret, idles with a blinking caret, then folds back into the button. A seamless 6 s loop for search entry points.

Source: https://jitter.video/template/search-bar-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Introducing a search or command input before showing results
- A looping hero or social clip for a product whose entry point is one field
- An intro beat in a longer UI film, followed by a typing shot
- Silent autoplay where one tidy UI gesture has to carry the frame
Not for: showing what the search finds (no typing, no results here); films that need a story or a claim.

## Format
other (1322×992, 4:3) · 6 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | round lilac button with a magnifier on a violet gradient; tapped, stretches right into a wide field past the frame edge | static (height constant, 29 % H) | left edge pinned at 39 % W; width grows right, springs.ui ~15 fr (±0.25 s, overshoot not measurable); corners pill to ~17 % of height by 1.00; glyph flips on its vertical axis into a caret by 0.77; placeholder fades in 0.27–0.50; touch dot fades out by 1.00 | hard-cut | ui-confirm |
| 2 | 1.00–4.00 | 30–120 | hook | open field, one-word placeholder, blinking caret; nothing typed | static | caret blink period 30 fr (±0.25 s): on at x.00 and x.77, dim x.27, off x.50; soft fade | hard-cut | none |
| 3 | 4.00–4.77 | 120–143 | hook | field folds back left into the round button; caret flips back into the magnifier | static | caret tilts at 4.00, magnifier by 4.27; short pill at 4.50, circle at 4.77, springs.ui ~23 fr (±0.25 s, overshoot not measurable); placeholder fades and clips at the right edge | hard-cut | swoosh-short |
| 4 | 4.77–6.00 | 143–180 | hook | round button alone, identical to frame 0 | static | hold 37 fr, no movement; matches frame 0 for the loop | hard-cut | tick |

Evidence per row: 1 = sheet-01 cells 0–4 and keyframes kf-000.50; 2 = sheet-01 cells 4–15 and kf-001.50, kf-002.50, kf-003.50; 3 = sheet-02 cells 0–3 and kf-004.50; 4 = sheet-02 cells 3–7 and kf-005.50. No cut frames (cuts.json is empty).

All rows are `hook` by rule: the film has one shot starting at 0, no product name, logo, URL or proof, so rule "previous row's beat" carries `hook` through. Rows split at the visible state changes (1.00 field open, 4.00 collapse starts, 4.77 circle settled) because the single shot is longer than 4 s.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1, 3 | craft/09-transitions.md (button ↔ field shape change, PillMorph) |
| ui-rebuild | 1–4 | craft/13-ui-recreation.md (button and field drawn in React) |

## Look
Palette: #824DE9 gradient top (background), #EBE2FD field and button fill (foreground surface), #976FE9 / #AF94E4 / #BFABE6 gradient mid to bottom. Glyph and caret near-black violet; placeholder muted grey-violet (thin strokes, below palettegen resolution). Type: light grotesk placeholder, sentence case, normal tracking, cap height ~11 % H. Treatment: none. Background: vertical linear gradient, saturated violet at the top to pale lilac at the bottom, faint banding.

## What to adapt
- Copy: one placeholder, 1–2 words, the field's job (what you search for)
- Brand: gradient from brand bg to accent; field in the brand surface colour; glyph and caret in fg
- Timing: the 3.00 s idle (row 2) stretches or shrinks freely in whole blink periods (30 fr); open (~15 fr) and close (~23 fr) keep their lengths; the end hold keeps the loop seamless

## Pitfalls
- The field overflows the right edge on purpose; centring the open field kills the sense of growth from the button.
- The glyph to caret change is a flip on the vertical axis, not a crossfade: at 0.50 and 4.00 the glyph is edge-on.
- No typing happens; adding typing makes this a different recipe (use a typewriter shot after row 2).
- Caret blink is a fade (dim state at x.27), a hard on/off toggle looks cheaper.

## Missing components
- SearchFieldExpand: circle button (height h) that springs to a field of width ~2.3 h anchored on its left edge, glyph flips (scaleX 1 → 0 → 1) into a caret, placeholder fades in, reverse on close; props at, closeAt, placeholder, icon (techniques: morph, ui-rebuild)
- TouchDot: translucent circle ~0.55 h at the tap point, fades out over ~25 fr (techniques: none in vocabulary)
- GradientBackdrop: vertical two-stop linear gradient, top brand bg, bottom tint; BrandBackdrop only has a radial glow

## Proposed terms
- caret-blink: idle text caret blinking with a soft fade, 30 fr period, rows 2 (not in craft/vocabulary.md; not used in recipe.json)
- touch-dot: translucent finger-tap circle marking a touch without a cursor, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- glyph-flip: icon flips on its vertical axis into another glyph, rows 1 and 3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted; the source file is not used). Not measurable: spring overshoot on open and close, exact open/close frame counts (±0.25 s), the tap frame, caret blink curve. motion.json zoom values in seconds 0 and 4–5 come from the field width change, not a camera. Palette from palettegen on keyframes kf-000.50, kf-002.50, kf-005.50 (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id search-field-expand-loop · family product-ui · 6.00 s, 4 rows, 0 cuts, loopable
- techniques: 2 (morph, ui-rebuild) · cut_on_beat: n/a, 0/0 (silent, no music)
- not measurable at 0.25 s: spring overshoot, open ~15 fr / close ~23 fr, tap frame, blink curve
- catalogue hint (typing, results, phone, cursor) not seen on the sheets; not used
- proposed terms: caret-blink, touch-dot, glyph-flip
- missing components: SearchFieldExpand, TouchDot, GradientBackdrop
- phase B: not run (study only)
