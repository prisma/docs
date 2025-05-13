import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import NavbarNavLink from './NavbarNavLink';
import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from '@theme/NavbarItem/DefaultNavbarItem';

type CustomNavbarItem = DesktopOrMobileNavBarItemProps & {
  sub?: string,
  icon?: string
}

function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: CustomNavbarItem) {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? 'dropdown__link ehlo' : 'navbar__item navbar__link',
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );
  if (isDropdownItem) {
    return <li>
      {element}
    </li>;
  }

  return element;
}

function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  ...props
}: CustomNavbarItem) {
  return (
    <li className="menu__list-item">
      <NavbarNavLink className={clsx('menu__link', className)} {...props} />
    </li>
  );
}

export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}: Props): ReactNode {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
}
