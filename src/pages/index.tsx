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
import { graphql, useStaticQuery } from 'gatsby';

const icons: any = {
  DoubleArrow: <DoubleArrow />,
  OverviewIcon: <OverviewIcon />,
  ComponentsIcon: <ComponentsIcon />,
  DatabaseIcon: <DatabaseIcon />,
  MoreIcon: <MoreIcon />,
  Schema: <Schema />,
  DbLink: <DbLink />,
  CLI: <CLI />,
};

const Summary = styled.div`
  padding: ${p => p.theme.space[80]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${background}) center -150px no-repeat;
  h1 {
    font-weight: bold;
    font-family: ${p => p.theme.fonts.display};
    font-size: ${p => p.theme.fontSizes[32]};
    margin: 0;
  }
  p {
    max-width: 100%;
  }
  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${p => p.theme.space[80]} ${p => p.theme.space[16]};
  }
`;

const NormalPara = styled.p`
  color: ${p => p.theme.colors.gray700};
  line-height: ${p => p.theme.space[24]};
  margin: ${p => p.theme.space[32]} 0;
  text-align: center;
  max-width: 650px;
  width: 100%;

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
  font-size: ${p => p.theme.fontSizes[24]};
  line-height: ${p => p.theme.space[24]};
  margin: 0;
  text-align: center;

  color: ${p => p.theme.colors.gray900};
`;

const Space = styled.div<{ height: number }>`
  ${p => `height: ${p.height}px;`};
`;

const ListTitle = styled.h5`
  font-weight: bold;
  line-height: ${p => p.theme.space[16]};
  font-size: ${p => p.theme.fontSizes[16]};
  color: ${p => p.theme.colors.gray900};
`;

const List = styled.ul<{ split?: boolean }>`
  list-style: none;
  padding: 0;
  margin-left: ${p => p.theme.space[16]};
  list-style-image: url(${listDot});
  ${p =>
    p.split &&
    ` -moz-column-count: 4;
  -moz-column-gap: ${(p: any) => p.theme.space[32]};
  -webkit-column-count: 4;
  -webkit-column-gap: ${(p: any) => p.theme.space[32]};
  column-count: 4;
  column-gap: ${(p: any) => p.theme.space[32]};`}
  li {
    padding-left: ${p => p.theme.space[8]};
    ${p =>
      p.split ? 'line-height: 24px; margin-top: 0;' : 'line-height: 1rem; margin-top: 10px;'};

    a {
      color: ${p => p.theme.colors.gray800} !important;
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
    color: ${p => p.theme.colors.white} !important;
    font-weight: bold;
  }
  @media (min-width: 0) and (max-width: 420px) {
    flex-direction: column;
    a {
      margin-top: ${p => p.theme.space[16]};
    }
  }
`;

const QuickLinks = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${p => p.theme.colors.white} 100%),
    ${p => p.theme.colors.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => p.theme.space[48]} 0;

  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${p => p.theme.space[48]} ${p => p.theme.space[16]};
  }
`;

const CapTitle = styled.h4<{ withBorder?: boolean }>`
  text-transform: uppercase !important;
  font-weight: bold;
  letter-spacing: 0.02em;
  font-size: ${p => p.theme.fontSizes[14]};
  ${p =>
    p.withBorder &&
    `
  border-bottom: 1px solid ${(p: any) => p.theme.colors.gray400};
  width: 100%;
  max-width: 996px;
  padding-bottom: ${(p: any) => p.theme.space[16]};`}
`;

const GenaralLinks = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 996px;
  width: 100%;
  svg {
    margin-left: -6px;
  }
  @media (min-width: 0) and (max-width: ${p => p.theme.breakpoints.phone}) {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  max-width: 996px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${p => p.theme.space[32]};
`;

const LinkCard = styled.div`
  background: ${p => p.theme.colors.gray200};
  border-radius: ${p => p.theme.radii.medium};
  padding: 0 ${p => p.theme.space[24]};
  width: 100%;
  border-top: ${p => p.theme.space[8]} solid ${p => p.theme.colors.gray200};
  position: relative;
  flex-grow: 1;
  margin-bottom: ${p => p.theme.space[40]};

  .icon {
    position: absolute;
    top: -30px;
  }

  h5 {
    margin-bottom: 0;
  }

  p {
    text-align: left;
    margin: ${p => p.theme.space[16]} 0;
  }

  @media (min-width: ${p => p.theme.breakpoints.phone}) and (max-width: 1024px) {
    max-width: 48% !important;
  }

  @media (min-width: 0) and (max-width: ${p => p.theme.breakpoints.phone}) {
    max-width: 100% !important;
  }
`;

const Homepage = () => {
  const { site } = useStaticQuery(query);
  const {
    siteMetadata: {
      homepage: {
        SummaryLinkData,
        GeneralLinkData,
        GuideText,
        GuideLinkData,
        ReferenceText,
        ReferenceLinkData,
        MoreUsefulLinks,
      },
    },
  } = site;

  console.log(site.siteMetadata.homepage);

  return (
    <Layout homePage={true}>
      <Summary>
        <h1>Prisma Documentation</h1>
        <NormalPara>
          To get started with Prisma, choose one of our{' '}
          <a href={SummaryLinkData.gettingStarted}>getting started tutorials</a> or explore our
          <a href={SummaryLinkData.readyToRun}>
            {' '}
            ready-to-run <br className="hide-mobile" /> examples on GitHub
          </a>
          . Join our thriving community on <a href={SummaryLinkData.slack}>Slack</a> and{' '}
          <a href={SummaryLinkData.git}>GitHub</a> for help and ideas.
        </NormalPara>
        <SummaryLinks>
          {SummaryLinkData.buttons.map((slink: any, index: number) =>
            slink.special ? (
              <SpecialButton href={slink.url} size={ButtonSize.SMALL} target="_blank" key={index}>
                {icons[slink.icon]}
                &nbsp; {slink.text}
              </SpecialButton>
            ) : (
              <PrimaryButton
                href={slink.url}
                size={ButtonSize.SMALL}
                target="_blank"
                style={{ background: '#2D3748' }}
                key={index}
              >
                {slink.text}
              </PrimaryButton>
            )
          )}
        </SummaryLinks>
      </Summary>
      <QuickLinks>
        <GenaralLinks>
          {GeneralLinkData.map((generalLink: any, index: number) => (
            <div>
              {icons[generalLink.icon]}
              <CapTitle>{generalLink.category_name}</CapTitle>
              <List>
                {generalLink.links.map((link: any) => (
                  <li key={index}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </List>
            </div>
          ))}
        </GenaralLinks>
        <Space height={80} />
        <SubHeading>Guides</SubHeading>
        <NormalPara>{GuideText}</NormalPara>
        <Row>
          {GuideLinkData.map((gLinkData: any, index: number) => (
            <LinkCard
              key={index}
              style={{
                maxWidth: gLinkData.small ? '274px' : '384px',
                borderColor: gLinkData.color,
              }}
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
        <NormalPara>{ReferenceText}</NormalPara>
        <Row>
          {ReferenceLinkData.map((rLinkData: any, index: number) => (
            <LinkCard style={{ maxWidth: '316px' }} key={index}>
              <span className="icon">{icons[rLinkData.icon]}</span>
              <Space height={16} />
              <ListTitle>
                {rLinkData.category_name} &nbsp;
                <a href={rLinkData.mainUrl}>
                  <ArrowIcon />{' '}
                </a>
              </ListTitle>
              <List>
                {rLinkData.links.map((link: any, index: number) => (
                  <li key={index}>
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
            {MoreUsefulLinks.map((uLink: any, index: number) => (
              <li key={index}>
                <a href={uLink.url}>{uLink.text}</a>
              </li>
            ))}
          </List>
        </Row>
      </QuickLinks>
    </Layout>
  );
};

export default Homepage;

const query = graphql`
  query Homepage {
    site {
      siteMetadata {
        homepage {
          SummaryLinkData {
            gettingStarted
            readyToRun
            slack
            git
            buttons {
              text
              url
              special
              icon
            }
          }
          GeneralLinkData {
            categoryName
            icon
            links {
              url
              text
            }
          }
          GuideText
          GuideLinkData {
            title
            color
            small
            content
            url
          }
          ReferenceText
          ReferenceLinkData {
            categoryName
            mainUrl
            icon
            links {
              url
              text
            }
          }
          MoreUsefulLinks {
            text
            url
          }
        }
      }
    }
  }
`;
