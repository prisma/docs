import { graphql, useStaticQuery } from 'gatsby'
import { AllArticles } from '../interfaces/AllArticles.interface'

export const useAllArticlesQuery = () => {
  const { allMdx }: AllArticles = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              duration
              navTitle
              staticLink
              preview
              deprecated
              # earlyaccess
              langSwitcher
              hideTitle
              search
              wide
              dbSwitcher
              hidePage
              codeStyle
            }
            fields {
              slug
              modSlug
            }
          }
        }
      }
    }
  `)

  return { allMdx }
}
