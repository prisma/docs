import * as t from '../primitives'

export const headerDefault = {
  backgroundColor: 'white',
  mobileNavigationBreakpoint: 1040,
  logoUrl: 'https://prismalens.vercel.app/header/logo-dark.svg',
  navItemColor: t.gray['800'],
  navItemHoverColor: {
    indigo: t.indigo[600],
    teal: t.teal[700],
    white: t.indigo[600],
  },
  mobileMenuButtonColor: t.gray['800'],
  mobileLinkDividerColor: t.gray['300'],
  // Dropdown Panel on Mobile
  mobileDropdownPanelBackgroundColor: t.blueGray['100'],
  mobileDropdownPanelHeadingColor: t.gray['600'],
  mobileDropdownPanelLinkTitleColor: t.gray['800'],
  mobileDropdownPanelLinkSubTitleColor: t.blueGray['600'],
}

export const headerDark: typeof headerDefault = {
  backgroundColor: t.black,
  logoUrl: 'https://prismalens.vercel.app/header/logo-white.svg',
  mobileNavigationBreakpoint: 1040,
  navItemColor: 'white',
  navItemHoverColor: {
    indigo: t.indigo[300],
    teal: t.teal[300],
    white: t.indigo[300],
  },
  mobileLinkDividerColor: t.gray['700'],
  mobileMenuButtonColor: 'white',
  // Dropdown Panel on Mobile
  mobileDropdownPanelBackgroundColor: t.gray['800'],
  mobileDropdownPanelHeadingColor: t.gray['400'],
  mobileDropdownPanelLinkTitleColor: 'white',
  mobileDropdownPanelLinkSubTitleColor: 'white',
}
