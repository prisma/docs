import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function TabItem({children, hidden, className, code = true, table = false }) {
  return (
    <div
      role="tabpanel"
      className={clsx(styles.tabItem, className, code && 'code-children')}
      {...{hidden}}>
      <div className={
        clsx(code ? styles.codeChildren : styles.children, table && styles.tableChildren)
      }>{children}</div>
    </div>
  );
}
