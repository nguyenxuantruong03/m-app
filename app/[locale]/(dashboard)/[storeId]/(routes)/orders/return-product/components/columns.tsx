"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SpanColumn from "@/components/span-column";
import {
  MapPin,
  Package,
  Phone,
  Hash,
  Tag,
  SquareUserRound,
  Activity,
  Clock12,
  ImageIcon,
  Undo2,
  Undo,
  AlarmClockCheck,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import ImageCellMutiple from "@/components/image-cell-multiple";
import React from "react";
import { useTranslations } from "next-intl";

interface OrderHeaderMessage {
  product: string;
  returnImage: string;
  return: string;
  reasonForReturn: string;
  status: string;
  emailShipper: string;
  nameShipper: string;
  systemPhone: string;
  systemEmail: string;
  systemName: string;
  systemAddress: string;
  email: string;
  name: string;
  phoneNumber: string;
  gender: string;
  address: string;
  updateTime: string;
  createTime: string;
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof OrderHeaderMessage;
  icon: React.ElementType;
}) => {
  const translate = useTranslations("column.order"); 
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  products: string;
  phone: string;
  address: string;
  email: string;
  emailcurrent: string | null | undefined;
  name: string | null;
  namecurrent: string | null | undefined;
  phonenumbercurrent: string | null | undefined;
  addresscurrent: string | null | undefined;
  note: string | null;
  gender: string | null;
  addressOther: string | null;
  deliveryMethod: string | null;
  isGift: boolean[] | null | undefined;
  isPaid: boolean;
  totalPrice: string;
  status: string;
  statusOther: string | null;
  emailStaff: string | null | undefined;
  emailShipper: string | null | undefined;
  emailUserGetDebt: string | null | undefined;
  nameStaff: string | null | undefined;
  nameShipper: string | null | undefined;
  nameUserGetDebt: string | null | undefined;
  receiveCash: boolean;
  debtShipper: boolean;
  destiontionReturnProduct: string | null;
  returnProduct: boolean | null;
  imagereturnProduct: { url: string }[];
  imagereturnProductUrl: string[];
  imageCustomer: { url: string }[];
  imageCustomerUrl: string[];
  createdAt: Date;
  updatedAt: Date;
  language: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <Hash className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="product"
        icon={Package}
      />
    ),
  },
  {
    accessorKey: "imagereturnProduct",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="returnImage"
        icon={ImageIcon}
      />
    ),
    cell: ({ row }) => {
      const imagereturnProduct = row.original.imagereturnProduct;
      const image = row.original.imagereturnProductUrl;
      return <ImageCellMutiple image={image} imageUrl={imagereturnProduct} />;
    },
  },
  {
    accessorKey: "destiontionReturnProduct",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="reasonForReturn"
        icon={Undo2}
      />
    ),
  },
  {
    accessorKey: "returnProduct",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="return"
        icon={Undo2}
      />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.returnProduct ? (
          <Undo className="h-5 w-5 text-green-600" />
        ) : (
          <Undo className="h-5 w-5 text-red-600" />
        )}
      </div>
    ),
  },
  {
      accessorKey: "status",
      header: ({ column }) => (
        <HeaderColumn column={column} labelKey="status" icon={Activity} />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const translate = useTranslations("column.status"); // Access "status" namespace
        const statusText = translate(status) || status; // Get translation or fallback to status key if not found
  
        let statusColor = "";
  
        switch (status) {
          case "Cho_xac_nhan":
          case "Da_huy":
          case "Nhan_tai_cua_hang":
            statusColor = "text-red-500";
            break;
          case "Soan_hang":
          case "Cho_lay_hang":
          case "Giao_lai_hang":
          case "Danh_gia":
          case "Shipper_chuan_bi":
          case "Shipper_dang_den":
          case "Tra_hang":
          case "Soan_hang_nhan_tai_cua_hang":
            statusColor = "text-yellow-500";
            break;
          case "Dang_giao":
          case "Da_soan_hang_xong":
          case "Shipper_chuan_bi":
            statusColor = "text-blue-500";
            break;
          case "Da_giao":
          case "Da_nhan_tra_hang":
          case "Da_nhan_tai_cua_hang":
            statusColor = "text-green-500";
            break;
          default:
            statusColor = "text-gray-500"; // Default case if status not found
            break;
        }
  
        return (
          <span className={`font-semibold ${statusColor}`}>
            {statusText}
          </span>
        );
      },
    },
  {
    accessorKey: "phonenumbercurrent",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="systemPhone"
        icon={Phone}
      />
    ),
  },
  {
    accessorKey: "emailcurrent",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="systemEmail"
        icon={SquareUserRound}
      />
    ),
  },
  {
    accessorKey: "namecurrent",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="systemName"
        icon={Tag}
      />
    ),
  },
  {
    accessorKey: "addresscurrent",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="systemAddress"
        icon={MapPin}
      />
    ),
  },
  {
    accessorKey: "email",
      header: ({ column }) => (
        <HeaderColumn
          column={column}
          labelKey="email"
          icon={SquareUserRound}
        />
      ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn
          column={column}
          labelKey="name"
          icon={Tag}
        />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <HeaderColumn
          column={column}
          labelKey="phoneNumber"
          icon={Phone}
        />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="updateTime"
        icon={AlarmClockCheck}
      />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.updatedAt}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="createTime"
        icon={Clock12}
      />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.createdAt}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
