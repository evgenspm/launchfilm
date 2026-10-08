# Self-intro card: name, role slot, shape cover

A tiny greeting and name on light grey, a shape that slides in and swells to cover the frame, one huge bold word that shrinks to line size on blue, a role word that rolls through four titles, then a social handle.

Source: https://www.raylight.app/templates/AhM3E4dX (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- a personal or freelancer intro for a portfolio, profile or reel opener
- an 8 s card that lists several roles or services in one slot
- a calm, type-only opener with one colour flip in the middle
Not for: product launches that need UI, or anyone with a single role (the slot roll is the whole middle).

## Format
16:9 · 8.08 s · 30 fps · mixed (light grey plate / blue gradient plate) · music 77.1 BPM, cut_on_beat 0/2 · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.63 | 0–79 | hook | light grey: 1-word greeting, replaced by a 2-word intro (lead word + bold name); blue 5-point shape slides in from the left and swells over the frame | static (shape moves only) | greeting f0–f20; lead word cuts in f21; name drops ~4 px with a fade, easings.outExpo 3 fr (f24–f27); shape enters f60 at the left edge, slides right to sit left of the line by f65, easings.outExpo; holds to f74; swells f74–f80 from ~3 % W to full cover, easings.inExpo 6 fr | hard-cut | whoosh (planned) |
| 2 | 2.63–6.53 | 79–196 | feature | blue diagonal gradient: one bold word at ~75 % W shrinks to line size, swaps to a regular word, a second word joins and rolls through 4 role titles; small plane icon flies across | static plate; the type scales | bold word holds f81–f90; shrinks to ~25 % W f90–f102, easings.outExpo 12 fr; holds to f109; 2 fr crossfade to the regular word; second word at f140, line re-centres ~6 fr springs.ui (overshoot not measurable); slot rolls at f155, f170, f185 (period 15 fr, 3 fr roll up + fade); icon enters bottom-left f178, straight up-right diagonal through the line, exits top-right ~f192, easings.linear | hard-cut | tick per roll (planned), swoosh-short on the icon (planned) |
| 3 | 6.53–8.08 | 196–242 | cta | light grey: small monospace handle in navy, replaced by a second handle | static | first handle cuts in with the cut; f201–f205 crossfade with a ~3 px upward drift, easings.inOutSine ~4 fr; holds f205–f242 | end | none |
Evidence: row 1 sheet-01 cells 0–10, 30 fps strips at 0.5 s and 2.0 s, cuts/cut-002.63.jpg; row 2 sheet-01 cells 11–15 and sheet-02 cells 0–10, strips at 2.6, 3.2, 4.6, 5.6, 6.0 s, keyframes kf-003.50, kf-004.50; row 3 sheet-02 cells 11–15, cuts/cut-006.53.jpg, strip at 6.5 s, kf-007.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1 (shape swells into a full-frame cover that becomes the next plate) | craft/09-transitions.md |
| fit-word | 2 (one bold word at ~75 % W on the cut) | craft/05-typography.md |
| word-swap | 2 (role slot rolls through 4 words, line re-flows) | craft/05-typography.md |
| hard-cut | 1→2, 2→3 (cuts.json 2.63, 6.53) | craft/09-transitions.md |

## Look
Palette: #EBEBEB light plate, #111111 intro text, #2147D6 / #1D3AC8 blue gradient pair (top-left brighter, bottom-right deeper, diagonal), #B4C5E9 light text on blue, #1E226A navy handle. Type: grotesk, sentence case; small medium-weight intro ~2.5 % H; bold word ~75 % W shrinking to ~25 % W; regular-weight role line ~6 % H; monospace handle ~2.5 % H. Treatment: none. Background: flat grey, then diagonal linear gradient, then flat grey.

## What to adapt
- Copy: 1-word greeting; lead word + name (2 words); 1 bold word for the cover; 1 prefix word + 4 role words (≤ 10 letters each); 2 handles.
- Brand: the blue carries the shape, the gradient plate and the icon; navy for the handle. Swap both for the brand accent pair.
- Timing: keep the 15 fr slot period and the 6 fr swell; the greeting and the closing hold may stretch.

## Pitfalls
- The shape must keep its swell short (6 fr, accelerating): a slow grow reads as a zoom, not a cover.
- The intro type is tiny (~2.5 % H); it works only because the grey frame is empty. Do not add anything else to row 1.
- Roles longer than ~10 letters push the re-centred line off balance at this size.

## Missing components
- StarShape: rounded 5-point shape, slide-in from the frame edge then inExpo swell to cover the frame in 6 fr (techniques: mask-wipe)
- GradientPlate: diagonal two-stop linear gradient background from brand colours (techniques: none)
- IconFlyby: small glyph on a straight diagonal path across the frame in ~14 fr, linear (techniques: proposed icon-flyby)

## Proposed terms
- icon-flyby: a small glyph crosses the frame on a straight diagonal path over the text, decorative, ~14 fr (row 2)
- scale-settle: a frame-filling word shrinks to normal line size in place, outExpo ~12 fr (row 2)
(not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.5, 2.0, 2.6, 3.2, 4.6, 5.6, 6.0, 6.5 s; 0.25 s elsewhere. Not measurable: spring overshoot on the re-centre (too small), exact easing curves (named by shape). The motion.json zoom of -38.8 %/s in 3–4 s is the word shrink, not a camera move. Theme `mixed`: grey plate ~4.2 s, blue plate ~3.9 s. SFX planned by the glue rule, not measured. cut_on_beat = 0/2 cuts within ±2 fr.

## Study log
- id intro-name-role-slot-cover · family logo-brand · 8.08 s · 3 rows (3 shots, none > 4 s)
- techniques 4 (fit-word, word-swap, mask-wipe, hard-cut) · difficulty easy · render_cost light
- cut_on_beat false (0/2) · music calm 77.1 BPM · no VO · SFX all planned
- measured with 30 fps strips; overshoot not measurable
- proposed terms: icon-flyby, scale-settle
- missing components: StarShape, GradientPlate, IconFlyby
- phase B: not run
