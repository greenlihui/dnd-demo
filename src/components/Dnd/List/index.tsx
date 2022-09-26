/**
 * @file FIX ME WHEN YOU SEE ME! 请对本文件的用途或内容进行说明...
 */

import { FC, useCallback, useState } from "react";
import FlipMove from "react-flip-move";

import { DragAndDrop } from "../../dnd";

import { Item } from "./Item";
import { DndContext, DndListProviderProps, ItemComponent } from "./types";

export const DndListProvider: FC<DndListProviderProps> = ({
  items,
  setItems,
  type,
  options,
  onDragStarts,
  onDragEnds,
  children,
  itemPlaceholder,
}) => {
  const [isAnyDragging, setIsAnyDragging] = useState(false);
  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragItem = items[dragIndex];
        const copy = [...items];
        copy.splice(dragIndex, 1);
        copy.splice(hoverIndex, 0, dragItem);
        setItems(copy);
      }
    },
    [items, setItems]
  );

  return (
    <DndContext.Provider
      value={{
        type,
        isAnyDragging,
        setIsAnyDragging,
        items,
        moveItem,
        onDragEnds,
        onDragStarts,
        options,
        itemPlaceholder,
      }}
    >
      <DragAndDrop>{children}</DragAndDrop>
    </DndContext.Provider>
  );
};

export const List = <T extends object>({
  items,
  component,
  ...props
}: DndListProviderProps<T> & {
  component: ItemComponent<T>;
}) => (
  <DndListProvider {...props} items={items}>
    <FlipMove>
      {items.map((item, index) => (
        <Item key={item.id} index={index} component={component} />
      ))}
    </FlipMove>
  </DndListProvider>
);
