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
import { SearchIcon, SearchX, X } from 'lucide-react';
import { type ComponentProps, useCallback, useEffect, useRef } from 'react';
import posthog from 'posthog-js';

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

  const lastCapturedQueryRef = useRef<string | null>(null);
  const stabilityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickedResultRef = useRef(false);
  const lastNoResultQueryRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      search.length > 0 &&
      !query.isLoading &&
      query.data !== undefined &&
      query.data !== 'empty'
    ) {
      if (stabilityTimerRef.current) clearTimeout(stabilityTimerRef.current);
      stabilityTimerRef.current = setTimeout(() => {
        stabilityTimerRef.current = null;
        if (lastCapturedQueryRef.current !== search) {
          lastCapturedQueryRef.current = search;
          posthog.capture('docs:search', {
            query: search,
          });
        }
      }, 1500);
    }
    return () => {
      if (stabilityTimerRef.current) clearTimeout(stabilityTimerRef.current);
    };
  }, [query.data, query.isLoading, search]);

  const resultsArray = query.data !== 'empty' && query.data !== undefined ? query.data : null;
  const hasResults = Array.isArray(resultsArray) && resultsArray.length > 0;
  const showNoResults = !query.isLoading && search.length > 0 && !hasResults;

  useEffect(() => {
    if (showNoResults && lastNoResultQueryRef.current !== search) {
      lastNoResultQueryRef.current = search;
      posthog.capture('docs:search_no_results', { query: search });
    }
  }, [showNoResults, search]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && search.length > 0 && !clickedResultRef.current) {
        const resultCount = Array.isArray(resultsArray) ? resultsArray.length : 0;
        posthog.capture('docs:search_no_click', {
          query: search,
          result_count: resultCount,
        });
      }
      if (!open) {
        clickedResultRef.current = false;
        lastNoResultQueryRef.current = null;
      }
      props.onOpenChange?.(open);
    },
    [search, resultsArray, props],
  );

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
      onOpenChange={handleOpenChange}
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
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={() => { clickedResultRef.current = true; }}>
          <SearchDialogList items={resultsArray} />
        </div>
        {showNoResults && (
          <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
            <SearchX className="size-10 text-fd-muted-foreground/50" />
            <p className="text-sm font-medium text-fd-muted-foreground">
              No results for &ldquo;{search}&rdquo;
            </p>
            <p className="text-xs text-fd-muted-foreground/70">
              Try different keywords or check for typos
            </p>
          </div>
        )}
      </SearchDialogContent>
    </SearchDialog>
  );
}
