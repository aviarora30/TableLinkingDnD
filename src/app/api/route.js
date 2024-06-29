// /src/pages/api/tables.js
import { NextResponse } from "next/server";

const tables = [
  {
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
  {
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
  {
    id: "tableId_3",
    name: "table_3",
    columns: [],
  },
];

// Handles GET requests to /api
export async function GET(request) {
  return NextResponse.json(tables);
}

/* // Handles POST requests to /api
export async function POST(request) {
  return NextResponse.json({ message: "Hello World" });
} */
