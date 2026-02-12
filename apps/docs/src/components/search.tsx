'use client';
import { Spinner } from '@prisma-docs/eclipse';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { SearchIcon, X } from 'lucide-react';
import { ComponentProps } from 'react';

export function CustomSearchDialogIcon(
  props: ComponentProps<'svg'> & { isLoading: boolean },
) {
  return (
    <>
      {props.isLoading ? (
        <Spinner className="size-5 text-fd-muted-foreground" />
      ) : (
        <SearchIcon className="size-5 text-fd-muted-foreground" />
      )}
    </>
  );
}

export default function CustomSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    api: '/api/search',
    delayMs: 500,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay suppressHydrationWarning />
      <SearchDialogContent>
        <SearchDialogHeader>
          <CustomSearchDialogIcon isLoading={query.isLoading} />
          <SearchDialogInput />
          <SearchDialogClose aria-label="Close search">
            <X className="size-4" aria-hidden="true" />
          </SearchDialogClose>
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
