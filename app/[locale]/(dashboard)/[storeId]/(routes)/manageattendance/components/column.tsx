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
import React from "react";
import { useTranslations } from "next-intl";

interface ManageAttendaceHeaderMessage {
  name: string;
  email: string;
  attendanceImage: string;
  qrCode: string;
  workingTime: string;
  title: string;
  startWork: string;
  lateTime: string;
  endWork: string;
  allDay: string;
  checkAttendanceImage: string;
  updateImage: string;
  updateNFC: string;
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
  labelKey: keyof ManageAttendaceHeaderMessage;
  icon: React.ElementType;
}) => {
   const translate = useTranslations("column.manageAttendance"); 
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={User} />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="attendanceImage"
        icon={ImageIcon}
      />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.urlImageAttendance;
      const updateImage = row.original.updateImage;
      const email = row.original.email;
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="qrCode" icon={QrCode} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.manageAttendance"); // Access QR code-related translations
      const linkqrcode = row.original.qrcodeCheckAttendance;
  
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
        return (
          <span className="text-red-500 font-bold">
            {translate("notFound")}
          </span>
        );
      }
    },
  },
  {
    accessorKey: "wokingTime",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="workingTime"
        icon={BriefcaseBusiness}
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="title" icon={Captions} />
    ),
  },
  {
    accessorKey: "start",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="startWork" icon={Timer} />
    ),
  },
  {
    accessorKey: "delayTime",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="lateTime"
        icon={AlarmClockMinus}
      />
    ),
  },
  {
    accessorKey: "end",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="endWork" icon={TimerOff} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="allDay" icon={CalendarCheck} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="checkAttendanceImage"
        icon={ImagePlus}
      />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updateImage" icon={ImageUp} />
    ),
  },
  {
    accessorKey: "updateNFC",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updateNFC" icon={SmartphoneNfc} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="updatedTime"
        icon={AlarmClockCheck}
      />
    ),
    cell: ({ row }) => (
      <FormatDate
        data={row.original.updatedAt}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate
        data={row.original.createdAt}
      />
    ),
  },
];
