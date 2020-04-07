import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import styled from 'styled-components';
import SearchPic from '../../icons/Search';
import Clear from '../../icons/Clear';

const Form = styled.form`
  position: relative;
  width: 215px;
  position: relative;
  z-index: 100001;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(SearchPic)`
  position: absolute;
  left: 12px;
  width: 1em;
  pointer-events: none;
  z-index: 100001;
`;

const ClearIcon = styled(Clear)`
  position: absolute;
  right: 12px;
`;

const Input = styled.input`
  width: 100%;
  background: #ffffff;
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
    color: #a0aec0;
    opacity: 1; /* Firefox */
  }
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;

const SearchBox = ({ refine, onFocus, ...rest }: any) => {
  const inputRef = React.useRef(null);
  const clearInput = () => {
    inputRef.current.value = '';
    refine(inputRef.current.value);
  };
  return (
    <Form>
      <Input
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e: any) => refine(e.target.value)}
        onFocus={onFocus}
        ref={inputRef}
        {...rest}
      />
      <SearchIcon />
      {inputRef && inputRef.current && inputRef.current.value !== '' && (
        <ClearIcon onClick={clearInput} />
      )}
    </Form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
export default CustomSearchBox;
