import { graphql, useStaticQuery, withPrefix } from 'gatsby'
import * as React from 'react'
import { ArrowRight, ChevronsRight } from 'react-feather'
import styled from 'styled-components'

import { PrimaryButton, SpecialButton } from '../components/button'
import Layout from '../components/layout'
import Link from '../components/link'
import SEO from '../components/seo'
import CLI from '../icons/home/CLI'
import DbLink from '../icons/home/DbLink'
import Schema from '../icons/home/Schema'
import background from '../images/home-bg.svg'
import listDot from '../images/list-dot.png'

const icons: any = {
  DoubleArrow: <ChevronsRight opacity="0.5" />,
  OverviewIcon: (
    <svg viewBox="0 0 576 512" color="#5A67D8" style={{ width: '28px', height: '28px' }}>
      <path
        fill="currentColor"
        d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"
      ></path>
    </svg>
  ),
  ComponentsIcon: (
    <svg viewBox="0 0 448 512" color="#5A67D8" style={{ width: '28px', height: '28px' }}>
      <path
        fill="currentColor"
        d="M342.4 80H248v80H388.4L357 89.5c-2.6-5.8-8.3-9.5-14.6-9.5zM400 208H48V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V208zM59.6 160H200V80H105.6c-6.3 0-12.1 3.7-14.6 9.5L59.6 160zM342.4 32c25.3 0 48.2 14.9 58.5 38l41.6 93.6c3.6 8.2 5.5 17 5.5 26V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V189.6c0-9 1.9-17.8 5.5-26L47.1 70c10.3-23.1 33.2-38 58.5-38H342.4z"
      ></path>
    </svg>
  ),
  DatabaseIcon: (
    <svg viewBox="0 0 448 512" color="#5A67D8" style={{ width: '28px', height: '28px' }}>
      <path
        fill="currentColor"
        d="M400 86v88.7c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 203 269.5 208 224 208s-87.3-5-121.2-13.4C79.6 188.9 61.3 182 48 174.7V86l.6-.5C53.9 81 64.5 74.8 81.8 68.6C115.9 56.5 166.2 48 224 48s108.1 8.5 142.2 20.6c17.3 6.2 27.8 12.4 33.2 16.9l.6 .5zm0 141.5v75.2c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 331 269.5 336 224 336s-87.3-5-121.2-13.4C79.6 316.9 61.3 310 48 302.7V227.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 250.6 175.2 256 224 256s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7zM48 426V355.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 378.6 175.2 384 224 384s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7V426l-.6 .5c-5.3 4.5-15.9 10.7-33.2 16.9C332.1 455.5 281.8 464 224 464s-108.1-8.5-142.2-20.6c-17.3-6.2-27.8-12.4-33.2-16.9L48 426zm354.1-2.1s0 .1-.2 .2l.1-.2 0-.1zm-356.1 0a.3 .3 0 1 0 .6-.2 .3 .3 0 1 0 -.6 .2zm0-335.8a.3 .3 0 1 0 .5 .2 .3 .3 0 1 0 -.5-.2zm356-.2a.3 .3 0 1 0 -.1 .6 .3 .3 0 1 0 .1-.6zM448 432V80C448 35.8 347.7 0 224 0S0 35.8 0 80V432c0 44.2 100.3 80 224 80s224-35.8 224-80z"
      ></path>
    </svg>
  ),
  MoreIcon: (
    <svg viewBox="0 0 448 512" color="#5A67D8" style={{ width: '28px', height: '28px' }}>
      <path
        fill="currentColor"
        d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"
      ></path>
    </svg>
  ),
  Schema: <Schema />,
  DbLink: <DbLink />,
  CLI: <CLI />,
}

const Summary = styled.div`
  padding: ${theme.space[80]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${background}) center -150px no-repeat;
  h1 {
    margin: 0;
    font-family: 'Barlow', sans-serif;
    font-weight: bold;
    font-size: 64px;
    letter-spacing: -0.02em;
    line-height: 110%;
    text-align: center;
  }
  p {
    max-width: 800px;
    font-size: ${theme.fontSizes[20]};
    line-height: 1.5;
  }
  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${theme.space[80]} ${theme.space[16]};
    h1 {
      font-size: 40px;
    }
    p {
      max-width: 85%;
    }
  }
  @media (max-width: ${theme.breakpoints.tabletVertical}) {
    p {
      font-size: ${theme.fontSizes[16]};
    }
  }
`

const NormalPara = styled.p`
  color: ${theme.colors.gray[700]};
  line-height: ${theme.space[24]};
  margin: ${theme.space[32]} 0;
  text-align: center;
  max-width: 650px;
  width: 100%;

  a {
    color: inherit !important;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: ${theme.breakpoints.tabletVertical}) {
    .hide-mobile {
      display: none;
    }
  }
`

const SubHeading = styled.h2`
  font-weight: 600;
  font-size: ${theme.fontSizes[36]};
  font-family: ${theme.fonts.display};
  margin: 0;
  text-align: center;
  color: ${theme.colors.gray[900]};
`

const Space = styled.div<{ height: number }>`
  ${(p) => `height: ${p.height}px;`};
`

const ListTitle = styled.h3`
  font-weight: bold;
  line-height: ${theme.space[16]};
  font-size: ${theme.fontSizes[16]};
  color: ${theme.colors.gray[900]} !important;
  margin: 24px 0 0;

  a {
    text-decoration: none;
    color: ${theme.colors.gray[900]} !important;
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
  column-count: 1;
  @media (min-width: 400px) {
    column-count: 2;
  }
  @media (min-width: ${theme.breakpoints.desktopSmall}px) {
    column-count: 3;
  }
  @media (min-width: ${theme.breakpoints.tabletHorizontal}px) {
    column-count: 4;
  }
  gap: 2rem;
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
    color: ${theme.colors.white} !important;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  @media (min-width: 0) and (max-width: 420px) {
    flex-direction: column;
    gap: 1rem;
    a {
      width: max-content;
      margin: 0 auto;
    }
  }
`

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 0) and (max-width: 1024px) {
    padding: ${theme.space[48]} ${theme.space[16]};
  }
`

const CapTitle = styled.h4`
  text-transform: uppercase !important;
  font-weight: bold;
  letter-spacing: 0.02em;
  font-size: 14px;
  margin: revert;
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
  display: grid;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  row-gap: 2rem;
  padding: 32px 48px;
  h4 {
    margin-bottom: 0;
    margin-top: 0;
  }
  @media (min-width: ${theme.breakpoints.tabletVertical}px) {
    padding: 48px 92px;
    flex-direction: row;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    column-gap: 2rem;
  }
  @media (min-width: ${theme.breakpoints.desktopSmall}px) {
    padding: 32px 48px;
  }
  @media (min-width: ${theme.breakpoints.tabletHorizontal}px) {
    grid-template-columns: repeat(4, 25%);
    padding: 48px 92px;
    grid-template-rows: unset;
    h4 {
      margin-top: revert;
    }
  }
`

const GeneralLink = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 0) and (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    margin-bottom: ${theme.space[32]};
  }
  > div {
    display: flex;
    gap: 1rem;
    align-items: center;
    @media (min-width: ${theme.breakpoints.tabletHorizontal}px) {
      display: block;
    }
  }
`

const Row = styled.div`
  display: flex;
  max-width: 996px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${theme.space[32]};
  @media (min-width: 0) and (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const LinkCard = styled(Link)<{ maxWidth?: string }>`
  background: ${theme.colors.gray[200]};
  border-radius: ${theme.radii.medium};
  padding: 0 ${theme.space[24]};
  width: 100%;
  border-top: ${theme.space[8]} solid ${theme.colors.gray[200]};
  position: relative;
  flex-grow: 1;
  margin-bottom: ${theme.space[40]};
  text-decoration: none;
  max-width: ${(props) => props.maxWidth};

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
    background: ${theme.colors.gray[300]};
    h3 svg {
      transform: translateX(4px);
    }
  }

  p {
    text-align: left;
    margin: ${theme.space[16]} 0;
  }

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: 1024px) {
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : '48%')};
  }

  @media (min-width: 0) and (max-width: ${theme.breakpoints.mobile}) {
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : '100%')};
  }
`

const ReferenceRow = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  width: 100%;
  gap: 48px;
  margin-top: 32px;
  @media (min-width: ${theme.breakpoints.tabletVertical}px) {
    max-width: 996px;
    grid-template-rows: unset;
    gap: 32px;
    grid-template-columns: repeat(3, 1fr);
    ${LinkCard} {
      max-width: 316px;
    }
  }
  ${LinkCard} {
    max-width: 100%;
    margin-bottom: 0;
  }
`

const GuideLinkRow = styled(Row)`
  justify-content: center;
  gap: 2rem;
  ${LinkCard} {
    margin-bottom: 0;
    @media (max-width: 620px) {
      max-width: 100%;
    }
  }
`

const IconHolder = styled.span`
  background: ${theme.colors.indigo[100]};
  border-radius: 8px;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
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
          <Link to={SummaryLinkData.gettingStarted}>getting started tutorials</Link> or explore our{' '}
          <Link to={SummaryLinkData.readyToRun}>ready-to-run examples</Link>. Join our thriving
          community on <Link to={SummaryLinkData.slack}>Slack</Link>,{' '}
          <Link to={SummaryLinkData.discord}>Discord</Link> and{' '}
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
              <div>
                <IconHolder>{icons[generalLink.icon]}</IconHolder>
                <CapTitle>{generalLink.categoryName}</CapTitle>
              </div>
              <List>
                {generalLink.links.map((link: any) => (
                  <li key={index}>
                    <Link to={link.url}>
                      <span className={`${link.codeBlock ? 'inline-code' : ''}`}>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </List>
            </GeneralLink>
          ))}
        </GeneralLinks>
        <Space height={80} />
        <SubHeading>Guides</SubHeading>
        <NormalPara>{GuideText}</NormalPara>
        <GuideLinkRow>
          {GuideLinkData.map((gLinkData: any, index: number) => (
            <LinkCard
              to={gLinkData.url}
              key={index}
              maxWidth={gLinkData.small ? '274px' : '384px'}
              style={{
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
        </GuideLinkRow>
        <Space height={80} />
        <SubHeading>Reference</SubHeading>
        <NormalPara>{ReferenceText}</NormalPara>
        <ReferenceRow>
          {ReferenceLinkData.map((rLinkData: any, index: number) => (
            <LinkCard key={index}>
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
        </ReferenceRow>
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
            discord
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
