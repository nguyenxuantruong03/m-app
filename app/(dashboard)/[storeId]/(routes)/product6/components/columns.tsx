"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  heading: string;
  description: string;
  price: string;
  percentpromotion: string;
  promotionheading: string;
  promotiondescription: string;
  guaranteeheading: string;
  guaranteedescription: string;
  guaranteeinfomation: string;
  guaranteeprice: string;
  isFeatured: boolean;
  isArchived: boolean;
  size: string;
  color: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên đường dẫn(URL) ghi ko dấu không cách",
  },
  {
    accessorKey: "heading",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "price",
    header: "Giá tiền",
  },
  {
    accessorKey: "percentpromotion",
    header: "Giảm %",
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
    accessorKey: "isFeatured",
    header: "Hiển thị trang chính",
  },
  {
    accessorKey: "isArchived",
    header: "Hết hàng",
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
