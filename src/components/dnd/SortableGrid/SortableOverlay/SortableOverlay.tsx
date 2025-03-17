import { DragOverlay } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

export const SortableOverlay = ({ children }: PropsWithChildren) => {
  return <DragOverlay className="cursor-grabbing">{children}</DragOverlay>
}
