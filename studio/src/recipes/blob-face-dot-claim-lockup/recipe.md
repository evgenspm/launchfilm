# Glyph-eyed blob crowd into dotted claim and lockup

One pale round face with type-glyph eyes pulls out from macro, blinks through expressions, gets crowded by coloured faces, then the crowd collapses to dots that trace a short number claim and resolve into a three-colour event lockup.

Source: https://www.raylight.app/templates/J2QxqjJC (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A playful event or launch-day teaser with a friendly, character-led voice
- A silent short where one numeric claim and a name lockup are the whole message
- Brands with a 4-5 colour accent palette that can be shown as characters
- Opening sting before a longer keynote or launch-week recap
Not for: serious or enterprise tones; products that need UI on screen.

## Format
16:9 · 12.1 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no (silent)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.52 | 0–16 | hook | macro of a pale round face, two asterisk eyes | pull-out ~1.4 W -> ~0.6 W face width | outExpo ~16 fr (±0.25 s) | continuous | whoosh (planned) |
| 2 | 0.52–2.27 | 16–68 | hook | single face centred, eye glyphs cycle: asterisks, dashes, circles, angle brackets | pull-out to ~0.33 H, then near static | glyph swaps every 0.25–0.5 s (±0.25 s), springs.pop suggested | continuous | pop (planned) |
| 3 | 2.27–4.42 | 68–133 | hook | five coloured faces push in and pack around the grey one, each with own glyph eyes | slight push, hold from 3.00 | slide-in from edges, springs.heavy ~20 fr suggested (±0.25 s); independent glyph swaps | continuous | swoosh-short (planned) |
| 4 | 4.42–5.00 | 133–150 | hook | crowd shrinks to dots; a small purple face and one blue dot remain | shrink ~-60 %/s | per-face scale-down, stagger ~3–5 fr (±0.25 s), easings.inExpo | continuous | whoosh (planned) |
| 5 | 5.00–6.27 | 150–188 | proof | orange dots trace a 2-word numeric claim, outlines fill white, ~14 % H | static | gather ~22 fr (±0.25 s): dots 5.00, outlines 5.27, white 5.77 | continuous | shimmer (planned) |
| 6 | 6.27–8.27 | 188–248 | proof | claim drops to ~4 % H; a second 2-word count part appends, dot -> outline -> white left to right | static | scale jump ≤ 7 fr (not measurable); resolve sweep 6.27–7.50; hold to 8.00 | continuous | shimmer (planned) |
| 7 | 8.27–12.10 | 248–363 | logo | one-line lockup: white name, green event word, purple bracketed year | static | scrambled dotted glyphs decode left to right ~30 fr (8.27–9.27); hold 85 fr | end | tick (planned) |

Evidence: row 1 sheet-01 cells 0–2, cuts/cut-000.33.jpg; row 2 sheet-01 cells 2–8; row 3 sheet-01 cells 9–15, sheet-02 cell 0; row 4 sheet-02 cells 1–3, cuts/cut-004.20.jpg; row 5 sheet-02 cells 4–8; row 6 sheet-02 cells 9–15, sheet-03 cell 0; row 7 sheet-03 cells 1–15, sheet-04 cell 0.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| pull-out | 1, 2 | craft/vocabulary.md#camera |
| morph | 4, 5 | craft/vocabulary.md#transitions (crowd collapses into the dots that become the claim) |
| particle-form | 5, 6, 7 | craft/vocabulary.md#brand (ParticleForm) |

## Look
Palette: #000000 background, #DCDCDC hero face and text, #EE6F1A orange face and claim dots, #26C14D green face and event word, #854ED4 purple face and year, #2E6AF2 blue face; plus a near-black #191A1A face (not in the 6). Type: geometric grotesk, medium, sentence case; claim ~14 % H large, ~4 % H extended; lockup ~4 % H. Treatment: none. Background: flat black.

## What to adapt
- Copy: claim 2 words + appended 2 words (numbers carry it); lockup 3 parts (name, event word, bracketed year/version).
- Brand: each accent colour is one face; the lockup reuses two of them (green word, purple bracket).
- Timing: rows 2–3 can stretch for more expressions; keep the collapse (row 4) ≤ 0.6 s and the decode ~30 fr.

## Pitfalls
- Eye glyphs are type characters, not drawn shapes: keep them the same black weight across faces or the character set breaks.
- The crowd packs with faces touching; gaps make it read as scattered bubbles, not a crowd.
- The claim's scale drop from large to small happens between two sheet cells (≤ 7 fr); a slow shrink loses the punch.

## Missing components
- GlyphFace: circle of given colour/size with two type-glyph eyes, `expressions: [glyph, glyph][]`, swap every N fr, slight wobble/rotation (techniques: proposed glyph-face)
- CrowdPack: places N GlyphFaces around a hero, slide-in from edges with stagger, then collapse each to a point (techniques: pull-out, morph)
- GlyphDecode: line of text that starts as scrambled dotted glyphs and resolves left to right in ~30 fr, per-span colour (techniques: proposed glyph-decode)

## Proposed terms
- glyph-face: round character whose eyes are type glyphs that swap to change expression (rows 1–3)
- crowd-pack: characters push in from edges and pack tightly around a hero character (row 3)
- glyph-decode: scrambled dotted glyphs resolve left to right into final text with colour tint-in (row 7)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips; source file not available). Not measurable: spring overshoot, glyph swap interval below 0.25 s, collapse stagger, claim scale-drop duration. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts). Palette from palettegen on cuts/cut-000.33.jpg, cuts/cut-004.20.jpg, keyframes/kf-003.50.jpg, kf-009.50.jpg.

## Study log
id blob-face-dot-claim-lockup · family launch-film (catalogue hint product-ui rejected: no UI) · 12.10 s, 7 rows, one continuous shot
techniques 3 (pull-out, morph, particle-form) · cut_on_beat n/a (0 cuts, silent)
not measurable: overshoot, glyph swap rate, staggers, claim scale-drop (all ±0.25 s)
proposed terms: glyph-face, crowd-pack, glyph-decode
missing components: GlyphFace, CrowdPack, GlyphDecode
phase B: not run
