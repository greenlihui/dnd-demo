/**
 * @file FIX ME WHEN YOU SEE ME! 请对本文件的用途或内容进行说明...
 */

import React, { forwardRef, useRef } from "react";
import { Flipped } from "react-flip-toolkit";
import styled, { css } from "styled-components";

import { useDndItem } from "./hooks";
import { ItemProps } from "./types";

export const Item = forwardRef<any, ItemProps>(
  ({ index, component: Component, className }, ref) => {
    const myRef = useRef<any>(null);
    const { drop, dragPreview, dragSource, isAnyDragging, isDragging, item } =
      useDndItem({ ref: myRef, index });

    /*
     * transform - Issue see: https://github.com/react-dnd/react-dnd/issues/788#issuecomment-367300464
     * why wrapped by div see: https://github.com/reactjs/rfcs/pull/97#issuecomment-578897408
     */
    return (
      <ItemContainer
        $isDragging={isDragging}
        ref={(node) => {
          myRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{ transform: "translate(0, 0)" }}
        className={className}
      >
        <Component
          {...item.props}
          isAnyDragging={isAnyDragging}
          isDragging={isDragging}
          drop={drop}
          dragPreview={dragPreview}
          dragSource={dragSource}
        />
      </ItemContainer>
    );
  }
);

// FIXME 同位置的其他元素会有 hover 效果, 暂时没有解决方案
const ItemContainer = styled.div<{ $isDragging: boolean }>`
  ${(props) =>
    props.$isDragging &&
    css`
      opacity: 0;
    `};
  position: relative;
`;
