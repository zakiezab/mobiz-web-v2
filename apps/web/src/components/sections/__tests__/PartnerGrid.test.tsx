import {render, screen} from '@testing-library/react'

import type {TechnologyPartner} from '@/lib/sanity.types'
import {PartnerGrid} from '../PartnerGrid'

const createPartner = (
  overrides: Partial<TechnologyPartner> = {},
  index = 1
): TechnologyPartner => ({
  _id: `${index}`,
  _type: 'technologyPartner',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: `rev-${index}`,
  name: `Partner ${index}`,
  ...overrides,
})

const mockPartners: TechnologyPartner[] = [
  createPartner({name: 'AWS'}),
  createPartner({name: 'Google Cloud'}, 2),
]

describe('PartnerGrid', () => {
  it('renders partner grid with partners', () => {
    render(<PartnerGrid partners={mockPartners} />)

    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Google Cloud')).toBeInTheDocument()
  })

  it('renders empty grid when no partners', () => {
    render(<PartnerGrid partners={[]} />)

    const grid = document.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid?.children).toHaveLength(0)
  })

  it('renders correct number of partner cards', () => {
    render(<PartnerGrid partners={mockPartners} />)

    const partnerCards = document.querySelectorAll('.rounded-sm.border')
    expect(partnerCards).toHaveLength(2)
  })

  it('renders partner names in placeholder divs', () => {
    render(<PartnerGrid partners={mockPartners} />)

    const awsPlaceholder = screen.getByText('AWS')
    const gcpPlaceholder = screen.getByText('Google Cloud')

    expect(awsPlaceholder).toBeInTheDocument()
    expect(gcpPlaceholder).toBeInTheDocument()
  })

  it('renders partner excerpt when provided', () => {
    const partnersWithExcerpt: TechnologyPartner[] = [
      ...mockPartners,
      createPartner({name: 'Test Partner', excerpt: 'This is a test excerpt'}, 3),
    ]

    render(<PartnerGrid partners={partnersWithExcerpt} />)

    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument()
  })

  it('renders partner categories when provided', () => {
    const partnersWithCategories: TechnologyPartner[] = [
      ...mockPartners,
      createPartner({name: 'Test Partner', categories: ['Cloud', 'Infrastructure']}, 3),
    ]

    render(<PartnerGrid partners={partnersWithCategories} />)

    expect(screen.getByText('Cloud • Infrastructure')).toBeInTheDocument()
  })
})
