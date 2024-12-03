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
import { getUsersLabel, getMonthLabel } from '@/translate/translate-dashboard';

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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh giảm giá
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imageUrl = row.original.imagecouponpatch;
      const image = row.original.imagecoupon;
      return <ImageCellMutiple image={image} imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "percent",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % giảm
          <TicketPercent className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khoảng thời gian
          <Hourglass className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const getDurationLabel = (durationValue: string | null, language: string): string => {
        if (!durationValue) return ""; // Xử lý khi durationValue là null hoặc undefined
  
        switch (language) {
          case "vi": // Tiếng Việt
            return {
              forever: "mãi mãi",
              once: "một lần mỗi tháng",
              repeating: "lặp đi lặp lại mỗi tháng",
            }[durationValue] || "";
          case "en": // Tiếng Anh
            return {
              forever: "forever",
              once: "once a month",
              repeating: "repeating every month",
            }[durationValue] || "";
          case "zh": // Tiếng Trung
            return {
              forever: "永远",
              once: "每月一次",
              repeating: "每月重复",
            }[durationValue] || "";
          case "fr": // Tiếng Pháp
            return {
              forever: "pour toujours",
              once: "une fois par mois",
              repeating: "répétitif chaque mois",
            }[durationValue] || "";
          case "ja": // Tiếng Nhật
            return {
              forever: "永遠",
              once: "毎月一回",
              repeating: "毎月繰り返し",
            }[durationValue] || "";
          default:
            return ""; // Ngôn ngữ không hỗ trợ
        }
      };
  
      const language = row.original.language; // Ngôn ngữ hiện tại
      const durationValue = row.original.duration; // Giá trị thời gian
      return getDurationLabel(durationValue, language);
    },
  },
  {
    accessorKey: "maxredemptions",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng người dùng
          <TrendingDown className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const maxRedemptionsValue = row.original.maxredemptions;
      const language = row.original.language; // Ngôn ngữ hiện tại
      if (maxRedemptionsValue != null) {
        return `${maxRedemptionsValue} ${getUsersLabel(language, maxRedemptionsValue)}`;
      }
      return "";
    }
  },
  {
    accessorKey: "durationinmoth",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời lượng trong tháng
          <Repeat2 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const durationValue = row.original.durationinmoth;
      const language = row.original.language; // Ngôn ngữ hiện tại
  
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đổi thưởng
          <AlarmClockOff className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.redeemby} language={row.original.language}/>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian cập nhật
          <AlarmClockCheck  className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.updatedAt} language={row.original.language}/>
      )
    }
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
      return (
      <FormatDate data={row.original.createdAt} language={row.original.language}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
