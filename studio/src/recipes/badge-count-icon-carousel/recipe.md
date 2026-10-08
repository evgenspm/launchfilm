# Endless icon carousel with badge counts

Five rounded app tiles glide left in an endless row at constant speed; twice a red badge pops onto one tile, counts up, then shrinks away. A seamless 10 s loop that says the product sits among the tools people use.

Source: https://jitter.video/template/the-vault-app-icons/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An integrations or ecosystem beat: the product lives next to tools the viewer knows
- A seamless loop for a landing page hero, waitlist or social card
- Showing activity (unread items, alerts) without any UI rebuild
- A family of apps or cards presented as equals
Not for: films that need a claim or a CTA on screen (there is no copy at all), or products with no recognisable mark to put on a tile.

## Format
other (1322×992, ~4:3) · 10.00 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.93 | 0–58 | hook | row of rounded tiles on a dark corner gradient; red badge lands on the second tile, counts 1 to 5, shrinks out | dolly left, constant 312 px/s @1920 (10.4 px/fr), easings.linear | badge enters f4, springs.pop 3 fr (overshoot not measurable); 1 at f7, steps every 3 fr to 5 at f18 (counter, no roll); holds to f54; exit easings.inExpo 4 fr, gone f58 | hard-cut | notification |
| 2 | 1.93–4.50 | 58–135 | feature | row glides with no badge; first tile leaves left, pale lavender wordmark tile enters right at 2.50 | same dolly | none in-row; one tile crosses the right edge every 60 fr | hard-cut | |
| 3 | 4.50–6.13 | 135–184 | feature | deep blue card tile enters right, white card tile leaves left | same dolly | none in-row; tiles hard-cropped at the frame edge, no fade or scale | hard-cut | |
| 4 | 6.13–7.93 | 184–238 | feature | red badge lands on the lavender tile (second in row), counts 1 to 2, holds, shrinks out | same dolly | badge enters f184, springs.pop 3 fr (overshoot not measurable); steps to 2 at f190; holds to f234; exit easings.inExpo 4 fr, gone f238 | hard-cut | notification |
| 5 | 7.93–10.00 | 238–300 | feature | row returns to the opening order so frame 300 matches frame 0 | same dolly | none in-row; 5 tiles × 60 fr = 300 fr cycle | hard-cut | |

Evidence per row:
1. sheet-01 cells 0–7 (badge 1 at 0.27, 4 at 0.50, 5 at 0.77–1.77), cell 8 (no badge at 2.00); 30 fps strips at t = 0 and 1.5 s.
2. sheet-01 cells 8–15 (lavender tile enters at 2.50, cell 10), sheet-02 cells 0–1.
3. sheet-02 cells 2–8 (blue tile edge at 4.50, cell 2; white tile gone by 5.77, cell 7).
4. sheet-02 cells 9–15 (badge 1 at 6.27, 2 at 6.50–7.77); 30 fps strips at t = 6 and 7.5 s.
5. sheet-03 cells 0–7 (9.77 shows blue card, logo tile, white card as at 0.00).
No cuts: cuts.json has 0 hard, 0 soft, 0 flashes, so no cut frames to open.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| dolly | 1–5 | craft/vocabulary.md#camera (Dolly), craft/04-motion.md easings.linear |
| counter | 1, 4 | craft/vocabulary.md#type (Counter, stepped digits, no roll) |

Catalogue hints not used: notification-stack (no banners, only a badge on a tile), device-phone (no device), card-grid (single row, no cascade), horizon-arc and card-tunnel (not visible in any cell).

## Look
Palette: #1A1A1A background (top-left), #0E0E0E background (bottom-right corner of the gradient), #0002C7 deep blue tile and mark, #D1EAFD pale blue tile, #F5F6F7 white tile, #E5E6F6 lavender tile; badge red (~#FF3B1F, not in palettegen output, too small). Type: small medium grotesk labels inside tiles (~1.2 % H); badge numeral white on red, ~2.5 % H. Treatment: none. Background: diagonal dark gradient, lighter top-left to near-black bottom-right.

## What to adapt
- Copy: none. Tiles carry marks; at most a short label (1–2 words) or a masked number on a card tile.
- Brand: the brand mark goes on one tile (the tile that gets the first badge); the badge colour can take the brand accent if it is warm, else keep alert red.
- Timing: keep the 60 fr tile step and the constant speed; loop length must equal tiles × step for the seam to vanish. Badge entries stay at 3 fr, digit steps at 3 fr.

## Pitfalls
- Any easing on the row breaks the loop seam: it must be easings.linear end to end.
- Badges sit on the tile corner and move with it; anchor them to the tile, not the frame.
- The badge exit is 4 fr and shorter than the hold (36–44 fr); a long fade reads as a glitch.
- Tiles are cropped by the frame edge, not faded: no edge vignette.

## Missing components
- IconCarousel: endless horizontal row of rounded tiles (edge 11 % W, radius 22 % of edge, gap 3.5 % W), constant linear travel, wraps tiles for a seamless loop of tiles × step frames (techniques: dolly)
- TileBadge: red pill anchored to a tile's top-right corner, pop in springs.pop 3 fr, stepped count via Counter every 3 fr, scale-out easings.inExpo 4 fr (techniques: counter)

## Proposed terms
- icon-carousel: an endless linear row of app tiles drifting sideways as a loop, rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)
- badge-pop: a count badge popping onto an icon and counting up, rows 1 and 4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 0, 1.5, 6, 7.5 s (badge timings). Pan from motion.json (309–315 px/s @1920 every second). Not measurable: badge overshoot (3 fr entrance too short even at 30 fps), exact tile radius. motion.json zoom 0.05–0.77 %/s is not visible in the sheets (tile size constant) and is treated as noise. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/0 cuts (no cuts, no beats).

## Study log
id badge-count-icon-carousel · family product-ui · 10.00 s, 5 rows, 0 cuts, loopable.
Techniques: 2 (dolly, counter). cut_on_beat: n/a, 0/0 (silent, no cuts).
Measured: constant pan 312 px/s @1920, tile step 60 fr, badge in f4/f184, digit step 3 fr, badge exit 4 fr (strips).
Not measurable: badge overshoot, tile corner radius exact.
Proposed terms: icon-carousel, badge-pop.
Missing components: IconCarousel, TileBadge.
Phase B: not run (study only).
