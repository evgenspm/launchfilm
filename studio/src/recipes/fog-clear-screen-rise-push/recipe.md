# Fog clears on a night forest, a site screen rises

One continuous shot: the camera pushes through dense night fog and thorny branches until a dark website screen, lying in the grass, tilts upright and settles centre frame under a moonlit sky.

Source: https://www.raylight.app/templates/nm0vARFg (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A seasonal or themed teaser where the setting sells the mood and the landing page is the payoff.
- One hero page to show, no feature walk-through.
- Silent autoplay loops on social where one slow reveal is enough.
Not for: products that need several screens or a demo of a flow; light-theme pages (they glare in the night plate).

## Format
16:9 · 11.4 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0 cuts) · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | full-frame dense blue-grey fog, darker edges | push-in ~1.3 %/s, then ~13 %/s with slight up-left drift, ~2 deg roll | fog churns; push accelerates, easings.inOutSine onset (±0.25 s) | continuous | none |
| 2 | 2.00–3.00 | 60–90 | reveal | fog thins; thorny branches frame top and sides; dark screen lies nearly flat in the grass, centre low | push-in ~16 %/s | fog opacity full → ~half over 30 fr (±0.25 s); screen a thin dark sliver | continuous | swell (planned) |
| 3 | 3.00–6.00 | 90–180 | reveal | screen tilts upright showing a dark landing page: 2-line headline, one pill button; moon and castle appear | push-in peaks ~22 %/s at 4–5 s, eases to ~5 %/s by 6 s; branches slide out to the edges | tilt ~80 deg → ~0 deg over ~60 fr (3.00–5.00, ±0.25 s), springs.heavy (overshoot not measurable) | continuous | riser (planned) |
| 4 | 6.00–8.00 | 180–240 | reveal | upright screen centre-left, page readable; ground fog rolls in front of its base | push ends, slow pull back ~-2.6 %/s; screen width 42 % → ~38 % of frame | easings.outQuint settle (±0.25 s); fog drifts left to right | continuous | impact-low (planned) |
| 5 | 8.00–11.40 | 240–342 | reveal | same composition held: sky with bats, graveyard right, warm-lit castle left | drift -1.7 → 0 %/s, still from ~10 s; screen ~36 % of frame width | only ground fog moves; no UI animation | end | none |
Evidence: row 1 sheet-01 cells 0–7, kf-000.50; row 2 sheet-01 cells 8–11, kf-002.50; row 3 sheet-01 cells 12–15 + sheet-02 cells 0–7, kf-004.50; row 4 sheet-02 cells 8–15; row 5 sheet-03 cells 0–13, kf-010.50. No cut frames (cuts.json lists 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| push-in | 1–4 | craft/03-camera-and-staging.md#drift-and-push-in |
| speed-ramp | 1–4 (slow → fast → stop → slight pull back) | craft/03-camera-and-staging.md |
| tilt-plane | 3 | craft/03-camera-and-staging.md (TiltPlane) |
| device-browser | 3–5 | framed page, thin bezel, no device body |
| vignette | 1–5 | look |

## Look
Palette: #10151B background shadows, #9BB0C4 fog and moonlight, #4A627D mid fog, #2B3C4E night blue, #15191E screen black. Warm castle windows are a small orange accent (not in palettegen top 6). Type: on-screen page only, large light serif headline, sentence case, 2 lines, about 6 % of frame height at the hold. Treatment: vignette. Background: footage-like painted night plate with layered fog.

## What to adapt
- Copy: none of our own on screen; the page screenshot carries it. Its hero line must be ≤ 2 lines and legible at ~36 % frame width.
- Brand: dark landing page; one light pill button is the only bright UI element.
- Timing: rows 1–2 (fog) can stretch to 3 s; the tilt (row 3) needs ≥ 60 fr; keep ≥ 3 s hold at the end.

## Pitfalls
- The fog must hide the screen completely for the first 2 s; a visible screen early kills the reveal.
- Push and tilt peak together (4–5 s); if the tilt finishes before the push, the screen looks pasted on.
- A light page in this plate becomes the brightest thing and fights the moon.

## Missing components
- FogLayers: 2–3 full-frame soft fog planes with independent drift (8–20 px/s at 1920) and opacity keyed over time, plus a ground-fog band that passes in front of the screen base (techniques: push-in).
- NightPlate: layered parallax backdrop (sky, midground, foreground branches) that scales at different rates under the push.

## Proposed terms
- fog-clear: reveal where layered fog thins while the camera pushes through it; rows 1–3 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip made). Push speeds from motion.json per second (zoom %/s, pan px/s at 1920). Not measurable: tilt angle, tilt spring overshoot, fog opacity curve. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no beats).

## Study log
id fog-clear-screen-rise-push · family product-ui · 11.4 s, 5 rows, one continuous shot (0 cuts).
Techniques 5 (push-in, speed-ramp, tilt-plane, device-browser, vignette). cut_on_beat n/a, silent reference.
Not measurable at 0.25 s: tilt angle and spring, fog opacity curve; push speeds from motion.json.
Proposed terms: fog-clear. Missing components: FogLayers, NightPlate.
Phase B: not run.
