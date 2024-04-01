import Link from "@docusaurus/Link"
import styled from "styled-components"
import { Icon } from "../Icon"

const GeneralLinkData = [
  {
    title: `What is Prisma ORM`,
    description: 'An overview of what Prisma ORM is and how it works.',
    url: 'orm/overview/introduction/what-is-prisma',
    icon: 'fa-regular fa-question',
  },
  {
    title: `CRUD`,
    description: 'How to perform CRUD operations with your generated Prisma Client API. ',
    url: 'orm/prisma-client/queries/crud',
    icon: 'fa-solid fa-arrow-right-arrow-left',
  },
  {
    title: `Prisma ORM in your stack`,
    description:
      'Use Prisma ORM to build a GraphQL or REST API, or as part of a fullstack application.',
    url: 'orm/overview/prisma-in-your-stack',
    icon: 'fa-solid fa-server',
  },
  {
    title: `Preview features`,
    description: 'Available preview features and how to enable them.',
    url: 'orm/reference/preview-features',
    icon: 'fa-solid fa-eye',
  },
  {
    title: `Adopting Prisma ORM`,
    description: 'Migrate to Prisma ORM from other ORMs.',
    url: 'orm/more/migrating-to-prisma',
    icon: 'fa-solid fa-download',
  },
  {
    title: `Deployment guides`,
    description:
      'Deploy Node.js applications with Prisma Client to platforms like Vercel, AWS Lambda, Netlify and Heroku.',
    url: 'orm/prisma-client/deployment',
    icon: 'fa-solid fa-book',
  },
]

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
const PrismaORMSectionWrapper = styled.div`
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

export default function PrismaORM(): JSX.Element {
  return (
    <PrismaORMSectionWrapper>
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
    </PrismaORMSectionWrapper>
  )
}
