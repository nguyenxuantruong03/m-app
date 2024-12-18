"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { AlarmClockCheck, Banknote, Circle, Clock12, GraduationCap, HandCoins, NavigationOff, Receipt, SendHorizontal, Tag, User } from "lucide-react";
import SpanColumn from "@/components/span-column";
import FormatDate from "@/components/format-Date";

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
  updatedAt: Date
  createdAt: Date;
  language: string;
};


export const columns: ColumnDef<SalaryStaffsColumn>[] = [
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
    accessorKey: "degree",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bằng cấp
          <GraduationCap className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
      
      const getDegreeText = (degree: string | null | undefined, language: Language) => {
        const languageMappings = degreeMappings[language];
      
        if (languageMappings) {
          const degreeText = degree ? languageMappings[degree as keyof typeof languageMappings] : "";
          return degreeText || "";
        }
      
        return "";
      };
      
      // Example usage inside your React component
      const degreeValue: string | null | undefined = row.original.degree;
      const language: Language = row.original.language as Language; // Assuming this is where the language comes from
      
      const degreeText = getDegreeText(degreeValue, language);
      
      return (
        <div>
          {degreeText}
        </div>
      );
      
    },
  },
  {
    accessorKey: "bonus",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thưởng thêm
          <HandCoins className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lương
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const salaryday = row.original.salaryday;
      const salarydayValue = typeof salaryday === 'string' ? parseInt(salaryday) : salaryday;
      return salarydayValue !== undefined && salarydayValue !== 0 ? (
        <span>{salaryday}</span>
      ) : (
        <Circle className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "salarytotal",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổng lương
          <Banknote className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gửi mail
          <SendHorizontal className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      const isAllday = row.original.isSent;
      return isAllday ? (
        <SendHorizontal  className="w-5 h-5 text-green-500" />
      ) : (
        <NavigationOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trả lương
          <Receipt className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
