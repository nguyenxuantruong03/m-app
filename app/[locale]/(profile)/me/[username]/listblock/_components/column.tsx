"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRoundX, Clock12 } from "lucide-react";
import { UnblockButton } from "./unblock-button";
import FormatDate from "@/components/format-Date";
import CircleAvatar from "@/components/ui/circle-avatar";
import SpanColumn from "@/components/span-column";
import React from "react";
import { useTranslations } from "next-intl";

interface ListBlockHeaderMessage {
  username: string;
  banDate: string;
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof ListBlockHeaderMessage;
  icon: React.ElementType;
}) => {
  const translate = useTranslations("column.listBlock");
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
export type BlockUser = {
  id: string;
  userId: string;
  imageUrl: string;
  nameuser: string | null;
  createdAt: Date;
  frameAvatar: string | null;
  role: string;
  isCitizen: boolean | null;
  isLive: boolean | undefined;
};

export const columns: ColumnDef<BlockUser>[] = [
  {
    accessorKey: "nameuser",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="username" icon={UserRoundX} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <CircleAvatar
          nameuser={row.original.nameuser || ""}
          srcAvatar={row.original.imageUrl}
          srcFrame={row.original.frameAvatar || ""}
          role={row.original.role}
          isCitizen={row.original.isCitizen || undefined}
          isLive={row.original.isLive || false}
          showBadge={true}
        />
        <span className={`${row.original.isLive ? "ml-3" : ""}`}>
          {row.original.nameuser}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="banDate" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return <FormatDate data={row.original.createdAt} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
