import React from 'react'

import 'normalize.css'

type Props = React.PropsWithChildren<{}>

export function WebProvider({ children }: Props) {
  return <>{children}</>
}
