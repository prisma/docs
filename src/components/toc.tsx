import React from 'react';
// import Tree from './tree';
import styled from 'styled-components';
// import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery';
// import { AllArticles } from '../../interfaces/AllArticles.interface';

const Sidebar = styled.aside`
  padding: 2rem 6rem;
  position: fixed;
`;

const SidebarChapters = styled.div`
  border-bottom: 1px solid #8DA4B4;
  margin-bottom: 20px;
  &:last-of-type {
    border: 0;
  }
`;

const ChapterTitle = styled.h1`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #082133;
  line-height: 100%;
`;

// Sample list
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  font-size: 14px;
  color: #547185;
`;


const TOC = () => {
  return (
    <Sidebar>
      <SidebarChapters>
        <ChapterTitle>On this page</ChapterTitle>
        <List>
          <ListItem>Overview</ListItem>
          <ListItem>Section 1</ListItem>
          <ListItem>Section 2</ListItem>
          <ListItem>Section Other</ListItem>
          <ListItem>Beep boop lorem ipsum</ListItem>
        </List>
      </SidebarChapters>

      <SidebarChapters>
        <ChapterTitle>Is this helpful?</ChapterTitle>
      </SidebarChapters>
    </Sidebar>
  );
};

export default TOC;
