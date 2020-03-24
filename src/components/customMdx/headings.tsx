import * as React from 'react';
import styled from 'styled-components';
import { stringify } from '../../utils/stringify';
import { slug } from '../../utils/slug';
// import Anchor from 'icons/Anchor'

export default function makeHeading(Component: any) {
  return function Heading({ children, ...rest }: any) {
    const text = stringify(children);
    const id = slug(text);
    let props = {
      ...rest,
    };
    if (['h3', 'h4', 'h5'].includes(Component.target)) {
      props.id = id;
    }
    return (
      <Component {...props} id={`${id}`}>
        {/* <a href={`#${id}`}> */}
        <A className="title-link" href={`#${id}`}>
          {/* <StyledAnchor /> */}
          {children}
        </A>
        {/* </a> */}
      </Component>
    );
  };
}

const StyledAnchor = styled.span`
  content: '#';
  margin-left: 11px;
  opacity: 0;
`;

const A = styled.a`
  font-size: inherit;
  &:hover ${StyledAnchor} {
    opacity: 1;
  }
`;
