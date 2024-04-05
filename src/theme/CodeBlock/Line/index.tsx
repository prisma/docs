import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}) {
  if (line.length === 1 && line[0].content === '\n') {
    line[0].content = '';
  }
  const lineProps = getLineProps({
    line,
    className: clsx(
      classNames,
      showLineNumbers ? styles.codeLine : styles.noLineNumbers
    ),
  });
  const lineTokens = line.map((token, key) => (
    <span key={key} {...getTokenProps({token, key})} />
  ));
  useEffect(() => {
    console.log(lineProps.className)
  }, [lineProps])
  const highlightedLine = classNames?.find((e:string) => e.includes("code-highlight"))
  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineContent}>
            {!highlightedLine && <span className={styles.codeLineNumber} />}
            {lineTokens}
          </span>
        </>
      ) : (
        <span className={styles.codeLineContent}>
          {lineTokens}
        </span>
      )}
      <br />
    </span>
  );
}
