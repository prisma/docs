import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import { Snippet } from 'react-instantsearch-dom'
import styled from 'styled-components'

import Link from '../link'
import ParentTitle from '../parentTitleComp'

const HitComp = styled.div`
  padding: ${theme.space[24]} ${theme.space[40]} !important;
  font-family: ${theme.fonts.text};
  font-style: normal;
  font-weight: normal;
  font-size: ${theme.fontSizes[16]};
  line-height: ${theme.space[24]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  // max-height: 150px;
  &:last-item {
    border: 0;
  }
  a {
    color: ${theme.colors.gray[900]} !important;
    display: block;
  }
  h4 {
    font-weight: normal;
  }
  h3 {
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.01em;
    margin: 10px 0;
  }
  &:hover,
  &:focus {
    background: ${theme.colors.gray[100]};
  }
  mark {
    color: ${theme.colors.blue[600]} !important;
    background: #ebf8ff;
    padding: 2px;
    font-weight: bold;
  }

  .more {
    color: ${theme.colors.blue[600]};
    font-size: ${theme.fontSizes[14]};
    width: fit-content;
    margin: 10px 0 0;
  }

  @media (min-width: 0px) and (max-width: ${theme.breakpoints.tabletVertical}) {
    max-height: fit-content;
    padding: ${theme.space[24]} !important;
  }
`

const DocHit = ({ hit, selected }: any) =>
  hit._distinctSeqID == 0 ? (
    <HitComp style={{ background: selected ? '#F7FAFC' : 'white' }}>
      <Link style={{ boxShadow: `none`, textDecoration: 'none' }} to={hit.path}>
        <ParentTitle slug={hit.slug} nonLink={true} isSearchItem={true} />
        <h3>
          <Snippet hit={hit} attribute="title" tagName="mark" /> /{' '}
          <span style={{ color: 'var(--code-inner-color)' }}>
            <Snippet hit={hit} attribute="heading" tagName="mark" />
          </span>
        </h3>
        <Snippet hit={hit} attribute="content" tagName="mark" />
        {hit.moreCount > 1 && <p className="more">... More results on this page</p>}
      </Link>
    </HitComp>
  ) : null

export default DocHit
