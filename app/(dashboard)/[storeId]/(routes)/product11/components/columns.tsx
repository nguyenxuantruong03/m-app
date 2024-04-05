"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Home, PackageCheck, PackageX } from "lucide-react";
import Image from "next/image";

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
    accessorKey: "heading",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "images",
    header: "Hình ảnh",
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
    header: "Hình ảnh nổi bật",
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
