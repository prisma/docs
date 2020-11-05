import { EdgeNode } from './EdgeNode.interface'

export interface AllEdges {
  edges?: [EdgeNode] | EdgeNode[]
}

export interface AllArticles {
  allMdx: AllEdges
}
export interface AllArticlesQueryData {
  data: AllArticles
}
