import * as React from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp, Terminal, Repeat, Database, Layout } from 'react-feather'
import { theme } from '@prisma/lens/dist/web'

interface ProductLinkProps {
  isMobile?: boolean
}

const ProductLinksContainer = styled.div`
  position: relative;
`

export const ProductLinks: React.FC<ProductLinkProps> = ({ isMobile }: ProductLinkProps) => {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {}, [isProductsMenuOpen])

  return (
    <ProductLinksContainer>
      <ToggleBtn ref={buttonRef} onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}>
        <span>Products</span>
        {isProductsMenuOpen ? (
          <ChevronUp
            size={isMobile ? 24 : 16}
            color={isMobile ? theme.colors.gray800 : theme.colors.gray200}
          />
        ) : (
          <ChevronDown
            size={isMobile ? 24 : 16}
            color={isMobile ? theme.colors.gray800 : theme.colors.gray200}
          />
        )}
      </ToggleBtn>
      {isProductsMenuOpen && (
        <>
          {!isMobile && <Underlay onClick={() => setIsProductsMenuOpen(false)} />}
          <Menu ref={menuRef}>
            <li>
              <a href="https://www.prisma.io/client">
                <Terminal size={isMobile ? 16 : 24} color={theme.colors.gray800} />
                <div className="text">
                  <div className="title">
                    <span>Client</span>
                  </div>
                  <div className="description">
                    <span>Write queries the way you think</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.prisma.io/migrate">
                <Repeat size={isMobile ? 16 : 24} color={theme.colors.gray800} />
                <div className="text">
                  <div className="title">
                    <span>Migrate</span>
                  </div>
                  <div className="description">
                    <span>Generate customizable SQL database migrations</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.prisma.io/studio">
                <Database size={isMobile ? 16 : 24} color={theme.colors.gray800} />
                <div className="text">
                  <div className="title">
                    <span>Studio</span>
                  </div>
                  <div className="description">
                    <span>Explore and manipulate Data in your Prisma projects</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://cloud.prisma.io/">
                <Layout size={isMobile ? 16 : 24} color={theme.colors.gray800} />
                <div className="text">
                  <div className="title">
                    <span>Data Platform</span>
                    <span className="tag">Early access</span>
                  </div>
                  <div className="description">
                    <span>Get started with Prisma without leaving your browser</span>
                  </div>
                </div>
              </a>
            </li>
          </Menu>
        </>
      )}
    </ProductLinksContainer>
  )
}

// STYLED COMPONENTES

const ToggleBtn = styled.button`
  border: none;
  background-color: transparent;
  font-family: inherit;

  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0;
  padding: 0.75rem 0;
  span {
    pointer-events: none;
    font-weight: 500;
    color: ${theme.colors.gray800};
    font-size: 1.5rem;
    line-height: 2rem;
    margin-right: 0.5rem;
  }
  @media (min-width: 768px) {
    padding: 0 0;
    span {
      color: ${theme.colors.gray200};
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`

const Underlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
`

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  li {
    a {
      display: flex;
      align-items: center;
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
      .text {
        display: flex;
        flex-direction: column;
        padding-left: 0.75rem;
        span {
          color: ${theme.colors.gray800};
          font-weight: 500;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        .title {
          span {
            &.tag {
              background-color: ${theme.colors.purple100};
              color: ${theme.colors.purple800};
              font-style: normal;
              font-size: 0.75rem;
              line-height: 1rem;
              text-transform: uppercase;
              font-weight: 600;
              border-radius: 0.375rem;
              padding: 0.15rem 0.25rem;
              margin-left: 0.5rem;
            }
          }
        }
        .description {
          display: none;
        }
      }
    }
  }
  @media (min-width: 768px) {
    position: absolute;
    z-index: 999;
    left: 0;
    top: calc(100% + 0.5rem);
    background-color: ${theme.colors.white};
    padding: 0.5rem 0;
    border-radius: 0.375rem;
    box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
    li {
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
      a {
        display: flex;
        align-items: center;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        border-radius: 0.375rem;
        .text {
          span {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .description {
            display: flex;
            span {
              color: ${theme.colors.gray600};
              font-weight: 400;
              white-space: nowrap;
            }
          }
        }

        &:hover {
          background-color: ${theme.colors.gray100};
          .text {
            .title {
              span {
                &:first-child {
                  text-decoration: underline;
                  text-underline-offset: 2px;
                }
              }
            }
          }
        }
      }
    }
  }
`
