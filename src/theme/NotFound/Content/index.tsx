import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className={clsx("row", styles.notFoundRow)}>
        <div className={styles.wrapper}>
          <h1 className={styles.heroRoot}>
            <span className={styles.glitch} data-text="[404]">
              [404]
            </span>
          </h1>
          <div className={styles.description}>
            <h5>404 - Page not found</h5>
              <div className={styles.desktop}>
                <p>We could not find the page you were looking for.</p>
                <p></p>
                <p>Head back to our <a href="https://prisma.io/">homepage</a> or check out</p>
                <p>our <Link to="/">documentation</Link></p>
              </div>
              <div className={styles.mobile}>
                <p>We could not find the page</p>
                <p>you were looking for.</p>
                <p></p>
                <p>Head back to our</p>
                <p><a href="https://prisma.io/">homepage</a> or check out</p>
                <p>our <Link to="/">documentation</Link></p>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}