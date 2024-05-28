import React, { isValidElement, useEffect } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import CodeBlockString from "./Content/String";
import CodeBlockJSX from "./Content/Element";
import styles from "./Container/styles.module.scss";
/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join("") : children;
}
export default function CodeBlock({ children: rawChildren, ...props }) {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser();
  const children = maybeStringifyChildren(rawChildren);
  const wrap = Boolean(props?.metastring?.split(" ").find((e) => e === "wrap"));
  const file = props?.metastring?.includes("file")
    ? props?.metastring
        ?.split(" ")
        .find((e: string) => e.includes("file"))
        .replace("file=", "")
    : false;
  const CodeBlockComp = typeof children === "string" ? CodeBlockString : CodeBlockJSX;
  return (
    <>
      {file && (
        <div className={styles.file}>
          <span>
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.625 1.99609H2.25C1.91848 1.99609 1.60054 2.12252 1.36612 2.34757C1.1317 2.57261 1 2.87783 1 3.19609V12.7961C1 13.1144 1.1317 13.4196 1.36612 13.6446C1.60054 13.8697 1.91848 13.9961 2.25 13.9961H9.75C10.0815 13.9961 10.3995 13.8697 10.6339 13.6446C10.8683 13.4196 11 13.1144 11 12.7961V6.19609L6.625 1.99609Z"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M5 1.99609V7.99609H11"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            {file}
          </span>
        </div>
      )}
      {/* @ts-ignore */}
      <CodeBlockComp key={String(isBrowser)} {...props} wrap={wrap}>
        {children}
      </CodeBlockComp>
    </>
  );
}
