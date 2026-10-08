import React from 'react';
import {Composition} from 'remotion';
import {PhoneOrbitFeatureJourney, calculatePhoneOrbitFeatureJourneyMetadata, phoneOrbitFeatureJourneyDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="phone-orbit-feature-journey"
    component={PhoneOrbitFeatureJourney}
    defaultProps={phoneOrbitFeatureJourneyDefaults}
    calculateMetadata={calculatePhoneOrbitFeatureJourneyMetadata}
  />
);
