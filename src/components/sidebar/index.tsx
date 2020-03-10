import React from 'react';
import Tree from './tree';
import styled from 'styled-components';
import { useAllArticlesQuery } from '../../hooks/useAllArticlesQuery';
import { AllArticles } from '../../interfaces/AllArticles.interface';

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
const ChapterSubTitle = styled.h1`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #8FA6B2;
  line-height: 100%;
  margin-top: 20px;
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


const SidebarLayout = () => {
  const { allMdx }: AllArticles = useAllArticlesQuery();
  return (
    <Sidebar>
      <SidebarChapters>
        <ChapterTitle>Getting started</ChapterTitle>
        {/* <Tree edges={allMdx.edges} /> */}
        {/* Sample list of topics */}
        <List>
          <ListItem>Quickstart (5min)</ListItem>
          <ListItem>Setup Prisma (15min)</ListItem>
          <ListItem>Tutorial (2h)</ListItem>
        </List>
      </SidebarChapters>

      <SidebarChapters>
        <ChapterTitle>Reference</ChapterTitle>
        <ChapterSubTitle>Tools & interfaces</ChapterSubTitle>
        {/* <Tree edges={allMdx.edges} /> */}
        {/* Sample list of topics */}
        <List>
          <ListItem>Schema</ListItem>
          <ListItem>Introspection</ListItem>
        </List>
        <ChapterSubTitle>More</ChapterSubTitle>
        {/* <Tree edges={allMdx.edges} /> */}
        {/* Sample list of topics */}
        <List style={{listStyle: 'none', padding: 0}}>
          <ListItem>Errors</ListItem>
          <ListItem>Telemetry</ListItem>
        </List>
      </SidebarChapters>
    </Sidebar>
  );
};

export default SidebarLayout;
