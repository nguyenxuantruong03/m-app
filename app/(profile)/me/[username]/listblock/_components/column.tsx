"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { UserRoundX , Clock12 } from "lucide-react";
import { UnblockButton } from "./unblock-button";
import FormatDate from "@/components/format-Date";
import CircleAvatar from "@/components/ui/circle-avatar";
import SpanColumn from "@/components/span-column";

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
  languageToUse: string
};

export const columns: ColumnDef<BlockUser>[] = [
  {
    accessorKey: "nameuser",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên người dùng
        <UserRoundX  className="ml-2 w-4 h-4" />
      </Button>
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
        <span className={`${row.original.isLive ? "ml-3" : "" }`}>{row.original.nameuser}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SpanColumn
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày cấm
          <Clock12 className="ml-2 h-4 w-4" />
        </SpanColumn>
      );
    },
    cell: ({ row }) => {
      return (
      <FormatDate data={row.original.createdAt} language={row.original.languageToUse}/>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} languageToUse={row.original.languageToUse}/>,
  },
];
