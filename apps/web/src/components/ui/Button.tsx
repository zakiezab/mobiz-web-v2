'use client'

import Link from 'next/link'
import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {clsx} from 'clsx'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  href?: string
  variant?: ButtonVariant
  children: ReactNode
}

const baseStyles =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-300 duration-500',
  outline: 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-dark',
  ghost: "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10",
}

export function Button({
  href,
  variant = 'primary',
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = clsx(baseStyles, variantStyles[variant], className)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // Handle smooth scrolling for anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        // Use requestAnimationFrame to ensure accurate position calculation
        window.requestAnimationFrame(() => {
          // Get the element's position relative to the document
          const elementRect = element.getBoundingClientRect()
          const elementTop = elementRect.top + window.pageYOffset
          // Scroll to the exact top of the element
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth',
          })
        })
      }
    }

    // Call the onClick handler after handling the scroll
    if (onClick) {
      onClick(e as any)
    }
  }

  if (href) {
    // For anchor links, use a regular anchor tag with onClick handler
    if (href.startsWith('#')) {
      return (
        <a href={href} className={classes} onClick={handleClick}>
          {children}
        </a>
      )
    }
    // For regular links, use Next.js Link
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
