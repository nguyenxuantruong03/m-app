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
  Smile,
  Meh,
  Frown,
  Annoyed,
  Angry,
  AlarmClockCheck,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface FeedbackHeaderMessage {
  name: string;
  email: string;
  emotion: string;
  category: string;
  content: string;
  updatedTime: string;
  createdTime: string;
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof FeedbackHeaderMessage;
  icon: React.ElementType;
}) => {
  const translate = useTranslations("column.feedback");
  const label = translate(labelKey) || labelKey;

  return (
    <SpanColumn
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FeedBackColumn = {
  id: string;
  emotion: number;
  category: number;
  content: string;
  email: string | null;
  name: string | null;
  updatedAt: Date;
  createdAt: Date;
  language: string;
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={User} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={Contact} />
    ),
  },
  {
    accessorKey: "emotion",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="emotion" icon={Sticker} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.feedback");

      const emotionMap: { [key in 1 | 2 | 3 | 4 | 5]: JSX.Element } = {
        1: (
          <span className="flex items-center space-x-1">
            {translate("good")}
            <Smile className="w-5 h-5 stroke-current fill-[#22c55e] text-slate-900" />
          </span>
        ),
        2: (
          <span className="flex items-center space-x-1">
            {translate("average")}
            <Meh className="w-5 h-5 stroke-current fill-[#2563eb] text-slate-900" />
          </span>
        ),
        3: (
          <span className="flex items-center space-x-1">
            {translate("bad")}
            <Frown className="w-5 h-5 stroke-current fill-[#facc15] text-slate-900" />
          </span>
        ),
        4: (
          <span className="flex items-center space-x-1">
            {translate("poorService")}
            <Annoyed className="w-5 h-5 stroke-current fill-[#dc2626] text-slate-900" />
          </span>
        ),
        5: (
          <span className="flex items-center space-x-1">
            {translate("terrible")}
            <Angry className="w-5 h-5 stroke-current fill-[#f97316] text-slate-900" />
          </span>
        ),
      };

      const emotion = row.original.emotion as 1 | 2 | 3 | 4 | 5;
      return <span>{emotionMap[emotion]}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="category"
        icon={AlignStartVertical}
      />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.feedback"); // Access category translations
  
      const categoryMap: { [key in 1 | 2 | 3 | 4 | 5 | 6]: string } = {
        1: translate("unprofessionalService"),
        2: translate("delayedResponse"),
        3: translate("complicatedPayment"),
        4: translate("noResponse"),
        5: translate("websiteIssues"),
        6: translate("other"),
      };
  
      const category = row.original.category as 1 | 2 | 3 | 4 | 5 | 6;
      return <span>{categoryMap[category]}</span>;
    },
  },
  
  {
    accessorKey: "content",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="content"
        icon={MessageSquareMore}
      />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="updatedTime"
        icon={AlarmClockCheck}
      />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.updatedAt} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.createdAt} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
