import React, { useState } from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";

// Import components we'd like to use across Docs
import Subsections from "./DocCardList"; // DocCardList renamed to Subsections for backwards compat
import Admonition from "@theme/Admonition";
import TabbedContent from "./Tabs"; // Tabs renamed to TabbedContent for backwards compat
import TabItem from "@theme/TabItem";
import Link from "@docusaurus/Link";
import CollapseBox from "@site/src/components/collapsible";
import TopSection from "@site/src/components/topSection";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.scss";

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
      <section className="top-section">
        <TopSection
          location={location}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          slug={slug}
        />
      </section>
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

// TODO: we should fix this
const ButtonLink: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, href }) => {
  return <Link to={href}>{children}</Link>;
};

// TODO: we should fix this
const NavigationLinksContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

const StyledLink: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  //@ts-ignore
  const url = props && props?.href;
  if (url?.includes("prisma.io/") || url?.charAt(0) === "/")
    return <Link {...props}>{children}</Link>;
  else
    return (
      <a {...props} target="_blank" rel="openeer noreferrer">
        {children}
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
      </a>
    );
};

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Subsections,
  Admonition,
  TabbedContent,
  details: CollapseBox,
  TabItem,
  a: StyledLink,
  Link,
  TopBlock,
  CodeWithResult,
  SwitchTech,
  ParallelBlocks,
  ButtonLink,
  NavigationLinksContainer,
};
