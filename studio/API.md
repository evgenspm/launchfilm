# launchfilm studio API

What agents read instead of the code. Every export, one line each, grouped by folder. Paths are relative to `studio/`.

## Conventions

- **Imports.** Recipes and films import from barrels: `../../src/presets`, `../../src/components`, `../../src/brand`,
  `../../src/film` (from `films/<slug>/`), or `../../presets` etc. (from `src/recipes/<id>/`).
- **Units.** Sizes are px at 1080p and scale with the frame (`useVideoConfig`). Frame numbers in presets and recipes are
  "frames at 30 fps" unless a prop says seconds; components scale by `fps / 30` where noted. film.json uses seconds.
- **Brand.** Everything reads colours, fonts and radius from `useBrand()`. Re-skin by wrapping in
  `<BrandProvider brand={…}>`, never by editing a component. Most family components also take `theme?: Partial<…>`.
- **Determinism.** Everything is a function of `useCurrentFrame()` and props. Randomness only via `random(seed)` from
  remotion or seeded noise. No `Math.random`, no `Date`.
- **Springs.** Never inline a spring config: use a name from `springs` (or a family's named set). Add new ones to
  `src/presets/springs.ts` with a comment.
- **Fonts.** Anything that measures text must call `useFontsReady([...])` first (`BlurIn`, `StatementSequence`,
  `WordSwap`, `FitWord`, … already do).
- **Composition ids** allow `a-z A-Z 0-9 -` only. Films: `<film.id>-16x9`. Recipes: `<recipe id>`.

## Registration (src/Root.tsx)

| Where | Must export | Registered as |
|---|---|---|
| `films/<slug>/index.tsx` | `compositions` (use `filmCompositions`) | Folder `films/<slug>` (folder name stripped to `a-z0-9-`) |
| `src/recipes/<id>/index.tsx` | `compositions` and `recipe` (the parsed recipe.json) | Folder `recipes/<recipe.family>` |
| `src/cookbook/showcase/<Name>Showcase.tsx` | `showcase: {id, component, durationInFrames, width?, height?, fps?}[]` | Folder `showcase` |

Folders without `index.tsx` (a recipe with only recipe.md + recipe.json) are skipped. A module that throws while loading
is skipped with a console error. Built-in compositions: `Cookbook` (58.5 s reference film of the core presets, a label
on every section names the code), `BrandSheet` (the five demo brands), `sample-16x9` / `sample-9x16` (3 s smoke test).

Render: `npx remotion render <id> out/<file>.mp4`, `npx remotion still <id> out/<file>.png --frame=<n>`,
other props with `--props='{"aspect":"9:16"}'`. GL backend: ANGLE on macOS/Windows, `swangle` on Linux; override with
`REMOTION_GL=swangle|egl|vulkan|angle|angle-egl|swiftshader` (remotion.config.ts).

---

## brand/ — `src/brand`

Data shape (`types.ts`, schema `schemas/brand.schema.json`):

```jsonc
{
  "id": "acme", "name": "Acme", "tagline": "…", "url": "acme.dev", "theme": "dark" | "light",
  "colors": {"bg": "#…", "fg": "#…", "accent": "#…", "accent2": "#…", "muted": "#…", "surface": "#…"},
  "fonts": {"display": "Inter", "text": "Inter", "mono": "JetBrains Mono"},   // or {family, src: "brand/fonts/X.woff2", weight?, fallback?}
  "logo": {
    "mark": "brand/mark.svg",           // svg/png under public/  — OR an inline vector {viewBox, paths:[{d, fill?, opacity?, fillRule?}]}
    "wordmark": "Acme",                  // text wordmark (default: name); the wordmark is always text
    "wordmarkFont": "display" | "text" | "mono", "wordmarkWeight": 700, "wordmarkTracking": -0.02, "wordmarkCase": "none" | "lower" | "upper"
  },
  "radius": 14,
  "typography": {"displayWeight": 600, "displayTracking": -0.02, "displayLineHeight": 1.12, "textWeight": 400}
}
```

`logo.src` is accepted as an alias of a string `mark`. No mark at all → a monogram tile in the accent. Inline path
`fill` may be a hex or a token name (`accent`, `accent2`, `fg`, `bg`, `muted`, `surface`).

- `Brand`, `BrandColors`, `BrandFont`, `BrandLogo`, `InlineMark`, `MarkPath`, `BrandTypography`, `ThemeMode`, `FontRole`, `ColorToken`, `ResolvedBrand` — types.
- `BrandProvider` — `brand: Brand, children`: puts a brand in context and starts loading its fonts.
- `useBrand()` → `ResolvedBrand`: the brand (or `DEFAULT_BRAND`) plus `font.{display,text,mono}` (CSS stacks) and `type.{displayWeight, displayTracking, displayLineHeight, textWeight}`.
- `DEFAULT_BRAND` — neutral dark house style used without a provider. `resolveBrand(brand)` — the same resolution, outside React.
- `tracking(em)` — `-0.02` → `'-0.02em'`.
- `BrandMark` — `size` (height px), `brand?`, `color?` (force one colour), `style?`: the mark (image, inline vector or monogram tile).
- `Wordmark` — `size` (font px), `brand?`, `color?`, `style?`: text wordmark styled from `brand.logo`.
- `Lockup` — `size`, `brand?`, `color?`, `gap?`, `style?`: mark (1.15× size) + wordmark in a row.
- `DEMO_BRANDS` / `DEMO_BRAND_LIST` / `DemoBrandId` — five fictional brands: `lumenfold` (dark AI tool, Geist, violet), `tallyfield` (light SaaS analytics, Inter, blue), `shellpine` (dev tool, JetBrains Mono, lime on green-black), `plumday` (light consumer app, Unbounded + Manrope, tangerine, radius 28), `northfern` (dark fintech, Manrope 800, mint + gold).
- `VENDORED_FONTS` — Inter, Geist, Geist Mono, JetBrains Mono, Manrope, Unbounded (OFL variable woff2 in `public/fonts/`, manifest + OFL.txt per family).
- `ensureFont(font)` — load a family once (vendored by name, others need `src`); `fontStack(font, kind?)` — CSS stack; `fontFamily(font)`; `firstFamily(stack)`; `fontReady(stacks[])` — promise; `loadAllVendoredFonts()`.
- `useFontsReady(specs[])` — specs like `` `600 100px ${b.font.display}` ``; holds the render until loaded, returns `ready`.
- `alpha(hex, a)`, `mix(a, b, t)`, `rgbOf(hex)`, `luminance(hex)`, `contrast(a, b)`, `onColor(bg)` (black or white text on bg), `tokenColor(c, colors, fallback?)`.

---

## presets/ core — `src/presets`

### springs.ts / easings.ts
- `springs` — `snappy` (text/logos land, small overshoot) · `ui` (no bounce ~600 ms, morphs, re-flow) · `layout` (stiff container growth) · `pop` (cards/badges) · `bouncy` (sparkles) · `click` (press 1→0.9→1) · `cameraIn` (zoom in, slight bounce) · `cameraOut` (soft zoom out) · `cameraSnappy` (follow a click) · `drag` · `heavy` (hero objects, cores) · `chartBar` · `maskRise` (letter mask rise, ~10 % overshoot) · `marker` (highlighter) · `settle` (cards landing, no overshoot). `SpringName`.
- `easings` — `outExpo` (default entrance) · `outQuint` · `outCubic` · `outQuad` · `inExpo` (exits, zoom-through) · `inQuad` · `inOutSine` (camera, Ken Burns) · `inOutCubic` · `outBack` · `linear` · `stepped(n)`. `css` — the same curves as CSS strings. `EasingName`.

### timing.ts
- `sec(s, fps)`, `ms(m, fps)` → frames. `D` — durations in ms (micro 200, enter 400, exit 250, move 600, wordReveal 300, charType 45, cameraTier 800, zoomThrough 700, holdWord 400, holdLine 1200, holdResult 4500).
- `STAGGER` — frames at 30 fps (chars 1, words 2, items 2, cards 5, phones 5); `stagger(i, gap, fps)`.
- `progress(frame, start, dur)` — clamped 0..1.
- `BeatsJson` `{bpm, beats[], downbeats?, duration}` (seconds); `beatsFromBpm(bpm, duration, offset?)`; `beatGrid(beats, fps)` → `{bpm, framesPerBeat, frames, beatFrame(n), downbeatFrame(n), snap(frame), pulse(frame, decay?)}`; `BeatGrid`.
- `Word` `{w, s, e, emph?}`, `Phrase` `{text, s, e, emph?}`, `WordsJson` `{text, duration, words[], phrases?}`, `CaptionsJson` `{phrases[]}` — the CLI's words.json contract (seconds from the VO file start).
- `wordsToFrames(words, fps, at?)`, `sentences(words)`, `estimateWords(text, start?, wps?)` (2.8 words/s placeholder timings).

### camera.tsx
- `ZOOM_TIERS` — `establishing` 0.86 · `region` 1.1 · `element` 1.75 · `detail` 2.75 (move one tier at a time). `ZoomTier`.
- `Camera` — `keyframes: {frame, scale?|tier?, x?, y?, config?}[]`, `style?`: additive spring moves (cameraIn in, cameraOut out). `useCamera(keyframes)`.
- `KenBurns` — `from=1, to=1.05, dx, dy, durationInFrames?`: slow push across the parent Sequence.
- `ZoomThrough` — `startFrame, durationInFrames=21, to=40, origin='center'`: fly into the children (inExpo); put the next scene behind.
- `FrameInFrame` — `width, height, glow? (accent), from=1, to=1.15, background='#000'`: the shot inside a glowing card.
- `FocusCamera` — `keys: FocusKey[] ({frame, focus: Rect|'full', pad?=0.08, zoom?, anchor?: 'start'|'center', config?}), stage={w:1920,h:1080}, backdrop?, radius=14, shadow=true, fullMargin=0.93`: frames a rect of a fixed-size stage; recomposes per aspect without letterbox (crop aspects never go below cover scale), log-scale springs, clamped to the stage edge.
- `useFocusCamera(keys, stage, fullMargin?)` → `{s, cx, cy, tx, ty, W, H}`; `stageToFrame(cam, x, y)` — stage point → frame px. `Rect = [x, y, w, h]`, `Size = {w, h}`.

### cursor.tsx
- `Cursor` — `keyframes: {frame, x, y, click?, drag?}[], kind 'default'|'pointer'|'text', kindAt?, size=1.6, ripple=true, rippleColor?, hideBefore?`: spring path (snappier near clicks), click squash, expanding ring, real macOS cursor shapes (@remotion/mac-cursors).
- `resolveCursor(kfs, frame, fps)` / `useCursor(kfs)` → `{x, y, scale, clicking}`; `clickFrames(kfs)` — frames for click SFX.

### text.tsx
- `Typewriter` — `text, start, cps=16, seed, caret, caretColor, style`: inline human-cadence typing (seeded jitter, punctuation pauses), inherits font.
- `useTypewriter(text, start, cps?, seed?)` → `{typed, done, typing, caretOn}`; `typedCount(...)`, `typeDuration(text, fps, cps?, seed?)`, `keystrokeFrames(text, start, fps, cps?, seed?)` (key-click SFX frames).
- `VOTypewriter` — `words: Word[], at?, caret, glow, style`: caption typed in sync with VO word timings, one sentence at a time.
- `WordReveal` — `text, startFrame, gap=2, duration=14, style`: word-by-word blur reveal, balanced wrap.
- `Caption` — `children, enter 'block'|'slide'|'none', pulse (0..1 from beatGrid.pulse), scrim, style`: hero caption over footage.
- `WordPerCut` — `words: {text, from, background?, color?}[], until?, style`: one word per shot, hard cuts.
- `FitWord` — `text, fill=0.8, startFrame, weight=800, color?, maxSize=600, style`: one word filling the frame width.
- `Scatter` — `text, mode 'explode'|'assemble', startFrame, durationInFrames=15, seed, style`: 3D letter scatter.
- `StackedRoll` — `text, rows=9, radius=150, secondsPerTurn=6, colors?, style`: rolling text drum.
- `Highlighter` — `children, startFrame, color? (accent2), ink?, style`: marker sweep behind a word; the word switches to a readable ink.
- `Sticker` — `src, width, stroke=8, rotate=-2, startFrame, style`: cutout image with white stroke, pops in.
- `MemeWord` — `src, width, startFrame, seed, style`: image word with a 6-frame shake (once per film).
- `QuietClose` — `text, startFrame, cps=40, align, serif=true, style`: small line typed on the brand bg.

### statement.tsx (family: statement)
- `StatementSequence` — `statements: Statement[], startFrame?, gap=4, theme?, fontSize?, fontWeight?, maxWidth? (0.84 W), align, push=[0.985, 1.03]|false`: one claim per beat, per-word entrances, scale creep, short exits, eyebrow 4 fr before, sub 10 fr after.
- `Statement` — `{text ("\n" = break), from?, to? (absolute frames: entrance start / exit start), hold?, enter?, exit?, emphasis? {words, mode 'accent'|'dim'|'both', at?, frames?, dimTo?, weight?}, wordStarts? (VO onsets), eyebrow?, sub?, color?, fill?, sweep?, fontSize?, fontWeight?}`.
- `BlurIn` — `text, startFrame, enter?, exitFrame?, exit?, theme?, fontSize?, fontWeight?, color?, fill? (gradient in letters), sweep?, emphasis?, maxWidth?, align, push? {from,to,frames}, layout 'center'|'inline', style`.
- `WordSwap` — `before, words[], after?, startFrame, at? (frames of words[1..]) | every=18, mode 'slot'|'blur', enter?, exitFrame?, exit?, theme?, fontSize?, fontWeight?, color?, slotColor? (accent), maxWidth?, stack?, style`: one slot cycles, the sentence re-flows on `springs.ui`.
- `FieldType` — `script: FieldOp[], startFrame=12, enterFrame, focusFrame?, seed, label?, placeholder?, mask?, meter? {target, segments?, colors?}, width?, fontSize?, theme?, layout, style`: an input with scripted typing. `FieldOp` = `{type, perChar?, jitter?} | {wait} | {erase, perChar?} | {wipe} | {submit}`.
- `fieldTimeline(script, startFrame?, seed?)` → `{states, events (key/erase/select/clear/submit frames for SFX), submits, end, at(frame), lastEvent(frame)}`.
- `TYPE_ENTER` — `blurDrop` (default: per word, stagger 2, blur 0.12 em, drop 0.2 em, outExpo 12) · `rise` · `springRise` · `mask` (per letter in a clip, maskRise) · `lens` (whole line, blur + scale 1.1→1) · `cut`. `TYPE_EXIT` — `fade` (default, 5 fr) · `up` · `lift` · `cut`. `EnterSpec`, `ExitSpec`, `EnterName`, `ExitName`, `resolveEnter`, `resolveExit`.
- `scheduleStatements(statements, fps, startFrame?, gap?)`, `statementsFromWords(words, fps, {lead?, gap?, enter?, exit?})` (one statement per sentence, words on VO onsets), `autoHold(text, fps)`, `enterLength(text, spec)`, `statementSize(w, h)` (10 % of H, capped at 10 % of W), `enterState`, `exitState`, `typeSprings`.
- `TypeTheme`, `typeThemeFromBrand(brand)`, `useTypeTheme(theme?)` — display font for statements, mono for labels.

### look.tsx
- `Grain` — `opacity=0.1, size=0.9, blend='overlay'`: seeded per-frame film grain.
- `Vignette` — `amount=0.3, color='0,0,0'`. `Scanlines` — `size=4, opacity=0.25`. `Scrim` — `direction 'center'|'bottom'|'top', amount=0.35`.
- `RGBSplit` — `amount=2, glitch, every=4, seed, children`. `Glitch` — `scale=20, every=3, children` (turbulence displacement). `SliceGlitch` — `active, bands=8, shift=40, seed, children`.
- `BlockResolve` — `durationInFrames=20, cell=24, tones?, seed, children`: static blocks clear to reveal the shot.
- `Flash` — `atFrame, frames=3, color? (accent), peak=1`.
- `Surface` — `dark?, radius? (brand), background? (brand surface), style, children`: floating card with hairline and soft shadow.
- `FilmLook` — `grain=0.1, vignette=0.3, children?`. `BrandBackdrop` — `glow=0.16, x=0.5, y=0.42, color? (accent), style`: brand bg with one soft glow.

### transitions.tsx (ids from craft/vocabulary.md#transitions)
- `TRANSITIONS` — per id `{frames (at 30 fps), overlap, sfx?, note}`: `hard-cut` 0 · `match-cut` 0 · `mask-wipe` 14 · `blur-dissolve` 10 · `slide-push` 14 · `flash` 3 · `glitch-cut` 4 · `zoom-through` 14 · `portal` 18 · `smash-cut-black` 9. `TransitionId`.
- `ShotTransition` — `enter? {id, frames?, opts?}, exit? {id, at (local cut frame), frames?, opts?}, children`: wrap a shot inside its Sequence; extend the outgoing Sequence by `transitionOverlap(id, fps)`.
- `transitionStyle(id, p, 'in'|'out', {width, height}, opts?)` → CSS; `TransitionOpts` = `{direction?, shape? 'circle'|'linear'|'diagonal', origin? [x,y] 0..1, color?}`.
- `transitionFrames(id, fps)`, `transitionOverlap(id, fps)`, `CutFlash` (`at, frames?, color?`), `useTransitionProgress(start, id)`.

---

## presets/ families — `src/presets` (numbers in `craft/families/*.md`)

### notifications.tsx
- `NotificationStack` — `items: NotifItem[] ({at, out?, app?, title, body?, time?, glyph?, tint?, icon?, entrance?}), variant 'phone'|'desktop', layout 'stack'|'list', width?, maxVisible?, entrance 'land'|'slide'|'rise'|'materialize', landFrom?, theme?, style?`: cards arrive and stack with depth scale/opacity/blur.
- `BannerStack` — NotificationStack with desktop defaults (slide from the right, list, 3 visible). `NotifCard` — `item, variant?, width, contentOpacity?, theme?`: one static card.
- `PillMorph` — `at?, closeAt?, height=150, width?, fill?, color?, leading?|false, initials?, label, trailing?|false, timing?, fontSize?, theme?, style?`: dot → capsule → label → avatar → badge.
- `IslandPill` — `at, closeAt?, content {eyebrow?, label, w?, trailing?, tone 'live'|'done'}, updates?, collapsed?, height=72, pulses?, ring?, theme?, style?`: top-centre pill that springs open and swaps lines.
- `AgentOrb` — `size=320, enterAt?, exitAt?, amplitude?, energy?, pulses?, enterFrom?, palette?, seed?, theme?, style?`: breathing accent-light sphere. `orbPalette(theme)`.
- `StatusCard` — `at, exitAt?, title, status?, live?, rows?: {label, meta?, state 'live'|'now'|'todo'|'done', doneAt?}[], width?, entrance 'land'|'rise'|'materialize', rowStagger?, typeTitle?, theme?, style?`.
- `AgentBrief` — `at?, cards: (StatusCardProps & {delay})[], orbSize?, cardWidth?, greeting?, greetingHold?, direction 'row'|'column', orb?, push?, theme?`.
- `LiveBars` — `height, bars?, color?, seed?, active?`. `TrailType` — `text, at?, cpf?, tail?, style?`. `RimArc` — `size?, cx?, cy?, rotateFrom?, rotateTo?, intensity?, color?`.
- `NotifGlyph` — `kind mail|chat|calendar|call|doc|spark|check|bell, size, color?, stroke?`. `AppTile` — `size, glyph?, tint?, children?` (neutral squircle). `Initials` — `text, size, theme?`. `VerifiedSeal` — `size, color?, ink?`.
- `NotifTheme`, `notifThemeFromBrand(brand)`, `useNotifTheme(theme?)`; `notifSprings` (badge, island, banner), `notifEase`, `NOTIF_T`, `PILL_T`; `notifCues.stack(items)` / `.pill(at)` / `.island(at, updates?, closeAt?)` → `{frame, kind}[]` SFX cues.

### converge.tsx
- `Converge` — `items, at?, stagger?, duration?, from?, band?, seed?, order?, swirl?, ghosts?, streak?, enterAt?, target?, core? (s)=>node, coreSize?, shockwave?, logoSafe?, theme?`: fragments pulled into a core, shockwave on the last arrival.
- `OrbitRing` — `items, core?, radius?, tilt?, axis?, speed?, startAngle?, angle?, spin?, perspective?, scaleByDepth?, faceOut?, depthBlur?, farOpacity?, farDim?, ring?, enter?, contract?, x?, y?, logoSafe?, theme?`: depth-sorted orbit / carousel.
- `ItemWheel` — `items, children?, radius?, tilt?, speed?, startAngle?, angle?, scale?, perspectiveRatio?, offsetX?, offsetY?, depthBlur?, farOpacity?, enterFrames?`.
- `DepthField` — `items, positions?, volume?, seed?, clearCenter?, camera?, cameraAt?, focus?, dof?, maxBlur?, perspective?, drift?, sway?, farDim?`: cards in 3D with dolly and rack focus.
- `FragmentCard` — `variant message|email|event|tab|call|doc|tool, who?, title?, body?, meta?, glyph?, width?, glow?, lit?, accent?, logo? (your own image), app?, theme?, style?`.
- `CoreOrb` — `size?, energy?, pulse?, presence?, color?, rings?, body 'orb'|'lens', seed?, theme?, style?`. `ProgressRing` — `value?, at?, duration?, to?, easing?, radius?, stroke?, color?, track?, startAngle?, direction?, cap?, glow?, label?, theme?`.
- `Shockwave` — `at, size?, duration?, color?, x?, y?, width?`. `LightBurst` — `at, frames?, size?, x?, y?, strength?, color?`. `ConvergeBackdrop` — `glow?, x?, y?, dots?, color?, theme?`. `LineGlyph` — `name (chat, mail, calendar, globe, wave, doc, bolt, layers, check, person, code, folder, spark, phone, list), size?, color?, stroke?`.
- `project(p, f)`, `ringPoint(deg, r, tilt, axis?)`, `hitPulse(frame, at, decay?)`, `glowShadow(size, amount?, color?)`, `corePresence(frame, at, fps)`, `Vec3`; `CONVERGE`, `convergeEasings`; `ConvergeTheme`, `convergeThemeFromBrand`, `useConvergeTheme`.

### list.tsx
- `ListAssemble` — `events: ListEvent[], width=940, size=1, theme?, header? {title, date?, at?, countLabel?}, focusLabel='Right now', choiceLabels?, style`: a list that maintains itself (placed top-left; centre it with `listHeight`).
- `ListEvent` — `{at, type}`: `add` (task, index?, enter 'drop'|'rise'|'write', glow?) · `done` · `move` (to) · `order` (ids) · `stale` (label?, choice, …) · `focus` (id|null) · `update` (patch) · `remove`. `assemble(tasks, startFrame, {gap=4, enter})` builds an add cascade.
- `TaskRow` — `task {id, title, source?, meta?, logo?, label?}, height, state?, size, width, theme, focusLabel, choiceLabels`.
- `PromptBar` — `text, startFrame=0, cps=30, sendAt?, exitAt?, placeholder='Ask anything…', width=900, size=1, theme, seed`: types with a colour trail, sends with a ripple, shimmers while thinking.
- `ThinkingState` — `label='Thinking', lines[], startFrame, lineGap=5, resolveAt?, children (revealed at resolve), variant 'spinner'|'dots'|'pulse', width=760, size, theme`. `Spinner` — `size=20, color?, start=0`.
- `SourcePipeline` — `title='Context', stages[{label, sub?, source?, at, doneAt?}], startFrame, pendingVisible, cps=60, width=640, size, theme`. `ContextChip` — `label, startFrame, count?, countFrom, countAt, items[], openAt?, checkIndex?, checkAt?, size, theme`.
- `TypeLine` — `text, start, color, cps=30, trail 'color'|'fade'|'none', trailColor?, trailFrames=5, jitterMs=15, seed`. `SourceTag` / `SourceGlyph` — generic glyphs for `ListSource` = chat|mail|call|screen|code|calendar|doc.
- `simulateList`, `evalTrack`, `listHeight(events, frame, fps, size?, width?, header?)`, `shimmerStyle(...)`, `typeSchedule(...)`, `listMetrics`, `LIST_T`, `listSprings`, `ListTheme`, `listThemeFromBrand`, `useListTheme`.

### screen.tsx
- `ScreenSlot` — `width=1512, height=982, radius, label, note, chrome 'none'|'menubar'|'window', showSlots, island/sidePanel/banner, grid=56, color? (accent), children`: the product placeholder; pass your UI as children.
- `TiltPlane` — `width, height, rotateX/Y/Z, scale, dolly, perspective, pan, start, duration, ease, tiltEase, tiltDuration, dof?|false, spot?|false, sweep?|false, haze, hazeColor?, background?, children` (any prop a number or [from, to]): flat UI leaned back in 3D.
- `Dolly` — `from/to {x, y, scale, rotate, z, rotateX, rotateY, perspective}, start, duration, ease=inOutSine, spring? (SpringName), mode 'flat'|'3d', children`; `Depth` — `z, children` inside a 3D Dolly.
- `RackFocus` — `layers[{node, depth, style?}], from, to, start, duration=18, ease, maxBlur=14, range=1, breathing=0.012`; `rackBlur(depth, focus, maxBlur, range)`.
- `LaptopFrame` — pose `{open, yaw, elevation, roll, x, y, scale, screen, exposure, push}` + `width?, perspective?, screenContent? (authored at 1512×982), keyboardBlur, fill=1.04, supersample, body, glowColor?, background?`: drawn 2.5D laptop, no logo, no model file.
- `LaptopReveal` — `from/to, riseAt/riseFrames/riseDistance, openAt/openFrames/openFrom/openTo, screenFrames, pushAt|false, pushFrames` + LaptopFrame props: rise → lid → screen on → push-in.
- `useShotProgress(start?, duration?, ease?, springName?)`, `easeInThenLinear(a?)`, `planeDepthGradient(rx, ry, rz)`, `resolveLaptopPose`, `laptopGeometry`, `SCREEN_MEASURED`, `screenEasings`, `LAPTOP_DISPLAY`, `LAPTOP_SLOTS`, `Anim`, `Framing`.

### brandmark.tsx
- `GlassMark` — `mark?, width, height?, at?, strips?, axis 'x'|'y', grid?, spread?, stagger?, order?, settle?, dim?, pixelated?, halo?, glint?, light?, palette?, seed?, style?`: the mark assembles from glass strips, lights on, a glint sweeps. `glassMarkDone(strips?, opts?)`.
- `ParticleForm` — `mark?, width, height?, x?, y?, at?, duration?, spread?, pitch?, dot?, from 'scatter'|'left'|'right'|'sides'|'below', mode 'gather'|'scatter', colorMode?, glow?, flicker?, minLum?, blend 'add'|'normal', palette?, seed?`: canvas dots gather into the mark. `particleFormDone(opts?)`.
- `PortalZoom` — `at, duration?, size, x?, y?, outgoing, innerScale?, rim?, maxBlur?, palette?, children`: fly through a disc (e.g. the "o" of a word) into the next scene. `PortalWord` — `before?, after?, size, style, gap?`; `portalSizeFor(fontSize, xHeightEm?)`; `useFontMetrics(family, weight, size)`.
- `BrandTunnel` — `speed?, twist?, spin?, center?, hole?, drift?, dive?, exposure?, lightAngle?, look 'soft'|'phosphor', cell?, palette?, seed?, frame?`: procedural vortex in brand colours (dark brands).
- `HorizonArc` — `at?, rise?, lightAt?, lightFrames?, radius?, top?, travel?, sink?, intensity?, flare?, palette?, behind?, children?`: a lit planet rim rises.
- `DepthPhrase` — `text, at, until, style?`: phrase from depth past the camera. `Bloom` — `radius?, intensity?, color?, threshold?, field?, under?, fill?, style?, children`. `MarkHalo` — `width, height, amount, palette?`. `Dither` — `mask, amount?, style?`.
- `MarkSource` (string path | inline vector), `useMarkSource(mark?, aspect?)`, `markToSrc`, `markAspectOf`, `MarkPalette`, `markPalette(brand)`, `MARK_T`, `portalEase`, `lightCurve(frame, at, opts?)`, `lightsOff(frame, at, fps?)`.

---

## film/ — `src/film` (the engine)

A film is `films/<slug>/` = `film.json` + `brand.json` + optional `scenes.tsx` + `index.tsx`:

```tsx
import {filmCompositions} from '../../src/film/Film';
import brand from './brand.json';
import film from './film.json';
import {SCENES} from './scenes';               // optional
export const compositions = filmCompositions({film, brand, scenes: SCENES});
```

### film.json (schemas/film.schema.json; seconds; paths relative to `public/`, per-film media in `public/films/<slug>/`)

| Field | Meaning |
|---|---|
| `id` | composition id prefix (`a-z0-9-`) → `<id>-16x9`, `<id>-9x16`… |
| `fps`, `aspects[]` | 24/25/30/50/60; any of `16:9`, `1:1`, `4:5`, `9:16` |
| `duration?` | seconds; default = last shot / VO line + 0.4 s, plus the end card |
| `beats?` | `{bpm?, offset?, src? (beats.json)}` — the grid for `shots[].beat` / `.beats` |
| `shots[]` | `{id?, at? \| beat?, dur? \| beats?, scene? \| src?, trim?, crop? {per aspect: {x,y,w,h}}, punch? {at, scale, focus [x,y], out?}, drift? (1.03), size? [w,h], playbackRate?, transition? (INTO this shot), transitionOpts?, sfx? [{at (s into shot), sound? \| src?, volume?}], props?}`. Without `at`/`beat` a shot follows the previous one |
| `vo[]` | `{id, text, at (film s), src? (audio), words? (words.json), volume?}` |
| `music?` | `{src, level? (−20 LUFS), duck? (9 dB), trim?, at?, fadeIn?, fadeOut?, liftOnEndCard? (4 dB)}` — ducks under every VO line from word timings (150 ms attack, 400 ms release) |
| `sfx[]` | events `{at (film s), sound? \| src?, volume?}`; `sound` = audio id from craft/vocabulary.md → `public/sfx/<sound>.wav` |
| `subtitles?` | `{enabled, emph?, maxPerLine? (6), captions? (captions json for films without VO)}`; default on when there is VO |
| `endCard?` | `{dur, line? (tagline; null hides), url? (brand url; null hides), cta?, transition?}` — paced to finish ≥ 1 s before the end |
| `credit?` | `false` by default; `true` adds a tiny "Made with launchfilm" chip over the end card |
| `look?` | `{grain?, vignette?}` over the picture, under the subtitles |

**Script markup in `vo[].text`:** `*word*` = accent word in the subtitles (several allowed; multi-word marks accent each
word), `|` = forced subtitle phrase break. Without `src` a line is silent and its subtitles run on estimated timing
(2.8 words/s); with `words` they follow the measured words (phrases from words.json `phrases`, else pauses ≥ 250 ms,
sentence ends or 8 words). Subtitles: ≤ 2 lines, ≤ 6 words a line, never broken after "the / to / my…", on a plate in
the bottom safe area per aspect (16:9 10 % H, 1:1 12 %, 4:5 15 %, 9:16 22 % and 80 % width).

**Built-in scenes** (`shots[].scene`), so a film can be pure JSON: `title` (props `text?` = brand name, `sub?` = tagline,
`enter?`), `statement` (props `lines: (string | Statement)[]`, shared evenly across the shot), `caption` (`text`),
`logo` (`variant?: 'from-dot'|'glass'|'particles'|'draw'`), `blank`. A film's `scenes` override these names.

- `filmCompositions({film, brand?, scenes?})` → `<Composition>` per aspect with `calculateFilmMetadata`.
- `Film` — `film: FilmSpec, aspect, words?, beatsData?, captions?, scenes?`: the renderer (use inside a BrandProvider).
- `calculateFilmMetadata` — size per aspect, length, inlines words.json / beats.json / captions. `filmTimeline(film, fps, words?, beatsData?)` → `{shots: {shot, index, from, dur}[], endStart, total, grid}`; `filmGrid`, `lineSeconds`, `endCardPace`, `transitionSfx(film, fps)` (suggested SFX at cuts).
- `Scene` / `SceneProps` — `{shot, f, t, fps, dur (frames), aspect, wide}`; frames are local to the shot. `BUILTIN_SCENES`, `TitleScene`, `StatementScene`, `CaptionScene`, `LogoScene`, `BlankScene`.
- `FilmSpec`, `Shot`, `VoLine`, `MusicSpec`, `SfxEvent`, `ShotSfx`, `FilmProps`, `Crop`, `Punch`, `Aspect`, `ASPECTS`, `aspectSlug`.
- `Subtitles` — `words? | phrases?, at (s), emph?, tail=0.35, minHold=1, maxPerLine=6, bottom?, fontSize?, style?`. Helpers: `splitLines`, `toPhrases`, `estimatePhrases(text, wps?)`, `stripMarks`, `markedWords`, `safeBottom(w, h)`, `safeWidth(w, h)`.
- `VO` — `src, at (s), volume`. `Music` — `src, spans?, level?, duck?, attack?, release?, at?, trim?, fadeIn?, fadeOut?, end?, lift?`. `speechSpans(words, at?, bridge?)`, `duckGain(t, spans, opts)`, `dbToGain`, `mediaSrc`.
- `Sfx` — `sound? | src?, at (FRAMES), volume=0.8, durationInFrames?`; `sfxPath(sound)` → `sfx/<sound>.wav`.
- `FootageClip` — `src, trim (s), crop?, size=[1920,1080], punch?, drift=1, durationSec?, playbackRate, volume=0, style`: cover-crop per aspect, punch-ins on cameraIn/cameraOut.
- `EndCard` — `line?|null, url?|null, cta?, at, layout 'auto'|'row'|'stack', pace=1, glow=0.14, cursor=true`: mark lights on, wordmark tracks in from blur, line word by word, URL typed with a block cursor, push 1→1.025. `endCardFrames(fps, line, url, pace)`.
- `CreditCard` — `text='Made with launchfilm', corner`: off unless `credit: true`.

---

## components/ — `src/components` (product-scene blocks)

- `MacWindow` — `title?, width=1280, height=800, theme?, dots 'color'|'mono'|'none', toolbar?, sidebar?, sidebarWidth=260, background?, enterAt?, shadow, style, children`: neutral drawn desktop window. `SidebarItem` — `label, active?, count?`. `WINDOW_BAR` (52).
- `BrowserFrame` — `url?, typeUrlAt?, urlCps=22, tabs? ({title, active?, icon?}[] ≤ 3), width=1440, height=900, theme?, scrollY, pageBackground?, enterAt?, style, children`. `BROWSER_CHROME` (104).
- `PhoneFrame` — `height?, time='9:41', body?, screen?, statusColor?, statusBar, tilt? {x,y,z}, float, enterAt?, style, children`: drawn generic phone, punch-hole camera. `PHONE_ASPECT`, `phoneSafeTop(h)`.
- `Desktop` — backdrop props + `topBar, clock, menu[], dock? ({label, color?}[] neutral initial tiles) | false, dockBrand, dockAt?, children`. `DesktopBackdrop` — `blobs=4, intensity, colors?, drift, seed, style` (absolute; put content in an AbsoluteFill after it).
- `Keycap` — `at, keys[], kind 'tap'|'double'|'chord'|'hold', label?, hold?, scale?, bottom?`: appears 150 ms before the press, dips on it. `Keycaps` — `presses[], scale?, bottom?`. `keycapBottom(w, h)`, `keyPressFrames(presses, fps)`.
- `PromptBar`, `ThinkingState`, `Spinner` (from presets/list), `StreamText` — `text (**bold**, `code`, \n), start, wps=14, seed, cursor, fade=4, style`: answer streaming in seeded chunks. `streamSchedule`, `streamDuration`, `parseMarkdownLite`.
- `ChatBubble` — `role 'user'|'assistant', at?, avatar, fontSize=26, maxWidth, style, children`. `TypingDots` — `size?, color?`. `ChatThread` — `messages: {role, text, at, stream?, typingFrom?, wps?}[], width, height, fontSize, gap, avatar, padding, style` (bottom-anchored, rows grow in).
- `NotificationStack`, `BannerStack`, `NotifCard` (from presets/notifications); `ListAssemble` (presets/list); `ScreenSlot`, `LaptopFrame`, `LaptopReveal` (presets/screen).
- `LineChart` — `data: number[] | {values, color?, label?}[], width=900, height=480, start, duration=36, seriesStagger, area, curve 'smooth'|'linear', labels?, gridLines, zero, valueLabel, format, strokeWidth, style`: draws on.
- `BarChart` — `data: (number | {value, label?, highlight?})[], width, height, start, stagger=2, valueLabels, format, gridLines, gap, color?, style`: bars rise on `springs.chartBar`. `Chart` — `kind 'line'|'bar'` + that chart's props, `title?, figure?, card?`.
- `Counter` — `from=0, to, start, duration=45, easing, decimals, prefix, suffix, separator=',', rolling, fontSize=120, color?, font 'display'|'text'|'mono', weight?, style`. `formatNumber`, `counterValue`.
- `Stat` — `value, from, label, prefix, suffix, decimals, delta? {text, direction}, start, duration=40, rolling, size=132, align, accent, style`. `StatRow` — `stats[], start, stagger=5, size?, direction?, dividers, style`.
- `FeatureCards` — `items: {icon, title, body?}[], start, stagger=5, columns?, widthFraction?, variant 'surface'|'outline', highlight?, style`: cascade per aspect. `LineIcon` — `name (bolt, shield, chart, sparkle, clock, lock, link, layers, search, chat, globe, check, code, users, bell, wand), size, color, stroke`.
- `Testimonial` — `quote, name, role?, start, wordStagger=1.5, width?, fontSize?, stars?, style`: card settles, quote blur-reveals, initials avatar (no photos).
- `LogoReveal` — `variant 'from-dot'|'glass'|'particles'|'draw', startFrame, size?, wordmark=true, layout 'row'|'stack'|'auto', mark?, markAspect?, wordmarkScale?, background=true`: mark arrives, wordmark letters assemble 1 fr apart on `springs.snappy`. `logoMarkDone(variant, fps?)`, `logoRevealDone(variant, fps?, letters?)`.

---

## recipes/ — `src/recipes/<id>/`

Four files, schema `schemas/recipe.schema.json`. Golden example: `statement-sequence-launch` (copy its shape).

| File | Contract |
|---|---|
| `recipe.md` | when to use · beat sheet (`t \| picture \| motion \| transition \| sound`) · techniques linked to craft · what to adapt · pitfalls |
| `recipe.json` | `status: "built"` once Recipe.tsx renders; `techniques` only from craft/vocabulary.md; `components` = exported names used; `params` = props an agent can change |
| `Recipe.tsx` | one component taking `brand: Brand` + `content` (copy) + `aspect` (+ `fps?`, timing knobs); wraps itself in `<BrandProvider brand>`; a `calculate…Metadata` deriving size from `ASPECTS[aspect]` and length from content/fps; a `…Defaults` object with a demo brand and our own copy. No hard-coded frame size; timing in frames at 30 fps scaled by fps/30 |
| `index.tsx` | `export {recipe}` (import of recipe.json) and `export const compositions = <Composition id="<id>" component={…} defaultProps={…Defaults} calculateMetadata={…} />` |

New components a recipe needs live inside its folder; the curator promotes them to presets/components later.

- `StatementLaunch` (`statement-sequence-launch`) — `brand, content {eyebrow, name, claims[], close, sub?, accentWords?}, aspect, fps?, timing? {period=78, bpm?, firstExtra=11, closeHold=82}, glow=0`: keynote-style statements on a 78-frame grid. `statementLaunchSchedule`, `calculateStatementLaunchMetadata`, `statementLaunchDefaults`.

## cookbook/ — `src/cookbook`

- `Cookbook` / `COOKBOOK_FRAMES` / `cookbookSectionStart(n)` — reference film: 15 labelled sections (typewriter → scatter, caption + beat pulse + RGB split, frame-in-frame, stacked roll, word reveal, highlighter, VO typewriter, camera tiers + cursor, statement sequence, word swap, field type, zoom-through → quiet close, block resolve, FocusCamera, every transition through the film engine).
- `BrandSheet` / `BRAND_SHEET_FRAMES` — `brands?` (default the five demos): lockup, tagline, colour tokens, type specimens, radius.
- `sampleWords`, `sampleBeats` — timings for previews without audio.
- `showcase/*Showcase.tsx` — family demos registered under `showcase/`: notifications-*, converge-*, list-*, screen-*, logo-reveal-*, portal-zoom-tunnel, horizon-arc, components-*.
