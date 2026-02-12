import type * as PageTree from 'fumadocs-core/page-tree';

type FolderWithUrl = PageTree.Folder & { url?: string };

function getFolderUrl(folder: PageTree.Folder): string | undefined {
  const withUrl = folder as FolderWithUrl;
  return withUrl.url ?? folder.index?.url;
}

function isOrmFolder(child: PageTree.Node): child is PageTree.Folder {
  if (child.type !== 'folder') return false;
  const f = child as PageTree.Folder;
  const url = getFolderUrl(f);
  const name = (f as { name?: string }).name ?? '';
  return url === '/orm' || name === 'ORM';
}

function isV6Folder(child: PageTree.Node): child is PageTree.Folder {
  if (child.type !== 'folder') return false;
  const url = getFolderUrl(child as PageTree.Folder);
  if (!url) return false;
  return (
    url.startsWith('/orm/v6') ||
    url === '/v6/orm' ||
    url.startsWith('/v6/orm/')
  );
}

function isV6Separator(child: PageTree.Node): boolean {
  if (child.type !== 'separator') return false;
  const name = (child as { name?: string }).name ?? '';
  return name === 'v6' || name === '---v6---';
}

/** Recursively find the orm folder and its index in the tree */
function findOrmFolderAndIndex(
  children: PageTree.Node[],
  path: number[] = []
): { folder: PageTree.Folder; indexPath: number[] } | null {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 'folder') {
      const folder = child as PageTree.Folder;
      if (isOrmFolder(child)) {
        return { folder, indexPath: [...path, i] };
      }
      const found = findOrmFolderAndIndex(
        folder.children ?? [],
        [...path, i]
      );
      if (found) return found;
    }
  }
  return null;
}

function replaceChildAtPath(
  node: PageTree.Root | PageTree.Folder,
  indexPath: number[],
  replace: (folder: PageTree.Folder) => PageTree.Folder
): PageTree.Root | PageTree.Folder {
  if (indexPath.length === 0) return node;
  const [i, ...rest] = indexPath;
  const children = [...(node.children ?? [])];
  const child = children[i];
  if (rest.length === 0 && child.type === 'folder') {
    children[i] = replace(child as PageTree.Folder);
    return { ...node, children };
  }
  if (child.type === 'folder') {
    children[i] = replaceChildAtPath(
      child as PageTree.Folder,
      rest,
      replace
    ) as PageTree.Node;
  }
  return { ...node, children };
}

/**
 * Filters the docs page tree for the ORM section based on the current path.
 * - On /orm and /orm/* (excluding /orm/v6): hide v6 from sidebar
 * - On /orm/v6 and /orm/v6/*: show only v6 tree in the ORM section
 */
export function filterOrmTreeByPath(
  tree: PageTree.Root,
  pathname: string
): PageTree.Root {
  const isV6Orm = pathname.startsWith('/orm/v6');
  const isOrmSection = pathname.startsWith('/orm');

  if (!isOrmSection) return tree;

  const found = findOrmFolderAndIndex(tree.children);
  if (!found) return tree;

  const { folder: ormFolder, indexPath } = found;
  const ormChildren = ormFolder.children ?? [];

  if (isV6Orm) {
    const v6Folder = ormChildren.find(isV6Folder) as PageTree.Folder | undefined;
    if (!v6Folder?.children) return tree;
    return replaceChildAtPath(tree, indexPath, (f) => ({
      ...f,
      children: v6Folder.children,
      index: v6Folder.index ?? f.index,
    })) as PageTree.Root;
  }

  const filteredOrmChildren = ormChildren.filter(
    (c) => !isV6Separator(c) && !isV6Folder(c)
  );

  return replaceChildAtPath(tree, indexPath, (f) => ({
    ...f,
    children: filteredOrmChildren,
  })) as PageTree.Root;
}
