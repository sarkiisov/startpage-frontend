import { DragOverlay } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

export const SortableOverlay = ({ children }: PropsWithChildren) => {
  return <DragOverlay style={{ cursor: 'grabbing' }}>{children}</DragOverlay>
}
