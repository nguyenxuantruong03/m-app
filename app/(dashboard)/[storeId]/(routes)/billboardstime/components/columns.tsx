"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { AlarmClock, AlarmClockOff, Timer, TimerOff, TimerReset } from "lucide-react";
import Image from "next/image";
import SpanColumn from "@/components/span-column";
import { Images as ImageIcon } from "lucide-react";
import { Clock12, Tag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardTimeColumn = {
  id: string;
  label: string;
  timeout: string;
  imagebillboardtime: string[];
  end: string;
  isTimeout: boolean | null;
  createdAt: string | null;
};

export const columns: ColumnDef<BillboardTimeColumn>[] = [
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
          Lable
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      )
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      const label = row.original.label;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {label}
        </div>
      );
    },
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
      )
    },
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imagebillboardtime = row.original.imagebillboardtime;
      // Check if the image URL array is available
      if (Array.isArray(imagebillboardtime) && imagebillboardtime.length > 0) {
        return (
          <div>
            {imagebillboardtime.map((imageUrl, index) => (
              <span key={index} className="avatar-overlapping-multiple-image">
                <Image
                  className="avatar-image-overlapping-multiple-image rounded-full"
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  width="50"
                  height="50"
                />
              </span>
            ))}
          </div>
        );
      }
      return "";
    },
  },
  {
    accessorKey: "timeout",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time out
          <Timer className="ml-2 h-4 w-4" />
        </SpanColumn>
      )
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      const timeout = row.original.timeout;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {timeout}
        </div>
      );
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian hết
          <TimerOff className="ml-2 h-4 w-4" />
        </SpanColumn>
      )
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      const endTime = row.original.end;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {endTime}
        </div>
      );
    },
  },
  
  {
    accessorKey: "isTimeout",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isTimeout
          <TimerReset className="ml-2 h-4 w-4" />
        </SpanColumn>
      )
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {isActive ? (
            <AlarmClock className="w-5 h-5 text-green-500" />
          ) : (
            <AlarmClockOff className="w-5 h-5 text-red-500" />
          )}
        </div>
      );
    },
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
      )
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      const createdAt = row.original.createdAt;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {createdAt}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
