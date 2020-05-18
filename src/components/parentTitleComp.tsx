import React from 'react'
import styled from 'styled-components'
import { useAllArticlesQuery } from '../hooks/useAllArticlesQuery'
import { getParentTitle } from '../utils/parentTitle'
import { AllArticles } from '../interfaces/AllArticles.interface'
import Link from './link'

const BreadcrumbTitle = styled.h4`
  color: var(--code-inner-color) !important;
  line-height: 1rem;
  font-weight: normal;
  margin: 0;
  a {
    color: var(--code-inner-color) !important;
    text-decoration: none;

    &:hover,
    &:focus {
      color: var(--grey-color) !important;
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
  return (
    <BreadcrumbTitle>
      {parentTitle.map((part: any, index: number) => (
        <span key={index}>
          {part.link && !nonLink ? <Link to={part.link}>{part.title} </Link> : part.title}
          {parentTitle.length !== index + 1 ? ' / ' : ''}
        </span>
      ))}
    </BreadcrumbTitle>
  )
}

export default ParentTitle
