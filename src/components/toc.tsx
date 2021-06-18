import * as React from 'react'
import { TableOfContents } from 'src/interfaces/Article.interface'
import styled from 'styled-components'
import { stringify } from '../utils/stringify'
import Sticky from 'react-stickynode'

 
// import Scrollspy from 'react-scrollspy'

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
  // position: sticky;
  // top: 0;
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
  // position: sticky;
  // top: 0;
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
      acc.push(item.url.replace(/inlinecode/g, '').slice(1))
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
  return activeId
}

const TOC = ({ headings, tocDepth }: any) => {
  const idList = getIds(headings)
  const activeId = useActiveId(idList)

  const navItems = (headings: any[], depth: number, activeId: string) => {
    return (
      <TOCContainer>
      <TOCList>
        {headings &&
          headings.map((heading: any, index: number) => {
            const isActive: boolean = activeId === heading.url.replace(/inlinecode/g, '').slice(1)
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
      </TOCContainer>
    )
  }

  // const navItems = (headings: any[], depth: number, activeId: string) => {
  //   let url = headings.map(function(post) {
  //     return post['url'].replace(/inlinecode/g, '').substring(1)
  //   })
  
  //   return (
    
  //     <Scrollspy items={url} currentClassName="is-current" className="toc-list">
  //       {headings.map((p:any) => (
  //         <li key={p.url}>
  //           <a href={p.url.replace(/inlinecode/g, '')}>{p.title}</a>
  //           {p.items &&
  //                 p.items.length > 0 &&
  //                 depth > 1 &&
  //                 navItems(p.items, depth - 1, activeId)}
  //         </li>
  //       ))}
  //     </Scrollspy>
  //   )
  // }
  return navItems && navItems.length ? (
<>
      <ChapterTitle>CONTENT</ChapterTitle>
      {/* <nav className="toc"> */}
      {navItems(headings, tocDepth || 1, activeId)}
      {/* </nav> */}
    </>
  ) : null
}

export default TOC