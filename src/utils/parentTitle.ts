export const getParentTitle = (slug: string, allMdx?: any) => {
  const allContent =
    allMdx &&
    allMdx.edges &&
    allMdx.edges.map((mdx: any) => ({ ...mdx.node.fields, title: mdx.node.frontmatter.title }))
  allContent?.map((content: any) => {
    content.parentTitle = ''
    const parts = content.slug.split('/')
    const slicedParts = parts.slice(1, parts.length - 1)
    slicedParts.forEach((part: any) => {
      const parent = allContent.find((ac: any) => {
        const parentParts = ac.slug.split('/')
        return (
          parentParts[parentParts.length - 1] === 'index' &&
          parentParts[parentParts.length - 2] === part
        )
      })
      content.parentTitle = content.parentTitle + parent?.title + ' / '
    })
  })

  return allContent?.find((mdx: any) => mdx.slug === slug).parentTitle.slice(0, -2)
}
