import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchPic from '../../icons/Search'
import Clear from '../../icons/Clear'

const Form = styled.form`
  position: relative;
  width: 215px;
  position: relative;
  z-index: 100001;
  display: flex;
  align-items: center;
  @media (min-width: 0px) and (max-width: 1024px) {
    flex: 1;
  }
`

const SearchIcon = styled(SearchPic)`
  position: absolute;
  left: 12px;
  width: 1em;
  pointer-events: none;
  z-index: 100001;
`

const ClearIcon = styled(Clear)`
  position: absolute;
  right: 12px;
  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  background: var(--white-color);
  box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1), 0px 1px 3px rgba(60, 45, 111, 0.15);
  border-radius: 5px;
  padding: 0.6rem 2.5rem;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  border-width: 0;

  &::placeholder {
    color: var(--list-bullet-color);
    opacity: 1; /* Firefox */
  }
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`

const DEBOUNCE_DELAY = 500

const SearchBox = ({ refine, onFocus, currentRefinement, ...rest }: any) => {
  const [value, setValue] = React.useState(currentRefinement)
  const timeoutId = React.useRef(null)

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

  return (
    <Form>
      <Input
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        focusShortcuts={['/']}
        {...rest}
      />
      <SearchIcon />
      {value !== '' && <ClearIcon onClick={clearInput} />}
    </Form>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
