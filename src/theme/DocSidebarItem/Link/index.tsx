import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";
import { Icon } from "@site/src/components/Icon";
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const [techSwitch, setTechSwitch] = useState<boolean>(false);
  const isInternalLink = isInternalUrl(href);
  const location = useLocation();

  const [badgeContent, setBadgeContent] = useState<string | undefined>(undefined);

  const checkPath = () => {
    if (location.pathname.includes("-typescript-") || location.pathname.includes("-node-")) {
      const splitLocation = location.pathname.split("typescript-")[0].split("node-")[0];
      const splitItem = href.split("typescript-")[0].split("node-")[0];

      if (splitItem === splitLocation) return true;
      else return false;
    } else {
      const splitLocation = location.pathname.split("-mysql")[0].split("-postgresql")[0];
      const splitItem = href.split("-mysql")[0].split("-postgresql")[0];

      if (splitItem === splitLocation) return true;
      else return false;
    }
  };

  useEffect(() => {
    if (item && item.customProps && item.customProps.badge) {
      setBadgeContent(item.customProps.badge);
    }
    setTechSwitch(checkPath());
  }, [item]);

  useEffect(() => {
    setTechSwitch(checkPath());
  }, [location]);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          "menu__link",
          !isInternalLink && styles.menuExternalLink,
          (isActive || techSwitch) && styles.active,
          {
            "menu__link--active": isActive,
          }
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {label}
        {badgeContent && <span className={styles.badge}>{badgeContent}</span>}
        {!isInternalLink && <Icon icon="fa-solid fa-arrow-up-right" size="1rem" />}
      </Link>
    </li>
  );
}
