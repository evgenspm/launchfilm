# Look: grade, grain, vignette, scrim, banding, the clean product look

Law: craft/06 (grade discipline, always on, treatments, depth and material, banding and encode), T7.
Look layers are CSS/SVG presets (`Grain`, `Vignette`, `Scrim`, `Scanlines`, `RGBSplit`, `Glitch`, `SliceGlitch`, `Flash`,
`Surface`, `FilmLook`, `BrandBackdrop`; verify in `<studio>/API.md`). GPU effects come from `@remotion/effects`, wrapped
by the look presets: don't call it directly from a film unless API.md documents the wrapper.

## Name the look before you build

One treatment per section, written in STORYBOARD.md: `clean product` · `film / warm` · `CRT / mono` · `ordered dither` ·
`cold digital`. Palette: brand bg + fg + one accent. A second accent needs a reason written next to it.
A treatment unifies mismatched sources: every clip in a section goes through the same stack.

## Stack order (bottom → top)

1. Background (brand bg, `BrandBackdrop` glow 0.10–0.20, or a shader at low contrast)
2. Footage / UI
3. Colour (tint, duotone, grayscale) on footage only
4. Texture: `Grain` opacity 0.08–0.15 (re-seeded every frame), `Vignette` 0.20–0.35
5. Glitch (only in gritty sections, on hits, 2–4 fr bursts)
6. Text and captions on top: never grained, never glitched (unless the glitch IS the text beat)

`FilmLook` = grain 0.10 + vignette 0.30 over its children: the default in launch mode.

## Mode defaults

| | Launch film | Product film |
|---|---|---|
| Grain | 0.08–0.15 on everything except type | none on UI; allowed on the background only |
| Vignette | 0.20–0.35 | ≤ 0.15 or none |
| Shadows | big and soft | light UI `0 10px 30px rgba(0,0,0,.15)`; dark UI `0 20px 60px rgba(0,0,0,.45)` + 1 px border `rgba(255,255,255,.08)` |
| Borders | n/a | hairlines 8–12 % white (dark) / black (light) |
| Radius | n/a | brand.json `radius`; floating cards 8–16 px |
| Background | black or brand bg is home | product surface or `BrandBackdrop` |
Return to black (or the brand bg) for the product reveal and the close.

## Text over footage (contrast)

Needs one of: `Scrim` (dark gradient, amount 0.25–0.45), a caption plate (80–86 % black), a 0 4px 15px rgba(0,0,0,.6)
shadow, or a different footage frame. Pass condition: contrast ≥ 4.5:1 between text and the sampled background behind
its bounding box in the still. White text over a bright region with no scrim = FAIL.

## Treatments (numbers)

- CRT / mono: grayscale or duotone → `Scanlines` 4 px at 20–30 % → RGB split 2–3 px, offsets jumping every 3–6 fr from
  `noise2D` → vignette. A 3 fr signal-off on a hit.
- Film / warm: warm tint, lifted blacks, grain 0.12, soft vignette, `light-leak` only on transitions.
- Ordered dither: footage pre-processed to a fixed 4–6 tone palette (8×8 Bayer, 3 px cells), every third row darkened
  ~30 % as a baked scanline. Type and UI stay crisp on top; text over dither gets a hard dark outline, never a blur.
  Keep the palette mono until the product, let the accent arrive with it (a palette flip is a rhythm break).
- Glass: cheap = `backdrop-filter: blur(16–30px) saturate(1.4)` + inner highlight + 20 % white top-edge gradient (fine for
  cards); real refraction = 3D transmission material (see 3d.md), only for a hero object.
- Particles: 60–120, 2–6 px, `noise3D` drift, `mix-blend-mode: screen`.

## Banding and encode

- CSS gradients are 8-bit; dark halos band and H.264 turns bands into blocks. Add dither/grain inside the gradient
  (overlay grain does nothing on near-black: use screen-mode grain masked by the gradient).
- Avoid 1 px hairlines below 10 % contrast (they vanish after X's re-encode) and pure #000 → colour gradients.
- Preview the H.264 of any shot with deep reds, blues or large dark gradients: render with `--crf=16`, still at that frame
  from the mp4, compare with the PNG still.
- Export yuv420p, BT.709 (craft/10#encode).

## Checks

- Grain/vignette present in every launch-mode shot (`grep -n "FilmLook\|Grain" films/<slug>`), absent from UI layers in
  product mode.
- One named treatment per section in STORYBOARD.md and in code.
- No banding visible in the mp4 still at the darkest gradient (QA still, boosted ×4 brightness if unsure).
