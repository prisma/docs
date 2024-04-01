import styled from "styled-components"
import { ProductCard } from "./ProductCards"
import Link from "@docusaurus/Link"

const CardLinks = {
  components: [
    {
      url: 'orm/prisma-schema',
      title: 'Prisma Schema',
    },
    {
      url: 'orm/tools/prisma-cli',
      title: 'Prisma CLI',
    },
    {
      url: 'orm/prisma-client',
      title: 'Prisma Client',
    },
    {
      url: 'orm/tools/prisma-studio',
      title: 'Prisma Studio',
    },
    {
      url: 'orm/prisma-migrate',
      title: 'Prisma Migrate',
    },
  ],
  reference: [
    {
      url: 'orm/reference/prisma-client-reference',
      title: 'Prisma Client API reference',
    },
    {
      url: 'orm/reference/prisma-schema-reference',
      title: 'Prisma schema reference',
    },
    {
      url: 'orm/reference/error-reference',
      title: 'Error message reference',
    },
    {
      url: 'orm/reference/prisma-cli-reference',
      title: 'Prisma CLI reference',
    },
  ],
}

const H4 = styled.h4`
  font-family: 'Barlow';
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 26.4px */
  letter-spacing: -0.48px;
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
export default function ORMCards(): JSX.Element {
  return (
    <ORMCardsSection>
      <ORMCardsWrapper>
        {Object.keys(CardLinks).map((e) => (
          <ORMProductCard color="indigo" style={{ padding: '40px' }}>
            <H4>{e[0].toUpperCase() + e.substring(1).toLowerCase()}</H4>
            <p>Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.</p>
            <div>
              <LinkGrid>
                {CardLinks[e].map((card) => (
                  <Link to={card.url}>{card.title} &#8594;</Link>
                ))}
              </LinkGrid>
            </div>
          </ORMProductCard>
        ))}
      </ORMCardsWrapper>
    </ORMCardsSection>
  )
}
