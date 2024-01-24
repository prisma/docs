import * as React from 'react'
import styled from 'styled-components'

import { useAllArticlesQuery } from '../hooks/useAllArticlesQuery'
import { AllArticles } from '../interfaces/AllArticles.interface'
import { defaultTheme as theme } from '../themes'
import { getParentTitle } from '../utils/parentTitle'
import { Icon } from './Icon'
import Link from './link'
import CustomLink from './customLink'

const BreadcrumbTitle = styled.div`
  color: ${theme.colors.gray[600]} !important;
  line-height: 1.6rem;
  font-weight: normal;
  margin: 0;
  a,
  button {
    color: ${theme.colors.gray[600]} !important;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${theme.colors.gray[700]} !important;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (prefers-color-scheme: dark) {
    a,
    button {
      color: ${theme.colors.gray[500]} !important;
      &:hover,
      &:focus {
        color: ${theme.colors.gray[600]} !important;
      }
    }
  }
`

interface ParentTitleProps {
  slug: string
  nonLink?: boolean
  isSearchItem?: boolean
}

const ParentTitle = ({ slug, nonLink, isSearchItem }: ParentTitleProps) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const parentTitle = getParentTitle(slug, allMdx)
  if (parentTitle.length === 0) {
    return null
  }
  return (
    <BreadcrumbTitle>
      {!isSearchItem && (
        <CustomLink href="https://www.prisma.io/docs">
          <Icon icon="fa-solid fa-house" size="16px"></Icon>
        </CustomLink>
      )}
      {!isSearchItem && <span> {`/`} </span>}
      {parentTitle.map((part: any, index: number) => (
        <span key={index}>
          {part.link && !nonLink ? (
            <Link to={part.link}>
              <span className={`${part.codeStyle ? 'inline-code' : ''}`}>{part.title}</span>
            </Link>
          ) : (
            <span className={`${part.codeStyle ? 'inline-code' : ''}`}>{part.title}</span>
          )}
          {parentTitle.length !== index + 1 ? ' / ' : ''}
        </span>
      ))}
    </BreadcrumbTitle>
  )
}

export default ParentTitle
