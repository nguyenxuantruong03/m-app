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
import {
  translatePasswordEdited,
  translateSetNewPassword,
  translateTwoFactorEdit,
  translateTwoFactorInfo,
} from "@/translate/translate-client";

interface SheetSecurityProps {
  isTwoFactorEnabled?: boolean;
  password?: string | null;
  children: React.ReactNode;
  role: string | undefined;
  userId: string;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  languageToUse: string;
  type: "password" | "2FA";
}

const SheetPassword: React.FC<SheetSecurityProps> = ({
  isTwoFactorEnabled,
  password,
  children,
  type,
  role,
  userId,
  setAlertGuestModal,
  languageToUse,
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
      title: translatePasswordEdited(languageToUse, password),
      description: translateSetNewPassword(languageToUse),
      form: <FormPassword languageToUse={languageToUse} />,
    },
    "2FA": {
      title: translateTwoFactorEdit(languageToUse, isTwoFactorEnabled),
      description: translateTwoFactorInfo(languageToUse, isTwoFactorEnabled),
      form: <FormTwoFactor languageToUse={languageToUse} />,
    },
  };

  const { title, description, form } = infoMap[type];

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
