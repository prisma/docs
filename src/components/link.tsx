import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'
import config from '../../config'

interface LinkProps {
  href: string | null
  activeClassName?: string
  partiallyActive?: string
  getProps?: any
  wide?: boolean
}

const Link = ({
  href,
  activeClassName,
  partiallyActive,
  getProps,
  ...props
}: LinkProps & React.ReactNode) =>
  !href || isAbsoluteUrl(href) ? (
    <a
      href={href}
      {...props}
      target={!href?.includes('prisma.io') ? '_blank' : '_self'}
      rel={!href?.includes('prisma.io') ? 'noopener' : ''}
      style={{ display: 'inline-block' }}
    >
      {props.children}
      {href && isAbsoluteUrl(href) && !href.includes('prisma.io') && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          style={{ marginLeft: '4px' }}
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
      to={href.replace(config.gatsby.pathPrefix, '')}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      getProps={getProps}
      {...props}
    />
  )

export default Link
