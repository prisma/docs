import { useState, useEffect } from 'react'

function getWindowDimensions() {
  let width = 0
  let height = 0
  if (typeof window !== `undefined`) {
    width = window.innerWidth
    height = window.innerHeight
  }

  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
