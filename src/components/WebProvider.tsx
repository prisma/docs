import React from 'react'

import '../styles/fontawesome.min.css'
import '../styles/all.css'
import 'normalize.css'

type Props = React.PropsWithChildren<{}>

export function WebProvider({ children }: Props) {
  return <>{children}</>
}
