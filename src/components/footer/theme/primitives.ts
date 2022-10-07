export const gray = {
  100: '#F7FAFC',
  300: '#E2E8F0',
  400: '#CBD5E0',
  500: '#A0AEC0',
  600: '#718096',
  700: '#4A5568',
  800: '#2D3748',
}

export const black = '#1A202C'

export const blueGray = {
  100: '#F7FAFC',
  200: '#EDF2F7',
  300: '#E2E8F0',
  400: '#CBD5E0',
  500: '#A0AEC0',
  600: '#718096',
  700: '#4A5568',
  800: '#2D3748',
  900: '#1A202C',
}

export const teal = {
  500: '#38B2AC',
  600: '#319795',
  700: '#187367',
  800: '#154F47',
}

export const indigo = {
  100: '#EBF4FF',
  200: '#C3DAFE',
  300: '#A3BFFA',
  400: '#7F9CF5',
  500: '#667EEA',
  600: '#5A67D8',
  700: '#4C51BF',
  800: '#434190',
}

export const red = {
  700: '#C53030',
}

export const colors = {
  gray,
  red,
  indigo,
  teal,
  blueGray,
  text: gray[800],
  textSecondary: gray[600],
}

export const fonts = {
  text: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  display: `"Barlow", system-ui,  Arial, sans-serif`,
  mono: `"JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  heading: `'Barlow', sans-serif`,
}

export const baseFontSizes = {
  12: '.75rem',
  14: '.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  22: '1.375rem',
  24: '1.5rem',
  26: '1.625rem',
  28: '1.75rem',
  30: '1.875rem',
  32: '2rem',
  36: '2.25rem',
  38: '2.375rem',
  40: '2.5rem',
  48: '3rem',
  56: '3.5rem',
  64: '4rem',
  72: '4.5rem',
}

export const fontSizes = {
  ...baseFontSizes,
  small: baseFontSizes[14],
  body: baseFontSizes[16],
  large: baseFontSizes[20],
  display: baseFontSizes[48],
  displaySmall: baseFontSizes[24],
  displayLarge: baseFontSizes[72],
}

export const baseSpace = {
  0: '0rem',
  1: '1px',
  2: '0.125rem',
  4: '0.25rem',
  5: `${5 / 16}rem`, // Maybe don't use this even though it's from design?
  6: `${6 / 16}rem`, // Maybe don't use this even though it's from design?
  8: '0.5rem',
  12: '0.75rem',
  14: '0.875rem',
  15: `${15 / 16}rem`,
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  22: '1.375rem',
  24: '1.5rem',
  26: `${26 / 16}rem`,
  30: `${30 / 16}rem`,
  32: '2rem',
  40: '2.5rem',
  45: `${45 / 16}rem`,
  48: '3rem',
  64: '4rem',
  80: '5rem',
  96: '6rem',
  128: '8rem',
  160: '10rem',
  192: '12rem',
  224: '14rem',
  256: '16rem',
}

export const space = {
  ...baseSpace,
  none: baseSpace[0],
  one: baseSpace[1],
  small: baseSpace[8],
  medium: baseSpace[12],
  large: baseSpace[20],
}
