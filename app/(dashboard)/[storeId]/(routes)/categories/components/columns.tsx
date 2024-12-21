"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { AlarmClockCheck, Clock12, Package } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import { useCurrentUser } from "@/hooks/use-current-user";
import { translateCategoryColumn } from "@/translate/translate-dashboard";
import React from "react";

interface CategoryHeaderMessage {
  name: string
  updatedTime: string;
  createdTime: string
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof CategoryHeaderMessage; icon: React.ElementType }) => {
  const user = useCurrentUser();
  const categoryHeaderMessage: CategoryHeaderMessage = translateCategoryColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = categoryHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesColumn = {
  id: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
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
        id={row.original.id}
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => <FormatDate data={row.original.updatedAt} language={row.original.language} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => <FormatDate data={row.original.createdAt} language={row.original.language} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
