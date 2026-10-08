# Stat wall erodes into a completion card

One result figure tiles the whole frame, blinks, then erodes glyph by glyph to black; a bold two-line done headline lands, rises to the top, and a mono stat list types in beside a growing track icon.

Source: https://jitter.video/template/the-track-session-complete/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Closing beat of a flow: a workout, task or order has just been completed (reward screen).
- One hero number deserves a loud entrance before the detail (time, score, distance, total).
- Silent 4:5 or 9:16 feed posts for fitness, tracking or productivity apps.
- A recap card with three to five labelled stats.
Not for: products with no single result number, or films that need to show the actual UI.

## Format
4:5 · 6.13 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0/1, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.80 | 0–24 | hook | black lead-in, nothing on screen | static | none; 24 fr of black | hard-cut | none |
| 2 | 0.80–1.77 | 24–53 | proof | one result figure repeated as a wall, 3 columns × 2 blocks of 6 lines, cropped at both edges; blinks, then erodes | static | appears on the cut fully formed; 3 fr black blink; glyphs drop from line ends, 1 glyph per 1–2 fr, lower lines first, gone in ~14 fr; ~2 fr empty | hard-cut | hit |
| 3 | 1.77–3.00 | 53–90 | reveal | two-line done headline (2 words, period) centred; small brand lockup above; block rises toward the top | static frame; block travels ~51 % → ~21 % of H | word 1 cuts on, word 2 1–2 fr later (no in-animation); lockup ~4 fr after; hold ~22 fr; rise 0.30 H on springs.layout ~20 fr | hard-cut | impact-low |
| 4 | 3.00–4.00 | 90–120 | proof | 4 labelled stats type in bottom left (small mono); outline circle bottom right grows into a multi-lane oval track | static | label types first, value follows; new line every ~7 fr (±0.25 s); circle thickens into lanes then stretches to a stadium, ~20 fr, springs.ui (overshoot not measurable) | hard-cut | type-click |
| 5 | 4.00–6.13 | 120–184 | proof | finished completion card: lockup, headline, 4 stats, track icon | static | last value done ~4.10; 61 fr hold, no motion | hard-cut | ui-confirm |

Evidence per row:
1. sheet-01 cells 0–3; cuts/cut-000.80.jpg (before side).
2. sheet-01 cells 4–6; cuts/cut-000.80.jpg (after side); keyframes kf-001.50; 30 fps strip at 0.80 s (blink and erosion order).
3. sheet-01 cells 7–11; strips at 1.80 s and 2.80 s (word order, lockup, rise).
4. sheet-01 cells 12–15; keyframes kf-003.50; strip at 2.80 s and 3.80 s (stat typing, icon growth).
5. sheet-02 cells 0–8; keyframes kf-004.50, kf-005.50; motion.json seconds 4–6 diff 0.00.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 4 | craft/05-typography.md (Typewriter, mono stats typed label then value) |
| hard-cut | 1–5 | craft/09-transitions.md#hard-cut |

## Look
Palette: #000000 background, #F4F4F4 type and icon, #828282 icon mid-growth grey (from palettegen on cut-000.80, kf-003.50, kf-005.50). Type: bold neo-grotesk, sentence case with a period, tight tracking; headline 2 lines ~10 % H; wall numerals ~5 % H; stats small uppercase mono ~2 % H. Treatment: none. Background: flat black.

## What to adapt
- Copy: one hero figure with unit (≤ 7 characters) for the wall; a two-word completion headline, one word per line, with a period; 3–5 stat lines, uppercase label ≤ 10 chars + value ≤ 10 chars.
- Brand: lockup above the headline is the only brand moment; accent is optional (icon or one stat value), the reference is pure white on black.
- Icon: swap the oval track for a shape tied to the domain (ring, check, box), keep the grow-from-circle move.
- Timing: the lead (24 fr) and end hold (61 fr) stretch freely; keep the wall at ~1 s and the 1–2 fr glyph step.

## Pitfalls
- The wall must overfill the frame (crop on both sides); a wall that fits reads as a table.
- No fades on the type: the headline words and lockup cut on. Easing them in softens the punch.
- Erode from the line ends, not by fading the whole wall: the jagged ragged-right stage is the look.
- The stat list needs a mono face so labels and values align in columns.

## Missing components
- StatWall: one string tiled in a grid that overfills the frame (cols, rows, gap, x offset), with a seeded per-line glyph erosion (1 glyph per 1–2 fr, lower lines first) (techniques: proposed stat-wall, glyph-erode).
- TrackIcon: outline circle that grows concentric lanes (1 → 6) and stretches into a stadium, ~20 fr on springs.ui (techniques: proposed icon-grow-morph).
- StatList: mono label/value rows typed one by one, ~7 fr apart, label before value (can wrap Typewriter).

## Proposed terms
- stat-wall: one figure repeated edge to edge as a texture of type, row 2.
- glyph-erode: tiled text disappears glyph by glyph from line ends, row 2.
- layout-rise: a settled block slides from centre to its final top position to make room for detail, row 3.
- icon-grow-morph: a simple outline grows rings and stretches into a domain icon, row 4.
(not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from local 30 fps strips at t = 0.80, 1.80, 2.80, 3.80 (relative counts only, strip cells not stamped). Not measurable: exact spring overshoot of the rise and icon (no visible overshoot at 30 fps), exact glyph order. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
- id stat-wall-erode-summary · family data-stats (catalogue hint product-ui; no UI or device is shown, the subject is a result figure and stats) · 6.13 s, 4:5, 30 fps, 5 rows.
- 1 hard cut (0.80); long shot 0.80–6.13 split at 1.77 (wall gone, headline), 3.00 (stats start), 4.00 (card complete).
- techniques 2 (typewriter, hard-cut); difficulty easy; render_cost light.
- audio: silent, no VO, cut_on_beat n/a (0/1); sfx planned by glue rule.
- not measurable: spring overshoot (none visible at 30 fps), glyph order beyond "line ends first".
- proposed terms: stat-wall, glyph-erode, layout-rise, icon-grow-morph.
- missing components: StatWall, TrackIcon, StatList.
- phase B: not run (study only).
