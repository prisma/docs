import React from "react";

import LinkItem from "../../LinkItem";

import type { Props } from "@theme/Footer/Links/MultiColumn";
import SimpleDropdown from "@site/src/components/dropdown";
import { Icon } from "@site/src/components/Icon";
import styles from "./styles.module.scss";
import clsx from "clsx";

type ColumnType = Props["columns"][number];
type ColumnItemType = ColumnType["items"][number];

function ColumnLinkItem({ item }: { item: ColumnItemType }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({ column }: { column: ColumnType }) {
  // @ts-ignore
  const legalDropdownItems = column.items.filter(
    (item, i) => item?.customProps?.dropdown === "legal"
  );

  return (
    <div
      className={clsx(
        styles.col,
        "col footer__col",
        column.title === "socials" && styles.socialColWrapper
      )}
    >
      {column.title !== "socials" && <div className="footer__title">{column.title}</div>}
      {/* @ts-ignore */}
      <ul
        className={clsx("footer__items clean-list", column.title === "socials" && styles.socialCol)}
      >
        {column.items.map(
          (item, i) => !item?.customProps?.dropdown && <ColumnLinkItem key={i} item={item} />
        )}
        {legalDropdownItems.length > 0 && (
          <SimpleDropdown
            dark
            pos="top"
            anchor={
              <li className="footer__item anchor">
                Legal
                <Icon
                  className={styles.icon}
                  btn="right"
                  icon="fa-regular fa-chevron-down"
                  size="16px"
                  color={"inherit"}
                />
              </li>
            }
            items={legalDropdownItems.map((dropLink: { label: string; href: string }) => (
              <a href={dropLink.href} target="__blank" className={styles.dropdownLink}>
                {dropLink.label}
              </a>
            ))}
          />
        )}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({ columns }: Props): JSX.Element {
  return (
    <div className={clsx(styles.row, "row footer__links")}>
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
