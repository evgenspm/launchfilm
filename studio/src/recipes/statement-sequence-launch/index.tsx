// Registers the recipe with a demo brand. Size, fps and length come from calculateMetadata (props), so another
// brand / copy / aspect is just --props, e.g. npx remotion render statement-sequence-launch --props='{"aspect":"9:16"}'
import React from 'react';
import {Composition} from 'remotion';
import {StatementLaunch, calculateStatementLaunchMetadata, statementLaunchDefaults} from './Recipe';
import recipe from './recipe.json';

/** The parsed recipe.json: Root files the composition under recipes/<family>. */
export {recipe};

export const compositions = (
  <Composition
    id="statement-sequence-launch"
    component={StatementLaunch}
    defaultProps={statementLaunchDefaults}
    calculateMetadata={calculateStatementLaunchMetadata}
  />
);
