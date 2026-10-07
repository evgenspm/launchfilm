# Family: brandmark (light, glow, glass, portal, logo reveal, end card)

On black, light is the event: things are revealed by being lit, not by moving. Motion is a slow push or a heavy spring with
no bounce; the one fast move is a zoom on ln(scale). Numbers measured frame by frame on studied references at 30 fps;
scale frames by fps/30. The mark always comes from brand.json: never draw or invent a logo.

## When

| Moment | Component | Why |
|---|---|---|
| Pull the viewer into the product out of a word | portal zoom + portal word + brand tunnel | spatial transition: the next scene is already alive inside a letter |
| Two or three short phrases while travelling | depth phrase over the brand tunnel | text enters from depth and leaves past the camera, so the tunnel reads as depth |
| Exit from the tunnel to black | tunnel dive 0 → 1 over 20 fr + 5 fr black | the mouth swallows the frame; a black breath follows |
| Establish "premium" before the logo | horizon arc | black planet, white-hot rim, accent atmosphere: maximum contrast in a 5 px line |
| Logo reveal | glass mark | strips of glass flip into place, clear into the exact mark, the light turns on, one glint |
| Scattered → understood | particle form | dot columns gather into any shape (the mark, a device, an icon) |
| Glow on anything | bloom | additive or under-glow, tinted or self-coloured, with threshold |
| Close | end card | mark + wordmark + line + URL, FLIP from the logo shot, settles to stillness |

One of these per beat. A film that tunnels, raises a planet, assembles glass and gathers particles in 10 s is a showreel,
not a story.

## Numbers

| What | Value |
|---|---|
| Portal zoom | 8 fr in the reference, we use 10; scale = exp(ln(end) × e(t)), e = `portal` bezier(0.85, 0.25, 0.5, 0.7), fitted to 0 / .02 / .11 / .18 / .28 / .46 / .78 / .87 / 1 |
| Portal end scale | covers the frame diagonal: 1.04 × diagonal / disc Ø (≈ 14× for a disc 9 % of frame width) |
| Inside the disc | the inner scene grows ~5× while the disc grows ~14× (parallax); it must always cover disc ∩ frame |
| Outgoing blur | 26 px × d ln(scale)/frame, max 14 px (≈ 6–12 px at 1080p) |
| Depth phrase | in 5 fr: scale 0.55 → 1, blur 10 → 0; hold with an accelerating push +7 %; out 4 fr: ×1.35, blur → 10 |
| Tunnel palette | measured on a blue brand: field `#0035A2`–`#003ECC`, mouth `#000214`, rim crescent brighter. Ours: a 5-step ramp ink → deep → core → hot → spark built from the brand accent |
| Tunnel dive | 0 → 1 over 20 fr, then 5 fr black |
| Light-on (object) | 14 fr S-curve; halo lags 5 fr and builds over ~30 fr |
| Halo | tight core-accent ≈ 2.3× the object + deep field ≈ 6× the object reaching the frame edge; only the object core goes white-hot |
| Text flare | up 9 fr to 1.6×, down 9–12 fr |
| Push-in on a held logo | reference +0.75 %/fr (fast); our end card 1.00 → 1.025 over 150 fr, decelerating to still |
| Zoom-through exit | per-frame growth 1.01 → 1.18 over 29 fr, then 1 glow frame and 5 black |
| Lights-off | halo dies in 15 fr, object in 30 fr, then 5 fr black |
| Rim light-on | 12 fr ease-out |
| Rim geometry | radius ≈ 0.39–0.42 W, centre ≈ 1.3 H, top at 0.60–0.62 H; core 4–5 px; glow falloff 9 / 18 / 27 / 36 / 90 px |
| Particles | column pitch 15 px at 1080p, dots 2–3 px at ~4 px pitch, columns vary 40–100 %, 2–3 k dots per shape |
| Typed URL | 2.5 fr per character |
| Logo settle | no overshoot in any studied reference: `heavy` (ζ ≈ 0.91, < 0.1 %) stretched to 30 fr |
| Glass mark | 7 strips, stagger 2 fr, `heavy` flips, settle 30 fr, mark dim 0.55 before its light-on, one glint 22 fr |
| End card | mark lights on with a 0.94 → 1 `heavy` settle (or FLIPs from the previous shot); wordmark tracks in from blur by letter offsets (layout fixed); line reveals word by word, 2 fr; URL types at 2.5 fr/char with a block cursor; card pushes in 2.5 % and stops. `pace` < 1 speeds wordmark → line → URL (0.6 completes with ~1.3 s left to hold in a fixed-length film). Layout: row in 16:9, stack with a balanced two-line tagline in 9:16 |

How each one is built (short):
- **Brand tunnel** (canvas, per pixel at frame/3): polar coordinates around a drifting vanishing point; depth z = 1/d,
  u = 0.85 z + travel; a 96 × 64 table of 4D noise (seamless in angle and depth) sampled twice: broad patches and long
  streaks (4× angular, 0.18× depth) streaming outward; walls lit by cos(angle − light)²; mouth fades by smoothstep; rim
  crescent at 1.1× the mouth radius drifting ~10°/s; ±1 LSB hash noise before the LUT (no banding). Optional ordered-dither
  look: 8 × 8 Bayer into the 5-step ramp at 3 px cells, every third row at 70 %.
- **Portal**: the word is laid out around the disc centre; ascent and x-height read from canvas after the font loads, so
  the disc sits on the x-height band and shares the baseline. After the zoom only the next scene renders: same tree, no pop.
- **Glass mark**: the mark's alpha is the glass shape (`mask-image`, any SVG/PNG). Each strip = clean mark (fades in as the
  glass clears, carries the light-on) + masked tint + displaced copy (refraction; displace before the mask so the silhouette
  stays crisp) + blurred hot copy sliding against the motion (caustic) + a specular band flashing when the strip angle
  crosses ~24°. Then one clean layer replaces the strips (no seams); halo and under-bloom light it; one glint crosses.
- **Horizon arc**: atmosphere + blurred core/hot strokes, then the black body, a 4.5 px spark rim and an anamorphic flare
  (σ 70 × 3.5); a radial mask dims the rim away from the top; rises on `heavy`.
- **Bloom**: one SVG filter: blur at r × 0.3, r, r × 3, summed additively, then added (light) or merged under (`under`).
- **Particle form**: sample the image once on a column grid, skip transparent and black samples, fly each dot in on
  `outQuint` with a decaying noise curl; columns flash on arrival; two canvas glow passes (blur r and 3r, `lighter`).

## Choreography

Close A, light (5.5 s): horizon arc rises (`heavy`, 30 fr) → rim light-on 12 fr → glass mark assembles (7 strips, 2 fr
stagger, settle 30 fr) → light-on 14 fr, halo +5 fr → glint 22 fr → end card FLIP from the mark → wordmark, line, URL →
hold ≥ 2–3 s with the 2.5 % push decelerating to still.

Open B, portal (mid-film transition, 3 s): statement "Every invoice. One place." → portal zoom out of the "o" of "One"
(10 fr) into the brand tunnel → two depth phrases ("Sent." "Chased." 5 fr in, 4 fr out each) → dive 20 fr → 5 fr black
→ hard cut into the product UI.

## Components

`LogoReveal` and `EndCard` (studio list; `CreditCard` is opt-in only). `PortalZoom`, `PortalWord`, the brand tunnel,
`DepthPhrase`, `HorizonArc`, `GlassMark`, `Bloom`, `ParticleForm` may not exist: verify the API in studio/API.md; if missing,
build them inside the film/recipe folder from the Numbers.

```tsx
<GlassMark src={brand.logo} width={420} height={420} at={20} strips={7} stagger={2} settle={30} glint />
<EndCard mark={brand.logo} wordmark={brand.name} line="Paid in days." url="acme-ledger.example" at={0}
  markFrom={{x, y, width}} pace={0.6} />
<PortalZoom at={42} size={portalSizeFor(160)} outgoing={<PortalWord before="" after="ne place." />}>{next}</PortalZoom>
```

## Sound

Gains on −3 dBFS assets; subtract 6 dB under VO.

| Event | Audio id | When | Gain |
|---|---|---|---|
| portal zoom | `whoosh` | starts 5 fr before the zoom, ends on its last frame | −10 dB |
| depth phrase passes the camera | `swoosh-short` | phrase exit | −14 dB |
| tunnel dive | `whoosh` | ends on the first black frame | −10 dB |
| black breath | `silence-beat` | the 5 black frames | music to 0 |
| horizon rim / mark light-on | `swell` | light-on start | −14 dB |
| glint | `shimmer` | glint start | −16 dB |
| particles gather | `shimmer` + `whoosh` | gather start / arrival | −16 / −12 dB |
| end card mark settles | music tail or one soft tone (`swell`) | settle frame | −14 dB |
| typed URL | `type-click` | each char | −20 dB |
| lights-off | none; music out | | |

## Pitfalls

- Banding on black: CSS gradients are 8-bit and H.264 turns contours into blocks; a grain overlay does nothing on
  near-black. Add dither inside halos (grain in screen mode, masked by the halo's own gradient) and render the close at CRF 16;
  expect 1-step blocks in the mp4 even when the PNG is smooth (craft/06#banding-and-encode).
- Logos keep their colours: use under-bloom; additive bloom at 0.9 turned a blue mark cyan-white.
- Pixel marks: pass the pixel grid (rows × columns) and `pixelated`; strips must never split a pixel row; the assembled mark
  is one layer.
- Inline palette objects re-key the tunnel LUT every frame: keep the palette a module constant.
- Light-on vs dim: dim only the clean mark (0.55) before its light-on; dimming the whole glass turns it grey.
- On an ordered-dither look, text gets a hard halo (stroke under fill), never a blur.
- Showreel stacking: max one brandmark device per beat, two per film.

## Techniques

`portal` · `tunnel` · `kinetic-depth` · `horizon-arc` · `glass-mark` · `light-on` · `bloom` · `particle-form` · `end-card` ·
`zoom-through` · `smash-cut-black` · `push-in` · `dither` · `glow` · audio: `whoosh` · `swoosh-short` ·
`silence-beat` · `swell` · `shimmer` · `type-click`
