"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { AlarmClock, AlarmClockOff } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardTimeColumn = {
  id: string;
  label: string;
  timeout: string;
  end: string;
  isTimeout: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
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
    accessorKey: "updatedAt",
    header: "updatedAt",
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      const updatedAt = row.original.updatedAt;
      return (
        <div className={isActive ? 'line-through text-gray-400' : ''}>
          {updatedAt}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
