// Code for TableDetails component goes here
import React, { useState, useContext, useRef } from "react";
import { DragContext } from "../page";
import { DRAG_TYPES } from "../constants";

const TableDetails = (props) => {
  const { item } = props;
  const { id, name, columns } = item;
  const [showColumns, setShowColumns] = useState(false);

  const context = useContext(DragContext);

  const handleShowColumns = () => {
    setShowColumns(!showColumns);
  };

  return (
    <li
      draggable='true'
      onDragStart={(evt) => {
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("text/plain", DRAG_TYPES.TABLE_DRAG);
        context.currentDraggedItem.current = item;
      }}
      onDragEnd={() => {
        context.currentDraggedItem.current = null;
      }}
    >
      {columns.length > 0 && (
        <span onClick={handleShowColumns} className='cursor-pointer'>
          {showColumns ? "-" : "+"}
        </span>
      )}
      {name}
      {showColumns && (
        <ul className='pl-3'>
          {columns.map((column) => (
            <li key={column.column_id}>{column.name}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default TableDetails;
