# Tablet wall dive with sliding screen reel

The camera pushes from a wall of landscape tablets into the centre one; its screens slide down one after another every 1.5 s, the strip showing past the bezel, then the camera pulls back out to the wall.

Source: https://jitter.video/template/animated-ipad-mockup/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing 3-5 screens of a tablet or landscape app without any copy
- A short silent loop for a product page, gallery or social feed
- Placeholder-first: screenshots are ready but there is no story or VO yet
- Opening a longer device showcase with a wall-to-hero camera move
Not for: products that need a claim, a name or a CTA on screen (there is no type layer); portrait phone apps (use a phone recipe).

## Format
other (1322x992, 4:3) · 8.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.83 | 0–25 | hook | 3x3 wall of black-bezel landscape tablets on dark violet, flat screen tints; camera dives into the centre one | push-in, centre tablet 0.39 W -> 0.75 W (about 1.0 -> 1.9) over 25 fr; bg violet -> grey -> pale | springs.cameraIn 25 fr, settles by f30 (overshoot not measurable, ±0.25 s); neighbours leave frame by f15 | hard-cut | whoosh |
| 2 | 0.83–2.50 | 25–75 | feature | hero tablet on pale blue-white; first screen (white, label + 3-line caption) slides down, saturated blue screen enters from the top | settle 1.9 -> 2.0 by f38, then locked | strip moves down one screen height, start f31, easings.inOutCubic 38 fr; covered 22/52/80/93/98 % at 0.25 s steps | slide-push | swoosh-short |
| 3 | 2.50–4.00 | 75–120 | feature | blue screen slides down, light-blue screen enters from the top; outgoing screen visible below the bezel | locked, drift <= 0.4 %/s | same slide, start f76, inOutCubic 38 fr, hold 7 fr; period 45 fr | slide-push | swoosh-short |
| 4 | 4.00–5.50 | 120–165 | feature | light-blue screen slides down, white screen enters from the top | locked, drift <= 0.3 %/s | same slide, start f121, inOutCubic 38 fr, hold 7 fr | slide-push | swoosh-short |
| 5 | 5.50–6.87 | 165–206 | feature | white screen slides down, blue screen enters from the top and holds | locked, drift <= 0.3 %/s | same slide, start f166, inOutCubic 38 fr, hold 2 fr | hard-cut | swoosh-short |
| 6 | 6.87–8.00 | 206–240 | feature | camera backs out to the same 3x3 wall on dark violet; centre screen now blue | pull-out, centre tablet 0.71 W -> 0.40 W (about 2.0 -> 1.0) over 24 fr; bg pale -> grey -> violet | springs.cameraOut 24 fr (±0.25 s); neighbours enter by f218; holds f230–f240 | hard-cut | whoosh |

Evidence per row:
1. sheet-01 cells 0–4 (0.00, 0.27 soft, 0.50 soft, 0.77 soft, 1.00 soft), cuts/cut-000.07.jpg (before 0.03 | after 0.83), keyframes/kf-000.50.jpg; cuts.json soft 0.07–0.83 hint zoom; motion.json second 0 zoom +100.6 %/s.
2. sheet-01 cells 4–10 (1.00–2.50), keyframes/kf-001.50.jpg (blue top half, white lower half, strip continuing above and below the bezel).
3. sheet-01 cells 10–15 (2.50–3.77), sheet-02 cell 0 (4.00), keyframes/kf-002.50.jpg, kf-003.50.jpg.
4. sheet-02 cells 0–6 (4.00–5.50), keyframes/kf-004.50.jpg.
5. sheet-02 cells 6–11 (5.50–6.77), keyframes/kf-005.50.jpg, kf-006.50.jpg.
6. sheet-02 cells 12–15 (7.00 soft, 7.27 soft, 7.50 soft, 7.77 soft), cuts/cut-006.87.jpg, keyframes/kf-007.50.jpg; cuts.json soft 6.87–7.67 hint zoom; motion.json second 7 zoom −45.6 %/s.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| push-in | 1 | craft/vocabulary.md#camera, craft/04-motion.md#springs (cameraIn) |
| pull-out | 6 | craft/vocabulary.md#camera, craft/04-motion.md#springs (cameraOut) |
| slide-push | 2–5 | craft/vocabulary.md#transitions (used inside the screen, not between shots) |
| device-phone | 1–6 | craft/vocabulary.md#ui (framed device; here a landscape tablet, see Proposed terms) |

## Look
Palette: #EEFAFF hero background (pale blue-white), #000000 bezel, #27A9FD saturated screen blue / label colour, #C8EBFE light-blue screen, #FFFFFF white screen, #312845 dark violet wall background. Type: placeholder labels only, medium geometric sans, centred, about 6 % of frame height. Treatment: none. Background: flat colour that cross-fades with the camera move (violet on the wall, pale on the hero).

## What to adapt
- Copy: none on screen; all content is the screenshots.
- Brand: the accent tints the wall screens and one reel screen; the hero background is a very light tint of the accent; the wall background is a dark brand surface.
- Timing: the number of reel screens sets the middle length (45 fr each); the dive (25 fr) and pull-out (24 fr) keep their frame counts.

## Pitfalls
- The strip is narrower than the device: it shows past the bezel at about 0.57 W while the device is about 0.81 W; a strip clipped to the screen loses the depth cue.
- Slides always run downward at a 45 fr period; alternating direction or uneven holds breaks the reel rhythm.
- Background colour must travel with the camera (dark on the wall, pale on the hero) or the dive reads as a scale tween, not a camera move.
- First and last frames match in layout but not in centre screen; loop only if the last reel screen equals the first.

## Missing components
- TabletFrame: flat front-on landscape tablet, black bezel about 3 % of device width, rounded corners about 5 %, side camera dot, screen 4:3 (1180x820 slot) (techniques: device-phone)
- DeviceWall: 3x3 grid of TabletFrame copies, gap about 0.13 device width, centre cell is the hero for a Camera dive (techniques: push-in, pull-out)
- ScreenReel: vertical strip of N screens, slides down one screen per period (38 fr inOutCubic + 7 fr hold), clipped to the screen but echoed outside the bezel at reduced width (techniques: slide-push)

## Proposed terms
- device-tablet: framed landscape tablet, the tablet variant of device-phone (rows 1–6) (not in craft/vocabulary.md; not used in recipe.json)
- device-wall: grid of identical devices the camera dives into and backs out of (rows 1, 6)
- screen-reel-overflow: screens sliding inside a device while the strip stays visible outside the bezel (rows 2–5)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: spring overshoot on the dive and pull-out, exact slide curve (inOutCubic fitted to covered share at 0.25 s steps), camera start frame within ±7 fr. Device widths measured on sheet cells and keyframes as share of frame width. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no audio, no hard cuts).

## Study log
id tablet-wall-screen-reel · family 3d-device · 8.00 s, 6 rows (0 hard cuts, 2 soft zoom transitions as row boundaries, middle shot split at each screen slide).
Techniques 4 (push-in, pull-out, slide-push, device-phone); difficulty easy, render_cost light.
Audio: none, cut_on_beat n/a (0/0); sfx planned by the glue rule.
Not measurable: overshoot on camera springs, slide curve beyond ±0.25 s.
Proposed terms: device-tablet, device-wall, screen-reel-overflow.
Missing components: TabletFrame, DeviceWall, ScreenReel.
Phase B: not run (study batch).
