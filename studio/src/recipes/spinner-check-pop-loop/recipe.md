# Spinner that pops into a success check

A small loading spinner on a pale track ring snaps into a filled disc that pops to 2.7x with a check, holds, then clock-wipes back into a pie spinner. A 4 s loop for the done moment after any action.

Source: https://jitter.video/template/loading-spinner-success-animation/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- The confirm beat right after a submit, upload or payment in a product demo
- A looping micro-interaction tile for a feature grid or social post
- Bridging a loading state to a result inside a longer UI film
- A silent, monochrome brand that wants one clear state change
Not for: films that need to say what succeeded (there is no copy), or loud music-driven edits (a single static frame with no camera).

## Format
1:1 · 8.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | arc spinner on a light track ring, ring 15 % of frame | static | arc head clockwise ~12 deg/fr, easings.linear; arc shrinks ~300 deg to ~40 deg; closes to a full outline at f30 in 1 fr | morph | ui-confirm |
| 2 | 1.00–2.60 | 30–78 | feature | near-black filled disc, 40 % of frame, light check centred | static | stroke thickens f31, fills f32; scale 1.0 to 2.7x on springs.pop, peak f36 (~18 % overshoot), settled ~f41; check fade-in 4 fr; hold to f77 | mask-wipe | tick |
| 3 | 2.60–5.00 | 78–150 | feature | disc shrinks to ring size, clock-wipes into a spinning pie wedge on the track ring | static | check fade-out 3 fr; shrink easings.inExpo 5 fr (f79–f84); radial wipe 3 fr; wedge spins ~8–9 deg/fr while its angle breathes ~20 to ~270 to ~20 deg; closes to a full disc at f150 | morph | ui-confirm |
| 4 | 5.00–6.60 | 150–198 | feature | success disc with check again | static | same pop as row 2: peak f155–f156, settled ~f161, hold to f197 | mask-wipe | tick |
| 5 | 6.60–8.00 | 198–240 | feature | disc clock-wipes back into the spinning pie wedge; ends mid-spin | static | same exit as row 3; wedge spin ~8–9 deg/fr | hard-cut | |

Evidence per row:
1. sheet-01 cells 0–4 (0.00–1.00), strip at t = 0.80 (f24–f53).
2. sheet-01 cells 5–10 (1.27–2.50), strip at t = 0.80 rows 3–5, keyframes kf-001.50, kf-002.50.
3. sheet-01 cells 11–15, sheet-02 cells 0–4 (2.77–5.00), strip at t = 2.30 (f69–f98).
4. sheet-02 cells 5–10 (5.27–6.50), strip at t = 4.60 (f138–f167).
5. sheet-02 cells 11–15 (6.77–7.77), strip at t = 6.50.
No cut frames exist: cuts.json lists 0 hard and 0 soft cuts; rows come from state changes (measure.md §4).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| thinking-state | 1, 3, 5 | craft/vocabulary.md#ui (Spinner, ThinkingState) |
| morph | 1→2, 3→4 | craft/vocabulary.md#transitions: spinner turns into the success disc |
| mask-wipe | 2→3, 4→5 | craft/vocabulary.md#transitions: radial clock wipe cuts the disc into the wedge |

## Look
Palette: #E5E5E3 background (pale warm grey), #050701 disc, arc and wedge (near-black), #B8B8B5 track ring (light grey); the check uses the background colour. Type: none; a thin check glyph, stroke ~2 % of frame. Treatment: none. Background: flat.

## What to adapt
- Copy: none. Optional glyph swap inside the disc (check by default).
- Brand: brand fg carries the disc and arc, brand bg the field and the check, muted the track ring. An accent-coloured disc works if contrast with the check stays ≥ 4.5:1.
- Timing: the load phase can stretch (rows 1, 3) to wait for a real action; the snap, pop (≈11 fr to settle) and the 5 fr inExpo exit keep their frame counts.

## Pitfalls
- The overshoot is on the entrance only: the exit shrink accelerates (inExpo) with no bounce.
- Spinner to disc is a 1 fr jump; easing that jump makes it read as a fade instead of a snap.
- The pie wedge grows and shrinks while it spins; a constant wedge reads as a clock, not loading.
- Settled disc is ~2.7x the ring; less than 2x loses the pop.

## Missing components
- SuccessPop: track ring + spinner (variant 'arc' | 'pie') that snaps into a filled disc at `at`, scales ring to 2.7x on springs.pop, glyph fade 4 fr, then exits by inExpo shrink 5 fr + radial clock wipe 3 fr into the pie spinner; period 120 fr (techniques: thinking-state, morph, mask-wipe)
- PieSpinner: solid wedge on a track ring, rotation ~8–9 deg/fr, wedge angle oscillating 20–270 deg over ~66 fr (the studio Spinner is an arc only) (techniques: thinking-state)

## Proposed terms
- pie-spinner: solid wedge that spins and breathes on a track ring as a loading state, rows 3 and 5 (not in craft/vocabulary.md; not used in recipe.json)
- clock-wipe: radial mask sweep that cuts a filled disc into a wedge, rows 2→3 and 4→5 (tagged as mask-wipe in recipe.json)
- success-pop: loading glyph snaps to a filled disc and overshoots to a larger size with a check, rows 2 and 4 (tagged as morph)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.00, 0.80, 2.30, 4.60, 6.50 (local source file, centre crop); 0.25 s from sheets elsewhere. Sizes at 1188 px frame: ring 174 px, settled disc 474 px, peak ~528 px. Not measurable: exact spring config beyond overshoot and settle frames; wedge angle curve (sampled every fr, read by eye, ±15 deg). SFX planned by the glue rule, not measured (source has no audio). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts).

## Study log
id spinner-check-pop-loop · family product-ui · 8.00 s, 5 rows, 0 cuts, period 120 fr (2 loading → success cycles).
Techniques: 3 (thinking-state, morph, mask-wipe). cut_on_beat: n/a (silent, 0 cuts) → false.
Measured from 30 fps strips: snap f30 / f150, pop peak +5–6 fr (~18 % overshoot, springs.pop), exit f78 / f198 inExpo 5 fr.
Not measurable: wedge angle curve (±15 deg), spring config beyond overshoot.
Proposed terms: pie-spinner, clock-wipe, success-pop.
Missing components: SuccessPop, PieSpinner.
Phase B: not run (study only).
