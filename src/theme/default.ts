import * as breakpoints from './breakpoints'
import { buttonsDefault } from './components/buttons'
import { centerCardDefault } from './components/centerCard'
import { contentCardDefault } from './components/contentCard'
import { darkCardDefault } from './components/darkCard'
import { footerDefault } from './components/footer'
import { headerDefault } from './components/header'
import { heroDefault } from './components/hero'
import { labelsDefault } from './components/labels'
import * as t from './primitives'

const theme = {
  breakpoints,

  bodyBackgroundColor: 'white',

  header: headerDefault,
  footer: footerDefault,
  hero: heroDefault,

  labels: labelsDefault,

  buttons: buttonsDefault,
  centerCard: centerCardDefault,
  contentCard: contentCardDefault,
  darkCard: darkCardDefault,

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
