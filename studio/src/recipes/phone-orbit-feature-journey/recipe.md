# Orbit-to-phone feature journey

A dark statement opens into a glowing selector, expanding rings cycle three benefit words, then a framed phone carries the viewer through a feed, chart and configurable list before a quiet logo hold.

Source: https://www.raylight.app/templates/cPK02itW (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A 20-30 s launch film with three connected mobile features.
- A dark product reveal that needs a visual bridge from promise to UI.
- A phone-first release with a proof chart and configurable list.
- A silent autoplay film where motion must explain the sequence.
Not for: a product with no credible UI or no single outcome that can carry the opening ring sequence.

## Format
16:9 · 25.87 s · 30 fps · dark · music absent, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-2.27 | 0-68 | hook | centred 5-word rebuild statement | drift 1.00 to 1.03 | character reveal ~30 fr; crop exit ~23 fr, `easings.outExpo` (±0.25 s) | `mask-wipe` | planned `whoosh` |
| 2 | 2.27-5.00 | 68-150 | reveal | three-option selector, progress rim, state label | dolly down ~400 px/s @1920 for 30 fr, then right drift | panel `easings.outExpo` 18 fr; arc `easings.linear` ~68 fr | `blur-dissolve` | planned `tick` |
| 3 | 5.00-7.77 | 150-233 | feature | first benefit word inside moving rings | pull-out 1.08 to 1.00 | rings `easings.linear` 83 fr; word `easings.outQuint` ~15 fr (±0.25 s) | `morph` | planned `swell` |
| 4 | 7.77-9.00 | 233-270 | feature | second benefit word with overlapping circles | locked framing; rings translate left ~0.9 W | `word-swap`, `springs.ui` ~15 fr; rings linear 37 fr (±0.25 s) | `morph` | planned `swell` |
| 5 | 9.00-9.77 | 270-293 | feature | third benefit word, then phone entrance | locked, then phone rises ~0.45 H | `springs.ui` ~12 fr; phone `springs.heavy` ~18 fr (±0.25 s) | `blur-dissolve` | planned `swoosh-short` |
| 6 | 9.77-12.27 | 293-368 | feature | phone with a media-rich feed | dolly down ~107 px/s @1920 | feed scroll `easings.linear` 75 fr | `morph` | planned `swoosh-short` |
| 7 | 12.27-15.00 | 368-450 | feature | feed details lead into a data card | zoom-tier full to region to element, peak ~58 %/s | `springs.cameraIn` ~36 fr while feed keeps scrolling (±0.25 s) | `morph` | planned `swoosh-short` |
| 8 | 15.00-15.77 | 450-473 | proof | value, positive delta and rising line chart | dolly down ~255 px/s @1920 | chart draw `easings.outQuint` ~23 fr (±0.25 s) | `morph` | planned `ui-confirm` |
| 9 | 15.77-19.00 | 473-570 | feature | three topic rows lift and settle into a pinned group | zoom-tier region to detail, 1.00 to ~1.25 | `list-assemble`, stagger 8 fr, `springs.layout` ~18 fr each (±0.25 s) | `morph` | planned `pop` |
| 10 | 19.00-20.77 | 570-623 | feature | feed returns with new tabs, then phone recedes | `springs.cameraIn` 24 fr, then `springs.cameraOut` ~18 fr | feed `springs.ui` ~18 fr; device exit `easings.inExpo` ~18 fr (±0.25 s) | `blur-dissolve` | planned `swoosh-short` |
| 11 | 20.77-22.77 | 623-683 | feature | small centred 3-word production line | locked centre | `quiet-close`, `easings.outQuint` ~15 fr; wipe exit ~23 fr (±0.25 s) | `blur-dissolve` | planned `swell` |
| 12 | 22.77-25.87 | 683-776 | logo | geometric white mark on black | locked centre | fade `easings.outQuint` ~8 fr, then ~85 fr hold (±0.25 s) | `hard-cut` | planned `shimmer` |

Evidence per row:
- 1: `sheet-01 cells 0-8`; full-resolution `kf-000.50.jpg`, `kf-001.50.jpg`.
- 2: `sheet-01 cells 9-15`, `sheet-02 cells 0-3`; full-resolution `kf-002.50.jpg` to `kf-004.50.jpg`.
- 3: `sheet-02 cells 4-15`; full-resolution `kf-005.50.jpg` to `kf-007.50.jpg`.
- 4: `sheet-02 cell 15`, `sheet-03 cells 0-3`; full-resolution `kf-008.50.jpg`.
- 5: `sheet-03 cells 4-7`; full-resolution `kf-009.50.jpg`.
- 6: `sheet-03 cells 7-15`, `sheet-04 cell 0`; full-resolution `kf-010.50.jpg`, `kf-011.50.jpg`.
- 7: `sheet-04 cells 1-11`; full-resolution `kf-012.50.jpg` to `kf-014.50.jpg`.
- 8: `sheet-04 cells 12-15`; full-resolution `kf-015.50.jpg`.
- 9: `sheet-04 cell 15`, `sheet-05 cells 0-11`; full-resolution `kf-016.50.jpg` to `kf-018.50.jpg`.
- 10: `sheet-05 cells 12-15`, `sheet-06 cells 0-3`; full-resolution `kf-019.50.jpg`, `kf-020.50.jpg`.
- 11: `sheet-06 cells 3-10`; full-resolution `kf-021.50.jpg`, `kf-022.50.jpg`.
- 12: `sheet-06 cells 11-15`, `sheet-07 cells 0-7`; full-resolution `kf-023.50.jpg`, `kf-024.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| `mask-wipe` | 1, 11 | `craft/09-transitions.md#mask-wipe` |
| `glow` | 2 | `craft/06-look.md#depth-and-material` |
| `word-swap` | 3-5 | `craft/05-typography.md#word-swap` |
| `morph` | 3-4, 6-9 | `craft/09-transitions.md#morph` |
| `device-phone` | 6-10 | `craft/03-camera-and-staging.md#framing-the-product` |
| `ui-rebuild` | 2, 6-10 | `craft/13-ui-recreation.md#scripted-state` |
| `dolly` | 2, 6, 8 | `craft/03-camera-and-staging.md#zoom-tiers` |
| `zoom-tier` | 7, 9-10 | `craft/03-camera-and-staging.md#zoom-tiers` |
| `chart-draw` | 8 | `craft/04-motion.md#durations` |
| `list-assemble` | 9 | `craft/families/list.md#numbers` |
| `quiet-close` | 11 | `craft/05-typography.md#table-of-the-rest` |
| `blur-dissolve` | 2, 5, 10-11 | `craft/09-transitions.md#blur-dissolve` |

## Look
Palette: `#000000` background, `#FDFDFD` primary type, `#2F2F2F` surfaces, `#4C5644`, `#73765B`, `#ACAEA3` muted media colours. Type: regular grotesk, sentence case, neutral tracking, benefit words 12-14 % of frame height, UI labels 2-4 %. Treatment: `glow` on the selector and restrained device edges. Background: pure black with low-contrast UI surfaces.

## What to adapt
- Copy: one 5-word opening statement, three one-word benefits, one 3-word closing line; each describes a function and is original.
- Brand: use the accent only for progress, links, positive values and list actions; keep the final mark monochrome.
- UI: provide 4-6 generic feed cards, three original media images, one chart data set and three list topics.
- Timing: keep rows 5 and 8 near 23 fr; rows 6-10 may stretch only if the UI remains readable at each camera tier.

## Pitfalls
- The phone is the continuity anchor from 9.77 to 20.77 s; changing its frame or position between UI states breaks the morph.
- Do not use third-party feed copy, portraits, marks or screenshots in the rebuild; use supplied original or licensed media.
- The chart proof lasts only 23 fr at sheet resolution; put the figure and line in one focal area.
- The list rows move before the camera finishes; preserve the 8 fr stagger or the three cards read as one slab.
- Keep the close on black. Extra UI behind the final line or mark removes the contrast reset.

## Missing components
None for the built recipe. `SelectorCarousel`, `RingWordField`, `FeedRebuild`, and `TopicPinPanel` are implemented
locally in `Recipe.tsx`; they remain recipe-local until a curator promotes them.

## Proposed terms
- `ring-field`: outlined circles travel and overlap around a central word, changing density as the word swaps; rows 3-5. This is not the item-on-a-tilted-loop geometry of `orbit-ring`.

## Measurement notes
Resolution: 0.25 s from sheets; full-resolution keyframes used for type, UI and palette detail. No cut frames exist because `cuts.json` reports zero hard cuts, zero soft transitions and zero flashes. Palette was generated from `kf-000.50.jpg`, `kf-010.50.jpg` and `kf-019.50.jpg`; near-duplicate dark values were merged. Not measurable: sub-0.25 s entrance overshoot, exact ring speed, phone spring overshoot, chart draw start frame and final mark fade duration. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr; with no audio or cuts, the boolean is false.

## Build comparison

Iteration 1 matched the 12-row structure but left the 4.85 s ring late, used generic gradient media blocks and framed the
phone too small. Iteration 2 authored real dashboard, bar-chart and task panels, overlapped the first ring by 6 fr and
raised the phone tiers. Iteration 3 increased the phone/list and final-mark scale and delayed the close reveal to match
the reference. Boundaries remain taken from `structure[]`; the early ring is a 6 fr transition overlap, not a moved row.

| Row | Reference t0-t1 | Ours t0-t1 | Delta boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---:|---|---|---|
| 1 | 0.00-2.27 | 0.00-2.27 | 0 | centred five-word line | character reveal, centre wipe | none |
| 2 | 2.27-5.00 | 2.27-5.00 | 0 | three circular options | top settle, linear rim | none |
| 3 | 5.00-7.77 | 5.00-7.77 | 0 | large word in five rings | linear ring travel, pull-out | 6 fr entrance overlap added in iteration 2 |
| 4 | 7.77-9.00 | 7.77-9.00 | 0 | second word in three rings | continued left travel | none |
| 5 | 9.00-9.77 | 9.00-9.77 | 0 | third word, phone rise | heavy phone spring | none |
| 6 | 9.77-12.27 | 9.77-12.27 | 0 | full phone with authored feed panels | linear vertical scroll | placeholders replaced in iteration 2 |
| 7 | 12.27-15.00 | 12.27-15.00 | 0 | feed details fill frame | camera-in tier plus scroll | phone scale raised in iterations 2-3 |
| 8 | 15.00-15.77 | 15.00-15.77 | 0 | value, delta, line chart | outQuint chart draw | chart tier raised in iteration 2 |
| 9 | 15.77-19.00 | 15.77-19.00 | 0 | three pinned topic rows | layout spring, 8 fr stagger | detail tier raised in iteration 3 |
| 10 | 19.00-20.77 | 19.00-20.77 | 0 | feed returns, phone recedes | camera-out and inExpo exit | none |
| 11 | 20.77-22.77 | 20.77-22.77 | 0 | small centred close | quiet fade and centre wipe | reveal delayed 10 fr in iteration 3 |
| 12 | 22.77-25.87 | 22.77-25.87 | 0 | monochrome brand mark | 8 fr fade, long hold | mark scale raised in iteration 3 |

Eight-moment side-by-side gate (`compare/compare.jpg`, top = reference, bottom = ours):

| Moment | t (s) | Subject scale (ours vs ref) | Empty stage? | Placeholder content? | Camera/depth match? | Look match? | Fix |
|---:|---:|---|---|---|---|---|---|
| 1 | 1.62 | equal, centred line | no | no | yes, locked drift | yes, black + white type | none |
| 2 | 4.85 | equal, ring field fills width | no | no | yes, pull-out begins | yes, restrained outlines | 6 fr ring overlap |
| 3 | 8.08 | equal, three rings + hero word | no | no | yes, lateral ring travel | yes, low-contrast rings | none |
| 4 | 11.32 | equal, phone fills about 80% H | no | no | yes, frontal dolly | yes, dark device edges | phone scale raised |
| 5 | 14.55 | equal, feed detail crops at edges | no | no, authored UI | yes, region-to-element tier | yes, dark UI + accent | phone scale raised |
| 6 | 17.78 | equal, list fills the central region | no | no, named rows/icons | yes, detail zoom + stagger | yes, dark surfaces | detail tier raised |
| 7 | 21.02 | equal, small dim close | no | no | yes, locked centre | yes, black reset | reveal delayed |
| 8 | 24.25 | equal, compact central mark | no | no | yes, locked centre | yes, monochrome close | mark scale raised |

Final `detail_ratio`: **0.877** (informational); `empty_frames`: **0**; compare verdict: **ok**.

## Study log
id: `phone-orbit-feature-journey`
family: `launch-film`
duration: 25.87 s at 30 fps; 12 contiguous rows
techniques: 12 vocabulary ids
cut_on_beat: false, 0/0 cuts; source is silent
measurement: sheets ±0.25 s; full-resolution keyframes for detail
not measurable: sub-cell overshoot, exact ring speed, chart onset, final mark fade
proposed terms: `ring-field`
missing components: none; recipe-local selector, ring, feed, media, chart and topic components implemented
phase A result: studied; offline validation and self-check passed
phase B result: built in 3 iterations; 12/12 rows, max boundary delta 0 fr, 7 sheets, 25.87 s render
comparison gate: detail_ratio 0.877, 0 empty sampled frames, verdict ok
remaining difference: demo media is authored data UI rather than photographic feed imagery; content density and scale match
