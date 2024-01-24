import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'

import useWindowDimensions from '../../hooks/useWindowDimensions'
import Clear from '../../icons/Clear'
import SearchPic from '../../icons/Search'
import SearchSlash from '../../icons/SearchSlash'

const SearchBoxDiv = styled.div<{ minimal?: boolean; wide?: boolean }>`
  width: 100%;
  display: flex;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  background: #fff;
  transition: transform 50ms ease-out;
  transform-origin: center left;

  form {
    width: 100%;
    position: relative;
    height: 36px;
    transition: transform 50ms ease-out;
  }
  //search input width
  &.opened {
    position: relative;
    z-index: 100001;
    max-width: ${(p) => (p.wide ? '1440px' : '1240px')};
    width: 100%;
    background: ${theme.colors.white};
    box-shadow: 0px 25px 50px -12px #00000040;
    border: 2px solid #667eea;
    border-radius: 8px;
    transform-origin: center;
    transform: scaleY(1.1)
      ${(props) => (props.minimal ? `translateX(-1px)` : `translate(-1px, -5px)`)};

    .clear {
      //background: ${theme.colors.gray[300]};
      border-radius: 6px;
      // height: 36px;
      // width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg path {
        stroke: ${theme.colors.gray[700]};
      }
    }
    form {
      transform: scaleY(0.9);
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
      .clear {
        svg path {
          stroke: ${theme.colors.gray[100]};
        }
      }
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

const ClearIcon = styled(Clear)`
  cursor: pointer;
`

const DEBOUNCE_DELAY = 500
const ESCAPE_KEY = 27
const focusShortcuts = ['s', 191]

const SearchBox = ({
  refine,
  onFocus,
  currentRefinement,
  isOpened,
  closeSearch,
  upClicked,
  downClicked,
  selectedInd,
  path,
  sidenavSearchOpened,
  disconnectedForm,
  wide,
  ...rest
}: any) => {
  const [value, setValue] = React.useState(currentRefinement)
  const timeoutId = React.useRef(null)
  const inputEl = React.useRef(null)
  const { width } = useWindowDimensions()
  const [placeholderText, setPlaceholderText] = React.useState('Search Documentation...')

  const onChange = (e: any) => {
    const { value: newValue } = e.target

    // After the user manually cleared the input, call `refine` without waiting so that the search
    // closes instantly.
    if (newValue === '') {
      return clearInput()
    }

    // Otherwise, debounce the search to avoid triggering many queries at once, which could also
    // make the UI freeze.
    window.clearTimeout(timeoutId.current)
    timeoutId.current = window.setTimeout(() => refine(newValue), DEBOUNCE_DELAY)
    setValue(newValue)
    inputEl.current.blur()
    inputEl.current.focus()
  }

  const clearInput = () => {
    window.clearTimeout(timeoutId.current)
    setValue('')
    refine('')
  }

  // Focus shortcuts on keydown
  const onKeyDown = (e: any) => {
    if (e && e.keyCode == ESCAPE_KEY) {
      closeSearch()
    } else if (e && e.keyCode === 40) {
      downClicked()
    } else if (e && e.keyCode === 38) {
      upClicked()
    }

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

  const onSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    inputEl.current.blur()

    return false
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    if (width > 640) {
      setPlaceholderText('Search Documentation...')
    }
    if (value) {
      onFocus()
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  if (sidenavSearchOpened) {
    inputEl.current.focus()
    onFocus()
  }

  return (
    <SearchBoxDiv className={isOpened ? 'opened' : ''} minimal={path === 'home'} wide={wide}>
      <form onSubmit={onSubmit}>
        <SearchIcon />
        <input
          ref={inputEl}
          type="text"
          placeholder={placeholderText}
          aria-label="Search Documentation..."
          onChange={onChange}
          onFocus={onFocus}
          value={value}
          {...rest}
        />

        {value !== '' && isOpened && (
          <span className="clear">
            <ClearIcon onClick={clearInput} />
          </span>
        )}
        {!isOpened && width > 768 && <SearchSlashIcon />}
      </form>
    </SearchBoxDiv>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
