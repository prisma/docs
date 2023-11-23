export const gray = {
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
  100: '#D9F9F6',
  200: '#B7F4EE',
  300: '#92EFE6',
  400: '#71E8DF',
  500: '#04C8BB',
  600: '#16A394',
  700: '#187367',
  800: '#154F47',
}

export const purple = {
  100: '#FAE8FA',
  200: '#F5C9F4',
  300: '#F4A0F1',
  400: '#E76DE3',
  500: '#C742C1',
  600: '#B024AD',
  700: '#891A8A',
  800: '#5B115F',
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

export const green = {
  100: '#F0FFF4',
  200: '#C6F6D5',
  300: '#9AE6B4',
  400: '#68D391',
  500: '#48BB78',
  600: '#38A169',
  700: '#276749',
  800: '#22543D',
}

export const orange = {
  100: '#FFFAF0',
  200: '#FEEBC8',
  300: '#FBD38D',
  400: '#F6AD55',
  500: '#ED8936',
  600: '#DD6B20',
  700: '#C05621',
  800: '#9C4221',
}

export const red = {
  100: '#FFF5F5',
  200: '#FED7D7',
  300: '#FEB2B2',
  400: '#FC8181',
  500: '#F56565',
  600: '#E53E3E',
  700: '#C53030',
  800: '#9B2C2C',
}

export const pink = {
  100: '#FFF5F7',
  200: '#FED7E2',
  300: '#FBB6CE',
  400: '#F687B3',
  500: '#ED64A6',
  600: '#D53F8C',
  700: '#B83280',
  800: '#97266D',
  900: '#702459',
}

export const blue = {
  100: '#EBF8FF',
  200: '#BEE3F8',
  300: '#90CDF4',
  400: '#63B3ED',
  500: '#4299E1',
  600: '#3182CE',
  700: '#2B6CB0',
  800: '#2C5282',
  900: '#2A4365',
}

export const yellow = {
  100: '#FFFFF0',
  200: '#FEFCBF',
  300: '#FAF089',
  400: '#F6E05E',
  500: '#ECC94B',
  600: '#D69E2E',
  700: '#B7791F',
  800: '#975A16',
  900: '#744210',
}

export const colors: { [key: string]: any } = {
  gray,
  red,
  indigo,
  teal,
  blueGray,
  green,
  purple,
  orange,
  pink,
  yellow,
  black,
  white: '#fff',
  blue,
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
