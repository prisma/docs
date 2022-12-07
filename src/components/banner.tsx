import * as React from 'react'
import styled from 'styled-components'

const BannerWrapper = styled.div`
  background: linear-gradient(90deg, #dbf3ed 0%, #ebf4ff 100%);
  color: #4a5568;
  padding: 16px;
  > div {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`
const BannerText = styled.div`
  margin-right: 12px;

  a {
    text-decoration: none;
    // font-weight: 600;
    color: #4a5568;
  }
`
const Banner = () => (
  <BannerWrapper>
    <BannerText>
      <a href="/docs/data-platform/data-proxy">
        Set up database connection pooling for serverless environments with the{' '}
        <strong>Prisma Data Proxy</strong>. Learn more -{'>'}
      </a>
    </BannerText>
  </BannerWrapper>
)

export default Banner
