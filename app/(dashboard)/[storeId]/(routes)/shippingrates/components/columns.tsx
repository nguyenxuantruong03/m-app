"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  AlarmClockMinus,
  CircleDollarSign,
  Flag,
  FlagOff,
  Receipt,
  ReceiptText,
  Sparkles,
  Tag,
  Tally1,
  Tally4,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12 } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import {
  getShippingTaxcodeText,
  getTaxBehaviorMessage,
  getUnitText,
} from "@/translate/translate-dashboard";

export type ShippingRatesColumn = {
  id: string;
  name: string;
  taxcode: string | null;
  taxbehavior: string;
  amount: string;
  unitmin: string;
  valuemin: number;
  unitmax: string;
  valuemax: number;
  active: boolean | null;
  amountnotformat: number;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<ShippingRatesColumn>[] = [
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
        data={row.original.name}
        name={row.original.name}
        amount={row.original.amountnotformat}
        id={row.original.id}
        taxbehavior={row.original.taxbehavior}
        valuemin={row.original.valuemin}
        unitmin={row.original.unitmin}
        valuemax={row.original.valuemax}
        unitmax={row.original.unitmax}
        active={row.original.active}
        taxcode={row.original.taxcode}
        field="name"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          số tiền
          <CircleDollarSign className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "taxbehavior",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thuế
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Ví dụ sử dụng
      const language = row.original.language // Ngôn ngữ hiện tại
      const taxBehaviorType = row.original.taxbehavior; // Loại thuế từ dữ liệu
      const taxBehaviorMessage = getTaxBehaviorMessage(
        language,
        taxBehaviorType
      );

      return <div>{taxBehaviorMessage}</div>;
    },
  },
  {
    accessorKey: "valuemin",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian thấp nhất
          <AlarmClockMinus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "unitmin",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đơn vị thấp nhất
          <Tally1 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const language = row.original.language; // Ví dụ ngôn ngữ đang dùng là "vi"
      const unit = row.original.unitmin; // Lấy giá trị đơn vị từ dữ liệu
      const unitText = getUnitText(language, unit);

      return <div>{unitText}</div>;
    },
  },
  {
    accessorKey: "valuemax",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian tối đa
          <AlarmClockCheck className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "unitmax",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đơn vị tối đa
          <Tally4 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const language = row.original.language; // Ví dụ ngôn ngữ đang dùng là "vi"
      const unit = row.original.unitmax; // Lấy giá trị đơn vị từ dữ liệu
      const unitText = getUnitText(language, unit);

      return <div>{unitText}</div>;
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
    accessorKey: "taxcode",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thuế
          <ReceiptText className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Sử dụng hàm getShippingTaxcodeText trong trang của bạn:
      const language = row.original.language; // Ví dụ ngôn ngữ đang sử dụng là "vi"
      const taxcode = row.original.taxcode; // Lấy giá trị mã thuế từ dữ liệu
      const taxcodeText = getShippingTaxcodeText(language, taxcode);

      return <div>{taxcodeText}</div>;
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
      return <FormatDate data={row.original.createdAt} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
