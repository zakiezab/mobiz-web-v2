'use client'

import {useEffect, useState} from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollValue = Math.round((scrollTop * 100) / (scrollHeight - clientHeight))
      setWidth(scrollValue)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[1001] transition-[width] duration-100 linear"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
      }}
    />
  )
}
