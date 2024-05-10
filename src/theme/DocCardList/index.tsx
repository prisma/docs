import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useCurrentSidebarCategory, filterDocCardListItems } from "@docusaurus/theme-common";
import DocCard from "../DocCard";
import { useLocation } from "@docusaurus/router";
import styles from "../DocCard/styles.module.scss";
function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}
export default function DocCardList(props) {
  const { items, className } = props;
  const location = useLocation();
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const [filteredItems, setFilteredItems] = useState<any>(filterDocCardListItems(items));
  useEffect(() => {
    setFilteredItems(filteredItems.filter((e: any) => e?.href?.slice(0, -1) !== location.pathname));
  }, [items]);
  return (
    <section className={clsx("row", className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className={clsx("col", "col--6", "margin-bottom--lg", styles.col6)}>
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
