import * as React from 'react'
import { stringify } from '../utils/stringify'
import styled from 'styled-components'

const ChapterTitle = styled.div`
  font-family: ${(p) => p.theme.fonts.text};
  font-style: normal;
  font-weight: bold;
  font-size: ${(p) => p.theme.fontSizes[14]};
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.gray900};
  margin: ${(p) => p.theme.space[16]} 0 0;
`

const HeadingList = styled.ul`
  padding: 0 0 1em;
  list-style-type: none;
  margin: 0;
  li {
    font-size: ${(p) => p.theme.fontSizes[14]};
    padding: ${(p) => p.theme.space[16]} 0 0;
    line-height: 19px;
    ul {
      margin-left: ${(p) => p.theme.space[12]};
    }
    a {
      text-decoration: none;
      color: ${(p) => p.theme.colors.gray600};
      &:hover {
        color: ${(p) => p.theme.colors.gray900};
      }
    }
  }
`

interface ItemProps {
  isActive: boolean
}

const ListItem = styled.li<ItemProps>`
  > a {
    text-decoration: none;
    background-image: linear-gradient(currentColor, var(--dark-color));
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size 0.7s;
    ${(props) => (props.isActive ? 'background-size: 100% 2px;' : null)}
    & > inlinecode {
      background: ${(props) => (props.isActive ? `var(--dark-color)` : '')};
      color: ${(props) => (props.isActive ? 'var( --main-bgd-color)' : '#000')};
    }
  }
`

const Headings = ({ headings, activeId, depth = 2 }: any) => {
  const isActive = (url: string) => url.replace(/inlinecode/g, '').slice(1) === activeId
  const isAnyChildActive = (children: any[]) => children.some((child: any) => isActive(child.url))
  const navItems = (headings: any, activeId: any, depth: any) => (
    <HeadingList>
      {headings.map((heading: any) => (
        <ListItem key={heading.url} isActive={isActive(heading.url)}>
          <a
            href={`${heading.url.replace(/inlinecode/g, '')}`}
            dangerouslySetInnerHTML={{ __html: stringify(heading.title) }}
          />

          {heading.items &&
            heading.items.length > 0 &&
            depth > 1 &&
            isAnyChildActive(heading.items) &&
            navItems(heading.items, activeId, depth - 1)}
        </ListItem>
      ))}
    </HeadingList>
  )
  return navItems(headings, activeId, depth)
}

const useIntersectionObserver = (setActiveId: any) => {
  const headingElementsRef: any = React.useRef({})
  React.useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce((map: any, headingElement: any) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // Get all headings that are currently visible on the page
      const visibleHeadings: any[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: any) => headingElements.findIndex((heading) => heading.id === id)

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b): any => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )

        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, { root: document.querySelector('iframe') })

    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

const TableOfContents = ({ headings, tocDepth }: any) => {
  const [activeId, setActiveId] = React.useState()
  useIntersectionObserver(setActiveId)
  return (
    <nav aria-label="Table of contents">
      <ChapterTitle>CONTENT</ChapterTitle>
      <Headings headings={headings} activeId={activeId} depth={tocDepth} />
    </nav>
  )
}

export default TableOfContents
