import {render, screen} from '@testing-library/react'

import {Timeline} from '../Timeline'

const mockItems = [
  {
    number: '01',
    phase: 'Phase 01',
    title: 'Test Phase',
    description: 'Test description',
    deliverables: [{title: 'Test Deliverable'}],
  },
]

describe('Timeline', () => {
  it('renders timeline with required props', () => {
    render(<Timeline label="Test Label" title="Test Title" items={mockItems} />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Phase 01')).toBeInTheDocument()
    expect(screen.getByText('Test Phase')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test Deliverable')).toBeInTheDocument()
  })

  it('renders all timeline items', () => {
    const items = [
      ...mockItems,
      {
        number: '02',
        phase: 'Phase 02',
        title: 'Second Phase',
        description: 'Second description',
        deliverables: [{title: 'Second Deliverable'}],
      },
    ]

    render(<Timeline label="Test" title="Test" items={items} />)

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('Test Phase')).toBeInTheDocument()
    expect(screen.getByText('Second Phase')).toBeInTheDocument()
  })

  it('renders multiple deliverables', () => {
    const itemsWithMultipleDeliverables = [
      {
        number: '01',
        phase: 'Phase 01',
        title: 'Test Phase',
        description: 'Test description',
        deliverables: [
          {title: 'First Deliverable'},
          {title: 'Second Deliverable'},
          {title: 'Third Deliverable'},
        ],
      },
    ]

    render(<Timeline label="Test" title="Test" items={itemsWithMultipleDeliverables} />)

    expect(screen.getByText('First Deliverable')).toBeInTheDocument()
    expect(screen.getByText('Second Deliverable')).toBeInTheDocument()
    expect(screen.getByText('Third Deliverable')).toBeInTheDocument()
  })
})