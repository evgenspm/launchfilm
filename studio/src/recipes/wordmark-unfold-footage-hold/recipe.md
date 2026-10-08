# Lockup word unfold over still footage

A small mark and one-word wordmark sit centred on a full-bleed travel plate; a second, lighter word unfolds to the right as the lockup re-centres, holds, then folds back. Quiet, loopable brand sting.

Source: https://jitter.video/template/the-route-logo-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A brand whose short name expands into a longer name or a category word (name + descriptor).
- A loopable 5 s sting over hero photography or a calm footage plate (site header, social intro).
- Silent autoplay intros where only the mark has to register.
- Travel, mobility or hospitality identities with strong imagery.
Not for: brands with a single-word name and nothing to unfold, or busy footage with no calm mid-tone area at frame centre.

## Format
16:9 · 5.00 s · 30 fps · mixed (dark sea + light fuselage) · no music, bpm null, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.17 | 0–35 | hook | full-bleed aerial still of a jet fuselage over dark sea; small mark + one-word wordmark centred | static | none: short lockup holds from frame 0, 35 fr | hard-cut | none |
| 2 | 1.17–1.73 | 35–52 | logo | descriptor word (1 word, lighter weight) unfolds right of the first; lockup slides left to stay centred | static | lockup x ~-130 px@1920, easings.outExpo 17 fr; letters fade in left to right ~1 fr apart, opacity 0 → 0.75 | hard-cut | swoosh-short |
| 3 | 1.73–3.50 | 52–105 | logo | full two-word lockup centred | static | hold 53 fr | hard-cut | none |
| 4 | 3.50–3.90 | 105–117 | logo | descriptor slides left under the first word and fades right to left; lockup re-centres on the short form | static | lockup x ~+130 px@1920, easings.inOutSine 12 fr; reverse of row 2, faster | hard-cut | swoosh-short |
| 5 | 3.90–5.00 | 117–150 | logo | short lockup holds, identical to frame 0 | static | hold 33 fr; frame 149 = frame 0 | hard-cut | none |

Evidence per row: 1 = sheet-01 cells 0–4 (0.00–1.00), first-frame grab; 2 = sheet-01 cells 4–7 (1.00–1.77, descriptor appearing at 1.27, solid at 1.77) and strip t=1.00 cells 5–22; 3 = sheet-01 cells 7–14 (1.77–3.50); 4 = sheet-01 cells 14–15 (3.50 full, 3.77 short) and strip t=3.30 cells 6–18; 5 = sheet-01 cell 15, sheet-02 cells 0–3 (4.00–4.77), first/last frame comparison. No cut frames exist (cuts.json: 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| end-card | 3, 5 | craft/vocabulary.md#brand (lockup hold; no URL or CTA here) |
| hard-cut | 1–5 | craft/vocabulary.md#transitions (default; there are no cuts, the clip is one shot) |

## Look
Palette: #021C32 (deep sea, background), #DCD8CF (fuselage highlight), #C4BFB5 (fuselage mid), #8E969A (metal grey), #4D697E (sky/sea mid), #0E3149 (sea mid). Lockup is pure white. Type: geometric grotesk, sentence case, normal tracking; first word medium weight, descriptor light weight at ~75 % opacity; cap height ~5 % H; mark is an outlined rounded rectangle ~8 % H. Treatment: none. Background: full-bleed photographic footage, effectively still.

## What to adapt
- Copy: 1 short brand word (≤ 8 letters) + 1 descriptor word (≤ 10 letters). The descriptor names the category.
- Brand: the mark and both words take the brand fg (white over imagery); the descriptor drops to a light weight and ~75 % opacity, no accent colour.
- Timing: rows 1, 3 and 5 holds can stretch for a longer sting; keep the unfold at 17 fr and the fold at 12 fr.
- Footage: pick a plate with a calm mid-tone band at frame centre; add `Scrim` amount 0.2 if contrast drops.

## Pitfalls
- The lockup must re-centre while the word unfolds; a fixed left edge makes the end state sit off-centre.
- The descriptor grows out from under the first word, not from the frame edge; letters should not travel more than the word width.
- The fold is faster than the unfold (12 vs 17 fr). Equal durations make the loop feel mechanical.
- Keep the last frame identical to the first or the loop jumps.

## Missing components
- WordmarkUnfold: lockup of mark + word A + word B where B reveals left to right from behind A's last letter (clip mask + per-letter opacity 1 fr stagger), the whole group translating to keep its centre, unfold 17 fr outExpo, fold 12 fr inOutSine, B weight/opacity configurable (techniques: end-card)

## Proposed terms
- `wordmark-unfold`: a second word slides out from behind the wordmark and the lockup re-centres, then folds back; rows 2 and 4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 1.00 and t = 3.30 (local source file, cropped to the lockup); 0.25 s from sheets elsewhere. Lockup x shift measured roughly from keyframes at 1250 px width (~85 px, ±10 px). Not measurable: exact per-letter stagger (~1 fr, ±1 fr), whether the plate has a sub-pixel drift (motion.json zoom 0.01–0.02 %/s, treated as static). Note: keyframes kf-000.50 and kf-002.50 disagree with the sheets (two-word state at 0.50, short state at 2.50); the burned-in sheet timestamps and the strips win, keyframes used for type and colour only. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id wordmark-unfold-footage-hold · family logo-brand · 5.00 s · 5 rows · 1 shot, 0 cuts
- techniques: 2 (end-card, hard-cut) · cut_on_beat n/a (0/0, no audio)
- measured unfold f35–f52, fold f105–f117 from 30 fps strips; loopable (f0 = f149)
- not measurable: per-letter stagger (±1 fr), plate sub-pixel drift
- proposed terms: wordmark-unfold
- missing components: WordmarkUnfold
- catalogue hint "route path draws itself" not seen in this file: no path on any cell
- phase B: not run (study only)
