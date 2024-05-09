import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Container from "../Container";
// <pre> tags in markdown map to CodeBlocks. They may contain JSX children. When
// the children is not a simple string, we just return a styled block without
// actually highlighting.
export default function CodeBlockJSX({ children, className, wrap = false }) {
  return (
    <Container
      as="pre"
      tabIndex={0}
      className={clsx(styles.codeBlockStandalone, "thin-scrollbar", className)}
    >
      <code className={clsx(styles.codeBlockLines, wrap && styles.wrap)}>{children}</code>
    </Container>
  );
}
