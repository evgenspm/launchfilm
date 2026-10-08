# Ring-built mark into hero product drop

A mark grows from a dot inside concentric pill-shaped hairlines, splits apart, and hard-cuts to a floating hero product under a frame-wide name that stretches off screen, then a white end card with a typed caption.

Source: https://jitter.video/template/the-track-product-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A physical product launch with one strong cutout photo or render (shoe, bottle, gadget)
- The brand mark has two halves or a symmetric shape that can split sideways
- A short 4:5 or 9:16 social teaser of about 6-7 s, silent autoplay
- E-commerce drops where the build-up matters more than features
Not for: software products without a hero object, or films that must explain a capability.

## Format
4:5 · 6.63 s · 30 fps · mixed (white, dark red, white) · music none (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.10 | 0–63 | hook | white frame: dot becomes a ring of hairlines, two-part mark appears inside, rings stretch into a tall pill outline | push-in on the ring group, pill width 1.00→1.30 f23–f60, faster over f57–f62 | dot f1–f5; ring grows f6–f11 easings.outExpo; mark halves at f12, grow on springs.snappy (overshoot not measurable) by f18; rings elongate f18–f24 easings.outQuint; f60–f62 halves slide apart and their bars extend to both edges, easings.inExpo 3 fr | match-cut (pill hairlines carry into the next shot) | riser (planned) |
| 2 | 2.10–4.53 | 63–136 | reveal | hero product cutout floating over a dark red landscape, pill hairlines behind, frame-wide product name, small wordmark and caption, corner dots | push-in on the photo 1.00→~1.05 (±0.25 s); type layer moves separately | name grows outward from two letter halves f63–f69 easings.outExpo 6 fr; widens 1.00→~1.40 f69–f126 easings.linear; f126–f135 outer strokes stretch past the frame edges, easings.inExpo 10 fr | hard-cut | hit on the cut (planned) |
| 3 | 4.53–6.63 | 136–199 | logo | white end card: mark left, caption centre, wordmark right, pill hairlines zooming past the frame, edge dots | push-in on hairlines 1.00→>1.6 f136–f173 easings.outExpo; static hold f173–f199 | mark and wordmark present from f136; caption, 7 words, typed word by word every 3–5 fr f136–f159; edge dots ~f150; hold 26 fr | hard-cut (end) | type-click (planned) |
Evidence: row 1 `sheet-01 cells 0–8`, strips at 0.0, 1.0, 2.0 s, `cuts/cut-002.10.jpg` (before side). Row 2 `sheet-01 cells 9–15`, `sheet-02 cells 0–2`, strips at 2.0, 4.0 s, `cuts/cut-002.10.jpg` (after), `cuts/cut-004.53.jpg` (before). Row 3 `sheet-02 cells 3–10`, strips at 4.5, 5.5 s, `cuts/cut-004.53.jpg` (after).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| logo-from-dot | 1 | craft/vocabulary.md#brand, craft/04-motion.md#springs |
| push-in | 1, 2, 3 | craft/03-camera-and-staging.md#drift-and-push-in |
| match-cut | 1→2 | craft/09-transitions.md |
| hard-cut | 2→3 | craft/09-transitions.md |
| typewriter | 3 | craft/05-typography.md |
| end-card | 3 | craft/vocabulary.md#brand (EndCard) |

## Look
Palette: #FFFFFF background of the white frames and type on red, #0D0D0D mark and wordmark, #3B0401 dark red backdrop top, #964D38 lit landscape and sole, #D7CFCA product highlight, #8C8C8C hairlines. Type: extra-wide geometric display with rounded ends, ~7 % H, full frame width; small lowercase grotesk wordmark; tiny caps mono caption. Treatment: none. Background: flat white (rows 1, 3), photo backdrop with a top-dark gradient (row 2).

## What to adapt
- Copy: product name 3–5 characters in a wide face (it must fill the width); one caption of 5–8 words; wordmark from the brand.
- Brand: the mark sits centred in row 1 and left on the end card; the accent colour can replace the red backdrop if no environment photo exists.
- Timing: row 2 can stretch to ~3 s; the 3 fr split before cut 1 and the 10 fr stretch before cut 2 must keep their frame counts.

## Pitfalls
- Both exits accelerate into the cut; the cut lands on the most extended frame. Ease-out exits kill the drop.
- The hairline pill is the thread through all three shots; drop it and the cuts read as unrelated slides.
- The name widening is slow and linear (~0.7 %/fr); a spring here makes it look like a bounce, not tension.

## Missing components
- RingPill: N concentric hairline rounded rectangles (8 lines, ~1 px, grey), grows from a circle (aspect 1) to a tall pill (aspect ~0.5) on easings.outQuint 6 fr, then scales with a camera (techniques: logo-from-dot, push-in)
- StretchType: wide display word whose outer letter strokes extend horizontally past the frame edges, easings.inExpo 10 fr, used as an exit into a cut (techniques: match-cut)
- SplitMark: mark halves slide apart and their horizontal bars extend to both frame edges in 3 fr (techniques: logo-from-dot)

## Proposed terms
- ring-pill: concentric hairline circle that elongates into a running-track pill and frames every shot (rows 1–3) (not in craft/vocabulary.md; not used in recipe.json)
- stretch-type-exit: letter strokes extend past the frame edges right before a cut (rows 1, 2) (not in craft/vocabulary.md; not used in recipe.json)
- edge-dots: small square registration dots at frame corners and edge midpoints (rows 2, 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.0, 1.0, 2.0, 4.0, 4.5, 5.5 s (source file was local per meta.json); scale ratios read by eye from strip cells (±5 %). Not measurable: spring overshoot on the mark (too small at strip scale), exact photo push amount in row 2 (±0.25 s, ~±2 %). SFX planned by the glue rule, not measured. cut_on_beat = 0/2 cuts within ±2 fr (no audio, no beats).

## Study log
id ring-mark-hero-drop · family launch-film · 6.63 s, 3 rows (cuts f63, f136) · 6 techniques · cut_on_beat n/a (silent, 0/2).
Measured from 30 fps strips (1 fr); overshoot and photo push not measurable (±0.25 s).
Proposed terms: ring-pill, stretch-type-exit, edge-dots. Missing components: RingPill, StretchType, SplitMark.
Catalogue hint kinetic-depth not seen (no Z motion of type); typewriter seen only on the end-card caption.
Phase B: not run (study job).
