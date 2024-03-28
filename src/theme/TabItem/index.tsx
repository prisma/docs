import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function TabItem({children, hidden, className}) {
  return (
    <div
      role="tabpanel"
      className={clsx(styles.tabItem, className)}
      {...{hidden}}>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
