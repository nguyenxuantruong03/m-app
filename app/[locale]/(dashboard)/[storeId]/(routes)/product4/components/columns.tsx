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
  AlarmClockCheck,
  NotebookText,
} from "lucide-react";
import { Images as ImageIcon } from "lucide-react";
import SpanColumn from "@/components/span-column";
import { Checkbox } from "@/components/ui/checkbox";
import ImageCellMutiple from "@/components/image-cell-multiple";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface ProductHeaderMessage {
  productName: string;
  image: string;
  featuredImage: string;
  showOnHomePage: string;
  outOfStock: string;
  description: string;
  productDetail: string;
  updatedTime: string;
  createdTime: string;
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof ProductHeaderMessage;
  icon: React.ElementType;
}) => {
    const translate = useTranslations("column.product"); 
    const label = translate(labelKey) || labelKey; 

  return (
    <SpanColumn
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

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
  updatedAt: Date;
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName" icon={Tag} />
    ),
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
      />
    ),
  },
  {
    accessorKey: "images",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="image" icon={ImageIcon} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.imagesUrl;
      const image = row.original.images;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "imagesalientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredImage" icon={ImageUp} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.imagesalientfeaturesUrl;
      const image = row.original.imagesalientfeatures;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="showOnHomePage" icon={Home} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="outOfStock" icon={PackageX} />
    ),
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
    accessorKey: "description",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="description"
        icon={NotebookText}
      />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.description}
        name={row.original.name}
        heading={row.original.heading}
        description={row.original.description}
        productdetail={row.original.productdetail}
        imagesalientfeatures={row.original.imagesalientfeaturesUrl}
        images={row.original.imagesUrl}
        isFeatured={row.original.isFeatured}
        isArchived={row.original.isArchived}
        productdetailId={row.original.productdetailId}
        field="description"
      />
    ),
  },
  {
    accessorKey: "productdetail",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productDetail" icon={View} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="updatedTime"
        icon={AlarmClockCheck}
      />
    ),
    cell: ({ row }) => (
      <FormatDate
        data={row.original.updatedAt}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate
        data={row.original.createdAt}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
