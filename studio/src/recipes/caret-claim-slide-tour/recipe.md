# Caret to claims slide tour

A caret blinks on black, types a two-line capability claim, then the whole stage slides sideways to an image-editing card cluster and on to a second claim before a small wordmark. One continuous lateral move links features without cuts.

Source: https://jitter.video/template/the-prompt-generative-ai-features/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Demoing two or three AI capabilities in one continuous take, no hard cuts
- Vertical social teaser where type carries the message and one UI moment proves it
- Generative image or video tools that can show one output card with its prompt
- Silent autoplay feeds: each claim holds 2 s or more
Not for: products with many screens to show (only one UI cluster fits), or films that need VO pacing.

## Format
9:16 · 13.0 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | black frame, thin caret centred, blinking | static | caret on/off ~0.5 s period, cut on/off (±0.25 s) | hard-cut | none |
| 2 | 1.00–2.00 | 30–60 | hook | capability claim typed letter by letter, large, reflows to two smaller lines; tail word muted | pull-out: type scale ~1.00 → 0.60 over 30 fr (motion.json −12.4 %/s) | typewriter ~14 chars/s with caret; size easings.outQuint ~24 fr (±0.25 s) | hard-cut | type-click |
| 3 | 2.00–4.50 | 60–135 | hook | finished claim, 4 words on two lines, holds centred | push-in 1.00 → 1.05 over 75 fr (2.1 %/s) | hold, easings.linear creep | slide-push | none |
| 4 | 4.50–5.50 | 135–165 | reveal | claim leaves left; card cluster enters from right: tall illustrated image card, prompt card lower left, two pill chips; second claim over the card | dolly left ~860 px/s @1920 | stage easings.outExpo ~24 fr, settled 5.50; pills trail ~1 cell, springs.ui (overshoot not measurable) | hard-cut | whoosh |
| 5 | 5.50–7.50 | 165–225 | feature | cluster holds; claim of 6 words over the card, tail muted; prompt card with 3 bold keywords | push-in 1.00 → 1.02 over 60 fr | hold, easings.linear creep | whip-pan | none |
| 6 | 7.50–11.00 | 225–330 | feature | cluster whips out left in blur; third claim, 6 words on two lines, second line muted, slides in from right and holds | whip-pan left 7.50–8.77 with zoom 1.00 → 1.10, then push-in ~1.02 over 60 fr | exit easings.inExpo ~10 fr with motion blur; entry easings.outExpo ~15 fr, settled 8.77 (±0.25 s) | whip-pan | whoosh |
| 7 | 11.00–13.00 | 330–390 | logo | small lowercase wordmark with superscript tag, centred, holds to end | dolly left (stage slide) 11.00–11.50, then static hold | claim exits left blurred; wordmark easings.outExpo ~10 fr, settled 11.50 (±0.25 s); hold 45 fr | hard-cut | pop |

Evidence per row: 1 `sheet-01 cells 0–3`; 2 `sheet-01 cells 4–7`; 3 `sheet-01 cells 8–15`, `sheet-02 cells 0–2`; 4 `sheet-02 cells 2–6`, `kf-004.50`, `kf-005.50`; 5 `sheet-02 cells 6–13`, `kf-006.50`; 6 `sheet-02 cells 14–15`, `sheet-03 cells 0–11`, `kf-008.50`…`kf-010.50`; 7 `sheet-03 cells 12–15`, `sheet-04 cells 0–3`, `kf-012.50`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1–2 | craft/05-typography.md (Typewriter) |
| pull-out | 2 | craft/03-camera-and-staging.md |
| push-in | 3, 5, 6 | craft/03-camera-and-staging.md#drift-and-push-in |
| slide-push | 3→4, 6, 7 | craft/09-transitions.md |
| whip-pan | 5→6, 6→7 | craft/03-camera-and-staging.md, craft/09-transitions.md |
| ui-rebuild | 4–5 | craft/vocabulary.md#ui |
| motion-blur | 6, 7 | craft/vocabulary.md#look |

## Look
Palette: #000000 background, #FCFCFC claim text, #B0B0B0 muted claim tail, #7F8B9C image card sky, #F5F2E1 card highlight, #4A4745 prompt card surface. Type: geometric sans, regular weight, sentence case, centred two-line claims, tail words muted. Treatment: motion-blur on the lateral exits. Background: flat black.

## What to adapt
- Copy: 3 claims, 4–6 words each on two lines, each names one capability; the last 1–3 words go muted.
- Brand: claims in fg, tails in muted; the only colour comes from the output image. Wordmark small at the end, no URL.
- Timing: caret hold (row 1) and claim holds (rows 3, 5, 6) can stretch; the lateral moves keep ~24 fr in and ~10 fr out.

## Pitfalls
- Typing starts big and shrinks as the line wraps; a fixed-size typewriter loses the "line fills up" feel.
- Every transition moves the whole stage left. Mixing directions breaks the single-plane illusion.
- The image card cluster sits off-centre (prompt card overhangs left, chips overhang right); centring it flattens the depth.
- The claim overlays the image card; it needs the card to be mid-tone or the white text drowns.

## Missing components
- PromptCardCluster: hero image card (~0.4 W, radius ~5 % W), prompt text card overlapping bottom-left with bold keywords, two pill chips overlapping right edges; enters as one plane with chips trailing 3–5 fr (techniques: ui-rebuild)
- ShrinkTypewriter: Typewriter whose font size eases from ~2.5× to 1× while the text wraps to two lines over the typing duration (techniques: typewriter, pull-out)

## Proposed terms
- muted-tail: last words of a statement rendered in the muted colour instead of an accent, as a soft second voice (rows 2–6) (not in craft/vocabulary.md; not used in recipe.json)
- stage-slide: the whole composition translates laterally as one plane between features instead of cutting (rows 3–7); closest ids used: slide-push, whip-pan

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken (source path is local but outside the allowed batch scope). Not measurable: entrance frame counts under 8 fr, spring overshoot on pills and wordmark, exact typing cps. Pan/zoom rates from motion.json. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr. Palette from palettegen on keyframes kf-002.50, kf-006.50, kf-012.50 (no cut frames exist), near-black duplicates merged. The catalogue hint prompt-typing was not tagged: no prompt bar is typed or submitted.

## Study log
id caret-claim-slide-tour · family launch-film · 13.0 s, 7 rows, 0 cuts
techniques 7 (typewriter, push-in, pull-out, slide-push, whip-pan, ui-rebuild, motion-blur)
cut_on_beat n/a (0 cuts, silent reference, no beats)
not measurable at 0.25 s: entrance frames < 8 fr, overshoot, typing cps
proposed terms: muted-tail, stage-slide
missing components: PromptCardCluster, ShrinkTypewriter
phase B: not run (study batch)
