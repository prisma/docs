import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styled from 'styled-components';
import ProductCards from '../components/HomepageFeatures/ProductCards';
import PrismaORM from '../components/HomepageFeatures/PrismaORM';
import ORMCards from '../components/HomepageFeatures/ORMCards';
import Databases from '../components/HomepageFeatures/Databases';
import Community from '../components/HomepageFeatures/Community';

export const IconWrapper = styled.div`
width: 64px;
height: 64px;
flex-shrink: 0;
border-radius: 8px;
display: inline-flex;
align-items: center;
justify-content: center;
color: var(--icon-svg-color);
`

export const H4 = styled.h4`
  font-family: 'Barlow';
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 26.4px */
  letter-spacing: -0.48px;
`

export const H3 = styled.h3`
font-family: 'Barlow', sans-serif;
font-weight: bold;
font-size: 28px;
letter-spacing: -0.02em;
line-height: 110%;
@media (min-width: 940px) {
  font-size: 36px;
}
`

export const Body = styled.div`
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol', 'Noto Color Emoji';
font-weight: normal;
font-size: 18px;
letter-spacing: 0em;
line-height: 140%;
`

const TopSection = styled.div`
  padding: 64px 12px;
  background: #f7fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background: var(--homepage-header-bg);
`

export const LinkGrid = styled.div`
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


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <TopSection>
          <ProductCards />
        </TopSection>
        <PrismaORM />
        <ORMCards />
        <Databases />
        <Community />
      </main>
    </Layout>
  );
}

