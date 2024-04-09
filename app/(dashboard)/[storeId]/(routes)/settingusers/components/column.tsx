"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Ban, Shield, ShieldOff, ShieldCheck } from "lucide-react";
import { Lock, Unlock } from "lucide-react";

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
    token_type: string | null;
  }[];
  isCitizen: boolean | null;
  isTwoFactorEnabled: boolean;
  ban: boolean | null;
  lastlogin: string |   null;
  banExpires: string | null;
  createdAt: string | null;
};

interface RoleCellProps<T> {
  row: { original: T };
}

const RoleCell = <T extends SettingUsersColumn>({ row }: RoleCellProps<T>) => {
  const router = useRouter();
  const user = row.original;
  const isAdmin = user.role === UserRole.ADMIN;
  const isStaff = user.role === UserRole.STAFF;
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role as UserRole); // Default to ADMIN role
  const [originalRole, setOriginalRole] = useState(user.role as UserRole); // Store the original role for cancellation
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
      toast.success("Thay đổi thành công!");
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
    accessorKey: "lastlogin",
    header: "lastlogin",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.lastlogin}
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
    accessorKey: "isCitizen",
    header: "Định danh",
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
    accessorKey: "isTwoFactorEnabled",
    header: "IsTwoFactorEnabled",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div className={isBanned ? "line-through text-gray-400" : ""}>
          {row.original.isTwoFactorEnabled ? (
            <Lock className="text-red-600" />
          ) : (
            <Unlock className="text-green-600" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "ban",
    header: "Ban",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      return (
        <div>
          {isBanned ? (
            <Ban className="text-red-600" />
          ) : (
            <Shield className="text-green-600" />
          )}
        </div>
      );
    },
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
