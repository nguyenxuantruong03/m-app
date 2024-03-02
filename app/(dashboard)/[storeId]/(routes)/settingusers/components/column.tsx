"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SettingUsersColumn = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  imageCredential: string;
  password: string | null;
  role: string;
  accounts: {
    type: string;
    provider: string;
    token_type: string;
  }[];
  isTwoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  ban: boolean | null;
  banExpires: string | null;
};

const RoleCell = ({ row }: any) => {
  const router = useRouter();
  const user = row.original;
  const isAdmin = user.role === UserRole.ADMIN;
  const isStaff = user.role === UserRole.STAFF;
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role); // Default to ADMIN role
  const [originalRole, setOriginalRole] = useState<UserRole>(user.role); // Store the original role for cancellation
  const handleRoleChange = async (newRole: UserRole) => {
    setSelectedRole(newRole);
  };
  const handleSave = async () => {
    try {
      await axios.patch("/api/settingusers", {
        userId: user.id,
        newRole: selectedRole,
      });
      // Update the original role to match the newly saved role
      setOriginalRole(selectedRole);
      setEditable(false);
      setLoading(true);
      toast.success("Thay đổi thành công!")
      router.refresh();
    } catch (error) {
      toast.error("Không phù hợp, Hãy thử lại!");
    }
  };
  const handleCancel = () => {
    setSelectedRole(originalRole);
    setEditable(false);
    setLoading(true);
  };
  return editable ? (
    <div>
      <select
        value={selectedRole}
        onChange={(e) => handleRoleChange(e.target.value as UserRole)}
        disabled={loading}
      >
        <option value={user.role}>{user.role}</option>
        {Object.values(UserRole).map(
          (role) =>
            role !== user.role && (
              <option key={role} value={role}>
                {role}
              </option>
            )
        )}
      </select>
      <div className="flex space-x-2 mt-3">
        <Button onClick={handleSave} disabled={loading}>
          Save
        </Button>
        <Button variant="outline" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <div
      onClick={() => setEditable(true)}
      className={`cursor-pointer font-bold ${
        isAdmin ? "text-red-500" : isStaff ? "text-blue-500" : "text-black"
      }`}
    >
      {user.role}
    </div>
  );
};

export const columns: ColumnDef<SettingUsersColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.email}
        </div>
      );
    },
  },

  {
    accessorKey: "emailVerified",
    header: "EmailVerified",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.emailVerified}
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
    cell: RoleCell,
  },
  {
    accessorKey: "accounts.type",
    header: "Account Type",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.accounts[0]?.type || ""}
        </div>
      );
    },
  },

  {
    accessorKey: "accounts.provider",
    header: "Provider",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.accounts[0]?.provider || ""}
        </div>
      );
    },
  },

  {
    accessorKey: "accounts.token_type",
    header: "Token Type",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.accounts[0]?.token_type || ""}
        </div>
      );
    },
  },

  {
    accessorKey: "isTwoFactorEnabled",
    header: "IsTwoFactorEnabled",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {String(row.original.isTwoFactorEnabled)}
        </div>
      );
    },
  },

  {
    accessorKey: "ban",
    header: "Ban",
  },

  {
    accessorKey: "banExpires",
    header: "Ban Expires",
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
    accessorKey: "updatedAt",
    header: "Cập nhật",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.updatedAt}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
