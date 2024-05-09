import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
export default function TabItem({
  children,
  hidden,
  className,
  code = false,
  table = false,
  terminal = false,
}) {
  return (
    <div
      role="tabpanel"
      className={clsx(
        styles.tabItem,
        className,
        code && "code-children",
        terminal && styles.terminal
      )}
      {...{ hidden }}
    >
      <div
        className={clsx(
          code ? styles.codeChildren : styles.children,
          table && styles.tableChildren
        )}
      >
        {children}
      </div>
    </div>
  );
}
