---
name: story
description: Story, script and storyboard for a launch film, product video, promo, teaser or Product Hunt video: brief questions with defaults, hook bank, structure for 6/15/30/45/60/90 s, voice-over script inside a word budget, and a shot-by-shot storyboard table with timings, camera, motion, sound and the rule behind each choice, then a user approval gate. Use after brand intake and before any sound or scene work, or when the user wants to change the script, hook, length or structure. Nothing renders to mp4 before the user approves the storyboard. Not for writing the social post (launch-post) or generating audio (sound).
---

# story: brief → hook → structure → script → storyboard → approval

Story before template `[T11]`. The VO and the storyboard become the timeline; everything downstream snaps to them.
Full law: `craft/01-story.md`, `craft/11-script-and-vo.md`, `craft/02-rhythm-and-sound.md`.
Write into `launch-video/films/<slug>/` (BRIEF.md, STORYBOARD.md, VO lines in film.json).

## 1. Brief (BRIEF.md)

Ask at most 5 questions at once, each with a default the user can accept with "ok". Question list and defaults:
[references/brief.md](references/brief.md). Never ask what the repo, site or brand.json already answer.
The one message must fit in ≤ 8 words. If the user gives three messages, pick one and park the rest under "Not this film".

## 2. Mode and length

| If | Mode | Default length |
|---|---|---|
| one UI flow is the point (dev tool, SaaS feature, AI chat answer) | product film | 15–30 s |
| a thesis, a "why now", a consumer story, an AI product with a point of view | internet-native launch film | 30–45 s |
| both a thesis and a UI flow | hybrid: launch open → product middle → launch close | 30–60 s |
| Product Hunt gallery | per mode | 60–90 s |
| website hero | product film, no VO, loop | 10–20 s |

Rules: `[craft/01#two-modes]`. Length must sit inside every chosen preset's range `[craft/10#presets]`.

## 3. Hook

Pick one pattern from [references/hooks.md](references/hooks.md). Checks:
- Frame 0 is the poster: designed, never black, never a blank fade-in `[craft/10#poster]`.
- Something visibly changes by frame 15 (0.5 s at 30 fps).
- A muted viewer knows the category by 1.5 s (1 s for reel-9x16) `[craft/01#hooks]`.
- The hook promises what the payoff delivers; no bait the film doesn't pay.

## 4. Structure

Take the table for the length from [references/structures.md](references/structures.md) (seconds and frames @30, beat
labels from the vocabulary only). Adjust proportions by ≤ 20 % per section; keep the order. Films > 20 s plan one
rhythm break (stop, silence, palette flip) `[craft/02#silence-and-hard-stop]`. The product is the payoff: it arrives
after the tension, on its own background, slower `[craft/01#rules]`.

## 5. VO script (or text-only beat sheet)

- Word budget = seconds × 2.5–3 wps × 0.55–0.7 coverage. 15 s ≈ 26 words, 30 s ≈ 53, 45 s ≈ 79, 60 s ≈ 105,
  90 s ≈ 150 (at 2.7 wps, 0.65) `[craft/11#word-budget]`.
- Sentences ≤ 8 words. One idea per sentence. Concrete nouns and numbers the product can back up.
- No banned phrase `[craft/11#banned-phrases]`. Check: grep the script for each phrase in that list; zero hits.
- Say the outcome 0.3–0.5 s before the picture shows it, then silence while it lands.
- Mark phrase breaks with `|` and one accent word per phrase with `*word*` `[craft/11#script-markup]`.
- Read it aloud at 2.7 wps with a timer (or count words); trim until it fits with ≥ 30 % silence.
- No VO: the on-screen statements carry the story; ≤ 7 words per card; holds per `[craft/02#readability-holds]`.
Put the VO lines into `films/<slug>/film.json`, one entry per line with a stable id (the `vo` command reads them
from there and `vo --line <id>` redoes one; field names in `schemas/film.schema.json` and studio/API.md). Keep a
readable copy under "VO script" in STORYBOARD.md.

## 6. Storyboard (STORYBOARD.md)

Format and a filled example: [references/storyboard-template.md](references/storyboard-template.md).
- One row per shot (or per camera beat in a no-cut product film). Times in seconds and frames @ fps.
- Every row fills: beat, on screen, camera, motion, transition out, text/VO, sound, rules. An empty cell is a defect.
- Every craft choice cites its rule `[craft/NN#anchor]` (index: launch-film `references/decisions.md`).
- Name recipes you reuse (`recipe: statement-sequence-launch`) and families (`[craft/families/list#numbers]`).
- List assets needed: logo, screenshots, recordings, footage to generate (with prompt), stills to rebuild in React.

## 7. Self-rejection (fix before showing the user)

Reject your own storyboard if any is true:
1. No visible change by frame 15, or the category is unclear at 1.5 s.
2. A shot carries two ideas or two competing focal points `[T8]`.
3. Any empty camera/motion/sound/text cell.
4. A hold shorter than 0.2 × (words + 1) s `[craft/02#readability-holds]`.
5. Static shot > 600 ms with no drift or motion `[T1]`.
6. No rhythm break in a film > 20 s `[T4]`.
7. The product appears before the tension in launch-film mode.
8. A claim not in BRIEF.md, a metric without a source, a banned phrase.
9. Word count over budget or VO coverage > 70 %.
10. No designed end: the last ≥ 2 s must be calm (result hold or end card; ≥ 3 s on ph-16x9) and the mark + URL
    must be on screen for the final ≥ 1 s (end card 2–3 s in launch films).

## 8. Approval gate (hard)

1. Show the user the storyboard table (or a ≤ 12-row summary for long films) plus the VO script and the hook choice.
2. Ask: "Approve, or tell me what to change." Apply edits; show again only the changed rows.
3. On approval write line 1 of STORYBOARD.md: `approved: 2026-10-07T18:20:00Z`.
4. Until that line exists: no VO generation for final, no music render, no mp4. Stills for look are allowed.
5. A later change to approved rows: remove nothing, append `revised: <ISO> rows 4–6`, re-approve those rows.

Then hand off to the sound skill (gate 4 of launch-film).
