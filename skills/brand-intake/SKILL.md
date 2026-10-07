---
name: brand-intake
description: Brand intake for a launch film, product video or promo: capture the product's real colors, fonts, logo, radius and theme from the user's repo (Tailwind config, CSS variables, shadcn tokens, next/font, logo SVG), then the live website, then screenshots, and write films/<slug>/brand.json with a source for every value. Use when starting a new film, when the brand, logo or colors changed, or when the user says "use my brand / my colors / my logo". Hard stop if capture fails: never invent a logo or colors. Not for picking a look or grade (scene-build, craft/06) or for writing copy (story).
---

# brand-intake: real tokens in, brand.json out

The film must look like the product, so tokens come from the product, never from taste. Order of sources, stop at the
first that yields a value for a field, and record where each value came from:

1. **The user's repo** (best: exact tokens, real font names, the real logo file).
2. **The live URL** (computed styles, meta tags, header SVG).
3. **Screenshots** the user provides (pixel sampling).
4. **Ask the user** for anything still missing. Never guess.

Output (paths relative to `launch-video/`): `films/<slug>/brand.json`, `films/<slug>/BRAND-SOURCES.md`, and logo files
copied as-is to `public/films/<slug>/brand/` (so scenes load them with `staticFile()`).
Extraction recipes: [references/sources.md](references/sources.md). Field mapping, font fallbacks, contrast math:
[references/brand-json.md](references/brand-json.md).

## Steps

1. **Find the product root.** If `launch-video/` sits inside a product repo, the repo root is one level up. Else ask
   for the URL and screenshots. Note the stack: `package.json` deps (tailwindcss version, next, @fontsource/*, shadcn).
2. **Colors from the repo.** In order: Tailwind v4 `@theme` vars in CSS, Tailwind v3 `tailwind.config.{js,ts,cjs,mjs}`
   `theme.extend.colors`, shadcn tokens in `globals.css` (`--background`, `--foreground`, `--primary`, `--muted`,
   `--card`, `--accent`), other `:root` custom properties. Convert HSL/OKLCH/RGB to 6-digit hex. Use the theme the
   marketing site uses (dark or light), not both mixed.
3. **Fonts from the repo.** `next/font/google` or `next/font/local` imports, `@fontsource*` deps, `@font-face`,
   `font-family` on `body`/`html`/`h1`, Tailwind `fontFamily`. Record the family names and weights actually used.
4. **Logo from the repo.** Look for SVG first: `public/logo*.svg`, `public/*mark*.svg`, `app/icon.svg`,
   `public/favicon.svg`, `src/assets/*logo*`, `src/components/*Logo*` (inline JSX SVG: extract the `<svg>`), then PNG
   ≥ 512 px (`apple-touch-icon.png` is 180 px: last resort for a mark, never for a wordmark). Copy to `public/films/<slug>/brand/` unmodified.
5. **Radius and theme.** `--radius` or Tailwind `borderRadius`; theme = dark if bg relative luminance < 0.2.
6. **Fill gaps from the live URL** (`references/sources.md` § live URL): theme-color meta, `og:image`, `link rel=icon`,
   header inline SVG, computed styles of `body`, primary button, `h1`.
7. **Fill gaps from screenshots:** sample pixels at named points (page background, body text, primary button, card).
   Write the pixel coordinates in BRAND-SOURCES.md.
8. **Name, tagline, URL:** from `package.json` `name`/`description`, the site `<title>`, hero `h1`, `og:description`,
   README first line. Use the user's own words; never write a new tagline here (story does copy).
9. **Map fonts** you cannot ship or load to a shipped OFL font by role (brand-json.md § fonts) and say so.
10. **Contrast check** (brand-json.md § contrast): fg on bg ≥ 4.5:1 required (target 7:1), accent on bg ≥ 3:1. Write
    the numbers. Failing accent → keep it for shapes, pick `fg` for text on it.
11. **Write `brand.json`**, then validate if `schemas/brand.schema.json` exists:
    `npx -y -p ajv-cli@5 -p ajv-formats ajv validate --spec=draft2020 -c ajv-formats -s schemas/brand.schema.json -d films/<slug>/brand.json`
12. **Write `BRAND-SOURCES.md`**: one line per value → source (file:line, URL + selector, or screenshot + x,y).
13. **Show the user** a 6-line summary (name, theme, 6 swatches as hex, fonts, logo file, anything mapped or asked).

## Hard stops (do not continue the pipeline)

| Situation | Do | Never |
|---|---|---|
| No logo file in repo, site or screenshots | Ask: "Send the logo as SVG (best) or a PNG ≥ 512 px with transparency." | draw, trace, generate, or approximate a logo |
| Logo only as a tiny favicon | Ask for a larger file | upscale a 32 px favicon into a hero mark |
| No colors captured (no repo access, site blocked, no screenshots) | Ask for the URL or 2–3 screenshots, or the hex codes | pick "nice" colors or a default palette |
| Conflicting palettes (app vs marketing) | Ask which one the film should use; default to the marketing site | blend them |
| User wants a text wordmark because no logo exists | Allowed only with explicit "yes": product name in the display font, fg color | present it as their logo |

## Rules

- Copy logo files byte-for-byte. Don't recolor, crop or "clean up" a logo unless the user asks.
- Never use another company's logo or the user's customers' logos without the user confirming they have the right.
- Never fetch fonts from sources whose license forbids redistribution into a repo (Fontshare FFL faces such as Satoshi
  or General Sans, Apple SF Pro): map them (brand-json.md § fonts).
- `brand.json` holds no secrets and no personal data beyond the public product name and URL.
- Re-running intake overwrites only fields whose source changed; keep fields the user edited by hand (diff first).
- Downstream skills read only `brand.json`; never hardcode brand hex values in scenes `[craft/06#grade-discipline]`.
