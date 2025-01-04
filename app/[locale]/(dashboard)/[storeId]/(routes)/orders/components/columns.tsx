"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SpanColumn from "@/components/span-column";
import {
  CircleDollarSign,
  Clock12,
  Gift,
  HandCoins,
  MapPin,
  Package,
  Phone,
  User,
  Banknote,
  Hash,
  Tag,
  SquareUserRound,
  ReceiptText,
  NotebookPen,
  Activity,
  UserPlus,
  WalletCards,
  Receipt,
  Undo2,
  Undo,
  ImageIcon,
  AlarmClockCheck,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import ImageCellMutiple from "@/components/image-cell-multiple";
import React from "react";
import { useTranslations } from "next-intl";

interface OrderHeaderMessage {
  product: string;
  returnImage: string;
  deliveredImage: string;
  return: string;
  status: string;
  otherStatus: string;
  deliveryStaffEmail: string;
  deliveryStaffName: string;
  emailShipper: string;
  nameShipper: string;
  debtCollectionEmail: string;
  debtCollectionName: string;
  systemPhone: string;
  systemEmail: string;
  systemName: string;
  systemAddress: string;
  email: string;
  name: string;
  phoneNumber: string;
  gender: string;
  paymentMethod: string;
  notes: string;
  address: string;
  otherAddress: string;
  totalAmount: string;
  reward: string;
  payment: string;
  cashPayment: string;
  shipperDebt: string;
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
      <HeaderColumn column={column} labelKey="product" icon={Package} />
    ),
  },
  {
    accessorKey: "imagereturnProduct",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="returnImage" icon={ImageIcon} />
    ),
    cell: ({ row }) => {
      const imagereturnProduct = row.original.imagereturnProduct;
      const image = row.original.imagereturnProductUrl;
      return <ImageCellMutiple image={image} imageUrl={imagereturnProduct} />;
    },
  },
  {
    accessorKey: "imageCustomer",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="deliveredImage"
        icon={ImageIcon}
      />
    ),
    cell: ({ row }) => {
      const imageCustomer = row.original.imageCustomer;
      const image = row.original.imageCustomerUrl;
      return <ImageCellMutiple image={image} imageUrl={imageCustomer} />;
    },
  },
  {
    accessorKey: "returnProduct",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="return" icon={Undo2} />
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
        <span className={`font-semibold ${statusColor}`}>{statusText}</span>
      );
    },
  },
  {
    accessorKey: "statusOther",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="otherStatus" icon={Package} />
    ),
  },
  {
    accessorKey: "emailStaff",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="deliveryStaffEmail"
        icon={UserPlus}
      />
    ),
  },
  {
    accessorKey: "nameStaff",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="deliveryStaffName"
        icon={UserPlus}
      />
    ),
  },
  {
    accessorKey: "emailShipper",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="emailShipper" icon={UserPlus} />
    ),
  },
  {
    accessorKey: "nameShipper",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="nameShipper" icon={UserPlus} />
    ),
  },
  {
    accessorKey: "emailUserGetDebt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="debtCollectionEmail"
        icon={UserPlus}
      />
    ),
  },
  {
    accessorKey: "nameUserGetDebt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="debtCollectionName"
        icon={UserPlus}
      />
    ),
  },
  {
    accessorKey: "phonenumbercurrent",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="systemPhone" icon={Phone} />
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
      <HeaderColumn column={column} labelKey="systemName" icon={Tag} />
    ),
  },
  {
    accessorKey: "addresscurrent",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="systemAddress" icon={MapPin} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={SquareUserRound} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="phoneNumber" icon={Phone} />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="gender" icon={User} />
    ),
  },
  {
    accessorKey: "deliveryMethod",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="paymentMethod"
        icon={ReceiptText}
      />
    ),
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="notes" icon={NotebookPen} />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="address" icon={MapPin} />
    ),
  },
  {
    accessorKey: "addressOther",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="otherAddress" icon={MapPin} />
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="totalAmount"
        icon={CircleDollarSign}
      />
    ),
  },
  {
    accessorKey: "isGift",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="reward" icon={Gift} />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isGift?.[0] !== undefined && (
            <div>
              {row.original.isGift[0] ? (
                <Gift className="h-5 w-5 text-green-600" />
              ) : (
                <Gift className="h-5 w-5 text-red-600" />
              )}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="payment" icon={WalletCards} />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isPaid ? (
            <Banknote className="h-5 w-5 text-green-600" />
          ) : (
            <Banknote className="h-5 w-5 text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "receiveCash",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="cashPayment" icon={WalletCards} />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.receiveCash ? (
            <HandCoins className="h-5 w-5 text-green-600" />
          ) : (
            <HandCoins className="h-5 w-5 text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "debtShipper",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="shipperDebt" icon={WalletCards} />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.debtShipper ? (
            <Receipt className="h-5 w-5 text-green-600" />
          ) : (
            <Receipt className="h-5 w-5 text-red-600" />
          )}
        </div>
      );
    },
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
      <HeaderColumn column={column} labelKey="createTime" icon={Clock12} />
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
