"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  Banknote,
  Circle,
  Clock12,
  GraduationCap,
  HandCoins,
  NavigationOff,
  Receipt,
  SendHorizontal,
  Tag,
  User,
} from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface SalaryStaffHeaderMessage {
  name: string;
  email: string;
  qualification: string;
  bonus: string;
  salary: string;
  totalSalary: string;
  sendMail: string;
  paySalary: string;
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
  labelKey: keyof SalaryStaffHeaderMessage;
  icon: React.ElementType;
}) => {
    const translate = useTranslations("column.salaryStaff"); 
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

export type SalaryStaffsColumn = {
  id: string;
  name: string | null;
  email: string | null;
  salaryday: string | null;
  salarytotal: string | null;
  bonus: string | null;
  isSent: boolean | null;
  isPaid: boolean | null;
  degree: string | null;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<SalaryStaffsColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="name"
        icon={Tag}
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="email"
        icon={User}
      />
    ),
  },
  {
    accessorKey: "degree",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="qualification"
        icon={GraduationCap}
      />
    ),
    cell: ({ row }) => {
      type Language = "vi" | "en" | "zh" | "fr" | "ja";

      const degreeMappings = {
        vi: {
          Elementary: "Tiểu học",
          JuniorHighSchool: "Trung học",
          HighSchool: "Trung học phổ thông",
          JuniorColleges: "Cao đẳng",
          University: "Đại học",
          MastersDegree: "Thạc sĩ",
        },
        en: {
          Elementary: "Elementary School",
          JuniorHighSchool: "Junior High School",
          HighSchool: "High School",
          JuniorColleges: "Junior Colleges",
          University: "University",
          MastersDegree: "Master's Degree",
        },
        zh: {
          Elementary: "小学",
          JuniorHighSchool: "初中",
          HighSchool: "高中",
          JuniorColleges: "大专",
          University: "大学",
          MastersDegree: "硕士",
        },
        fr: {
          Elementary: "École primaire",
          JuniorHighSchool: "Collège",
          HighSchool: "Lycée",
          JuniorColleges: "Collèges",
          University: "Université",
          MastersDegree: "Master",
        },
        ja: {
          Elementary: "小学校",
          JuniorHighSchool: "中学校",
          HighSchool: "高校",
          JuniorColleges: "短期大学",
          University: "大学",
          MastersDegree: "修士号",
        },
      };

      const getDegreeText = (
        degree: string | null | undefined,
        language: Language
      ) => {
        const languageMappings = degreeMappings[language];

        if (languageMappings) {
          const degreeText = degree
            ? languageMappings[degree as keyof typeof languageMappings]
            : "";
          return degreeText || "";
        }

        return "";
      };

      const degreeValue: string | null | undefined = row.original.degree;
      const language: Language = row.original.language as Language;

      const degreeText = getDegreeText(degreeValue, language);

      return <div>{degreeText}</div>;
    },
  },
  {
    accessorKey: "bonus",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="bonus"
        icon={HandCoins}
      />
    ),
    cell: ({ row }) => {
      const bonus = row.original.bonus;
      return bonus ? (
        <span>{bonus}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "salaryday",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="salary"
        icon={Receipt}
      />
    ),
    cell: ({ row }) => {
      const salaryday = row.original.salaryday;
      const salarydayValue =
        typeof salaryday === "string" ? parseInt(salaryday) : salaryday;
      return salarydayValue !== undefined && salarydayValue !== 0 ? (
        <span>{salaryday}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "salarytotal",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="totalSalary"
        icon={Banknote}
      />
    ),
    cell: ({ row }) => {
      const salarytotal = row.original.salarytotal;
      return salarytotal ? (
        <span>{salarytotal}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isSent",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="sendMail"
        icon={SendHorizontal}
      />
    ),
    cell: ({ row }) => {
      const isAllday = row.original.isSent;
      return isAllday ? (
        <SendHorizontal className="w-5 h-5 text-green-500" />
      ) : (
        <NavigationOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => (
      <HeaderColumn
        column={column}
        labelKey="paySalary"
        icon={Receipt}
      />
    ),
    cell: ({ row }) => {
      const isAllday = row.original.isPaid;
      return isAllday ? (
        <Receipt className="w-5 h-5 text-green-500" />
      ) : (
        <Receipt className="w-5 h-5 text-red-500" />
      );
    },
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
        icon={Clock12}
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

