export interface ArticleFields {
  slug: string
  modSlug: string
}

export interface ArticleFrontmatter {
  title: string
  navTitle?: string
  metaTitle?: string
  metaDescription?: string
  langSwitcher?: string[]
  dbSwitcher?: string[]
  search?: boolean
  wide?: boolean
  staticLink?: boolean
  duration?: string
  preview?: boolean
  earlyaccess?: boolean
  toc?: boolean
  hidePage?: boolean
  tocDepth?: number
  codeStyle?: boolean
  deprecated?: boolean
  hideTitle?: boolean
}

export interface ArticleData {
  mdx: {
    fields: ArticleFields
    tableOfContents: TableOfContents
    body: string
    parent: any
    frontmatter: ArticleFrontmatter
  }
  site: {
    siteMetadata: {
      docsLocation: string
    }
  }
}

export interface ArticleQueryData {
  data: ArticleData
}

export interface Fields {
  fields: ArticleFields
}

export interface TableOfContents {
  items: {
    url: string
    title: string
    items?: any[]
  }[]
}
