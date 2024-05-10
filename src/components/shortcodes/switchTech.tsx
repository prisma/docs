import * as React from "react";
import styles from "./styles.module.scss";

interface CodeProps {
  technologies?: string[];
}

type CodeBlockProps = CodeProps & React.ReactNode & { children?: any };
let c = 0;
const SwitchTech = ({ technologies, children }: CodeBlockProps) => {
  c++;
  return (
    <section className={styles.switchWrapper} id={`techswitch-${technologies.join("-")}-no-${c}`}>
      {children}
    </section>
  );
};

export default SwitchTech;
