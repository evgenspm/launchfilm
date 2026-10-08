# Stat cards stacking over moody footage

Four rounded stat cards rise one over another on dim monochrome footage, each a different fill with a mono label and one big figure, every 0.8 s; then a hard cut to a two-line word-by-word close on black.

Source: https://jitter.video/template/the-track-app-showcase/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A fitness, health or tracking product with three to five headline figures
- Short silent social promo (4:5 feed) that must show results in under 4 s
- A metric recap where each figure owns a colour
- Footage of the activity exists but no UI recording does
Not for: products without measurable results, or anything needing more than one claim per card.

## Format
4:5 · 5.00 s · 30 fps · dark · music none (no BPM), cut_on_beat n/a (0/2, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.80 | 0–54 | hook | black open (~0.2 s), dim grey close-up footage; accent-red stat card rises in, figure lands; black card stacks over it | footage drift scale 1.00→0.98 (-1.3 %/s), cards fixed centre | card 1 rises ~6 % H, springs.ui ~8 fr (±0.25 s, overshoot not measurable); figure + unit 6–8 fr after the card (±0.25 s); card 2 at 1.00 rises over card 1 from ~5 % H lower, springs.ui ~8 fr (±0.25 s); pager dot 2 lights | hard-cut | swoosh-short |
| 2 | 1.80–3.40 | 54–102 | proof | same footage; white card with a small icon by the figure stacks over the black one, then a mid-grey card over the white | drift continues, ~-0.2 %/s | card 3 rises from ~8 % H lower, springs.ui ~8 fr (±0.25 s), figure set on entry; card 4 enters at 2.77 the same way, unit line at 3.00; period 24 fr; pager dots 3, 4 | hard-cut | swoosh-short |
| 3 | 3.40–5.00 | 102–150 | cta | flat black; two-line close, 7 words: line 1 claims the activity, line 2 tells the viewer to get the product | static | word-reveal without blur, ~4 fr per word (±0.25 s), wraps at 3.77, complete by 4.00, hold 30 fr | hard-cut | type-click |

Evidence: row 1 `sheet-01 cells 0–7`, `cuts/cut-001.80.jpg` (before side), `keyframes/kf-000.50.jpg`, `kf-001.50.jpg`; row 2 `sheet-01 cells 8–13`, `cuts/cut-001.80.jpg` (after side), `cuts/cut-003.40.jpg` (before side), `kf-002.50.jpg`; row 3 `sheet-01 cells 14–15`, `sheet-02 cells 0–3`, `cuts/cut-003.40.jpg` (after side), `kf-003.50.jpg`, `kf-004.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–2 | stat card rebuilt in React (label, figure, unit, fill), craft/vocabulary.md#ui |
| word-reveal | 3 | WordReveal (blur off), craft/vocabulary.md#type |
| hard-cut | 1–3 | craft/vocabulary.md#transitions |
| grain | 1–2 | footage noise visible on flat greys, Grain, craft/vocabulary.md#look |

## Look
Palette: #000000 background / close, #F5F5F5 close type, #ED2D00 accent (card 1), #FFFFFF card 3, #656362 footage mid-grey (card 4 measured ~#6B6B6B), #111111 footage shadows. Type: small uppercase mono labels (~1.3 % H); heavy grotesk figures (~4 % H) with a bold unit line; bold grotesk close, sentence case, tight, ~5 % H. Treatment: grain. Background: desaturated, darkened close-up footage for rows 1–2, flat black for row 3.

## What to adapt
- Copy: 4 stats (label 1–3 words uppercase, value 2–5 characters, optional unit); close is 2 lines, ≤ 4 words each, line 2 the call to action.
- Brand: the accent fills card 1 only; the rest stay neutral (black, white, grey). No logo appears.
- Timing: card period 24 fr is the rhythm; keep it. The close may stretch its hold; the first black lead-in stays ~6 fr.

## Pitfalls
- Each new card starts slightly lower than the stack so the old card's top edge peeks for a few frames; flush stacking reads as a plain swap.
- Keep footage dim and grey: a coloured background kills the per-card fill contrast.
- The close has no blur and no motion; adding an entrance animation breaks the dry ending.

## Missing components
- StatCardStack: rounded cards (radius ~12 % of card width, card ~28 % W × 34 % H, centred) rise ~6–8 % H into the same slot every 24 fr, each covering the last; props {label, value, unit, fill, icon} (techniques: ui-rebuild)
- PagerDots: vertical column of 4 small squares right of the card, active one bright, others 40 % (techniques: ui-rebuild)

## Proposed terms
- stat-card-stack: metric cards replacing each other in one slot by stacking over the previous, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- pager-dots: progress indicator tracking the active card, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted (source file not in the analysis dir). Not measurable: card spring overshoot, exact entrance frames, whether figures count up or appear whole, word stagger in the close. Footage zoom from motion.json (-1.3 %/s in s0 and s3). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats). Palette from palettegen on kf-000.50, kf-002.50, kf-004.50 plus a 20 px crop for the grey card.

## Study log
id stat-card-stack-footage · family data-stats · 5.00 s, 3 rows (cuts at 1.80, 3.40)
techniques: 4 (ui-rebuild, word-reveal, hard-cut, grain) · cut_on_beat: false (silent, no beats)
not measurable: entrance springs and overshoot, counter vs static figures, word stagger (±0.25 s)
proposed terms: stat-card-stack, pager-dots
missing components: StatCardStack, PagerDots
catalogue hints orbit, device-phone, glow, highlighter not seen on the sheets; dropped
phase B: not run
