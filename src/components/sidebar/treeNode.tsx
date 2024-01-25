import { defaultTheme as theme } from '../../themes'
import { useLocation } from 'react-router-dom'
// import { withPrefix } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import config from '../../../config'
import ArrowDown from '../../icons/ArrowDown'
import ArrowRight from '../../icons/ArrowRight'
import { urlGenerator } from '../../utils/urlGenerator'
import Link from '../link'

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.space[12]} 0 ${theme.space[24]};
  &.has-border {
    border-left: 2px solid ${theme.colors.gray[300]};
    margin-left: -${theme.space[12]};
  }
`

const ListItem = styled.li`
  font-size: ${theme.fontSizes[14]};
  line-height: 1.25;
  margin-bottom: ${theme.space[12]};
  position: relative;
  a {
    transition: color 150ms ease 0s;
    color: ${theme.colors.gray[600]} !important;
    text-decoration: none;
    vertical-align: middle;
    &:hover {
      color: ${theme.colors.gray[900]} !important;
    }

    .tag {
      position: absolute;
      right: 0;
      color: ${theme.colors.gray[500]};
      font-size: ${theme.fontSizes[14]};
      font-style: normal;
      font-weight: 600;
      background: ${theme.colors.gray[200]};
      border-radius: ${theme.radii.small};
      padding: 2px 5px;
      text-transform: capitalize;
      &.small {
        font-size: 12px;
      }
    }

    .item-collapser {
      background: transparent;
      position: absolute;
      left: -15px;
      top: 7px;
      padding: 0;
      border: 0;

      .right,
      .down {
        transition: opacity 0.5s linear;
      }

      .right.open,
      .down.close {
        display: none;
        opacity: 0;
      }

      .right.close,
      .down.open {
        display: block;
        opacity: 1;
        position: absolute;
        margin-top: -4px;
      }

      .down.open {
        margin-top: -2px;
      }

      &:hover,
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  .active-item {
    color: ${theme.colors.blue[600]} !important;
    font-weight: 700;
  }
  &.top-level {
    margin-top: ${theme.space[32]};
    > a {
      font-size: 1.125rem;
      color: ${theme.colors.gray[900]} !important;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    > ul {
      margin-top: ${theme.space[12]};
    }
  }
  &.bottom-level {
    margin-left: ${theme.space[20]};
  }
  &.static-link {
    margin-top: ${theme.space[20]};
  }
  &.static-link > a {
    color: ${theme.colors.gray[900]} !important;
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.fontSizes[12]};
    line-height: ${theme.space[14]};
    letter-spacing: 0.02em;
    &:hover {
      color: ${theme.colors.gray[900]} !important;
    }
  }
  &.last-level {
    padding-left: ${theme.space[24]};

    // .last-level {
    //   /*this one is last for real*/
    //   padding-left: ${theme.space[16]};
    // }
  }
  .collapse-title {
    position: relative;
    cursor: pointer;
    svg {
      transition: transform 0.2s ease;
    }
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: ${theme.colors.gray[500]} !important;
      &:hover {
        color: ${theme.colors.gray[400]} !important;
      }
      .tag {
        color: ${theme.colors.gray[100]} !important;
        background: ${theme.colors.gray[800]} !important;
      }
    }
    .active-item {
      color: ${theme.colors.indigo[400]} !important;
    }
    &.top-level,
    &.static-link {
      > a {
        color: ${theme.colors.gray[100]} !important;
        &:hover {
          color: ${theme.colors.gray[100]} !important;
        }
      }
    }
  }
`

const TreeNode = ({
  className = '',
  setCollapsed,
  collapsed,
  url,
  slug,
  title,
  navTitle,
  items,
  label,
  topLevel,
  staticLink,
  duration,
  preview,
  deprecated,
  earlyaccess,
  lastLevel,
  hidePage,
  codeStyle,
  parents,
}: any) => {
  const SpecialPaths = config.siteMetadata.SpecialPaths

  let isCollapsed = collapsed[label]
  const hasChildren = items.length !== 0

  const collapse = () => {
    Object.keys(collapsed).map((lbl) => {
      if ((lbl !== label && !parents) || (lbl !== label && parents && !parents.includes(lbl))) {
        collapsed[lbl] = collapsed[lbl] == false ? (collapsed[lbl] = true) : collapsed[lbl]
      }
    })
    setCollapsed(label, false, parents)
  }

  const justExpand = (e: any) => {
    setCollapsed(label, true)
    e.preventDefault()
    e.stopPropagation()
  }

  const location = useLocation()
  const level = slug ? slug.split('/').indexOf(label) : ''

  const calculatedClassName = `${className || ''} ${topLevel ? 'top-level' : ''} ${
    staticLink ? 'static-link' : ''
  } ${lastLevel ? 'last-level' : ''} ${level > 2 ? 'more-padding' : ''}`

  items.sort((a: any, b: any) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })

  const hasExpandButton = title && hasChildren && !staticLink && !topLevel
  let hasBorder: boolean = false
  if (hasExpandButton) {
    items.map((item: any) => (item.lastLevel = true))
    hasBorder = true
  }

  // Fix for issue https://github.com/prisma/prisma2-docs/issues/161
  const [isOpen, setIsOpen] = React.useState('close')
  React.useEffect(() => {
    let mounted = true

    if (mounted) {
      setIsOpen(isCollapsed ? 'close' : 'open')
    }

    return function cleanup() {
      mounted = false
    }
  }, [isCollapsed])

  React.useEffect(() => {
    if (lastLevel && isCurrent && hasExpandButton && collapsed[label]) setCollapsed(label, true)
  }, [])

  const specialCases =
    slug &&
    (SpecialPaths.find((e: string) =>
      urlGenerator(slug)
        .replace(/\/index$/, '')
        .endsWith(e)
    )
      ? '/'
      : '')

  const isCurrent =
    location &&
    slug &&
    location.pathname.includes(urlGenerator(slug).replace(/\/index$/, '') + specialCases)

  return url === '/' ? null : (
    <ListItem className={calculatedClassName}>
      {title && label !== 'index' && !hidePage && (
        <Link
          to={staticLink || topLevel ? null : url}
          activeClassName="active-item"
          className={isCurrent ? 'active-item' : 'non-active'}
          id={url}
          sidenav={true}
        >
          {hasExpandButton ? (
            <span className="collapse-title" onClick={collapse}>
              <button aria-label="collapse" className={`item-collapser`} onClick={justExpand}>
                {/* Fix for issue https://github.com/prisma/prisma2-docs/issues/161 */}
                <ArrowRight className={`right ${isOpen}`} />
                <ArrowDown className={`down ${isOpen}`} />
              </button>
              <span className={`${codeStyle ? 'inline-code' : ''}`}>{navTitle || title}</span>
            </span>
          ) : (
            <span className={`${codeStyle ? 'inline-code' : ''}`} onClick={collapse}>
              {navTitle || title}
            </span>
          )}
          {duration && <span className="tag">{duration}</span>}
          {preview && <span className="tag small">Preview</span>}
          {deprecated && <span className="tag small">Deprecated</span>}
          {earlyaccess && <span className="tag small">Early Access</span>}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <List className={`${hasBorder ? 'has-border' : ''}`}>
          {items.map((item: any, index: number) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </List>
      ) : null}
    </ListItem>
  )
}
export default TreeNode
