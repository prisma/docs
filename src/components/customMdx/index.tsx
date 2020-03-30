import React from 'react';
import SwitchTech from './switchTech';
import CodeBlock from './codeBlock';
import Code from './code';
import Pre from './pre';
import CollapseBox from './collapsible';
import Table from './table';
import ButtonLink from './button';
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
  code: Code,
  details: CollapseBox,
  table: Table,
  ButtonLink,
};
