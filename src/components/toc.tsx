import React from 'react';
import styled from 'styled-components';
import { AllArticlesTOC } from '../interfaces/TOC.interface';
import { useTOCQuery } from '../hooks/useTOCQuery';
import { slug } from '../utils/slug';
import { stringify } from '../utils/stringify';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { urlGenerator } from '../utils/urlGenerator';

const TOCContent = styled.aside`
  // padding: 2rem 0 0;
`;

const ChapterTitle = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #a0aec0;
`;

const scrollToId = (e: any) => {
  const id = e.target && e.target.href && e.target.href.split('#')[1];
  if (id) {
    scrollTo(`#${id}`);
  }
};

const TOC = ({ location }: any) => {
  const { allMdx }: AllArticlesTOC = useTOCQuery();
  let navItems: any[] = [];

  if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
    allMdx.edges.map((item: any) => {
      if (item !== undefined) {
        if (
          urlGenerator(item.node.fields.slug) === location.pathname ||
          '/' + urlGenerator(item.node.fields.slug) === location.pathname
        ) {
          if (item.node.tableOfContents.items) {
            navItems = item.node.tableOfContents.items.map((innerItem: any, index: number) => {
              const itemId = innerItem.title ? slug(stringify(innerItem.title)) : '#';

              return (
                <li key={index}>
                  <a href={`#${itemId}`} onClick={scrollToId}>
                    {stringify(innerItem.title)}
                  </a>
                </li>
              );
            });
          }
        }
      }
    });
  }
  return navItems && navItems.length ? (
    <TOCContent>
      <ChapterTitle>CONTENT</ChapterTitle>
      <ul className="list">{navItems}</ul>
    </TOCContent>
  ) : null;
};

export default TOC;
