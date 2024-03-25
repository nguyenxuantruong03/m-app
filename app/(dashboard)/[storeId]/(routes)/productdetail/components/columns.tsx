"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductDetailColumn = {
  id: string;
  name: string;
  promotionheading: string;
  promotiondescription: string;
  guaranteeheading: string;
  guaranteedescription: string;
  guaranteeinfomation: string;
  guaranteeprice: string;
  size: string;
  color: string;
  category: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export const columns: ColumnDef<ProductDetailColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "promotionheading",
    header: "Quà tặng sỉ",
  },
  {
    accessorKey: "promotiondescription",
    header: "Quà tặng thầu",
  },
  {
    accessorKey: "guaranteeheading",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "guaranteedescription",
    header: "Tiền bảo hiểm ",
  },
  {
    accessorKey: "guaranteeinfomation",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "guaranteeprice",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "size",
    header: "Kích cỡ",
  },
  {
    accessorKey: "category",
    header: "Loại",
  },
  {
    accessorKey: "color",
    header: "Màu",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày",
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
