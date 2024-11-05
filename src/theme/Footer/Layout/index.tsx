import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer className={clsx(styles[`footer--dark`], "footer", "footer--dark")}>
      <div className={clsx(styles.container, "container", "container-fluid")}>
        {logo && <div className={clsx(styles.logo, "margin-bottom--sm")}>{logo}</div>}
        {links}
        <img
          className="footer-scarf"
          referrerPolicy="no-referrer-when-downgrade"
          alt=""
          src="https://static.scarf.sh/a.png?x-pxid=d3850fa1-ff40-448d-9a15-5496ce99c9ae"
        />
        <div className={styles.newsletterRow}></div>
        {(logo || copyright) && (
          <div className={clsx(styles[`footer__bottom`], "footer__bottom", "text--center")}>
            {copyright}
            <div className={styles.complianceLogos}>
              <a
                href="https://trust.prisma.io/"
                target="__blank"
                rel="openeer noreferrer"
                aria-label="Prisma Trust"
              >
                <img src={useBaseUrl("/img/icons/gdpr.svg")} alt="gdpr" width={35} height={35} />
              </a>
              <a
                href="https://trust.prisma.io/"
                target="__blank"
                rel="openeer noreferrer"
                aria-label="Prisma Trust"
              >
                <img src={useBaseUrl("/img/icons/hipaa.svg")} alt="hipaa" width={62} height={29} />
              </a>
              <a
                href="https://trust.prisma.io/"
                target="__blank"
                rel="openeer noreferrer"
                aria-label="Prisma Trust"
              >
                <img
                  src={useBaseUrl("/img/icons/iso27.svg")}
                  alt="iso27001"
                  width={73}
                  height={27}
                />
              </a>
              <a
                href="https://trust.prisma.io/"
                target="__blank"
                rel="openeer noreferrer"
                aria-label="Prisma Trust"
              >
                <img
                  src={useBaseUrl("/img/icons/soc2.svg")}
                  alt="soc"
                  width={60}
                  height={27}
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
