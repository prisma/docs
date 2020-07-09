import React from 'react'
import SwitchTech from './switchTech'
import CodeBlock from './codeBlock'
import TabbedContent from './tabbedContent'
import ParallelBlocks from './parallelBlocks'
import CodeWithResult from './codeWithResult'
import Code from './code'
import CollapseBox from './collapsible'
import Table from './table'
import ButtonLink from './button'
import FileWithIcon from './fileWithIcon'
import Subsections from './subSections'
import TopBlock from './topBlock'

export default {
  h1: () => <h1 style={{ display: 'none' }} />,
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  // ul: (props: any) => {
  //   // console.log(props.children[0].props.children)
    
  //   props && props.children && props.children.map((child:any) => {
  //     if (typeof child === 'string') {
  //       console.log(child)
  //     }
  //     // const ff = child.props && child.props.children && child.props.children.length && child.props.children.length > 1 && child.props.children.find((elem:any) => elem.props && elem.props.mdxType === 'pre')
  //     // console.log(ff)
  //     // if (child.props.children.length > 1 && child.props.children.some((elem:any) => elem.props.mdxType === 'pre')) {

  //     // }
  //   })
  // return (<ul className="list" {...props} >

  // </ul>)
  // },
  ol: (props: any) => <ol className="o-list" {...props} />,
  CodeBlock,
  TabbedContent,
  ParallelBlocks,
  CodeWithResult,
  SwitchTech,
  FileWithIcon,
  inlineCode: (props: any) => <code className="inline-code" {...props} />,
  code: Code,
  details: CollapseBox,
  table: Table,
  ButtonLink,
  Subsections,
  TopBlock,
  img: (props: any) => (
    <a href={props.src} target="_blank">
      <img {...props} />
    </a>
  ),
}
