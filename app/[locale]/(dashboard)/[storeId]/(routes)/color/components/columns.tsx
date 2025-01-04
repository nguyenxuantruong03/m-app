"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { AlarmClockCheck, Clock12, Package, Palette } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface ColorHeaderMessage {
  name: string
  color: string
  updatedTime: string;
  createdTime: string
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof ColorHeaderMessage; icon: React.ElementType }) => {
  const translate = useTranslations("column.color");
  const label = translate(labelKey) || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  updatedAt: Date
  createdAt: Date
  language: string;
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Package} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color" icon={Palette} />
    ),
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.updatedAt} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.createdAt} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

