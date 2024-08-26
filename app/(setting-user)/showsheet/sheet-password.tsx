"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormTwoFactor from "../components/form/form-2FA";
import FormPassword from "../components/form/form-newpassword";

interface SheetSecurityProps {
  isTwoFactorEnabled?: boolean;
  password?: string | null;
  children: React.ReactNode;
  role: string | undefined;
  userId: string
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: "password" | "2FA" 
}

const SheetPassword: React.FC<SheetSecurityProps> = ({
    isTwoFactorEnabled,
  password,
  children,
  type,
  role,
  userId,
  setAlertGuestModal
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (role !== "GUEST" && userId) {
        setOpen(true);
      } else {
        setAlertGuestModal(true);
      }
    } else {
      setOpen(false);
    }
  };

  const infoMap = {
    password: {
      title: `Đã chỉnh sửa mật khẩu vào lúc: ${password || "Chưa thay đổi"}`,
      description: `Hãy đặt mật mã mới tránh trùng với mật khẩu cũ`,
      form: <FormPassword />
        
    },
    "2FA": {
      title: `Chỉnh sửa xác mình 2 bước: ${isTwoFactorEnabled || "Chưa thay đổi"}`,
      description: `Sau khi bật xác minh 2 bước xong, khi đăng nhập lại sẽ không cần nhập tài khoản mật khẩu: ${isTwoFactorEnabled || "Chưa thay đổi"}`,
      form: <FormTwoFactor />
    },
  };

  const { title, description,form } = infoMap[type];

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {form}
      </SheetContent>
    </Sheet>
  );
};

export default SheetPassword;
