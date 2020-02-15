import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import GatsbyLogo from '../images/gatsby-icon.png';

interface HeaderProps {
  siteTitle: string;
}

const HeaderWrapper = styled.div`
  background: ${props => props.theme.colorPrimary};
  img {
    margin-bottom: 0;
  }
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 96rem;
  padding: 1rem;
`;

const Header: React.FunctionComponent<HeaderProps> = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img height="100" src={GatsbyLogo} alt="Gatsby Logo" />
        </Link>
      </h1>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
