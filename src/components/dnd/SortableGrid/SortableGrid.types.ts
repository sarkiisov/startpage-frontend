import { UniqueIdentifier } from '@dnd-kit/core'
import { HTMLAttributes } from 'react'

export type SortableItem = UniqueIdentifier | { id: UniqueIdentifier }

export type SortableGridProps<T extends SortableItem> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  columns: number
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  onChange: (items: T[]) => void
}
