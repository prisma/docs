import 'styled-components'

import { defaultTheme } from '../index'

// and extend them!
declare module 'styled-components' {
  type DefaultPrismaTheme = typeof defaultTheme
  export interface DefaultTheme extends DefaultPrismaTheme {}
}
