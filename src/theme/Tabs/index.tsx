import { sanitizeTabsChildren, useScrollPositionBlocker, useTabs } from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";
import React, { cloneElement, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Icon } from "@site/src/components/Icon";

function TabList({ className, block, selectedValue, selectValue, tabValues }) {
  const tabRefs = [];
  const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker();
  const [open, setOpen] = useState<boolean>(false);
  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex].value;
    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
    setOpen(false);
  };
  useEffect(() => {
  }, [open])
  const handleKeydown = (event) => {
    let focusElement = null;
    switch (event.key) {
      case "Enter": {
        handleTabChange(event);
        break;
      }
      case "ArrowRight": {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0];
        break;
      }
      case "ArrowLeft": {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1];
        break;
      }
      default:
        break;
    }
    focusElement?.focus();
  };
  const handleOpen = (event) => {
    const list = event.currentTarget;
    setOpen(!open);
    blockElementScrollPositionUntilNextRender(list);
  }
  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        "tabs",
        {
          "tabs--block": block,
        },
        className
      )}
    >
      <span className={styles.display} onClick={(e) => handleOpen(e)}>
        <span>{selectedValue}</span>
        <Icon icon={`fa-regular fa-chevron-${open ? "down" : "up"}`} size="inherit" />
      </span>
      <div className={clsx(styles.ulContent, open && styles.open)}>
        {tabValues.map(({ value, label, attributes }) => (
          <li
            // TODO extract TabListItem
            role="tab"
            tabIndex={selectedValue === value ? 0 : -1}
            aria-selected={selectedValue === value}
            key={value}
            ref={(tabControl) => tabRefs.push(tabControl)}
            onKeyDown={handleKeydown}
            onClick={handleTabChange}
            {...attributes}
            className={clsx("tabs__item", styles.tabItem, attributes?.className, {
              [`tabs__item--active ${styles.activeTab}`]: selectedValue === value,
            })}
          >
            {label ?? value}
          </li>
        ))}
      </div>
    </ul>
  );
}
function TabContent({
  lazy,
  children,
  selectedValue,
  transparent,
  code,
  terminal,
  customStyles,
}) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(Boolean);
  if (lazy) {
    const selectedTabItem = childTabs.find((tabItem) => tabItem.props.value === selectedValue);
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem, { className: "margin-top--md" });
  }

  return (
    <div
      className={clsx(
        transparent && styles.transparent,
        code && styles.code,
        styles[`full-width`]
      )}
      style={customStyles ? customStyles : {}}
    >
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
          code: code,
          terminal: terminal,
        })
      )}
    </div>
  );
}

function TabsComponent(props) {
  const tabs = useTabs(props);
  return (
    <div className={clsx("tabs-container", styles.tabList)}>
      <TabList {...props} {...tabs} />
      <TabContent {...props} {...tabs} />
    </div>
  );
}

export default function Tabs(props) {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    >
      {sanitizeTabsChildren(props.children)}
    </TabsComponent>
  );
}
