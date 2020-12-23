import * as React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import background from 'images/home-bg.png';
import listDot from 'images/list-dot.png';
import { ButtonSize, PrimaryButton, SpecialButton } from '../components/button';

import Schema from '../icons/homepage/Schema';
import DbLink from '../icons/homepage/DbLink';
import CLI from '../icons/homepage/CLI';
import DoubleArrow from '../icons/homepage/DoubleArrow';
import OverviewIcon from '../icons/homepage/Overview';
import ComponentsIcon from '../icons/homepage/Components';
import DatabaseIcon from '../icons/homepage/Database';
import MoreIcon from '../icons/homepage/More';
import ArrowIcon from '../icons/homepage/Arrow';

const GeneralLinkData = [
  {
    category_name: 'Overview',
    icon: <OverviewIcon />,
    links: [
      {
        text: 'What is Prisma',
        url: '',
      },
      {
        text: 'Why Prisma?',
        url: '',
      },
      {
        text: 'Prisma in your stack',
        url: '',
      },
      {
        text: 'Under the hood ',
        url: '',
      },
    ],
  },
  {
    category_name: 'Components',
    icon: <ComponentsIcon />,
    links: [
      {
        text: 'Prisma schema',
        url: '',
      },
      {
        text: 'Prisma Client',
        url: '',
      },
      {
        text: 'Prisma Migrate',
        url: '',
      },
      {
        text: 'Introspection',
        url: '',
      },
      {
        text: 'Prisma CLI',
        url: '',
      },
      {
        text: 'Prisma Studio',
        url: '',
      },
      {
        text: 'Prisma features',
        url: '',
      },
    ],
  },
  {
    category_name: 'Database Connectors',
    icon: <DatabaseIcon />,
    links: [
      {
        text: 'PostgreSQL',
        url: '',
      },
      {
        text: 'MySQL',
        url: '',
      },
      {
        text: 'SQLite',
        url: '',
      },
      {
        text: 'SQL Server',
        url: '',
      },
    ],
  },
  {
    category_name: 'More',
    icon: <MoreIcon />,
    links: [
      {
        text: 'Editor setup',
        url: '',
      },
      {
        text: 'Telemetry',
        url: '',
      },
    ],
  },
];

const GuideLinkData = [
  {
    title: 'Setting up a database',
    color: '#48BB78',
    small: true,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
  {
    title: 'Data import and export',
    color: '#38B2AC',
    small: true,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
  {
    title: 'Foreign keys',
    color: '#4299E1',
    small: false,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
  {
    title: 'Deploying to Vercel (ZEIT Now)',
    color: '#667EEA',
    small: false,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
  {
    title: 'Deploying to Heroku',
    color: '#9F7AEA',
    small: true,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
  {
    title: 'Deploying to Netlify',
    color: '#ED64A6',
    small: true,
    content: 'Vitae tincidunt convallis arcu pretium amet ut porttitor.',
    url: '',
  },
];

const ReferenceLinkData = [
  {
    category_name: 'Prisma Schema API',
    mainUrl: '',
    icon: <Schema />,
    links: [
      {
        text: 'datasource',
        url: '',
        codeBlock: true,
      },
      {
        text: 'generator',
        url: '',
        codeBlock: true,
      },
      {
        text: 'model',
        url: '',
        codeBlock: true,
      },
    ],
  },
  {
    category_name: 'CLI Commands',
    mainUrl: '',
    icon: <CLI />,
    links: [
      {
        text: 'init',
        url: '',
        codeBlock: true,
      },
      {
        text: 'generate',
        url: '',
        codeBlock: true,
      },
      {
        text: 'introspect',
        url: '',
        codeBlock: true,
      },
    ],
  },
  {
    category_name: 'Database',
    mainUrl: '',
    icon: <DbLink />,
    links: [
      {
        text: 'Features matrix',
        url: '',
        codeBlock: false,
      },
      {
        text: 'Connection URLs',
        url: '',
        codeBlock: false,
      },
      {
        text: 'Supported databases',
        url: '',
        codeBlock: false,
      },
    ],
  },
];

const MoreUsefulLinks = [
  {
    text: `What's new in Prisma docs`,
    url: '',
  },
  {
    text: 'About the docs ',
    url: '',
  },
  {
    text: 'Prisma style guide',
    url: '',
  },
  {
    text: 'Ask a question on Github',
    url: '',
  },
  {
    text: 'Create a bug report',
    url: '',
  },
  {
    text: 'Submit a feature request',
    url: '',
  },
  {
    text: 'Slack',
    url: '',
  },
  {
    text: 'FAQ',
    url: '',
  },
  {
    text: 'Limitations',
    url: '',
  },
  {
    text: 'Community',
    url: '',
  },
  {
    text: 'Roadmap',
    url: '',
  },
  {
    text: 'Releases and maturity levels',
    url: '',
  },
];

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
  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${p => p.theme.space[80]} ${p => p.theme.space[16]};
  }
`;

const NormalPara = styled.p`
  color: #4a5568;
  line-height: 24px;
  margin: 32px 0;
  text-align: center;

  a {
    color: inherit !important;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    .hide-mobile {
      display: none;
    }
  }
`;

const SubHeading = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  margin: 0;
  text-align: center;

  color: #1a202c;
`;

const Space = styled.div<{ height: number }>`
  ${p => `height: ${p.height}px;`};
`;

const ListTitle = styled.h5`
  font-weight: bold;
  line-height: 1rem;
  font-size: 1rem;
  color: #1a202c;
`;

const List = styled.ul<{ split?: boolean }>`
  list-style: none;
  padding: 0;
  margin-left: 1rem;
  list-style-image: url(${listDot});
  ${p =>
    p.split &&
    ` -moz-column-count: 4;
  -moz-column-gap: 2rem;
  -webkit-column-count: 4;
  -webkit-column-gap: 2rem;
  column-count: 4;
  column-gap: 2rem;`}
  li {
    padding-left: 8px;
    ${p =>
      p.split ? 'line-height: 24px; margin-top: 0;' : 'line-height: 1rem; margin-top: 10px;'};

    a {
      color: #2d3748 !important;
      cursor: pointer;
      text-decoration: none;
    }
  }
  .inline-code {
    font-weight: normal;
    line-height: 0;
  }
`;

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
`;

const QuickLinks = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%), #edf2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => p.theme.space[48]} 0;

  @media (min-width: ${p => p.theme.breakpoints.phone}) and (max-width: 1024px) {
    padding: ${p => p.theme.space[48]} ${p => p.theme.space[16]};
  }
`;

const CapTitle = styled.h4<{ withBorder?: boolean }>`
  text-transform: uppercase !important;
  font-weight: bold;
  letter-spacing: 0.02em;
  font-size: 14px;
  ${p =>
    p.withBorder &&
    `    
  border-bottom: 1px solid #CBD5E0;
  width: 100%;
  max-width: 996px;
  padding-bottom: 16px;`}
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
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const LinkCard = styled.div`
  background: #edf2f7;
  border-radius: 8px;
  padding: 0 ${p => p.theme.space[24]};
  width: 100%;
  border-top: 8px solid #edf2f7;
  position: relative;
  flex-grow: 1;
  margin-bottom: 40px;

  .icon {
    position: absolute;
    top: -30px;
  }

  h5 {
    margin-bottom: 0;
  }

  p {
    text-align: left;
    margin: 1rem 0;
  }

  @media (min-width: ${p => p.theme.breakpoints.phone}) and (max-width: 1024px) {
    max-width: 48% !important;
  }
`;

const Homepage = () => (
  <Layout homePage={true}>
    <Summary>
      <h1>Prisma Documentation</h1>
      <NormalPara>
        To get started with Prisma, choose one of our <a>getting started tutorials</a> or explore
        our
        <a>
          {' '}
          ready-to-run <br className="hide-mobile" /> examples on GitHub
        </a>
        . Join our thriving community on <a>Slack</a> and <a>GitHub</a> for help and ideas.
      </NormalPara>
      <SummaryLinks>
        <SpecialButton href="" size={ButtonSize.SMALL} target="_blank">
          <DoubleArrow />
          &nbsp; Quick Start
        </SpecialButton>
        <PrimaryButton
          href=""
          icon=""
          size={ButtonSize.SMALL}
          target="_blank"
          style={{ background: '#2D3748' }}
        >
          Set up Prisma
        </PrimaryButton>
        <PrimaryButton
          href=""
          icon=""
          size={ButtonSize.SMALL}
          target="_blank"
          style={{ background: '#2D3748' }}
        >
          Examples
        </PrimaryButton>
      </SummaryLinks>
    </Summary>
    <QuickLinks>
      <GenaralLinks>
        {GeneralLinkData.map(generalLink => (
          <div>
            {generalLink.icon}
            <CapTitle>{generalLink.category_name}</CapTitle>
            <List>
              {generalLink.links.map(link => (
                <li>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </List>
          </div>
        ))}
      </GenaralLinks>
      <Space height={80} />
      <SubHeading>Guides</SubHeading>
      <NormalPara>
        This section includes end-to-end guides for upgrading and deploying Node.js <br />{' '}
        applications that use Prisma, as well as guides for common database-related tasks.
      </NormalPara>
      <Row>
        {GuideLinkData.map(gLinkData => (
          <LinkCard
            style={{ maxWidth: gLinkData.small ? '274px' : '384px', borderColor: gLinkData.color }}
          >
            <ListTitle>
              {gLinkData.title} &nbsp;
              <a href={gLinkData.url}>
                <ArrowIcon />{' '}
              </a>
            </ListTitle>
            <NormalPara>{gLinkData.content}</NormalPara>
          </LinkCard>
        ))}
      </Row>
      <Space height={80} />
      <SubHeading>Reference</SubHeading>
      <NormalPara>
        Egestas in tincidunt dui, integer at. Ultrices ipsum lectus ornare velit vestibulum.
        <br />
        Porttitor nulla faucibus commodo purus eget. Vitae pretium.
      </NormalPara>
      <Row>
        {ReferenceLinkData.map(rLinkData => (
          <LinkCard style={{ maxWidth: '316px' }}>
            <span className="icon">{rLinkData.icon}</span>
            <Space height={16} />
            <ListTitle>
              {rLinkData.category_name} &nbsp;
              <a href={rLinkData.mainUrl}>
                <ArrowIcon />{' '}
              </a>
            </ListTitle>
            <List>
              {rLinkData.links.map(link => (
                <li>
                  <a href={link.url}>
                    <span className={`${link.codeBlock ? 'inline-code' : ''}`}>{link.text}</span>
                  </a>
                </li>
              ))}
            </List>
          </LinkCard>
        ))}
      </Row>
      <Space height={80} />
      <CapTitle withBorder={true}>More useful resources</CapTitle>
      <Row style={{ marginTop: '0' }}>
        <List split={true}>
          {MoreUsefulLinks.map(uLink => (
            <li>
              <a href={uLink.url}>{uLink.text}</a>
            </li>
          ))}
        </List>
      </Row>
    </QuickLinks>
  </Layout>
);

export default Homepage;
