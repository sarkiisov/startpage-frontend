import { fireEvent, render, screen } from '@testing-library/react'

import { ContextMenu } from './ContextMenu'

const TestContextMenu = () => (
  <div>
    <ContextMenu>
      <ContextMenu.Trigger>
        <div data-testid="target">Right click me</div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Item 1</ContextMenu.Item>
        <ContextMenu.Item>Item 2</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
    <div data-testid="outside">Outside area</div>
  </div>
)

describe('ContextMenu', () => {
  it('shows menu after right-clicking trigger', () => {
    render(<TestContextMenu />)
    const trigger = screen.getByTestId('target')
    fireEvent.contextMenu(trigger)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('closes menu after selecting an item', () => {
    render(<TestContextMenu />)
    const trigger = screen.getByTestId('target')
    fireEvent.contextMenu(trigger)
    fireEvent.click(screen.getByText('Item 1'))
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('calls onClick of item correctly', () => {
    const onClick = vi.fn()
    render(
      <ContextMenu>
        <ContextMenu.Trigger>
          <div data-testid="target">Right click me</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onClick={onClick}>Item</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByTestId('target'))
    fireEvent.click(screen.getByText('Item'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('closes menu when clicking outside', async () => {
    render(<TestContextMenu />)

    fireEvent.contextMenu(screen.getByTestId('target'))
    expect(screen.getByText('Item 1')).toBeInTheDocument()

    fireEvent.pointerDown(document.body)
    fireEvent.click(document.body)

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })
})
