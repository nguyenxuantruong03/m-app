"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { AlarmClock, AlarmClockOff } from "lucide-react";
import Image from "next/image";
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
    accessorKey: "label",
    header: "Label",
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
    header: "Hình ảnh",
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
    header: "timeout",
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
    header: "Thời gian hết",
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
    header: "isTimeout",
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
    header: "Date",
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
