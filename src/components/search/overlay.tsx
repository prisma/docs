import * as React from 'react'
import styled from 'styled-components'

interface Props {
  visible: boolean
  hideSearch: () => void
  path?: string
}

const Overlay = ({ visible, hideSearch, path }: Props) => {
  const [transition, setTransition] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setTransition(true)
    }, 1000)
  })

  return (
    <StyledOverlay
      isVisible={visible}
      isTransitioning={transition}
      onClick={hideSearch}
      path={path}
    />
  )
}

const StyledOverlay = styled.div<{ isVisible: boolean; isTransitioning: boolean; path?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 35, 51, 0.3);
  opacity: 0;
  pointer-events: none;
  z-index: 10000;

  ${(p) => p.path && p.path === 'home' && `margin-top: -104px; width: 100vw; height: 100vh;`}
  ${(p) => p.isTransitioning && 'transition: opacity 0.25s ease-in-out;'}
  ${(p) => (p.isVisible ? 'opacity: 1; pointer-events: all;' : 'opacity: 0; pointer-events: none;')}
`

export default Overlay
