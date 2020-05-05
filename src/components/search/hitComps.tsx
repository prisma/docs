import React from 'react'
import { Snippet } from 'react-instantsearch-dom'
import Link from '../link'
import { urlGenerator } from '../../utils/urlGenerator'
import styled from 'styled-components'
import ParentTitle from '../parentTitleComp'

const HitComp = styled.div`
  padding: 24px 40px !important;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--border-color);
  max-height: 150px;
  &:last-item {
    border: 0;
  }
  a {
    color: var(--main-font-color) !important;
  }
  h4 {
    font-weight: normal;
  }
  h3 {
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.01em;
    margin: 10px 0;
  }
  &:hover,
  &:focus {
    background: var(--main-bgd-color);
  }
  mark {
    color: var(--link-color) !important;
    background: var(--search-highlight-bg-color);
    padding: 2px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    max-height: fit-content;
    padding: 24px !important;
  }
`

const DocHit = ({ hit }: any) => (
  <HitComp>
    <Link
      style={{ boxShadow: `none`, textDecoration: 'none' }}
      to={hit.slug.includes('index') ? null : urlGenerator(hit.slug)}
    >
      <ParentTitle slug={hit.slug} />
      <h3>{hit.title}</h3>
      <Snippet hit={hit} attribute="content" tagName="mark" />
    </Link>
  </HitComp>
)

export default DocHit
