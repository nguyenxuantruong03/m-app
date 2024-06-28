"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
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
  createdAt: Date;
};

const durationMapping: Record<string, string> = {
  forever: "mãi mãi",
  once: "một lần mỗi tháng",
  repeating: "lặp đi lặp lại mỗi tháng",
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
          Hình ảnh
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
          Phần trăm giảm
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
      const durationValue = row.original.duration;
      if (durationValue && durationMapping[durationValue]) {
        return durationMapping[durationValue];
      }
      return "";
    },
  },
  {
    accessorKey: "maxredemptions",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng tối đa được giảm giá
          <TrendingDown className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tháng lặp lại
          <Repeat2 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian hết hạn
          <AlarmClockOff className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.redeemby}/>
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
      <FormatDate data={row.original.createdAt}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
