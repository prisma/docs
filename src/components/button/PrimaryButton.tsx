import styled from 'styled-components'
import Button from './Button'
import { theme } from '@prisma/lens/dist/web'

export const PrimaryButton = styled(Button)`
  background: ${theme.colors.gray700};
  color: ${theme.colors.white};
  &:hover {
    background: ${theme.colors.gray600};
  }
`
