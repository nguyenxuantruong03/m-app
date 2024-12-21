"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  Clock12,
  Minus,
  Plus,
  Tag,
  Trash,
  User,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { translateSystemColumn } from "@/translate/translate-dashboard";

interface SystemHeaderMessage {
  old: string;
  new: string;
  delete: string;
  type: string;
  user: string;
  updatedTime: string;
  createdTime: string;
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof SystemHeaderMessage; icon: React.ElementType }) => {
  const user = useCurrentUser();
  const systemHeaderMessage: SystemHeaderMessage = translateSystemColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = systemHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SystemsColumn = {
  id: string;
  newChange: string[];
  oldChange: string[];
  delete: string[];
  type: string | null;
  user: string | null;
  updatedAt: Date
  createdAt: Date;
  language: string
};

export const columns: ColumnDef<SystemsColumn>[] = [
  {
    accessorKey: "oldChange",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="old"
        icon={Minus}
      />
    ),
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
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="new"
        icon={Plus}
      />
    ),
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
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="delete"
        icon={Trash}
      />
    ),
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
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="type"
        icon={Tag}
      />
    ),
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
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="user"
        icon={User}
      />
    ),
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="updatedTime"
        icon={AlarmClockCheck}
      />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.updatedAt} language={row.original.language} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="createdTime"
        icon={Clock12}
      />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.createdAt} language={row.original.language} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

