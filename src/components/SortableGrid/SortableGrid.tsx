import {
  Active,
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { SortableGridProps, SortableItem as SortableItemType } from './SortableGrid.types'
import React, { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { SortableOverlay } from './SortableOverlay'
import { SortableItem } from './SortableItem'

export const SortabelGrid = <T extends SortableItemType>({
  columns,
  items,
  renderItem,
  onChange,
  style,
  ...props
}: SortableGridProps<T>) => {
  const [active, setActive] = useState<Active | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5
    }
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

  return (
    <DndContext
      sensors={sensors}
      onDragCancel={() => {
        setActive(null)
      }}
      onDragEnd={(event) => {
        const { active, over } = event

        if (over && active.id !== over?.id) {
          const activeIndex = active.data.current?.sortable?.index
          const overIndex = over.data.current?.sortable?.index

          if (activeIndex !== undefined && overIndex !== undefined) {
            onChange(arrayMove(items, activeIndex, overIndex))
          }
        }
        setActive(null)
      }}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      collisionDetection={closestCorners}
    >
      <div
        style={{
          ...style,
          display: 'grid',
          height: 'fit-content',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '2rem'
        }}
        {...props}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item, index) => (
            <React.Fragment key={getItemKey(item)}>
              <SortableItem id={getItemKey(item)}>{renderItem(item, index)}</SortableItem>
            </React.Fragment>
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
