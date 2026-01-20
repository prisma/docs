'use client';

import { usePathname, useRouter } from 'next/navigation';
import { VERSIONS, LATEST_VERSION, type Version } from '@/lib/version';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@prisma-docs/ui/components/dropdown-menu';

interface VersionSwitcherProps {
  currentVersion: Version;
}

export function VersionSwitcher({ currentVersion }: VersionSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleVersionChange = (newVersion: string) => {
    if (newVersion === currentVersion) return;
    // New routing:
    // - Latest version has no prefix (e.g. "/foo/bar")
    // - v6 uses an explicit "/v6" prefix (e.g. "/v6/foo/bar")
    // - If the site is mounted under "/docs", preserve that base
    const basePrefix = '';
    const rest = pathname.slice(basePrefix.length) || '/';
    const stripVersionPrefix = (p: string) =>
      p.replace(/^\/v\d+(?=\/|$)/, '') || '/';

    let newPath: string;
    if (newVersion === LATEST_VERSION) {
      // Go to unversioned path
      newPath = `${basePrefix}${stripVersionPrefix(rest)}`;
    } else {
      // Go to explicit versioned path (e.g. /v6)
      if (currentVersion === LATEST_VERSION) {
        newPath = `${basePrefix}/${newVersion}${rest}`;
      } else {
        // Swap version prefix if present, otherwise prepend
        newPath = `${basePrefix}${
          /^\/v\d+(?=\/|$)/.test(rest)
            ? rest.replace(/^\/v\d+(?=\/|$)/, `/${newVersion}`)
            : `/${newVersion}${rest}`
        }`;
      }
    }
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border bg-fd-background px-3 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors cursor-pointer">
        {currentVersion}
        <ChevronDownIcon className="size-4 text-fd-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          value={currentVersion}
          onValueChange={handleVersionChange}
        >
          {VERSIONS.map((v) => (
            <DropdownMenuRadioItem
              key={v}
              value={v}
              className="px-2 cursor-pointer transition-colors hover:bg-fd-accent"
            >
              {v}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
