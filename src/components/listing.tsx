import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { useListingQuery } from '../hooks/useListingQuery';

const Post = styled.article`
  box-shadow: 0 0.3rem 1rem rgba(25, 17, 34, 0.05);
  padding: 0.5rem;
  border-radius: 0.4rem;
  margin-bottom: 1rem;

  a {
    color: black;
    text-decoration: none;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    font-size: 0.8rem;
  }
`;

const ReadMoreLink = styled(Link)`
  font-size: 0.8rem;
  text-decoration: underline;
  color: ${props => props.theme.colorPrimary};
`;

const Listing = () => {
  const { allMdx } = useListingQuery();

  return (
    <>
      {allMdx &&
        allMdx.edges &&
        allMdx.edges.map(({ node }) => {
          const { path, title, date } = node.frontmatter;

          return (
            <Post key={path}>
              <Link to={`/posts${path}`}>
                <h2>{title}</h2>
              </Link>
              <p>{date}</p>
              <p>{node.excerpt}</p>
              <ReadMoreLink to={`/posts${path}`}>Read More</ReadMoreLink>
            </Post>
          );
        })}
    </>
  );
};

export default Listing;
