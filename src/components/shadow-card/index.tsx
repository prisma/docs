import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const ShadowCard = ({ starter, className, ...rest }: any) => (
  <div className={clsx(className, styles.cardLibWrapper)} {...rest}>
    {rest.children}
  </div>
);

export default ShadowCard;
