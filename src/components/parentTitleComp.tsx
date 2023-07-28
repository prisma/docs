import { Icon, defaultTheme as theme } from '@prisma/lens/dist/web'
import * as React from 'react'
import styled from 'styled-components'

import { useAllArticlesQuery } from '../hooks/useAllArticlesQuery'
import { AllArticles } from '../interfaces/AllArticles.interface'
import { getParentTitle } from '../utils/parentTitle'
import Link from './link'

const BreadcrumbTitle = styled.div`
  color: ${theme.colors.gray[600]} !important;
  line-height: 1rem;
  font-weight: normal;
  margin: 0;
  a {
    color: ${theme.colors.gray[600]} !important;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${theme.colors.gray[700]} !important;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

interface ParentTitleProps {
  slug: string
  nonLink?: boolean
}

const ParentTitle = ({ slug, nonLink }: ParentTitleProps) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const parentTitle = getParentTitle(slug, allMdx)
  if (parentTitle.length === 0) {
    return null
  }
  return (
    <BreadcrumbTitle>
      <a href="/docs">
        <Icon icon="fa-solid fa-house" size="16px"></Icon>
      </a>
      <span> {`/`} </span>
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
