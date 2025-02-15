"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SpanColumn from "@/components/span-column";
import { Clock12, Coins, Tag, User, Disc, AlarmClockCheck } from "lucide-react";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface WheelSpinHeaderMessage {
  name: string;
  email: string;
  spin: string;
  coin: string;
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
  labelKey: keyof WheelSpinHeaderMessage;
  icon: React.ElementType;
}) => {
   const translate = useTranslations("column.wheelspin"); 
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

export type WheelSpinColumn = {
  id: string;
  name: string | null;
  email: string | null;
  coin: number[];
  rotation: number[];
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<WheelSpinColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={User} />
    ),
  },
  {
    accessorKey: "rotation",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="spin" icon={Disc} />
    ),
  },
  {
    accessorKey: "coin",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="coin" icon={Coins} />
    ),
    cell: ({ row }) => <span>{row.original.coin}</span>,
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
