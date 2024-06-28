"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Ban,
  Clock12,
  Hourglass,
  Lock,
  Minus,
  Plus,
  ShieldBan,
  Tag,
  Trash,
  Unlock,
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
  banforever: string[];
  timebanforever: Date | null;
  isbanforever: boolean | null;
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : "line-through text-gray-400"
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
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
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.delete}
        </div>
      );
    },
  },
  {
    accessorKey: "banforever",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ban mãi mãi
          <Ban className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.banforever}
        </div>
      );
    },
  },
  {
    accessorKey: "timebanforever",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian ban
          <Hourglass className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          <FormatDate data={row.original.timebanforever} subtractiontime={true}/>;
        </div>
      );
    },
  },
  {
    accessorKey: "isbanforever",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isbanforever
          <ShieldBan className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.isbanforever ? (
            <Lock className="text-green-600" />
          ) : (
            <Unlock className="text-red-600" />
          )}
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
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
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
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.user}
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
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          <FormatDate data={row.original.createdAt} subtractiontime={true}/>;
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
