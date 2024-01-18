import isAbsoluteUrl from 'is-absolute-url'
import React from 'react'

import Link from '../link'
import Admonition from './admonition'
import ButtonLink from './button'
import Code from './code'
import CodeBlock from './codeBlock'
import CodeWithResult from './codeWithResult'
import CollapseBox from './collapsible'
import FileWithIcon from './fileWithIcon'
import FootNote from './footnote'
import NavigationLinksContainer from './navigationLinksContainer'
import ParallelBlocks from './parallelBlocks'
import Quiz from './quiz'
import Subsections from './subSections'
import SwitchTech from './switchTech'
import TabbedContent from './tabbedContent'
import Table from './table'
import Tip from './tip'
import TopBlock from './topBlock'
import { Bolt, BorderBox, BoxTitle, Database, SignalStream } from './gettingstarted'

const shortcodes = {
  h1: () => <h1 style={{ display: 'none' }} />,
  h2: ({ id, ...props }: any) => <h2 id={id.replace(/inlinecode/g, '')} {...props} />,
  h3: ({ id, ...props }: any) => <h3 id={id.replace(/inlinecode/g, '')} {...props} />,
  h4: ({ id, ...props }: any) => <h4 id={id.replace(/inlinecode/g, '')} {...props} />,
  a: ({ href, ...props }: any) => {
    const to = href ? href.toString() : ''
    return isAbsoluteUrl(to) ? (
      <Link to={to ? to.replace(/inlinecode/g, '') : ''} {...props} />
    ) : (
      <a href={to ? to.replace(/inlinecode/g, '') : ''} {...props} />
    )
  },
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  ol: (props: any) => <ol className="o-list" {...props} />,
  CodeBlock,
  TabbedContent,
  ParallelBlocks,
  CodeWithResult,
  SwitchTech,
  FileWithIcon,
  inlineCode: (props: any) => <code className="inline-code" {...props} />,
  code: (props: any) => <Code {...props} />,
  details: (props: any) => <CollapseBox {...props} />,
  table: (props: any) => <Table {...props} />,
  ButtonLink,
  Subsections,
  TopBlock,
  FootNote,
  Admonition,
  img: (props: any) =>
    /^https?:\/\//i.test(props.src) ? (
      <a href={props.src} target="_blank">
        <img {...props} />
      </a>
    ) : (
      <img {...props} />
    ),
  AlgoliaTerm: () => <span style={{ display: 'none' }} />,
  Quiz,
  Tip: (props: any) => <Tip>{props.children}</Tip>,
  NavigationLinksContainer: (props: any) => (
    <NavigationLinksContainer {...props}>{props.children}</NavigationLinksContainer>
  ),
  Database,
  Bolt,
  SignalStream,
  BorderBox,
  BoxTitle,
}

export default shortcodes
