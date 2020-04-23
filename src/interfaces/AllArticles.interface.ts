import { EdgeNode } from './EdgeNode.interface'
import { ArticleFields } from './Article.interface'

export interface AllEdges {
  edges?: [EdgeNode<ArticleFields>]
}

export interface AllArticles {
  allMdx: AllEdges
}
export interface AllArticlesQueryData {
  data: AllArticles
}
