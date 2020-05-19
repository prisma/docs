import React, { useState } from 'react'
import TreeNode from './treeNode'
import { AllEdges } from '../../interfaces/AllArticles.interface'
import { createGlobalState } from 'react-hooks-global-state'
import { useLocation } from '@reach/router'
import { calculateTreeData } from '../../utils/treeData'

let defaultCollapsed: any = {}

const initialState = { collapsedState: defaultCollapsed }
const { useGlobalState } = createGlobalState(initialState)

const Tree = ({ edges }: AllEdges) => {
  const location = useLocation()
  let [treeData] = useState(() => {
    return calculateTreeData(edges, defaultCollapsed, location)
  })
  const [collapsed, setCollapsed] = useGlobalState('collapsedState')

  const toggle = (label: string, toggle: boolean) => {
    setCollapsed({
      ...collapsed,
      [label]: !toggle ? false : !collapsed[label],
    })
  }

  return <TreeNode setCollapsed={toggle} collapsed={collapsed} {...treeData} />
}

export default Tree
