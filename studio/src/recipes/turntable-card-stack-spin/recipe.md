# Turntable card stack spin

Four large square cards lie overlapped on black and the whole stack turns like a turntable: a slow constant drift, then a quick ramped step that brings the next card to the front, twice in 8 s. Constant motion with two accents.

Source: https://jitter.video/template/rotating-cards/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing three to five finished visuals (posts, covers, product shots) as one set
- A silent loop for a portfolio, template pack or feature tier page
- A background plate behind a headline that needs motion but no story
Not for: anything that needs a readable message; there is no headline, and card labels turn too fast to read.

## Format
16:9 · 8.00 s · 30 fps · dark · music none (no audio track), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | four square cards overlapped on black: product photo card centre-left, patterned poster right, two more cut by the edges | static frame; stack turns clockwise about 13 deg/s around a pivot near centre-bottom | rigid group rotation, easings.linear about 0.43 deg/fr (±0.25 s) | hard-cut | none |
| 2 | 1.50–2.27 | 45–68 | feature | stack swings one step: patterned poster takes the centre, photo card slides lower right | static frame; stack scale pulses about +7 % then back | ramped step, easings.inOutSine 23 fr (±0.25 s), peak about 45 deg/s | hard-cut | whoosh (planned) |
| 3 | 2.27–5.27 | 68–158 | feature | pale blue poster card leads centre-left, patterned poster right, yellow card with a hand-held tablet enters left | static frame; drift about 13 deg/s | linear drift, easings.linear about 0.43 deg/fr, 90 fr (±0.25 s) | hard-cut | none |
| 4 | 5.27–6.00 | 158–180 | feature | second step: yellow tablet card swings to the centre, pale card exits lower right, patterned card returns top left | static frame; stack scale dips about 9 % | ramped step, easings.inOutSine 22 fr (±0.25 s) | hard-cut | whoosh (planned) |
| 5 | 6.00–8.00 | 180–240 | feature | patterned poster centre-top, photo card back at the left, yellow tablet card right | static frame; drift about 13 deg/s to the end | linear drift, easings.linear, 60 fr (±0.25 s), no stop | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–5`, `keyframes/kf-000.50.jpg`; 2 `sheet-01 cells 6–9`, `kf-001.50.jpg`; 3 `sheet-01 cells 9–15` and `sheet-02 cells 0–5`, `kf-003.50.jpg`, `kf-004.50.jpg`; 4 `sheet-02 cells 5–8`, `kf-005.50.jpg`; 5 `sheet-02 cells 8–15`, `kf-006.50.jpg`, `kf-007.50.jpg`. No cut frames exist (cuts.json: 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| speed-ramp | 2, 4 | craft/03-camera-and-staging.md, craft/04-motion.md#easings |

## Look
Palette: #000000 background, #0C4231 deep green (pattern ink, label text), #EBFB32 lime accent, #DBE9E7 pale blue-grey card, #ECF5EE off-white card, #52654F mid grey-green (photo shading). Type: no headline type; small grotesk labels printed inside the card images only (about 4 % H, sentence case). Treatment: none. Background: flat black.

## What to adapt
- Copy: none on screen; each card is an image the user supplies (3–5 squares). Labels belong inside the images.
- Brand: accent and surface tint default cards; the background stays near-black so the cards carry all colour.
- Timing: drift rows stretch freely; the two step rows keep 22–23 fr each so the accent stays sharp.

## Pitfalls
- The cards never stop: a hold of 0 deg/s reads as a freeze. Drift must keep running through and between steps.
- Cards rotate as one rigid group; animating them independently loses the turntable read.
- The stack is larger than the frame (cards about 0.6 H, cut by edges); shrinking it to fit shows the pivot and flattens the depth.
- Catalogue hint says 3D flips; the sheets show only flat in-plane rotation. Do not add flips.

## Missing components
- CardStackSpin: N square image cards (0.6 H) laid around a pivot at (0.5 W, 0.9 H), each offset 360/N deg plus jitter ±8 deg; group rotation = drift deg/s + inOutSine steps of 360/N deg at given frames; z-order by angle (techniques: speed-ramp)

## Proposed terms
- turntable-spin: rigid in-plane rotation of an overlapped card stack around one off-centre pivot, with stepped accents; rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; rotation and scale rates from motion.json per-second means. Not measurable: exact step start/end frames (±0.25 s), whether the steps overshoot (overshoot not measurable), the exact pivot point (estimated from card paths). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no audio, no cuts).

## Study log
id turntable-card-stack-spin · family product-ui · 8.00 s, 5 rows, 0 cuts · 1 technique (speed-ramp) · cut_on_beat n/a (silent, no cuts).
Not measurable at 0.25 s: step boundaries, overshoot, pivot position.
Proposed terms: turntable-spin. Missing components: CardStackSpin.
Catalogue hint (3D flip, device-3d, card-grid) not confirmed by the sheets; flat in-plane rotation only.
Phase B: not run (study only).
