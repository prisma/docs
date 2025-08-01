import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useHomePageRoute } from "@docusaurus/theme-common/internal";
import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import HomeBreadcrumbItem from "@theme/DocBreadcrumbs/Items/Home";
import styles from "./styles.module.css";
// TODO move to design system folder
function BreadcrumbsItemLink({ children, href }) {
  const className = "breadcrumbs__link";
  return href ? (
    <Link className={className} href={href} itemProp="item">
      <span itemProp="name">{children}</span>
    </Link>
  ) : (
    // TODO Google search console doesn't like breadcrumb items without href.
    // The schema doesn't seem to require `id` for each `item`, although Google
    // insist to infer one, even if it's invalid. Removing `itemProp="item
    // name"` for now, since I don't know how to properly fix it.
    // See https://github.com/facebook/docusaurus/issues/7241
    <span className={className}>{children}</span>
  );
}
// TODO move to design system folder
function BreadcrumbsItem({ children, active, index, addMicrodata }) {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: "itemListElement",
        itemType: "https://schema.org/ListItem",
      })}
      className={clsx("breadcrumbs__item", {
        "breadcrumbs__item--active": active,
      })}
    >
      {children}
      <meta itemProp="position" content={String(index + 1)} />
    </li>
  );
}
export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  if (!breadcrumbs) {
    return null;
  }
  const repeatedBreadcrumbs = () => {
    if (breadcrumbs.length === 2) {
      if (breadcrumbs[0].label === breadcrumbs[1].label) return false;
      else return true;
    }
    return true;
  };
  return (
    repeatedBreadcrumbs() &&
    breadcrumbs.length > 1 && (
      <nav
        className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)}
        aria-label={translate({
          id: "theme.docs.breadcrumbs.navAriaLabel",
          message: "Breadcrumbs",
          description: "The ARIA label for the breadcrumbs",
        })}
      >
        <ul className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href = item.type === "category" && item.linkUnlisted ? undefined : item.href;
            return (
              !isLast && (
                <BreadcrumbsItem key={idx} active={isLast} index={idx} addMicrodata={!!href}>
                  <BreadcrumbsItemLink href={href}>{item.label}</BreadcrumbsItemLink>
                </BreadcrumbsItem>
              )
            );
          })}
        </ul>
      </nav>
    )
  );
}
