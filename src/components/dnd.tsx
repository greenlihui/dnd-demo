/**
 * @file dnd utils
 */
import React from "react";
// eslint-disable-next-line no-restricted-imports
import { DndProvider } from "react-dnd";
// eslint-disable-next-line no-restricted-imports
import { HTML5Backend } from "react-dnd-html5-backend";

function useDNDProviderElement(props: { children: React.ReactNode }) {
  if (!props.children) return null;

  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
}

/**
 * @util
 * Replacement of <DndProvider />
 * HACK FOR HTML5Backend Issue from https://github.com/react-dnd/react-dnd/issues/186
 * 大概是如果按 dnd 的 demo 使用 DndProvider 的话，当 DndProvider 被重新渲染时，传入的 HTML5Backend 会重新构造一个值，从而导致前后值发生冲突
 * 所以此处是用来稳定 HTML5Backend 的。
 */
export function DragAndDrop(props: { children: React.ReactNode }) {
  const DNDElement = useDNDProviderElement(props);
  return <React.Fragment>{DNDElement}</React.Fragment>;
}
