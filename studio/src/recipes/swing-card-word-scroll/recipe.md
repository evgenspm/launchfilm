# Swinging card over a stepping feature list

A tall all-caps list of one-word features steps down the square frame while a payment card swings to a new tilt and colour at each stop. One hero object plus a wall of capabilities, read in under 4 s.

Source: https://jitter.video/template/the-vault-card-features/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A card, pass or badge product with many small capabilities to name at once
- A short square loop for a feed, landing page hero or plan comparison
- Silent autoplay where one object and single words carry the message
- Showing several colour or tier variants of the same physical object
Not for: products whose value needs a sentence or a UI flow; anything without a single physical-looking hero object.

## Format
1:1 · 3.77 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.77 | 0–113 | hook | centred wall of 7 one-word features on pale grey; card with a big wordmark covers the middle; 3 stops: deep blue, pale blue, black card | locked frame, no scale change; list travels down 238–314 px/s @1920 during moves | 3 stops of ~38 fr: hold 15–22 fr, list steps down 3–4 lines on easings.outExpo ~22 fr (±0.25 s), card swings to a new tilt (0°, ~-12°, ~+12°) and colour on springs.heavy ~22 fr (±0.25 s, overshoot not measurable); tiny caption or icon chip at each stop | hard-cut | tick on each settle |

Evidence: sheet-01 cells 0.00–0.27 (stop 1, deep blue card level, list held), 0.50–0.77 (list steps, card tilts and turns pale blue), 1.00–1.50 (stop 2, pale blue card at ~-12°, small caption line under it; keyframe kf-001.50), 1.77–2.00 (step, card switches to black), 2.27–2.77 (stop 3, black card ~+12°, icon chip beside the last line), 3.00–3.50 (step back toward the opening layout, deep blue card returns, small credit line visible at 3.27). No cut frames exist (cuts.json: 0 hard, 0 soft, 0 flashes). motion.json: zoom 7.8 %/s in second 0 is the list and card moving, not a camera zoom (line pitch equal in cells 0.00 and 1.27).

Working list: 0.00 stop 1 · 0.50 list moving down, card tilting · 0.77 pale blue card · 1.00 stop 2 + caption · 1.77 moving, card leaving up · 2.00 black card · 2.27 stop 3 + icon chip · 3.00 moving · 3.27 deep blue card back, credit line · 3.50 near the opening frame.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| stacked-roll | 1 | craft/vocabulary.md#type (StackedRoll; here a flat stepped list, not a drum) |

## Look
Palette: #DBE0E0 background grey (soft diagonal gradient to ~#CCCECD), #000000 list type and dark card, #0002C7 deep blue card and wordmark, #D9E5EA pale blue card, #A8AEB2 card shadow and wordmark on black. Type: heavy grotesk, all caps, tight tracking, cap height ~8.5 % H, line pitch ~14 % H, 7 lines centred; tiny caption ~1.5 % H. Treatment: none. Background: flat light grey with a faint gradient.

## What to adapt
- Copy: 12–18 one-word capabilities, ≤ 10 letters, all caps; up to 3 tiny per-stop lines (tagline, credit, ≤ 4 words); product wordmark on the card.
- Brand: the first card carries the accent; the other two cards are a light tint and black. Wordmark sits bottom-left on the card, small number and network mark at the top.
- Timing: keep ~38 fr per stop and the ~45 % hold; more stops lengthen the piece, do not shorten a stop.

## Pitfalls
- Card must cover ~50 % width and hide 2–3 list words; smaller and it reads as a sticker, larger and the list is lost.
- List and card move together on the same frames; a card that lags the list looks like a separate animation.
- Keep the list strictly vertical: no horizontal drift was seen in any cell.

## Missing components
- SteppedWordList: centred all-caps list that wraps and advances N lines per stop, easings.outExpo ~22 fr, hold ~16 fr (techniques: stacked-roll)
- SwingCard: payment-style card (wordmark, masked number, network glyph) with soft shadow, per-stop tilt and colour, springs.heavy (techniques: none; proposed hero-swing-stop)

## Proposed terms
- hero-swing-stop: one hero object rotates to a new tilt and swaps colour at each step of the background motion, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- step-scroll-list: a list that moves in discrete stops (move, hold) instead of a continuous roll, row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no strip extracted). Not measurable: exact move length, overshoot of the card swing, the frame of each colour swap, stagger between list and card. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on keyframes kf-000.50, kf-001.50, kf-002.50 (no cut frames exist). Last cell 3.50 is still settling, ~10 % off cell 0.00, so loopable = false by the rule.

## Study log
id swing-card-word-scroll · family kinetic-type · 3.77 s, 1 row (0 cuts, single shot < 4 s) · 1 technique (stacked-roll) · cut_on_beat n/a (silent, 0 cuts) · not measurable at 0.25 s: move length, swing overshoot, colour-swap frame · proposed terms: hero-swing-stop, step-scroll-list · missing components: SteppedWordList, SwingCard · phase B not run (study only).
