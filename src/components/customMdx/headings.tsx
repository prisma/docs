import * as React from 'react';
import styled from 'styled-components';
import { stringify } from '../../utils/stringify';
import { slug } from '../../utils/slug';
import HashLink from '../../icons/HashLink';

export default function makeHeading(Component: any) {
  return function Heading({ children, ...rest }: any) {
    const text = stringify(children);
    const id = slug(text);
    let props = {
      ...rest,
    };

    return (
      <Component {...props} id={`${id}`}>
        <A className="title-link" href={`#${id}`}>
          <StyledAnchor />
          {children}
        </A>
      </Component>
    );
  };
}

const StyledAnchor = styled(HashLink)`
  margin-left: -24px;
  margin-right: 5px;
  opacity: 0;
`;

const A = styled.a`
  font-size: inherit;
  &:hover ${StyledAnchor} {
    opacity: 1;
  }
`;
