import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../link';
import { urlGenerator } from '../../utils/urlGenerator';
import styled from 'styled-components';
import ParentTitle from '../parentTitleComp';

const HitComp = styled.div`
  padding: 24px 40px !important;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid #e2e8f0;
  max-height: 150px;
  overflow: auto;
  &:last-item {
    border: 0;
  }
  a {
    color: #1a202c !important;
  }
  h3 {
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.01em;
    margin: 10px 0;
  }
  &:hover,
  &:focus {
    background: #f7fafc;
  }
  mark {
    color: #3182ce !important;
    background: #ebf8ff;
    padding: 2px 4px;
  }
`;

const DocHit = ({ hit }: any) => (
  <HitComp>
    <Link
      style={{ boxShadow: `none`, textDecoration: 'none' }}
      to={hit.slug.includes('index') ? null : urlGenerator(hit.slug)}
    >
      <ParentTitle slug={hit.slug} />
      <h3>{hit.title}</h3>
      <Highlight hit={hit} attribute="content" tagName="mark" />
    </Link>
  </HitComp>
);

export default DocHit;
