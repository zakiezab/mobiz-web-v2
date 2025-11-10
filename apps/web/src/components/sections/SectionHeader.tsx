'use client'

import type {ReactNode} from 'react'
import { TextAnimate } from '@/registry/magicui/text-animate'

interface SectionHeaderProps {
  label?: string
  title?: ReactNode
  description?: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  titleStyle?: React.CSSProperties
  descriptionClassName?: string
  descriptionStyle?: React.CSSProperties
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
}: SectionHeaderProps) {
  const alignmentClass =
    align === 'center'
      ? 'text-center md:text-center'
      : align === 'right'
      ? 'text-right'
      : 'text-left'

  // Adjust section-header class based on alignment
  // For right alignment, don't use mx-auto (which centers), use ml-auto instead
  const headerWrapperClass = 
    align === 'right' 
      ? `section-header ml-auto ${alignmentClass} ${className || ''}`
      : align === 'center'
      ? `section-header mx-auto ${alignmentClass} ${className || ''}`
      : `section-header ${alignmentClass} ${className || ''}`

  return (
    <div className={headerWrapperClass}>
      {label ? <p className="section-label">{label}</p> : null}
      {title && (
        <TextAnimate 
          animation="blurIn" 
          as="h2" 
          className={`section-title ${titleClassName || ''}`}
          scrollBased={true} 
          blurAmount={15}
        >
          {titleStyle ? (
            <span style={titleStyle}>{title}</span>
          ) : titleClassName?.includes('text-gray-900') || titleClassName?.includes('gray-900') ? (
            <span style={{ color: '#221F1F' }}>{title}</span>
          ) : (
            title
          )}
        </TextAnimate>
      )}
      {description ? (
        <p
          className={`section-description ${
            align === 'right' ? 'ml-auto' : align === 'center' ? 'mx-auto' : ''
          } ${descriptionClassName || ''}`}
          style={
            descriptionStyle ||
            (descriptionClassName?.includes('text-gray-900') || descriptionClassName?.includes('gray-600')
              ? { color: '#221F1F' }
              : undefined)
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
