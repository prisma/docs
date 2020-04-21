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
`

const List = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;
  margin: 0;
`

const SidebarLayout = () => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  return (
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
  )
}

export default SidebarLayout
