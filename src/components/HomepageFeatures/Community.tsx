import styled from "styled-components"
import ShadowCard from "../shadow-card"
import { Icon } from "../Icon"
import * as theme from "../../css/primitives"

const CommunityLinksData = [
  {
    id: 'discord',
    title: 'Discord',
    description:
      'Chat in real-time, hang out, and share ideas with community members and our team.',
    icon: 'fa-brands fa-discord',
    link: 'https://pris.ly/discord',
    linkText: 'Join our server',
  },
  {
    id: 'github',
    title: 'GitHub',
    description:
      'Browse the Prisma ORM source code, send feedback, or join the discussion on GitHub.',
    icon: 'fa-brands fa-github',
    link: 'https://github.com/prisma',
    linkText: 'Contribute in GitHub',
  },
  {
    id: 'X',
    title: 'X',
    description: 'Stay up-to-date, join the discussion, and connect with the community on X.',
    icon: 'fa-brands fa-x-twitter',
    link: 'https://twitter.com/prisma',
    linkText: 'Follow us on X',
  },
]

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

export default function ORMCards(): JSX.Element {
  return (
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
  )
}
