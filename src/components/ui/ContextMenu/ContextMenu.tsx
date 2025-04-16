import {
  autoPlacement,
  FloatingPortal,
  FloatingTree,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { useState, MouseEvent, cloneElement, ReactElement, HTMLAttributes } from 'react'

import { createSafeContext } from '@/utils'

import {
  ContextMenuContentProps,
  ContextMenuContext,
  ContextMenuItemProps,
  ContextMenuProps
} from './ContextMenu.types'

const [ContextMenuContextProvider, useContextMenuContext] = createSafeContext<ContextMenuContext>(
  'ContextMenu component was not found in the tree'
)

export const ContextMenu = ({ children }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [autoPlacement()]
  })

  const dismiss = useDismiss(context)
  const { getFloatingProps } = useInteractions([dismiss])

  const openMenu = (event: MouseEvent) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setIsOpen(true)
  }

  return (
    <FloatingTree>
      <ContextMenuContextProvider
        value={{
          isOpen,
          openMenu,
          setIsOpen,
          refs,
          floatingStyles,
          position,
          getFloatingProps
        }}
      >
        {children}
      </ContextMenuContextProvider>
    </FloatingTree>
  )
}

export const ContextMenuTrigger = ({ children }: ContextMenuProps) => {
  const context = useContextMenuContext()

  const { openMenu } = context

  return cloneElement(children as ReactElement<HTMLAttributes<HTMLDivElement>>, {
    onContextMenu: openMenu
  })
}

export const ContextMenuContent = ({ children }: ContextMenuContentProps) => {
  const { isOpen, refs, floatingStyles, position, getFloatingProps } = useContextMenuContext()

  if (!isOpen) return null

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        {...getFloatingProps()}
        className="min-w-28 overflow-hidden rounded-md border border-neutral-700 bg-neutral-900 p-1 shadow-2xl"
        style={{
          ...floatingStyles,
          top: position.y,
          left: position.x
        }}
      >
        {children}
      </div>
    </FloatingPortal>
  )
}

export const ContextMenuItem = ({ children, onClick }: ContextMenuItemProps) => {
  const { setIsOpen } = useContextMenuContext()

  const handleItemClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    setIsOpen(false)
  }

  return (
    <div
      onClick={handleItemClick}
      className="cursor-pointer rounded px-2 py-1 text-left text-sm font-medium text-white hover:bg-neutral-800"
    >
      {children}
    </div>
  )
}

ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItem
