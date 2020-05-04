import React from 'react'
import SwitchTech from './switchTech'
import CodeBlock from './codeBlock'
import TabbedContent from './tabbedContent'
import Code from './code'
import CollapseBox from './collapsible'
import Table from './table'
import ButtonLink from './button'
import Link from '../link'
import HighlightCode from './highlightCode'

export default {
  h1: () => <h1 style={{ display: 'none' }} />,
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  CodeBlock,
  TabbedContent,
  SwitchTech,
  inlineCode: (props: any) => <code className="inline-code" {...props} />,
  code: Code,
  details: CollapseBox,
  table: Table,
  ButtonLink,
  a: (props: any) => <Link to={props.href} {...props} />,
  img: (props: any) => (
    <a href={props.src} target="_blank">
      <img {...props} />
    </a>
  ),
}
