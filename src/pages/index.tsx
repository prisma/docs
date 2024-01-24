import * as React from 'react'
import styled from 'styled-components'

import { Icon } from '../components/Icon'
// import Layout from '../components/layout'
import Layout from '@theme/Layout'
import Link from '../components/link'
import SEO from '../components/seo'
import ShadowCard from '../components/shadow-card'
import CockroachDB from '../icons/technologies/CockroachDB'
import CockroachDBDark from '../icons/technologies/CockroachDBDark'
import MariaDB from '../icons/technologies/MariaDB'
import MariaDBDark from '../icons/technologies/MariaDBDark'
import MongoDBSimple from '../icons/technologies/MongoDBSimple'
import MySQLSimple from '../icons/technologies/MySQLSimple'
import PlanetScale from '../icons/technologies/PlanetScale'
import PlanetscaleDark from '../icons/technologies/PlanetscaleDark'
import PostgresSQLDark from '../icons/technologies/PostgresSQLDark'
import PostgresSQLSimple from '../icons/technologies/PostgresSQLSimple'
import SQLite from '../icons/technologies/SQLite'
import SQLServer from '../icons/technologies/SQLServer'
import { defaultTheme as theme } from '../themes'
import siteConfig from '../../config'

export const Body = styled.div`
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0em;
  line-height: 140%;
`

export const H3 = styled.h3`
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: -0.02em;
  line-height: 110%;
  @media (min-width: 940px) {
    font-size: 36px;
  }
`

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

  @media (prefers-color-scheme: dark) {
    background: #242c3a;
  }
`

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  .dark {
    display: none;
  }

  .light {
    display: block;
  }
  @media (prefers-color-scheme: dark) {
    .dark {
      display: block;
    }

    .light {
      display: none;
    }
  }
`

const ProductCard = styled.div<{ color?: string }>`
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 32px;
  width: 100%;
  border-radius: 8px;
  background: ${(p) =>
    p.color === 'teal'
      ? 'linear-gradient(102.41deg, #FFFFFF 6.22%, #E8FFFD 87.23%)'
      : 'linear-gradient(102.41deg, #FFFFFF 6.22%, #F4F5FF 87.23%)'};
  box-shadow: 0px 18px 42px 0px rgba(23, 43, 77, 0.08), 0px 4px 26px 0px rgba(23, 43, 77, 0.05),
    0px 0px 46px 0px rgba(23, 43, 77, 0.01);
  a,
  button {
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

  @media (prefers-color-scheme: dark) {
    a,
    button {
      color: ${(props) =>
    props.color === 'teal' ? `${theme.colors.teal[400]}` : `${theme.colors.indigo[400]}`};
    }
    background: ${(p) =>
    p.color === 'teal'
      ? `linear-gradient(287.43deg, rgba(4, 200, 187, 0.17) -34.29%, rgba(4, 200, 187, 0) 98.22%),linear-gradient(99.45deg, #1A202C -40.85%, #27303E 91.67%)`
      : `linear-gradient(283.66deg, rgba(102, 126, 234, 0.2418) -32.46%, rgba(102, 126, 234, 0) 96.55%), linear-gradient(99.45deg, #1A202C -40.85%, #27303E 91.67%)`};
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
  a,
  button {
    min-width: calc(50% - 8px);
    white-space: nowrap;
    font-family: 'Inter';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 16px */
    letter-spacing: -0.32px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  svg {
    display: none;
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
  @media (prefers-color-scheme: dark) {
    h4 {
      color: ${theme.colors.gray[100]};
    }
  }
`

const ORMLinkWrapper = styled(Link)`
  display: flex !important;
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
  &:hover h5 {
    text-decoration: underline;
  }
  @media (prefers-color-scheme: dark) {
    h5 {
      color: ${theme.colors.gray[100]};
    }
    p {
      color: ${theme.colors.gray[400]};
    }
    ${IconWrapper} {
      background: ${theme.colors.indigo[600]};
    }
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
  background: #ffffff;
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
    gap: 12px;
    a {
      min-width: calc(50% - 8px);
      width: fit-content;
      white-space: nowrap;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[800]};
    > p {
      color: ${theme.colors.gray[400]};
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
  @media (prefers-color-scheme: dark) {
    ${Body} {
      color: ${theme.colors.gray[400]};
    }
  }
`

const DatabaseGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 24px;
  @media only screen and (min-width: 1024px) {
    display: grid;
    column-gap: 44px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 940px) and (max-width: 1024px) {
    display: grid;
    column-gap: 44px;
    grid-template-columns: repeat(3, 1fr);
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
      text-transform: capitalize;
      font-family: 'Inter';
      font-weight: 600;
      font-size: 24px;
      line-height: 1;
    }
  }

  .dark {
    display: none;
  }

  .light {
    display: flex;
  }

  @media (prefers-color-scheme: dark) {
    .dark {
      display: flex;
    }

    .light {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    .entry {
      background: transparent;
      &::after {
        border-color: ${theme.colors.gray[700]};
      }
      &:hover {
        background-color: transparent;
      }
      span {
        color: ${theme.colors.gray[300]};
      }
    }
  }
`

const DatabaseData = [
  {
    title: 'PostgreSQL',
    icon: <PostgresSQLSimple />,
    darkIcon: <PostgresSQLDark />,
    url: 'orm/overview/databases/postgresql',
  },
  {
    title: 'MySQL',
    icon: <MySQLSimple />,
    darkIcon: <MySQLSimple />,
    url: 'orm/overview/databases/mysql',
  },
  {
    title: 'SQL Server',
    icon: <SQLServer />,
    darkIcon: <img src="/docs/tech/sqlserver.svg" />,
    url: 'orm/overview/databases/sql-server',
  },
  {
    title: 'SQLite',
    icon: <SQLite />,
    darkIcon: <SQLite />,
    url: 'orm/overview/databases/sqlite',
  },
  {
    title: 'MongoDB',
    icon: <MongoDBSimple />,
    darkIcon: <MongoDBSimple />,
    url: 'orm/overview/databases/mongodb',
  },
  {
    title: 'CockroachDB',
    icon: <CockroachDB />,
    darkIcon: <CockroachDBDark />,
    url: 'orm/overview/databases/cockroachdb',
  },
  {
    title: 'Planetscale',
    icon: <PlanetScale />,
    darkIcon: <PlanetscaleDark />,
    url: 'orm/overview/databases/planetscale',
  },
  {
    title: 'MariaDB',
    icon: <MariaDB />,
    darkIcon: <MariaDBDark />,
    url: 'orm/overview/databases/mysql',
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
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[800]};
    > div {
      .community-link-wrapper {
        h4 {
          color: ${theme.colors.gray[100]};
        }
        ${Body} {
          color: ${theme.colors.gray[400]};
        }
        .link {
          color: ${theme.colors.indigo[400]};
        }
      }
      .section-hero {
        ${H3} {
          color: ${theme.colors.gray[100]};
        }
        p {
          color: ${theme.colors.gray[400]};
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
  const {
    homepage: { GeneralLinkData, CommunityLinksData, CardLinks, ORMPlatformLinkData },
  } = siteConfig

  return (
    <Layout>
      <TopSection>
        <ProductCardsWrapper>
          {(Object.keys(ORMPlatformLinkData) as Array<keyof typeof ORMPlatformLinkData>).map((e) => (
            <ProductCard color={e === 'porm' ? 'indigo' : 'teal'}>
              <H3>
                <IconWrapper>
                  <Icon
                    icon={`fa-solid fa-${ORMPlatformLinkData[e].icon}`}
                    size="22px"
                    color="white"
                  />
                </IconWrapper>
                {ORMPlatformLinkData[e].title}
              </H3>
              <Body>{ORMPlatformLinkData[e].description}</Body>
              <LinkGrid>
                {ORMPlatformLinkData[e].links.map((e: any) => (
                  <Link to={e.url}>
                    {e.title} {e.external ? <>&#8599;</> : <>&#8594;</>}
                  </Link>
                ))}
              </LinkGrid>
            </ProductCard>
          ))}
        </ProductCardsWrapper>
      </TopSection>
      <PrismaORMSection>
        <H4>Prisma ORM</H4>
        <ORMLinkContainer>
          {GeneralLinkData.map((generalLink: any, index: number) => (
            <ORMLinkWrapper key={index} to={generalLink.url}>
              <IconWrapper>
                <Icon icon={generalLink.icon} color="#5A67D8" size="22px" className="light" />
                <Icon
                  icon={generalLink.icon}
                  color={theme.colors.gray[100]}
                  size="22px"
                  className="dark"
                />
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
            <div>
              <LinkGrid>
                {CardLinks.components.map((card: any) => (
                  <Link to={card.url}>{card.title} &#8594;</Link>
                ))}
              </LinkGrid>
            </div>
          </ORMProductCard>

          <ORMProductCard color="indigo" style={{ padding: '40px' }}>
            <H4>Reference</H4>
            <p>
              Open source Node.js and TypeScript ORM with an intuitive data model, automated
              migrations, type-safety, and auto-completion.
            </p>
            <div>
              <LinkGrid>
                {CardLinks.reference.map((card: any) => (
                  <Link to={card.url}>{card.title} &#8594;</Link>
                ))}
              </LinkGrid>
            </div>
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
            <Link to={e.url}>
              <div className="entry light">
                {e.icon}
                <span>{e.title}</span>
              </div>
              <div className="entry dark">
                {e.darkIcon}
                <span>{e.title}</span>
              </div>
            </Link>
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

export const Head = () => {
  const {
    siteMetadata: { title, description },
  } = siteConfig
  return <SEO title={title} description={description} homepage />
}
