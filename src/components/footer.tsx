import Link from '../components/link'
import * as React from 'react'
import styled from 'styled-components'
import NewsLetter from '../components/newsletter'
import Twitter from '../icons/Twitter'
import Youtube from '../icons/Youtube'
import Slack from '../icons/Slack'
import Github from '../icons/GitGrey'
import Facebook from '../icons/Facebook'

import { FooterProps } from '../interfaces/Layout.interface'

type FooterViewProps = {
  footerProps: FooterProps
}

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${p => p.theme.colors.gray500};
  h3 {
    font-size: ${p => p.theme.fontSizes[16]};
    line-height: ${p => p.theme.space[48]};
    font-weight: bold;
    letter-spacing: 0.1em;
    margin: 0;
  }
  .container {
    padding: 15rem 10px;
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    > div {
      flex: 2;
    }
    @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
      flex-direction: column;
      padding: ${p => p.theme.fontSizes[48]} 0.5rem;
    }
  }
`

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${p => p.theme.space[32]};

  li {
    line-height: ${p => p.theme.space[32]};
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: ${p => p.theme.colors.gray500} !important;
      &:hover {
        color: ${p => p.theme.colors.gray600} !important;
        .tag {
          transform: scale(1.05);
        }
      }
      .tag {
        padding: 0 0.5rem;
        height: 20px;
        align-items: center;
        display: flex;
        border-radius: ${p => p.theme.radii.small};
        margin-left: ${p => p.theme.space[8]};
        background: ${p => p.theme.colors.green500};
        font-size: ${p => p.theme.fontSizes[12]};
        font-weight: bold;
        color: ${p => p.theme.colors.white};
        transition: transform 0.1s ease-in;
        &.black {
          background: ${p => p.theme.colors.black};
        }
      }
    }
  }
`

const SocialWrapper = styled.div`
  flex: 3 !important;
  p {
    margin: 0;
  }
  .social {
    margin-top: ${p => p.theme.space[32]};

    &-links {
      display: flex;
      align-items: center;
      margin-top: 10px;
      a {
        margin-right: ${p => p.theme.space[24]};
        svg {
          transition: transform 0.1s ease-in;
        }

        &: hover {
          color: ${p => p.theme.colors.gray600} !important;
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
    &-text {
      margin-top: ${p => p.theme.space[32]};
    }
  }
`

const Footer = ({ footerProps }: FooterViewProps) => {
  const {
    logoLink,
    products,
    resources,
    community,
    company,
    newsletter,
    findus,
  } = footerProps
  return (
    <FooterWrapper>
      <div className="container">
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Link
            to={logoLink || '/'}
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <img src="https://images2.prisma.io/footer-logo.png" alt="Prisma Logo" style={{ width: 90 + "px", height: 24 + "px" }} />
          </Link>
        </div>
        <div>
          <LinkList>
            <h3>PRODUCTS</h3>
            {products.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>

          <LinkList>
            <h3>RESOURCES</h3>
            {resources.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>
        </div>
        <div>
          <LinkList>
            <h3>COMMUNITY</h3>
            {community.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>

          <LinkList>
            <h3>COMPANY</h3>
            {company.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>
                  {item.name}
                  {/* {item.name === 'Jobs' && <span className="tag">We're Hiring</span>} */}
                  {item.name === 'Causes' && <span className="tag black">Black Lives Matter</span>}
                </Link>
              </li>
            ))}
          </LinkList>
        </div>

        <SocialWrapper>
          <NewsLetter newsletter={newsletter} />

          <div className="social">
            <h3>FIND US</h3>
            <div className="social-links">
              <Link to={findus.twitterLink}>
                <Twitter />
              </Link>
              <Link to={findus.fbLink}>
                <Facebook />
              </Link>
              <Link to={findus.youtubeLink}>
                <Youtube />
              </Link>
              <Link to={findus.slackLink}>
                <Slack />
              </Link>
              <Link to={findus.gitLink}>
                <Github />
              </Link>
            </div>

            <p className="social-text">Prisma © 2018-2020</p>
            <p>Made with ❤️ in Berlin</p>
          </div>
        </SocialWrapper>
      </div>
    </FooterWrapper>
  )
}

export default Footer
