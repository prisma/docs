import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import styled from 'styled-components';
import * as theme from "../css/primitives"
import siteConfigData from "../../config"
import { Icon } from '../components/Icon';
import { CockroachDB, CockroachDBDark, MariaDB, MariaDBDark, MongoDBSimple, MySQLSimple, Planetscale, PlanetscaleDark, PostgresSQLDark, PostgresSQLSimple, SQLServer, SQLite } from '../components/icons/technologies/index';
import ShadowCard from '../components/shadow-card';

const IconWrapper = styled.div`
width: 64px;
height: 64px;
flex-shrink: 0;
border-radius: 8px;
display: inline-flex;
align-items: center;
justify-content: center;
color: var(--icon-svg-color);
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

export const Body = styled.div`
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol', 'Noto Color Emoji';
font-weight: normal;
font-size: 18px;
letter-spacing: 0em;
line-height: 140%;
`

const TopSection = styled.div`
  padding: 64px 12px;
  background: #f7fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background: var(--homepage-header-bg);
`
const ProductCardsWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

const ProductCard = styled.div<{ color?: string }>`
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 32px;
  width: 100%;
  border-radius: 8px;
  background: var(--${(p) =>
    p.color === 'teal'
      ? 'teal'
      : 'indigo'}-card-bg);
  box-shadow: 0px 18px 42px 0px rgba(23, 43, 77, 0.08), 0px 4px 26px 0px rgba(23, 43, 77, 0.05),
    0px 0px 46px 0px rgba(23, 43, 77, 0.01);
  a,
  button {
    color: var(--${(props) => (props.color === 'teal' ? 'teal' : 'indigo')}-link-color);
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
    color: var(--main-font-color);
    margin-bottom: 40px;
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

const ORMLinkWrapper = styled(Link)`
  display: flex !important;
  gap: 24px;
  text-decoration: none;

  h5 {
    display: inline-block;
    color: var(--main-font-color);
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
    background: var(--icon-wrapper-bg);
  }
  p {
    color: var(--secondary-font-color);
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
  background: var(--orm-card-bg);
  grid-template-rows: auto auto 1fr;
  ${H4} {
    margin-bottom: 8px;
  }
  > p {
    color: var(--secondary-font-color);
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
    color: var(--secondary-font-color);
    margin-bottom: 40px;
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
    background-color: var(--orm-card-bg);
    position: relative;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      border-radius: 8px;
      inset: 0;
      border: 1px solid var(--grid-border-color);
      background-color: transparent;
      cursor: pointer;
    }

    &:hover {
      background-color: var(--main-bgd-color);
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
      color: var(--main-font-color);
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
    icon: <Planetscale />,
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
  background: var(--community-bgd-color);
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
        color: var(--primary-font-color);
      }
      p {
        color: var(--secondary-font-color);
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
        color: var(--primary-font-color);
      }
      ${Body} {
        color: var(--secondary-font-color);
        margin: 0;
      }
      .link {
        color: var(--indigo-link-color);
        font-family: 'Inter';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 88%; /* 15.84px */
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

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  // useEffect(() => {
  //   console.log(siteConfig)
  // }, [siteConfig])
  const { ORMPlatformLinkData, GeneralLinkData, CardLinks, CommunityLinksData } = siteConfigData.homepage
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <TopSection>
          <ProductCardsWrapper>
            {Object.keys(ORMPlatformLinkData).map((e: string) => (
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
                  <Icon icon={generalLink.icon} color="inherit" size="22px" className="light" />
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
            Prisma ORM works seamlessly across most popular databases and service providers. <br /> Refer
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
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}

