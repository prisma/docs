import React, { useState } from 'react';
import { InstantSearch, Index, Hits, connectStateResults } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import config from '../../../config';
import CustomSearchBox from './input';
import DocHit from './hitComps';
import styled from 'styled-components';
import Overlay from './overlay';

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
  left: 235px;
  top: 0;
  max-width: 880px;
  width: 100vw;
  background: #ffffff;
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
  .no-results {
    padding: 24px 40px;
  }
`;

const indexName = config.header.search.indexName;

export default function Search() {
  const [query, setQuery] = useState(``);
  const searchClient = algoliasearch(
    config.header.search.algoliaAppId,
    config.header.search.algoliaSearchKey
  );

  const [showHits, setShowHits] = React.useState(true);

  const Results = connectStateResults(({ searchState: state, searchResults: res, children }: any) =>
    res && res.nbHits > 0 ? (
      children
    ) : (
      <div className="no-results">No results for '{state.query}'</div>
    )
  );

  const hideSearch = () => setShowHits(false);
  const showSearch = () => setShowHits(true);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={({ query }: any) => setQuery(query)}
    >
      <Overlay visible={query.length > 0 && showHits} hideSearch={hideSearch} />
      <CustomSearchBox onFocus={showSearch} />
      <HitsWrapper className={`${query.length > 0 && showHits ? 'show' : ''}`}>
        <Index key={indexName} indexName={indexName}>
          <Results>
            <Hits hitComponent={DocHit} />
          </Results>
        </Index>
      </HitsWrapper>
    </InstantSearch>
  );
}
