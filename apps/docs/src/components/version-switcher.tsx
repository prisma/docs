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
} from '@prisma-docs/eclipse';

interface VersionSwitcherProps {
  currentVersion: Version;
}

export function VersionSwitcher({ currentVersion }: VersionSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleVersionChange = (newVersion: string) => {
    if (newVersion === currentVersion) return;

    const isV6Orm = pathname.startsWith('/orm/v6');
    const ormSubPath = pathname.startsWith('/orm') ? pathname.slice(4) : ''; // /orm/... -> /... or /orm/v6/... -> /v6/...

    let newPath: string;
    if (newVersion === LATEST_VERSION) {
      if (isV6Orm) {
        const withoutV6 = ormSubPath.replace(/^\/v6/, '') || '';
        newPath = withoutV6 ? `/orm${withoutV6}` : '/orm';
      } else {
        newPath = pathname;
      }
    } else {
      if (pathname.startsWith('/orm') && !isV6Orm) {
        const subPath = ormSubPath || '';
        newPath = `/orm/v6${subPath}`;
      } else if (!pathname.startsWith('/orm')) {
        newPath = '/orm/v6';
      } else {
        newPath = pathname;
      }
    }

    router.push(newPath || '/orm');
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
              className="cursor-pointer transition-colors hover:bg-fd-accent"
            >
              {v}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
