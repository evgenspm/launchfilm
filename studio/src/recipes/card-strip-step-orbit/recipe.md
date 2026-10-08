# Card strip step-slide into scattered orbit

A row of full-bleed image cards steps sideways one card at a time on light grey, punches in once, then hard-cuts to the same five cards scattered in a ring that turns one revolution with a colour-fringe edge.

Source: https://www.raylight.app/templates/OOF18XMl (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing 4 to 6 portfolio images, posters or product shots without any copy.
- A vertical social teaser for a template, design or merch drop.
- A gallery beat inside a longer film where the visuals carry the message.
- Silent autoplay where motion alone must hold attention.
Not for: films that need to explain a feature or carry a claim; there is no type layer at all.

## Format
9:16 · 17.13 s · 30 fps · light · music none (no audio track), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | horizontal strip of tall image cards, edge to edge, band ~47 % H centred on flat grey; product card left, poster right | strip slides right ~1 card width (about 220 then 400 px/s @1920), scale 1.00 → 1.06 | strip steps right by one card, springs.ui ~20 fr (overshoot not measurable, ±0.25 s), step lands 1.50; third card enters from the left edge | slide-push | swoosh-short |
| 2 | 2.00–3.00 | 60–90 | feature | three cards visible: new dark card left, product card centre, poster clipped at the right edge | static strip (pan -2 px/s) | hold 30 fr, nothing moves | slide-push | none |
| 3 | 3.00–4.00 | 90–120 | feature | strip steps right again; the dark card reaches centre and a bright blue-yellow poster card enters from the left | pan right ~980 px/s @1920 over ~0.75 s | one-card step, springs.ui ~22 fr (overshoot not measurable, ±0.25 s); settles 3.77 | push-in | swoosh-short |
| 4 | 4.00–5.00 | 120–150 | feature | same three cards, the strip grows: band 47 % → 61 % H, cards overflow both edges | push-in 1.00 → 1.27 over ~24 fr (26 %/s), drift down 76 px/s | springs.cameraIn ~24 fr (overshoot not measurable, ±0.25 s); scale holds at 1.27 to the cut | slide-push | whoosh |
| 5 | 5.00–7.00 | 150–210 | feature | strip reverses and steps left twice: dark card exits left, product card passes centre, poster card lands right of centre | pan left ~710 then ~510 px/s @1920 at scale 1.27 | two one-card steps, springs.ui ~18 fr each (overshoot not measurable, ±0.25 s), second lands 6.27 | slide-push | swoosh-short |
| 6 | 7.00–8.57 | 210–257 | feature | hold: product card left half, poster card right half, strip at scale 1.27 | static (pan -1 px/s, zoom 0 %/s) | hold 47 fr, no motion; cut at f257 | hard-cut | hit |
| 7 | 8.57–10.00 | 257–300 | feature | same five images as small cards (~30–40 % W) scattered on a ring around the empty centre; cards curled like paper, colour-fringed edges | static frame, ring turns ~6 deg/s | cards sway in place, curl changes a few degrees, easings.inOutSine (±0.25 s) | hard-cut | none |
| 8 | 10.00–15.00 | 300–450 | feature | the ring of five cards turns one full revolution around the frame centre; cards foreshorten toward the edges | static frame; ring speed peaks ~1500 px/s @1920 at 12.5 | ring revolution 360 deg over 150 fr, easings.inOutSine; cards clip at the frame edge | hard-cut | riser |
| 9 | 15.00–17.13 | 450–514 | feature | ring settles back to its starting arrangement and holds | static | final settle ~15 fr springs.ui (±0.25 s), then hold 49 fr; light sway continues | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–7; motion.json s0–1 (pan 218, 402 px/s; zoom 6.1 %/s).
2. sheet-01 cells 8–11; motion.json s2 (hold).
3. sheet-01 cells 12–15 (blue-yellow card enters at 3.77); motion.json s3 (pan 979 px/s).
4. sheet-02 cells 0–3 (band grows 4.00 → 4.77); motion.json s4 (zoom 25.9 %/s).
5. sheet-02 cells 4–9 (dark card out by 5.50, poster card in at 6.27); motion.json s5–6.
6. sheet-02 cells 10–15, sheet-03 cells 0–2; cuts/cut-008.57.jpg left half.
7. sheet-03 cells 3–7; cuts/cut-008.57.jpg right half; motion.json s9 (rot 5.9 deg).
8. sheet-03 cells 8–15, sheet-04 cells 0–11 (cards orbit through every position, back near start at 14.77); motion.json s10–14 "animation".
9. sheet-04 cells 12–15, sheet-05 cells 0–4 (17.00 matches 8.77 layout); motion.json s15–17 (hold 1.00 coherence).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| slide-push | 1, 3, 5 | craft/09-transitions.md (slide-push), ShotTransition / transitionStyle |
| push-in | 1, 4 | craft/03-camera-and-staging.md#drift-and-push-in |
| orbit-ring | 7–9 | OrbitRing (presets), craft/vocabulary.md#ui |
| hard-cut | 6 | craft/09-transitions.md |

## Look
Palette: #CECECE background grey, #040404 dark card/product body, #ABBFB5 pale sage card fill, #406ECB poster blue, #E2ECA6 poster yellow-green, #9B7156 warm painting tone. Type: none of its own; all text sits inside the images. Treatment: none from the look list; shot 2 has a constant RGB fringe on card edges (see Proposed terms). Background: flat grey.

## What to adapt
- Copy: none. Five images: one product shot, three posters or covers, one bold graphic; mix dark and bright so neighbouring cards contrast.
- Brand: background grey can become the brand bg; keep it flat and mid-light so both dark and bright cards read.
- Timing: the holds (rows 2 and 6) can stretch; each step must keep ~18–22 fr and the ring revolution ~150 fr.

## Pitfalls
- The strip never scales back after the punch-in: rows 5–6 run at 1.27, cards overflow both edges.
- Steps alternate direction (right, right, then left, left); a one-way conveyor reads as a different recipe.
- In the ring, the centre stays empty the whole time; a card through the middle breaks the circle read.
- The colour fringe is only on the ring shot; adding it to the strip muddies the full-bleed images.

## Missing components
- CardStrip: horizontal row of edge-to-edge image cards, band 47 % H, stepping by whole card widths on springs.ui with optional scale punch (techniques: slide-push, push-in). Can be built with Dolly over a flex row.
- CurlCard: image card with a slight cylindrical bend (5–15 deg) and RGB fringe 2–4 px for the ring (techniques: orbit-ring).

## Proposed terms
- card-curl: image card bent like curled paper, curvature drifting a few degrees, rows 7–9 (not in craft/vocabulary.md; not used in recipe.json).
- chroma-fringe: constant RGB channel offset on card edges (not a glitch, no jitter), rows 7–9 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; pan and zoom speeds from motion.json per second. No 30 fps strips extracted. Not measurable: spring overshoot on the strip steps and the punch-in, exact ring easing, card curl angles. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id card-strip-step-orbit · family transitions · 17.13 s, 9 rows, 1 hard cut at 8.57 (f257).
Techniques: 4 (slide-push, push-in, orbit-ring, hard-cut). cut_on_beat: n/a, no audio (0/1).
Not measurable at 0.25 s: step overshoot, punch-in spring, ring easing curve, curl angles.
Proposed terms: card-curl, chroma-fringe.
Missing components: CardStrip, CurlCard.
Phase B: not run.
