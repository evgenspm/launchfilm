# Mark slices into bands and snaps back

A still monochrome mark on black splits into horizontal bands that slide apart, ghost and lock back into place in under a second, then holds. A short, loopable logo sting that reads as motion without leaving the mark.

Source: https://jitter.video/template/nike-curv-logo/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- a 1-2 s logo sting or loop for socials or a site header
- the close of a longer film where the mark should twitch, not fly in
- a mark built from straight or stepped horizontal shapes that survive slicing
Not for: films that need to introduce a name or a claim (there is no copy), or round marks where horizontal bands read as noise.

## Format
other (1322×992, 4:3-ish) · 1.27 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts, no beats) · no VO · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | mark centred on black, ~23 % of frame width, white-to-grey fill; slices into 3-4 horizontal bands, re-forms, holds | static | hold f0-4; split from f5; peak offset f10-13, bands up to ~25 % of mark width apart, fill dims to grey; re-align f14-24 on springs.ui (overshoot not measurable); hold f25-38 | hard-cut | glitch-sfx |

Evidence: sheet-01 cells 0.00, 0.27, 0.50, 0.77, 1.00; keyframes/kf-000.50.jpg (peak: front hook intact, tail cut into stepped bands, lower band shifted left and thinned); 30 fps strip f0-37 (temp, not kept). No cut frames (cuts.json empty).

Working list:
- 0.00 · mark whole, still
- 0.27 (f8) · top sliver of the mark detached and offset left above the body; tail bands start to separate
- 0.50 (f15) · peak: front hook greyed, tail split into 3 stepped bands, thin ghost lines extend right
- 0.77 (f23) · bands nearly aligned, faint right-side ghost line remains
- 1.00 (f30) · identical to 0.00; held to the end

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| glitch-cut | 1 (slice displacement used inside the shot, no cut) | craft/vocabulary.md#transitions, SliceGlitch in studio/API.md |
| hard-cut | 1 (out, loop point) | craft/vocabulary.md#transitions |

## Look
Palette: #000000 bg, #E4E6E7 mark highlight, #C8C9C9 mark mid, #949494 mark shadow / dimmed state, #0D0E0E near-black edge. Type: no headline type; tiny grey mono footer labels (corner credits) about 1.5 % of frame height. Treatment: none (no grain or vignette visible). Background: flat black.

## What to adapt
- Copy: none. Optional footer labels (≤ 4 tiny labels along the bottom) can carry name / URL.
- Brand: the mark carries everything; use the brand fg on bg, a vertical light-to-mid gradient on the mark.
- Timing: keep the total under ~1.5 s; hold 5 fr, split ~7 fr, re-form ~11 fr, rest is hold. Scale the hold only.

## Pitfalls
- The first and last frames must match exactly or the loop pops.
- Bands shift horizontally only; any vertical drift or rotation reads as a different effect.
- Use a seeded, deterministic band layout (SliceGlitch `seed`), not random per frame: the reference bands move as rigid slabs.

## Missing components
- BandReform: splits a mark into N horizontal bands with per-band x offsets and opacity, driven by one progress value 0→peak→0 (peak at ~f11, re-form on springs.ui ~11 fr); SliceGlitch covers the slicing but not the scripted re-form (techniques: glitch-cut).

## Proposed terms
- band-reform: a mark slices into horizontal bands that shift apart and lock back into the intact mark inside one shot (row 1). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 1 fr from a 30 fps strip of the local source (0-1.27 s). Not measurable: per-band easing curve and overshoot (bands blur at peak), exact band count (3-4). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no beats).

## Study log
- id band-slice-mark-reform · family logo-brand · 1.27 s · 1 row · loopable
- techniques: 2 (glitch-cut, hard-cut) · cut_on_beat n/a (0 cuts, silent)
- measured at 1 fr from a 30 fps strip; band easing and overshoot not measurable
- proposed terms: band-reform · missing components: BandReform
- phase B: not run (study only)
