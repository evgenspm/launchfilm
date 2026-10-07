// Burned-in subtitles: a phrase appears whole (fade + 10 px rise, 7 frames) and holds to its end, no karaoke.
// ≤ 2 lines, ≤ 6 words a line, broken at meaning (never after "the / to / my…"). Text font 500, sentence case, on a
// plate. One key word per phrase in the brand accent (script *word*, phrase.emph or the `emph` prop).
// Size ≈ 6 % of frame height in 16:9, capped at 4.6 % of width. Bottom-centre inside each aspect's platform-safe area.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {contrast} from '../brand/color';
import {easings} from '../presets/easings';
import type {CaptionsJson, Phrase, Word, WordsJson} from '../presets/timing';

const clean = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}'’-]/gu, '');
const SOFT_END = new Set(['a', 'an', 'the', 'to', 'of', 'my', 'your', 'our', 'in', 'on', 'at', 'and', 'or', 'but', 'for', 'with', 'from', 'it', 'i', 'is', 'that', 'what']);

/** Script markup → plain text: *word* marks, | phrase breaks. */
export const stripMarks = (s: string) => s.replace(/\|/g, ' ').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
/** Words inside *…* (each word of a multi-word mark). */
export const markedWords = (s: string) => [...s.matchAll(/\*([^*]+)\*/g)].flatMap((m) => m[1].split(/\s+/));

/** Split a phrase into ≤ 2 lines of ≤ maxPerLine words; prefer breaks after punctuation, never after soft words. */
export const splitLines = (text: string, maxPerLine = 6): string[] => {
  const w = text.split(/\s+/).filter(Boolean);
  if (w.length <= maxPerLine) return [w.join(' ')];
  let best = Math.ceil(w.length / 2);
  let bestScore = Infinity;
  for (let k = 1; k < w.length; k++) {
    const l = w.slice(0, k).join(' ');
    const r = w.slice(k).join(' ');
    let score = Math.abs(l.length - r.length);
    if (/[,;:—–]$/.test(w[k - 1])) score -= 14;
    if (SOFT_END.has(clean(w[k - 1]))) score += 18;
    if (k > maxPerLine || w.length - k > maxPerLine) score += 30 * (Math.max(k, w.length - k) - maxPerLine);
    if (score < bestScore) {
      bestScore = score;
      best = k;
    }
  }
  return [w.slice(0, best).join(' '), w.slice(best).join(' ')];
};

/** Phrases from a words.json (or captions json). Without grouping: a pause ≥ 250 ms, . ? ! or 8 words end a phrase. */
export const toPhrases = (src: WordsJson | CaptionsJson): Phrase[] => {
  const ph = src.phrases ?? [];
  if (!ph.length && 'words' in src) {
    const out: Phrase[] = [];
    let cur: Word[] = [];
    src.words.forEach((x, i) => {
      cur.push(x);
      const n = src.words[i + 1];
      if (!n || n.s - x.e >= 0.25 || /[.!?…]$/.test(x.w) || cur.length >= 8) {
        out.push({text: cur.map((c) => c.w).join(' '), s: cur[0].s, e: cur[cur.length - 1].e, emph: cur.filter((c) => c.emph).map((c) => c.w)});
        cur = [];
      }
    });
    return out;
  }
  // phrases longer than 12 words are cut in two at the nearest word boundary in time
  return ph.flatMap((p) => {
    const words = p.text.split(/\s+/);
    if (words.length <= 12 || !('words' in src)) return [p];
    const inside = src.words.filter((x) => x.s >= p.s - 0.01 && x.e <= p.e + 0.01);
    if (inside.length < 2) return [p];
    const mid = Math.ceil(inside.length / 2);
    const a = inside.slice(0, mid);
    const b = inside.slice(mid);
    return [
      {text: a.map((x) => x.w).join(' '), s: a[0].s, e: a[a.length - 1].e, emph: p.emph},
      {text: b.map((x) => x.w).join(' '), s: b[0].s, e: b[b.length - 1].e, emph: p.emph},
    ];
  });
};

/** Estimated phrases for a script line with no VO yet (2.8 words/s): `|` and sentence ends split phrases. */
export const estimatePhrases = (text: string, wps = 2.8): Phrase[] => {
  const marks = markedWords(text);
  const chunks = text
    .split('|')
    .flatMap((c) => c.split(/(?<=[.!?…])\s+/))
    .map((c) => stripMarks(c))
    .filter(Boolean);
  let t = 0;
  return chunks.map((c) => {
    const n = c.split(/\s+/).length;
    const s = t;
    t += n / wps;
    const own = marks.filter((m) => c.split(/\s+/).some((w) => clean(w) === clean(m)));
    return {text: c, s, e: t - 0.1, emph: own};
  });
};

/** Bottom margin per aspect: clears a dock in 16:9, feed overlays in 4:5, Reels/TikTok/Shorts UI in 9:16. */
export const safeBottom = (width: number, height: number) => {
  const r = width / height;
  if (r > 1.5) return 0.1 * height;
  if (r > 0.95) return 0.12 * height;
  if (r > 0.7) return 0.15 * height;
  return 0.22 * height;
};
/** Max subtitle width per aspect (9:16 keeps clear of the right-hand button rail). */
export const safeWidth = (width: number, height: number) => (width / height < 0.7 ? 0.8 : 0.88);

export const Subtitles: React.FC<{
  /** words.json or a captions json ({phrases}) */
  words?: WordsJson | CaptionsJson;
  phrases?: Phrase[];
  /** seconds: where the track starts in this sequence (the VO line's `at`) */
  at?: number;
  /** key words to paint in the accent if a phrase has none marked (first match per phrase) */
  emph?: string[];
  /** seconds a phrase stays after its last word (capped by the next phrase), and the minimum time on screen */
  tail?: number;
  minHold?: number;
  maxPerLine?: number;
  bottom?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({words, phrases, at = 0, emph = [], tail = 0.35, minHold = 1.0, maxPerLine = 6, bottom, fontSize, style}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const b = useBrand();
  const list = phrases ?? (words ? toPhrases(words) : []);
  const t = frame / fps - at;
  const IN = 7;
  const OUT = 5;
  const endOf = (i: number) => {
    const p = list[i];
    const next = list[i + 1];
    return Math.min(Math.max(p.e + tail, p.s + minHold), next ? next.s : Infinity);
  };
  const idx = list.findIndex((p, i) => {
    const next = list[i + 1];
    const end = endOf(i);
    const handoff = next && next.s - end < 0.02; // the next phrase takes over at `end`: no fade-out window
    return t >= p.s - 0.05 && t < end + (handoff ? 0 : OUT / fps);
  });
  if (idx < 0) return null;
  const p = list[idx];
  const next = list[idx + 1];
  const end = endOf(idx);
  const fIn = (t - (p.s - 0.05)) * fps;
  const fOut = (t - end) * fps;
  const handoff = next && next.s - end < 0.02;
  const o =
    interpolate(fIn, [0, IN], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outExpo}) *
    (handoff ? 1 : interpolate(fOut, [0, OUT], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const y = interpolate(fIn, [0, IN], [10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easings.outExpo});

  const size = fontSize ?? Math.round(Math.min(0.06 * height, 0.046 * width));
  const dark = b.theme === 'dark';
  const plate = dark ? 'rgba(0,0,0,0.82)' : 'rgba(255,255,255,0.92)';
  const ink = dark ? '#F4F4F5' : b.colors.fg;
  // the accent only if it reads on the plate; otherwise the second accent, otherwise plain ink
  const plateHex = dark ? '#000000' : '#FFFFFF';
  const hi = contrast(b.colors.accent, plateHex) >= 3 ? b.colors.accent : contrast(b.colors.accent2, plateHex) >= 3 ? b.colors.accent2 : ink;
  const marks = (p.emph?.length ? p.emph : emph).map(clean);
  let used = false;
  const lines = splitLines(p.text, maxPerLine);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: bottom ?? safeBottom(width, height), pointerEvents: 'none'}}>
      <div
        style={{
          opacity: o,
          transform: `translateY(${y}px)`,
          background: plate,
          boxShadow: dark ? '0 0 0 1px rgba(255,255,255,0.08)' : '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
          borderRadius: Math.min(16, b.radius),
          padding: `${Math.round(size * 0.26)}px ${Math.round(size * 0.52)}px`,
          maxWidth: `${safeWidth(width, height) * 100}%`,
          textAlign: 'center',
          fontFamily: b.font.text,
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1.22,
          letterSpacing: '-0.01em',
          color: ink,
          ...style,
        }}
      >
        {lines.map((line, li) => (
          <div key={li} style={{whiteSpace: 'nowrap'}}>
            {line.split(' ').map((w, wi) => {
              const hit = !used && marks.includes(clean(w));
              if (hit) used = true;
              if (!hit) return <React.Fragment key={wi}>{wi ? ' ' : ''}{w}</React.Fragment>;
              const m = w.match(/^(.*?)([.,!?;:…]*)$/) ?? [w, w, ''];
              return (
                <React.Fragment key={wi}>
                  {wi ? ' ' : ''}
                  <span style={{color: hi}}>{m[1]}</span>
                  {m[2]}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
