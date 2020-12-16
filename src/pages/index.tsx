import * as React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import Schema from '../icons/Schema';
import DbLink from '../icons/DbLink';
import CLI from '../icons/CLI';

const Summary = styled.div`
  font-family: 'Open Sans';
  padding: ${p => p.theme.space[80]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-weight: bold;
  }
`;

const QuickLinks = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%), #edf2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => p.theme.space[48]} 0;
`;

const GenaralLinks = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 996px;
  width: 100%;
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
      <h2>Prisma Documentation</h2>
      <p>
        To get started with Prisma, choose one of our getting started tutorials or explore our
        ready-to-run examples on GitHub. Join our thriving community on Slack and GitHub for help
        and ideas.
      </p>
      <div>
        <a>Quick Start</a>
        <a>Set up Prisma</a>
        <a>Examples</a>
      </div>
    </Summary>
    <QuickLinks>
      <GenaralLinks>
        <div>
          <span>I</span>
          <h4>Overview</h4>
          <ul>
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
          </ul>
        </div>
        <div>
          <span>I</span>
          <h4>Overview</h4>
          <ul>
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
          </ul>
        </div>
        <div>
          <span>I</span>
          <h4>Overview</h4>
          <ul>
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
          </ul>
        </div>
        <div>
          <span>I</span>
          <h4>Overview</h4>
          <ul>
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
          </ul>
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

    </QuickLinks>
  </Layout>
);

export default Homepage;
