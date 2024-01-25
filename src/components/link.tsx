// import { Link as GatsbyLink } from 'gatsby'
// import isAbsoluteUrl from 'is-absolute-url'
import Link from '@docusaurus/Link'
// import React from 'react'
// import CustomLink from './customLink'

interface LinkProps {
  to: string | null
  activeClassName?: string
  partiallyActive?: string
  getProps?: any
  wide?: boolean
  sidenav?: boolean
}

// const Link = ({
//   to,
//   activeClassName,
//   partiallyActive,
//   getProps,
//   sidenav = false,
//   ...props
// }: LinkProps & React.ReactNode) => {
//   return (!to || isAbsoluteUrl(to)) && !sidenav ? (
//     <CustomLink
//       href={to}
//       {...props}
//       mdx={true}
//       // target={!to?.includes('prisma.io') ? '_blank' : '_self'}
//       // rel={!to?.includes('prisma.io') ? 'noopener' : ''}
//       style={{ display: 'inline-block' }}
//     >
//       {props.children}
//       {to && isAbsoluteUrl(to) && (!to.includes('prisma.io') || to.includes('slack.prisma.io')) && (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="12"
//           style={{ marginLeft: '4px' }}
//           height="12"
//           viewBox="0 0 12 12"
//           fill="currentColor"
//           color="inherit"
//         >
//           <path
//             fill="inherit"
//             d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16L6 1Z M2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
//           />
//         </svg>
//       )}
//     </CustomLink>
//   ) : (
//     <GatsbyLink
//       to={to}
//       activeClassName={activeClassName}
//       partiallyActive={partiallyActive}
//       getProps={getProps}
//       {...props}
//     />
//   )
// }

export default Link
