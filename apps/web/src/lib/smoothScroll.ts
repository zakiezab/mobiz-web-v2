export function smoothScrollTo(targetId: string, offset: number = 80) {
  const target = document.querySelector(targetId)
  if (target) {
    const targetPosition = (target as HTMLElement).offsetTop - offset
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }
}

export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  offset: number = 80
) {
  if (href.startsWith('#')) {
    e.preventDefault()
    smoothScrollTo(href, offset)
  }
}
