'use client'

import type {ReactNode} from 'react'
import { TextAnimate } from '@/registry/magicui/text-animate'

interface SectionHeaderProps {
  label?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center' | 'right'
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignmentClass =
    align === 'center'
      ? 'text-center md:text-center'
      : align === 'right'
      ? 'text-right'
      : 'text-left'

  return (
    <div className={`section-header ${alignmentClass}`}>
      {label ? <p className="section-label">{label}</p> : null}
      <TextAnimate 
        animation="blurIn" 
        as="h2" 
        className="section-title" 
        scrollBased={true} 
        blurAmount={15}
      >
        {title}
      </TextAnimate>
      {description ? (
        <p
          className={`section-description ${
            align === 'right' ? 'ml-auto' : align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
