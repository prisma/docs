'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { TreeContextProvider } from '@fumadocs/base-ui/contexts/tree';
import type * as PageTree from 'fumadocs-core/page-tree';
import { filterOrmTreeByPath } from '@/lib/filter-orm-tree';

interface OrmTreeProviderProps {
  tree: PageTree.Root;
  children: React.ReactNode;
}

/**
 * Wraps children with TreeContextProvider, filtering the ORM section of the tree
 * based on the current path. When on /orm (v7), v6 is hidden from the sidebar.
 * When on /orm/v6, only the v6 tree is shown in the ORM section.
 */
export function OrmTreeProvider({ tree, children }: OrmTreeProviderProps) {
  const pathname = usePathname();
  const filteredTree = useMemo(
    () => filterOrmTreeByPath(tree, pathname ?? ''),
    [tree, pathname]
  );
  return (
    <TreeContextProvider tree={filteredTree}>{children}</TreeContextProvider>
  );
}
