import React from "react";
import styles from "./darkimg.module.scss";
import clsx from "clsx";

export default function DarkImg(props) {
  return (
    <>
      <img {...props} src={props.icon} className={clsx(props.className, styles.lightImg)} />
      <img {...props} src={props.darkIcon} className={clsx(props.className, styles.darkImg)} />
    </>
  );
}
