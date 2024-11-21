import React from "react";
import DocSidebarItemCategory from "./Category";
import DocSidebarItemHtml from "./Html";
import DocSidebarItemLink from "./Link";
export default function DocSidebarItem({ item, ...props }) {
  switch (item.type) {
    case "category":
      //@ts-ignore
      return <DocSidebarItemCategory item={item} {...props} />;
    case "html":
      //@ts-ignore
      return <DocSidebarItemHtml item={item} {...props} />;
    case "link":
    default:
      //@ts-ignore
      return <DocSidebarItemLink item={item} {...props} />;
  }
}
