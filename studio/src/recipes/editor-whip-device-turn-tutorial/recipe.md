# Vertical editor how-to with whip pans and a device turn

A 27 s vertical tutorial: a laptop shows a video editor, the camera dives into its canvas and whip-pans between screenshot, inspector and timeline while a phone frame turns in 3D; two hard-cut extras, then mark and typed URL.

Source: https://www.raylight.app/templates/g8hYmDJV (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A creative or editing tool explains its whole workflow in under 30 s with voice-over
- Vertical social feed where each VO step needs its own UI moment inside one continuous camera move
- The product turns a flat screenshot into a framed, animated device shot
Not for: products without a visual editor or a before/after on screen; silent autoplay without captions (the VO carries the steps).

## Format
9:16 · 27.52 s · 30 fps · dark (one light shot 19.87 to 23.10) · music 114.8 BPM, cut_on_beat 2/3 · VO yes, 70 words over ~24 s (~2.9 words/s)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.77 | 0–83 | hook | laptop on a dark desk, magenta light streaks; editor opens with a blue glow rim on its sidebar | pull-out ~1.25→1.00 over 30 fr, then near-static | screen fades up ~8 fr (±0.25 s); glow rim brightens 0.50→1.50, easings.inOutSine | continuous | none |
| 2 | 2.77–4.27 | 83–128 | feature | inside the canvas: flat phone-app screenshot on blue gradient, toolbar and timeline | push-in 1.00→1.15 3.27→3.77, whip-pan right at 4.00 | whip ~8 fr easings.inExpo with motion-blur (±0.25 s) | continuous | whoosh |
| 3 | 4.27–6.27 | 128–188 | feature | inspector panel (depth, tilt, size, opacity); cursor toggles background, opens frame menu with a device option | static 4.50–6.00, whip-pan left at 6.00 | cursor-path at 4.77 and 5.77; menu springs.ui (overshoot not measurable) | continuous | ui-confirm |
| 4 | 6.27–8.00 | 188–240 | feature | screenshot now in a dark phone frame with blue selection handles | settles 6.27→6.77, slight yaw from 7.77 | frame lands with the whip, springs.ui ~12 fr (±0.25 s) | continuous | whoosh |
| 5 | 8.00–10.00 | 240–300 | feature | framed phone turns: side, back with camera bump, side, front with tilt | orbit ~70°→150°→side→front ~10° tilt | suggested springs.heavy ~30 fr per half turn (±0.25 s) | continuous | swoosh-short |
| 6 | 10.00–14.50 | 300–435 | feature | keyframing a camera move: canvas pans, phone slides off right, purple keyframe bars grow on the timeline | whip-pan at 10.00, slides 10.77 and 13.00, whip 14.27; dolly between | keyframe tracks grow 11.27→12.00 easings.outExpo (±0.25 s) | continuous | whoosh |
| 7 | 14.50–16.30 | 435–489 | proof | playback: phone rises from flat to upright, turns back→front, holds | orbit 14.50→15.50, push-in ~1.00→1.05 | rotate up ~90° in 8 fr, settle suggested springs.heavy ~24 fr (±0.25 s) | hard-cut | none |
| 8 | 16.30–19.87 | 489–596 | feature | dark tilted plane of task chips, numbers, avatars, deep depth of field; a progress pill appears | tilt-plane pan right ~125 px/s @1920, constant | pill fades in at 18.27, easings.outQuint (±0.25 s); plane easings.linear | hard-cut | none |
| 9 | 19.87–23.10 | 596–693 | feature | light audio editor: preview over coral waveform clips; short then longer caption types in | push-in from white 20.00→20.27, pan right 21.50→22.00, pull-out at 22.00 | caption typewriter ~2 letters per 0.25 s; white fade-out 22.77→23.07 | hard-cut | none |
| 10 | 23.10–25.00 | 693–750 | logo | white brand mark assembles from two pieces, centred on black | static | pieces sweep in 23.10→23.77 (~20 fr, ±0.25 s), suggested springs.snappy (overshoot not measurable); hold 37 fr | continuous | swell |
| 11 | 25.00–27.52 | 750–826 | cta | URL typed on in white, centred on black; audio silent from 25.51 | static | typewriter ~3 letters per 0.25 s, complete at 25.77 (23 fr); hold 53 fr | end | type-click |

Evidence per row:
1. sheet-01 cells 0–10, kf-000.50, kf-001.50, motion.json s 0–2
2. sheet-01 cells 11–15, sheet-02 cells 0–1
3. sheet-02 cells 1–9, kf-004.50, kf-005.50
4. sheet-02 cells 9–15
5. sheet-03 cells 0–7
6. sheet-03 cells 8–15, sheet-04 cells 0–9
7. sheet-04 cells 10–15, sheet-05 cells 0–1, cuts/cut-016.30.jpg (before)
8. sheet-05 cells 2–15, cuts/cut-016.30.jpg (after), cuts/cut-019.87.jpg (before)
9. sheet-06 cells 0–12, cuts/cut-019.87.jpg (after), cuts/cut-023.10.jpg (before)
10. sheet-06 cells 13–15, sheet-07 cells 0–3, cuts/cut-023.10.jpg (after)
11. sheet-07 cells 4–13

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| pull-out | 1, 9 | craft/04 camera |
| push-in | 2, 7, 9 | craft/04 camera |
| whip-pan | 2, 3, 6 | craft/04 camera |
| orbit | 5, 7 | craft/04 camera |
| tilt-plane | 8 | craft/04 camera (TiltPlane) |
| device-laptop | 1 | craft/vocabulary ui |
| device-phone | 4–7 | craft/vocabulary ui (PhoneFrame) |
| device-3d | 5, 7 | craft/vocabulary 3d |
| ui-rebuild | 1–6, 8, 9 | craft/vocabulary ui |
| cursor-path | 3 | craft/vocabulary ui (Cursor) |
| end-card | 10, 11 | craft/vocabulary brand (EndCard) |
| typewriter | 9, 11 | craft/vocabulary type (Typewriter) |
| glow | 1 | look |
| motion-blur | 2, 3, 6 | look |

## Look
Palette: #000000 background, #FFFFFF text and mark, #2648E5 canvas blue accent, #062DAA deep blue gradient, #6C8EED light blue UI, #F4F1F9 light editor background (row 9). Type: UI sans in the editor chrome, ~1.5 % H; end URL medium-weight rounded grotesk, lowercase, ~2.5 % H. Treatment: glow (sidebar rim, row 1), motion-blur (whips). Background: dark desk footage-style 3D in row 1, blue vertical gradient canvas in rows 2 to 7, flat black in rows 10 to 11.

## What to adapt
- Copy: 9 VO lines (~70 words): a promise with a time claim, five step lines (one per row 2 to 6), a two-line "done" beat (row 7), one line for extras (rows 8 to 9), a CTA line (row 10). On screen only the two captions in row 9 (2 and 2 words) and the URL.
- Brand: canvas blue carries the accent; the mark appears only on the end card; the glow rim in row 1 can take the brand colour.
- Timing: rows 2 to 6 stretch with VO length; each whip stays ~8 fr; rows 10 and 11 keep their frame counts (57 + 76 fr).

## Pitfalls
- Rows 1 to 7 are one shot (16.30 s, no cut): every step change must be a camera move (whip, push, orbit), never a cut.
- The two extras (rows 8 to 9) are the only hard cuts; 2 of 3 cuts land within 2 fr of a beat (16.30, 19.87).
- Whips need motion-blur or the UI text strobes at 30 fps.
- Row 9 enters from pure white: hard cut to white then push in, which reads as a flash.

## Missing components
- EditorShell: dark video-editor chrome (sidebar, canvas, inspector, timeline with clip and keyframe bars) as one wide plane the camera can whip across, ~2.2 frame widths (techniques: ui-rebuild, whip-pan)
- DeviceTurn: PhoneFrame with yaw/pitch keyframes and a visible back with camera bump, 0 to 180° yaw (techniques: device-3d, orbit)

## Proposed terms
- mark-assemble: the brand mark sweeps together from two pieces on black, ~20 fr, row 10 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from 4 fps sheets; no strips extracted. Not measurable: whip durations, spring overshoot, exact rotation angles in rows 5 and 7, caption and URL letter cadence below 0.25 s. Pan speeds from motion.json. SFX planned by the glue rule, not measured. cut_on_beat = 2/3 cuts within ±2 fr (16.30 vs beat 16.28; 19.87 vs 19.93; 23.10 misses). Energy build: 0 cuts in the first third, 2 in the last.

## Study log
id editor-whip-device-turn-tutorial · family social-promo · 27.52 s, 11 rows (1 shot of 16.30 s split into 7, then 3 hard cuts)
techniques 14 (incl. 2 look ids) · cut_on_beat true (2/3)
not measurable: whip frames, overshoot, rotation angles, typing cadence (±0.25 s)
proposed terms: mark-assemble
missing components: EditorShell, DeviceTurn
phase B: not run
