"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesColumn = {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null
}

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "updatedAt",
    header: "updatedAt",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
