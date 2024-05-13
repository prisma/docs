import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';
export default function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/');
  const isDocs = homeHref === '/docs/' || homeHref === '/docs';

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        autoAddBaseUrl={isDocs ? false : undefined}
        className="breadcrumbs__link"
        href={isDocs ? '/docs' : homeHref}
      >
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
