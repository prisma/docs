import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function TabItem({children, hidden, className, code = true }) {
  return (
    <div
      role="tabpanel"
      className={clsx(styles.tabItem, className)}
      {...{hidden}}>
      <div className={code ? styles.codeChildren : styles.children}>{children}</div>
    </div>
  );
}
