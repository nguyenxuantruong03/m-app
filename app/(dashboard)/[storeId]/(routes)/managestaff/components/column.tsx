"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClock,
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
import { getDayName } from "@/translate/translate-dashboard";

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
  imageCredentialUrl: ImageCredential[]
  dateRangepatch: Date | null;
  dateofbirthpatach: Date | null;
  createdAt: Date;
  createdAtString: string | null
  language: string
};

export const columns: ColumnDef<ManageStaffsColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          id
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <Tag className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.name} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="name" language={row.original.language}
          />
        </span>
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
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ImageApp
          <ImageIcon className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      const updateImage = row.original.createdAtString;
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
    accessorKey: "imageCredential",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
          <ImageUp className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.imageCredential;
      const updateImage = row.original.createdAtString;
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
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <SquareUserRound className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          numberCCCD
          <SquareAsterisk className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.numberCCCD} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="numberCCCD" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "phonenumber",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          phonenumber
          <Phone className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.phonenumber} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="phonenumber" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "dateRange",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày cấp CMND
          <CalendarPlus className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.dateRange} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="dateRange" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "dateofbirth",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày sinh
          <Cake className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.dateofbirth} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="dateofbirth" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "urlimageCheckAttendance",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UrlQrcode
          <QrCode className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NFCcode
          <SmartphoneNfc className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.timestartwork} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="timestartwork" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "issued",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cấp ở đâu
          <Pin className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.issued} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="issued" language={row.original.language}
          />
        </span>
      );
    },
  },
  //Nguyên bản chưa dich tiếng việt
  // {
  //   accessorKey: "gender",
  //   header: "gender",
  //   cell: ({ row }) => {
  //     const isBanned = row.original.ban === true;
  //     return (
  //       <div className={isBanned ? "line-through text-gray-400" : ""}>
  //         {row.original.gender}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giới tính
          <Users className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.gender} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="gender" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "workingTime",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian làm việc
          <AlarmClock className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.workingTime} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="workingTime" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "degree",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Học vấn
          <GraduationCap className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.degree} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="degree" language={row.original.language}
          />
        </span>
      );
    },
  },

  {
    accessorKey: "maritalStatus",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hôn nhân
          <Heart className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      // Kiểm tra nếu bị ban
      const isBanned = row.original.ban === true;
      return (
        <span>
          <EditRow isBanned={isBanned} data={row.original.maritalStatus} name={row.original.name} 
          id={row.original.id} numberCCCD = {row.original.numberCCCD} imageCredential={row.original.imageCredentialUrl}
          image={row.original.image} email={row.original.email} role={row.original.role} ban={row.original.ban}
          phonenumber={row.original.phonenumber} dateRange={row.original.dateRangepatch} dateofbirth={row.original.dateofbirthpatach}
          urlimageCheckAttendance={row.original.urlimageCheckAttendance} codeNFC={row.original.codeNFC}
          timestartwork={row.original.timestartwork} issued={row.original.issued} gender={row.original.gender}
          degree={row.original.degree} maritalStatus={row.original.maritalStatus} workingTime={row.original.workingTime}
          daywork={row.original.daywork} isCitizen={row.original.isCitizen} sentVeirifi={row.original.sentVeirifi}
          field="maritalStatus" language={row.original.language}
          />
        </span>
      );
    },
  },
  {
    accessorKey: "daywork",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thứ làm việc
          <CalendarClock className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
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
    
      // Lọc và sắp xếp lại các ngày làm việc theo thứ tự
      const sortedDays = allDays.filter((day) =>
        row.original.daywork.includes(day)
      );
    
      // Chuyển đổi các ngày thành tên ngày trong tuần theo ngôn ngữ
      const days = sortedDays
        .map((day) => getDayName(day, row.original.language))
        .join(", "); // Nối các ngày bằng dấu phẩy và khoảng trắng
    
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {days}
        </div>
      );
    },
  },

  {
    accessorKey: "isCitizen",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Định dạnh
          <Check className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gửi xác nhận
          <SendHorizontal className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          <FormatDate data={row.original.createdAt} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
