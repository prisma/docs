import * as React from "react";
import styles from "../css/collapsible.module.scss";

type CollapseProps = React.ReactNode;
let index = 0;

const getRemainingChildren = (children: any) =>
  children.filter((child: any) => !(child.props && child.props.originalType === "summary"));

//@ts-ignore
const CollapseBox = ({ children, ...props }: CollapseProps) => {
  const titleChild =
    children &&
    children.find((child: any) => child.props && child.props.originalType === "summary");
  const title = titleChild && titleChild.props.children;
  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.tab}>
        <input className={styles.input} id={`tab-${++index}`} type="checkbox" name="tab" />
        <label className={styles.label} htmlFor={`tab-${index}`}>
          {title}
        </label>
        <div className={styles.tabContent}>{getRemainingChildren(children)}</div>
      </div>
    </div>
  );
};

export default CollapseBox;
