import React, { useState } from 'react'
import { InstantSearch, Index, Hits, connectStateResults, SearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import config from '../../../config'
import DocHit from './hitComps'
import styled from 'styled-components'
import Overlay from './overlay'
import SearchPic from '../../icons/Search'
import Clear from '../../icons/Clear'

const HitsWrapper = styled.div`
  display: none;
  &.show {
    display: grid;
  }
  max-height: 85vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 100002;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 230px;
  top: 0;
  max-width: 880px;
  width: 100vw;
  background: var(--white-color);
  box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.05), 0px 1px 3px rgba(47, 55, 71, 0.1);
  border-radius: 5px;
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    margin: 0;
  }
  .no-results,
  .loader {
    padding: 24px 40px;
  }
  @media (min-width: 0px) and (max-width: 1024px) {
    left: 0;
    top: 40px;
    max-width: 100%;
    border-top: 1px solid var(--border-color);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`

const SearchBoxDiv = styled(SearchBox)`
  width: 208px;
  form {
    position: relative;
    z-index: 100001;
    display: flex;
    align-items: center;

    button.ais-SearchBox-submit {
      display: none;
    }
    button.ais-SearchBox-reset {
      background: transparent;
      border: transparent;
      outline: none;
    }

    input {
      width: 100%;
      background: var(--white-color);
      box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1), 0px 1px 3px rgba(60, 45, 111, 0.15);
      border-radius: 5px;
      padding: 0.6rem 2.5rem;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 100%;
      border-width: 0;

      &::placeholder {
        content: 'Search';
        color: var(--list-bullet-color);
        opacity: 1; /* Firefox */
      }
    }

    input[type='search']::-webkit-search-decoration,
    input[type='search']::-webkit-search-cancel-button,
    input[type='search']::-webkit-search-results-button,
    input[type='search']::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  @media (min-width: 0px) and (max-width: 1024px) {
    flex: 1;
  }
`

const SearchIcon = styled(SearchPic)`
  position: absolute;
  left: 12px;
  top: 12px;
  width: 1em;
  pointer-events: none;
  z-index: 100001;
`

const ClearIcon = styled(Clear)`
  position: absolute;
  right: 24px;
  top: 15px;
  cursor: pointer;
`

const indexName = config.header.search.indexName
const searchClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey
)

const Results = connectStateResults(
  ({ isSearchStalled, searchState: state, searchResults: res, children }: any) =>
    (isSearchStalled ? <div className="loader">Searching...</div> : null) ||
    (res && res.nbHits > 0 ? (
      children
    ) : (
      <div className="no-results">No results for '{state.query}'</div>
    ))
)

export default function Search({ hitsStatus }: any) {
  const [query, setQuery] = useState(``)
  const [showHits, setShowHits] = React.useState(false)
  const hideSearch = () => setShowHits(false)

  const showSearch = () => setShowHits(true)

  React.useEffect(() => {
    hitsStatus(query.length > 0 && showHits)
  }, [showHits, query])

  const emptySearchBox = () => setQuery('')

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={({ query }: any) => setQuery(query)}
    >
      <Overlay visible={query.length > 0 && showHits} hideSearch={hideSearch} />
      <SearchBoxDiv
        focusShortcuts={['s', 191]}
        onFocus={showSearch}
        searchAsYouType={true}
        reset={<ClearIcon />}
        translations={{
          placeholder: 'Search',
        }}
      />
      <SearchIcon />
      <HitsWrapper
        className={`${query.length > 0 && showHits ? 'show' : ''}`}
        onClick={emptySearchBox}
      >
        <Index key={indexName} indexName={indexName}>
          <Results>
            <Hits hitComponent={DocHit} />
          </Results>
        </Index>
      </HitsWrapper>
    </InstantSearch>
  )
}
