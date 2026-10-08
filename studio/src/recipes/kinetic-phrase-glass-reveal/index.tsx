import React from 'react';
import {Composition} from 'remotion';
import {KineticPhraseGlassReveal, calculateKineticPhraseGlassRevealMetadata, kineticPhraseGlassRevealDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="kinetic-phrase-glass-reveal"
    component={KineticPhraseGlassReveal}
    defaultProps={kineticPhraseGlassRevealDefaults}
    calculateMetadata={calculateKineticPhraseGlassRevealMetadata}
  />
);
