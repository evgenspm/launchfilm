// AI chat pieces: StreamText (an answer streaming in chunk by chunk, seeded), ChatBubble (user / assistant) and
// ChatThread (messages scripted by frame; the column is bottom-anchored, so older messages scroll up as new ones grow).
// Markdown-lite in streamed text: **bold**, `code`, and "\n" line breaks. Deterministic: chunk sizes come from a seed.
import React from 'react';
import {random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useBrand} from '../brand/BrandProvider';
import {alpha, mix, onColor} from '../brand/color';
import {BrandMark} from '../brand/Logo';
import {springs} from '../presets/springs';

// ─── parsing + schedule ─────────────────────────────────────────────────────────────────

type Run = {text: string; bold?: boolean; code?: boolean};

/** **bold** and `code` → runs of plain text with flags. */
export const parseMarkdownLite = (md: string): Run[] => {
  const out: Run[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    if (m.index > last) out.push({text: md.slice(last, m.index)});
    const tok = m[0];
    out.push(tok.startsWith('**') ? {text: tok.slice(2, -2), bold: true} : {text: tok.slice(1, -1), code: true});
    last = m.index + tok.length;
  }
  if (last < md.length) out.push({text: md.slice(last)});
  return out;
};

const plainOf = (runs: Run[]) => runs.map((r) => r.text).join('');

/**
 * Chunk boundaries of a streamed answer: [{frame, chars}] where `chars` = visible plain chars from that frame on.
 * Chunks are 1–3 words (seeded); the gap between chunks is size / wps seconds with ±30 % jitter.
 */
export const streamSchedule = (text: string, start: number, fps: number, wps = 14, seed = 'stream') => {
  const plain = plainOf(parseMarkdownLite(text));
  const tokens = plain.match(/\S+\s*|\s+/g) ?? [];
  const out: {frame: number; chars: number}[] = [];
  let t = start;
  let chars = 0;
  let i = 0;
  let k = 0;
  while (i < tokens.length) {
    const size = 1 + Math.floor(random(`${seed}-n-${k}`) * 3);
    const chunk = tokens.slice(i, i + size);
    i += size;
    chars += chunk.join('').length;
    out.push({frame: Math.round(t), chars});
    t += ((chunk.length / wps) * fps) * (0.7 + random(`${seed}-j-${k}`) * 0.6);
    k++;
  }
  return out;
};

/** Frames until the whole answer is visible. */
export const streamDuration = (text: string, fps: number, wps = 14, seed = 'stream') => {
  const s = streamSchedule(text, 0, fps, wps, seed);
  return s.length ? s[s.length - 1].frame + 4 : 0;
};

const renderRange = (runs: Run[], from: number, to: number, b: ReturnType<typeof useBrand>, style?: React.CSSProperties, keyBase = '') => {
  const out: React.ReactNode[] = [];
  let pos = 0;
  runs.forEach((r, i) => {
    const a = Math.max(from, pos);
    const z = Math.min(to, pos + r.text.length);
    if (z > a) {
      const t = r.text.slice(a - pos, z - pos);
      out.push(
        <span
          key={`${keyBase}${i}`}
          style={{
            fontWeight: r.bold ? 700 : undefined,
            fontFamily: r.code ? b.font.mono : undefined,
            fontSize: r.code ? '0.88em' : undefined,
            background: r.code ? alpha(b.colors.fg, 0.08) : undefined,
            borderRadius: r.code ? 6 : undefined,
            padding: r.code ? '0.08em 0.3em' : undefined,
            ...style,
          }}
        >
          {t}
        </span>,
      );
    }
    pos += r.text.length;
  });
  return out;
};

// ─── StreamText ─────────────────────────────────────────────────────────────────────────

export type StreamTextProps = {
  text: string;
  /** frame the first chunk lands */
  start: number;
  /** words per second (default 14: fast but readable on video) */
  wps?: number;
  seed?: string;
  /** a soft accent block at the stream head while streaming */
  cursor?: boolean;
  /** frames the newest chunk fades in over */
  fade?: number;
  style?: React.CSSProperties;
};

export const StreamText: React.FC<StreamTextProps> = ({text, start, wps = 14, seed = 'stream', cursor = true, fade = 4, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const runs = parseMarkdownLite(text);
  const total = plainOf(runs).length;
  const sched = streamSchedule(text, start, fps, wps, seed);
  let cur = -1;
  for (let i = 0; i < sched.length; i++) if (sched[i].frame <= frame) cur = i;
  if (cur < 0) return null;
  const shown = sched[cur].chars;
  const prev = cur > 0 ? sched[cur - 1].chars : 0;
  const tailP = Math.min(1, (frame - sched[cur].frame + 1) / Math.max(1, fade));
  const streaming = shown < total;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin((frame / fps) * Math.PI * 2));
  return (
    <div style={{whiteSpace: 'pre-wrap', fontFamily: b.font.text, color: b.colors.fg, lineHeight: 1.45, ...style}}>
      {renderRange(runs, 0, prev, b)}
      {renderRange(runs, prev, shown, b, {opacity: tailP}, 't')}
      {cursor && streaming ? (
        <span style={{display: 'inline-block', width: '0.55em', height: '1.05em', marginLeft: '0.12em', verticalAlign: '-0.15em', borderRadius: 3, background: b.colors.accent, opacity: pulse}} />
      ) : null}
    </div>
  );
};

// ─── ChatBubble ─────────────────────────────────────────────────────────────────────────

export type ChatRole = 'user' | 'assistant';

export type ChatBubbleProps = {
  role: ChatRole;
  /** frame it pops in; omit = static */
  at?: number;
  /** show the brand mark beside assistant messages */
  avatar?: boolean;
  /** px at 1080p */
  fontSize?: number;
  maxWidth?: number | string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({role, at, avatar = true, fontSize = 26, maxWidth = '78%', style, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const p = at === undefined ? 1 : spring({frame: frame - at, fps, config: springs.ui});
  const user = role === 'user';
  const bg = user ? b.colors.accent : b.theme === 'dark' ? mix(b.colors.surface, '#FFFFFF', 0.05) : b.colors.surface;
  const fg = user ? onColor(b.colors.accent) : b.colors.fg;
  const r = Math.max(14, Math.min(28, b.radius * 1.2));
  return (
    <div style={{display: 'flex', justifyContent: user ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 14, width: '100%'}}>
      {!user && avatar ? (
        <div style={{width: fontSize * 1.7, height: fontSize * 1.7, borderRadius: '50%', background: b.colors.surface, border: `1px solid ${alpha(b.colors.fg, 0.1)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: p}}>
          <BrandMark size={fontSize * 1.0} />
        </div>
      ) : null}
      <div
        style={{
          maxWidth,
          padding: `${fontSize * 0.55}px ${fontSize * 0.8}px`,
          borderRadius: r,
          borderBottomRightRadius: user ? r * 0.3 : r,
          borderBottomLeftRadius: user ? r : r * 0.3,
          background: bg,
          color: fg,
          border: user ? undefined : `1px solid ${alpha(b.colors.fg, b.theme === 'dark' ? 0.06 : 0.08)}`,
          boxShadow: user || b.theme === 'dark' ? undefined : '0 6px 18px rgba(20,24,40,0.06)',
          fontFamily: b.font.text,
          fontWeight: b.type.textWeight,
          fontSize,
          lineHeight: 1.42,
          opacity: Math.min(1, p * 1.6),
          transform: p < 0.999 ? `translateY(${((1 - p) * 14).toFixed(2)}px) scale(${(0.95 + 0.05 * p).toFixed(4)})` : undefined,
          transformOrigin: user ? '100% 100%' : '0% 100%',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Three dots bouncing in turn (someone is typing / the assistant is about to answer). */
export const TypingDots: React.FC<{size?: number; color?: string}> = ({size = 10, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  return (
    <div style={{display: 'flex', gap: size * 0.7, alignItems: 'center', height: size * 2.2}}>
      {[0, 1, 2].map((i) => {
        const ph = (frame / fps) * Math.PI * 2 * 1.4 - i * 0.9;
        const up = Math.max(0, Math.sin(ph));
        return <div key={i} style={{width: size, height: size, borderRadius: size, background: color ?? b.colors.muted, opacity: 0.45 + 0.55 * up, transform: `translateY(${(-up * size * 0.45).toFixed(2)}px)`}} />;
      })}
    </div>
  );
};

// ─── ChatThread ─────────────────────────────────────────────────────────────────────────

export type ChatMessage = {
  role: ChatRole;
  text: string;
  /** frame the bubble appears */
  at: number;
  /** assistant default: stream the text in; user default: whole */
  stream?: boolean;
  /** show typing dots from this frame until `at` */
  typingFrom?: number;
  wps?: number;
};

export type ChatThreadProps = {
  messages: ChatMessage[];
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  gap?: number;
  avatar?: boolean;
  /** padding inside the scroll area */
  padding?: number;
  style?: React.CSSProperties;
};

/** Grows a row from 0 to its natural height without measuring (grid 0fr → 1fr). */
const Grow: React.FC<{p: number; children: React.ReactNode}> = ({p, children}) => (
  <div style={{display: 'grid', gridTemplateRows: `${Math.max(0, Math.min(1, p)).toFixed(4)}fr`}}>
    <div style={{minHeight: 0, overflow: 'hidden'}}>{children}</div>
  </div>
);

export const ChatThread: React.FC<ChatThreadProps> = ({messages, width = '100%', height = '100%', fontSize = 26, gap = 18, avatar = true, padding = 28, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{width, height, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding, boxSizing: 'border-box', ...style}}>
      {messages.map((m, i) => {
        const typing = m.typingFrom !== undefined && frame >= m.typingFrom && frame < m.at;
        if (frame < m.at && !typing) return null;
        const start = m.typingFrom !== undefined ? Math.min(m.typingFrom, m.at) : m.at;
        const p = spring({frame: frame - start, fps, config: springs.ui});
        const stream = m.stream ?? m.role === 'assistant';
        return (
          <Grow key={i} p={p}>
            <div style={{paddingTop: gap}}>
              {typing ? (
                <ChatBubble role={m.role} at={m.typingFrom} fontSize={fontSize} avatar={avatar}>
                  <TypingDots size={fontSize * 0.36} />
                </ChatBubble>
              ) : (
                <ChatBubble role={m.role} at={m.typingFrom !== undefined ? undefined : m.at} fontSize={fontSize} avatar={avatar}>
                  {stream ? <StreamText text={m.text} start={m.at + 2} wps={m.wps} seed={`msg-${i}`} style={{color: 'inherit', fontFamily: 'inherit', lineHeight: 'inherit'}} /> : <span style={{whiteSpace: 'pre-wrap'}}>{m.text}</span>}
                </ChatBubble>
              )}
            </div>
          </Grow>
        );
      })}
    </div>
  );
};
