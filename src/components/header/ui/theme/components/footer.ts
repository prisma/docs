import * as t from '../primitives'

export const footerDefault = {
  mobileBreakpoint: 940,

  backgroundColor: 'white',
  titleColor: t.gray[700],
  titleSize: t.baseFontSizes[16],

  linkColor: t.gray[800],
  linkHoverColor: t.indigo[600],
  linkSize: t.baseFontSizes[18],

  logoUrl: 'https://website-v9.vercel.app/logo-dark.svg',
}

export const footerDark: typeof footerDefault = {
  mobileBreakpoint: 940,

  backgroundColor: t.blueGray[900],
  titleColor: 'white',
  titleSize: t.baseFontSizes[16],

  linkColor: 'white',
  linkHoverColor: t.indigo[600],
  linkSize: t.baseFontSizes[18],

  logoUrl: 'https://website-v9.vercel.app/logo-white.svg',
}
