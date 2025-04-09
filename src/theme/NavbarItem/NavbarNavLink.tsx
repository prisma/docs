import isInternalUrl from "@docusaurus/isInternalUrl";
import Link from "@docusaurus/Link";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import React, { useEffect, useState } from "react";

import type { Props } from "@theme/NavbarItem/NavbarNavLink";
import { useLocation } from "@docusaurus/router";

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: Props): JSX.Element {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const isExternalLink = !isInternalUrl(href ? href : to) && label;
  const location = useLocation();

  const isRoot = toUrl === "/docs" || toUrl === "/docs/";

  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <>
            {label}
          </>
        ),
      };

  return (
    <Link
      to={isRoot ? `/docs${!isExternalLink ? location.search : ""}` : `${toUrl}${!isExternalLink ? location.search : ""}`}
      autoAddBaseUrl={isRoot ? false : undefined}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}
