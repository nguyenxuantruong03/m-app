"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Flag, FlagOff, SignalMedium, Signal } from "lucide-react";
export type TaxRateColumn = {
  id: string;
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  createdAt: string;
};

const taxTypeMapping: Record<string, string> = {
  vat: "VAT",
  sales_tax: "Thuế doanh thu",
};

export const columns: ColumnDef<TaxRateColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "percentage",
    header: "Phần trăm giảm",
    cell: ({ row }) => {
      const percentValue = row.original.percentage;
      if (percentValue != null) {
        return `${percentValue}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "taxtype",
    header: "Loại thuế",
    cell: ({ row }) => {
      const taxtypeValue = row.original.taxtype;
      if (taxtypeValue && taxTypeMapping[taxtypeValue]) {
        return taxTypeMapping[taxtypeValue];
      }
      return "";
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "inclusive",
    header: "Thuế suất là bao gồm hay độc quyền.",
    cell: ({ row }) => {
      const isActive = row.original.inclusive;
      return isActive ? (
        <Signal className="w-5 h-5 text-green-500" />
      ) : (
        <SignalMedium className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "active",
    header: "Hoạt động",
    cell: ({ row }) => {
      const isActive = row.original.active;
      return isActive ? (
        <Flag className="w-5 h-5 text-green-500" />
      ) : (
        <FlagOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
