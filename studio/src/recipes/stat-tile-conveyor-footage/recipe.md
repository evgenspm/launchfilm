# Stat tiles conveyor over product footage

Rounded app widgets ride a single row over blurred monochrome product footage: every ~1.55 s the row steps one slot left, a new tile lands on the right and types its data in. Ends on a two-line word-by-word close on black.

Source: https://jitter.video/template/the-track-mobile-app-showcase/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A fitness, health or tracking app whose value is a handful of personal stats (time, best result, score, count, trend).
- Vertical social promo where widgets say more than a full phone screen.
- You have one moody product or lifestyle clip and want UI layered over it without a device frame.
- Silent autoplay: data and the close carry the message, no VO.
Not for: products without numbers to show, or UI that needs a full screen to make sense.

## Format
9:16 · 11.03 s · 30 fps · dark (mid-grey footage, black close) · no music in the reference (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.73 | 0–22 | hook | blurred monochrome product close-up on a grey sweep, nothing else | pull-out ~1.035→1.00 over 30 fr, springs.cameraOut | frame 0 black, fades up in 8 fr (±0.25 s) | hard-cut | none |
| 2 | 0.73–2.27 | 22–68 | reveal | dark clock tile pops in centre; white metric tile pops in to its right and fills | drift ~0.1 %/s | tile 1 at f22 full size (springs.pop, overshoot not measurable); date label typed f27–f33; tile 2 blank f33, figure f40, unit f44, label + icon f46 | slide-push | pop |
| 3 | 2.27–3.85 | 68–116 | feature | pair slides one slot left; glass third tile (count + dot grid) appears right | drift ~0.1 %/s | row step springs.ui ~15 fr (±0.25 s); tile 3 lands 2.90–3.00, dots first, count 3.27, sub-label typed to 3.50 | slide-push | swoosh-short |
| 4 | 3.85–5.40 | 116–162 | feature | row steps left, clock tile exits left; accent tile with track-oval graphic + best-time figure lands right | drift ~0.1 %/s | step f116–f128 springs.ui 12 fr; tile blank at f123, graphic f125, figure f130, label typed f131–f140 | slide-push | swoosh-short |
| 5 | 5.40–7.00 | 162–210 | feature | white tile exits; black tile with dotted gauge + metric lands right | drift ~0.1 %/s | step ~12 fr springs.ui (±0.25 s); blank 5.77, gauge + figure 6.00, unit + label 6.27, needle settles 6.50 | slide-push | swoosh-short |
| 6 | 7.00–8.77 | 210–263 | feature | glass tile exits; grey tile with small dot chart + axis numbers lands right | drift ~0.2 %/s | step 7.00–7.27 springs.ui ~12 fr (±0.25 s); blank 7.50, title typed 7.77, dots draw left to right 7.77–8.27 | slide-push | swoosh-short |
| 7 | 8.77–9.50 | 263–285 | cta | tiles leave one by one; close line 1 (statement, 3 words) appears word by word over footage, line 2 starts | drift ~0.2 %/s | tile exits f271, f274 (1–3 fr cut-like); words f274, f278, f281, line 2 word 1 f284; easings.linear pop-on, no blur | hard-cut | tick |
| 8 | 9.50–11.03 | 285–331 | cta | hard cut to black: the close continues (instruction, 4 words) with a small mark + wordmark lockup below; hold | static | text keeps its position across the cut; line 2 words every 3 fr to f293; lockup present from f285, no entrance; holds 38 fr | hard-cut | ui-confirm |

Evidence per row: 1 `sheet-01 cells 0–2`, `cuts/cut-000.03.jpg`, strip 0.6 s; 2 `sheet-01 cells 3–8`, strip 0.6 s; 3 `sheet-01 cells 9–15`; 4 `sheet-02 cells 0–5`, strip 3.9 s; 5 `sheet-02 cells 6–11`; 6 `sheet-02 cells 12–15`, `sheet-03 cells 0–2`, `keyframes/kf-007.50.jpg`; 7 `sheet-03 cells 3–5`, strip 9.0 s, `cuts/cut-009.50.jpg`; 8 `sheet-03 cells 6–12`, strip 9.0 s.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| pull-out | 1 | craft/03-camera-and-staging.md |
| ui-rebuild | 2–6 | craft/13-ui-recreation.md |
| card-grid | 2–6 | craft/04-motion.md#springs (cards stagger in) |
| typewriter | 2–6 | craft/05-typography.md (mono labels typed in) |
| chart-draw | 5–6 | craft/13-ui-recreation.md (gauge, dot chart) |
| slide-push | 2–6 | craft/09-transitions.md (row pushes one slot) |
| word-reveal | 7–8 | craft/05-typography.md (word by word, 3–4 fr cadence) |
| end-card | 8 | craft/01-story.md, EndCard in studio/API.md |
| grain | 1–7 | craft/06-look.md |

## Look
Palette: #919291 footage grey (background), #F3F3F3 white text and light tile, #FB481F accent tile, #000000 dark tiles and close, #6E6E6E chart tile, #3F413F footage shadow. Type: bold grotesk, sentence case, tight; tile figures ~3.5 % H, close ~2.5 % H centred white; tiny uppercase mono labels ~0.8 % H. Treatment: grain. Background: footage (monochrome, soft focus, slight blur trails).

## What to adapt
- Copy: 5–6 tiles, each one label (≤ 3 words, mono caps), one figure, one unit; close = 3-word statement + 4-word instruction.
- Brand: the accent goes on exactly one tile (the hero stat); the other tiles stay black, white, glass, grey. Lockup under the close.
- Timing: keep the ~47 fr step period and 12 fr slides; the black close can stretch to 2–3 s.

## Pitfalls
- Tiles must land blank and fill in stages (figure, unit, label ~7/4/2 fr apart); landing full looks like a static slide.
- Only three tiles are fully visible at a time; a fourth sits half off-frame at each edge. Larger tiles break the conveyor.
- One accent tile only; colouring several kills the hierarchy.
- The footage must be desaturated and soft, or the small tile type becomes unreadable.

## Missing components
- WidgetTile: rounded square ~27 % W, radius ~22 %, tones dark/light/glass/accent/grey, slots label (mono) / graphic / figure / unit, staged fill (figure +7 fr, unit +4 fr, label typed +2 fr) (techniques: ui-rebuild, typewriter)
- TileConveyor: horizontal row of tiles, centred, gap ~3 % W; every N frames shifts one slot left on springs.ui 12 fr, exiting tile slides off-frame, new tile lands at the right slot (techniques: card-grid, slide-push)

## Proposed terms
- widget-conveyor: a row of UI tiles that steps one slot sideways on a fixed period, one new tile in, one out (rows 2–6) (not in craft/vocabulary.md; not used in recipe.json)
- footage-bed: blurred monochrome product footage as a full-frame background under UI (rows 1–7) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.6, 3.9, 9.0 s; elsewhere 0.25 s from sheets. Not measurable: spring overshoot on tile landings and row steps (strips show no visible overshoot at 180 px width). Background luminance ~0.30 (between the dark and light rules); theme set dark because the close is black and the grey is closer to the dark threshold. Accent hex from a keyframe crop; palette from palettegen on keyframes 1.5, 7.5, 10.5. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts (no beats).

## Study log
id stat-tile-conveyor-footage · family mobile-app · 11.03 s, 8 rows (2 hard cuts, 6 state-change splits)
techniques 9 (incl. grain) · cut_on_beat n/a (silent, no beats)
not measurable: overshoot on landings/steps; rows 3, 5, 6 at ±0.25 s
proposed terms: widget-conveyor, footage-bed
missing components: WidgetTile, TileConveyor
phase B: not run
