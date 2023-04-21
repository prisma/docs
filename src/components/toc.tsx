import * as React from 'react'
import { stringify } from '../utils/stringify'
import styled from 'styled-components'
import { TableOfContents } from '../interfaces/Article.interface'

const ChapterTitle = styled.div`
  font-family: ${(p) => p.theme.fonts.text};
  font-style: normal;
  font-weight: bold;
  font-size: ${(p) => p.theme.fontSizes[14]};
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.gray[900]};
  margin: ${(p) => p.theme.space[16]} 0 0;
`

const HeadingList = styled.ul`
  padding: 0 0 1em;
  list-style-type: none;
  margin: 0;
  li {
    font-size: ${(p) => p.theme.fontSizes[14]};
    padding: ${(p) => p.theme.space[12]} 0 0;
    line-height: 1rem;
    ul {
      margin-left: ${(p) => p.theme.space[12]};
    }
    a {
      text-decoration: none;
      color: ${(p) => p.theme.colors.gray[600]};
      &:hover {
        color: ${(p) => p.theme.colors.gray[900]};
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
  const isActive = (url: string) => url?.replace(/inlinecode/g, '').slice(1) === activeId
  const isAnyChildActive = (children: any[]) => children.some((child: any) => isActive(child.url))
  const finalDepth = depth ?? 2
  const navItems = (headings: any, activeId: any, depth: any) => (
    <HeadingList>
      {headings.map((heading: any) => (
        <ListItem key={heading.url} isActive={isActive(heading.url)}>
          <a
            href={`${heading.url?.replace(/inlinecode/g, '')}`}
            dangerouslySetInnerHTML={{ __html: stringify(heading.title) }}
          />

          {heading.items &&
            heading.items.length > 0 &&
            depth > 2 &&
            //isAnyChildActive(heading.items) &&
            navItems(heading.items, activeId, depth - 1)}
        </ListItem>
      ))}
    </HeadingList>
  )
  return navItems(headings, activeId, finalDepth)
}

const getIds = (headings: TableOfContents[], tocDepth: number) => {
  return headings.reduce((acc: any, item: any) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.replace(/inlinecode/g, '').slice(1))
    }
    if (item.items && tocDepth > 1) {
      acc.push(...getIds(item.items, tocDepth - 1))
    }
    return acc
  }, [])
}

const useIntersectionObserver = (setActiveId: any, idList: any[], tocDepth: number) => {
  const headingElementsRef: any = React.useRef({})
  const depth = tocDepth ?? 2
  React.useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce((map: any, headingElement: any) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // Get all headings that are currently visible on the page
      let visibleHeadings: any[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: any) => idList.findIndex((heading) => heading === id)
      // If there is only one visible heading, this is our "active" heading
      visibleHeadings = visibleHeadings.filter((e) => parseInt(e.target.tagName.charAt(1)) <= depth)

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

    const observer = new IntersectionObserver(callback)

    idList.forEach((id: string) => {
      const el: HTMLElement | null = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [setActiveId])
}

const TOC = ({ headings, tocDepth }: any) => {
  const [activeId, setActiveId] = React.useState()
  const idList = getIds(headings, tocDepth || 2)
  useIntersectionObserver(setActiveId, idList, tocDepth)
  React.useEffect(() => {
    console.log(activeId)
  }, [activeId])
  return (
    <nav aria-label="Table of contents">
      <ChapterTitle>ON THIS PAGE</ChapterTitle>
      <Headings headings={headings} activeId={activeId} depth={tocDepth} />
    </nav>
  )
}

export default TOC
