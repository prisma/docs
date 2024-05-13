import React, { useRef, useState } from "react";
import { Icon } from "../Icon";
import { Tooltip } from "../tooltip/Tooltip";
import styles from "../../css/gettingStarted.module.scss";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const Database = ({ color, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height ? height : "16"}
    width={width ? width : "14"}
    viewBox="0 0 448 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"
    />
  </svg>
);

export const Bolt = ({ color, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height ? height : "16"}
    width={width ? width : "14"}
    viewBox="0 0 448 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
    />
  </svg>
);

export const SignalStream = ({ color, height, width }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height ? height : "16"}
    width={width ? width : "18"}
    viewBox="0 0 576 512"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M108.2 71c13.8 11.1 16 31.2 5 45C82.4 154.4 64 203 64 256s18.4 101.6 49.1 140c11.1 13.8 8.8 33.9-5 45s-33.9 8.8-45-5C23.7 386.7 0 324.1 0 256S23.7 125.3 63.2 76c11.1-13.8 31.2-16 45-5zm359.7 0c13.8-11.1 33.9-8.8 45 5C552.3 125.3 576 187.9 576 256s-23.7 130.7-63.2 180c-11.1 13.8-31.2 16-45 5s-16-31.2-5-45c30.7-38.4 49.1-87 49.1-140s-18.4-101.6-49.1-140c-11.1-13.8-8.8-33.9 5-45zM232 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm-27.5-74.7c-17.8 19.8-28.5 46-28.5 74.7s10.8 54.8 28.5 74.7c11.8 13.2 10.7 33.4-2.5 45.2s-33.4 10.7-45.2-2.5C129 342.2 112 301.1 112 256s17-86.2 44.8-117.3c11.8-13.2 32-14.3 45.2-2.5s14.3 32 2.5 45.2zm214.7-42.7C447 169.8 464 210.9 464 256s-17 86.2-44.8 117.3c-11.8 13.2-32 14.3-45.2 2.5s-14.3-32-2.5-45.2c17.8-19.8 28.5-46 28.5-74.7s-10.8-54.8-28.5-74.7c-11.8-13.2-10.7-33.4 2.5-45.2s33.4-10.7 45.2 2.5z"
    />
  </svg>
);

export const BorderBoxWrapper = ({ children, ...props }) => (
  <div {...props} className={styles.borderBox}>
    {children}
  </div>
);

export const BoxTitle = ({ children, ...props }) => (
  <h1 {...props} className={styles.boxTitle}>
    {children}
  </h1>
);

export const BorderBox = ({ border, ...props }: any) => (
  <BorderBoxWrapper {...props}>{props.children}</BorderBoxWrapper>
);

export const Grid = ({ children, ...props }) => (
  <div {...props} className={styles.grid}>
    {children}
  </div>
);

export const LinkCard = ({ icon, title, desc, link }: any) => {
  const linkCardRef = useRef(null);
  return (
    <Link to={link} ref={linkCardRef} className={styles.linkCardWrapper}>
      <div className={styles.title}>
        <Icon icon={icon} btn="left" size="18px" />
        <h6>{title}</h6>
      </div>
      <p>{desc}</p>
    </Link>
  );
};

export const Tab = ({ children, ...props }) => (
  <div {...props} className={styles.tab}>
    {children}
  </div>
);

export const SquareLogo = ({ image, tech, url }: any) => {
  const squareCardRef = useRef(null);
  const imgUrl = useBaseUrl(image);
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false);
  return (
    <>
      <Link
        className={styles.squareWrapper}
        to={url}
        ref={squareCardRef}
        onMouseMove={() => setVisibleTooltip(true)}
        onMouseLeave={() => setVisibleTooltip(false)}
      >
        <img src={imgUrl} />
      </Link>
      {visibleTooltip && (
        <Tooltip target={squareCardRef} position="top">
          {tech}
        </Tooltip>
      )}
    </>
  );
};

export const List = ({ children, ...props }) => (
  <div {...props} className={styles.list}>
    {children}
  </div>
);
