# Pill button splits into an icon trio

A single labelled pill button dims its label, then breaks into three round chips (payment, cart, item count) and later merges back. One flat light shot, no cuts, a seamless loop for a micro-interaction demo.

Source: https://jitter.video/template/view-cart-button-split/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a button that expands into quick actions or a status count
- An e-commerce or checkout micro-interaction clip, silent and loopable
- A short UI detail insert inside a longer product film
- A landing-page hero loop for a component or design-system release
Not for: stories that need copy, a product name or a CTA; anything longer than one interaction.

## Format
other (1322×992, 4:3) · 7.5 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.40 | 0–12 | hook | yellow pill: outline cart icon + two-word action label, centred on flat light grey | static | pill stretches ~8 % wider at f5 (easings.outQuint ~4 fr); label opacity 1 → ~0.3 over f5–f12 (easings.linear 8 fr) | morph | none |
| 2 | 0.40–0.83 | 12–25 | feature | pill splits: black chip with a card icon slides out left, violet chip with a one-digit count right; yellow body shrinks to a circle | static | split f12–f25, chips emerge from behind the pill edges, yellow width ~47 % W → circle (springs.ui 13 fr, no overshoot visible); label gone by f17 | morph | pop |
| 3 | 0.83–3.77 | 25–113 | feature | three equal round chips in a row, even small gaps: card, cart, count | static | hold 88 fr, nothing moves | morph | none |
| 4 | 3.77–4.30 | 113–129 | feature | side chips part slightly, then the yellow chip widens over both back into the labelled pill | static | anticipation f113–f118: side chips out ~10 px (easings.outQuint 5 fr); merge f118–f121 (easings.inExpo ~4 fr); empty pill at f121; label fades in f122–f129 (easings.outQuint 7 fr) while width settles (springs.ui) | morph | tick |
| 5 | 4.30–7.50 | 129–225 | feature | labelled pill at rest, identical to frame 0 | static | hold 96 fr; last frame equals frame 0 | hard-cut | none |

Evidence per row: row 1 `sheet-01` cells 0–1 + strip t=0 frames 0–12; row 2 `sheet-01` cells 2–3 + strip t=0 frames 12–25; row 3 `sheet-01` cells 3–15 (0.77–3.77); row 4 `sheet-02` cells 0–1 + strip t=3.6 frames 5–21; row 5 `sheet-02` cells 1–13 (4.27–7.27). `cuts/` is empty (0 cuts); keyframes kf-000.50 … kf-006.50 read for colour.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1–4 (pill → three chips → pill) | craft/09-transitions.md, PillMorph in studio/API.md |
| ui-rebuild | 1–5 (button and chips rebuilt as vector UI) | craft/13-ui-recreation.md |

## Look
Palette: #F7F7F7 background, #291754 label text (near-black), #FEDD12 main pill accent, #7141D8 count chip, #000000 card chip. Type: geometric sans, regular, sentence case, label ~6 % H; thin outline icons; white digit on the violet chip. Treatment: none. Background: flat.

## What to adapt
- Copy: one label of 1–3 words; one short count (1–2 characters).
- Brand: the brand accent fills the main pill; a second accent fills the count chip; the brand fg fills the left chip.
- Timing: rows 3 and 5 (holds) stretch freely; rows 1, 2 and 4 keep their frame counts (8 + 13 + 16 fr).

## Pitfalls
- The label must dim before the split starts (f5–f12); splitting with a full-opacity label looks like a glitch.
- Side chips emerge from behind the pill (z under it), not from its edge; they are never visible outside the yellow before f12.
- No overshoot on the layout (springs.ui); a bouncy split breaks the calm UI feel.
- Keep the last frame identical to frame 0 or the loop pops.

## Missing components
- PillSplit: labelled capsule that dims its label, then splits into N round chips (height = pill height, gap ~3 % W) emerging from beneath it, and merges back with a 5 fr anticipation; brand colours per chip; props at, mergeAt, chips[] (techniques: morph, ui-rebuild)

## Proposed terms
- pill-split: one capsule button separates into several round chips that sit side by side, and rejoins (rows 2, 4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0 and t = 3.6 (made from the local source, kept outside the repo); 0.25 s elsewhere. Not measurable: exact spring overshoot below 1 px at the strip scale. motion.json reports ~-1.9 %/s zoom with zero frame difference; every cell shows the same object sizes, so the camera is static. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id pill-split-icon-trio · family product-ui · 7.50 s, 5 rows, 0 cuts, loopable
- techniques 2 (morph, ui-rebuild) · cut_on_beat n/a (no cuts, no music)
- strips at 30 fps for both transitions; holds measured at 0.25 s
- not measurable: sub-pixel overshoot; camera zoom in motion.json treated as noise
- proposed terms: pill-split · missing components: PillSplit
- phase B: not run (study only)
