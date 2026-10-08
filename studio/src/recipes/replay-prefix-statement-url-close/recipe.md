# Replayed-prefix statement swap to URL close

One centred line on dark navy, then the same line replays with only its last word changed, then an eyebrow and a big URL, then an availability close. A drifting blue light arc keeps the empty frame alive.

Source: https://www.raylight.app/templates/1CyfFRAc (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A site or portal launch where the URL itself is the hero line
- One sentence that fits two audiences: replay it with a different last word
- Silent autoplay feeds where type carries the whole message
- A calm, restrained voice on a dark brand
Not for: films that need to show UI or proof; more than two swapped words (the replay cadence gets slow, use `WordSwap` slot mode instead)

## Format
16:9 · 11.4 s · 30 fps · dark · music none (silent reference), cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.50 | 0–75 | hook | statement, 3 words (2-word prefix + 1-word audience), centred; thin blue arc at left | push-in creep ~1-2 %/s (motion.json); arc drifts | per-word blur-in from f1, stagger 2 fr, easings.outExpo ~10-12 fr, ~5-10 px settle; exit f69-74 5-6 fr blur fade; f75-78 empty | continuous | none |
| 2 | 2.50–5.20 | 75–156 | hook | same statement replayed, last word changed; prefix in the same pixels | push-in creep ~1-3 %/s; arc rotates toward vertical | words at f79/f81/f83, full contrast f89-90; hold ~2 s; exit f150-156 | continuous | none |
| 3 | 5.20–8.47 | 156–254 | cta | small muted eyebrow (4 words, what the site is) above a big one-line URL; glow blooms top right, bright arc line enters top right ~7.27 | push-in creep ~1.5 %/s | eyebrow blur-in f158, URL +6 fr (f164), settled by 5.77 (±0.25 s); exit from ~8.20, 5-6 fr | continuous | none |
| 4 | 8.47–11.40 | 254–342 | cta | availability statement, 3 words; small sub-line pointing to the URL; diagonal blue light band sweeps up behind | push-in creep ~1.4-3.4 %/s | per-word blur-in from f254, stagger 2 fr; sub-line +12 fr; hold ~2 s; fade out 11.00-11.27 (±0.25 s) | end | none |

Evidence per row: row 1 `sheet-01 cells 0–9` (0.00 empty, 0.27 entering with last word blurred, 0.50 sharp, 2.27 still full); row 2 `sheet-01 cells 10–15` + `sheet-02 cells 0–5` (2.50 faded old line, 2.77 prefix sharp new word blurred, 3.00 sharp, 5.00 fading); row 3 `sheet-02 cells 5–15` + `sheet-03 cells 0–1` (5.27 eyebrow only, 5.50 URL blurred, 5.77 sharp, 8.27 fading); row 4 `sheet-03 cells 2–13` (8.50 two words in, 8.77 full line, 9.00 sub-line, 11.27 fading). No cut frames (cuts.json empty). Keyframes kf-001.50, kf-006.50, kf-010.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1–4 | craft/05#statement-sequence, craft/families/statement.md |
| blur-in | 1–4 | craft/05#table-of-the-rest |
| word-swap | 1–2 | craft/05 (done here as a full replay of the line, not an in-place slot) |
| push-in | 1–4 | craft/03#drift-and-push-in |
| glow | 1–4 | craft look (soft blue arc/glow behind the type) |

## Look
Palette: #0C161F background navy, #E6E8EF text, #213D74 arc/glow blue, #142953 deep glow, #7387AC arc highlight, #42516D muted eyebrow. Type: semibold-bold grotesk, sentence case, tight tracking, hero ~11.8 % H (human 30 fps study); eyebrow and sub-line ~1.5 % H muted. Treatment: glow. Background: flat navy with one soft blurred light arc that drifts and rotates, growing into a broad diagonal band in the last row.

## What to adapt
- Copy: 5 lines. Two statements sharing a 2-3 word prefix and ending in one different word each; a ≤ 5-word eyebrow; the URL as the hero line (one line at 16:9); a ≤ 4-word availability close with a small sub-line.
- Brand: the accent colour carries the light arc and glow; text stays in fg. No logo in the reference.
- Timing: first two statements keep ~78 fr each with 4 empty frames between; the URL row can stretch to ~100 fr; the close holds ~2 s before the fade.

## Pitfalls
- The prefix must land in exactly the same pixels on the replay, or the swap reads as two unrelated lines (lock centering on the full line width only if both last words are similar length; otherwise left-anchor the prefix).
- Exit (5-6 fr) is shorter than the entrance (~10-12 fr); slow exits break the cadence.
- Keep the arc moving: the type is static between entrances, the light is what keeps frames alive.
- A long URL at hero size can overflow 9:16; shrink to fit width there rather than wrapping.

## Missing components
- LightArcDrift: one blurred accent arc (stroke ~0.4 % W, glow ~8 % W) that rotates ~5-10°/s and travels across the frame over the whole film, widening into a diagonal band in the last 3 s (techniques: glow). `BrandBackdrop` only gives a static soft glow.

## Proposed terms
- light-arc-drift: a soft blurred light arc that slowly rotates and travels behind type for the whole film, rows 1–4 (not in craft/vocabulary.md; not used in recipe.json)
- replay-swap: word swap done by fading the whole line and replaying its entrance with the new word, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; frame numbers for entrances, stagger, exits and gaps from the human 30 fps study. Not measurable here: overshoot (none visible, so no spring named), push-in rate (taken from motion.json, not sheets), arc rotation speed (estimated). Reference is silent: no SFX observed and none planned. cut_on_beat = 0/0 cuts (no cuts, no beats).

## Study log
id replay-prefix-statement-url-close · family kinetic-type · 11.40 s, 4 rows, one shot, all handovers continuous
techniques 5 (statement-sequence, blur-in, word-swap, push-in, glow) · cut_on_beat n/a (0 cuts, silent)
not measurable at 0.25 s: entrance/exit frames (taken from human 30 fps study), overshoot, arc speed
proposed terms: light-arc-drift, replay-swap
missing components: LightArcDrift
phase B: not run
