"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Clock12,
  Minus,
  Plus,
  Tag,
  Trash,
  User,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SystemsColumn = {
  id: string;
  newChange: string[];
  oldChange: string[];
  delete: string[];
  type: string | null;
  user: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<SystemsColumn>[] = [
  {
    accessorKey: "oldChange",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cũ
          <Minus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanForeverUser = row.original.type === "BANFOREVER-USER";
      return (
        <div className={isBanForeverUser ? "text-red-500 font-semibold" : ""}>
          {row.original.oldChange}
        </div>
      );
    },
  },
  {
    accessorKey: "newChange",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mới
          <Plus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanForeverUser = row.original.type === "BANFOREVER-USER";
      return (
        <div className={isBanForeverUser ? "text-red-500 font-semibold" : ""}>
          {row.original.newChange}
        </div>
      );
    },
  },
  {
    accessorKey: "delete",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Xóa
          <Trash className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanForeverUser = row.original.type === "BANFOREVER-USER";
      return (
        <div className={isBanForeverUser ? "text-red-500 font-semibold" : ""}>
          {row.original.delete}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanForeverUser = row.original.type === "BANFOREVER-USER";
      return (
        <div className={isBanForeverUser ? "text-red-500 font-semibold" : ""}>
          {row.original.type}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Người dùng
          <User className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanForeverUser = row.original.type === "BANFOREVER-USER";
      return (
        <div className={isBanForeverUser ? "text-blue-500 font-semibold" : ""}>
          {row.original.delete}
        </div>
      );
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
        <div>
          <FormatDate data={row.original.createdAt} subtractiontime={true} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
