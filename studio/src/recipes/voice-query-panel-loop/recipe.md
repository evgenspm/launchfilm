# Voice query panel loop

A wordmark pill grows a mic button, a cursor taps it, the pill swells into a frosted panel where a spoken question resolves letter by letter, thinks, streams an answer and settles into a checked list, then folds back.

Source: https://jitter.video/template/the-prompt-voice-search/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Assistant, search or voice products where speaking the question is the hero moment
- Loopable vertical hero clip (landing page, social feed); the last frame equals the first
- Showing ask, think, answer in one calm continuous shot with no cuts
Not for: products whose value is in a dense UI, or films that need a claim, a URL or a CTA on screen.

## Format
9:16 · 20.00 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | short wordmark pill top-left on a big frosted plate over a pale blue-violet gradient | near-static, zoom 1.6 %/s from the pill | pill widens ~25 %, springs.layout 8 fr (±0.25 s) | morph | none |
| 2 | 0.50–2.00 | 15–60 | feature | mic button splits off the pill; cursor enters and taps it | near-static, zoom 2.1 %/s | button slides out springs.ui 8 fr (±0.25 s); cursor in at 0.77, press at 1.77, springs.click (overshoot not measurable) | morph | tick |
| 3 | 2.00–2.77 | 60–83 | feature | pill and button merge into one panel growing downward; gradient saturates; status label fades in | static plate | height 1 to 1.6x springs.layout 15 fr; label fade 8 fr (±0.25 s) | hard-cut | none |
| 4 | 2.77–5.77 | 83–173 | feature | spoken question resolves letter by letter, 3 lines, ~11 words; listening label shimmers | static plate, gradient drifts blue to violet | glyphs from blur, ~4 words/s, easings.outQuint per glyph (±0.25 s) | hard-cut | none |
| 5 | 5.77–7.50 | 173–225 | feature | question holds; label swaps to thinking with shimmer | static plate | crossfade 8 fr, shimmer ~30 fr (±0.25 s) | hard-cut | none |
| 6 | 7.50–9.77 | 225–293 | feature | grey answer paragraph streams under the question, scrolls up in a faded mask, fades out | static plate | ~14 words/s, scroll easings.linear; fade 8 fr from 9.50 (±0.25 s) | blur-dissolve | none |
| 7 | 9.77–12.00 | 293–360 | feature | question alone, empty answer area; gradient pales to lilac | static plate | no element motion; first row begins at 11.77 (±0.25 s) | hard-cut | none |
| 8 | 12.00–15.27 | 360–458 | proof | checked list of three short place names, one under the other | static plate | rows at 12.00, 13.27, 14.50, blur-in fade easings.outQuint 8 fr (±0.25 s) | hard-cut | pop |
| 9 | 15.27–17.27 | 458–518 | proof | row of six small action icons under the list; full answer holds | static plate | icon row fade 8 fr (±0.25 s); hold 1.75 s | blur-dissolve | none |
| 10 | 17.27–18.77 | 518–563 | proof | content blurs out, panel collapses to a bar, splits back into pill + button, button retracts | static plate | blur-out 8 fr; collapse springs.layout 15 fr; split 18.00; retract 18.50–18.77 (±0.25 s) | morph | swoosh-short |
| 11 | 18.77–20.00 | 563–600 | logo | wordmark pill alone, narrowing to its opening width (loop point) | static plate | width -15 %, springs.layout 15 fr (±0.25 s), hold | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–1`; 2 `sheet-01 cells 2–7`; 3 `sheet-01 cells 8–10`; 4 `sheet-01 cells 11–15`, `sheet-02 cells 0–7`, `keyframes/kf-003.50.jpg`; 5 `sheet-02 cells 7–13`; 6 `sheet-02 cells 14–15`, `sheet-03 cells 0–6`; 7 `sheet-03 cells 7–15`; 8 `sheet-04 cells 0–12`; 9 `sheet-04 cells 13–15`, `sheet-05 cells 0–4`; 10 `sheet-05 cells 5–10`; 11 `sheet-05 cells 11–15`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| cursor-path | 2 | craft/04#springs (springs.click), Cursor |
| morph | 1, 2, 10, 11 | craft/09-transitions.md (morph), PillMorph |
| prompt-typing | 4 | craft/vocabulary.md#ui, PromptBar / TrailType |
| thinking-state | 5 | craft/vocabulary.md#ui, ThinkingState |
| stream-text | 6 | craft/vocabulary.md#ui, StreamText |
| list-assemble | 8 | craft/vocabulary.md#ui, ListAssemble |
| ui-rebuild | 1–11 | craft/vocabulary.md#ui |
| mesh-gradient | 1–11 | craft/vocabulary.md#look |

## Look
Palette: #DFE3EE background plate, #1D1D1F wordmark and question text, #C7ABF7 violet gradient accent, #CFD6E8 pale blue gradient, #9BA1AC muted labels, #BDC3D3 plate edge. Type: geometric grotesk wordmark with a superscript tag, 2.5 % H; question regular sans, sentence case, 1.5 % H; labels light grey ~1 % H. Treatment: mesh-gradient. Background: animated pastel gradient (blue, violet, lilac) behind a static frosted plate with a double hairline edge; the panel is a lighter frosted card with a soft shadow.

## What to adapt
- Copy: one question of 8 to 14 words (3 lines), one answer paragraph of 40 to 80 words that streams and is dropped, 3 answer rows of 1 to 3 words, 2 status labels (listening, thinking).
- Brand: wordmark in the pill; the two gradient colours carry the brand accent (cool at rest, saturated while listening and thinking, paler once answered).
- Timing: rows 4 and 7 stretch with copy length; rows 1–3 and 10–11 keep their frame counts so the morphs read; keep 19.77 equal to 0.00 for the loop.

## Pitfalls
- The gradient is the only cue for "the system is listening": it saturates at 2.27 and pales after 10.0. A static backdrop kills the state change.
- The answer paragraph must fade out before the list lands (2.2 s gap 9.77 to 12.00); overlapping them reads as clutter.
- List rows land 1.25 s apart; faster and the list stops reading as an answer being built.
- The plate never moves; all motion is inside the panel. Adding camera moves breaks the calm loop.

## Missing components
- VoiceTranscribe: text resolves glyph by glyph from blur with a soft trailing fade, ~4 words/s, 3 lines, left-aligned (techniques: prompt-typing; TrailType is the closest)
- PillSplitPanel: one pill splits into pill + round button, merges into a panel that grows in height on springs.layout, and reverses (techniques: morph; PillMorph covers a single capsule only)
- PastelStateGradient: background gradient that crossfades between named states (rest, active, done) over ~30 fr (techniques: mesh-gradient)

## Proposed terms
- voice-transcribe: spoken query rendered as glyphs resolving from blur with a trailing fade while a listening label shimmers (row 4) (not in craft/vocabulary.md; not used in recipe.json)
- pill-split: a pill emits a second round control that later merges back into one surface (rows 2, 10) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: spring overshoot of the cursor and panel, per-glyph timing of the transcript, exact stream rate (estimated ~14 words/s). The catalogue hint of a live waveform is not confirmed: no waveform is visible in any cell. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no audio, no cuts).

## Study log
id voice-query-panel-loop · family product-ui · 20.00 s, 9:16, 30 fps, single shot, 0 cuts, 11 rows from UI state changes.
Techniques: 8 (incl. ui-rebuild and mesh-gradient). cut_on_beat n/a (silent, no cuts); loopable true.
Not measurable at 0.25 s: overshoot, glyph timing, stream rate.
Proposed terms: voice-transcribe, pill-split.
Missing components: VoiceTranscribe, PillSplitPanel, PastelStateGradient.
Phase B: not run (study batch).
