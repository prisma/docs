import * as t from '../primitives'

export const footerDefault = {
  mobileBreakpoint: 940,

  backgroundColor: 'white',
  titleColor: t.gray[700],
  titleSize: t.baseFontSizes[16],

  linkColor: t.gray[800],
  linkHoverColor: {
    indigo: t.indigo[600],
    teal: t.teal[700],
    white: t.indigo[600],
  },
  linkSize: t.baseFontSizes[18],

  logoUrl: 'https://prismalens.vercel.app/header/logo-dark.svg',
}

export const footerDark: typeof footerDefault = {
  mobileBreakpoint: 940,

  backgroundColor: t.blueGray[900],
  titleColor: 'white',
  titleSize: t.baseFontSizes[16],

  linkColor: 'white',
  linkHoverColor: {
    indigo: t.indigo[600],
    teal: t.teal[600],
    white: t.indigo[600],
  },
  linkSize: t.baseFontSizes[18],

  logoUrl: 'https://prismalens.vercel.app/header/logo-white.svg',
}
