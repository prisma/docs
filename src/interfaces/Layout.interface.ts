export interface HeaderProps {
  secondLevelHeaderMenuItems: {
    hidden: boolean
    text: string
    type: string
    to: string
    bucketName: string
  }[]
  wide?: boolean
}

export interface FooterProps {
  newsletter: { text: string }
}

interface SiteMeta {
  siteMetadata: {
    header: HeaderProps
    title: string
    footer: FooterProps
  }
}

export interface LayoutQueryData {
  site: SiteMeta
}

export interface CreatePageContext {
  pageContext: {
    seoTitle: string
    seoDescription: string
  }
}
