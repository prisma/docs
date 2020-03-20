import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import HeaderLogo from '../icons/Logo';
import Github from '../icons/Git';
import Search from '../icons/Search';
import { HeaderProps } from '../interfaces/Layout.interface';

type HeaderViewProps = {
  headerProps: HeaderProps;
};

const HeaderWrapper = styled.div`
  background: radial-gradient(
      37.86% 77.79% at 50% 100%,
      rgba(113, 128, 150, 0.25) 0%,
      rgba(113, 128, 150, 0) 100%
    ),
    linear-gradient(180deg, #1a202c 0%, #2d3748 100%),
    linear-gradient(180deg, #0d0f14 0%, rgba(27, 32, 43, 0) 100%), #2f3747;
  height: 150px;
  img {
    margin-bottom: 0;
  }
  padding: 30px 10% 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 1.2rem;
  color: #f5f8fa;
  font-style: normal;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: -0.02em;
`;

const LogoContainer = styled.div`
  padding-right: 0.75rem;
`;

const SearchInput = styled.input`
  max-width: 215px;
  width: 20%;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1),
    0px 1px 3px rgba(60, 45, 111, 0.15);
  border-radius: 5px;
  padding: 0.6rem 2.5rem;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  border-width: 0;
  &::placeholder {
    color: #a0aec0;
    opacity: 1; /* Firefox */
  }
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  a {
    color: #cbd5e0 !important;
    &:hover,
    &:active,
    &:focus {
      color: #ffffff !important;
    }
  }

  margin: 0 10rem 0;
`;

const Header = ({ headerProps }: HeaderViewProps) => (
  <HeaderWrapper>
    <HeaderNav>
      <div style={{ display: 'flex' }}>
        <Link
          to={headerProps.logoLink || '/'}
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <LogoContainer>
            <HeaderLogo style={{ height: '24px' }} />
          </LogoContainer>
        </Link>
        <Title>{headerProps.title}</Title>
      </div>
      <NavLinks>
        {headerProps.links.map((headerlink: any, index: number) => (
          <Link
            key={index}
            to={headerlink.link}
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {headerlink.name}
          </Link>
        ))}
      </NavLinks>
      <Link
        to={'/'}
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <Github style={{ height: '24px' }} />
      </Link>
    </HeaderNav>
    <div style={{ position: 'relative' }}>
      <Search style={{ position: 'absolute', top: '12px', left: '12px' }} />
      <SearchInput type="text" placeholder="Search" />
    </div>
  </HeaderWrapper>
);

export default Header;
