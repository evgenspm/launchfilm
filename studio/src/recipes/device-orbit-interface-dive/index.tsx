import React from 'react';
import {Composition} from 'remotion';
import {DeviceOrbitInterfaceDive, calculateDeviceOrbitInterfaceDiveMetadata, deviceOrbitInterfaceDiveDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="device-orbit-interface-dive"
    component={DeviceOrbitInterfaceDive}
    defaultProps={deviceOrbitInterfaceDiveDefaults}
    calculateMetadata={calculateDeviceOrbitInterfaceDiveMetadata}
  />
);
