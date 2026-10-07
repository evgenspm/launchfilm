# Extraction recipes

Run from the product repo root unless noted. Record every hit as `file:line` for BRAND-SOURCES.md.
These are read-only searches; never modify the user's product files.

## 1. Repo

### Find the candidates

```bash
ls tailwind.config.* postcss.config.* components.json 2>/dev/null
grep -rln --include='*.css' -e '@theme' -e ':root' -e '--background' . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist | head
grep -n '"tailwindcss"\|"next"\|"@fontsource\|"geist"' package.json
```

### Tailwind v4 (`@theme` in CSS)

```css
@theme {
  --color-background: #0b0b0f;
  --color-primary: oklch(0.62 0.19 259);
  --font-sans: "Inter", sans-serif;
  --radius-lg: 0.75rem;
}
```
Read `--color-*` (→ colors), `--font-*` (→ fonts), `--radius-*` (→ radius). Convert `oklch()` to hex (§ conversions).

### Tailwind v3 (`tailwind.config.{js,ts,cjs,mjs}`)

Look under `theme.extend.colors` and `theme.colors`: `primary`, `brand`, `accent`, `background`, `foreground`.
Nested scales (`brand: {500: '#4F46E5'}`): use 500/600 for accent, 50/100 for a light surface, 900/950 for a dark bg.
`theme.extend.fontFamily.sans|display|mono` → fonts. `theme.extend.borderRadius` → radius.
If values are `hsl(var(--primary))`, follow the variable into the CSS (shadcn).

### shadcn tokens (`globals.css`, `app/globals.css`, `src/styles/*.css`)

```css
:root { --background: 0 0% 100%; --foreground: 222 47% 11%; --primary: 221 83% 53%; --radius: 0.5rem; }
.dark { --background: 222 47% 11%; --foreground: 210 40% 98%; }
```
Space-separated HSL without `hsl()`. `221 83% 53%` → `hsl(221, 83%, 53%)` → `#2463EB` (§ conversions; keep the
decimals the file has, `221.2 83.2% 53.3%` gives `#2563EB`).
Pick the `:root` or `.dark` block the marketing site actually renders.

| shadcn token | brand.json field |
|---|---|
| `--background` | `colors.bg` |
| `--foreground` | `colors.fg` |
| `--primary` | `colors.accent` |
| `--secondary` or `--accent` (if distinct from bg) | `colors.accent2` |
| `--muted-foreground` | `colors.muted` |
| `--card` or `--popover` | `colors.surface` |
| `--radius` | `radius` (rem × 16 = px) |

### Plain CSS custom properties

`grep -rn -- '--[a-z-]*\(color\|brand\|accent\|bg\|text\)[a-z-]*:' --include='*.css' --include='*.scss' .` and read the
`:root` values. Ignore utility palettes (gray-100…900) unless nothing else exists.

### Fonts

| Pattern | Where | Gives |
|---|---|---|
| `import { Inter, JetBrains_Mono } from 'next/font/google'` | `app/layout.tsx`, `pages/_app.tsx` | family names, `weight` arrays |
| `localFont({ src: './Brand.woff2' })` | same | a local file: check its license before shipping |
| `"@fontsource/<family>"` or `"@fontsource-variable/<family>"` | package.json | family |
| `geist` package, `GeistSans` import | layout | Geist / Geist Mono |
| `@font-face { font-family: … }` | CSS | family + file |
| `font-family:` on `body`, `h1` | CSS | which family is text vs display |

Display = the family on `h1`/hero; text = `body`; mono = code blocks/`--font-mono`.

### Logo

```bash
find . -path ./node_modules -prune -o \( -iname '*logo*' -o -iname '*mark*' -o -iname '*wordmark*' -o -name 'icon.svg' -o -name 'favicon.svg' \) -print | grep -iv test | head -30
grep -rln --include='*.tsx' --include='*.jsx' -e 'function Logo' -e 'const Logo' -e 'LogoIcon' src app components 2>/dev/null
```
Prefer, in order: full wordmark SVG → mark SVG → inline JSX `<svg>` from a Logo component (copy the markup, convert
`className`→`class`, `strokeWidth`→`stroke-width`, keep `viewBox`) → PNG ≥ 512 px with alpha. Save both mark and
wordmark if both exist (`public/films/<slug>/brand/mark.svg`, `.../brand/wordmark.svg`).
SVG sanity: has `viewBox`; no `<script>`; no external `href`; `currentColor` fills → note that color comes from `fg`.

## 2. Live URL

Fetch HTML with the agent's web tool or `curl -sL <url>`. Read:

| Item | Selector / tag | Field |
|---|---|---|
| Theme color | `<meta name="theme-color">` | accent or bg (check which by eye on a screenshot) |
| Title, description | `<title>`, `og:title`, `og:description` | name, tagline (user's words) |
| Icons | `<link rel="icon">`, `rel="apple-touch-icon"`, `rel="mask-icon"` (SVG) | logo candidates |
| Social card | `og:image` | palette and type reference only, never the logo source if a vector exists |
| Header logo | first `<svg>` or `<img>` inside `header` / `nav` `a[href="/"]` | logo |
| Stylesheets | `<link rel="stylesheet">` → fetch → `:root` vars | colors, radius, fonts |
| Fonts | `fonts.googleapis.com` links, `@font-face` in fetched CSS | fonts |

If a headless browser is available (Playwright, or the agent's browser tool), read computed styles:
`getComputedStyle(document.body).backgroundColor`, `.color`, `.fontFamily`; the same on the primary CTA button and `h1`.
Record selector + value. Respect robots and login walls: if the site needs auth, use screenshots instead.

## 3. Screenshots

1. Ask for: hero section, one app screen, one dark/light variant if both exist.
2. Sample pixels (not by eye): with Python Pillow `Image.open(p).convert('RGB').getpixel((x, y))`, or
   `ffmpeg -i shot.png -vf "crop=1:1:x:y" -f rawvideo -pix_fmt rgb24 - | xxd -p`.
3. Sample at: page background (empty area), body text (thick stroke center, not antialiased edge), primary button fill,
   card fill, muted label. Take 3 samples per target, use the median.
4. Record `screenshot.png @ (x, y) → #RRGGBB` lines.
Fonts from screenshots: name the closest shipped font by role and mark it "estimated"; never claim the exact face.

## Conversions

- HSL → hex: `node -e 'const [h,s,l]=[221,83,53];const a=s/100*Math.min(l/100,1-l/100);const f=n=>{const k=(n+h/30)%12;const c=l/100-a*Math.max(-1,Math.min(k-3,9-k,1));return Math.round(255*c).toString(16).padStart(2,"0")};console.log("#"+f(0)+f(8)+f(4))'`
- rgb(37 99 235) → `#2563EB`. 3-digit `#fff` → `#FFFFFF`. Drop alpha: composite over bg first, then hex.
- OKLCH → hex: convert with a library if present (`culori`), else render a swatch in a headless browser and read the
  computed `rgb()`; never eyeball.
