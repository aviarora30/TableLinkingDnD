"use client";
import TableList from "./components/TableList";
import useSWR from "swr";
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import DropArea from "./components/DropArea";

const temp = {
  T1: {
    data: {
      id: "T1",
      name: "imp",
      columns: [
        {
          column_id: "col_1",
          name: "emp_salary",
          column_data_type: "number",
        },
        {
          column_id: "col_2",
          name: "emp_name",
          column_data_type: "string",
        },
        {
          column_id: "col_3",
          name: "col_3",
          column_data_type: "string",
        },
        {
          column_id: "col_4",
          name: "col_4",
          column_data_type: "string",
        },
        {
          column_id: "col_5",
          name: "col_5",
          column_data_type: "string",
        },
        {
          column_id: "col_6",
          name: "col_6",
          column_data_type: "string",
        },
      ],
    },
    dropPos: {
      x: 492,
      y: 156,
    },
  },
  T2: {
    data: {
      id: "T2",
      name: "table_2",
      columns: [
        {
          column_id: "C1",
          name: "table_2_Col_1",
          column_data_type: "number",
        },
        {
          column_id: "C2",
          name: "table_2_Col_2",
          column_data_type: "string",
        },
      ],
    },
    dropPos: {
      x: 988,
      y: 212,
    },
  },
}
const fetcher = (url) => fetch(url).then((res) => res.json());

export const DragContext = createContext();

export default function Home() {
  const { data, error } = useSWR("/api", fetcher);
  const [droppedItems, setDroppedItems] = useState({});
  const [links, setLinks] = useState({});
  const currentDraggedItem = useRef(null);

  useEffect(() => {
    setLinks((prev) => {
      return {...links} 
    });
  },[droppedItems])

  const tableDropped = useCallback(
    (table, dropPos, isReposition) => {
      if (!isReposition && droppedItems[table.id]) {
        // write code to highlight the table
        alert("item already present");
      } else {
        setDroppedItems({ ...droppedItems, [table.id]: { data: table, dropPos } });
      }
    },
    [droppedItems]
  );

  const tableRemoved = useCallback(
    (id) => {
      if (droppedItems[id]) {
        const newDroppedItems = { ...droppedItems };
        delete newDroppedItems[id];

        const newLinks = { ...links };
        Object.entries(links).forEach(([key]) => {
          key.split("$$").every((item) => {
            if (item.split("__")[0] === id) {
              delete newLinks[key];
              return false;
            }
            return true;
          });
        });
        setLinks(newLinks);
        setDroppedItems(newDroppedItems);
      }
    },
    [droppedItems, links]
  );

  const linkColumns = useCallback(
    (source, target) => {
      const key = [source, target].sort().join("$$");
      if (links[key]) {
        return;
      }
      setLinks({ ...links, [key]: [source, target] });
    },
    [links]
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  return (
    <DragContext.Provider
      value={{
        droppedItems,
        currentDraggedItem,
        setDroppedItems,
        tableDropped,
        tableRemoved,
        linkColumns,
      }}
    >
      <div className='flex h-full'>
        <TableList items={data} />
        <DropArea items={droppedItems} links={links} />
      </div>
    </DragContext.Provider>
  );
}
