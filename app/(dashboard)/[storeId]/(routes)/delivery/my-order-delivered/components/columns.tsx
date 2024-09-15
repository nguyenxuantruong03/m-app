"use client";

import { ColumnDef } from "@tanstack/react-table";
import SpanColumn from "@/components/span-column";
import {
  MapPin,
  Package,
  Phone,
  Hash,
  Tag,
  SquareUserRound,
  Activity,
  UserPlus,
  Clock12,
  HandCoins,
  Banknote,
  WalletCards,
  Receipt,
  Undo2,
  Undo,
  ImageIcon,
  AlarmClockCheck,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import ImageCellMutiple from "@/components/image-cell-multiple";

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
  emailStaff:string | null | undefined,
  emailShipper:string | null | undefined,
  emailUserGetDebt:string | null | undefined,
  nameStaff:string | null | undefined,
  nameShipper:string | null | undefined,
  nameUserGetDebt:string | null | undefined,
  receiveCash: boolean;
  debtShipper: boolean;
  destiontionReturnProduct:string | null;
  returnProduct: boolean | null;
  imagereturnProduct: { url: string }[];
  imagereturnProductUrl: string[]
  imageCustomer: { url: string }[];
  imageCustomerUrl: string[]
  createdAt: Date;
  updatedAt: Date;
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sản phẩm
          <Package className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "imageCustomer",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh đã giao
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageCustomer = row.original.imageCustomer;
      const image = row.original.imageCustomerUrl;
      return <ImageCellMutiple image={image} imageUrl={imageCustomer} />;
    },
  },
  {
    accessorKey: "emailShipper",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email nhân viên giao hàng
          <UserPlus  className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "nameShipper",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên nhân viên giao hàng
          <UserPlus  className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "returnProduct",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trả hàng
          <Undo2 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.returnProduct ? (
            <Undo  className="h-5 w-5 text-green-600" />
          ) : (
            <Undo  className="h-5 w-5 text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <Activity className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const getStatusDisplay = (status:string) => {
        switch (status) {
          case "Cho_xac_nhan":
            return <span className="text-red-500 font-semibold">Chờ xác nhận</span>;
          case "Soan_hang":
            return <span className="text-yellow-500 font-semibold">Soạn hàng</span>;
          case "Cho_lay_hang":
            return <span className="text-yellow-500 font-semibold">Chờ lấy hàng</span>;
          case "Dang_giao":
            return <span className="text-blue-500 font-semibold">Đang giao</span>;
          case "Giao_lai_hang":
            return <span className="text-yellow-500 font-semibold">Giao hàng lại</span>;
          case "Danh_gia":
            return <span className="text-yellow-500 font-semibold">Đánh giá</span>;
          case "Da_giao":
            return <span className="text-green-500 font-semibold">Đã giao</span>;
          case "Da_huy":
            return <span className="text-red-500 font-semibold">Đã hủy</span>;
          case "Tra_hang":
            return <span className="text-yellow-500 font-semibold">Trả hàng</span>;
          case "Nhan_tai_cua_hang":
            return <span className="text-red-500 font-semibold">Nhận tại cửa hàng</span>;
          case "Soan_hang_nhan_tai_cua_hang":
            return <span className="text-yellow-500 font-semibold">Soạn hàng nhận tại cửa hàng</span>;
          case "Da_soan_hang_xong":
            return <span className="text-blue-500 font-semibold">Đã soạn hàng xong</span>;
          case "Da_nhan_tai_cua_hang":
            return <span className="text-green-500 font-semibold">Đã nhận tại cửa hàng</span>;
          case "Shipper_chuan_bi":
            return <span className="text-yellow-500 font-semibold">Shipper chuẩn bị</span>;
          case "Shipper_dang_den":
            return <span className="text-yellow-500 font-semibold">Shipper đang đến</span>;
          case "Da_nhan_tra_hang":
            return <span className="text-green-500 font-semibold">Đã nhận trả hàng</span>;
          default:
            return <span className="font-semibold">{status}</span>;
        }
      };

      return <div>{getStatusDisplay(status)}</div>;
    },
  },
  {
    accessorKey: "phonenumbercurrent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sđt hệ thống
          <Phone className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "emailcurrent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email hệ thống
          <SquareUserRound className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "namecurrent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên hệ thống
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "addresscurrent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ hệ thống
          <MapPin className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <SquareUserRound className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số điện thoại
          <Phone className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thanh toán
          <WalletCards className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thanh toán tiền mặt
          <WalletCards className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shipper nợ
          <WalletCards className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian cập nhật
          <AlarmClockCheck className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return <FormatDate data={row.original.updatedAt} />;
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
      return <FormatDate data={row.original.createdAt} />;
    },
  },
];
