import { JSX } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import styles from "./index.module.scss"
import { Icon } from "@site/src/components/Icon";
import Heading from "@theme/Heading";
import clsx from "clsx";
import Button from "../button/Button";

export function HomepageCard({
  className,
  heading,
  body,
  link,
  indigo,
  links,
  light,
  href,
  ...rest
}: {
  className?: string;
  heading: JSX.Element;
  body: string;
  links?: JSX.Element;
  link?: string;
  light?: boolean;
  indigo?: boolean;
  href?: {
    text: string,
    url: string,
  }
}): JSX.Element {
  const location = useLocation();
  const f_class = clsx(className, styles.productCardTeal, light && styles.light);
  return (
    link
      ? <Link {...rest} className={f_class} to={`${link}${location.search}`}>
        {heading}
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </Link>
      : <div {...rest} className={f_class}>
        {heading}
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        {href && href.url && <Button link={href.url} variant="link" label={href.text} color="teal"/>}
        {links && <div className={styles.linkGrid}>{links}</div>}
      </div>
  );
}

interface CardHeadingProps {
    eyebrow?: string;
    icon: string;
    title: string;
    light?: boolean;
}

export const Grid = () => <div className={styles.grid} />

export const CardHeading = ({ eyebrow, icon, title, light }: CardHeadingProps) => {
    return (
      <div className={clsx(styles.cardHeader, light && styles.light)}>
        <div className={clsx(styles.iconWrapper, light && styles.light)}>
            <Icon icon={icon} color={light ? "var(--surface-brand-default)" : "#fff"} size="32px" />
        </div>
        <div className={styles.cardHeaderContent}>
            {eyebrow && <h5 className={styles.eyebrow}>{eyebrow}</h5>}
            <Heading as="h4" className={styles.h4}>
              <div
                className={styles.h4}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Heading>
        </div>
      </div>
    )
}

