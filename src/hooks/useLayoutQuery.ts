import { graphql, useStaticQuery } from 'gatsby'
import { LayoutQueryData } from '../interfaces/Layout.interface'

export const useLayoutQuery = () => {
  const { site }: LayoutQueryData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          # change siteMetaData in 'gatsby-config.js'
          title
          footer {
            newsletter {
              text
            }
          }
          header {
            secondLevelHeaderMenuItems {
              type
              to
              bucketName
              text
            }
          }
        }
      }
    }
  `)

  return { site }
}
