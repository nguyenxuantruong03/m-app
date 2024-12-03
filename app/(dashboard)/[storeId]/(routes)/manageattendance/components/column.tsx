"use client";

import SpanColumn from "@/components/span-column";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tally4,
  Tally5,
  CalendarOff,
  X,
  Check,
  Tag,
  User,
  QrCode,
  BriefcaseBusiness,
  Captions,
  TimerOff,
  Timer,
  AlarmClockMinus,
  CalendarCheck,
  ImagePlus,
  ImageUp,
  SmartphoneNfc,
  Clock12,
  AlarmClockCheck,
} from "lucide-react";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import ImageCellOne from "@/components/image-cell-one";
import FormatDate from "@/components/format-Date";
import { getNotFoundMessage } from "@/translate/translate-dashboard";

export type ManageAttendancesColumn = {
  id: string;
  attendancestart: string | null;
  attendanceend: string | null;
  title: string | null;
  start: string | null;
  end: string | null;
  allDay: boolean | null;
  user: string | null;
  wokingTime: string | null;
  email: string | null;
  delayTime: string | null;
  urlImageAttendance: string | null;
  qrcodeCheckAttendance: string | null;
  updateImage: string | null;
  updateNFC: string | null;
  isCheckAttendanceImage: boolean | null;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<ManageAttendancesColumn>[] = [
  {
    accessorKey: "user",
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <User className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh điểm danh
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.urlImageAttendance;
      const updateImage = row.original.updateImage;
      const email = row.original.email;
      // Check if the image URL is available
      if (imageUrl) {
        return (
          <ImageCellOne
            imageUrl={imageUrl}
            createdAt={updateImage}
            email={email}
            languageToUse={row.original.language}
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "qrcodeCheckAttendance",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qr code
          <QrCode className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const linkqrcode = row.original.qrcodeCheckAttendance;
      // Check if the image URL is available
      if (linkqrcode) {
        return (
          <Link
            target="_blank"
            className="text-sky-500 hover:underline"
            href={linkqrcode}
          >
            {linkqrcode}
          </Link>
        );
      } else {
        return <span className="text-red-500 font-bold">{getNotFoundMessage(row.original.language)}</span>;
      }
    },
  },
  {
    accessorKey: "wokingTime",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian làm việc
          <BriefcaseBusiness className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tiêu đề
          <Captions className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bất đầu làm
          <Timer className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "delayTime",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian trễ
          <AlarmClockMinus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kết thúc làm
          <TimerOff className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const endTime = row.original.end;
      return endTime ? (
        <span>{endTime}</span>
      ) : (
        <CalendarOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "allDay",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cả ngày
          <CalendarCheck className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isAllday = row.original.allDay;
      return isAllday ? (
        <Tally4 className="w-5 h-5 text-green-500" />
      ) : (
        <Tally5 className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isCheckAttendanceImage",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kiểm tra ảnh điểm danh 
          <ImagePlus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isCheckAttendanceImage = row.original.isCheckAttendanceImage;
      return isCheckAttendanceImage ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "updateImage",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cập nhật hình ảnh
          <ImageUp className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
  },
  {
    accessorKey: "updateNFC",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cập nhật NFC
          <SmartphoneNfc className="ml-2 h-4 w-4" />
        </SpanColumn>
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
      return <FormatDate data={row.original.updatedAt} language={row.original.language}/>;
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
      return (
      <FormatDate data={row.original.createdAt} language={row.original.language}/>
      )
    }
  },
];
