import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import styled from 'styled-components'

import SearchPic from '../../icons/Search'
import SearchSlash from '../../icons/SearchSlash'

const SearchBoxDiv = styled.div`
  width: 100%;
  display: flex;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  background: #fff;

  form {
    width: 100%;
    position: relative;
    height: 36px;
  }
  //search input width
  &.opened {
    position: relative;
    z-index: 100001;
    max-width: 1240px;
    width: 100%;
    height: 77px;
    background: ${theme.colors.white};
    padding: ${theme.space[20]};
    border-bottom: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.radii.small};
    border-color: ${theme.colors.white};
    form {
      max-width: 100%;
      input {
        color: ${theme.colors.gray[700]};
      }
    }

    .clear {
      background: ${theme.colors.gray[300]};
      border-radius: 6px;
      height: 36px;
      width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg path {
        stroke: ${theme.colors.gray[700]};
      }
    }
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: auto;
    flex: 1;
    form {
      width: 100%;
    }
  }

  .clear {
    display: none;
  }

  form {
    display: flex;
    align-items: center;

    button.ais-SearchBox-submit {
      display: none;
    }
    button.ais-SearchBox-reset {
      background: transparent;
      border: transparent;
      outline: none;
    }

    input {
      width: 100%;
      background: transparent;
      outline: none;
      padding: 0rem ${theme.space[32]};
      font-family: ${theme.fonts.text};
      font-style: normal;
      font-weight: normal;
      font-size: ${theme.fontSizes[16]};
      line-height: 100%;
      border-width: 0;
      &::placeholder {
        content: 'Search Documentation...';
        color: ${theme.colors.gray[500]};
        opacity: 1; /* Firefox */
      }
    }

    input[type='search']::-webkit-search-decoration,
    input[type='search']::-webkit-search-cancel-button,
    input[type='search']::-webkit-search-results-button,
    input[type='search']::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  .slash {
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 4px;
    color: ${theme.colors.gray[400]};
    min-width: 18px;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    .slash {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[700]};

    form {
      input {
        color: ${theme.colors.gray[100]};
        &::placeholder {
          color: ${theme.colors.gray[400]};
        }
      }
      svg path {
        stroke: ${theme.colors.gray[400]};
      }
    }
    &.opened {
      background: ${theme.colors.gray[800]};
    }
  }
`

const SearchIcon = styled(SearchPic)`
  min-width: 1em;
  pointer-events: none;
  //z-index: 100001;
  position: absolute;
`

const SearchSlashIcon = styled(SearchSlash)`
  pointer-events: none;
  //z-index: 100001;
  position: absolute;
  right: 0;
  @media (prefers-color-scheme: dark) {
    path {
      stroke: ${theme.colors.gray[700]};
    }
  }
`

const focusShortcuts = ['s', 191]

const SearchBox = ({ showHeaderSearch, value }: any) => {
  const inputEl = React.useRef(null)
  const onKeyDown = (e: any) => {
    const shortcuts = focusShortcuts.map((key) =>
      typeof key === 'string' ? key.toUpperCase().charCodeAt(0) : key
    )

    const elt = e.target || e.srcElement
    const tagName = elt.tagName
    if (
      elt.isContentEditable ||
      tagName === 'INPUT' ||
      tagName === 'SELECT' ||
      tagName === 'TEXTAREA'
    ) {
      // already in an input
      return
    }

    const which = e.which || e.keyCode
    if (shortcuts.indexOf(which) === -1) {
      // not the right shortcut
      return
    }

    inputEl.current.focus()
    e.stopPropagation()
    e.preventDefault()
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  React.useEffect(() => {
    if (value) {
      inputEl.current.focus()
    }
  }, [value])

  return (
    <SearchBoxDiv>
      <form>
        <SearchIcon />
        <input
          ref={inputEl}
          type="text"
          placeholder={'Search Docs...'}
          aria-label="Search Documentation..."
          onClick={showHeaderSearch}
          onFocus={showHeaderSearch}
          value={value}
        />
        <SearchSlashIcon />
      </form>
    </SearchBoxDiv>
  )
}

export default SearchBox
