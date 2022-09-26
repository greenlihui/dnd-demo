import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import styled from "styled-components";
import { DndListProvider } from "../../components/Dnd/List";
import { Item } from "../../components/Dnd/List/Item";
import { DndDataItem, ItemComponent } from "../../components/Dnd/List/types";

type DataType = {
  text: string;
  height: number;
};

const data = [
  { text: "test1", height: 60 },
  { text: "test2", height: 120 },
  { text: "test3", height: 100 },
  { text: "test4", height: 100 },
  { text: "test5", height: 110 },
  { text: "test6", height: 100 },
  { text: "test7", height: 80 },
  { text: "test8", height: 100 },
  { text: "test9", height: 150 },
  { text: "test10", height: 100 },
  { text: "test11", height: 90 },
  { text: "test12", height: 100 },
];

export const Example = () => {
  const [items, setItems] = useState<Array<DndDataItem<DataType>>>(
    data.map((d) => ({ id: d.text, props: d }))
  );
  return (
    <DndListProvider items={items} setItems={(t) => setItems(t)} type={"list"}>
      {items.map((item, idx) => (
        <Item key={item.id} index={idx} component={comp} />
      ))}
    </DndListProvider>
  );
};

const comp: ItemComponent<DataType> = ({ height, text }) => {
  return <StyledItem style={{ height }}>{text}</StyledItem>;
};

const StyledItem = styled.div`
  border: 1px solid gray;
  margin: 8px 0;
  background-color: aliceblue;
`;
