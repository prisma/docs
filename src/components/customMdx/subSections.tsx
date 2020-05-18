import Link from '../link'
import * as React from 'react'
import styled from 'styled-components'
import { calculateTreeData } from '../../utils/treeData'
import { AllArticles } from '../../interfaces/AllArticles.interface'
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery'
import { useLocation } from '@reach/router'

const SubsectionWrapper = styled.div``

const Subsections = () => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const location = useLocation()
  // const slugg = '/01-getting-started/index'
  const treeData = calculateTreeData(allMdx.edges, null, null)
  let subSecs: any[] = []

  const getSubSecs = (currentSlug: string, treeItems: any[]): any => {
    for (let i = 0; i < treeItems.length - 1; i++) {
      const tree = treeItems[i]
      if (
        !(
          tree.url ===
            `${currentSlug.substr(-1) === '/' ? currentSlug.slice(0, -1) : currentSlug}` &&
          tree.label !== 'index'
        )
      ) {
        getSubSecs(currentSlug, tree.items)
      } else {
        subSecs = tree.items.filter((t: any) => t.label !== 'index')
        return
      }
    }
  }
  getSubSecs(location.pathname, treeData.items)
  return (
    <SubsectionWrapper>
      <ul className="list">
        {subSecs.map((sec: any, index: number) => (
          <li key={index}>
            <Link to={sec.url}>{sec.title}</Link>
          </li>
        ))}
      </ul>
    </SubsectionWrapper>
  )
}

export default Subsections
