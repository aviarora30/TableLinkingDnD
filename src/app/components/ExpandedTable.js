import React, { useContext } from "react";
import { DragContext } from "../page";
import { DRAG_TYPES } from "../constants";
import { isVisible } from "../utils";

function ExpandedTable(props) {
  const context = useContext(DragContext);
  const { tableRemoved, currentDraggedItem, linkColumns } = context;
  const {
    data,
    dropPos: { x, y },
    scrollCb,
  } = props;

  const handleRemove = () => {
    tableRemoved(data.id);
  };

  return (
    <div
      className='absolute inline-block min-w-72 border bg-white'
      style={{ left: `${x}px`, top: `${y}px` }}
      draggable='true'
      onDragStart={(evt) => {
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("text/plain", DRAG_TYPES.TABLE_REPOSITION);
        currentDraggedItem.current = data;
      }}
      onDragEnd={() => {
        currentDraggedItem.current = null;
      }}
    >
      <div className='border p-2'>
        {data.name} <span onClick={handleRemove}>X</span>
      </div>
      <div 
        id={`${data.id}`} 
        className='max-h-24 overflow-auto border p-2'
        onScroll={scrollCb}
      >
        <table className='w-full'>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Data Type</th>
            </tr>
          </thead>
          <tbody>
            {data.columns.map((column) => (
              <tr
                key={column.column_id}
                id={`${data.id}__${column.column_id}`}
                className="border"
                draggable='true'
                onDragStart={(evt) => {
                  evt.stopPropagation();
                  evt.dataTransfer.effectAllowed = "move";
                  evt.dataTransfer.setData("text/plain", DRAG_TYPES.LINK_COLUMNS);
                  currentDraggedItem.current = { tableId: data.id, columnId: column.column_id };
                }}
                onDragEnd={() => {
                  currentDraggedItem.current = null;
                }}
                onDrop={(evt) => {
                  evt.preventDefault();
                  const type = evt.dataTransfer.getData("text/plain");
                  if (type === DRAG_TYPES.LINK_COLUMNS) {
                    if (currentDraggedItem.current.tableId === data.id) {
                      return;
                    }

                    linkColumns(
                      `${currentDraggedItem.current.tableId}__${currentDraggedItem.current.columnId}`,
                      `${data.id}__${column.column_id}`
                    );
                    context.currentDraggedItem.current = null;
                  }
                }}
              >
                <td>{column.name}</td>
                <td>{column.column_data_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-center'>Scroll to see more columns</div>
    </div>
  );
}

export default ExpandedTable;
