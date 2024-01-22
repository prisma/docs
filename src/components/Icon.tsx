import React, { useEffect, useRef, useState } from 'react'

interface IconProps {
  icon: string
  color?: string
  className?: string
  size?: string
  btn?: 'left' | 'right'
  fit?: 'width' | 'height'
}

export const Icon = ({ icon, color, className, size, btn, fit }: IconProps) => {
  const iconRef = useRef<any>(null)
  const [font, setFontSize] = useState<number>(0)
  const [measure, setMeasure] = useState<string>('vw')
  useEffect(() => {
    if (iconRef && iconRef.current) {
      setFont()
    }
  }, [iconRef.current])

  const setFont = () => {
    const parentElement = iconRef.current.parentElement.getBoundingClientRect()
    setFontSize(
      (100 * parentElement[parentElement.width > parentElement.height ? 'height' : 'width']) /
        window[parentElement.width > parentElement.height ? 'innerHeight' : 'innerWidth'] -
        0.6
    )
    setMeasure(parentElement.width > parentElement.height ? 'vh' : 'vw')
  }

  useEffect(() => {
    window.addEventListener('resize', setFont)
    return () => window.removeEventListener('resize', setFont)
  }, [])
  return (
    <i
      ref={iconRef}
      className={`${icon} ${className}`}
      style={{
        textAlign: 'center',
        fontSize: size ? size : `${font}${measure}`,
        color: color ? color : 'currentcolor',
        margin: btn?.length ? (btn === 'right' ? '0 0 0 8px' : '0 8px 0 0') : '',
      }}
    ></i>
  )
}
