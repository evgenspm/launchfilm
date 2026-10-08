# Scrolling page card with typed address

A chrome-less landing page on a rounded card scrolls up and out, the domain types itself in the gap, then a dark section drops in, scrolls, and the page whips back to its hero so the last frame matches the first.

Source: https://jitter.video/template/website-promo/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing off a finished marketing page or portfolio site in a short silent loop.
- Agency reels and client handovers where the page design is the product.
- A launch post that needs the domain on screen without an end card.
- Autoplay feeds on loop: frame 8.77 returns to frame 0.
Not for: products whose value is an interaction (clicks, typing in the app); a static page scroll cannot show behaviour.

## Format
16:9 · 9.00 s · 30 fps · light (white frame, card alternates light and dark) · no music, no BPM, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.83 | 0–85 | hook | light page card (black header, 2-line headline, pale glass image) scrolls to a work grid and exits up; domain types in on white | dolly: page up about 0.9 card heights 0.50 to 1.27, card leaves through the top by 1.50 (±0.25 s) | scroll easings.inOutSine 38 fr; exit easings.inExpo ~8 fr (±0.25 s); address typewriter from 1.10, ~22 cps, done 1.77; hold 15 fr; blur-out 2.50 to 2.83, 10 fr (±0.25 s) | blur-dissolve | type-click |
| 2 | 2.83–6.50 | 85–195 | feature | dark card drops from above: services list (12 lines, one bright), about block, dark hero with 2-line headline and a link | dolly: card drops to top 0.15 H, 2.77 to 3.77; inner page scrolls down to 5.77, then reverses | entrance springs.heavy ~30 fr (overshoot not measurable); inner scroll easings.inOutSine, section changes 4.50 and 4.77; reversal 5.77 (±0.25 s) | slide-push | swoosh-short |
| 3 | 6.50–9.00 | 195–270 | feature | same card scrolls back fast through about, services with client logos, work grid, glass image to the light hero | dolly with speed-ramp: slow at 6.50, ~640 px/s at 1920 W in 7.00 to 8.00, ~110 px/s settling | reverse scroll easings.inOutCubic 37 fr (6.50 to 7.73, ±0.25 s); hero settles easings.outQuint ~30 fr into the 0.00 layout by 8.77 | hard-cut | whoosh |

Evidence: row 1 sheet-01 cells 0–11, kf-000.50, kf-001.50, kf-002.50, cuts/cut-002.83.jpg (before). Row 2 sheet-01 cells 11–15, sheet-02 cells 0–9, kf-003.50 to kf-005.50, cuts/cut-002.83.jpg (after), cuts/cut-006.50.jpg (before). Row 3 sheet-02 cells 10–15, sheet-03 cells 0–3, kf-006.50 to kf-008.50, cuts/cut-006.50.jpg (after), motion.json seconds 6–8.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-browser | 1–3 | craft/vocabulary.md#ui (page on a rounded card, no browser chrome) |
| dolly | 1–3 | craft/03-camera-and-staging.md (vertical travel across a long page plane) |
| typewriter | 1 | craft/05-typography.md (address typed from a fixed left edge) |
| blur-dissolve | 1 | craft/09-transitions.md#blur-dissolve (address blurs out, 2.50 to 2.83) |
| slide-push | 2 | craft/09-transitions.md (dark sections pushed out by lighter ones on the reverse scroll) |
| speed-ramp | 3 | craft/vocabulary.md#camera (reverse scroll accelerates then decelerates) |

## Look
Palette: #FFFFFF frame background, #000000 page header and dark sections, #E9EFED pale image tone, #C1C6C4 image shadow, #504E4F dim list text, #836A65 warm accent in dark hero image. Type: page in bold grotesk, sentence case, tight tracking, headlines about 4 % H; address line medium grotesk, lowercase, about 5 % H. Treatment: none. Background: flat white; the card carries all colour.

## What to adapt
- Copy: one domain line, 10 to 20 characters; everything else is the user's own page capture.
- Brand: the page carries the brand; the frame stays flat (brand bg) and the address uses brand fg and display font.
- Timing: the typed address (1.10 to 2.83) and the dark card entrance (2.77 to 3.77) keep their frame counts; inner scroll 3.77 to 5.77 stretches with page length.

## Pitfalls
- The card has no browser chrome; adding a URL bar duplicates the typed address and clutters the gap.
- The return scroll must land exactly on the 0.00 layout or the loop jumps.
- The 640 px/s whip in 7.00 to 8.00 is unreadable on purpose; do not hold on mid-page content there.
- The dark card arrives before the address has fully faded (2.77 vs 2.83); a clean gap makes the cut feel late.

## Missing components
- PageScrollCard: rounded card (66 % W, radius ~1.6 % W) showing a tall page image at scrollY keyframes with named easings, can exit through the frame top and re-enter from above (techniques: device-browser, dolly, speed-ramp). BrowserFrame exists but always draws chrome (BROWSER_CHROME 104).

## Proposed terms
- page-scroll-loop: a page capture scrolled down and back so the last frame equals the first, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: entrance overshoot on the dark card, exact easing of the reverse scroll, typing cadence below 0.25 s. Palette from palettegen on kf-000.50, kf-004.50, kf-005.50 (cut frames are before/after composites). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no audio, no hard cuts). Catalogue hint stacked-roll not confirmed: the services list is static page design.

## Study log
id page-scroll-url-loop · family product-ui · 9.00 s, 3 rows (soft transitions at 2.83 and 6.50, 0 hard cuts).
Techniques 6: device-browser, dolly, typewriter, blur-dissolve, slide-push, speed-ramp. Difficulty medium, render light.
cut_on_beat 0/0 (silent reference). loopable true (8.77 matches 0.00).
Not measurable at 0.25 s: overshoot, typing cadence, exact scroll easing.
Proposed terms: page-scroll-loop. Missing components: PageScrollCard (chrome-less page card).
Phase B: not run (study job).
