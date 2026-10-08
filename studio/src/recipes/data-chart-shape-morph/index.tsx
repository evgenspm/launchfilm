import React from 'react';
import {Composition} from 'remotion';
import {DataChartShapeMorph, calculateDataChartShapeMorphMetadata, dataChartShapeMorphDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="data-chart-shape-morph"
    component={DataChartShapeMorph}
    defaultProps={dataChartShapeMorphDefaults}
    calculateMetadata={calculateDataChartShapeMorphMetadata}
  />
);
