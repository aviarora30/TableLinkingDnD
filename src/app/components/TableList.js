import React from "react";
import TableDetails from "./TableDetails";

// create a react component to render list of items passed as a prop
const TableList = ({ items }) => {
  return (
    <div className='h-full border border-red-900 px-2.5'>
      <ul>
        {items?.map((item) => (
          <TableDetails key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default TableList;
