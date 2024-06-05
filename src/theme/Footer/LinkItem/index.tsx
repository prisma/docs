import isInternalUrl from "@docusaurus/isInternalUrl";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Icon } from "@site/src/components/Icon";
import clsx from "clsx";
import React from "react";

import styles from "../Layout/styles.module.scss";

export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isRoot = to === "/docs" || to === "/docs/";

  const footerProps = {
    className: clsx(
      props.className,
      styles["footer__link-item"],
      "footer__link-item",
      item.customProps?.icon && item.customProps?.icon
    ),
    autoAddBaseUrl: isRoot ? false : undefined,
    ...(href
      ? {
          href: prependBaseUrlToHref ? normalizedHref : href,
        }
      : {
          to: isRoot ? "/docs" : toUrl,
        }),
    ...(props.target && { target: props.target }),
    style: props?.style,
  };

  return (
    <Link {...footerProps}>
      {!item.customProps?.dropdown && label}
      {!item.customProps?.internal && href && !isInternalUrl(href) &&
        <>&nbsp;↗</>
      }
    </Link>
  );
}
