"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SpecificationColumn = {
  id: string
  name: string
  description:string
  value:string
  description2:string
  value2:string
  description3:string
  value3:string
  description4:string
  value4:string
  description5:string
  value5:string
  description6:string
  value6:string
  description7:string
  value7:string
  description8:string
  value8:string
  description9:string
  value9:string
  description10:string
  value10:string
  createdAt: string
}

export const columns: ColumnDef<SpecificationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description 1",
  },
  {
    accessorKey: "value",
    header: "Value 1",
  },
  {
    accessorKey: "description2",
    header: "Description 2",
  },
  {
    accessorKey: "value2",
    header: "Value 2",
  },
  {
    accessorKey: "description3",
    header: "Description 3",
  },
  {
    accessorKey: "value3",
    header: "Value 3",
  },
   {
    accessorKey: "description4",
    header: "Description 4",
  },
  {
    accessorKey: "value4",
    header: "Value 4",
  },
  {
    accessorKey: "description5",
    header: "Description 5",
  },
  {
    accessorKey: "value5",
    header: "Value 5",
  },
  {
    accessorKey: "description6",
    header: "Description 6",
  },
  {
    accessorKey: "value6",
    header: "Value 6",
  },
  {
    accessorKey: "description7",
    header: "Description 7",
  },
  {
    accessorKey: "value7",
    header: "Value 7",
  },
  {
    accessorKey: "description8",
    header: "Description 8",
  },
  {
    accessorKey: "value8",
    header: "Value 8",
  },
   {
    accessorKey: "description9",
    header: "Description 9",
  },
  {
    accessorKey: "value9",
    header: "Value 9",
  },
  {
    accessorKey: "description10",
    header: "Description 10",
  },
  {
    accessorKey: "value10",
    header: "Value 10",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
