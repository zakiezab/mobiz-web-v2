'use client'

import { useEffect, useState } from 'react'
import { ArrowDownCircleIcon } from 'lucide-react'

export function ScrollFadeArrow() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Start fading out after 100px of scroll
      // Fully faded at 300px
      const fadeStart = 100
      const fadeEnd = 300
      const fadeRange = fadeEnd - fadeStart

      if (scrollY < fadeStart) {
        setOpacity(1)
      } else if (scrollY > fadeEnd) {
        setOpacity(0)
      } else {
        // Linear fade between fadeStart and fadeEnd
        const fadeProgress = (scrollY - fadeStart) / fadeRange
        setOpacity(1 - fadeProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      className="fixed bottom-20 z-50 w-full mx-auto flex justify-center items-center p-12 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <ArrowDownCircleIcon className="w-10 h-10 text-gray-50" />
    </div>
  )
}

