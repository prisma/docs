import * as breakpoints from './breakpoints'
import { buttonsDefault } from './components/buttons'
import { centerCardDark } from './components/centerCard'
import { contentCardDark } from './components/contentCard'
import { darkCardDark } from './components/darkCard'
import { footerDark } from './components/footer'
import { headerDark } from './components/header'
import { heroDark } from './components/hero'
import { labelsDefault } from './components/labels'
import * as t from './primitives'

const theme = {
  breakpoints,

  bodyBackgroundColor: 'white',

  header: headerDark,
  footer: footerDark,
  hero: heroDark,

  labels: labelsDefault,

  buttons: buttonsDefault,

  centerCard: centerCardDark,
  contentCard: contentCardDark,
  darkCard: darkCardDark,

  fonts: t.fonts,
  fontSizes: t.fontSizes,
  colors: t.colors,
  space: t.space,
  transitions: {
    standard: '0.1s ease-in',
  },
  shadows: {
    small: '0px 4px 8px rgba(60,45,111,0.1), 0px 1px 3px rgba(60,45,111,0.15)',
  },
  radii: {
    small: '5px',
    medium: '8px',
  },
}

export default theme
