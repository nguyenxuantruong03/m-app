"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import {
  Hash,
  Tag,
  CircleDollarSign,
  Tornado,
  CirclePercent,
  HandCoins,
  Heading,
  Book,
  Ruler,
  Palette,
  Scale3D,
  Clock12,
  AlarmClockCheck,
  MessageSquareText,
  MessageSquareMore,
  NotepadText,
  RectangleEllipsis,
} from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { translateProductDetailColumn } from "@/translate/translate-dashboard";

interface ProductDetailHeaderMessage {
  title: string;
  productName1: string;
  productPrice1: string;
  discount1: string;
  quantity1: string;
  size1: string;
  color1: string;
  productName2: string;
  productPrice2: string;
  discount2: string;
  quantity2: string;
  size2: string;
  color2: string;
  productName3: string;
  productPrice3: string;
  discount3: string;
  quantity3: string;
  size3: string;
  color3: string;
  productName4: string;
  productPrice4: string;
  discount4: string;
  quantity4: string;
  size4: string;
  color4: string;
  productName5: string;
  productPrice5: string;
  discount5: string;
  quantity5: string;
  size5: string;
  color5: string;
  promotionTitle: string;
  promotionContent: string;
  insurance1: string;
  insurance2: string;
  insurance3: string;
  insurance4: string;
  type: string;
  description: string;
  specifications: string;
  featuredDescription1: string;
  featuredDescription2: string;
  featuredDescription3: string;
  featuredDescription4: string;
  featuredContent: string;
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
  labelKey: keyof ProductDetailHeaderMessage;
  icon: React.ElementType;
}) => {
  const user = useCurrentUser();
  const productDetailHeaderMessage: ProductDetailHeaderMessage =
    translateProductDetailColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = productDetailHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

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
  price3: string | null | undefined;
  price4: string | null | undefined;
  price5: string | null | undefined;
  quantity1: number;
  quantity2: number | null;
  quantity3: number | null;
  quantity4: number | null;
  quantity5: number | null;
  percentpromotion1: string;
  percentpromotion2: string | null;
  percentpromotion3: string | null;
  percentpromotion4: string | null;
  percentpromotion5: string | null;
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

  //notformat
  pricenotformat1: Decimal | null;
  pricenotformat2: Decimal | null;
  pricenotformat3: Decimal | null;
  pricenotformat4: Decimal | null;
  pricenotformat5: Decimal | null;
  percentpromotionnotformat1: Decimal | null;
  percentpromotionnotformat2: Decimal | null;
  percentpromotionnotformat3: Decimal | null;
  percentpromotionnotformat4: Decimal | null;
  percentpromotionnotformat5: Decimal | null;
  warrantynotformat1: Decimal | null;
  warrantynotformat2: Decimal | null;
  warrantynotformat3: Decimal | null;
  warrantynotformat4: Decimal | null;

  //content
  descriptionspecifications: string;
  valuespecifications: string;
  description2specifications: string | null;
  value2specifications: string | null;
  description3specifications: string | null;
  value3specifications: string | null;
  description4specifications: string | null;
  value4specifications: string | null;
  description5specifications: string | null;
  value5specifications: string | null;
  description6specifications: string | null;
  value6specifications: string | null;
  description7specifications: string | null;
  value7specifications: string | null;
  description8specifications: string | null;
  value8specifications: string | null;
  description9specifications: string | null;
  value9specifications: string | null;
  description10specifications: string | null;
  value10specifications: string | null;
  description11specifications: string | null;
  value11specifications: string | null;
  description12specifications: string | null;
  value12specifications: string | null;
  description13specifications: string | null;
  value13specifications: string | null;
  description14specifications: string | null;
  value14specifications: string | null;
  descriptionsalientfeatures: string;
  description2salientfeatures: string;
  description3salientfeatures: string;
  description4salientfeatures: string;
  contentsalientfeatures: string;
  size1Id: string;
  color1Id: string;
  size2Id: string | null;
  color2Id: string | null;
  size3Id: string | null;
  color3Id: string | null;
  size4Id: string | null;
  color4Id: string | null;
  size5Id: string | null;
  color5Id: string | null;
  categoryId: string;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

const LongCell = ({ field, data, datas }: any) => {
  return (
    <EditRow
      id={datas.id}
      data={data} // Sử dụng title như key để truy cập dữ liệu tương ứng trong object data
      title={datas.title} // Truyền title vào để sử dụng khi cần thiết
      name1={datas.name1}
      name2={datas.name2}
      name3={datas.name3}
      name4={datas.name4}
      name5={datas.name5}
      price1={datas.pricenotformat1}
      price2={datas.pricenotformat2}
      price3={datas.pricenotformat3}
      price4={datas.pricenotformat4}
      price5={datas.pricenotformat5}
      percentpromotion1={datas.percentpromotionnotformat1}
      percentpromotion2={datas.percentpromotionnotformat2}
      percentpromotion3={datas.percentpromotionnotformat3}
      percentpromotion4={datas.percentpromotionnotformat4}
      percentpromotion5={datas.percentpromotionnotformat5}
      quantity1={datas.quantity1}
      quantity2={datas.quantity2}
      quantity3={datas.quantity3}
      quantity4={datas.quantity4}
      quantity5={datas.quantity5}
      promotionheading={datas.promotionheading}
      promotiondescription={datas.promotiondescription}
      warranty1={datas.warrantynotformat1}
      warranty2={datas.warrantynotformat2}
      warranty3={datas.warrantynotformat3}
      warranty4={datas.warrantynotformat4}
      size1={datas.size1Id}
      color1={datas.color1Id}
      size2={datas.size2Id}
      color2={datas.color2Id}
      size3={datas.size3Id}
      color3={datas.color3Id}
      size4={datas.size4Id}
      color4={datas.color4Id}
      size5={datas.size5Id}
      color5={datas.color5Id}
      descriptionspecifications={datas.descriptionspecifications}
      valuespecifications={datas.valuespecifications}
      description2specifications={datas.description2specifications}
      value2specifications={datas.value2specifications}
      description3specifications={datas.description3specifications}
      value3specifications={datas.value3specifications}
      description4specifications={datas.description4specifications}
      value4specifications={datas.value4specifications}
      description5specifications={datas.description5specifications}
      value5specifications={datas.value5specifications}
      description6specifications={datas.description6specifications}
      value6specifications={datas.value6specifications}
      description7specifications={datas.description7specifications}
      value7specifications={datas.value7specifications}
      description8specifications={datas.description8specifications}
      value8specifications={datas.value8specifications}
      description9specifications={datas.description9specifications}
      value9specifications={datas.value9specifications}
      description10specifications={datas.description10specifications}
      value10specifications={datas.value10specifications}
      description11specifications={datas.description11specifications}
      value11specifications={datas.value11specifications}
      description12specifications={datas.description12specifications}
      value12specifications={datas.value12specifications}
      description13specifications={datas.description13specifications}
      value13specifications={datas.value13specifications}
      description14specifications={datas.description14specifications}
      value14specifications={datas.value14specifications}
      descriptionsalientfeatures={datas.descriptionsalientfeatures}
      description2salientfeatures={datas.description2salientfeatures}
      description3salientfeatures={datas.description3salientfeatures}
      description4salientfeatures={datas.description4salientfeatures}
      contentsalientfeatures={datas.contentsalientfeatures}
      category={datas.categoryId}
      language={datas.language}
      field={field}
    />
  );
};

export const columns: ColumnDef<ProductDetailColumn>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="title" icon={Hash} />
    ),
    cell: ({ row }) => (
      <LongCell field="title" data={row.original.title} datas={row.original} />
    ),
  },
  {
    accessorKey: "name1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName1" icon={Tag} />
    ),
    cell: ({ row }) => (
      <LongCell field="name1" data={row.original.name1} datas={row.original} />
    ),
  },
  {
    accessorKey: "price1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productPrice1" icon={CircleDollarSign} />
    ),
    cell: ({ row }) => (
      <LongCell field="price1" data={row.original.price1} datas={row.original} />
    ),
  },
  {
    accessorKey: "percentpromotion1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discount1" icon={CirclePercent} />
    ),
    cell: ({ row }) => (
      <LongCell field="percentpromotion1" data={row.original.percentpromotionnotformat1} datas={row.original} />
    ),
  },
  {
    accessorKey: "quantity1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="quantity1" icon={Tornado} />
    ),
    cell: ({ row }) => (
      <LongCell field="quantity1" data={row.original.quantity1} datas={row.original} />
    ),
  },
  {
    accessorKey: "size1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="size1" icon={Scale3D} />
    ),
  },
  {
    accessorKey: "color1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color1" icon={Palette} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color1}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color1 }} />
      </div>
    ),
  },
  {
    accessorKey: "name2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName2" icon={Tag} />
    ),
    cell: ({ row }) => (
      <LongCell field="name2" data={row.original.name2} datas={row.original} />
    ),
  },
  {
    accessorKey: "price2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productPrice2" icon={CircleDollarSign} />
    ),
    cell: ({ row }) => (
      <LongCell field="price2" data={row.original.price2} datas={row.original} />
    ),
  },
  {
    accessorKey: "percentpromotion2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discount2" icon={CirclePercent} />
    ),
    cell: ({ row }) => (
      <LongCell field="percentpromotion2" data={row.original.percentpromotionnotformat2} datas={row.original} />
    ),
  },
  {
    accessorKey: "quantity2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="quantity2" icon={Tornado} />
    ),
    cell: ({ row }) => (
      <LongCell field="quantity2" data={row.original.quantity2} datas={row.original} />
    ),
  },
  {
    accessorKey: "size2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="size2" icon={Scale3D} />
    ),
  },
  {
    accessorKey: "color2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color2" icon={Palette} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color2 || ""}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color2 || "" }} />
      </div>
    ),
  },
  {
    accessorKey: "name3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName3" icon={Tag} />
    ),
    cell: ({ row }) => (
      <LongCell field="name3" data={row.original.name3} datas={row.original} />
    ),
  },
  {
    accessorKey: "price3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productPrice3" icon={CircleDollarSign} />
    ),
    cell: ({ row }) => (
      <LongCell field="price3" data={row.original.price3} datas={row.original} />
    ),
  },
  {
    accessorKey: "percentpromotion3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discount3" icon={CirclePercent} />
    ),
    cell: ({ row }) => (
      <LongCell field="percentpromotion3" data={row.original.percentpromotionnotformat3} datas={row.original} />
    ),
  },
  {
    accessorKey: "quantity3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="quantity3" icon={Tornado} />
    ),
    cell: ({ row }) => (
      <LongCell field="quantity3" data={row.original.quantity3} datas={row.original} />
    ),
  },
  {
    accessorKey: "size3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="size3" icon={Scale3D} />
    ),
  },
  {
    accessorKey: "color3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color3" icon={Palette} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color3 || ""}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color3 || "" }} />
      </div>
    ),
  },
  {
    accessorKey: "name4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName4" icon={Tag} />
    ),
    cell: ({ row }) => (
      <LongCell field="name4" data={row.original.name4} datas={row.original} />
    ),
  },
  {
    accessorKey: "price4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productPrice4" icon={CircleDollarSign} />
    ),
    cell: ({ row }) => (
      <LongCell field="price4" data={row.original.price4} datas={row.original} />
    ),
  },
  {
    accessorKey: "percentpromotion4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discount4" icon={CirclePercent} />
    ),
    cell: ({ row }) => (
      <LongCell field="percentpromotion4" data={row.original.percentpromotionnotformat4} datas={row.original} />
    ),
  },
  {
    accessorKey: "quantity4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="quantity4" icon={Tornado} />
    ),
    cell: ({ row }) => (
      <LongCell field="quantity4" data={row.original.quantity4} datas={row.original} />
    ),
  },
  {
    accessorKey: "size4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="size4" icon={Scale3D} />
    ),
  },
  {
    accessorKey: "color4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color4" icon={Palette} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color4 || ""}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color4 || "" }} />
      </div>
    ),
  },
  {
    accessorKey: "name5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productName5" icon={Tag} />
    ),
    cell: ({ row }) => (
      <LongCell field="name5" data={row.original.name5} datas={row.original} />
    ),
  },
  {
    accessorKey: "price5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="productPrice5" icon={CircleDollarSign} />
    ),
    cell: ({ row }) => (
      <LongCell field="price5" data={row.original.price5} datas={row.original} />
    ),
  },
  {
    accessorKey: "percentpromotion5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discount5" icon={CirclePercent} />
    ),
    cell: ({ row }) => (
      <LongCell field="percentpromotion5" data={row.original.percentpromotionnotformat5} datas={row.original} />
    ),
  },
  {
    accessorKey: "quantity5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="quantity5" icon={Tornado} />
    ),
    cell: ({ row }) => (
      <LongCell field="quantity5" data={row.original.quantity5} datas={row.original} />
    ),
  },
  {
    accessorKey: "size5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="size5" icon={Scale3D} />
    ),
  },
  {
    accessorKey: "color5",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="color5" icon={Palette} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color5 || ""}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color5 || "" }} />
      </div>
    ),
  },
  {
    accessorKey: "promotionheading",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="promotionTitle" icon={Heading} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="promotionheading"
        data={row.original.promotionheading}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "promotiondescription",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="promotionContent" icon={Book} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="promotiondescription"
        data={row.original.promotiondescription}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "warranty1",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="insurance1" icon={HandCoins} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="warranty1"
        data={row.original.warranty1}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "warranty2",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="insurance2" icon={HandCoins} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="warranty2"
        data={row.original.warranty2}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "warranty3",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="insurance3" icon={HandCoins} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="warranty3"
        data={row.original.warranty3}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "warranty4",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="insurance4" icon={HandCoins} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="warranty4"
        data={row.original.warranty4}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="type" icon={Ruler} />
    ),
  },
  {
    accessorKey: "descriptionspecifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="descriptionspecifications"
        data={row.original.descriptionspecifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "valuespecifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="valuespecifications"
        data={row.original.valuespecifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description2specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description2specifications"
        data={row.original.description2specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value2specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value2specifications"
        data={row.original.value2specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description3specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description3specifications"
        data={row.original.description3specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value3specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value3specifications"
        data={row.original.value3specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description4specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description4specifications"
        data={row.original.description4specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value4specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value4specifications"
        data={row.original.value4specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description5specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description5specifications"
        data={row.original.description5specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value5specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value5specifications"
        data={row.original.value5specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description6specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description6specifications"
        data={row.original.description6specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value6specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value6specifications"
        data={row.original.value6specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description7specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description7specifications"
        data={row.original.description7specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value7specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value7specifications"
        data={row.original.value7specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description8specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description8specifications"
        data={row.original.description8specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value8specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value8specifications"
        data={row.original.value8specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description9specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description9specifications"
        data={row.original.description9specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value9specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value9specifications"
        data={row.original.value9specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description10specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description10specifications"
        data={row.original.description10specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value10specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value10specifications"
        data={row.original.value10specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description11specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description11specifications"
        data={row.original.description11specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value11specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value11specifications"
        data={row.original.value11specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description12specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description12specifications"
        data={row.original.description12specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value12specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value12specifications"
        data={row.original.value12specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description13specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description13specifications"
        data={row.original.description13specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value13specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value13specifications"
        data={row.original.value13specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description14specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={MessageSquareMore} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description14specifications"
        data={row.original.description14specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "value14specifications",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="specifications" icon={MessageSquareText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="value14specifications"
        data={row.original.value14specifications}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "descriptionsalientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredDescription1" icon={NotepadText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="descriptionsalientfeatures"
        data={row.original.descriptionsalientfeatures}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description2salientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredDescription2" icon={NotepadText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description2salientfeatures"
        data={row.original.description2salientfeatures}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description3salientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredDescription3" icon={NotepadText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description3salientfeatures"
        data={row.original.description3salientfeatures}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "description4salientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredDescription4" icon={NotepadText} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="description4salientfeatures"
        data={row.original.description4salientfeatures}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "contentsalientfeatures",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="featuredContent" icon={RectangleEllipsis} />
    ),
    cell: ({ row }) => (
      <LongCell
        field="contentsalientfeatures"
        data={row.original.contentsalientfeatures}
        datas={row.original}
      />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.updatedAt}
          language={row.original.language}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.createdAt}
          language={row.original.language}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
