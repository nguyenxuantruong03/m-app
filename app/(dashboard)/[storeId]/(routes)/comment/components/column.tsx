"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  Clock12,
  MessageCircleMore,
  MessageCircleReply,
  SquareUserRound,
  Star,
  Tag,
  User,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";
import { useCurrentUser } from "@/hooks/use-current-user";
import { translateCommentColumn } from "@/translate/translate-dashboard";
import React from "react";

interface CommentHeaderMessage {
  name: string
  email: string
  role: string
  rating: string
  comment: string
  feedback: string
  updatedTime: string;
  createdTime: string
}


const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof CommentHeaderMessage; icon: React.ElementType }) => {
  const user = useCurrentUser();
  const commentHeaderMessage: CommentHeaderMessage = translateCommentColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = commentHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export type CommentColumn = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  rating: number;
  comment: string;
  userId: string;
  description: JSX.Element[];
  banExpiresTime: Date | null;
  isbanforever: boolean | undefined | null;
  ban: boolean | null;
  updatedAt: Date
  createdAt: Date;
  language: string;
};

const convertToStars = (rating: number,ban:boolean) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star fill={ban ?  "#9ca3af" : "#F4D03F"} className={ban ?  "text-[#9ca3af]" : "text-[#F4D03F]"} key={i} />);
  }
  return stars;
};

export const columns: ColumnDef<CommentColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={User} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.email}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="role" icon={SquareUserRound} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.role}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="rating" icon={Star} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const ban = isBanforever || isBanned;
      return (
        <div className="flex items-center">
          {convertToStars(row.original.rating, ban)}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="comment" icon={MessageCircleMore} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.comment}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="feedback" icon={MessageCircleReply} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "flex flex-col items-start line-through text-red-500"
              : isBanned
              ? "flex flex-col items-start line-through text-gray-400"
              : "flex flex-col items-start"
          }
        >
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.updatedAt} language={row.original.language} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.createdAt} language={row.original.language} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

