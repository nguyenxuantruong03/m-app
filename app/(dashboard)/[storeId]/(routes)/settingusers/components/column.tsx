"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import React, { useState } from "react";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  ShieldOff,
  ShieldCheck,
  ShieldMinus,
  ShieldPlus,
  Tag,
  User,
  Mail,
  KeyRound,
  ScanFace,
  ImageUp,
  SquareUserRound,
  Globe,
  Coins,
  Check,
  LockKeyhole,
  Ban,
  Hourglass,
  Clock12,
  CircleSlash,
  AlarmClockOff,
  SendHorizontal,
  Cake,
  AlarmClockCheck,
} from "lucide-react";
import { Lock, Unlock } from "lucide-react";
import SpanColumn from "@/components/span-column";
import { Image as ImageIcon } from "lucide-react";
import ImageCellOne from "@/components/image-cell-one";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam
import { format, subHours } from "date-fns";
import FireworksComponent from "@/components/canvas-confetti";
import FormatDate from "@/components/format-Date";
import {
  getSettingUserColumn,
  translateSettingUserColumn,
} from "@/translate/translate-dashboard";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SettingUserHeaderMessage {
  name: string;
  email: string;
  dateOfBirth: string;
  emailConfirmation: string;
  password: string;
  lastLogin: string;
  socialImage: string;
  webImage: string;
  role: string;
  socialAccount: string;
  tokenType: string;
  identifier: string;
  twoStepVerification: string;
  banUser: string;
  unbanTime: string;
  permanentBan: string;
  banTime: string;
  sendVerificationCode: string;
  sendPasswordResetEmail: string;
  sendResetPasswordToken: string;
  sendTwoStepVerification: string;
  sendUnbanNotification: string;
  sendBanExpiredNotification: string;
  updatedTime: string
  createdTime: string
}

// Header trasnlate
const HeaderColumn = ({
  column,
  labelKey,
  icon,
}: {
  column: any;
  labelKey: keyof SettingUserHeaderMessage;
  icon: React.ElementType;
}) => {
  const user = useCurrentUser();
  const settingUserHeaderMessage: SettingUserHeaderMessage =
    translateSettingUserColumn(user?.language || "vi");

  // Dùng labelKey để truy xuất giá trị động
  const label = settingUserHeaderMessage[labelKey] || labelKey;

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
export type SettingUsersColumn = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
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
  lastlogin: Date | null;
  banExpiresTime: Date | null;
  isbanforever: boolean | undefined | null;
  timebanforever: Date | null | undefined;
  dateofbirth: Date | null;
  isBirthdayToday?: boolean | null;
  updatedAt: Date;
  createdAt: Date | null;
  language: string;
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

  //language
  const settingUserColumnMessage = getSettingUserColumn(user.language);

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
      toast.success(settingUserColumnMessage.success);
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
        toast.error(settingUserColumnMessage.error);
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
          {settingUserColumnMessage.save}
        </Button>
        <Button variant="outline" onClick={handleCancel} disabled={loading}>
          {settingUserColumnMessage.cancel}
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="name" icon={Tag} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;

      const birthdayDate = row.original.dateofbirth
        ? utcToZonedTime(
            subHours(new Date(row.original.dateofbirth), 7),
            vietnamTimeZone
          )
        : null;

      const today = new Date();
      const isBirthdayToday =
        birthdayDate &&
        birthdayDate.getDate() === today.getDate() &&
        birthdayDate.getMonth() === today.getMonth();

      const BirthdayFireworks: React.FC<{ isBirthdayToday: boolean }> = ({
        isBirthdayToday,
      }) => {
        if (isBirthdayToday) {
          return <FireworksComponent />;
        } else {
          return null; // Không có gì để hiển thị nếu không phải sinh nhật hôm nay
        }
      };

      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : isBirthdayToday
              ? "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold"
              : ""
          }
        >
          {isBirthdayToday !== null ? (
            <BirthdayFireworks isBirthdayToday={isBirthdayToday} />
          ) : null}
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="email" icon={User} />
    ),
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
    accessorKey: "birthday",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="dateOfBirth" icon={Cake} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const birthdayDate = row.original.dateofbirth
        ? utcToZonedTime(
            subHours(new Date(row.original.dateofbirth), 7),
            vietnamTimeZone
          )
        : null;

      let birthday = birthdayDate
        ? format(birthdayDate, "E '-' dd/MM/yyyy", {
            locale: viLocale,
          })
        : null;

      const today = new Date();
      const isBirthdayToday =
        birthdayDate &&
        birthdayDate.getDate() === today.getDate() &&
        birthdayDate.getMonth() === today.getMonth();

      return (
        <div
          className={
            isBanforever
              ? "line-through text-red-500"
              : isBanned
              ? "line-through text-gray-400"
              : isBirthdayToday
              ? "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold"
              : ""
          }
        >
          {birthday}
        </div>
      );
    },
  },

  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="emailConfirmation" icon={Mail} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;
      const emailVerified = row.original.emailVerified
        ? format(row.original.emailVerified, "dd/MM/yyyy")
        : null;
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
          {emailVerified}
        </div>
      );
    },
  },

  {
    accessorKey: "password",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="password" icon={KeyRound} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="lastLogin" icon={ScanFace} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;

      const lastlogin = row.original.lastlogin
        ? format(
            utcToZonedTime(
              subHours(new Date(row.original.lastlogin), 7),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null;
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
          {lastlogin}
        </div>
      );
    },
  },

  {
    accessorKey: "image",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="socialImage" icon={ImageUp} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      const updateImage = row.original.createdAt
        ? format(
            utcToZonedTime(
              new Date(new Date(row.original.createdAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null;
      const email = row.original.email;
      // Check if the image URL is available
      if (imageUrl) {
        return (
          <ImageCellOne
            imageUrl={imageUrl}
            createdAt={updateImage}
            email={email}
            languageToUse={row.original.language}
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "imageCredential",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="webImage" icon={ImageIcon} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.imageCredential;
      const updateImage = row.original.createdAt
        ? format(
            utcToZonedTime(
              new Date(new Date(row.original.createdAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null;
      const email = row.original.email;
      // Check if the image URL is available
      if (imageUrl) {
        return (
          <ImageCellOne
            imageUrl={imageUrl}
            createdAt={updateImage}
            email={email}
            languageToUse={row.original.language}
          />
        );
      }
      return "";
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="role" icon={SquareUserRound} />
    ),
    cell: RoleCell,
  },

  {
    accessorKey: "accounts.provider",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="socialAccount" icon={Globe} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="tokenType" icon={Coins} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="identifier" icon={Check} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="twoStepVerification" icon={LockKeyhole} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="banUser" icon={CircleSlash} />
    ),
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
    accessorKey: "banExpiresTime",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="unbanTime" icon={Hourglass} />
    ),
    cell: ({ row }) => {
      const banExpires = row.original.banExpiresTime
        ? format(
            utcToZonedTime(
              new Date(new Date(row.original.banExpiresTime)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null;
      return <div>{banExpires}</div>;
    },
  },

  {
    accessorKey: "isbanforever",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="permanentBan" icon={Ban} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="banTime" icon={AlarmClockOff} />
    ),
    cell: ({ row }) => {
      const isBanned = row.original.ban === true;
      const isBanforever = row.original.isbanforever;

      const timebanforever = row.original.timebanforever
        ? format(
            utcToZonedTime(
              subHours(new Date(row.original.timebanforever), 0),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null;
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
          {timebanforever}
        </div>
      );
    },
  },

  {
    accessorKey: "resendTokenVerify",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendVerificationCode" icon={SendHorizontal} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendPasswordResetEmail" icon={SendHorizontal} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendResetPasswordToken" icon={SendHorizontal} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendTwoStepVerification" icon={SendHorizontal} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendUnbanNotification" icon={SendHorizontal} />
    ),
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
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="sendBanExpiredNotification" icon={SendHorizontal} />
    ),
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="updatedTime" icon={AlarmClockCheck} />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.updatedAt}
          language={row.original.language}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderColumn column={column} labelKey="createdTime" icon={Clock12} />
    ),
    cell: ({ row }) => {
      return (
        <FormatDate
          data={row.original.createdAt}
          language={row.original.language}
        />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
