"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  name: string
  description: string;
  description2: string;
  description3: string;
  description4: string;
  content: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "description2",
    header: "Description 2",
  },
  {
    accessorKey: "description3",
    header: "Description 3",
  },
  {
    accessorKey: "description4",
    header: "Description 4",
  },
  {
    accessorKey: "content",
    header: "Content",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
