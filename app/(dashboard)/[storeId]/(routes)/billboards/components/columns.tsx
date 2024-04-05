"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  imagebillboard: string[];
  createdAt: string | null;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "imagebillboard",
    header: "Hình ảnh",
    // Define a custom cell to render the image
    cell: ({ row }) => {
      const imagebillboard = row.original.imagebillboard;
      // Check if the image URL array is available
      if (Array.isArray(imagebillboard) && imagebillboard.length > 0) {
        return (
          <div>
            {imagebillboard.map((imageUrl, index) => (
              <span key={index} className="avatar-overlapping-multiple-image">
                <Image
                  className="avatar-image-overlapping-multiple-image rounded-full"
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  width="50"
                  height="50"
                />
              </span>
            ))}
          </div>
        );
      }
      return "";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
