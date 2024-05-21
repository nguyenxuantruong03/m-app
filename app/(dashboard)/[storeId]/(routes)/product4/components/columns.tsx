"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Home, PackageCheck, PackageX, Tag,ImageUp, Clock12, View  } from "lucide-react";
import { Images  as ImageIcon  } from "lucide-react";
import Image from "next/image";
import SpanColumn from "@/components/span-column";
import { Checkbox } from "@/components/ui/checkbox";

export type ProductColumn = {
  id: string;
  name: string;
  heading: string;
  description: string;
  productdetail: string;
  images: string[];
  imagesalientfeatures: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string | null;
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
          Tên sản phẩm
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const images = row.original.images;
      // Check if the image URL array is available
      if (Array.isArray(images) && images.length > 0) {
        return (
          <div>
            {images.map((imageUrl, index) => (
              <span key={index} className="avatar-overlapping-multiple-image">
                <Image
                  className="avatar-image-overlapping-multiple-image rounded-full"
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  width="50"
                  height="50"
                />
              </span>
            ))}
          </div>
        );
      }
      return "";
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
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imagesalientfeatures = row.original.imagesalientfeatures;
      // Check if the image URL array is available
      if (Array.isArray(imagesalientfeatures) && imagesalientfeatures.length > 0) {
        return (
          <div>
            {imagesalientfeatures.map((imageUrl, index) => (
              <span key={index} className="avatar-overlapping-multiple-image">
                <Image
                  className="avatar-image-overlapping-multiple-image rounded-full"
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  width="50"
                  height="50"
                />
              </span>
            ))}
          </div>
        );
      }
      return "";
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
        <Home  className="w-5 h-5 text-green-500" />
      ) : (
        <Home  className="w-5 h-5 text-red-500" />
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
        <PackageCheck  className="w-5 h-5 text-green-500" />
      ) : (
        <PackageX  className="w-5 h-5 text-red-500" />
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
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
