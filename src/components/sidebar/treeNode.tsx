import React from 'react';
import config from '../../../config';
import styled from 'styled-components';
import './treeNode.css';
import { Fields } from '../../interfaces/Article.interface';

const ListItem = styled.li`
  padding: 0.5rem 1.2rem;
  a {
    color: #2f3747;
    text-decoration: none;
    margin: 0.9rem 0;
  }
`;

const TreeNode = ({ fields }: Fields) => {
  const url = fields.slug;
  let location;
  if (typeof document != 'undefined') {
    location = document.location;
  }
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url);
  const calculatedClassName = `item ${active ? 'active' : ''}`;

  return (
    <ListItem className={calculatedClassName}>
      {fields.title && <a href={url}>{fields.title}</a>}
    </ListItem>
  );
};
export default TreeNode;
