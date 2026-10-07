// Colour helpers shared by presets and components. Hex in, CSS out; deterministic.
import type {BrandColors, ColorToken} from './types';

const hex6 = (hex: string) => {
  const h = hex.replace('#', '');
  return h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
};

export const rgbOf = (hex: string): [number, number, number] => {
  const h = hex6(hex);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

/** rgba() string from a hex colour; non-hex input (rgba(), gradients) is returned unchanged. */
export const alpha = (hex: string, a: number) => {
  if (!hex.startsWith('#')) return hex;
  const [r, g, b] = rgbOf(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;
};

/** Linear mix of two hex colours, t = 0 → a, 1 → b. Returns hex. */
export const mix = (a: string, b: string, t: number) => {
  const A = rgbOf(a);
  const B = rgbOf(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, t))));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

/** WCAG relative luminance 0..1. */
export const luminance = (hex: string) => {
  const [r, g, b] = rgbOf(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio between two hex colours (1..21). */
export const contrast = (a: string, b: string) => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** Black or white, whichever reads better on `bg` (text on an accent button). */
export const onColor = (bg: string) => (contrast(bg, '#FFFFFF') >= contrast(bg, '#0A0A0A') ? '#FFFFFF' : '#0A0A0A');

/** A colour token name ("accent") or a literal colour → CSS colour. */
export const tokenColor = (c: string | undefined, colors: BrandColors, fallback: ColorToken = 'fg') => {
  if (!c) return colors[fallback];
  return c in colors ? colors[c as ColorToken] : c;
};
