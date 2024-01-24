import * as t from '../primitives'

export const heroDefault = {
  backgroundColor: 'white',
  mobileNavigationBreakpoint: 940,
  leftGrid: '/grid-left.svg',
  rightGrid: '/grid-right.svg',
  navItemColor: t.gray['800'],
  navItemHoverColor: t.indigo[600],

  mobileMenuButtonColor: t.gray['800'],
  mobileLinkDividerColor: t.gray['300'],
}

export const heroDark: typeof heroDefault = {
  backgroundColor: t.black,
  mobileNavigationBreakpoint: 940,
  leftGrid: '/grid-left.svg',
  rightGrid: '/grid-right.svg',
  navItemColor: 'white',
  navItemHoverColor: t.indigo[300],

  mobileLinkDividerColor: t.gray['700'],
  mobileMenuButtonColor: 'white',
}
