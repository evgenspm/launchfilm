# Word flips across a hairline rule

A thin rule appears on white, one short line rises out from behind it, leans a few degrees, flips under the rule like a hinge, leans the other way, then slips back behind it. One line, one rule, four seconds.

Source: https://www.raylight.app/templates/WnMUHCFk (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A short title card or chapter marker where the type is the whole picture
- Introducing a product name or a two-word label in a calm, minimal voice
- A low-energy sting between longer scenes, silent autoplay
Not for: long copy (the line must fit inside the rule), multi-claim stories, anything that needs a CTA or URL.

## Format
16:9 · 4.47 s · 30 fps · light · no music (bpm null), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.20 | 0–6 | hook | empty white; thin grey rule fades in at centre, 49 % W | static | rule opacity 0→1 f4–f6, easings.linear 3 fr; full width at once | hard-cut | none |
| 2 | 0.20–1.43 | 6–43 | reveal | one line, 2 words (name/label), rises from behind the rule and sits on it | static | whole line rises out of a clip mask whose bottom edge is the rule, f6–f9, easings.outExpo 3 fr (overshoot not measurable); rotateZ 0→−4° f9–f30 easings.inOutSine, back to 0° by f42 | hard-cut | tick |
| 3 | 1.43–3.20 | 43–96 | reveal | same line flips across the rule and hangs below it | static | hinge flip: rotateX around the rule, above→below, f43–f47, easings.inOutSine 4 fr, letters squash and fade at the rule; below, rotateZ 0→+4° f48–f78 easings.inOutSine, back to 0° by f95 | hard-cut | swoosh-short |
| 4 | 3.20–4.47 | 96–134 | reveal | line slips up through the rule and is gone; the rule holds alone | static | exit f96–f99: line rises into the rule and is clipped, easings.inExpo 3 fr; rule holds 35 fr, no fade | hard-cut | none |

Evidence: row 1 sheet-01 cells 0–1 and strip f0–f6; row 2 sheet-01 cells 1–5 (0.27–1.27), keyframe kf-000.50, strip f6–f42; row 3 sheet-01 cells 6–12 (1.50 shows the flip mid-way, also kf-001.50), strip f43–f95; row 4 sheet-01 cells 12–15 and sheet-02 cells 0–1, strip f96–f134. No cut frames: cuts.json is empty.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 2, 4 (reverse) | craft/vocabulary.md#type, BlurIn enter="mask" |

## Look
Palette: #FFFFFF background, #1E1E1E type, #696969 rule, #B8B8B8 anti-aliased edges. Type: light-regular grotesk, sentence case, normal tracking, cap height about 4 % H, one line. Treatment: none. Background: flat white.

## What to adapt
- Copy: one line, 1–3 words, at most about 80 % of the rule width; it is the product name or a label.
- Brand: type in brand fg, rule in brand muted; an accent colour can go on the rule only, never on a fill.
- Timing: the two holds (rows 2 and 3) stretch together; entrance, flip and exit keep 3–4 fr.

## Pitfalls
- The rule never moves or scales; motion.json reports pan/zoom only because the small type tilts. Do not add a camera move.
- Lean is small (about 4°, ±1°) and changes sign with the side of the rule; bigger angles read as a mistake.
- Flip must hinge on the rule line itself (transform origin at the rule), or the line jumps instead of folding.
- The clip mask is one-sided: above the rule the line is clipped at its bottom, below it at its top.

## Missing components
- RuleHinge: a hairline rule (width share, colour) with one line of text clipped to the side it sits on; props riseAt, flipAt (rotateX 0→180° around the rule, 4 fr), exitAt, lean (rotateZ ±deg per side, inOutSine over the hold) (techniques: mask-rise; proposed rule-hinge-flip, rest-tilt)

## Proposed terms
- rule-hinge-flip: text flips from one side of a hairline rule to the other, rotating around the rule as a hinge, clipped by it (row 3) (not in craft/vocabulary.md; not used in recipe.json)
- rest-tilt: a slow small rotateZ lean during a text hold, opposite sign after each state change (rows 2, 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps strip of the centre region over the whole clip; tilt angles ±1°. Not measurable: overshoot on the 3 fr rise (none visible), exact easing of the flip (4 fr). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id rule-hinge-word-flip · family kinetic-type · 4.47 s, 4 rows, 0 cuts
techniques: 1 (mask-rise); catalogue hint tilt-plane not used: no UI plane, the type rotates itself
cut_on_beat: n/a (0/0), silent reference, sfx planned only
measured from a 30 fps strip: rise f6–f9, flip f43–f47, exit f96–f99; lean ±4° (±1°)
proposed terms: rule-hinge-flip, rest-tilt
missing components: RuleHinge
phase B: not run
