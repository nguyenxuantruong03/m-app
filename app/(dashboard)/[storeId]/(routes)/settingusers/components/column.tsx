"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ShieldOff, ShieldCheck, ShieldMinus, ShieldPlus } from "lucide-react";
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
  password: number | null;
  resendTokenVerify: number | null;
  resendEmailResetPassword: number | null;
  resendTokenResetPassword: number | null;
  resendUnBanUser: number | null;
  resendBanUserNotStart: number | null;
  resendCount: number | null;
  role: string;
  accounts: {
    type: string;
    provider: string;
    token_type: string | null;
  }[];
  isCitizen: boolean | null;
  isTwoFactorEnabled: boolean;
  ban: boolean | null;
  lastlogin: string | null;
  banExpires: string | null;
  isbanforever: boolean | undefined | null;
  timebanforever: string | null;
  createdAt: string | null;
};

interface RoleCellProps<T> {
  row: { original: T };
}

const RoleCell = <T extends SettingUsersColumn>({ row }: RoleCellProps<T>) => {
  const router = useRouter();
  const params = useParams();
  const user = row.original;
  const isAdmin = user.role === UserRole.ADMIN;
  const isStaff = user.role === UserRole.STAFF;
  const isShipper = user.role === UserRole.SHIPPER;
  const isMaketing = user.role === UserRole.MARKETING;
  const isGuest = user.role === UserRole.GUEST;
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role as UserRole); // Default to ADMIN role
  const [originalRole, setOriginalRole] = useState(user.role as UserRole); // Store the original role for cancellation
  const handleRoleChange = async (newRole: UserRole) => {
    setSelectedRole(newRole);
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/settingusers`, {
        userId: user.id,
        newRole: selectedRole,
      });
      // Update the original role to match the newly saved role
      toast.success("Thay đổi thành công!");
      setOriginalRole(selectedRole);
      setEditable(false);
      setLoading(false);
      router.refresh();
    } catch (error: unknown) {
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        toast.error("Something went wrong.");
      }
    }
  };
  const handleCancel = () => {
    setSelectedRole(originalRole);
    setEditable(false);
    setLoading(false);
  };
  return editable ? (
    <div>
      <select
        value={selectedRole}
        className="appearance-none bg-slate-900 border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
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
        isAdmin
          ? "text-red-500"
          : isStaff
          ? "text-blue-500"
          : isShipper
          ? "text-indigo-500"
          : isMaketing
          ? "text-purple-500"
          : isGuest
          ? "text-fuchsia-500"
          : "dark:text-amber-500 text-black"
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.emailVerified}
        </div>
      );
    },
  },

  {
    accessorKey: "password",
    header: "Mật khẩu",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.password}
        </div>
      );
    },
  },

  {
    accessorKey: "lastlogin",
    header: "lastlogin",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.isTwoFactorEnabled ? (
            <Lock className="text-green-600" />
          ) : (
            <Unlock className="text-red-600" />
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
      const isBanforever = row.original.isbanforever;
      return (
        <div>
          {isBanned ? (
            <ShieldMinus className="text-red-600" />
          ) : (
            <ShieldPlus className="text-green-600" />
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
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.createdAt}
        </div>
      );
    },
  },

  {
    accessorKey: "isbanforever",
    header: "Ban vĩnh viễn",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {isBanforever ? (
            <ShieldMinus className="text-red-600" />
          ) : (
            <ShieldPlus className="text-green-600" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "timebanforever",
    header: "Thời gian Ban",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.timebanforever}
        </div>
      );
    },
  },

  {
    accessorKey: "resendTokenVerify",
    header: "Gửi mã xác thực",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const isResendTokenVerify = row.original.resendTokenVerify;

      // Khai báo các lớp CSS tạm thời cho mỗi trường hợp
      let additionalClass = "";
      let lineThroughClass = "";

      if (isResendTokenVerify !== null) {
        if (isResendTokenVerify >= 5) {
          additionalClass = "text-amber-400";
          lineThroughClass = "line-through";
        } else if (isResendTokenVerify >= 3) {
          additionalClass = "text-amber-400";
          if (isBanned) {
            lineThroughClass = "line-through";
          }
        } else if (isResendTokenVerify < 3 && isBanned) {
          // Thêm điều kiện mới ở đây
          additionalClass = "text-gray-400"; // Thêm màu text-gray-400
          lineThroughClass = "line-through";
        }
      }

      // Xác định lớp CSS cho trường hợp isBanforever
      const banClass = isBanforever ? "line-through text-red-500" : "";

      // Trả về phần tử với các lớp CSS được áp dụng
      return (
        <div className={`${additionalClass} ${lineThroughClass} ${banClass}`}>
          {isResendTokenVerify}
          {/* Ưu tiên hiển thị isResendTokenVerify nếu có, nếu không, hiển thị isBanned */}
        </div>
      );
    },
  },

  {
    accessorKey: "resendEmailResetPassword",
    header: "Gửi Email ResetPassword",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const isResendEmailResetPassword = row.original.resendEmailResetPassword;

      // Khai báo các lớp CSS tạm thời cho mỗi trường hợp
      let additionalClass = "";
      let lineThroughClass = "";

      if (isResendEmailResetPassword !== null) {
        if (isResendEmailResetPassword >= 5) {
          additionalClass = "text-amber-400";
          lineThroughClass = "line-through";
        } else if (isResendEmailResetPassword >= 3) {
          additionalClass = "text-amber-400";
          if (isBanned) {
            lineThroughClass = "line-through";
          }
        } else if (isResendEmailResetPassword < 3 && isBanned) {
          // Thêm điều kiện mới ở đây
          additionalClass = "text-gray-400"; // Thêm màu text-gray-400
          lineThroughClass = "line-through";
        }
      }

      // Xác định lớp CSS cho trường hợp isBanforever
      const banClass = isBanforever ? "line-through text-red-500" : "";

      // Trả về phần tử với các lớp CSS được áp dụng
      return (
        <div className={`${additionalClass} ${lineThroughClass} ${banClass}`}>
          {isResendEmailResetPassword}
          {/* Ưu tiên hiển thị isResendEmailResetPassword nếu có, nếu không, hiển thị isBanned */}
        </div>
      );
    },
  },

  {
    accessorKey: "resendTokenResetPassword",
    header: "Gửi Token Resetpassword",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const isResendTokenResetPassword = row.original.resendTokenResetPassword;

      // Khai báo các lớp CSS tạm thời cho mỗi trường hợp
      let additionalClass = "";
      let lineThroughClass = "";

      if (isResendTokenResetPassword !== null) {
        if (isResendTokenResetPassword >= 5) {
          additionalClass = "text-amber-400";
          lineThroughClass = "line-through";
        } else if (isResendTokenResetPassword >= 3) {
          additionalClass = "text-amber-400";
          if (isBanned) {
            lineThroughClass = "line-through";
          }
        } else if (isResendTokenResetPassword < 3 && isBanned) {
          // Thêm điều kiện mới ở đây
          additionalClass = "text-gray-400"; // Thêm màu text-gray-400
          lineThroughClass = "line-through";
        }
      }

      // Xác định lớp CSS cho trường hợp isBanforever
      const banClass = isBanforever ? "line-through text-red-500" : "";

      // Trả về phần tử với các lớp CSS được áp dụng
      return (
        <div className={`${additionalClass} ${lineThroughClass} ${banClass}`}>
          {isResendTokenResetPassword}
          {/* Ưu tiên hiển thị isResendTokenResetPassword nếu có, nếu không, hiển thị isBanned */}
        </div>
      );
    },
  },

  {
    accessorKey: "resendCount",
    header: "Gửi 2FA",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const isResendCount = row.original.resendCount;

      // Khai báo các lớp CSS tạm thời cho mỗi trường hợp
      let additionalClass = "";
      let lineThroughClass = "";

      if (isResendCount !== null) {
        if (isResendCount >= 5) {
          additionalClass = "text-amber-400";
          lineThroughClass = "line-through";
        } else if (isResendCount >= 3) {
          additionalClass = "text-amber-400";
          if (isBanned) {
            lineThroughClass = "line-through";
          }
        } else if (isResendCount < 3 && isBanned) {
          // Thêm điều kiện mới ở đây
          additionalClass = "text-gray-400"; // Thêm màu text-gray-400
          lineThroughClass = "line-through";
        }
      }

      // Xác định lớp CSS cho trường hợp isBanforever
      const banClass = isBanforever ? "line-through text-red-500" : "";

      // Trả về phần tử với các lớp CSS được áp dụng
      return (
        <div className={`${additionalClass} ${lineThroughClass} ${banClass}`}>
          {isResendCount}
          {/* Ưu tiên hiển thị isResendCount nếu có, nếu không, hiển thị isBanned */}
        </div>
      );
    },
  },

  {
    accessorKey: "resendBanUserNotStart",
    header: "Gửi thông báo thời gian unban",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.resendBanUserNotStart}
        </div>
      );
    },
  },

  {
    accessorKey: "resendUnBanUser",
    header: "Gửi thông báo đã hết ban",
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : ""
          }
        >
          {row.original.resendUnBanUser}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
