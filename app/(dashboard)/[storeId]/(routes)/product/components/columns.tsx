"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  name: string
  heading: string
  description: string
  price: string
  priceold: string
  percentpromotion: string
  headingrecommend: string
  infomationrecommend: string
  warrantyrecommend: string
  vatrecommend: string
  promotionheading: string
  promotiondescription: string
  guaranteeheading: string
  guaranteedescription: string
  guaranteeinfomation: string
  guaranteeprice: string
  isFeatured: boolean
  isArchived:boolean
  size: string
  color: string
  category: string
  specifications: string
  salientfeatures: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
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
    accessorKey: "headingrecommend",
    header: "headingrecommend",
  },
  {
    accessorKey: "infomationrecommend",
    header: "infomationrecommend",
  },
  {
    accessorKey: "warrantyrecommend",
    header: "warrantyrecommend",
  },
  {
    accessorKey: "vatrecommend",
    header: "vatrecommend",
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
    accessorKey: "specifications",
    header: "Ppecifications",
  },
  {
    accessorKey: "salientfeatures",
    header: "Salient Features",
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
