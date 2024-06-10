import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}) {
  if (line.length === 1 && line[0].content === "\n") {
    line[0].content = "";
  }
  const highlightedLine = classNames?.find((e: string) => e.includes("code-highlight"));
  const lineProps = getLineProps({
    line,
    className: clsx(
      classNames,
      showLineNumbers ? styles.codeLine : styles.noLineNumbers,
      highlightedLine && (showLineNumbers ? styles.highlightedNumbers : styles.highlightedLine)
    ),
  });
  const lineTokens = line.map((token, key) => (
    <span key={key} {...getTokenProps({ token, key })} />
  ));
  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={clsx(styles.codeLineContent, highlightedLine && styles.codeHighlighted)}>
            {!highlightedLine && <span className={styles.codeLineNumber} />}
            {lineTokens}
          </span>
        </>
      ) : (
        <span className={clsx(styles.codeLineContent, highlightedLine && styles.codeHighlighted)}>
          {lineTokens}
        </span>
      )}
      <br />
    </span>
  );
}
