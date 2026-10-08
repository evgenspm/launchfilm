# Prompt typed big, then bloomed into a step list

A wordmark on a green gradient erases into big typing with a colour trail, cuts to the same line in a small prompt bar, then the bar blooms into a card whose tagged steps write themselves in under a second.

Source: https://www.raylight.app/templates/V0CIgaMV (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An agent or automation product that turns one instruction into a plan of steps
- A short silent intro (about 5 s) for a feed or a landing hero loop
- Showing input and structured output as one continuous object, no cut to a new scene
- A light, calm brand where colour-coded tags can carry meaning
Not for: products whose output is not a list or plan; films that need VO or a beat-driven edit.

## Format
16:9 · 4.97 s · 30 fps · light (dark green open for 1.3 s) · no music, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.33 | 0–40 | hook | small wordmark lockup centred on a blurred green gradient; the name erases letter by letter from the left | static f0–25, then push-in 1.00 → ~3.0 f25–40, easings.inExpo (±0.25 s) | hold 25 fr; ~1 letter per fr removed f25–43; gradient washes to off-white f35–45 | blur-dissolve | none |
| 2 | 1.33–2.27 | 40–68 | hook | hero-size typing of one instruction sentence (about 6 words), centred, accent caret | static | ~23 chars/s, 1 char/fr, 2 fr holds at word gaps; colour trail 3–4 chars, accent → near-black over 4–5 fr per char; solid caret | match-cut | type-click |
| 3 | 2.27–3.40 | 68–102 | reveal | same sentence continues inside a small white pill prompt bar with a round dark send button | drift 1.000 → ~1.01 | 1 black frame at f68; typing ends f93; caret removed; f100 send colour swap dark → accent in 1 fr; glow ramps inside bar f99–102 | morph | ui-confirm |
| 4 | 3.40–4.40 | 102–132 | feature | bar blurs into an accent ellipse that grows into a white card; numbered steps with coloured tag pills write in, nested sub-steps, an add-step row | static; content scrolls up ~8 px @720p from f119 | blur 0 → ~20 px f101–103; card ~1.4× by f105, springs.layout (overshoot not measurable); rows every 3–4 fr from f106; per row 6–8 fr: number 1 fr → pill scaleX 2–3 fr → text reveal with tinted leading edge ~5 fr | morph | pop |
| 5 | 4.40–4.97 | 132–149 | feature | rows clear, card collapses back into the blurred accent ellipse | static | reverse morph, easings.inExpo ~12 fr (±0.25 s); ellipse holds to the end | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–5 (0.00–1.27), cuts/cut-001.17.jpg (before 1.13), keyframes/kf-000.50.jpg
2. sheet-01 cells 6–8 (1.50–2.00), cuts/cut-001.17.jpg (after 1.50), cuts/flash-002.27.jpg (before 2.23), keyframes/kf-001.50.jpg
3. sheet-01 cells 9–13 (2.27–3.27), cuts/flash-002.27.jpg (after 2.27), keyframes/kf-002.50.jpg
4. sheet-01 cells 14–15 (3.50–3.77), sheet-02 cells 0–1 (4.00–4.27), keyframes/kf-003.50.jpg
5. sheet-02 cells 2–3 (4.50–4.77)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| push-in | 1 | craft/vocabulary.md#camera, craft/04-motion.md |
| blur-dissolve | 1 | craft/vocabulary.md#transitions |
| match-cut | 2 → 3 | craft/vocabulary.md#transitions (sentence carried from hero size into the bar) |
| prompt-typing | 2, 3 | craft/vocabulary.md#ui (PromptBar, TypeLine trail 'color') |
| morph | 3 → 4, 4 → 5 | craft/vocabulary.md#transitions |
| list-assemble | 4 | craft/vocabulary.md#ui (ListAssemble enter 'write') |
| ui-rebuild | 3, 4 | craft/vocabulary.md#ui |
| mesh-gradient | 1 | craft/vocabulary.md#look |
| glow | 3, 4, 5 | craft/vocabulary.md#look |

## Look
Palette: #F2F1ED background off-white, #141514 text, #428A71 accent green, #195C42 deep gradient green, #FDFDFD bar and card white, #717F7F muted. Type: neutral grotesk, regular weight, sentence case, normal tracking; wordmark ~3 % H, hero typing ~9 % H, UI ~1.5 % H, list body ~1.2 % H. Treatment: mesh-gradient (open only), glow. Background: blurred green mesh gradient for 1.3 s, then flat off-white.

## What to adapt
- Copy: one instruction sentence of 30–45 chars (split into hero part ~17 chars and bar part); 6–10 steps, tag 1 word, text 4–10 words, up to 2 nesting levels.
- Brand: accent carries trail, caret, send button and glow; tag pills use 4 distinct hues by step type; logo only in row 1.
- Timing: row 1 hold can stretch; typing speed, the 1 fr send swap, the ~6 fr morph and the 3–4 fr row gap must keep their frame counts.

## Pitfalls
- Rows appear every 3–4 fr but each writes in over 6–8 fr; if a row pops in whole, the list reads as one jump.
- The send moment is a colour swap, not a press: a squash spring here would look heavier than the reference.
- The single black frame at f68 is part of the cut; keep it at 1 fr or drop it, never longer.
- The trail colour must cool to text colour, not to transparent, or the sentence flickers.

## Missing components
- MeshGradient: full-frame blurred 3–4 blob gradient in two brand greens, drift ~27 px/s @1920, `washTo` colour + frames to bleach to bg (techniques: mesh-gradient)
- GlowMorph: element → blurred accent ellipse (blur 0 → 20 px, 2 fr) → card rect grown ~1.4× in 3 fr, and the reverse (techniques: morph, glow)
- StepRow write mode for ListAssemble: number, coloured tag pill (scaleX from left, 3 fr), text mask reveal with tinted leading 30 %, nesting depth indent (techniques: list-assemble)
- LetterErase: wordmark letters removed one per frame from the left while the camera pushes (techniques: push-in)

## Proposed terms
- letter-erase: a wordmark or line removed letter by letter from one edge, ~1 letter per fr, used as the exit of an opening mark (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- colour-trail typing: newest 3–4 typed chars in the accent cooling to the text colour (rows 2–3); covered today by prompt-typing (not a separate id)

## Measurement notes
Resolution: 0.25 s from sheets; frame numbers in rows 1–4 from the human 30 fps measurement notes, consistent with the sheet timestamps. Not measurable from sheets: spring overshoot on the card growth, exact push-in end scale (~3.0, ±0.25 s), exit easing in row 5. cuts.json has 0 hard cuts and 1 soft (1.17–1.50); the 2.27 event is listed as a 1 fr black flash but the composition changes (big type → bar), so it is a row boundary. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr (no beats).

## Study log
id prompt-steps-glow-morph · family product-ui · 4.97 s, 5 rows (hook, hook, reveal, feature, feature).
9 techniques (7 motion/ui + 2 look). cut_on_beat n/a: silent, no beats.
Not measurable at 0.25 s: card spring overshoot, push-in end scale, collapse easing.
Proposed terms: letter-erase.
Missing components: MeshGradient, GlowMorph, StepRow write mode, LetterErase.
Phase B: not run (study batch).
