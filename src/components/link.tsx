import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = ({ to, activeClassName, ...props }: any) =>
  !to ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink activeClassName={activeClassName} to={to} {...props} />
  );

export default Link;
