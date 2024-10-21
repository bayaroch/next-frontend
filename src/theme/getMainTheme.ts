import type {} from '@mui/material/themeCssVarsAugmentation'
import { ThemeOptions, PaletteMode } from '@mui/material/styles'
import {
  colorSchemes,
  getDesignTokens,
  shadows,
  shape,
  typography,
} from './themePrimitives'
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations'

export default function getMainTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...shadows,
    ...colorSchemes,
    ...shape,
    ...typography,
    ...getDesignTokens(mode),
    typography,
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  }
}
