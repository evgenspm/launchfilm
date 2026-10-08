import React from 'react';
import {Composition} from 'remotion';
import {PromptGalleryWorkflow, calculatePromptGalleryMetadata, promptGalleryDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="prompt-gallery-workflow"
    component={PromptGalleryWorkflow}
    defaultProps={promptGalleryDefaults}
    calculateMetadata={calculatePromptGalleryMetadata}
  />
);
