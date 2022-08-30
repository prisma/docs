import { theme } from '@prisma/lens/dist/web'
import React from 'react'
import { GitHub, Slack, Twitter, Youtube } from 'react-feather'
import styled from 'styled-components'

const Container = styled.div`
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  padding: 0 2rem;
  @media only screen and (min-width: 940px) {
    padding: 0 1.5rem;
    max-width: 1248px; // 1200 plus 2 x padding
  }
`
const FooterContainer = styled.div`
  background-color: ${theme.colors.white};
  padding: 46px 0 1px;
  font-size: 14px;
`

const Row = styled.div`
  @media only screen and (min-width: 940px) {
    display: flex;
  }
`

const Column = styled.div<{ flex?: number }>`
  margin-bottom: 48px;
  &.hide-on-mobile {
    display: none;
  }
  @media only screen and (min-width: 940px) {
    margin-bottom: 0;
    padding: 0 0.5rem;
    flex: ${(p) => p.flex || 1};
    &.hide-on-desktop {
      display: none;
    }
    &.hide-on-mobile {
      display: initial;
    }
  }
`

const Title = styled.h4`
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${theme.fontSizes[14]};
  color: ${theme.colors.gray700};
  letter-spacing: 0.08em;
  margin-top: 0;
  margin-bottom: 1rem;
  @media only screen and (min-width: 940px) {
    margin-bottom: 0.5rem;
  }
`

const Link = styled.a`
  font-size: 15.75px;
  color: ${theme.colors.gray800};
  font-weight: 400;
  cursor: pointer;
  font-weight: 500;
  box-sizing: border-box;
  display: block;
  text-decoration: none;
  line-height: ${25 / 18};
  padding: 1rem 0;
  @media only screen and (min-width: 940px) {
    padding: 0.5rem 0;
  }
  &:hover {
    color: ${theme.colors.indigo600};
  }
`

const DesktopSpacer = styled.div`
  @media only screen and (min-width: 940px) {
    height: 100px;
  }
`

const FooterP = styled.p`
  font-size: 15.75px;
  color: ${theme.colors.gray800};
  font-weight: 400;
  margin-top: 0;
  line-height: ${25 / 18};
  margin-bottom: ${theme.space[24]};
`
const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;

  a {
    font-size: ${theme.fontSizes[18]};
    color: ${theme.colors.gray800};
    font-weight: 400;
    &:hover {
      color: ${theme.colors.indigo600};
    }
  }
`

const Label = styled.span`
  border-radius: 4px;
  background-color: ${theme.colors.teal500};
  padding: ${theme.space[4]} ${theme.space[8]};
  color: ${theme.colors.white};
  line-height: 1;
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
`

const logoUrl = 'https://website-v9.vercel.app/logo-dark.svg'
const WebsiteFooter = ({ newsletterComponent }: any) => (
  <FooterContainer>
    <Container>
      <Row>
        <Column className="hide-on-desktop">
          <Title style={{ marginBottom: '2rem' }}>Newsletter</Title>
          <FooterP>Stay up to date with the latest features and changes to Prisma</FooterP>
          {/* <FooterNewsletterForm /> */}
          {newsletterComponent}
          <div style={{ height: 16 }} />
        </Column>

        <Column>
          <Title>Products</Title>
          <Link href="https://www.prisma.io/client">Client</Link>
          <Link href="https://www.prisma.io/migrate">Migrate</Link>
          <Link href="https://www.prisma.io/data-platform">Data Browser</Link>
          <Link href="https://www.prisma.io/data-platform/proxy">Data Proxy</Link>
          <Link href="https://www.prisma.io/pricing">Pricing</Link>
        </Column>

        <Column>
          <Title>Developers</Title>
          <Link href="https://www.prisma.io/docs/">Docs</Link>
          <Link href="https://www.prisma.io/docs/getting-started">Get Started</Link>
          <Link href="https://github.com/prisma/prisma-examples">{`Prisma Examples ->`}</Link>
          <Link href="https://www.prisma.io/dataguide/">Data Guide</Link>

          <Link href="https://www.prisma.io/stack">Prisma in your Stack</Link>
          <Link href="https://www.prisma.io/support">Support</Link>
          <Link href="https://www.prisma.io/community">Community</Link>
          <Link href="https://www.prisma-status.com">{`Data Platform Status ->`}</Link>
        </Column>

        <Column>
          <Title>Use Cases</Title>
          <Link href="https://www.prisma.io/showcase">Customer Stories</Link>
          <Link href="https://www.prisma.io/enterprise">Enterprise</Link>
        </Column>

        <Column>
          <Title>Company</Title>
          <Link href="https://www.prisma.io/about">About</Link>
          <Link href="https://www.prisma.io/blog/">Blog</Link>
          {/* <Link href="#">Vision</Link> */}
          <Link href="https://www.prisma.io/jobs">
            Careers <Label>We're Hiring</Label>
          </Link>
          <Link href="https://www.prisma.io/events">Events</Link>
          {/* <Link href="">Press &amp; Media</Link> */}
          <Link href="https://prismaio.notion.site/Prisma-Causes-0c9e1ddc0f5942edaba355692cfee69f">
            {`Causes ->`}
          </Link>
          <Link href="http://pris.ly/privacy">{`Terms & Privacy ->`}</Link>
        </Column>
      </Row>

      <DesktopSpacer />

      <Row>
        <Column>
          <div style={{ marginBottom: theme.space[24] }}>
            <img src={logoUrl} width={90} height={27} alt="prisma_logo" />
          </div>

          <FooterP>&copy; {new Date().getFullYear()} Prisma Data, Inc.</FooterP>

          <SocialLinksContainer>
            <a href="https://twitter.com/prisma">
              <Twitter />
            </a>
            {/* <a href="#">
              <Icon name="facebook" />
            </a> */}
            <a href="https://www.youtube.com/c/PrismaData">
              <Youtube />
            </a>
            <a href="https://slack.prisma.io">
              <Slack />
            </a>
            <a href="https://github.com/prisma">
              <GitHub />
            </a>
          </SocialLinksContainer>
        </Column>

        <Column flex={3 / 4} className="hide-on-mobile">
          <Title>Newsletter</Title>
          <div style={{ height: 16 }} />
          <FooterP>Stay up to date with the latest features and changes to Prisma</FooterP>
          {newsletterComponent}
        </Column>
      </Row>

      <DesktopSpacer />
    </Container>
  </FooterContainer>
)

export { WebsiteFooter }
