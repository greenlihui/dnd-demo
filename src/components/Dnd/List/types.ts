/**
 * @file FIX ME WHEN YOU SEE ME! 请对本文件的用途或内容进行说明...
 */

import React, { Key } from 'react'
import {
  ConnectDragSource,
  ConnectDragPreview,
  ConnectDropTarget,
} from 'react-dnd'

type TargetType = string | symbol

export interface DndDataItem<T = any> {
  id: React.Key // key for rendering item list
  props: T // props parsed to item component
}

export type ItemComponent<T> = React.FC<
  {
    isDragging: boolean
    isAnyDragging: boolean
    drop: ConnectDropTarget
    dragSource: ConnectDragSource
    dragPreview: ConnectDragPreview
  } & T
>

export enum DragDirectionEnum {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type ItemOptions = {
  customDrop?: boolean
  customSource?: boolean
  customPreview?: boolean
  direction?: DragDirectionEnum
}

export type Move = (dragIndex: number, hoverIndex: number) => void

export interface ItemProps<T = any> {
  index: number
  component: ItemComponent<T>
  className?: string
  key: React.Key
}

export interface DragItem {
  id: string
  type: symbol | string
  index: number
}

export type DndContextType = {
  type?: TargetType
  isAnyDragging?: boolean
  setIsAnyDragging?: (v: boolean) => void
  items?: DndDataItem[]
  moveItem?: (fromIndex: number, toIndex: number) => void
  onDragStarts?: () => void
  onDragEnds?: () => void
  options?: ItemOptions
  itemPlaceholder?: DndDataItem
}

export interface DndListProviderProps<T = any> {
  items: DndDataItem<T>[]
  setItems: (items: DndDataItem<T>[]) => void
  onDragStarts?: () => void
  onDragEnds?: () => void
  type: string | symbol // uniq id for dnd container to identify its items
  options?: ItemOptions
  // 处理溢出、假元素占位时使用的 placeholder
  itemPlaceholder?: DndDataItem<T>
}

export const DndContext = React.createContext<DndContextType>({})
