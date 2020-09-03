import React from 'react'
import Tree from './tree'
import styled, { css } from 'styled-components'
import styledTS from 'styled-components-ts'
import { StickyContainer, Sticky } from 'react-sticky'
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery'
import { AllArticles } from '../../interfaces/AllArticles.interface'
import config from '../../../config'

const SidebarContainer = styled.aside`
  width: 272px;
  margin: 0px ${p => p.theme.space[16]} 0 -${p => p.theme.space[16]};
`

const Sidebar = styledTS<{ isSticky: boolean, theme: any }>(styled.div)`
  margin: 0;
  overflow: auto;
  height: 100vh;
  ${({ isSticky }: any) =>
    isSticky &&
    css`
      max-height: 100vh;
    `};

  .tablet-only {
    display: none;
    background: ${p => p.theme.colors.gray100};
    justify-content: space-between;
    padding: ${p => p.theme.space[48]} ${p => p.theme.space[64]};

    > ul {
      width: 50%;
      margin-right: 50px;

      &:last-of-type {
        padding-left: ${p => p.theme.space[40]};
      }
    }

    @media (min-width: 641px) and (max-width: 1024px) {
      display:flex;    
    }
  }

  .mobile-only {
    display: none;
    background: ${p => p.theme.colors.gray100};
    padding: ${p => p.theme.space[32]};
    @media only screen and (max-width: ${p => p.theme.breakpoints.mobile}) {
      display: flex;
      > ul {
        width: 100%;
      }
    }
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0 7px 0 ${p => p.theme.space[16]};
  margin: -${p => p.theme.space[20]} 0 0;
`
const paneRegex = new RegExp('\\b(' + config.sidebar.tablet_menu_split.join('|') + ')\\b', 'ig')
const getLeftPane = (allEdges: any) =>
  allEdges.filter((edge: any) => !edge.node.fields.slug.match(paneRegex))
const getRightPane = (allEdges: any) =>
  allEdges.filter((edge: any) => edge.node.fields.slug.match(paneRegex))

const SidebarLayout = ({ isMobile }: any) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  return !isMobile ? (
    <StickyContainer>
      <SidebarContainer>
        <Sticky topOffset={0}>
          {({ style, isSticky }: any) => (
            <Sidebar style={style} isSticky={isSticky} id="sidebar-container">
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
          <Tree edges={getLeftPane(allMdx.edges)} />
        </List>
        <List>
          <Tree edges={getRightPane(allMdx.edges)} />
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
