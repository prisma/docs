import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React, { useRef, useState } from "react";

import styles from "../../css/gettingStarted.module.scss";
import { Icon } from "../Icon";
import { Tooltip } from "../tooltip/Tooltip";

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

export const Inspect = ({ color, width, height }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height ? height : "16"}
    width={width ? width : "14"}
    viewBox="0 0 65 57"
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M50.2455 22.8125C50.2455 28.0234 48.5463 32.8945 45.7142 36.7461L59.9877 51.1328C61.4603 52.4922 61.4603 54.8711 59.9877 56.2305C58.6283 57.7031 56.2494 57.7031 54.89 56.2305L40.5033 41.8438C36.6517 44.7891 31.7806 46.375 26.683 46.375C13.6556 46.375 3.12048 35.8398 3.12048 22.8125C3.12048 9.89844 13.6556 -0.75 26.683 -0.75C39.597 -0.75 50.2455 9.89844 50.2455 22.8125ZM14.9017 23.7188V30.9688C14.9017 32.5547 16.0345 33.6875 17.6205 33.6875C19.0931 33.6875 20.3392 32.5547 20.3392 30.9688V23.7188C20.3392 22.2461 19.0931 21 17.6205 21C16.0345 21 14.9017 22.2461 14.9017 23.7188ZM23.9642 12.8438V30.9688C23.9642 32.5547 25.097 33.6875 26.683 33.6875C28.1556 33.6875 29.4017 32.5547 29.4017 30.9688V12.8438C29.4017 11.3711 28.1556 10.125 26.683 10.125C25.097 10.125 23.9642 11.3711 23.9642 12.8438ZM33.0267 20.0938V30.9688C33.0267 32.5547 34.1595 33.6875 35.7455 33.6875C37.2181 33.6875 38.4642 32.5547 38.4642 30.9688V20.0938C38.4642 18.6211 37.2181 17.375 35.7455 17.375C34.1595 17.375 33.0267 18.6211 33.0267 20.0938Z"
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

export const Plus = ({ color, height, width }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    height={height ?? "16"}
    width={width ?? "18"}
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
    />
  </svg>
);

export const Plug = ({ color, height, width }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    height={height ?? "16"}
    width={width ?? "18"}
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M96 0C113.7 0 128 14.3 128 32l0 96-64 0 0-96c0-17.7 14.3-32 32-32zM288 0c17.7 0 32 14.3 32 32l0 96-64 0 0-96c0-17.7 14.3-32 32-32zM32 160l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 32c0 77.4-55 142-128 156.8l0 67.2c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-67.2C87 398 32 333.4 32 256l0-32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
    />
  </svg>
);

export const PrismaPostgres = ({ color, height, width }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={height ?? "16"}
    width={width ?? "18"}
    style={{ marginRight: `4px`, transform: `translateY(2px)` }}
  >
    <path
      fill={color ? color : "currentColor"}
      d="M290.6 59.7c-15.4-26.5-53.7-26.5-69.1 0L163 160 349 160 290.6 59.7zM69.6 320l372.8 0L367.7 192l-223.4 0L69.6 320zM51 352L11.4 419.8C-4.2 446.5 15.1 480 45.9 480l420.1 0c30.9 0 50.1-33.5 34.6-60.2L461 352 51 352z"
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

export const Separator = () => <div className={styles.separator} />;

export const BorderBox = ({ border, ...props }: any) => (
  <BorderBoxWrapper {...props}>{props.children}</BorderBoxWrapper>
);

export const Grid = ({ children, ...props }) => (
  <div {...props} className={styles.grid}>
    {children}
  </div>
);

export const LinkCard = ({ icon, title, desc, link, highlight }: any) => {
  const linkCardRef = useRef(null);
  return (
    <Link
      to={link}
      ref={linkCardRef}
      className={clsx(styles.linkCardWrapper, highlight && styles.linkCardHighlight)}
    >
      <div className={styles.title}>
        <Icon icon={icon} btn="left" size="18px" />
        <h6>{title}</h6>
      </div>
      <p>{desc}</p>
    </Link>
  );
};

export const QuickstartLinkCard = ({ icon, title, desc, link, highlight, children }: any) => {
  const linkCardRef = useRef(null);
  return (
    <Link
      to={link}
      ref={linkCardRef}
      className={clsx(
        styles.linkCardWrapper,
        highlight && styles.linkCardHighlight,
        styles.quickstartCard
      )}
    >
      <div className={styles.title}>
        {icon && <Icon icon={icon} btn="left" size="18px" />}
        <h2>{title}</h2>
        <Icon icon="fa-regular fa-arrow-right" size="18px" />
      </div>
      {children ?? <p>{desc}</p>}
    </Link>
  );
};

export const Tab = ({ children, ...props }) => (
  <div {...props} className={styles.tab}>
    {children}
  </div>
);

export const SquareLogo = ({ className, image, tech, url, imageDark }: any) => {
  const squareCardRef = useRef(null);
  const imgUrl = useBaseUrl(image);
  const imgDarkUrl = useBaseUrl(imageDark);
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false);
  return (
    <>
      <Link
        className={clsx(className, styles.squareWrapper)}
        to={url}
        ref={squareCardRef}
        onMouseMove={() => setVisibleTooltip(true)}
        onMouseLeave={() => setVisibleTooltip(false)}
      >
        <img src={imgUrl} className={clsx(imageDark && styles.lightImg)} />
        {imageDark && <img src={imgDarkUrl} className={styles.darkImg} />}
      </Link>
      {visibleTooltip && (
        <Tooltip target={squareCardRef} position="top">
          {tech}
        </Tooltip>
      )}
    </>
  );
};

export const List = ({ children, framed, split, ...props }) => (
  <div
    {...props}
    className={clsx(styles.list, framed && styles.framedList, split && styles.splitList)}
  >
    {children}
  </div>
);
