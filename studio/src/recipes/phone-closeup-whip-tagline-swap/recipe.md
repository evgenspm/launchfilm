# Phone close-up whip tour with tagline swap

One phone on a bright two-tone gradient: it rises in, then the camera punches, tilts and whips across its home screen in tight close-ups. It ends wide with a tagline the phone itself wipes into the call to action.

Source: https://www.raylight.app/templates/xk3mqIsd (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile app with one strong home screen (header, actions, balance or status card, a list) worth touring up close
- Silent social autoplay: camera energy carries the film, no VO
- A short app teaser that ends on one tagline and one try-it line
- Brands with a loud single accent colour that can fill the background
Not for: products whose value lives across many screens or flows; data films that need a real chart (none is drawn here).

## Format
16:9 · 21.8 s · 30 fps · light · music none (silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | empty lime-to-white gradient, one phone rises from below to centre (~38 % H) | static, ~1 % creep | springs.heavy ~22 fr (±0.25 s), hold 30 fr | continuous | swoosh-short |
| 2 | 2.00–3.25 | 60–98 | feature | punch to a tilted close-up of the screen header: greeting, three pills, account chip | zoom-tier full → detail ~8 fr, roll ~-12°, then push-in ~1.00→1.08 | easings.inExpo into springs.cameraIn, blur on punch | continuous | whoosh |
| 3 | 3.25–6.00 | 98–180 | feature | same header; phone rolls to the other lean, then straightens and recedes | tilt-plane roll ~-12° → ~+8°, straighten by 5.27 s; pull-out ~1.10→1.00 | easings.inOutCubic ~22 fr, springs.ui ~15 fr (±0.25 s) | continuous | whoosh |
| 4 | 6.00–7.00 | 180–210 | feature | vertical whip: phone drops out, one empty cell, re-enters from top blurred | whip-pan vertical ~460 px/s @1920 | inExpo 8 fr out, outExpo 8 fr in (±0.25 s) | continuous | whoosh |
| 5 | 7.00–9.00 | 210–270 | feature | medium shot of upper phone: header, pills, balance card, add tile | pull-out ~1.08→1.00, then hold | springs.cameraOut ~24 fr (±0.25 s) | continuous | tick |
| 6 | 9.00–10.25 | 270–308 | feature | punch-in on the balance card (flag, digits, amount) | zoom-tier region → element ~1.0→1.6 in ~8 fr, then decaying push | springs.cameraIn (overshoot not measurable) | continuous | whoosh |
| 7 | 10.25–11.75 | 308–353 | feature | lateral whip right, close-up of greeting, pills, card | whip-pan right ~450 px/s @1920, settle 10.77 s, push-in ~1.05 | easings.inOutCubic ~15 fr + blur, springs.ui settle | continuous | whoosh |
| 8 | 11.75–12.17 | 353–365 | feature | hard roll and dive into the currency flag, extreme blur | speed-ramp roll ~+20° + push to detail | easings.inExpo ~12 fr (±0.25 s) | hard-cut | hit |
| 9 | 12.17–14.00 | 365–420 | feature | phone arrives upside down and spinning, rolls to a close-up of the transactions block | roll ~180° → ~-30° → ~-3° by 13.00 s, then hold | easings.outExpo ~25 fr (±0.25 s), blur first ~8 fr | continuous | tick |
| 10 | 14.00–15.03 | 420–451 | feature | shift left reveals full transaction row with credited amount and balance | dolly left ~1/3 W in ~8 fr | easings.outExpo ~8 fr (±0.25 s) | slide-push | swoosh-short |
| 11 | 15.03–18.00 | 451–540 | feature | close-up phone flies up out; 4-word tagline reveals left; small phone rises lower right, yaws to face camera | static wide | exit inExpo 16 fr; word-reveal ~7 fr/word 15.57–16.50 s; phone springs.heavy ~30 fr, settled 16.77 s | continuous | swoosh-short |
| 12 | 18.00–19.00 | 540–570 | cta | phone slides right → left across the tagline; behind it the line becomes a 3-word try-it line with the product name | static wide | phone x ~30 fr easings.inOutCubic (±0.25 s); text swap masked by phone edge | continuous | swoosh-short |
| 13 | 19.00–21.80 | 570–654 | cta | end hold: phone left third, try-it line right | static, ~1 % float | hold 84 fr, no exit | end | none |

Evidence per row: 1 `sheet-01 cells 0–8`; 2 `sheet-01 cells 8–13`; 3 `sheet-01 cells 13–15`, `sheet-02 cells 0–8`, `kf-004.50`, `kf-005.50`; 4 `sheet-02 cells 8–12`; 5 `sheet-02 cells 12–15`, `sheet-03 cells 0–4`; 6 `sheet-03 cells 4–8`; 7 `sheet-03 cells 9–14`; 8 `sheet-03 cell 15`, `sheet-04 cell 0`, `cuts/cut-012.17.jpg` (before); 9 `sheet-04 cells 1–7`, `cuts/cut-012.17.jpg` (after); 10 `sheet-04 cells 8–12`; 11 `sheet-04 cells 13–15`, `sheet-05 cells 0–7`, `cuts/cut-015.03.jpg`; 12 `sheet-05 cells 8–12`; 13 `sheet-05 cells 12–15`, `sheet-06 cells 0–7`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–13 | craft/vocabulary.md#ui, PhoneFrame |
| ui-rebuild | 1–13 | craft/vocabulary.md#ui (one home screen, crisp at detail zoom) |
| push-in | 2, 6, 7 | craft/03-camera-and-staging.md |
| pull-out | 3, 5 | craft/03-camera-and-staging.md |
| zoom-tier | 2, 6 | craft/03-camera-and-staging.md, ZOOM_TIERS |
| tilt-plane | 2, 3, 9 | craft/03-camera-and-staging.md, TiltPlane |
| whip-pan | 4, 7 | craft/03-camera-and-staging.md |
| speed-ramp | 8 | craft/03-camera-and-staging.md |
| word-reveal | 11 | craft/05-typography.md, WordReveal |
| mask-wipe | 12 | craft/09-transitions.md |
| slide-push | 10 | craft/09-transitions.md |
| hard-cut | 8 | craft/09-transitions.md |
| motion-blur | 2, 3, 4, 6, 7, 8, 9, 11 | craft/vocabulary.md#look |

## Look
Palette: #99EE4D lime accent (gradient top), #212022 near-black phone body and text, #EFFBE7 near-white gradient bottom, #C1F59B mid gradient, #939769 olive shadow tone. Type: rounded geometric sans, medium weight, sentence case, cap height ~6 % H, one line beside the phone. Treatment: motion-blur on every fast move. Background: vertical linear gradient, lime top to near-white bottom, flat otherwise.

## What to adapt
- Copy: 2 lines. Tagline ~4 words (the promise), try-it line ~3 words with the product name.
- Brand: the accent colour fills the top of the gradient and the UI's primary pills; no logo is shown, the product name lives in the last line.
- Timing: rows 2–10 can be reordered or trimmed per close-up target (keep each whip ≤ 8 fr and each landing ≥ 20 fr); row 13 keeps ≥ 2.5 s hold.

## Pitfalls
- The tour only works if the UI is rebuilt or very high-res: the detail tier is ~2.7× and a phone screenshot at 1x breaks apart.
- Every fast move needs motion blur; without it the whips at ~450 px/s read as jumps at 30 fps.
- Rows 1–8 are one continuous shot: do not insert cuts there, chain camera keyframes.
- The tagline swap is masked by the phone passing over the text; if the phone is narrower than the longest word, the swap is visible.

## Missing components
- MotionBlurLayer: per-frame directional/rotational blur driven by the camera velocity, sample count 8–12 (techniques: motion-blur, whip-pan)
- PhoneSweepSwap: phone crosses a text line on x, its silhouette masks old text out and new text in, ~30 fr (techniques: mask-wipe)

## Proposed terms
- device-wipe: a moving device acts as the wipe mask that swaps on-screen copy behind it, row 12 (not in craft/vocabulary.md; not used in recipe.json)
- whip-wrap: a whip where the subject exits one edge and re-enters from the opposite edge in the same shot, row 4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Pan speeds from motion.json (px/s at 1920). Not measurable: spring overshoot, punch durations under 8 fr, word stagger in row 11, exact roll angles (estimated from cells). SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/1 cuts within ±2 fr (no beats; n/a).

## Study log
id phone-closeup-whip-tagline-swap · family mobile-app (catalogue hint data-stats not confirmed: no chart is drawn) · 21.80 s, 13 rows.
Cuts: 1 hard (12.17 s), 1 soft (15.03–15.57 s, phone exits up); all other boundaries continuous.
Techniques: 13 (incl. look id motion-blur). cut_on_beat: n/a, silent reference, 0/1.
Not measurable at 0.25 s: overshoot, punches < 8 fr, word stagger, roll angles (estimated).
Proposed terms: device-wipe, whip-wrap. Missing components: MotionBlurLayer, PhoneSweepSwap.
Phase B: not run.
