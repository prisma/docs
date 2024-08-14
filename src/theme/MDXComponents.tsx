import React, { useState } from "react";

import type { ComponentProps } from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";

// Import components we'd like to use across Docs
import Subsections from "./DocCardList"; // DocCardList renamed to Subsections for backwards compat
import Admonition from "@theme/Admonition";
import TabbedContent from "./Tabs"; // Tabs renamed to TabbedContent for backwards compat
import TabItem from "@theme/TabItem";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import CollapseBox from "@site/src/components/collapsible";
import TopSection from "@site/src/components/topSection";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.scss";
import clsx from "clsx";

// TODO: do we want to fix this?
const TopBlock: React.FC<React.PropsWithChildren> = ({
  children,
  langSwitcher,
  dbSwitcher,
  slug,
}: any) => {
  const location = useLocation();
  return (
    <>
      {(langSwitcher || dbSwitcher) && <section className="top-section">
        <TopSection
          location={location}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          slug={slug}
        />
      </section>}
      {children}
    </>
  );
};

// TODO: we should fix this
const CodeWithResult: React.FC<{ children: React.ReactElement[] }> = ({
  children,
  outputResultText,
  ...rest
}: any) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={styles.codeWithResult} {...rest}>
      <div className={styles.cmd}>{children[0]}</div>
      <div className={styles.result}>
        <div className={styles.showBtn} onClick={() => setShow(!show)}>
          Show {outputResultText ? outputResultText : "CLI"} results
        </div>
        {show && children[1]}
      </div>
    </div>
  );
};

// TODO: we should fix this
const SwitchTech: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p>{children}</p>;
};

const ParallelBlocks: React.FC<React.PropsWithChildren> = ({ children }) => {
  const childArray = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child)) {
      return (
        <div className="col col--6">
          <b>{child.props.content}</b>
          <div>{child}</div>
        </div>
      );
    } else {
      return (
        <div className="col col--6">
          <div>{child}</div>
        </div>
      );
    }
  });

  return (
    <div className="container">
      <div className="row">{childArray}</div>
    </div>
  );
};

const DocsLink: React.FC<React.PropsWithChildren<ComponentProps<typeof Link>>> = ({
  children,
  ...props
}) => {
  if (props.href?.includes("console.prisma.io")) {
    return (
      <BrowserOnly>
        {() => {
          const queryParams = window.location.href.split("?")[1] ?? "";
          if (queryParams.includes("utm_")) {
            sessionStorage.setItem("prismaUTM", queryParams);
          }
          const utmParams = sessionStorage.getItem("prismaUTM");
          const modifiedHref = `${props.href?.split("?")[0]}?${utmParams ?? props.href?.split("?")[1] ?? ""}`;
          return (
            <Link {...props} href={modifiedHref}>
              {children}
            </Link>
          );
        }}
      </BrowserOnly>
    );
  }

  return <Link {...props}>{children}</Link>;
};

type ButtonColor = "red" | "green" | "grey" | "grey-bg" | "dark";
interface ButtonProps {
  href?: string;
  target?: string;
  block?: boolean;
  color?: ButtonColor;
  disabled?: boolean;
  arrow?: boolean;
  onClick?: any;
  arrowLeft?: boolean;
  theme?: any;
}

const ButtonLink: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, href }) => {
  return <DocsLink to={href}>{children}</DocsLink>;
};

const NavigationLinksContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

const StyledLink: React.FC<React.PropsWithChildren<ComponentProps<"a">>> = ({
  children,
  ...props
}) => {
  const url = props.href;
  if (url?.includes(".prisma.io") || url?.startsWith("/") || url?.startsWith("#"))
    return <DocsLink {...props}>{children}</DocsLink>;
  else
    return (
      <a {...props} target="_blank" rel="openeer noreferrer" className={clsx(props.className, styles.externalLink)}>
        {children}
      </a>
    );
};

const Image: React.FC<React.PropsWithChildren<ComponentProps<"img">>> = ({
  ...props
}) => {
  return <img {...props} className={clsx(props.className, styles.img)} />
}

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Subsections,
  Admonition,
  TabbedContent,
  details: CollapseBox,
  TabItem,
  a: StyledLink,
  Link: DocsLink,
  img: Image,
  TopBlock,
  CodeWithResult,
  SwitchTech,
  ParallelBlocks,
  ButtonLink,
  NavigationLinksContainer,
};
