export const getParentTitle = (slug: string, allMdx?: any) => {
  const allContent = allMdx && allMdx.edges && allMdx.edges.map((mdx: any) => mdx.node.fields);
  const cc = allMdx && allMdx.edges && allMdx.edges.map((mdx: any) => mdx.node.rawBody);
  const aa = (cc[0].split('---').slice(2).join('---').split('\n\n'));
  // const ss = aa.map((a:any) => a.replace(/[^a-zA-Z0-9]/g, ' '))
  const ss = aa.map((a:any) => a.split('#').join(''))

  console.log(ss);

  allContent?.map((content: any) => {
    content.parentTitle = '';
    const parts = content.slug.split('/');
    const slicedParts = parts.slice(1, parts.length - 1);
    slicedParts.forEach((part: any) => {
      const parent = allContent.find((ac: any) => {
        const parentParts = ac.slug.split('/');
        return (
          parentParts[parentParts.length - 1] === 'index' &&
          parentParts[parentParts.length - 2] === part
        );
      });
      content.parentTitle = content.parentTitle + parent?.title + ' / ';
    });
  });

  return allContent?.find((mdx: any) => mdx.slug === slug).parentTitle.slice(0, -2);
};
