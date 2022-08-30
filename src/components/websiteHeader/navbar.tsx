import styled from 'styled-components'
import * as React from 'react'
import _ from 'lodash'
import { ChevronDown, Menu, X } from 'react-feather'
import * as t from './themePrimitives'

const mobileNavigationBreakpoint = 940

type NavBarState = {
  mobileOpen: boolean
  navItems: { [key: string | number]: boolean }
}
type NavBarAction =
  | { type: 'TOGGLE_NAV_ITEM'; navItemKey: string | number }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'CLOSE' }
function navBarReducer(state: NavBarState, action: NavBarAction): NavBarState {
  switch (action.type) {
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        mobileOpen: !state.mobileOpen,
        navItems: { ..._.mapValues(state.navItems, () => false) },
      }
    case 'TOGGLE_NAV_ITEM':
      return {
        ...state,
        navItems: {
          ..._.mapValues(state.navItems, () => false),
          [action.navItemKey]: !state.navItems[action.navItemKey],
        },
      }
    case 'CLOSE':
      return {
        ...state,
        navItems: _.mapValues(state.navItems, () => false),
        mobileOpen: false,
      }
    default:
      return state
  }
}
let lastId = 0
function _nextId() {
  lastId++
  return lastId
}
type NavBarContextType = {
  nextId: typeof _nextId
  state: NavBarState
  dispatch: React.Dispatch<NavBarAction>
}
export const NavBarContext = React.createContext<NavBarContextType>({} as NavBarContextType)

type NavBarProps = { children: React.ReactNode }

export const NavBar = (props: NavBarProps) => {
  const [state, dispatch] = React.useReducer(navBarReducer, {
    navItems: {},
    mobileOpen: false,
  })

  React.useEffect(() => {
    const resize = () => {
      if (typeof window !== `undefined` && window.innerWidth >= mobileNavigationBreakpoint) {
        dispatch({ type: 'CLOSE' })
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  React.useEffect(() => {
    if (state.mobileOpen) {
      window.document.body.classList.add('mobile-nav-opened')
    } else {
      window.document.body.classList.remove('mobile-nav-opened')
    }
  }, [state.mobileOpen])

  return (
    <NavBarContext.Provider value={{ nextId: _nextId, state, dispatch }}>
      {props.children}
    </NavBarContext.Provider>
  )
}

export const NavBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  @media only screen and (min-width: ${mobileNavigationBreakpoint}px) {
    padding: 8px 0;
    flex-direction: row;
    width: auto;
  }
`

export const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
    gap: 10px;
    flex-direction: row;
    width: auto;
  }
  .item {
    width: 100%;
    @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
      width: auto;
    }

    &:after {
      display: block;
      content: '';
      background-color: ${t.headerDark.mobileLinkDividerColor};
      width: auto;
      height: 1px;
      margin: -1px 24px 0;
      box-sizing: content-box;
      @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
        display: none;
      }
    }

    &:last-child:after {
      display: none;
    }

    & > a {
      color: ${t.headerDark.navItemColor};
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      line-height: ${24 / 16};
      position: relative;
      justify-content: space-between;
      padding: 31px 24px;
      align-items: center;
      @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
        padding: 12px 16px;
        min-height: 48px;
      }
      &:after {
        @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
          display: block;
          transition: opacity 0.1s ease;
          content: '';
          height: 2px;
          opacity: 0;
          background-color: ${t.headerDark.navItemHoverColor};
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: -14px;
        }
      }
      &.has-dropdown {
        &:after {
          right: 22px;
        }
      }
    }

    @media only screen and (max-width: ${t.headerDark.mobileNavigationBreakpoint - 1}px) {
      .panel-spacer {
        & > div {
          width: 100%;
          max-width: 100%;
          box-shadow: none;
          border-radius: 0;
        }
      }
    }

    .panel-outer {
      display: none;
    }
    @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
      .panel-outer {
        position: relative;
        display: none;
        z-index: 200;
      }
      .panel-inner {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
      }
      .panel-spacer {
        padding-top: 28px;
      }

      &:hover {
        .panel-outer {
          display: block;
        }
        & > a {
          color: ${t.headerDark.navItemHoverColor};
          &:after {
            opacity: 1;
          }

          &.has-dropdown {
            .item-chevron {
              transform: scaleY(-1);
            }
          }
        }
      }
      &.active-el > a {
        color: ${t.headerDark.navItemHoverColor};
      }
    }

    @media only screen and (max-width: ${t.headerDark.mobileNavigationBreakpoint - 1}px) {
      &.open {
        .has-dropdown {
          .item-chevron {
            transform: scaleY(-1);
          }
        }
        .panel-outer {
          display: block;
        }
      }
    }
  }
`

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-family: ${t.fonts.text};
  font-size: ${t.fontSizes['16']};
  color: ${t.colors.gray[800]};
  line-height: 1;
  transition: color 0.1s ease;
  &:hover {
    @media only screen and (min-width: ${t.headerDark.mobileNavigationBreakpoint}px) {
      color: ${t.indigo['600']};
    }
  }
`

type DropdownPositionedProps = {
  children: React.ReactNode
  className?: string
}
const DropdownPositioned = ({ children, className }: DropdownPositionedProps) => (
  <div className={`panel-outer ${className}`}>
    <div className="panel-inner">
      <div className="panel-spacer">{children}</div>
    </div>
  </div>
)

type NavItemProps = {
  href?: string
  title: React.ReactNode
  dropdown?: React.ReactNode
  active?: boolean
  onClick?: () => void
}
export const NavItem = ({ href, title, dropdown, active, onClick }: NavItemProps) => {
  const instanceRef = React.useRef({ id: 0 })
  const context = React.useContext(NavBarContext)
  React.useEffect(() => {
    instanceRef.current.id = context.nextId()
  }, [])

  const navlink = (href?: string) => (
    <NavLink
      onClick={
        !href
          ? () =>
              context.dispatch({
                type: 'TOGGLE_NAV_ITEM',
                navItemKey: instanceRef.current.id,
              })
          : undefined
      }
      href={href ? href : undefined}
      className={dropdown ? 'has-dropdown' : ''}
    >
      {title}
      {dropdown && <ChevronDown className="item-chevron" strokeWidth={1} />}
    </NavLink>
  )

  return (
    <div
      className={
        'item' +
        (context.state.navItems[instanceRef.current.id] ? ' open' : '') +
        (active ? ' active-el' : '')
      }
      onClick={onClick}
    >
      {navlink(href)}

      {dropdown && <DropdownPositioned>{dropdown}</DropdownPositioned>}
    </div>
  )
}
export const MenuButton = () => {
  const {
    state: { mobileOpen },
    dispatch,
  } = React.useContext(NavBarContext)
  return (
    <a onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })} className={'menu-toggle-button'}>
      {mobileOpen ? <X /> : <Menu />}
    </a>
  )
}
