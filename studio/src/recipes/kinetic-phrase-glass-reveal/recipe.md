# Beat-Built Phrase Into a Glass UI

A centred phrase grows one word at a time, sheds its earlier words, and dives into a glass badge. A floating orb carries the focus into a compact interface reveal.

Source: https://www.raylight.app/templates/cn9UdlNI (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- a six-to-eight-second feature teaser led by typography
- a launch beat that must bridge copy into one compact interface
- a light brand with one saturated accent and translucent surfaces
Not for: a product whose value needs multiple screens, legible interaction detail, or a long explanation.

## Format
16:9 · 6.96 s · 30 fps · light · music 152.2 BPM, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.53 | 0–16 | hook | one centred setup word on a blue-white gradient | static | present at start; mesh drifts 2–6 px/s, easings.linear over 16 fr | blur-dissolve | none |
| 2 | 0.53–0.93 | 16–28 | hook | second word extends the line and becomes the accent focus | static | blur-in, easings.outExpo 3 fr; reflow springs.ui 10 fr | blur-dissolve | tick |
| 3 | 0.93–1.30 | 28–39 | hook | third word completes the setup statement | static | blur-in, easings.outExpo 3 fr; reflow springs.ui 10 fr | blur-dissolve | tick |
| 4 | 1.30–1.50 | 39–45 | hook | leading word leaves; remaining pair recentres | static | easings.inExpo 6 fr; reflow springs.ui 10 fr | blur-dissolve | none |
| 5 | 1.50–1.80 | 45–54 | hook | second word leaves; final setup word holds alone | static | easings.inExpo 9 fr; survivor recentres with springs.ui | blur-dissolve | none |
| 6 | 1.80–2.17 | 54–65 | reveal | new two-word reveal statement replaces the setup | static | sequential crossfade and blur-in, 6 fr apart, easings.outExpo 6 fr | blur-dissolve | tick |
| 7 | 2.17–2.37 | 65–71 | reveal | rounded blue badge completes the reveal line | static | pill springs.layout; label easings.stepped(7) across 6 fr | blur-dissolve | type-click |
| 8 | 2.37–3.13 | 71–94 | reveal | full reveal holds, then badge fills frame | zoom-tier full→detail, 1.00→2.75 in final 5 fr, springs.cameraSnappy | hold 18 fr; camera snap from 2.97 s | blur-dissolve | whoosh |
| 9 | 3.13–4.43 | 94–133 | reveal | translucent orb floats over the enlarged badge | drift x -4 px/s @1920, scale 1.00→0.99 | orb springs.pop 12 fr, then easings.inOutSine drift | blur-dissolve | shimmer |
| 10 | 4.43–4.80 | 133–144 | reveal | phrase and badge dissolve; orb grows into focus | static | type easings.inExpo 11 fr; orb springs.heavy 11 fr | blur-dissolve | none |
| 11 | 4.80–5.17 | 144–155 | logo | glass orb crosses the empty field as the sole subject | static | translate right/down, springs.heavy 11 fr | morph | shimmer |
| 12 | 5.17–5.60 | 155–168 | outro | rounded interface panel absorbs orb as its mark | static | panel springs.ui 13 fr; mark springs.heavy 13 fr | blur-dissolve | swell |
| 13 | 5.60–6.67 | 168–200 | outro | compact interface with heading, side icons and one highlighted capability | static | details easings.outExpo 6 fr, stagger 2 fr; hold 26 fr | blur-dissolve | ui-confirm |
| 14 | 6.67–6.96 | 200–209 | outro | interface fades back into the gradient | static | grouped easings.inExpo 9 fr | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–2`, strip 0.00 s; row 2 `sheet-01 cells 2–3`, strip 0.00 s; row 3 `sheet-01 cells 3–5`, strips 0.00–1.00 s; row 4 `sheet-01 cells 5–6`, strip 1.00 s; row 5 `sheet-01 cells 6–7`, strip 1.00 s; row 6 `sheet-01 cells 7–8`, strips 1.00–2.00 s; row 7 `sheet-01 cells 8–9`, strip 2.00 s; row 8 `sheet-01 cells 9–12`, strip 2.00 s; row 9 `sheet-01 cells 12–15` and `sheet-02 cells 0–1`, strips 3.00–4.00 s; row 10 `sheet-02 cells 1–3`, strip 4.00 s; row 11 `sheet-02 cells 3–4`, strips 4.00–5.00 s; row 12 `sheet-02 cells 4–6`, strip 5.00 s; row 13 `sheet-02 cells 6–10`, strips 5.00–6.00 s; row 14 `sheet-02 cells 10–11`, strip 6.00 s. `cuts.json` reports zero hard cuts, zero soft transitions and zero flashes, so no cut frame exists.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-reveal | 1–3, 6 | craft/05#word-reveal |
| dim-emphasis | 3–5 | craft/05#dim-emphasis |
| typewriter | 7 | craft/05#typewriter |
| zoom-tier | 8 | craft/03#zoom-tiers |
| blur-dissolve | 1–10, 12–13 | craft/09#blur-dissolve |
| morph | 11–12 | craft/09#morph |
| glass-mark | 9–12 | craft/06#glass-mark |
| mesh-gradient | 1–14 | craft/07#mesh-gradient |
| liquid-glass | 7–13 | craft/07#liquid-glass |
| glow | 1–14 | craft/07#glow |
| ui-rebuild | 12–14 | craft/06#ui-rebuild |

## Look
Palette: background `#FFFFFF`, accent `#2978FC`, glass midtone `#71A6FD`, highlight `#EEF6FE`. Type: bold grotesk, sentence case, tight tracking, 7–12 % of frame height; compact regular UI labels at the close. Treatment: `mesh-gradient`, `liquid-glass`, `glow`. Background: soft blue-white mesh gradient with slow blob drift.

## What to adapt
- Copy: one three-word setup and one three-part reveal; every unit is short enough to remain on one line at 16:9.
- Brand: put the accent on the newest or surviving word, use one simple mark that can read as a refractive orb, and reserve dark neutral text for the interface close.
- Timing: keep word events near the 152.2 BPM pulse grid; preserve the 5 fr detail zoom, 11 fr orb bridge, 13 fr panel entrance, and 26 fr final hold.

## Pitfalls
- The line must re-centre after every addition and removal; fixed word positions lose the chained focus effect.
- The full-to-detail camera move lasts about 5 fr. A slow push removes the impact at the visual midpoint.
- White type over the badge needs the sampled dark accent under it; pale glass alone does not hold contrast.
- The final interface is intentionally sparse. Extra rows or controls will not read during the 26 fr hold.

## Missing components
None for the built recipe. `EvolvingPhrase`, `MeshGradientBackdrop`, `LiquidOrbMark`, and `CompactPanel` are local to this recipe pending curator promotion.

## Build comparison
Iteration 1 fixed a frame-0 panel leak and panel/orb landing positions. Iteration 2 removed the phrase overlap, restored a visible frame-0 hook, delayed and enlarged the panel, and moved the orb into its mark slot. Iteration 3 added the measured orb focus growth. All boundaries use the phase-A structure grid directly.

| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---:|---|---|---|
| 1 | 0.00–0.53 | 0.00–0.53 | 0 | centred setup word, light mesh | static hook + mesh drift | frame 0 made visible |
| 2 | 0.53–0.93 | 0.53–0.93 | 0 | second word extends line | blur-in + recenter | none |
| 3 | 0.93–1.30 | 0.93–1.30 | 0 | three-word line | blur-in + recenter | none |
| 4 | 1.30–1.50 | 1.30–1.50 | 0 | leading word removed | short blur exit | none |
| 5 | 1.50–1.80 | 1.50–1.80 | 0 | final setup word isolated | short blur exit | none |
| 6 | 1.80–2.17 | 1.80–2.17 | 0 | replacement phrase | sequential blur-in | overlap shortened to 2 fr |
| 7 | 2.17–2.37 | 2.17–2.37 | 0 | compact glass badge | layout spring + label resolve | none |
| 8 | 2.37–3.13 | 2.37–3.13 | 0 | phrase then badge detail | 1.00→2.75 camera snap | none |
| 9 | 3.13–4.43 | 3.13–4.43 | 0 | orb over enlarged badge | pop then sinusoidal float | none |
| 10 | 4.43–4.80 | 4.43–4.80 | 0 | phrase dissolves, orb takes focus | 11 fr heavy growth | growth increased in iteration 3 |
| 11 | 4.80–5.17 | 4.80–5.17 | 0 | orb alone on mesh | heavy leftward travel | landing aligned to panel mark |
| 12 | 5.17–5.60 | 5.17–5.60 | 0 | interface absorbs orb | delayed UI spring + mark settle | panel start moved off-frame |
| 13 | 5.60–6.67 | 5.60–6.67 | 0 | sparse compact interface | 6 fr detail reveal + hold | panel enlarged to 52 % width |
| 14 | 6.67–6.96 | 6.67–6.96 | 0 | interface fades to mesh | 9 fr grouped fade | none |

Shot count is 14/14. Theme, palette roles, sentence case, bold display weight, entrance families, camera direction, and transitions match. The Plumday demo intentionally changes the source's blue hue to the brand's tangerine while retaining light background / saturated accent / translucent surface roles. The orb is layered CSS glass rather than measurable shader refraction; the final interface is slightly cleaner and less hazy than the source.

## Proposed terms
- `phrase-chain`: a centred line appends one word per beat, then removes its leading words while the remaining words reflow to centre; rows 1–6 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1, 2, 3, 4, 5 and 6 s; sheet evidence remains at about 0.25 s. The source duration is 6.955 s and rounds to 6.96 s; the analysis shot detector ends its content window at 6.867 s. No cut frames exist. Palettegen ran on the 0.50, 3.50 and 5.50 s keyframes because there are no cut frames. Not measurable: whether the glass refraction is a shader or layered blur, and the music genre. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr, therefore false.

## Study log
id kinetic-phrase-glass-reveal
family kinetic-type · 6.96 s · 14 rows
11 vocabulary techniques
cut_on_beat false: 0/0 cuts within ±2 fr
Measured state boundaries at 1 fr from local 30 fps strips; sheet evidence is about 0.25 s.
Could not measure whether the glass refraction is shader-based; music genre remains null.
Proposed term: phrase-chain.
Missing components: EvolvingPhrase, MeshGradientBackdrop, LiquidOrbMark.
Phase A studied.
Phase B built in 3 comparison iterations.
Gate: composition registered; schema valid; final render is 209 fr / 6.966667 s at 1920×1080 and 30 fps; duration ratio 1.001 vs 6.96 s; 2 comparison sheets exist; frame-0 JPEG poster is non-black.
Local components: EvolvingPhrase, MeshGradientBackdrop, LiquidOrbMark, CompactPanel. Missing components: none.
Remaining differences: Plumday tangerine replaces source blue by design; CSS glass approximates unmeasurable refraction; final UI is less hazy.
