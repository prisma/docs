import React from 'react';
import styled from 'styled-components';
import ArrowRight from '../../icons/ArrowRight';
import ArrowDown from '../../icons/ArrowDown';
import Link from '../link';
import { urlGenerator } from '../../utils/urlGenerator';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
  &.has-border {
    border-left: 2px solid #E2E8F0;
    margin-left: -12px;
  }
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 16px;
  margin-bottom: 16px;
  position: relative;
  a {
    transition: color 150ms ease 0s;
    color: #718096 !important;
    text-decoration: none;
    vertical-align: middle;
    &:hover { color: #1A202C !important; }

    .tag {
      position: absolute;
      right: 0;
      color: #a0aec0;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      background: #edf2f7;
      border-radius: 5px;
      padding: 2px 5px;
      &.small {
        font-size: 13px;
      }
    }

    .item-collapser {
      background: transparent;
      position: absolute;
      left: -16px;
      top: 3px;
      padding: 0;
      border: 0;

      &:hover,
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  .active-item {
    color: #1A202C !important;
    font-weight: 700;
  }
  &.top-level {
    margin-top: 2rem;
    > a {
      font-size: 20px;
      color: #1a202c !important;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    > ul {
      margin-top: 24px;
    }
  }
  &.bottom-level {
    margin-left: 20px;
  }
  &.static-link {
    margin-top: 24px;
  }
  &.static-link > a {
    color: #a0aec0 !important;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    &:hover { color: #a0aec0 !important; }
  }
  &.last-level {
    padding-left: 24px;
  }
  .collapse-title {
    cursor: pointer;
  }
`;

const TreeNode = ({
  className = '',
  setCollapsed,
  collapsed,
  url,
  title,
  items,
  label,
  topLevel,
  staticLink,
  duration,
  experimental,
  lastLevel,
}: any) => {
  const isCollapsed = collapsed[label];

  const collapse = () => {
    setCollapsed(label);
  };

  const hasChildren = items.length !== 0;

  const calculatedClassName = `${className || ''} ${topLevel ? 'top-level' : ''} ${
    staticLink ? 'static-link' : ''
  } ${lastLevel ? 'last-level' : ''}`;

  items.sort((a: any, b: any) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  const hasExpandButton = title && hasChildren && !staticLink && !topLevel;
  let hasBorder: boolean = false;
  if (hasExpandButton) {
    items.map((item: any) => (item.lastLevel = true));
    hasBorder = true;
  }

  return url === '/' ? null : (
    <ListItem className={calculatedClassName}>
      {title && label !== 'index' && url !== '/01-getting-started/04-example' && (
        <Link
          to={url.split('/').includes('index') ? null : urlGenerator(url)}
          activeClassName="active-item"
        >
          {hasExpandButton ? (
            <span onClick={collapse} className="collapse-title">
              <button aria-label="collapse" className="item-collapser">
                {!isCollapsed ? <ArrowDown /> : <ArrowRight />}
              </button>
              {title}
            </span>
          ) : (
            <span>{title}</span>
          )}
          {duration && <span className="tag">{duration}</span>}
          {experimental && <span className="tag small">Experimental</span>}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <List className={`${hasBorder ? 'has-border' : ''}`}>
          {items.map((item: any, index: number) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </List>
      ) : null}
    </ListItem>
  );
};
export default TreeNode;
