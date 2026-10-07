// Named springs. Never write a spring config inline: pick one here, or add one here with a note on what it is for.
// Usage: spring({frame, fps, config: springs.snappy})
import type {SpringConfig} from 'remotion';

export const springs = {
  /** quick with a small overshoot: text and logos snapping into place */
  snappy: {stiffness: 170, damping: 14, mass: 0.8},
  /** fast, no bounce, ~600 ms: layout morphs, input → bubble, sentence re-flow */
  ui: {stiffness: 170, damping: 26, mass: 1},
  /** stiff, settles fast: container growth, list re-flow */
  layout: {stiffness: 200, damping: 30, mass: 1},
  /** bouncy pop: cards, comments, badges */
  pop: {stiffness: 150, damping: 12, mass: 0.8},
  /** playful overshoot: sparkles, emoji */
  bouncy: {stiffness: 200, damping: 10, mass: 1},
  /** tight press: button 1 → 0.9 → 1, cursor click */
  click: {stiffness: 300, damping: 15, mass: 0.8},
  /** slightly bouncy zoom-in (Screen Studio default: tension 170 / friction 20) */
  cameraIn: {stiffness: 170, damping: 20, mass: 1},
  /** soft, damped zoom-out */
  cameraOut: {stiffness: 120, damping: 26, mass: 1},
  /** instant follow within ~160 ms of a click */
  cameraSnappy: {stiffness: 700, damping: 30, mass: 1},
  /** heavier feel while dragging */
  drag: {stiffness: 136, damping: 26, mass: 1},
  /** slow, weighty: hero objects, 3D, logo cores */
  heavy: {stiffness: 80, damping: 20, mass: 1.5},
  /** a little bounce: chart bars rising from the baseline */
  chartBar: {stiffness: 150, damping: 20, mass: 1},
  /** per-letter mask rise: ~10 % overshoot, peak at 6–7 fr, settled by ~12 fr */
  maskRise: {stiffness: 300, damping: 20, mass: 1},
  /** marker sweep behind a word */
  marker: {stiffness: 100, damping: 20, mass: 1},
  /** soft settle with no overshoot: cards landing, notification stacks */
  settle: {stiffness: 120, damping: 22, mass: 1},
} satisfies Record<string, Partial<SpringConfig>>;

export type SpringName = keyof typeof springs;
