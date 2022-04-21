import * as React from 'react'
import styled from 'styled-components'
import { theme } from '@prisma/lens/dist/web'

import { ProductLinks } from './ProductLinks'

interface MenuListProps {
  isMobile?: boolean
}

export const MenuList: React.FC<MenuListProps> = ({ isMobile }: MenuListProps) => {
  return (
    <MenuListContainer>
      <li>
        <ProductLinks isMobile={isMobile} />
      </li>
      <li>
        <a href="https://www.prisma.io/docs/getting-started/quickstart">Quickstart</a>
      </li>
      <li>
        <a href="https://www.prisma.io/docs/">Docs</a>
      </li>
      <li>
        <a href="https://www.prisma.io/docs/about/prisma/faq">FAQ</a>
      </li>
      <li>
        <a href="https://www.prisma.io/community">Community</a>
      </li>
      <li>
        <a href="https://www.prisma.io/blog/">Blog</a>
      </li>
      <li>
        <a href="https://github.com/prisma/prisma" className="github">
          <svg width={24} height={24} viewBox="0 0 18 18">
            <path
              d="M16.7926 4.70258C15.9878 3.32365 14.8961 2.23195 13.5173 1.42724C12.1383 0.622478 10.6328 0.220201 8.99986 0.220201C7.36707 0.220201 5.8611 0.622601 4.48238 1.42724C3.10345 2.23191 2.01183 3.32365 1.20703 4.70258C0.402359 6.08147 0 7.58723 0 9.21981C0 11.1809 0.57216 12.9444 1.71677 14.5107C2.86125 16.0771 4.33975 17.161 6.15215 17.7625C6.36312 17.8017 6.51929 17.7741 6.62084 17.6806C6.72242 17.5869 6.77315 17.4696 6.77315 17.3292C6.77315 17.3057 6.77114 17.0949 6.76724 16.6964C6.76322 16.2979 6.76133 15.9502 6.76133 15.6536L6.49179 15.7002C6.31994 15.7317 6.10314 15.7451 5.8414 15.7413C5.57979 15.7376 5.3082 15.7102 5.027 15.6592C4.74568 15.6087 4.48402 15.4915 4.24182 15.3079C3.99974 15.1243 3.82789 14.884 3.7263 14.5874L3.60912 14.3177C3.53101 14.1382 3.40804 13.9387 3.24005 13.7201C3.07205 13.5013 2.90217 13.353 2.73032 13.2749L2.64827 13.2161C2.5936 13.1771 2.54287 13.13 2.49595 13.0754C2.44908 13.0208 2.41399 12.9661 2.39055 12.9113C2.36707 12.8566 2.38653 12.8116 2.44912 12.7764C2.51171 12.7411 2.62483 12.724 2.78897 12.724L3.02325 12.759C3.17951 12.7903 3.37279 12.8838 3.60333 13.0402C3.83376 13.1964 4.02318 13.3995 4.17163 13.6494C4.35141 13.9698 4.568 14.2139 4.82202 14.3819C5.07584 14.5499 5.33176 14.6337 5.58951 14.6337C5.84727 14.6337 6.0699 14.6142 6.25747 14.5753C6.44484 14.5363 6.62063 14.4775 6.78477 14.3995C6.85508 13.8758 7.04651 13.4735 7.3589 13.1923C6.91365 13.1455 6.51334 13.0751 6.15777 12.9814C5.80241 12.8875 5.43519 12.7353 5.05635 12.5241C4.6773 12.3133 4.36286 12.0515 4.11294 11.7391C3.86298 11.4266 3.65784 11.0163 3.49781 10.5086C3.33769 10.0008 3.25761 9.4149 3.25761 8.75088C3.25761 7.80542 3.56627 7.00087 4.18345 6.33677C3.89434 5.62596 3.92163 4.82912 4.26542 3.94634C4.49199 3.87595 4.82798 3.92877 5.27323 4.10448C5.71856 4.28028 6.04461 4.43087 6.25172 4.55573C6.45883 4.68054 6.62478 4.78631 6.7498 4.8721C7.47649 4.66905 8.22641 4.56751 8.99977 4.56751C9.77313 4.56751 10.5232 4.66905 11.25 4.8721L11.6952 4.59098C11.9998 4.40341 12.3593 4.23152 12.7732 4.07526C13.1872 3.91909 13.5038 3.87607 13.7227 3.94646C14.0741 4.82929 14.1054 5.62608 13.8162 6.33689C14.4334 7.00099 14.7421 7.80575 14.7421 8.751C14.7421 9.41502 14.6618 10.0027 14.5019 10.5145C14.3418 11.0264 14.1349 11.4363 13.8811 11.745C13.627 12.0537 13.3105 12.3135 12.9317 12.5243C12.5528 12.7352 12.1854 12.8875 11.8301 12.9813C11.4745 13.0752 11.0742 13.1457 10.629 13.1925C11.0351 13.544 11.2382 14.0987 11.2382 14.8564V17.3288C11.2382 17.4693 11.287 17.5866 11.3848 17.6803C11.4824 17.7738 11.6366 17.8013 11.8476 17.7621C13.6602 17.1607 15.1387 16.0768 16.2832 14.5104C17.4275 12.9441 17.9999 11.1806 17.9999 9.21948C17.9995 7.5871 17.5969 6.08147 16.7926 4.70258Z"
              className="md:hover:text-white"
            />
          </svg>
          <span>GitHub</span>
        </a>
      </li>
    </MenuListContainer>
  )
}

// STYLED COMPONENTS

const MenuListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  li {
    list-style: none;
    a {
      display: flex;
      align-items: center;
      color: ${theme.colors.gray800};
      font-size: 1.5rem;
      line-height: 2rem;
      padding-top: 0.75rem;
      text-decoration: none;
      padding-bottom: 0.75rem;
      font-weight: 500;
      &.github {
        svg {
          margin-right: 0.5rem;
          path {
            fill: ${theme.colors.gray800};
          }
        }
      }
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    li {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      a {
        font-size: 0.875rem;
        line-height: 1.25rem;
        padding-top: 0;
        padding-bottom: 0;
        color: ${theme.colors.gray200};
        &.github {
          svg {
            margin-right: 0;
            path {
              fill: ${theme.colors.gray200};
            }
          }
          span {
            display: none;
          }
        }
        &:hover {
          color: ${theme.colors.white};
          &.github {
            svg {
              path {
                fill: ${theme.colors.white};
              }
            }
          }
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
`
