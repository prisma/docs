import * as React from "react";
import styled from "styled-components";
import TOC from "./toc";

const BreadcrumbTitle = styled.h4`
  color: #718096;
  line-height: 1rem;
  margin: 0;
`;

const MainTitle = styled.h1`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: #1a202c;
  margin: 0;
  margin-top: 4px;
`;

const TopSection = ({ location, title, parentTitle, indexPage }: any) => (
  <div>
    {!indexPage && <BreadcrumbTitle>{parentTitle}</BreadcrumbTitle>}
    <MainTitle>{title}</MainTitle>
    {!indexPage && <hr />}
    {!indexPage && <TOC location={location} />}
  </div>
);

export default TopSection;
