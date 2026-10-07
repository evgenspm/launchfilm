# brand.json: fields, fonts, contrast, sources

The schema is `schemas/brand.schema.json` (owned by the studio; validate against it if present, it wins over this page).
Expected shape:

```json
{
  "name": "Acme Ledger",
  "tagline": "Invoices that chase themselves.",
  "url": "https://acme-ledger.example",
  "theme": "dark",
  "colors": {
    "bg": "#0E1116", "fg": "#F2F4F7", "accent": "#3B82F6",
    "accent2": "#22C55E", "muted": "#8A94A6", "surface": "#171B22"
  },
  "fonts": { "display": "Geist", "text": "Inter", "mono": "JetBrains Mono" },
  "logo": { "mark": "films/acme-ledger-launch/brand/mark.svg", "wordmark": "films/acme-ledger-launch/brand/wordmark.svg" },
  "radius": 12
}
```
Logo paths are relative to `public/` (what `staticFile()` takes); the files live in `public/films/<slug>/brand/`.
If the schema defines `logo` as a single path, use the wordmark if present, else the mark.

## Field mapping

| Field | Meaning in the film | Source priority | Rule |
|---|---|---|---|
| `name` | product name as written by the user | package.json `name`/README H1/site `<title>` | exact casing |
| `tagline` | the user's existing one-liner | `og:description`, hero `h1` | user's words only; empty if none |
| `url` | CTA/end-card URL | homepage | no tracking params |
| `theme` | `dark` or `light` | bg luminance | < 0.2 → dark |
| `colors.bg` | page background | `--background`, body bg | hex `#RRGGBB` |
| `colors.fg` | main text | `--foreground`, body color | contrast ≥ 4.5:1 on bg |
| `colors.accent` | primary brand color (CTA, highlights) | `--primary`, CTA bg | one accent per film section |
| `colors.accent2` | second brand color, optional | `--secondary`, chart color | only if the product uses it |
| `colors.muted` | secondary text, captions meta | `--muted-foreground` | ≥ 3:1 on bg |
| `colors.surface` | cards, panels, caption plate base | `--card` | differs from bg by ΔL ≥ 3 % |
| `fonts.display` | hero type | h1 family | shipped or mapped |
| `fonts.text` | captions, UI | body family | shipped or mapped |
| `fonts.mono` | code, eyebrow labels, URLs | `--font-mono` | shipped or mapped |
| `logo` | mark/wordmark files in `public/films/<slug>/brand/` | repo → site → user | never invented |
| `radius` | card/button radius in px at 1×  | `--radius` (rem × 16) | integer |

## Fonts: ship, load or map

The studio ships OFL fonts: Inter, Geist, Geist Mono, JetBrains Mono, Manrope, Unbounded.

| Brand font | Do |
|---|---|
| One of the shipped six | use it directly |
| Other OFL/Apache font (Google Fonts) | allowed; the studio loads it (see studio/API.md for local woff2 vs online loading); note the license in BRAND-SOURCES.md |
| The user's own licensed font file in their repo | allowed for their renders; do not copy it into launchfilm or any public repo |
| Fontshare FFL faces (Satoshi, General Sans), Apple SF Pro, unknown commercial faces | do not bundle; map by role below and tell the user |

| Role of the unshippable font | Map to |
|---|---|
| neutral grotesk text (SF Pro Text, Helvetica, Satoshi body) | Inter |
| tight modern display / dev-tool feel (SF Pro Display, General Sans) | Geist |
| friendly rounded grotesk | Manrope |
| wide or loud display | Unbounded |
| monospace | JetBrains Mono or Geist Mono |

Write in BRAND-SOURCES.md: `fonts.display: Geist (mapped from "Satoshi", not redistributable)`.
Check Cyrillic/Greek/CJK coverage when the copy needs it; Unbounded, Inter, Manrope, Geist and JetBrains Mono cover
Cyrillic.

## Contrast

Relative luminance L = 0.2126 R + 0.7152 G + 0.0722 B on linearized channels
(c ≤ 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4). Ratio = (L1 + 0.05) / (L2 + 0.05).

```bash
node -e 'const L=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};const r=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return((x+.05)/(y+.05)).toFixed(2)};console.log("fg/bg",r("#F2F4F7","#0E1116"),"accent/bg",r("#3B82F6","#0E1116"))'
```

| Pair | Required | Target | If it fails |
|---|---|---|---|
| fg on bg | ≥ 4.5:1 | ≥ 7:1 | stop and ask; do not "fix" brand colors silently |
| muted on bg | ≥ 3:1 | ≥ 4.5:1 | use fg at 70 % opacity for captions meta instead |
| accent on bg | ≥ 3:1 | ≥ 4.5:1 for text | use accent for shapes and underlines, fg for the words |
| text on accent (buttons) | ≥ 4.5:1 | | pick bg or fg, whichever passes |

Write the computed ratios in BRAND-SOURCES.md.

## BRAND-SOURCES.md format

```
# Brand sources: acme-ledger-launch (2026-10-07)
name: Acme Ledger ← package.json:2 "name"
colors.bg: #0E1116 ← app/globals.css:14 --background: 220 22% 7% (.dark)
colors.accent: #3B82F6 ← tailwind.config.ts:21 primary.DEFAULT
colors.surface: #171B22 ← https://acme-ledger.example body .card computed background
colors.muted: #8A94A6 ← hero.png @ (412, 688) median of 3
fonts.display: Geist ← app/layout.tsx:3 next/font/google Geist (weights 500, 700)
logo.wordmark: films/acme-ledger-launch/brand/wordmark.svg ← <product repo>/public/logo.svg (copied unmodified, 3.1 KB)
radius: 12 ← app/globals.css:20 --radius: 0.75rem
contrast: fg/bg 17.16 · muted/bg 6.18 · accent/bg 5.14
mapped/asked: none
```
Every value in brand.json has exactly one line. A value without a source line is a defect.
