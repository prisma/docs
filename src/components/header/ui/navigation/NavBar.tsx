import styled, { css } from 'styled-components'
import { HTMLAttributes, useContext, useEffect, useReducer, useRef } from 'react'
import * as React from 'react'
import _ from 'lodash'
import * as NT from './Typography'
import * as t from '../../theme/primitives'
import { ChevronDown, Menu, X } from 'react-feather'
import { Button } from '../controls/Button'
import { darkTheme, defaultTheme } from '../../theme'

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
  lightTheme: boolean
}
export const NavBarContext = React.createContext<NavBarContextType>({} as NavBarContextType)
type NavBarProps = { children: React.ReactNode; lightTheme: boolean }
export const NavBar = (props: NavBarProps) => {
  const themeToUse = props.lightTheme ? defaultTheme : darkTheme
  const [state, dispatch] = useReducer(navBarReducer, {
    navItems: {},
    mobileOpen: false,
  })

  useEffect(() => {
    console.log(state.navItems)
    console.log(_.mapValues(state.navItems, () => false))
  }, [state])
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= themeToUse.header.mobileNavigationBreakpoint) {
        dispatch({ type: 'CLOSE' })
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (state.mobileOpen) {
      window.document.body.classList.add('mobile-nav-opened')
    } else {
      window.document.body.classList.remove('mobile-nav-opened')
    }
  }, [state.mobileOpen])

  return (
    <NavBarContext.Provider
      value={{ lightTheme: props.lightTheme, nextId: _nextId, state, dispatch }}
    >
      {props.children}
    </NavBarContext.Provider>
  )
}

export const NavBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  @media only screen and (min-width: ${defaultTheme.header.mobileNavigationBreakpoint}px) {
    padding: 8px 0;
    flex-direction: row;
    width: auto;
  }
`

type NavLinksProps = HTMLAttributes<HTMLDivElement> & { lightTheme: boolean }
export const NavItemsContainer = styled(({ lightTheme, ...rest }: NavLinksProps) => (
  <div {...rest} />
))(({ lightTheme }) => {
  const themeToUse = lightTheme ? defaultTheme : darkTheme
  return css`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
      gap: 10px;
      flex-direction: row;
      width: auto;
    }
    .item {
      width: 100%;
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        width: auto;
      }

      &:after {
        display: block;
        content: '';
        background-color: ${themeToUse.header.mobileLinkDividerColor};
        width: auto;
        height: 1px;
        margin: -1px 24px 0;
        box-sizing: content-box;
        @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
          display: none;
        }
      }

      &:last-child:after {
        display: none;
      }

      & > a {
        color: ${themeToUse.header.navItemColor};
        cursor: pointer;
        display: flex;
        height: 100%;
        align-items: center;
        line-height: ${24 / 16};
        position: relative;
        justify-content: space-between;
        padding: 31px 24px;
        align-items: center;
        @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
          padding: 12px 16px;
          min-height: 48px;
        }
        &:after {
          @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
            display: block;
            transition: opacity 0.1s ease;
            content: '';
            height: 2px;
            opacity: 0;
            background-color: ${themeToUse.header.navItemHoverColor};
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

      @media only screen and (max-width: ${themeToUse.header.mobileNavigationBreakpoint - 1}px) {
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
      @media only screen and (min-width: ${themeToUse.header.mobileNavigationBreakpoint}px) {
        .panel-outer {
          position: relative;
          display: none;
          z-index: 1;
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
            color: ${themeToUse.header.navItemHoverColor};
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
          color: ${themeToUse.header.navItemHoverColor};
        }
      }

      @media only screen and (max-width: ${themeToUse.header.mobileNavigationBreakpoint - 1}px) {
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
})

type DropdownPositionedProps = {
  children: React.ReactNode
  className?: string
  lightTheme?: boolean
}
const DropdownPositioned = ({ children, className }: DropdownPositionedProps) => (
  <div className={`panel-outer ${className}`}>
    <div className="panel-inner">
      <div className="panel-spacer">{children}</div>
    </div>
  </div>
)

const NavLink = styled(NT.Link.withComponent('a'))`
  transition: color 0.1s ease;
  &:hover {
    @media only screen and (min-width: ${defaultTheme.header.mobileNavigationBreakpoint}px) {
      color: ${t.indigo['600']};
    }
  }
`

type NavItemProps = {
  href?: string
  title: React.ReactNode
  dropdown?: React.ReactNode
  active?: boolean
  onClick?: () => void
  lightTheme: boolean
}
export const NavItem = ({ href, title, dropdown, active, onClick, lightTheme }: NavItemProps) => {
  const instanceRef = useRef({ id: 0 })
  const context = useContext(NavBarContext)

  const navlink = (href?: string) => (
    <NavLink
      href={href ? href : undefined}
      className={dropdown ? 'has-dropdown' : '' + lightTheme ? ' light' : ''}
    >
      {title}
      {dropdown && <ChevronDown className="item-chevron" strokeWidth={1} />}
    </NavLink>
  )

  return (
    <div className={'item' + (active ? ' active-el' : '')} onClick={onClick}>
      {navlink(href)}

      {dropdown && <DropdownPositioned>{dropdown}</DropdownPositioned>}
    </div>
  )
}

export const MenuButton = () => {
  const {
    state: { mobileOpen },
    dispatch,
  } = useContext(NavBarContext)
  return (
    <Button
      onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
      className={'menu-toggle-button'}
    >
      {mobileOpen ? <X /> : <Menu />}
    </Button>
  )
}
