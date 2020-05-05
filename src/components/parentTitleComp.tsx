import React from 'react'
import styled from 'styled-components'
import { useAllArticlesQuery } from '../hooks/useAllArticlesQuery'
import { getParentTitle } from '../utils/parentTitle'
import { AllArticles } from '../interfaces/AllArticles.interface'

const BreadcrumbTitle = styled.h4`
  color: var(--code-inner-color) !important;
  line-height: 1rem;
  font-weight: normal;
  margin: 0;
`

interface ParentTitleProps {
  slug: string
}

const ParentTitle = ({ slug }: ParentTitleProps) => {
  const { allMdx }: AllArticles = useAllArticlesQuery()
  const parentTitle = getParentTitle(slug, allMdx)
  return <BreadcrumbTitle>{parentTitle}</BreadcrumbTitle>
}

export default ParentTitle
