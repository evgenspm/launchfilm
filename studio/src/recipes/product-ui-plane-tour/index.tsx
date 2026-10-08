import React from 'react';
import {Composition} from 'remotion';
import {ProductUiPlaneTour, calculateProductUiPlaneTourMetadata, productUiPlaneTourDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="product-ui-plane-tour"
    component={ProductUiPlaneTour}
    defaultProps={productUiPlaneTourDefaults}
    calculateMetadata={calculateProductUiPlaneTourMetadata}
  />
);
