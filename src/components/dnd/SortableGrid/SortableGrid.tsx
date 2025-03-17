import {
  Active,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { SortableGridProps, SortableItem as SortableItemType } from './SortableGrid.types'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { SortableOverlay } from './SortableOverlay'
import { SortableItem } from './SortableItem'
import { cn } from '@/utils'

export const SortabelGrid = <T extends SortableItemType>({
  columns,
  items,
  renderItem,
  onChange,
  style,
  className,
  ...props
}: SortableGridProps<T>) => {
  const [active, setActive] = useState<Active | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 }
  })
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  const getItemKey = useCallback((item: T) => {
    return typeof item === 'object' ? item.id : (item as UniqueIdentifier)
  }, [])

  const activeItem = useMemo(() => {
    const index = items.findIndex((item) => getItemKey(item) === active?.id)

    if (index === -1) return

    return { index, item: items[index] }
  }, [active, items, getItemKey])

  const handleDragCancel = () => {
    setActive(null)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActive(active)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index
      const overIndex = over.data.current?.sortable?.index

      if (activeIndex !== undefined && overIndex !== undefined) {
        onChange(arrayMove(items, activeIndex, overIndex))
      }
    }
    setActive(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div
        style={{ '--columns': `repeat(${columns}, 1fr)`, ...style } as React.CSSProperties}
        className={cn(`grid h-fit gap-6 grid-cols-(--columns)`, className)}
        {...props}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item, index) => (
            <Fragment key={getItemKey(item)}>
              <SortableItem id={getItemKey(item)}>{renderItem(item, index)}</SortableItem>
            </Fragment>
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <SortableOverlay>
          {activeItem ? renderItem(activeItem.item, activeItem.index) : null}
        </SortableOverlay>,
        document.body
      )}
    </DndContext>
  )
}
