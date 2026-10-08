# Award badge with letter wave in and out

A white award badge with an accent border sits centred on flat charcoal. A medal icon pops in, then a two-line award label rises letter by letter out of a clip mask, holds, and leaves letter by letter. 3 s, loops cleanly.

Source: https://jitter.video/template/product-of-the-week-product-hunt/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing a ranking, award or launch-day placement as a square social post
- A short loop for a post, a site header, or the closing beat of a longer launch film
- Milestone posts where one eyebrow and one rank label carry the whole message
Not for: messages longer than one line of ~6 words, or anything that needs a product shot or URL.

## Format
1:1 · 3 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (first and last frame are the same empty badge)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | white rounded badge (69 % W x 15 % H, accent border) centred on charcoal; medal icon left; eyebrow, 2 words, over award label, 5 words (rank + award name) | static | badge present from f0, empty f0–f7; medal scale 0.6→1 + fade f8–f10, springs.pop (overshoot not measurable); both lines per letter, mask-rise from below with a slight tilt, stagger ~0.5 fr/letter, f9–f24, springs.maskRise; hold f25–f69 (45 fr); exit f70–f81 letters lift out of the mask left to right, ~3 fr each, easings.inExpo; medal scales out f71–f74; empty badge f82–f89 | hard-cut (loop) | pop on the medal, tick on settle, swoosh-short on exit (planned) |

Evidence: `sheet-01` cells 0–11 (0.00 empty badge; 0.27 medal faint; 0.50 letters mid-rise and tilted; 0.77 last word still settling; 1.00–2.27 identical hold; 2.50 only the tail of each line left; 2.77 empty badge). No cut frames (cuts.json empty). Keyframes kf-000.50, kf-001.50, kf-002.50. Frame numbers from 30 fps strips of 0–1 s and 2–3 s taken from the local source file (not stored in the repo).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 1 | craft/vocabulary.md#type, craft/04-motion.md#springs (`maskRise`), TYPE_ENTER `mask` in studio/API.md |

## Look
Palette: #212121 background, #E76A39 accent (border and all text), #FFFFFF badge surface, #FCF8EE warm highlight, #894A3A medal ribbon shade. Medal gold (~#E8C21A, eyeballed, not from palettegen) and a slate ribbon stripe. Type: bold humanist sans, sentence case, normal tracking; eyebrow ~2.5 % H semibold, label ~4.2 % H bold, left-aligned after the icon. Treatment: none. Background: flat.

## What to adapt
- Copy: eyebrow 1–3 words (who gives the award); label ≤ 6 words with the rank first. Keep it one line each.
- Brand: the accent carries border and both text lines; badge surface stays white or the brand surface; swap the medal for a trophy or star glyph.
- Timing: the hold (f25–f69) can stretch to 60–90 fr for longer copy; keep the 8 empty frames at the start and end so the loop reads as a breath, and keep the entrance at ~15 fr and the exit at ~12 fr.

## Pitfalls
- The badge itself never animates: only its contents do. Animating the frame too makes the loop jump.
- The letter stagger is very tight (whole two-line label in ~15 fr). A 2 fr stagger on 30 letters would take 2 s and kill the hold.
- Exit runs left to right like the entrance; reversing direction reads as a rewind.
- Text needs a clip mask at the line box; without it the rising letters show below the badge text area.

## Missing components
- AwardBadge: rounded card 69 % of the short side wide, radius ~24 px at 1188, 5 px accent border, icon slot + eyebrow + label, mask-rise per letter on both lines (stagger 0.5 fr), letter-wave exit left to right (3 fr per letter, inExpo), icon pop in/out (techniques: mask-rise)
- Medal glyph: ribbon + gold disc with a star; LineIcon has no medal or trophy.

## Proposed terms
- letter-wave-exit: letters lift out of their clip mask one after another in reading order, inExpo ~3 fr each, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- icon-pop-in: a small glyph scales up from ~0.6 with springs.pop just before its label enters, row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.00 and 2.00; 0.25 s elsewhere. Not measurable: exact overshoot of the letters and medal (tilt and blur at 1 fr spacing hide it), exact per-letter stagger (±0.5 fr). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr. Palette from palettegen on keyframe kf-001.50 (no cut frames).

## Study log
id award-badge-letter-wave · family social-promo · 3.00 s, 1 row (no cuts, no state change worth a split under 4 s)
techniques: 1 (mask-rise) · cut_on_beat: n/a, 0 cuts, silent reference
measured at 1 fr from strips: enter f8–f24, hold f25–f69, exit f70–f81, empty f82–f89; overshoot not measurable
proposed terms: letter-wave-exit, icon-pop-in
missing components: AwardBadge, medal glyph
phase B: not run
