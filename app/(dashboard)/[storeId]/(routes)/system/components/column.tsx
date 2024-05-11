"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Lock, Unlock } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SystemsColumn = {
  id: string;
  newChange: string[];
  oldChange: string[];
  delete: string[];
  banforever: string[];
  timebanforever: string | null;
  isbanforever: boolean | null;
  type: string | null;
  user: string | null;
  createdAt: string | null;
};

export const columns: ColumnDef<SystemsColumn>[] = [
  {
    accessorKey: "oldChange",
    header: "Cũ",
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : "line-through text-gray-400"}>
          {row.original.oldChange}
        </div>
      );
    },
  },
  {
    accessorKey: "newChange",
    header: "Mới",
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
    header: "Xóa",
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
    header: "Ban mãi mãi",
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
    header: "thời gian ban",
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.timebanforever}
        </div>
      );
    },
  },
  {
    accessorKey: "isbanforever",
    header: "isbanforever",
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
    header: "Loại",
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
    header: "Người dùng",
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
    header: "Thời gian tạo",
    cell: ({ row }) => {
      const isBanforever = row.original.isbanforever;
      return (
        <div className={isBanforever ? "line-through text-red-500" : ""}>
          {row.original.createdAt}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
