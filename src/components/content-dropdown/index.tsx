import useComponentVisible from "@site/src/utils/useComponentVisible";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Icon } from "../Icon";
import styles from "./styles.module.scss";

type DropdownType = {
  items: Array<React.ReactNode>;
  anchorText: string;
  dark?: boolean;
  rightClick?: boolean;
  pos?: "top" | "bottom";
};
const Dropdown = ({
  anchorText,
  items,
  rightClick = false,
  pos = "bottom",
}: DropdownType) => {
  const [isOpen, openDrop] = useState<boolean>(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) openDrop(false);
  }, [isComponentVisible]);

  const escEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") openDrop(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", escEvent);
    return () => window.removeEventListener("keydown", escEvent);
  }, []);

  return (
    <div
      className={clsx(styles.root)}
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
      <div className={clsx(styles.anchor, isOpen && styles.active)}>
        <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="left"/>
        {anchorText}
        <Icon icon="fa-regular fa-chevron-down" size="inherit" btn="right"/>
      </div>
      <div
        className={clsx(
          styles.overlayWrapper,
          isOpen && styles.showOverlay
        )}
        onClick={(e: any) => {
          e.stopPropagation();
          openDrop(false);
        }}
      >
        <div className={clsx(pos === "top" && styles.topPos, styles.container)}>
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

export default Dropdown;
