// import React from 'react';
// import { Link as GatsbyLink } from 'gatsby';

// const Link = ({ to, activeClassName, ...props }: any) =>
//   !to ? (
//     <a href={to} {...props}>
//       {props.children}
//     </a>
//   ) : (
//     <GatsbyLink activeClassName={activeClassName} to={to} {...props} />
//   );

// export default Link;

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

const Link = ({ to, ...props }: any) => {
  console.log(to);
  return to && isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );
};
export default Link;
