import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { Icon } from '@site/src/components/Icon';
import styles from "../Layout/styles.module.scss"

export default function FooterLinkItem({item}) {
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  return (
    <Link
      className={`${styles[`footer__link-item`]} footer__link-item${item.customProps?.icon ? ` ${item.customProps?.icon}` : ``}`}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
      {!item.customProps?.internal && href && !isInternalUrl(href) && <Icon icon='fa-solid fa-arrow-up-right' size='1rem'/>}
    </Link>
  );
}
