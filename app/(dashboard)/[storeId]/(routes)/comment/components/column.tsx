"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Clock12,
  MessageCircleMore,
  Package,
  SquareGanttChart,
  SquareUserRound,
  Star,
  Tag,
  User,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";

export type CommentColumn = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  rating: number;
  nameproduct: string;
  comment: string;
  description: string[];
  createdAt: Date;
};

const convertToStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star key={i} />);
  }
  return stars;
};

export const columns: ColumnDef<CommentColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <Tag className="ml-2 h-4 w-4" />
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
          <User className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vai trò
          <SquareUserRound className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đánh giá
          <Star className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => convertToStars(row.original.rating),
  },
  {
    accessorKey: "nameproduct",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name product
          <Package className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nội dung
          <MessageCircleMore className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Response Comment
          <SquareGanttChart className="ml-2 h-4 w-4" />
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
