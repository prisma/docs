import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {isRegexpStringMatch} from '@docusaurus/theme-common';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/NavbarItem/NavbarNavLink';
import { Icon } from '@site/src/components/Icon';
import { useUTMParams } from '@site/src/hooks/useUTMParams';


type CustomProps = Props & {
  sub?: string,
  icon?: string
}

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: CustomProps): ReactNode {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isExternalLink = label && href && !isInternalUrl(href);

  // Get UTM parameters from sessionStorage using custom hook
  const utmParams = useUTMParams();

  // Helper function to append UTM params to URL
  const appendUtmParams = (url: string): string => {
    if (!utmParams) {
      return url;
    }
    
    const [baseUrl, existingQuery] = url.split('?');
    if (existingQuery) {
      const result = `${baseUrl}?${existingQuery}&${utmParams}`;
      return result;
    } else {
      const result = `${baseUrl}?${utmParams}`;
      return result;
    }
  };

  // Link content is set through html XOR label
  const linkContentProps = html
    ? {dangerouslySetInnerHTML: {__html: html}}
    : {
        children: (
          <>
            {props.icon && <div className="dropdown__icon">
              <Icon icon={props.icon} size="24px" color="var(--surface-brand-default)" />
            </div>}
            <span className="dropdown__table">
              {label}
              {props.sub && <span>{props.sub}</span>}
            </span>
            {isExternalLink && (
              <IconExternalLink
                {...(isDropdownLink && {width: 12, height: 12})}
              />
            )}
          </>
        ),
      };

  if (href) {
    // For external links, return as-is
    if (isExternalLink) {
      return (
        <Link
          href={prependBaseUrlToHref ? normalizedHref : href}
          {...props}
          {...linkContentProps}
        />
      );
    }

    // For internal links, append UTM parameters if available
    const finalHref = prependBaseUrlToHref ? normalizedHref : href;
    const urlWithUtms = appendUtmParams(finalHref);
    
    return (
      <Link
        href={urlWithUtms}
        {...props}
        {...linkContentProps}
      />
    );
  }

  const urlWithUtms = appendUtmParams(toUrl);
  
  return (
    <Link
      to={urlWithUtms}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}
