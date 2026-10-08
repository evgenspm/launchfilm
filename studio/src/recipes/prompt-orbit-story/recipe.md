# Prompt orbit story with a guided light trail

A soft orb carries one continuous story from a portrait into a typed prompt, an orbiting media mosaic, short claims,
selectable outputs, and a restrained mark close.

Source: https://www.raylight.app/templates/xMJIaaAS (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use

- A 20–30 s launch film led by one visual guide.
- A creative tool that turns one input into several outputs without showing full product UI.
- A light-background brand story built from continuous morph transitions.

Not for: products whose proof depends on legible interface detail or measured results.

## Format

16:9 · 26.01 s · 30 fps · light · music 160.3 BPM, cut_on_beat 0/0 (false) · VO no

## Beat sheet

| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | pastel orb grows at the centre of a thin grid | push-in 1.00→1.42 | springs.cameraIn ~38 fr (±0.25 s) | morph | swell |
| 2 | 1.77–2.77 | 53–83 | hook | orb becomes a rounded portrait card | push-in 1.00→1.54 | circular mask to card, springs.layout ~8 fr (±0.25 s) | morph | whoosh |
| 3 | 2.77–4.77 | 83–143 | logo | small mark, then a short typed wordmark | pull-out 1.20→0.78 | logo-from-dot, springs.snappy ~12 fr; typewriter ~22 fr (±0.25 s) | morph | type-click |
| 4 | 4.77–6.50 | 143–195 | feature | outlined prompt pill types a short introduction | fixed frame; pill 0.00→0.50 W | springs.layout ~15 fr; prompt-typing ~14 characters/s (±0.25 s) | morph | type-click |
| 5 | 6.50–10.00 | 195–300 | feature | eight media tiles orbit a centred four-word claim | pull-out 1.32→0.82 | orbit-ring, ~4 fr stagger, springs.pop ~15 fr (±0.25 s) | morph | pop |
| 6 | 10.00–12.00 | 300–360 | feature | media collapse to the orb; it contracts, rebounds, drops | pull-out then push-in | easings.inExpo ~8 fr; springs.pop ~22 fr (±0.25 s) | morph | whoosh |
| 7 | 12.00–14.00 | 360–420 | feature | orb draws a curve beneath two successive process lines | dolly right ~98 px/s @1920 | easings.outExpo ~8 fr; orb curve 60 fr (±0.25 s) | morph | swoosh-short |
| 8 | 14.00–15.50 | 420–465 | feature | a second compact process line replaces the first | drift 1.00→1.02 | statement-sequence, springs.ui ~8 fr; orb arc 38 fr (±0.25 s) | morph | swoosh-short |
| 9 | 15.50–17.00 | 465–510 | cta | five-word creation instruction and first checked output | dolly up ~147 px/s @1920 | word reveal ~15 fr; check springs.ui ~8 fr (±0.25 s) | morph | ui-confirm |
| 10 | 17.00–20.00 | 510–600 | cta | checked label cycles through three deliverable types | fixed frame; orb crosses ~0.65 W | word-swap at 18.50, 18.77, 19.27; springs.ui ~8 fr (±0.25 s) | morph | ui-confirm |
| 11 | 20.00–22.00 | 600–660 | feature | portrait returns large, then shrinks to a tiny tile | pull-out 1.18→0.16 | springs.layout ~12 fr; easings.inExpo ~18 fr (±0.25 s) | morph | whoosh |
| 12 | 22.00–26.01 | 660–780 | logo | small mark, short typed wordmark, white hold | fixed frame; lockup recentres ~0.08 W | springs.snappy ~12 fr; typewriter ~22 fr; hold 67 fr (±0.25 s) | hard-cut | hit |

Evidence per row: row 1 `sheet-01 cells 0–6`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 7–10`,
`keyframes/kf-002.50.jpg`; row 3 `sheet-01 cells 11–15`, `sheet-02 cells 0–3`, `keyframes/kf-004.50.jpg`;
row 4 `sheet-02 cells 4–9`, `keyframes/kf-005.50.jpg`; row 5 `sheet-02 cells 10–15`, `sheet-03 cells 0–7`,
`keyframes/kf-007.50.jpg`; row 6 `sheet-03 cells 8–15`, `keyframes/kf-010.50.jpg`; row 7 `sheet-04 cells 0–7`,
`keyframes/kf-012.50.jpg`; row 8 `sheet-04 cells 8–13`, `keyframes/kf-014.50.jpg`; row 9 `sheet-04 cells 14–15`,
`sheet-05 cells 0–3`, `keyframes/kf-015.50.jpg`; row 10 `sheet-05 cells 4–15`, `keyframes/kf-017.50.jpg`;
row 11 `sheet-06 cells 0–7`, `keyframes/kf-020.50.jpg`; row 12 `sheet-06 cells 8–15`, `sheet-07 cells 0–7`,
`keyframes/kf-024.50.jpg`. There are no cut frames because `cuts.json` reports zero cuts.

## Techniques → craft

| id | rows | where the law is |
|---|---|---|
| morph | 1–11 | `craft/09-transitions.md#catalog` |
| logo-from-dot | 3, 12 | `craft/vocabulary.md#brand` |
| typewriter | 3, 12 | `craft/05-typography.md#recipes` |
| prompt-typing | 4 | `craft/13-ui-recreation.md#scripted-state` |
| orbit-ring | 5 | `craft/04-motion.md#continuous-motion` |
| pull-out | 3, 5, 6, 11 | `craft/03-camera-and-staging.md#zoom-tiers` |
| statement-sequence | 7–9 | `craft/05-typography.md#recipes` |
| word-swap | 10 | `craft/05-typography.md#recipes` |

## Look

Palette: background `#FFFFFF`, ink `#151515`, muted `#9D9D9D`, check `#6065EE`, orb lights `#DAAEF6` and
`#CA9DEC`. Type: regular grotesk, sentence case, neutral tracking, 4–8 % of frame height. Treatment: none.
Background: flat white with a thin black construction grid in the opening and portrait-return states.

## What to adapt

- Copy: one 3–5 word prompt, one 4-word capability claim, three 4–7 word process lines, and three 1–2 word outputs.
- Brand: use the accent in the guide orb, trail, and checked square; keep the rest black, grey, and white.
- Media: one hero portrait plus eight supporting images with rounded corners and varied crops.
- Timing: keep rows 2–4 and 11–12 fixed; rows 5, 7, 8, and 10 can stretch by one music beat per added item.

## Pitfalls

- The guide orb must persist across morphs; replacing it with unrelated transitions breaks the one-object story.
- The media ring needs a clear centre: keep all tiles outside the central 42 % width used by the claim.
- The 160.3 BPM track is fast, but the copy holds for 45–105 fr; do not cut on every beat.
- Wordmark typing is only about 22 fr (±0.25 s); a slower close weakens the final 67 fr hold.

## Missing components

None. `OrbTrail` and `MediaMosaic` were built locally in this recipe folder, along with the abstract `PortraitCard`,
`GuideOrb`, `PromptPill`, `TypedLockup`, and `CheckLabel` helpers.

## Proposed terms

- orb-trail-narrator: one persistent soft sphere follows a drawn curve to connect copy, media, and transitions; rows
  1–11 (not in `craft/vocabulary.md`; not used in `recipe.json`).

## Measurement notes

Resolution: 0.25 s from sheets; full-resolution keyframes at 1 s offsets for type, colour, and image detail. Palette
sampled with `palettegen` from representative full-resolution keyframes because there are no cut frames. Not measurable:
spring overshoot, exact entrance and exit frames, tile stagger below 0.25 s, trail easing, and character cadence.
SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr, therefore false.

## Build comparison

Iteration 1 exposed blank cells at state boundaries because both sides of the six-frame morph overlap reached zero.
Iteration 2 moved the incoming fade before each boundary; all subjects are now present at the measured boundary. The
comparison uses the 4 fps sheets, so motion-speed agreement is measurable to one cell (±0.25 s).

| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---:|---|---|---|
| 1 | 0.00–1.77 | 0.00–1.77 | 0 | centred soft orb on construction grid | named camera-in spring, growing orb | none |
| 2 | 1.77–2.77 | 1.77–2.77 | 0 | centred rounded portrait card on grid | layout spring, orb-to-card overlap | iteration 2 removed blank handoff |
| 3 | 2.77–4.77 | 2.77–4.77 | 0 | small mark and typed wordmark centred | snappy mark plus character typing | none |
| 4 | 4.77–6.50 | 4.77–6.50 | 0 | thin outlined prompt pill at centre | layout spring and 2 fr/character typing | none |
| 5 | 6.50–10.00 | 6.50–10.00 | 0 | eight tiles protect a central claim | 4 fr tile stagger, pop spring, slow orbit | none |
| 6 | 10.00–12.00 | 10.00–12.00 | 0 | media resolves to one small orb | inExpo contract plus pop rebound | iteration 2 removed blank handoff |
| 7 | 12.00–14.00 | 12.00–14.00 | 0 | short statement above curved accent trail | in-out arc over 60 fr | none |
| 8 | 14.00–15.50 | 14.00–15.50 | 0 | second statement replaces the first | reversed arc and outExpo text entrance | none |
| 9 | 15.50–17.00 | 15.50–17.00 | 0 | compact instruction with checked output | outExpo reveal and UI spring | none |
| 10 | 17.00–20.00 | 17.00–20.00 | 0 | checked output cycles through three labels | broad orb arc and timed word swaps | iteration 2 removed blank handoff |
| 11 | 20.00–22.00 | 20.00–22.00 | 0 | portrait card returns on the grid | layout settle then inExpo shrink | none |
| 12 | 22.00–26.01 | 22.00–26.00 | 0 | compact mark and typed wordmark hold | snappy mark, 22 fr typing, long hold | none |

Shot count is 12/12. Theme and palette roles match: light paper, dark ink, muted grid and two accent colours. The
`shellpine` demo makes the accents lime and blue rather than the reference's violet. Type stays sentence case and regular
weight; the wordmark follows the demo brand's mono face. All state boundaries are the measured boundaries, with a
six-frame pre-boundary morph overlap and no detected cuts in either render.

## Study log

id prompt-orbit-story · family launch-film · 26.01 s · 12 rows
8 vocabulary techniques; 0 detected cuts and 11 continuous morph boundaries
cut_on_beat false (0/0 cuts); music 160.3 BPM; no VO
Measurement resolution 0.25 s; overshoot, sub-0.25 s stagger, trail easing, and exact typing cadence not measurable
Proposed term: orb-trail-narrator
Missing components: OrbTrail, MediaMosaic
Phase A complete; status was studied before the build

Phase B complete in 2 iterations; status built
Gate: schema valid; composition 1920×1080, 30 fps, 780 frames; render duration 26.00 s vs 26.005 s reference (ratio 1.000)
Gate: 7 comparison sheets exist; 12/12 rows; maximum boundary delta 0 fr; shot-count ratio 1.000
Build uses abstract brand-colour portrait/media placeholders only; reference media, copy, logo and footage are absent
