import styled from 'styled-components'
import Button from './Button'
import { defaultTheme as theme } from '@prisma/lens/dist/web'

export enum AccentColor {
  RED = 'RED',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
}

export const AccentButton = styled(Button)<{ color: AccentColor }>`
  background: ${(p) => colorForOption(p.color)};
  color: ${theme.colors.white};
  &:hover {
    background: ${(p) => hoverColorForOption(p.color)};
  }
`

const colorForOption = (color?: AccentColor) => {
  switch (color) {
    case AccentColor.RED:
      return theme.colors.red[600]
    case AccentColor.ORANGE:
      return theme.colors.orange[600]
    default:
      return theme.colors.purple[600]
  }
}

const hoverColorForOption = (color?: AccentColor) => {
  switch (color) {
    case AccentColor.RED:
      return theme.colors.red[700]
    case AccentColor.ORANGE:
      return theme.colors.orange[700]
    default:
      return theme.colors.purple[700]
  }
}
