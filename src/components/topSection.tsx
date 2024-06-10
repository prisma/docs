import * as React from "react";
import styles from "../css/topSection.module.scss";

import SwitcherBlock from "./shortcodes/switcherBlock";

const TopSection = ({ location, slug, langSwitcher, dbSwitcher }: any) => {
  return (
    <div className={styles.topSectionWrapper}>
      <div className={styles.header}>
        <div className={styles["tech-switch-block"]}>
          {(langSwitcher || dbSwitcher) && (
            <SwitcherBlock
              langSwitcher={langSwitcher}
              dbSwitcher={dbSwitcher}
              location={location}
              slug={slug}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
