"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { AlarmClockCheck, AlarmClockMinus, CircleDollarSign, Flag, FlagOff, Receipt, ReceiptText, Sparkles, Tag, Tally1, Tally4 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12 } from "lucide-react";

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
  createdAt: string | null;
};

const taxBehaviorMapping: Record<string, string> = {
  exclusive: "Loại trừ",
  inclusive: "Bao gồm",
  unspecified: "Không xác định",
};

const unitMapping: Record<string, string> = {
  hour: "Giờ",
  day: "Ngày",
  week: "Tuần",
  month: "Tháng",
  business_day: "Ngày làm việc",
};

const ShippingTaxcodeMapping: Record<string, string> = {
  txcd_00000000: "Không chịu thuế",
  txcd_92010001: "Người giao chịu thuế",
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
      const taxbehaviortypeValue = row.original.taxbehavior;
      if (taxbehaviortypeValue && taxBehaviorMapping[taxbehaviortypeValue]) {
        return taxBehaviorMapping[taxbehaviortypeValue];
      }
      return "";
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
      const unimintypeValue = row.original.unitmin;
      if (unimintypeValue && unitMapping[unimintypeValue]) {
        return unitMapping[unimintypeValue];
      }
      return "";
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
      const unitmaxtypeValue = row.original.unitmax;
      if (unitmaxtypeValue && unitMapping[unitmaxtypeValue]) {
        return unitMapping[unitmaxtypeValue];
      }
      return "";
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
      const ShippingtaxcodetypeValue = row.original.taxcode;
      if (ShippingtaxcodetypeValue && ShippingTaxcodeMapping[ShippingtaxcodetypeValue]) {
        return ShippingTaxcodeMapping[ShippingtaxcodetypeValue];
      }
      return "";
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
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
