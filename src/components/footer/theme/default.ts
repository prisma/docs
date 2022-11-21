import { buttonsDefault } from './component/buttons'
import * as t from './primitives'

const theme = {
  breakpoints: {
    mobile: 360,
    tabletVertical: 768,
    desktopSmall: 940,
    tabletHorizontal: 1024,
    desktopLarge: 1440,
  },
  buttons: buttonsDefault,
  fonts: t.fonts,
  fontSizes: t.fontSizes,
  colors: t.colors,
  space: t.space,
}

export default theme
