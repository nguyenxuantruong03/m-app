"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  AlarmClockOff,
  Circle,
  Hourglass,
  ImageIcon,
  Repeat2,
  Tag,
  TicketPercent,
  TrendingDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12 } from "lucide-react";
import ImageCellMutiple from "@/components/image-cell-multiple";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import { getUsersLabel, getMonthLabel, translateCouponColumn } from '@/translate/translate-dashboard';
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

interface CouponHeaderMessage {
  name: string
  discountImage: string
  discountPercentage: string
  timeRange: string
  userCount: string
  durationInMonth: string
  rewardExchange: string
  updatedTime: string;
  createdTime: string
}

// Header trasnlate
const HeaderColumn = ({ column, labelKey, icon }: { column: any; labelKey: keyof CouponHeaderMessage; icon: React.ElementType }) => {
  const user = useCurrentUser();
  const couponHeaderMessage: CouponHeaderMessage = translateCouponColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = couponHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export type CouponColumn = {
  id: string;
  name: string | null;
  percent: number | null;
  durationinmoth: number | null;
  duration: string | null;
  maxredemptions: number | null;
  redeemby: Date | null;
  imagecoupon: string[] | null;
  redeembypatch: Date | null;
  imagecouponpatch: { url: string }[];
  updatedAt: Date;
  createdAt: Date;
  language: string
};

export const columns: ColumnDef<CouponColumn>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.name}
        name={row.original.name}
        percent={row.original.percent}
        durationinmoth={row.original.durationinmoth}
        duration={row.original.duration}
        maxredemptions={row.original.maxredemptions}
        redeemby={row.original.redeembypatch}
        imagecoupon={row.original.imagecouponpatch}
        field="name"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "imagecoupon",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discountImage" icon={ImageIcon} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.imagecouponpatch;
      const image = row.original.imagecoupon;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "percent",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discountPercentage" icon={TicketPercent} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="timeRange" icon={Hourglass} />
    ),
    cell: ({ row }) => {
      const getDurationLabel = (durationValue: string | null, language: string): string => {
        if (!durationValue) return "";

        switch (language) {
          case "vi":
            return {
              forever: "mãi mãi",
              once: "một lần mỗi tháng",
              repeating: "lặp đi lặp lại mỗi tháng",
            }[durationValue] || "";
          case "en":
            return {
              forever: "forever",
              once: "once a month",
              repeating: "repeating every month",
            }[durationValue] || "";
          case "zh":
            return {
              forever: "永远",
              once: "每月一次",
              repeating: "每月重复",
            }[durationValue] || "";
          case "fr":
            return {
              forever: "pour toujours",
              once: "une fois par mois",
              repeating: "répétitif chaque mois",
            }[durationValue] || "";
          case "ja":
            return {
              forever: "永遠",
              once: "毎月一回",
              repeating: "毎月繰り返し",
            }[durationValue] || "";
          default:
            return "";
        }
      };

      const language = row.original.language;
      const durationValue = row.original.duration;
      return getDurationLabel(durationValue, language);
    },
  },
  {
    accessorKey: "maxredemptions",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="userCount" icon={TrendingDown} />
    ),
    cell: ({ row }) => {
      const maxRedemptionsValue = row.original.maxredemptions;
      const language = row.original.language;
      if (maxRedemptionsValue != null) {
        return `${maxRedemptionsValue} ${getUsersLabel(language, maxRedemptionsValue)}`;
      }
      return "";
    },
  },
  {
    accessorKey: "durationinmoth",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="durationInMonth" icon={Repeat2} />
    ),
    cell: ({ row }) => {
      const durationValue = row.original.durationinmoth;
      const language = row.original.language;

      if (durationValue != null) {
        if (durationValue !== 0) {
          return `${durationValue} ${getMonthLabel(language)}`;
        } else {
          return <Circle className="text-red-600" />;
        }
      }
      return <Circle className="text-red-600" />;
    },
  },
  {
    accessorKey: "redeemby",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="rewardExchange" icon={AlarmClockOff} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.redeemby} language={row.original.language} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.updatedAt} language={row.original.language} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.createdAt} language={row.original.language} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
