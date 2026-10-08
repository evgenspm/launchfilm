# Dark laptop pose reel with beat words

A dark laptop on charcoal: one word per beat above the closed lid, then five poses (swing-open, two ramped pushes, front lid-open, spin-up fly-in), each with a new screen; brand word and a two-word line close. It works because every reveal is a light event: the screen turning on lights the whole frame.

Source: https://www.raylight.app/templates/Z5z55UI7 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A desktop or web product that wants a premium hardware-style teaser
- Five hero screenshots, each worth its own camera pose
- Short brand teaser where the screen lighting up is the reveal
- Dark brand palette with a single bright type colour
Not for: mobile-first products, films that need to explain a workflow, light brands.

## Format
16:9 · 22.27 s · 30 fps · dark · music 101.1 BPM, cut_on_beat 0/0 (no cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.90 | 0–87 | hook | closed dark laptop low-centre; 4-word phrase above, one word at a time, last word names the product | near-static, laptop yaws ~15 deg, zoom +0.8 %/s | words replace on beats at 0.27 / 0.77 / 1.27 s, no in-animation (±0.25 s); yaw easings.linear 87 fr; last word clears letter by letter ~3.00 s | continuous | tick (planned) |
| 2 | 2.90–6.37 | 87–191 | reveal | laptop swings ~60 deg toward camera, lid opens, screen powers on (warm landscape), then drifts | orbit ~60 deg in ~36 fr, then drift; frame luma +34 % as the screen lights | swing easings.inOutSine ~36 fr; lid passes ~75 deg at 3.33–3.50 s, ~20 fr; settle springs.heavy (overshoot not measurable) | continuous | swell (planned) |
| 3 | 6.37–8.00 | 191–240 | feature | close 3/4 high angle, new cool dune screen, laptop large and cropped right | push-in x1.23 over 49 fr, speed-ramp thirds 6 / 29 / 11 px/fr | speed-ramp easings.inOutSine 49 fr | continuous | whoosh (planned) |
| 4 | 8.00–9.57 | 240–287 | feature | low angle, keyboard foreground, snowy peak screen; laptop drifts right off frame | push-in x1.48 over 47 fr, speed-ramp thirds 5.6 / 25.7 / 7.9 px/fr | speed-ramp easings.inOutSine 47 fr | continuous | whoosh (planned) |
| 5 | 9.57–12.17 | 287–365 | feature | front view ~10 deg elevation, closed laptop opens to a misty blue landscape, holds | static | lid opens 10.00 → 10.65 s, ~20 fr easings.inOutSine; screen lit while opening; hold 45 fr | continuous | swoosh-short (planned) |
| 6 | 12.17–15.10 | 365–453 | feature | tiny closed laptop top-down far away spins and flies toward camera, flips open in 3/4 with an earth screen | object 4 % → 60 % of frame over ~70 fr, ~180 deg rotation, ease-in | fly-in easings.inExpo ~70 fr; lid flips open 14.27–14.77 s (±0.25 s); land springs.heavy (overshoot not measurable) | continuous | whoosh (planned) |
| 7 | 15.10–17.23 | 453–517 | logo | brand word alone, centred, soft glow; music silent 15.70–17.21 s | static | appears whole between 15.00 and 15.27 s (entrance not measurable; suggested BlurIn 8 fr); held 61 fr | continuous | silence-beat (observed) |
| 8 | 17.23–22.27 | 517–668 | outro | closing line, 2 words with a period, centred, held to the end | static | swaps in at 17.21 s as music returns (±0.25 s); held 151 fr; no exit | end | hit (planned) |

Evidence per row: 1 sheet-01 cells 0–12; 2 sheet-01 cells 12–15, sheet-02 cells 0–9; 3 sheet-02 cells 10–15; 4 sheet-03 cells 0–6; 5 sheet-03 cells 7–15, sheet-04 cell 0; 6 sheet-04 cells 1–12; 7 sheet-04 cells 13–15, sheet-05 cells 0–4; 8 sheet-05 cells 5–15, sheet-06 cells 0–8. cuts/ is empty (0 cuts in cuts.json).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1–6 | craft/03-camera-and-staging.md, studio LaptopFrame |
| device-3d | 1–6 | craft/03-camera-and-staging.md |
| orbit | 2, 6 | craft/03-camera-and-staging.md |
| speed-ramp | 3, 4 | craft/04-motion.md |
| push-in | 1, 3, 4 | craft/03-camera-and-staging.md |
| glow | 1, 7, 8 | craft/06-look.md |
| vignette | 1–8 | craft/06-look.md |

## Look
Palette: #191C1E background charcoal, #D0D2D1 type white, #A79A7E warm screen accent, #292D2E radial spot, #625B50 warm mid, #414343 laptop edge. Type: bold geometric sans, sentence case, ~6 % H, white with a soft outer glow. Treatment: glow, vignette. Background: lifted charcoal with a soft radial spot behind the laptop, not black.

## What to adapt
- Copy: hook = 4 single words (≤ 8 letters each), last one the product name; brand word (1 word); closing line (2 words, period).
- Brand: screens carry all the colour; type stays white; swap the five wallpapers for five product screenshots.
- Timing: rows 3–4 must keep 47–49 fr with the ramp; lid open stays ~20 fr; row 8 hold can shrink to 3 s.

## Pitfalls
- The laptop must stay dark on dark; the screen is the key light. A bright body kills the reveal.
- The pushes are ramped (slow, 5x middle, slow); a constant push reads as a slideshow.
- No cuts in the reference: pose changes happen between near-identical darks; a rebuild may hard-cut at 6.37 / 8.00 / 9.57 / 15.10 s, which the human study measured as cuts.

## Missing components
- LaptopFlyIn: top-down closed laptop from 4 % to 60 % of frame over ~70 fr with ~180 deg spin and lid flip at the end, easings.inExpo (techniques: device-3d, orbit)

## Proposed terms
- word-per-beat: single words replace each other on music beats inside one continuous shot (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- device-fly-in: device flies in from far away top-down, spinning into its pose (row 6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; swing, push ramps, lid open and fly-in from the human 30 fps study. Not measurable: word entrance curves, spring overshoot, letter-clear stagger at 3.00 s. SFX planned by the glue rule, not measured (except the observed music silence 15.70–17.21 s). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id dark-laptop-pose-reel · family 3d-device · 22.27 s, 8 rows, one continuous shot (0 cuts in cuts.json).
7 techniques (device-laptop, device-3d, orbit, speed-ramp, push-in, glow, vignette). cut_on_beat 0/0 → false.
Not measurable at 0.25 s: type entrances, overshoot, letter stagger; timings from human 30 fps study where noted.
Proposed terms: word-per-beat, device-fly-in. Missing components: LaptopFlyIn.
phase B: not run.
