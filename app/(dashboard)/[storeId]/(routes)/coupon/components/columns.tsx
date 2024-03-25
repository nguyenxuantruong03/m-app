"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Circle } from "lucide-react";
export type CouponColumn = {
  id: string;
  name: string | null;
  percent: number | null;
  durationinmoth: number | null;
  duration: string | null;
  maxredemptions: number | null;
  redeemby: string | null;
  imagecoupon: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

const durationMapping: Record<string, string> = {
  forever: "mãi mãi",
  once: "một lần mỗi tháng",
  repeating: "lặp đi lặp lại mỗi tháng",
};

export const columns: ColumnDef<CouponColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "imagecoupon",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imagecoupon;
      if (imageUrl) {
        return (
          <Image src={imageUrl} alt="User Avatar" width="50" height="50" />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "percent",
    header: "Phần trăm giảm",
    cell: ({ row }) => {
      const percentValue = row.original.percent;
      if (percentValue != null) {
        return `${percentValue}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "duration",
    header: "Khoảng thời gian",
    cell: ({ row }) => {
      const durationValue = row.original.duration;
      if (durationValue && durationMapping[durationValue]) {
        return durationMapping[durationValue];
      }
      return "";
    },
  },
  {
    accessorKey: "maxredemptions",
    header: "Số lượng tối đa được giảm giá",
    cell: ({ row }) => {
      const maxRedemptionsValue = row.original.maxredemptions;
      if (maxRedemptionsValue != null) {
        return `${maxRedemptionsValue} người dùng`;
      }
      return "";
    },
  },
  {
    accessorKey: "durationinmoth",
    header: "Tháng lặp lại",
    cell: ({ row }) => {
      const durationValue = row.original.durationinmoth;
      if (durationValue != null) {
        if (durationValue !== 0) {
          return `${durationValue} tháng`;
        } else {
          return <Circle className="text-red-600" />;
        }
      }
      return <Circle className="text-red-600" />;
    },
  },
  {
    accessorKey: "redeemby",
    header: "Thời gian hết hạn",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày",
  },
  {
    accessorKey: "updatedAt",
    header: "updatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
