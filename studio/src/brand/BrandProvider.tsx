// <BrandProvider brand={…}> puts a brand in context; useBrand() reads it (or the neutral default) and makes sure its
// fonts are loading. Presets and components default their colours and fonts from useBrand(), so a recipe is re-skinned
// by wrapping it in a different provider — never by editing the component.
import React, {createContext, useContext, useMemo} from 'react';
import {ensureFont, fontStack} from './fonts';
import type {Brand, ResolvedBrand} from './types';

/** Neutral house style used when nothing provides a brand. */
export const DEFAULT_BRAND: Brand = {
  id: 'default',
  name: 'Product',
  tagline: 'A short line about what it does.',
  url: 'example.com',
  theme: 'dark',
  colors: {bg: '#0A0A0B', fg: '#F5F5F7', accent: '#4D7CFF', accent2: '#35D0BA', muted: '#86868B', surface: '#151517'},
  fonts: {display: 'Inter', text: 'Inter', mono: 'JetBrains Mono'},
  radius: 14,
  typography: {displayWeight: 600, displayTracking: -0.02, displayLineHeight: 1.12, textWeight: 400},
};

export const resolveBrand = (b: Brand): ResolvedBrand => ({
  ...b,
  font: {display: fontStack(b.fonts.display), text: fontStack(b.fonts.text), mono: fontStack(b.fonts.mono, 'mono')},
  type: {
    displayWeight: b.typography?.displayWeight ?? 600,
    displayTracking: b.typography?.displayTracking ?? -0.02,
    displayLineHeight: b.typography?.displayLineHeight ?? 1.12,
    textWeight: b.typography?.textWeight ?? 400,
  },
});

const BrandContext = createContext<ResolvedBrand | null>(null);
const RESOLVED_DEFAULT = resolveBrand(DEFAULT_BRAND);

const ensureBrandFonts = (b: Brand) => {
  ensureFont(b.fonts.display);
  ensureFont(b.fonts.text);
  ensureFont(b.fonts.mono);
};

export const BrandProvider: React.FC<{brand: Brand; children: React.ReactNode}> = ({brand, children}) => {
  const resolved = useMemo(() => resolveBrand(brand), [brand]);
  ensureBrandFonts(brand);
  return <BrandContext.Provider value={resolved}>{children}</BrandContext.Provider>;
};

/** The current brand (or DEFAULT_BRAND), with CSS font stacks in `.font` and resolved typography in `.type`. */
export const useBrand = (): ResolvedBrand => {
  const b = useContext(BrandContext) ?? RESOLVED_DEFAULT;
  ensureBrandFonts(b);
  return b;
};

/** em tracking → CSS letter-spacing string. */
export const tracking = (em: number) => `${em}em`;
