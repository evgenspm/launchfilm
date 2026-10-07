// The film engine: film.json (+ optional scenes) → Sequences, transitions, VO, a ducked music bed, SFX, subtitles,
// end card and (opt-in) credit chip. calculateFilmMetadata sets size per aspect, the length, and inlines words.json /
// beats.json so the component stays synchronous. Register a film with filmCompositions() in films/<slug>/index.tsx.
import React from 'react';
import {AbsoluteFill, Composition, Sequence, staticFile, useCurrentFrame, useVideoConfig, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider, useBrand} from '../brand/BrandProvider';
import type {Brand} from '../brand/types';
import {beatGrid, beatsFromBpm, type BeatGrid, type BeatsJson, type CaptionsJson, type WordsJson} from '../presets/timing';
import {CutFlash, ShotTransition, TRANSITIONS, transitionOverlap, type TransitionId} from '../presets/transitions';
import {FilmLook} from '../presets/look';
import {CreditCard} from './CreditCard';
import {EndCard, endCardFrames} from './EndCard';
import {FootageClip} from './FootageClip';
import {BUILTIN_SCENES} from './scenes';
import {Music, Sfx, VO, speechSpans} from './Sound';
import {Subtitles, estimatePhrases, markedWords, stripMarks} from './Subtitles';
import {ASPECTS, aspectSlug, type Aspect, type FilmProps, type FilmSpec, type Scene, type SceneProps, type Shot, type VoLine} from './types';

const WPS = 2.8; // placeholder speech rate for lines without VO

/** End-card pace (≤ 1) so mark, line, typed URL and CTA finish at least 1 s before the film ends. */
export const endCardPace = (card: NonNullable<FilmSpec['endCard']>, fps: number, tagline?: string, url?: string) => {
  const line = card.line === null ? '' : (card.line ?? tagline ?? '');
  const u = card.url === null ? '' : (card.url ?? url ?? '');
  const need = endCardFrames(fps, line, u, 1) + (card.cta ? Math.round(fps / 3) : 0);
  const room = Math.round(card.dur * fps) - fps;
  return Math.max(0.35, Math.min(1, room / Math.max(1, need)));
};

/** Seconds a VO line lasts: measured (words.json) or estimated from the script. */
export const lineSeconds = (l: VoLine, words?: Record<string, WordsJson>) => words?.[l.id]?.duration ?? stripMarks(l.text).split(' ').filter(Boolean).length / WPS;

export type TimedShot = {shot: Shot; index: number; from: number; dur: number};

/** Beat grid of a film (beats.json wins over bpm), or null. */
export const filmGrid = (film: FilmSpec, fps: number, beatsData?: BeatsJson | null): BeatGrid | null => {
  if (beatsData) return beatGrid(beatsData, fps);
  if (film.beats?.bpm) return beatGrid(beatsFromBpm(film.beats.bpm, Math.max(600, film.duration ?? 0), film.beats.offset ?? 0), fps);
  return null;
};

/** Frame timeline: every shot's start/length, where the end card starts, and the total length. */
export const filmTimeline = (film: FilmSpec, fps: number, words?: Record<string, WordsJson>, beatsData?: BeatsJson | null) => {
  const grid = filmGrid(film, fps, beatsData);
  const fr = (s: number) => Math.round(s * fps);
  const shots: TimedShot[] = [];
  let cursor = 0;
  film.shots.forEach((shot, index) => {
    const from = shot.beat !== undefined && grid ? grid.beatFrame(shot.beat) : shot.at !== undefined ? fr(shot.at) : cursor;
    let dur: number;
    if (shot.beats !== undefined && grid) dur = Math.round(shot.beats * grid.framesPerBeat);
    else if (shot.dur !== undefined) dur = fr(shot.dur);
    else {
      const next = film.shots[index + 1];
      const nextFrom = next ? (next.beat !== undefined && grid ? grid.beatFrame(next.beat) : next.at !== undefined ? fr(next.at) : undefined) : undefined;
      dur = nextFrom !== undefined ? nextFrom - from : fr(2);
    }
    dur = Math.max(1, dur);
    shots.push({shot, index, from, dur});
    cursor = from + dur;
  });
  const shotsEnd = Math.max(0, ...shots.map((s) => s.from + s.dur));
  const voEnd = Math.max(0, ...(film.vo ?? []).map((l) => fr(l.at + lineSeconds(l, words) + 0.4)));
  const endDur = film.endCard ? fr(film.endCard.dur) : 0;
  const total = film.duration !== undefined ? fr(film.duration) : Math.max(shotsEnd, voEnd) + endDur;
  const endStart = film.endCard ? total - endDur : total;
  return {shots, endStart, total: Math.max(1, total), grid};
};

const loadJson = async <T,>(p?: string): Promise<T | undefined> => {
  if (!p) return undefined;
  try {
    const res = await fetch(/^(https?:|data:|blob:)/.test(p) ? p : staticFile(p));
    if (!res.ok) return undefined;
    return (await res.json()) as T;
  } catch {
    return undefined;
  }
};

export const calculateFilmMetadata: CalculateMetadataFunction<FilmProps> = async ({props}) => {
  const film = props.film;
  const fps = film.fps ?? 30;
  const words: Record<string, WordsJson> = {...(props.words ?? {})};
  for (const l of film.vo ?? []) {
    if (!words[l.id] && l.words) {
      const w = await loadJson<WordsJson>(l.words);
      if (w) words[l.id] = w;
    }
  }
  const beatsData = props.beatsData ?? (await loadJson<BeatsJson>(film.beats?.src)) ?? null;
  const captions = props.captions ?? (await loadJson<CaptionsJson>(film.subtitles?.captions)) ?? null;
  const {total} = filmTimeline(film, fps, words, beatsData);
  return {...ASPECTS[props.aspect], fps, durationInFrames: total, props: {...props, words, beatsData, captions}};
};

/** Renders a scene with its frame snapshot (frames inside a Sequence are local to the shot). */
const SceneHost: React.FC<{Comp: Scene; shot: Shot; dur: number; aspect: Aspect}> = ({Comp, shot, dur, aspect}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const props: SceneProps = {shot, f, t: f / fps, fps, dur, aspect, wide: aspect === '16:9'};
  return <Comp {...props} />;
};

export const Film: React.FC<FilmProps & {scenes?: Record<string, Scene>}> = ({film, aspect, words, beatsData, captions, scenes}) => {
  const {fps} = useVideoConfig();
  const brand = useBrand();
  const fr = (s: number) => Math.round(s * fps);
  const {shots, endStart} = filmTimeline(film, fps, words, beatsData);
  const all = {...BUILTIN_SCENES, ...(scenes ?? {})};
  const subsOn = film.subtitles?.enabled ?? Boolean(film.vo?.length);
  // the end card must be complete (CTA included) with ≥ 1 s to spare: speed it up when the card is short
  const endPace = film.endCard ? endCardPace(film.endCard, fps, brand.tagline, brand.url) : 1;

  // speech spans for ducking: measured words, or the script estimate for lines that have audio but no words yet
  const spans = (film.vo ?? [])
    .filter((l) => l.src)
    .flatMap((l) => (words?.[l.id] ? speechSpans(words[l.id], l.at) : ([[l.at, l.at + lineSeconds(l)]] as [number, number][])));

  return (
    <AbsoluteFill style={{background: '#000'}}>
      {shots.map(({shot, index, from, dur}) => {
        const next = shots[index + 1];
        const outId: TransitionId | undefined = next ? next.shot.transition : film.endCard ? film.endCard.transition : undefined;
        const overlap = transitionOverlap(outId, fps);
        const cut = next ? next.from : endStart;
        const len = Math.max(1, Math.min(dur, cut - from) + overlap);
        const Comp = shot.scene ? all[shot.scene] : undefined;
        if (shot.scene && !Comp) throw new Error(`film ${film.id}: shot ${index} uses unknown scene "${shot.scene}" (have: ${Object.keys(all).join(', ')})`);
        if (from >= endStart) return null;
        return (
          <Sequence key={index} from={from} durationInFrames={len} name={`${index + 1} ${shot.id ?? shot.scene ?? 'footage'}`}>
            <ShotTransition
              enter={shot.transition ? {id: shot.transition, opts: shot.transitionOpts} : undefined}
              exit={outId ? {id: outId, at: cut - from, opts: next?.shot.transitionOpts} : undefined}
            >
              {Comp ? (
                <SceneHost Comp={Comp} shot={shot} dur={dur} aspect={aspect} />
              ) : shot.src ? (
                <FootageClip src={shot.src} trim={shot.trim} crop={shot.crop?.[aspect]} punch={shot.punch} drift={shot.drift ?? 1.03} size={shot.size} playbackRate={shot.playbackRate} />
              ) : null}
            </ShotTransition>
          </Sequence>
        );
      })}

      {film.endCard ? (
        <Sequence from={endStart} name="end card">
          <ShotTransition enter={film.endCard.transition ? {id: film.endCard.transition} : undefined}>
            <EndCard line={film.endCard.line} url={film.endCard.url} cta={film.endCard.cta} pace={endPace} />
          </ShotTransition>
          {film.credit ? <CreditCard /> : null}
        </Sequence>
      ) : null}

      {/* cut-point flashes sit above every shot */}
      {shots.filter((s) => s.shot.transition === 'flash').map((s) => <CutFlash key={`flash-${s.index}`} at={s.from} />)}
      {film.endCard?.transition === 'flash' ? <CutFlash at={endStart} /> : null}

      {film.look ? <FilmLook grain={film.look.grain ?? 0} vignette={film.look.vignette ?? 0} /> : null}

      {subsOn ? (
        <Sequence durationInFrames={Math.max(1, endStart)} name="subtitles" layout="none">
          {(film.vo ?? []).map((l) =>
            words?.[l.id] ? (
              <Subtitles key={l.id} words={words[l.id]} at={l.at} emph={film.subtitles?.emph} maxPerLine={film.subtitles?.maxPerLine} />
            ) : (
              <Subtitles key={l.id} phrases={estimatePhrases(l.text, WPS)} at={l.at} emph={[...markedWords(l.text), ...(film.subtitles?.emph ?? [])]} maxPerLine={film.subtitles?.maxPerLine} />
            ),
          )}
          {captions ? <Subtitles words={captions} emph={film.subtitles?.emph} maxPerLine={film.subtitles?.maxPerLine} /> : null}
        </Sequence>
      ) : null}

      {(film.vo ?? []).filter((l) => l.src).map((l) => <VO key={l.id} src={l.src as string} at={l.at} volume={l.volume} />)}
      {film.music ? (
        <Music
          src={film.music.src}
          spans={spans}
          level={film.music.level}
          duck={film.music.duck}
          at={film.music.at}
          trim={film.music.trim}
          fadeIn={film.music.fadeIn}
          fadeOut={film.music.fadeOut}
          lift={film.endCard ? {from: endStart / fps, db: film.music.liftOnEndCard ?? 4} : undefined}
        />
      ) : null}
      {(film.sfx ?? []).map((s, i) => <Sfx key={`sfx-${i}`} sound={s.sound} src={s.src} at={fr(s.at)} volume={s.volume} />)}
      {shots.flatMap(({shot, index, from}) => (shot.sfx ?? []).map((s, j) => <Sfx key={`shot-sfx-${index}-${j}`} sound={s.sound} src={s.src} at={from + fr(s.at ?? 0)} volume={s.volume} />))}
    </AbsoluteFill>
  );
};

/** Suggested SFX at every cut that has one (TRANSITIONS[id].sfx) — print or merge into film.sfx. */
export const transitionSfx = (film: FilmSpec, fps: number) =>
  filmTimeline(film, fps).shots.filter((s) => s.shot.transition && TRANSITIONS[s.shot.transition].sfx).map((s) => ({at: s.from / fps, sound: TRANSITIONS[s.shot.transition as TransitionId].sfx as string}));

/**
 * Register a film: one <Composition> per aspect, id "<film.id>-16x9". In films/<slug>/index.tsx:
 *   export const compositions = filmCompositions({film, brand, scenes: SCENES});
 * `film` / `brand` are the parsed JSON files (validated by the CLI against schemas/*.schema.json).
 */
export const filmCompositions = ({film, brand, scenes}: {film: unknown; brand?: unknown; scenes?: Record<string, Scene>}) => {
  const spec = film as FilmSpec;
  const b = brand as Brand | undefined;
  const Comp: React.FC<FilmProps> = (p) =>
    b ? (
      <BrandProvider brand={b}>
        <Film {...p} scenes={scenes} />
      </BrandProvider>
    ) : (
      <Film {...p} scenes={scenes} />
    );
  return (
    <>
      {spec.aspects.map((a) => (
        <Composition
          key={a}
          id={`${spec.id}-${aspectSlug(a)}`}
          component={Comp}
          defaultProps={{film: spec, aspect: a} as FilmProps}
          calculateMetadata={calculateFilmMetadata}
          fps={spec.fps ?? 30}
          durationInFrames={Math.max(1, Math.round((spec.duration ?? 1) * (spec.fps ?? 30)))}
          {...ASPECTS[a]}
        />
      ))}
    </>
  );
};
