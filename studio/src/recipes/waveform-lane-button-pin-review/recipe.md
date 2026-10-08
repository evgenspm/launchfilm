# Waveform lanes, button pair and review pins

One white shot, three UI states: waveform clips settle into colour lanes and one is dragged, two action buttons pop out of each other, then stretch into a glowing line where pins type review notes. Ends on a name.

Source: https://www.raylight.app/templates/UYylYxWE (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- An audio or video editing tool announcing a version
- A product whose story is edit, send out, collect feedback
- A short silent feature teaser built only from rebuilt UI pieces
- Light, clean brand with a few saturated accent colours
Not for: products without a visual editing surface; films that need a claim or a CTA (there is no copy beyond labels and the name).

## Format
16:9 · 12.17 s · 30 fps · light · no music (silent), cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | four lanes of colour-coded waveform clips (teal pair, one coral, two violet, three blue) arrive on white and settle | zoom in + pan: ~37 %/s and ~600 px/s @1920 right in s 0-1, ~6 %/s creep in s 1-2 | clips fade and blur in from the left edge, lanes offset; settled ~f30, easings.outExpo ~30 fr (±0.25 s); stagger not measurable | continuous | whoosh (planned) |
| 2 | 1.77–4.50 | 53–135 | feature | coral clip gets a glow outline (selected), is dragged right along its lane, then all lanes slide off right | near static s 2-4, exit pan ~480 px/s right s 4-5 | outline ~7 fr (±0.25 s); drag 3.00-3.77 ~ +40 % width, springs.ui (overshoot not measurable); exit easings.inExpo ~15 fr with blur (±0.25 s) | continuous | tick (planned) |
| 3 | 4.50–7.27 | 135–218 | feature | primary button (1 word) pops in, a dark twin button (1 word) slides out from behind it; primary pressed | static | blank at 4.50; blur-in + springs.pop ~8 fr (±0.25 s) at 4.77; twin emerges 5.50, pair centred 5.77, springs.ui; press 6.27 to ~0.88, springs.click, released 6.50 | continuous | pop (planned) |
| 4 | 7.27–8.27 | 218–248 | feature | the buttons fly apart and stretch into a pink glowing track; a green pin rises on it | static | buttons slide outward with directional blur, gap becomes twin glowing line (morph ~8 fr, ±0.25 s); pin fades in 7.50, full 7.77, springs.snappy (overshoot not measurable) | continuous | whoosh (planned) |
| 5 | 8.27–10.50 | 248–315 | feature | green pin opens into a note card and types a 2-line review note; a yellow pin slides left and types its own 2-line note | static | pin head widens springs.layout ~8 fr (±0.25 s); typewriter ~13 chars/s (default); yellow slide easings.outQuint; green card collapses 9.50; both blur out 10.27, gone 10.50 | continuous | type-click (planned) |
| 6 | 10.50–12.17 | 315–365 | logo | product name + version (2 words), black, centred, holds | static, fast zoom change in the last 5 fr | blank 10.50; whole-line blur-in, settled 10.77 (~8 fr, ±0.25 s), easings.outExpo; hold 42 fr | end | swell (planned) |

Evidence per row: 1 `sheet-01 cells 0–6`, kf-000.50, kf-001.50; 2 `sheet-01 cells 7–15`, `sheet-02 cells 0–1`, kf-002.50, kf-003.50; 3 `sheet-02 cells 2–8`, kf-005.50, kf-006.50; 4 `sheet-02 cells 9–15`, `sheet-03 cell 0`, kf-007.50; 5 `sheet-03 cells 1–9`, kf-008.50, kf-009.50; 6 `sheet-03 cells 10–15`, `sheet-04 cell 0`, kf-011.50. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–5 | craft/vocabulary.md#ui |
| blur-in | 1, 3, 6 | craft/vocabulary.md#type (BlurIn) |
| morph | 4 | craft/vocabulary.md#transitions (PillMorph) |
| typewriter | 5 | craft/vocabulary.md#type (Typewriter) |
| glow | 2, 4 | craft/vocabulary.md#look |
| motion-blur | 2, 4, 5 | craft/vocabulary.md#look |
| continuous | 1–5 | craft/vocabulary.md#transitions |
| end | 6 | craft/vocabulary.md#transitions |

## Look
Palette: #FFFFFF background, #000000 text and dark button, #19C0FB primary button and blue clips, #01BF77 green pin and teal clips, #FAA78C coral clip, #F990DD pink track glow (also violet clips ~#BDB9EB, yellow pin ~#E8CA86). Type: geometric grotesk, medium, sentence case, buttons ~3 % H, name ~6 % H. Treatment: glow, motion-blur. Background: flat white.

## What to adapt
- Copy: two 1-word action labels, two review notes of ≤ 2 short lines each, closing name + version ≤ 3 words.
- Brand: the accent fills the primary button; lane colours are four distinct pastels; the pin colours echo the lanes.
- Timing: each state is ~2.7 s with a single blank frame window between (4.50, 10.50); keep the blanks, stretch the holds.

## Pitfalls
- Never hard-cut between states: the blank white beat at 4.50 and 10.50 is the only separator, motion carries the rest.
- The selected clip glow is the only highlight in row 2; adding more glows flattens the focus.
- Review notes must be tiny and short; long notes make the pins grow past the track.

## Missing components
- WaveformClip: rounded pill with a procedural waveform in a lane colour, optional glow outline when selected, drag along x (techniques: ui-rebuild, glow)
- ClipLanes: 4 offset rows of WaveformClips, entrance from the left edge with per-lane offset (techniques: ui-rebuild)
- ReviewPin: vertical stem on a track with a head that widens into a note card and types text, then collapses (techniques: typewriter, ui-rebuild)

## Proposed terms
- waveform-clip-lanes: colour-coded audio clips laid out in editor lanes, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- pin-note-expand: a marker pin on a line whose head opens into a typed note card, row 5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (sheet cells at 0.00/0.27/0.50/0.77 offsets); no 30 fps strips extracted. Not measurable: overshoot of every spring, per-lane and per-clip stagger, typing rate, morph length, button press depth. Camera numbers from motion.json. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on keyframes kf-002.50, kf-006.50, kf-008.50, kf-011.50 (no cut frames exist).

## Study log
id waveform-lane-button-pin-review · family product-ui · 12.17 s, 6 rows, one shot (0 cuts)
techniques 8 (ui-rebuild, blur-in, morph, typewriter, glow, motion-blur, continuous, end)
cut_on_beat: n/a, silent reference, all 6 sfx planned
not measurable: spring overshoot, staggers, typing rate, morph length (±0.25 s sheets only)
proposed terms: waveform-clip-lanes, pin-note-expand
missing components: WaveformClip, ClipLanes, ReviewPin
phase B: not run
