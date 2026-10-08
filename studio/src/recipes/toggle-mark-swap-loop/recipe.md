# Toggle-driven old/new mark swap loop

A two-label pill switch at the top flips and the centred mark swaps: the old mark swells, shrinks and fades, the new one fades in and grows into place. Then it flips back, so the 5 s loop shows a rebrand as one tap.

Source: https://jitter.video/template/before-after-logo/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing a rebrand or a new logo next to the old one (logo beat, square feed post)
- Comparing two versions of one thing (v1/v2 mark, old/new icon) in a silent loop
- A short autoplay post where the change itself is the message
Not for: films that need a claim, a URL or a CTA; marks that differ only in colour (the swap reads as a flicker).

## Format
1:1 · 5.00 s · 30 fps · dark (white marks on a saturated brand field) · loopable · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.20 | 0–36 | hook | old mark (outlined script wordmark) centred on flat brand colour; two-label switch top centre, knob on the left label | static frame; mark scales during exit | hold f0–27; swell 1.00→1.06 f28–31 (3 fr, easings.outQuint); shrink to ~0.84 + fade to 0 f32–36 (5 fr, easings.inExpo); knob starts sliding f30; switch dims to ~0.5 | match-cut | swoosh-short (planned) |
| 2 | 1.20–2.00 | 36–60 | logo | new mark (symbol + geometric wordmark) on the same centre; knob lands on the right label | static frame; mark grows in place | knob slide ends f41 (11 fr, springs.ui, overshoot not measurable); fade in f37–47 (10 fr, easings.outQuint); scale dip ~0.94 at f44 then 1.00 at f60 (16 fr, easings.outQuint); switch back to full opacity by f47 | hard-cut | tick (planned) |
| 3 | 2.00–3.70 | 60–111 | logo | new mark holds, knob right; then the same exit, knob slides back left | static frame; mark scales during exit | hold f60–102 (43 fr); swell 1.00→1.06 f103–106 (3 fr); shrink ~0.84 + fade f107–111 (5 fr, easings.inExpo); knob starts f106 | match-cut | swoosh-short (planned) |
| 4 | 3.70–5.00 | 111–150 | logo | old mark returns on the same centre, knob left; last frame = frame 0 | static frame; mark grows in place | fade in f112–122 (10 fr, easings.outQuint); scale ~0.93 at f120 → 1.00 at f136 (16 fr, easings.outQuint); knob lands ~f117 (11 fr, springs.ui); hold f136–149 | hard-cut | tick (planned) |

Evidence per row:
1. sheet-01 cells 0–4 (0.00–1.00 old mark, knob left), cell 5 (1.27, both marks faint, switch dimmed); 30 fps strip 1.00–2.00 s; no cut frames (cuts.json empty).
2. sheet-01 cells 5–8 (1.27 faint new lockup, 1.50 half opacity, 1.77–2.00 full); keyframe kf-001.50.
3. sheet-01 cells 8–14 (2.00–3.50 new lockup holds, 3.50 slight swell), cell 15 (3.77 faint old mark, switch dimmed); keyframe kf-002.50.
4. sheet-01 cell 15, sheet-02 cells 0–3 (4.00 old mark at reduced opacity, 4.27–4.77 full, knob left); 30 fps strip 3.50–4.50 s; keyframe kf-004.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| match-cut | 1→2, 3→4 (two marks swap on the same centre and size band, carried by the switch) | craft/vocabulary.md#transitions |

## Look
Palette: #FE495A background (brand field), #FDFDFC marks and switch knob, #FCA4AD switch track (light tint of the bg), #FBE6E7 mark at partial opacity. Type: two one-word switch labels, regular grotesk, sentence case, ~2.3 % H, grey on the knob, white on the track. Treatment: none. Background: flat single colour, no gradient, no grain. Marks sit at the frame centre, old mark ~59 % of frame width, new lockup ~65 %.

## What to adapt
- Copy: two switch labels, one word each (old state, new state). Nothing else.
- Brand: bg is the brand colour; marks and knob in white (or brand fg); track = bg mixed ~50 % with white. Both marks are user assets.
- Timing: holds (rows 1 and 3) stretch freely; the swap itself must keep its frame counts (3 + 5 + ~4 gap + 10 fade / 16 grow, knob 11 fr) to read as one tap.

## Pitfalls
- The exit starts with a 3 fr swell before shrinking; dropping it makes the swap look like a plain crossfade.
- There are ~4–5 frames where neither mark reads (f36–40, f111–115); without the gap the two marks overlap and muddy on a saturated field.
- The knob starts 2 fr after the swell, not before: the switch follows the mark, then the mark follows the switch on the way in.
- Keep the two marks in the same optical size band (59 % vs 65 % W) or the swap reads as a zoom.
- Last frame must equal frame 0 for the loop; end with a 14 fr hold of state A.

## Missing components
- ToggleSwitch: two-label pill switch, track ~29 % W × 7 % H at top centre (~9 % H from the top), white knob covering one label, slides 11 fr on springs.ui, whole switch dims to ~0.5 opacity during the swap and recovers by the time the incoming mark is opaque (techniques: match-cut)
- MarkSwap: crossfades two arbitrary marks on one centre with the measured envelope (out: swell 1.06 3 fr, shrink 0.84 + fade 5 fr; gap 4 fr; in: fade 10 fr, scale 0.94→1.00 16 fr) (techniques: match-cut)

## Proposed terms
- toggle-swap: a UI switch flip drives a swap between two states of the same subject; rows 1–4 (not in craft/vocabulary.md; not used in recipe.json)
- swell-exit: element grows ~6 % for 3 fr before shrinking out, an anticipation before the exit; rows 1 and 3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 1.00–2.00 and 3.50–4.50 s plus a per-frame bounding box of the white mark and luma of the switch region over the whole source. Not measurable: knob overshoot (none visible at 1 fr, springs.ui chosen). Theme: bg relative luminance ~0.27 is between the dark and light thresholds; chosen `dark` because fg is white on a saturated field. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). cuts.json has 0 hard, 0 soft, 0 flashes; rows split at the two visible state changes.

## Study log
id toggle-mark-swap-loop · family logo-brand · 5.00 s, 4 rows, 0 cuts, loopable
techniques 1 (match-cut) · cut_on_beat n/a (0/0, silent, no music)
measured at 1 fr from 30 fps strips and per-frame bbox: swell 3 fr, exit 5 fr, gap 4 fr, fade-in 10 fr, grow 16 fr, knob 11 fr
not measurable: knob overshoot; theme borderline (L ~0.27), set dark
proposed terms: toggle-swap, swell-exit
missing components: ToggleSwitch, MarkSwap
phase B: not run (study only)
