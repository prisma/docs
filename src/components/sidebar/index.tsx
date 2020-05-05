import React from 'react'
import Tree from './tree'
import styled, { css } from 'styled-components'
import styledTS from 'styled-components-ts'
import { StickyContainer, Sticky } from 'react-sticky'
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery'
import { AllArticles } from '../../interfaces/AllArticles.interface'

const SidebarContainer = styled.aside`
  width: 235px;
`

const Sidebar = styledTS<{ isSticky: boolean }>(styled.div)`
  margin: 0;
  overflow: auto;
  ${({ isSticky }: any) =>
    isSticky &&
    css`
      max-height: 100vh;
    `};

  .tablet-only {
    display: none;
    
    justify-content: space-between;
    padding: 2rem 0;

    > ul {
      width: 50%;
      margin-right: 50px;

      &:last-of-type {
        border-left: 1px solid var(--code-inner-color);
        padding-left: 40px;
      }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      display:flex;    
    }
  }

  .mobile-only {
    display: none;
    @media only screen and (max-width: 767px) {
      display: flex;
      > ul {
        width: 100%;
      }
    }
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;
  margin: 0;
`

const getNonGuides = (allEdges: any) =>
  allEdges.filter((edge: any) => !edge.node.fields.slug.includes(`04-guides`))
const getGuides = (allEdges: any) =>
  allEdges.filter((edge: any) => edge.node.fields.slug.includes(`04-guides`))

const SidebarLayout = ({ isMobile }: any) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  return !isMobile ? (
    <StickyContainer>
      <SidebarContainer>
        <Sticky topOffset={0}>
          {({ style, isSticky }: any) => (
            <Sidebar style={style} isSticky={isSticky}>
              <List>
                <Tree edges={allMdx.edges} />
              </List>
            </Sidebar>
          )}
        </Sticky>
      </SidebarContainer>
    </StickyContainer>
  ) : (
    <Sidebar>
      <div className="tablet-only">
        <List>
          <Tree edges={getNonGuides(allMdx.edges)} />
        </List>
        <List>
          <Tree edges={getGuides(allMdx.edges)} />
        </List>
      </div>
      <div className="mobile-only">
        <List>
          <Tree edges={allMdx.edges} />
        </List>
      </div>
    </Sidebar>
  )
}

export default SidebarLayout
