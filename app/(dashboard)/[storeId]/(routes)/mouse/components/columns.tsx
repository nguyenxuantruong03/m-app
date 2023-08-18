"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  heading: string
  description: string
  price: string
  priceold: string
  percentpromotion: string
  promotionheading: string
  promotiondescription: string
  guaranteeheading: string
  guaranteedescription: string
  guaranteeinfomation: string
  guaranteeprice: string
  descriptionspecifications: string;
  valuespecifications: string;
  description2specifications: string;
  value2specifications: string;
  description3specifications: string;
  value3specifications: string;
  description4specifications: string;
  value4specifications: string;
  description5specifications: string;
  value5specifications: string;
  description6specifications: string;
  value6specifications: string;
  description7specifications: string;
  value7specifications: string;
  description8specifications: string;
  value8specifications: string;
  description9specifications: string;
  value9specifications: string;
  description10specifications: string;
  value10specifications: string;
  description11specifications: string;
  value11specifications: string;
  description12specifications: string;
  value12specifications: string;
  description13specifications: string;
  value13specifications: string;
  description14specifications: string;
  value14specifications: string;
  // salientfeatures:
  descriptionsalientfeatures: string;
  description2salientfeatures: string;
  description3salientfeatures: string;
  description4salientfeatures: string;
  contentsalientfeatures: string;

  isFeatured: boolean
  isArchived:boolean
  size: string
  color: string
  category: string
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "priceold",
    header: "priceold",
  },
  {
    accessorKey: "percentpromotion",
    header: "percentpromotion",
  },
  {
    accessorKey: "promotionheading",
    header: "promotionheading",
  },
  {
    accessorKey: "promotiondescription",
    header: "promotiondescription",
  },
  {
    accessorKey: "guaranteeheading",
    header: "guaranteeheading",
  },
  {
    accessorKey: "guaranteedescription",
    header: "guaranteedescription",
  },
  {
    accessorKey: "guaranteeinfomation",
    header: "guaranteeinfomation",
  },
  {
    accessorKey: "guaranteeprice",
    header: "guaranteeprice",
  },
  {
    accessorKey: "descriptionspecifications",
    header: "descriptionspecifications",
  },
  {
    accessorKey: "valuespecifications",
    header: "valuespecifications",
  },
  {
    accessorKey: "description2specifications",
    header: "description2specifications",
  },
  {
    accessorKey: "value2specifications",
    header: "value2specifications",
  },
  {
    accessorKey: "description3specifications",
    header: "description3specifications",
  },
  {
    accessorKey: "value3specifications",
    header: "value3specifications",
  },
  {
    accessorKey: "description4specifications",
    header: "description4specifications",
  },
  {
    accessorKey: "value4specifications",
    header: "value4specifications",
  },
  {
    accessorKey: "description5specifications",
    header: "description5specifications",
  },
  {
    accessorKey: "value5specifications",
    header: "value5specifications",
  },
  {
    accessorKey: "description6specifications",
    header: "description6specifications",
  },
  {
    accessorKey: "value6specifications",
    header: "value6specifications",
  },
  {
    accessorKey: "description7specifications",
    header: "description7specifications",
  },
  {
    accessorKey: "value7specifications",
    header: "value7specifications",
  },
  {
    accessorKey: "description8specifications",
    header: "description8specifications",
  },
  {
    accessorKey: "value8specifications",
    header: "value8specifications",
  },
  {
    accessorKey: "description9specifications",
    header: "description9specifications",
  },
  {
    accessorKey: "value9specifications",
    header: "value9specifications",
  },
  {
    accessorKey: "description10specifications",
    header: "description10specifications",
  },
  {
    accessorKey: "value10specifications",
    header: "value10specifications",
  },
  {
    accessorKey: "description11specifications",
    header: "description11specifications",
  },
  {
    accessorKey: "value11specifications",
    header: "value11specifications",
  },
  {
    accessorKey: "description12specifications",
    header: "description12specifications",
  },
  {
    accessorKey: "value12specifications",
    header: "value12specifications",
  },
  {
    accessorKey: "description13specifications",
    header: "description13specifications",
  },
  {
    accessorKey: "value13specifications",
    header: "value13specifications",
  },
  {
    accessorKey: "description14specifications",
    header: "description14specifications",
  },
  {
    accessorKey: "value14specifications",
    header: "value14specifications",
  },
  {
    accessorKey: "descriptionsalientfeatures",
    header: "descriptionsalientfeatures",
  },
  {
    accessorKey: "description2salientfeatures",
    header: "description2salientfeatures",
  },
  {
    accessorKey: "description3salientfeatures",
    header: "description3salientfeatures",
  },
  {
    accessorKey: "description4salientfeatures",
    header: "description4salientfeatures",
  },
  {
    accessorKey: "contentsalientfeatures",
    header: "contentsalientfeatures",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "size",
    header: "size",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "color",
    cell: ({row}) =>(
      <div className="flex items-center gap-x-2">
          {row.original.color}
          <div 
          className="h-6 w-6 rounded-full border"
          style={{backgroundColor: row.original.color}}
          />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
