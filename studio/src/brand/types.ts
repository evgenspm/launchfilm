// Brand data. One brand.json per film (schemas/brand.schema.json); the same shape drives every preset and component
// through <BrandProvider>/useBrand(). Colours are hex; fonts are family names (vendored ones load automatically).

export type ThemeMode = 'dark' | 'light';
export type FontRole = 'display' | 'text' | 'mono';
export type ColorToken = 'bg' | 'fg' | 'accent' | 'accent2' | 'muted' | 'surface';

export type BrandColors = {
  /** page / frame background */
  bg: string;
  /** primary text */
  fg: string;
  /** the one colour that means "the product" — reserve it for the promise */
  accent: string;
  /** secondary accent: charts, second series, highlights */
  accent2: string;
  /** secondary text, captions, rules */
  muted: string;
  /** cards, windows, panels on top of bg */
  surface: string;
};

/**
 * A font: a family name, or a family plus a woff2/ttf under public/ (`src`) for fonts that are not vendored.
 * Vendored families (public/fonts): Inter, Geist, Geist Mono, JetBrains Mono, Manrope, Unbounded.
 */
export type BrandFont = string | {family: string; src?: string; weight?: string; fallback?: string};

/** One path of a vector mark. `fill` is a hex colour or a colour token name ("accent", "fg"…). */
export type MarkPath = {d: string; fill?: string; opacity?: number; fillRule?: 'nonzero' | 'evenodd'};

/** A vector mark drawn inline. */
export type InlineMark = {viewBox: string; paths: MarkPath[]};

export type BrandLogo = {
  /** the mark: an svg/png path under public/ ("brand/mark.svg"), or an inline vector {viewBox, paths} */
  mark?: string | InlineMark;
  /** alias of a string `mark` (kept for older brand.json files); `mark` wins */
  src?: string;
  /** wordmark text; defaults to `name` */
  wordmark?: string;
  wordmarkFont?: FontRole;
  wordmarkWeight?: number;
  /** em */
  wordmarkTracking?: number;
  wordmarkCase?: 'none' | 'lower' | 'upper';
};

export type BrandTypography = {
  /** weight of statements / headlines in the display face */
  displayWeight?: number;
  /** em, e.g. -0.02 */
  displayTracking?: number;
  displayLineHeight?: number;
  textWeight?: number;
};

export type Brand = {
  /** kebab-case slug */
  id: string;
  name: string;
  tagline?: string;
  /** shown on end cards without the protocol, e.g. "example.com" */
  url?: string;
  theme: ThemeMode;
  colors: BrandColors;
  fonts: {display: BrandFont; text: BrandFont; mono: BrandFont};
  logo?: BrandLogo;
  /** corner radius of cards / windows at 1080p, px */
  radius: number;
  typography?: BrandTypography;
};

/** What useBrand() returns: the brand plus ready-to-use CSS font stacks and resolved typography. */
export type ResolvedBrand = Brand & {
  font: Record<FontRole, string>;
  type: Required<BrandTypography>;
};
