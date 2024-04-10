import React, { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import { useHistory } from '@docusaurus/router'
import {
    isRegexpStringMatch,
    useSearchLinkCreator,
} from '@docusaurus/theme-common'
import {
    useAlgoliaContextualFacetFilters,
    useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import translations from '@theme/SearchTranslations'

import type { AutocompleteState } from '@algolia/autocomplete-core'
import type {
    DocSearchModal as DocSearchModalType,
    DocSearchModalProps,
} from '@docsearch/react'
import type {
    InternalDocSearchHit,
    StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import type { SearchClient } from 'algoliasearch/lite'

type DocSearchProps = Omit<
    DocSearchModalProps,
    'onClose' | 'initialScrollY'
> & {
    contextualSearch?: string
    externalUrlRegex?: string
    searchPagePath: boolean | string
}

let DocSearchModal: typeof DocSearchModalType | null = null

function Hit({
    hit,
    children,
}: {
    hit: InternalDocSearchHit | StoredDocSearchHit
    children: React.ReactNode
}) {
    return (
        <Link to={hit.url}>
            {hit?.hierarchy?.lvl0 && (
                <span className="search-hit-0">{hit.hierarchy.lvl0}</span>
            )}
            {children}
            {/* {hit?.hierarchy?.lvl1 && <span>{hit.hierarchy.lvl1}</span>} */}
            {/* {hit?.hierarchy?.lvl2 && <span>{hit.hierarchy.lvl2}</span>} */}
            {/* {hit?.content && <p>{hit.content}</p>} */}
        </Link>
    )
}

type ResultsFooterProps = {
    state: AutocompleteState<InternalDocSearchHit>
    onClose: () => void
}

function ResultsFooter({ state, onClose }: ResultsFooterProps) {
    const createSearchLink = useSearchLinkCreator()

    return (
        <Link to={createSearchLink(state.query)} onClick={onClose}>
            <Translate
                id="theme.SearchBar.seeAll"
                values={{ count: state.context.nbHits }}
            >
                {'See all {count} results'}
            </Translate>
        </Link>
    )
}

type FacetFilters = Required<
    Required<DocSearchProps>['searchParameters']
>['facetFilters']

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
    const normalize = (
        f: FacetFilters
    ): readonly string[] | readonly (string | readonly string[])[] =>
        typeof f === 'string' ? [f] : f
    return [...normalize(f1), ...normalize(f2)] as FacetFilters
}

function DocSearch({
    contextualSearch,
    externalUrlRegex,
    ...props
}: DocSearchProps) {
    const { siteMetadata } = useDocusaurusContext()
    const processSearchResultUrl = useSearchResultUrlProcessor()

    const contextualSearchFacetFilters =
        useAlgoliaContextualFacetFilters() as FacetFilters

    const configFacetFilters: FacetFilters =
        props.searchParameters?.facetFilters ?? []

    const facetFilters: FacetFilters = contextualSearch
        ? // Merge contextual search filters with config filters
          mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
        : // ... or use config facetFilters
          configFacetFilters

    // We let user override default searchParameters if she wants to
    const searchParameters: DocSearchProps['searchParameters'] = {
        ...props.searchParameters,
        facetFilters,
    }

    const history = useHistory()
    const searchContainer = useRef<HTMLDivElement | null>(null)
    const searchButtonRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [initialQuery, setInitialQuery] = useState<string | undefined>(
        undefined
    )

    const importDocSearchModalIfNeeded = useCallback(() => {
        if (DocSearchModal) {
            return Promise.resolve()
        }

        return Promise.all([
            import('@docsearch/react/modal') as Promise<
                typeof import('@docsearch/react')
            >,
            import('@docsearch/react/style'),
            import('./styles.css'),
        ]).then(([{ DocSearchModal: Modal }]) => {
            DocSearchModal = Modal
        })
    }, [])

    const onOpen = useCallback(() => {
        importDocSearchModalIfNeeded().then(() => {
            searchContainer.current = document.createElement('div')
            document.body.insertBefore(
                searchContainer.current,
                document.body.firstChild
            )
            setIsOpen(true)
        })
    }, [importDocSearchModalIfNeeded, setIsOpen])

    const onClose = useCallback(() => {
        setIsOpen(false)
        searchContainer.current?.remove()
        searchButtonRef.current?.focus()
    }, [setIsOpen])

    const onInput = useCallback(
        (event: KeyboardEvent) => {
            importDocSearchModalIfNeeded().then(() => {
                setIsOpen(true)
                setInitialQuery(event.key)
            })
        },
        [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
    )

    const navigator = useRef({
        navigate({ itemUrl }: { itemUrl?: string }) {
            // Algolia results could contain URL's from other domains which cannot
            // be served through history and should navigate with window.location
            if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
                window.location.href = itemUrl!
            } else {
                history.push(itemUrl!)
            }
        },
    }).current

    const transformItems = useRef<DocSearchModalProps['transformItems']>(
        (items) =>
            props.transformItems
                ? // Custom transformItems
                  props.transformItems(items)
                : // Default transformItems
                  items.map((item) => ({
                      ...item,
                      url: processSearchResultUrl(item.url),
                  }))
    ).current

    const resultsFooterComponent: DocSearchProps['resultsFooterComponent'] =
        useMemo(
            () =>
                // eslint-disable-next-line react/no-unstable-nested-components
                (
                    footerProps: Omit<ResultsFooterProps, 'onClose'>
                ): JSX.Element =>
                    <ResultsFooter {...footerProps} onClose={onClose} />,
            [onClose]
        )

    const transformSearchClient = useCallback(
        (searchClient: SearchClient) => {
            searchClient.addAlgoliaAgent(
                'docusaurus',
                siteMetadata.docusaurusVersion
            )

            return searchClient
        },
        [siteMetadata.docusaurusVersion]
    )

    useDocSearchKeyboardEvents({
        isOpen,
        onOpen,
        onClose,
        onInput,
        searchButtonRef,
    })

    return (
        <>
            <Head>
                {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
                <link
                    rel="preconnect"
                    href={`https://${props.appId}-dsn.algolia.net`}
                    crossOrigin="anonymous"
                />
            </Head>

            <DocSearchButton
                onTouchStart={importDocSearchModalIfNeeded}
                onFocus={importDocSearchModalIfNeeded}
                onMouseOver={importDocSearchModalIfNeeded}
                onClick={onOpen}
                ref={searchButtonRef}
                translations={translations.button}
            />

            {isOpen &&
                DocSearchModal &&
                searchContainer.current &&
                createPortal(
                    <DocSearchModal
                        onClose={onClose}
                        initialScrollY={window.scrollY}
                        initialQuery={initialQuery}
                        navigator={navigator}
                        transformItems={transformItems}
                        hitComponent={Hit}
                        transformSearchClient={transformSearchClient}
                        {...(props.searchPagePath && {
                            resultsFooterComponent,
                        })}
                        {...props}
                        searchParameters={searchParameters}
                        placeholder={translations.placeholder}
                        translations={translations.modal}
                    />,
                    searchContainer.current
                )}
        </>
    )
}

export default function SearchBar(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />
}
