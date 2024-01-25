import { defaultTheme as theme } from '../../themes'
import algoliasearch from 'algoliasearch/lite'
// import { navigate } from 'gatsby'
import qs from 'qs'
import React, { useEffect, useRef, useState } from 'react'
import { connectHits, connectStateResults, Index, InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'

import config from '../../../config'
import DocHit from './hitComps'
import CustomSearchBox from './input'
import Overlay from './overlay'

const HitsWrapper = styled.div`
  display: none;
  &.show {
    display: grid;
    margin-bottom: 100px;
  }
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 100002;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 50%;
  top: 86px;

  transform: translate(-50%, -0%);
  max-width: 1240px;
  width: 100%;
  background: ${theme.colors.white};
  box-shadow:
    0px 4px 8px rgba(47, 55, 71, 0.05),
    0px 1px 3px rgba(47, 55, 71, 0.1);
  border-radius: 8px;
  // border-top-left-radius: 0;
  // border-top-right-radius: 0;
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    margin: 0;
  }
  .no-results {
    padding: 2rem;
  }
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }
  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 0.5em solid rgba(215, 215, 215, 0.2);
    border-right: 0.5em solid rgba(215, 215, 215, 0.2);
    border-bottom: 0.5em solid rgba(215, 215, 215, 0.2);
    border-left: 0.5em solid #d7d7d7;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    // left: 0;
    // top: 88px;
    // max-width: 100%;
    border-top: 1px solid ${theme.colors.gray[300]};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[700]};
  }
`

const indexName = config.header.search.indexName
const DEBOUNCE_TIME = 400
const algoliaClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey
)

const searchClient = {
  ...algoliaClient,
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

const getHits = (children: any, res: any) => {
  const allHits = res.hits
  const newHits = allHits
    .filter((h: any) => h._distinctSeqID == 0)
    .map((x: any) => ({
      ...x,
      moreCount: 0,
    }))
  allHits.map((h: any) => {
    const first = newHits.find((firstG: any) => firstG.slug == h.slug)
    if (first) {
      first.moreCount++
    }
  })
  res.hits = newHits
  return children
}
const Results = connectStateResults(
  ({ isSearchStalled, searchState: state, searchResults: res, children }: any) =>
    (isSearchStalled || res?.query === '' ? <div className="loader">Searching...</div> : null) ||
    (res && res.nbHits > 0 ? (
      getHits(children, res)
    ) : (
      <div className="no-results">
        No results for '<i>{state.query}</i>'
      </div>
    ))
)

const createURL = (state: any) => `?${qs.stringify(state)}`

const searchStateToUrl = (location: any, searchState: any) =>
  searchState
    ? `${
        location.pathname === '/docs'
          ? location.pathname.replace('docs', '')
          : location.pathname.replace('/docs', '')
      }${createURL(searchState)}`
    : ``

const urlToSearchState = (location: any) => qs.parse(location.search.slice(1))

export default function Search({
  hitsStatus,
  location,
  path,
  sidenavSearchOpened,
  closeSidenavSearch,
  setInputText,
  wide,
}: any) {
  const [searchState, setSearchState] = useState(urlToSearchState(location))
  const [query, setQuery] = useState(``)
  const [showHits, setShowHits] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const hideSearch = () => {
    setShowHits(false)
    if (searchState.query === '') {
      clearTimeout(debouncedSetStateRef.current)
      debouncedSetStateRef.current = setTimeout(() => {
        navigate(location.href.split('?')[0])
      }, DEBOUNCE_TIME)
    }
    setInputText(query)
    closeSidenavSearch()
  }

  const showSearch = () => setShowHits(true)

  const debouncedSetStateRef = useRef(null)

  const onSearchStateChange = (updatedSearchState: any) => {
    setQuery(updatedSearchState.query)
    clearTimeout(debouncedSetStateRef.current)

    debouncedSetStateRef.current = setTimeout(() => {
      navigate(searchStateToUrl(location, updatedSearchState))
    }, DEBOUNCE_TIME)

    setSearchState(updatedSearchState)
  }

  React.useEffect(() => {
    hitsStatus(showHits)
  }, [showHits, query])

  React.useEffect(() => {
    setSearchState(urlToSearchState(location))
    setQuery(searchState.query)
  }, [location])

  const incrementIndex = () => {
    setSelectedIndex((prevCount: number) => {
      const nbHits = document.querySelectorAll('.ais-Hits-list .ais-Hits-item')?.length
      if (prevCount < nbHits - 1) {
        return prevCount + 1
      } else {
        return 0
      }
    })
  }
  const decrementIndex = () => {
    const nbHits = document.querySelectorAll('.ais-Hits-list .ais-Hits-item')?.length
    setSelectedIndex((prevCount: number) => {
      if (prevCount > 0) {
        return prevCount - 1
      } else {
        return nbHits - 1
      }
    })
  }

  const scrollListener = () => {
    hideSearch()
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={onSearchStateChange}
      searchState={searchState}
      createURL={createURL}
    >
      <Overlay visible={showHits} hideSearch={hideSearch} path={path} />
      <CustomSearchBox
        onFocus={() => setShowHits(true)}
        isOpened={showHits}
        closeSearch={hideSearch}
        upClicked={decrementIndex}
        downClicked={incrementIndex}
        path={location.pathname}
        sidenavSearchOpened={sidenavSearchOpened}
        wide={wide}
      />
      {query && query !== '' && showHits && (
        <HitsWrapper className={`${showHits ? 'show' : ''}`} onClick={hideSearch}>
          <Index key={indexName} indexName={indexName}>
            <Results>
              <Hits hitComponent={DocHit} selectedIndex={selectedIndex} />
            </Results>
          </Index>
        </HitsWrapper>
      )}
    </InstantSearch>
  )
}

const Hits = connectHits(
  ({ hits, hitComponent, onMouseHoverHit, selectedIndex, onMouseLeaverHits }: any) => (
    <ul className="ais-Hits-list" onMouseLeave={onMouseLeaverHits}>
      {hits.map((hit: any, index: number) => (
        <li key={hit.objectID} className="ais-Hits-item">
          {React.createElement(hitComponent, {
            hit,
            selected: index === selectedIndex,
            onMouseHover: () => onMouseHoverHit(index),
          })}
        </li>
      ))}
    </ul>
  )
)
