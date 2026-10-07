# QA.md template

Write to `qa/<slug>/QA.md`. One row per check. `Result` ∈ PASS · FAIL · NOT CHECKED. Evidence is a path you opened or a
number you measured (with the tool). Empty evidence = NOT CHECKED.

```markdown
# QA · <slug> · <YYYY-MM-DD HH:MM>

Render(s): out/<slug>/<file per preset> · film.json rev <short hash or mtime> · tools: <system ffmpeg x.y | remotion ffmpeg>
Automatic report read: qa/<slug>/report.md (<its verdict line>)

## Summary
Verdict: READY | NOT READY
Blocking FAILs: <ids or none> · NOT CHECKED: <ids with one-word reasons or none>
Fix loops used: <0–2>

## Files opened (T12)
Sheets: qa/<slug>/sheet-01.jpg … (n)
Stills: qa/<slug>/stills/x-16x9-0.00.png … (n)

## Blocking checks (craft/00)
| Check | Result | Evidence | Rule | Fix applied |
|---|---|---|---|---|
| T1 static | PASS | freezedetect: 1 interval 27.20–30.00 = end-card settle (2.8 s ≤ 3 s) | craft/03#drift-and-push-in | |
| T2 default easing | PASS | grep G1: 0 lines | craft/04#springs | |
| T3 all at once | | | craft/04#stagger-and-overlap | |
| T4 one speed | | cuts on beat 11/11 within ±2 fr; break at 18.00 (silence 0.8 s) | craft/02#placement-on-the-grid | |
| T5 sound | | 23/23 events with sfx; VO window −15.1 LUFS, music-only −21.4 | craft/02#glue-rule | |
| T6 text as label | | see Text at time | craft/02#readability-holds | |
| T7 flat look | | | craft/06#always-on | |
| T8 web layout | | | craft/05#layout | |
| T9 generic stock | | | craft/07#provenance | |
| T10 transitions | | | craft/09#default | |
| T11 story | | | craft/01#rules | |
| T12 looked | PASS | Files opened: 4 sheets, 31 stills | craft/08#evidence-rules | |

## Delivery checks (per preset)
| Check | x-16x9 | li-4x5 | reel-9x16 | Evidence | Rule |
|---|---|---|---|---|---|
| D1 codec | PASS | PASS | PASS | ffprobe h264 / 100 (High) / yuv420p | craft/10#encode |
| D2 size | | | | ffprobe 1920×1080 | craft/10#presets |
| D3 fps | | | | r_frame_rate 30/1 = avg_frame_rate | craft/10#encode |
| D4 duration | | | | | craft/10#presets |
| D5 audio stream | | | | | craft/10#encode |
| D6 loudness | | | | I −14.1 LUFS, TP −1.7 dBTP (system ffmpeg ebur128) | craft/02#mix |
| D7 faststart | | | | | craft/10#encode |
| D8 poster | | | | | craft/10#poster |
| D9 SRT | | | | | craft/10#srt |
| D10 safe zones | | | | qa/<slug>/safe-*.png | craft/10#safe-zones |
| D11 captions + contrast | | | | caption 15.8:1, accent on bg 4.1:1 | craft/10#captions |
| D12 freeze / black | | | | | craft/08#delivery-checks |
| D13 colour / banding | | | | | craft/06#banding-and-encode |
| D14 file size | | | | | craft/10#presets |
| D15 credits / sources | | | | | craft/12#credits-and-content-id |
| D16 loop (hero-loop) | | | | | craft/10#encode |

## Text at time
| # | Text (first words) | Words | In–out (fr) | Hold (s) | Required (s) | Lines | Result |
|---|---|---|---|---|---|---|---|

## Findings and fixes
| # | Frames | Finding | Rule | Fix | Re-checked |
|---|---|---|---|---|---|
```

Rules:
- Fill every cell; `n/a` only where a preset has no such item (hero-loop has no captions, no audio).
- A FAIL that was fixed shows the first measurement in Findings and the new evidence in the check row.
- Copy numbers from report.md with "(report.md)"; mark your own measurements with the tool used.
- The example values above illustrate the format; they are not targets.
