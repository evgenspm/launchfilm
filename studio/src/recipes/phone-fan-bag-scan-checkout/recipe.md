# Device fan-out to in-app checkout

One phone on black, then three back-view colour variants slide out beside it under a name pill; a price and pay button appear, a cursor clicks, and the film dives into a store app: add to bag, bag page, face-scan confirm.

Source: https://www.raylight.app/templates/ldT0NzT7 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Hardware or accessory launch that ends in a buy action
- Showing colour or finish variants side by side before a purchase flow
- Store or checkout app demo that wants a product-shot opener
- Silent autoplay ad on a dark feed
Not for: software-only products with no physical hero; films that need a logo end card (there is none here).

## Format
16:9 · 12.57 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | one phone, front three-quarter, glowing wallpaper, left third; dark name pill top centre | push-in ~4.4 %/s, slight drift right | pill words blur-in 0.27–0.77, ~15 fr, easings.outQuint (±0.25 s) | continuous | none |
| 2 | 1.00–3.50 | 30–105 | reveal | three back-view variants slide out to the right into a fan of four | push-in ~3.5 %/s, pan right ~67 px/s @1920 in 2–3 s | entries ~1.00 / 1.75 / 2.25 s, ghosted to solid ~15 fr, springs.heavy (overshoot not measurable) | continuous | whoosh |
| 3 | 3.50–4.77 | 105–143 | cta | price block (3 short lines) + outlined pay button right of the fan; cursor enters from below | near static, ~0.8 %/s | price fade ~7 fr (±0.25 s); button glow 3.50–3.77; cursor glide 4.00–4.77, easings.inOutSine ~23 fr | continuous | pop |
| 4 | 4.77–5.77 | 143–173 | feature | click; fan ghosts out to black; empty phone outline grows centre, store UI fills it | static | blur-dissolve ~15 fr (±0.25 s); screen rect grows 5.27–5.50, springs.layout | continuous | tick |
| 5 | 5.77–6.77 | 173–203 | feature | in-app product grid (4 cards, tab bar with bag badge); camera dives in | zoom tier full → element ~1.0→3.0 in 6.00–6.27, tilt down ~64 px/s to 6.77 | springs.cameraIn ~10 fr (±0.25 s, overshoot not measurable) | continuous | swoosh-short |
| 6 | 6.77–8.27 | 203–248 | feature | close crop: header with back + continue button, added-to-bag toast over first card | hold ~1.00→1.01 | toast landed by 6.77 (±0.25 s); hold 1.25 s; continue pressed at 8.00 | continuous | notification |
| 7 | 8.27–9.77 | 248–293 | feature | bag page title, pull back to full phone, list loads (item, carrier, plan, billed-separately card) | pull-out ~2.5x → 1x in 8.27–8.50, springs.cameraOut (±0.25 s) | loader 8.50–8.77; rows fade ~7 fr; slow scroll 9.00–9.77 easings.linear | continuous | none |
| 8 | 9.77–11.00 | 293–330 | cta | scroll to bottom: help card, subtotal, primary checkout + white pay button | static | in-screen scroll ~7 fr, easings.outQuint (±0.25 s), hold | continuous | none |
| 9 | 11.00–12.57 | 330–377 | cta | primary button dims; face-scan ring at top spins, resolves to a check | static | ring appears 11.27, rotates to 12.00 easings.linear, check at 12.27, hold | end | ui-confirm |

Evidence per row: 1 `sheet-01 cells 0–3`; 2 `sheet-01 cells 4–13`; 3 `sheet-01 cells 14–15`, `sheet-02 cells 0–2`; 4 `sheet-02 cells 3–7`; 5 `sheet-02 cells 7–10`; 6 `sheet-02 cells 11–15`, `sheet-03 cell 0`; 7 `sheet-03 cells 1–6`; 8 `sheet-03 cells 7–11`; 9 `sheet-03 cells 12–15`, `sheet-04 cells 0–2`. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-3d | 1–3 | craft/vocabulary.md#3d |
| device-phone | 1–9 | craft/vocabulary.md#ui |
| blur-in | 1 | craft/vocabulary.md#type |
| push-in | 1–2 | craft/vocabulary.md#camera |
| cursor-path | 3–4 | craft/vocabulary.md#ui |
| blur-dissolve | 4 | craft/vocabulary.md#transitions |
| zoom-tier | 5–6 | craft/vocabulary.md#camera |
| notification-stack | 6 | craft/vocabulary.md#ui |
| pull-out | 7 | craft/vocabulary.md#camera |
| ui-rebuild | 5–9 | craft/vocabulary.md#ui |
| thinking-state | 9 | craft/vocabulary.md#ui |

## Look
Palette: #010101 background, #E6EAEB foreground text / light device, #B2B2B2 light variant, #555455 dark variant, #6F767D UI greys, #51573D product accent (from keyframes 3.50 / 7.50 / 11.50). Type: geometric grotesk, semibold, sentence case, small (pill ~3 % H, price block ~3.5 % H). Treatment: none. Background: flat black.

## What to adapt
- Copy: name pill 2–4 words; price block 3 lines (from-price, monthly, term); toast 3–4 words; button labels.
- Brand: the pay button outline glow carries the accent; no logo appears anywhere.
- Timing: rows 1–3 can stretch with more variants (one entry per ~0.5 s); rows 4–5 must keep their short dissolve and dive; row 9 needs ≥ 1 s to read the check.

## Pitfalls
- Variants must enter ghosted (translucent) and then solidify; a plain slide reads as a cut-out.
- The dive in row 5 is the only fast camera move (diff 3.3 vs ≤ 0.7 elsewhere); slowing it kills the one energy peak.
- UI text at full-phone scale is unreadable at 1280×720; only the zoomed rows (5–6) carry legible UI copy.

## Missing components
- VariantFan: N device images stacked at one anchor, each slides right by ~0.25 width and goes from 0.3 to 1 opacity, entries 0.5 s apart (techniques: device-3d, device-phone)
- FaceScanCheck: ring at screen top that rotates ~0.75 s then morphs into a check mark (techniques: thinking-state)

## Proposed terms
- variant-fan: product variants slide out one by one from behind the hero to form a row (rows 2) (not in craft/vocabulary.md; not used in recipe.json)
- in-screen-scroll: content scrolls inside a static device frame (rows 7–8) (not in craft/vocabulary.md; not used in recipe.json)
- face-scan-confirm: biometric ring that resolves to a check as the purchase confirmation (row 9) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Not measurable: spring overshoot, exact entrance frames, cursor click squash, stagger inside the name pill. Camera %/s and pan from motion.json. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id phone-fan-bag-scan-checkout · family 3d-device · 12.57 s · 9 rows, one shot (0 cuts) · 11 techniques.
cut_on_beat: n/a, no cuts, no music. All timings ±0.25 s (4 fps sheets); springs by the no-overshoot rule.
Proposed terms: variant-fan, in-screen-scroll, face-scan-confirm.
Missing components: VariantFan, FaceScanCheck.
Phase B: not run.
