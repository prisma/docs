import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = ({ to, ...props }: any) =>
  !to ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );

export default Link;