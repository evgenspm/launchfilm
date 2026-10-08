# Teaser card peeking out of an artboard collage

A still collage of design artboards over giant cropped type; a cursor drifts to one artboard, a teaser card grows out of it with a masked three-line headline and pill buttons, folds back, then repeats from a second artboard.

Source: https://jitter.video/template/feature-sneak-peek/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Pre-launch teaser where the feature itself must stay hidden: the card says "something is coming", the collage hints at the domain.
- Design, template or creative tools whose output is a set of artboards or formats.
- Silent social loop or launch-page hero: the clip loops cleanly.
Not for: products that need to show the feature working, or films that need a story arc and a CTA.

## Format
16:9 · 10.97 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | warm grey collage of five artboards with pixel art over a giant cropped dark word; cursor enters | static | cursor glides to the lower-left square artboard via Cursor spring path, about 23 fr (±0.25 s) | mask-wipe | none |
| 2 | 1.50–4.00 | 45–120 | reveal | teaser card grows out of the hovered artboard: headline 3 words on 3 lines, clipped by the card; then 3 pill buttons, 2-word label | static | card scale-up plus fade, springs.layout 8–15 fr (±0.25 s, overshoot not measurable); pills in by 2.00, springs.ui; cursor hovers pill to pill | mask-wipe | swoosh-short |
| 3 | 4.00–6.77 | 120–203 | reveal | card folds back, collage alone; cursor moves to the orange square artboard and hovers | static | collapse plus fade easings.inExpo about 8 fr (±0.25 s), gone by 4.27; cursor move about 30 fr (±0.25 s) | mask-wipe | swoosh-short |
| 4 | 6.77–9.50 | 203–285 | feature | the same card grows out of the second artboard; lines appear one per cell through the card mask, then pills | static | card springs.layout about 8 fr (±0.25 s); line stagger about 7 fr (±0.25 s): line 1 at 6.77, 2 at 7.00, 3 plus pills at 7.27 | mask-wipe | swoosh-short |
| 5 | 9.50–10.97 | 285–329 | feature | card folds back; collage holds with cursor parked low, same layout as frame 0 | static | collapse plus fade easings.inExpo about 8 fr (±0.25 s), gone by 9.77 | hard-cut | swoosh-short |

Evidence per row: 1 = sheet-01 cells 0–5; 2 = sheet-01 cells 6–15 (1.50 card ghosting in, 1.77 card open with lines clipped, 2.00 pills in), keyframe kf-002.50; 3 = sheet-02 cells 0–10 (4.00 fading card, 4.27 gone); 4 = sheet-02 cells 11–15, sheet-03 cells 0–5, keyframe kf-008.50; 5 = sheet-03 cells 6–11 (9.50 fading, 9.77 gone). No cuts/*.jpg exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 2, 4 (in), 3, 5 (out) | craft/09-transitions.md (the card edge acts as the mask that uncovers the headline) |
| cursor-path | 1–5 | craft/04-motion.md, Cursor in studio/API.md |

## Look
Palette: #D8D2C2 background (warm grey), #212420 backdrop word and labels, #F9F9F6 card surface, #5A8CFB blue pixel art, #EBABAE pink pixel art and pill, #5571A8 shaded blue. Orange (about #FF6B4A) and mint pills are also visible but fall outside the 6-colour palettegen output. Type: geometric sans uppercase headline, 3 lines, about 9 % H per line; heavy grotesk backdrop word about 30 % H. Treatment: none. Background: flat.

## What to adapt
- Copy: one backdrop word (the product name), a 3-word teaser headline one word per line, a 2-word pill label.
- Brand: accent on the top pill; the two other pills take secondary colours; artboards carry the brand's own imagery or pixel art; logo mark sits in each artboard corner.
- Timing: the collage-only gaps (rows 1 and 3) can stretch; the card open and close keep their frame counts (about 8 fr in, 8 fr out).

## Pitfalls
- The background never moves: motion.json reports a constant pan and -5.4 %/s zoom, but every card sits in the same place at 0.00 and 10.77. Do not add a camera move.
- The card must be clipped: the headline is cut by the card edge while it grows (sheet-01 cell 7, sheet-02 cell 11). Unclipped text loses the peek.
- Keep the last frame equal to the first, or the loop jumps.

## Missing components
- TeaserCard: card that scales from a source rect to a centred size (springs.layout, about 8 fr), clips its children with overflow hidden, holds N frames, collapses back (easings.inExpo 8 fr) (techniques: mask-wipe)
- ArtboardCollage: 5 fixed-position artboards (portrait and square) with a size label, tag pills and a file-name caption, over a cropped backdrop word (techniques: none in vocabulary; see Proposed terms)
- PillButton: rounded label plus arrow, 3 colours, springs.ui landing

## Proposed terms
- thumb-expand: a card grows out of a thumbnail rect into a larger panel and later shrinks back into it (rows 2–5)
- backdrop-type: one oversized word set behind the main layer and cropped by it, never animated (rows 1–5)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips made). Not measurable: card spring overshoot, exact entrance and exit lengths (under 0.25 s), cursor spring parameters. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts). Palette from palettegen on keyframes kf-000.50, kf-002.50 and kf-008.50 (no cut frames exist).

## Study log
id teaser-card-collage-peek · family launch-film · 10.97 s, 1 shot, 5 rows (split at state changes).
Techniques 2 (mask-wipe, cursor-path) · cut_on_beat n/a (0 cuts, silent).
Not measurable at 0.25 s: card overshoot, entrance/exit under 8 fr, cursor springs.
Proposed terms: thumb-expand, backdrop-type.
Missing components: TeaserCard, ArtboardCollage, PillButton.
Phase B: not run (study phase only).
