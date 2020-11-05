export interface HeaderProps {
  secondLevelHeaderMenuItems: { text: string; type: string; to: string; bucketName: string }[]
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
