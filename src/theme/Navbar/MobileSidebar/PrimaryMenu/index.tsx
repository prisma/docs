import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const items = useNavbarItems();
  const flattenedDropdown = items.find((item: any) => item.type === "dropdown");
  const examples = items.find((item: any) => item.label === "Examples");

  const finalMobileItems = [items[0], ...flattenedDropdown!.items, examples]
  return (
    <ul className="menu__list">
      {finalMobileItems.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
