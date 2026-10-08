# Two-lane screen column drift

Nine product screens of mixed sizes (wide, square, tall) rise through the frame in a staggered two-lane column at a constant speed, each lane a touch faster or slower, so a long screen tour reads as one calm, continuous scroll.

Source: https://jitter.video/template/cascading-screens/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A product overview with many screens and no single hero view
- Showing web and mobile layouts of one product side by side
- A silent loop for a site hero, a booth screen or a showreel interlude
- Background plate behind a statement or logo in a longer film
Not for: films that need one claim to land; a story with a hook and payoff; anything that needs a cut on the beat.

## Format
other (1322×992, ~4:3) · 18.00 s · 30 fps · light · no music (bpm null), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.50 | 0–75 | hook | empty pale field; first wide pale screen rises from the bottom, size label and a 3-line note appear | dolly up, easings.linear, ~0.26 H/s | enters 0.27 s, linear rise (±0.25 s) | hard-cut | swoosh-short |
| 2 | 2.50–4.77 | 75–143 | feature | saturated square (left lane) and white tall screen (right lane) rise under the wide one | dolly up, easings.linear | square 2.50 s, tall 2.77 s, stagger 8 fr (±0.25 s) | hard-cut | swoosh-short |
| 3 | 4.77–5.77 | 143–173 | feature | small pale square enters lower left; wide screen leaves past the top | dolly up, easings.linear | enters 4.77 s (±0.25 s) | hard-cut | swoosh-short |
| 4 | 5.77–8.77 | 173–263 | feature | saturated wide screen rises across both lanes, small square overlaps its top edge | dolly up, easings.linear | enters 5.77 s, layered under the small square (±0.25 s) | hard-cut | swoosh-short |
| 5 | 8.77–9.77 | 263–293 | feature | second small pale square appears under the wide screen, right of centre | dolly up, easings.linear | enters 8.77 s (±0.25 s) | hard-cut | swoosh-short |
| 6 | 9.77–10.77 | 293–323 | feature | white tall screen enters lower left; lanes have swapped sides | dolly up, easings.linear | enters 9.77 s (±0.25 s) | hard-cut | swoosh-short |
| 7 | 10.77–12.00 | 323–360 | feature | saturated tall screen enters lower right; wide screen exits at the top | dolly up, easings.linear | enters 10.77 s (±0.25 s) | hard-cut | swoosh-short |
| 8 | 12.00–15.77 | 360–473 | feature | last wide pale screen rises behind the saturated tall screen and takes the centre | dolly up, easings.linear | enters 12.00 s at lower z; tall exits top ~16.0 s (±0.25 s) | hard-cut | swoosh-short |
| 9 | 15.77–18.00 | 473–540 | feature | last wide screen drifts out the top; empty field from frame 0 returns | dolly up, easings.linear | linear exit, gone by ~17.8 s (±0.25 s) | hard-cut | none |

Evidence: row 1 sheet-01 cells 0–9; row 2 sheet-01 cells 10–15 + sheet-02 cells 0–2; row 3 sheet-02 cells 3–6; row 4 sheet-02 cells 7–15 + sheet-03 cells 0–2; row 5 sheet-03 cells 3–6; row 6 sheet-03 cells 7–10; row 7 sheet-03 cells 11–15; row 8 sheet-04 cells 0–14; row 9 sheet-04 cell 15 + sheet-05 cells 0–7; keyframes kf-002.50, kf-008.50, kf-013.50. cuts/ is empty (0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| dolly | 1–9 | craft/vocabulary.md#camera, Dolly (presets/screen) |
| card-grid | 2–8 | craft/vocabulary.md#ui (staggered screen entries, ~1 s apart) |

## Look
Palette: #EFFAFE background, #41AEF2 label text, #28A9FD saturated screens (accent), #C8EBFE pale screens, #FDFEFE white screens. Type: rounded geometric sans, medium, size label centred at ~4 % H (6 % on wide screens). Treatment: none. Background: flat pale tint, no shadows, no radius.

## What to adapt
- Copy: none; the screenshots carry everything. Placeholder size labels are dropped in a real film.
- Brand: accent fills the saturated screens (3 of 9); pale accent tint and white for the rest; bg = a very light accent tint.
- Timing: speed and entry gap scale with the number of screens; keep the travel linear and keep frame 0 and the last frame empty for the loop.

## Pitfalls
- Any easing on the travel breaks the conveyor feel; the rise is constant from first to last frame.
- Lane speed spread above ~15 % makes screens collide; the reference keeps overlaps to corners only.
- Mixed aspect ratios are the point: three widths (wide, square, tall) alternate so lanes never line up.

## Missing components
- ScreenCascade: N screens in two lanes rising at speed v (H/s) with per-item speed factor 0.88–1.12, entry gap ~30 fr, z order by entry, loop-safe empty first/last frame (techniques: dolly, card-grid)

## Proposed terms
- parallax-cascade: screens of mixed sizes travel through the frame in one direction at slightly different constant speeds, rows 1–9 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no strips extracted). Not measurable: per-screen exact speeds (±10 %), entry frames (±0.25 s), sub-frame stagger. Travel speed from sheet-01 cells 4 and 8: first screen top edge 0.73 H → 0.46 H in 1.00 s, matching motion.json ~-360 px/s at 1920 wide. No audio in the reference; SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id screen-column-parallax-drift · family product-ui · 18.00 s, 9 rows, single shot, 0 cuts · 2 techniques (dolly, card-grid) · cut_on_beat n/a (silent, no cuts) · loopable (empty first and last frame) · not measurable: per-screen speeds ±10 %, entry times ±0.25 s · proposed: parallax-cascade · missing: ScreenCascade · phase B not run (study only).
