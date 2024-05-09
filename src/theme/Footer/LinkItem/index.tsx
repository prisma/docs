import React from 'react';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/Footer/LinkItem';

export default function FooterLinkItem({item}: Props): JSX.Element {
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  
  const isRoot = to === '/docs' || to === '/docs/'

  return (
    <Link
      autoAddBaseUrl={isRoot ? false : undefined}
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
          to: isRoot ? '/docs' : toUrl,
          })}
      {...props}>
      {label}
      {href && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
