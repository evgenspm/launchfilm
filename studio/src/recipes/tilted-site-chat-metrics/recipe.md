# Tilted dark site: hero, chat, metrics

A dark violet landing page leaned back in 3D, cut twice: hero headline under a slow push, an assistant chat panel panning left, then the chat beside four metric tiles drifting right. Three planes, no type animation, all motion is camera.

Source: https://www.raylight.app/templates/na79Evcu (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A service or agency site that has a hero, an assistant or chat widget, and a results block.
- A short silent teaser or social post where the UI is the whole story and no copy is added on top.
- Dark brands with one violet or blue accent; the glow carries the look.
- B-roll under VO: three calm planes, each long enough to read one thing.
Not for: products whose value needs interaction (clicks, typing, state changes); nothing in the UI moves here.

## Format
16:9 · 10.73 s · 30 fps · dark · music none, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.10 | 0–93 | hook | landing hero on a tilted plane: nav bar, pill badge (3–4 words), headline of 2 lines × 2 words, 2-line sub, two buttons; violet glow top right | tilt-plane leaned back ~15°, right edge farther; push-in 1.00→1.04 over 93 fr (~1.2 %/s), no pan | nothing inside the page moves; camera only, easings.linear 93 fr; soft edges from depth of field | hard-cut | whoosh (planned) |
| 2 | 3.10–6.77 | 93–203 | feature | assistant chat panel: window dots, assistant header, greeting, user request bubble (accent), 2-line reply, quick-reply chip | tilt-plane, ~8° Z rotation, leaned back; dolly left ~72 px/s @1920 (2.4 px/fr), push 0.5–1 %/s | camera only: easings.linear dolly 110 fr; all bubbles already present, no entrance visible (±0.25 s) | hard-cut | swoosh-short (planned) |
| 3 | 6.77–10.73 | 203–322 | proof | wider plane: chat column left, 2×2 dark metric tiles (a time, two counts, one large count) with accent underlines | tilt-plane flatter and closer, ~-10° Z; dolly right ~100 px/s @1920 easing to ~77 px/s after 9.0 s; push-in ~2.3 %/s; roll -0.6°/s | camera only: easings.linear 119 fr with a slight slow-down; figures static (no count-up at ±0.25 s); film ends mid-move | hard-cut (end) | none |

Evidence: row 1 `sheet-01 cells 0–12` (0.00–3.00) and 30 fps strip 2.90–3.50 (cut between f93 and f94); row 2 `sheet-01 cells 13–15`, `sheet-02 cells 0–10` (3.27–6.50); row 3 `sheet-02 cells 11–15`, `sheet-03 cells 0–10` (6.77–10.50) and 30 fps strip 6.50–7.10 (cut at f203). `cuts/` is empty (cuts.json found 0 cuts; near misses at 3.10 and 6.767 confirmed as hard cuts on strips).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–3 | craft/03-camera-and-staging.md, craft/13-ui-recreation.md (TiltPlane) |
| push-in | 1, 3 | craft/03-camera-and-staging.md#drift-and-push-in |
| dolly | 2, 3 | craft/03-camera-and-staging.md (Dolly / TiltPlane pan) |
| device-browser | 1–3 | craft/13-ui-recreation.md (BrowserFrame, nav bar and window dots) |
| ui-rebuild | 1–3 | craft/13-ui-recreation.md |
| hard-cut | 1→2, 2→3 | craft/09-transitions.md |
| vignette | 1–3 | craft/06-look.md |

## Look
Palette: #080B0D background near-black, #7F84AC light text, #6F71BB violet accent (bubbles, buttons, underlines), #232141 deep violet glow, #151B2F panel navy, #51597F muted UI text. Type: bold geometric grotesk hero, title case, 2 lines, ~6 % H; small sans UI text; mid-weight grotesk figures. Treatment: vignette, depth-of-field falloff toward the far edge. Background: flat near-black with one violet glow behind the plane.

## What to adapt
- Copy: hero 2 lines of 2 words each with periods, a 2-line sub, two button labels, a 3–4 word badge; chat 3–4 messages; 4 metrics with 1–3 word labels.
- Brand: the accent paints the user bubble, primary button, quick-reply chip and metric underlines; the logo sits in the nav, top left of plane 1 and 2.
- Timing: rows keep 93 / 110 / 119 fr; stretch only row 3 for a longer close. Under 75 fr per plane the small UI text cannot be read.

## Pitfalls
- Direction flips at every cut (push only → pan left → pan right); keeping one direction makes the cuts read as jumps in a single take.
- Speeds are slow (2.4–3.4 px/fr @1920); faster dolly makes the tilted small text strobe.
- The UI is very dark (most pixels below L 0.2); keep text contrast on the panels or the plane reads as black at feed brightness.
- Nothing animates inside the UI; adding bubble pops or counters changes the recipe into a chat demo. Do it only on purpose.

## Missing components
- MetricTileGrid: 2×2 dark tiles, label with icon top left, figure 1.4× label size, accent underline 40 % width, 12 px gap (techniques: ui-rebuild). Can be built inline from Counter with `duration` 0.

## Proposed terms
- direction-flip cut: hard cut where the camera move reverses direction from the previous shot, rows 1→2→3 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; cut frames 1 fr from 30 fps strips at t = 2.90 and 6.50 (temporary, not kept). Pan and zoom rates from motion.json per second. Not measurable: tilt angles (estimated from plane edges, ±3°), depth-of-field amount, any easing inside a shot beyond "near constant". SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats).

## Study log
id tilted-site-chat-metrics · family product-ui · 10.73 s · 3 rows (2 hard cuts at f93, f203, found on strips; cuts.json had 0).
Techniques: 7 (tilt-plane, push-in, dolly, device-browser, ui-rebuild, hard-cut, vignette). cut_on_beat: n/a, no audio.
Not measurable: tilt angles (±3°), DOF amount; entrances inside the UI none visible at 0.25 s.
Proposed terms: direction-flip cut. Missing components: MetricTileGrid.
Phase B: not run.
