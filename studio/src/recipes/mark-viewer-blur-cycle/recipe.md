# Dark viewer card cycling marks with blur swaps

One dark rounded card on flat light grey lights up a mark, then swaps it for the next every 1.5 s: the old mark slides left into blur, the new one sharpens in from the right, its name wipes in below. Loops back to empty.

Source: https://jitter.video/template/blur-logo-switcher/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Integrations, partners or product-family marks shown one at a time in a single slot
- Silent loop for a landing hero, docs header or social card about a logo set
- Mark evolution: one historical state per swap
- 4:5 or 1:1 posts where a calm repeatable rhythm is the point
Not for: a single hero logo reveal (use a light-on or end card), or more than ~6 marks (the 1.5 s period makes it long; use a grid)

## Format
4:5 · 10.00 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable (frame 0 and the last frame are the same empty card)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.23 | 0–37 | hook | empty dark card, soft shadow; 2-word caption above and 3-word caption below fade in; first mark lights on; top pill with live dot and 2-word label drops open | near-static, zoom -0.2 %/s | captions fade f0–f23 (easings.inOutSine, ±0.25 s); mark dim at f11, light-on to full by f24; pill grows down f14–f20 on springs.ui (overshoot not measurable); name fades in f17–f24 | blur-dissolve | swell |
| 2 | 1.23–2.73 | 37–82 | logo | mark 2 in the same card, one-word name under it | near-static, zoom -0.3 %/s | out: slides ~25 % card width left, blur to ~12 px, gone in 4 fr (easings.inExpo); in: from ~20 % right, deblurs to centre in 7 fr (easings.outExpo); name wipes in left to right, feathered, 8 fr; hold 37 fr | blur-dissolve | swoosh-short |
| 3 | 2.73–4.23 | 82–127 | logo | mark 3, name under it | near-static, zoom -0.3 to -0.5 %/s | same swap, in 6–7 fr; hold ~38 fr; period 45 fr | blur-dissolve | swoosh-short |
| 4 | 4.23–5.73 | 127–172 | logo | mark 4, two-part name under it | near-static, zoom -0.5 %/s | same swap; sharp by f132; name wipe ~10 fr | blur-dissolve | swoosh-short |
| 5 | 5.73–7.23 | 172–217 | logo | mark 5 (outline style), name under it | near-static, zoom -0.45 %/s | same swap; sharp by f179; name wipe 8 fr | blur-dissolve | swoosh-short |
| 6 | 7.23–8.37 | 217–251 | logo | back to mark 1, closing the cycle | near-static, zoom -0.4 %/s | same swap, sharp by f224; hold 27 fr (shorter) | hard-cut | swoosh-short |
| 7 | 8.37–10.00 | 251–300 | outro | lights off: mark, name, pill dim away, captions fade; empty card holds to the loop point | near-static, zoom -0.2 %/s | mark + name dim f251–f266 (reverse light-on, easings.inOutSine); pill retracts f250–f260 on springs.ui; captions fade f258–f282; empty hold f266–f300 | hard-cut | none |

Evidence per row: 1 = sheet-01 cells 0–4 + strip t=0; 2 = sheet-01 cells 5–10 + strip t=1.1; 3 = sheet-01 cells 11–15, sheet-02 cell 0 + strip t=2.6; 4 = sheet-02 cells 1–6 + strip t=4.1; 5 = sheet-02 cells 7–12 + strip t=5.6; 6 = sheet-02 cells 13–15, sheet-03 cells 0–1 + strip t=7.1; 7 = sheet-03 cells 2–7 + strip t=8.2. No cut frames (cuts.json is empty). Keyframe kf-001.50 for type and pill detail.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| light-on | 1, 7 (reverse) | craft/vocabulary.md#brand, craft/families/brandmark.md |
| island-morph | 1, 7 | craft/vocabulary.md#ui (IslandPill) |
| blur-dissolve | 1–6 (each swap) | craft/vocabulary.md#transitions, TRANSITIONS['blur-dissolve'] |
| blur-in | 2–6 (incoming mark and name resolve from blur) | craft/vocabulary.md#type (BlurIn) |

## Look
Palette: #D5D5D5 background grey, #050505 card body (gradient up to #252525 at the top edge), #A1A1A1 caption grey, #EAEAEA highlight; accent a small green live dot (approx #5FD068, too small for palettegen). Type: neutral grotesk, medium, sentence case; captions ~2.8 % H; mark name ~1.4 % H white; pill label bold + regular. Treatment: none (no grain). Background: flat, card has a large soft drop shadow below.

## What to adapt
- Copy: 2 captions (2 words above, 3 words below), 1 pill label (2 words), 4–6 mark names of 1–2 words
- Brand: accent only on the live dot; card uses the brand surface; marks render in fg (single colour)
- Timing: period 45 fr is the rhythm, keep it; the swap must stay 4 fr out / 7 fr in; rows 1 and 7 (light-on, lights-off) keep their frame counts; add marks by adding 45 fr rows

## Pitfalls
- The swap is directional (out left, in from right); a centred crossfade loses the "switcher" feel
- The old mark is gone in 4 fr while the new one is still blurred: there is ~2 fr of near-empty card, keep it
- Marks must be optically equal size (fit to a ~11 % W box), mixed solid and outline marks read uneven otherwise
- Last hold is shorter (27 fr) so the lights-off lands before 10 s; keep the loop point on the empty card

## Missing components
- MarkSwitcher: one slot cycling marks every N fr; out = translateX -25 % card width + blur 0→12 px + fade, 4 fr inExpo; in = from +20 % with blur 12→0, 7 fr outExpo; name below with a feathered left-to-right mask wipe 8 fr (techniques: blur-dissolve, blur-in)
- ViewerCard: dark rounded rectangle ~55 % W, ~0.62 aspect, corner radius ~22 % of height, top-to-bottom gradient #252525→#050505, 1 px darker rim, large soft shadow offset ~8 % of its height (techniques: none, a surface; Surface may cover it with props)

## Proposed terms
- slide-blur-swap: one element leaves sideways into blur while its replacement enters from the other side out of blur, 4–7 fr, same slot (rows 2–6) (not in craft/vocabulary.md; not used in recipe.json)
- label-feather-wipe: a short label revealed left to right behind a soft, blurred mask edge, ~8 fr (rows 2–6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 0, 1.1, 2.6, 4.1, 5.6, 7.1, 8.2 (extracted to a temp dir, not kept). Not measurable: spring overshoot of the pill (too small), exact blur radius (estimated ~12 px at 1120 W), exact accent hex. Camera from motion.json only (zoom ≤ 0.5 %/s, invisible on sheets). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
id mark-viewer-blur-cycle · family logo-brand · 10.00 s, 7 rows (0 cuts; split at 5 swap starts and the lights-off)
techniques 4 (light-on, island-morph, blur-dissolve, blur-in) · cut_on_beat n/a (silent, 0 cuts)
swap period 45 fr, swaps at f37/f82/f127/f172/f217, out 4 fr, in 6–7 fr, measured on 30 fps strips
not measurable: pill overshoot, blur radius (±2 px), accent hex
proposed terms: slide-blur-swap, label-feather-wipe
missing components: MarkSwitcher, ViewerCard
phase B: not run (study only)
