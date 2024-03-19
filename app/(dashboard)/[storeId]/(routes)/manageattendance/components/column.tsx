"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tally4, Tally5, CalendarOff } from "lucide-react";

export type ManageAttendancesColumn = {
  id: string;
  attendancestart: string | null;
  attendanceend: string | null;
  title: string | null;
  start: string | null;
  end: string | null;
  allDay: boolean | null;
  user: string | null;
  wokingTime: string | null;
  email: string | null;
};

export const columns: ColumnDef<ManageAttendancesColumn>[] = [
  {
    accessorKey: "user",
    header: "Tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "wokingTime",
    header: "Thời gian làm việc",
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "start",
    header: "start",
  },
  {
    accessorKey: "end",
    header: "end",
    cell: ({ row }) => {
      const endTime = row.original.end;
      return endTime ? (
        <span>{endTime}</span>
      ) : (
        <CalendarOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "allDay",
    header: "allDay",
    cell: ({ row }) => {
      const isAllday = row.original.allDay;
      return isAllday ? (
        <Tally4 className="w-5 h-5 text-green-500" />
      ) : (
        <Tally5 className="w-5 h-5 text-red-500" />
      );
    },
  },
];
