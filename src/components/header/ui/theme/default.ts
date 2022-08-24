import * as t from './primitives'
import { buttonsDefault } from './components/buttons'
import { labelsDefault } from './components/labels'
import { headerDefault } from './components/header'
import { footerDefault } from './components/footer'
import * as breakpoints from './breakpoints'

const theme = {
  breakpoints,

  bodyBackgroundColor: 'white',

  header: headerDefault,
  footer: footerDefault,

  labels: labelsDefault,

  buttons: buttonsDefault,

  fonts: t.fonts,
  fontSizes: t.fontSizes,
  colors: t.colors,
  space: t.space,
}

export default theme
