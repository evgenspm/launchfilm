# Line collapses into a prompt, then mark and typed URL

A small opener line squeezes into a caret, a huge prompt field types the promise, the camera snaps out to a pill, the chrome falls away, then a drawn mark, a credit line and a typed URL. Silent except real key clicks.

Source: https://www.raylight.app/templates/r3WAW4Mu (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- An AI or text-to-anything product whose promise fits one typed prompt
- A short silent teaser or social loop under 12 s
- A minimal dark sign-off that needs mark plus URL without an end-card layout
- Brands with a simple geometric mark that can be drawn on in strokes
Not for: products that need UI proof, multi-claim stories, music-driven edits.

## Format
16:9 · 11.35 s · 30 fps · dark · no music (silent except key clicks), cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.77 | 0–23 | hook | opener line, 2 words, small, centred; collapses into a caret that grows a rounded field | locked frame, no camera move; the line drops ~17 % H into centre in 3 fr while a dark card corner leaves bottom-left | settle 0–3 fr easings.outExpo; hold to f16; f17–f20 letters squeeze to a point (4 fr, easings.inExpo); f19–f23 field grows round the caret, springs.layout ~5 fr (overshoot not measurable) | continuous | none |
| 2 | 0.77–1.60 | 23–48 | reveal | prompt field very close, larger than frame: plus icon, tall caret, 4-word promise typing, right side cropped | zoomed ~2.4x of the settled pill; pan left ~37 px/s @1920 | typing f28–f47, ~48 cps at peak; new chars grey, brighten to white over ~5 fr; caret hides ~f35 | continuous | type-click (observed) |
| 3 | 1.60–2.87 | 48–86 | feature | whole prompt as a small centred pill with plus icon and hairline; icon and chrome fall away | snap pull-out 2.4x → 1.0 in 1–2 fr (easings.outExpo); then static | hold f48–f77; f78–f81 icon fades/slides left; f79–f86 pill fill and hairline wipe off left to right (~8 fr, easings.linear); line recentres on springs.ui | continuous | none |
| 4 | 2.87–3.78 | 86–113 | feature | the promise as a bare centred line, brightness band travels across it | static | luma band ~2 words wide L→R f87–f105 (~18 fr, easings.linear); all words to full white by f113 (±0.25 s); line cut out, no exit | continuous | none |
| 5 | 3.78–5.47 | 113–164 | logo | brand mark alone, centred, ~17 % H, ribbon strokes | static | strokes grow from fragments f114–f132 (~18 fr, easings.outQuint); hold 31 fr; swaps out on one frame | continuous | none |
| 6 | 5.47–8.60 | 164–258 | logo | credit line, 3 words naming the maker, small, centred | static | appears on one frame at f164; holds 94 fr; replaced on one frame | continuous | none |
| 7 | 8.60–11.35 | 258–341 | cta | URL, 12 characters, typed from a fixed left edge so it ends centred; no caret | static | typewriter f258–f277, ~1.6 fr/char (~19 cps, uneven); holds 63 fr to the end | end | type-click (observed) |

Evidence per row:
1. sheet-01 cells 0–3 (0.00–0.77), strip at 0 s (frames 0–23), kf-000.50
2. sheet-01 cells 3–6 (0.77–1.50), strip at 1 s, kf-001.50; audio onsets 0.82–1.67
3. sheet-01 cells 7–11 (1.77–2.77), strip at 1 s row 4 and strip at 2.5 s, kf-002.50
4. sheet-01 cells 12–15 (3.00–3.77), strip at 2.5 s rows 2–5, kf-003.50
5. sheet-01 cell 15 → sheet-02 cells 0–6 (4.00–5.50), strips at 3.8 s and 5.2 s, kf-004.50
6. sheet-02 cells 7–15 (5.77–7.77), sheet-03 cells 0–2 (8.00–8.50), strip at 5.2 s
7. sheet-03 cells 3–12 (8.77–11.00), strip at 8.5 s, kf-009.50; audio onsets 8.64–9.33
cuts.json: 0 hard, 0 soft, 0 flashes (no cut frames).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1 (opener line collapses into the caret/field) | craft/vocabulary.md#transitions |
| prompt-typing | 2–3 | craft/vocabulary.md#ui, PromptBar |
| pull-out | 3 | craft/vocabulary.md#camera, Camera |
| logo-from-dot | 5 | craft/vocabulary.md#brand, LogoReveal variant draw |
| typewriter | 7 | craft/vocabulary.md#type, Typewriter |

## Look
Palette: #111111 bg (first half), #0A0B0B bg (second half, slightly cooler and darker), #FFFFFF type and mark, #D7D7D7 settled prompt text, #868686 plus icon and pill hairline, #3D3D3D field fill edge. Type: medium-bold grotesk, sentence case, normal tracking; URL in a rounder geometric sans. Treatment: none. Background: flat.

## What to adapt
- Copy: opener 2 words; prompt 4 words ending in a period (must overflow the frame at 2.4x zoom); credit 3 words; URL ≤ 14 chars.
- Brand: monochrome on dark; the mark carries the brand, no accent colour; URL closes.
- Timing: rows 5–7 holds can stretch or shrink; keep typing speeds (prompt ~48 cps, URL ~19 cps) and the 1–2 fr snap pull-out.

## Pitfalls
- The pull-out is a snap (1–2 fr), not a glide: a slow zoom-out kills the surprise.
- The prompt is typed while zoomed so the text runs off the right edge; a short prompt that fits loses the effect.
- Mark, credit and URL swap on single frames with no fades; adding crossfades makes it soft.
- Bg shifts from #111111 to #0A0B0B after the chrome leaves; keep it or the field fill reads as a box.

## Missing components
- CaretCollapse: a line of text whose letters squeeze to one point in 4 fr (inExpo) and become a caret, then a rounded field grows round it in ~5 fr (techniques: morph)
- ChromeWipeOff: a pill's fill and hairline wipe away left to right in ~8 fr while its leading icon fades, leaving the text in place (techniques: prompt-typing)
- LumaSweep: brightness band ~2 words wide crosses a line in ~18 fr, words behind it dim then all rise to white (techniques: none in vocabulary)

## Proposed terms
- caret-collapse: text squeezes into a single caret that becomes the input for the next beat, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- luma-sweep: a brightness band travelling across a static line of type, row 4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1, 2.5, 3.8, 5.2, 8.5 s; 0.25 s from sheets elsewhere. Not measurable: spring overshoot on the field growth and recentre (no visible overshoot at 1 fr, chosen as springs.layout / springs.ui defaults); exact luma-band width. Sound: audio is silent apart from two click bursts that match the typing, so type-click is observed; no other sound is planned. cut_on_beat = 0/0 cuts (no beats, no music).

## Study log
- id caret-collapse-prompt-mark-url, family kinetic-type, 11.35 s, 7 rows, one shot (0 cuts)
- techniques 5 (morph, prompt-typing, pull-out, logo-from-dot, typewriter); cut_on_beat n/a (0/0)
- audio: no music, no VO; key clicks observed on both typing bursts
- measured from 30 fps strips: collapse 4 fr, snap pull-out 1–2 fr, prompt ~48 cps, URL ~1.6 fr/char
- not measurable: spring overshoot (defaults), luma band width (±0.25 s)
- proposed terms: caret-collapse, luma-sweep
- missing components: CaretCollapse, ChromeWipeOff, LumaSweep
- phase B: not run
