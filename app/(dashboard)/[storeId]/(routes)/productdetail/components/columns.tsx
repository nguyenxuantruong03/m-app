"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductDetailColumn = {
  id: string;
  title: string;
  name1: string;
  name2: string | null;
  name3: string | null;
  name4: string | null;
  name5: string | null;
  price1: string;
  price2: string | null | undefined;
  price3: string | null  | undefined;
  price4: string | null | undefined;
  price5: string | null | undefined;
  quantity1: number ;
  quantity2: number | null;
  quantity3: number | null;
  quantity4: number | null;
  quantity5: number | null;
  percentpromotion1:string;
  percentpromotion2:string | null;
  percentpromotion3:string | null;
  percentpromotion4:string | null;
  percentpromotion5:string | null;
  promotionheading: string;
  promotiondescription: string;
  warranty1: string | null | undefined;
  warranty2: string | null | undefined;
  warranty3: string | null | undefined;
  warranty4: string | null | undefined;
  size1: string;
  color1: string;
  size2: string | null;
  color2: string | null;
  size3: string | null;
  color3: string | null;
  size4: string | null;
  color4: string | null;
  size5: string | null;
  color5: string | null;
  category: string | null;
  createdAt: string | null;
};

export const columns: ColumnDef<ProductDetailColumn>[] = [
  {
    accessorKey: "title",
    header: "Tiêu đề",
  },
  {
    accessorKey: "name1",
    header: "Tên sản phẩm 1",
  },
  {
    accessorKey: "price1",
    header: "Giá sản phẩm 1",
  },
  {
    accessorKey: "percentpromotion1",
    header: "Giảm giá %",
  },
  {
    accessorKey: "quantity1",
    header: "Sô lượng 1",
  },
  {
    accessorKey: "size1",
    header: "Kích cỡ 1",
  },
  {
    accessorKey: "color1",
    header: "Màu 1",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color1}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color1 }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name2",
    header: "Tên sản phẩm 2",
  },
  {
    accessorKey: "price2",
    header: "Giá sản phẩm 2",
  },
  {
    accessorKey: "percentpromotion2",
    header: "Giảm giá %",
  },
  {
    accessorKey: "quantity2",
    header: "Sô lượng 2",
  },
  {
    accessorKey: "size2",
    header: "Kích cỡ 2",
  },
  {
    accessorKey: "color2",
    header: "Màu 2",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color2 || ""}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color2  || "" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name3",
    header: "Tên sản phẩm 3",
  },
  {
    accessorKey: "price3",
    header: "Giá sản phẩm 3",
  },
  {
    accessorKey: "percentpromotion3",
    header: "Giảm giá %",
  },
  {
    accessorKey: "quantity3",
    header: "Sô lượng 3",
  },
  {
    accessorKey: "size3",
    header: "Kích cỡ 3",
  },
  {
    accessorKey: "color3",
    header: "Màu 3",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color3 || ""}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color3 || "" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name4",
    header: "Tên sản phẩm 4",
  },
  {
    accessorKey: "price4",
    header: "Giá sản phẩm 4",
  },
  {
    accessorKey: "percentpromotion4",
    header: "Giảm giá %",
  },
  {
    accessorKey: "quantity4",
    header: "Sô lượng 4",
  },
  {
    accessorKey: "size4",
    header: "Kích cỡ 4",
  },
  {
    accessorKey: "color4",
    header: "Màu 4",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color4  ||""}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color4 || "" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name5",
    header: "Tên sản phẩm 5",
  },
  {
    accessorKey: "price5",
    header: "Giá sản phẩm 5",
  },
  {
    accessorKey: "percentpromotion5",
    header: "Giảm giá %",
  },
  {
    accessorKey: "quantity5",
    header: "Sô lượng 5",
  },
  {
    accessorKey: "size5",
    header: "Kích cỡ 1",
  },
  {
    accessorKey: "color5",
    header: "Màu 5",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color5 || ""}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color5 || ""}}
        />
      </div>
    ),
  },
  {
    accessorKey: "warranty1",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "warranty2",
    header: "Tiền bảo hiểm ",
  },
  {
    accessorKey: "warranty3",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "warranty4",
    header: "Tiền bảo hiểm",
  },
  {
    accessorKey: "category",
    header: "Loại",
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
