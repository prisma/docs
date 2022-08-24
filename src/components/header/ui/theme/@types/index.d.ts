import '@emotion/react'
import { defaultTheme } from '../index'

declare module '@emotion/react' {
  type DefaultPrismaTheme = typeof defaultTheme
  export interface Theme extends DefaultPrismaTheme {}
}
