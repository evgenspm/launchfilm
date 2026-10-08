import React from 'react';
import {Composition} from 'remotion';
import {PromptOrbitStory, calculatePromptOrbitMetadata, promptOrbitDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="prompt-orbit-story"
    component={PromptOrbitStory}
    defaultProps={promptOrbitDefaults}
    calculateMetadata={calculatePromptOrbitMetadata}
  />
);
