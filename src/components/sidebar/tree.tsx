import React, { useState } from 'react'
import TreeNode from './treeNode'
import { AllEdges } from '../../interfaces/AllArticles.interface'
import { ArticleFields, ArticleFrontmatter } from '../../interfaces/Article.interface'
import { createGlobalState } from 'react-hooks-global-state'
import { urlGenerator } from '../../utils/urlGenerator'

interface TreeNode {
  node: {
    fields: ArticleFields
    frontmatter: ArticleFrontmatter
  }
}

const getCollpaseState = (part: string) => {
  let location
  if (typeof document != 'undefined') {
    location = document.location
  }
  return !(location && location.pathname.includes(urlGenerator(part)))
}

let defaultCollapsed: any = {}
// TODO::Simplify the function
const calculateTreeData = (edges: any) => {
  const tree = edges.reduce(
    (
      accu: any,
      {
        node: {
          fields: { slug },
          frontmatter: { title, staticLink, duration, experimental },
        },
      }: TreeNode
    ) => {
      const parts = slug.split('/')
      const topLevel = parts.length == 3 && parts[parts.length - 1] === 'index' ? true : false
      let { items: prevItems } = accu
      const slicedParts = parts.slice(1, -1)
      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }: any) => label == part)
        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = {
            label: part,
            items: [],
            topLevel,
            experimental,
            staticLink,
          }
          prevItems.push(tmp)
        }
        if (parts[parts.length - 1] === 'index' && parts[parts.length - 2] === part) {
          tmp.url = slug
          tmp.title = title
          tmp.staticLink = staticLink
          tmp.duration = duration
          tmp.experimental = experimental
          tmp.topLevel = topLevel
        }

        defaultCollapsed[part.toLowerCase()] =
          tmp.topLevel || tmp.staticLink ? false : getCollpaseState(part.toLowerCase())
        prevItems = tmp.items
      }
      const slicedLength = parts.length - 1
      const existingItem = prevItems.find(({ label }: any) => label === parts[slicedLength])

      if (!existingItem) {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          items: [],
          title,
          staticLink,
          duration,
          experimental,
          topLevel,
        })
      }

      return accu
    },
    { items: [] }
  )
  return tree
}

const initialState = { collapsedState: defaultCollapsed }
const { useGlobalState } = createGlobalState(initialState)

const Tree = ({ edges }: AllEdges) => {
  let [treeData] = useState(() => {
    return calculateTreeData(edges)
  })
  const [collapsed, setCollapsed] = useGlobalState('collapsedState')

  const toggle = (label: string) => {
    setCollapsed({
      ...collapsed,
      [label]: !collapsed[label],
    })
  }

  return <TreeNode setCollapsed={toggle} collapsed={collapsed} {...treeData} />
}

export default Tree
