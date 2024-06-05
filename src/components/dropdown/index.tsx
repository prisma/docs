import useComponentVisible from "@site/src/utils/useComponentVisible";
import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type SimpleDropType = {
  items: Array<any>;
  anchor: any;
  dark?: boolean;
  rightClick?: boolean;
  pos?: "top" | "bottom";
};
const SimpleDropdown = ({
  anchor,
  items,
  dark = false,
  rightClick = false,
  pos = "bottom",
}: SimpleDropType) => {
  const [isOpen, openDrop] = useState<boolean>(false);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) openDrop(false);
  }, [isComponentVisible]);

  const escEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") openDrop(false)
  }

  useEffect(() => {
    window.addEventListener("keydown", escEvent)
    return () => window.removeEventListener("keydown", escEvent)
  }, [])

  return (
    <div
      className={clsx(styles.root, dark ? styles.darkDrop : styles.lightDrop)}
      ref={ref}
      onClick={() => {
        if (!rightClick) {
          setIsComponentVisible(true);
          openDrop(!isOpen);
        }
      }}
      onContextMenu={(e) => {
        if (rightClick && window.innerWidth > 940) {
          e.preventDefault();
          setIsComponentVisible(true);
          openDrop(true);
        }
      }}
    >
      <div className={clsx(rightClick && styles.anchor)}>{anchor}</div>
        <div
          className={clsx(!rightClick && styles.overlayWrapper, !rightClick && isOpen && styles.showOverlay)}
          onClick={(e: any) => {
            e.stopPropagation();
            openDrop(false);
          }}
        >
          <div
            className={clsx(pos === "top" && styles.topPos, styles.container)}
          >
            {items.map((item: any, idx: number) => (
              <div key={idx} className={styles.item}>
                {item}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default SimpleDropdown;