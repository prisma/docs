import React from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import Logo from "@theme/Logo";
import CollapseButton from "./CollapseButton";
import Content from "./Content";
import type { Props } from "@theme/DocSidebar/Desktop";
import { Promo } from "@site/src/components/promo";
import { useLocation } from "@docusaurus/router";

import styles from "./styles.module.css";

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  let location = useLocation();
  const hasPromo = (location.pathname.split("/")[1] == "orm" || location.pathname.split("/")[2] == "orm");
  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      {hasPromo && (
        <Promo />
      )}
      <Content path={path} sidebar={sidebar} promo={hasPromo} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
