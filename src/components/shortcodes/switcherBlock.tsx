import * as React from "react";
import TechnologySwitch from "./techSwitcher";
import styles from "./styles.module.scss";

const SwitcherBlock = ({ langSwitcher, dbSwitcher, location, slug }: any) => {
  const currentPath = location?.pathname.replace(/\/$/, "");
  let [pathTechParams] = currentPath?.split("/")?.splice(-1);

  const isTechPath = true;
  const getTechFromParam = (type: string, defaultVal: string) => {
    let tech = defaultVal;

    if (isTechPath) {
      if (type === "lang") {
        [tech] = pathTechParams.split("-").splice(dbSwitcher ? -2 : -1);
      }

      if (type === "db") {
        [tech] = pathTechParams.split("-").splice(-1);
      }
    }
    return tech;
  };

  const [langSelected, setLangSelected] = React.useState(
    langSwitcher ? getTechFromParam("lang", langSwitcher[0]) : "typescript"
  );
  const [dbSelected, setDbSelected] = React.useState(
    dbSwitcher ? getTechFromParam("db", dbSwitcher[0]) : "postgresql"
  );

  // TODO : Simplify the function!
  const techChanged: any = (item: any, type: string) => {
    // <Redirect to={`/${slug}${langSelected}-${dbSelected}`} />
    // window.location.href = `/${slug}${langSelected}-${dbSelected}`
  };

  const langChanged = (item: any) => {
    techChanged(item, "lang");
    setLangSelected(item.technology);
  };

  const dbChanged = (item: any) => {
    techChanged(item, "db");
    setDbSelected(item.technology);
  };

  React.useEffect(() => {
    let mounted = true;

    if (langSwitcher && !dbSwitcher && mounted) {
      langChanged({ technology: langSelected });
    } else if (dbSwitcher && !langSwitcher && mounted) {
      dbChanged({ technology: dbSelected });
    } else if (dbSwitcher && langSwitcher && mounted) {
      langChanged({ technology: langSelected });
      dbChanged({ technology: dbSelected });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [langSelected, dbSelected]);
  return (
    <div className={styles.switcherWrapper}>
      {langSwitcher && (
        <TechnologySwitch
          type="lang"
          url={slug}
          dbSelected={dbSelected}
          onChangeTech={langChanged}
          technologies={langSwitcher}
          defaultTech={langSelected}
        />
      )}
      {langSelected === "node" && dbSwitcher && (
        <TechnologySwitch
          type="db"
          url={`${slug}node-`}
          onChangeTech={dbChanged}
          technologies={dbSwitcher}
          defaultTech={dbSelected}
        />
      )}
      {langSelected === "typescript" && langSwitcher && dbSwitcher && (
        <TechnologySwitch
          type="db"
          url={`${slug}typescript-`}
          onChangeTech={dbChanged}
          technologies={dbSwitcher}
          defaultTech={dbSelected}
        />
      )}
      {!langSwitcher && dbSwitcher && (
        <TechnologySwitch
          type="db"
          url={slug}
          onChangeTech={dbChanged}
          technologies={dbSwitcher}
          defaultTech={dbSelected}
        />
      )}
    </div>
  );
};

export default SwitcherBlock;
