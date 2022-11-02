import * as React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import background from '../images/home-bg.svg'
import listDot from '../images/list-dot.png'
import { BookOpen, Package, Database, Menu, ArrowRight, ChevronsRight } from 'react-feather'
import { graphql, useStaticQuery, withPrefix } from 'gatsby'

import { PrimaryButton, SpecialButton } from '../components/button'
import Schema from '../icons/home/Schema'
import DbLink from '../icons/home/DbLink'
import CLI from '../icons/home/CLI'
import Link from '../components/link'
import SEO from '../components/seo'

const icons: any = {
  DoubleArrow: <ChevronsRight opacity="0.5" />,
  OverviewIcon: <BookOpen color="#48BB78" />,
  ComponentsIcon: <Package color="#ED64A6" />,
  DatabaseIcon: <Database color="#4299E1" />,
  MoreIcon: <Menu color="#805AD5" />,
  Schema: <Schema />,
  DbLink: <DbLink />,
  CLI: <CLI />,
}

const Summary = styled.div`
  padding: ${(p) => p.theme.space[80]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${background}) center -150px no-repeat;
  h1 {
    font-weight: bold;
    font-family: ${(p) => p.theme.fonts.display};
    font-size: ${(p) => p.theme.fontSizes[56]};
    margin: 0;
    text-align: center;
  }
  p {
    max-width: 800px;
    font-size: ${(p) => p.theme.fontSizes[20]};
    line-height: 1.5;
  }
  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${(p) => p.theme.space[80]} ${(p) => p.theme.space[16]};
    p {
      max-width: 85%;
    }
  }
  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    h1 {
      font-size: ${(p) => p.theme.fontSizes[32]};
    }
    p {
      font-size: ${(p) => p.theme.fontSizes[16]};
    }
  }
`

const NormalPara = styled.p`
  color: ${(p) => p.theme.colors.gray700};
  line-height: ${(p) => p.theme.space[24]};
  margin: ${(p) => p.theme.space[32]} 0;
  text-align: center;
  max-width: 650px;
  width: 100%;

  a {
    color: inherit !important;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    .hide-mobile {
      display: none;
    }
  }
`

const SubHeading = styled.h2`
  font-weight: 600;
  font-size: ${(p) => p.theme.fontSizes[36]};
  line-height: ${(p) => p.theme.space[36]};
  font-family: ${(p) => p.theme.fonts.display};
  margin: 0;
  text-align: center;
  color: ${(p) => p.theme.colors.gray900};
`

const Space = styled.div<{ height: number }>`
  ${(p) => `height: ${p.height}px;`};
`

const ListTitle = styled.h3`
  font-weight: bold;
  line-height: ${(p) => p.theme.space[16]};
  font-size: ${(p) => p.theme.fontSizes[16]};
  color: ${(p) => p.theme.colors.gray900} !important;
  margin: 24px 0 0;

  a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.gray900} !important;
    align-items: center;
    display: flex;
  }

  svg {
    transition: transform 0.3s ease-out 0s;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 1rem;
  list-style-image: url(${listDot});
  li {
    padding-left: 0.5rem;
    line-height: 1rem;
    margin-top: 10px;
    a {
      color: #2d3748 !important;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #718096 !important;
      }
    }
  }
  .inline-code {
    font-weight: normal;
    line-height: 0;
  }
`

const MoreLinksList = styled(List)`
  @media only screen and (max-width: 640px) {
    column-count: 1;
  }
  column-count: 4;
  li {
    line-height: 24px;
    margin-top: 0;
  }
`

const SummaryLinks = styled.div`
  max-width: 435px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  a {
    color: ${(p) => p.theme.colors.white} !important;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  @media (min-width: 0) and (max-width: 420px) {
    flex-direction: column;
    a {
      margin-top: ${(p) => p.theme.space[16]};
    }
  }
`

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${(p) => p.theme.space[48]} ${(p) => p.theme.space[16]};
  }
`

const CapTitle = styled.h4`
  text-transform: uppercase !important;
  font-weight: bold;
  letter-spacing: 0.02em;
  font-size: 14px;
`

const BorderCapTitle = styled(CapTitle)`
  width: 100%;
  max-width: 996px;
`

const GeneralLinks = styled.div`
  background: #ffffff;
  box-shadow: 0px 28px 53px rgba(0, 0, 0, 0.07), 0px 8.44118px 15.9779px rgba(0, 0, 0, 0.0393306),
    0px 3.50603px 6.63642px rgba(0, 0, 0, 0.0238066),
    0px 1.26806px 2.40026px rgba(0, 0, 0, 0.0115598);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  padding: 48px 114px;
  width: 100%;
  @media (min-width: 0) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    flex-direction: column;
    padding: 0;
  }
`

const GeneralLink = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 0) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    flex-direction: row;
    margin-bottom: ${(p) => p.theme.space[32]};
  }
`

const Row = styled.div`
  display: flex;
  max-width: 996px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${(p) => p.theme.space[32]};
  @media (min-width: 0) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    flex-direction: column;
  }
`

const LinkCard = styled(Link)`
  background: ${(p) => p.theme.colors.gray200};
  border-radius: ${(p) => p.theme.radii.medium};
  padding: 0 ${(p) => p.theme.space[24]};
  width: 100%;
  border-top: ${(p) => p.theme.space[8]} solid ${(p) => p.theme.colors.gray200};
  position: relative;
  flex-grow: 1;
  margin-bottom: ${(p) => p.theme.space[40]};
  text-decoration: none;

  .icon {
    position: absolute;
    top: -30px;
  }

  h3 {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  &:hover {
    background: ${(p) => p.theme.colors.gray300};
    h3 svg {
      transform: translateX(4px);
    }
  }

  p {
    text-align: left;
    margin: ${(p) => p.theme.space[16]} 0;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.phone}) and (max-width: 1024px) {
    max-width: 48% !important;
  }

  @media (min-width: 0) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    max-width: 100% !important;
  }
`

const IconHolder = styled.span`
  background: ${(p) => p.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(26, 32, 44, 0.1), 0px 3px 6px rgba(26, 32, 44, 0.05);
  border-radius: 50%;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 0) and (max-width: ${(p) => p.theme.breakpoints.phone}) {
    margin: ${(p) => p.theme.space[16]} ${(p) => p.theme.space[24]};
  }
`

const Homepage = () => {
  const { site } = useStaticQuery(query)
  const {
    siteMetadata: {
      title,
      description,
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
  } = site

  return (
    <Layout homePage={true}>
      <Summary>
        <h1>Prisma Documentation</h1>
        <NormalPara>
          Choose one of our{' '}
          <Link to={SummaryLinkData.gettingStarted}>getting started tutorials</Link> or explore the{' '}
          <Link to={SummaryLinkData.readyToRun}>ready-to-run examples on GitHub</Link>. Join our
          thriving community on <Link to={SummaryLinkData.slack}>Slack</Link> and{' '}
          <Link to={SummaryLinkData.git}>GitHub</Link> for help and ideas.
        </NormalPara>
        <SummaryLinks>
          {SummaryLinkData.buttons.map((slink: any, index: number) =>
            slink.special ? (
              <SpecialButton href={withPrefix(slink.url)} key={index} icon={icons[slink.icon]}>
                &nbsp; {slink.text}
              </SpecialButton>
            ) : (
              <PrimaryButton
                href={slink.url}
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
        <GeneralLinks>
          {GeneralLinkData.map((generalLink: any, index: number) => (
            <GeneralLink>
              <IconHolder>{icons[generalLink.icon]}</IconHolder>
              <div>
                <CapTitle>{generalLink.categoryName}</CapTitle>
                <List>
                  {generalLink.links.map((link: any) => (
                    <li key={index}>
                      <Link to={link.url}>
                        <span className={`${link.codeBlock ? 'inline-code' : ''}`}>
                          {link.text}
                        </span>
                      </Link>
                    </li>
                  ))}
                </List>
              </div>
            </GeneralLink>
          ))}
        </GeneralLinks>
        <Space height={80} />
        <SubHeading>Guides</SubHeading>
        <NormalPara>{GuideText}</NormalPara>
        <Row>
          {GuideLinkData.map((gLinkData: any, index: number) => (
            <LinkCard
              to={gLinkData.url}
              key={index}
              style={{
                maxWidth: gLinkData.small ? '274px' : '384px',
                borderColor: gLinkData.color,
              }}
            >
              <ListTitle>
                {gLinkData.title} &nbsp;
                <ArrowRight color="#A0AEC0" />{' '}
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
                <Link to={rLinkData.mainUrl}>
                  {rLinkData.categoryName} &nbsp;
                  <ArrowRight color="#A0AEC0" />{' '}
                </Link>
              </ListTitle>
              <List>
                {rLinkData.links.map((link: any, index: number) => (
                  <li key={index}>
                    <Link to={link.url}>
                      <span className={`${link.codeBlock ? 'inline-code' : ''}`}>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </List>
            </LinkCard>
          ))}
        </Row>
        <Space height={80} />
        <BorderCapTitle>More useful resources</BorderCapTitle>
        <Row style={{ marginTop: '0' }}>
          <MoreLinksList>
            {MoreUsefulLinks.map((uLink: any, index: number) => (
              <li key={index}>
                <Link to={uLink.url}>
                  <span className={`${uLink.codeBlock ? 'inline-code' : ''}`}>{uLink.text}</span>
                </Link>
              </li>
            ))}
          </MoreLinksList>
        </Row>
      </QuickLinks>
    </Layout>
  )
}

export default Homepage

export const query = graphql`
  query Homepage {
    site {
      siteMetadata {
        title
        description
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
              codeBlock
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
              codeBlock
            }
          }
          MoreUsefulLinks {
            text
            url
            codeBlock
          }
        }
      }
    }
  }
`

export const Head = () => {
  const { site } = useStaticQuery(query)
  const {
    siteMetadata: { title, description },
  } = site
  return <SEO title={title} description={description} homepage />
}
