import React from 'react'
import styled from 'styled-components'
import { stringify } from '../utils/stringify'

const ChapterTitle = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: var(--list-bullet-color);
`

const TOC = ({ headings, tocDepth }: any) => {
  const navItems = (headings: any[], depth: number) => {
    return (
      <ul className="list">
        {headings &&
          headings.map((heading: any, index: number) => (
            <li key={index}>
              <a href={heading.url}>{stringify(heading.title)}</a>
              {heading.items &&
                heading.items.length > 0 &&
                depth > 1 &&
                navItems(heading.items, depth - 1)}
            </li>
          ))}
      </ul>
    )
  }
  return navItems && navItems.length ? (
    <div>
      <ChapterTitle>CONTENT</ChapterTitle>
      {navItems(headings, tocDepth || 1)}
    </div>
  ) : null
}

export default TOC
