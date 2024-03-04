import Link from "@docusaurus/Link";
import styled from "styled-components";
import { Icon } from "../Icon";

const ORMPlatformLinkData = {
  porm: {
    title: 'Build with Prisma ORM',
    icon: 'database',
    description:
      'Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.',
    links: [
      {
        url: 'getting-started',
        title: 'Getting started',
      },
      {
        url: 'https://github.com/prisma/prisma-examples',
        title: 'Example projects',
        external: true,
      },
    ],
  },
  pdp: {
    title: 'Grow as your app evolves',
    icon: 'triangle',
    description:
      'Expand your application capabilities with global database caching, connection pooling and real-time database events.',
    links: [
      {
        url: 'accelerate',
        title: 'Prisma Accelerate',
      },
      {
        url: 'pulse',
        title: 'Prisma Pulse',
      },
    ],
  },
}

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
const Body = styled.div`
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol', 'Noto Color Emoji';
font-weight: normal;
font-size: 18px;
letter-spacing: 0em;
line-height: 140%;
`
const H3 = styled.h3`
font-family: 'Barlow', sans-serif;
font-weight: bold;
font-size: 28px;
letter-spacing: -0.02em;
line-height: 110%;
@media (min-width: 940px) {
  font-size: 36px;
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
export const ProductCard = styled.div<{ color?: string }>`
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

export default function ProductCards(): JSX.Element {
    return (
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
    );
  }


