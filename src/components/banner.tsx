import * as React from 'react'
import styled from 'styled-components'
import background from 'images/bg-serverless.png'

const BannerWrapper = styled.div`
  background-color: #19202d;
  background-image: url(${background});
  background-size: cover;
  background-position: center center;
  color: #ffffff;
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
    text-decoration: underline;
    font-weight: 600;
    color: #ffffff;
  }
`
const Banner = () => (
  <BannerWrapper>
    <BannerText>
      <a href="/serverless">
        Registrations are now open for the Prisma Serverless Conference - November 18th -{'>'}
      </a>
    </BannerText>
  </BannerWrapper>
)

export default Banner
