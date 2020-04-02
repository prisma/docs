import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Tree from './tree';
import styled, { css } from 'styled-components';
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery';
import { AllArticles } from '../../interfaces/AllArticles.interface';

const Sidebar = styled.div`
  margin: 0;
  overflow-y: auto;
  ${({ isSticky }) =>
    isSticky &&
    css`
      max-height: 100vh;
    `};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavigationContainer = styled.aside`
  width: 235px;
`;

const SidebarLayout = () => {
  const { allMdx }: AllArticles = useAllArticlesQuery();
  return (
    <StickyContainer>
      <NavigationContainer>
        <Sticky topOffset={0}>
          {({ style, isSticky }) => (
            <Sidebar style={style} isSticky={isSticky}>
              <List>
                <Tree edges={allMdx.edges} />
              </List>
            </Sidebar>
          )}
        </Sticky>
      </NavigationContainer>
    </StickyContainer>
  );
};

export default SidebarLayout;
