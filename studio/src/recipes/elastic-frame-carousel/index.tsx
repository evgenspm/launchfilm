import React from 'react';
import {Composition} from 'remotion';
import {ElasticFrameCarousel, calculateElasticFrameCarouselMetadata, elasticFrameCarouselDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="elastic-frame-carousel"
    component={ElasticFrameCarousel}
    defaultProps={elasticFrameCarouselDefaults}
    calculateMetadata={calculateElasticFrameCarouselMetadata}
  />
);
