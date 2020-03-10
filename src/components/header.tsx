import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import HeaderLogo from '../images/logo.svg';
import { HeaderProps } from '../interfaces/Layout.interface';

const HeaderWrapper = styled.div`
  background: #082133;
  height: 56px;
  img {
    margin-bottom: 0;
  }
  // box-shadow: 0px 2px 4px rgba(88, 86, 95, 0.08);
  padding: 0 6rem;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 1.13rem;
  color: #F5F8FA;
  font-style: normal;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: -0.02em;
`;

const LogoContainer = styled.div`
  padding-right: 1rem;
`;

const Header = ({ siteTitle, logo }: HeaderProps) => (
  <HeaderWrapper>
    <Link
      to={logo.link || '/'}
      style={{
        color: 'white',
        textDecoration: 'none',
      }}
    >
      <LogoContainer>
        <img
          height="35px"
          src={logo.image || HeaderLogo}
          alt="HowtoData Logo"
        />
      </LogoContainer>
    </Link>
    <Title>{siteTitle}</Title>
  </HeaderWrapper>
);

export default Header;
