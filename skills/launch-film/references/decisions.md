# Decision → rule index

Cite the rule in brackets after every craft decision: in STORYBOARD.md rows, in film.json comments, in QA.md and the
final report. Format: `[craft/NN#anchor]` (anchor = heading slug) or a tell id `[T1]`…`[T12]` from `craft/00`.
Family recipes: `[craft/families/<name>#numbers]`. Unknown → `[judgment]` + one sentence.

| # | Decision | Default / constraint (checkable) | Cite |
|---|---|---|---|
| 1 | Mode: product film vs launch film vs hybrid | UI flow → product film; story/why-now → launch film | `[craft/01#two-modes]` `[craft/00#two-modes]` |
| 2 | Length | per preset range; 30 s default | `[craft/10#presets]` |
| 3 | Structure and proportions | table for 6/15/30/45/60/90 s | `[craft/01#structures]` |
| 4 | Hook pattern | something changes by fr 15; category clear by 1.5 s (1 s reel) | `[craft/01#hooks]` `[T11]` |
| 5 | Frame 0 / poster | designed, never black or blank | `[craft/10#poster]` |
| 6 | Beat labels | vocabulary beats only | `[craft/01#storyboard-format]` |
| 7 | One idea per shot | one focal point, ≤ 1 hierarchy level | `[craft/01#rules]` `[T8]` |
| 8 | VO on/off, word budget | seconds × 2.5–3 wps × 0.55–0.7 | `[craft/11#word-budget]` |
| 9 | Copy wording | no banned phrase; sentences ≤ 8 words | `[craft/11#copy-rules]` `[craft/11#banned-phrases]` |
| 10 | VO style line | dry/documentary; never "confident/excited" | `[craft/11#vo-style-lines]` |
| 11 | Best-of-N takes | 3 default, 5 hero | `[craft/11#best-of-n]` |
| 12 | BPM | 100–130 product · 130–150 hype · 80–95 calm | `[craft/02#music-choice]` |
| 13 | Integer beat grid | BPM = 1800/n at 30 fps (100, 120, 150…) | `[craft/02#beat-grid]` |
| 14 | Cut placement | on downbeats, ±2 fr | `[craft/02#placement-on-the-grid]` `[T4]` |
| 15 | Text onset | on the word onset (VO) or half-beat | `[craft/02#placement-on-the-grid]` |
| 16 | Shot length | by mode table (0.6 s hype … 3.5–5.2 s UI) | `[craft/02#shot-length-by-mode]` |
| 17 | Hold time | hold_s ≥ 0.2 × (words + 1) | `[craft/02#readability-holds]` |
| 18 | Rhythm break | ≥ 1 in films > 20 s (stop, silence, palette flip) | `[craft/02#silence-and-hard-stop]` `[T4]` |
| 19 | Sound per event | every event has an audio id | `[craft/02#glue-rule]` `[T5]` |
| 20 | Mix levels | VO −16…−14, music −22…−18 under VO, master −14 / −1.5 dBTP | `[craft/02#mix]` |
| 21 | Music source + license | green/yellow only; credits written | `[craft/12#traffic-lights]` |
| 22 | Spring per role | snappy text · ui layout · pop cards · heavy hero · cameraIn/Out | `[craft/04#springs]` `[T2]` |
| 23 | Easing | outExpo enter, inExpo exit, linear continuous only | `[craft/04#easings]` `[T2]` |
| 24 | Durations | entrance 9–15 fr, exit 6–9 fr (< entrance) | `[craft/04#durations]` |
| 25 | Stagger | chars 1 · words 2–3 · rows 3–4 · cards 5–6 fr; group ≤ 24 fr | `[craft/04#stagger-and-overlap]` `[T3]` |
| 26 | Entrance shape | scale from 0.92–0.96, never 0; overshoot entry only | `[craft/04#entrances-and-exits]` |
| 27 | Determinism | no Math.random, Date.now, CSS transitions | `[craft/04#determinism]` |
| 28 | Camera tier | one tier per move; arrive 6 fr early | `[craft/03#zoom-tiers]` |
| 29 | Drift on static shots | 1.00→1.03–1.05 or 1.1–3.1 px/fr | `[craft/03#drift-and-push-in]` `[T1]` |
| 30 | UI text size under camera | ≥ 26 px rendered (16:9), ≥ 30 px portrait | `[craft/03#readability-under-the-camera]` |
| 31 | Aspect variants | recompose with focus rects | `[craft/03#multi-aspect-recomposition]` |
| 32 | Cursor + keycaps | arrive 6 fr early; keycaps 5 fr before press | `[craft/03#cursor-and-keycaps]` |
| 33 | Hero type size + recipe | statement 10 % of H; hero word up to 50–80 % width | `[craft/05#sizes]` `[craft/05#recipes]` `[T6]` |
| 34 | Fonts | shipped OFL fonts or the user's licensed font | `[craft/05#fonts]` |
| 35 | Look per section | one treatment per section; grain + vignette in launch mode | `[craft/06#grade-discipline]` `[craft/06#always-on]` `[T7]` |
| 36 | Banding on dark gradients | dither/grain; CRF ≤ 18 | `[craft/06#banding-and-encode]` |
| 37 | Footage source | rebuilt UI, user recordings, archival, optional AI under one grade | `[craft/07#sources]` `[T9]` |
| 38 | Rebuild vs record UI | decision table | `[craft/13#decide-rebuild-or-record]` |
| 39 | Transition choice | hard cut by default; spatial only | `[craft/09#default]` `[craft/09#catalog]` `[T10]` |
| 40 | Captions | phrase at once, ≤ 2 lines, ≤ 42/32 chars | `[craft/10#captions]` |
| 41 | Safe zones | per preset margins | `[craft/10#safe-zones]` |
| 42 | Encode | H.264 High yuv420p CRF 18, AAC 48 kHz | `[craft/10#encode]` |
| 43 | QA done | evidence per check | `[craft/08#evidence-rules]` `[T12]` |
| 44 | Family numbers (notifications, list, screen, statement, converge, brandmark) | use the family table | `[craft/families/<name>#numbers]` |
