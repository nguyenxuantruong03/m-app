"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  NotebookPen,
  SendHorizontal,
  Tag,
  User,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12 } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface SentEmailUserHeaderMessage {
  user: string;
  subject: string;
  sendEmailToUser: string;
  description: string;
  sendMail: string;
  updatedTime: string;
  createdTime: string;
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof SentEmailUserHeaderMessage;
  icon: React.ElementType;
}) => {
    const translate = useTranslations("column.sentEmailUser"); 
    const label = translate(labelKey) || labelKey; 

  return (
    <SpanColumn
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export type SentEmailUserColumn = {
  id: string;
  description: string;
  subject: string;
  user: string | null;
  isSent: boolean | null;
  sentemailuser: string[];
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<SentEmailUserColumn>[] = [
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
    accessorKey: "user",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="user" icon={User} />
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="subject" icon={Tag} />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.subject}
        subject={row.original.subject}
        description={row.original.description}
        field="subject"
      />
    ),
  },
  {
    accessorKey: "sentemailuser",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="sendEmailToUser"
        icon={SendHorizontal}
      />
    ),
    cell: ({ row }) => {
      const cleanedStr = row.original.sentemailuser
        .join(", ")
        .replace(/@\[(.*?)\]\(.*?\)/g, "$1");
      return <span>{cleanedStr}</span>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={NotebookPen} />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.description}
        subject={row.original.subject}
        description={row.original.description}
        field="description"
      />
    ),
  },
  {
    accessorKey: "isSent",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendMail" icon={SendHorizontal} />
    ),
    cell: ({ row }) => {
      const isAllday = row.original.isSent;
      return isAllday ? (
        <SendHorizontal className="w-5 h-5 text-green-500" />
      ) : (
        <SendHorizontal className="w-5 h-5 text-red-500" />
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
      <FormatDate
        data={row.original.updatedAt}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate
        data={row.original.createdAt}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
