import React, { useState } from 'react';
import TreeNode from './treeNode';
import { AllEdges } from '../../interfaces/AllArticles.interface';
import { ArticleFields } from '../../interfaces/Article.interface';

interface TreeNode {
  node: {
    fields: ArticleFields;
  };
}
let defaultCollapsed: any = {};

// TODO::Simplify the function
const calculateTreeData = (edges: any) => {
  const tree = edges.reduce(
    (
      accu: any,
      {
        node: {
          fields: { slug, title, staticLink, duration, experimental },
        },
      }: TreeNode
    ) => {
      const parts = slug.split('/');
      let { items: prevItems } = accu;
      const slicedParts = parts.slice(1, -1);
      for (const part of slicedParts) {
        let tmp =
          prevItems && prevItems.find(({ label }: any) => label == part);

        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = {
            label: part,
            items: [],
            topLevel: parts.length == 3 ? true : false,
          };
          prevItems.push(tmp);
        }
        if (
          parts[parts.length - 1] === 'index' &&
          parts[parts.length - 2] === part
        ) {
          tmp.url = slug;
          tmp.title = title;
          tmp.staticLink = staticLink;
          tmp.duration = duration;
          tmp.experimental = experimental;
        }
        defaultCollapsed[part.toLowerCase()] =
          tmp.topLevel || tmp.staticLink ? false : true;
        prevItems = tmp.items;
      }
      const slicedLength = parts.length - 1;
      const existingItem = prevItems.find(
        ({ label }: any) => label === parts[slicedLength]
      );

      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          items: [],
          title,
          staticLink,
          duration,
          experimental,
        });
      }

      return accu;
    },
    { items: [] }
  );
  return tree;
};

const Tree = ({ edges }: AllEdges) => {
  let [treeData] = useState(() => {
    return calculateTreeData(edges);
  });

  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = (label: string) => {
    setCollapsed({
      ...collapsed,
      [label]: !collapsed[label],
    });
  };

  return <TreeNode setCollapsed={toggle} collapsed={collapsed} {...treeData} />;
};

export default Tree;
