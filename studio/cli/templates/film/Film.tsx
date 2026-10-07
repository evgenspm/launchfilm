// films/__SLUG__/Film.tsx: this film's own scenes. film.json shots[].scene names a key here, or a built-in scene
// ("title", "statement", "caption", "logo", "blank"). A scene gets {shot, f, t, fps, dur, aspect, wide}; frames are
// local to the shot. Build with the shared presets and components (src/presets, src/components), never raw easing.
import React from 'react';
import type {Scene} from '../../src/film/types';
__IMPORTS__
export const SCENES: Record<string, Scene> = {
__SCENES__};
