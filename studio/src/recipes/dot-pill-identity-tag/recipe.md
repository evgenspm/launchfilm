# Dot-to-pill identity tag

A white dot grows into a capsule on black, then a name fades in, an avatar slides in from the left and a verified seal pops on the right. Strict one-thing-per-beat phasing in 1.13 s; only the seal bounces.

Source: https://www.raylight.app/templates/FouHuetK (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A 3 s social sticker or lower-third that tags a person, account or product
- Introducing a founder or creator before a longer clip
- A handle or name reveal for a feed post
- Any moment where a small UI chip should read as "switching on"
Not for: messages that need more than a name (no room for a claim), or films that need a camera move to stay alive.

## Format
16:9 · 3.00 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | one white capsule centred on near-black: avatar circle left, a 2-word all-caps name, verified seal right; then a long hold | static (0.2 %/s zoom in motion.json is noise; pill size identical cells 4–11) | f0–1 black; capsule uniform scale from a 3 px dot, aspect ~4:1, cubic-bezier(0.5, 0.1, 0.45, 1) 12 fr (f2–14), radius = h/2, no overshoot; label opacity near-linear 7 fr (f14–21) in a reserved slot; avatar slides in from ~150 px left, ~200 px travel, easings.outQuint 6 fr (f19–25); seal scale-in on notifSprings.badge (360/26/1, ~5 % overshoot), peak ~7 fr (f27–34); hold f37–90 | hard-cut | tick on f14, pop on f29 |

Evidence: sheet-01 cells 0–11 (0.00 empty; 0.27 small capsule; 0.50 full capsule, empty; 0.77 name in, avatar entering half outside the capsule; 1.00 avatar in place, seal a speck; 1.27–2.77 finished tag, unchanged). No cuts (cuts.json empty). Keyframes kf-000.50, kf-001.50, kf-002.50 for type and colour.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| island-morph | 1 | craft/vocabulary.md#ui (component PillMorph, centre-anchored variant), craft/04#springs (badge) |

## Look
Palette: #070B0A background, #FFFFFF capsule fill, #6C8CB6 seal/avatar blue, #353837 shadow/antialias grey. Type: bold grotesk, all caps, tight, cap height ~7 % H, near-black on white. Treatment: none. Background: flat.

## What to adapt
- Copy: one label, 1–2 words, all caps, fits ~60 % of the capsule width.
- Brand: capsule fill = brand light surface, seal = brand accent, avatar = user photo or initials on an accent gradient.
- Timing: the 34 fr build keeps its frame counts; only the hold (f37–90) stretches or shrinks. Add a slow push-in or a live dot if the hold is longer than ~2 s.

## Pitfalls
- The capsule scales uniformly (width and height together); a width-then-height grow reads as a different, cheaper move.
- Only the seal overshoots (~5 %); springs.pop (~13 %) is too much here and any bounce on the capsule breaks the calm.
- Reserve the avatar slot from frame 0 so the label never shifts when the avatar arrives.
- The source avatar leaks outside the capsule during its slide (cell 3); mask it inside the capsule.

## Missing components
none (PillMorph covers dot → capsule → label → avatar → badge; check its default timing against the frames above)

## Proposed terms
- dot-capsule-grow: a capsule scales uniformly out of a point, centre-anchored, slow-start bezier, no overshoot (row 1). Closest vocabulary ids are island-morph (top-anchored notch) and logo-from-dot (marks only). Not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets; frame numbers (f2–14, f14–21, f19–25, f27–34) from a hand-measured 30 fps strip of this reference. Avatar and seal timings are consistent with the sheet (avatar entering at 0.77, seal a speck at 1.00 and full at 1.27). Not measurable from sheets alone: the seal overshoot (taken from the 30 fps measurement). SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts (no music).

## Study log
id dot-pill-identity-tag · family social-promo · 3.00 s, 1 row (one shot, build 0–37 fr then hold)
techniques 1 (island-morph) · cut_on_beat n/a (0 cuts, silent)
not measurable at 0.25 s: seal overshoot, phase frames (taken from the 30 fps hand measurement)
proposed terms: dot-capsule-grow · missing components: none
phase B: not run
