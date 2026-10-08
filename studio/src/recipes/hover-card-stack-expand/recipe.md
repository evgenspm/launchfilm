# Hover card stack expand loop

A single content card waits on a soft grey gradient; the pointer reaches it, a count badge appears and a second card slides out from behind, holds, then tucks back. One component, one interaction, a seamless loop.

Source: https://jitter.video/template/interactive-components/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing one interactive component state (hover, expand) for a design system or UI kit
- A short looping clip for a landing page section or social post about a component
- Explaining a stacked notification or recent-items widget in under 6 s
- Silent autoplay where a single gesture has to read without copy
Not for: stories with several features or a hook-to-payoff arc; there is no claim, no logo moment and no CTA.

## Format
other (1322×992, 4:3) · 6.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | one content card centred (square thumbnail, grey date line, one-line title); pointer just below its right edge | static | idle; pointer starts moving up (±0.25 s) | hard-cut | none |
| 2 | 0.50–1.00 | 15–30 | feature | accent count badge on the top-right corner; a second card emerges from behind and drops below; small text link under the pair | static | second card scale ~0.85→1, opacity 0.4→1, springs.layout ~12 fr (overshoot not measurable, ±0.25 s); group recentres up ~6 % H, springs.ui; badge in within 1 cell; pointer up ~3 % H onto the lower card, springs.ui | hard-cut | swoosh-short |
| 3 | 1.00–3.00 | 30–90 | feature | expanded state held: two stacked cards, badge, pointer on the lower card's right edge, link below | static | hold 60 fr, no visible motion | hard-cut | none |
| 4 | 3.00–3.50 | 90–105 | feature | collapse: badge goes, lower card shrinks and slides back under the top card, link fades; pointer drops below | static | reverse of row 2: scale 1→~0.85, opacity→0, easings.outQuint ~12 fr (±0.25 s); group recentres down ~6 % H | hard-cut | none |
| 5 | 3.50–6.00 | 105–180 | feature | single-card idle state again, identical to frame 0 | static | card settles ~1 % H by 3.77 s, springs.ui (±0.25 s); hold 67 fr to the loop point | hard-cut | none |

Evidence: row 1 `sheet-01 cells 0–1`, `keyframes/kf-000.50.jpg` (mid-expand, lower card half-hidden behind the top card at reduced opacity); row 2 `sheet-01 cells 2–3`; row 3 `sheet-01 cells 4–11`, `keyframes/kf-001.50.jpg`, `kf-002.50.jpg`; row 4 `sheet-01 cells 12–14`; row 5 `sheet-01 cell 15`, `sheet-02 cells 0–7`, `kf-004.50.jpg`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–5 | craft/vocabulary.md#ui, craft/04-motion.md#springs |
| cursor-path | 1, 2, 4 | craft/vocabulary.md#ui (Cursor) |
| notification-stack | 2–4 | craft/vocabulary.md#ui (NotificationStack, NotifCard) |

## Look
Palette: #DFE3E4 background top, #EEF0EF card fill, #B3B7B6 gradient mid, #7A7E7E gradient bottom, #6C6F6F darkest floor; accent badge blue (too small for palettegen, take brand.accent); text near black. Type: regular grotesk, sentence case, normal tracking; title ~2.2 % H, grey date line ~1.6 % H; small mono footer labels ~1.4 % H. Treatment: none. Background: vertical gradient, light grey top half fading to mid grey at the bottom.

## What to adapt
- Copy: 2 cards, each a meta line (date-like, 2-3 tokens) and a 2-4 word title; 1 link label of 1-2 words; 1 count in the badge.
- Brand: accent carries only the badge; bg and muted build the gradient; footer labels optional (our brand mark and a short label).
- Timing: row 3 (hold) and row 5 (idle) stretch; rows 2 and 4 keep ~12-15 fr so the gesture reads as a hover response.

## Pitfalls
- The lower card must come from behind the top card (z under, scaled down, half opacity), not slide in from off-screen; kf-000.50 shows it mid-way under the top card.
- The whole group recentres while expanding; keeping the top card fixed makes the composition drop off-centre.
- First and last frames must match exactly or the loop pops.
- There is no click: no squash, no ripple. Turn Cursor ripple off.

## Missing components
- HoverStack: a NotifCard pair where hover state t∈[0,1] drives the second card from behind (scale 0.85→1, y 0→card height + 16 px gap, opacity 0.4→1), group re-centres by half the added height, badge pops on the top card corner, link fades in under (techniques: notification-stack, ui-rebuild)

## Proposed terms
- hover-stack-expand: a hover reveals a hidden card that slides out from behind its sibling and collapses back on leave (rows 2–4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted. Not measurable: entrance/exit frame counts and overshoot (all ±0.25 s), badge timing within a cell. motion.json reports a constant -160 px/s pan (coherence ~0.85), but footer labels and card x are unchanged in every cell, so camera = static (artifact of the flat gradient). Palette from palettegen on keyframes kf-000.50, kf-001.50, kf-004.50 (no cut frames exist). SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id hover-card-stack-expand · family product-ui · 6.00 s, 5 rows, 0 cuts, loopable
- techniques 3 (ui-rebuild, cursor-path, notification-stack) · cut_on_beat n/a (silent, 0 cuts)
- not measurable: motion frame counts and overshoot (±0.25 s); motion.json pan judged an artifact
- proposed terms: hover-stack-expand · missing components: HoverStack
- difficulty medium (ui_rebuild), render_cost light · phase B not run
