# Floating letter toss partner lockup

Two partner names, each as oversized single letters tossed up from below and drifting in slow rotation, joined by a spinning cross on a colour flip. Weightless letter motion makes a plain name pairing playful.

Source: https://jitter.video/template/zero-gravity-bouncy-words/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing a partnership or collab: name, cross, name
- A short silent title card where the type itself is the entertainment
- Social loops and story openers under 3 s
- Brands with a short name of 4 to 7 letters
Not for: long names (letters get too small to toss), films that need a claim or a URL, anything with VO.

## Format
other (1322×992, 4:3-ish) · 2.67 s · 30 fps · mixed (grey, blue, light grey) · music none, cut_on_beat n/a (0/2, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.07 | 0–32 | hook | first partner name, 6 huge light letters scattered and rotated on flat grey; hairline with 3 tiny labels at mid height | static frame | letters tossed up from below, apex ~0.50 s, out of frame by 1.00 s; slow independent spin; easings.outQuint up, easings.inExpo down (±0.25 s) | hard-cut | swoosh-short |
| 2 | 1.07–1.90 | 32–57 | hook | colour flip to saturated blue; one small rotated cross glyph alone | static | cross rises from bottom edge at 1.07 s, apex above hairline ~1.50 s, falls lower right by 1.77 s, spins ~45 deg; outQuint up / inExpo down (±0.25 s) | hard-cut | pop |
| 3 | 1.90–2.67 | 57–80 | logo | second partner name plus a circle mark as huge black letters on light grey; 3D hand sticker joins | static frame, content drifts up | letters tossed up at 1.90 s, near apex 2.27 s, start to sink 2.50 s; hand sticker pops up from bottom at ~2.27 s, springs.pop (overshoot not measurable, ±0.25 s) | hard-cut | pop |
Evidence: row 1 `sheet-01 cells 0–4` (0.00–1.00), `cuts/cut-000.63.jpg`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 5–7` (1.27–1.77), `cuts/cut-000.63.jpg` after side, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 8–10` (2.00–2.50), `cuts/cut-001.90.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| scatter | 1, 3 | craft/vocabulary.md#type (Scatter); letters at random positions and rotations |
| sticker | 3 | craft/vocabulary.md#type (Sticker) |
| hard-cut | 1–3 | craft/vocabulary.md#transitions |

## Look
Palette: #4F5458 scene 1 bg (grey), #DFE3E4 scene 1 letters and scene 3 bg (light grey), #2465FF scene 2 bg (accent blue), #101010 scene 3 letters (near black). Type: geometric grotesk caps, medium weight, single letters ~45 % of frame height, rotated -30 to +30 deg; tiny tracked caps labels on a hairline at mid height. Treatment: none. Background: flat, one colour per scene.

## What to adapt
- Copy: two names of 4–7 letters each (one glyph per letter), a joiner glyph, 3 tiny labels (left: mark, centre: what this is, right: an index code)
- Brand: scene 2 background carries the accent; scene 1 and 3 use the two partners' neutral colours, fg inverted between them
- Timing: keep 32 / 25 / 23 fr; the tosses must stay one up-and-down per scene, longer holds kill the weightless feel

## Pitfalls
- Letters never settle into a readable word: the name is read from the scatter, so keep it short and use big glyphs
- Letters of a scene are cropped by the frame edges at apex; keep at least half of each glyph inside
- The labels hairline sits on top of nothing; letters pass over it, not behind it

## Missing components
- LetterToss: per-letter 2D rigid-body toss (velocity up from below the bottom edge, gravity, spin 20–60 deg/s, seeded positions), one arc per scene of 23–32 fr (techniques: scatter)
- HairlineLabels: full-width 1 px rule at 50 % H with 3 small tracked caps labels left, centre, right (techniques: none)

## Proposed terms
- flat-gravity-toss: letters or glyphs thrown up from below the frame and falling back under gravity with slow spin, 2D, no collisions visible; rows 1–3 (not in craft/vocabulary.md; `physics` there is filed under 3d; not used in recipe.json)
- colour-flip-cut: the cut is carried by a full background colour change while layout chrome stays; rows 1→2, 2→3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted. Not measurable: apex frames, spin rates, sticker overshoot, exact frame of the grey to blue flip (soft window 0.63–1.07 s in cuts.json; letters leave in that window, bg is blue by 1.07 s). Palette from palettegen on cut frames and keyframes. SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats).

## Study log
id partner-letter-toss-lockup · family kinetic-type · 2.67 s, 3 rows (32 / 25 / 23 fr)
techniques 3 (scatter, sticker, hard-cut) · cut_on_beat 0/2, silent, no VO
not measurable at 0.25 s: toss apex, spin rate, sticker overshoot, exact flip frame
proposed terms: flat-gravity-toss, colour-flip-cut
missing components: LetterToss, HairlineLabels
phase B: not run (study only)
