"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Circle, NavigationOff, Receipt, SendHorizontal } from "lucide-react";

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
  createdAt: string | null;
  updatedAt: string | null;
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
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "degree",
    header: "degree",
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
    header: "Bonus",
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
    header: "Salaryday",
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
    header: "salarytotal",
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
    header: "IsSent",
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
    header: "IsPaid",
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
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "updatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
