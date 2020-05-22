import React from 'react'
import SwitchTech from './switchTech'
import CodeBlock from './codeBlock'
import TabbedContent from './tabbedContent'
import ParallelBlocks from './parallelBlocks'
import Code from './code'
import CollapseBox from './collapsible'
import Table from './table'
import ButtonLink from './button'
import FileWithIcon from './fileWithIcon'
import Subsections from './subSections'

export default {
  h1: () => <h1 style={{ display: 'none' }} />,
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  CodeBlock,
  TabbedContent,
  ParallelBlocks,
  SwitchTech,
  FileWithIcon,
  inlineCode: (props: any) => <code className="inline-code" {...props} />,
  code: Code,
  details: CollapseBox,
  table: Table,
  ButtonLink,
  Subsections,
  img: (props: any) => (
    <a href={props.src} target="_blank">
      <img {...props} />
    </a>
  ),
}
