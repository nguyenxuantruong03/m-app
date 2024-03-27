"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Decimal } from "@prisma/client/runtime/library";

export type ProductColumn = {
  id: string;
  name: string;
  heading: string;
  description: string;
  price: string;
  percentpromotion: Decimal;
  productdetail: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export const columns: ColumnDef<ProductColumn>[] = [
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
    cell: ({ row }) => {
      const percentpromotion = row.original.percentpromotion;
      if (percentpromotion != null) {
        return `${percentpromotion}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Hiển thị trang chính",
  },
  {
    accessorKey: "productdetail",
    header: "Sản phẩm chi tiết",
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
