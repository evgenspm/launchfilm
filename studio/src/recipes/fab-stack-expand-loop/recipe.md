# Floating button fans into a stacked icon menu

A round action button on a flat pale field drops down while three icon buttons pop out of it one by one into a centred vertical stack, hold, then snap back into the button, which springs home. Seamless 4 s loop.

Source: https://jitter.video/template/floating-action-menu/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing an expand-to-menu interaction in a mobile or web app demo
- A looping micro-interaction clip for a landing page, docs or a feature card
- Introducing quick actions or navigation shortcuts without any copy
- A short silent insert between larger product shots
Not for: anything that needs to tell a story or carry a claim; there is no copy and only one interaction.

## Format
other (1322×992, 4:3-ish) · 4.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (3.77 cell = 0.00 cell)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | round violet action button with a 4-dot icon on flat pale lilac; fans into a 4-button vertical stack, holds, collapses | static (the stack recentres itself) | f1–f30 button slides down 50 % → 81 % H on springs.ui while 3 buttons emerge behind it, stagger 8 fr (f2, f10, f18), scale ~0.3 → 1 rising to slot on springs.ui ~20 fr (overshoot not measurable); settled f36; hold f36–f75; f76–f78 menu buttons shrink to dots and vanish, easings.inExpo 3 fr; f76–f100 main button returns to centre on springs.pop (~12 % overshoot upward, ~10 % scale dip); f100–f120 still | hard-cut (loop point) | pop per menu button, swoosh-short on collapse, tick on settle |

Evidence: `sheet-01` cells 0–15 (0.00 rest; 0.27 first item out; 0.50 two items; 0.77 three items, stack nearly full; 1.00–2.50 open stack holding; 2.77 single button above centre; 3.00–3.77 single button at rest), keyframes kf-000.50 / 001.50 / 003.50, 30 fps strips over 0.00–1.20 s and 2.30–3.50 s (temporary, not kept). No cut frames: cuts.json lists 0 cuts.

Working list (t · what changed): 0.00 · single button centred, lighter tone · 0.07–0.27 · button moves down, a small button appears from behind its top edge · 0.33–0.50 · second item emerges from behind the first · 0.60–0.77 · third item emerges, all items growing · 1.00–1.20 · items reach full size, stack centred · 1.20–2.53 · hold, no change · 2.53–2.60 · menu items shrink to dots within 2–3 fr, main button rises · 2.60–3.20 · main button rises past centre then settles back (a 30 fps strip shows ~3 % H above rest at 2.87) · 3.20–4.00 · still.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| list-assemble | 1 | craft/vocabulary.md#ui (items build into a list with stagger) |

## Look
Palette: #F2EEFC background (pale lilac), #7F47EB main button deep violet (bottom of its gradient), #9F60F1 third button, #BE77F7 second button, #D38EF9 top button, #C397F5 lighter rest-state main button. Type: none; white outline line icons (ring, house, map pin, 4-dot grid), ~45 % of the button diameter. Treatment: none (vertical gradient per button, no shadow, no grain). Background: flat.

## What to adapt
- Copy: none. Icons: 1 trigger icon + 3 menu icons (2–5 work), bottom to top.
- Brand: accent = the deepest button (trigger); the menu buttons step lighter towards the top, ~4 tints of one hue. Background = brand bg tinted towards the accent.
- Timing: the hold (f36–f75) stretches freely; keep the 8 fr stagger, the ~30 fr expand and the 3 fr collapse; keep the rest pose identical to frame 0 for the loop.

## Pitfalls
- Collapse is ~10× faster than the expand; a symmetric close loses the snap.
- Items come out from behind the previous button (lower z), not fading in place; drawing them on top looks wrong.
- The whole stack recentres while it grows (the trigger slides down); pinning the trigger in place pushes the stack off frame.
- The trigger changes tone between rest (lighter) and open (deeper); without it the state change reads weaker.

## Missing components
- ActionMenuStack: trigger button + N round icon buttons on a vertical axis; open: trigger travels 50 % → 81 % H, items emerge from behind it with 8 fr stagger, scale 0.3 → 1, springs.ui; close: items shrink 3 fr easings.inExpo, trigger returns on springs.pop; per-item gradient tints of the accent (techniques: list-assemble)
- Icons ring, house and map pin are not in `LineIcon`; use the nearest names or add them (house, pin, circle).

## Proposed terms
- fab-expand: a floating round button fans out into a stack or arc of smaller action buttons and snaps back, row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.00–1.20 s and 2.30–3.50 s; 0.25 s from the sheet elsewhere. Not measurable: exact spring overshoot on item arrival (small, under ~2 % H), exact gradient stops. Catalogue hints cursor-path and device-phone were not seen (no cursor, no device frame). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts).

## Study log
id fab-stack-expand-loop · family product-ui · 4.00 s, 1 row (0 cuts, shot ≤ 4 s so not split) · 1 technique (list-assemble) · cut_on_beat n/a (0/0, silent) · loopable.
Measured at 1 fr from 30 fps strips for the expand (f1–f36) and collapse (f76–f100); overshoot of item arrivals not measurable.
Proposed terms: fab-expand. Missing components: ActionMenuStack; LineIcon lacks house, pin, circle.
Phase B: not run (study phase only).
