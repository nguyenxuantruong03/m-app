"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { AlarmClockCheck, Clock12, MessageCircleMore, Tag } from "lucide-react";
import { Images as ImageIcon } from "lucide-react";
import SpanColumn from "@/components/span-column";
import EditRow from "../_components/edit-row";
import ImageCellMutiple from "@/components/image-cell-multiple";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface BillboardHeaderMessage {
  label: string;
  description: string;
  image: string;
  updatedTime: string;
  createdTime: string;
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof BillboardHeaderMessage; icon: React.ElementType }) => {
  const translate = useTranslations("column.billboard");
  const label = translate(labelKey) || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export default HeaderColumn;

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  description: string;
  imagebillboard: string[];
  imagebillboardpatch: { url: string }[];
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
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
    accessorKey: "label",
    header: ({ column }) => <HeaderColumn column={column} labelKey="label" icon={Tag} />,
    cell: ({ row }) => (
      <EditRow
        data={row.original.label}
        label={row.original.label}
        id={row.original.id}
        description={row.original.description}
        imagebillboard={row.original.imagebillboardpatch}
        field="label"
      />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => <HeaderColumn column={column} labelKey="description" icon={MessageCircleMore} />,
    cell: ({ row }) => (
      <EditRow
        data={row.original.description}
        label={row.original.label}
        id={row.original.id}
        description={row.original.description}
        imagebillboard={row.original.imagebillboardpatch}
        field="description"
      />
    ),
  },
  {
    accessorKey: "imagebillboard",
    header: ({ column }) => <HeaderColumn column={column} labelKey="image" icon={ImageIcon} />,
    cell: ({ row }) => {
      const imageUrl = row.original.imagebillboardpatch;
      const image = row.original.imagebillboard;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />,
    cell: ({ row }) => <FormatDate data={row.original.updatedAt} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />,
    cell: ({ row }) => <FormatDate data={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
