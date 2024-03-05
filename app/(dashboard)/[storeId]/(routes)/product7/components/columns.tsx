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
  productdetail: string;
  isFeatured: boolean;
  isArchived: boolean;
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
