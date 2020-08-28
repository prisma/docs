import React from 'react'
import styled, {css} from 'styled-components'
import styledTS from 'styled-components-ts'
import { stringify } from '../utils/stringify'
import { StickyContainer, Sticky } from 'react-sticky'

const TOCContainer = styled.aside`
  width: 180px;
  // margin: 0px 16px 0 -16px;
`

const TOCInner = styledTS<{ isSticky: boolean }>(styled.div)`
  margin: 0;
  overflow: auto;
  height: 100vh;
  ${({ isSticky }: any) =>
    isSticky &&
    css`
      max-height: 100vh;
    `};
`
const ChapterTitle = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #1a202c;
  margin: 1rem 0 0;
`

const TOCList = styled.ul`
  padding: 0;
  list-style-type: none;
  margin: 0;
  li {
    font-size: 14px;
    padding: 1rem 0 0;
    line-height: 19px;
    a {
      text-decoration: none;
      color: #718096 !important;
      &:hover {
        color: var(--main-font-color) !important;
      }
    }
  }
`

const TOC = ({ headings, tocDepth }: any) => {
  const navItems = (headings: any[], depth: number) => {
    return (
      <TOCList>
        {headings &&
          headings.map((heading: any, index: number) => (
            <li key={index}>
              <a
                href={heading.url.replace(/inlinecode/g, '')}
                dangerouslySetInnerHTML={{ __html: stringify(heading.title) }}
              />
              {heading.items &&
                heading.items.length > 0 &&
                depth > 1 &&
                navItems(heading.items, depth - 1)}
            </li>
          ))}
      </TOCList>
    )
  }
  return navItems && navItems.length ? (
    // <StickyContainer>
    //   <TOCContainer>
    //     <Sticky topOffset={0}>
    //       {({ style, isSticky }: any) => (
    //         // <Sidebar style={style} isSticky={isSticky} id="sidebar-container">
    //         //   <List>
    //         //     <Tree edges={allMdx.edges} />
    //         //   </List>
    //         // </Sidebar>
    //         <TOCInner style={style} isSticky={isSticky}>
    //           <ChapterTitle>CONTENT</ChapterTitle>
    //           {navItems(headings, tocDepth || 1)}
    //         </TOCInner>
    //       )}
    //     </Sticky>
    //   </TOCContainer>
    // </StickyContainer>
    <div>
      <ChapterTitle>CONTENT</ChapterTitle>
      {navItems(headings, tocDepth || 1)}
    </div>
  ) : null
}

export default TOC
