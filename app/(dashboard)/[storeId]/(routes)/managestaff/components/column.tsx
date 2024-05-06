"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Check, MailX, Nfc, ShieldCheck, ShieldOff, X } from "lucide-react";
import { MailCheck } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ManageStaffsColumn = {
  id: string;
  name: string | null;
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
  email?: string | undefined;
  urlimageCheckAttendance: string | null;
  codeNFC: string | null;
  daywork: string[];
  createdAt: string | null;
};

const degreeMappings = {
  None: "Không xác định",
  Elementary: "Tiểu học",
  JuniorHighSchool: "Trung học",
  HighSchool: "Trung học phổ thông",
  JuniorColleges: "Cao đẳng",
  University: "Đại học",
  MastersDegree: "Thạc sĩ",
};

const maritalStatusMappings = {
  None: "Không xác định",
  Single: "Độc thân",
  Married: "Kết hôn",
  Separated: "Ly hôn",
  Remarried: "Tái hôn",
};

const wokingTimeMappings = {
  None: "Không xác định",
  Parttime4h: "4 tiếng",
  Parttime8h: "8 tiếng",
  Fulltime: "Cả ngày",
  SeasonalJob: "Thời vụ",
};

const genderMappings = {
  None: "Không xác định",
  Male: "Nam",
  Female: "Nữ",
};

export const columns: ColumnDef<ManageStaffsColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => {
      // Check if the user is ADMIN or STAFF
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
    header: "name",
    cell: ({ row }) => {
      // Check if the user is ADMIN or STAFF
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "ImageApp",
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      // Check if the image URL is available
      if (imageUrl) {
        return (
          <Image
            src={imageUrl}
            alt="User Avatar"
            width="50"
            height="50"
            className="rounded-full"
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "imageCredential",
    header: "Image",
    cell: ({ row }) => {
      const imageCredentialUrl = row.original.imageCredential;
      // Check if the image URL is available
      if (imageCredentialUrl) {
        return (
          <Image
            src={imageCredentialUrl}
            alt="User Avatar"
            width="50"
            height="50"
            className="rounded-full"
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "role",
    header: "Role",
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
    header: "numberCCCD",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.numberCCCD}
        </div>
      );
    },
  },
  {
    accessorKey: "phonenumber",
    header: "phonenumber",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.phonenumber}
        </div>
      );
    },
  },
  {
    accessorKey: "dateRange",
    header: "Ngày cấp CMND",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.dateRange}
        </div>
      );
    },
  },
  {
    accessorKey: "dateofbirth",
    header: "Ngày sinh",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.dateofbirth}
        </div>
      );
    },
  },
  {
    accessorKey: "urlimageCheckAttendance",
    header: "UrlQrcode",
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
    header: "NFCcode",
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
    header: "Thời gian làm việc",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.timestartwork}
        </div>
      );
    },
  },
  {
    accessorKey: "issued",
    header: "Cấp ở đâu",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.issued}
        </div>
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
    header: "Giới tính",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const genderValue: string | null | undefined = row.original.gender;
      const genderText = genderValue
        ? genderMappings[genderValue as keyof typeof genderMappings] || "None"
        : "None";
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {genderText}
        </div>
      );
    },
  },
  {
    accessorKey: "workingTime",
    header: "Thời gian làm việc",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const workingTimeValue: string | null | undefined = row.original.workingTime;
      const wokingTimeText = workingTimeValue
        ? wokingTimeMappings[workingTimeValue as keyof typeof wokingTimeMappings] || "None"
        : "None";
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {wokingTimeText}
        </div>
      );
    },
  },
  {
    accessorKey: "degree",
    header: "Học vấn",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const degreeValue: string | null | undefined = row.original.degree;
      const degreeText = degreeValue
        ? degreeMappings[degreeValue as keyof typeof degreeMappings] || "None"
        : "None";
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {degreeText}
        </div>
      );
    },
  },

  {
    accessorKey: "maritalStatus",
    header: "Hôn nhân",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const maritalStatusValue: string | null | undefined =
        row.original.maritalStatus;
      const maritalStatusText = maritalStatusValue
        ? maritalStatusMappings[
            maritalStatusValue as keyof typeof maritalStatusMappings
          ] || "None"
        : "None";

      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {maritalStatusText || maritalStatusValue}
        </div>
      );
    },
  },
  {
    accessorKey: "daywork",
    header: "Thứ làm việc",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      
      // Lọc và sắp xếp lại các ngày làm việc theo thứ tự
      const sortedDays = allDays.filter(day => row.original.daywork.includes(day));
      
      // Chuyển đổi các ngày thành ngày trong tuần
      const days = sortedDays.map(day => {
        switch (day) {
          case "Monday":
            return "Thứ 2";
          case "Tuesday":
            return "Thứ 3";
          case "Wednesday":
            return "Thứ 4";
          case "Thursday":
            return "Thứ 5";
          case "Friday":
            return "Thứ 6";
          case "Saturday":
            return "Thứ 7";
          case "Sunday":
            return "Chủ Nhật";
          default:
            return "";
        }
      }).join(", "); // Nối các ngày bằng dấu phẩy và khoảng trắng
  
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {days}
        </div>
      );
    },
  },
  
  {
    accessorKey: "isCitizen",
    header: "Định dạnh",
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
    header: "Gửi xác nhận",
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
    header: "Thành lập",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.createdAt}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
