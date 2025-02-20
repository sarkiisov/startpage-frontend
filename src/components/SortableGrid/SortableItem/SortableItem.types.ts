import { PropsWithChildren } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'

export type SortableItemProps = PropsWithChildren<{
  id: UniqueIdentifier
}>
