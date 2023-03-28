import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'

interface LinkProps {
  to: string | null
  activeClassName?: string
  partiallyActive?: string
  getProps?: any
}

const Link = ({
  to,
  activeClassName,
  partiallyActive,
  getProps,
  ...props
}: LinkProps & React.ReactNode) =>
  !to || isAbsoluteUrl(to) ? (
    <a href={to} {...props} target="__blank" rel="noopener">
      {props.children}
      {to && isAbsoluteUrl(to) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          color="inherit"
        >
          <path
            fill="inherit"
            d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16L6 1Z M2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          />
        </svg>
      )}
    </a>
  ) : (
    <GatsbyLink
      to={to}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      getProps={getProps}
      {...props}
    />
  )

export default Link
