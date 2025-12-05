'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Quote {
  text?: string
  name?: string
  designation?: string
}

interface QuoteCarouselProps {
  quotes: Quote[]
}

export function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMultipleQuotes = quotes.length > 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))
  }

  const currentQuote = quotes[currentIndex]

  if (!currentQuote) return null

  return (
    <div className="relative px-12 md:px-16 bg-gray-100 w-full">
      <div 
        key={currentIndex}
        className="pl-8 pr-8 py-10 rounded-2xl animate-in fade-in duration-300"
      >
        {currentQuote.text && (
          <blockquote className="text-2xl font-light leading-relaxed text-gray-600 mb-2 text-center italic">
            "{currentQuote.text}"
          </blockquote>
        )}
        {(currentQuote.name || currentQuote.designation) && (
          <div className="text-center mt-4">
            {currentQuote.name && (
              <p className="font-semibold text-secondary">{currentQuote.name}</p>
            )}
            {currentQuote.designation && (
              <p className="text-gray-600 dark:text-secondary-300 mt-1">{currentQuote.designation}</p>
            )}
          </div>
        )}
      </div>

      {hasMultipleQuotes && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-600 hover:bg-secondary-200 z-10"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-600 hover:bg-secondary-200 z-10"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-0">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 dark:bg-secondary-600 hover:bg-gray-400 dark:hover:bg-secondary-500 w-2'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

