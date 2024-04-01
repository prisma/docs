import styled from "styled-components"
import Link from "@docusaurus/Link";

const DatabaseData = [
  {
    title: 'PostgreSQL',
    icon: "postgresqlsimple",
    darkIcon: "postgresqldark",
    url: 'orm/overview/databases/postgresql',
  },
  {
    title: 'MySQL',
    icon: "mysqlsimple",
    darkIcon: "mysqlsimple",
    url: 'orm/overview/databases/mysql',
  },
  {
    title: 'SQL Server',
    icon: "sqlserver",
    darkIcon: "sqlserver",
    url: 'orm/overview/databases/sql-server',
  },
  {
    title: 'SQLite',
    icon: "sqlite",
    darkIcon: "sqlite",
    url: 'orm/overview/databases/sqlite',
  },
  {
    title: 'MongoDB',
    icon: "mongodbsimple",
    darkIcon: "mongodbsimple",
    url: 'orm/overview/databases/mongodb',
  },
  {
    title: 'CockroachDB',
    icon: "cockroachdb",
    darkIcon: "cockroachdbdark",
    url: 'orm/overview/databases/cockroachdb',
  },
  {
    title: 'Planetscale',
    icon: "planetscale",
    darkIcon: "planetscaledark",
    url: 'orm/overview/databases/planetscale',
  },
  {
    title: 'MariaDB',
    icon: "mariadb",
    darkIcon: "mariadbdark",
    url: 'orm/overview/databases/mysql',
  },
]

const H4 = styled.h4`
  font-family: 'Barlow';
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 26.4px */
  letter-spacing: -0.48px;
`

const Body = styled.div`
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol', 'Noto Color Emoji';
font-weight: normal;
font-size: 18px;
letter-spacing: 0em;
line-height: 140%;
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
      margin: auto 0;
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
export default function ORMCards(): JSX.Element {
  return (
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
              <img src={`/img/technologies/${e.icon}.svg`} {...{
                style: {
                  height: `100%`,
                  width: e.icon === "sqlite" ? `55px` : `auto`,
                  marginRight: e.icon === "sqlite" ? `-30px` : 0,
                }
              }} />
              <span>{e.title}</span>
            </div>
          </Link>
        ))}
      </DatabaseGrid>
    </DatabasesSection>
  )
}
