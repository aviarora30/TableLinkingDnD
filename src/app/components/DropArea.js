import React, { useContext, useRef, useState } from "react";
import { DragContext } from "../page";
import ExpandedTable from "./ExpandedTable";
import { DRAG_TYPES } from "../constants";
import LinkLine from "./LinkLine";

function DropArea({ items, links }) {
  const context = useContext(DragContext);
  const { tableDropped, currentDraggedItem } = context;
  const [dummy, setDummy] = useState(0);

  const scrollCb = () => {
    setDummy((prev) => {
      return (prev + 1);
    })
  }

  return (
    <div
      className='h-full flex-1 border border-red-900'
      onDragOver={(evt) => {
        evt.preventDefault();
      }}
      onDrop={(evt) => {
        evt.preventDefault();
        const type = evt.dataTransfer.getData("text/plain");

        if (type === DRAG_TYPES.TABLE_DRAG || type === DRAG_TYPES.TABLE_REPOSITION) {
          const dropPos = { x: evt.pageX, y: evt.pageY };
          tableDropped(currentDraggedItem.current, dropPos, type === DRAG_TYPES.TABLE_REPOSITION);
          currentDraggedItem.current = null;
        }
      }}
    >
      {Object.entries(items).map(([key, value]) => {
        return (
          <ExpandedTable 
            key={value.id} 
            data={value.data} 
            dropPos={value.dropPos} 
            scrollCb={scrollCb} />
        );
      })}
      {Object.entries(links).map(([key, val]) => {
        return <LinkLine key={key} data={val} />;
      })}
    </div>
  );
}

export default DropArea;
