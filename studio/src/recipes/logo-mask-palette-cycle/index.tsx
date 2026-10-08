import React from 'react';
import {Composition} from 'remotion';
import {LogoMaskPaletteCycle, calculateLogoMaskPaletteMetadata, logoMaskPaletteDefaults} from './Recipe';
import recipe from './recipe.json';

export {recipe};

export const compositions = (
  <Composition
    id="logo-mask-palette-cycle"
    component={LogoMaskPaletteCycle}
    defaultProps={logoMaskPaletteDefaults}
    calculateMetadata={calculateLogoMaskPaletteMetadata}
  />
);
