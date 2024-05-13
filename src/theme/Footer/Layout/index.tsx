import React from "react";
import clsx from "clsx";
import { FooterNewsletterForm } from "@site/src/components/newsletter/FooterNewsletterForm";
import styles from "./styles.module.scss";

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer className={clsx(styles[`footer--dark`], "footer", "footer--dark")}>
      <div className={clsx(styles.container, "container", "container-fluid")}>
        {links}

        <div className={styles.newsletterRow}>
          <h4 className={styles.title}>Newsletter</h4>
          <FooterNewsletterForm />
        </div>
        {(logo || copyright) && (
          <div className={clsx(styles[`footer__bottom`], "footer__bottom", "text--center")}>
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
