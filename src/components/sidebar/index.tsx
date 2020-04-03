import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Tree from './tree';
import styled, { css } from 'styled-components';
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery';
import { AllArticles } from '../../interfaces/AllArticles.interface';

const SidebarContainer = styled.aside`
  width: 235px;
`;

const Sidebar = styled.div`
  margin: 0;
  overflow: auto;
  ${({ isSticky }) =>
    isSticky &&
    css`
      max-height: 100vh;
    `};
`;

const List = styled.ul`
  list-style: none;
`;

const SidebarLayout = () => {
  const { allMdx }: AllArticles = useAllArticlesQuery();
  return (
    <StickyContainer>
      <SidebarContainer>
        <Sticky topOffset={0}>
          {({ style, isSticky }) => (
            <Sidebar style={style} isSticky={isSticky}>
              <List>
                <Tree edges={allMdx.edges} />
              </List>
            </Sidebar>
          )}
        </Sticky>
      </SidebarContainer>
    </StickyContainer>
  );
};

export default SidebarLayout;
