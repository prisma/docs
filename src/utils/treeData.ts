import { urlGenerator } from './urlGenerator'
import { ArticleFields, ArticleFrontmatter } from '../interfaces/Article.interface'

interface TreeNode {
  node: {
    fields: ArticleFields
    frontmatter: ArticleFrontmatter
  }
}

const getCollpaseState = (part: string, location: any) => {
  const mainpath = location.pathname.replace(/^\/|\/$/g, '').split('/')
  const subpath = urlGenerator(part)
    .replace(/^\/|\/$/g, '')
    .split('/')

  const state = subpath.every((val) => mainpath.includes(val))
  return !state
}

// TODO::Simplify the function
export const calculateTreeData = (edges: any, defaultCollapsed: any, location: any) => {
  const tree = edges.reduce(
    (
      accu: any,
      {
        node: {
          fields: { slug, modSlug },
          frontmatter: {
            title,
            navTitle,
            staticLink,
            duration,
            preview,
            deprecated,
            earlyaccess,
            dbSwitcher,
            langSwitcher,
            hidePage,
            codeStyle,
            hideTitle,
          },
        },
      }: TreeNode
    ) => {
      const parts = slug.split('/')
      const topLevel = parts.length == 3 && parts[parts.length - 1] === 'index' ? true : false
      let { items: prevItems } = accu
      const slicedParts = parts.slice(1, -1)
      const newParams = `${langSwitcher ? `${langSwitcher[0]}${dbSwitcher ? '-' : ''}` : ''}${
        dbSwitcher ? `${dbSwitcher[0]}` : ''
      }`
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
            preview,
            deprecated,
            earlyaccess,
            staticLink,
          }
          prevItems.push(tmp)
        }
        if (parts[parts.length - 1] === 'index' && parts[parts.length - 2] === part) {
          tmp.url = `${urlGenerator(modSlug)}${newParams ? '-' + newParams : ''}`
          tmp.slug = slug
          tmp.title = title
          tmp.navTitle = navTitle
          tmp.staticLink = staticLink
          tmp.duration = duration
          tmp.preview = preview
          tmp.deprecated = deprecated
          tmp.earlyaccess = earlyaccess
          tmp.topLevel = topLevel
          tmp.hidePage = hidePage
          tmp.codeStyle = codeStyle
          tmp.parentLabel = parts[parts.length - 3]
          tmp.parents = parts.filter((part) => part !== 'index')
          tmp.hideTitle = hideTitle
          if (defaultCollapsed && location) {
            defaultCollapsed[part.toLowerCase()] =
              tmp.topLevel || tmp.staticLink ? null : getCollpaseState(modSlug, location)
          }
        }

        prevItems = tmp.items
      }
      const slicedLength = parts.length - 1
      const existingItem = prevItems.find(({ label }: any) => label === parts[slicedLength])

      if (!existingItem) {
        prevItems.push({
          label: parts[slicedLength],
          url: `${urlGenerator(modSlug)}${newParams ? '-' + newParams : ''}`,
          slug: slug,
          items: [],
          title,
          navTitle,
          hideTitle,
          staticLink,
          duration,
          preview,
          deprecated,
          earlyaccess,
          topLevel,
          hidePage,
          codeStyle,
          parentLabel: parts[parts.length - 3],
          parents: parts.filter((part) => part !== 'index'),
        })
      }

      return accu
    },
    { items: [] }
  )
  return tree
}
