# Voice assistant orb with status card tour

On a bright grid canvas a tiny call glyph grows into an app icon, a brand moment plays on a soft gradient, then a glossy orb speaks in typed lines and three rim-lit cards land one by one while the camera follows the newest.

Source: https://www.raylight.app/templates/zuPFFUs0 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Launching a voice or chat agent that does a few concrete jobs (answer, schedule, remind)
- Three capabilities shown as live status cards instead of screen recordings
- Silent autoplay with a calm, light, premium tone; no music or VO needed
- A 20 to 25 s explainer where the assistant (the orb) is the character
Not for: dark or high-energy brands, products with no agent persona, or films that need a hard-cut rhythm.

## Format
16:9 · 24.53 s · 30 fps · light · music none (reference silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | white grid canvas; tiny round call-glyph button pops in at centre, holds | grid shifts, slow pull-out (±0.25 s) | button springs.pop 0.27–0.50 s, ~10 fr (±0.25 s, overshoot not measurable) | morph | pop |
| 2 | 2.00–4.50 | 60–135 | reveal | button grown into large mesh-gradient squircle; glyph call → waveform, bars dance | static, icon breathes ~2 % | grow on easings.pillGrow 12 fr (±0.25 s); glyph crossfade 8 fr; bars easings.linear | blur-dissolve | swell |
| 3 | 4.50–6.00 | 135–180 | logo | icon washes out, frame floods with blurred blue-violet gradient; brand word fades in white | static, gradient drifts | wash 8 fr + resolve 8 fr; word fade 8 fr easings.outQuint (±0.25 s) | morph | none |
| 4 | 6.00–7.25 | 180–218 | logo | caret appears left of the word and deletes it right to left | static | typewriter delete ~2 chars per 0.25 s, easings.stepped; letters fade 2–3 fr (±0.25 s) | morph | type-click |
| 5 | 7.25–8.75 | 218–263 | logo | caret thickens into a bar, then a white app-icon squircle with the mark; holds, washes to white | static | caret → bar → squircle springs.ui ~12 fr (±0.25 s); mark fades 8 fr; wash 8 fr | blur-dissolve | swell |
| 6 | 8.75–10.00 | 263–300 | feature | glossy pastel orb fades in left of centre; greeting, 1 word, wiped in beside it | static | orb 8 fr fade, scale 0.96→1, ~100 px left drift over 20 fr easings.outQuint; greeting mask-wipe R→L + 30 px slide 9 fr | hard-cut | none |
| 7 | 10.00–11.75 | 300–353 | feature | greeting shrinks up and greys; second line, 7 words, types with soft tail; text clears, orb alone | drift: orb ~30 px/s | greeting up springs.ui 12 fr (±0.25 s); type ~1.1 chars/fr, 8–10 char opacity tail; text fade 8 fr | hard-cut | type-click |
| 8 | 11.75–13.00 | 353–390 | feature | orb exits right; huge pale rounded card lands from camera, settles left, light-blue rim glow | static | orb 120 px right + fade 10 fr easings.inExpo; card scale ~2.5→1, blur → 0 easings.landing ~18 fr (±0.25 s) | hard-cut | whoosh |
| 9 | 13.00–14.00 | 390–420 | feature | card one: heading, 1 word, types; three call rows appear (mini orb, live bars, timer, call button) | static | heading typewriter 1 char/fr, 3 fr after row 1; rows stagger 6–8 fr, fade 5–6 fr with 4 px blur | hard-cut | type-click |
| 10 | 14.00–15.75 | 420–473 | feature | card two rises lower right: day strip, three appointment rows, confirmed pill; camera moves onto it | push-in 1.00→1.25 over 25 fr + pan right, easings.inOutSine | rise 12 fr from opacity 0.1, scale 0.85, +60 px, blue tint → white, springs.ui; rows stagger 6–8 fr; pill springs.pop (overshoot not measurable) | blur-dissolve | ui-confirm |
| 11 | 15.75–17.75 | 473–533 | feature | everything tints pale blue and dissolves; card three resolves: reminder timeline left, message panel right | static | tint 8 fr, resolve 8 fr (±0.25 s); timeline steps and bubbles stagger ~6 fr (±0.25 s) | slide-push | none |
| 12 | 17.75–19.00 | 533–570 | feature | card slides off left; orb returns at right; short line, 3 words, fades in and clears | dolly left ~530 px/s @1920 for ~0.5 s, easings.inOutSine | orb enters from right springs.heavy ~24 fr (±0.25 s); line fade 8 fr in/out | hard-cut | none |
| 13 | 19.00–20.75 | 570–623 | feature | new line, 6 words, types left of the orb with soft tail, holds | drift: orb ~30 px/s | soft-tail typing ~1.1 chars/fr, 8–10 char ramp; hold ~0.75 s | blur-dissolve | type-click |
| 14 | 20.75–23.75 | 623–713 | cta | orb exits right, line crossfades into centred close, 4 words ending in product name; light sweep crosses letters; hold | static | crossfade 8 fr (±0.25 s); sweep L→R 21.75–22.75 easings.inOutSine; fade out 8 fr at 23.50 | blur-dissolve | shimmer |
| 15 | 23.75–24.53 | 713–736 | outro | empty white frame | static | none | hard-cut | none |

Evidence per row (no cut frames exist: cuts.json has 0 hard, 0 soft, 0 flashes):
1 sheet-01 cells 0–7 · 2 sheet-01 cells 8–15, sheet-02 cells 0–1 · 3 sheet-02 cells 2–7 · 4 sheet-02 cells 8–11 · 5 sheet-02 cells 12–15, sheet-03 cells 0–3 · 6 sheet-03 cells 3–7 · 7 sheet-03 cells 8–15 · 8 sheet-03 cell 15, sheet-04 cells 0–3 · 9 sheet-04 cells 4–7 · 10 sheet-04 cells 8–14 · 11 sheet-04 cell 15, sheet-05 cells 0–6 · 12 sheet-05 cells 7–11 · 13 sheet-05 cells 12–15, sheet-06 cells 0–2 · 14 sheet-06 cells 3–14 · 15 sheet-06 cell 15, sheet-07 cells 0–2. Keyframes kf-002.50, kf-005.50, kf-010.50, kf-014.50, kf-017.50, kf-022.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1, 3, 4 (seed → icon, wash → word, caret → icon) | craft/09-transitions.md, PillMorph |
| blur-dissolve | 2, 5, 10, 13, 14 (washes and crossfades) | craft/09-transitions.md#blur-dissolve |
| mesh-gradient | 2, 3, 4, 5 (icon fill, flooded backdrop) | craft/vocabulary.md#look |
| typewriter | 4, 7, 9, 13 | craft/05-typography.md, TrailType / Typewriter |
| mask-wipe | 6 (greeting wipe) | craft/09-transitions.md |
| card-grid | 8–11 (three cards enter staggered) | craft/vocabulary.md#ui, StatusCard |
| list-assemble | 9, 10, 11 (rows stagger in) | craft/vocabulary.md#ui, StatusCard rows |
| push-in | 10 (follow push 1.25) | craft/03-camera-and-staging.md#drift-and-push-in |
| dolly | 12 (lateral travel off card three) | craft/03-camera-and-staging.md |
| glow | 8–11 (card rim glow) | craft/vocabulary.md#look |
| ui-rebuild | 9–11 (cards are rebuilt UI) | craft/vocabulary.md#ui |

## Look
Palette: #FFFFFF background, #262626 text, #79A3EF accent blue (icon, orb), #8D92DC violet (gradient flood), #A9BDEC orb highlight, #E3DADF peach tint. Type: rounded geometric grotesk; brand word semibold white 6 % H; assistant lines regular sentence case 3 % H; card headings bold navy 4 % H; tiny mono timers. Treatment: glow, mesh-gradient. Background: flat white with faint grid (rows 1–2), blurred blue-violet gradient (rows 3–5), flat white after.

## What to adapt
- Copy: greeting 1 word; assistant line ≤ 8 words; three card titles of 1 word each naming a capability; bookend lines of 3 and 6 words; close of 4 words ending in the product name.
- Brand: accent blue drives the orb, icon, rim glow and confirmed pill; logo appears once in rows 3–5 (word then app icon). Swap the gradient flood for the brand's two lightest accents.
- Timing: rows 9–11 can stretch by 0.5 s each for denser cards; keep the 8 fr orb entrance, 6–8 fr row stagger and 8 + 8 fr washes.

## Pitfalls
- No cuts at all: adding a hard cut breaks the continuous, material feel; every change must be a morph, wash, landing card or camera move.
- Orb radius must not pulse (< 1 %); only its inner colours swirl. A pulsing orb reads as a loading spinner.
- Card rows fade with blur and no slide; sliding rows look like a list template.
- Typing needs the soft 8–10 char tail; a hard caret looks like a terminal.
- Follow-cam push is 25 fr ease-in-out; a spring with overshoot on the camera makes the cards wobble.

## Missing components
- Wash: full-frame tint + fade 8 fr, next scene resolves from the same tint 8 fr, configurable tint colour (techniques: blur-dissolve)
- CaretMorph: text caret deletes a word right to left, then thickens to a bar and a squircle icon on springs.ui ~12 fr (techniques: morph, typewriter)
- ShimmerSweep: soft white light band crossing a text line left to right over ~30 fr, easings.inOutSine (techniques: glow)

## Proposed terms
- wash: frame tints to a pale colour and dissolves; the next scene resolves out of the tint (rows 3, 5, 11)
- soft-tail-type: typing where the last 8–10 characters ramp in opacity behind the head (rows 7, 13)
- card-land: a card enters from in front of the camera, scale ~2.5 → 1 with blur → 0 (row 8)
- shimmer-sweep: a light band sweeping across settled type (row 14)
- caret-morph: a text caret becomes the logo container (rows 4–5)

## Measurement notes
Resolution: 0.25 s from sheets; finer numbers (8 fr orb entrance, 10 fr exit, 6–8 fr row stagger, 1 char/fr heading, 12 fr card rise, 25 fr push) taken from the human frame-by-frame notes measured on 30 fps strips. Not measurable here: overshoot of the seed button and the confirmed pill, exact sweep width. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). loopable false: last frame is plain white without the opening grid.

## Study log
id orb-assistant-card-tour · family launch-film · 24.53 s, 15 rows, 0 cuts (rows split at state changes).
Techniques: 11 (incl. look ids glow, mesh-gradient). cut_on_beat: n/a (silent, 0 cuts, 0 beats).
Not measurable from sheets: overshoots (pop, pill), sweep width; fine timings from human 30 fps notes.
Proposed terms: wash, soft-tail-type, card-land, shimmer-sweep, caret-morph.
Missing components: Wash, CaretMorph, ShimmerSweep.
Phase B: not run (batch study only).
