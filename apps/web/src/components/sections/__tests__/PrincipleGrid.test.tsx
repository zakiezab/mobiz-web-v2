import {render, screen} from '@testing-library/react'

import {PrincipleGrid} from '../PrincipleGrid'

const mockPrinciples = [
  {
    title: 'Zero Handoffs',
    description: 'The senior team that architects the solution is the senior team that builds it.',
  },
  {
    title: 'Technology Agnostic',
    description: 'Our recommendations are based on first principles and your reality.',
  },
]

describe('PrincipleGrid', () => {
  it('renders principle grid with required props', () => {
    render(<PrincipleGrid label="Test Label" title="Test Title" principles={mockPrinciples} />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Zero Handoffs')).toBeInTheDocument()
    expect(screen.getByText('Technology Agnostic')).toBeInTheDocument()
    expect(
      screen.getByText('The senior team that architects the solution is the senior team that builds it.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Our recommendations are based on first principles and your reality.')
    ).toBeInTheDocument()
  })

  it('renders all principles', () => {
    const principles = [
      ...mockPrinciples,
      {
        title: 'Velocity over Volume',
        description: 'We deploy small, senior teams who compress timelines.',
      },
    ]

    render(<PrincipleGrid label="Test" title="Test" principles={principles} />)

    expect(screen.getByText('Zero Handoffs')).toBeInTheDocument()
    expect(screen.getByText('Technology Agnostic')).toBeInTheDocument()
    expect(screen.getByText('Velocity over Volume')).toBeInTheDocument()
  })

  it('renders correct number of principle items', () => {
    render(<PrincipleGrid label="Test" title="Test" principles={mockPrinciples} />)

    const principleItems = screen.getAllByText(/Zero Handoffs|Technology Agnostic/)
    expect(principleItems).toHaveLength(2)
  })
})