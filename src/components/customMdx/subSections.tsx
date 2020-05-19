import Link from '../link'
import * as React from 'react'
import { calculateTreeData } from '../../utils/treeData'
import { AllArticles } from '../../interfaces/AllArticles.interface'
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { withPrefix } from 'gatsby'

interface SubsecProps {
  depth?: number
}

const SubsectionWrapper = styled.div`
  margin: 1.5rem 0;
`

const Subsections = ({ depth }: SubsecProps) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const location = useLocation()
  const treeData = calculateTreeData(allMdx.edges, null, null)
  let subSecs: any[] = []

  const getSubSecs = (currentPath: string, treeItems: any[]): any => {
    for (let i = 0; i < treeItems.length - 1; i++) {
      const tree = treeItems[i]
      if (
        !(
          withPrefix(tree.url) ===
            `${currentPath.substr(-1) === '/' ? currentPath.slice(0, -1) : currentPath}` &&
          tree.label !== 'index'
        )
      ) {
        getSubSecs(currentPath, tree.items)
      } else {
        subSecs = tree.items
        return
      }
    }
  }

  getSubSecs(location.pathname, treeData.items)

  const list = (subsecs: any, dep: number) => {
    const subs = subsecs.filter((t: any) => t.label !== 'index' && !t.hidePage)
    return (
      <ul className="list">
        {subs.map((sec: any, index: number) => (
          <li key={index}>
            <Link to={sec.url}>{sec.title}</Link>
            {dep > 1 && sec.items.length > 0 && list(sec.items, dep - 1)}
          </li>
        ))}
      </ul>
    )
  }

  return <SubsectionWrapper>{list(subSecs, depth || 1)}</SubsectionWrapper>
}

export default Subsections
