"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClock,
  AlarmClockCheck,
  BriefcaseBusiness,
  Cake,
  CalendarClock,
  CalendarPlus,
  Check,
  Clock12,
  GraduationCap,
  Hash,
  Heart,
  ImageUp,
  MailX,
  Nfc,
  Phone,
  Pin,
  QrCode,
  SendHorizontal,
  ShieldCheck,
  ShieldOff,
  SmartphoneNfc,
  SquareAsterisk,
  SquareUserRound,
  Tag,
  User,
  Users,
  X,
} from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { MailCheck } from "lucide-react";
import SpanColumn from "@/components/span-column";
import ImageCellOne from "@/components/image-cell-one";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import { ImageCredential } from "@/types/type";
import React from "react";
import { useTranslations } from "next-intl";

interface ManageStaffHeaderMessage {
  name: string;
  email: string;
  socialImage: string;
  webImage: string;
  role: string;
  idNumber: string;
  phoneNumber: string;
  idIssueDate: string;
  dateOfBirth: string;
  urlQrCode: string;
  nfcCode: string;
  workingTime: string;
  issuedPlace: string;
  gender: string;
  education: string;
  maritalStatus: string;
  workingDay: string;
  identifier: string;
  sendConfirmation: string;
  startTime: string;
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
  labelKey: keyof ManageStaffHeaderMessage;
  icon: React.ElementType;
}) => {
  const translate = useTranslations("column.manageStaff"); 
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

export type ManageStaffsColumn = {
  id: string;
  name: string | null;
  email: string | null;
  isCitizen: boolean | null;
  sentVeirifi: boolean | null;
  numberCCCD: string | null;
  dateRange: string | null;
  dateofbirth: string | null;
  timestartwork: string | null;
  issued: string | null;
  gender: string | null;
  degree: string | null;
  maritalStatus: string | null;
  phonenumber: string | null;
  workingTime: string | null;
  imageCredential: string;
  ban: boolean | null;
  role: string;
  image: string | null;
  urlimageCheckAttendance: string | null;
  codeNFC: string | null;
  daywork: string[];
  imageCredentialUrl: ImageCredential[];
  dateRangepatch: Date | null;
  dateofbirthpatach: Date | null;
  updatedAt: Date;
  createdAt: Date;
  createdAtString: string | null;
  language: string;
};

export const columns: ColumnDef<ManageStaffsColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <Hash className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.id}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.name}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="name"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={User} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.email}
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="socialImage" icon={ImageIcon} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      const updateImage = row.original.createdAtString;
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
    accessorKey: "imageCredential",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="webImage" icon={ImageUp} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.imageCredential;
      const updateImage = row.original.createdAtString;
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
    accessorKey: "role",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="role" icon={SquareUserRound} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const role = row.original.role;

      let textColor = "";

      switch (role) {
        case "ADMIN":
          textColor = "text-red-500 font-bold";
          break;
        case "STAFF":
          textColor = "text-blue-500 font-bold";
          break;
        case "USER":
          textColor = "text-black font-bold";
          break;
        default:
          textColor = "";
          break;
      }
      return (
        <div className={isBanned ? `line-through ${textColor}` : textColor}>
          {row.original.role}
        </div>
      );
    },
  },
  {
    accessorKey: "numberCCCD",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="idNumber" icon={SquareAsterisk} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.numberCCCD}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="numberCCCD"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "phonenumber",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="phoneNumber" icon={Phone} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.phonenumber}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="phonenumber"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "dateRange",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="idIssueDate"
        icon={CalendarPlus}
      />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.dateRange}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="dateRange"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "dateofbirth",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="dateOfBirth" icon={Cake} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.dateofbirth}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="dateofbirth"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "urlimageCheckAttendance",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="urlQrCode" icon={QrCode} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.urlimageCheckAttendance ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "codeNFC",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="nfcCode" icon={SmartphoneNfc} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.codeNFC ? (
            <Nfc className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "timestartwork",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="startTime"
        icon={BriefcaseBusiness}
      />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.timestartwork}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="timestartwork"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "issued",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="issuedPlace" icon={Pin} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.issued}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="issued"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="gender" icon={Users} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.gender}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="gender"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "workingTime",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="workingTime" icon={AlarmClock} />
    ),
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.workingTime}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="workingTime"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "degree",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="education" icon={GraduationCap} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.degree}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="degree"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "maritalStatus",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="maritalStatus"
        icon={ShieldCheck}
      />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow
            isBanned={isBanned}
            data={row.original.maritalStatus}
            name={row.original.name}
            id={row.original.id}
            numberCCCD={row.original.numberCCCD}
            imageCredential={row.original.imageCredentialUrl}
            image={row.original.image}
            email={row.original.email}
            role={row.original.role}
            ban={row.original.ban}
            phonenumber={row.original.phonenumber}
            dateRange={row.original.dateRangepatch}
            dateofbirth={row.original.dateofbirthpatach}
            urlimageCheckAttendance={row.original.urlimageCheckAttendance}
            codeNFC={row.original.codeNFC}
            timestartwork={row.original.timestartwork}
            issued={row.original.issued}
            gender={row.original.gender}
            degree={row.original.degree}
            maritalStatus={row.original.maritalStatus}
            workingTime={row.original.workingTime}
            daywork={row.original.daywork}
            isCitizen={row.original.isCitizen}
            sentVeirifi={row.original.sentVeirifi}
            field="maritalStatus"
          />
        </span>
      );
    },
  },
  {
    accessorKey: "daywork",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="workingDay" icon={CalendarClock} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.day"); // Access translations for days
      const isBanned = row.original.ban === true;
      const allDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
  
      // Filter and sort working days
      const sortedDays = allDays.filter((day) =>
        row.original.daywork.includes(day)
      );
  
      // Map days to translated names
      const days = sortedDays
        .map((day) => translate(day)) // Translate each day
        .join(", "); // Join translated days with a comma
  
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {days}
        </div>
      );
    },
  },
  {
    accessorKey: "isCitizen",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="identifier" icon={Check} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.isCitizen ? (
            <ShieldCheck className="text-green-600" />
          ) : (
            <ShieldOff className="text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "sentVeirifi",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="sendConfirmation"
        icon={SendHorizontal}
      />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.sentVeirifi ? (
            <MailCheck className="text-green-600" />
          ) : (
            <MailX className="text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={Clock12} />
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
        labelKey="createdTime"
        icon={AlarmClockCheck}
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
