import React from 'react';
import TreeNode from './treeNode';
import { AllEdges } from '../../interfaces/AllArticles.interface';
import styled from 'styled-components';

const Tree = ({ edges }: AllEdges) => {
  const sortedEdges =
    edges &&
    edges.sort((a: any, b: any) => {
      if (a.node.fields.slug < b.node.fields.slug) {
        return -1;
      }
      if (a.node.fields.slug > b.node.fields.slug) {
        return 1;
      }
      return 0;
    });

  const ArticleList = styled.ul`
    padding: 0 1rem 2rem;
    list-style: none;
  `;

  return (
    <ArticleList>
      {sortedEdges &&
        sortedEdges.map((item: any, index: number) => (
          <TreeNode key={index} {...item.node} />
        ))}
    </ArticleList>
  );
};

export default Tree;
