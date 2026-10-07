// films/__SLUG__: registers one composition per aspect in film.json (ids "__ID__-16x9", "__ID__-9x16", …).
import {filmCompositions} from '../../src/film/Film';
import brand from './brand.json';
import film from './film.json';
import {SCENES} from './Film';

export const compositions = filmCompositions({film, brand, scenes: SCENES});
