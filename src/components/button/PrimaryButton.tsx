import styled from 'styled-components'
import Button from './Button'
import { defaultTheme as theme } from '@prisma/lens/dist/web'

export const PrimaryButton = styled(Button)`
  background: ${theme.colors.gray[700]};
  color: ${theme.colors.white};
  &:hover {
    background: ${theme.colors.gray[600]};
  }
`
