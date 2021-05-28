import * as React from 'react'
import { TableOfContents } from 'src/interfaces/Article.interface'
import styled from 'styled-components'
import { stringify } from '../utils/stringify'

const ChapterTitle = styled.div`
  font-family: ${p => p.theme.fonts.text};
  font-style: normal;
  font-weight: bold;
  font-size: ${p => p.theme.fontSizes[14]};
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.gray900};
  margin: ${p => p.theme.space[16]} 0 0;
`

const TOCList = styled.ol`
  padding: 0 0 1em;
  list-style-type: none;
  margin: 0;
  li {
    font-size: ${p => p.theme.fontSizes[14]};
    padding: ${p => p.theme.space[16]} 0 0;
    line-height: 19px;

    ol {
      margin-left: ${p => p.theme.space[12]};
    }
    a {
      text-decoration: none;
      color: ${p => p.theme.colors.gray600};
      &:hover {
        color: ${p => p.theme.colors.gray900};
      }
    }
  }
`

const TOCContainer = styled.div`
  position: sticky;
  top: 0;
`

interface ItemProps {
  isActive: boolean
}

const ListItem = styled.a<ItemProps>`
  text-decoration: none;
  background-image: linear-gradient(currentColor, var(--dark-color));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.7s;

  ${props => (props.isActive ? 'background-size: 100% 2px;' : null)}

  & > inlinecode {
    background: ${props => (props.isActive ? `var(--dark-color)` : '')};
    color: ${props => (props.isActive ? 'var( --main-bgd-color)' : '#000')};
  }
`

const getIds = (headings: TableOfContents[]) => {
  return headings.reduce((acc: any, item: any) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.replaceAll('inlinecode', '').slice(1))
    }
    if (item.items) {
      acc.push(...getIds(item.items))
    }
    return acc
  }, [])
}

const useActiveId = (idList: string[]) => {
  const [activeId, setActiveId] = React.useState(``)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )
    idList.forEach((id: string) => {
      const el: HTMLElement | null = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })
    return () => {
      idList.forEach((id: string) => {
        const el: HTMLElement | null = document.getElementById(id)
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [idList])
  console.log({ activeId })
  return activeId
}

const TOC = ({ headings, tocDepth }: any) => {
  const idList = getIds(headings)
  const activeId = useActiveId(idList)

  const navItems = (headings: any[], depth: number, activeId: string) => {
    return (
      <TOCList>
        {headings &&
          headings.map((heading: any, index: number) => {
            const isActive: boolean = activeId === heading.url.replaceAll('inlinecode', '').slice(1)
            return (
              <li key={index}>
                <ListItem
                  isActive={isActive}
                  href={heading.url.replace(/inlinecode/g, '')}
                  dangerouslySetInnerHTML={{ __html: stringify(heading.title) }}
                />
                {heading.items &&
                  heading.items.length > 0 &&
                  depth > 1 &&
                  navItems(heading.items, depth - 1, activeId)}
              </li>
            )
          })}
      </TOCList>
    )
  }
  return navItems && navItems.length ? (
    <>
      <ChapterTitle>CONTENT</ChapterTitle>
      {navItems(headings, tocDepth || 1, activeId)}
    </>
  ) : null
}

export default TOC
