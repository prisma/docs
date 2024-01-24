import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import styled from 'styled-components'

import config from '../../../config'
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery'
import { AllArticles } from '../../interfaces/AllArticles.interface'
import Tree from './tree'

const SidebarContainer = styled.aside`
  width: 272px;
  height: 100%;
`

const Sidebar = styled.div`
  margin: 0;
  overflow: auto;
  height: auto;

  /* .tablet-only {
    display: none;
    background: ${theme.colors.gray[100]};
    justify-content: space-between;
    padding: ${theme.space[48]} ${theme.space[64]};

    > ul {
      width: 50%;
      margin-right: 50px;

      &:last-of-type {
        padding-left: ${theme.space[40]};
      }
    }

    @media (min-width: 641px) and (max-width: 1024px) {
      display: flex;
    }
  } */

  .mobile-only {
    display: none;
    width: 100%;
    background: ${theme.colors.gray[100]};
    padding: ${theme.space[8]} ${theme.space[16]};
    @media only screen and (max-width: 1024px) {
      display: flex;
      > ul {
        width: 100%;
      }
    }
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0 7px 0 ${theme.space[16]};
  margin: -${theme.space[20]} 0 0;
  @media only screen and (min-width: 1024px) {
    padding-top: 16px;
  }
`

const SidebarLayout = ({ isMobile, location, slug }: any) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const bucketName =
    location && location.state && location.state.bucketName ? location.state.bucketName : '/'
  let bucketEdges = allMdx.edges?.filter((edge) => edge.node.fields.slug.includes(bucketName))
  let bucketEdgesMobile = bucketEdges
  const bucketNames = config.header.secondLevelHeaderMenuItems.map((item: any) => item.bucketName)

  if (slug) {
    const slugBucketPart = `/${slug.split('/')[1]}`
    const selectedBucket = bucketNames.filter((bn: any) => bn === slugBucketPart)[0]
    if (selectedBucket) {
      bucketEdges = allMdx.edges?.filter((edge) => {
        return edge.node.fields.slug.includes(selectedBucket)
      })

      bucketEdgesMobile = bucketEdges?.filter(
        (edge) => edge.node.fields.slug !== `${selectedBucket}/index`
      )
    }
  }

  if (!isMobile && slug === '/') {
    bucketEdges = []
  }
  return !isMobile ? (
    <SidebarContainer>
      <Sidebar id="sidebar-container">
        <List>
          <Tree edges={bucketEdges} />
        </List>
      </Sidebar>
    </SidebarContainer>
  ) : (
    <Sidebar>
      <div className="mobile-only">
        <List>
          <Tree edges={bucketEdgesMobile} />
        </List>
      </div>
    </Sidebar>
  )
}

export default SidebarLayout
