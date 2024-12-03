"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Home,
  PackageCheck,
  PackageX,
  Tag,
  ImageUp,
  Clock12,
  View,
} from "lucide-react";
import { Images as ImageIcon } from "lucide-react";
import SpanColumn from "@/components/span-column";
import { Checkbox } from "@/components/ui/checkbox";
import ImageCellMutiple from "@/components/image-cell-multiple";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";

export type ProductColumn = {
  id: string;
  name: string;
  heading: string;
  description: string;
  productdetail: string;
  productdetailId: string;
  images: string[];
  imagesalientfeatures: string[];
  isFeatured: boolean;
  isArchived: boolean;
  imagesalientfeaturesUrl: { url: string }[];
  imagesUrl: { url: string }[];
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: "heading",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Heading
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.heading}
        name={row.original.name}
        heading={row.original.heading}
        description={row.original.description}
        productdetail={row.original.productdetail}
        imagesalientfeatures={row.original.imagesalientfeaturesUrl}
        images={row.original.imagesUrl}
        isFeatured={row.original.isFeatured}
        isArchived={row.original.isArchived}
        productdetailId={row.original.productdetailId}
        field="heading"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "images",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.imagesUrl;
      const image = row.original.images;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "imagesalientfeatures",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh nổi bật
          <ImageUp className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.imagesalientfeaturesUrl;
      const image = row.original.imagesalientfeatures;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hiển thị trang chính
          <Home className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isFeatured = row.original.isFeatured;
      return isFeatured ? (
        <Home className="w-5 h-5 text-green-500" />
      ) : (
        <Home className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hết hàng
          <PackageX className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isArchived = row.original.isArchived;
      return isArchived ? (
        <PackageCheck className="w-5 h-5 text-green-500" />
      ) : (
        <PackageX className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "productdetail",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sản phẩm chi tiết
          <View className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
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
      return (
      <FormatDate data={row.original.createdAt}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
