"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Star } from "lucide-react";

export type CommentColumn = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  rating: number;
  nameproduct: string;
  comment: string;
  description: string[];
  createdAt: string | null;
};

const convertToStars = (rating:number) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star key={i} />);
  }
  return stars;
};

export const columns: ColumnDef<CommentColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "rating",
    header: "Đánh giá",
    cell: ({ row }) => convertToStars(row.original.rating),
  },
  {
    accessorKey: "nameproduct",
    header: "nameproduct",
  },
  {
    accessorKey: "comment",
    header: "Nội dung",
  },
  {
    accessorKey: "description",
    header: "ResponseComment",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
