import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchPic from '../../icons/Search'
import Clear from '../../icons/Clear'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const SearchBoxDiv = styled.div`
  width: 250px;
  display: flex;

  &.opened {
    position: relative;
    z-index: 100001;
    max-width: 1200px;
    width: 100%;
    background: white;
    padding: 20px;
    border-bottom: 1px solid var(--border-color);

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    form {
      width: 100%;

      input {
        color: #4A5568;
      }
    }

    .clear {
      background: #E2E8F0;
      border-radius: 6px;
      height: 36px;
      width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg path {
        stroke: #4A5568;
      }
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
      padding: 0rem 1rem;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 100%;
      border-width: 0;

      &::placeholder {
        content: 'Search';
        color: var(--list-bullet-color);
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
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    color: #cbd5e0;
    width: 18px;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 0px) and (max-width: 768px) {
    .slash {
      display: none;
    }
  }
`

const SearchIcon = styled(SearchPic)`
  width: 1em;
  pointer-events: none;
  z-index: 100001;
`

const ClearIcon = styled(Clear)`
  cursor: pointer;
  
`

const DEBOUNCE_DELAY = 500
const focusShortcuts = ['s', 191]

const SearchBox = ({ refine, onFocus, currentRefinement, isOpened, ...rest }: any) => {
  const [focusState, setFocusState] = React.useState(false)
  const [value, setValue] = React.useState(currentRefinement)
  const timeoutId = React.useRef(null)
  const inputEl = React.useRef(null)
  const {width} = useWindowDimensions()
  const placeholderText = width > 640 ? "Search Documentation..." : "Search"

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
  }

  const clearInput = () => {
    window.clearTimeout(timeoutId.current)
    setValue('')
    refine('')
  }

  // Focus shortcuts on keydown
  const onKeyDown = (e: any) => {
    const shortcuts = focusShortcuts.map(key =>
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
  }, [])

  const focused = () => {inputEl.current.value !== '' ? setFocusState(true): setFocusState(false); onFocus() }

  const removeFocus = () => setFocusState(false)
  return (
    <SearchBoxDiv className={isOpened ? 'opened': ''}>
      <form onSubmit={onSubmit}> 
      {/* focusState === true ? 'focused': '' */}
        <SearchIcon />
        <input
          ref={inputEl}
          type="text"
          placeholder={placeholderText}
          aria-label="Search Documentation..."
          onChange={onChange}
          onFocus={focused}
          onBlur={removeFocus}
          value={value}
          {...rest}
        />

        {value !== '' && <span className="clear"><ClearIcon onClick={clearInput}/></span>}
        {!isOpened && <span className="slash">/</span>}
      </form>
    </SearchBoxDiv>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
