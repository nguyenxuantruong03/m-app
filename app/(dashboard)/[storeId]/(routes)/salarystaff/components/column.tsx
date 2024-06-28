"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Banknote, Circle, Clock12, GraduationCap, HandCoins, NavigationOff, Receipt, SendHorizontal, Tag, User } from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";

export type SalaryStaffsColumn = {
  id: string;
  name: string | null;
  email: string | null;
  salaryday: string | null;
  salarytotal: string | null;
  bonus: string | null;
  isSent: boolean | null;
  isPaid: boolean | null;
  degree: string | null;
  createdAt: Date;
};

const degreeMappings = {
  Elementary: "Tiểu học",
  JuniorHighSchool: "Trung học",
  HighSchool: "Trung học phổ thông",
  JuniorColleges: "Cao đẳng",
  University: "Đại học",
  MastersDegree: "Thạc sĩ",
};

export const columns: ColumnDef<SalaryStaffsColumn>[] = [
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
    accessorKey: "degree",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          degree
          <GraduationCap className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const degreeValue: string | null | undefined = row.original.degree;
      const degreeText = degreeValue
        ? degreeMappings[degreeValue as keyof typeof degreeMappings] || ""
        : "";
      return (
        <div>
          {degreeText}
        </div>
      );
    },
  },
  {
    accessorKey: "bonus",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bonus
          <HandCoins className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const bonus = row.original.bonus;
      return bonus ? (
        <span>{bonus}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "salaryday",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salaryday
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const salaryday = row.original.salaryday;
      const salarydayValue = typeof salaryday === 'string' ? parseInt(salaryday) : salaryday;
      return salarydayValue !== undefined && salarydayValue !== 0 ? (
        <span>{salaryday}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "salarytotal",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          salarytotal
          <Banknote className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const salarytotal = row.original.salarytotal;
      return salarytotal ? (
        <span>{salarytotal}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isSent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IsSent
          <SendHorizontal className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isAllday = row.original.isSent;
      return isAllday ? (
        <SendHorizontal  className="w-5 h-5 text-green-500" />
      ) : (
        <NavigationOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IsPaid
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isAllday = row.original.isPaid;
      return isAllday ? (
        <Receipt className="w-5 h-5 text-green-500" />
      ) : (
        <Receipt className="w-5 h-5 text-red-500" />
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
