import styled from 'styled-components'
import Button from './Button'
import { defaultTheme as theme } from '@prisma/lens/dist/web'

export const SecondaryButton = styled(Button)`
  background: ${theme.colors.gray[300]};
  color: ${theme.colors.text};
  &:hover {
    background: ${theme.colors.gray[200]};
  }
`
