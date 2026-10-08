# Phone header snap-zoom into a bills list

A blue phone card materialises on white, the camera snaps into its greeting header and pans across it, whips away, then a bills list with filter chips builds and the camera dives onto one row's status pill before fading to white.

Source: https://www.raylight.app/templates/OPCRMePg (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A mobile finance or billing app with a personal home header and a list screen
- A short silent loop for a landing page hero or social post
- Showing two screens of a phone app at detail zoom without a full device shot
- A light, clean brand where one saturated colour carries the app
Not for: desktop products, or apps whose value needs more than two screens to explain.

## Format
16:9 · 9.7 s · 30 fps · light · music none (silent), cut_on_beat n/a · VO no · loopable (first and last cells are the same empty white frame)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.10 | 0–33 | hook | white frame; tall rounded blue phone screen (gradient fading to white at the bottom) appears centred; avatar and greeting start | static frame; card scales ~0.9 to 1.0, drifts slightly left | card fades + blurs in from a pale ghost at 0.27, springs.ui ~15 fr (±0.25 s, overshoot not measurable); avatar f30, greeting blur-in from f32 | zoom-tier | whoosh |
| 2 | 1.10–4.70 | 33–141 | reveal | close-up of the phone header: status bar (clock, island pill, signal), round avatar, 2-word greeting; 2 action icons appear on the right | zoom-tier full to detail (~3.2x) f33–f38, settles f53; pan right f60–f75 (~185 px/s @1920); drift scale 1.00 to 0.97 f90–f128; whip up-left f128–f141 | zoom springs.cameraIn ~20 fr; greeting blur-in done f45; pan easings.outExpo 15 fr with motion blur; search icon blur-in f75, send icon f83 (stagger ~8 fr, ±0.25 s); whip easings.inExpo 13 fr | whip-pan | tick |
| 3 | 4.70–7.00 | 141–210 | feature | white list screen, no device frame: 2 filter chips (active + idle) top-left, then 2 bill rows (round icon, 2-word title, grey sub-line) | push-in 1.00 to 1.25 f158–f195 (chip width 106 to 132 px), easings.inOutSine, accelerating from f203 | chips fade in f141–f150; active chip fills grey f150 then near-black f158 (springs.ui); rows build icon, title, sub-line, row stagger ~8 fr, easings.outExpo 12 fr (±0.25 s); settled f173 | zoom-tier | ui-confirm |
| 4 | 7.00–9.00 | 210–270 | feature | detail tier on row 2: its title huge at the left edge, sub-line below, orange outlined status pill with a dot to the right | zoom-tier element to detail f203–f218 with motion blur; drift f225–f240; steps out ~0.8x and pans right f240–f248; hold to f263 | zoom easings.inExpo into springs.cameraIn ~15 fr; pill blur-in from pale f218, sharp f225 (springs.ui, ±0.25 s); exit f263: everything blurs and fades to white ~7 fr (±0.25 s) | blur-dissolve | pop |
| 5 | 9.00–9.70 | 270–291 | feature | empty white frame, same as frame 0 (loop point) | static | none; 21 fr hold | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–4 (0.00–1.00); cuts/cut-001.10.jpg (before 1.07).
2. sheet-01 cells 5–15 (1.27–3.77), sheet-02 cells 0–2 (4.00–4.50); cuts/cut-001.10.jpg (after 1.27), cuts/cut-004.70.jpg (before 4.67); keyframes kf-001.50, kf-003.50.
3. sheet-02 cells 3–11 (4.77–6.77); cuts/cut-004.70.jpg (after 4.70, blank white); keyframe kf-005.50.
4. sheet-02 cells 12–15 (7.00–7.77), sheet-03 cells 0–3 (8.00–8.77); keyframe kf-007.50.
5. sheet-03 cells 4–6 (9.00–9.50); motion.json second 9 = hold.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–2 | craft/vocabulary.md#ui, PhoneFrame |
| ui-rebuild | 1–4 | craft/vocabulary.md#ui |
| blur-in | 1, 2, 4 | craft/vocabulary.md#type, BlurIn |
| zoom-tier | 1→2, 3→4 | craft/vocabulary.md#camera, FocusCamera / ZOOM_TIERS |
| dolly | 2 | craft/vocabulary.md#camera, Dolly |
| whip-pan | 2→3 | craft/vocabulary.md#camera |
| list-assemble | 3 | craft/vocabulary.md#ui, ListAssemble |
| push-in | 3 | craft/vocabulary.md#camera |
| blur-dissolve | 4→5 | craft/vocabulary.md#transitions |
| motion-blur | 2, 3→4 | craft/vocabulary.md#look |

## Look
Palette: #FFFFFF background, #0B0B0B list text and active chip, #4262FC phone accent (gradient to #5573FD and lighter at the bottom), #E69365 status pill, #CDD1FE island pill and soft tints, #7D8898 grey sub-lines. Type: geometric grotesk; header bold sentence case ~6 % H at close-up; list titles regular, sub-lines small grey; chip labels medium. Treatment: motion-blur. Background: flat white; the phone screen is a vertical blue gradient with no bezel.

## What to adapt
- Copy: greeting 2 words; 2 chip labels of 1–2 words; 2 rows with a 1–2 word title and a 2–4 word sub-line; 1 status word.
- Brand: the accent fills the phone screen; the status pill uses a second warm colour; no logo appears anywhere (add an end card if needed, the loop then breaks).
- Timing: holds in rows 2 and 3 can stretch; the zoom snaps (5–15 fr), the whip (13 fr) and the 7 fr exit keep their frame counts.

## Pitfalls
- The only hard cut (f141) sits at the end of a whip with heavy motion blur; without blur on the last 5 fr the cut reads as a jump.
- The phone is never shown whole after 1.10 s: the camera works at detail tier, so the UI must be rebuilt crisp (no screenshots).
- Keep a 21 fr empty white tail or the loop to frame 0 pops.

## Missing components
- StatusPill: outlined rounded pill with a filled dot and a 1-word label, tinted fill at ~10 % of the stroke colour (techniques: ui-rebuild)
- FilterChips: row of 2–3 pill tabs, one active with near-black fill and white label, others light grey; active fill animates on springs.ui (techniques: ui-rebuild)

## Proposed terms
- status-pill: coloured outlined status chip with a dot, revealed by a zoom onto a list row (row 4) (not in craft/vocabulary.md; not used in recipe.json)
- filter-chips: segmented pill tabs with one active fill (row 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: overshoot of every spring, exact stagger of icons and rows, exact zoom snap duration (soft transition detected 1.10–1.27). Zoom factors estimated from object widths on sheets and from motion.json (zoom 108 %/s in second 0, 30 %/s in second 6). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts, no beats (no audio).

## Study log
id phone-zoom-header-bills · family mobile-app · 9.70 s, 5 rows · 10 techniques · cut_on_beat n/a (silent, 0 beats).
One hard cut at 4.70 (whip-pan cover), one soft zoom-tier at 1.10–1.27; rows 3 and 4 split at the 7.00 zoom, row 5 is the loop tail.
Not measurable at 0.25 s: spring overshoot, icon and row staggers, snap durations.
Proposed terms: status-pill, filter-chips. Missing components: StatusPill, FilterChips.
phase B: not run.
