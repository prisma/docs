import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'

interface LinkProps {
  to: string | null
  activeClassName?: string
}

const Link = ({ to, activeClassName, ...props }: LinkProps & React.ReactNode) =>
  !to || isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} activeClassName={activeClassName} {...props} />
  )

export default Link
