// Five fictional demo brands with distinct looks. Every recipe preview uses one of them; none is a real product.
// Marks are drawn on a 48×48 grid; `fill` may be a colour token ("accent", "accent2", "fg", "bg") or a hex.
import type {Brand} from '../types';

/** Dark AI tool: violet on near-black, Geist everywhere. */
export const lumenfold: Brand = {
  id: 'lumenfold',
  name: 'Lumenfold',
  tagline: 'Your agent for the boring half of work.',
  url: 'lumenfold.ai',
  theme: 'dark',
  colors: {bg: '#07070A', fg: '#F2F1F7', accent: '#8B7CFF', accent2: '#4FE3C1', muted: '#8A8798', surface: '#131219'},
  fonts: {display: 'Geist', text: 'Geist', mono: 'Geist Mono'},
  radius: 16,
  typography: {displayWeight: 600, displayTracking: -0.035, displayLineHeight: 1.08, textWeight: 400},
  logo: {
    // a disc with its top-right quarter folded inward
    mark: {
      viewBox: '0 0 48 48',
      paths: [
        {d: 'M24 4 A20 20 0 1 0 44 24 L24 24 Z', fill: 'accent'},
        {d: 'M24 4 A20 20 0 0 0 44 24 Z', fill: 'accent2', opacity: 0.9},
      ],
    },
    wordmarkWeight: 600,
    wordmarkTracking: -0.03,
  },
};

/** Light SaaS analytics: blue on paper-white, Inter. */
export const tallyfield: Brand = {
  id: 'tallyfield',
  name: 'Tallyfield',
  tagline: 'Product analytics that answers back.',
  url: 'tallyfield.io',
  theme: 'light',
  colors: {bg: '#F5F6F8', fg: '#11141B', accent: '#2F6BFF', accent2: '#FF8A3D', muted: '#6B7280', surface: '#FFFFFF'},
  fonts: {display: 'Inter', text: 'Inter', mono: 'JetBrains Mono'},
  radius: 12,
  typography: {displayWeight: 700, displayTracking: -0.03, displayLineHeight: 1.1, textWeight: 450},
  logo: {
    // three rising bars in a rounded tile
    mark: {
      viewBox: '0 0 48 48',
      paths: [
        {d: 'M11 0 H37 A11 11 0 0 1 48 11 V37 A11 11 0 0 1 37 48 H11 A11 11 0 0 1 0 37 V11 A11 11 0 0 1 11 0 Z', fill: 'accent'},
        {d: 'M10 29 H16.5 V38 H10 Z M20.75 20 H27.25 V38 H20.75 Z M31.5 11 H38 V38 H31.5 Z', fill: '#FFFFFF'},
      ],
    },
    wordmarkWeight: 700,
    wordmarkTracking: -0.025,
  },
};

/** Dev tool, mono: lime on green-black, JetBrains Mono display, lowercase wordmark. */
export const shellpine: Brand = {
  id: 'shellpine',
  name: 'shellpine',
  tagline: 'Preview deploys for every branch.',
  url: 'shellpine.dev',
  theme: 'dark',
  colors: {bg: '#0A0E0B', fg: '#DCEFE0', accent: '#B6F25A', accent2: '#5EC8F3', muted: '#6F8574', surface: '#111814'},
  fonts: {display: 'JetBrains Mono', text: 'Inter', mono: 'JetBrains Mono'},
  radius: 6,
  typography: {displayWeight: 600, displayTracking: -0.04, displayLineHeight: 1.12, textWeight: 400},
  logo: {
    // a pine made of three prompt chevrons on a trunk
    mark: {
      viewBox: '0 0 48 48',
      paths: [
        {d: 'M24 3 L35 14 L29.5 14 L24 8.5 L18.5 14 L13 14 Z', fill: 'accent'},
        {d: 'M24 13 L39 28 L33.5 28 L24 18.5 L14.5 28 L9 28 Z', fill: 'accent'},
        {d: 'M24 23 L43 42 L37.5 42 L24 28.5 L10.5 42 L5 42 Z', fill: 'accent'},
        {d: 'M21.5 36 H26.5 V46 H21.5 Z', fill: 'accent'},
      ],
    },
    wordmarkFont: 'mono',
    wordmarkWeight: 600,
    wordmarkTracking: -0.04,
    wordmarkCase: 'lower',
  },
};

/** Mobile consumer app: tangerine and plum on warm cream, Unbounded + Manrope, very round. */
export const plumday: Brand = {
  id: 'plumday',
  name: 'Plumday',
  tagline: 'Plans with friends, minus the group chat.',
  url: 'plumday.app',
  theme: 'light',
  colors: {bg: '#FFF3EA', fg: '#2B1631', accent: '#FF6A3D', accent2: '#7A4DFF', muted: '#8E7B88', surface: '#FFFFFF'},
  fonts: {display: 'Unbounded', text: 'Manrope', mono: 'Geist Mono'},
  radius: 28,
  typography: {displayWeight: 700, displayTracking: -0.02, displayLineHeight: 1.12, textWeight: 500},
  logo: {
    // a plum with a leaf and a highlight
    mark: {
      viewBox: '0 0 48 48',
      paths: [
        {d: 'M24 10 C34.5 10 42 17.5 42 27.5 C42 37.5 34 45 24 45 C14 45 6 37.5 6 27.5 C6 17.5 13.5 10 24 10 Z', fill: 'accent'},
        {d: 'M25 11 C26.5 5 32 1.5 38.5 2.5 C36.5 8.5 31 11.5 25 11 Z', fill: 'accent2'},
        {d: 'M15.5 20 A4 4 0 1 0 15.51 20 Z', fill: '#FFFFFF', opacity: 0.55},
      ],
    },
    wordmarkWeight: 700,
    wordmarkTracking: -0.02,
  },
};

/** Fintech: mint and gold on deep green, Manrope heavy. */
export const northfern: Brand = {
  id: 'northfern',
  name: 'Northfern',
  tagline: 'Savings that grow while you sleep.',
  url: 'northfern.finance',
  theme: 'dark',
  colors: {bg: '#06130F', fg: '#EAF5EF', accent: '#3FE0A0', accent2: '#F2C75C', muted: '#7FA195', surface: '#0E1F19'},
  fonts: {display: 'Manrope', text: 'Manrope', mono: 'JetBrains Mono'},
  radius: 18,
  typography: {displayWeight: 800, displayTracking: -0.035, displayLineHeight: 1.08, textWeight: 500},
  logo: {
    // a coin ring with a north arrow
    mark: {
      viewBox: '0 0 48 48',
      paths: [
        {d: 'M24 2 A22 22 0 1 1 23.99 2 Z M24 7.5 A16.5 16.5 0 1 0 24.01 7.5 Z', fill: 'accent', fillRule: 'evenodd'},
        {d: 'M24 12 L33 33 L24 27.5 L15 33 Z', fill: 'accent2'},
      ],
    },
    wordmarkWeight: 800,
    wordmarkTracking: -0.03,
  },
};

export const DEMO_BRANDS = {lumenfold, tallyfield, shellpine, plumday, northfern} as const;
export type DemoBrandId = keyof typeof DEMO_BRANDS;
export const DEMO_BRAND_LIST: Brand[] = [lumenfold, tallyfield, shellpine, plumday, northfern];
