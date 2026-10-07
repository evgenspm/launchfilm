# 06 · Look: grade, texture, material

A look is what makes mixed sources one film (`T7`). Components live in the look preset (grain, vignette, scanlines,
scrim, RGB split, glitch, flash, surface, film look; see studio/API.md); GPU effects via `@remotion/effects`, wrapped by
the look presets.

## Grade discipline

- **Name one treatment per section** in the storyboard header, chosen for the emotion: warm (nostalgia), cold saturated
  (chaos), digital blue (crash), clean neutral (product). The grade changes only on a section cut (a phrase boundary).
- **A treatment unifies mismatched footage.** Stock, archive, generated clips and UI under one grade read as a film;
  without one they read as a moodboard. Every clip in a section passes through the same stack.
- **Black is home.** Return to black, or the product's own surface, for the product reveal and the close.
- **Palette:** black/white + one accent (`brand.json` `colors.accent`). Product mode: the product's tokens only. A second
  accent needs a written reason in the storyboard.
- Check: storyboard header lists a look per section; stills from two clips in one section share black point, grain and tint.

## Always on

| Layer | Launch mode | Product mode |
|---|---|---|
| Grain | tiling noise in `overlay`, opacity 0.08–0.15, re-seeded every frame (offset by `random(frame)`) | none on the UI; ≤ 0.06 on the background surface only |
| Vignette | 20–35 % darkening at the corners | ≤ 15 %, or none |
| Drift | every shot (`craft/03#drift-and-push-in`) | every shot |
| Chromatic aberration | 1–2 px at the edges, gritty sections only | never |
| Shadows / hairlines | as the footage allows | soft large shadows, 1 px hairlines at 8–12 % white |

Overlay grain does nothing on near-black: dark gradients need dither (see Banding and encode).

## Treatments

Stack order, always: **footage → color → texture → glitch → text**. Text sits on top and is never treated, except a
deliberate glitch title.

| Treatment | Recipe | Use |
|---|---|---|
| CRT / hacker | grayscale or duotone → scanlines 4 px at 20–30 % → chromatic aberration 2–3 px with offsets jumping every 3–6 fr from `noise2D(seed, frame)` → slight barrel distortion → vignette; a 3 fr signal-off flicker on a hit | hype trailer, tech chaos |
| Glitch title / boiling mark | SVG `feTurbulence` fractalNoise, baseFrequency 0.05 0.1, numOctaves 2 → `feDisplacementMap` scale 20; reseed every 2–3 fr; 2 fr RGB-split bursts | a watermark or title that misbehaves |
| Film / retro | warm tint, lifted blacks (black point 8–12 of 255), grain 0.12, halation on highlights, `light-leak` on transitions, soft vignette | history, nostalgia, generated clips |
| Ordered dither | before Remotion: downscale to 640×360 (or the aspect equivalent), ordered 8×8 Bayer into a fixed 4–5 tone palette at 3 px cells (`ffmpeg … paletteuse=dither=bayer:bayer_scale=1`, nearest-neighbour back up), every third row darkened 30 % as a baked scanline. Words stay crisp on top with a hard dark halo (`paint-order: stroke fill`, 8–9 px stroke), never a blur. Keep it mono until the product; the accent arrives with the product (a palette flip is a rhythm break). Opening: 24 px cells flicker and clear in random order over 20 fr | unify print, generated clips and UI into one surface |
| Pixel / lo-fi | pixelate 6–10 px on impact frames, halftone for print feel, 1–2 fr white-noise flashes | style breaks |
| Clean product | none of the above: soft shadows, glow on the accent only, low-contrast shader background, hairlines | product film |

All treatments read the frame size (`useVideoConfig()`); nothing hardcodes 1920×1080.

## Depth and material

| Element | Numbers |
|---|---|
| Shadow, light UI | `0 10px 30px rgba(0,0,0,.15)` |
| Shadow, dark UI | `0 20px 60px rgba(0,0,0,.45)` + 1 px border `rgba(255,255,255,.08)`; floating card radius 8–16 |
| Dark glass card | `rgba(22,22,24,.72)` + `backdrop-filter: blur(28px) saturate(1.5)` + hairline `rgba(255,255,255,.09)` |
| Fake glass (still cards) | `blur(16px) saturate(1.4)`, inner highlight stroke, 20 % white top-edge gradient |
| Real glass (hero object) | `@remotion/three` + drei `MeshTransmissionMaterial`: transmission 1, ior 1.5, thickness 2.5, roughness 0.05, chromaticAberration 0.04, anisotropy 0.1 |
| Metal | `MeshStandardMaterial` metalness 1, roughness 0.15, a CC0 studio HDRI; rotate ~6 s per turn; `click` squash on a click |
| Blur layers | background `blur(20px)` and scaled up when a foreground card is the focus |
| Depth of field | 3.2 px blur per 1000 px of defocus, max 10 px; more turns the frame into grey mud |
| Glow around an element of size S (measured) | rim 0.011 S (1–2 px), tight 0.06 S, mid 0.25 S, wide 0.6 S |
| Particles | 60–120, 2–6 px, additive (`screen`), `noise3D` drift; warm gold for nostalgia, the brand accent for tech |
| Background | near-black `#0A0A0B` under a soft spot reads richer than `#000`; planes fade to black before their edges |

**Light as the event** (on black, things are revealed by being lit, not by moving): light-on 14 fr S-curve, halo lags 5 fr
and builds over ~30 fr; lights-off: halo dies in 15 fr, the object in 30 fr, then 5 fr of black. A screen turning on
lifts the whole frame ~34 % in luma over ~0.9 s. **Logos keep their colors:** glow goes under the mark, never additive on top.

**Shader backgrounds** are deterministic only: internal speed 0, time = `frame × 0.6`; keep contrast low behind UI
(a 40–60 % solid over the shader).

## Banding and encode

- **CSS gradients are 8-bit.** Dark halos show contour bands; H.264 turns them into blocks. Fix with fine dither noise in
  `screen` mode masked by the gradient itself; a global overlay grain does nothing on near-black.
- **Encode:** yuv420p, BT.709, CRF 18 by default; CRF 16 for gradient-heavy dark films (`craft/10#encode`).
- **Hairlines:** below 10 % contrast or under 1.5 px they vanish after platform compression.
- **Chroma:** saturated red on blue (or the reverse) bleeds at 4:2:0 on small text; avoid it for captions and UI labels.
- **Grain budget:** 0.08–0.15 survives CRF 18; heavier grain balloons the bitrate (check file size against `craft/10#presets`).
- **Check the encode, not the PNG:**
  1. `ffmpeg -ss <t> -i out.mp4 -frames:v 1 qa/<slug>/encode-<t>.png` at the darkest gradient shot.
  2. Boost it (`-vf eq=contrast=4:brightness=0.2`) and look for bands or blocks.
  3. Scale a still to 480 px wide (the X timeline preview): hero text readable, grain and grids read as texture, not pattern.
