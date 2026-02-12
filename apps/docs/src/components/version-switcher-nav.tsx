'use client';

import { usePathname } from 'next/navigation';
import { VersionSwitcher } from '@/components/version-switcher';
import { LATEST_VERSION, type Version } from '@/lib/version';

/**
 * Renders the version switcher only on ORM pages (/orm, /orm/v6).
 */
export function VersionSwitcherNavItem() {
  const pathname = usePathname();
  const isOrmPage =
    pathname === '/orm' ||
    pathname.startsWith('/orm/');
  if (!isOrmPage) return null;
  const currentVersion: Version = pathname.startsWith('/orm/v6') ? 'v6' : LATEST_VERSION;
  return <VersionSwitcher currentVersion={currentVersion} />;
}
