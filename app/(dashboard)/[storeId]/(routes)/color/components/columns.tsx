"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12, Package, Palette } from "lucide-react";
import EditRow from "../_components/edit-row";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string | null;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <Package className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        data={row.original.name}
        name={row.original.name}
        id={row.original.id}
        value={row.original.value}
        field="name"
      />
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Màu
          <Palette className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        data={row.original.value}
        name={row.original.name}
        id={row.original.id}
        value={row.original.value}
        field="value"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian tạo
          <Clock12 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
