"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Flag,
  FlagOff,
  SignalMedium,
  Signal,
  Sparkles,
  Receipt,
  CirclePercent,
  ReceiptText,
  NotebookPen,
  AlarmClockCheck,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12, Tag } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import {
  taxTypeMapping,
  transalteTaxrateColumn,
} from "@/translate/translate-dashboard";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface TaxrateHeaderMessage {
  name: string;
  discountPercentage: string;
  taxType: string;
  description: string;
  taxRateType: string;
  activity: string;
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
  labelKey: keyof TaxrateHeaderMessage;
  icon: React.ElementType;
}) => {
  const user = useCurrentUser();
  const taxrateHeaderMessage: TaxrateHeaderMessage = transalteTaxrateColumn(
    user?.language || "vi"
  );

  // Dùng labelKey để truy xuất giá trị động
  const label = taxrateHeaderMessage[labelKey] || labelKey;

  return (
    <SpanColumn
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {icon && React.createElement(icon, { className: "ml-2 h-4 w-4" })}
    </SpanColumn>
  );
};

export type TaxRateColumn = {
  id: string;
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<TaxRateColumn>[] = [
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.name}
        name={row.original.name}
        percentage={row.original.percentage}
        active={row.original.active}
        inclusive={row.original.inclusive}
        taxtype={row.original.taxtype}
        description={row.original.description}
        field="name"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="discountPercentage" icon={CirclePercent} />
    ),
    cell: ({ row }) => {
      const percentValue = row.original.percentage;
      if (percentValue != null) {
        return `${percentValue}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "taxtype",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="taxType" icon={ReceiptText} />
    ),
    cell: ({ row }) => {
      const taxtypeValue = row.original.taxtype;
      const language = row.original.language;

      if (taxtypeValue === null) {
        return "";
      }

      return taxTypeMapping[language]?.[taxtypeValue] || "";
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="description" icon={NotebookPen} />
    ),
    cell: ({ row }) => (
      <EditRow
        id={row.original.id}
        data={row.original.description}
        name={row.original.name}
        percentage={row.original.percentage}
        active={row.original.active}
        inclusive={row.original.inclusive}
        taxtype={row.original.taxtype}
        description={row.original.description}
        field="description"
        language={row.original.language}
      />
    ),
  },
  {
    accessorKey: "inclusive",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="taxRateType" icon={Receipt} />
    ),
    cell: ({ row }) => {
      const isActive = row.original.inclusive;
      return isActive ? (
        <Signal className="w-5 h-5 text-green-500" />
      ) : (
        <SignalMedium className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="activity" icon={Sparkles} />
    ),
    cell: ({ row }) => {
      const isActive = row.original.active;
      return isActive ? (
        <Flag className="w-5 h-5 text-green-500" />
      ) : (
        <FlagOff className="w-5 h-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.updatedAt} language={row.original.language} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => (
      <FormatDate data={row.original.createdAt} language={row.original.language} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

