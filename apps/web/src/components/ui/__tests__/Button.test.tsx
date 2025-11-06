import {render, screen} from '@testing-library/react'

import {Button} from '../Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Launch</Button>)

    expect(
      screen.getByRole('button', {name: /launch/i})
    ).toHaveClass('bg-primary')
  })

  it('renders as link when href provided', () => {
    render(
      <Button href="/contact" variant="outline">
        Contact
      </Button>
    )

    const link = screen.getByRole('link', {name: /contact/i})
    expect(link).toHaveAttribute('href', '/contact')
    expect(link).toHaveClass('border')
  })
})
