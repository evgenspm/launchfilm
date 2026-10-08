# Spring-gap word poster

A left-aligned event poster on black: each word lands from a wide gap and springs tight against its neighbours, the block squeezes once more, then the words fling out left one after another. Two short lines, a footer URL and a corner mark.

Source: https://jitter.video/template/stretch-snap-text/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing an event, a date range or a launch day as one poster frame
- A 2-3 s opener or sting for a feed post or story
- A bold single statement with no UI to show
Not for: films that need more than two short blocks of copy, or calm premium voices (the springy gaps read as playful).

## Format
4:5 · 2.5 s · 30 fps · dark · music none (silent reference), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-2.50 | 0-75 | hook | headline, 4 words on 2 lines, top left; date block, 2 lines, mid left; footer URL bottom left, small mark bottom right | static frame, footer pinned | f0-2 footer only; words enter one per 3 fr (f3-f15) at wide gaps up to ~35 % W and slide together, springs.snappy, settled ~f30; gaps nearly close at f24-29; hold; second squeeze f51-53, release f54-62; exit f63-74 words slide out left, easings.inExpo ~12 fr, reading order | hard-cut | tick per word landing, swoosh-short on exit |
Evidence: sheet-01 cells 0-9 (0.00-2.27 s); keyframes kf-000.50 (wide gaps mid-entrance) and kf-001.50 (settled poster); 30 fps strips at 0.0 s and 1.5 s (temporary, not kept). cuts.json lists 0 cuts.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| scatter | 1 (closest id: words arrive from offset positions and assemble, horizontal only) | craft/05-typography.md, Scatter in presets/text.tsx |
| hard-cut | 1 (end of film) | craft/09-transitions.md |

## Look
Palette: #000000 background, #FFFFFF type, #959595 antialias grey (from keyframe palettegen; no cut frames exist). Type: bold grotesk, sentence case, tight tracking, headline about 8 % of frame height, flush left; small bold footer URL about 2.5 % H. Treatment: none. Background: flat black.

## What to adapt
- Copy: headline of 3-5 words wrapping to 2 lines (the statement); a 2-line date or place block; a footer URL; a small logo in the bottom-right corner.
- Brand: fg on bg only; the accent colour is not used in the reference. Logo sits small in the corner and never moves.
- Timing: keep the 3 fr stagger and the f63 exit; the hold between f30 and f51 can stretch for longer copy.

## Pitfalls
- Motion is horizontal only: words never fade or move vertically in the strips; adding a fade softens the snap.
- The second squeeze at f51-53 is what makes the exit feel sprung; without it the fling-out looks like a plain wipe.
- The last word is still on screen at the final frame, so the film does not loop seamlessly as is.

## Missing components
- WordGapSpring: lays out words flush left, animates each word's x from a gap offset (up to 0.35 W) to its rest position with springs.snappy, 3 fr stagger, optional second squeeze and an inExpo exit to the left (techniques: scatter)

## Proposed terms
- word-gap-spring: words assemble along their line from wide horizontal gaps and spring tight, gaps oscillating through the hold (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- letter-stretch: letters stretch vertically and snap back (named in the catalogue hint; not visible at the available resolution) (not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.0 and 1.5 s (300 px wide). Not measurable: vertical letter stretch, exact overshoot %, spring settle frame (±3 fr). Palette from keyframes since cuts/ is empty. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id word-gap-spring-poster · family kinetic-type · 2.50 s, 1 row (no cuts)
techniques 2 (scatter, hard-cut) · cut_on_beat 0/0, silent reference
measured from 30 fps strips: 3 fr word stagger f3-f15, settle ~f30, squeeze f51-53, exit f63-74 inExpo
not measurable: vertical letter stretch at 300 px, overshoot % (±3 fr)
proposed terms: word-gap-spring, letter-stretch
missing components: WordGapSpring
phase B: not run (study phase only)
