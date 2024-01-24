import * as t from '../primitives'

const labelDefault = {
  backgroundColor: t.gray[500],
  color: 'white',
  fontSize: t.fontSizes[14],
  padding: `${t.baseSpace[5]} ${t.baseSpace[8]}`,
  borderRadius: '4px',
}

export const labelsDefault = {
  default: labelDefault,
  primary: { ...labelDefault, backgroundColor: t.indigo[600] },
  secondary: { ...labelDefault, backgroundColor: t.teal[600] },
}
