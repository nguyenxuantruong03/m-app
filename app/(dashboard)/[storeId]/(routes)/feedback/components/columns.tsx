"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import {
  AlignStartVertical,
  Clock12,
  Contact,
  MessageSquareMore,
  Sticker,
  User,
  Smile, Meh, Frown, Annoyed, Angry
} from "lucide-react";
import FormatDate from "@/components/format-Date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FeedBackColumn = {
  id: string;
  emotion: number;
  category: number;
  content: string;
  email: string | null;
  name: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<FeedBackColumn>[] = [
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <User className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <Contact className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "emotion",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cảm xúc
          <Sticker className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const emotionMap: { [key in 1 | 2 | 3 | 4 | 5]: JSX.Element } = {
        1: (
          <span className=" flex items-center space-x-1">
            Tốt <Smile className="w-5 h-5 stroke-current fill-[#22c55e] text-slate-900"/>
          </span>
        ),
        2: (
          <span className=" flex items-center space-x-1">
            Tạm <Meh className="w-5 h-5 stroke-current fill-[#2563eb] text-slate-900"/>
          </span>
        ),
        3: (
          <span className=" flex items-center space-x-1">
            Tệ <Frown className="w-5 h-5 stroke-current fill-[#facc15] text-slate-900"/>
          </span>
        ),
        4: (
          <span className=" flex items-center space-x-1">
            Phục vụ kém <Annoyed className="w-5 h-5 stroke-current fill-[#dc2626] text-slate-900"/>
          </span>
        ),
        5: (
          <span className=" flex items-center space-x-1">
            Quá tệ <Angry className="w-5 h-5 stroke-current fill-[#f97316] text-slate-900"/>
          </span>
        ),
      };
      const emotion = row.original.emotion as 1 | 2 | 3 | 4 | 5;
      return <span>{emotionMap[emotion]}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại
          <AlignStartVertical className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const categoryMap: { [key in 1 | 2 | 3 | 4 | 5 | 6]: string } = {
        1: "Unprofessional service",
        2: "Delayed response from staff",
        3: "Complicated payment",
        4: "No response to the call",
        5: "Website performance issues",
        6: "Other",
      };
      const category = row.original.category as 1 | 2 | 3 | 4 | 5 | 6;
      return <span>{categoryMap[category]}</span>;
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nội dung
          <MessageSquareMore className="ml-2 h-4 w-4" />
        </SpanColumn>
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
      return <FormatDate data={row.original.createdAt} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
