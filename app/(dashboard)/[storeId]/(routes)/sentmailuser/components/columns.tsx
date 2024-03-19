"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { SendHorizontal } from "lucide-react";

export type SentEmailUserColumn = {
  id: string;
  description: string;
  subject: string;
  user: string | null;
  isSent: boolean | null;
  createdAt: string;
};

export const columns: ColumnDef<SentEmailUserColumn>[] = [
  {
    accessorKey: "user",
    header: "Mail",
  },
  {
    accessorKey: "subject",
    header: "Chủ đề",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "isSent",
    header: "Gửi",
    cell: ({ row }) => {
      const isAllday = row.original.isSent;
      return isAllday ? (
        <SendHorizontal  className="w-5 h-5 text-green-500" />
      ) : (
        <SendHorizontal  className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
