# Dot-grid figures reach for a glowing mark, then type

A glowing app mark spins in on black while two dot-column figures slide in from the edges and reach for it; the scene loses its light, an offer line and a grey sub-line blur in, then a URL is typed on a silent black end.

Source: https://www.raylight.app/templates/YXMdJ2QD (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- a short silent teaser for a service or agency offer with one promise and one guarantee
- opening a film with a premium mark moment before any UI exists
- dark brands with a strong single-colour rounded icon
- muted autoplay feeds where the copy carries the offer
Not for: products whose value needs the UI to be seen; light brands (the dots and halo need black to read).

## Format
16:9 · 12.3 s · 30 fps · dark · no music (silent), cut_on_beat n/a (0 cuts) · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.25 | 0–68 | hook | mark spins from edge-on to face-on and grows; two dot-column figures slide in from the edges, pointing at it | static; mark 34→110 px (720p) over 60 fr | mark rotateY ~80→0° + scale, easings.outQuint 60 fr, no overshoot; figures 36 % W f15→f66 easings.outQuint; halo light-on f15→f54 | hard-cut | whoosh, swell, shimmer |
| 2 | 2.25–3.50 | 68–105 | logo | hold: lit mark centred, blue halo, fingertips almost touching it | drift: mark +12 % 3.00→3.77 (±0.25 s) | figures drift back 1.5 % W over 40 fr easings.inOutSine; per-column flicker 40–100 % | hard-cut | none |
| 3 | 3.50–4.50 | 105–135 | logo | lights off: figures and halo fade, mark tilts away and darkens to black | static | halo + figures to black 15 fr (f105→f120) easings.inOutSine; mark tilt + dim 30 fr to f135; 5 fr pure black | hard-cut | silence-beat |
| 4 | 4.50–6.25 | 135–188 | feature | offer statement, 6 words, white, centred on black | static | whole line blur-in from black 24 fr (f136→f160) easings.outQuint; holds | hard-cut | none |
| 5 | 6.25–8.50 | 188–255 | feature | grey sub-line, 5 words, the guarantee, under the offer; pair re-centres, then fades | static | sub-line blur-in ~15 fr (±0.25 s); first line rises ~4 % H on springs.ui; both fade ~8 fr after 8.00 (±0.25 s) | hard-cut | none |
| 6 | 8.50–12.30 | 255–369 | cta | URL, 19 chars, typed on black from a fixed left edge; holds ~2 s | static | typewriter ~3 fr/char from sheets (human pass 2.5), no caret; hold ~60 fr | hard-cut | type-click |

Evidence: row 1 sheet-01 cells 0–8 (0.00–2.00) + kf-000.50, kf-001.50; row 2 sheet-01 cells 9–15 (2.27–3.77) + kf-002.50; row 3 sheet-02 cells 0–2 (4.00–4.50) + kf-003.50; row 4 sheet-02 cells 3–8 (4.77–6.00); row 5 sheet-02 cells 9–15, sheet-03 cells 0–1 (6.27–8.27) + kf-007.50; row 6 sheet-03 cells 2–15, sheet-04 cells 0–1 (8.50–12.27) + kf-010.50. No cut frames exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| particle-form | 1–3 | craft/vocabulary.md#brand (ParticleForm, from 'sides') |
| light-on | 1 | craft/vocabulary.md#brand |
| glow | 1–3 | craft/vocabulary.md#look |
| blur-in | 4–5 | craft/vocabulary.md#type (BlurIn) |
| statement-sequence | 4–5 | craft/05#recipes, StatementSequence |
| typewriter | 6 | craft/vocabulary.md#type (Typewriter) |
| hard-cut | all (no visible cuts; default id) | craft/vocabulary.md#transitions |

## Look
Palette: bg #000000, text #FFFFFF, accent #0674CD (mark, dot edges), highlight #4CCDE8 (dot cores, mark face), halo #02164A, sub-line #8B8B8B. Type: semibold grotesk, sentence case, normal tracking, ~7 % H, period on each line. Treatment: glow. Background: flat black with one radial blue halo in rows 1–2, pure black after.

## What to adapt
- Copy: 1 offer line ≤ 7 words, 1 grey guarantee line ≤ 6 words, 1 URL ≤ 24 chars.
- Brand: the accent drives halo and dots (cyan core to accent edge); the mark is the only logo moment; the side figures can be any silhouette sampled into dot columns.
- Timing: rows 1–3 keep their frame counts (the light curve is the beat); rows 4–5 can stretch for longer copy; the URL row scales with its length.

## Pitfalls
- The dots must sit on a column grid (pitch 10 px at 720p, dot 2 px, ~3 px vertical pitch), not random confetti, or the figures read as noise.
- Exit by losing light, not by moving: halo dies first (15 fr), then the mark (30 fr); keep 5 fr of black before the text.
- The URL types from a fixed left edge at its final centred position; centring each frame makes it jitter.
- Mark entrance has no overshoot; a bouncy spring cheapens it.

## Missing components
- MarkSpinIn: mark rotateY ~80→0° with scale 0.3→1 on easings.outQuint 60 fr, reverse tilt + dim for the exit (can be built from Dolly mode '3d' + BrandMark; listed in case a dedicated preset is wanted).
- ParticleForm silhouette mode: sample an arbitrary figure image into dot columns, mirrored pair sliding in from both sides and drifting (ParticleForm gathers into the mark; a slide-in of a pre-formed shape may need an option).

## Proposed terms
- lights-off: the scene ends by losing light (halo first, then the subject) rather than by moving or cutting; rows 3. (not in craft/vocabulary.md; not used in recipe.json)
- mark-spin-in: mark turns from edge-on to face-on on Y while growing; row 1.
- dot-column-figure: a silhouette rendered as vertical dot columns with per-column brightness, like an LED scan; rows 1–3.

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr numbers (mark size, figure travel, halo colours, lights-off frames, text blur-in) taken from the human 30 fps pass in the reference notes. Not measurable from sheets: exact sub-line entrance length, fade-out length after 8.00, mark rotation angle. Palette from keyframes kf-002.50, kf-005.50, kf-007.50, kf-010.50 via palettegen (no cut frames exist). SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no music).

## Study log
- id particle-hands-mark-statement, family logo-brand, 12.3 s, 6 rows from 1 continuous shot split at state changes.
- 7 techniques (particle-form, light-on, glow, blur-in, statement-sequence, typewriter, hard-cut); difficulty medium, render_cost heavy (particle-form).
- cut_on_beat n/a: 0 cuts, silent, no VO.
- Not measurable at 0.25 s: sub-line entrance and fade lengths, mark rotation angle; URL rate reads ~3 fr/char on sheets vs 2.5 in the 30 fps pass.
- Proposed terms: lights-off, mark-spin-in, dot-column-figure.
- Missing components: MarkSpinIn, ParticleForm silhouette slide-in mode.
- Phase B: not run (study only).
