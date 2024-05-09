import React from "react";
import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/EditThisPage";
import styles from "./styles.module.scss";
import clsx from "clsx";

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <Link
      to={editUrl}
      className={clsx(ThemeClassNames.common.editThisPage, "edit-git", styles.editLink)}
    >
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        Edit this page on GitHub
      </Translate>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 12 12"
        style={{ paddingLeft: `3px` }}
      >
        <path
          fill="currentColor"
          d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16zM2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1"
        />
      </svg>
    </Link>
  );
}
