# Block-caret prompt with swapping slot and app tile

A glowing block caret types and erases the name, types a three-line terminal-style promise whose bracketed noun swaps under a glowing selection, types a short call to action, then hard-cuts to the app tile on a violet haze.

Source: https://www.raylight.app/templates/wQWZvRln (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Developer tools, CLIs or coding agents that want a terminal voice
- A 10 s intro or bumper where one sentence plus a variable noun carries the pitch
- Showing breadth (many things you can make) without any UI
- Closing on an app icon rather than a wordmark
Not for: products with no icon tile, or films that need to show the actual UI.

## Format
16:9 · 10.03 s · 30 fps · dark · music 119.8 BPM, cut_on_beat 0/1 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | glowing block caret alone, types the product name (one word), holds, erases it | static; background blobs drift | typewriter ~2 chars per 0.25 s, caret halo magenta → cyan → blue; caret hides at 0.77; erase 1.00–1.50 (±0.25 s) | continuous | type-click |
| 2 | 1.50–3.50 | 45–105 | feature | prompt glyph, then a three-line promise (3 / 2 / 2 words), bracketed mono slot word on line 2, lines step right | static; background drift | typewriter: line 1 by 1.77, line 2 2.00–2.50, line 3 2.77–3.00 (±0.25 s) | continuous | type-click |
| 3 | 3.50–5.50 | 105–165 | feature | slot word swaps twice (3 nouns) under a cyan glowing selection, then the block erases | static; background drift | word-swap at 3.50 with cyan fill + glow ~0.25 s, second swap 4.27; hold ~1 s; erase 5.27–5.50 (±0.25 s) | continuous | swoosh-short |
| 4 | 5.50–7.73 | 165–232 | cta | two-word call to action (verb + name), larger type ~9 % H, typed by a glowing caret; two sparkle dots once | static; background drift | typewriter 5.77–6.00 (±0.25 s), caret halo violet → blue; caret gone 6.27 with 2 sparkle dots for one cell; hold ~37 fr; gone by 7.70 | hard-cut | shimmer |
| 5 | 7.73–10.03 | 232–301 | logo | white rounded app tile with the product glyph, centred on brighter blue-violet; dark haze blob drifts right | static; background blob sweeps | tile enters ~30 % W, settles ~11 % W by 8.00, springs.cameraOut ~8 fr (overshoot not measurable); hold to end | end | pop |

Evidence: row 1 sheet-01 cells 0–6; row 2 sheet-01 cells 6–13; row 3 sheet-01 cells 14–15, sheet-02 cells 0–6, keyframe kf-003.50; row 4 sheet-02 cells 6–14; row 5 sheet-02 cell 15, cuts/cut-007.73.jpg, sheet-03 cells 0–7, kf-008.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1, 2, 4 | craft/05-typography.md (Typewriter) |
| word-swap | 3 | craft/05-typography.md (WordSwap) |
| highlighter | 3 | craft/05-typography.md (selection fill behind the slot word) |
| glow | 1, 3, 4 | craft/vocabulary.md#look |
| grain | 1–5 | craft/vocabulary.md#look |
| mesh-gradient | 1–5 | craft/vocabulary.md#look |
| hard-cut | 4 → 5 | craft/09-transitions.md |

## Look
Palette: #0D0B25 background dark, #B8B4D4 text, #3A27AF end field blue-violet, #5B4798 haze violet, #1E1756 mid shadow, #949CE6 lavender accent (prompt glyph, brackets). Type: geometric grotesk regular, sentence case; slot word in mono inside brackets. Treatment: glow, grain, mesh-gradient. Background: soft drifting violet/indigo blobs with visible grain, no flat areas.

## What to adapt
- Copy: name (1 word), promise 3 lines of 3 / 2 / 2 words with one slot, 3 slot nouns, a 2-word call to action.
- Brand: the caret halo and selection glow carry the accent; the tile is the only logo moment.
- Timing: rows 2 and 3 can stretch with more slot nouns (~0.75 s each); the cut to the tile stays on the end of the CTA hold.

## Pitfalls
- Text never fades: it enters only by typing and leaves only by erasing. A fade breaks the terminal voice.
- The glow on the selection lasts about one cell (±0.25 s); a long glow turns it into a button.
- The background must move all the time; the text itself does not scale (motion.json zoom comes from the blobs).

## Missing components
- GlowBlockCaret: block caret with a coloured bloom halo whose hue cycles per typed char (magenta, cyan, blue, violet), hides after the last char (techniques: typewriter, glow)

## Proposed terms
- glow-block-caret: block caret with a coloured bloom halo, rows 1 and 4 (not in craft/vocabulary.md; not used in recipe.json)
- tile-land: app tile enters oversized and settles small after a cut, row 5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, no strips. Not measurable: typing speed per char, caret blink, erase speed, tile settle spring and overshoot, CTA exit. SFX planned by the glue rule, not measured (music-only reference, no VO). cut_on_beat = 0/1 cuts within ±2 fr (cut 7.73 vs beat 7.64, 2.8 fr). The catalogue hinted glitch-cut and a phone device; neither is visible.

## Study log
id block-caret-prompt-slot-tile · family kinetic-type · 10.03 s, 5 rows, 1 hard cut
techniques 7 (typewriter, word-swap, highlighter, glow, grain, mesh-gradient, hard-cut)
cut_on_beat 0/1 · music 119.8 BPM, no VO, sfx all planned
not measurable at 0.25 s: per-char typing, erase speed, tile settle spring
proposed terms: glow-block-caret, tile-land
missing components: GlowBlockCaret
phase B: not run
