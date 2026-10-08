// Registers the recipe with the fictional Northfern demo brand.
import React from 'react';
import {Composition} from 'remotion';
import {MobileDeviceOrbitClose, calculateMobileDeviceOrbitMetadata, mobileDeviceOrbitDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="mobile-device-orbit-close"
    component={MobileDeviceOrbitClose}
    defaultProps={mobileDeviceOrbitDefaults}
    calculateMetadata={calculateMobileDeviceOrbitMetadata}
  />
);
