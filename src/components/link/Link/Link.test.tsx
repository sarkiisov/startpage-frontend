import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { LinkIcon } from '@/types'

import { Link as LinkComponent } from './Link'

describe('Link', () => {
  const baseProps = {
    href: 'https://example.com',
    title: 'Example'
  }

  const favicon: LinkIcon = { type: 'FAVICON', src: 'https://example.com/favicon.ico' }

  const placeholder: LinkIcon = { type: 'PLACEHOLDER', color: '#ff0000' }

  it('renders a favicon icon', () => {
    render(<LinkComponent {...baseProps} icon={favicon} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/favicon.ico')
  })

  it('renders a placeholder icon with correct letter', () => {
    render(<LinkComponent {...baseProps} icon={placeholder} />)

    const letter = screen.getByText('E')
    expect(letter).toBeInTheDocument()
    expect(letter).toHaveClass('text-3xl')
  })

  it('renders the title text', () => {
    render(<LinkComponent {...baseProps} icon={favicon} />)

    expect(screen.getByText('Example')).toBeInTheDocument()
  })

  it('applies additional className if provided', () => {
    render(<LinkComponent {...baseProps} className="custom-class" icon={favicon} />)

    const wrapper = screen.getByTestId('link-wrapper')
    expect(wrapper).toHaveClass('custom-class')
  })
})
