import React, { useState } from 'react'
import { InstantSearch, Index, connectStateResults, connectHits } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import config from '../../../config'
import DocHit from './hitComps'
import styled from 'styled-components'
import Overlay from './overlay'
import CustomSearchBox from './input'

const NO_LINE_SELECTED = -1
const UP_KEY = 38
const DOWN_KEY = 40
const ENTER_KEY = 13
const ESCAPE_KEY = 27


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
  left: 50%;
  top: 97px;

  transform: translate(-50%, -0%);
  max-width: 1200px;
  width: 100%;
  background: ${p => p.theme.colors.white};
  box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.05), 0px 1px 3px rgba(47, 55, 71, 0.1);
  border-radius: ${p => p.theme.radii.small};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
    top: 88px;
    // max-width: 100%;
    border-top: 1px solid ${p => p.theme.colors.gray300};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`

const indexName = config.header.search.indexName
const searchClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey
)

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

export default function Search({ hitsStatus }: any) {
  const [query, setQuery] = useState(``)
  const [showHits, setShowHits] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(NO_LINE_SELECTED)
  const hideSearch = () => setShowHits(false)

  const showSearch = () => setShowHits(true)

  // const onKeyDown = (e: any) => {
  //   const nbHits = document.querySelectorAll(".ais-Hits-list .ais-Hits-item")?.length
  //   console.log(nbHits, selectedIndex, e.keyCode)
  //   if(e && e.keyCode == ESCAPE_KEY) {
  //     hideSearch()
  //   }

  //  // arrow up/down button should select next/previous list element
  //   else if (e.keyCode === UP_KEY) {
  //     console.log('up')
  //     if (selectedIndex > 0) {
  //       setSelectedIndex(selectedIndex - 1)
  //     } else {
  //       setSelectedIndex(nbHits - 1)
  //     }
  //   } else if (e.keyCode === DOWN_KEY) {
  //     console.log('down')
  //     if (selectedIndex < nbHits - 1) {
  //       setSelectedIndex(selectedIndex + 1)
  //     } else {
  //       setSelectedIndex(0)
  //     }
  //   }
  // }

  // const setIndex = (index: any) => {
  //   setSelectedIndex(index)
  // }

  React.useEffect(() => {
   //document.addEventListener('keydown', onKeyDown)
    hitsStatus(showHits)
  }, [showHits, query])


  // React.useEffect(() => {
  //    console.log(selectedIndex)
  //  }, [selectedIndex])

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={({ query }: any) => setQuery(query)}
    >
      <Overlay visible={showHits} hideSearch={hideSearch} />
      <CustomSearchBox onFocus={showSearch} isOpened={showHits} closeSearch={hideSearch} />
      {/* closeSearch={hideSearch} onIndexSet={setIndex} */}
      {query !== '' && <HitsWrapper className={`${showHits ? 'show' : ''}`} onClick={hideSearch}>
        <Index key={indexName} indexName={indexName}>
          <Results>
            <Hits hitComponent={DocHit} selectedIndex={selectedIndex}/>
          </Results>
        </Index>
      </HitsWrapper>}
    </InstantSearch>
  )
}

const Hits = connectHits(
  ({
    hits,
    hitComponent,
    onMouseHoverHit,
    selectedIndex,
    onMouseLeaverHits,
  }:any) => (
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
