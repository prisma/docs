import React from 'react';
import { useAllArticlesQuery } from '../hooks/useAllArticlesQuery';
import { AllArticles } from '../interfaces/AllArticles.interface';
import styled from 'styled-components';

interface NextArticleProps {
  currentRoute: string;
}

interface NextLinkProps {
  url?: string | null;
  title?: string | null;
}

const NextLinkWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(38, 38, 38, 0.15);
  border-radius: 6px;
  padding: 2rem;
  margin: 3rem 0;
`;

const StartChapterLink = styled.a`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  background: #3fb36d;
  border-radius: 4px;
  padding: 0.9rem 1rem;
  width: fit-content;
  text-decoration: none;
`;

const NextArticle = ({ currentRoute }: NextArticleProps) => {
  const { allMdx }: AllArticles = useAllArticlesQuery();

  const nav =
    allMdx && allMdx.edges
      ? allMdx.edges.map(({ node }: any) => ({
          url: node.fields.slug,
          title: node.fields.title,
        }))
      : [];
  let currentIndex = nav.findIndex(
    (item: any) => item && item.url === currentRoute
  );

  const nextInfo: NextLinkProps = {};
  if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null;
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null;
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null;
    nextInfo.title = null;
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url;
    nextInfo.title = nav[currentIndex + 1].title;
  }

  return (
    <div>
      {nextInfo.url && currentIndex >= 0 ? (
        <NextLinkWrapper>
          <h2>{nav[currentIndex + 1] && nav[currentIndex + 1].title}</h2>
          <StartChapterLink href={nav[currentIndex + 1].url}>
            Start Next Chapter >
          </StartChapterLink>
        </NextLinkWrapper>
      ) : null}
    </div>
  );
};

export default NextArticle;
