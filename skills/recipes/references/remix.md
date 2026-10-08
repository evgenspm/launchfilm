# Building the user's film from a recipe

The recipe's numbers (timings, frame counts, springs, staggers, transitions, sounds) are what you reuse. The picture,
the copy and the brand are the user's. Work in this order: re-time → brand → content → scenes → sound → record.

## 1. Brand

Every scene reads brand.json through `useBrand()` (the film engine wraps the film in `BrandProvider`). A recipe with
code takes `brand` (the shape of brand.json: name, tagline, url, colors{bg, fg, accent, accent2, muted, surface},
fonts{display, text, mono}, logo, radius, theme); pass the film's brand unchanged. If the recipe's theme is light and the
brand is dark (or the reverse), check every still for contrast: captions and text ≥ 4.5:1, accent on bg ≥ 3:1. Never
recolour the user's logo; if it fails on the background, put it on `surface` or use its mono version. The recipe's
`look.palette` tells you the colour roles (background, text, accent), not the colours to use.

## 2. Content

Fill the slots the recipe names (`inputs`, `params` in recipe.json, "What to adapt" in recipe.md) with the user's words:
product name, lines (VO or on-screen), stats (real and sourced), UI. Count `inputs.lines`: if the user's script has more
lines than slots, cut lines, never cram two ideas into one slot (craft/02#readability-holds: hold ≥ 0.2 × (words + 1) s).
Never ship the demo brand's copy or the source film's copy; recipe.md describes the source copy by function and length
(`statement, 5 words, names the problem`), which is what you write to.

## 3. Re-time

The recipe's `structure[]` is the skeleton. Keep beat order and proportions; change absolute times.

1. Scale: `k = targetDuration / recipe.format.duration_s`. New boundary `t' = t × k`.
2. Clamp: no shot shorter than its readability hold; no hold longer than the craft maximum for its mode (static rule:
   drift keeps long holds alive).
3. Snap: each boundary to the nearest downbeat of the new beat grid (`beatGrid(beats, fps).snap(round(t' × fps))`), or to
   the nearest VO phrase boundary when the film is VO-led. Text onsets snap to word onsets.
4. If `k` < 0.7 or > 1.4, drop or repeat whole beats instead of stretching (a 30 s recipe in 15 s: drop the second
   feature, keep hook, reveal, end; a 5 s recipe in 30 s: it covers one beat, combine it with others).
5. Motion durations (entrances, exits, springs, staggers) do NOT scale with `k`: they stay in frames from the recipe
   and craft/04.
6. fps: frames in recipe.md are at the recipe's fps (and at 30 fps); convert with `round(f × fps / recipeFps)`.

Write the new times into `film.json` shots (`dur`, or `beat`/`beats` on a grid) and the STORYBOARD rows.

## 4. Scenes

**Recipe with code** (`Recipe.tsx`): the scaffolded `recipe` scene renders it; change `content` props, and the timing
props it exposes (`params`, e.g. `timing.period`, `timing.bpm`) to land on the new grid. If a beat must change shape,
copy that part into `films/<slug>/scenes/` and edit the copy; never edit the recipe folder.

**Text recipe**: `new --recipe` left one `TodoScene` per row in `films/<slug>/Film.tsx`, with the row's picture,
camera, motion, transition and sound as comments. Replace each with a scene in `films/<slug>/scenes/<NN>-<name>.tsx`:

1. Find the building blocks in `API.md`: the recipe's `components` list first, then the presets the techniques map to
   (craft/vocabulary.md names the component for most ids: `statement-sequence` → `StatementSequence`, `blur-in` →
   `BlurIn`, `notification-stack` → `NotificationStack`, `end-card` → `EndCard`, `zoom-tier` → `Camera`…).
2. Translate the row's motion literally: `springs.<name>` → `spring({config: springs.<name>})`, `outExpo 12 fr` →
   `interpolate(…, {easing: easings.outExpo})` over 12 frames scaled by `fps / 30`, `stagger 2 fr` → `stagger(i, 2, fps)`.
   No inline spring configs (`T2`).
3. Transitions go on the next shot in film.json (`transition`), not inside the scene, when the id is one the engine
   knows (`hard-cut`, `blur-dissolve`, `mask-wipe`, `slide-push`, `zoom-through`, `portal`, `flash`, `glitch-cut`,
   `match-cut`, `smash-cut-black`). Others (`whip-pan`, `morph`, `frame-in-frame`) are built inside the two scenes.
4. "Missing components" in recipe.md come with a one-line spec and numbers: build them in `films/<slug>/scenes/`.
5. Still at the shot midpoint, compare with the row (subject, layout, type scale, motion direction), fix, next row.

## 5. Recompose for other presets

A 16:9 recipe for `reel-9x16`: keep the stage, change focus rects so the subject fills the portrait frame; move captions
into the 9:16 safe zone (top 220, right 140, bottom 480, left 60 px). Never letterbox. If the recipe's layout can't
recompose (a wide horizon arc, a horizontal ticker), choose a different recipe for that preset.

## 6. Combine (up to 3 recipes)

- Assign each recipe to beats: e.g. hook + problem from A, features from B, logo + end from C.
- One look: the main recipe's treatment (grain, vignette, grade) wraps the whole film; strip per-recipe looks.
- One type system: brand fonts and sizes; a recipe's own font choices yield to the brand.
- Join with a cut on the downbeat or one spatial transition (craft/09); never a dissolve between recipes.
- One music track and one beat grid for the whole film.

## 7. Sound

Each recipe lists `audio.sfx[{event, sound}]` and a `sfx` per row. After re-timing, every listed event still needs its
sound at its new frame (the scaffold puts each row's first sound on its shot; the engine also places SFX from film.json
events). Music BPM: keep the recipe's band (± 10 BPM) unless the brief's mood says otherwise.

## 8. Record

In STORYBOARD.md: recipe id(s), `status` (text or code), rows used, params, the scale factor, beats dropped or repeated.
