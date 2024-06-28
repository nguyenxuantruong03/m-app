"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClock,
  AlarmClockOff,
  Timer,
  TimerOff,
  TimerReset,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import { Images as ImageIcon } from "lucide-react";
import { Clock12, Tag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import EditRow from "../_components/edit-row";
import ImageCellMutiple from "@/components/image-cell-multiple";
import FormatDate from "@/components/format-Date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardTimeColumn = {
  id: string;
  label: string;
  timeout: string;
  imagebillboardtime: string[];
  end: string;
  isTimeout: boolean | null;
  imagebillboardtimepatch: { url: string }[];
  endpatch: number | null;
  timeoutpatch: number;
  createdAt: Date
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
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <EditRow
            isActive={row.original.isTimeout}
            timeout={row.original.timeoutpatch}
            end={row.original.endpatch}
            isTimeout={row.original.isTimeout}
            data={row.original.label}
            label={row.original.label}
            id={row.original.id}
            imagebillboardtime={row.original.imagebillboardtimepatch}
            field="label"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "imagebillboardtime",
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
    cell: ({ row }) => {
      const imageUrl = row.original.imagebillboardtimepatch;
      const image = row.original.imagebillboardtime;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
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
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <EditRow
            isActive={row.original.isTimeout}
            label={row.original.label}
            timeout={row.original.timeoutpatch}
            end={row.original.endpatch}
            isTimeout={row.original.isTimeout}
            data={row.original.timeout}
            id={row.original.id}
            imagebillboardtime={row.original.imagebillboardtimepatch}
            field="timeout"
          />
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
      );
    },
    cell: ({ row }) => {
      const isActive = row.original.isTimeout;
      return (
        <div className={isActive ? "line-through text-gray-400" : ""}>
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
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.createdAt}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
