import { Body, H3, Icon, defaultTheme as theme } from '@prisma/lens/dist/web'
import { useLocation } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Link from '../components/link'
import Search from '../components/search'
import SEO from '../components/seo'
import ShadowCard from '../components/shadow-card'
import SQLServer from '../icons/SQLServer'
import CockroachDB from '../icons/technologies/CockroachDB'
import MariaDB from '../icons/technologies/MariaDB'
import MongoDBSimple from '../icons/technologies/MongoDBSimple'
import MySQLSimple from '../icons/technologies/MySQLSimple'
import PlanetScale from '../icons/technologies/PlanetScale'
import PostgresSQLSimple from '../icons/technologies/PostgresSQLSimple'
import SQLite from '../icons/technologies/SQLite'

const H4 = styled.h4`
  font-family: 'Barlow';
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 26.4px */
  letter-spacing: -0.48px;
`

const TopSection = styled.div`
  padding: 109px 12px 64px;
  background: #f7fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const ProductCard = styled.div<{ color?: string }>`
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 32px;
  width: 100%;
  border-radius: 8px;
  background-color: lightgray 393.862px -90.295px / 169.197% 486.49% no-repeat,
    linear-gradient(142deg, #fff 0.79%, #f4f5ff 100%);
  box-shadow: 0px 18px 42px 0px rgba(23, 43, 77, 0.08), 0px 4px 26px 0px rgba(23, 43, 77, 0.05),
    0px 0px 46px 0px rgba(23, 43, 77, 0.01);
  a {
    color: ${(props) => (props.color === 'teal' ? '#16A394' : '#5A67D8')};
  }
  @media (min-width: 768px) {
    width: calc(50% - 20px);
  }
  ${H3} {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 0 24px 0;
  }
  ${Body} {
    margin-bottom: 16px;
  }
  ${IconWrapper} {
    background: ${(props) => (props.color === 'teal' ? '#16A394' : '#5A67D8')};
  }
`

const ProductCardsWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

const LinkGrid = styled.div`
  display: flex;
  max-width: 338px;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    min-width: calc(50% - 8px);
    white-space: nowrap;
    font-family: 'Inter';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 16px */
    letter-spacing: -0.32px;
    text-decoration: none;
  }
`

const PrismaORMSection = styled.div`
  max-width: 1272px;
  margin: 0 auto;
  padding: 60px 16px 24px;
  h4 {
    color: #2d3748;
    margin-bottom: 40px;
  }
`

const ORMLinkWrapper = styled.a`
  display: flex;
  gap: 24px;
  text-decoration: none;
  h5 {
    display: inline-block;
    color: #2d3748;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 18px */
    margin: 0 0 10px 0;
    letter-spacing: -0.36px;
    font-family: 'Barlow';
    > span {
      font-family: 'Inter';
    }
  }
  > div:last-of-type {
    display: inline-block;
  }
  ${IconWrapper} {
    background: #ebf4ff;
  }
  p {
    color: #4a5568;
    text-overflow: ellipsis;
    font-family: 'Inter';
    margin: 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
  }
`

const ORMLinkContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 100%;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const ORMCardsSection = styled.div`
  max-width: 1262px;
  margin: 0 auto;
  padding: 40px 11px;
`

const ORMCardsWrapper = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const ORMProductCard = styled(ProductCard)`
  padding: 40px;
  grid-template-rows: auto auto 1fr;
  ${H4} {
    margin-bottom: 8px;
  }
  > p {
    color: #4a5568;
    margin: 0 0 24px 0;
    font-family: 'Inter';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
  }
  ${LinkGrid} {
    gap: 8px;
    a {
      min-width: calc(50% - 8px);
      width: fit-content;
      white-space: nowrap;
    }
  }
`

const DatabasesSection = styled.div`
  max-width: 1272px;
  margin: 0 auto;
  padding: 40px 16px;
  @media (min-width: 768px) {
    padding: 24px 16px 108px;
  }
  ${H4} {
    margin-bottom: 24px;
  }
  ${Body} {
    color: #4a5568;
    margin-bottom: 40px;
  }
`

const DatabaseGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 24px;
  @media only screen and (min-width: 940px) {
    display: grid;
    column-gap: 44px;
    grid-template-columns: repeat(4, 1fr);
  }
  a {
    text-decoration: none;
    color: unset;
  }
  .entry {
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
    flex-basis: 21%;
    border-radius: 8px;
    padding: 25px 24px;
    background-color: white;
    position: relative;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      border-radius: 8px;
      inset: 0;
      border: 1px solid #cbd5e0;
      background-color: transparent;
      cursor: pointer;
    }

    &:hover {
      background-color: #f7fafc;
      &::after {
        border: 2px solid #5a67d8;
      }
    }
    @media only screen and (min-width: 940px) {
      padding: 0 24px;
    }
    img {
      max-height: 36px;
    }
    span {
      color: #2d3748;
      letter-spacing: 0.02em;
      text-transform: capitalize;
      font-family: 'Inter';
      font-weight: 600;
      font-size: 24px;
      line-height: 1;
    }
  }
`

const DatabaseData = [
  {
    title: 'PostgreSQL',
    icon: <PostgresSQLSimple />,
  },
  {
    title: 'MySQL',
    icon: <MySQLSimple />,
  },
  {
    title: 'SQL Server',
    icon: <SQLServer />,
  },
  {
    title: 'SQLite',
    icon: <SQLite />,
  },
  {
    title: 'MongoDB',
    icon: <MongoDBSimple />,
  },
  {
    title: 'CockroachDB',
    icon: <CockroachDB />,
  },
  {
    title: 'Planetscale',
    icon: <PlanetScale />,
  },
  {
    title: 'MariaDB',
    icon: <MariaDB />,
  },
]

const CommunitySection = styled.div`
  background: #f7fafc;
  > div {
    padding: 80px 16px;
    margin: 0 auto;
    max-width: 1272px;
    text-align: left;
    a {
      text-decoration: none;
    }
    .section-hero {
      ${H3} {
        margin-top: 0;
        margin-bottom: 24px;
        color: #2d3748;
      }
      p {
        color: #4a5568;
        margin-bottom: 60px;
        margin-top: 0;
      }
    }

    .community-link-wrapper {
      display: grid;
      gap: 16px;
      text-align: left;
      grid-template-columns: 24px 1fr;
      height: 100%;
      text-decoration: none;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 16px;
      }
      h4 {
        margin-bottom: 6px;
        margin-top: 0;
        line-height: 110%;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Barlow';
        color: #1a202c;
      }
      ${Body} {
        color: #4a5568;
        margin: 0;
      }
      .link {
        color: #5a67d8;
        font-family: 'Inter';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 88%; /* 15.84px */
        > span {
          &:first-of-type {
            text-decoration: underline;
          }
          &:last-of-type {
            text-decoration: none;
          }
        }
      }
    }
  }
`

const CommunityLinksRow = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
  }
  @media only screen and (min-width: 940px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: none;
  }
  i {
    margin-top: 4px;
  }
`

const Homepage = () => {
  const { site } = useStaticQuery(query)
  const changeHitsStatus = (status: boolean) => setShowDocsBtn(!status)
  const [showDocsBtn, setShowDocsBtn] = React.useState(true)
  const {
    siteMetadata: {
      title,
      description,
      homepage: {
        SummaryLinkData,
        PrismaORMLinks,
        GeneralLinkData,
        CommunityLinksData,
        GuideText,
        GuideLinkData,
        ReferenceText,
        ReferenceLinkData,
        MoreUsefulLinks,
      },
    },
  } = site
  const location = useLocation()

  return (
    <Layout homePage={true}>
      <TopSection>
        <ProductCardsWrapper>
          {/* <SearchComponent hitsStatus={changeHitsStatus} location={location} /> */}
          <ProductCard color="indigo">
            <H3>
              <IconWrapper>
                <Icon icon="fa-solid fa-database" size="22px" color="white" />
              </IconWrapper>
              Prisma ORM
            </H3>
            <Body>
              Open source Node.js and TypeScript ORM with an intuitive data model, automated
              migrations, type-safety, and auto-completion.
            </Body>
            <LinkGrid>
              <a href="/" type="link">
                Get started &#8594;
              </a>
              <a href="/" type="link">
                Example projects &#8594;
              </a>
            </LinkGrid>
          </ProductCard>
          <ProductCard color="teal">
            <H3>
              <IconWrapper>
                <Icon icon="fa-solid fa-triangle" size="22px" color="white" />
              </IconWrapper>
              Prisma Data Platform
            </H3>
            <Body>
              An ecosystem of tools to empower teams to easily create and launch data-heavy,
              global-first software.
            </Body>
            <LinkGrid>
              <a href="/" type="link" color="teal">
                Accelerate &#8594;
              </a>
              <a href="/" type="link" color="teal">
                Cloud Projects &#8594;
              </a>
              <a href="/" type="link" color="teal">
                Pulse &#8594;
              </a>
              <a href="/" type="link" color="teal">
                Classic Projects &#8594;
              </a>
            </LinkGrid>
          </ProductCard>
        </ProductCardsWrapper>
      </TopSection>
      <PrismaORMSection>
        <H4>Prisma ORM</H4>
        <ORMLinkContainer>
          {GeneralLinkData.map((generalLink: any, index: number) => (
            <ORMLinkWrapper key={index} href={generalLink.url}>
              <IconWrapper>
                <Icon icon={generalLink.icon} color="#5A67D8" size="22px" />
              </IconWrapper>
              <div>
                <h5>
                  {generalLink.title} <span>&#8594;</span>
                </h5>
                <p>{generalLink.description}</p>
              </div>
            </ORMLinkWrapper>
          ))}
        </ORMLinkContainer>
      </PrismaORMSection>
      <ORMCardsSection>
        <ORMCardsWrapper>
          <ORMProductCard color="indigo" style={{ padding: '40px' }}>
            <H4>Components</H4>
            <p>
              Open source Node.js and TypeScript ORM with an intuitive data model, automated
              migrations, type-safety, and auto-completion.
            </p>
            <LinkGrid>
              <a href="">Prisma schema &#8594;</a>
              <a href="">Prisma CLI &#8594;</a>
              <a href="">Prisma Client &#8594;</a>
              <a href="">Prisma Studio &#8594;</a>
              <a href="">Prisma Migrate &#8594;</a>
            </LinkGrid>
          </ORMProductCard>

          <ORMProductCard color="indigo" style={{ padding: '40px' }}>
            <H4>Reference</H4>
            <p>
              Open source Node.js and TypeScript ORM with an intuitive data model, automated
              migrations, type-safety, and auto-completion.
            </p>
            <LinkGrid>
              <a href="">Prisma Client API reference &#8594;</a>
              <a href="">Prisma schema reference &#8594;</a>
              <a href="">Error message reference &#8594;</a>
              <a href="">Prisma CLI reference &#8594;</a>
            </LinkGrid>
          </ORMProductCard>
        </ORMCardsWrapper>
      </ORMCardsSection>
      <DatabasesSection>
        <H4>Databases</H4>
        <Body>
          Prisma works seamlessly across most popular databases and service providers. <br /> Refer
          to our Database features matrix for information about supported features and types for
          each database.
        </Body>
        <DatabaseGrid>
          {DatabaseData.map((e: any) => (
            <a href="/docs/concepts/database-connectors/postgresql">
              <div className="entry">
                {e.icon}
                <span>{e.title}</span>
              </div>
            </a>
          ))}
        </DatabaseGrid>
      </DatabasesSection>
      <CommunitySection>
        <div>
          <div className="section-hero">
            <H3>Join our Community</H3>
            <p>
              We have multiple channels where you can get help from members of our community as well
              as the Prisma team.
            </p>
          </div>
          <CommunityLinksRow>
            {CommunityLinksData.map((comm: any) => (
              <ShadowCard key={comm.id}>
                <a
                  className="community-link-wrapper content"
                  href={comm.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon icon={comm.icon} color={theme.colors.indigo[600]} size="22px" />
                  <div>
                    <div>
                      <h4>{comm.title}</h4>
                      <Body>{comm.description}</Body>
                    </div>
                    <div className="link">
                      <span>{comm.linkText}</span>
                      <span> &#8599;</span>
                    </div>
                  </div>
                </a>
              </ShadowCard>
            ))}
          </CommunityLinksRow>
        </div>
      </CommunitySection>
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
            title
            description
            url
            icon
          }
          CommunityLinksData {
            id
            title
            description
            icon
            link
            linkText
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
