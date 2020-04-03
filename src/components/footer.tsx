import Link from '../components/link';
import * as React from 'react';
import styled from 'styled-components';
import PrismaLogoGrey from '../icons/PrismaLogoGrey';
import Email from '../icons/Email';
import ArrowEmail from '../icons/ArrowEmail';
import Twitter from '../icons/Twitter';
import Youtube from '../icons/Youtube';
import Slack from '../icons/Slack';
import Github from '../icons/GitGrey';
import Facebook from '../icons/Facebook';

import { FooterProps } from '../interfaces/Layout.interface';

type FooterViewProps = {
  footerProps: FooterProps;
};

const FooterWrapper = styled.div`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #a0aec0;
  .container {
    padding: 15rem 10px;
    width: 1210px;
    display: flex;
    justify-content: space-between;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 4rem;
  li {
    line-height: 2rem;
    a {
      text-decoration: none;
      color: #a0aec0 !important;
      &:hover {
        color: #718096 !important;
        .tag {
          transform: scale(1.05);
        }
      }

      .tag {
        display: inline-block;
        border-radius: 6px;
        margin-left: 8px;
        padding: 0 8px;
        background: #48bb78;
        font-size: 12px;
        font-weight: bold;
        color: white;
        transition: transform 0.1s ease-in;
      }
    }
    &:first-of-type {
      line-height: 3rem;
      font-weight: bold;
      letter-spacing: 0.1em;
    }
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: -0.02em;
`;

const LogoContainer = styled.div`
  padding-right: 0.75rem;
`;

const NewsLetter = styled.div`
  max-width: 350px;
  p {
    margin: 0;
  }
  h4 {
    margin: 0;
    line-height: 3rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  .email {
    position: relative;
    margin-top: 24px;
    input {
      background: #ffffff;
      box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1), 0px 1px 3px rgba(60, 45, 111, 0.15);
      border-radius: 5px;
      width: 100%;
      border: 0;
      padding: 24px 60px;
      font-size: 20px;
      font-family: Open Sans;
      font-weight: normal;

      &::placeholder {
        color: #a0aec0;
      }
    }
    ArrowEmail {
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }
  .social {
    margin-top: 75px;

    &-links {
      display: flex;
      align-items: center;
      margin-top: 10px;
      a {
        margin-right: 24px;

        &: hover {
          color: #718096 !important;
        }
      }
    }
    &-text {
      margin-top: 2rem;
    }
  }
`;

const Footer = ({ footerProps }: FooterViewProps) => {
  const {
    logoLink,
    title,
    products,
    resources,
    community,
    company,
    newsletter,
    findus,
  } = footerProps;
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
            <LogoContainer>
              <PrismaLogoGrey />
            </LogoContainer>
          </Link>
          <Title>{title}</Title>
        </div>
        <div>
          <LinkList>
            <li>PRODUCTS</li>
            {products.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>

          <LinkList>
            <li>RESOURCES</li>
            {resources.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>
        </div>
        <div>
          <LinkList>
            <li>COMMUNITY</li>
            {community.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </LinkList>

          <LinkList>
            <li>COMPANY</li>
            {company.map((item: any, index: number) => (
              <li key={index}>
                <Link to={item.link}>
                  {item.name}
                  {item.name === 'Jobs' && <span className="tag">We're Hiring</span>}
                </Link>
              </li>
            ))}
          </LinkList>
        </div>

        <NewsLetter>
          {/* <h4>NEWSLETTER</h4>
        <p>{newsletter.text}</p> */}

          {/* <div className="email">
          <Email style={{ position: 'absolute', top: '30px', left: '24px' }} />
          <input type="text" placeholder="your@email.com" />
          <ArrowEmail style={{ position: 'absolute', top: '24px', right: '24px' }} />
        </div> */}
          <div className="social">
            <h4>FIND US</h4>
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

            <p className="social-text">Prisma © 2019 — Frequentis Prisma</p>
            <p>Made with ❤️ in Berlin</p>
          </div>
        </NewsLetter>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
