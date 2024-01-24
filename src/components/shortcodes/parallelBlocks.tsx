import { defaultTheme as theme } from '../../themes'
import * as React from 'react'
import styled from 'styled-components'

type CodeBlockProps = React.ReactNode

const ParallelBlocks = ({ children }: CodeBlockProps) => {
  const blockContent =
    children && children.filter((child: any) => child.props && child.props.originalType === 'block')
  return (
    <Wrapper>
      {blockContent.map((block: any, i: number) => (
        <Block key={i}>
          <div className="blockHeading">{block.props.content}</div>
          <div className="blockContent">{block.props.children}</div>
        </Block>
      ))}
    </Wrapper>
  )
}

export default ParallelBlocks

const Block = styled.div`
  flex: 1 1 0px;
  width: calc(50% - 0.25rem);
  .blockHeading {
    font-weight: 600;
    font-size: ${theme.fontSizes[14]};
    svg {
      margin-right: ${theme.space[8]};
    }
  }

  .blockContent {
    height: calc(100% - 2em);

    .pre-highlight,
    pre {
      height: 100%;
    }
  }

  @media (max-width: ${theme.breakpoints.tabletVertical}) and (min-width: 0px) {
    .pre-highlight {
      margin: 0;
    }
    &:first-of-type .pre-highlight {
      margin-right: 0;
      margin-left: -${theme.space[24]};
    }
    &:last-of-type .pre-highlight {
      margin-left: 0;
      margin-right: -${theme.space[24]};
    }
  }
`
const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: ${theme.space[32]};
`
