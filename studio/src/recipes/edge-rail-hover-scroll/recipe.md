# Edge tab opens into a scrolling icon rail

A small labelled tab grows out of a panel seam, morphs into a three-icon rail, and a hover dot drives it to scroll one item at a time up and back before it folds away. A loopable nav pattern demo.

Source: https://jitter.video/template/side-rail-menu/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a compact side navigation or quick-switch rail in a web or desktop app
- A loopable UI micro-demo for a landing page, docs or a social post
- Explaining that a rail holds more items than it shows (scroll on hover)
- A silent clip where one interaction pattern is the whole message
Not for: full product walkthroughs or anything that needs a headline, a claim or a CTA; there is no copy beyond one label word.

## Format
other (1322×992, ~4:3) · 6.50 s · 30 fps · mixed · music none, cut_on_beat n/a (0 cuts, no beats) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.93 | 0–28 | hook | split frame, light panel left, warm wallpaper right; dark tab with a vertical one-word label and grid glyph grows from the seam | static | tab scales out from the seam f2 to f6, springs.layout 4 fr (overshoot not measurable); hold to f28 | morph | swoosh-short |
| 2 | 0.93–2.50 | 28–75 | reveal | tab becomes a rail of three outline icons in three hues; hover dot next to the middle icon | static | label crossfades out, icons fade in f28 to f32, tab height +~20 % on springs.layout 4 fr; dot appears f29; hold 43 fr | hard-cut | none |
| 3 | 2.50–3.17 | 75–95 | feature | rail scrolls by one: new icon at the top, bottom icon leaves; dot rides with the column | static | column shifts one slot f76 to f81, springs.ui 5 fr; enter/leave fades 3 fr | hard-cut | tick |
| 4 | 3.17–4.43 | 95–133 | feature | dot climbs to the top icon, rail scrolls one more item in | static | dot up f95 to f100 easings.outQuint 5 fr, then shift f100 to f103 springs.ui 3 fr; hold 30 fr | hard-cut | tick |
| 5 | 4.43–5.20 | 133–156 | feature | dot drops twice, rail scrolls back two items to the first set | static | two steps: dot down 2 to 3 fr (outQuint), then shift 2 to 3 fr (springs.ui) at f133/f136 and f145/f148 | hard-cut | tick |
| 6 | 5.20–6.50 | 156–195 | feature | dot fades, rail folds back into the seam, empty split frame holds (matches frame 0) | static | dot fades f156 to f157; icons shrink + fade f164 to f165; rail collapses f164 to f168, easings.inExpo 4 fr; empty hold 27 fr | hard-cut | swoosh-short |

Evidence per row (no cuts in cuts.json, cuts/ empty; rows split at state changes):
1. sheet-01 cells 0–3 (0.00–0.77), strip at 0.00 s (frames 0–29), kf-000.50
2. sheet-01 cells 4–9 (1.00–2.27), strip at 1.00 s, kf-001.50
3. sheet-01 cells 10–11 (2.50–2.77), strip at 2.50 s frames 75–89
4. sheet-01 cells 12–15 (3.00–3.77), sheet-02 cells 0–1 (4.00–4.27), strips at 2.50 s (frames 90–104) and 4.20 s
5. sheet-02 cells 2–3 (4.50–4.77), sheet-02 cell 4 (5.00), strip at 4.20 s (frames 126–155)
6. sheet-02 cells 5–9 (5.27–6.27), strip at 5.20 s (frames 156–185)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–6 | craft/vocabulary.md#ui; drawn rail, tab and icons |
| cursor-path | 2–5 | craft/vocabulary.md#ui (Cursor); the hover dot is a minimal cursor |
| morph | 1→2 | craft/vocabulary.md#transitions; labelled tab turns into the icon rail |

## Look
Palette: #F2EEFB light panel (bg), #2F1431 deep shadow, #DD5624 wallpaper orange (accent), #CA3C0C, #EE8857, #B42D0B wallpaper tones; rail fill is near-black violet (~#14063A by eye, not caught by palettegen). Type: small geometric sans, sentence case, one word rotated 90 deg, ~4 % H. Treatment: none. Background: left half flat light, right half soft abstract warm gradient wallpaper, static.

## What to adapt
- Copy: one label word in the closed tab (menu name); no other text.
- Brand: rail fill = brand dark surface; icons can take accent hues (one hue per item); light panel = brand bg; wallpaper = brand gradient.
- Timing: holds (rows 2 and 4, empty end hold) stretch freely; keep every motion at 3 to 5 fr and keep dot-leads-then-column order.

## Pitfalls
- All moves are 2 to 5 fr; slowing them to 12+ fr kills the crisp UI feel. The holds do the pacing.
- The dot moves first, then the column shifts (rows 4, 5); moving both together reads as a glitch.
- Last frames must equal frame 0 (empty seam) or the loop jumps.
- Tab grows from the seam with origin at the left edge, not from the centre.

## Missing components
- EdgeRail: dark rail docked to a vertical seam with concave fillet corners where it meets the panel, closed state = labelled tab (vertical text + glyph), open state = column of N visible icons from a longer list, `scrollTo(index, frame)` shifts one slot in 3 to 5 fr on springs.ui with 3 fr fade at the clipped ends, `collapseAt` folds into the seam in 4 fr inExpo (techniques: ui-rebuild, morph)
- HoverDot: 10 px dark dot that glides between rail slots in 2 to 5 fr outQuint and fades in/out in 1 to 2 fr (Cursor exists but draws a system cursor; a dot mode is missing) (techniques: cursor-path)

## Proposed terms
- edge-tab-reveal: a tab grows out of a panel edge or seam from zero width (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- rail-scroll: fixed window of N icons over a longer list, shifted one slot per step with fades at the ends (rows 3–5) (not in craft/vocabulary.md; not used in recipe.json)
- fold-away: UI element collapses back into the edge it came from to close a loop (row 6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips of the seam region at t = 0.00, 1.00, 2.50, 4.20, 5.20 s (source file local per meta.json); sheets at 0.25 s. Not measurable: spring overshoot below ~1 px at strip scale (named without overshoot). Camera: motion.json zoom under 0.3 %/s and pan under 3 px/s, read as static. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on kf-001.50 and kf-003.50 (no cut frames exist).

## Study log
id edge-rail-hover-scroll · family product-ui · 6.50 s, 6 rows (1 shot, split at state changes) · 3 techniques (ui-rebuild, cursor-path, morph) · cut_on_beat n/a (0 cuts, silent) · loopable.
Measured at 1 fr from 30 fps strips; overshoot not measurable. Theme mixed (half light panel, half warm wallpaper).
Catalogue hints device-phone and slide-push not seen: no device frame, no scene push; dropped.
Proposed terms: edge-tab-reveal, rail-scroll, fold-away. Missing components: EdgeRail, HoverDot.
Phase B not run (study only).
