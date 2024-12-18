"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Flag,
  FlagOff,
  SignalMedium,
  Signal,
  Sparkles,
  Receipt,
  CirclePercent,
  ReceiptText,
  NotebookPen,
  AlarmClockCheck,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12, Tag } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import { taxTypeMapping } from "@/translate/translate-dashboard";

export type TaxRateColumn = {
  id: string;
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<TaxRateColumn>[] = [
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
          Tên
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.name}
        name={row.original.name}
        percentage={row.original.percentage}
        active={row.original.active}
        inclusive={row.original.inclusive}
        taxtype={row.original.taxtype}
        description={row.original.description}
        field="name"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phần trăm giảm
          <CirclePercent className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại thuế
          <ReceiptText className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const taxtypeValue = row.original.taxtype;
      const language = row.original.language; // Ngôn ngữ hiện tại (vi, en, zh, fr, ja)

      if (taxtypeValue === null) {
        return ""; // Trả về chuỗi trống nếu taxtypeValue là null
      }

      // Trả về loại thuế dựa vào ngôn ngữ
      return taxTypeMapping[language]?.[taxtypeValue] || "";
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mô tả
          <NotebookPen className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.description}
        name={row.original.name}
        percentage={row.original.percentage}
        active={row.original.active}
        inclusive={row.original.inclusive}
        taxtype={row.original.taxtype}
        description={row.original.description}
        field="description"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "inclusive",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thuế suất là bao gồm hay độc quyền
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hoạt động
          <Sparkles className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian cập nhật
          <AlarmClockCheck className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.updatedAt}
          language={row.original.language}
        />
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
        <FormatDate
          data={row.original.createdAt}
          language={row.original.language}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
