// Sample timings so the Cookbook renders without generating audio. Real films load words.json / beats.json from the CLI.
import {beatsFromBpm, type BeatsJson, type Word} from '../presets/timing';

export const sampleWords: Word[] = [
  {w: 'Every', s: 0.1, e: 0.36},
  {w: 'launch', s: 0.4, e: 0.72},
  {w: 'deserves', s: 0.76, e: 1.18},
  {w: 'a', s: 1.2, e: 1.26},
  {w: 'film.', s: 1.3, e: 1.72},
  {w: 'Write', s: 2.1, e: 2.36},
  {w: 'the', s: 2.38, e: 2.48},
  {w: 'story,', s: 2.52, e: 2.98},
  {w: 'keep', s: 3.2, e: 3.42},
  {w: 'the', s: 3.44, e: 3.54},
  {w: 'rhythm.', s: 3.58, e: 4.1},
];

export const sampleBeats: BeatsJson = beatsFromBpm(120, 60);
