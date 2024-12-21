"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock12, MessageCircleMore, Tag, ArrowUpRight, AlarmClockCheck  } from "lucide-react";
import { Images as ImageIcon } from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";
import ImageCellOne from "@/components/image-cell-one";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { translateImageBillboardColumn } from "@/translate/translate-dashboard";

interface ImageBillboardHeaderMessage {
  label: string
  description: string
  image: string
  url: string
  updatedTime: string;
  createdTime: string
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof ImageBillboardHeaderMessage; icon: React.ElementType }) => {
  const user = useCurrentUser();
  const imageBillboardHeaderMessage: ImageBillboardHeaderMessage = translateImageBillboardColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = imageBillboardHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string | null;
  description: string | null;
  url: string;
  link: string | null;
  updatedAt: Date
  createdAt: Date;
  language: string
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="label" icon={Tag} />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageCircleMore} />
    ),
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="image" icon={ImageIcon} />
    ),
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imageUrl = row.original.url;
      // Check if the image URL is available
      if (imageUrl) {
        return (
          <ImageCellOne
            imageUrl={imageUrl}
            languageToUse={row.original.language}
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="url" icon={ArrowUpRight} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.updatedAt} language={row.original.language} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate data={row.original.createdAt} language={row.original.language} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
