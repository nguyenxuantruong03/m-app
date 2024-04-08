"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type WheelSpinColumn = {
  id: string;
  name: string | null;
  email: string | null;
  coin: number[];
  rotation: number[];
  createdAt: string | null;
};

export const columns: ColumnDef<WheelSpinColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rotation",
    header: "vòng quay",
  },
  {
    accessorKey: "coin",
    header: "xu",
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
