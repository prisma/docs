import React from "react";
import config from "../../../config";
import styled from "styled-components";
import "./treeNode.css";
import ArrowRight from "../../icons/ArrowRight";
import ArrowDown from "../../icons/ArrowDown";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 16px;
  margin-bottom: 16px;
  a {
    color: #4a5568 !important;
    text-decoration: none;
  }
`;

const TreeNode = ({
  className = "",
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
  ...rest
}: any) => {
  const isCollapsed = collapsed[label];
  const collapse = () => {
    setCollapsed(label);
  };

  const hasChildren = items.length !== 0;
  let location;
  if (typeof document != "undefined") {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? "active" : ""} ${
    topLevel ? "top-level" : ""
  } ${staticLink ? "static-link" : ""}`;

  items.sort((a: any, b: any) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  return (
    <ListItem className={calculatedClassName}>
      {title && label !== "index" && (
        <a href={url.split("/").includes("index") ? null : url}>
          {title && hasChildren && !staticLink && !topLevel ? (
            <button onClick={collapse} aria-label="collapse" className="item-collapser">
              {!isCollapsed ? <ArrowDown /> : <ArrowRight />}
            </button>
          ) : null}
          {title}
          {duration && <span className="tag">{duration}</span>}
          {experimental && <span className="tag">Experimental</span>}
        </a>
      )}

      {!isCollapsed && hasChildren ? (
        <List>
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
