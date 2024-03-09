"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { MailX, ShieldCheck, ShieldOff } from "lucide-react";
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
  createdAt: string | null;
  email?: string | undefined;
};

const degreeMappings = {
  Elementary: "Tiểu học",
  JuniorHighSchool: "Trung học",
  HighSchool: "Trung học phổ thông",
  JuniorColleges: "Cao đẳng",
  University: "Đại học",
  MastersDegree: "Thạc sĩ",
};

const maritalStatusMappings = {
  Single: "Độc thân",
  Married: "Kết hôn",
  Separated: "Ly hôn",
  Remarried: "Tái hôn",
};

const wokingTimeMappings = {
  Parttime4h: "4 tiếng",
  Parttime8h: "8 tiếng",
  Fulltime: "Cả ngày",
  SeasonalJob: "Thời vụ",
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
    header: "Image",
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
    header: "ImageApp",
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
    header: "gender",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const genderText = row.original.gender === "Male" ? "Trai" : "Gái";

      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {genderText}
        </div>
      );
    },
  },

  {
    accessorKey: "degree",
    header: "degree",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const degreeValue: string | null | undefined = row.original.degree;
      const degreeText = degreeValue
        ? degreeMappings[degreeValue as keyof typeof degreeMappings] || ""
        : "";
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {degreeText}
        </div>
      );
    },
  },

  {
    accessorKey: "maritalStatus",
    header: "maritalStatus",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const maritalStatusValue: string | null | undefined =
        row.original.maritalStatus;
      const maritalStatusText = maritalStatusValue
        ? maritalStatusMappings[
            maritalStatusValue as keyof typeof maritalStatusMappings
          ] || ""
        : "";

      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {maritalStatusText || maritalStatusValue}
        </div>
      );
    },
  },

  {
    accessorKey: "workingTime",
    header: "workingTime",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const jobTypeValue: string | null | undefined = row.original.workingTime;
      const jobTypeText = jobTypeValue
        ? wokingTimeMappings[jobTypeValue as keyof typeof wokingTimeMappings] ||
          ""
        : "";

      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {jobTypeText || jobTypeValue}
        </div>
      );
    },
  },

  {
    accessorKey: "isCitizen",
    header: "isCitizen",
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
    header: "sentVeirifi",
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
