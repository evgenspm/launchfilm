// Fonts: the vendored OFL variable fonts in public/fonts (see public/fonts/manifest.json) plus any brand font with a `src`.
// ensureFont() loads a family once (memoized) through @remotion/fonts, which holds the render (delayRender) until the
// face is in document.fonts. Anything that measures text must await fontReady() first: a width measured with the
// fallback font is cached by measureText and sticks.
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import type {BrandFont} from './types';

const SANS = 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, Menlo, Consolas, monospace';

export const VENDORED_FONTS = {
  Inter: {file: 'fonts/inter/Inter-Variable.woff2', weight: '100 900', fallback: SANS},
  Geist: {file: 'fonts/geist/Geist-Variable.woff2', weight: '100 900', fallback: SANS},
  'Geist Mono': {file: 'fonts/geist-mono/GeistMono-Variable.woff2', weight: '100 900', fallback: MONO},
  'JetBrains Mono': {file: 'fonts/jetbrains-mono/JetBrainsMono-Variable.woff2', weight: '100 800', fallback: MONO},
  Manrope: {file: 'fonts/manrope/Manrope-Variable.woff2', weight: '200 800', fallback: SANS},
  Unbounded: {file: 'fonts/unbounded/Unbounded-Variable.woff2', weight: '200 900', fallback: SANS},
} as const;
export type VendoredFamily = keyof typeof VENDORED_FONTS;

const loads = new Map<string, Promise<void>>();

const isVendored = (f: string): f is VendoredFamily => f in VENDORED_FONTS;

/** Family name of a BrandFont. */
export const fontFamily = (f: BrandFont) => (typeof f === 'string' ? f : f.family);

/** Load a font once. Vendored families need only the name; others need `src` (a path under public/ or a URL). */
export const ensureFont = (f: BrandFont): Promise<void> => {
  const family = fontFamily(f);
  const cached = loads.get(family);
  if (cached) return cached;
  const src = typeof f === 'string' ? undefined : f.src;
  let p: Promise<void>;
  if (src) {
    const url = /^(https?:|data:|blob:)/.test(src) ? src : staticFile(src);
    p = loadFont({family, url, weight: (typeof f !== 'string' && f.weight) || '100 900'}).catch(() => undefined);
  } else if (isVendored(family)) {
    const v = VENDORED_FONTS[family];
    p = loadFont({family, url: staticFile(v.file), weight: v.weight}).catch(() => undefined);
  } else {
    // a system font or one loaded elsewhere (e.g. @remotion/google-fonts): nothing to do
    p = Promise.resolve();
  }
  loads.set(family, p);
  return p;
};

/** CSS font-family stack for a BrandFont: quoted family first, then a fallback of the same kind. */
export const fontStack = (f: BrandFont, kind: 'sans' | 'mono' = 'sans') => {
  const family = fontFamily(f);
  const fallback = (typeof f !== 'string' && f.fallback) || (isVendored(family) ? VENDORED_FONTS[family].fallback : kind === 'mono' ? MONO : SANS);
  return `"${family}", ${fallback}`;
};

/** First family of a CSS stack, unquoted: '"Geist", system-ui' → 'Geist'. */
export const firstFamily = (stack: string) => stack.split(',')[0].trim().replace(/^["']|["']$/g, '');

/** Resolves when every family in the given CSS stacks / names is loaded (vendored ones are loaded on demand). */
export const fontReady = (stacksOrFamilies: string[]) => Promise.all(stacksOrFamilies.map((s) => ensureFont(firstFamily(s))));

/** Load every vendored family (BrandSheet, Cookbook). */
export const loadAllVendoredFonts = () => Promise.all((Object.keys(VENDORED_FONTS) as VendoredFamily[]).map((f) => ensureFont(f)));
