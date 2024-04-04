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
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "percentpromotion1",
    header: "Giảm giá %",
  },
  {
    accessorKey: "promotiondescription",
    header: "Quà tặng thầu",
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
    accessorKey: "size1",
    header: "Kích cỡ",
  },
  {
    accessorKey: "category",
    header: "Loại",
  },
  {
    accessorKey: "color1",
    header: "Màu",
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
    accessorKey: "createdAt",
    header: "Ngày",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
