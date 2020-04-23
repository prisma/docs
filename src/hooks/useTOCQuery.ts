import { graphql, useStaticQuery } from 'gatsby'
import { AllArticlesTOC } from '../interfaces/TOC.interface'

export const useTOCQuery = () => {
  const { allMdx }: AllArticlesTOC = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            tableOfContents
          }
        }
      }
    }
  `)

  return { allMdx }
}
