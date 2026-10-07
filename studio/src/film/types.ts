// film.json: a whole film as data (schemas/film.schema.json). Times are SECONDS (or beats); the engine converts to frames.
// Paths (VO, words, music, footage, sfx) are relative to studio/public/, e.g. "films/my-launch/vo/l1.wav".
import type {FC} from 'react';
import type {TransitionId, TransitionOpts} from '../presets/transitions';
import type {BeatsJson, CaptionsJson, WordsJson} from '../presets/timing';

export type Aspect = '16:9' | '1:1' | '4:5' | '9:16';

export const ASPECTS: Record<Aspect, {width: number; height: number}> = {
  '16:9': {width: 1920, height: 1080},
  '1:1': {width: 1080, height: 1080},
  '4:5': {width: 1080, height: 1350},
  '9:16': {width: 1080, height: 1920},
};

/** '16:9' → '16x9' (composition ids allow only a-z, 0-9 and -). */
export const aspectSlug = (a: Aspect) => a.replace(':', 'x');

/** Normalised source rect (0..1) for a footage crop. */
export type Crop = {x: number; y: number; w: number; h: number};
/** Punch-in on footage: at/out in seconds from the shot start; focus in source-normalised coords. */
export type Punch = {at: number; scale: number; focus: [number, number]; out?: number};

export type ShotSfx = {
  /** seconds into the shot */
  at?: number;
  /** audio id from craft/vocabulary.md#audio → public/sfx/<sound>.wav */
  sound?: string;
  /** explicit file under public/ (wins over `sound`) */
  src?: string;
  volume?: number;
};

export type Shot = {
  id?: string;
  /** start in film seconds; omitted → right after the previous shot */
  at?: number;
  /** start on beat n of the grid (needs `beats`); wins over `at` */
  beat?: number;
  /** length in seconds … */
  dur?: number;
  /** … or in beats */
  beats?: number;
  /** a built-in scene ("title", "statement", "caption", "logo", "blank") or a key of the film's own scenes */
  scene?: string;
  /** footage under public/ (FootageClip); used when there is no scene */
  src?: string;
  trim?: number;
  crop?: Partial<Record<Aspect, Crop>>;
  punch?: Punch | Punch[];
  /** slow push across the shot, e.g. 1.03 */
  drift?: number;
  /** source pixel size of the footage (default 1920×1080) */
  size?: [number, number];
  playbackRate?: number;
  /** transition INTO this shot (craft/vocabulary.md#transitions); default hard-cut */
  transition?: TransitionId;
  transitionOpts?: TransitionOpts;
  sfx?: ShotSfx[];
  /** anything the scene reads (texts, variants) */
  props?: Record<string, unknown>;
};

export type VoLine = {
  id: string;
  /** script text; *word* marks an emphasised word, | forces a subtitle break */
  text: string;
  /** film seconds where the line starts */
  at: number;
  /** wav/mp3 under public/; omitted → silent, subtitles on estimated timing */
  src?: string;
  /** words.json under public/ (from `launchfilm words`) */
  words?: string;
  volume?: number;
};

export type MusicSpec = {
  src: string;
  /** LUFS without voice (file assumed −14 LUFS); default −20 */
  level?: number;
  /** dB lower under the voice; default 9 */
  duck?: number;
  /** seconds into the file */
  trim?: number;
  /** film seconds where the bed starts */
  at?: number;
  fadeIn?: number;
  fadeOut?: number;
  /** extra dB over the end card (the bed "returns") */
  liftOnEndCard?: number;
};

export type SfxEvent = ShotSfx & {
  /** film seconds */
  at: number;
};

export type FilmSpec = {
  $schema?: string;
  /** composition id prefix: a-z, 0-9, - */
  id: string;
  title?: string;
  fps: number;
  aspects: Aspect[];
  /** film length in seconds; omitted → last shot / VO / end card */
  duration?: number;
  /** beat grid: a tempo, or a beats.json under public/ (from `launchfilm beats`) */
  beats?: {bpm?: number; offset?: number; src?: string};
  shots: Shot[];
  vo?: VoLine[];
  music?: MusicSpec;
  sfx?: SfxEvent[];
  subtitles?: {
    enabled: boolean;
    /** fallback emphasis words (a phrase's *marks* win) */
    emph?: string[];
    maxPerLine?: number;
    /** captions json under public/ for films without VO */
    captions?: string;
  };
  /** brand end card; line/url default to the brand's tagline/url (null hides them) */
  endCard?: {dur: number; line?: string | null; url?: string | null; cta?: string; transition?: TransitionId};
  /** tiny "made with launchfilm" card after the end card; off by default */
  credit?: boolean;
  look?: {grain?: number; vignette?: number};
};

/** Composition props. `words` / `beatsData` / `captions` are filled by calculateFilmMetadata. */
export type FilmProps = {
  film: FilmSpec;
  aspect: Aspect;
  words?: Record<string, WordsJson>;
  beatsData?: BeatsJson | null;
  captions?: CaptionsJson | null;
};

/** What a scene component receives. Use useCurrentFrame() inside it too: frames are local to the shot. */
export type SceneProps = {
  shot: Shot;
  /** frames / seconds since the shot started */
  f: number;
  t: number;
  fps: number;
  /** shot length in frames */
  dur: number;
  aspect: Aspect;
  wide: boolean;
};
export type Scene = FC<SceneProps>;
