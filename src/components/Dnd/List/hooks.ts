/**
 * @file FIX ME WHEN YOU SEE ME! 请对本文件的用途或内容进行说明...
 */

import React from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'

import { DragItem, DragDirectionEnum, DndContext } from './types'

export function useDndItem({
  ref,
  index,
}: {
  ref: React.MutableRefObject<HTMLElement>
  index: number
}) {
  const {
    type,
    isAnyDragging,
    setIsAnyDragging,
    items,
    moveItem,
    onDragStarts,
    onDragEnds,
    itemPlaceholder,
    options: {
      customDrop = false,
      customSource = false,
      customPreview = false,
      direction = DragDirectionEnum.Vertical,
    } = {},
  } = React.useContext(DndContext)

  if (!type || !items || !moveItem || !setIsAnyDragging) {
    throw Error(
      'no DndContext provider found, nest your component to packages/components/Dnd/List',
    )
  }

  const [, drop] = useDrop<DragItem>({
    accept: type,
    hover(draggingItem, monitor: DropTargetMonitor) {
      const dragIndex = draggingItem.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      let isBeforeHovered = false
      switch (direction) {
        case DragDirectionEnum.Vertical: {
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          /*
           * Only perform the move when the mouse has crossed half of the items height
           * When dragging downwards, only move when the cursor is below 50%
           * When dragging upwards, only move when the cursor is above 50%
           * Dragging downwards
           */
          isBeforeHovered = hoverClientY < hoverMiddleY
          break
        }

        case DragDirectionEnum.Horizontal: {
          // Get vertical middle
          const hoverMiddleX =
            (hoverBoundingRect.right - hoverBoundingRect.left) / 2

          // Get pixels to the top
          const hoverClientX = clientOffset.x - hoverBoundingRect.left
          /*
           * Only perform the move when the mouse has crossed half of the items width
           * When dragging downwards, only move when the cursor is below 50%
           * When dragging upwards, only move when the cursor is above 50%
           * Dragging downwards
           */
          isBeforeHovered = hoverClientX < hoverMiddleX
          break
        }

        default:
          throw Error('invalid drag direction')
      }

      // Dragging upwards
      if (dragIndex < hoverIndex === isBeforeHovered) {
        return
      }

      moveItem(dragIndex, hoverIndex)

      /*
       * Note: we're mutating the monitor item here!
       * Generally it's better to avoid mutations,
       * but it's good here for the sake of performance
       * to avoid expensive index searches.
       */
      // eslint-disable-next-line no-param-reassign
      draggingItem.index = hoverIndex
    },
  })

  const item = items?.[index] || itemPlaceholder

  if (!item) {
    throw Error('index overflow or itemPlaceholder not provided')
  }

  const [{ isDragging }, dragSource, dragPreview] = useDrag({
    type,
    item: () => {
      setIsAnyDragging(true)
      onDragStarts?.()
      return { id: item.id, index } as DragItem
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setIsAnyDragging(false)
      onDragEnds?.()
    },
  })

  React.useEffect(() => {
    if (!customDrop) {
      drop(ref)
    }
  }, [drop, customDrop, ref])

  React.useEffect(() => {
    if (!customSource) {
      dragSource(ref)
    }
  }, [dragSource, customSource, ref])

  React.useEffect(() => {
    if (!customPreview) {
      dragPreview(ref)
    }
  }, [dragPreview, customPreview, ref])

  return {
    drop,
    dragSource,
    dragPreview,
    item,
    isAnyDragging,
    isDragging,
  } as const
}
