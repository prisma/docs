import clsx from "clsx";
import React from "react";

import styles from "./darkimg.module.scss";

export default function DarkImg(props) {
  return (
    <>
      <img {...props} src={props.icon} className={clsx(props.className, styles.lightImg)} />
      {props.darkicon && <img {...props} src={props.darkicon} className={clsx(props.className, styles.darkImg)} />}
    </>
  );
}
