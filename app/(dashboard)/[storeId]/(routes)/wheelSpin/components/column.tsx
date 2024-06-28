"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SpanColumn from "@/components/span-column";
import { Clock12, Coins, Tag, User, Disc } from "lucide-react";
import FormatDate from "@/components/format-Date";

export type WheelSpinColumn = {
  id: string;
  name: string | null;
  email: string | null;
  coin: number;
  rotation: number;
  createdAt: Date;
};

export const columns: ColumnDef<WheelSpinColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <User className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "rotation",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          vòng quay
          <Disc className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "coin",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Xu
          <Coins className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.coin}</span>;
    },
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
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.createdAt}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
