import * as React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import background from "images/home-bg.png"
import listDot from "images/list-dot.png"
import { ButtonSize, PrimaryButton, SpecialButton } from '../components/button';

import Schema from '../icons/HomePage/Schema';
import DbLink from '../icons/HomePage/DbLink';
import CLI from '../icons/HomePage/CLI';
import DoubleArrow from '../icons/HomePage/DoubleArrow';
import OverviewIcon from '../icons/HomePage/Overview';
import ComponentsIcon from '../icons/HomePage/Components';
import DatabaseIcon from '../icons/HomePage/Database';
import MoreIcon from '../icons/HomePage/More';


const GeneralLinkData = [{
  "category_name": "Overview",
  "links": [{
    "text": "What is Prisma",
    "url": ""
  },{
    "text": "Why Prisma?",
    "url": ""
  },{
    "text": "Prisma in your stack",
    "url": ""
  },{
    "text": "Under the hood ",
    "url": ""
  }]
}, {
  "category_name": "Overview",
  "links": [{
    "text": "What is Prisma",
    "url": ""
  },{
    "text": "Why Prisma?",
    "url": ""
  },{
    "text": "Prisma in your stack",
    "url": ""
  },{
    "text": "Under the hood ",
    "url": ""
  }]
}, 
{
  "category_name": "Overview",
  "links": [{
    "text": "What is Prisma",
    "url": ""
  },{
    "text": "Why Prisma?",
    "url": ""
  },{
    "text": "Prisma in your stack",
    "url": ""
  },{
    "text": "Under the hood ",
    "url": ""
  }]
}, {
  "category_name": "Overview",
  "links": [{
    "text": "What is Prisma",
    "url": ""
  },{
    "text": "Why Prisma?",
    "url": ""
  },{
    "text": "Prisma in your stack",
    "url": ""
  },{
    "text": "Under the hood ",
    "url": ""
  }]
}]


const Summary = styled.div`
  font-family: 'Open Sans';
  padding: ${p => p.theme.space[80]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${background}) center -150px no-repeat;
  h1 {
    font-weight: bold;
    font-family: Montserrat;
    font-size: 32px;
    margin: 0;
  }

  p {
    max-width: 750px;
    width: 100%;
    color: #4A5568;
    line-height: 24px;
    margin: 32px 0;
    text-align: center;

    a {
      color: inherit !important;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 1rem;
  list-style-image: url(${listDot});
  li {
    padding-left: 8px;
    margin-top: 10px;

    a {
      color: #2D3748 !important;
      cursor: pointer;
    }
  }
`

const SummaryLinks = styled.div`
    max-width: 435px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  a {
    text-transform: uppercase !important;
    color: #ffffff !important;
    font-weight: bold;
  }
`

const QuickLinks = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%), #edf2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => p.theme.space[48]} 0;

  h4 {
    text-transform: uppercase !important;
    font-weight: bold;
    letter-spacing: 0.02em;
    font-size: 14px;
  }
`;

const GenaralLinks = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 996px;
  width: 100%;
  svg {
    margin-left: -6px;
  }
`;

const Row = styled.div`
 display: flex;
 max-width: 996px;
 width: 100%;
 justify-content: space-between;
 margin-top: ${p => p.theme.space[40]};
`;


const LinkCard = styled.div`
    background: #EDF2F7;
    border-radius: 8px;
    padding: 0 ${p => p.theme.space[24]};
		width: 100%;
		border-top: 8px solid #EDF2F7;
		position: relative;

		.icon {
			position: absolute;
			top: -30px;
		}
		`

const Homepage = () => (
  <Layout homePage={true}>
    <Summary>
      <h1>Prisma Documentation</h1>
      <p>
        To get started with Prisma, choose one of our <a>getting started tutorials</a> or explore our 
        <a> ready-to-run examples on GitHub</a>. Join our thriving community on <a>Slack</a> and <a>GitHub</a> for help
        and ideas.
      </p>
      <SummaryLinks>
        <SpecialButton
          href=""
          size={ButtonSize.SMALL}
          target="_blank"
        >
          <DoubleArrow/>&nbsp;
          Quick Start
        </SpecialButton>
        <PrimaryButton
          href=""
          icon=""
          size={ButtonSize.SMALL}
          target="_blank"
          style={{background: '#2D3748'}}
        >
          Set up Prisma
        </PrimaryButton>
        <PrimaryButton
          href=""
          icon=""
          size={ButtonSize.SMALL}
          target="_blank"
          style={{background: '#2D3748'}}
        >
          Examples
        </PrimaryButton>
       
      </SummaryLinks>
    </Summary>
    <QuickLinks>
      <GenaralLinks>
        <div>
          <OverviewIcon/>
          <h4>Overview</h4>
          <List>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
          </List>
        </div>
        <div>
          <ComponentsIcon/>
          <h4>Components</h4>
          <List>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
          </List>
        </div>
        <div>
          <DatabaseIcon/>
          <h4>Database Connectors</h4>
          <List>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
          </List>
        </div>
        <div>
        <MoreIcon/>
          <h4>More</h4>
          <List>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
            <li>
              <a>What is Prisma?</a>
            </li>
          </List>
        </div>
      </GenaralLinks>

      <h3>Guides</h3>
      <p>
        This section includes end-to-end guides for upgrading and deploying Node.js applications
        that use Prisma, as well as guides for common database-related tasks.
      </p>
      <Row>
          <LinkCard style={{maxWidth: '274px', borderColor: '#48BB78'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>

          <LinkCard style={{maxWidth: '274px', borderColor: '#38B2AC'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>

          <LinkCard style={{maxWidth: '384px', borderColor: '#4299E1'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>
      </Row>

      <Row>
          <LinkCard style={{maxWidth: '384px', borderColor: '#667EEA'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>

          <LinkCard style={{maxWidth: '274px', borderColor: '#9F7AEA'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>

          <LinkCard style={{maxWidth: '274px',borderColor: '#ED64A6'}}>
          <h4>Setting up a database</h4>
          <p>Vitae tincidunt convallis arcu pretium amet ut porttitor.</p>
          </LinkCard>
      </Row>

			<h3>Reference</h3>
      <p>
			Egestas in tincidunt dui, integer at. Ultrices ipsum lectus ornare velit vestibulum. Porttitor nulla faucibus commodo purus eget. Vitae pretium.
      </p>
			<Row>
          <LinkCard style={{maxWidth: '316px'}}>
						<span className="icon"><Schema/></span>
          <h4>Prisma Schema API</h4>
          <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          </LinkCard>

          <LinkCard style={{maxWidth: '316px'}}>
					<span className="icon"><CLI/></span>
          <h4>CLI Commands</h4>
					<ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          </LinkCard>

          <LinkCard style={{maxWidth: '316px'}}>
					<span className="icon"><DbLink/></span>
          <h4>Database</h4>
          <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          </LinkCard>
      </Row>

      <h4>More useful resources</h4>
      <hr/>
      <Row>
      <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
          <ul>
            <li>
              <a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
            <li>
						<a>datasource</a>
            </li>
          </ul>
      </Row>

    </QuickLinks>
  </Layout>
);

export default Homepage;
