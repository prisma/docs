import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className={clsx("row", styles.notFoundRow)}>
        <img src={useBaseUrl("/icons/derp.svg")} />
        <div>
          <Heading as="h1" className={styles.hero__title}>
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              404 | Page not found
            </Translate>
          </Heading>
          <p>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p>
            <Link to="/">Docs</Link> | <a href="https://www.prisma.io/blog">Blog</a>
          </p>
        </div>
      </div>
    </main>
  );
}
