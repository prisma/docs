import React from 'react';
import CodeBlock from './code';
import SwitchTech from './switchTech';
import Pre from './pre';
import makeHeading from './headings';

export default {
  h1: () => <h1 style={{ display: 'none' }} />,
  h2: (props: any) => makeHeading('h2')({ ...props }),
  h3: (props: any) => makeHeading('h3')({ ...props }),
  h4: (props: any) => makeHeading('h4')({ ...props }),
  h5: (props: any) => makeHeading('h5')({ ...props }),
  h6: (props: any) => makeHeading('h6')({ ...props }),
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  CodeBlock,
  SwitchTech,
  pre: Pre,
  // TODO add `blockquote`
  // TODO add `table`
  // TODO add `Collapsible element`
};
