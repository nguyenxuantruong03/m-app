"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  AlarmClockCheck,
  AlarmClockMinus,
  AlarmClockPlus,
  CircleDollarSign,
  Flag,
  FlagOff,
  Receipt,
  ReceiptText,
  Sparkles,
  Tag,
  Tally1,
  Tally4,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SpanColumn from "@/components/span-column";
import { Clock12 } from "lucide-react";
import EditRow from "../_components/edit-row";
import FormatDate from "@/components/format-Date";
import React from "react";
import { useTranslations } from "next-intl";

interface ShippingRateHeaderMessage {
  name: string;
  amount: string;
  taxBehavior: string;
  minTime: string;
  minUnit: string;
  maxTime: string;
  maxUnit: string;
  activity: string;
  tax: string;
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
  labelKey: keyof ShippingRateHeaderMessage;
  icon: React.ElementType;
}) => {
  const translate = useTranslations("column.shippingrate");
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

export type ShippingRatesColumn = {
  id: string;
  name: string;
  taxcode: string | null;
  taxbehavior: string;
  amount: string;
  unitmin: string;
  valuemin: number;
  unitmax: string;
  valuemax: number;
  active: boolean | null;
  amountnotformat: number;
  updatedAt: Date;
  createdAt: Date;
  language: string;
};

export const columns: ColumnDef<ShippingRatesColumn>[] = [
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
        data={row.original.name}
        name={row.original.name}
        amount={row.original.amountnotformat}
        id={row.original.id}
        taxbehavior={row.original.taxbehavior}
        valuemin={row.original.valuemin}
        unitmin={row.original.unitmin}
        valuemax={row.original.valuemax}
        unitmax={row.original.unitmax}
        active={row.original.active}
        taxcode={row.original.taxcode}
        field="name"
      />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="amount" icon={CircleDollarSign} />
    ),
  },
  {
    accessorKey: "taxbehavior",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="taxBehavior" icon={Receipt} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.shippingrate"); // Use translation namespace for tax behavior
      const taxBehaviorType = row.original.taxbehavior;

      if (!taxBehaviorType) return ""; // Return an empty string if taxBehaviorType is null or undefined

      // Translate the tax behavior type
      const taxBehaviorMessage = translate(taxBehaviorType) || "";

      return <div>{taxBehaviorMessage}</div>;
    },
  },

  {
    accessorKey: "valuemin",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="minTime" icon={AlarmClockMinus} />
    ),
  },
  {
    accessorKey: "unitmin",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="minUnit" icon={Tally1} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.unit"); // Use translation namespace for unit
      const unit = row.original.unitmin;

      if (!unit) return ""; // Return an empty string if unit is null or undefined

      // Translate the unit
      const unitText = translate(unit) || "";

      return <div>{unitText}</div>;
    },
  },
  {
    accessorKey: "valuemax",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="maxTime" icon={AlarmClockPlus} />
    ),
  },
  {
    accessorKey: "unitmax",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="maxUnit" icon={Tally4} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.unit"); // Use translation namespace for unit
      const unit = row.original.unitmax;

      if (!unit) return ""; // Handle cases where unit is null or undefined

      // Translate the unit
      const unitText = translate(unit) || "";

      return <div>{unitText}</div>;
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
    accessorKey: "taxcode",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="tax" icon={ReceiptText} />
    ),
    cell: ({ row }) => {
      const translate = useTranslations("column.shippingrate"); // Use translation namespace for tax codes
      const taxcode = row.original.taxcode;

      if (!taxcode) return ""; // Return an empty string if taxcode is null

      // Map taxcode to translated text
      const taxcodeText = translate(taxcode) || "";

      return <div>{taxcodeText}</div>;
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
      return <FormatDate data={row.original.updatedAt} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => <FormatDate data={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
