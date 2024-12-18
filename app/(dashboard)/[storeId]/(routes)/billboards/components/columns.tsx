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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nhãn
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        data={row.original.label}
        label={row.original.label}
        id={row.original.id}
        description={row.original.description}
        imagebillboard={row.original.imagebillboardpatch}
        field= "label"
        language= {row.original.language}
      />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mô tả
          <MessageCircleMore className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        data={row.original.description}
        label={row.original.label}
        id={row.original.id}
        description={row.original.description}
        imagebillboard={row.original.imagebillboardpatch}
        field= "description"
        language= {row.original.language}
      />
    ),
  },
  {
    accessorKey: "imagebillboard",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imageUrl = row.original.imagebillboardpatch;
      const image = row.original.imagebillboard;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian cập nhật
          <AlarmClockCheck  className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.updatedAt} language={row.original.language}/>
      )
    }
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
      return (
      <FormatDate data={row.original.createdAt} language={row.original.language}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
