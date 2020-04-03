import React, { useState, useEffect, createRef } from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
  SearchBox,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import config from '../../../config';

// import { Root, HitsWrapper, PoweredBy } from './styles';
// import Input from './Input';
// import * as hitComps from './hitComps';
import { DocHit } from './hitComps';

const searchClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey
);

const indexName = config.header.search.indexName;
const Search = () => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <SearchBox />
    <Hits hitComponent={DocHit} />
  </InstantSearch>
);

export default Search;

// const Results = connectStateResults(
//   ({ searchState: state, searchResults: res, children }: any) =>
//     res && res.nbHits > 0 ? children : `No results for '${state.query}'`
// )

// const Stats = connectStateResults(
//   ({ searchResults: res }: any) =>
//     res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
// )

// const useClickOutside = (ref: any, handler: any, events: any) => {
//     console.log(ref)
//   if (!events) events = [`mousedown`, `touchstart`]
//   const detectClickOutside = (event: any) =>
//     !ref.current.contains(event.target) && handler()
//   useEffect(() => {
//     for (const event of events)
//       document.addEventListener(event, detectClickOutside)
//     return () => {
//       for (const event of events)
//         document.removeEventListener(event, detectClickOutside)
//     }
//   })
// }

// export default function Search({ indices, collapse, hitsAsGrid }: any) {
//   const ref = createRef()
//   const [query, setQuery] = useState(``)
//   const [focus, setFocus] = useState(false)
//   const searchClient = algoliasearch(
//     config.header.search.algoliaAppId,
//     config.header.search.algoliaSearchKey
//   )
// useClickOutside(ref, () => setFocus(false), null)

// // const anchorElRef = React.useRef(null);

//   return (
//     <InstantSearch
//       searchClient={searchClient}
//       indexName={indices[0].name}
//       onSearchStateChange={({ query }: any) => setQuery(query)}
//       root={{ Root, props: { ref } }}
//     >
//       <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
//       {/* <div ref={anchorElRef}>
//         <Input />
//       </div> */}
//       <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
//         {indices.map(({ name, title, hitComp }: any) => (
//           <Index key={name} indexName={name}>
//             <header>
//               <h3>{title}</h3>
//               <Stats />
//             </header>
//             <Results>
//               <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
//             </Results>
//           </Index>
//         ))}
//         {/* <PoweredBy /> */}
//       </HitsWrapper>
//     </InstantSearch>
//   )
// }
