// Example film for a fictional fintech app, written the way the harness writes films:
// film.json (timeline on a 100 BPM grid, VO lines, transitions, end card) + brand.json + two custom scenes.
// Use it: copy this folder to studio/films/northfern-launch/, then `npx remotion studio` (compositions
// northfern-launch-16x9 and northfern-launch-9x16). VO has no audio yet, so subtitles run on estimated timing;
// add `src`/`words` to each line after `launchfilm vo` and a `music` bed to finish it.
import {filmCompositions} from '../../src/film/Film';
import brand from './brand.json';
import film from './film.json';
import {SCENES} from './scenes';

export const compositions = filmCompositions({film, brand, scenes: SCENES});
