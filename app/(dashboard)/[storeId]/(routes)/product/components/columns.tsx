"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Home, PackageCheck, PackageX } from "lucide-react";

export type ProductColumn = {
  id: string;
  name: string;
  heading: string;
  description: string;
  price: string;
  percentpromotion: string;
  productdetail: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string | null;
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
  },
  {
    accessorKey: "isFeatured",
    header: "Hiển thị trang chính",
    cell: ({ row }) => {
      const isFeatured = row.original.isFeatured;
      return isFeatured ? (
        <Home  className="w-5 h-5 text-green-500" />
      ) : (
        <Home  className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: "Hết hàng",
    cell: ({ row }) => {
      const isArchived = row.original.isArchived;
      return isArchived ? (
        <PackageCheck  className="w-5 h-5 text-green-500" />
      ) : (
        <PackageX  className="w-5 h-5 text-red-500" />
      );
    },
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
