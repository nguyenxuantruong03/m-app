"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Flag, FlagOff } from "lucide-react";
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
  createdAt: string;
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
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
  },
  {
    accessorKey: "taxbehavior",
    header: "Hành vi thuế",
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
    header: "Thời gian thấp nhất",
  },
  {
    accessorKey: "unitmin",
    header: "Đơn vị thấp nhất",
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
    header: "Thời gian tối đa",
  },
  {
    accessorKey: "unitmax",
    header: "Đơn vị tối đa",
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
    accessorKey: "taxcode",
    header: "Thuế",
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
    header: "Ngày",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
