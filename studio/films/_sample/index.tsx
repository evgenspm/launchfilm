// The 3-second smoke-test film used by `doctor` and CI: one built-in "title" scene, no audio, no assets.
// Compositions: sample-16x9, sample-9x16.
import {filmCompositions} from '../../src/film/Film';
import {DEMO_BRANDS} from '../../src/brand/demo';
import film from './film.json';

export const compositions = filmCompositions({film, brand: DEMO_BRANDS.lumenfold});
