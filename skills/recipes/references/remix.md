# Remixing a recipe into the user's film

## 1. Brand

`Recipe.tsx` takes `brand` (the shape of brand.json: name, tagline, url, colors{bg, fg, accent, accent2, muted, surface},
fonts{display, text, mono}, logo, radius, theme). Pass the film's brand.json unchanged. If the recipe's demo used a
light theme and the brand is dark (or the reverse), check every still for contrast: captions and text ≥ 4.5:1, accent on bg
≥ 3:1. Never recolour the user's logo; if it fails on the background, put it on `surface` or use its mono version.

## 2. Content

Fill `params` from `recipe.json` `params` with the user's words: their product name, their lines (VO or on-screen), their
stats (real and sourced), their UI. Count the recipe's `inputs.lines`: if the user's script has more lines than slots,
cut lines, never cram two ideas into one slot (craft/02#readability-holds: hold ≥ 0.2 × (words + 1) s).
Never ship the demo brand's copy or the source film's copy.

## 3. Re-time

The recipe's `structure[]` is the skeleton. Keep beat order and proportions; change absolute times.

1. Scale: `k = targetDuration / recipe.format.duration_s`. New boundary `t' = t × k`.
2. Clamp: no shot shorter than its readability hold; no hold longer than the craft maximum for its mode (static rule:
   drift keeps long holds alive).
3. Snap: each boundary to the nearest downbeat of the new beat grid (`beatGrid(beats, fps).snap(round(t' × fps))`), or to
   the nearest VO phrase boundary when the film is VO-led. Text onsets snap to word onsets.
4. If `k` < 0.7 or > 1.4, drop or repeat whole beats instead of stretching (a 30 s recipe in 15 s: drop the second
   feature, keep hook, reveal, end).
5. Motion durations (entrances, exits, springs) do NOT scale with `k`: they stay in frames from craft/04.
6. fps: frames in recipe.md are at the recipe's fps; convert with `round(f × fps / recipeFps)`.

## 4. Recompose for other presets

A 16:9 recipe for `reel-9x16`: keep the stage, change focus rects so the subject fills the portrait frame; move captions
into the 9:16 safe zone (top 220, right 140, bottom 480, left 60 px). Never letterbox. If the recipe's layout can't
recompose (a wide horizon arc, a horizontal ticker), choose a different recipe for that preset.

## 5. Combine (up to 3 recipes)

- Assign each recipe to beats: e.g. hook + problem from A, features from B, logo + end from C.
- One look: the main recipe's treatment (grain, vignette, grade) wraps the whole film; strip per-recipe looks.
- One type system: brand fonts and sizes; a recipe's own font choices yield to the brand.
- Join with a cut on the downbeat or one spatial transition (craft/09); never a dissolve between recipes.
- One music track and one beat grid for the whole film.

## 6. Sound

Each recipe lists `audio.sfx[{event, sound}]`. After re-timing, every listed event still needs its sound at its new
frame (the engine places SFX from film.json events). Music BPM: keep the recipe's band (± 10 BPM) unless the brief's
mood says otherwise.

## 7. Record

In STORYBOARD.md: recipe id(s), version (recipe.json `status`), params used, the scale factor, beats dropped or repeated.
